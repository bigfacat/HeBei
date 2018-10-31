<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="lsdkjlvcx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fplsdkjl.lsdkjlvcx" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>历史代开记录</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="lsdkjlcx.css">
</head>
<body>
    <div id="wizard" role="application" class="wizard clearfix" style="display: block;">
        <div class="content clearfix" style="min-height: 480px;">
            <h2 id="wizard-h-0" tabindex="-1" class="title current">历史代开记录</h2>
            <section id="wizard-p-0" role="tabpanel" aria-labelledby="wizard-h-0" class="body current" aria-hidden="false">
                <div id="lskdjl-tabs" class="mini-tabs tab-content" activeindex="0" style="width: 100%;">
                    <div title="未开具">
                        <div class="toggle-sqrq"><span class="sqrq-title">申请日期：</span>
                            <input id="sqrq-wkj" name="sqrq-wkj" class="mini-hidden"><div style="display: inline-block"><span class="sqrq-wkj active" sqrq_value="1">一个月</span> <span class="sqrq-wkj" sqrq_value="3">三个月</span> <span class="sqrq-wkj" sqrq_value="6">六个月</span></div>
                        </div>
                        <div id="lsdk-grid-wkj" class="mini-datagrid" style="width: 1140px; height: 200px; margin: 0 auto;" allowresize="false" enabled="false" showemptytext="true" emptytext="<font color=red>无记录！</font>" showpager="false" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                            <div property="columns">
                                <div type="indexcolumn" width="50">序号</div>
                                <div field="kpje" align="center">开票金额</div>
                                <div field="sqrq" width="100" align="center" dateformat="yyyy-MM-dd">申请日期</div>
                                <div field="kjbz" align="center" renderer="kjRenderer">是否已开具</div>
                                <div field="e" width="120" align="center" renderer="czRenderer">操作</div>
                            </div>
                        </div>
                    </div>
                    <div title="已开具">
                        <table class="form-table">
                            <tr id="id-ghfcx">
                                <th style="width: 150px;">购货方纳税人识别号：</th>
                                <td style="width: 290px;">
                                    <input id="ghfnsrsbh" name="ghfnsrsbh" class="mini-textbox" style="width: 98%;"></td>
                                <th style="width: 150px;">购货方纳税人名称：</th>
                                <td style="width: 290px;">
                                    <input id="ghfnsrmc" name="ghfnsrmc" class="mini-textbox" style="width: 98%;"></td>
                                <td><a class="mini-button toolBtn-blue" style="padding: 3px 20px" onclick="onSearchYkj">查询</a></td>
                            </tr>
                        </table>
                        <div style="display: none">申请时间起：
                            <input id="sqsjq" name="sqsjq" class="mini-datepicker" format="yyyy-MM-dd" onvaluechanged="onsqsjq">
                            申请时间止：
                            <input id="sqsjz" name="sqsjz" class="mini-datepicker" format="yyyy-MM-dd" onvaluechanged="onsqsjz">
                            发票代码：
                            <input id="fpdm" name="fpdm" class="mini-textbox">
                            发票号码：
                            <input id="fphm" name="fphm" class="mini-textbox"></div>
                        <div class="toggle-sqrq"><span class="sqrq-title">申请日期：</span>
                            <input id="sqrq-ykj" name="sqrq-ykj" class="mini-hidden"><div style="display: inline-block"><span class="sqrq-ykj active" sqrq_value="1">一个月</span> <span class="sqrq-ykj" sqrq_value="3">三个月</span> <span class="sqrq-ykj" sqrq_value="6">六个月</span></div>
                        </div>
                        <div id="lsdk-grid-ykj" class="mini-datagrid" style="width: 1140px; height: 200px; margin: 0 auto;" allowresize="false" enabled="false" showemptytext="true" emptytext="<font color=red>无记录！</font>" showpager="false" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                            <div property="columns">
                                <div type="indexcolumn" width="50">序号</div>
                                <div field="kpje" align="center">开票金额</div>
                                <div field="sqrq" width="100" align="center" dateformat="yyyy-MM-dd">申请日期</div>
                                <div field="kjbz" align="center" renderer="kjRenderer">是否已开具</div>
                                <div field="e" width="120" align="center" renderer="czRenderer">操作</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon1.js"></script>
    <script src="lsdkjlcx.js"></script>
</body>
</html>
