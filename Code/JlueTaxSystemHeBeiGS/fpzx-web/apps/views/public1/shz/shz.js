/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/22
 * Time：14:55
 *
 */
var publicShz={
    viewSqzl:function () {},
    cancelApply:function () {},
    bzzl:function () {},
    checkJ3:function () {}
};

$(function () {

    var swsxDm = Tools.getUrlParamByName('code');

    publicShz.content = $('#content');
    publicShz.actions = $('#actions');
    publicShz.viewSqzl=blzt.showSqzl;
    publicShz.cancelApply=blzt.cancelApply;
    publicShz.bzzl=blzt.bzzl;

    publicShz.checkJ3 = function () {
        // 查询
        //
        var url='../../../api/dj/swdjxxbl/check/djxxblCancel/' + Tools.getUrlParamByName('shxydm');

        ajax.post(url,{},function (result) {
            if(!result.success){
                mini.alert("撤销失败！");
                return false;
            }
            if(result.success&&result.value==null){
                blzt.cancelApply();
            }
            if(result.success&&result.value!=null) {
                mini.alert("您已经存在税务登记信息，不允许撤销!");
                return false;
            }
        },function () {
            mini.alert('撤销失败！');
            return false;
        });
    };

    if(swsxDm=='110101' || swsxDm=='110121'){
        publicShz.actions.delegate('#cancelApply', 'click', publicShz.checkJ3);
    }else{
        publicShz.actions.delegate('#cancelApply', 'click', publicShz.cancelApply);
    }
    // 个体工商户定额核定 没有撤销 按钮
    if(swsxDm=='110123'){
        publicShz.actions.find('#cancelApply').hide();
    }

    publicShz.actions.delegate('#viewSqzl','click',publicShz.viewSqzl);
    // publicShz.actions.delegate('#cancelApply','click',publicShz.cancelApply);
    // 办理状态 06 才显示补正资料
    if(blzt.blztDm=='06'){
        $('#bzzl').show();
        publicShz.actions.delegate('#bzzl','click',publicShz.bzzl);
    }

});
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/22
 * Time：14:55
 *
 */

$(function () {

    $('#shz-close').click(function(){
        wssqUtil.closeWin();
    });

});