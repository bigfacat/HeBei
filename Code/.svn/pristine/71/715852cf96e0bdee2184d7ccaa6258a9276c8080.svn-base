
var grid;
var _pageIndex;
var _pageSize;
$(function () {
    init();
    var firstDate = new Date();
    firstDate.setDate(1); // 第一天
    mini.get("cxsjq").setValue(mini.formatDate(firstDate, "yyyy-MM-dd"));
    var nowData = new Date();
    mini.get("cxsjz").setValue(mini.formatDate(nowData, "yyyy-MM-dd"));
});
function init() {
    mini.parse();
}
//起的时间变化时
function onvaluechanged1(e) {
    var cxsjzInput = mini.get("cxsjz");
    var cxsjz = cxsjzInput.getValue();
    if (cxsjz == null || cxsjz == '') {
        return;
    }
    var cxsjq = e.value;
    if (cxsjq == null || cxsjq == '') {
        return;
    }
    if (cxsjq > cxsjz) {
        mini.alert("查询时间起不能大于时间止！");
        cxsjzInput.setValue("");
    }
}

//止的时间变化时
function onvaluechanged2(e) {
    var cxsjqInput = mini.get("cxsjq");
    var cxsjq = cxsjqInput.getValue();
    if (cxsjq == null || cxsjq == '') {
        return;
    }
    var cxsjz = e.value;
    if (cxsjz == null || cxsjz == '') {
        return;
    }
    if (cxsjq > cxsjz) {
        mini.alert("查询时间起不能大于时间止！");
        var cxsjzInput = mini.get("cxsjz");
        cxsjzInput.setValue("");
    }
}

//=====================================客户端分页===============================================

//分页填充细节处理
function fillData(pageIndex, pageSize, gridF) {
    gridF = mini.get("xxGrid");
    var form = new mini.Form("#xxcxForm");
    form.validate();
    var cxsjqInput = mini.get("cxsjq");
    var cxsjq = cxsjqInput.getValue();
    if (cxsjq == null || cxsjq == '') {
        mini.alert("请填写查询时间起");
        return;
    }
    var cxsjzInput = mini.get("cxsjz");
    var cxsjz = cxsjzInput.getValue();
    if (cxsjz == null || cxsjz == '') {
        mini.alert("请填写查询时间止");
        return;
    }
    //格式化日期
    var formData = form.getData();
    formData.cxsjq = mini.formatDate(cxsjq, "yyyy-MM-dd");
    formData.cxsjz = mini.formatDate(cxsjz, "yyyy-MM-dd");
    formData.searchIn = "page";
    grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
    //获取分页信息
    var pageId = pageIndex;//页码
    var pageSize = pageSize;//每页多少条
    var pageData = { "pageId": pageId, "pageSize": pageSize };
    $.ajax({
        url: '../../../api/yhscx/fpyjxxcx.ashx',
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: mini.encode({
            map: formData,
            data: pageData
        }),
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
    var form = new mini.Form("#xxcxForm");
    form.validate();
    var cxsjqInput = mini.get("cxsjq");
    var cxsjq = cxsjqInput.getValue();
    if (cxsjq == null || cxsjq == '') {
        mini.alert("请填写查询时间起");
        return;
    }
    var cxsjzInput = mini.get("cxsjz");
    var cxsjz = cxsjzInput.getValue();
    if (cxsjz == null || cxsjz == '') {
        mini.alert("请填写查询时间止");
        return;
    }
    //格式化日期
    var formData = form.getData();
    formData.cxsjq = mini.formatDate(cxsjq, "yyyy-MM-dd");
    formData.cxsjz = mini.formatDate(cxsjz, "yyyy-MM-dd");
    formData.searchIn = "search";
    grid.showEmptyText = "true";//报表无数据，显示 ”没有对应数据“
    //获取分页信息
    var pageId = grid.pageIndex;//页码
    var pageSize = grid.pageSize;//每页多少条
    var pageData = { "pageId": pageId, "pageSize": pageSize };
    grid.setUrl('../../../api/yhscx/fpyjxxcx.ashx');
    grid.load({
        data: mini.encode({
            map: formData,
            data: pageData
        })
    },
        function (data) {
            if (!data.result.success) {
                mini.alert(data.result.message);
                return;
            }
            grid.setData(data.result.resultMap.data);
            grid.setTotalCount(data.result.resultMap.total);
        })
}
$("#mini-18").click(function () {
    search();
})
/**
 * 重置
 */
function reset() {
    mini.get("cxsjq").setValue("");
    mini.get("cxsjz").setValue("");
    mini.get("xxGrid").showEmptyText = "false";
    mini.get("xxGrid").setData("");
}