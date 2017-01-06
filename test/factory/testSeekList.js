'use strict';

var Seek = require('../../app/factory/tools/seekList.js');

new Seek({
    url: 'http://www.jianshu.com/collections/16/notes?order_by=likes_count&page={{}}',
    pages: 20,
    rate: 3
}).seek(function() {
    console.log('do it');
});