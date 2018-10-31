<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FbzlView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.public1.fbzl.FbzlView" %>

<!DOCTYPE html>


<h2>上传附报资料</h2>
<section class="third-step">
    <input type="hidden" name="scfbzl" value="scfbzl"><div id="fbzl-grid" class="mini-datagrid" style="width: 1160px; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
        <div property="columns">
            <div type="indexcolumn" width="50">序号</div>
            <div field="fbzlMc" class="xxxxx">资料名称</div>
            <div field="scCount">上传数量</div>
            <div field="bslxDm" renderer="onRenderApply">要求</div>
            <div field="status" renderer="onRenderOpearte" width="140" align="center">操作</div>
        </div>
    </div>
</section>
