<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TxsqView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglFply.TxsqView" %>

<!DOCTYPE html>

<h2>填写申请表</h2>
<section class="first-step">
    <p>您好，<span id="fply-gsmc"></span>，根据您的<span class="text-color">票种核定</span>信息，你可以申请领取以下发票：</p>
    <div id="pzhd-grid" class="mini-datagrid" style="width: 1160px; height: 150px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowcellvalid="true" allowcellselect="true" allowcelledit="true" oncellvalidation="fply.cellValidation">
        <div property="columns">
            <div field="fpzlMc" headeralign="center">发票种类</div>
            <div field="jldwmc" headeralign="center" visible="false">计量单位名称</div>
            <div field="fplysqbs" headeralign="center" visible="false">发票领用申请标志</div>
            <div field="jldwDm" headeralign="center" visible="false">计量单位代码</div>
            <div field="fpdwzl" headeralign="center" visible="false">发票单位重量</div>
            <div field="fpzldm" headeralign="center" visible="false">发票种类代码</div>
            <div field="fs" headeralign="center">结存发票份数</div>
            <div field="bczgkyfs" headeralign="center">本次最高可领份数</div>
            <div field="mbfs" headeralign="center" renderer="fply.onmbfsRender">每本/每卷份数</div>
            <div field="bs" headeralign="center" visible="false" renderer="fply.onbs">本数</div>
            <div field="sqfs" headeralign="center" renderer="fply.sqfs" datatype="int">数量
                <input property="editor" class="mini-textbox" style="width: 100%;"></div>
        </div>
    </div>
    <p class="fphd-title">发票核定信息 <span id="fphd-show" style="display: none" class="arrow-down"></span><span id="fphd-hide" class="arrow-up"></span></p>
    <div id="fphd-grid" class="mini-datagrid fphd" style="width: 1160px; height: 150px;" allowresize="false" showpager="false" showemptytext="true">
        <div property="columns">
            <div field="fpzlmc" headeralign="center">发票种类</div>
            <div field="myzggpsl" headeralign="center">每月购票最高数量</div>
            <div field="cpzgsl" headeralign="center">每月持票最高数量</div>
            <div field="mczggpsl" headeralign="center">每次最高购票数量</div>
            <div field="dffpzgkpxe" headeralign="center">单张发票开票限额（元）</div>
        </div>
    </div>
</section>
