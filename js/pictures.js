'use strict';

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

window.pictures = {
  renderPhotos,
};
