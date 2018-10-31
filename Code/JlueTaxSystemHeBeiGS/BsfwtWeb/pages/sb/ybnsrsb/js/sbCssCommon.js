/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-06-19
 * Time: 17:57
 * Description:实现 页面分割线收缩、增加报表列表字样效果
 */


mini.parse("tabs");
var closeBtn = '<td bgcolor="#d4d4d4"><span id="toggleSbbList" class="close_right">&nbsp;&nbsp;&nbsp;</span></td>';
if ($(".mini-tabs-bodys") != undefined) {
    $(".mini-tabs-bodys").parent().before(closeBtn);
}
function initHeader() {

    //插入列表头部
    var str = '<tr>' + '<td>' + '<h3 class="biao_leftmenubox">' + '报表列表' + '</h3>' + '</td>' + '</tr>';
    if ($("table.mini-tabs-header") != undefined) {
        $("table.mini-tabs-header").find("tbody").prepend(str);
    }
}
initHeader();
// 修改td背景色
$("input[disabled=disabled]").parent("td").css("background-color", "#eee");

$('#toggleSbbList').click(function () {
    var $list = $(this).parent().prev();
    var tabs = mini.get('ybnsrsb-tabs');
    $list.is(':visible') ? $list.hide() : $list.show();
    if ($(this).hasClass('close_right')) {
        $(this).removeClass('close_right').addClass('close_left');
        tabs.setTabPosition('top');
        $('#ybnsrsb-tabs .mini-tabs-scrollCt').hide();
    } else {
        $(this).removeClass('close_left').addClass('close_right');
        tabs.setTabPosition('left');
        $('#ybnsrsb-tabs .mini-tabs-scrollCt').show();
        initHeader();
    }
});