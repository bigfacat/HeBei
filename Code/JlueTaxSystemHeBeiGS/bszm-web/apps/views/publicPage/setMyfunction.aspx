<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="setMyfunction.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.bszm_web.apps.views.publicPage.setMyfunction" %>


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
        <div class="container menuContent">
            <div class="context-box commonFunction">
                <div class="sxTabContent"><a class="ico-tab ico-cygnTab active">我的常用功能</a></div>
                <ul class="cygnUlEdit">
                    <script id="cygnUlEditHtml" type="text/html">{{if data}} {{each data as cygnLiList}} <li id="{{cygnLiList.id}}">{{cygnLiList.name}}</li> {{/each}} {{/if}}</script></ul>
            </div>
            <div class="bottomBtn myFunctionBtn"><a class="closeBtn">关闭</a> <a class="saveBtn">保存</a></div>
            <div class="context-box allFunction">
                <div class="sxTabContent allTab"><a class="ico-sbTab active" id="sb">我要申报</a> <a class="ico-fpTab" id="fp">我要用票</a> <a class="ico-djTab" id="dj">我要登记</a><a class="ico-yhTab" id="yhrd">优惠/认定</a> <a class="ico-wyyyTab" id="wyyy">我要预约</a><a class="ico-zmTab" id="qt">其他</a></div>
                <div class="qbgnDiv">
                    <script id="qbgnUlHtml" type="text/html">{{if data}} {{if data.allFunctions}} {{each data.allFunctions as qbgnUlList i}} <ul class="qbgnUlEdit {{i}}"> {{each data.allFunctions[i] as qbgnLiList i}} <li id="{{qbgnLiList.id}}"> <span></span> <a href="javascript:void(0);" onclick='clickHref("{{qbgnLiList.url}}","{{qbgnLiList.code}}","{{qbgnLiList.validation}}")' data-warden="warden-{{qbgnLiList.id}}">{{qbgnLiList.name}}</a> </li> {{/each}} </ul> {{/each}} {{/if}} {{/if}}</script></div>
            </div>
            <div class="allFunctionBtn">
                <div class="hideAll">
                    <img src="../../images/home/hideAll.png">点击收起全部功能</div>
                <div class="showAll">
                    <img src="../../images/home/showAll.png">点击展开全部功能</div>
            </div>
        </div>
        <iframe id="iframeMain" width="100%" name="in" frameborder="0" height="100%" scrolling="no"></iframe>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="/bszm-web/apps/scripts/onlineSupport.js"></script>
    <script src="setMyfunction.js"></script>
</body>
</html>
