# GQL2FLOW

*A fork of [gql2ts](https://github.com/avantcredit/gql2ts)*


## Usage
```shell
yarn global add gql2flow (recommended)
npm i -g gql2flow (legacy)
```


```
Usage: gql2flow [options] <schema.json>

Options:

  -h, --help                         output usage information
  -V, --version                      output the version number
  -o --output-file [outputFile]      name for output file, defaults to graphql-export.flow.js
  -i --ignored-types <ignoredTypes>  names of types to ignore (comma delimited)
```

## Examples

#### With Default Options
```shell
gql2flow schema.json
```


#### With Optional Options
```shell
gql2flow -i BadInterface,BadType,BadUnion -o schema.flow.js schema.json
```
