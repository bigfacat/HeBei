<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pzhdxx.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.views.fpgl.pzhdxx.pzhdxx" %>

<!DOCTYPE html>


<div class="grid-container pzhdxx">
    <div class="search-title">票种核定信息查询</div>
    <div class="search-result">
        <div id="pzhdxxGrid" class="mini-datagrid" pagesize="20" showpager="true">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30">序号</div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="center" width="130">发票种类名称</div>
                <div field="dffpzgkpxe" headeralign="center" allowsort="false" align="center" width="130">单份发票最高开票限额</div>
                <div field="myzggpsl" headeralign="center" allowsort="false" align="center" width="130">每月最高购票数量</div>
                <div field="mczggpsl" headeralign="center" allowsort="false" align="center" width="130">每次最高购票数量</div>
                <div field="cpzgsl" headeralign="center" allowsort="false" align="center" width="110">持票最高数量</div>
                <div field="yxqQ" headeralign="center" allowsort="false" align="center" width="100">有效期起</div>
                <div field="yxqZ" headeralign="center" allowsort="false" align="center" width="100">有效期止</div>
            </div>
        </div>
    </div>
</div>
