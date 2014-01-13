module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({
    
        //pkg: grunt.file.readJSON("package.json"),
        
        clean: {
            build: ["app/dist"]
        },
        
        // Lint the Javascript, exclude the vendor folder
        jshint: {
            all: [
                "Gruntfile.js",
                "app/js/**.js",
                "!app/js/all_body.min.js",
                "!app/js/vendor/**.js"
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    window: false,
                    console: false,
                    document: false,
                    setTimeout: false,
                    config: true,
                    // Grunt globals
                    module: false,
                    
                    // Vendor globals may not be redefined
                    jQuery: false,
                    $: false
                }
            }
        },
        
        // Combine and compress JS
        // Just put files that needs to go in head there manually. 
        // Put files that can go in the bottom of body here.
        uglify: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
            },
            body_js: {
                files: {
                    "app/dist/js/all_body.min.js": [
                        "app/js/vendor/bootstrap.min.js",
                        "app/js/vendor/holder.js",
                        "app/js/config.js",
                        "app/js/main.js"
                    ]
                }
            }
        },
       
        copy: {
            main: {
                files: [

                    // copy vendor js files, excluding already compiled ones.
                    {expand: true, cwd:'app/', dest:'app/dist/', src: ['js/vendor/*','!js/vendor/holder.js','!js/vendor/bootstrap.min.js'], filter: 'isFile'},

                    // copy all html files
                    {expand: true, cwd:'app/', dest:'app/dist/', src: ['*.html','.htaccess'], filter: 'isFile'},

                    // copy necessary folders
                    {expand: true, cwd:'app/', dest:'app/dist/', src: ['fonts/**','media/**'], filter: 'isFile'},

                ]
            }
        },
        
        
        // Compress CSS
        cssmin: {
            combine: {
              files: {
                'app/dist/css/all_app.min.css': ['app/css/bootstrap-3.0.3.css','app/css/main.css', 'app/css/navbar.css','app/css/colors.css']
              }
            }
        },
        
        watch: {
            css: {
                files: [
                    "app/css/*.css",
                    "!app/css/all_app.min.css"
                ],
                tasks: ["cssmin"],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    "Gruntfile.js",
                    "app/js/**.js",
                    "!app/js/vendor/**.js",
                    "!app/js/all_body.min.js"
                ],
                tasks: ["uglify"],
                options: {
                    livereload: true
                }
            },
            other: {
                files: [
                    "app/index.html",
                    "app/media/*",
                    "app/media/images/*",
                    "app/media/images/carousel/*"
                ],
                options: {
                    livereload: true
                }
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'jardineriajoseba.tuars.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'app/dist',
                dest: '/public_html/test',
                exclusions: ['app/**/.DS_Store', 'app/**/Thumbs.db']
            }
        },
        ftpush: {
            build: {
                auth: {
                    host: 'jardineriajoseba.tuars.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'app/dist',
                dest: '/public_html/test',
                exclusions: ['app/**/.DS_Store', 'app/**/Thumbs.db'],
                keep: [],
                simple: false,
                useList: false
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-ftpush');

    // TASKS
    
    // Use this during development
    grunt.registerTask("default", [ "uglify", "cssmin", "copy"]);

    
    //Deploy to server. 
    grunt.registerTask("deploy", ["clean", "default","ftpush"]);
    //grunt.registerTask("deploy", ["default","ftp-deploy"]);

    // Use this to jshint all files
    // grunt jshint
    
    // Use this to delete all autogenerated files
    // grunt clean
    
    
};