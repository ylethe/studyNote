/**
 * Created by yjf on 2017/8/3.
 */

/* webpack 服务文件 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //将css独立引入变成link标签形式
const autoprefixer = require('autoprefixer');  //自动补全CSS3前缀
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 自动生成html插件
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开页面

module.exports = {
    entry: {
        app: ['./index.js', './main.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/assets'
    },
    devServer: {
        inline: true,
        port: 8090
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 图片大小小于40000时，会自动启用base64编码图片
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: "url-loader?limit=40000"
                }]
            }

        ]
    },
    plugins: [
        // 输出的文件头部添加注释信息
        new webpack.BannerPlugin('This file is created by mutouren'),

        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({minimize: true}),

        // 把公共模块提取出来, 并取名为'common'(名字自起), webpack之后再out文件夹下生成common.js, 测试时记得引入提取出来的公共模块js文件
        new webpack.optimize.CommonsChunkPlugin('common'),

        // 引入jquery
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),

        new ExtractTextPlugin('[name]-[hash:3].css'),   //css随机数

        new webpack.HotModuleReplacementPlugin(),   //热加载插件

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin(),   // 会在dist目录下自动生成一个index.html
        new OpenBrowserPlugin({ url: 'http://localhost:8090' })
    ],
    // 别名，待打包的脚本中的 require('jquery'); 其实就等价于 require('./scripts/jquery.min.js')；
    resolve: {
        alias: {
            jquery: "./scripts/jquery.min.js"
        }
    }
};
