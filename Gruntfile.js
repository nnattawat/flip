'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
	jshint: {
		options : {
			jshintrc : '.jshintrc'
		},
		all: [ 'src/<%= pkg.name %>.js' ]
	},
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        sourceMap: 'dist/jquery.<%= pkg.name %>.min.js.map',
		sourceMappingURL : 'jquery.<%= pkg.name %>.min.js.map',
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.src %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9000
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['connect', 'clean', 'jshint', 'concat', 'uglify']);
};
