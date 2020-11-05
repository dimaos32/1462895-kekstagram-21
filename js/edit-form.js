'use strict';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const PERSENTS_DEFAULT = 100;

const page = document.querySelector(`body`);
const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoUploadFormCancel = photoEditForm.querySelector(`#upload-cancel`);
const scaleControlSmaller = photoEditForm.querySelector(`.scale__control--smaller`);
const scaleControlBigger = photoEditForm.querySelector(`.scale__control--bigger`);
const scaleControlValue = photoEditForm.querySelector(`.scale__control--value`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const effectsList = photoEditForm.querySelector(`.effects__list`);

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

effectsList.addEventListener(`change`, (evt) => {
  window.effects[evt.target.value]();
});
