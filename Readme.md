# GraphQL To Flow Types

```shell
npm i -g gql2flow
```


```
Usage: gql2flow [options] <schema.json>

Options:

  -h, --help                         output usage information
  -V, --version                      output the version number
  -o --output-file [outputFile]      name for output file, defaults to graphql-export.flow.js
  -m --module-name [moduleName]      name for the export module. Types are not wrapped in a module if this is not set
  -i --ignored-types <ignoredTypes>  names of types to ignore (comma delimited)
  -w --whitelist <whitelist>         names of types to whitelist (comma delimited)
  --null-keys                        adds a '?' to all keys
  --null-values                      adds a '?' to all values
```

## Examples

#### Fetching from a server
```shell
gql2flow https://api.github.com/graphql
```

#### From a json schema
```shell
gql2flow schema.json
```
