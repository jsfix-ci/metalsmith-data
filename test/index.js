const data = require('../src');
const Metalsmith = require('metalsmith');
const should = require('should');

describe('metalsmith-data', function () {

    it('should parse JSON', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: './test/fixtures/src/data.json'
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({ string: 'string' });
            done();
        });
    });

    it('should parse YAML', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: './test/fixtures/src/data.yaml'
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
                    src: './test/fixtures/src/nested.json',
                    property: 'data'
                }
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({ string: 'string' });
            done();
        });
    });

    it('should add an object literal to the namespace', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: {
                    foo: "bar"
                }
            }));

        m.build(function (err) {
            m.metadata().data.test.should.deepEqual({
                foo: "bar"
            });
            done();
        });
    });

    it('should add a function that returns data to the namespace', function (done) {
        var m = Metalsmith('test/fixtures')
            .use(data({
                test: function() {
                    return "bar";
                }
            }));

        m.build(function (err) {
            m.metadata().data.test.should.equal("bar");
            done();
        });
    });
});