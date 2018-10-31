<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="txyjxx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpyj.txyjxx" %>

<!DOCTYPE html>



<h2>填写验旧信息</h2>
<section>
    <table class="fpyjTable" id="fpyjTable">
        <tr class="wxts">
            <td align="right">发票种类：</td>
            <td class="fpzlMcText"></td>
            <td align="right">发票代码：</td>
            <td class="fpDmText"></td>
        </tr>
        <tr height="30"></tr>
        <tr>
            <td align="right"><i class="txt-red">*</i>开具情况：</td>
            <td width="480">
                <input width="300" class="mini-combobox" required="required" requirederrortext="开具情况不能为空" url="../../../api/baseCode/get/baseCode2CombSelect2/DM_FP_FPKJQK.ashx" id="fpkjqkDm" name="fpkjqkDm" textfield="MC" valuefield="ID">
                <span id="jpsl" style="display: none"><a class="a-tips" onclick="showJpsl()">示例</a></span></td>
            <td align="right"><i class="txt-red">*</i>开具月份：</td>
            <td>
                <input width="300" class="mini-monthpicker" id="kjyf" name="kjyf" type="text" required="required" format="yyyy-MM" enabled="true" requirederrortext="开具月份不能为空" errormode="border" data-options="{title:'请选择开票月份，<i class=txt-red>切勿跨月验旧</i>',placement:'top',type:'warn'}"></td>
        </tr>
        <tr>
            <td align="right"><i class="txt-red">*</i>验旧份数：</td>
            <td>
                <input width="300" class="mini-textbox" emptytext="" id="fsXg" name="fsXg" enabled="true" vtype="int" required="required" requirederrortext="验旧份数不能为空"></td>
            <td align="right"><i class="txt-red">*</i>起始号码：</td>
            <td>
                <input width="300" class="mini-textbox" id="fpqshmXg" name="fpqshmXg" enabled="false"></td>
        </tr>
        <tr>
            <td align="right"><i class="txt-red">*</i>终止号码：</td>
            <td>
                <input width="300" class="mini-textbox" id="fpzzhmXg" name="fpzzhmXg" enabled="true" vtype="int_10" required="required" requirederrortext="终止号码不能为空" data-options="{title:'请确认所有发票为当月开具的发票，<i class=txt-red>暂不支持跨月验旧</i>',placement:'bottom',type:'warn'}"></td>
            <td align="right"><i class="txt-red">*</i>开具金额：</td>
            <td>
                <input width="300" class="mini-moneybox" emptytext="请输入票面金额" id="kpje" name="kpje" enabled="false" requirederrortext="开具金额不能为空"></td>
        </tr>
    </table>
</section>
