<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_zzs_flzl4_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_zzs_flzl4_201605" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">


<html>
<head>
    <title>增值税纳税申报表附列资料（表四）--打印</title>
    <link rel="stylesheet" href="../css/forView.css">
</head>

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

<div>
    <table width="800" align="center">
        <tr height="39">
            <td height="39" colspan="2" align="center">
                <div align="center"><b>增值税纳税申报表附列资料（四）</b></div>
            </td>
        </tr>
        <tr height="25">
            <td height="25" colspan="2" align="center">
                <div align="center"><b>（税额抵减情况表）</b></div>
            </td>
        </tr>
        <tr height="29">
            <td height="29" colspan="2">
                <div align="center"><b>税款所属时间： 2017年 01
                    月 01日 至 2017年 01
                    月 31日</b></div>
            </td>
        </tr>
        <tr height="30">
            <td height="30">纳税人名称：(公章)河北宽广公路养护有限责任公司
            </td>
            <td align="right">金额单位：元至角分</td>
        </tr>
    </table>
    <table class="border" width="800"
           align="center">
        <tr height="30">
            <td width="30" rowspan="2" align="center">序号</td>
            <td width="260" rowspan="2" align="center">抵减项目</td>
            <td width="100" align="center">期初余额</td>
            <td width="100" align="center">本期发生额</td>
            <td width="100" align="center">本期应抵减税额</td>
            <td width="110" align="center">本期实际抵减税额</td>
            <td width="100" align="center">期末余额</td>
        </tr>
        <tr height="30">
            <td align="center">1</td>
            <td align="center">2</td>
            <td align="center">3=1+2</td>
            <td align="center">4≤3</td>
            <td align="center">5=3-4</td>
        </tr>
        <tr height="30">
            <td align="center">1</td>
            <td align="center">增值税税控系统专用设备费及技术维护费</td>
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
        <tr height="30">
            <td align="center">2</td>
            <td align="center">分支机构预征缴纳税款</td>
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
        <tr height="30">
            <td align="center">3</td>
            <td align="center">建筑服务预征缴纳税款</td>
            <td>0
            </td>
            <td>141425.83
            </td>
            <td>141425.83
            </td>
            <td>141425.83
            </td>
            <td>0
            </td>
        </tr>
        <tr height="30">
            <td align="center">4</td>
            <td align="center">销售不动产预征缴纳税款</td>
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
        <tr height="30">
            <td align="center">5</td>
            <td align="center">出租不动产预征缴纳税款</td>
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

    </table>
    
</div>
<script src="../jquery1.5/jquery-1.7.2.min.js"></script>
<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>
</html>

