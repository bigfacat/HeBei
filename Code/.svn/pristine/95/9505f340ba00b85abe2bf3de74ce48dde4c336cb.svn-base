<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Skxx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglDkZy.Skxx" %>

<!DOCTYPE html>

<h2>收款方信息</h2>
<section class="first-step">
    <p class="title">卖方：销售单位（收款方基本信息）</p>
    <p><strong class="text-red">*</strong> 表示必填</p>
    <table cellpadding="0" cellspacing="0" border="0" id="skxx-form">
        <tr>
            <td>纳税人识别号</td>
            <td class="item-control">
                <input class="mini-hidden" name="djxh" readonly="true">
                <input class="mini-textbox" name="nsrsbh" readonly="true" width="103%"></td>
        </tr>
        <tr>
            <td>纳税人名称</td>
            <td class="item-control">
                <input class="mini-textbox" readonly="true" name="nsrmc" width="103%"></td>
        </tr>
        <tr>
            <td>征收品目<strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-combobox" id="zspm" name="zspm" textfield="zspmMc" valuefield="zspmDm" onvaluechanged="dkzyfp.zspmChanged" width="103%" required="true" requirederrortext="征收品目不能为空"></td>
        </tr>
        <tr>
            <td>行业</td>
            <td class="item-control">
                <input class="mini-hidden" name="hyDm" id="hyDm">
                <input class="mini-textbox" name="hyMc" id="txHyDm" width="103%" readonly="true"></td>
        </tr>
        <tr>
            <td>经营范围</td>
            <td class="item-control">
                <input class="mini-textbox" name="jyfw" id="_jyfw" readonly="true" width="103%"></td>
        </tr>
        <tr>
            <td>地址 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="dz" id="skf-dz" maxlength="40" vtype="maxLength:40" required="true" requirederrortext="地址不能为空" width="103%"></td>
        </tr>
        <tr>
            <td>开户银行类别</td>
            <td class="item-control">
                <input class="mini-combobox" name="yhhbDm" id="khyhlb" emptytext="注：若您需要选择的银行不存在，请联系主管税务机关维护银行信息" width="103%" textfield="MC" valuefield="ID" readonly="true" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx"></td>
        </tr>
        <tr>
            <td>银行营业网点名称</td>
            <td class="item-control">
                <input class="mini-textbox" name="yhyywdMc" width="103%" readonly="true"></td>
        </tr>
        <tr>
            <td>银行账号</td>
            <td class="item-control">
                <input class="mini-textbox" name="yhzh" width="103%" readonly="true"></td>
        </tr>
        <tr>
            <td>经办人 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="jbr" id="zpdk-skfxx-jbrxm" width="103%" required="true" requirederrortext="经办人不能为空"></td>
        </tr>
        <tr>
            <td>收款人 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="skr" id="zpdk-skfxx-skrxm" width="103%" required="true" requirederrortext="收款人不能为空"></td>
        </tr>
        <tr>
            <td>复核人 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="fhr" id="zpdk-skfxx-fhrxm" width="103%" required="true" requirederrortext="复核人不能为空"></td>
        </tr>
        <tr>
            <td>经办人联系电话 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="jbrdh" id="zpdk-skfxx-jbrdh" width="103%" onvalidation="dkptfp.onlxdh" required="true" requirederrortext="经办人联系电话不能为空"></td>
        </tr>
        <tr>
            <td>备注</td>
            <td class="item-control">
                <input class="mini-textbox" name="bz" width="103%" maxlength="200" vtype="maxLength:200" emptytext="请输入备注，最大长度限制200个字符" requirederrortext="备注不能为空"></td>
        </tr>
    </table>
</section>
