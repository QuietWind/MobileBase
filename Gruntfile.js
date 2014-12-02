module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      all: {
        options: {
          port: 8080,
          hostname: "192.168.2.124",
          bases: ['.'],
          livereload: true
        }
      }
    },
    open: {
      all: {
        path: 'http://192.168.2.124:8080/index.html'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'build/js/**/*.js']
    },
    sass: {
      sassfile: {
        options: {
          style: 'expanded',
          debugInfo: false,
          lineNumbers: false,
          compass: true,
          require: 'susy'
        },
        expand: true,
        cwd: './build/sass/',
        src: ['*.scss'],
        dest: './css/',
        ext: '.css'
      }
    },
    jade: {
      indexfile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'index.html': 'build/view/index.jade'
        }
      },
      mainfile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'build/view',
          src: ['**/*.jade', '!index.jade', '!_partial'],
          dest: 'view',
          ext: '.html'
        }]
      }
    },
    watch: {
      all: {
        files: ['**/*.html', '**/*.css', '**/*.js'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['build/sass/**/*.scss'],
        tasks: ['sass']
      },
      jade: {
        files: ['build/view/**/*.jade'],
        tasks: ['jade']
      }
    },
    imagemin: {
      /* 压缩图片大小 */
      dist: {
        options: {
          optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'imgs/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        }]
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('imgmin', ['imagemin']);
  grunt.registerTask('default', ['jshint', 'sass', 'jade', 'watch']);
  grunt.registerTask('server', ['express', 'open', 'watch']);
};