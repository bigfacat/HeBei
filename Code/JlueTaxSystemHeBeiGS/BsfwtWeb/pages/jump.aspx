<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jump.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.jump" %>



<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>中间页面</title>
</head>
<body>
<script type="text/javascript" src="../scripts/boot.js"></script>
<script>
	//获取url中的参数
	function getUrlParam(param) {
	    var reg = new RegExp("(\\\?|&)" + param + "=([^&]+)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var href = decodeURI(window.location.href);
	    var r = href.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	
	function getTargetUrl() {
		var href = decodeURI(window.location.href);
		var pos = href.indexOf("target")+7;
		return href.substr(pos);
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

	function getNsrxxVO() {
		var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
		// 暂时处理客户端多企业切换登录session未清理的问题
		var suiSessionId = SUI.store.get("JSESSIONID");
		var cookie_val = getCookie("JSESSIONID");
		if(nsrData!=null && cookie_val!=suiSessionId){
			nsrData = null;
			SUI.store.remove("NsrjbxxVO");
			SUI.store.remove("JSESSIONID");
		}
		if (nsrData == null) {
			$.ajax({
				url : "/login/login_getNsrxxVo.ashx?",
				type : "post",
				async : false,
				success : function(data) {
					var returndata = mini.decode(data);
					if (returndata.data) {
						var str = JSON.stringify(returndata.data);
						SUI.store.set("NsrjbxxVO", str);
						SUI.store.set("JSESSIONID",cookie_val);
						nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
					} else {
						return;
					}
				}
			});
		}
		return nsrData;
	}

	var target = getTargetUrl(); //getUrlParam("target");
	if (target && target.length>0) {
		//console.log(service);
		//获取nsrxxvo,保存到本地session
		var nsrData = getNsrxxVO();
		//console.log(nsrData);
		window.location.href=target;
	}
</script>
</body>
</html>
