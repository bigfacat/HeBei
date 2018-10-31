<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="JlueTaxSystemHBGS.WssbProject.index" %>






<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>初始化页面</title>
	<link type="text/css" rel="stylesheet" href="/WssbProject/css/global.css" />
	<script type="text/javascript" src="/WssbProject/js/jquery/jquery.js"></script>
	<style type="text/css">
	.bg{ 
	    position: absolute; 
	    top:0; 
	    left:0; 
	    z-index: -1; 
	    width: 100%; 
	    height: 100%; 
	}
	</style>
	<script type="text/javascript">
		$(function() {
			zegUser('911309297926995093','11309290000','0');
		});
		function zegUser(sh,swjg_dm,isreg){
			if(isreg=='0'){
				$.ajax({
					url : "/WssbProject/tax/toTaxHome.ashx",
					type : "post",
					data : {"sh":sh,"swjg_dm":swjg_dm},
					dataType : "json",
					success : function(data) {
						if (data.isOk=="1") {
						document.getElementById("sh").value="911309297926995093";
						document.getElementById("armId").value=data.msg;
						document.getElementById("fid").submit();
						} else if (data.isOk=="2") { 	
							//未初始化扫描枪
							$("#info2").css("display", "block");
							$("#csh").css("display", "block");
							return;
						}else{
							//失败
							$("#info1").css("display", "block");
							return;
						} 
					}
				});
			}else{
				$("#info3").css("display", "block");
			}
		}
		function download(obj){   
			    if(document.all.ifrm==null){   
				    objIframe=document.createElement("IFRAME");   
				    document.body.insertBefore(objIframe);
				    objIframe.outerHTML="<iframe name=ifrm style='width:0;hieght:0;display:none;'  src="+obj.href+"></iframe>";   
				 	re=setTimeout("download()",1);
			    }   
			    else{   
				    clearTimeout(re);   
				    files=window.open(obj.href,"ifrm");   
				    files.document.execCommand("SaveAs");   
				    document.all.ifrm.removeNode(true);   
	 }
	 }
	 
	 
	 
	 function openfile()
	 {
	 window.popen('帮助文档.doc');
	 }
	 
	 
	 function csh()
		{
		alert("设备未初始化，请联系后台运维人员！");
		}
		
		function sm()
		{
		alert("扫描枪未初始化，请联系后台运维人员！");
		}
		
		function wh()
		{
		alert("设备正在维护中！。。。。。。");
		}
	</script>	
</head>
<body scroll="no">

<form action="/WssbProject/tax/mainIndex.jsp" method="post" id="fid">
<input type="hidden" name="sh" id="sh" value="" />
<input type="hidden" name="armId" id="armId" value="" />
</form>



		<div id="info1" style="display: none;" onclick="csh()">
			<img src="/WssbProject/images/new/bg.bmp" class="bg"/>
		</div>
		<div id="info2" style="display: none;" onclick="sm()">
			<img src="/WssbProject/images/new/bg.bmp" class="bg"/>
		</div>
		<div id="info3" style="display: none;" onclick="wh()">
			<img src="/WssbProject/images/new/bg.bmp" class="bg"/>
		</div>
		<div id="stm" style="height: 0px; width: 0px;display: none;"></div>	
</body>
</html>
