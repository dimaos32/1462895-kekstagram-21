'use strict';

const COMMENTS_PORTION = 5;

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
  const photo = window.photos.find((item) => item.id === id);

  const {comments, description, likes, url} = photo;

  const commentsShown = photoDetails.querySelector(`.comments-shown`);
  const commentsCount = photoDetails.querySelector(`.comments-count`);

  const commentsList = photoDetails.querySelector(`.social__comments`);
  const commentTemplate = document.querySelector(`#social__comment`)
    .content
    .querySelector(`.social__comment`);

  const addComment = (n) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector(`.social__picture`).src = comments[n].avatar;
    comment.querySelector(`.social__picture`).alt = comments[n].name;
    comment.querySelector(`.social__text`).textContent = comments[n].message;

    commentsList.append(comment);
  };

  const loadCommentsPotion = () => {
    let i;
    for (i = commentsShown.textContent;
      i < commentsShown.textContent + 5 && i < comments.length;
      i++) {

      addComment(i);
    }
    commentsShown.textContent = i;
  };

  photoDetails.querySelector(`.big-picture__img img`).src = url;
  photoDetails.querySelector(`.social__caption`).textContent = description;
  photoDetails.querySelector(`.likes-count`).textContent = likes;

  commentsShown.textContent = 0;
  commentsCount.textContent = comments.length;

  // if (comments.length < COMMENTS_PORTION) {
  //   commentsCount.textContent = comments.length;
  //   commentsShown.textContent = comments.length;
  // }

  commentsList.innerHTML = ``;

  loadCommentsPotion();

  console.log(photo);

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
