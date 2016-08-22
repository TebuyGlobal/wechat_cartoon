var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'deploy.tar.gz',
          mode: 'tgz'
        },
        files: [
          { src: ['ch_iframe.html',
                  'chb.html',
                  'ds_iframe.html',
                  'dsz.html',
                  'index.html',
                  'tc_iframe.html',
                  'tcb.html',
                  'css/**',
                  'flash/**',
                  'images/**',
                  'js/**'],
            'dest': 'cartoon/'
          }
        ]
      },
      build: {
        options: {
          archive: 'deploy.tgz',
          mode: 'tgz'
        },
        files: [
          { src: ['bower_components/**',
                  'config/**',
                  'libs/**',
                  'middleware/**',
                  'public/**',
                  'routes/**',
                  'templates/**',
                  'app.js',
                  'package.json'],
            'dest': 'ecv2_web/',
            cwd: 'build/',
            expand: true
          }
        ]
      }
    },
    sftp: {
      main: {
        files: {
          './': 'deploy.tar.gz'
        },
        options: {
          path: '/root',
          host: '139.129.109.72',
          username: 'root',
          password: 'tb!@#$qwer',
          showProgress: true
        }
      },
      build: {
        files: {
          './': 'deploy.tgz'
        },
        options: {
          path: '/root',
          host: '139.129.109.72',
          username: 'root',
          password: 'tb!@#$qwer',
          showProgress: true
        }
      }
    },
    sshexec: {
      main: {
        command: 'cd /root && tar xvfz deploy.tar.gz',
        options: {
          host: '139.129.109.72',
          username: 'root',
          password: 'tb!@#$qwer'
        }
      },
      clean: {
        command: 'cd /root && rm -rf deploy.tar.gz',
        options: {
          host: '139.129.109.72',
          username: 'root',
          password: 'tb!@#$qwer'
        }
      }
    },
    clean: ['deploy.tar.gz'],
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'build/public/javascript/script.js': ['public/javascript/script.js'],
          'build/public/javascript/enc.js': ['public/javascript/enc.js'],
          'build/public/javascript/jquery.bxslider.js': ['public/javascript/jquery.bxslider.js']
        }
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/templates/account.html': 'templates/account.html',
          'build/templates/address.html': 'templates/address.html',
          'build/templates/bonus.html': 'templates/bonus.html',
          'build/templates/brand.html': 'templates/brand.html',
          'build/templates/browsehistory.html': 'templates/browsehistory.html',
          'build/templates/cart.html': 'templates/cart.html',
          'build/templates/categories.html': 'templates/categories.html',
          'build/templates/category.html': 'templates/category.html',
          'build/templates/consignee.html': 'templates/consignee.html',
          'build/templates/editpassword.html': 'templates/editpassword.html',
          'build/templates/editphonenumber.html': 'templates/editphonenumber.html',
          'build/templates/faq.html': 'templates/faq.html',
          'build/templates/index.html': 'templates/index.html',
          'build/templates/login.html': 'templates/login.html',
          'build/templates/main.html': 'templates/main.html',
          'build/templates/member.html': 'templates/member.html',
          'build/templates/membersetting.html': 'templates/membersetting.html',
          'build/templates/myBonus.html': 'templates/myBonus.html',
          'build/templates/myBrands.html': 'templates/myBrands.html',
          'build/templates/myCoupon.html': 'templates/myCoupon.html',
          'build/templates/myorder.html': 'templates/myorder.html',
          'build/templates/myProducts.html': 'templates/myProducts.html',
          'build/templates/myrefund.html': 'templates/myrefund.html',
          'build/templates/order.html': 'templates/order.html',
          'build/templates/order_state.html': 'templates/order_state.html',
          'build/templates/payment.html': 'templates/payment.html',
          'build/templates/product.html': 'templates/product.html',
          'build/templates/productDetail.html': 'templates/productDetail.html',
          'build/templates/register.html': 'templates/register.html',
          'build/templates/resetpassword.html': 'templates/resetpassword.html',
          'build/templates/return.html': 'templates/return.html',
          'build/templates/search.html': 'templates/search.html',
          'build/templates/searchResult.html': 'templates/searchResult.html',
          'build/templates/starProduct.html': 'templates/starProduct.html',
          'build/templates/test.html': 'templates/test.html'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['public/stylesheet/*.css'],
          dest: 'build',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['public/**'], dest: 'build/'},
          {expand: true, src: ['bower_components/**'], dest: 'build/'},
          {expand: true, src: ['routes/**'], dest: 'build/'},
          {expand: true, src: ['libs/**'], dest: 'build/'},
          {expand: true, src: ['middleware/**'], dest: 'build/'},
          {expand: true, src: ['config/**'], dest: 'build/'},
          {expand: true, src: ['app.js', 'package.json'], dest: 'build/'},
        ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('deploy', ['compress:main',
                                'sftp:main',
                                'sshexec:main',
                                'sshexec:clean',
                                'clean']);

  grunt.registerTask('build', ['copy',
                               'uglify',
                               'htmlmin:build',
                               'cssmin',
                               'compress:build',
                               'sftp:build']);

};
