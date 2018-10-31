<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="szdjxx.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.views.swdj.szdjxx.szdjxx" %>

<!DOCTYPE html>


<div class="grid-container szdjxx">
    <div class="search-title">税种登记信息查询</div>
    <div class="search-result">
        <table>
            <th nowrap="nowrap" style="width: 10%">征收项目：</th>
            <td align="left" style="width: 35%">
                <input id="zsxm" name="zsxm" class="mini-combobox" valuefromselect="true" allowinput="true" textfield="1" valuefield="0" style="width: 90%;"></td>
            <th height="60" colspan="2" style="padding-right: 10px; text-align: left; width: 55%;" nowrap="nowrap" width="30%"><a class="btn-blue mini-button mini-button-span" onclick="szdjxx.search();">查询</a></th>
        </table>
        <div class="mini-datagrid" id="szdjxxGrid" pagesize="20" showpager="true">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" align="center" allowsort="false" width="50">序号</div>
                <div field="zsxmMc" headeralign="center" align="center" width="150">征收项目</div>
                <div field="zspmMc" headeralign="center" align="center" width="200">征收品目</div>
                <div field="zsxmyxqQ" headeralign="center" align="center" width="100" datatype="date" dateformat="yyyy-MM-dd">认定有效期起</div>
                <div field="rdyxqz" headeralign="center" align="center" width="100" datatype="date" dateformat="yyyy-MM-dd">认定有效期止</div>
                <div field="sbqy" headeralign="center" align="center" width="100">纳税期限</div>
            </div>
        </div>
    </div>
</div>
