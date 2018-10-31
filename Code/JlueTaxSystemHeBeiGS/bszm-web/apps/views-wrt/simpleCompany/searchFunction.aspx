<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="searchFunction.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views_wrt.simpleCompany.searchFunction" %>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="description" content="河北省国家税务局云办税厅">
    <meta name="keywords" content="河北省,国家税务局,云厅,云办税厅,网厅,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>河北省国家税务局云办税厅</title>
    <link rel="stylesheet" href="../../styles/style.css">
</head>
<body>
    <div class="header-area">
        <div class="container">
            <div class="home-logo fl"></div>
            <div class="change-account fr">
                <script id="accountHtml" type="text/html"></script>
            </div>
            <div class="bg-transparent"></div>
        </div>
        <div class="modules-area">
            <script id="modulesHtml" type="text/html"></script>
        </div>
    </div>
    <div id="searchText">
        <div id="search-contain">
            <img src="../../images/home/ico-search.png" alt="">
            <input type="text" placeholder="请输入关键字..."><div id="search-button">查找</div>
        </div>
    </div>
    <div id="searchContent">
        <div id="searchContent-head">查询结果</div>
        <table id="searchContent-body">
            <tr>
                <th class="td-1">序号</th>
                <th class="td-1">所属类别</th>
                <th class="td-2">业务事项名称</th>
            </tr>
            <script id="search-result" type="text/html"><tr> <th class="td-1">序号</th> <th class="td-1">所属类别</th> <th class="td-2">业务事项名称</th> </tr> {{each data as item i}} <tr> <td class="td-1">{{i+1}}</td> <td class="td-1">{{item.typeName}}</td> <td class="td-2"><a href="{{item.url}}">{{item.name}}</a></td> </tr> {{/each}}</script></table>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="/bszm-web/apps/scripts/wrtCustom.js"></script>
    <script src="searchFunction.js"></script>
</body>
</html>
