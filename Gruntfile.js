module.exports = function(grunt) {

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'js/grid.js': 'src/grid.es6',
                    'js/algorithms.js': 'src/algorithms.es6',
                    'js/app.js': 'src/app.es6'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['babel']);

};