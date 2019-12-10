# metalsmith-data
A metalsmith plugin to add namespaced global data objects from files or dynamically from plain JS objects or functions.

## Installation
```sh
$ npm install metalsmith-data
```

## Usage
```js
var metalsmith = require('Metalsmith')

metalsmith
  .use(data(
    {
      // Add data from file to the `data.test1` namespace:
      test1: './path/to/test/file.json',
  
      // Add nested property from file to the `data.test2` namespace:
      test2: {
        src: './path/to/test/file.json',
        property: 'propName',
        options: {
          ignoreMissingFile: true, //do not throw an error if the file is missing. Defaults to "false"
        }
      },

      // Add a plain JS object to the `data.test3` namespace:
      test3: {
        foo: 'bar'
      },


      // Add a plain JS object to the `data.test4` namespace, via a function:
      test4: function() {
          var bar = 1+2;
          return { foo: bar }
      },
      
      // Add options to use with a CSV file
      // See: https://csv.js.org/parse/options/
      test5: {
        src: './path/to/test/file.csv',
        options:{
          delimiter: ',', //Set the field delimiter. Defaults to ","
          columns: true, //Generate records as object literals instead of arrays
          trim: true, //ignore whitespace immediately around the delimiter
          cast: true //attempt to convert input string to native types
        }
      }
  }))
```

## Contributing
See [Contributing](https://github.com/elcontraption/metalsmith-data/blob/master/CONTRIBUTING.md).
