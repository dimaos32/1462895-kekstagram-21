'use strict';

const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const effectLevelBar = photoEditForm.querySelector(`.effect-level`);
const effectLevelPin = photoEditForm.querySelector(`.effect-level__pin`);

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

effectLevelPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoord = evt.clientX;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const shift = moveEvt.clientX - startCoord;

    startCoord = moveEvt.clientX;

    effectLevelPin.style.left = `${effectLevelPin.offsetLeft + shift}px`;
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.effects = {
  none,
  chrome,
  sepia,
  marvin,
  phobos,
  heat,
};
