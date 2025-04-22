const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: '0.0.0.0', // 允许局域网访问
        port: 8001,       // 可自定义端口
        open: false,        // 自动打开浏览器（选填）
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {'^/api': ''}
            }
        }
    }
})