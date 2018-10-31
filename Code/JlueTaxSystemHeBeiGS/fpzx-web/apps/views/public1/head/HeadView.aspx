<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HeadView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.public1.head.HeadView" %>

<!DOCTYPE html>

<div class="header-area">
    <div class="container">
        <div class="home-logo fl"></div>
    </div>
    <div class="modules-area">
        <div class="container">
            <div class="breadcrumb-Nav fl"><a style="cursor: pointer" href="javascript:(window.location.href='/bszm-web/apps/views/simpleCompany/simpleCompany.aspx?_t='+new Date().getTime())">我的办税大厅</a>><span>{{title}}</span></div>
            <div class="company-info fr"><span>纳税人识别号：{{nsrsbh}}</span> <span style="margin-left: 20px">纳税人名称：{{nsrmc}}</span></div>
        </div>
    </div>
</div>
