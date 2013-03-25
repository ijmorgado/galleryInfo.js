var semver = require('semver'),
    f = require('util').format,
    jsFiles = [
      'src/version.js',
      'src/backdrop_view.js',
      'src/galleryInfo.js'
    ];

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * galleryInfo.js <%= version %>',
      ' * https://github.com/ijmorgado/galleryInfo',
      ' */\n\n'
    ].join('\n'),

    concat: {
      js: {
        src: ['src/intro.js', jsFiles, 'src/outro.js'],
        dest: '<%= buildDir %>/galleryInfo.js'
      },
      jsmin: {
        src: ['src/intro.js', jsFiles, 'src/outro.js'],
        dest: '<%= buildDir %>/galleryInfo.min.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        path: ['<%= concat.js.dest %>', '<%= concat.jsmin.dest %>']
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: '<%= concat.js.dest %>',
        dest: '<%= concat.js.dest %>'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: '<%= concat.jsmin.dest %>',
        dest: '<%= concat.jsmin.dest %>'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: jsFiles,
      tests: ['test/*.js'],
      gruntfile: ['Gruntfile.js']
    },

    watch: {
      js: {
        files: jsFiles,
        tasks: 'build:js'
      }
    },

    clean: {
      dist: 'dist'
    }
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['concat:js', 'concat:jsmin', 'sed:version', 'uglify']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
};
