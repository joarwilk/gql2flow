### GQL2FLOW

#### A fork of gql2ts(https://github.com/avantcredit/gql2ts)

```shell
npm install -g gql2flow
```


```
Usage: gql2flow [options] <schema.json>

Options:

  -h, --help                         output usage information
  -V, --version                      output the version number
  -o --output-file [outputFile]      name for ouput file, defaults to graphqlInterfaces.d.ts
  -i --ignored-types <ignoredTypes>  names of types to ignore (comma delimited)
```

### Examples

#### With Default Options
```shell
gql2flow schema.json
```


#### With Optional Options
```shell
gql2flow -i BadInterface,BadType,BadUnion -o avant-gql.d.ts schema.json
```
