
'use strict';

module.exports = function(grunt) {

  // Load Grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);


  grunt.initConfig({
    config: {
      src: 'app',
      dist: 'dist'
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: ['<%= config.src %>/scripts/**/*.jsx'],
        dest: '<%= config.src %>/scripts/bundle.js'
      }
    },

    watch: {
      js: {
        files: ['<%= config.src %>/{,**/}*.js'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      react: {
        files: '<%= config.src %>/scripts/**/*.jsx',
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload %>'
        },
        files: [
          '<%= config.src %>/**/*.html',
          '<%= config.src %>/**/*.js',
          '.tmp/stylesheets/{,*/}*.css',
          '<%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= config.src %>'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/javascripts/{,**/}*.js'
      ],
    },

  });

  grunt.registerTask('serve', function (target) {
    var tasks = {
      'default': [
        'browserify',
        'connect:livereload',
        'watch'
      ]
    };

    if (tasks[target]) {
      grunt.task.run(tasks[target]);
    }
    else {
      grunt.task.run(tasks.default);
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'browserify',
  ]);
};
