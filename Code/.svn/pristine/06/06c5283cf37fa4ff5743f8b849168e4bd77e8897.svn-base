<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sbjgcx.aspx.cs" Inherits="JlueTaxSystemHBGS.sbzx_web.apps.views.sbjgcx.sbjgcx" %>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>申报结果查询</title>
    <link rel="stylesheet" href="../../../apps/styles/style.css">
    <link rel="stylesheet" href="sbjgcx-hb.css">
</head>
<body>
    <div class="sbjgcx">
        <div class="sbjg-search" id="search-condition">
            <table class="sbjg-search-table">
                <tr>
                    <td align="left" style="text-indent: 2em"><span>税种：</span>
                        <input class="mini-combobox" id="zsxmDm" name="zsxmDm" data="sbjg.szlbData" width="280"></td>
                    <td align="right"><span>申报日期：</span>
                        <input class="mini-datepicker" id="sbrqq" name="sbrqq" required="true" requirederrortext="申报日期起不能为空" width="280" errormode="border" format="yyyy-MM-dd">
                        至
                        <input class="mini-datepicker" id="sbrqz" name="sbrqz" required="true" requirederrortext="申报日期止不能为空" width="280" errormode="border" format="yyyy-MM-dd"></td>
                </tr>
                <tr>
                    <td align="left"><span>申报状态：</span>
                        <input class="mini-combobox" id="sbztDm" name="sbztDm" width="280" data="[{MC:'申报成功',ID:'0000'},{MC:'申报失败',ID:'1000'},{MC:'申报作废',ID:'3000'}]"></td>
                    <td align="right"><span>所属时期：</span>
                        <input class="mini-datepicker" id="skssqq" name="skssqq" width="280" errormode="border" format="yyyy-MM-dd">
                        至
                        <input class="mini-datepicker" id="skssqz" name="skssqz" width="280" errormode="border" format="yyyy-MM-dd"></td>
                </tr>
            </table>
            <button class="search-btn" id="search-btn">查询</button><span id="timer" class="timer"><span id="timer-seconds"></span>秒后可再次查询</span></div>
        <div class="sbjg-content">
            <div id="sbjg-grid" class="mini-datagrid" style="width: 1160px; height: 300px;" allowresize="false" showpager="false" autoload="false" allowsortcolumn="false" showemptytext="true" emptytext="<span style='color:red'>没有查询到符合条件的记录！</span">
                <div property="columns">
                    <div type="indexcolumn" width="50">序号</div>
                    <div field="sbzlDm" displayfield="sbzlMc" width="150">税种</div>
                    <div field="sbrq" width="80" dateformat="yyyy-MM-dd" align="center">申报日期</div>
                    <div field="skssqq" width="80" dateformat="yyyy-MM-dd" align="center">税款所属期起</div>
                    <div field="skssqz" width="80" dateformat="yyyy-MM-dd" align="center">税款所属期止</div>
                    <div field="sbztDm" displayfield="sbztms" width="160">申报状态</div>
                    <%--<div field="sbse" width="100" data-type="float" align="center">申报税额</div>--%>
                    <div field="actions" width="150" renderer="sbjg.actionsRenderer">快速链接</div>
                    <div field="djxh" width="10" visible="false">登记序号</div>
                    <div field="qqwjm" width="10" visible="false">请求文件名</div>
                    <div field="sbxh" width="10" visible="false">申报序号</div>
                </div>
            </div>
        </div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../lib/jquery.cookie/jquery.cookie.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../lib/ds-commonFront/build/wssqUtil.js"></script>
    <script src="sbjgcx-hb.js"></script>
</body>
</html>
