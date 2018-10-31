var grid;
var _pageIndex;
var _pageSize;

$(function(){
	init();
})
function init(){
	mini.parse();
	search();
}


//=====================================客户端分页===============================================

//分页填充细节处理
function fillData(pageIndex, pageSize, gridF) {
	gridF = mini.get("pzhdxxGrid");
	grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
    $.ajax({
    		url : '/yhs-web/api/yhscx/pzhdxxcx.ashx',
    		type: "get",
    		dataType: "json",
    		data :'pageIndex='+pageIndex+'&pageSize='+pageSize,
    		success : function(json) {
    			var resultData = mini.decode(json);
    			grid.setData("");
    			if (!resultData.success) {
    				mini.alert("查询失败，请稍后再试", '提示信息');
    			} else {
    				setGridData(pageIndex, pageSize, resultData.resultMap, gridF);
    			}
    		}
    	});
}

function setGridData(pageIndex, pageSize, griddataResult, gridSet){
	var datas = griddataResult.data, totalCount = griddataResult.total;
	var arr = [];
	var start = pageIndex * pageSize, end = start + pageSize;
	gridSet.setTotalCount(totalCount);
	gridSet.setPageIndex(pageIndex);
	gridSet.setPageSize(pageSize);
	gridSet.setData(datas);
	
}

// 监听分页前事件，阻止后自行设置当前数据和分页信息
function onbeforeload(e){
	e.cancel = true;

	var pageIndex = e.data.pageIndex, pageSize = e.data.pageSize;
	fillData(pageIndex, pageSize, grid);
}

//====================================================================================

//获取监控平台页面传来的数据信息绘制gird，展示信息
function search(){
	grid = mini.get("pzhdxxGrid");
	grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
	//获取分页信息
	var pageSize = grid.pageSize;//每页行数
    $.ajax({
    		url : '/yhs-web/api/yhscx/pzhdxxcx.ashx',
    		type: "get",
    		dataType: "json",
    		data :'pageIndex='+grid.pageIndex+'&pageSize='+pageSize,
    		success : function(json) {
    			var resultData = mini.decode(json);
    			grid.setData("");
    			if (!resultData.success) {
    				mini.alert("查询失败，请稍后再试", '提示信息');
    			} else {
    				var data = resultData.resultMap;
    				setGridData(0, grid.getPageSize(), data, grid);
    			}
    		}
    	});
}
$("#mini-18").click(function(){
	search();
})
/* 自定义vtype="nsrsbh" */
mini.VTypes["nsrsbhErrorText"] = "请输入15至20位的数字+英文";
mini.VTypes["nsrsbh"] = function(v) {
var re = new RegExp("^[0-9a-zA-Z\-]+$");
if (v == "" || v == null) return true;
if (re.test(v)) {
	if (v.length >= 15 && v.length <= 20) {
		return true;
	}
}
return false;
};
/**
 * 重置
 */
function reset(){
	mini.get("nsrsbh").setValue(""); 
    mini.get("nsrmc").setValue("");
    mini.get("pzhdxxGrid").showEmptyText = "false";
    mini.get("pzhdxxGrid").setData("");
}