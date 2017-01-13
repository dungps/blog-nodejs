'use strict';
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var jsFileList = [
		'assets/js/_*.js',
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			build: {
				files: {
					'assets/css/style.css': ['assets/less/main.less']
				},
				options: {
					compress: true,
				}
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [jsFileList],
				dest: 'assets/js/script.js',
			},
		},

		watch: {
			less: {
				files: [
					'assets/less/**'
				],
				tasks: ['less:build']
			},
			js: {
				files: [
					'assets/js/_*.js'
				],
				tasks: ['concat']
			},
			livereload: {
				options: {
					livereload: false
				},
				files: [
					'assets/css/**',
					'assets/js/**'
				]
			}
		},

		copy: {
			assets: {
				expand: true,
				cwd: 'assets/vendor/font-awesome/fonts/',
				src: ['**'],
				dest: 'assets/fonts/',
				filter: 'isFile'
			}
		}
	});

	// Register tasks
	grunt.registerTask('default', [
		'build'
	]);

	grunt.registerTask('build', [
		'copy:assets',
		'less',
		'concat'
	]);
};