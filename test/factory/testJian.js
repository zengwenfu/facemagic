'use strict';

var jian = require('../../app/factory/spiders/jian.js');

jian().then(function(list) {
    console.log(list);
});