<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qhsf.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.bszm_web.apps.views.openWin.qhsf" %>


<!DOCTYPE html>
<html class="no-js" lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="description" content="河北省国家税务局云办税厅">
    <meta name="keywords" content="河北省,国家税务局,云厅,云办税厅,网厅,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>河北省国家税务局云办税厅</title>
    <link rel="stylesheet" href="qhsf.css">
    <style>
        html, body {
            min-width: 100%;
        }
    </style>
</head>
<body class="qhsfBody txt-c">
    <div class="rightMenu fl">
        <div class="qyContent">
            <script id="qyContentHtml" type="text/html"><div class="qyContentAuto"> {{ if data.length >= 5 }} <div class="company-filter"><input type="text" placeholder="搜索" class="company-input"/></div> {{/if}} {{each data as getQyCompanyList i}} <div class="companyBtn" id="{{i}}">{{getQyCompanyList.gsNsrmc}}</div> {{/each}} </div> <a class="companyBtn clickEnter" id="qyEnter">确定进入</a> <a class="refresh" id="refreshList">刷新企业列表</a> <a class="addCompany">添加工商新注册企业</a></script></div>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="qhsf.js"></script>
</body>
</html>
