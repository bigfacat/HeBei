
var grid;
var _pageIndex;
var _pageSize;
$(function () {
    init();
});
function init() {
    mini.parse();
    search();
}

//=====================================客户端分页===============================================

//分页填充细节处理
function fillData(pageIndex, pageSize, gridF) {
    gridF = mini.get("xxGrid");
    grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
    //获取分页信息
    $.ajax({
        url: '/yhs-web/api/yhscx/fpjcxxcx.ashx',
        type: "GET",
        dataType: "json",
        data: 'pageIndex=' + pageIndex + '&pageSize=' + pageSize,
        success: function (json) {
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

function setGridData(pageIndex, pageSize, griddataResult, gridSet) {
    var datas = griddataResult.data, totalCount = griddataResult.total;

    var arr = [];
    var start = pageIndex * pageSize, end = start + pageSize;
    gridSet.setTotalCount(totalCount);
    gridSet.setPageIndex(pageIndex);
    gridSet.setPageSize(pageSize);
    gridSet.setData(datas);

}

// 监听分页前事件，阻止后自行设置当前数据和分页信息
function onbeforeload(e) {
    e.cancel = true;
    var pageIndex = e.data.pageIndex, pageSize = e.data.pageSize;
    fillData(pageIndex, pageSize, grid);
}

//====================================================================================

//获取监控平台页面传来的数据信息绘制gird，展示信息
function search() {
    grid = mini.get("xxGrid");
    grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
    //获取分页信息
    var pageSize = grid.pageSize;//每页行数
    $.ajax({
        url: '/yhs-web/api/yhscx/fpjcxxcx.ashx',
        type: "get",
        dataType: "json",
        data: 'pageIndex=' + grid.pageIndex + '&pageSize=' + pageSize,
        success: function (json) {
            var resultData = mini.decode(json);
            grid.setData("");
            if (!resultData.success) {
                mini.alert("查询失败，请稍后再试", '提示信息');
            } else {
                setGridData(0, grid.getPageSize(), resultData.resultMap, grid);
            }
        }
    });
}
