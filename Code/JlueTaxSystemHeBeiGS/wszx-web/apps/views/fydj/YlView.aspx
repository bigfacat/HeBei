<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YlView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.fydj.YlView" %>

<!DOCTYPE html>


<h2>预览提交</h2>
<section class="first-step second-step">
    <h5 class="title fydj-title">复业（提前复业）报告书</h5>
    <table id="fydj_jbxx" data-view-type="form" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="search-item">纳税人识别号：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="ylnsrsbh" name="ylnsrsbh" readonly="readonly"></td>
            <td class="search-item">纳税人名称：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="ylnsrmc" name="ylnsrmc" readonly="readonly"></td>
        </tr>
        <tr>
            <td class="search-item" width="7%">报告日期：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="ylbgrq" name="ylbgrq" readonly="readonly"></td>
            <td class="search-item">复业日期：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="ylfydjrq" name="ylfydjrq" readonly="readonly"></td>
        </tr>
        <tr>
            <td class="search-item">停业期限起：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="yltyqxq" name="yltyqxq" readonly="readonly"></td>
            <td class="search-item">停业期限止：</td>
            <td class="search-item-control">
                <input class="mini-textbox" id="yltyqxz" name="yltyqxz" readonly="readonly"></td>
        </tr>
    </table>
    <h5 class="title">领回税务资料情况</h5>
    <div data-view-type="datagrid">
        <div id="yllhswzlqk" class="mini-datagrid" style="width: 100%; height: 100px;" allowresize="false" showpager="false" showemptytext="true">
            <div property="columns">
                <div field="swzjzlMc" headeralign="center">税务证件种类</div>
                <div field="swzjhm" headeralign="center">税务证件号码</div>
            </div>
        </div>
    </div>
    <h5 class="title">领回其他税务资料情况</h5>
    <div data-view-type="datagrid">
        <div id="ylqtzl" class="mini-datagrid" style="width: 100%; height: 100px;" allowresize="false" showpager="false" showemptytext="true">
            <div property="columns">
                <div field="jcqtswzlmc" headeralign="center">其他税务资料名称</div>
                <div field="jcqtswzlsl" headeralign="center">数量</div>
            </div>
        </div>
    </div>
    <h5 class="title">领回发票情况</h5>
    <div data-view-type="datagrid">
        <div id="yllhfp" class="mini-datagrid" style="width: 100%; height: 100px;" allowresize="false" showpager="false" showemptytext="true">
            <div property="columns">
                <div field="jhfpzlDm" headeralign="center">发票种类</div>
                <div field="fpDm" headeralign="center">发票代码</div>
                <div field="fpqshm" headeralign="center">发票起始号码</div>
                <div field="fpzzhm" headeralign="center">发票终止号码</div>
                <div field="fpsl" headeralign="center">数量</div>
            </div>
        </div>
    </div>
</section>
