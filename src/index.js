const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

module.exports = plugin

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad
}

function plugin (opts) {
  opts = opts || {}

  return function (files, metalsmith, done) {
    var data = {}
    var name

    for (name in opts) {
      // allows you to add dynamic data from configuration
      if (typeof opts[name] === 'object' && !opts[name].src) {
        data[name] = opts[name]
      } else if (typeof opts[name] === 'function') {
        // or use a function to generate the data
        data[name] = opts[name]()
      } else {
        if (typeof opts[name] === 'object') {
          data[name] = parse(opts[name].src, opts[name].property)
          continue
        }

        data[name] = parse(opts[name])
      }
    }

    metalsmith.metadata().data = data
    done()
  }

  function parse (file, prop) {
    var ext = path.extname(file)
    var parse = parsers[ext]
    var stat
    var data

    try {
      stat = fs.statSync(file)

      // File type must be supported
      if (parsers.hasOwnProperty(ext) === -1) throw new Error('unsupported file type "' + ext + '"')

      // File must exist
      if (!stat.isFile()) throw new Error('file "' + file + '" not found')

      data = parse(fs.readFileSync(file))

      if (prop) return data[prop]

      return data
    } catch (e) {
      throw new Error(e)
    }
  }
}
