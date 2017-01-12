'use strict';

module.exports = {
    /**
     *  按照传入的格式，格式化日期
     */
    format: function(date, fmt) {
        fmt = fmt || 'yyyy/MM/dd hh:mm:ss';
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     *  上周开始日期
     */
    getLastWeekStartDate: function() {
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth();
        var nowDay = now.getDate();
        var nowDayOfWeek = now.getDay();
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);   
        return this.format(weekStartDate, 'yyyy/MM/dd');
    },
    /**
     *  上周结束日期
     */
    getLastWeekEndDate: function() {
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth();
        var nowDay = now.getDate();
        var nowDayOfWeek = now.getDay();
        var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);  
        return this.format(weekEndDate, 'yyyy/MM/dd'); 
    }
};
