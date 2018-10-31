<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_zzsyjsk_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.sb_zzsyjsk_201605" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">

<html>

<head>
<title>增值税预缴税款表</title>
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
  <script type="text/javascript" src="javascript/sb_zzsyjsk.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="../css/forView.css">
</head>


<body style="padding:0 20 0 20;" >
<form  name="form1" METHOD=POST ACTION="sbtj_zzsyjsk.jsp">
<table border="0" width="760" align="center">
   <tr>
    <td width="760" colspan="3">
      <div align="center"><b>增值税预缴税款表</b></div>
    </td>
  </tr>
  <tr>
    <td width="760" colspan="3" height="35px">
      <div align="center" id="title_sssq"></div>
    </td>
  </tr>
  <tr>
    <td width="760" colspan="3"></td>
  </tr>
</table>
  <table width="760" class="border" align="center" id="tabList">
  <tr>
    <td width="132" bgcolor="#DFDFDF">纳税人识别号：</td>
    <td colspan="2" id="title_nsrsbh">&nbsp;</td>
    <td colspan="3" bgcolor="#DFDFDF">是否适用一般计税方法：是 
      <input type="checkbox" name="ybnsr_bz_checkbox"  id="ybnsr_bz_y"   value="Y" size="3">
      否 
      <input type="checkbox" name="ybnsr_bz_checkbox"  id="ybnsr_bz_n"   value="N" size="3"></td>
    </tr>
  <tr>
    <td bgcolor="#DFDFDF">纳税人名称：（公章）</td>
    <td colspan="2" id="title_nsrmc">&nbsp;</td>
    <td colspan="3" align="right" bgcolor="#DFDFDF">金额单位：元（列至角分）</td>
    </tr>
  <tr>
    <td colspan="2" bgcolor="#DFDFDF" align="center">项目编号</td>
    <td><input type="text" name="xmbh" id="xmbh" value="" size="15" validateType='{"type":"string"}'></td>
    <td bgcolor="#DFDFDF" align="center">项目名称</td>
    <td colspan="2"><input type="text" name="xmmc" id="xmmc" value="" size="30" validateType='{"type":"string"}'></td>
  </tr>
  <tr>
    <td colspan="2" bgcolor="#DFDFDF" align="center">项目地址</td>
    <td colspan="4"><input type="text" name="xmdz" id="xmdz" value="" size="60" validateType='{"type":"string"}'></td>
  </tr>
  <tr>
    <td colspan="2" rowspan="2" bgcolor="#DFDFDF" align="center">预征项目和栏次</td>
    <td width="129" bgcolor="#DFDFDF" align="center">销售额</td>
    <td width="119" bgcolor="#DFDFDF" align="center">扣除金额</td>
    <td width="118" bgcolor="#DFDFDF" align="center">预征率</td>
    <td width="125" bgcolor="#DFDFDF" align="center">预征税额</td>
  </tr>
  <tr>
    <td width="129" bgcolor="#DFDFDF" align="center">1</td>
    <td width="119" bgcolor="#DFDFDF" align="center">2</td>
    <td width="118" bgcolor="#DFDFDF" align="center">3</td>
    <td width="125" bgcolor="#DFDFDF" align="center">4</td>
  </tr>
  <tr>
    <td bgcolor="#DFDFDF" align="center">建筑服务</td>
    <td width="123" bgcolor="#DFDFDF" align="center">1</td>
    <td width="129" align="right"><input type="text" name="xse" id="xse_1" value="0" size="15" 
                           validateType='{"type":"float","arrays":[0]}'></td>
    <td align="right"> <input type="text" name="kcje" id="kcje_1" value="0" size="15" validateType='{"type":"float"}'></td>
     <td align="right"><input type="text" name="yzl" id="yzl_1" value="0%" size="15"></td>
    <td width="125" align="right"><input type="text" name="yzse" id="yzse_1" value="0" size="15"
                           validateType='{"type":"float","arrays":[0]}'></td>
  </tr>
  <tr>
    <td bgcolor="#DFDFDF" align="center">销售不动产</td>
    <td width="123" bgcolor="#DFDFDF" align="center">2</td>
    <td width="129" align="right"><input type="text" name="xse" id="xse_2" value="0" size="15"
                           validateType='{"type":"float","arrays":[0]}'></td>
    <td align="right"><input type="text" name="kcje" id="kcje_2" value="0" size="15" validateType='{"type":"float"}'></td>
    <td align="right"><input type="text" name="yzl" id="yzl_3" value="0%" size="15"></td>
    <td width="125" align="right"><input type="text" name="yzse" id="yzse_2" value="0" size="15"
                           validateType='{"type":"float","arrays":[0]}'></td>
  </tr>
  <tr>
    <td width="132" bgcolor="#DFDFDF" align="center">出租不动产</td>
    <td width="123" bgcolor="#DFDFDF" align="center">3</td>
    <td width="129" align="right"><input type="text" name="xse" id="xse_3" value="0" size="15"
                           validateType='{"type":"float","arrays":[0]}'></td>
    <td align="right"><input type="text" name="kcje" id="kcje_3" value="0" size="15" validateType='{"type":"float"}' disabled="true">
    </td>
    <td align="right"><input type="text" name="yzl" id="yzl_3" value="0%" size="15"></td>
    <td width="125" align="right"><input type="text" name="yzse" id="yzse_3" value="0" size="15"
                           validateType='{"type":"float","arrays":[0]}'></td>
  </tr>
 
  <tr>
    <td width="132" height="17" align="center" bgcolor="#DFDFDF">合计</td>
    <td width="123" bgcolor="#DFDFDF" align="center">6</td>
    <td width="129" align="right"><input type="text" name="xse" id="xse_hj" value="0" size="15" validateType='{"type":"float"}'
                           disabled="true"></td>
    <td align="right"><input type="text" name="kcje" id="kcje_hj" value="0" size="15" validateType='{"type":"float"}' disabled="true">
    </td>
    <td align="center"><input type="text" name="yzl" size="15" value="0"
               validateType='{"type":"float4","required":true,"arrays":[0,100],"moreMin":false,"lessMax":false}'
               disabled="true"></td>
    <td width="125" align="right"><input type="text" name="yzse" id="yzse_hj" value="0" size="15" validateType='{"type":"float"}'
                           disabled="true"></td>
  </tr>
  <tr>
    <td height="95" bgcolor="#DFDFDF" align="center">授权声明</td>
    <td colspan="2" bgcolor="#DFDFDF" >&nbsp; 如果你已委托代理人填报，请填写下列<br>
      资料：<br>
     &nbsp; 为代理一切税务事宜，现授权<br>
     （地址）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; 为本次纳税人的代理<br>
     填报人，任何与本表有关的往来文件，都可寄予此人。<br>
      授权人签字：</td>
    <td bgcolor="#DFDFDF" align="center">填表人申明</td>
    <td colspan="2" bgcolor="#DFDFDF">以上内容是真实的、可靠的、完整的。<br>
        <br>
        <br>
      纳税人签字：</td>
  </tr>
</table>
<input type="hidden" value="E9D5DA3E48C7D580E4D00EFEF3DF6286" name="pzxh" id="pzxh"><!--特殊业务需求-->
<input type="hidden" value="0" name="sub" id="sub"><!--sub-->
<input type="hidden" value="print" name="logic" id="logic"><!--页面类型 sb、update、dis、print-->
<input type="hidden" value="911309297926995093" name="nsrsbh" id="nsrsbh"><!--nsrsbh-->
<input type="hidden" value="河北宽广公路养护有限责任公司" name="nsrmc" id="nsrmc"><!--nsrsbh-->
<input type="hidden" value="10111309000016572143" name="nsrdzdah" id="nsrdzdah"><!--nsrdzdah--->
<input type="hidden" value="2017-01-01" name="sssqq" id="sssqq"><!--sssqq-->
<input type="hidden" value="2017-01-31" name="sssqz" id="sssqz"><!--sssqz--->
<input type="hidden" value="" name="web_jndi" id="web_jndi"><!--jndi-->
<input type="hidden" value="" name="ybnsr_bz" id="ybnsr_bz">
<br><br>

</FORM>


<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>

</html>
 

