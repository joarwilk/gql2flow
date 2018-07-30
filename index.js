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
  .version('0.5.0')
  .usage('[options] <schemaPath>')
  .option(
    '-c --config [configFile]',
    'Use specified configuation file. By default, gql2flow looks for a gql2flow.json config file in the current directory.',
    fileIO.pathJoin(__dirname, 'gql2flow.json')
  )
  .option(
    '-u --unauthorised',
    'Allow fetch over TLS with unauthorised CA or self-signed certs. (Only use in development environments.)',
    false)
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
  .action((path, options) => {
    const config = fileIO.isFile(options.config) ? Object.assign({}, options, fileIO.readFile(options.config)) : options
    const getSchema = new Promise((resolve, reject) => {
      if (isUrl(path)) {
        fetchUtils.fetchWithIntrospection(path, config, (err, schema) => {
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
        let interfaces = interfaceUtils.generateTypes(schema, config);
        let module = moduleUtils.generateModule(config.moduleName, interfaces);

        moduleUtils.writeModuleToFile(config.outputFile, module);
      })
      .catch(err => console.error(err.message));
  })

program.on(['-h', '--help'], program.outputHelp);

program.parse(process.argv);
