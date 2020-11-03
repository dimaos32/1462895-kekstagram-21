'use strict';

const checkExtensionAccordance = (file, arr) => {
  return arr.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });
};

window.utils = {
  checkExtensionAccordance,
};
