<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cxlfpView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fplgCxlsq.cxlfpView" %>

<!DOCTYPE html>


<h2>超限量领购发票购票特批申请</h2>
<section>
    <div id="fpds">
        <h5>填写纳税人信息</h5>
        <div id="fpxx">
            <table class="form-table table_bg">
                <tr>
                    <th style="width: 170px;">纳税人识别号：</th>
                    <td>
                        <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 280px; float: left" required="true" requirederrortext="纳税人识别号不能为空"></td>
                    <th style="width: 170px;">纳税人名称：</th>
                    <td>
                        <input id="nsrmc" name="nsrmc" class="mini-textbox" enabled="false" style="width: 280px; float: left" required="true" requirederrortext="纳税人名称不能为空"></td>
                </tr>
            </table>
        </div>
        <h5>超限量购票明细</h5>
        <div class="grid-toolbar" data-bind-grid="fpds_grid"></div>
        <div id="fpds_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" showemptytext="true" autoload="false" allowresize="false" idfield="id" showpager="false" multiselect="true" oncellcommitedit="fplg.onFpdsCommitEdit" allowsortcolumn="false" allowcellvalid="true" allowcellselect="true" onlycheckselection="true" allowcelledit="true">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpzlMc" width="480">发票名称<div class="mini-textbox" readonly="true"></div>
                </div>
                <div field="fpzlDm" width="240" vtype="int" visible="false">
                    <div class="mini-textbox" readonly="true"></div>
                </div>
                <div field="sqzggpsl" width="260" vtype="required;int" data-options="{requiredErrorText:'申请特批数量不能为空',intErrorText:'申请特批数量只能为整数'}">申请特批数量<input property="editor" class="mini-textbox" onvaluechanged="fpds.onFpdjChange"></div>
                <div field="myzggpsl" width="100" vtype="int">每月最高购票数量<div class="mini-textbox" readonly="true"></div>
                </div>
            </div>
        </div>
        <table class="form-table" id="bsxx">
            <tr>
                <th class="bsxx-th">申请理由<span class="th-title">*</span></th>
                <td colspan="4">
                    <input id="sqly" name="sqly" class="mini-textbox" vtype="maxLength:300" maxlengtherrortext="申请理由不能超过300个字符" style="width: 852px; float: left;" required="true" requirederrortext="申请理由不能为空"></td>
                <th></th>
                <td></td>
            </tr>
            <tr>
                <th class="bsxx-th">定额发票累计购票金额：</th>
                <td>
                    <input id="dyljykdefpje" name="dyljykdefpje" readonly="true" class="mini-moneybox" style="width: 280px; float: left;"></td>
                <th class="bsxx-th">定额发票申请特批金额：</th>
                <td>
                    <input id="defpsqtpje" readonly="true" name="defpsqtpje" class="mini-moneybox" style="width: 280px; float: left;"></td>
            </tr>
            <tr>
                <th class="bsxx-th">申请期限起</th>
                <td>
                    <input id="zgqxq" name="zgqxq" class="mini-datepicker" format="yyyy-MM-dd" ondrawdate="fplg.onDrawDate" style="width: 280px; float: left;"></td>
                <th class="bsxx-th">申请期限止</th>
                <td>
                    <input id="zgqxz" readonly="true" name="zgqxz" class="mini-datepicker" format="yyyy-MM-dd" style="width: 280px; float: left;"></td>
            </tr>
            <tr>
                <th class="bsxx-th">申请日期</th>
                <td>
                    <input id="sqrq" name="sqrq" readonly="true" class="mini-datepicker" format="yyyy-MM-dd" style="width: 280px; float: left;"></td>
            </tr>
        </table>
    </div>
</section>
