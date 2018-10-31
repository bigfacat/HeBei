<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="simpleCompany.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views.simpleCompany.simpleCompany" %>

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
        <div class="container" style="height: 70px">
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
    <div class="content-area">
        <div class="container menuContent">
            <div class="width-790 fr">
                <div class="context-box">
                    <div class="sxTabContent"><a class="ico-tab ico-dbsxTab" data-type="bszyTab">我的办税指引</a> <a class="ico-tab ico-ybsxTab" data-type="ybsxTab">我的已办事项</a> <a class="ico-tab ico-tzgsTab" data-type="tzgsTab">我的通知公示</a> <a class="ico-tab ico-tstxTab" data-type="tstxTab">我的提示提醒 <span class="unread-num" id="unread-num"></span></a></div>
                    <ul class="common bszyTab ysbqcTab">
                        <script id="ysbqcList" type="text/html">{{if data.length>0}} <li class="todoLi sbLi"> <span>申报事项</span> <span>办理期限</span> <span>办理状态</span> <span>类型</span> <span style="width: 22%">操作</span> </li> {{each data as item i}} <li class="todoLi sbLi"> <span class="h-pointer" onclick='clickHref("{{item.url}}","{{item.code}}")' data-warden="warden-{{item.id}}">{{i+1}}、{{item.name}}</span> <span class="h-pointer">{{item.sbqx}}</span> {{if item.category==='sb'}} {{if item.ysbbz==='Y'}} <span class="h-pointer">已申报</span> <span class="mustDoneText">必办</span> {{else}} <span class="h-pointer">未申报</span> <span class="mustDoneText">必办</span> <button class="blBtn" onclick='clickHref("{{item.url}}","{{item.code}}")' data-warden="warden-{{item.id}}">办理</button> {{/if}} {{else}} <span class="h-pointer">&nbsp;</span> <span class="mustDoneText">必办</span> <button class="blBtn" onclick='clickHref("{{item.url}}","{{item.code}}")' data-warden="warden-{{item.id}}">办理</button> {{/if}} </li> {{/each}} {{/if}}</script></ul>
                    <div class="break-line" id="break-line"></div>
                    <ul class="common bszyTab qtsxTab">
                        <script id="qtsxList" type="text/html">{{if data.length>0}} <li class="todoLi"> <span>其他事项</span> <span>类型</span> <span>操作</span> </li> {{each data as sxList i}} <li class="todoLi"> <span class="h-pointer" onclick='clickHref("{{sxList.url}}","{{sxList.code}}","{{sxList.validation}}")' data-warden="warden-{{sxList.id}}">{{i+1}}、{{sxList.name}}</span> {{if sxList.required}} <span class="mustDoneText">必办</span> <button class="blBtn" onclick='clickHref("{{sxList.url}}","{{sxList.code}}","{{sxList.validation}}")' data-warden="warden-{{sxList.id}}">办理</button> {{else}} <span>选办</span> <button class="blBtn" onclick='clickHref("{{sxList.url}}","{{sxList.code}}","{{sxList.validation}}")' data-warden="warden-{{sxList.id}}">办理</button> <button class="ignoreBtn" onclick='clickIgnore("{{sxList.id}}","{{sxList.code}}")'>忽略</button> {{/if}} </li> {{/each}} {{/if}}</script></ul>
                    <ul class="common ybsxTab">
                        <script id="ybsxList" type="text/html">{{if doneList}} {{each doneList as sxList i}} <li class="context"> <a href="{{sxList.url}}{{if sxList.id}}&id={{sxList.id}}{{/if}}" class="fli" target="_blank" data-warden="warden-{{sxList.id}}"> {{i+1}}、{{sxList.name}}{{sxList.date.substring(0,10)}} </a> <a href="{{sxList.url}}{{if sxList.id}}&id={{sxList.id}}{{/if}}" target="_blank" data-warden="warden-{{sxList.id}}"> {{sxList.statusName}} </a> </li> {{/each}} {{/if}}</script></ul>
                    <ul class="common tzgsTab">
                        <script id="tzgsList" type="text/html">{{if data.length>0}} <li class="todoLi tzgsLi"> <span>标题</span> <span>发布日期</span> <span class="brief">正文摘要</span> <span class="option">操作</span> </li> {{each data as sxList i}} <li class="todoLi tzgsLi"> <span class="h-pointer" onclick='clickHref("{{sxList.mainContentPath}}")' data-warden="warden-{{sxList.id}}">{{i+1}}、{{sxList.subject}}</span> <span>{{sxList.publishDate.substr(0,10)}}</span> <span class="brief" title="{{sxList.brief}}">{{sxList.brief}}</span> <button class="blBtn" onclick='clickHref("{{sxList.mainContentPath}}")' data-warden="warden-{{sxList.id}}">查看详情</button> </li> {{/each}} {{/if}}</script></ul>
                    <ul class="common tstxTab">
                        <script id="tstxList" type="text/html">{{if value.length>0}} <li class="todoLi tzgsLi"> <span>标题</span> <span>发布日期</span> <span class="brief">正文摘要</span> <span class="option">操作</span> </li> {{each value as sxList i}} <li class="todoLi tzgsLi"> <span class="h-pointer" onclick='showTstxDetails({{i}})' data-warden="warden-{{sxList.id}}">{{i+1}}、{{sxList.subject}} {{if sxList.ydzt==='N'}} <i class="tstx-unread">未读</i> {{/if}} </span> <span>{{sxList.publishdate.substr(0,10)}}</span> <span class="brief" title="{{sxList.brief}}">{{sxList.brief}}</span> <button class="blBtn" onclick='showTstxDetails({{i}})' data-warden="warden-{{sxList.id}}">查看详情</button> </li> {{/each}} {{/if}}</script></ul>
                    <a class="all-items zy" href="../publicPage/allMatter.aspx?simpleCompany&type=bszyTab">更多&nbsp;&gt;&gt;</a> <a style="display: none" class="all-items sx" href="../publicPage/allMatter.aspx?simpleCompany&type=ybsxTab">更多&nbsp;&gt;&gt;</a> <a style="display: none" class="all-items tz" href="../publicPage/allMatter.aspx?simpleCompany&type=tzgsTab">更多&nbsp;&gt;&gt;</a></div>
            </div>
            <div class="width-390 fl">
                <div class="context-box">
                    <div class="title ico-cygn">我的常用功能<div id="searchFunc">
                        <input type="text" placeholder="功能搜索" height="40px" width="155px">
                        <img src="../../images/home/ico-search.png"></div>
                    </div>
                    <ul class="cygnContent">
                        <script id="cygnUlHtml" type="text/html">{{if data}} {{each data as cygnLiList i}} {{if i<8}} <li class="context" title="{{cygnLiList.name}}">{{i+1}}、 <a href="javascript:void(0);" onclick='clickHref("{{cygnLiList.url}}","{{cygnLiList.code}}","{{cygnLiList.validation}}")' data-warden="warden-{{cygnLiList.id}}">{{cygnLiList.name}}</a> </li> {{/if}} {{/each}} {{/if}}</script></ul>
                    <a class="all-items" href="../publicPage/commonAndAllFunction.aspx?simpleCompany">全部功能&nbsp;>></a></div>
            </div>
        </div>
        <iframe id="iframeMain" width="100%" name="in" frameborder="0" height="100%" scrolling="no"></iframe>
    </div>
    <div id="tstx-win" class="mini-window" title="查看详情" style="width: 600px; height: 400px; display: none" showmaxbutton="false" showtoolbar="false" showfooter="true" showmodal="true" allowresize="false" allowdrag="true" onbeforehide="initTstxData">
        <div class="tstx-title" id="tstx-title"></div>
        <div class="tstx-content" id="tstx-content"></div>
        <div class="tstx-link txt-c" id="tstx-link"></div>
        <div property="footer" class="tstx-actions txt-c"><a class="mini-button button-blue" style="padding: 0 30px" onclick="mini.get('tstx-win').hide();">确定</a></div>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="/bszm-web/apps/scripts/onlineSupport.js"></script>
    <script src="simpleCompany.js"></script>
</body>
</html>
