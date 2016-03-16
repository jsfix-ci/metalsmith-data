const data = require('../src');
const Metalsmith = require('metalsmith');
const should = require('should');

describe('metalsmith-data', function () {

    it('should parse JSON', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: './test/fixtures/data.json'
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({ string: 'string' });
            done();
        });
    });

    it('should parse YAML', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: './test/fixtures/data.yaml'
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({ string: 'string' });
            done();
        });
    });

    it('should assign a nested property to a namespace', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: {
                    src: './test/fixtures/nested.json',
                    property: 'data'
                }
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({ string: 'string' });
            done();
        });
    });
});