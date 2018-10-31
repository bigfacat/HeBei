<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_cwbb_xqy_lrb_yb.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_cwbb_xqy_lrb_yb" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">



<META http-equiv="Content-Style-Type" content="text/css">
<link rel="stylesheet" href="../css/wssb.css" type="text/css">
<meta http-equiv="Content-Language" content="GBK">
<meta http-equiv="content-type" content="text/html; charset=GBK">



<html>
<head>
    <title>小企业财务报表利润表_月报打印</title>
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
    
    <table width="700" align="center">
        <tr>
            <td align="left">
                <div><b><p>　</p></div>
                </b> </td>
        </tr>
        <tr>
            <td width='600'>
                <div align="center"><b>利　　润　　表</b></div>
            </td>
            <td align="right">会小企02表</td>
        </tr>
    </table>

    <table width="700" align="center">
        <tr>
            <td align="left" width="350">
                编制单位:河北宽广公路养护有限责任公司
            </td>
            <td align="center" width="350">2017年01月</td>
            <td align="right" width="350">单位：元</td>
        </tr>
    </table>

    <table id="tabList" width="717" class="border"
           align="center">
        <tr>
            <td width="392" align="center">项目</td>
            <td width="59" align="center" class="nowrap">行次</td>
            <td width="117" align="center">本年累计金额</td>
            <td width="120" align="center">本月金额</td>
        </tr>

        <tr>
            <td>一、营业收入</td>
            <td align="center">1</td>
            <td align="right">4779036.12
            </td>
            <td align="right">4779036.12
            </td>
        </tr>
        <tr>
            <td>　　减：营业成本</td>
            <td align="center">2</td>
            <td align="right">4570371.66
            </td>
            <td align="right">4570371.66
            </td>
        </tr>
        <tr>
            <td>　　营业税金及附加</td>
            <td align="center">3</td>
            <td align="right">11432.91
            </td>
            <td align="right">11432.91
            </td>
        <tr>
            <td>　　其中：消费税</td>
            <td align="center">4</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　营业税</td>
            <td align="center">5</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　城市维护建设税</td>
            <td align="center">6</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　资源税</td>
            <td align="center">7</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　土地增值税</td>
            <td align="center">8</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　城镇土地使用税、房产税、车船税、印花税</td>
            <td align="center">9</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　教育费附加、矿产资源补偿费、排污费</td>
            <td align="center">10</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　销售费用</td>
            <td align="center">11</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　其中：商品维修费</td>
            <td align="center">12</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　广告费和业务宣传费</td>
            <td align="center">13</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　管理费用</td>
            <td align="center">14</td>
            <td align="right">13004
            </td>
            <td align="right">13004
            </td>
        </tr>
        <tr>
            <td>　　其中：开办费</td>
            <td align="center">15</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　业务招待费</td>
            <td align="center">16</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　研究费用</td>
            <td align="center">17</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>

        <tr>
            <td>　　财务费用</td>
            <td align="center">18</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　其中：利息费用（收入以“-”号填列）</td>
            <td align="center">19</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　加：投资收益（损失以“-”号填列）</td>
            <td align="center">20</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td> 二、营业利润（亏损以“-”号填列）</td>
            <td align="center">21</td>
            <td align="right">184227.55
            </td>
            <td align="right">184227.55
            </td>
        </tr>
        <tr>
            <td>　　加：营业外收入</td>
            <td align="center">22</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　其中：政府补助</td>
            <td align="center">23</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　减：营业外支出</td>
            <td align="center">24</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　其中：坏账损失</td>
            <td align="center">25</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　无法收回的长期债券投资损失</td>
            <td align="center">26</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　无法收回的长期股权投资损失</td>
            <td align="center">27</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　自然灾害等不可抗力因素造成的损失</td>
            <td align="center">28</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>　　税收滞纳金</td>
            <td align="center">29</td>
            <td align="right">0
            </td>
            <td align="right">0
            </td>
        </tr>
        <tr>
            <td>三、利润总额（亏损总额以“-”号填列）</td>
            <td align="center">30</td>
            <td align="right">184227.55
            </td>
            <td align="right">184227.55
            </td>
        </tr>
        <tr>
            <td>　　减：所得税费用</td>
            <td align="center">31</td>
            <td align="right">26607.88
            </td>
            <td align="right">26607.88
            </td>
        </tr>
        <tr>
            <td>四、净利润（净亏损以“-”号填列）</td>
            <td align="center">32</td>
            <td align="right">157619.67
            </td>
            <td align="right">157619.67
            </td>
        </tr>
    </table>
    
</div>
<script src="../jquery1.5/jquery-1.7.2.min.js"></script>
<script src="../javascript/lodop/lodopPrint.js"></script>
<script src="../javascript/print/print.js"></script>
</body>
</html>
