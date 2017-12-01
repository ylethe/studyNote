/**
 * Created by yjf on 2017/8/3.
 */
/* webpack 服务文件 */
const webpack = require('webpack');
const config = require('./webpack.config');
const webpackDevServer = require('webpack-dev-server');

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8090/");

const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});
server.listen(8090);
