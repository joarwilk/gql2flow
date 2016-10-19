#!/usr/bin/env node
'use strict';
const program = require('commander');

// file I/O helpers
const fileIO = require('./util/fileIO');

// Interface Utils
const interfaceUtils = require('./util/interface');

// Module Utils
const moduleUtils = require('./util/module')

program
  .version('0.2.1')
  .usage('[options] <schema.json>')
  .option('-o --output-file [outputFile]', 'name for ouput file, defaults to graphqlInterfaces.d.ts', 'graphqlInterfaces.d.ts')
  .option('-m --module-name [moduleName]', 'name for the export module, defaults to "GQL"', 'GQL')
  .option('-i --ignored-types <ignoredTypes>', 'names of types to ignore (comma delimited)', v => v.split(','), [])
  .action((fileName, options) => {
    let schema = fileIO.readFile(fileName);

    let interfaces = interfaceUtils.schemaToInterfaces(schema, options);

    let module = moduleUtils.generateModule(options.moduleName, interfaces);

    moduleUtils.writeModuleToFile(options.outputFile, module);
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
