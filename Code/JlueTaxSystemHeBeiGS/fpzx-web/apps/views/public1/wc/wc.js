/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/13
 * Time：17:31
 *
 */
var publicWc={
    viewSqzl:function () {},
    signFile:function () {},
    downloadFile:function () {}
};

$(function () {

    publicWc.content = $('.wc-content');
    publicWc.actions = $('.wc-actions');
    publicWc.slResult = $('#sl-result');

    $('#current-swsxMc').text(document.title);
    publicWc.slResult.text(blzt.blztMc); // 显示办理状态名称
    publicWc.viewSqzl=blzt.showSqzl;
    publicWc.signFile=blzt.signFile;
    publicWc.downloadFile=blzt.downloadFile;
    publicWc.actions.delegate('#viewSqzl','click',publicWc.viewSqzl);
    publicWc.actions.delegate('#signFile','click',publicWc.signFile);
    blzt.swsxDm = blzt.swsxDm || Tools.getUrlParamByName('code');
    // 个体工商户定额核定 不需要显示“签收”
    if(blzt.swsxDm=='110123'){
        publicWc.actions.find('#signFile').remove();
    }
    //发票丢失需要显示下载证明单
    if(blzt.swsxDm!='110216'){
        publicWc.actions.find('#downloadDsfp').remove();
    }else{
        publicWc.actions.delegate('#downloadDsfp','click',function(){
           window.open('/fpzx-web/api/fp/fpzm/download/pdf/' + currentSqxh);
        });
    }
    /*blzt.blztDm 办理状态代码
     *
     * 00 待受理
     * 01 受理通过
     * 02 不与受理
     * 03 待审批
     * 04 审批通过
     * 05 审批不通过
     * 06 补正资料
     * 07 已补正
     * 10 受理中
     * 30 受理通过未缴邮费
     * 31 受理通过已缴邮费
     * 32 邮件已寄出
     *
     * */
    var btn = '<button id="download">下载</button>'; // 下载审批通知书
    publicWc.slResult.removeAttr('class').addClass('sl-result'); // 重置受理结果样式
    switch (blzt.blztDm){
        case '01':
            publicWc.slResult.addClass('swsx-pass');
            break;
        case '02':
            publicWc.slResult.addClass('swsx-reject');
            break;
        case '04':
            $('#file-action').text('下载');
            publicWc.actions.append(btn);
            publicWc.actions.delegate('#download', 'click', publicWc.downloadFile);
            publicWc.slResult.addClass('swsx-pass');
            break;
        case '05':
            $('#file-action').text('下载');
            publicWc.actions.append(btn);
            publicWc.actions.delegate('#download', 'click', publicWc.downloadFile);
            publicWc.slResult.addClass('swsx-reject');
            break;
        case '06':
            publicWc.slResult.addClass('swsx-repair');
            break;
        default:
            break;
    }
});
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/13
 * Time：17:31
 *
 */


$(function () {
    $('#close').click(function(){
        wssqUtil.closeWin();
    });

});