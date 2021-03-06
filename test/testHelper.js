'use strict';
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var os = require('os');
var generators = require('yeoman-generator');
var stripJsonComments = require('strip-json-comments');
var helpers = require('yeoman-generator').test;

var testHelper = {

    readTextFile: function(filename) {
        var body = fs.readFileSync(filename, 'utf8');
        return body;
    },

    readJsonFile: function(filename) {
        var body = this.readTextFile(filename);
        return JSON.parse(stripJsonComments(body));
    },

    githubUserMock: {
        user: 'thinq4yourself',
        name: 'Joel Serino',
        email: 'gitsomehub@beardandfedora.com',
        html_url: 'https://github.com/beardandfedora'
    },

    githubMock: function() {
        return {
            user: {
                getFrom: function(data, cb) {
                    var err = null;
                    var res = this.githubUserMock;
                    cb(err, res);
                }
            }
        };
    },

    childProcessMock: {

        exec: function(cmd, cb) {
            assert(_.isString(cmd), 'cmd should be a string');
            if (cmd === 'cat ~/.npmrc | grep \'email\'') {
                cb(null, 'email=' + this.githubUserMock.email);
            } else if (cmd === 'cat ~/.npmrc | grep \'_auth\'') {
                cb(null, '_auth=dxxsdsdfsd');
            } else {
                cb(null, '');
            }
        },
        spawn: function(cmd) {
            assert(_.isString(cmd), 'cmd should be a string');
            return {
                on: function(name, cb) {
                    cb();
                }
            };
        }

    },

    npmMock: {
        load: function(cb) {
            cb(null, this);
        },
        login: function(cb) {
            cb();
        }
    },

    updateNotifierMock: function(update, callback) {
        return {
            update: update,
            notify: callback
        };
    },
    shelljsMock: function(cb) {
        return {
            exit: cb
        };
    },

    endMock: function(mockery) {
        mockery.disable();
        mockery.deregisterAll();
    },

    startMock: function(mockery) {
        this.endMock(mockery);
        mockery.enable({
            warnOnUnregistered: false
            // useCleanCache: true
        });
    },

    /**
     * Run a generator
     * @param {String} name - The name of the generator
     * @param  {String[]} [subs] - An optional array of sub generators names
     * @returns {RunContext} - runContext
     */
    runGenerator: function(name, subs) {
        var deps = _.map(subs, function(sub) {
            return [helpers.createDummyGenerator(), sub];
        });
        var runGen = helpers
            .run(path.join(__dirname, '../' + name))
            //.inDir(path.join(os.tmpdir(), guid, 'temp-test'))
            //.inDir(path.join(os.tmpdir(), './temp-test'))
            .withGenerators(deps);
        return runGen;
    },

    /**
     * Instantiate a simple, dummy generator
     * @private
     * @param {Class} [baseClass] - The base class of the generator, defaults to require('yeoman-generator').base
     * @param {Object} [methods] - An object haskey of methods that should exist on the returned generator, default to a single 'test' method
     * @returns {Generator} - An instance of the generator
     */
    createGenerator: function(baseClass, methods) {
        baseClass = baseClass || generators.base;
        methods = methods || {
            test: function() {
                this.shouldRun = true;
            }
        };
        helpers.setUpTestDirectory(path.join(os.tmpdir(), './temp-test'));
        var env = this.env = generators();
        env.registerStub(baseClass.extend(methods), 'dummy');
        return env.create('dummy');
    },

    /**
     * Generate a 16 characters random string
     * @returns {String} - A 16 characters randome string
     */
    generateRandomString: function() {
        return Math.random().toString(36).slice(2);
    },
    /**
     * Set the options on the generator to allow scaffolding of the templates
     * @param {Generator} generator - The generator
     */
    setOptions: function(generator) {
        generator.ionic = true;
        generator.famous = true;
        generator.bootstrap = false;
        generator.ngCordova = true;
        generator.material = true;
        generator.ngModules = [];
        generator.skipRoute = false;
    }
};

module.exports = testHelper;