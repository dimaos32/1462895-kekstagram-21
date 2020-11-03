'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const page = document.querySelector(`body`);
const photoUploadForm = document.querySelector(`.img-upload__form`);
const photoUploadFormInput = photoUploadForm.querySelector(`#upload-file`);
const photoUploadFormPreview = photoUploadForm.querySelector(`.img-upload__preview img`);
const photoEditForm = document.querySelector(`.img-upload__overlay`);

const onPhotoLoad = (evt) => {
  const file = evt.target.files[0];

  if (window.utils.checkExtensionAccordance(file, FILE_TYPES)) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      photoEditForm.classList.remove(`hidden`);
      page.classList.add(`modal-open`);
      photoUploadFormPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

photoUploadFormInput.addEventListener(`change`, (evt) => {
  onPhotoLoad(evt);
});
