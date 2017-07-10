// file I/O helpers
'use strict';
const fileIO = require('./fileIO');

const generateModule = (moduleName, interfaces, typescript) => {
  if (typescript) {
    return interfaces;
  }

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
