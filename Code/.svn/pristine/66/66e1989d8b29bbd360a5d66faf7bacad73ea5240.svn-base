<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_zzs_jms_sbmxb_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_zzs_jms_sbmxb_201605" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>增值税减免税申报明细表</title>
    <link rel="stylesheet" href="../css/forView.css">
</head>
<link rel="stylesheet" type="text/css" href="..\css\wssb.css"/>
<link rel="stylesheet" type="text/css" href="..\css\print.css"/>
<script language="javascript" src="javascript/public.js"></script>
<body>
<OBJECT id="factory" style="DISPLAY:  none" codeBase="../ScriptX.cab#Version=5,60,0,360"
        classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814" viewastext></OBJECT>
<object id="button" style="DISPLAY:  none" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>
<script language="JavaScript">
    function doprint() {
        factory.printing.header = ""
        factory.printing.footer = ""
        factory.printing.leftMargin = 0
        factory.printing.topMargin = 0
        factory.printing.rightMargin = 0
        factory.printing.bottomMargin = 0
        factory.printing.portrait = true
        document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮
        factory.printing.Print(false);
        document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮
    }
    function printsetup() {
        // 打印页面设置
        factory.printing.PageSetup();
    }
    function printpreview() {
        // 打印页面预览
        factory.printing.header = ""
        factory.printing.footer = ""
        factory.printing.leftMargin = 0
        factory.printing.topMargin = 0
        factory.printing.rightMargin = 0
        factory.printing.bottomMargin = 0
        factory.printing.portrait = true
        document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮
        factory.printing.Preview();
        document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮
    }
    function saveas() {
        // 打印页面另存为
        document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮
        document.all("printbtn").style.display = 'none';//打印时隐藏打印按钮
        document.all.button.ExecWB(4, 1);
        //document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮
    }
    function hide() {
        // 打印页面另存为
        document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮
        document.all("printbtn").style.display = 'none';//打印时隐藏打印按钮
        //document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮
    }
    var SF = 1, SF1 = 0.1, Max = 3;
</script>



<link rel="stylesheet" href="../css/forView.css">
</head>
<table width="838" align="center" border="0">
    <tr height="19">
        <td height="28" colspan="6" align="center"><h3>增值税减免税申报明细表</h3></td>
    </tr>
    <tr height="19">
        <td colspan="4" align="center">所属时期：自 2017年01
            月01 日 至2017 年01 月31 日
        </td>
    </tr>
    <tr height="19">
        <td align="left" width="40%">纳税人名称（公章）：河北宽广公路养护有限责任公司　</td>
        <td width="50%" colspan="2" align="right">金额单位：元（列至角分）</td>
    </tr>
</table>
<table id="bbTable" width="838" class="border" align="center"
>
    <tr height="35">
        <td colspan="7" align="center"><strong>一、减税项目</strong></td>
    </tr>
    <tr height="35">
        <td width="42%" align="center" rowspan="2">减税性质代码及名称</td>
        <td width="3%" rowspan="2" align="center">栏次</td>
        <td width="11%" height="30" align="center">期初余额</td>
        <td width="12%" align="center">本期发生额</td>
        <td width="11%" align="center">本期应抵减税额</td>
        <td width="11%" align="center">本期实际抵减税额</td>
        <td width="10%" align="center">期末余额</td>
    </tr>
    <tr height="22">
        <td width="11%" align="center">1</td>
        <td width="12%" align="center">2</td>
        <td width="11%" align="center">3=1+2</td>
        <td width="11%" align="center">4≤3</td>
        <td width="10%" align="center">5=3-4</td>
    </tr>
    <tr height="19">
        <td height="19" align="center">合计</td>
        <td align="center">1</td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
    </tr>
    
    <tr height="19">
        <td align="left">&nbsp;</td>
        <td align="center">2</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    
    <tr height="35">
        <td colspan="7" align="center"><strong>二、免税项目</strong></td>
    </tr>
    <tr height="35">
        <td width="42%" align="center" rowspan="2">免税性质代码及名称</td>
        <td rowspan="2" align="center">栏次</td>
        <td width="11%" align="center">免征增值税项目销售额</td>
        <td width="12%" align="center">免税销售额扣除项目本期实际扣除金额</td>
        <td width="11%" align="center">扣除后免税销售额</td>
        <td width="11%" align="center">免税销售额对应的进项税额</td>
        <td width="10%" align="center">免税额</td>
    </tr>
    <tr height="22">
        <td width="11%" align="center">1</td>
        <td width="12%" align="center">2</td>
        <td width="11%" align="center">3=1-2</td>
        <td width="11%" align="center">4</td>
        <td width="10%" align="center">5</td>
    </tr>
    <tr height="19">
        <td height="19" align="center">合计</td>
        <td align="center">3</td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
        <td>0
        </td>
    </tr>
    <tr height="19">
        <td height="19" align="center">出口免税</td>
        <td align="center">4</td>
        <td>0
        </td>
        <td align="center">——</td>
        <td align="center">——</td>
        <td align="center">——</td>
        <td align="center">——</td>
    </tr>
    <tr height="19">
        <td height="19" align="center">其中:跨境服务</td>
        <td align="center">5</td>
        <td>0
        </td>
        <td align="center">——</td>
        <td align="center">——</td>
        <td align="center">——</td>
        <td align="center">——</td>
    </tr>
    
    <tr height="19">
        <td align="left">&nbsp;</td>
        <td align="center">6</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    
</table>

<script src="../jquery1.5/jquery-1.7.2.min.js"></script>
<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>
</html>
<script>
    function tableinit() {
        var myTable = document.getElementById("bbTable");
        myTable.className = 'style_tab';

        if (myTable == undefined)
            return;
        var trs = myTable.rows;
        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].children;
            for (var j = 0; j < tds.length; j++)

                tds[j].className = 'style_td';
        }
    }
</script>

