# Metalsmith data
A metalsmith plugin to add namespaced global data objects from files or dynamically from plain JS objects or functions.

## Installation
```sh
$ npm install metalsmith-data
```

## Usage
```js
var metalsmith = require('Metalsmith');

metalsmith
    .use(data({
        // Add data from file to the `data.test1` namespace:
        test1: './path/to/test/file.json',
    
        // Add nested property from file to the `data.test2` namespace:
        test2: {
            src: './path/to/test/file.json',
            property: 'propName'
        },

        // Add a plain JS object to the `data.test3` namespace:
        test3: {
            foo: 'bar'
        },

        // Add a plain JS object to the `data.test4` namespace, via a function:
        test4: function() {
            var bar = 1+2;
            return { foo: bar }
        }
    }));
```