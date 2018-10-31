<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wcjyhdssglzmcx.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wcjyhdssglzmcx.wcjyhdssglzmcx" %>

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
    <title>跨区域涉税事项报告查询</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="wcjyhdssglzmcx.css">
</head>
<body>
    <div id="main">
        <table class="form-table">
            <tr id="id-wgzxxcx" style="display: none;">
                <th style="width: 220px;">跨区域涉税事项报验管理编号：</th>
                <td style="width: 290px;">
                    <input id="wcjyhdssglzmbh" name="wcjyhdssglzmbh" class="mini-textbox" style="width: 98%;"></td>
                <td><a class="mini-button toolBtn-blue" onclick="onSearch">查询</a></td>
            </tr>
            <tr>
                <th style="width: 100px;">申请日期：</th>
                <td style="width: 290px;">
                    <input id="sqrq" name="sqrq" class="mini-hidden">
                    <span class="sqrq" sqrq_value="1">一个月</span><span class="sqrq" sqrq_value="3">三个月</span><span class="sqrq" sqrq_value="6">六个月</span><span class="gdsj">更多</span></td>
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
        <div id="wgzxx_grid" class="mini-datagrid" style="width: 1160px; height: 200px; margin: 0 auto;" allowresize="false" enabled="false" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="nsrsbh" align="center">纳税人识别号</div>
                <div field="nsrmc" align="center">纳税人名称</div>
                <div field="wcjyhdssglzmbh" align="center">跨区域涉税事项报验管理编号</div>
                <div field="wcjydxzqh" align="center">外出经营地行政区划</div>
                <div field="wcjyd" align="center">外出经营地</div>
                <div field="zmyxqxq" width="100" align="center" dateformat="yyyy-MM-dd">证明有效期起</div>
                <div field="zmyxqxz" width="100" align="center" dateformat="yyyy-MM-dd">证明有效期止</div>
                <div field="byrq" width="100" align="center" dateformat="yyyy-MM-dd" renderer="onByrqRenderer">报验日期</div>
                <div field="hxrq" width="100" align="center" dateformat="yyyy-MM-dd" renderer="onHxrqRenderer">核销日期</div>
            </div>
        </div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon1.js"></script>
    <script src="wcjyhdssglzmcx.js"></script>
</body>
</html>
