'use strict';

const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);

const none = () => {
  photoPreview.className = ``;
};

const chrome = () => {
  photoPreview.className = `effects__preview--chrome`;
};

const sepia = () => {
  photoPreview.className = `effects__preview--sepia`;
};

const marvin = () => {
  photoPreview.className = `effects__preview--marvin`;
};

const phobos = () => {
  photoPreview.className = `effects__preview--phobos`;
};

const heat = () => {
  photoPreview.className = `effects__preview--heat`;
};

window.effects = {
  none,
  chrome,
  sepia,
  marvin,
  phobos,
  heat,
};
