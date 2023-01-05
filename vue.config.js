/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-11 09:55:40
 * @LastEditors: xiaohang xiaohang@diligrp.com
 * @LastEditTime: 2022-09-21 15:39:47
 * @FilePath: \elec-mu\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');

module.exports = {
  pages:{
    index: {
      entry: './src/frontViews/main.js'
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false
        },
        win: {
          target: 'nsis'
        },
        mac: {
          icon: './public/app.png'
        },
        productName: 'AppDemo'
      },
      mainProcessFile: './src/main/background.js'
    }
  },
  configureWebpack: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
      }],
    }]
  },
  css: {
    // css预设器配置项
    loaderOptions: {
        less: {
            modifyVars: {
                "primary-color": "#EC4141",
                "link-color": "#c62f2f",
                "border-radius-base": "4px",
            },
            javascriptEnabled: true,
        },
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    // open: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
  configureWebpack: {
    resolve:{
        alias: {
            '@':path.join(__dirname, './src/frontViews')
        }
    },
    module: {
      rules: [
        {
           test: /\.mjs$/,
           include: /node_modules/,
           type: "javascript/auto"
        }
      ]
    }
  }
}