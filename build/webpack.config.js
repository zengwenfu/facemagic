var webpack = require('webpack');
var path = require('path');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname, '../');
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/app/client';
// 产出路径
var DIST_PATH = ROOT_PATH + '/app/client/dist';
// 环境变量
var env = process.env.NODE_ENV;
// 根据版本号来发布前端js版本
const VERSION = require('../package.json').version;


//reload设置为false,
//js改动不刷新
//css改动刷新
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

/**
 *  实体配置
 */
var entryMap = {
    'index/index': [ROOT_PATH + '/app/client/pages/index/index.js'],
    'lib': ['react', 'react-dom']
}

// 开发环境 增加热更新配置
if(env === 'dev') {
    for(var key in entryMap) {
        entryMap[key].push(hotMiddlewareScript);
    }
}

/**
 *  插件配置
 */
var plugins = [
    //多页面应用，提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
        names: ['lib']
    }),
    new webpack.NoEmitOnErrorsPlugin()
];

// 开发环境 增加热更新配置
if(env === 'dev') {
    plugins.push(new webpack.HotModuleReplacementPlugin())
} else { //否则压缩css、js
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        //这个插件是为react启动生产环境模式，避免警告信息
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        })
    ]);
}


module.exports = {
    entry: entryMap,
    output: {
        path: DIST_PATH + '/' + VERSION,
        filename: '[name].bundle.js',
        publicPath: process.host
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.js$/,
                loader: 'babel-loader'
            }, {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: plugins
}
