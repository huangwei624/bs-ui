const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpack = require('webpack')

module.exports = {

    //入口， 需要webpack解析的 js 文件
    entry: './src/main.js',

    //出口， webpack 解析 js 文件后，生成的目标文件的位置
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [ // 配置所有需要的插件
        new HtmlWebpackPlugin({ // 在内存中生成一个 html 页面
            template: path.resolve(__dirname, './src/index.html'), // 这是模板页面的路径位置
            filename: 'index.html' // 内存中页面的名称
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
        })
    ],

    module: { // 配置所有需要的第三方模块 加载器 如, style-loader 、 css-loader 
        rules: [ // 匹配第三方模块加载器 规则
            {
                test: /\.css$/, // 匹配的文件 是以 .css 结尾的文件
                use: ['style-loader', 'css-loader'] // 解析这类文件需要 这两个加载器
            },
            {
                test: /\.scss$/, // 匹配的文件 是以 .scss 结尾的文件
                use: ['style-loader', 'css-loader', 'sass-loader'] // 解析这类文件需要 这三个加载器
            },
            { // 配置 url 加载器
                test: /\.(jpg|png|gif|jpeg)$/, // 匹配的文件 是以 .jpg, .png, .gif, .jpeg 结尾的图片文件
                /* use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 限制文件大小
                        name: '[name].[ext]', // 保持和原文件名称一致

                    }
                }] // 解析这类文件需要 这两个加载器 */

                // name 属性 中的[hash] 表示使用文件名称hash值 , [name] 表示图片的名称， [ext] 表示文件后缀
                use: 'url-loader?limit=20000&name=[hash]-[name].[ext]'
            },
            { // 处理字体加载器
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'url-loader'
            },
            { // 处理 .vue 文件夹 的loader 
                test: /\.vue$/,
                use: 'vue-loader'
            },
            { // 添加支持es6的loader
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    mode: 'development',
    // mode: 'production',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js' // 修改vue导入时包的路径
        }
    },
    externals: {
        'jquery': 'jQuery',
        'bootstrap': 'bootstrap',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vue-resource': 'VueResource',
        'element-ui': 'ELEMENT',
        'vuex': 'Vuex',
        'mint-ui': 'mint-ui',
        'stompjs': 'Stomp',
    },
    devServer: { disableHostCheck: true },
    node:{
        net: "empty"
    }
}