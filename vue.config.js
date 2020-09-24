const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 动态获取jenkins中配置的域名，接口请求时用
const argArray = process.argv
let hostIndex = -1
hostIndex = argArray.indexOf('--chost')
if (hostIndex > -1) {
  const host = argArray[hostIndex + 1]
  process.env.VUE_APP_HOST = host
}

// 本地开发反向代理地址
// const DEV_HOST = 'http://10.122.61.224:8090' // 开发环境
const DEV_HOST = 'http://10.122.61.200:8090 ' // 测试环境

const IS_PROD = ['production'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
  },
  css: {
    modules: false, // 启用 CSS modules
    extract: IS_PROD, // 是否使用css分离插件
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {} // css预设器配置项
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '^/dev': {
        target: DEV_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
}
