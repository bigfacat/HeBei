<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsjzjtView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.zzsjzjt.zzsjzjtView" %>

<!DOCTYPE html>

<h2>发票丢失</h2>
<section>
    <div id="step_tx_form">
        <h5>纳税人基本信息</h5>
        <table class="form-table table_bg" data-bind-grid="jzjt_grid">
            <tr>
                <th style="width: 170px;">纳税人识别号：</th>
                <td>
                    <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
                <th style="width: 170px;">纳税人名称：</th>
                <td>
                    <input id="nsrmc" name="nsrmc" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
            </tr>
            <tr>
                <th style="width: 170px;">登记注册类型：</th>
                <td>
                    <input id="djzclx" name="djzclx" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
                <th style="width: 170px;">生产经营地址：</th>
                <td>
                    <input id="scjydz" name="scjydz" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
            </tr>
        </table>
        <div class="grid-toolbar" data-bind-grid="jzjt_grid">
            <div class="grid-title ft-Bold">减免税备案登记表</div>
            <a class="mini-button toolBtn-blue" iconcls="icon-add" onclick="zzsjzjt.addRow();scrollTo(0,0)">增加</a> <a class="mini-button" iconcls="icon-edit" onclick="zzsjzjt.editRow">修改</a><a class="mini-button grid-remove" iconcls="icon-remove" style="margin-left: 1px">删除</a></div>
        <div id="jzjt_grid" class="mini-datagrid" style="width: 1160px; height: 120px;" allowresize="false" allowcellvalid="true" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" allowcellselect="true" allowcelledit="false" oncellbeginedit="onCellbeginedit" oncellendedit="Cellendedit">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div field="jmsspsxMc" headeralign="center" align="center" vtype="required">税务资格备案事项
                    <input class="mini-textbox" enabled="false" style="display: none;"></div>
                <div field="zspmMc" headeralign="center" align="center" vtype="required">征收品目
                    <input class="mini-textbox" enabled="false" style="display: none;"></div>
                <div field="jmzcMc" headeralign="center" align="center" vtype="required">减免政策名称
                    <input class="mini-textbox" enabled="false" style="display: none;"></div>
                <div field="jmxzdlMc" headeralign="center" align="center" vtype="required">减免性质大类
                    <input class="mini-textbox" enabled="false" style="display: none;"></div>
                <div field="jmxzxlMc" headeralign="center" align="center" vtype="required">减免性质小类
                    <input class="mini-textbox" enabled="false" style="display: none;"></div>
                <div field="jmlxMc" headeralign="center" align="center" vtype="required">减免类型
                    <input property="editor" class="mini-combobox" textfield="MC" valuefield="ID" url="zzsjzjt.zzsjzjtService.Api.jmlx"></div>
                <div field="jmqxq" headeralign="center" align="center" vtype="required">减免有效期起
                    <input property="editor" class="mini-datepicker"></div>
                <div field="jmqxz" headeralign="center" align="center" vtype="required">减免有效期止
                    <input property="editor" class="mini-datepicker"></div>
            </div>
        </div>
    </div>
</section>
