'use strict';

module.exports = function(grunt)
{
	// Time how long tasks take. can help when optimizing build tasks
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, { useminPrepare: 'grunt-usemin' }); // useminPrepare task depends on the usemin package

	// Define the configuration for all the tasks
	grunt.initConfig(
	{
		sass:
		{
			dist:
			{
				files:
				{
					'css/style.css': 'css/style.scss'
				}
			}
		},

		watch:
		{
			files: 'css/*.scss',
			tasks: ['sass']
		},
		browserSync:
		{
			dev:
			{
				bsFiles:
				{
					src:
					[
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},

				options:
				{
					watchTask: true,
					server:
					{
						baseDir: "./"
					}
				}
			}
		},

		copy:
		{
			html:
			{
				files:
				[{
					// for html
					expand: true,
					dot: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist'
				}]
			},

			fonts:
			{
				files:
				[{
					// for font-awesome
					expand: true,
					dot: true,
					cwd: 'node_modules/font-awesome',
					src: ['fonts/*.*'],
					dest: 'dist'	
				}]
			}
		},

		clean:
		{
			build:
			{
				src: ['dist/']
			}
		},

		imagemin:
		{
			dynamic:
			{
				files:
				[{
					expand: true,
					cwd: './',
					src: ['img/*.{png,jpg,jpeg,gif}'],
					dest: 'dist'
				}]
			}
		},

		useminPrepare:
		{
			foo:
			{
				dest: 'dist',
				src: ['index.html', 'aboutus.html', 'contactus.html']
			},
			
			options:
			{
				flow:
				{
					steps:
					{
						css: ['cssmin'],
						js: ['uglify']
					},

					post:
					{
						css:
						[{
							name: 'cssmin',
							createConfig: function(context, block)
							{
								var generated = context.options.generated;
								generated.options = 
								{
									keepSpecialComments: 0, rebase: false
								};
							}
						}]
					}
				}
			}
		},

		// Concat
		concat:
		{
			options:
			{
				separator: ';'
			},

			// dist configuration is provided by useminPrepare
			dist: {}
		},

		// Uglify
		uglify:
		{
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		// cssmin
		cssmin:
		{
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		// filerev 
		filerev:
		{
			options:
			{
				encoding: 'utf-8',
				algorithm: 'md5',
				length: 20
			},

			release:
			{
				// filerev:release hashes(md5) all assets (images, js and css ) in dist directory
				files:
				[{
					src:
					[
						'dist/js/*.js',
						'dist/css/*.css'
					]
				}]
			}
		},

		// Usemin
        // Replaces all assets with their revived version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin:
        {
        	html:
        	[
        		'dist/index.html', 'dist/aboutus.html', 'dist/contactus.html'
        	],
        	options:
        	{
        		assetDirs: ['dist', 'dist/css', 'dist/js']
        	}
        },

        // Task
        htmlmin:
        {
        	// Target
        	dist:
        	{
        		options:
        		{
        			collapseWhitespace: true
        		},

        		// Dictionary of Files
        		files:
        		{
        			// 'Destination' : 'Source'
        			'dist/index.html': 'dist/index.html',
        			'dist/aboutus.html': 'dist/aboutus.html',
        			'dist/contactus.html': 'dist/contactus.html'
        		}
        	}
        }

	});

	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
}