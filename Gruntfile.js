'use strict';
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var jsFileList = [
		'assets/vendor/jquery/dist/jquery.js',
		'assets/vendor/bootstrap/js/tooltip.js',
		'assets/vendor/bootstrap/js/affix.js',
		'assets/vendor/bootstrap/js/alert.js',
		'assets/vendor/bootstrap/js/button.js',
		'assets/vendor/bootstrap/js/carousel.js',
		'assets/vendor/bootstrap/js/collapse.js',
		'assets/vendor/bootstrap/js/dropdown.js',
		'assets/vendor/bootstrap/js/modal.js',
		'assets/vendor/bootstrap/js/popover.js',
		'assets/vendor/bootstrap/js/scrollspy.js',
		'assets/vendor/bootstrap/js/tab.js',
		'assets/vendor/bootstrap/js/transition.js',
		'assets/js/_*.js'
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
			main: {
				files: [
					{
						expand: true,
						cwd: 'assets/vendor/font-awesome/fonts/',
						src: ['**'],
						dest: 'assets/fonts/',
						filter: 'isFile'
					}
				]
			}
		}
	});

	// Register tasks
	grunt.registerTask('default', [
		'build'
	]);

	grunt.registerTask('build', [
		'copy:main',
		'less',
		'concat'
	]);
};