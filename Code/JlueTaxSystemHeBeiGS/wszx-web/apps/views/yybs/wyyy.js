/**
 * Created by majiali on 2016/7/28.
 */
var wyyy = {};
stepNav.run=function () {
    stepNav.initSteps([{id: '0', title: '我要预约', url: 'wyyy_.aspx'}]);
    wyyy.bindEvent();
};

wyyy.bindEvent = function () {

    var nsrxxData = wssqUtil.nsrjbxx;
    var successWindow = mini.get("successWindow");
    var selectDtWin = mini.get("selectDt");
    var urlSwjgDm = window.location.search.split('swjgDm=')[1];
    var dtDm='';
    var currentSwjgDm = nsrxxData.zgswjDm;
	
	/**更新用户登录信息*/
	var yhxxqk = yybsService.updateBsfwtYhxx();
	if(!yhxxqk.success){
		mini.alert(yhxxqk.message,'提示',function () {
                    window.close();
        });
        return;
	}
    if(urlSwjgDm){
        currentSwjgDm = urlSwjgDm.substr(0,11);
        dtDm = urlSwjgDm;
    }
    /*记录当前业务，当前选择时间*/
    var currentYysxDm = '';
    var currentYyrq = '';
    var dts = (dtDm =='' ? yybsService.dtQuery(currentSwjgDm):'');


    $('#dt-list').delegate('input','click',function () {
        $(this).checked=true;
    });
    $('.dtBtn').click(function () {
        initData();
    });
    function initData(_dm) {
        var dm = dtDm =='' ? $('#dt-list').find('input:checked').attr('data-dm'):dtDm;
        if(!!_dm){
            dm= _dm;
        }

        if(!!dm){

        	var swjywxxQuery=yybsService.initYyxx(currentSwjgDm,dm);

            if(swjywxxQuery.success){
                /*var wyyyTemp = document.getElementById('wyyyTemplate');
                document.getElementById('wyyyContent').innerHTML = doT.template(wyyyTemp.innerHTML)(swjywxxQuery.data);*/
                $('#wyyyContent').html(template('wyyyTemplate',{it: swjywxxQuery.value}));
            }else {
                mini.alert(swjywxxQuery.message,'提示',function () {
                    window.close();
                });
                return;
            }
            if(swjywxxQuery.value.yysx.length>5){
                $(".xzyw").css("height","170px");
            }else {
                $(".xzyw").css("height","140px");
            }
            currentYysxDm = swjywxxQuery.value.yysx[0].yysxdm;
            currentYyrq = swjywxxQuery.value.yyrq[0];

            initEvent(swjywxxQuery,dm)
        }
        $('#iframe-foot').show();
        selectDtWin.hide();
    }

    if(dts!=''){
        if (dts.success && dts.data != '') {
            dts = dts.value;
            var html='';
            try{
                for(var i=0;i<dts.length;i++){
                    html +='<div><input type="radio" name="dt" data-dm="'+ dts[i].dtDm +'"/><span>'+ dts[i].dtMc +'</span></div>'
                }
                $('#dt-list').html(html);
                if (dts.length > 1) {
                    selectDtWin.show();
                    $('#dt-list').find('input[type="radio"]').first().get(0).checked=true;
                }else if(dts.length == 1){
                    initData(dts[0].dtDm);
                }else{
                    mini.alert('未查询到大厅信息','提示',function () {
                        window.close();
                    });
                }
            }catch (e){
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
    // 查询
    var ywmc='',blrq='',blsj='';
    var wyyyLists={};
    function initEvent(swjywxxQuery,dm) {

        // 选择业务
        $(".xzywRegion").each(function(index){
            $(this).click(function() {
                ywmc = $(this).text();
                wyyyLists.xzywIndex=index;
                $(".xzywRegion .xzBtn").removeClass("clickRectangeBtn");
                $(".xzywRegion .xzBtn img").attr("src","../../images/yybs/circular.png");
                $(this).find(".xzBtn").addClass("clickRectangeBtn");
                $(this).find(".xzBtn img").attr("src","../../images/yybs/clickCircular.png");
                currentYysxDm = swjywxxQuery.value.yysx[index].yysxdm;
                var yysdxxUpdate=yybsService.updatexx(dm,currentYyrq,currentYysxDm, currentSwjgDm);
                var html='';
                var yysjd=yysdxxUpdate.value;
                if(yysjd.length>0) {
                    for (var i = 0; i < yysjd.length; i++) {
                        if(yysjd[i].sfym) {
                            html += '<button class="xzsjBtn sfymBtn" disabled="disabled"><span class="fl">' +
                                yysjd[i].yysjq + '-' + yysjd[i].yysjz + '</span><span class="fr">剩余：'+
                                yysjd[i].kyyrs + '</span>' +
                                '</button>';
                        }else {
                            html += '<button class="xzsjBtn"><span class="fl">' +
                                yysjd[i].yysjq + '-' + yysjd[i].yysjz + '</span><span class="fr">剩余：'+
                                '<span class="red-font">'+ yysjd[i].kyyrs +'</span></span>' +
                                '</button>';

                        }
                    }
                    $('.xzsj').html(html);
                    wyyyLists.xzsjIndex = -1;
                    initXzsjBtn()
                }
            });
        });

        // 选择日期
        $(".xzrqRegion").each(function(index){
            $(this).click(function() {
                blrq = $(this).text();
                wyyyLists.xzrqIndex=index;
                $(".xzrqRegion .xzBtn").removeClass("clickRectangeBtn");
                $(".xzrqRegion .xzBtn img").attr("src","../../images/yybs/circular.png");
                $(this).find(".xzBtn").addClass("clickRectangeBtn");
                $(this).find(".xzBtn img").attr("src","../../images/yybs/clickCircular.png");
                currentYyrq = swjywxxQuery.value.yyrq[index];
                var yysdxxUpdate=yybsService.updatexx(dm,currentYyrq,currentYysxDm, currentSwjgDm);
                var html='';
                var yysjd=yysdxxUpdate.value;
                if(yysjd.length>0) {
                    for (var i = 0; i < yysjd.length; i++) {
                        if(yysjd[i].sfym) {
                            html += '<button class="xzsjBtn sfymBtn" disabled="disabled"><span class="fl">' +
                                yysjd[i].yysjq + '-' + yysjd[i].yysjz + '</span><span class="fr">剩余：'+
                                yysjd[i].kyyrs + '</span>' +
                                '</button>';
                        }else {
                            html += '<button class="xzsjBtn"><span class="fl">' +
                                yysjd[i].yysjq + '-' + yysjd[i].yysjz + '</span><span class="fr">剩余：'+
                                '<span class="red-font">'+ yysjd[i].kyyrs +'</span></span>' +
                                '</button>';

                        }
                    }
                    $('.xzsj').html(html);
                    wyyyLists.xzsjIndex = -1;
                    initXzsjBtn()
                }
            });
        });

        // 选择时间
        initXzsjBtn();
        function initXzsjBtn() {
            $(".xzsjBtn").each(function (i) {
                $(this).click(function () {
                    blsj=$(this).find('span.fl').text();
                    wyyyLists.xzsjIndex = i;
                    $(".xzsjBtn").removeClass("clickRectangeBtn");
                    $(this).addClass("clickRectangeBtn");
                });
            });
        }


        // 预约按钮事件
        $(".yyButton").click(function(){
            if(wyyyLists.xzywIndex>=0 && wyyyLists.xzrqIndex>=0 && wyyyLists.xzsjIndex>=0){
                var ywyysqSubmit=yybsService.ywyysqSubmit(currentSwjgDm,swjywxxQuery.value.yysx[wyyyLists.xzywIndex].yysxdm,
                    swjywxxQuery.value.yyrq[wyyyLists.xzrqIndex],
                    swjywxxQuery.value.yysjd[wyyyLists.xzsjIndex].yysjq,
                    swjywxxQuery.value.yysjd[wyyyLists.xzsjIndex].yysjz,dm);
                if(ywyysqSubmit.success){
                    $('#yysj').text(blrq+blsj);
                    $('#ywmc').text(ywmc);
                    successWindow.show();
                }else {
                    mini.alert(ywyysqSubmit.message);
                    return;
                }
            }else {
                mini.alert("请选择预约业务和时间！");
                return;
            }
        });


        // 切换税局信息
        $('.change-dt').click(function () {
            var search = window.location.search;
            window.location.href = window.location.href.replace(search,'')
                .replace('wyyy.html', 'dtsk.html?swjgDm='+currentSwjgDm);
        });

        /*右上角关闭按钮*/
        $('.close-icon').click(function () {
            var id = $(this).attr('id');
            if(id=='success-close'){
                successWindow.hide();
                window.close();
            }else if(id=='select-close'){
                selectDtWin.hide();
            }
        });

        /*预约成功后点击确定关闭窗口*/
        $(".closeBtn").click(function(){
        	successWindow.hide();
            window.close();
        });

        /*温馨提示*/
        $(".wxtsBtn").click(function(){
            $(".wxtsRegion").slideDown("slow");
            $(".wxtsBtn").hide();
        });
        $(".sqBtn").click(function(){
            $(".wxtsRegion").slideUp("slow");
            $(".wxtsBtn").show();
        });

        //地图
        $('#mapTag').click(function () {
            mini.open( {
                url : "map.aspx",
                title : "百度地图-"+$('.swjgdz').text(),
                width : 880,
                height : 560,
                onload : function() {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.setSrc($('.swjgdz').text());
                },
                ondestroy : function(action) {

                }
            });
        });
    }

}

