# GraphQL To Flow Types

## Installation & Usage

To install globally:

```shell
npm i -g gql2flow
```

To install locally and add as a dependency to project:

```shell
npm i gql2flow --save-dev
```

You can then call gql2flow via `node run gql2flow <schemaPath>`.

```
Usage: index [options] <schemaPath>

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    -c --config [configFile]           Use specified configuation file. By default, gql2flow looks for a gql2flow.json config file in the current directory.
    -u --unauthorised                  Allow fetch over TLS with unauthorised CA or self-signed certs. (Only use in development environments.)
    -e --export                        use export rather than declare to define types
    -o --output-file [outputFile]      name for ouput file, defaults to graphql-export.flow.js
    --null-keys [nullKeys]             makes all keys nullable
    --null-values [nullValues]         makes all values nullable
    -m --module-name [moduleName]      name for the export module. Types are not wrapped in a module if this is not set
    -t --typeMap <typeSpec>            Define custom scalar types where typeSpec is <graphql type>:<flow type>
    -i --ignored-types <ignoredTypes>  names of types to ignore (comma delimited)
    -w --whitelist <whitelist>         names of types to whitelist (comma delimited)
```

## Configuration Options
gql2flow can be used with command line parameters only, or it is possible to create a `gql2flow.json` configuration file and either save it to the current
working directory, where gqp2flow will look automatically, or specify it with the `-c` or `--config` command line option.

#### Example Config File

```json
{
  "unauthorised": true,
	"export": true,
	"outputFile": "flow-output.js"
}
```

You would then save this to `gql2flow.json` and place in the base directory, or call gql2flow as follows:
```shell
gql2flow https://localhost:3000/graphql
```

This can be added to the script section of your `package.json` file for simplicity.

## Examples

#### Fetching from a server
```shell
gql2flow https://api.github.com/graphql
```

#### From a json schema
```shell
gql2flow schema.json
```
