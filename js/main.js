'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const page = document.querySelector(`body`);
const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoUploadFormInput = photoUploadForm.querySelector(`#upload-file`);
const photoPreview = photoUploadForm.querySelector(`.img-upload__preview img`);
const photoEditForm = photoUploadForm.querySelector(`.img-upload__overlay`);
const filter = document.querySelector(`.img-filters`);

const onLoadSuccess = (data) => {
  window.photos = window.utils.addId(data);
  window.pictures.renderPhotos(window.photos);
  filter.classList.remove(`img-filters--inactive`);
};

const onLoadError = (message) => {
  const node = document.createElement(`div`);

  node.classList.add(`on-error-message`);

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onPhotoLoad = (evt) => {
  const file = evt.target.files[0];

  if (window.utils.checkExtensionAccordance(file, FILE_TYPES)) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      photoEditForm.classList.remove(`hidden`);
      page.classList.add(`modal-open`);
      photoPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

window.backend.load(onLoadSuccess, onLoadError);

photoUploadFormInput.addEventListener(`change`, (evt) => {
  onPhotoLoad(evt);
});
