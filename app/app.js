'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../build/webpack.config.js');
var reload = require('reload');


var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'client/dist')));


// webpack编译器
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    // hot: true,
    // inline: true,
    stats: {
        colors: true,
        // cached: false,
    }
}));

app.use(webpackHotMiddleware(compiler));


// get
app.get('/', function(req, res) {
    res.render('view', {
        slug: 'index.bundle.js'
    });
});


// 创建应用服务器
var server = http.createServer(app);

reload(server, app);

server.listen('5000', '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.log('启动成功');
});




