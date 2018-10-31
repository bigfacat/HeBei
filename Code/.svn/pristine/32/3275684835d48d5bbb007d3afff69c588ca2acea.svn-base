<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YlView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.tydj.YlView" %>

<!DOCTYPE html>


<h2>预览提交</h2>
<section class="first-step second-step">
    <h5 class="title tydj-title">停业登记报告表</h5>
    <table id="tydjYlForm" cellpadding="0" cellspacing="0" border="0" data-view-type="form">
        <tr>
            <td class="search-item">纳税人识别号：</td>
            <td class="search-item-control">
                <input class="mini-textbox" name="nsrsbh" width="100%" readonly="true"></td>
            <td class="search-item">纳税人名称：</td>
            <td class="search-item-control">
                <input class="mini-textbox" name="nsrmc" width="100%" readonly="true"></td>
        </tr>
        <tr>
            <td class="search-item">停业期限起：</td>
            <td>
                <input class="mini-datepicker" format="yyyy-MM-dd" id="tyDateStart_view" name="tyDateStart" width="100%" readonly="true"></td>
            <td class="search-item">停业期限止：</td>
            <td class="search-item-control">
                <input class="mini-datepicker" format="yyyy-MM-dd" id="tyDateEnd_view" name="tyDateEnd" width="100%" readonly="true"></td>
        </tr>
        <tr>
            <td class="search-item" width="7%">报告日期：</td>
            <td class="search-item-control">
                <input class="mini-datepicker" format="yyyy-MM-dd" id="tybgrq_view" name="tybgrq" width="100%" readonly="true"></td>
        </tr>
    </table>
    <div style="display: none;">
        <h5>缴存发票情况</h5>
        <div data-view-type="datagrid">
            <div id="jcfpYl-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcelledit="false">
                <div property="columns">
                    <div type="indexcolumn" width="50">序号</div>
                    <div field="fpzlmc">发票种类</div>
                    <div field="fpDm">发票代码</div>
                    <div field="fpqshm">发票起始号码</div>
                    <div field="fpzzhm">发票终止号码</div>
                    <div field="fs">数量</div>
                </div>
            </div>
        </div>
        <h5>缴存税务资料情况</h5>
        <div data-view-type="datagrid">
            <div id="jcswzlYl-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" checkselectiononly="true">
                <div property="columns">
                    <div type="indexcolumn" width="50">序号</div>
                    <div field="swdjzjzl" displayfield="swdjzjzlText">税务登记证件种类</div>
                    <div field="swdjzjhm">税务登记证件号码</div>
                </div>
            </div>
        </div>
        <h5>缴存其他税务资料情况</h5>
        <div data-view-type="datagrid">
            <div id="jcqtswzlYl-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" checkselectiononly="true">
                <div property="columns">
                    <div type="indexcolumn" width="50">序号</div>
                    <div field="jcqtswzlmc">其他税务资料名称</div>
                    <div field="jcqtswzlsl">数量</div>
                </div>
            </div>
        </div>
    </div>
</section>
