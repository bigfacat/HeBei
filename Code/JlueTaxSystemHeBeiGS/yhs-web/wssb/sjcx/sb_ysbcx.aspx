<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_ysbcx.aspx.cs" Inherits="JlueTaxSystemHBGS.yhs_web.wssb.sjcx.sb_ysbcx" %>

<!DOCTYPE html>

<html>
<head>
    
    

    <title>纳税人申报信息查询</title>
    <link href="../css/sbxxcx.css" rel="stylesheet" type="text/css">
</head>

<body>
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
<script type="text/javascript" src="./sb_ysbcx.js"></script>

<div class="main">
    
        
            
            
                
            
            
            
                
                
                
                
            
        
    
    <div class="main-contain" style="background-color: #fff;padding-bottom: 10px;">
    <div class="cx-title txt-c txt-bold mb10">纳税人申报信息查询</div>
        <form name="form1" method="post">
            <div class="cx-small-blue-title txt-c txt-bold mb10">
				所属时期输入格式为:YYYYMMDD(比如:20170101)
            </div>
            <table class="noborder table-c">
	
              <tr>
                    <td class="txt-r w15"><div class="cx-small-blue-title">所属时期起:</div></td>
                    <td class="w35"><input type="text" id="sssq_q" name="sssq_q" class="w75" onkeyup="enterdown('sssq_z')"></td>
                    <td class="txt-r w15"><div class="cx-small-blue-title">所属时期止:</div></td>
                    <td class="w35"><input type="text" id="sssq_z" name="sssq_z" class="w75"></td>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td class="txt-r w15"><div class="cx-small-blue-title">税种:</div></td>
                    <td class="w35">
                        <select id="zsxm_dm" name="zsxm_dm" class="w75">
                            <option value='10101'>增值税</option>
                            <option value='10433'>消费税</option>
                            <option value='04'>企业所得税和非居民企业所得税</option>
                            <option value='204'>扣缴非居民企业所得税报告表</option>
                            <option value='06'>个人利息所得税</option>
                            <option value='29835'>2013版财务报表</option>
                            <option value='77'>废弃电器电子产品处理基金申报表</option>
                            <option value='65'>文化事业建设费申报表</option>
                            <option value='182'>增值税预缴税款表</option>
                        </select>
                    </td>
                </tr>
	
            </table>
            <div class="cx-btn txt-c"><a href="javascript:check()">查询</a></div>
            
            <div id="maindiv" style="margin-top:10px;border-color:#CCCCFF;z-index:1000;overflow-x:hidden;overflow-y:hidden;width:900;">
				<table width="95%" border="0" id="table1" align="center" cellpadding="0" cellspacing="1" bordercolorlight="#000000" bordercolordark="#FFFFFF"  style="table-layout:fixed;word-wrap:break-word;word-break:break-all;border: 1px solid #ccc;">
			      <tr>
		            <td width="5%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>序号</b></div>
		            </td>
		            <td width="33%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>征收项目</b></div>
		            </td>
		            <td width="13%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>申报日期</b></div>
		            </td>
		            <td width="13%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>所属时期起</b></div>
		            </td>
		            <td width="13%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>所属时期止</b></div>
		            </td>
		            <td width="13%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>应纳税额</b></div>
		            </td>
		            <%--<td width="10%" align="center" bgcolor="#69B3F1">
		                <div align="center" , class="pup1"><b>申报表链接</b></div>
		            </td>--%>
		          </tr>
				</table>
			</div>
			
        </form>
    </div>
</div>
</body>
</html>                     
   

