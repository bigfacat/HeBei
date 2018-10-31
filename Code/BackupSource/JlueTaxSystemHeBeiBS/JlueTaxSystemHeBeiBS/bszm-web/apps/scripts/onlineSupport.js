/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-09-21
 * Time: 17:20
 * Description:
 */

;(function () {
    var html = loadHtmlTemplate('/bszm-web/apps/views/publicPage/sidebar.html');
    $('body').append(html);
    var config = {
        grbsdt:"4-1",/*个人办税大厅*/
        qybsdt:"4-2",/*企业办税大厅*/
        wdzhzx:"3-7",// 我的账户中心
        hlwbsxy:"3-8",
        zdycygn:"bszm-zdycygn"// 自定义常用功能
    };

    $('.item-help').click(function () {
        var id = sessionStorage.getItem('Anchor');
        var anchor = config[id]||'';
        window.open('/hbyt/#' + anchor);
    });

    /*回到顶部*/
    $('.item-top').on('click',function(){
        scrollTo(0,0);
    });
    /*微课程*/
    $('.item-video').on('click',function () {
        window.open('/login-web/wkc/wkc-index.html');
    });

    /*问题反馈*/
    $('.item-feedback').on('click',function () {
        window.open('/wszx-web/apps/views/question/question.html');
    });
}());