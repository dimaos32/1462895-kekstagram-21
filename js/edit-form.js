'use strict';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const PERSENTS_DEFAULT = 100;

const MAX_TITLE_LENGTH = 140;

const RE_HASHTAG = /^#[\wА-Яа-я]{1,19}$/;

const page = document.querySelector(`body`);
const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoUploadFormCancel = photoEditForm.querySelector(`#upload-cancel`);
const scaleControlSmaller = photoEditForm.querySelector(`.scale__control--smaller`);
const scaleControlBigger = photoEditForm.querySelector(`.scale__control--bigger`);
const scaleControlValue = photoEditForm.querySelector(`.scale__control--value`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const photoDescription = photoEditForm.querySelector(`.text__description`);

const closePhotoEditForm = () => {
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
    resizePhoto((scaleValue - SCALE_STEP) / PERSENTS_DEFAULT);
  }
};

const getUpScale = () => {
  const scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < SCALE_MAX) {
    scaleControlValue.value = `${scaleValue + SCALE_STEP}%`;
    resizePhoto((scaleValue + SCALE_STEP) / PERSENTS_DEFAULT);
  }
};

const checkHashtagsValidity = (str) => {
  const hashtags = str.toLowerCase().split(` `).sort();

  console.log(hashtags);

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!RE_HASHTAG.test(hashtags[i])) {
      return false;
    }

    if (i > 0 && (hashtags[i] === hashtags[i - 1])) {
      return false;
    }
  }

  return true;
};

console.log(checkHashtagsValidity(`#raz #dwa #tri #chet #pjat #shes`));

photoUploadFormCancel.addEventListener(`click`, () => {
  closePhotoEditForm();
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.utils.Key.ESCAPE) {
    evt.preventDefault();
    closePhotoEditForm();
  }
});

scaleControlSmaller.addEventListener(`click`, () => {
  getDownScale();
});

scaleControlBigger.addEventListener(`click`, () => {
  getUpScale();
});

photoDescription.addEventListener(`input`, () => {
  const valueLength = photoDescription.value.length;

  if (valueLength > MAX_TITLE_LENGTH) {
    const extraSymbols = valueLength - MAX_TITLE_LENGTH;

    photoDescription.setCustomValidity(`Допустимая длинна комментария - 140 символов. Удалите ${window.utils.getQEndings(extraSymbols, `symbol`)}`);
  } else {
    photoDescription.setCustomValidity(``);
  }

  photoDescription.reportValidity();
});
