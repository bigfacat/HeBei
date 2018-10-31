<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="commonAndAllFunction.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views.publicPage.commonAndAllFunction" %>

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
                <div class="container contentTitle"><a href="../../../apps/views/personPage/personPage.aspx">我的办税大厅</a>&gt;全部功能</div>
                <div class="context-box commonFunction">
                    <div class="sxTabContent"><a class="ico-tab">常用功能</a> <a class="all-items customFunction" onclick="mnsetfunction()" <%--href="setMyfunction.aspx"--%>>自定义常用功能</a></div>
                    <ul class="cygnUl">
                        <script id="cygnUlHtml" type="text/html">{{if data}} {{each data as cygnLiList}} <li> <a href="javascript:void(0);" onclick='clickHref("{{cygnLiList.url}}","{{cygnLiList.code}}","{{cygnLiList.validation}}")' data-warden="warden-{{cygnLiList.id}}">{{cygnLiList.name}}</a> </li> {{/each}} {{/if}}</script></ul>
                </div>
                <div class="context-box allFunction">
                    <div class="sxTabContent allTab"><a class="ico-sbTab active" id="sb">我要申报</a> <a class="ico-fpTab" id="fp">我要用票</a> <a class="ico-djTab" id="dj">我要登记</a><a class="ico-yhTab" id="yhrd">优惠/认定</a> <a class="ico-wyyyTab" id="wyyy">我要预约</a><a class="ico-zmTab" id="qt">其他</a></div>
                    <div class="qbgnDiv">
                        <script id="qbgnUlHtml" type="text/html">{{if data}} {{if data.allFunctions}} {{each data.allFunctions as qbgnUlList i}} <ul class="qbgnUl {{i}}"> {{each data.allFunctions[i] as qbgnLiList}} <li> <a href="javascript:void(0);" onclick='clickHref("{{qbgnLiList.url}}","{{qbgnLiList.code}}","{{qbgnLiList.validation}}")' data-warden="warden-{{qbgnLiList.id}}">{{qbgnLiList.name}}</a> </li> {{/each}} </ul> {{/each}} {{/if}} {{/if}}</script></div>
                </div>
            </div>
        </div>
        <iframe id="iframeMain" width="100%" name="in" frameborder="0" height="100%" scrolling="no"></iframe>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="/bszm-web/apps/scripts/onlineSupport.js"></script>
    <script src="commonAndAllFunction.js"></script>
</body>
</html>
