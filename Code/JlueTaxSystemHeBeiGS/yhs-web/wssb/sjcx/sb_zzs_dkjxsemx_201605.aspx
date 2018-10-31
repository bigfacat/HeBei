<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_zzs_dkjxsemx_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.sb_zzs_dkjxsemx_201605" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">





<html>

<head>
<title>本期抵扣进项税额结构明细表</title>
<script language="javascript">
window.onerror = handle_error;

function handle_error(message, url, line){
	return true;
}


function isreal(thestr) {
	if ((thestr=="0.00")||(thestr=="0")||(thestr=='')) {
		return 0;
	}
	var dotlst=thestr.indexOf(".");
	var dotend=thestr.length;
	if ((dotlst==-1)||(dotend - dotlst<=3)) {
		return thestr;
	}
	else {
		var dot2nd=thestr.indexOf(".");
		var intpart=thestr.substring(0, dot2nd+3);
		var decpart=thestr.substring(dot2nd+3,dot2nd+4);
		if(parseInt(decpart)>=5) {
			decpart="0.01";
			var thestr1=parseFloat(intpart);
			if(thestr1>0) {
				thestr1=thestr1+parseFloat(decpart);
			}
			else {
				thestr1=thestr1-parseFloat(decpart);
			}
			thestr=String(thestr1).substring(0,dot2nd+3);
		}
		else {
			thestr=intpart;
		}
		return thestr;
	}
}

function convert(thestr) {
	if ((thestr=="0.00")||(thestr=="0")||(thestr=='')) {
		return 0;
	}
	var dotlst=thestr.indexOf(".");
	var dotend=thestr.length;
	if ((dotlst==-1)||(dotend - dotlst<=3)) {
		return thestr;
	}
	else {
		var dot2nd=thestr.indexOf(".");
		var intpart=thestr.substring(0, dot2nd+3);
		var decpart=thestr.substring(dot2nd+3,dot2nd+4);
		if(parseInt(decpart)>=5) {
			decpart="0.01";
			var thestr1=parseFloat(intpart);
			if(thestr1>0) {
				thestr1=thestr1+parseFloat(decpart);
			}
			else {
				thestr1=thestr1-parseFloat(decpart);
			}
			thestr=String(thestr1).substring(0,dot2nd+3);
		}
		else {
			thestr=intpart;
		}
		return thestr;
	}
}

function IsNumber(string) { 
	var number; 
	var i_blank=string.indexOf(" ");
	if(string==null) {
		return false;
	}
	if(string.length==0) {
		return false;
	}
	if(i_blank==0) {
		return false;
	}
	number = new Number(string); 
	if(isNaN(number)) {
		return false; 
	}
	else {
		return true; 
	}
}
function IsDate(string)
{
 var b_rtn=true;
 var i_ln;
 var sub_rq;  
 var str_rq;
  if(string.length!=8)
 {
   return false;
 }
 for(var i=0;i<8;i++)
 {
   sub_rq=string.substring(i,i+1);
   str_rq=String(sub_rq);
   if(!IsNumber(str_rq))
   {
    b_rtn=false;
    return b_rtn;
   }
 }
 var sub_mm1=string.substring(4,6);
 var sub_day1=string.substring(6,8);
 
 var sub_mm=parseInt(sub_mm1,10);
 var sub_day=parseInt(sub_day1,10);
 if(sub_mm<1||sub_mm>12)
  {
    b_rtn=false;
    return b_rtn;
   }
 if(sub_day<1||sub_day>31)
  {
    b_rtn=false;
    return b_rtn;
  }

  return b_rtn;
}
function IsInt(string) { 
	var number; 
	var i_blank=string.indexOf(" ");
	if (string==null) {
		return false;
	}
	if(string.length==0) {
		return false; 
	}
	if(i_blank==0) {
		return false; 
	}
	number = new Number(string); 
	if(isNaN(number)) {
		return false;
	}
	else {
		if(number>=0) {
			var dotlst=string.indexOf(".");
			if(dotlst==-1) {
				return true;
			}
		}
		else {
			return false;
		}
	}
}

function enterdown (column) {
	try{
		var columnobject =column;
		var obj = document.form1.elements[columnobject];
		if (event.keyCode==13 && (obj!=null)) {
			if ((obj.type=="text") && (!obj.disabled)) {
				obj.focus();
				obj.select();
			}
		}
	}catch(e){
	}
}

function changSE (JEcol,SEcol) {
	
	var JE=parseFloat(JEcol.value);
	var SE=parseFloat(SEcol.value);
	if (JE<0) JE = 0 - JE;
	if (SE<0) SE = 0 - SE;
	if( (JE*0.18)<SE )
	{
	  alert("税额不能超过金额的17%，请重新输入!");
	  SEcol.value="0.00";
	}	
}

function changJE (JEcol,SEcol) {
	
	var JE=parseFloat(JEcol.value);
	var SE=parseFloat(SEcol.value);
	if (JE<0) JE = 0 - JE;
	if (SE<0) SE = 0 - SE;
	if( (JE*0.18)<SE )
	{
	  alert("税额不能超过金额的17%，请重新输入!");
	  SEcol.value="0.00";
	  JEcol.value="0.00";
	}	
}
//验证String中不能含有特殊字符
function checkString(str)
{
	var reStr = /[＜＞《》〈〉<<>>&＆]/;
	var str1=str.value
	if(str1.match(reStr))
	{
		alert('字符串中不能含有<,>,&等特殊字符！');
		str.value="";
		return false;
	}
	else
	{
		//alert('字符串符合要求！');
		return true;
	}
}

String.prototype.trim = function() { 
return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 
 
String.prototype.ltrim = function() { 
return this.replace(/(^\s*)/g, ""); 
} 
 
String.prototype.rtrim = function() { 
return this.replace(/(\s*$)/g, ""); 
} 

</script>
<script type="text/javascript" src="../jquery1.5/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="../jquery1.5/json2.js"></script>
<script type="text/javascript" src="../jquery1.5/WssbUtilCK.js"></script>
  <script type="text/javascript" src="javascript/sb_zzs_dkjxsemx.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="../css/forView.css">
</head>

<body style="padding:0 20 0 20;" >
<form  name="form1" METHOD=POST ACTION="sbtj_zzsyjsk.jsp">
<table border="0" width="580" align="center">
   <tr>
    <td colspan="3">
      <div align="center"><b>本期抵扣进项税额结构明细表</b></div>
    </td>
  </tr>
  <tr>
    <td colspan="3" height="17">
      <div align="center" id="title_sssq"></div>
    </td>
  </tr>
  <tr>
    <td width="227" id="title_nsrmc"></td>
    <td width="151">&nbsp;</td>
    <td width="188" align="right">金额单位：元至角分</td>
</table>
  <table class="border" align="center" id="tabList">
  <tr>
    <td width="259"  bgcolor="#DFDFDF" align="center">项目</td>
    <td width="81"   bgcolor="#DFDFDF" align="center">栏次</td>
    <td width="113"  bgcolor="#DFDFDF" align="center">金额</td>
    <td width="113"   bgcolor="#DFDFDF" align="center">税额</td>
  </tr>
  <tr>
    <td height="31"  bgcolor="#DFDFDF" align="center">合计</td>
    <td width="81"  bgcolor="#DFDFDF" align="center">1=2+4+5+<br>
      11+16+18+<br>
      27+29+30</td>
    <td><input type="text" name="hj_je" id="hj_je" value="0" size="15" validateType='{"type":"float"}' disabled></td>
    <td><input type="text" name="hj_se" id="hj_se" value="0" size="15" validateType='{"type":"float"}' disabled></td>
  </tr>
  <tr>
    <td colspan="4" bgcolor="#DFDFDF" align="center">
      <div align="center"><b>一、按税率或征收率归集（不包括购建不动产、通行费）的进项</b></div>
    </td>
    </tr>
  <tr>
    <td width="259"  bgcolor="#DFDFDF">17%税率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">2</td>
    <td><input type="text" name="sl_17_je" id="sl_17_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_17_se" id="sl_17_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;其中：有形动产租赁的进项</td>
    <td  bgcolor="#DFDFDF" align="center">3</td>
    <td><input type="text" name="sl_17_qz_yxdczp_je" id="sl_17_qz_yxdczp_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_17_qz_yxdczp_se" id="sl_17_qz_yxdczp_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">13%税率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">4</td>
    <td><input type="text" name="sl_13_je" id="sl_13_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_13_se" id="sl_13_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">11%税率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">5</td>
    <td><input type="text" name="sl_11_je" id="sl_11_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_11_se" id="sl_11_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;其中：运输服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">6</td>
    <td><input type="text" name="sl_11_qz_ysfw_je" id="sl_11_qz_ysfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_11_qz_ysfw_se" id="sl_11_qz_ysfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 电信服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">7</td>
    <td><input type="text" name="sl_11_qz_dxfw_je" id="sl_11_qz_dxfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_11_qz_dxfw_se" id="sl_11_qz_dxfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 建筑安装服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">8</td>
    <td><input type="text" name="sl_11_qz_jzazfw_je" id="sl_11_qz_jzazfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_11_qz_jzazfw_se" id="sl_11_qz_jzazfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 不动产租赁服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">9</td>
    <td><input type="text" name="sl_11_qz_bdczpfw_je" id="sl_11_qz_bdczpfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_11_qz_bdczpfw_se" id="sl_11_qz_bdczpfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 受让土地使用权的进项</td>
    <td  bgcolor="#DFDFDF" align="center">10</td>
    <td><input type="text" name="sl_11_qz_srtdshq_je" id="sl_11_qz_srtdshq_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_11_qz_srtdshq_se" id="sl_11_qz_srtdshq_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">6%税率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">11</td>
    <td><input type="text" name="sl_6_je" id="sl_6_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_6_se" id="sl_6_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;其中：电信服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">12</td>
    <td><input type="text" name="sl_6_qz_dxfw_je" id="sl_6_qz_dxfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_6_qz_dxfw_se" id="sl_6_qz_dxfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 金融保险服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">13</td>
    <td><input type="text" name="sl_6_qz_jrbxfw_je" id="sl_6_qz_jrbxfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_6_qz_jrbxfw_se" id="sl_6_qz_jrbxfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 生活服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">14</td>
    <td><input type="text" name="sl_6_qz_shfw_je" id="sl_6_qz_shfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_6_qz_shfw_se" id="sl_6_qz_shfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 取得无形资产的进项</td>
    <td  bgcolor="#DFDFDF" align="center">15</td>
    <td><input type="text" name="sl_6_qz_qdwxzc_je" id="sl_6_qz_qdwxzc_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_6_qz_qdwxzc_se" id="sl_6_qz_qdwxzc_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">5%征收率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">16</td>
    <td><input type="text" name="sl_5_je" id="sl_5_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_5_se" id="sl_5_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;其中：不动产租赁服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">17</td>
    <td><input type="text" name="sl_5_qz_bdczpfw_je" id="sl_5_qz_bdczpfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_5_qz_bdczpfw_se" id="sl_5_qz_bdczpfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">3%征收率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">18</td>
    <td><input type="text" name="sl_3_je" id="sl_3_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_3_se" id="sl_3_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;其中：货物及加工、修理修配劳务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">19</td>
    <td><input type="text" name="sl_3_qz_hwjgxl_je" id="sl_3_qz_hwjgxl_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_hwjgxl_se" id="sl_3_qz_hwjgxl_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 运输服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">20</td>
    <td><input type="text" name="sl_3_qz_ysfw_je" id="sl_3_qz_ysfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_ysfw_se" id="sl_3_qz_ysfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 电信服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">21</td>
    <td><input type="text" name="sl_3_qz_dxfw_je" id="sl_3_qz_dxfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_dxfw_se" id="sl_3_qz_dxfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 建筑安装服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">22</td>
    <td><input type="text" name="sl_3_qz_jzazfw_je" id="sl_3_qz_jzazfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_jzazfw_se" id="sl_3_qz_jzazfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 金融保险服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">23</td>
    <td><input type="text" name="sl_3_qz_jrbxfw_je" id="sl_3_qz_jrbxfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_jrbxfw_se" id="sl_3_qz_jrbxfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 有形动产租赁服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">24</td>
    <td><input type="text" name="sl_3_qz_yxdczpfw_je" id="sl_3_qz_yxdczpfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_yxdczpfw_se" id="sl_3_qz_yxdczpfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 生活服务的进项</td>
    <td  bgcolor="#DFDFDF" align="center">25</td>
    <td><input type="text" name="sl_3_qz_shfw_je" id="sl_3_qz_shfw_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_shfw_se" id="sl_3_qz_shfw_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;&nbsp;&nbsp;&nbsp; 取得无形资产的进项</td>
    <td  bgcolor="#DFDFDF" align="center">26</td>
    <td><input type="text" name="sl_3_qz_qdwxzc_je" id="sl_3_qz_qdwxzc_je" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
    <td><input type="text" name="sl_3_qz_qdwxzc_se" id="sl_3_qz_qdwxzc_se" value="0" size="15"
               validateType='{"type":"float","stopPropagation":true}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">减按1.5%征收率的进项</td>
    <td  bgcolor="#DFDFDF" align="center">27</td>
    <td><input type="text" name="sl_15_je" id="sl_15_je" value="0" size="15" validateType='{"type":"float"}'></td>
    <td><input type="text" name="sl_15_se" id="sl_15_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
  <tr>
    <td  bgcolor="#DFDFDF">&nbsp;</td>
    <td  bgcolor="#DFDFDF" align="center">28</td>
    <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
    <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
  </tr>
  <tr>
    <td colspan="4" bgcolor="#DFDFDF" align="center"><span><b>二、按抵扣项目归集的进项</b></span></td>
    </tr>
    <tr>
    <td  bgcolor="#DFDFDF">用于购建不动产并一次性抵扣的进项</td>
    <td  bgcolor="#DFDFDF" align="center">29</td>
      <td><input type="text" name="dk_yygxbcsycxdk_je" id="dk_yygxbcsycxdk_je" value="0" size="15"
                 validateType='{"type":"float"}'></td>
      <td><input type="text" name="dk_yygxbcsycxdk_se" id="dk_yygxbcsycxdk_se" value="0" size="15"
                 validateType='{"type":"float"}'></td>
  </tr>
    <tr>
    <td  bgcolor="#DFDFDF">通行费的进项</td>
    <td  bgcolor="#DFDFDF" align="center">30</td>
      <td><input type="text" name="dk_txf_je" id="dk_txf_je" value="0" size="15" validateType='{"type":"float"}'></td>
      <td><input type="text" name="dk_txf_se" id="dk_txf_se" value="0" size="15" validateType='{"type":"float"}'></td>
  </tr>
    <tr>
    <td  bgcolor="#DFDFDF">&nbsp;</td>
    <td  bgcolor="#DFDFDF" align="center">31</td>
      <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
      <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
  </tr>
    <tr>
    <td  bgcolor="#DFDFDF">&nbsp;</td>
    <td  bgcolor="#DFDFDF" align="center">32</td>
      <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
      <td><input type="text" name="" id="" value="0" size="15" validateType='{"type":"float"}' disabled></td>
  </tr>
</table>
<br>

  <input type="hidden" value="E4865CD0C27D2C79528A37CBB8EEE790" name="pzxh" id="pzxh"><!--特殊业务需求-->
	<input type="hidden" value="0" name="sub" id="sub"><!--sub-->
	<input type="hidden" value="print" name="logic" id="logic"><!--页面类型 sb、update、dis、print-->
	<input type="hidden" value="911309297926995093" name="nsrsbh" id="nsrsbh"><!--nsrsbh-->
	<input type="hidden" value="河北宽广公路养护有限责任公司" name="nsrmc" id="nsrmc"><!--nsrsbh-->
	<input type="hidden" value="10111309000016572143" name="nsrdzdah" id="nsrdzdah"><!--nsrdzdah--->
	<input type="hidden" value="2017-01-01" name="sssqq" id="sssqq"><!--sssqq-->
	<input type="hidden" value="2017-01-31" name="sssqz" id="sssqz"><!--sssqz--->
	<input type="hidden" value="" name="web_jndi" id="web_jndi"><!--jndi-->  
</FORM>


<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>

</html>
 



