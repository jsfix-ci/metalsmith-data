const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = plugin;

var parsers = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.yml': yaml.safeLoad
};

function plugin (opts) {
    opts = opts || {};

    return function (files, metalsmith, done) {
        var data = {};

        for (var key in opts) {
            var ext = path.extname(opts[key]);
            var parse = parsers[ext];
            var stat;

            try {
                stat = fs.statSync(opts[key]);

                // File type must be supported
                if (parsers.hasOwnProperty(ext) === -1) throw new Error('unsupported file type "' + ext + '"');

                // File must exist
                if (!stat.isFile()) throw new Error('file "' + opts[key] + '" not found');

                data[key] = parse(String(fs.readFileSync(opts[key])));
            } catch (e) {
                throw new Error(e);
            }
        }

        metalsmith.metadata().data = data;
        done();
    };

}
