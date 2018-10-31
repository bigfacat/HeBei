/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/17
 * Time：15:01
 *
 */
$(function () {

    blzt.contentCollection = $('#content');
    blzt.contentCollection.html(wssqUtil.loadTemplate('../public1/wc/wc.aspx'));
    blzt.actions = $('#actions');
    blzt.slResult = $('#sl-result');


    blzt.initBlzt(); // 根据申请序号初始化数据
    blzt.initBreadNav(); // 加载面包屑导航
    blzt.initNavBar();  //初始化导航条
    $('#sl-result').text(blzt.blztMc); // 显示结果
    document.title =  blzt.blztMc; // 显示结果
    blzt.actions.delegate('#viewSqzl', 'click', blzt.showSqzl);

    // 发票领用 完成页面不需要按钮
    if(blzt.swsxDm=='110209'){
        $('#viewSqzl,#signFile').remove();
        $('.wc-content').html('<span class="success-ico">尊敬的纳税人您好，您的</span><span id="current-swsxMc">发票领用</span>已经成功提交。');
    }

    //发票丢失需要显示下载证明单
    if(blzt.swsxDm!='110216'){
        $('#downloadDsfp').hide();
    }else{
        $('#downloadDsfp').show();
    }
    blzt.actions.on('click','#downloadDsfp',function(){
        window.open('/fpzx-web/api/fp/fpzm/download/pdf/'+blzt.sqxh);
    });


     //操作状态 01签收 02评价 05完结
     switch (blzt.czztDm){
        case '01':
            blzt.actions.delegate('#signFile', 'click', blzt.signFile);
            break;
        case '02':
            $('#signFile').text('评价');
            blzt.actions.delegate('#signFile', 'click', blzt.signFile);
            break;
        case '05':
            $('#signFile').hide();
            break;
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
    switch (blzt.blztDm){
        case '01':
            blzt.slResult.addClass('swsx-pass');
            break;
        case '02':
            blzt.slResult.addClass('swsx-reject');
            break;
        case '04':
            $('#file-action').text('下载');
            blzt.actions.append(btn);
            blzt.actions.delegate('#download', 'click', blzt.downloadFile);
            blzt.slResult.addClass('swsx-pass');
            break;
        case '05':
            $('#file-action').text('下载');
            blzt.actions.append(btn);
            blzt.actions.delegate('#download', 'click', blzt.downloadFile);
            blzt.slResult.addClass('swsx-reject');
            break;
        case '06':
            blzt.slResult.addClass('swsx-repair');
            break;
        default:
            break;
    }
    //丢失发票下载证明单
    if(blzt.swsxDm == '110216'){
        $('#downloadDsfp').click(function(){
            window.open('/fpzx-web/api/fp/fpzm/download/pdf/' + blzt.sqxh);
        })
    }
    // 普票代开110214，专票代开110212，完成页面提示信息差异化
    if(blzt.swsxDm == '110212' || blzt.swsxDm == '110214'){
        $($('.wc-content').children()[4]).remove();
    }
	//跨区域税务事项报告（开具） 增加打印pdf按钮
	if(blzt.swsxDm == '110804'){
		var btn = ' <button id="xzwcjyzm-btn">下载跨区域税务事项报告表</button> ';
		$('.wc-actions').append(btn);
		$("#xzwcjyzm-btn").click(function () {
			window.open('/wszx-web/api/wgz/wcjyzmkj/download/pdf/kqysssxbg/' + blzt.sqxh);
		});		
    }
});
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/11/17
 * Time：09:01
 *
 */
$(function(){
    if(blzt.stepConfig.length === 1){
        $('.steps').remove();
    }

    $('#close').click(function(){
        wssqUtil.closeWin();
    });
});