'use strict';

const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const effectLevelBar = photoEditForm.querySelector(`.effect-level`);

const none = () => {
  photoPreview.className = ``;
  effectLevelBar.style.display = `none`;
};

const chrome = () => {
  photoPreview.className = `effects__preview--chrome`;
  effectLevelBar.style.display = `block`;
};

const sepia = () => {
  photoPreview.className = `effects__preview--sepia`;
  effectLevelBar.style.display = `block`;
};

const marvin = () => {
  photoPreview.className = `effects__preview--marvin`;
  effectLevelBar.style.display = `block`;
};

const phobos = () => {
  photoPreview.className = `effects__preview--phobos`;
  effectLevelBar.style.display = `block`;
};

const heat = () => {
  photoPreview.className = `effects__preview--heat`;
  effectLevelBar.style.display = `block`;
};

window.effects = {
  none,
  chrome,
  sepia,
  marvin,
  phobos,
  heat,
};
