# Metalsmith data
A metalsmith plugin to add namespaced global data objects from files.

## Installation
```sh
$ npm install metalsmith-data
```

## Usage
```js
var metalsmith = require('Metalsmith');

metalsmith
    .use(data({
        // Add data from file to the `data.test` namespace:
        test: './path/to/test/file.json',
    
        // Add nested property from file to the `data.test` namespace:
        test: {
            src: './path/to/test/file.json',
            property: 'propName'
        }
    }));
```