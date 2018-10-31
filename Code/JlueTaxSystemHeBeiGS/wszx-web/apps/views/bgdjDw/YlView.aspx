<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YlView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.bgdjDw.YlView" %>

<!DOCTYPE html>

<h2>预览</h2>
<section>
    <div data-view-type="datagrid">
        <div class="mini-datagrid" id="yl" style="width: 1160px; height: 200px;" allowresize="false" enabled="false" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div field="bgxmMc">变更项目</div>
                <div field="bgqz">变更前</div>
                <div field="bghz">变更后</div>
            </div>
        </div>
    </div>
</section>
