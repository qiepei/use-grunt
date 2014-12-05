module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ["build"]
            }
        },

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
        }

    });

    // 加载插件。
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean:build', 'concat:dist', 'uglify:buildall', 'jshint']);

};