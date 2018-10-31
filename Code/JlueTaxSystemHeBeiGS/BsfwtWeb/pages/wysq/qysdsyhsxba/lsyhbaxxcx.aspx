<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="lsyhbaxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.wysq.qysdsyhsxba.lsyhbaxxcx" %>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>历史优惠备案信息查询</title>
<script src="../../../scripts/boot.js" type="text/javascript"></script>
<script src="../../../scripts/pagejs/wysq/qysdsyhsxba/lsyhbaxxcx.js" type="text/javascript"></script>
<style>
    .cx-tabs{
        overflow: visible;
    }
</style>
</head>
<body>
<!--top start-->
<div class="toparea">
    <div class="width970">
        <div style="float: right;">
            <img src="../../../scripts/sui/themes/hbwt/images/login/top_hbswj.png"
                 width="261" height="65" alt="" />
        </div>
        <img src="../../../scripts/sui/themes/hbwt/images/login/logo.png"
             width="330" height="65" alt="" />
    </div>
</div>
<div class="banner_area2">
    <div class="width970 topinfo">

    </div>
</div>
<!--top end-->

<div class="inputbg clearfix" style="height: 102px;padding:0">
    <div class="place pngbg" style="width:940px;margin: 0 auto;">您现在的位置：我的办税大厅 > 纳税申报 > 历史优惠备案信息查询</div>
    <table style="margin: 15px auto 0px auto;">
        <tr>
            <th align="right" style="" nowrap="nowrap">
                所属年度:
            </th>
            <td align="left">
                <input id="band" class="mini-monthpicker"  format="yyyy"/>
            </td>
            <td>
                <a class="mini-button blue font14 mini-button-iconRight"
                   onclick="search()" id="stepnext"
                   style="margin: 0 5px; padding: 6px 20px;width: 63px;"
                   iconcls="ico-next pngbg">查 询</a>
            </td>
        </tr>
    </table>
</div>
<div style="display: block; width:1000px;height:100%;margin:15px auto;">
    <div class="mini-fit">
        <div id="yhsxbaGrid" class="mini-datagrid" style="width:988px;height: 300px;" allowResize="false"
             showPager="false"  showEmptyText="false" emptyText="<span style='color:red'>无记录！</span>" idField="id" multiSelect="true">
            <div property="columns">
                <div type="indexcolumn" headerAlign="center" width="47">序号</div>
                <!--<div type="checkcolumn" ></div>-->
                <div field="band" width="100" headerAlign="center" align="center">备案年度</div>
                <div field="yhsxmc" width="140" headerAlign="center" align="center">优惠事项名称</div>
                <div field="qysdsyhsxbab" width="140" headerAlign="center" align="center" renderer="yhsxBaRenderer">企业所得税优惠事项备案表</div>
                <div field="tjsj" width="100" headerAlign="center" align="center">提交时间</div>
                <div field="clsj" width="100" headerAlign="center" align="center">处理时间</div>
                <div field="bazt" width="100" headerAlign="center" align="center" renderer="baztRenderer">备案状态</div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
