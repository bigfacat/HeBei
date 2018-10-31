/**
 * 表单操作
 */
FormOp = {
    form        : null,
    nsrData     : {djxh : ''},
    queryData   : {},
    datagrid    : null,
	cjrqq       : null,
	cjrqz       : null,
	dqrq        : null,
	shrqq       : null,
	shrqz       : null,
	requestData : null,
	paramMap    : {},
    /**
     * 初始化
     */
    init : function () {
		FormOp.datagrid = mini.get("sjcjmaindatagrid");
		FormOp.requestData = GetRequest();
		//初始化申报日期
		FormOp.initSbsq();
    },
    initSbsq : function() {
		var sbsq,temp;
    	var sbsq_temp = mini.formatDate(new Date(), "yyyyMM");
		temp = sbsq_temp.substr(4,5);
		temp = parseInt(temp)-1;
		if(temp<10) {
			temp = "0"+temp.toString();
		}
		sbsq = sbsq_temp.substr(0,4) + temp;
		//FormOp.dqrq = mini.formatDate(new Date(), "yyyyMMdd");
		mini.get("sbsq").setValue(sbsq);
    },
    doQuery:function(){
    	var djxh = '';
    	if(FormOp.requestData.sjly && FormOp.requestData.sjly == "03") {
			if(FormOp.nsrData && FormOp.nsrData.djxh){
				djxh = FormOp.nsrData.djxh;
				var nsrlx = getZzsNsrlx(djxh);
				if(nsrlx && nsrlx == "yb") {
					mini.alert("尊敬的用户，您不是小规模纳税人，无法使用云办税厅进行货运信息申报！", "提示信息", function() {
						window.close();
					});
					return false;
				}
			}
		}
		var sbsq = mini.get("sbsq").getFormValue();
		if(FormOp.nsrData && FormOp.nsrData.djxh){
			djxh = FormOp.nsrData.djxh;
		}
		FormOp.queryData["djxh"] = djxh;
		FormOp.queryData["sbsq"] = sbsq;
		$.ajax({
			url:'/hlcj/hljcxx_queryYgzSjcjMain.ashx',
			type:"post",
			data : {
				"djxh" : djxh,
				"sbsq" : sbsq
			},
			async:false,
			success:function(res) {
				var result = mini.decode(res);
				if(result.success) {
					FormOp.cjrqq = result.cjrqq;
					FormOp.cjrqz = result.cjrqz;
					FormOp.shrqq = result.shrqq;
					FormOp.shrqz = result.shrqz;
					FormOp.dqrq  = formatDateToString(result.curday);
					if(result.data.length > 0) {
						FormOp.datagrid.setData(result.data);
					}else{
						mini.alert("暂时没有需要申报的表！");
					}
				}else {
					if(typeof(result.message)!="undefined") {
						mini.alert(result.message);
					}else {
						mini.alert("请求失败！");
					}
				}
			},
			error:function() {
				mini.alert("请求超时，请重试！");
			}
		});			
    },
    /**
     * 查询回调函数
     */
    callBack : function() {
        
    },
    
    downInstruction : function() {
    	linkForm.action = '/hlcj/hljcxx_downloadTemplateFile.do?path=/HlcjPlat/template/YGZHYXTCZSM.zip&showname=营改增货运系统操作说明';
    	linkForm.enctype = '';
    	linkForm.submit();
    }
};
/**
 * 增加操作列菜单
 * @param {} e
 */
function onActionRenderer (e) {
   	var record = e.record;
	var sbsq = mini.get("sbsq").getFormValue();
	var dqrq = FormOp.dqrq.substr(0,6);
	if(e.field == "TJZT") {
		if(record.TJZT == "N") {
			e.cellHtml = '未提交';
		}else if(record.TJZT == "Y") {
			e.cellHtml = '已提交';
		}else{
			e.cellHtml = '未知';
		}
		
	}else if(e.field == "SHZT") {
		if(record.SHZT == "01") {
			e.cellHtml = '审核通过';
		}else if(record.SHZT == "02") {
			e.cellHtml = '退回';
		}else{
			e.cellHtml = '--';
		}
	}else if(e.field == "opt") {
		if (getMonthDiff(sbsq, dqrq) == 1) {
			//说明是当期
			if ((parseInt(FormOp.dqrq) >= parseInt(formatDateToString(FormOp.cjrqq)))
					&& (parseInt(FormOp.dqrq) <= parseInt(formatDateToString(FormOp.cjrqz)))) {
					e.cellHtml = '<a href="javascript:doSjcjInput(\'' + record.BDDM + '\',\''+ record.BDMC +'\',\''+ mini.get("sbsq").getFormValue() +'\',\''+ record.SHZT +'\',1,\''+ record.THBZ +'\')" class="list_textlink">填写</a>';
			}
			if ((parseInt(FormOp.dqrq) >= parseInt(formatDateToString(FormOp.shrqq)))
						&& (parseInt(FormOp.dqrq) <= parseInt(formatDateToString(FormOp.shrqz)))) {
				if(record.SHZT=="02") {
					e.cellHtml = '<a href="javascript:doSjcjInput(\'' + record.BDDM + '\',\''+ record.BDMC +'\',\''+ mini.get("sbsq").getFormValue() +'\',\''+ record.SHZT +'\',2,\''+ record.THBZ +'\')" class="list_textlink">填写</a>';
				}else {
					e.cellHtml = '<a href="javascript:doSjcjInput(\'' + record.BDDM + '\',\''+ record.BDMC +'\',\''+ mini.get("sbsq").getFormValue() +'\',\''+ record.SHZT +'\',2,\''+ record.THBZ +'\')" class="list_textlink">查看</a>';
				}
			}
		} else if (getMonthDiff(sbsq, dqrq) > 1) {
			//说明是往期
			e.cellHtml = '<a href="javascript:doSjcjInput(\'' + record.BDDM + '\',\''+ record.BDMC +'\',\''+ mini.get("sbsq").getFormValue() +'\',\''+ record.SHZT +'\',3,\''+ record.THBZ +'\')" class="list_textlink">查看</a>';
		}
		
		
	} else if(e.field == "BYCJQX") {
		e.cellHtml = '<font style="color:red;">' + record.BYCJQX + '</font>';
	}
}
/**
 * 数据采集
 * @param bddm
 * @param bdmc
 * @param sbrq
 * @param shzt
 * @return
 */
function doSjcjInput(bddm, bdmc, sbrq, shzt, sssqbz, thbz) {
	
	var url = "";
	if(bddm == "CJGL_QYJCXXBAB") {
		url = "../../../pages/sb/hbcjgl/sjcj_qyjcxxbab_query.html";
	}else if(bddm == "CJGL_CYSSXXCJB") {
		url = "../../../pages/sb/hbcjgl/sjcj_cyssxxcjb_query.html";
	}else if(bddm == "CJGL_QTHYSBXXCJB") {
		url = "../../../pages/sb/hbcjgl/sjcj_qthysbxxcjb_query.html";
	}else if(bddm == "CJGL_DCYSMXQK") {
		url = "../../../pages/sb/hbcjgl/sjcj_dcysmxqk_query.html";
	}else if(bddm == "CJGL_FYYWHTBAB") {
		url = "../../../pages/sb/hbcjgl/sjcj_fyywhtbab_query.html";
	}else if(bddm == "CJGL_CPYCRKXXYB") {
		url = "../../../pages/sb/hbcjgl/sjcj_cpycrkxxyb_query.html";
	}
	FormOp.paramMap.bddm = bddm;
	FormOp.paramMap.sbrq = sbrq;
	FormOp.paramMap.shzt = shzt;
	FormOp.paramMap.sssqbz = sssqbz;
	FormOp.paramMap.thbz = thbz;
	FormOp.paramMap.jsessionid = FormOp.requestData.JSESSIONID;
	if (FormOp.requestData.sjly == null || FormOp.requestData.sjly == ""
			|| typeof (FormOp.requestData.sjly) == "undefined"
			|| FormOp.requestData.sjly == "undefined") {
		FormOp.paramMap.sjly = "01";
	}else {
		FormOp.paramMap.sjly = FormOp.requestData.sjly;
	}
	var win = mini.open({
		url : url,
		showMaxButton : true,
		allowResize : false,
		currentWindow : true,
		title : "数据采集【" + bdmc + "】",
		width : "800",
		height : "600",
		ondestroy : function(action) {
			FormOp.doQuery();
		}
	});
	win.max();
}

/**
 * 初始化查询
 * @param e
 * @return
 */
var querysbxx = function(e) {
	FormOp.datagrid.clearRows();
	FormOp.doQuery();
}
/**
 * 
 * @param str
 * @return
 */
function formatDateToString(str) {
	return mini.formatDate(new Date(Date.parse(str.replace(/-/g,"/"))),'yyyyMMdd');
}



/*
function getNsrxxVO() {
	var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
	// 暂时处理客户端多企业切换登录session未清理的问题
	var suiSessionId = SUI.store.get("JSESSIONID");
	var cookie_val = getCookie("JSESSIONID");
	if (nsrData != null && cookie_val != suiSessionId) {
		nsrData = null;
		SUI.store.remove("NsrjbxxVO");
		SUI.store.remove("JSESSIONID");
	}
	if (nsrData == null) {
		$.ajax( {
			url : "/login/login_getNsrxxVo.ashx?JSESSIONID="+cookie_val,
			type : "post",
			async : false,
			success : function(data) {
				var returndata = mini.decode(data);
				if (returndata.data) {
					var str = JSON.stringify(returndata.data);
					SUI.store.set("NsrjbxxVO", str);
					SUI.store.set("JSESSIONID", cookie_val);
					nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
				} else {
					mini.alert("未获取到纳税人信息!");
					return;
				}
			}
		});
	}
	return nsrData;
}

*/
/**
 * 处理客户端多企业切换登录session未清理的问题
 * 现在修改为每次进入采集功能时候，都把数据更新一下
 */
function getNsrxxVO() {
	var nsrData = null;
	// 暂时处理客户端多企业切换登录session未清理的问题
	var suiSessionId = SUI.store.get("JSESSIONID");
	var cookie_val = getCookie("JSESSIONID");
	SUI.store.remove("NsrjbxxVO");
	SUI.store.remove("JSESSIONID");
	$.ajax({
		url : "/login/login_getNsrxxVo.ashx?",
		type : "post",
		async : false,
		success : function(data) {
			var returndata = mini.decode(data);
			if (returndata.data) {
				var str = JSON.stringify(returndata.data);
				SUI.store.set("NsrjbxxVO", str);
				SUI.store.set("JSESSIONID", cookie_val);
				nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
			} else {
				mini.alert("登录超时，请重新登录软件!");
				return;
			}
		}
	});
	return nsrData;
}
/**
 * 
 * @param djxh
 * @return
 * @description 如果返回true 说明是小规模纳税人；如果返回false 说明是一般纳税人
 */
function getZzsNsrlx(djxh) {
	debugger;
	var nsrflag = "";
	$.ajax({
		url : "/gzcx/gzcxAction_queryNsrzglx.ashx",
		type : "post",
		data : {
			"djxh" : djxh
		},
		async : false,
		success : function(res) {
			var data = mini.decode(res);
			var ybnsrbz = "";
			if(data.data) {
				ybnsrbz = data.data;
				if(ybnsrbz == "201" || ybnsrbz == "202" || ybnsrbz == "203") {
					nsrflag = "yb";
				}else {
					nsrflag = "xgm";
				}
			}else {
				nsrflag = "xgm";
			}
		}
	});
	return nsrflag;
}

function getCookie(name) {
	var c = new Object();
	var i = 0;
	var clen = document.cookie.length;
	while (i < clen) {
		var endstr = document.cookie.indexOf(";", i);
		if (endstr == -1)
			endstr = document.cookie.length;

		var v = unescape(document.cookie.substring(i, endstr));
		var key = v.substring(0, v.indexOf("=", 0));
		var val = v.substring(v.indexOf("=") + 1);
		c[key] = val;
		i = endstr + 2;
	}
	if (name)
		return c[name] == undefined ? "" : c[name];
	return "";
}

/**
 * 获取跳转时候传递的参数
 * @return
 */
function GetRequest() {
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function getMonthDiff(sjq, sjz) {
	var months;
	var year1 = sjq.substr(0, 4);
	var year2 = sjz.substr(0, 4);
	var month1 = sjq.substr(4, 2);
	var month2 = sjz.substr(4, 2);
	months = (year2 - year1)*12 + (parseInt(month2) - parseInt(month1));
	return months <=0 ? 0 :months;
}


/**
 * 初始化
 */
jQuery(document).ready(function(){
	FormOp.nsrData = getNsrxxVO();
    FormOp.init();
});
