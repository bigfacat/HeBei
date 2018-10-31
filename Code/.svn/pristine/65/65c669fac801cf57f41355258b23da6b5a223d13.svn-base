/**
 * Created by chenjunj on 2017/8/5 16:28.
 */
var report = {
    print: function () {
        var printHtml = '';
        var tables = $('table');
        var isWidthOver1200 = false;
        $.each(tables, function () {
            printHtml += this.outerHTML;
            if (this.clientWidth > 1200) {
                isWidthOver1200 = true;
            }
        });
        LODOP = getLodop();
        var strFormHtml = '<head><link rel="stylesheet" href="../css/forPrint.css"></head>';
        LODOP.PRINT_INIT("报表打印");
        if (isWidthOver1200) {
            LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4"); //大表格  横向打印
        } else {
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张正向打印 第一个参数 1正向，2横向
        }
        strFormHtml += "<body>" + printHtml + "</body>";
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);// 1正向显示，0横向显示
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); // Auto-Width 整宽不变形
        LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 0, 0, "报表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
        LODOP.ADD_PRINT_HTM("1mm", "1mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
        LODOP.PREVIEW(); // 打开打印预览窗口
    },
    init: function () {
        var btn_group = '<div class="btn-group">' +
            '<a class="btn btn-green" onclick="report.print()">打印</a><br>' +
            '</div>' +
            '<div class="tip">另存为操作请使用ctrl + s,IE8浏览器请点击菜单栏"页面"后选择"另存为"</div>';
        $('body').append(btn_group);
    }
};

//打印
function printClick() {
  //id为要打印的html片段
  $("#printView").jqprint({
    importCSS: true,
    printContainer: true
  });
}

$(function () {
    //report.init();
});