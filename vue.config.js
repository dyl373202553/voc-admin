const path = require("path");
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true,
    transpileDependencies: [],
    productionSourceMap: false,

    chainWebpack: config => {
        // config.resolve.symlinks(true);
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                extensions: [".ts", ".vue", ".json", ".js", ".tsx"],
                alias: {
                    vue$: "vue/dist/vue.js",
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@l": path.resolve(__dirname, "./src/lib"),
                    "@a": path.resolve(__dirname, "./src/api"),
                    "@s": path.resolve(__dirname, "./src/style"),
                    "@m": path.resolve(__dirname, "./src/mixin"),
                    "@d": path.resolve(__dirname, "./src/data"),
                    "@t": path.resolve(__dirname, "./src/types")
                }
            }
        });
    },
    css: {
        extract: false,
        sourceMap: false,
        loaderOptions: {
            less: { // 配置less（其他样式解析用法一致）
                javascriptEnabled: true // 设置为true
            }
        },
        requireModuleExtension: true
    },

    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
        open: process.platform === 'darwin',
        disableHostCheck: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // localhost/portal-gateway
        proxy: {
            "/vue-potal": {
                // 172.30.201.86
                // http://211.136.25.148:6080/ 
                // http://172.30.200.237/ 
                target: 'http://211.136.25.148:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/vue-potal': '/vue-potal'
                }
            },
            '/abc/': {
                target: 'http://211.136.25.148:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/abc/': '/abc/'
                }
            }
        },
        before: app => { }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, "./src/lib/css/common.less")
            ]
        }
    }
}
