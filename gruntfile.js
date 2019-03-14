module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ts: {
      default: {
        tsconfig: './tsconfig.json'
      },
      options: {
        fast: 'never' // You'll need to recompile all the files each time for NodeJS
      }
    },

    copy: {
      assets: {
        cwd: 'src',
        // These are the directories to be copied as-is.
        // These must also be specified below in the watch block.
        src: ['assets/**'],
        dest: 'generators',
        expand: true
      }
    },

    clean: ['generators']

  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');

  // grunt.registerTask("test-mocha", ["run:test-mocha"]);

  // Default tasks.
  grunt.registerTask("build", ["clean", "ts"]);
  // grunt.registerTask("pre-publish", ["clean", "ts", "run:test-mocha", "tslint:all", "copy:assets"]);
  // grunt.registerTask("publish", ["pre-publish", "run:ghpages", "run:publish"]);
};