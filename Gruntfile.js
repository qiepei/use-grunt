module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //用于清除build目录
        clean: {
            build: {
                src: ["build"]
            }
        },

        //用于合并js文件
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files:{
                    'build/index/index.js':'src/index/*.js',
                    'build/welcome/index.js':'src/welcome/*.js'
                }
            }
        },

        //用于压缩js文件
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildall: {
                files: [{
                    expand:true,
                    cwd:'build',//js目录下
                    ext:'-min.js',
                    src:'**/*.js',//所有js文件
                    dest: 'build/'//输出到此目录下
                }]
            }
        },

        //用于压缩css文件
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report:true
            },
            combine: {
                files: [{
                    expand:true,
                    cwd:'src',
                    ext:'-min.css',
                    src:'**/*.css',//所有css文件
                    dest: 'build/'//输出到此目录下
                }]
            }
        },

        //检查js的语法错误
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        //将src下面的html文件copy到build
        copy: {
            main: {
                expand:true,
                cwd:'src',
                src: '**/*.html',
                dest: 'build/'
            }
        },

        connect: {
            server: {
                options: {
                    port: 9090,
                    base: 'build',
                    hostname: '*',
                    keepalive:true
                }
            }
        }

    });

    // 加载插件。
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean:build', 'concat:dist', 'uglify:buildall', 'jshint', 'cssmin:combine','copy:main']);

};