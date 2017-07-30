'use strict';
const fs = require('fs');
const path = require('path')

module.exports = {
  pathJoin: (dir, file) => path.join(dir, file),
  isFile: fileName => fs.existsSync(fileName) && fs.lstatSync(fileName).isFile(),
  readFile: fileName => JSON.parse(fs.readFileSync(fileName).toString()),
  writeToFile: (fileName, data) => fs.writeFile(fileName, data, err => err && console.error('Failed to write', err) )
}
