<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YlView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglFply.YlView" %>

<!DOCTYPE html>

<h2>预览</h2>
<section class="third-step">
    <p>发票领用信息：</p>
    <div data-view-type="datagrid">
        <div id="fply-info" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" showpager="false" showemptytext="true" autoload="false">
            <div property="columns">
                <div field="fpzlMc" headeralign="center">发票种类</div>
                <div field="jldwmc" headeralign="center" visible="false">发票单位</div>
                <div field="jldwDm" headeralign="center" visible="false">计量单位代码</div>
                <div field="fpzldm" headeralign="center" visible="false">发票种类代码</div>
                <div field="fs" headeralign="center">结存发票份数</div>
                <div field="bczgkyfs" headeralign="center">本次最高可领份数</div>
                <div field="mbfs" headeralign="center" renderer="fply.onmbfsRender">每本份数</div>
                <div field="bs" headeralign="center" visible="false" renderer="fply.onbs">本数</div>
                <div field="sqfs" headeralign="center" renderer="fply.colorRender">数量</div>
            </div>
        </div>
    </div>
</section>
