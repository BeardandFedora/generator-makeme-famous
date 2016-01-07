'use strict';

module.exports = function() {

    var constants = {
        repository: 'https://github.com/giftstarter/generator-makeme-famous',
        versionFiles: ['./package.json', './bower.json'],
        lint: ['./app/**/*.js', './class/**/*.js', './module/**/*.js', './service/**/*.js', 'filter/**/*.js', 'constant/**/*.js', 'value/**/*.js', 'directive/**/*.js', 'remove/**/*.js', 'require/**/*.js', 'target/**/*.js', 'gulpfile.js', 'gulp_tasks/**/*.js', 'karam.conf.js', 'test/**/*.js', 'utils.js', './*.js'],
        mocha: {
            libs: ['app/**/*.js', 'class/**/*.js', 'module/**/*.js', 'controller/**/*.js', 'service/**/*.js', 'filter/**/*.js', 'constant/**/*.js', 'value/**/*.js', 'directive/**/*.js', 'require/**/*.js', 'target/**/*.js'],
            tests: ['test/**/*.test.js'],
            globals: 'test/helpers/globals.js',
            timeout: 5000
        }
    };

    return constants;
};
