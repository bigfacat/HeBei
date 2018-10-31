<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_zzs_sffxcsmxb_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.sb_zzs_sffxcsmxb_201605" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">





<html>
<title>营改增税负分析测算明细表</title>
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
<script type="text/javascript" src="./javascript/sb_zzs_sffxcsmxb.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../css/forView.css">
</head>


<body style="padding:0 10 0 10; " onLoad="javascript:document.onkeydown=keyDown;">
<form  name="form1" METHOD=POST ACTION="">
  <table width="1613">
  <tr>
    <td width="1538" colspan="3">
      <div align="center"><b>营改增税负分析测算明细表</b></div>
    </td>
  </tr>
</table>
  <table width="1538">
  <tr>
    <td height="22"  align="center" colspan="3"  id="title_sssq"></td>
  </tr>
  <tr>
    <td width="33%" height="22"  align="left" id="title_nsrmc"></td>
	<td width="33%" height="22"  align="center" >&nbsp;</td>
    <td width="33%" height="22"  align="right">金额单位:   元至角分</td>
  </tr>
</table>
<form  name="form1" METHOD=POST ACTION="">

  <table width="1538" class="border" id="tabList">
    <tr>
      <td colspan="4" rowspan="3">项目及栏次</td>
      <td colspan="7"   bgcolor="#DFDFDF" align="center">增值税</td>
      <td colspan="7"   bgcolor="#DFDFDF" align="center">营业税</td>
    </tr>
    <tr>
      <td width="84" rowspan="2" align="center"   bgcolor="#DFDFDF">不含税销售额</td>
      <td width="83" rowspan="2" align="center"   bgcolor="#DFDFDF">销项(应纳)税额</td>
      <td width="82" rowspan="2" align="center"   bgcolor="#DFDFDF">价税合计</td>
      <td width="78" rowspan="2" align="center"   bgcolor="#DFDFDF">服务、不动产和无形资产扣除项目本期实际扣除金额</td>
      <td colspan="2"   bgcolor="#DFDFDF" align="center">扣除后</td>
      <td width="81" rowspan="2" align="center"   bgcolor="#DFDFDF">增值税应纳税额（测算）</td>
      <td colspan="5"   bgcolor="#DFDFDF" align="center">原营业税税制下服务、不动产和无形资产差额扣除项目</td>
      <td width="82" rowspan="2" align="center"   bgcolor="#DFDFDF">应税营业额</td>
      <td width="82" rowspan="2" align="center"   bgcolor="#DFDFDF">营业税应纳税额</td>
    </tr>
    <tr>
      <td width="80" align="center"   bgcolor="#DFDFDF">含税销售额</td>
      <td width="100" align="center"   bgcolor="#DFDFDF">销项(应纳)税额</td>
      <td width="78" align="center"   bgcolor="#DFDFDF">期初余额</td>
      <td width="80" align="center"   bgcolor="#DFDFDF">本期发生额</td>
      <td width="80" align="center"   bgcolor="#DFDFDF">本期应扣除金额</td>
      <td width="82" align="center"   bgcolor="#DFDFDF">本期实际扣除金额</td>
      <td width="81" align="center"   bgcolor="#DFDFDF">期末余额</td>
    </tr>
    <tr>
      <td width="200" colspan="2" align="center"   bgcolor="#DFDFDF">应税项目代码及名称</td>
      <td width="61" align="center"   bgcolor="#DFDFDF">增值税税率或征收率(%)</td>
      <td width="45" align="center"   bgcolor="#DFDFDF">营业税税率(%)</td>
      <td   bgcolor="#DFDFDF" align="center">1 </td>
      <td   bgcolor="#DFDFDF" align="center">2=1×增值税税率或征收率</td>
      <td   bgcolor="#DFDFDF" align="center">3=1+2</td>
      <td   bgcolor="#DFDFDF" align="center">4 </td>
      <td   bgcolor="#DFDFDF" align="center">5=3-4</td>
      <td   bgcolor="#DFDFDF" align="center">6=5÷(100%+增<br>值税税率或<br>征收率)×增<br>值税税率或<br>征收率</td>
      <td   bgcolor="#DFDFDF" align="center">7 </td>
      <td   bgcolor="#DFDFDF" align="center">8 </td>
      <td   bgcolor="#DFDFDF" align="center">9 </td>
      <td   bgcolor="#DFDFDF" align="center">10=8+9</td>
      <td   bgcolor="#DFDFDF" align="center">11（11≤3且11≤10）</td>
      <td   bgcolor="#DFDFDF" align="center">12=10-11</td>
      <td   bgcolor="#DFDFDF" align="center">13=3-11</td>
      <td   bgcolor="#DFDFDF" align="center">14=13×营业税税率</td>
    </tr>
    <tr>
      <td colspan="2">合计</td>
      <td   bgcolor="#DFDFDF" align="center">--</td>
      <td   bgcolor="#DFDFDF" align="center">--</td>
      <td ><input type="text" name="zj_zzs_bhsxse"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_xxse"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_jshj"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_bqsjkce"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_hsxse_kch"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_xxse_kch"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_zzs_ynse_cs"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_qcye"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_bqfse"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_bqykce"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_bqsjkce"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_qmye"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_ysyye"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zj_yys_ynse"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
    </tr>
    <tbody id="danyRow">
	 <tr>
	  <td width="35"  align="center" ><input type="button" name="danyRowBtn" id="danyRowBtnAdd" optionType="add" value="+" size="3" style="width:30px"></td>
      <td  colspan="1" ><select name="ygzsd_zzspm_dm" style="width:180px"><option value="" selected> </option></select><input type="hidden" value="" name="ygzsd_zzspm_mc"></td>
      <td  align="center"><select name="zzs_sl" style="width:50px"><option value="0" selected> </option></select></td>
      <td  align="center"><select name="yys_sl" style="width:50px"><option value="0" selected> </option></select></td>
      <td ><input type="text" name="zzs_bhsxse"   value="0" size="10" validateType='{"type":"float"}'></td>
      <td ><input type="text" name="zzs_xxse"   value="0" size="10" validateType='{"type":"float"}' oldvalue="0"></td>
      <td ><input type="text" name="zzs_jshj"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zzs_bqsjkce"   value="0" size="10" validateType='{"type":"float"}'></td>
      <td ><input type="text" name="zzs_hsxse_kch"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="zzs_xxse_kch"   value="0" size="10" validateType='{"type":"float"}' oldvalue="0"></td>
      <td ><input type="text" name="zzs_ynse_cs"   value="0" size="10" validateType='{"type":"float"}'  oldvalue="0"></td>
      <td ><input type="text" name="yys_qcye"   value="0" size="10" validateType='{"type":"float"}'></td>
      <td ><input type="text" name="yys_bqfse"   value="0" size="10" validateType='{"type":"float"}'></td>
      <td ><input type="text" name="yys_bqykce"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="yys_bqsjkce"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="yys_qmye"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="yys_ysyye"   value="0" size="10" validateType='{"type":"float"}' disabled="true"></td>
      <td ><input type="text" name="yys_ynse"   value="0" size="10" validateType='{"type":"float"}' oldvalue="0"></td>
    </tr>
  </table>
  </tbody>
<input type="hidden" value="" name="zb_11_yb" id="zb_11_yb"><!--《增值税纳税申报表（一般纳税人适用）》主表第11栏“销项税额”“一般项目”“本月数”-->
<input type="hidden" value="" name="zb_19_yb" id="zb_19_yb"><!--增值税纳税申报表（一般纳税人适用）主表第19栏“应纳税额”“一般项目”“本月数”-->
<input type="hidden" value="2017" name="sbnd" id="sbnd"><!--申报年度-->
<input type="hidden" value="E4865CD0C27D2C79528A37CBB8EEE790" name="pzxh" id="pzxh"><!--特殊业务需求-->

<input type="hidden" value="0" name="sub" id="sub"><!--sub-->
<input type="hidden" value="print" name="logic" id="logic"><!--页面类型 sb、update、dis、print-->
<input type="hidden" value="911309297926995093" name="nsrsbh" id="nsrsbh"><!--nsrsbh-->
<input type="hidden" value="河北宽广公路养护有限责任公司" name="nsrmc" id="nsrmc"><!--nsrsbh-->
<input type="hidden" value="10111309000016572143" name="nsrdzdah" id="nsrdzdah"><!--nsrdzdah--->
<input type="hidden" value="2017-01-01" name="sssqq" id="sssqq"><!--sssqq-->
<input type="hidden" value="2017-01-31" name="sssqz" id="sssqz"><!--sssqz--->
<input type="hidden" value="" name="web_jndi" id="web_jndi"><!--jndi-->
</form>
  <script src="../javascript/lodop/lodopPrint.js"></script>
  <script src="../javascript/print/print.js"></script>
</body>
</html>

