<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpyjxx.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.views.fpgl.fpyjxx.fpyjxx" %>

<!DOCTYPE html>


<div class="grid-container fpyjxx">
    <div class="search-title">发票验旧信息查询</div>
    <table id="fpyjxxForm" class="search-table">
        <tbody>
            <tr>
                <th nowrap="nowrap" align="right">验旧日期起：</th>
                <td align="left">
                    <input id="fpyjxxQ" name="fpyjxxQ" required="true" requirederrortext="请填写验旧日期起！" class="mini-datepicker width-200" format="yyyy-MM-dd" style="width: 100%;"></td>
                <th nowrap="nowrap" align="right">验旧日期止：</th>
                <td align="left">
                    <input id="fpyjxxZ" name="fpyjxxZ" required="true" requirederrortext="请填写验旧日期止！" class="mini-datepicker width-200" format="yyyy-MM-dd" style="width: 100%;"></td>
                <th nowrap="nowrap"></th>
                <td colspan="2" align="left" style="padding-left: 10px" width="30%"><a class="btn-blue mini-button" onclick="fpyjxx.search()">查询</a> <a class="btn-blue mini-button" onclick="fpyjxx.reset();">重置</a></td>
            </tr>
        </tbody>
    </table>
    <div class="search-result">
        <div id="fpyjxxGrid" class="mini-datagrid" pagesize="20" showpager="true">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30">序号</div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="left" width="260">发票种类名称</div>
                <div field="fpmc" headeralign="center" allowsort="false" align="center" width="260">发票名称</div>
                <div field="fpDm" headeralign="center" allowsort="false" align="center" width="160">发票代码</div>
                <div field="fs" headeralign="center" allowsort="false" align="center" width="130">发票份数</div>
                <div field="fpqshm" headeralign="center" allowsort="false" align="center" width="150">发票起号</div>
                <div field="fpzzhm" headeralign="center" allowsort="false" align="center" width="150">发票止号</div>
                <div field="yjrq" headeralign="center" allowsort="false" align="center" width="100" datatype="date" dateformat="yyyy-MM-dd">发票验旧日期</div>
                <div field="fpyjjgmc" headeralign="center" allowsort="false" align="center" width="90">验旧结果</div>
            </div>
        </div>
    </div>
</div>
