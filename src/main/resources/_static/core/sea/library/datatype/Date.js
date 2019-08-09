define(function(require, exports, module) {
	exports.getTimestamp=function(){
		return new Date().getTime();
	};
	exports.getTime=function (time) {
		var date ;
		if(time){
			date = new Date(time);
		}else{
			date = new Date();
		}
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hour= date.getHours() ;
	    var minute=date.getMinutes();
		var second=date.getSeconds();
		var  msecond=date.getMilliseconds() ;
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    if (hour <= 9) {
	        hour = "0" + hour;
	    }
	    if (minute <= 9) {
	        minute = "0" + minute;
	    }
	    if (second <= 9) {
	        second = "0" + second;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day+ " " +hour+ seperator2 + minute+ seperator2 +second + seperator2 +msecond ;
	    return curdate;
	};
	
	exports.getNow=function (time) {
		var date ;
		if(time){
			date = new Date(time);
		}else{
			date = new Date();
		}
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hour= date.getHours() ;
	    var minute=date.getMinutes();
	    var second=date.getSeconds();
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    if (hour <= 9) {
	        hour = "0" + hour;
	    }
	    if (minute <= 9) {
	        minute = "0" + minute;
	    }
	    if (second <= 9) {
	        second = "0" + second;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day+ " " +hour+ seperator2 + minute + seperator2 +second ;
	    return curdate;
	};
	exports.getYear=function(){
		return new Date().getFullYear();
	}
	exports.getWeek=function(){
		var today = new Date();
		var firstDay = new Date(today.getFullYear(),0, 1);
		var dayOfWeek = firstDay.getDay(); 
		var spendDay= 1;
		if (dayOfWeek !=0) {
			spendDay=7-dayOfWeek+1;
		}
		firstDay = new Date(today.getFullYear(),0, 1+spendDay);
		var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
		var result =Math.ceil(d/7);
		return result+1;
	}
	exports.getDate=function (seperator1){
		if(!seperator1&&seperator1!="")seperator1="-";
	    var date = new Date();
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
//	    var hour= date.getHours() ;
//	    var minute=date.getMinutes();
//	    var second=date.getSeconds();
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day;
	    return curdate;
	};
	
	exports.getPreMonth=function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    };
	
	  /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */        
	exports.getNextMonth=function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
    
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    };
    var getXDate=function (year,weeks,weekDay){ 
    	// 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日 
    	// 因为计算机中的月份是从0开始的,所以有如下的构造方法 
    	var date = new Date(year,"0","1"); 
    	 
    	// 取得这个日期对象 date 的长整形时间 time 
    	var time = date.getTime(); 
    	 
    	// 将这个长整形时间加上第N周的时间偏移 
    	// 因为第一周就是当前周,所以有:weeks-1,以此类推 
    	// 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒) 
    	time+=(weeks-1)*7*24*3600000; 
    	 
    	// 为日期对象 date 重新设置成时间 time 
    	date.setTime(time); 
    	return getNextDate(date,weekDay); 
	};
	exports.getXDate=getXDate;
	
	var fix=function (num, length) {
		  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	};
	var getNextDate=function(nowDate,weekDay){ 
		// 0是星期日,1是星期一,... 
		weekDay%=7; 
		var day = nowDate.getDay(); 
		var time = nowDate.getTime(); 
		var sub = weekDay-day; 
		if(sub <= 0){ 
		sub += 7; 
		} 
		time+=sub*24*3600000; 
		nowDate.setTime(time); 
		return  nowDate.getFullYear() +"-"+fix((nowDate.getMonth()+ 1),2)+"-"+fix(nowDate.getDate(),2);
	};
	exports.getDateRange=function(_year,_week){ 
		var beginDate; 
		var endDate; 
		if(_year == null || _year == '' || _week == null || _week == ''){ 
		return ""; 
		} 
		_week=_week-1;
		beginDate = getXDate(_year,_week,5); 
		endDate = getXDate(_year,(_week - 0 + 1),4); 
		return [beginDate,endDate]; 
	}; 
	exports.getYear=function(){
		return new Date().getFullYear();
	};
});
