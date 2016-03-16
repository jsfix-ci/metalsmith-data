# Metalsmith data
A metalsmith plugin to add namespaced global data objects from files.

This is handled differently from [metalsmith-metadata](https://github.com/segmentio/metalsmith-metadata), in that files are read relative to the working directory, all data is namespaced under `data[foo]`, and you may assign a nested property from a data file to a namespace.

## Installation
```sh
$ npm install metalsmith-data
```

## Usage
```js
var metalsmith = require('Metalsmith');

metalsmith
    .use(data({
        // Add data from file to the `data.foo` namespace:
        foo: './path/to/test/file.json',
    
        // Add nested property from file to the `data.bar` namespace:
        bar: {
            src: './path/to/test/file.json',
            property: 'propName'
        }
    }));
```