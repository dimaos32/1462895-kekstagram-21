'use strict';

const page = document.querySelector(`body`);
const photoDetails = document.querySelector(`.big-picture`);
const photoDetailsClose = photoDetails.querySelector(`.big-picture__cancel`);

const photoTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const comunityPhotos = document.querySelector(`.pictures`);

const renderPhoto = (item) => {
  const photoPreset = photoTemplate.cloneNode(true);

  photoPreset.dataset.id = item.id;
  photoPreset.querySelector(`.picture__img`).src = item.url;
  photoPreset.querySelector(`.picture__img`).alt = item.description;
  photoPreset.querySelector(`.picture__comments`).textContent = `${item.comments.length}`;
  photoPreset.querySelector(`.picture__likes`).textContent = `${item.likes}`;

  return photoPreset;
};

const renderPhotos = (data) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    fragment.append(renderPhoto(data[i]));
  }

  comunityPhotos.append(fragment);
};

const openPhoto = (id) => {
  photoDetails.classList.remove(`hidden`);
  page.classList.add(`modal-open`);
};

const closePhoto = () => {
  photoDetails.classList.add(`hidden`);
  page.classList.remove(`modal-open`);
};

const onPhotoClick = (evt) => {
  if (evt.target.closest(`.picture`)) {
    openPhoto(evt.target.closest(`.picture`).dataset.id);
  }
};

comunityPhotos.addEventListener(`click`, (evt) => {
  onPhotoClick(evt);
});

photoDetailsClose.addEventListener(`click`, () => {
  closePhoto();
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.utils.Key.ESCAPE) {
    evt.preventDefault();
    closePhoto();
  }
});

window.pictures = {
  renderPhotos,
};
