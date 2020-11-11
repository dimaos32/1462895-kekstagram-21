'use strict';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const PERСENTS_DEFAULT = 100;

const MAX_TITLE_LENGTH = 140;

const RE_HASHTAG = /^#[\wА-Яа-я]{1,19}$/;

const page = document.querySelector(`body`);
const pageContent = page.querySelector(`main`);
const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoEditForm = photoUploadForm.querySelector(`.img-upload__overlay`);
const photoUploadFormCancel = photoEditForm.querySelector(`#upload-cancel`);
const scaleControlSmaller = photoEditForm.querySelector(`.scale__control--smaller`);
const scaleControlBigger = photoEditForm.querySelector(`.scale__control--bigger`);
const scaleControlValue = photoEditForm.querySelector(`.scale__control--value`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const photoDescription = photoEditForm.querySelector(`.text__description`);
const photoHashtags = photoEditForm.querySelector(`.text__hashtags`);

const closePhotoEditForm = () => {
  photoUploadForm.reset();
  photoEditForm.classList.add(`hidden`);
  page.classList.remove(`modal-open`);
};

const resizePhoto = (scale = 1) => {
  photoPreview.style = `transform: scale(${scale}`;
};

const getDownScale = () => {
  const scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > SCALE_MIN) {
    scaleControlValue.value = `${scaleValue - SCALE_STEP}%`;
    resizePhoto((scaleValue - SCALE_STEP) / PERСENTS_DEFAULT);
  }
};

const getUpScale = () => {
  const scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < SCALE_MAX) {
    scaleControlValue.value = `${scaleValue + SCALE_STEP}%`;
    resizePhoto((scaleValue + SCALE_STEP) / PERСENTS_DEFAULT);
  }
};

const checkHashtags = (str) => {
  const hashtags = str.trim().toLowerCase().split(` `).sort();

  if (hashtags.length > 5) {
    return {value: false, reason: `QUANTITY`};
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!RE_HASHTAG.test(hashtags[i]) && str) {
      return {value: false, reason: `RE`};
    }

    if (i > 0 && hashtags[i] === hashtags[i - 1]) {
      return {value: false, reason: `DOUBLING`};
    }
  }

  return {value: true};
};

const resetForm = () => {
  resizePhoto();
  scaleControlValue.value = `100%`;
  window.effects.resetValue();
  window.effects.reset();
  photoPreview.className = ``;
  photoPreview.style.filter = ``;
  photoDescription.value = ``;
  photoHashtags.value = ``;
  closePhotoEditForm();
};

const onSendSuccess = () => {
  const successMessage = document.querySelector(`#success`)
    .content
    .querySelector(`.success`)
    .cloneNode(true);

  const onClick = () => {
    successMessage.remove();

    successMessage.removeEventListener(`click`, onClick);
    document.removeEventListener(`keydown`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === window.utils.Key.ESCAPE) {
      successMessage.remove();

      successMessage.removeEventListener(`click`, onClick);
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  resetForm();

  pageContent.append(successMessage);

  successMessage.addEventListener(`click`, onClick);
  document.addEventListener(`keydown`, onEscPress);
};

const onSendError = () => {
  const errorMessage = document.querySelector(`#error`)
  .content
  .querySelector(`.error`)
  .cloneNode(true);

  const onClick = () => {
    errorMessage.remove();
  };

  const onEscPress = (evt) => {
    if (evt.key === window.utils.Key.ESCAPE) {
      errorMessage.remove();
    }
  };

  resetForm();

  pageContent.append(errorMessage);

  errorMessage.addEventListener(`click`, onClick);
  document.addEventListener(`keydown`, onEscPress);
};

photoUploadFormCancel.addEventListener(`click`, () => {
  resetForm();
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.utils.Key.ESCAPE && photoDescription !== document.activeElement && photoHashtags !== document.activeElement) {
    evt.preventDefault();
    resetForm();
  }
});

scaleControlSmaller.addEventListener(`click`, () => {
  getDownScale();
});

scaleControlBigger.addEventListener(`click`, () => {
  getUpScale();
});

photoHashtags.addEventListener(`input`, () => {
  const validity = checkHashtags(photoHashtags.value);

  if (validity.value) {
    photoHashtags.classList.remove(`text__not-valid`);
    photoHashtags.setCustomValidity(``);
  } else {
    photoHashtags.classList.add(`text__not-valid`);
    switch (validity.reason) {
      case `QUANTITY`:
        photoHashtags.setCustomValidity(`Укажите не более 5 хэш-тегов`);
        break;
      case `RE`:
        photoHashtags.setCustomValidity(`Каждый хэш-тег должен начинаться с символа # (решётка), может состоять из букв, чисел и _ (символ подчеркивания), хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку`);
        break;
      case `DOUBLING`:
        photoHashtags.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды, хэш-теги нечувствительны к регистру (#ХэшТег и #хэштег считаются одним и тем же тегом)`);
        break;
    }
  }

  photoHashtags.reportValidity();
});

photoDescription.addEventListener(`input`, () => {
  const valueLength = photoDescription.value.length;

  if (valueLength > MAX_TITLE_LENGTH) {
    const extraSymbols = valueLength - MAX_TITLE_LENGTH;

    photoDescription.classList.add(`text__not-valid`);
    photoDescription.setCustomValidity(`Допустимая длинна комментария - 140 символов. Удалите ${window.utils.getQEndings(extraSymbols, `symbol`)}`);
  } else {
    photoDescription.classList.remove(`text__not-valid`);
    photoDescription.setCustomValidity(``);
  }

  photoDescription.reportValidity();
});

photoUploadForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.backend.send(new FormData(photoUploadForm), onSendSuccess, onSendError);
});
