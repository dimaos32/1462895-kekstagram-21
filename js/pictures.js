'use strict';

const COMMENTS_TO_LOAD_MAX = 5;

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

const deletePhotos = () => {
  const photos = comunityPhotos.querySelectorAll(`.picture`);

  photos.forEach((photo) => {
    photo.remove();
  });
};

const renderPhotos = (data) => {
  const fragment = document.createDocumentFragment();

  deletePhotos();

  data.forEach((photo) => {
    fragment.append(renderPhoto(photo));
  });

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
  const commentsLoader = photoDetails.querySelector(`.social__comments-loader`);

  const addComment = (n) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector(`.social__picture`).src = comments[n].avatar;
    comment.querySelector(`.social__picture`).alt = comments[n].name;
    comment.querySelector(`.social__text`).textContent = comments[n].message;

    commentsList.append(comment);
  };

  const loadCommentsPortion = () => {
    const commentsLoaded = parseInt(commentsShown.textContent, 10);
    const commentsTotal = parseInt(commentsCount.textContent, 10);
    const commentsToLoad = commentsTotal - commentsLoaded < COMMENTS_TO_LOAD_MAX
      ? commentsTotal - commentsLoaded
      : COMMENTS_TO_LOAD_MAX;

    for (let i = commentsLoaded; i < commentsLoaded + commentsToLoad; i++) {
      addComment(i);
    }

    commentsShown.textContent = `${commentsLoaded + commentsToLoad}`;

    if (commentsShown.textContent === commentsCount.textContent) {
      commentsLoader.classList.add(`hidden`);
    }
  };

  const onCommentsLoaderClick = () => {
    loadCommentsPortion();
  };

  const closePhoto = () => {
    photoDetails.classList.add(`hidden`);
    page.classList.remove(`modal-open`);
    commentsLoader.classList.remove(`hidden`);

    commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    photoDetailsClose.removeEventListener(`click`, onPhotoDetailsCloseClick);
    document.removeEventListener(`keydown`, onPhotoDetailsEscPress);
  };

  const onPhotoDetailsCloseClick = () => {
    closePhoto();
  };

  const onPhotoDetailsEscPress = (evt) => {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closePhoto();
    }
  };

  photoDetails.querySelector(`.big-picture__img img`).src = url;
  photoDetails.querySelector(`.social__caption`).textContent = description;
  photoDetails.querySelector(`.likes-count`).textContent = `${likes}`;

  commentsShown.textContent = 0;
  commentsCount.textContent = `${comments.length}`;
  commentsList.innerHTML = ``;

  loadCommentsPortion();

  photoDetails.classList.remove(`hidden`);
  page.classList.add(`modal-open`);

  commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
  photoDetailsClose.addEventListener(`click`, onPhotoDetailsCloseClick);
  document.addEventListener(`keydown`, onPhotoDetailsEscPress);
};

const onPhotoClick = (evt) => {
  if (evt.target.closest(`.picture`)) {
    evt.preventDefault();
    openPhoto(evt.target.closest(`.picture`).dataset.id);
  }
};

comunityPhotos.addEventListener(`click`, (evt) => {
  onPhotoClick(evt);
});

window.pictures = {
  renderPhotos,
};
