'use strict';
var request = require('../../utils/request.js');

/**
 * 默认参数
 */
var defaultOpts = {
    startPage: 1, //默认从第一页开始
    pages: 10, //默认10页
    rate: 5, //默认并发查询5页
    url: false, //访问地址
    analyse: false,//分析方法
}

/**
 *  爬取列表
 *  options:
 *      pages: 0,//需要爬取多少页
 *      rate: 5, //频度，每次并发爬取多少
 *      url: url?page={{}} //使用作为分页占位符，以便替换
 */
function SeekList(options) {
    /**
     *  查询索引
     */
    this.options = Object.assign(defaultOpts, options);
    this.times = this.options.startPage; //开始页
    this.totalPage = this.options.pages + this.options.startPage - 1; //结束页
}

/**
 * 创建promise
 */
SeekList.prototype.createPromise = function(i) {
    //页数替换占位符
    var url = this.options.url.replace('{{}}', i);
    var options = {
        url: url,
        type: 'get'
    }
    //返回查询promise
    return new Promise(function(resolve, reject) {
        options.callback = function(data, _setCookie) {
            resolve(data);
        }
        request(options, null);
    });
}



/**
 *  递归的请求，每次并发的请求options.rate个
 */
SeekList.prototype.seek = function(callback) {
    var self = this;
    //并发查询页数
    var rate = self.options.rate;
    var promises = [];
    //创建rate个查询
    for(var i = 0; i < rate && self.times <= self.totalPage; i++) {
        promises.push(self.createPromise(self.times));
        self.times++;
    }


    var promise = Promise.all(promises);
    promise.then(function(result) {
        console.log("seekList totals:" + (self.times - self.options.startPage));
        //将爬取到的东西送去处理
        self.options.analyse && self.options.analyse(result);
        if (self.times <= self.totalPage) { //未爬完，递归的爬
            self.seek(callback);
        } else { //爬完了，执行回调
            callback && callback();
        }
    });
}


module.exports = SeekList;