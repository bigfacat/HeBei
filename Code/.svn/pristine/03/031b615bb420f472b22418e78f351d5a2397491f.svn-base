<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_zzs_bdcfqdk_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.sb_zzs_bdcfqdk_201605" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">





<html>

<head>
<title>不动产分期抵扣计算表</title>
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
    <script type="text/javascript" src="javascript/sb_zzs_bdcfqdk.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="../css/forView.css">
</head>

<body style="padding:0 20 0 20;" >
<form  name="form1" METHOD=POST ACTION="sbtj_zzs_bdcfqdk">
<table border="0" width="733" align="center">
   <tr>
    <td colspan="3">
        <div align="center"><b>增值税纳税申报表附列资料（五）</b></div>
    </td>
  </tr>
     <tr>
    <td colspan="3" align="center">
        <div align="center"><b>不动产分期抵扣计算表</b></div>
    </td>
  </tr>
  <tr>
    <td colspan="3" height="17">
        <div align="center" id="title_sssq"></div>
    </td>
  </tr>
    <tr>
    <td width="293" id="title_nsrmc"></td>
    <td width="235">&nbsp;</td>
    <td width="191" align="right">金额单位：元至角分</td>
  </tr>
</table>
    <table width="733" class="border" align="center" id="tabList">
  <tr>
    <td width="119" bgcolor="#DFDFDF" align="center">期初待抵扣不动<br>产进项税额</td>
    <td width="120" bgcolor="#DFDFDF" align="center">本期不动产进项<br>税额增加额</td>
    <td width="121" bgcolor="#DFDFDF" align="center">本期可抵扣不动<br>产进项税额</td>
    <td width="121" bgcolor="#DFDFDF" align="center">本期转入的待抵<br>扣不动产进项税额</td>
    <td width="119" bgcolor="#DFDFDF" align="center">本期转出的待抵<br>扣不动产进项税额</td>
    <td width="119" bgcolor="#DFDFDF" align="center">期末待抵扣不动<br>产进项税额</td>
  </tr>
  <tr>
    <td width="119" bgcolor="#DFDFDF" align="center">1</td>
    <td width="120" bgcolor="#DFDFDF" align="center">2</td>
    <td width="121" bgcolor="#DFDFDF" align="center">3≤1+2+4</td>
    <td width="121" bgcolor="#DFDFDF" align="center">4</td>
    <td width="119" bgcolor="#DFDFDF" align="center">5≤1+4</td>
    <td width="119" bgcolor="#DFDFDF" align="center">6=1+2-3+4-5</td>
  </tr>
  <tr>
      <td width="119"><input type="text" name="qcye" id="qcye" value="0" size="15" validateType='{"type":"float"}'
                             disabled></td>
      <td width="120"><input type="text" name="bqzje" id="bqzje" value="0" size="15" validateType='{"type":"float"}'>
      </td>
      <td width="121"><input type="text" name="bqdke" id="bqdke" value="0" size="15" validateType='{"type":"float"}'>
      </td>
      <td width="121"><input type="text" name="bqzr_dke" id="bqzr_dke" value="0" size="15"
                             validateType='{"type":"float"}'></td>
      <td width="119"><input type="text" name="bqzc_dke" id="bqzc_dke" value="0" size="15"
                             validateType='{"type":"float"}'></td>
      <td width="119"><input type="text" name="qmye" id="qmye" value="0" size="15" validateType='{"type":"float"}'
                             disabled></td>
  </tr>
</table><br><br>

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
 

