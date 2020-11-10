'use strict';

const filterPhotos = {
  'filter-default': () => {
    return window.photos;
  },
  'filter-random': () => {
    return window.utils.getRandomArrayElements(window.photos, 10);
  },
  'filter-discussed': () => {
    const copyPhotos = window.photos.slice();

    return copyPhotos.sort((left, right) => {
      return right.comments.length - left.comments.length;
    });
  },
};

const filter = document.querySelector(`.img-filters__form`);

const onFilterFormChange = (evt) => {
  filter.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
  evt.target.classList.add(`img-filters__button--active`);

  window.pictures.renderPhotos(filterPhotos[evt.target.id]());
};

filter.addEventListener(`click`, window.utils.debounce(onFilterFormChange));
