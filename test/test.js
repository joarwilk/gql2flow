'use strict';
const expect       = require('chai').expect;

let interfaceUtils = require('../util/interface');
let moduleUtils    = require('../util/module');

let schema         = require('./data/starWarsSchema');
let enumSchema     = require('./data/enumSchema');

function fixture(name) {
  return fs.readFileSync(`./test/data/${name}.js`).toString()
}

const fs = require("fs")

describe('gql2flow', () => {
  describe('interfaces', () => {
    it('correctly translates the star wars schema into flow defs', () => {
      let actual = interfaceUtils.schemaToInterfaces(schema, { ignoredTypes: [] });
      
      // fs.writeFileSync('./test/data/expectedInterfaces.js', actual)
      expect(actual).to.equal(fixture("expectedInterfaces"));
    });

    it('correctly ignores types', () => {
      let actual = interfaceUtils.schemaToInterfaces(schema, { ignoredTypes: ['Person'] });

      // fs.writeFileSync('./test/data/ignoredPersonInterfaces.js', actual)
      expect(actual).to.equal(fixture("ignoredPersonInterfaces"));
    });

    it('correctly translates enums', () => {
      let actual = interfaceUtils.schemaToInterfaces(enumSchema, { ignoredTypes: [] });

      // fs.writeFileSync('./test/data/expectedEnumInterfaces.js', actual)
      expect(actual).to.equal(fixture("expectedEnumInterfaces"));
    });
  });

  describe('modules', () => {
    it('correctly generates Modules', () => {
      let interfaces = interfaceUtils.schemaToInterfaces(schema, { ignoredTypes: [] });
      let module = moduleUtils.generateModule('GQL', interfaces);

      // fs.writeFileSync('./test/data/expectedModule.js', module)
      expect(module).to.equal(fixture("expectedModule"));
    });

    it('correctly uses a custom namespace', () => {
      let interfaces = interfaceUtils.schemaToInterfaces(schema, { ignoredTypes: [] });
      let module = moduleUtils.generateModule('StarWars', interfaces);

      // fs.writeFileSync('./test/data/starWarsModule.js', module)
      expect(module).to.equal(fixture("starWarsModule"));
    });

    it('correctly uses a namespace and ignores', () => {
      let interfaces = interfaceUtils.schemaToInterfaces(schema, { ignoredTypes: ['Person'] });
      let module = moduleUtils.generateModule('StarWars', interfaces);

      // fs.writeFileSync('./test/data/ignoredPerson.js', module)
      expect(module).to.equal(fixture("ignoredPerson"));
    });

    it('correctly translates enums', () => {
      let interfaces = interfaceUtils.schemaToInterfaces(enumSchema, { ignoredTypes: [] });
      let module = moduleUtils.generateModule('GQL', interfaces);

      // fs.writeFileSync('./test/data/expectedEnum.js', module)
      expect(module).to.equal(fixture("expectedEnum"));
    });
  });
});
