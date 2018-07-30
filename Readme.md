## This project is deprecated, use [gql2ts](https://github.com/avantcredit/gql2ts) instead

# GraphQL To Flow Types

```shell
npm i -g gql2flow
```


```
Usage: gql2flow [options] <schema.json>

Options:

    -V, --version                      output the version number
    -e --export                        use export rather than declare to define types
    -o --output-file [outputFile]      name for ouput file, defaults to graphql-export.flow.js
    --null-keys [nullKeys]             makes all keys nullable
    --null-values [nullValues]         makes all values nullable
    --headers [headers]                Headers to add to the request when fetching from a server
    -m --module-name [moduleName]      name for the export module. Types are not wrapped in a module if this is not set
    -t --typeMap <typeSpec>            Define custom scalar types where typeSpec is <graphql type>:<flow type>
    -i --ignored-types <ignoredTypes>  names of types to ignore (comma delimited)
    -w --whitelist <whitelist>         names of types to whitelist (comma delimited)
    -h, --help                         output usage information
```

## Examples

#### Fetching from a server
```shell
gql2flow https://api.github.com/graphql
```

##### With custom headers
```shell
gql2flow https://api.github.com/graphql --headers "Authorization: bearer <TOKEN>; Version: 1.1"
```

#### From a json schema
```shell
gql2flow schema.json
```
