#!/usr/bin/env node
'use strict';
const program = require('commander');

// file I/O helpers
const fileIO = require('./util/fileIO');

// Interface Utils
const interfaceUtils = require('./util/interface');

// Module Utils
const moduleUtils = require('./util/module');

program
  .version('0.3.0')
  .usage('[options] <schema.json>')
  .option(
    '-o --output-file [outputFile]',
    'name for ouput file, defaults to graphql-export.flow.js',
    'graphql-export.flow.js'
  )
  .option('--null-keys [nullKeys]', 'makes all keys nullable', false)
  .option('--null-values [nullValues]', 'makes all values nullable', false)
  .option(
    '-m --module-name [moduleName]',
    'name for the export module. Types are not wrapped in a module if this is not set',
    ''
  )
  .option(
    '-i --ignored-types <ignoredTypes>',
    'names of types to ignore (comma delimited)',
    v => v.split(','),
    []
  )
  .option(
    '-w --whitelist <whitelist>',
    'names of types to whitelist (comma delimited)',
    v => v.split(','),
    []
  )
  .action((fileName, options) => {
    let schema = fileIO.readFile(fileName);

    let interfaces = interfaceUtils.generateTypes(schema, options);

    let module = moduleUtils.generateModule(options.moduleName, interfaces);

    moduleUtils.writeModuleToFile(options.outputFile, module);
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
