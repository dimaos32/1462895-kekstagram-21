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

window.utils = {
  Key,
  checkExtensionAccordance,
  getQEndings,
};
