define(function(require, exports, module) {
	/**
	 * @Description: 获取数组字段的值，用于清单显示 
	 * @ param filedValue 
	 * @ param index 
	 * @ return 数组字段的值 
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	exports.getArrayFieldValue = function(arr, field) {
		var rs = "";
		for(var i=0;i<arr.length;i++){
			if(rs==""){
				rs=arr[i][field];
			}else{
				rs=rs+","+arr[i][field];
			}
		}
		return rs;
	};
	/**
	 * @Description: 获取字符串一维数组的索引 
	 * @ param arr 
	 * @ param item 
	 * @ return int @date
	 * 2015-12-31 @author:kfzx-fenggq
	 */
	exports.getIndex=function(arr, item)
	{
		var rs = -1;
		if (!arr || arr.length <= 0) {
			return rs;
		}
		for ( var i = 0; i < arr.length; i++) {
			if (arr[i] == item) {
				rs = i;
				break;
			}
		}
		return rs;
	};
	
	/**
	 * records=[{key:value,otherKey:otherValue}]
	 */
	exports.getRecordIndex=function(records,key,value){
		var index=-1;
		for(var i=0;i<records.length;i++){
			if(records[i][key]==value){
				index=i;
				break;
			}
		}
		return index;
	};
	
//	var arr = [
//		         {name:"小恭",age:11},
//		         {name:"小发",age:3},
//		         {name:"小喜",age:12},
//		         {name:"小财",age:40}
//	         ];
	//sortType=asc,desc
	exports.sort=function(arr,key,sortType){
		var compare = function(obj1,obj2){
		    var val1 = obj1[key];
		    var val2 = obj2[key];
			if("desc"==sortType){
				if(val1 < val2){
			       return 1;
			    }else if(val1 > val2){
			       return -1;
			    }else{
			       return 0;
			    }
			}else if("asc"==sortType){
				if(val1 > val2){
			       return 1;
			    }else if(val1 < val2){
			       return -1;
			    }else{
			       return 0;
			    }
			}
		}
		var sortArr = arr.sort(compare); 
		return sortArr;
	};
});
