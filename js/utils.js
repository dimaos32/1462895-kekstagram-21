'use strict';

const Key = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const checkExtensionAccordance = (file, arr) => {
  return arr.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });
};

window.utils = {
  Key,
  checkExtensionAccordance,
};
