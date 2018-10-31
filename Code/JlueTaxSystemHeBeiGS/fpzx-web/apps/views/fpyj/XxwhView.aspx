<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="XxwhView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpyj.XxwhView" %>

<!DOCTYPE html>



<h2>选择发票种类</h2>
<section>
    <h3>发票结存情况</h3>
    <div id="fpyj-grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" multiselect="false" allowcellselect="true">
        <div property="columns">
            <div type="indexcolumn" width="5%">序号</div>
            <div type="checkcolumn" width="5%">选择</div>
            <div field="fpzlMc" width="30%">发票种类</div>
            <div field="fpzlDm" visible="false"></div>
            <div field="fpDm" width="20%">发票代码</div>
            <div field="fs" width="10%">份数</div>
            <div field="fpqshm" width="10%">发票起始号码</div>
            <div field="fpzzhm" width="10%">发票终止号码</div>
            <div field="lrrq" width="10%">领票月份</div>
        </div>
    </div>
</section>
