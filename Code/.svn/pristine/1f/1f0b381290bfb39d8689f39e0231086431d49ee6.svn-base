<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fplyxx.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.views.fpgl.fplyxx.fplyxx" %>

<!DOCTYPE html>


<div class="grid-container fplyxx">
    <div class="search-title">发票领用信息查询</div>
    <table id="fplyxxcxForm" class="search-table">
        <tbody>
            <tr>
                <th nowrap="nowrap">领用日期起：</th>
                <td align="left">
                    <input id="fplycxsjq" name="fplycxsjq" required="true" class="mini-datepicker width-200" requirederrortext="请填写查询日期起！" format="yyyy-MM-dd" style="width: 80%;"></td>
                <th nowrap="nowrap">领用日期止：</th>
                <td align="left">
                    <input id="fplycxsjz" name="fplycxsjz" required="true" class="mini-datepicker width-200" requirederrortext="请填写查询日期止！" format="yyyy-MM-dd" style="width: 80%;"></td>
                <th colspan="2" align="right" style="padding-right: 10px" width="30%"><a class="btn-blue mini-button" onclick="fplyxx.search()">查询</a> <a class="btn-blue mini-button" onclick="fplyxx.reset();">重置</a></th>
            </tr>
        </tbody>
    </table>
    <div class="search-result">
        <div id="fplyxxGrid" class="mini-datagrid" pagesize="20" showpager="true">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="50">序号</div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="left" width="110">发票种类名称</div>
                <div field="fpmc" headeralign="center" allowsort="false" align="center" width="100">发票名称</div>
                <div field="fpDm" headeralign="center" allowsort="false" align="center" width="100">发票代码</div>
                <div field="fpsl" headeralign="center" allowsort="false" align="center" width="100">发票本数</div>
                <div field="fpqshm" headeralign="center" allowsort="false" align="center" width="100">发票起号</div>
                <div field="fpzzhm" headeralign="center" allowsort="false" align="center" width="100">发票止号</div>
                <div field="slrq" headeralign="center" allowsort="false" align="center" width="130" datatype="date" dateformat="yyyy-MM-dd">发票购买日期</div>
            </div>
        </div>
    </div>
</div>
