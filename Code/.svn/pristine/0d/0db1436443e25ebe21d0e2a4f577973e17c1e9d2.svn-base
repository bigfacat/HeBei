<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="lsdkjlvzfcx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fplsdkjl.lsdkjlvzfcx" %>

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
    <div id="main">
        <table class="form-table">
            <tr id="id-fpcx" style="display: none;">
                <th style="width: 100px;">发票代码：</th>
                <td style="width: 290px;">
                    <input id="fpdm" name="fpdm" class="mini-textbox" style="width: 98%;"></td>
                <th style="width: 100px;">发票号码：</th>
                <td style="width: 290px;">
                    <input id="fphm" name="fphm" class="mini-textbox" style="width: 98%;"></td>
                <td><a class="mini-button toolBtn-blue" onclick="onSearch">查询</a></td>
            </tr>
            <tr id="id-ghfcx" style="display: none;">
                <th style="width: 140px;">购货方纳税人识别号：</th>
                <td style="width: 290px;">
                    <input id="ghfnsrsbh" name="ghfnsrsbh" class="mini-textbox" style="width: 98%;"></td>
                <th style="width: 140px;">购货方纳税人名称：</th>
                <td style="width: 290px;">
                    <input id="ghfnsrmc" name="ghfnsrmc" class="mini-textbox" style="width: 98%;"></td>
                <td><a class="mini-button toolBtn-blue" onclick="onSearch">查询</a></td>
            </tr>
            <tr>
                <th style="width: 100px;">申请日期：</th>
                <td style="width: 290px;">
                    <input id="sqrq-wkj" name="sqrq-wkj" class="mini-hidden"><div style="display: inline-block"><span class="sqrq-wkj active" sqrq_value="1">一个月</span> <span class="sqrq-wkj" sqrq_value="3">三个月</span> <span class="sqrq-wkj" sqrq_value="6">六个月</span></div>
                </td>
            </tr>
            <tr id="gdsj_qz" style="display: none;">
                <th style="width: 100px;">申请时间起：</th>
                <td style="width: 290px;">
                    <input id="sqsjq" name="sqsjq" class="mini-datepicker" format="yyyy-MM-dd" style="width: 98%;" required="true" onvaluechanged="onsqsjq"></td>
                <th style="width: 100px;">申请时间止：</th>
                <td style="width: 290px;">
                    <input id="sqsjz" name="sqsjz" class="mini-datepicker" format="yyyy-MM-dd" required="true" onvaluechanged="onsqsjz" style="width: 98%;"></td>
                <td colspan="2"><a class="mini-button toolBtn-blue" onclick="onMoreSure">确定</a> <a class="mini-button toolBtn-blue" onclick="onMoreCancel">取消</a></td>
            </tr>
        </table>
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
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="lsdkjlcx.js"></script>
</body>
</html>
