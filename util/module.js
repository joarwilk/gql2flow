// file I/O helpers
'use strict';
const fileIO = require('./fileIO');

const generateModule = (moduleName, interfaces) => {
  return `// graphql flow definitions
${interfaces}
`
};

const writeModuleToFile = (outputFile, module) => {
  fileIO.writeToFile(outputFile, module);
}

module.exports = {
  writeModuleToFile,
  generateModule
}
