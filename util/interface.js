'use strict';
require('./polyfill');

const getDeclarator = options => {
  if (options.typescript) {
    return typename => `export interface ${typename}`;
  } else if (options.export || options.moduleName) {
    return typename => `export type ${typename} =`;
  } else {
    return typename => `declare type ${typename} =`;
  }
}

const generateTypes = (schema, options) => {
  const declare = getDeclarator(options);

  const generateRootDataName = schema => {
    let rootNamespaces = [];

    if (schema.queryType) {
      rootNamespaces.push(generateTypeName(schema.queryType.name));
    }

    if (schema.mutationType) {
      rootNamespaces.push(generateTypeName(schema.mutationType.name));
    }

    return rootNamespaces.join(' | ');
  };

  const generateRootTypes = schema =>
    `${declare('GraphQLResponseRoot')} {
  data?: ${generateRootDataName(schema)};
  errors?: ${generateArray('GraphQLResponseError')};
}

${declare('GraphQLResponseError')} {
  message: string;            // Required for all errors
  locations?: ${generateArray('GraphQLResponseErrorLocation')};
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

${declare('GraphQLResponseErrorLocation')} {
  line: number;
  column: number;
}`;

  const generateTypeName = name => `${name}`;

  const generateDescription = description => {
    return description ? `/**\n  ${description}\n*/\n` : '';
  };

  const generateTypeDeclaration = (description, name, possibleTypes) => {
    return `${generateDescription(description)}${declare(name)} ${possibleTypes};`;
  };

  const generateInterfaceDeclaration = (
    description,
    declaration,
    fields,
    additionalInfo
  ) =>
    `${additionalInfo}${generateDescription(description)}${declare(declaration)} {
${fields}
}`;

  const generateFlowEnum =(description, name, enumValues) =>
    `${generateDescription(description)}${declare(name)} ${enumValues.join(' | ')};`;

  const generateTypescriptEnum =(description, name, enumValues) => {
    const genEnumValues = enumValues.map(value => `\n  ${value},`).join('');
    return `${generateDescription(description)}export enum ${name} {${genEnumValues}\n}`;
  }

  const generateEnumDeclaration = options.typescript ? generateTypescriptEnum : generateFlowEnum;

  const generateArray = options.typescript
    ? typeParam => `${typeParam}[]`
    : typeParam => `Array<${typeParam}>`;

  /**
    * TODO
    * - add support for custom types (via optional json file or something)
    * - allow this to return metadata for Non Null types
    */
  const resolveInterfaceName = type => {
    switch (type.kind) {
      case 'LIST':
        return generateArray(resolveInterfaceName(type.ofType));
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
            return options.typeMap[type.name] || 'any';
        }

      case 'INTERFACE':
        return generateTypeName(type.name);

      case 'ENUM':
        return type.name;

      default:
        return generateTypeName(type.name);
    }
  };

  const fieldToDefinition = (field) => {
    let interfaceName = resolveInterfaceName(field.type);
    let isNotNull = field.type.kind === 'NON_NULL';
    const nullValues = options.nullValues || !isNotNull;

    const nullKeyCharacter = (
      options.nullKeys || (options.typescript && nullValues)
    ) ? '?' : '';
    const fullType = nullValues
      ? options.typescript ? `${interfaceName} | null` : `?${interfaceName}`
      : interfaceName;

    const fieldDef = `${field.name}${nullKeyCharacter}: ${fullType}`;

    const description = field.description
      ? `  /** ${field.description} */\n`
      : '';

    return `${description}  ${fieldDef};`;
  };

  const findRootType = type => {
    if (!type.ofType) {
      return type;
    }

    return findRootType(type.ofType);
  };

  const filterField = (field, ignoredTypes) => {
    let nestedType = findRootType(field.type);
    return !ignoredTypes.includes(nestedType.name);
  };

  const typeToInterface = (type, ignoredTypes) => {
    if (type.kind === 'SCALAR') {
      return null;
    }

    if (type.kind === 'ENUM') {
      return generateEnumDeclaration(
        type.description,
        type.name,
        type.enumValues.map(v => `"${v.name}"`)
      );
    }

    let isInput = type.kind === 'INPUT_OBJECT';
    let f = isInput ? type.inputFields : type.fields || [];

    let fields = f
      .filter(field => filterField(field, ignoredTypes))
      .map(field => fieldToDefinition(field))
      .filter(field => field)
      .join('\n');

    let interfaceDeclaration = generateTypeName(type.name);
    let additionalInfo = '';

    if (type.kind === 'INTERFACE' || type.kind === 'UNION') {
      let possibleTypes = type.possibleTypes
        .filter(type => !ignoredTypes.includes(type.name))
        .map(type => generateTypeName(type.name));

      if (possibleTypes.length) {
        return generateTypeDeclaration(
          type.description,
          generateTypeName(type.name),
          possibleTypes.join(' | ')
        );
      }
    }

    return generateInterfaceDeclaration(
      type.description,
      interfaceDeclaration,
      fields,
      additionalInfo
    );
  };

  const typesToInterfaces = (schema, options) => {
    let interfaces = [];
    interfaces.push(generateRootTypes(schema)); // add root entry point & errors

    let typeInterfaces = schema.types
      .filter(type => !type.name.startsWith('__')) // remove introspection types
      .filter(
        (
          type // remove ignored types
        ) => !options.ignoredTypes.includes(type.name)
      )
      .filter(type => {
        if (options.whitelist.length === 0) {
          return true;
        }

        return options.whitelist.includes(type.name);
      })
      .map(type => typeToInterface(type, options.ignoredTypes)) // convert to interface
      .filter(type => type); // remove empty ones

    return interfaces
      .concat(typeInterfaces) // add typeInterfaces to return object
      .join('\n\n'); // add newlines between interfaces
  };

  return typesToInterfaces(schema.data.__schema, options);
};

module.exports = {
  generateTypes,
};
