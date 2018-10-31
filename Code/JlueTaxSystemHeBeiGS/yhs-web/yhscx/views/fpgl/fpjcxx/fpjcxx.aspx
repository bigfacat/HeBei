<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpjcxx.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.views.fpgl.fpjcxx.fpjcxx" %>

<!DOCTYPE html>


<div class="grid-container fpjcxx">
    <div class="search-title">发票结存信息查询</div>
    <div class="search-result">
        <div id="fpjcxxGrid" class="mini-datagrid" pagesize="20" showpager="true">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30">序号</div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="center" width="260">发票种类名称</div>
                <div field="fpDm" headeralign="center" allowsort="false" align="center" width="160">发票代码</div>
                <div field="fpqshm" headeralign="center" allowsort="false" align="center" width="180">发票起号</div>
                <div field="fpzzhm" headeralign="center" allowsort="false" align="center" width="180">发票止号</div>
                <div field="fpztmc" headeralign="center" allowsort="false" align="center" width="130">发票库存状态</div>
                <div field="fs" headeralign="center" allowsort="false" align="center" width="130">发票本(份)数</div>
            </div>
        </div>
    </div>
</div>
