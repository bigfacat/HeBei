<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_nssbb_zzfw.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_nssbb_zzfw" %>

<!DOCTYPE html>
  

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>数据查询</title>
<link href="../css/zj.css" rel="stylesheet" type="text/css" />
<style  type="text/css">
 .menu-li-height{
height:28px;
}
</style>
</head>
<script type="text/javascript">
function warn()
{
    alert("该功能正在建设中");
}
function get_XHR(){
var xmlHttp;
try{
    xmlHttp=new XMLHttpRequest();

}catch(e){
try{
         xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");   
        }catch(e){
		
try{ 
	         xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); 	 	 
	          }catch(e){
	          alert("你的浏览器不支持ajax");
	          return false;	 
	    }        
   }
}
 return xmlHttp;
}

function fhsy(){
}
</script>
<body LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0>


</body>
</html>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">

<html>
<head>
<title>纳税申报表--打印</title>
<style>
.bottom_btn_div {
	height: 35px;
	margin: auto;
	text-align: center;
}
</style>
</head>
<body marginwidth="0" marginheight="0" topmargin="0">

	<table border="0" width=791 height="124" align="center"
		class="unnamed1" cellspacing="0" cellpadding="0"
		style="background-color: #fff;">

		<tr>
			<td width="100%" colspan="3"><br></td>
		</tr>
		<tr height=30>
			<td width="50"></td>
			<td width="760" align=left class="mypop" colspan='2'><b>申报表列表：</b>
			</div></td>
		</tr>
		<tr height=30>
			<td width="50"><br></td>
		</tr>
		
		<tr class="list-head-bg" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 增值税申报表</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_ybnsr_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 附列资料(表一)</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_flzl1_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="list-head-bg" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 附列资料(表二)</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_flzl2_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 固定资产进项税额抵扣情况表</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_flzl5_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="list-head-bg" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 附列资料(表三)</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_flzl3_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 附列资料(表四)</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_flzl4_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="list-head-bg" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 减免税申报明细表</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="print_zzs_jms_sbmxb_201605.aspx?k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 不动产分期抵扣计算表(附表5)</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="sb_zzs_bdcfqdk_201605.aspx?jspLogic=print&k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="list-head-bg" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 本期抵扣进项税额结构明细表</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="sb_zzs_dkjxsemx_201605.aspx?jspLogic=print&k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr class="" height=25>
			<td width="50"></td>
			<td width="460"><div align=left class="mypop">
					<b>增值税一般纳税人-- 营改增税负分析测算明细表</b>
				</div></td>
			<td width="300">
				<div class="bottom_btn_div">
					<a href="sb_zzs_sffxcsmxb_201605.aspx?jspLogic=print&k=0" target="_blank">查看明细</a>
				</div>
			</td>
		</tr>
		
		<tr>
			<td width="100%" colspan="3" align="center">
				<!-- <div class="bottom_btn_div"><a href="sb_sjcx.html"><img border="0" src="../image/fh.jpg"></a> -->
			</td>
		</tr>
	</table>
	</form>
</body>
</html>


