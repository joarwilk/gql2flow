#!/usr/bin/env node
'use strict';
const isUrl = require('is-url');

const program = require('commander');

// file I/O helpers
const fileIO = require('./util/fileIO');

// Interface Utils
const interfaceUtils = require('./util/interface');

// Module Utils
const moduleUtils = require('./util/module');

// Fetch utils
const fetchUtils = require('./util/fetcher');

program
  .version('0.4.4')
  .usage('[options] <schema.json>')
  .option('-e --export', 'use export rather than declare to define types')
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
    '-t --typeMap <typeSpec>',
    'Define custom scalar types where typeSpec is <graphql type>:<flow type>',
    (val, typeMap) => {
      const [graphqlType, flowType] = val.split(':');
      if (!graphqlType || !flowType) {
        throw new Error(
          '-t argument format should be <graphql type>:<flow type>'
        );
      }
      typeMap[graphqlType] = flowType;
      return typeMap;
    },
    {}
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
  .option(
    '-T --typescript',
    'generate typescript rather than flow'
  )
  .action((path, options) => {
    if (options.typescript) {
      if (options.moduleName) {
        console.warn('--module-name argument not compatible with --typescript');
        process.exit(1);
      }
      if (options.export) {
        console.warn('--export argument not compatible with --typescript');
        process.exit(1);
      }
    }

    const getSchema = new Promise((resolve, reject) => {
      if (isUrl(path)) {
        fetchUtils.fetchWithIntrospection(path, (err, schema) => {
          if (err) {
            reject(err);
          } else if (!schema.data) {
            reject(
              new Error('Server replied with an invalid introspection schema')
            );
          } else {
            resolve(schema);
          }
        });
      } else {
        resolve(fileIO.readFile(path));
      }
    });

    getSchema
      .then(schema => {
        let interfaces = interfaceUtils.generateTypes(schema, options);

        let module = moduleUtils.generateModule(
          options.moduleName,
          interfaces,
          options.typescript
        );

        moduleUtils.writeModuleToFile(options.outputFile, module);
      })
      .catch(err => console.error(err.message));
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
