<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print_zzs_flzl1_201605.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.wssb.sjcx.print_zzs_flzl1_201605" %>



<html>

<head>
    <title>增值税纳税申报表附列资料（表一）--打印</title>
    <link rel="stylesheet" type="text/css" href="..\css\wssb.css"/>
    <link rel="stylesheet" type="text/css" href="..\css\print.css"/>
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
        factory.printing.portrait = false
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
        factory.printing.portrait = false
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
        
    <div align="center">
        <table width="1250" border="0" align="center">
            <tr>
                <td colspan="3">
                    <div align="center"><b>增值税纳税申报表附列资料（表一）</b></div>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <div align="center"><b>（本期销售情况明细）</b></div>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <div align="center">税款所属时间： 2017年 01月 01日 至 2017年 01月 31日
                    </div>
                </td>
            </tr>
            <tr>
                <td width="444">纳税人名称： 河北宽广公路养护有限责任公司 （公章）</td>
                <td width="444">&nbsp;</td>
                <td width="207">
                    <p align="right">金额单位：元至角分</p>
                </td>
            </tr>
        </table>
			<table id="tabList" width="1250" class="border" align="center">
				<tr>
					<td colspan="4" rowspan="3">
						<div align="center">项目及栏次</div>
					</td>
					<td height="25" colspan="2">
						<div align="center">开具增值税专用发票</div>
					</td>
					<td colspan="2">
						<div align="center">开具其他发票</div>
					</td>
					<td colspan="2">
						<div align="center">未开具发票</div>
					</td>
					<td colspan="2">
						<div align="center">纳税检查调整</div>
					</td>
					<td colspan="3">
						<div align="center">合计</div>
					</td>
					<td width="60" rowspan="2">
						<div align="center">服务、不动产和无形资产扣除项目本期实际扣除金额</div>
					</td>
					<td colspan="2">
						<div align="center">扣除后</div>
					</td>
				</tr>

				<tr>
					<td width="55" height="31">
						<div align="center">销售额</div>
					</td>
					<td width="55">
						<div align="center">销项(应纳)税额</div>
					</td>
					<td width="61">
						<div align="center">销售额</div>
					</td>
					<td width="60">
						<div align="center">销项(应纳)税额</div>
					</td>
					<td width="63">
						<div align="center">销售额</div>
					</td>
					<td width="60">
						<div align="center">销项(应纳)税额</div>
					</td>
					<td width="60">
						<div align="center">销售额</div>
					</td>
					<td width="54">
						<div align="center">销项(应纳)税额</div>
					</td>
					<td width="63">
						<div align="center">销售额</div>
					</td>
					<td width="70">
						<div align="center">销项(应纳)税额</div>
					</td>
					<td width="61">
						<div align="center">价税合计</div>
					</td>
					<td width="60">
						<div align="center">含税(免税)销售额</div>
					</td>
					<td width="83">
						<div align="center">销项(应纳)税额</div>
					</td>
				</tr>
				<tr>
					<td height="10">
						<div align="center">1</div>
					</td>
					<td>
						<div align="center">2</div>
					</td>
					<td>
						<div align="center">3</div>
					</td>
					<td>
						<div align="center">4</div>
					</td>
					<td>
						<div align="center">5</div>
					</td>
					<td>
						<div align="center">6</div>
					</td>
					<td>
						<div align="center">7</div>
					</td>
					<td>
						<div align="center">8</div>
					</td>
					<td>
						<div align="center">9=1+3+5+7</div>
					</td>
					<td>
						<div align="center">10=2+4+6+8</div>
					</td>
					<td>
						<div align="center">11=9+10</div>
					</td>
					<td>
						<div align="center">12</div>
					</td>
					<td>
						<div align="center">13=11-12</div>
					</td>
					<td>
						<div align="center">
							14=13÷(100%<br>+税率或征收<br>率)×税率<br>或征收率
						</div>
					</td>
				</tr>
				<tr>
					<td width="30" rowspan="7">
						<div align="center">一、一般计税方法计税</div>
						<div align="center"></div>
					</td>
					<td width="34" rowspan="5">
						<div align="center">全部征税项目</div>
						<div align="center"></div>
					</td>
					<td width="112" height="28">
						<div align="left">17%税率的货物及加工修理修配劳务</div>
					</td>
					<td width="25">
						<div align="left">1</div>
					</td>
					<td width="55">0</td>
					<td width="55">0</td>
					<td width="61">0</td>
					<td width="60">0</td>
					<td width="63">0</td>
					<td width="60">0</td>
					<td width="60">0</td>
					<td width="54">0</td>
					<td width="63">0</td>
					<td width="70">0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="28">
						<div align="left">17%税率的服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">2</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="112" height="21">
						<div align="left">13%税率</div>
					</td>
					<td width="21">
						<div align="left">3</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="20">
						<div align="left">11%税率</div>
					</td>
					<td width="21">
						<div align="left">4</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="112" height="22">
						<div align="left">6%税率</div>
					</td>
					<td width="21">
						<div align="left">5</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="34" colspan="" rowspan="2">
						<div align="center">其中：即征即退项目</div>
						<div align="center"></div>
					</td>
					<td width="112" height="29">
						<div align="left">即征即退货物及加工修理修配劳务</div>
					</td>
					<td>
						<div align="left">6</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="19">
						<div align="left">即征即退服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">7</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="30" rowspan="11">
						<div align="center">二、简易计税方法计税</div>
						<div align="center"></div>
					</td>
					<td width="34" rowspan="9">
						<div align="center">全部征税项目</div>
						<div align="center"></div>
					</td>
					<td width="112" height="21">
						<div align="left">6%征收率</div>
					</td>
					<td width="21">
						<div align="left">8</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="24">
						<div align="left">5%征收率的货物及加工修理修配劳务</div>
					</td>
					<td width="21">
						<div align="left">9a</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="24">
						<div align="left">5%征收率的服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">9b</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="112" height="22">
						<div align="left">4%征收率</div>
					</td>
					<td width="21">
						<div align="left">10</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="27">
						<div align="left">3%征收率的货物及加工修理修配劳务</div>
					</td>
					<td width="21">
						<div align="left">11</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="20">
						<div align="left">3%征收率的服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">12</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>4779036.12</td>
					<td>143371.08</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>4779036.12</td>
					<td>143371.08</td>
					<td>4922407.2</td>
					<td>0</td>
					<td>4922407.2</td>
					<td>143371.08</td>
				</tr>
				<tr>
					<td width="112" height="20">
						<div align="left">
							预征率0%
						</div>
					</td>
					<td width="21">
						<div align="left">13a</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="112" height="20">
						<div align="left">
							预征率0%
						</div>
					</td>
					<td width="21">
						<div align="center">13b</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="112" height="20">
						<div align="left">
							预征率0%
						</div>
					</td>
					<td width="21">
						<div align="center">13c</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="34" colspan="" rowspan="2">
						<div align="center">其中：即征即退项目</div>
						<div align="center"></div>
					</td>
					<td width="112" height="29">
						<div align="left">即征即退货物及加工修理修配劳务</div>
					</td>
					<td width="21">
						<div align="left">14</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="112" height="26">
						<div align="left">即征即退服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">15</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td width="30" rowspan="2">
						<div align="center">三、免抵退税</div>
						<div align="center"></div>
					</td>
					<td height="26" colspan="2">
						<div align="left">货物及加工修理修配劳务</div>
					</td>
					<td width="21">
						<div align="left">16</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td height="22" colspan="2">
						<div align="left">服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">17</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td width="30" rowspan="2">
						<div align="center"></div>
						<div align="center">四、免税</div>
					</td>
					<td height="20" colspan="2">
						<div align="left">货物及加工修理修配劳务</div>
					</td>
					<td width="21">
						<div align="left">18</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td width="61">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="60">
						<div align="center">──</div>
					</td>
					<td width="83">
						<div align="center">──</div>
					</td>
				</tr>
				<tr>
					<td height="20" colspan="2">
						<div align="left">服务、不动产和无形资产</div>
					</td>
					<td width="21">
						<div align="left">19</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>
						<div align="center">──</div>
					</td>
				</tr>
			</table>
		</div>
    <script src="../jquery1.5/jquery-1.7.2.min.js"></script>
    <script src="../javascript/lodop/lodopPrint.js"></script>
    <script src="../javascript/print/print.js"></script>
</body>
</html>






