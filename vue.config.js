const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
