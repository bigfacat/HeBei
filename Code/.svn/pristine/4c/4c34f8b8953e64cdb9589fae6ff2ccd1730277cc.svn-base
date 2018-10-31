<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="header.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views_wrt.publicPage.header" %>

<!DOCTYPE html>



<div class="change-info-tab"><span class="tab-info" id="change-grbs" style="display:none;">个人办税</span> <span class="tab-info qybs" id="change-qybs">企业办税</span> <a class="tab-info tab-tcdl" href="#" id="tcdl-btn">退出登录</a></div>
<div class="fr" id="userInfo">
    <div class="current-dqyh" id="change-dqyh">
        <img class="arrowDownImg mr-right" src="../../images/home/ico-gr.png">
        当前账户：<span id="current-user-name" class="mr20" title="{{AccountInfo.fullName}}">{{AccountInfo.fullName}}</span>
        <img class="arrowDownImg mr20" src="../../images/home/down.png"></div>
    <div class="current-dqqy" id="change-sqqy">{{if NsrInfo}}
        <img class="arrowDownImg mr-right" src="../../images/home/ico-qy.png">
        当前企业：<span id="current-company" title="{{NsrInfo.gsNsrmc}}">{{NsrInfo.gsNsrmc}}</span>
        <img class="arrowDownImg mr20" src="../../images/home/down.png">
        {{/if}}</div>
</div>
<div class="userInfoList" id="grList">
    <div class="topUserInfo">
        <img src="../../images/home/userInfoListBg.png">
        <img class="userAccountImg" src="../../images/home/userInfoListAccount.png"><ul class="userBaseInfo">
            <li class="userName">{{AccountInfo.fullName}}</li>
            <li class="postId">身份证号：{{AccountInfo.identityCardNo}}</li>
            <li class="phoneNum">手机号码：{{AccountInfo.mobile}}</li>
        </ul>
    </div>
    <ul class="bottomUserInfo">{{if userMode}} {{if userMode=='SIMPLE'}}<li class="bottomActive"><a href="../publicPage/allMatter.aspx?simpleCompany&gr&type=bszyTab">办税指引</a></li>
        {{/if}} {{if userMode=='PROFESSIONAL'}}<li class="bottomActive"><a href="../publicPage/allMatter.aspx?professionCompany&gr&type=bszyTab">办税指引</a></li>
        {{/if}} {{/if}} {{if userType=='02'}}<li><a href="../publicPage/allDoneList.html?personPage&allDone&gr&type=ybsxTab">已办事项</a></li>
        {{/if}} {{if userMode}} {{if userType=='01' && userMode=='SIMPLE'}}<li><a href="../publicPage/allMatter.aspx?simpleCompany&allDone&gr&type=ybsxTab">已办事项</a></li>
        {{/if}} {{if userType=='01' && userMode=='PROFESSIONAL'}}<li><a href="../publicPage/allMatter.aspx?professionCompany&allDone&gr&type=ybsxTab">已办事项</a></li>
        {{/if}} {{/if}}<li><a href="/hbyt/zxbz.aspx">在线帮助</a></li>
    </ul>
</div>
<div class="userInfoList" id="qyList">{{if NsrInfo}}<div class="topUserInfo">
    <img src="../../images/home/userInfoListBg.png">
    <img class="userAccountImg" src="../../images/home/userInfoListAccount.png"><ul class="userBaseInfo">
        <li class="userName" title="{{NsrInfo.gsNsrmc}}">{{NsrInfo.gsNsrmc}}</li>
        <li class="postId" title="{{NsrInfo.nsrsbhGs}}">{{NsrInfo.nsrsbhGs}}</li>
        <li class="postId" title="信用等级：{{xydj}}">信用级别：<a href="../../../../wszx-web/apps/views/xydj/xydjxx.html" target="_blank">{{xydj}}</a></li>
        <li class="phoneNum" title="{{swjgMc}}">{{swjgMc}}</li>
    </ul>
</div>
    <ul class="bottomUserInfo">{{if userMode}} {{if userMode=='SIMPLE'}}<li class="bottomActive"><a href="../publicPage/allMatter.aspx?simpleCompany&qy&type=bszyTab">办税指引</a></li>
        {{/if}} {{if userMode=='PROFESSIONAL'}}<li class="bottomActive"><a href="../publicPage/allMatter.aspx?professionCompany&qy&type=bszyTab">办税指引</a></li>
        {{/if}} {{/if}} {{if userType=='02'}}<li><a href="../publicPage/allDoneList.html?personPage&allDone&qy&type=ybsxTab">已办事项</a></li>
        {{/if}} {{if userMode}} {{if userType=='01' && userMode=='SIMPLE'}}<li><a href="../publicPage/allMatter.aspx?simpleCompany&allDone&qy&type=ybsxTab">已办事项</a></li>
        {{/if}} {{if userType=='01' && userMode=='PROFESSIONAL'}}<li><a href="../publicPage/allMatter.aspx?professionCompany&allDone&qy&type=ybsxTab">已办事项</a></li>
        {{/if}} {{/if}}<li><a href="/hbyt/zxbz.aspx">在线帮助</a></li>
        <li class="logout"><a href="#">退出登录</a></li>
    </ul>
    {{/if}}</div>
