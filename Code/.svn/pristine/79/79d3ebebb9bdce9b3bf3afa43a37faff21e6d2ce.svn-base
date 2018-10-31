<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="allMatter.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views.publicPage.allMatter" %>

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
    <div class="content-area professionPage">
        <div class="menuContent">
            <div class="container">
                <div class="container contentTitle"><a href="../../../apps/views/personPage/personPage.aspx">我的办税大厅</a>&gt;全部事项</div>
                <div class="context-box">
                    <div class="sxTabContent"><a class="ico-tab ico-dbsxTab active" data-type="bszyTab">办税指引</a> <a class="ico-tab ico-ybsxTab" data-type="ybsxTab">已办事项</a> <a class="ico-tab ico-tzgsTab" data-type="tzgsTab">通知公示</a></div>
                    <ul class="common sxContent allDoneList">
                        <script id="sxContentHtml" type="text/html">{{if doneList}} {{each doneList as sxList i}} <li class="context"> {{pageIndex * 20+i+1}}、{{sxList.name}}{{sxList.date.substring(0,10)}} <a href="{{sxList.url}}{{if sxList.id}}&id={{sxList.id}}{{/if}}" target="_blank" data-warden="warden-{{sxList.id}}">{{sxList.statusName}}</a> </li> {{/each}} {{else if total>0}} <li class="todoLi tzgsLi"> <span>标题</span> <span>发布日期</span> <span class="brief">正文摘要</span> <span class="option">操作</span> </li> {{each data as sxList i}} <li class="todoLi tzgsLi"> <span class="h-pointer" onclick='clickHref("{{sxList.mainContentPath}}")' data-warden="warden-{{sxList.id}}">{{pageIndex * 20+i+1}}、{{sxList.subject}}</span> <span>{{sxList.publishDate.substr(0,10)}}</span> <span class="brief" title="{{sxList.brief}}">{{sxList.brief}}</span> <button class="blBtn" onclick='clickHref("{{sxList.mainContentPath}}")' data-warden="warden-{{sxList.id}}">查看详情</button> </li> {{/each}} {{else if data.length>0}} <li class="todoLi"> <span style="text-align: center">标题</span> <span>类型</span> <span>操作</span> </li> {{each data as sxList i}} <li class="todoLi"> <span>{{i+1}}、{{sxList.name}}</span> {{if sxList.required}} <span class="mustDoneText">必办</span> <button class="blBtn" onclick='clickHref("{{sxList.url}}","{{sxList.code}}","{{sxList.validation}}")' data-warden="warden-{{sxList.id}}">办理</button> {{else}} <span>选办</span> <button class="blBtn" onclick='clickHref("{{sxList.url}}","{{sxList.code}}","{{sxList.validation}}")' data-warden="warden-{{sxList.id}}">办理</button> <button class="ignoreBtn" onclick='clickIgnore("{{sxList.id}}","{{sxList.code}}")'>忽略</button> {{/if}} </li> {{/each}} {{/if}}</script></ul>
                    <div class="pageNav">
                        <button id="allDoneList-prev">上一页</button>
                        &nbsp;第&nbsp;<span id="page-index"></span>/<span id="page-total"></span>&nbsp;页
                        <button id="allDoneList-next">下一页</button></div>
                    <div class="pageNav">
                        <button id="allDoneList-prev-tzgs">上一页</button>
                        &nbsp;第&nbsp;<span id="page-index-tzgs"></span>/<span id="page-total-tzgs"></span>&nbsp;页
                        <button id="allDoneList-next-tzgs">下一页</button></div>
                </div>
            </div>
        </div>
        <iframe id="iframeMain" width="100%" name="in" frameborder="0" height="100%" scrolling="no"></iframe>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="/bszm-web/apps/scripts/onlineSupport.js"></script>
    <script src="allMatter.js"></script>
</body>
</html>
