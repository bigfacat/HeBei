<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wyyy_.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yybs.wyyy_" %>

<!DOCTYPE html>

<h2></h2>
<section>
    <h3 class="txt-c">预约办税（我要预约）</h3>
    <div class="wyyyContent width1150" id="wyyyContent">
        <script id="wyyyTemplate" type="text/template">
            <div class="sjxx">
                <div class="wxtsRegion">
                    <div class="wxtsTitle"><a class="sqBtn">收起<img src="../../images/yybs/arrow.png" /></a> </div>
                    <div class="wxtsText">
                        <p>1、同一纳税人一天只能预约一个业务，需调整预约时间需要取消预约后，再重新预约。</p>
                        <p>2、如果纳税人不能在预约的时间段内到排队机取号，应提前取消预约，否则视为失约。</p>
                        <p>3、同一纳税人连续三个月内三次失约，列入黑名单，半年内不能发起预约申请。</p>
                    </div>
                </div>
                <div class="sjxxTitle"><span>办税网点信息</span><span class="change-dt">切换>></span> <a class="wxtsBtn" style="display: none;">
                    <img src="../../images/yybs/prompt.png" />温馨提示</a> </div>
                <div class="sjxxContext"><span class="sjxxName">办税网点名称：</span> <span class="swjgMc sjxxText">{{=it.swjgMc}}</span> <span class="sjxxName" style="margin-left: 12px;">联系电话：</span> <span class="sjhm sjxxText">{{=it.sjhm}}</span><br />
                    <span class="sjxxName">办税时间：</span> <span class="sjxxText">上午 09：00-12：00 下午 13：00-17：00</span> <span class="sjxxName">办税网点地址：</span> <span class="sjxxText"><span class="swjgdz">{{it.swjgdz}}</span> <a id="mapTag">
                        <img src="../../images/yybs/address.png" />[查看地图]</a> </span></div>
            </div>
            <div class="xzyw">
                <div class="xzTitleImg">
                    <img src="../../images/yybs/xzyw.png" /></div>
                {{each it.yysx as value i}} <a class="xzywRegion"><span class="xzBtn">
                    <img src="../../images/yybs/circular.png" />{{value.yysxmc.replace("预约","")}}</span> </a>{{/each}} </div>
            <div class="xzrq">
                <div class="xzTitleImg">
                    <img src="../../images/yybs/xzsj.png" /></div>
                {{each it.yyrq as value i}} <a class="xzrqRegion"><span class="xzBtn">
                    <img src="../../images/yybs/circular.png" />{{value}}</span> </a>{{/each}} </div>
            <div class="xzsj">{{each it.yysjd as value i}} {{if value.sfym}}
                <button class="xzsjBtn sfymBtn" disabled="disabled"><span class="fl">{{value.yysjq}}-{{value.yysjz}}</span><span class="fr">剩余：{{it.yysjd[i].kyyrs}}</span></button>
                {{else}}
                <button class="xzsjBtn"><span class="fl">{{value.yysjq}}-{{value.yysjz}}</span><span class="fr">剩余：<span class="red-font">{{value.kyyrs}}</span></span></button>
                {{/if}} {{/each}} </div>
            <div class="wyyyFooter">
                <!--<button class="yyButton">预约</button>-->
                <button class="button-blue yyButton" id="myqh" style="font-size: 14px">预约</button>
            </div>
        </script>
    </div>
    <div id="successWindow" class="mini-window successWindow" style="width: 450px; height: 260px; display: none" showheader="false" showmodal="true" showclosebutton="true">
        <div class="head-bar"><span class="close-icon" id="success-close">×</span></div>
        <div class="win-content" style="font-size: 18px; text-align: center;">
            <img src="../../images/yybs/ok.png" style="width: 50px; height: 50px; margin-right: 20px;">恭喜，预约成功啦！<div style="margin-top: 20px; line-height: 30px">请于<span id="yysj" class="red-font"></span> 持<span id="dlrsf"></span>身份证件去办税服务厅办理<span id="ywmc" class="red-font"></span></div>
        </div>
        <div style="text-align: center">
            <button class="closeBtn">确定</button>
        </div>
    </div>
    <div id="selectDt" class="mini-window successWindow" style="width: 450px; height: 230px; display: none" showheader="false" allowdrag="true" showmodal="true" showclosebutton="true">
        <div class="head-bar" style="border-bottom: 1px #eee solid"><span style="float: left; margin-top: 10px; font-size: 20px">选择大厅</span> <span class="close-icon" id="select-close">×</span></div>
        <div class="win-content" id="dt-list" style="font-size: 18px; text-align: center; margin-top: 20px"></div>
        <div style="text-align: center; margin-top: 20px">
            <button class="dtBtn">确定</button>
        </div>
    </div>
</section>
