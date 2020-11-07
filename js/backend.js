'use strict';

const MILISECONDS_IN_SECOND = 1000;

const API_URL = `https://21.javascript.pages.academy/kekstagram`;

const StatusCode = {
  OK: 200
};

const TIMEOUT = 10000;

const makeRequest = (method, url, onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT;

  xhr.open(method, url);
  if (method === `POST`) {
    xhr.send(data);
  } else {
    xhr.send();
  }

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout / MILISECONDS_IN_SECOND} с`);
  });
};

const load = (onSuccess, onError) => {
  makeRequest(`GET`, `${API_URL}/data`, onSuccess, onError);
};

const send = (data, onSuccess, onError) => {
  makeRequest(`POST`, API_URL, onSuccess, onError, data);
};

window.backend = {
  load,
  send,
};
