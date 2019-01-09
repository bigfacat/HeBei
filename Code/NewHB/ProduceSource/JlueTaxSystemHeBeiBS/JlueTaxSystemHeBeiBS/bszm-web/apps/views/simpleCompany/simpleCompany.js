/**
 * Created by mjial on 2017-2-7.
 */

var tstxData;

/**
 * 办税指引
 */
function handleBszy() {
    $('a.zy,#break-line').show();
    $('a.sx,a.tz').hide();
    var ysbqcData = {data:[]};
    var qtsxData = {data:[]};
    var whsyjsf = [], // 文化事业建设费
        wyjs = [], //我要缴税
        gsbb = [], //国税必办
        dsbb = [], //地税必办
        gsxb = [], //国税选办
        dsxb = []; //地税选办

    var handleResData =function(d,isDsToDoList){
        for(var i=0,len=d.length;i<len;i++){
            var item = d[i];
            if(isDsToDoList){
                store.setSession('ds_' + item.code, item);
	            setWdSession('ds_' + item.code, mini.encode(item));
                item.url = '/bszm-web/apps/views/publicPage/gds/dssbIndex.html?code=' + item.code;
                if(item.code == '3208' && !item.required){ //印花税纳税申报（报告）表
	                item.url='/sbzx-web/apps/views/sb_gdlh_yhs/sb_gdlh_yhs.html?sbzlDm=21101';
                }else if(item.code == '3001'  && !item.required){ //通用申报表（工会经费）
	                item.url='/sbzx-web/apps/views/sb_gdlh_tysbb/sb_gdlh_tysbb.html?sbzlDm=21102';
                }else if(item.code == '3003'  && !item.required){ //附加税（费）申报
	                item.url='/sbzx-web/apps/views/sb_fjs/sb_fjs.html?sbzlDm=10115';
                }
            }
            if(item.category==='message'){
                qtsxData.data.push(item);
            }else if(item.category==='sb' || item.category==='declaration'){

                // 26501,26502文化事业建设费月季报, wyjs 我要缴税
                if(item.code !=='26501' && item.code !=='26502' && item.code !== 'wyjs'){
                    //ysbqcData.data.push(item);
                    if(item.required){ // 必办
                        if(item.gdsBz === '1'){ //国税
                            gsbb.push(item);
                        }else{ // 地税
                            dsbb.push(item);
                        }
                    }else{ // 选办
                        if(item.gdsBz === '1'){ // 国税
                            gsxb.push(item);
                        }else{ // 地税
                            dsxb.push(item);
                        }
                    }
                }else if(item.code === 'wyjs'){
                    wyjs.push(item);
                }else{
                    whsyjsf.push(item);
                }
            }
        }
    };
    var handleDs = function(){
        mini.mask({"cls":"mini-mask-loading","message":"数据加载中，请稍候..."});
        var renderHtml = function(){
            ysbqcData.data = gsbb.concat(whsyjsf,dsbb,wyjs); // 我要缴税 放在最后面,有地税的也要放在地税后面
            qtsxData.data = gsxb.concat(dsxb,qtsxData.data);
            // 其他事项
            $(".qtsxTab").html(template('qtsxList', qtsxData));
            // 申报事项
            $('.ysbqcTab').html(template('ysbqcList', ysbqcData));
        };
        getDsTodoList().then(function (res) {
            var res = JSON.parse(res);
            mini.unmask();
            if(res.success){
                store.removeSession('dsNsrxxErr');
                handleResData(res.data,true);
            }else if (res.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            }else if(!!res.messageCode && res.messageCode == '80489079'){
                store.setSession('dsNsrxxErr','Y');
                mini.alert(res.message);
            }else{
                mini.alert(res.message);
            }
            renderHtml();

        },function () {
            mini.unmask();
            store.setSession('dsNsrxxErr','Y');
            renderHtml();
        });
    };
    todoList().then(function (data) {
        var data = JSON.parse(data);
        $('#break-line').show();
        if(data.success) {
            handleResData(data.data);
            // 文化事业建设费放在增值税之后
            ysbqcData.data = gsbb.concat(whsyjsf,dsbb,wyjs);
            //qtsxData.data = gsxb.concat(dsxb,qtsxData.data);
            // 获取地税办税指引数据
            handleDs();
        } else if (data.message === 'ajaxSessionTimeOut') {
            top.location.reload();
        } else {
            mini.alert(data.message);
        }
    },function () {
        handleDs();
    });
}

/**
 * 已办事项
 */
function handleYbsx() {
    $('a.sx').show();
    $('a.zy,a.tz,#break-line').hide();
    doneList().then(function (data) {
        var data = JSON.parse(data);
        data=mini.decode(data);
        if(data.success) {
            $(".ybsxTab").html(template('ybsxList', data.data));
        } else if (data.message === 'ajaxSessionTimeOut') {
            top.location.reload();
        } else {
            mini.alert(data.message);
        }
        mini.unmask();
    });
}

/**
 * 通知公式
 */
function handleTzgs() {
    $('a.tz').show();
    $('a.zy,a.sx,#break-line').hide();
    var userInfo = mini.decode(store.getSession('getUserInfo'));
    var params = {
        needBrief: 1,//是否需要摘要
        nsrsbh: userInfo.NsrInfo.nsrsbhGs,//纳税人识别号
        pageSize: 5,//一页数量
        pageIndex: 0//当前页，从0开始计算
    };

    getTzgs(mini.encode(params)).then(function (data) {
        if (data.success) {
            var tzgg = JSON.parse(data.value);
            $(".tzgsTab").html(template('tzgsList', tzgg));
        } else if (data.message === 'ajaxSessionTimeOut') {
            top.location.reload();
        } else {
            mini.alert(data.message);
        }
        mini.unmask();
    });
}

/**
 * 提示提醒
 */
function handleTstx() {
    $('a.zy,a.sx,a.tz,#break-line').hide();
    var unreadNum=0;
    getSfxyTstx().then(function (data) {
        var data = JSON.parse(data);
        if (data.success && !!data.value) {
            tstxData = data;
            for(var i=0,len=tstxData.value.length;i<len;i++){
                var item =tstxData.value[i];
                if(item.ydzt==='N'){
                    unreadNum++;
                }
            }
            if(unreadNum>0){
                $('#unread-num').text(unreadNum).show();
            }else{
                $('#unread-num').hide();
            }
            $(".tstxTab").html(template('tstxList', tstxData));
        }else if(data.success && !data.value){
            $(".tstxTab").html('<img style="margin-left: 250px" src="../../images/home/no-data.png" alt="暂无数据" title="暂无数据">');
        }
        else if (data.message === 'ajaxSessionTimeOut') {
            top.location.reload();
        } else {
            mini.alert(data.message);
        }
        mini.unmask();
    });
}
(function(){
    //存储当前模式
	$('#tips-bszy').hide();
    mini.mask({"cls":"mini-mask-loading","message":"数据加载中，请稍候..."});

    store.setSession('curMode','S');

    //请求常用功能数据
    commonFunctions().then(function (data) {
        var data = JSON.parse(data);
        if(data.success) {
            store.setSession('commonFunctions', data);
            $(".cygnContent").html(template('cygnUlHtml', data));
            $('#nsrjbxx-index').text(data.data.length + 1);
        }else {
            if(data.message==='ajaxSessionTimeOut'){
                window.location.reload();
            }else {
                mini.alert(data.message);
            }
        }
    });

    // 小东机器人
    initXdRobot();
    // 在线帮助
    setOnlineSupportAnchor('wdbsdt');

    // 已办事项等
    $('.sxTabContent').on('click','a',function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tab = $(this).attr('data-type');
        $('ul.common').hide();
        $('#break-line').hide();
        $('ul.'+tab).show();
        mini.mask({"cls":"mini-mask-loading","message":"数据加载中，请稍候..."});
        switch (tab){
            case 'bszyTab':
                handleBszy();
	            $('#tips-bszy').show();
                break;
            case 'ybsxTab':
                handleYbsx();
	            $('#tips-bszy').hide();
                break;
            case 'tzgsTab':
                handleTzgs();
	            $('#tips-bszy').hide();
                break;
            case 'tstxTab':
                handleTstx();
	            $('#tips-bszy').hide();
                break;
            default:
                break;
        }
    });
    $('.ico-tzgsTab').hide();

    setTimeout(function(){
    	$('.ico-dbsxTab').trigger('click');
    	// 提示提醒
        handleTstx();
    }, 300);

    $("#searchFunc img").on('click',function(){
        var value = $('#searchFunc input').val();
      //  window.open("/bszm-web/apps/views/simpleCompany/searchFunction.html?value="+value);
    });

    $("#searchFunc input").on("keydown",function(event){
        event = event?event:window.event;
        if(event.keyCode == 13){
            $("#searchFunc img").click();
        }
    });

    //$('#user-info').on('click',function () {
    //    $('#wddazx').click();
    //    $("#iframeMain").attr('src','../../../../yhs-web/yhscx/index.html');
    //})
    //判断是否弹窗显示调查问卷
    // if (isShowCAattetion() == true){
		// showCAattention();
    // }

})();


function showTstxDetails(index) {
	var item  = tstxData.value[index];
	if(item.sfxyTzlx=='03'){
		mini.get('tstx-skfp-win').show();
		$('#tstx-fp-title').html(item.subject);
		mini.get("fptxgrid").setData(item.content);
	}else{
		mini.get('tstx-win').show();
		$('#tstx-title').html(item.subject);
		$('#tstx-content').html(item.content);
		if(item.sfxyTzlx=='01'){
			$('#tstx-link').html('<a onclick="goSfxy()" class="txt-blue">>>去撤销</a>')
		}else{
			$('#tstx-link').empty();
		}
    }

    // 没有阅读的，点击 查看详情 后改变状态
    if(item.ydzt==='N'){
        changeTstxStatus(item.sfxyTzlx).then(function (data) {
            if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            }
        });
    }

}
function goSfxy() {
    window.open('/wszx-web/apps/views/sfxy/sfxyxx.html?code=110703&id=80&_t='+new Date().getTime());
}
/*********************在7月底前使用，CA用户告知****************************/
function isShowCAattetion(){
    var flag = false;
	$.ajax({
		url: '/wszx-web/api/cayhgz/query/sfytb',
		type: 'POST',
		async: false,
		success: function (res) {
			var value = mini.decode(res.value)
			if (res.success && !!value.sfytb) {
				if(value.sfytb=='N'){
					flag = true
				}
			}
		},
		error: function (res) {
		}
	});
    return flag;
}
function showCAattention(){
	mini.showMessageBox({
		title: 'CA用户告知',
		width: 700,      //宽度
		height: 250,     //高度
		iconCls: 'mini-messagebox-question',
		buttons: ['不再继续使用收费数字证书','继续使用收费数字证书'],
		message: '尊敬的纳税人：<br>' +
		'&#12288;&#12288;为了减轻纳税人负担，河北省网上税务局提供了实名认证方式登录办理涉税事项，建议您采用实名认证方式登录办税平台，并根据自己意愿选择填写以下文书并上传。<font color="red">如果您已在税务机关采集过数字证书认可情况信息，请关闭该提示窗口。</font>',
		showCloseButton: true,
		onload: function () {       //弹出页面加载完成

		},
		callback: function (action) {
			var sfmf;
			var url = '/wszx-web/apps/views/caAttention/caAttention.html?sfmf=';
			if(action =='不再继续使用收费数字证书'){
				sfmf='y'
				top.open(url+sfmf);
				isShowCAattetion();
			}else if(action =='继续使用收费数字证书'){
				sfmf='n'
				top.open(url+sfmf);
				isShowCAattetion();
			}
		}
	});

	$("a:contains(不再继续使用收费数字证书)").css('width','180px');
	$("a:contains(继续使用收费数字证书)").css('width','180px');
}