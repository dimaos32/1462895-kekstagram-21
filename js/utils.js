'use strict';

const Key = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const qEndingsMap = {
  symbol: [`символ`, `символа`, `символов`],
};

const checkExtensionAccordance = (file, arr) => {
  return arr.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });
};

const getQEndings = (q = 1, word) => {
  if (q % 100 < 11 || q % 100 > 14) {
    if (q % 10 === 1) {
      return `${q} ${qEndingsMap[word][0]}`;
    } else if (q % 10 > 1 && q % 10 < 5) {
      return `${q} ${qEndingsMap[word][1]}`;
    }
  }

  return `${q} ${qEndingsMap[word][2]}`;
};

const getRandomArrayElements = (arr, n = 1) => {
  let copySource = arr.slice();
  let randomArray = [];

  for (let i = 0; i < copySource.length && i < n; i++) {
    const element = i + Math.floor(Math.random() * (copySource.length - i));
    randomArray.push(copySource[element]);
    const swap = copySource[element];
    copySource[element] = copySource[i];
    copySource[i] = swap;
  }

  return randomArray;
};

const addId = (array) => {
  return array.map((item, i) => {
    return Object.assign({}, item, {id: `${i}`});
  });
};

window.utils = {
  Key,
  checkExtensionAccordance,
  getQEndings,
  getRandomArrayElements,
  addId,
};
