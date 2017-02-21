'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../build/webpack.config.js');
var reload = require('reload');
// 启动babel转码（解析.babelrc）
require('babel-register');
var indexRouter = require('./routers/index.js');

// 环境变量
var env = process.env.NODE_ENV;
env = env == null ? 'prd' : env;

// 域名配置
var host = {
    dev: 'http://localhost:5000',
    prd: 'http://localhost:5000'
};

process.host = host[env];


// 启动express对象
var app = express();
//配置路由
app.use('/', indexRouter);

/**
 *  开发环境
 *      1. 启动热更新插件监听client端css、js变更
 *      2. 通过supervisor监听sever端变更并重启，reload在server端重启阶段刷新前端界面
 */
if(env === 'dev') {
    // webpack编译器
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        hot: true,
        inline: true,
        stats: {
            colors: true,
            cached: false,
        }
    }));

    app.use(webpackHotMiddleware(compiler));

    // 创建应用服务器
    var server = http.createServer(app);

    // 服务器重启，刷新前端界面(暂时先不启动了，太费内存了)
    // reload(server, app);

    server.listen('5000', '0.0.0.0', function onStart(err) {
        if (err) {
            console.log(err);
        }
        console.log('启动成功');
    });
} else { //开发环境，配置static目录，启动服务器
    app.use(express.static(path.join(__dirname, 'client/dist')));

    //webpack编译，编译完成启动服务
    webpack(config, function() {
        console.log('编译完成，开始启动node服务');
        // 创建应用服务器
        var server = http.createServer(app);

        server.listen('5000', '0.0.0.0', function onStart(err) {
            if (err) {
                console.log(err);
            }
            console.log('启动成功');
        });
    });
    
}










