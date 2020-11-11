'use strict';

const BAR_WIDTH = 453;
const PIN_POS_MIN = 0;
const PIN_POS_MAX = 100;

const Limit = {
  CHROME_MIN: 0,
  CHROME_MAX: 1,
  SEPIA_MIN: 0,
  SEPIA_MAX: 1,
  MARVIN_MIN: 0,
  MARVIN_MAX: 100,
  PHOBOS_MIN: 0,
  PHOBOS_MAX: 3,
  HEAT_MIN: 1,
  HEAT_MAX: 3,
};

const photoEditForm = document.querySelector(`.img-upload__overlay`);
const photoPreview = photoEditForm.querySelector(`.img-upload__preview img`);
const effectsList = photoEditForm.querySelector(`.effects__list`);
const effectNone = photoEditForm.querySelector(`#effect-none`);
const effectLevelBar = photoEditForm.querySelector(`.effect-level`);
const effectLevelValue = photoEditForm.querySelector(`.effect-level__value`);
const effectLevelPin = photoEditForm.querySelector(`.effect-level__pin`);
const effectLevelDepth = photoEditForm.querySelector(`.effect-level__depth`);

let currentEffect = `none`;
let pinPos;

const effects = {
  none: () => {
    photoPreview.className = ``;
    photoPreview.style.filter = ``;
  },
  chrome: (depth) => {
    const depthAbsolute = Limit.CHROME_MIN + (Limit.CHROME_MAX - Limit.CHROME_MIN) * depth / PIN_POS_MAX;

    photoPreview.className = `effects__preview--chrome`;
    photoPreview.style.filter = `grayscale(${depthAbsolute})`;
  },
  sepia: (depth) => {
    const depthAbsolute = Limit.SEPIA_MIN + (Limit.SEPIA_MAX - Limit.SEPIA_MIN) * depth / PIN_POS_MAX;

    photoPreview.className = `effects__preview--sepia`;
    photoPreview.style.filter = `sepia(${depthAbsolute})`;
  },
  marvin: (depth) => {
    const depthAbsolute = Limit.MARVIN_MIN + (Limit.MARVIN_MAX - Limit.MARVIN_MIN) * depth / PIN_POS_MAX;

    photoPreview.className = `effects__preview--marvin`;
    photoPreview.style.filter = `invert(${depthAbsolute}%)`;
  },
  phobos: (depth) => {
    const depthAbsolute = Math.round(Limit.PHOBOS_MIN + (Limit.PHOBOS_MAX - Limit.PHOBOS_MIN) * depth / PIN_POS_MAX);

    photoPreview.className = `effects__preview--phobos`;
    photoPreview.style.filter = `blur(${depthAbsolute}px)`;
  },
  heat: (depth) => {
    const depthAbsolute = Limit.HEAT_MIN + (Limit.HEAT_MAX - Limit.HEAT_MIN) * depth / PIN_POS_MAX;

    photoPreview.className = `effects__preview--heat`;
    photoPreview.style.filter = `brightness(${depthAbsolute})`;
  },
};

const resetPinPos = () => {
  pinPos = PIN_POS_MAX;
  effectLevelPin.style.left = `${PIN_POS_MAX}%`;
  effectLevelDepth.style.width = effectLevelPin.style.left;
};

effectsList.addEventListener(`change`, (evt) => {
  resetPinPos();
  currentEffect = evt.target.value;
  effects[currentEffect](pinPos);
  effectLevelBar.style.display = `block`;

  if (currentEffect === `none`) {
    effectLevelBar.style.display = `none`;
  }
});

const resetEffects = () => {
  effectNone.checked = true;
};

effectLevelPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoord = evt.clientX;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = moveEvt.clientX - startCoord;

    startCoord = moveEvt.clientX;

    pinPos += (shift * PIN_POS_MAX / BAR_WIDTH);

    if (pinPos < PIN_POS_MIN) {
      pinPos = PIN_POS_MIN;
    }

    if (pinPos > PIN_POS_MAX) {
      pinPos = PIN_POS_MAX;
    }

    effects[currentEffect](pinPos);

    effectLevelPin.style.left = `${pinPos}%`;
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    effectLevelValue.value = Math.round(pinPos);

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.effects = {
  resetValue: resetPinPos,
  reset: resetEffects,
};
