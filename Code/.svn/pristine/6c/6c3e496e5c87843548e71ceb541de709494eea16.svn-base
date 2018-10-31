<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ycqh_.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yybs.ycqh_" %>

<!DOCTYPE html>


<h2></h2>
<section>
    <h3 class="txt-c">预约办税（远程取号）</h3>
    <div class="ycqh-content width1200">
        <div class="swjgInfo">
            <table width="100%">
                <tr>
                    <td width="34%">办税网点名称：<span class="swjgMc"></span></td>
                    <td width="26%">联系电话：<span class="swjgLxdh"></span></td>
                    <td width="40%">办税时间：<span class="swjgBgsj"></span></td>
                </tr>
                <tr>
                    <td colspan="3">办税网点地址：<span class="swjgDz"></span> <span class="checkLocation"></span><a href="javascript:void(0)" id="mapTag"><span class="viewMap">[查看地图]</span></a></td>
                </tr>
            </table>
        </div>
        <div>
            <button class="refreshBtn">刷新</button></div>
        <div class="blsxList">
            <ul id="blsxList"></ul>
        </div>
        <div class="tx-center">
            <button class="button-blue" id="quhao" style="padding: 7px 30px; margin-right: 20px; font-size: 14px">取号</button>
            <button class="button-blue" id="myqh" style="padding: 7px 30px; font-size: 14px">我的取号</button></div>
    </div>
    <div class="ywsxxl top" id="ywsxxl"><span class="tooltip-arrow"></span><span class="tooltip-content"></span></div>
    <div id="confirmWindow" class="mini-window confirmWindow" style="width: 450px; height: 260px; display: none" showheader="false" showmodal="true" showclosebutton="true">
        <div class="head-bar"><span class="close-icon">×</span></div>
        <div class="win-content">
            <div>排队业务：<span class="ywTitle">申报纳税</span></div>
            <div>正在受理：<span class="currentNum">106</span>号</div>
            <div>等候人数：<span class="waitNum">16</span>人</div>
        </div>
        <div class="foot-bar">
            <button class="confirmBtn">确认取号</button></div>
    </div>
    <div id="successWindow" class="mini-window successWindow" style="width: 450px; height: 260px; display: none" showheader="false" showmodal="true" showclosebutton="true">
        <div class="head-bar"><span class="close-icon">×</span></div>
        <div class="win-content" style="margin-bottom: 57px">
            <div>我的号码：<span class="myNum">107</span>号</div>
            <div>前面等候人数：<span class="waitNum">106</span>人</div>
            <div>当前受理号码：<span class="currentNum">16</span>号</div>
        </div>
        <div class="foot-bar">
            <button class="okBtn">确认</button></div>
    </div>
    <div id="unBindWindow" class="mini-window successWindow" style="width: 550px; height: 650px; display: none" showheader="false" showmodal="true" showclosebutton="true">
        <div class="head-bar"><span class="close-icon">×</span></div>
        <div class="win-content" style="padding-bottom: 20px">
            <div>为了方便您在手机上查看所取号码, 请完成微信绑定：</div>
            <div><span class="blueText">第一步</span>：扫码关注河北国税微信公众号</div>
            <img src="../../images/yybs/gongzhonghao.jpg"><div style="margin-top: 10px;"><span class="blueText">第二步</span>：在微信公众号里完成税号绑定</div>
            <img src="../../images/yybs/shbd.png"><div style="margin-top: 10px;"><span class="blueText">第三步</span>：点击"完成"按钮</div>
            <button class="bindBtn">完成</button></div>
    </div>
    <div id="selectPhoneWindow" class="mini-window successWindow" style="width: 300px; height: 260px; display: none" showheader="false" showmodal="true" showclosebutton="true">
        <div class="head-bar"><span class="headTitle" style="font-weight: bold;">请选择同步的手机号</span> <span class="close-icon">×</span></div>
        <div class="win-content">
            <ul id="phoneLists">
                <li class="phoneItem active"><span class="phoneCircle"></span><span class="phoneText">1392333434</span></li>
            </ul>
        </div>
        <div class="foot-bar">
            <button class="selectBtn">确认</button></div>
    </div>
    <div id="selectDt" class="mini-window successWindow" style="width: 450px; height: 230px; display: none" showheader="false" allowdrag="true" showmodal="true" showclosebutton="true">
        <div class="head-bar" style="border-bottom: 1px #eee solid"><span style="float: left; margin-top: 10px; font-size: 20px">选择大厅</span> <span class="close-icon" id="select-close">×</span></div>
        <div class="win-content" id="dt-list" style="font-size: 18px; text-align: center; margin-top: 20px"></div>
        <div style="text-align: center; margin-top: 20px">
            <button class="dtBtn">确定</button></div>
    </div>
    <div id="viewMyNum" class="mini-window successWindow" style="width: 450px; height: 230px; display: none" showheader="false" allowdrag="true" showmodal="true" showclosebutton="true">
        <div class="head-bar" style="border-bottom: 1px #eee solid"><span style="float: left; font-size: 12px; margin-left: 15px">我的号码</span> <span class="close-icon">×</span></div>
        <div class="win-content" style="font-size: 14px; margin-top: 30px; text-align: left; padding: 0px 30px">
            <div style="line-height: 25px; margin-bottom: 27px; height: 87px">
                <div id="myNum" style="margin: 0"></div>
                <div>请及时前往相应大厅等待叫号!</div>
            </div>
        </div>
        <div style="text-align: center;">
            <button class="myNumBtn">确定</button></div>
    </div>
</section>
