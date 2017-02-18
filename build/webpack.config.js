var webpack = require('webpack');
var path = require('path');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname, '../');
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/app/client';
// 产出路径
var DIST_PATH = ROOT_PATH + '/app/client/dist';

//reload设置为false,
//js改动不刷新
//css改动刷新
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: {
        index: [ROOT_PATH + '/app/client/pages/blog/js/index.js', hotMiddlewareScript],
        lib: [
            'react', 'react-dom',hotMiddlewareScript
        ]
    },
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:5000/'
    },
    module: {
        // // 加载器配置
        // loaders: [{
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        // }, {
        //     test: /\.jsx$/,
        //     loader: 'babel-loader',
        //     query: {
        //         presets: ['react', 'es2015']
        //     }
        // }, {
        //     test: /\.scss$/,
        //     loader: 'style-loader!css-loader!sass-loader?sourceMap'
        // }]
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
    plugins: [
        //多页面应用，提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
