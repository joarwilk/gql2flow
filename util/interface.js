'use strict';
require('./polyfill');

// @TODO subscriptions?
const generateRootDataName = schema => {
  let rootNamespaces = [];

  if (schema.queryType) {
    rootNamespaces.push(generateTypeName(schema.queryType.name));
  }

  if (schema.mutationType) {
    rootNamespaces.push(generateTypeName(schema.mutationType.name));
  }

  return rootNamespaces.join(' | ');
}

const generateRootTypes = schema => `export type GraphQLResponseRoot = {
  data?: ${generateRootDataName(schema)};
  errors?: Array<GraphQLResponseError>;
}

export type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

export type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}`

const generateTypeName = name => `${name}`;

const generateTypeDeclaration = (description, name, possibleTypes) => `${description && `/**
  description: ${description}
*/`}
export type ${name} = ${possibleTypes};`;

const typeNameDeclaration = '__typename: string;\n'

const generateInterfaceDeclaration = (description, declaration, fields, additionalInfo, isInput) => `${additionalInfo}${description ? `/**
  description: ${description}
*/\n` : ''}export type ${declaration} = {
  ${isInput ? '' : typeNameDeclaration}${fields}
}`;

const generateEnumName = name => `${name}Enum`;

const generateEnumDeclaration = (description, name, enumValues) => `${description && `/**
description: ${description}
*/`}
export type ${generateEnumName(name)} = ${enumValues.join(' | ')};`;

/**
  * TODO
  * - add support for custom types (via optional json file or something)
  * - allow this to return metadata for Non Null types
  */
const resolveInterfaceName = type => {
  switch (type.kind) {
  case 'LIST':
    return `Array<${resolveInterfaceName(type.ofType)}>`;
  case 'NON_NULL':
    return `${resolveInterfaceName(type.ofType)}`;
  case 'SCALAR':
    switch (type.name) {
    case 'ID':
    case 'String':
      return 'string';

    case 'Boolean':
      return 'boolean';

    case 'Float':
    case 'Int':
      return 'number';

    default:
      return 'any';
    }

  case 'INTERFACE':
    return generateTypeName(type.name);

  case 'ENUM':
    return generateEnumName(type.name);

  default:
    return generateTypeName(type.name);
  }
};

const fieldToDefinition = (field, isInput) => {
  let interfaceName = resolveInterfaceName(field.type);
  let fieldDef;
  let isNotNull = field.type.kind === 'NON_NULL'
  if (!isNotNull) {
    fieldDef = `${field.name}: ?${interfaceName}`;
  } else {
    fieldDef = `${field.name}: ${interfaceName}`;
  }

  const description = field.description !== null ? `  /** ${field.description} */\n` : ``

  return `${description}  ${fieldDef};`;
}

const findRootType = type => {
  if (!type.ofType) { return type; }

  return findRootType(type.ofType);
}

const filterField = (field, ignoredTypes) => {
  let nestedType = findRootType(field.type);
  return !ignoredTypes.includes(nestedType.name);
}

const typeToInterface = (type, ignoredTypes) => {
  if (type.kind === 'SCALAR') {
    return null;
  }

  if (type.kind === 'ENUM') {
    return generateEnumDeclaration(type.description, type.name, type.enumValues.map(v => `"${v.name}"`))
  }

  let isInput = type.kind === 'INPUT_OBJECT';
  let f = isInput ? type.inputFields : type.fields || [];

  let fields = f
                .filter(field => filterField(field, ignoredTypes))
                .map(field => fieldToDefinition(field, isInput))
                .filter(field => field)
                .join('\n');

  let interfaceDeclaration = generateTypeName(type.name);
  let additionalInfo = '';

  if (type.kind === 'INTERFACE' || type.kind === 'UNION') {
    let possibleTypes = type.possibleTypes
                          .filter(type => !ignoredTypes.includes(type.name))
                          .map(type => generateTypeName(type.name));

    if (possibleTypes.length) {
      return generateTypeDeclaration(type.description, generateTypeName(type.name), possibleTypes.join(' | '))
    }
  }

  return generateInterfaceDeclaration(type.description, interfaceDeclaration, fields, additionalInfo, isInput);
};

const typesToInterfaces = (schema, options) => {
  let interfaces = [];
  interfaces.push(generateRootTypes(schema));       // add root entry point & errors

  let typeInterfaces =
    schema.types
      .filter(type => !type.name.startsWith('__'))  // remove introspection types
      .filter(type =>                               // remove ignored types
        !options.ignoredTypes.includes(type.name)
      )
      .map(type =>                                  // convert to interface
        typeToInterface(type, options.ignoredTypes)
      )
      .filter(type => type);                        // remove empty ones

  return interfaces
          .concat(typeInterfaces)                   // add typeInterfaces to return object
          .join('\n\n');                            // add newlines between interfaces
}

const schemaToInterfaces = (schema, options) => typesToInterfaces(schema.data.__schema, options);

module.exports = {
  schemaToInterfaces
}
