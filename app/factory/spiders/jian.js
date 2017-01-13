'use strict';

var Seek = require('../tools/seekList.js');
var cheerio = require('cheerio');
var fs = require('fs');
var dateUtil = require('../../utils/dateUtil.js');

// 结果数组
var listArray = [];
// 以url为key值的对象，用于去重
var urlObj = {};
// 简书域名
var jianHome = 'http://www.jianshu.com';

// 检索文章总数
var articleCount = 0;

// 专题列表
var topics = [
    'http://www.jianshu.com/c/f489ec955505?order_by=added_at&page={{}}', //web前端之路
    'http://www.jianshu.com/c/c261fa3879d6?order_by=added_at&page={{}}', //让前端飞
    'http://www.jianshu.com/c/cb4ec9ef5cd8?order_by=added_at&page={{}}', //前端开发
    'http://www.jianshu.com/c/0020d95b7928?order_by=added_at&page={{}}', //前端开发之路
    'http://www.jianshu.com/c/4f96d8bcb372?order_by=added_at&page={{}}'//菲麦前端
];

// 专题索引
var topicsIndex = 0;
var lastWeekStartDate = false;
var lastWeekEndDate = false;
// 爬到比上周更早的日期的时候停止爬取
var seekFlag = true;

/**
 *  净化text
 */
function cleanText(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/ /ig, ''); //去掉 
    str = str.replace(/^[\s　]+|[\s　]+$/g, ""); //去掉全角半角空格
    str = str.replace(/[\r\n]/g, ""); //去掉回车换行
    return str;
}

/**
 *  二分插入排序
 */
function sortInsert(low, high, obj) {
    // 高标和低标相邻，那是它了，没差
    var objScore = parseInt(obj.likeCount);
    if (high <= low) {
        var lowScore = parseInt(listArray[low].likeCount);
        if (objScore < lowScore) { //大于插入后面
            listArray.splice(low + 1, 0, obj);
        } else { //小于插入前面
            listArray.splice(low, 0, obj);
        }
        return;
    }


    var mid = parseInt((high - low) / 2) + low;
    var midObj = listArray[mid];
    var midScore = parseInt(midObj.likeCount);



    if (midScore === objScore) { //刚好中标了
        listArray.splice(mid, 0, obj);
        return;
    } else if (objScore > midScore) { //没有中标接着折半
        sortInsert(low, mid - 1, obj);
    } else { //没有中标接着折半
        sortInsert(mid + 1, high, obj);
    }
}


/**
 * 分析处理数据
 */
function analyse(result) {

    var $ = false;
    /**
     *  使用es6新语法for of 进行遍历
     */
    for (var data of result) {
        $ = cheerio.load(data);
        $('.note-list li').each(function() {
            articleCount++;
            var content = $(this).find('.content');
            var author = content.find('.author .name a').text();
            var publicTime = content.find('.author .name .time').attr('data-shared-at');

            //判断日期是否是上周
            var publicDate = dateUtil.format(new Date(publicTime), 'yyyy/MM/dd');
            if (publicDate < lastWeekStartDate || publicDate > lastWeekEndDate) {
                if (publicDate < lastWeekStartDate) { //爬到比上周更早的日期了，意味着不需要再爬了
                    seekFlag = false;
                    // return; 
                    // 这里不return的原因是，文章是按照专题收录时间排序的
                    // 不是按照发布时间排序的（虽然可以认为基本一致）
                    // 然而我们按照发布时间来判断是否已经遇到上周之前的文章
                    // 让此页继续遍历，尽量减少误差
                }
            } else {
                publicTime = dateUtil.format(new Date(publicTime), 'yyyy/MM/dd hh:mm:ss');
                var title = content.find('a.title').text();
                var link = content.find('a.title').attr('href');
                var readCount = content.find('.meta a').eq(0).text();
                var commentCount = content.find('.meta a').eq(1).text();
                var likeCount = content.find('.meta a').eq(2).text();
                var disc = content.find('.abstract').text();
                
                var item = {
                    author: author,
                    publicTime: publicTime,
                    title: title,
                    link: jianHome + link,
                    readCount: cleanText(readCount),
                    commentCount: cleanText(commentCount),
                    likeCount: parseInt(cleanText(likeCount)),
                    disc: cleanText(disc)
                };

                if(item.likeCount < 10) {
                    //喜欢数少于10，就不考虑收录了
                } else if (listArray.length === 0) {
                    urlObj[link] = 1; //去重标志
                    listArray.push(item);
                } else if(!urlObj[link]){ //去重
                    if(!listArray[9] || listArray[9].likeCount <= item.likeCount) { //如果本身小于第10位的，就不用插入
                        urlObj[link] = 1;
                        sortInsert(0, listArray.length - 1, item);
                    }
                }
            }
        });
    }
}

/**
 *  创建查询
 *  startPage //开始页
 *  pages //总共多少页
 *  url //专题地址
 */
function createPromise(startPage, pages, url) {

    return new Promise(function(resolve, reject) {
        new Seek({
            url: url,
            pages: pages,
            rate: 5,
            analyse: analyse,
            startPage: startPage
        }).seek(function() {
            // console.log(listArray);
            var nextPage = startPage + pages;
            resolve(nextPage);
        });
    });
}

/**
 *  开始查
 */
function runSeek(startPage, pages, callback) {
    createPromise(startPage, pages, topics[topicsIndex]).then(function(nextPage) {
        try{
            if (seekFlag) { //如果还未查到比上周更早的日期 接着查
                runSeek(nextPage, pages, callback);
            } else if (topicsIndex < topics.length-1) { //还有专题没查
                // 重设seekFlag
                seekFlag = true;
                // 索引加1
                topicsIndex++;
                // 从第一页开始查
                runSeek(1, 5, callback);
            } else {
                callback && callback();
            }
        } catch (e) {
            console.log(e);
        }

    });
}


module.exports = function() {
    /**
     *  初始化 重置数据
     */
    lastWeekStartDate = dateUtil.getLastWeekStartDate();
    lastWeekEndDate = dateUtil.getLastWeekEndDate();
    seekFlag = true;
    listArray = [];
    topicsIndex = 0;
    urlObj = {};
    articleCount = 0;

    return new Promise(function(resolve, reject) {
        runSeek(1, 5, function() {
            console.log(articleCount);
            resolve(listArray.slice(0, 10));
        });
    });
}
