'use strict';
var nunjucks = require('nunjucks');
var dateUtil = require('../../utils/dateUtil.js');
var seekJian = require('../spiders/jian.js');
var fs = require('fs');

seekJian().then(function(articles) {
    var startDate = dateUtil.getLastWeekStartDate();
    var endDate = dateUtil.getLastWeekEndDate();
    var content = nunjucks.render('./templates/jianTop.md', {
        startDate: startDate,
        endDate: endDate,
        articles: articles
    });
    var now = dateUtil.format(new Date(), 'yyyyMMdd');
    console.log(now);
    fs.writeFile('./jianTops/' + now + '.md', content, function(err) {
    });


    var adc = nunjucks.render('./templates/ad.md', {
        articles: articles
    });
    fs.writeFile('./jianTops/' + now + '-ad.md', adc, function(err){} );
});
