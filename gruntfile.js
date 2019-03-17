// module.exports = function (grunt) {
//   // Project configuration.
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),

//     // ts: {
//     //   default: {
//     //     tsconfig: './tsconfig.json'
//     //   },
//     //   options: {
//     //     fast: 'never' // You'll need to recompile all the files each time for NodeJS
//     //   }
//     // },
//     run: {
//       'build-ts': {
//         cmd: 'npm.cmd',
//         args: [
//           'run',
//           'build'
//         ]
//       },
//       'test-mocha': {
//         cmd: 'npm.cmd',
//         args: [
//           'run',
//           'test-mocha'
//         ]
//       },
//       publish: {
//         cmd: 'npm.cmd',
//         args: [
//           'run',
//           'npm-publish'
//         ]
//       },
//       ghpages: {
//         cmd: 'npm.cmd',
//         args: [
//           'run',
//           'gh-pages'
//         ]
//       }

//     },

//     copy: {
//       assets: {
//         cwd: 'src',
//         // These are the directories to be copied as-is.
//         // These must also be specified below in the watch block.
//         src: ['assets/**'],
//         dest: 'generators',
//         expand: true
//       },
//       templates: {
//         cwd: 'src',
//         // These are the directories to be copied as-is.
//         // These must also be specified below in the watch block.
//         src: ['**/templates/**'],
//         dest: 'generators',
//         expand: true
//       }
//     },

//     clean: ['generators']

//   });

//   grunt.loadNpmTasks("grunt-ts");
//   grunt.loadNpmTasks("grunt-contrib-clean");
//   grunt.loadNpmTasks('grunt-contrib-copy');
//   grunt.loadNpmTasks('grunt-run');

//   // grunt.registerTask("test-mocha", ["run:test-mocha"]);

//   // Default tasks.
//   grunt.registerTask("copy-templates", "copy:templates");
//   grunt.registerTask("build", ["clean", "copy", "run:build-ts"]);
//   // grunt.registerTask("pre-publish", ["clean", "ts", "run:test-mocha", "tslint:all", "copy:assets"]);
//   // grunt.registerTask("publish", ["pre-publish", "run:ghpages", "run:publish"]);
// };