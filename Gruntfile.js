/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n',

    watch: {
      karma: {
        files: ['src/**/*.coffee', 'sample/**/*', 'test/spec/**/*.coffee'],
        tasks: ['coffee:dist', 'karma:unit'],
        options: {
          livereload: true
        }
      },
      coffee: {
        files: ['src/**/*.coffee', 'sample/**/*'],
        tasks: ['coffee:dist'],
        options: {
          livereload: true
        }
      },
    },

    connect: {
      server: {
        options: {
          port: 9000
        }
      }
    },

    // Task configuration.
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      },
      build: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.coffee',
          dest: 'build/',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'gzip'
      },
      build: {
        src: 'build/ng-smoothscroll.js',
        dest: 'build/ng-smoothscroll.min.js'
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        framework: "mocha",
        coverageReporter: {
          type: 'text',
          dir: 'coverage/'
        }
      },
      watch: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        reporters: ['progress']  // Don't display coverage
      }
    },

    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: 'Gruntfile.js'
      },
      built: {
        src: ['build/*.js']
      }
    },

    coffeelint: {
      app: ['./src/**/*.coffee'],
      options: {
        configFile: 'coffeelint.json'
      }
    },

    concat: {
      build: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'build/ng-smoothscroll.js':  'src/ng-smoothscroll.js',
        }
      }
    },

    clean: {
      server: '.tmp'
    }

  });

  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', [
    'clean',
    'connect:server',
    'coffee:dist',
    'watch'
  ]);

  grunt.registerTask('default', ['coffeelint', 'coffee:build', 'karma:unit', 'uglify']);
  grunt.registerTask('test', ['coffee:dist', 'karma:unit']);
  grunt.registerTask('build', ['default']);

};