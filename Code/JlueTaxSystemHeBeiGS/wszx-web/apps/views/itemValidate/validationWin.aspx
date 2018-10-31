﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="validationWin.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.itemValidate.validationWin" %>

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
    <title>事项监控</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="validation.css">
    <style>
        html, body {
            min-width: 1200px;
        }
    </style>
</head>
<body>
    <div id="bzzl-content" class="bzzl-content">
        <p>尊敬的纳税人您好，为了您的办税安全，系统检测到以下事项，请确认：</p>
        <div class="title">
            <div>为了您的税务安全，请完成下列要求后再进行业务的办理，感谢您的配合。</div>
        </div>
        <div id="validate-info" class="mini-datagrid" style="width: 1160px; height: 360px;" allowresize="false" enabled="true" allowcellwrap="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="ruleName" width="300">办理条件</div>
                <div field="ruleDegree" width="100" align="center" renderer="onRenderDegree">监控类型</div>
                <div field="resultValue" width="100" align="center" renderer="onRenderResult">监控结果</div>
                <div field="ruleDes" width="400">监控说明</div>
                <div field="ruleUrl" width="150" align="center">操作</div>
            </div>
        </div>
        <div id="actions" class="wc-button">
            <button id="iknowBtn" class="button-blue" style="padding: 7px 30px; font-size: 14px">我知道了</button></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../lib/sui-miniui/mini-all-source.js"></script>
    <script src="../../../lib/ds-commonFront/build/common-front.js"></script>
    <script src="../../../lib/ds-commonFront/build/wssqUtil.js"></script>
    <script src="../apiService/xzs-bsfd.js"></script>
    <script src="validationWin.js"></script>
</body>
</html>
