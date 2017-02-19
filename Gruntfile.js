module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: ['*.js']
        },
        jsbeautifier: {
            files: ["*.js"],
            options: {}
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.registerTask("default", ["jshint", "jsbeautifier"]);
};
