<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsssjmbaView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.zzsssjmba.zzsssjmbaView" %>

<!DOCTYPE html>


<h2>增值税税收减免备案</h2>
<section>
    <div id="step_tx_form">
        <h4>纳税人基本信息</h4>
        <table class="form-table table_bg">
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
        <h4>减免税备案登记表</h4>
        <div id="cytj-contain">
            <div><span class="fl">税收优惠事项：</span><div class="check-icon fl"></div>
            </div>
        </div>
        <span class="more-icon">更多</span>
        <input id="ssyhsx" name="ssyhsx" allowinput="true" class="mini-combobox" textfield="MC" valuefield="ID" required="required" requirederrortext="税收优惠事项不能为空" width="85%" onvaluechanged="jms.ssyhsxChecked"><div id="ht_info" class="ht_info" style="display: none"><span class="marginRight30" style="display: inline-block; width: 98px;">合同名称：</span>
            <input property="editor" name="htmc" id="htmc" class="mini-textbox" width="30%" style="margin-right: 250px" requirederrortext="合同名称不能为空">
            <span class="marginRight30" style="display: inline-block; width: 98px;">合同编号：</span>
            <input property="editor" name="htbh" id="htbh" class="mini-textbox" width="30%" requirederrortext="合同编号不能为空"></div>
        <span class="marginRight30">减免有效期起：</span>
        <input property="editor" name="jmqxq" id="jmqxq" class="mini-monthpicker" width="30%" style="margin-right: 250px" onvaluechanged="jms.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期起不能为空">
        <span class="marginRight30">减免有效期止：</span>
        <input property="editor" name="jmqxz" id="jmqxz" class="mini-monthpicker" width="30%" onvaluechanged="jms.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期止不能为空"><div class="grid-toolbar" data-bind-grid="jms_grid"></div>
        <div id="jms_grid" class="mini-datagrid" style="width: 1160px; height: 80px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" oncellendedit="cellendedit" oncellbeginedit="cellbeginedit">
            <div property="columns">
                <div field="swsxmc" vtype="required" align="center" headeralign="center">税收优惠事项<input name="swsxmc" class="mini-textbox" required="true" requirederrortext="税收优惠事项不能为空" enabled="false" style="display: none;"></div>
                <div field="ssjmxzmc" vtype="required" align="center" headeralign="center">减免性质名称<input property="editor" id="ssjmxzmc" name="ssjmxzmc" allowinput="true" class="mini-combobox" textfield="MC" valuefield="ID" required="required" requirederrortext="减免政策名称不能为空" onvaluechanged="jms.getDlXl"></div>
                <div field="ssjmxzdlmc" vtype="required">减免性质大类<input name="ssjmxzdlmc" class="mini-textbox" required="true" requirederrortext="减免性质大类不能为空" style="display: none;"></div>
                <div field="ssjmxzxlmc" vtype="required">减免性质小类<input name="ssjmxzxlmc" class="mini-textbox" required="true" requirederrortext="减免性质小类不能为空" style="display: none;"></div>
                <div field="jmzlxmc" vtype="required">减免征类型<input name="jmzlxmc" class="mini-textbox" required="true" requirederrortext="减免征类型不能为空" style="display: none;"></div>
                <div field="jmlxmc" vtype="required">减免类型<input property="editor" id="jmlxmc" name="jmlxmc" class="mini-combobox" allowinput="true" valuefromselect="true" shownullitem="false" textfield="MC" valuefield="ID" autoload="false" required="true" requirederrortext="减免类型不能为空" url="../../../api/baseCode/get/baseCode2CombSelect/DM_YH_JMLX.ashx"></div>
                <div field="jzed" vtype="double12" datatype="float">减征额度<input property="editor" id="jmed" class="mini-moneybox"></div>
                <div field="jzfd" vtype="double12" datatype="float">减征幅度<input property="editor" id="jmfd" class="mini-moneybox"></div>
                <div field="jzsl">减征税率<input property="editor" id="jmsl" class="mini-spinner" vtype="float;" numberformat="n2" decimalplaces="2" increment="0.01" maxvalue="1.00"></div>
            </div>
        </div>
    </div>
</section>
