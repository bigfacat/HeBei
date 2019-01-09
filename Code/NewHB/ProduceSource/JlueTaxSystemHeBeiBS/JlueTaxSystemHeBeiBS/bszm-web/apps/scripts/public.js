/**
 * Created by mjial on 2017-2-5.
 **/
/*埋点*/
var _xa = _xa || [];
window._xa = _xa;
var dqYh = "";//当前企业类型
var YhLX = {
    "GR":"gr",//个人
    "GR_NUM":"02",//个人类型编号
    "QY":"qy",//企业
    "QY_NUM":"01",//企业类型编号
    "SB": "sb",
    "SB_NUM":"03",//社保类型编号
};
// 退出
function bszmLogout(){
    /*if(top.location.href.indexOf('personPage.html')>-1){

    }else{
        top.location.href = '../../../domain/{login-web}/logout';
    }*/
    var frame = document.getElementById('grsds-logout');
    frame.src = 'https://its.he-n-tax.gov.cn:444/web/zh/oauth2/logout';
    frame.onload=function () {
        top.location.href = '../../../domain/{login-web}/logout';
    }
    frame.onerror=function () {
        top.location.href = '../../../domain/{login-web}/logout';
    }
}
// 全部功能数据重组
function resetAllFunctionsData(value,arr) {
    value = value.concat();
    for (var i = 0, l = value.length; i < l; i++) {
        var subMenus = value[i].subMenus;
        var fns = value[i].functions;
        if(fns.length){
            for (var j = 0, k = fns.length; j < k; j++) {
                arr.push(fns[j]);
            }
        }
        // 递归
        if(subMenus.length){
            arr = resetAllFunctionsData(subMenus,arr);
        }
    }
    return arr;
}

// 设置办税桌面的在线帮助锚点
function setOnlineSupportAnchor(id){
    var url = location.href;
    var selectedModule='';
    if(id==='wdbsdt'){ //我的办税大厅
        if(url.indexOf('personPage')>-1){
            selectedModule = 'grbsdt'
        }
        if(url.indexOf('simpleCompany')>-1){
            selectedModule = 'qybsdt'
        }
    }else{
        selectedModule = id;
    }

    sessionStorage.setItem('Anchor',selectedModule);
}
// 调查问卷
function initSurveys() {
    var nsrxx = store.getSession('getUserInfo');
    var noThisTime = store.getSession('noThisTime');
    if(nsrxx && nsrxx.NsrInfo && !noThisTime){
        var nsrsbh = nsrxx.NsrInfo.nsrsbhGs;
        isNeedShowSurveys(nsrsbh).then(function (data) {
            if(data.success){
                getSurveys(data.value).then(function (result) {
                    if(result.success){
                        mini.open({
                            url: "../publicPage/surveys.html",        //页面地址
                            title: "问卷调查",      //标题
                            width: 1200,      //宽度
                            height: 600,     //高度
                            allowResize: false,       //允许尺寸调节
                            allowDrag: true,         //允许拖拽位置
                            showCloseButton: true,   //显示关闭按钮
                            showMaxButton: false,     //显示最大化按钮
                            showModal: true,         //显示遮罩
                            currentWindow: false,      //是否在本地弹出页面,默认false
                            onload: function () {       //弹出页面加载完成
                                var iframe = this.getIFrameEl();
                                //调用弹出页面方法进行初始化
                                var data = mini.clone(result.value);
                                iframe.contentWindow.initSurveyPage(data,nsrsbh);
                            },
                            ondestroy: function (action) {  //弹出页面关闭前
                                if (action == "success") {       //如果点击“确定”
                                    mini.alert('提交成功，感谢您的参与，祝您办税愉快！','温馨提示');
                                }else if(action=='failure'){
                                    mini.alert('提交失败，期待您的下次参与，祝您办税愉快！','温馨提示');
                                    store.setSession('noThisTime',true);
                                }else{
                                    store.setSession('noThisTime',true);
                                }
                            }
                        });
                    }
                })
            }
        })
    }

}
function buryPoint(userInfo){
    //下面是全局需要采集的参数
    _xa.push(["url", "/slp.log"]); //数据接收端
    _xa.push(['appname', 'dzswj']); //应用名
    _xa.push(['systemname', 'bszm-web']); //子系统名称
    _xa.push(['user_id', userInfo.AccountInfo.id]);
    if(userInfo.NsrInfo){
        _xa.push(['nsr_id',userInfo.NsrInfo.djxh]);
    }else {
        _xa.push(['nsr_id','']);
    }
    var collect = document.createElement('script');
    collect.type = 'text/javascript';
    collect.async = true;
    collect.src = '/src/scripts/warden-analytic.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(collect, s);
}
// 获取URL内的参数
function getUrlParamByName(attrName) {
    var queryList = location.href.split('?');
    if (queryList.length === 1) {
        return null;
    }
    var params = queryList[1].split('&');
    var value = null;
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        if (param[0] === attrName) {
            value = param[1];
            break;
        }
    }
    return value;
}
// 关闭 mini open 的window
function closeWin(action) {
    if (window.CloseOwnerWindow) {
        return window.CloseOwnerWindow(action);
    }
    else {
        if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
            window.location.href = 'about:blank';
            window.close();
        } else {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
    }
}
function goPage(url, m1, m2, fromWhere, qxkzsx) {
    mini.alert('业务暂未开放');
    return false;
}
//点击链接发请求，返回回来有数据弹出提示框，点击确定后，再打开对应的窗口
function clickHref(url, code, isValidate) {
    var values = url.split("/");
    if (values[2] == "ybs.he-n-tax.gov.cn:8888")
    {
        mini.alert('业务暂未开放');
        return false;
    }
    if(url.indexOf('gds/dssbIndex.html')>-1){
        var dsNsrState = store.getSession('dsNsrxxErr');
        var sfzData = store.getSession('ds_' + code);
	    var userMode = store.getSession('getUserMode');
        if(userMode.userType === '01'){
            if(code == '33G3'|| code == '33XM'){
	            showDownloadLink();
	            return false;
	        }else{
	            if(dsNsrState){
		            mini.alert('您的纳税人基础信息不符或者不完整，请到税务机关办税服务厅进行维护！','提示');
		            return false;
	            }
	            else if(!sfzData){
		            //mini.alert('您不需要申报此报表，如您确实需要，请联系主管税务机关！','提示');
		            mini.alert('若需办理此业务，请暂时先到办税服务厅办理，给您带来的不便，敬请谅解！','提示');
		            return false;
	            }
            }
        }
    }
	var datetime = Date.parse(new Date());
    if (url.indexOf('#') < 0) {
        if (url.indexOf('?') > -1) {
            url += '&_t=' + datetime;
        } else {
            url += '?_t=' + datetime;
        }
    }

	// 车购税带参数 sh swjgdm
	//if(code==='10438'){ 10438 和申报种类代码 冲突，改成 cgs
	if(code==='cgs'){
	    var NsrxxVO = getNsrxxVO()||{};
        url +='&sh=' + NsrxxVO.nsrsbh + '&swjg_dm=' + NsrxxVO.zgswjDm;
    }
    // 120101 涉税专业服务机构信息采集  lizm
    if (code === '120101') {
        mini.showMessageBox({
            width: 600,
            title: "提示",
            buttons: ["ok", "cancel"],
            message: "自定义Html",
            html: '<div style="font-size: 14px;color: #333;text-indent: 2em;">' +
                '<div>尊敬的纳税人，如果您从事纳税服务申报代理、一般税务咨询、专业税务顾问、税收策划、涉税鉴证、' +
                '纳税情况审查、其他税务事项代理和其他涉税服务，请进行涉税专业服务信息采集。如果您没有以上业务，' +
                '无需采集。</div><div class="mt10">是否确认采集？</div></div>',

            callback: function (action) {
                if (action == 'ok') {
                    window.open(url);
                }
            }
        });
        return;
    }// end

	window.open(url);
}

function showDownloadLink(){
	mini.showMessageBox({
		title: '提醒',
		width: 400,      //宽度
		height: 196,     //高度
		iconCls: 'mini-messagebox-question',
		buttons: ['确定'],
		message: '根据总局工作要求，建议使用自然人税收管理系统扣缴客户端申报个税。<a href="http://220.195.2.219:8082/自然人税收管理系统扣缴客户端（河北省）（正式版完整安装包）.exe">客户端下载链接</a>',
		showCloseButton: true,
		onload: function () {       //弹出页面加载完成

		},
		callback: function (action) {
			if(action =='确定'){
			}
		}
	});
}

//点击忽略按钮
function clickIgnore(id,code){
    todoListIgnore(id,code).then(function(data){
        data=mini.decode(data);
        if(data.success) {
            mini.mask({"cls":"mini-mask-loading","message":"数据加载中，请稍候..."});
            getTodoList();
        }else {
            if(data.message=='ajaxSessionTimeOut'){
                window.location.reload();
            }else {
                mini.alert(data.message);
            }
        }
    });
}
//渲染待办事项列表
function getTodoList(){
    todoList().then(function (data) {
        mini.unmask();
        data=mini.decode(data);
        if(data.success) {
            $(".sxContent").html(template('sxContentHtml', data));
        }else {
            if(data.message=='ajaxSessionTimeOut'){
                window.location.reload();
            }else {
                mini.alert(data.message);
            }
        }
    });
}

// 获取风险信息中未反馈条数
function getWfkfxNum() {
    getWfkNum().then(function (data) {
        if(data.success){
            var num = Number(data.value.wfkNum) || 0;
            num!==0 && $(top.document).find('#wfkfx-num').text(data.value.wfkNum).css('display','inline-block');
        }
    })
}

function loadHtmlTemplate(url,Data) {
    var html='';
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType: 'html',
        success: function (data) {
            if(!!Data){
                try{
                    var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
                    data = data.replace(reg, function(_, item) {
                        return eval("Data." + item);
                    });
                } catch (e){
                    // TODO
                }
            }
            html = data;
        },
        error: function () {
            //console.log('加载'+url+'出错，检查：1.路径是否正确；2.文件是否存在');
        }
    });
    return html;
}

// 小东东机器人

function initXdRobot(noRobot) {

    if(!noRobot && $('#no-xd-robot').length===0){
        $('body').append(loadHtmlTemplate('/bszm-web/apps/views-wrt/publicPage/xdRobot.html'));

        // 升级说明
        getSjgg().then(function (data) {
            var data = JSON.parse(data);
            if(data.success){
                var tzgg = data.value;
                var $upgradeTxt = $('#sjgg-txt');
                if (tzgg && tzgg.length > 0) {
                    var _pubTime='', ulHtml = '';
                    $.each(tzgg, function (i, v) {
                        _pubTime = v.sjsj.replace('-','年') + '月升级说明：';
                        ulHtml += '【' + v.sjbk + '】' + v.sjnr;
                    });
                    $('#sjgg-time').text(_pubTime);
                    $upgradeTxt.text(ulHtml);
                }
                var len = $upgradeTxt.width(),
                    left=0;
                setInterval(function () {
                    left--;
                    if(left<-len){
                        left=410;
                    }
                    $upgradeTxt.css('left',left+'px');
                },30);

                $('#sjgg-time').on('click',function () {
                    var msg = $upgradeTxt.text().replace(/【/g,'<br>【').replace('<br>','');
                    var title = $(this).text().replace('：','');
                    mini.showMessageBox({
                        width: 600,
                        height: 400,
                        title: title,
                        buttons: ["ok"],
                        html: msg
                    });
                })

            }else{
                $('.sjgg-container').remove();
            }
            mini.unmask();
        });
    }


    /***********智能客服小东***********/

    initHotTopic();

    //获取热门话题数据
    function initHotTopic() {
        var hotTopicHtml='';
        $("#xd-gjz").empty();
        hotTopic().then(function(datas){
            if(datas.length>0) {
                $.each(datas, function (i, res) {
                    hotTopicHtml += "<li><a>" + res + "</a></li>"
                });
                $("#xd-gjz").append(hotTopicHtml).show();
            }
        });
    }
    function doPostData(data){
        if(data.data.functions.length>0){
            answerMoreInfo(data.data.functions);
        }else {
            answerDialogue(data.data.recommendedInfo);
        }
        $("#input-wt").val("");
        scollToBottom();
    }
    //点击热门话题链接
    $(document).on("click","#xd-gjz li a",function(){
        var answerStr = askDialogue($(this).html());
        $("#xd-answer-wrap").append(answerStr);
        question($(this).html()).then(function(data){
            doPostData(data);
        });

    });

    //点击推荐下一个模板
    $(document).on("click",".answer-item .answer-txt a",function(){
        if($(this).is('[next]') && $(this).attr('keyword')){
            question($(this).attr('keyword')).then(function(data){
                doPostData(data);
            });
        }
    });

    $("#xd-commit").click(function () {
        var serchStr = $("#input-wt").val();
        if(serchStr.length>200){
            mini.alert("请输入200个以内的字符，谢谢！");
        }
        if (serchStr != "") {
            var answerStr = askDialogue(serchStr);
            $("#xd-answer-wrap").append(answerStr);
            question(serchStr).then(function(data){
                doPostData(data);
            });
        }
    });
    function threeMinPost(){
        //need to do
        //每三分钟发一次请求
        setTimeout(personBusi,1000*60*3);
    }
    $(document).on("click", "#xd-close", function () {
        $("#xd-area-open").animate({
            width: '0',
            height: '0'
        })
    });
    $(document).on("click", "#question", function () {
        $("#xd-area-open").animate({
            width: '680px',
            height: '560px'
        })
    });

    function askDialogue(val) {
        return askStr = '<div class="my-item">' +
            '<div class="answer-txt fl">' +
            val +
            '</div>' +
            '<div class="avatar fr">' +
            '<i class="ico-sj"></i>' +
            '</div>' +
            '</div>';
    }

    function answerDialogue(val) {//普通返回回来的数据处理
        if(val.length>0) {
            var answerStr = '<div class="answer-item">' +
                '<div class="avatar fl">' +
                '<i class="ico-sj"></i>' +
                '</div>' +
                '<div class="answer-txt fl">';
            var footerHtml ='</div>';
            if(val[0].message.indexOf("<a")>=0 && val[0].message.indexOf("12366")<0){
                answerStr+='<div>查询到有以下功能:</div><div class="functionList less">';
                footerHtml = '<div>如果没有您想要的功能,可以更换关键字。如果需要查询业务信息,请前往' +
                    '<a href="http://12366.he-n-tax.gov.cn/hbgsww/BsfzBLH_Zdwd.do" target="_blank">12366</a>查询</div></div></div>';
            }
            $.each(val,function (i, res) {
                answerStr += res.message + '</div>';
            });
            $("#xd-answer-wrap").append(answerStr + footerHtml);
            scollToBottom();
        }
    }

    function answerMoreInfo(val) {//更多功能返回回来数据处理
        if(val.length>0) {
            var headerHtml = '<div class="answer-item">' +
                '<div class="avatar fl">' +
                '<i class="ico-sj"></i>' +
                '</div>' +
                '<div class="answer-txt fl">'+
                '<div>查询到有以下功能:</div><div class="functionList less">';
            var moreHtml='<a id="showMore" href="javascript:void(0);">更多</a><br>';
            var footerHtml = '<div>如果没有您想要的功能,可以更换关键字。如果需要查询业务信息,请前往' +
                '<a href="http://12366.he-n-tax.gov.cn/hbgsww/BsfzBLH_Zdwd.do" target="_blank">12366</a>查询</div></div></div>';
            $.each(val, function (i, res) {
                headerHtml += '<a target="_blank" href="javascript:void(0);" onclick=clickHref("'+res.url+'","'+res.code+'") data-warden="warden-' + res.id + '">'+res.name + '</a><br>';
            });
            if(val.length>5){
                headerHtml += '</div>' + moreHtml + footerHtml;
            }else {
                headerHtml += '</div>' + footerHtml;
            }
            $("#xd-answer-wrap").append(headerHtml);
            scollToBottom();
        }
    }

    $(document).on("click", "#showMore", function () {
        $(".functionList").removeClass("less");
        scollToBottom();
    });

    function scollToBottom(){
        $('#xd-answer-wrap').scrollTop( $('#xd-answer-wrap')[0].scrollHeight);
    }

    // ie10 一下 placeholder 兼容性修复
    (function($) {
        /**
         * lizm
         * 2017/05/09 17:12
         */
        if($('#xd-area-open').length ===0)return;
        var placeholderfriend = {
            focus: function(s) {
                s = $(s).hide().prev().show().focus();
                var idValue = s.attr("id");
                if (idValue) {
                    s.attr("id", idValue.replace("placeholderfriend", ""));
                }
                var clsValue = s.attr("class");
                if (clsValue) {
                    s.attr("class", clsValue.replace("placeholderfriend", ""));
                }
            }
        }
        //判断是否支持placeholder
        function isPlaceholer() {
            var input = document.createElement('input');
            return "placeholder" in input;
        }
        //不支持的代码
        if (!isPlaceholer()) {
            $(function() {
                var form = $(this);
                //遍历所有文本框，添加placeholder模拟事件
                var elements = form.find("[placeholder]");
                elements.each(function() {
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    if (pValue) {
                        if (sValue == '') {
                            s.val(pValue);
                        }
                    }
                });
                elements.focus(function() {
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    if (sValue && pValue) {
                        if (sValue == pValue) {
                            s.val('');
                        }
                    }
                });
                elements.blur(function() {
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    if (!sValue) {
                        s.val(pValue);
                    }
                });
                //遍历所有密码框，添加placeholder模拟事件
                var elementsPass = form.find("input[type='password'][placeholder]");
                elementsPass.each(function(i) {
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    if (pValue) {
                        if (sValue == '') {
                            //DOM不支持type的修改，需要复制密码框属性，生成新的DOM
                            var html = this.outerHTML || "";
                            html = html.replace(/\s*type=(['"])?password\1/gi, " type=text placeholderfriend")
                                .replace(/\s*(?:value|on[a-z]+|name)(=(['"])?\S*\1)?/gi, " ")
                                .replace(/\s*placeholderfriend/, " placeholderfriend value='" + pValue
                                    + "' " + "onfocus='placeholderfriendfocus(this);' ");
                            var idValue = s.attr("id");
                            if (idValue) {
                                s.attr("id", idValue + "placeholderfriend");
                            }
                            var clsValue = s.attr("class");
                            if (clsValue) {
                                s.attr("class", clsValue + "placeholderfriend");
                            }
                            s.hide();
                            s.after(html);
                        }
                    }
                });
                elementsPass.blur(function() {
                    var s = $(this);
                    var sValue = s.val();
                    if (sValue == '') {
                        var idValue = s.attr("id");
                        if (idValue) {
                            s.attr("id", idValue + "placeholderfriend");
                        }
                        var clsValue = s.attr("class");
                        if (clsValue) {
                            s.attr("class", clsValue + "placeholderfriend");
                        }
                        s.hide().next().show();
                    }
                });
            });
        }
        window.placeholderfriendfocus = placeholderfriend.focus;
    })(jQuery);

}

//处理微端缓存
setWdSession= function(key, value) {
    try{
	    Form.Set(key, value);
    }catch(e){

    }

};

getWdSession= function(key) {
	var result = null;
	try{
		result = Form.Get(key);
	}catch (e){

	}
	return result;
};

(function() {
    var render='',userInfo='',userMode='';
    if (window.location.href.indexOf('client=Y') > -1) {
        $(".header-area").hide();
    }else{
        $(".header-area").show();
    }
    doAjax('/bszm-web/apps/views/publicPage/header.html', 'GET', '', true).then(function (data) {
            //头部页面预编译
            render = template.compile(data);
            if (store.hasSession('getUserInfo') && store.hasSession('getUserMode')) {
                userInfo = store.getSession('getUserInfo');
                buryPoint(userInfo);
                setTimeout(function () {
                    initSurveys();
                }, 300);
                userMode = store.getSession('getUserMode');
                //获取用户基本信息并显示
                $(".change-account").html(render($.extend(userInfo, userMode)));
                if(userInfo.loginType == 'zwfw'){
                    //如果loginType为zwfw 则隐藏企业办税和社保户身份
	                $("#change-grbs").addClass("bg-blue").siblings().removeClass("bg-blue");
	                $("span#change-qybs").hide();
	                $("span#change-sbbs").hide();
                }else{
	                if (userMode.userType == YhLX.QY_NUM) {
		                //企业
		                $("#change-qybs").addClass("bg-blue").siblings().removeClass("bg-blue");
		                $("#change-dqyh").hide();
		                $("#change-sqqy").show();
	                } else if (userMode.userType == YhLX.GR_NUM) {
                        /*选择个人时*/
		                $("#change-grbs").addClass("bg-blue").siblings().removeClass("bg-blue");
		                $("#change-sqqy").hide();
		                $("#change-dqyh").show();
	                }
	                else if (userMode.userType == YhLX.SB_NUM) {
                        /*选择社保时*/
		                $("#change-sbbs").addClass("bg-blue").siblings().removeClass("bg-blue");
		                $("#change-dqyh").hide();
		                $("#change-sqqy").show();
	                }
                }
            } else {
                getUserInfo().then(function (data) {
                    data = mini.decode(data);
                    if (data.success) {
                        store.setSession('getUserInfo', data.data);
                        userInfo = data.data;
                        buryPoint(userInfo);
                        setTimeout(function () {
                            initSurveys();
                        }, 300);
                    } else {
                        if (data.message == 'ajaxSessionTimeOut') {
                            window.location.reload();
                        } else {
                            mini.alert(data.message);
                        }
                    }
                    getUserMode().then(function (data) {
                        data = mini.decode(data);
                        if (data.success) {
                            store.setSession('getUserMode', data.data);
                            userMode = data.data;
                        } else {
                            if (data.message == 'ajaxSessionTimeOut') {
                                window.location.reload();
                            } else {
                                mini.alert(data.message);
                            }
                        }
                        //获取用户基本信息并显示
                        $(".change-account").html(render($.extend(userInfo, userMode)));
                        var userInfos = $.extend(userInfo, userMode);
	                    if(!!userInfos.loginType && userInfos.loginType == 'zwfw') {
		                    //如果loginType为zwfw 则隐藏企业办税和社保户身份
		                    $("#change-grbs").addClass("bg-blue").siblings().removeClass("bg-blue");
		                    $("span#change-qybs").hide();
		                    $("span#change-sbbs").hide();
	                    }else{
		                    if (userMode.userType == YhLX.QY_NUM) {
                                /*企业的时候*/
			                    dqYh = "qy";
			                    $("#change-qybs").addClass("bg-blue").siblings().removeClass("bg-blue");
			                    $("#change-dqyh").hide();
			                    $("#change-sqqy").show();
		                    } else if (userMode.userType == YhLX.GR_NUM) {
                                /*选择个人时*/
			                    dqYh = "gr";
			                    $("#change-grbs").addClass("bg-blue").siblings().removeClass("bg-blue");
			                    $("#change-sqqy").hide();
			                    $("#change-dqyh").show();
		                    } else if (userMode.userType == YhLX.SB_NUM) {
                                /*选择社保时*/
			                    dqYh = "sb";
			                    $("#change-sbbs").addClass("bg-blue").siblings().removeClass("bg-blue");
			                    $("#change-dqyh").hide();
			                    $("#change-sqqy").show();
		                    }
                        }
                    });
                });
            }
        });

    doAjax('/bszm-web/apps/views/publicPage/modules.html','GET','',true).then(function(data){
        window.location.href.indexOf('personPage.html') === -1 && $(".modules-area").html(data);
    });
    //点击用户基本信息显示用户列表---个人
  /*  $(document).on("mouseenter mouseleave","#change-dqyh",function(event){
        if(event.type == "mouseenter"){
            //鼠标悬浮
            dqYh = "gr";
            $('#grList').show();
            $('#qyList').hide();
            $(".bg-transparent").show();
        }else if(event.type == "mouseleave"){
            //鼠标离开
            $('#grList').hide();
            $(".bg-transparent").hide();
        }
    })*/
    $(document).on("click","#change-dqyh",function(){
        dqYh = "gr";
        $('#grList').show();
        $('#qyList').hide();
        $(".bg-transparent").show();
    });
    //点击用户基本信息显示用户列表---企业
    $(document).on("click","#change-sqqy",function(){
        dqYh = "qy";
        $('#qyList').show();
        $('#grList').hide();
        $(".bg-transparent").show();
    });

    $(".bg-transparent").click(function(){
        $('.userInfoList').hide();
        $(".bg-transparent").hide();
    });

    $(document).on("click",".logout",function(){
        store.clearSession();
    });

    //点击切换账户
    $(".container").on("click","#changeAccount",function(){
        mini.open({
            url: "../openWin/qhsf.html",        //页面地址
            title: "选择办税身份",      //标题
            width: 526,      //宽度
            height: 400,     //高度
            allowResize: false,       //允许尺寸调节
            allowDrag: false,         //允许拖拽位置
            showMaxButton: false,     //显示最大化按钮
            currentWindow: false,      //是否在本地弹出页面,默认false
            onload: function () {       //弹出页面加载完成
            },
            ondestroy: function (action) {  //弹出页面关闭前
            }

        });
    });

    /*个人企业*/
    $(".container").on('click','#change-grbs',function(){
        $("#change-grbs").addClass("bg-blue").siblings().removeClass("bg-blue");
        $("#change-sqqy").hide();
        $("#change-dqyh").show();
        $(".userInfoList").hide();


        changeGrSfWeb().then(function (data) {
            if(data.success) {
            	var clientType = store.getLocal("clientType");
                store.clearSession();
                store.clearLocal(); // 清空local
                store.setLocal("clientType",clientType);
                window.parent.window.location.href = window.globalUrl + '/apps/views/simpleCompany/simpleCompany.html';
            }else {
                if(data.message=='ajaxSessionTimeOut'){
                    window.location.reload();
                }else {
                    mini.alert(data.message);
                }
            }
        });
    });

    /*企业办税*/
    $(".container").on('click','#change-qybs',function(){
      /*  $("#change-qybs").addClass("bg-blue").siblings().removeClass("bg-blue");
        $("#change-dqyh").hide();
        $("#change-sqqy").show();
        $(".userInfoList").hide();*/
    	var clientType = store.getLocal("clientType");
        store.clearLocal(); // 清空local
        store.setLocal("clientType",clientType);
        mini.open({
            url: "../openWin/qhsf.html",        //页面地址
            title: "企业办税",      //标题
            width: 526,      //宽度
            height: 400,     //高度
            allowResize: false,       //允许尺寸调节
            allowDrag: false,         //允许拖拽位置
            showMaxButton: false,     //显示最大化按钮
            currentWindow: false,      //是否在本地弹出页面,默认false
            onload: function () {       //弹出页面加载完成
            },
            ondestroy: function (action) {  //弹出页面关闭前
            }

        });
    });


    /*社保办税*/
    $(".container").on('click','#change-sbbs',function(){
        var clientType = store.getLocal("clientType");
        store.clearLocal(); // 清空local
        store.setLocal("clientType",clientType);
        mini.open({
            url: "../openWin/sbsf.html",        //页面地址
            title: "企业(单位)仅缴纳社保费或仅扣缴个税办税",      //标题
            width: 526,      //宽度
            height: 400,     //高度
            allowResize: false,       //允许尺寸调节
            allowDrag: false,         //允许拖拽位置
            showMaxButton: false,     //显示最大化按钮
            currentWindow: false,      //是否在本地弹出页面,默认false
            onload: function () {       //弹出页面加载完成
            },
            ondestroy: function (action) {  //弹出页面关闭前
            }

        });
    })

    $('.modules-area').on('click','li',function () {
        if($(this).attr('id')==='wyfkwt'){
            return;
        }
        $(".menuUl li").removeClass('active');
        $(this).addClass('active');
        if($(this).index()==0){
            $("#iframeMain").hide();
            $(".menuContent").show();
        }else {
            $(".menuContent").hide();
            $("#iframeMain").show();
        }
       setOnlineSupportAnchor($(this).attr('id'));
    });

    /*$('.modules-area li').click(function(){
        $(".menuUl li").removeClass('active');
        $(this).addClass('active');
        if(i==0){
            $("#iframeMain").hide();
            $(".menuContent").show();
        }else {
            $(".menuContent").hide();
            $("#iframeMain").show();
        }
    });*/


    /***********智能客服小东***********/

    /****minidatepicker 复写****/
    /**** 1. mini-datepicker 渲染时，为每一个日期数字添加样式 mini-calendar-item */
    /**** 2. 渲染时，不创建 mini-timespinner ，将display：inline-block 改成了display：none*/
    if (mini.DatePicker) {
        mini.copyTo(mini.Calendar.prototype, {
            _create: function () {
                var s = '<tr style="width:100%;"><td style="width:100%;"></td></tr>';
                s += '<tr ><td><div class="mini-calendar-footer">'
                    + '<span style="display:none;"><input name="time" class="mini-timespinner" style="width:80px" format="' + this.timeFormat + '"/>'
                    + '<span class="mini-calendar-footerSpace"></span></span>'
                    + '<span class="mini-calendar-tadayButton">' + this.todayText + '</span>'

                    + '<span class="mini-calendar-footerSpace"></span>'
                    + '<span class="mini-calendar-clearButton">' + this.clearText + '</span>'
                    + '<span class="mini-calendar-okButton">' + this.okText + '</span>'
                    + '<a href="#" class="mini-calendar-focus" style="position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none" hideFocus></a>'
                    + '</div></td></tr>';

                var html = '<table class="mini-calendar" cellpadding="0" cellspacing="0">' + s + '</table>';

                var d = document.createElement("div");
                d.innerHTML = html;
                this.el = d.firstChild;

                var trs = this.el.getElementsByTagName("tr");
                var tds = this.el.getElementsByTagName("td");

                this._innerEl = tds[0];
                this._footerEl = mini.byClass("mini-calendar-footer", this.el);

                this.timeWrapEl = this._footerEl.childNodes[0];
                this.todayButtonEl = this._footerEl.childNodes[1];
                this.footerSpaceEl = this._footerEl.childNodes[2];
                this.closeButtonEl = this._footerEl.childNodes[3];
                this.okButtonEl = this._footerEl.childNodes[4];

                this._focusEl = this._footerEl.lastChild;




                this.yesterdayButtonEl = mini.after(this.todayButtonEl, '<span class="mini-calendar-tadayButton yesterday">' + this.yesterdayText + '</span>');


                mini.parse(this._footerEl);
                this.timeSpinner = mini.getbyName('time', this.el);
                this.doUpdate();
            },
            _CreateView: function(viewDate, row, column) {
                var month = viewDate.getMonth();
                var date = this.getFirstDateOfMonth(viewDate);
                var firstDateOfWeek = new Date(date.getTime());
                var todayTime = mini.clearTime(new Date()).getTime();
                var selectedTime = this.value ? mini.clearTime(this.value).getTime() : -1;

                var multiView = this.rows > 1 || this.columns > 1;

                var s = '';
                s +=
                    '<table class="mini-calendar-view" border="0" cellpadding="0" cellspacing="0">';

                if (this.showHeader) {
                    s +=
                        '<tr ><td colSpan="10" class="mini-calendar-header"><div class="mini-calendar-headerInner">';
                    if (row == 0 && column == 0) {
                        s += '<div class="mini-calendar-prev">';
                        if (this.showYearButtons) s +=
                            '<span class="mini-calendar-yearPrev"></span>';
                        if (this.showMonthButtons) s +=
                            '<span class="mini-calendar-monthPrev"></span>';
                        s += '</div>';
                    }
                    if (row == 0 && column == this.columns - 1) {
                        s += '<div class="mini-calendar-next">';
                        if (this.showMonthButtons) s +=
                            '<span class="mini-calendar-monthNext"></span>';
                        if (this.showYearButtons) s +=
                            '<span class="mini-calendar-yearNext"></span>';
                        s += '</div>';
                    }
                    s += '<span class="mini-calendar-title">' + mini.formatDate(viewDate,
                            this.format); + '</span>';
                    s += '</div></td></tr>';
                }


                if (this.showDaysHeader) {
                    s +=
                        '<tr class="mini-calendar-daysheader"><td class="mini-calendar-space"></td>';
                    if (this.showWeekNumber) {
                        s += '<td sclass="mini-calendar-weeknumber"></td>';
                    }

                    for (var j = this.firstDayOfWeek, k = j + 7; j < k; j++) {
                        var name = this.getShortWeek(j);
                        s += '<td yAlign="middle">';
                        s += name;
                        s += '</td>';
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                    }
                    s += '<td class="mini-calendar-space"></td></tr>';
                }


                date = firstDateOfWeek;
                for (var i = 0; i <= 5; i++) {
                    s +=
                        '<tr class="mini-calendar-days"><td class="mini-calendar-space"></td>';
                    if (this.showWeekNumber) {
                        var num = mini.getWeek(date.getFullYear(), date.getMonth() + 1, date.getDate());
                        if (String(num).length == 1) num = "0" + num;
                        s += '<td class="mini-calendar-weeknumber" yAlign="middle">' + num +
                            '</td>';
                    }
                    for (var j = this.firstDayOfWeek, k = j + 7; j < k; j++) {
                        var weekend = this.isWeekend(date);
                        var clearTime = mini.clearTime(date).getTime();
                        var isToday = clearTime == todayTime;
                        var isSelected = this.isSelectedDate(date);

                        if (month != date.getMonth() && multiView) {
                            clearTime = -1;
                        }

                        var e = this._OnDrawDate(date);

                        s += '<td yAlign="middle" id="';
                        s += this.uid + "$" + clearTime;
                        s += '" class="mini-calendar-date ';
                        if (weekend) {
                            s += ' mini-calendar-weekend '
                        }
                        if (e.allowSelect == false) {
                            s += ' mini-calendar-disabled '
                        }

                        if (month != date.getMonth() && multiView) {} else {
                            if (isSelected) {
                                s += ' ' + this._selectedDateCls + ' ';
                            }
                            if (isToday) {
                                s += ' mini-calendar-today '
                            }
                        }
                        if (month != date.getMonth()) {
                            s += ' mini-calendar-othermonth ';
                        }

                        if (e.dateCls) s += ' ' + e.dateCls;

                        s += '" style="';
                        if (e.dateStyle) s += e.dateStyle;
                        s += '"><span class="mini-calendar-item">';

                        if (month != date.getMonth() && multiView) {} else {

                            s += e.dateHtml;
                        }
                        s += '</span></td>';

                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                    }
                    s += '<td class="mini-calendar-space"></td></tr>';
                }
                s += '<tr class="mini-calendar-bottom" colSpan="10"><td ></td></tr>';

                s += '</table>';
                return s;
            }
        });
    }
})();

function getDzswjTgc(){
    var dzswjTgc="";
    $.ajax({
        url: "/bszm-web/api/desktop_hb/getDzswjTgc",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (data) {
            dzswjTgc=data.value;
        },
        error:function(data){
            // alert(data)
        }
    });
    return dzswjTgc;
}


