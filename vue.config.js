module.exports = {
    // 生产环境 和 工作环境 区别对待
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}