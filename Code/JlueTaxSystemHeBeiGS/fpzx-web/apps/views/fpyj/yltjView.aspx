<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="yltjView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpyj.yltjView" %>

<!DOCTYPE html>



<h2>填写验旧信息</h2>
<section>
    <div class="txt-red mb20">注：请仔细核对您填写的发票验旧信息，确认完全正确再提交验旧</div>
    <table class="fpyjTable" id="fpyjTable-yl" data-view-type="form">
        <tr>
            <td align="right">发票种类：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fpzlMcText" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">发票代码：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fpDmText" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">开具情况：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fpkjqkDmText" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">开具月份：</td>
            <td>
                <input width="80%" class="mini-textbox" name="kjyf" format="yyyy-MM" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">验旧份数：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fsXg" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">起始号码：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fpqshmXg" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">终止号码：</td>
            <td>
                <input width="80%" class="mini-textbox" name="fpzzhmXg" enabled="false"></td>
        </tr>
        <tr>
            <td align="right">开具金额：</td>
            <td>
                <input width="80%" class="mini-moneybox" name="kpje" enabled="false"></td>
        </tr>
    </table>
</section>
