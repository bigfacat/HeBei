<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qysdsyhsxbaView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.qysdsyhsxba.qysdsyhsxbaView" %>

<!DOCTYPE html>


<h2>企业所得税优惠信息备案</h2>
<section>
    <h5>填写纳税人信息</h5>
    <table class="form-table table_bg" id="nsrjbxx">
        <tr>
            <th style="width: 170px;">纳税人识别号：</th>
            <td>
                <input id="nsrsbh_init" name="nsrsbh_init" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
            <th style="width: 170px;">纳税人名称：</th>
            <td>
                <input id="nsrmc_init" name="nsrmc_init" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
        </tr>
        <tr>
            <th style="width: 170px;">登记注册类型：</th>
            <td>
                <input id="djzclxMc" name="djzclxMc" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
            <th style="width: 170px;">生产经营地址：</th>
            <td>
                <input id="scjydz" name="scjydz" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
        </tr>
        <tr>
            <th style="width: 170px;">跨地区汇总纳税企业总机构：</th>
            <td class="radio_left" colspan="3">
                <div id="kdqhzbz" class="mini-radiobuttonlist" textfield="text" valuefield="id" data="[{id:'1',text:'是'}, {id:'0',text:'否'}]" enabled="false"></div>
            </td>
        </tr>
    </table>
    <h5>本次备案信息</h5>
    <table class="form-table">
        <tr>
            <th style="width: 170px;"><span style="color: red">*</span>备案年度</th>
            <td>
                <input class="mini-hidden" name="sysDate" id="sysDate" style="display: none">
                <input id="band" name="band" class="mini-spinner" minvalue="2015" onvaluechanged="qysdsyhsxba.initTxsq" width="100%" required="true" requirederrortext="请选择备案年度"></td>
            <th style="width: 170px;"><span style="color: red">*</span>优惠事项名称</th>
            <td>
                <input id="yhsxInit" name="yhsxInit" class="mini-combobox" textfield="MC" valuefield="ID" required="true" requirederrortext="请选择优惠事项" width="100%"></td>
        </tr>
    </table>
    <h5>已备案信息</h5>
    <div id="qysdsyhsxba_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" allowcellselect="true" allowcelledit="true">
        <div property="columns">
            <div header="企业所得税优惠事项备案表">
                <div property="columns">
                    <div field="band" width="180" headeralign="center" allowsort="true">备案年度</div>
                    <div field="yhsxmc" id="yhsxmc" width="800" headeralign="center" allowsort="true">优惠事项名称</div>
                </div>
            </div>
        </div>
    </div>
    <div id="ybayhsxqdb_div">
        <div id="ybayhsxqdb_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" allowcellselect="true" allowcelledit="true">
            <div property="columns">
                <div header="跨地区汇总纳税企业分支机构已备案优惠事项清单表">
                    <div property="columns">
                        <div type="indexcolumn">序号</div>
                        <div field="swjgDm" width="160" headeralign="center" allowsort="true">分支机构名称</div>
                        <div field="yhsxmc" width="700" headeralign="center" allowsort="true">跨地区汇总纳税企业分支机构已备案优惠事项清单</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
