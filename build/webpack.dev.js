/**
 * node webpack.dev.js
 *        --hot         开启热更新
 *        --uglify      压缩 
 *        --deploy      发布到测试环境，只发送 html 页面到服务器，js, css, img 等静态资源还是使用本地的，
 *        这样就可以在访问测试机时也可以照常使用热替换、自动刷新功能。
 *
 * NODE_ENV=development node build/webpack.dev.js --hot
 * NODE_ENV=development node build/webpack.dev.js --hot --deploy
 * NODE_ENV=production node build/webpack.dev.js --uglify
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


function getIP() {
    var os = require('os');
    var IPv4 = '127.0.0.1';
    var interfaces = os.networkInterfaces();
    for (var key in interfaces) {
        interfaces[key].some(function(details) {
            if (details.family == 'IPv4' && key == 'en0') {
                IPv4 = details.address;
                return true;
            }
        });
    }
    return IPv4;
}


var PORT = 5000;
var HOST = getIP();

// new WebpackDevServer(webpack(config), {
//     hot: false,
//     inline: true,
//     compress: true,
//     stats: {
//         chunks: false,
//         children: false,
//         colors: true
//     },
//     // Set this as true if you want to access dev server from arbitrary url.
//     // This is handy if you are using a html5 router.
//     historyApiFallback: true,
// }).listen(PORT, HOST, function() {
//     console.log('ok');
// });

webpack(config).run(function() {
  console.log('ok');
});
