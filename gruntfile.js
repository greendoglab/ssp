module.exports = function(grunt) {

    grunt.initConfig({

        stylus: {
            compile: {
                files: {
                    'static/src/css/style.css' : 'static/src/styl/style.styl'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'static/src/css/style.css',
                dest: 'static/production/css/'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'static/production/images/'
                }]
            }
        },

        concat: {
            dist: {
                src: [
                    'static/js/jquery-2.0.3.js',
                    'func.js'
                ],
                dest: 'static/production/js/production.js'
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                }
            },
            stylus: {
                files: 'static/src/styl/**',
                tasks: ['stylus', 'autoprefixer']
            },
            autoprefixer: {
                files: 'static/src/css/**',
                tasks: ['autoprefixer']
            },
            images: {
                files: ['static/src/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
            }
        },

        connect: {
            server: {
                post: 8000,
                base: './'
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', ['imagemin', 'concat', 'stylus', 'autoprefixer']);
    grunt.registerTask('run', ['connect', 'imagemin', 'concat', 'stylus', 'autoprefixer', 'watch']);
    grunt.registerTask('default', ['run'])

};