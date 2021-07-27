// vue Syntax Error: Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.
// Migration guide for end-users:
// At this time your postcss-pxtorem is the version of 6.xxx, because it is too high, so the emergence of this problem
// Need to reduce the version in package.json to 5.1.1 and npm -i reinstall.
// postcss配置文件：
module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 因为vant是基于375width编写的
    // 在接受处理css文件时先会来调用这个函数，以决定用什么比例来转换
    // 判断要处理的文件是否是vant.css，如果是则用37.5，否之75
    // indexOf查找字符串是否存在另一个字符串
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
