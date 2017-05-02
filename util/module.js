// file I/O helpers
'use strict';
const fileIO = require('./fileIO');

const generateModule = (moduleName, interfaces) => {
  const intro = '/* @flow */\n\n';

  if (moduleName) {
    return intro + `declare module ${moduleName} {\n${interfaces}\n}`;
  } else {
    return intro + interfaces;
  }
};

const writeModuleToFile = (outputFile, module) => {
  fileIO.writeToFile(outputFile, module);
};

module.exports = {
  writeModuleToFile,
  generateModule,
};
