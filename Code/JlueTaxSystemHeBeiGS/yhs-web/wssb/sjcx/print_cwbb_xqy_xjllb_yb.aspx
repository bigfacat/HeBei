<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_cwbb_xqy_xjllb_yb.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_cwbb_xqy_xjllb_yb" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">



<html>
<head>
    <title>小企业现金流量表--打印</title>
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
        <tr>
            <td align="left">
                <div><b><p>　</p></div>
                </b> </td>
        </tr>
        <tr>
            <td width='700'>
                <div align="center"><b>现　　金　　流　　量　　表</b></div>
            </td>
            <td align="right">会小企03表</td>
        </tr>
    </table>
    <table width="800" align="center">
        <tr>
            <td align="left" width="350">
                编制单位:河北宽广公路养护有限责任公司
            </td>
            <td align="center" width="350">2017年01月</td>
            <td align="right" width="350">单位：元</td>
        </tr>
    </table>
    <table id="tabList" width="800" class="border"
           align="center">
        <tr>
            <td width="400" align="center">项目</td>
            <td width="100" align="center" class="nowrap">行次</td>
            <td width="150" align="center">本年累计金额</td>
            <td width="150" align="center">本月金额</td>
        </tr>
        <tr>
            <td>一、经营活动产生的现金流量：</td>
            <td align="center">&nbsp;</td>
            <td>　 &nbsp;</td>

            <td>　 &nbsp;</td>

        </tr>
        <tr>
            <td>　　销售产成品、商品、提供劳务收到的现金</td>
            <td align="center">1</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　收到其他与经营活动有关的现金</td>
            <td align="center">2</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　购买原材料、商品、接受劳务支付的现金</td>
            <td align="center">3</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　支付的职工薪酬</td>
            <td align="center">4</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　支付的税费</td>
            <td align="center">5</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　支付其他与经营活动有关的现金</td>
            <td align="center">6</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　经营活动产生的现金流量净额</td>
            <td align="center">7</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>二、投资活动产生的现金流量：</td>
            <td align="center">&nbsp;</td>
            <td> &nbsp;　</td>

            <td>　 &nbsp;</td>

        </tr>
        <tr>
            <td>　　收回短期投资、长期债券投资和长期股权投资收到的现金</td>
            <td align="center">8</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　取得投资收益收到的现金</td>
            <td align="center">9</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　处置固定资产、无形资产和其他非流动资产收回的现金净额</td>
            <td align="center">10</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　短期投资、长期债券投资和长期股权投资支付的现金</td>
            <td align="center">11</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>

        <tr>
            <td>　　购建固定资产、无形资产和其他非流动资产支付的现金</td>
            <td align="center">12</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　投资活动产生的现金流量净额</td>
            <td align="center">13</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>三、筹资活动所产生的现金流量：</td>
            <td align="center">&nbsp;</td>
            <td>　 &nbsp;</td>

            <td>　 &nbsp;</td>

        </tr>
        <tr>
            <td>　　取得借款收到的现金</td>
            <td align="center">14</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　吸收投资者投资收到的现金</td>
            <td align="center">15</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　偿还借款本金支付的现金</td>
            <td align="center">16</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　偿还借款利息支付的现金</td>
            <td align="center">17</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　分配利润支付的现金</td>
            <td align="center">18</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　筹资活动产生的现金流量净额</td>
            <td align="center">19</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>四、现金净增加额</td>
            <td align="center">20</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　加：期初现金余额</td>
            <td align="center">21</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>五、期末现金余额</td>
            <td align="center">22</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
    </table>
    
</div>
<script src="../jquery1.5/jquery-1.7.2.min.js"></script>
<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>
</html>
