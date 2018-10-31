/**
 * Created by lizm on 2016/7/27.
 */
stepNav.run=function () {
    stepNav.initSteps([{id: '0', title: '远程取号', url: 'ycqh_.aspx'}]);
};

$(function () {
    mini.parse();

    var nsrxxData =  wssqUtil.nsrjbxx;
    var timer = null;
    var sjhmQhsq=''; //手机号码
    var slhmQhsq=''; //受理号码

    // 选择大厅
    var selectDtWin = mini.get("selectDt");
    // 确认取号弹出窗口
    var confirmWindow = mini.get("confirmWindow");
    // 取号成功弹出窗口
    var successWindow = mini.get("successWindow");
    // 选择推送到手机窗口
    var selectPhoneWindow = mini.get("selectPhoneWindow");
    // 未绑定手机提示窗口
    var unBindWindow = mini.get("unBindWindow");
    // 我的号码
    var myNumWindow = mini.get("viewMyNum");

    //当前选中的预约事项大类代码
    var currentYysxdldm = '';

	/**更新用户登录信息*/
	var yhxxqk = yybsService.updateBsfwtYhxx();
    if(!yhxxqk.success){
		mini.alert(yhxxqk.message,'提示',function () {
                    window.close();
        });
        return;
	}
    // 当前纳税人的swjgDm
    var urlSwjgDm = window.location.search.split('swjgDm=')[1];
    var currentSwjgDm = nsrxxData.zgswjDm;
    var dtDm='';
    if(urlSwjgDm){
        currentSwjgDm = urlSwjgDm.substr(0,11);
        dtDm = urlSwjgDm;
    }

    var dts = (dtDm =='' ? yybsService.dtQuery(currentSwjgDm):'');
    $('.dtBtn').click(function () {
        initData();
    });
    function initData(_dm) {
        var dataDm = $('#dt-list').find('input:checked').attr('data-dm');
        var dm = dtDm =='' ? dataDm :dtDm;
        if(!!_dm){
            dm=_dm;
        }
        dtDm = dataDm ? dataDm : dm;
        //var mc = $('#dt-list').find('input:checked').next().text();

        if(!!dm){

            // 根据当前纳税人的税务机关代码，查询大厅详情
            var currentSwjgInfo = yybsService.dtskcx(currentSwjgDm,dm);
            if (currentSwjgInfo.success) {
                $('.swjgMc').text(currentSwjgInfo.value.swjgMc);
                $('.swjgLxdh').text(currentSwjgInfo.value.lxdh);
                $('.swjgBgsj').text(currentSwjgInfo.value.bgsj);
                $('.swjgDz').text(currentSwjgInfo.value.dtdz);
                var dm ='';
                // 11301810000:'辛集市',  石家庄市分离出来的
                // 11306820000:'定州市'   保定市分离出来的
                if(currentSwjgDm.indexOf('1130181')>-1 || currentSwjgDm.indexOf('1130682')>-1){
                    dm=currentSwjgDm.substr(0,7) + '0000';
                }else{
                    dm=currentSwjgDm.substr(0,5) + '000000';
                }
                var tips = yybsService.getYysxTips(dm);
                if(tips.success && tips.data!=''){
                    tips=tips.data;
                }

                // 业务排队情况
                var ywpdqk = currentSwjgInfo.value.sspdqk;

                // 渲染到页面
                var html = '';
                for (var i = 0; i < ywpdqk.length; i++) {
                	
                    html += '<li class="blsxItem" data-ywsxxl="' +  (tips[ywpdqk[i].yysxDlDm||'']||'').toString()+ '">' +
                        '<div class="blsxTitle" id="' + ywpdqk[i].yysxDlDm + '">' + ywpdqk[i].yysxDlMc + '</div>' +
                        '<div class="blsxInfo">' +
                        '<span>排队人数：<span class="blsxPdrs">' + ywpdqk[i].ddrs + '</span></span>' +
                        '<span>当前受理：<span class="blsxDqsl">' + ywpdqk[i].dqslhm + '</span></span>' +
                        '</div>' +
                        '<span class="itemCircle"></span>' +
                        '</li>';
                }
                $('#blsxList').html(html);
            } else {
                $('#blsxList').empty();
                mini.alert(currentSwjgInfo.message, '提示', function () {
                    window.close();
                });
                return;
            }
            initEvent();
        }
        $('#iframe-foot').show();
        selectDtWin.hide();
        //判断正常时间验证时间
        isZcqhsj(dtDm);
    }

    if(dts!=''){
        if (dts.success && dts.value != '') {
            dts = dts.value;
            var html='';
            try{
                for(var i=0;i<dts.length;i++){
                    html +='<div><input type="radio" name="dt" data-dm="'+ dts[i].dtDm +'"/><span>'+ dts[i].dtMc +'</span></div>'
                }
                $('#dt-list').html(html);

                if (dts.length > 1) {
                    $('#dt-list').find('input[type="radio"]').first().get(0).checked=true;
                    selectDtWin.show();

                }else if(dts.length == 1){
                    initData(dts[0].dtDm);
                }else{
                    mini.alert('未查询到大厅信息','提示',function () {
                        window.close();
                    });
                }
            }catch(e){
                console.log(e);
            }


        }else{
            mini.alert(dts.message,'提示',function () {
                window.close();
            });
            return false;
        }
    }else{
        $('.dtBtn').click();
    }


    function initEvent() {
        // 右上角关闭按钮
        $('.close-icon').click(function () {
            confirmWindow.hide();
            // 取号成功弹出窗口
            successWindow.hide();
            // 选择推送到手机窗口
            selectPhoneWindow.hide();
            // 未绑定手机提示窗口
            unBindWindow.hide();
            // 我的号码
            myNumWindow.hide();
        });

        // 切换办理业务
        $('.blsxItem').click(function () {
            $('.blsxList li.active').removeClass('active');
            $(this).addClass('active');
        }).mouseenter(function () {
            var text = $(this).attr('data-ywsxxl').replace(/,/g,'，');
            if(text==''){
                return;
            }
            var height = Math.ceil(text.length / 25) * 20;
            var left = $(this).offset().left +  30;
            var top = $(this).offset().top - height -28;

            $('.tooltip-content').text(text);
            $('.ywsxxl').css({top:top,left:left,height:height}).show();
        }).mouseleave(function () {
            $('#ywsxxl').hide();
        });

        //取号需选择绑定的手机号
        $('#phoneLists').delegate('.phoneItem','click',function () {
            $('#phoneLists li').removeClass('active');
            $(this).addClass('active');
            sjhmQhsq=$(this).find(".phoneText").text();
        });


        // 取号按钮
        $('#quhao').click(function () {
            currentYysxdldm = $('li.active').find('.blsxTitle').attr('id');
            if (!currentYysxdldm) {
                mini.alert('请选择要办理的业务！');
                return;
            }
            /**	校验叫号机是否有效在线
            var jhzZtInfo = yybsService.isOnline(dtDm);
            if(!jhzZtInfo.success){
            	mini.alert(jhzZtInfo.message);
            	return;
            }
            */
            /** 判断取号是否达到上线*/
            var qhSxInfo = yybsService.checkQhsxs(dtDm);
            if(!qhSxInfo.success){
            	mini.alert(qhSxInfo.message);
            	return;
            }
            if(!qhSxInfo.value){
            	mini.alert("此时间段取号人数已达上限。");
            	return;
            }
            var yysxDlMc = $('li.active .blsxTitle').text();
            var qhxqInfo = yybsService.qhxq(currentSwjgDm,currentYysxdldm,dtDm);
            if (qhxqInfo.success) {
                $('#confirmWindow .ywTitle').text(yysxDlMc);
                slhmQhsq=qhxqInfo.value.dqslhm;
                $('#confirmWindow .currentNum').text(qhxqInfo.value.dqslhm);
                $('#confirmWindow .waitNum').text(qhxqInfo.value.ddrs);
                confirmWindow.show();
            } else {
                mini.alert(qhxqInfo.message);
                return;
            }
        });

        // 确认取号按钮
        $('.confirmBtn').click(function () {
            confirmWindow.hide();
            qhsqInfo();
        });

        // 查看我的号码
        $('#myqh').click(function () {
            var myNum = yybsService.wdqhQuery();
            var html = '';
            if(myNum.success){
                myNum = myNum.value;
                if(myNum.length==0){
                    mini.alert('未查询到您的取号记录，请确认您是否通过云办税厅办理过取号业务');
                    return false;
                } else if(myNum.length==1){
                    html='您的受理号码为：<span class="blueText">' + myNum[0].wdqh +'</span>号（' + myNum[0].dtMc+'）<br/>';
                }else{
                    html = '您的受理号码为：<span class="blueText">' + myNum[0].wdqh + '</span>号（' +myNum[0].dtMc +'）、<span class="blueText">' +
                        myNum[1].wdqh + '</span>号（' +myNum[1].dtMc +'）<br/>';
                }

                $('#myNum').html(html);
                myNumWindow.show();
            }else{
                mini.alert(myNum.message);
                return false;
            }
        });
        $('.myNumBtn').click(function () {
            myNumWindow.hide();
        });

        //取号申请请求
        function qhsqInfo() {
            var qhsqInfo = yybsService.qhsq(currentSwjgDm, currentYysxdldm, sjhmQhsq, slhmQhsq, dtDm);
            if (qhsqInfo.success) {
                if (qhsqInfo.value.flag == 0) {//未绑定
                    unBindWindow.show();
                }
                // else if(qhsqInfo.otherParams.flag == 1){
                else {//已推送
                    $('#successWindow .myNum').text(qhsqInfo.value.ycqhVO.slhm);
                    $('#successWindow .waitNum').text(qhsqInfo.value.ycqhVO.ddrs);
                    $('#successWindow .currentNum').text(qhsqInfo.value.ycqhVO.dqslhm);
                    successWindow.show();
                }
                // 暂时忽略 次情况，后续再继续开发
                /*else if (qhsqInfo.otherParams.flag == 2) {//多个手机选择一个推送
                    selectPhoneWindow.show();
                    var phoneCont = '';
                    var sjhmList = qhsqInfo.otherParams.sjhms;
                    for (var i = 0; i < sjhmList.length; i++) {
                        phoneCont += '<li class="phoneItem">' +
                            '<span class="phoneCircle"></span>' +
                            '<span class="phoneText">' + sjhmList[i] + '</span>' +
                            '</li>'
                    }

                    $('#phoneLists').html(phoneCont);
                }*/
            } else {
                mini.alert(qhsqInfo.message);
                return false;
            }
        }

        //点击未绑定弹出框完成按钮
        $(".bindBtn").click(function(){
            unBindWindow.hide();
            qhsqInfo();
        });

        //点击选择绑定手机弹出框确认按钮
        $(".selectBtn").click(function(){
            if(!sjhmQhsq){
                mini.alert('请选择需要绑定的手机号');
                return;
            }else {
                selectPhoneWindow.hide();
                qhsqInfo();
            }
        });

        // 延迟关闭遮罩
        function delay() {
            mini.unmask(document.body);
            successWindow.show();
            clearTimeout(timer);
        }

        // 取号成功，确认按钮
        $('.okBtn').click(function () {
            $('#successWindow .mini-tools-close').trigger('click');
            window.close();
        });

        //地图
        $('#mapTag').click(function () {
            mini.open({
                url: "map.aspx",
                title: "查看地图",
                width: 880,
                height: 560,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.setSrc($('.swjgDz').text());
                },
                ondestroy: function (action) {

                }
            });
        });
       
    }
    function isZcqhsj(dtDm){
   	 /**	校验取号时间是否正常*/
       var qhInfo = yybsService.isZcqhsj(dtDm);
       if(!qhInfo.success){
       	mini.alert(qhInfo.message);
       	//置取号按钮为灰色，不可操作
       	$('#quhao').attr('disabled',"true").addClass("disable");
       }
   }

});