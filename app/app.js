'use strict';

var express = require('express');
var path = require('path');
var http = require('http');


var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'client/dist')));

// get
app.get('/', function(req, res) {
    res.render('view', {
        slug: 'index.bundle.js'
    });
});


// 创建应用服务器
var server = http.createServer(app);

server.listen('5000', '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.log('启动成功');
});