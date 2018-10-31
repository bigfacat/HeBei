$(function () {
    mini.parse();
    init();
});

function init() {
    var grid = mini.get("datagrid2");
    grid.setUrl("/gzcx/gzcxAction_queryBsfwtxx.ashx");
    grid.load({}, function (data) {
        var resultData = data.data;
        grid.setData(resultData);
        grid.mergeColumns(["ssdsdwmc"]);
    });
}