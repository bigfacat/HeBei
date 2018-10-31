<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pzhdxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.yhs_web.wssb.sjcx.pzhdxxcx.pzhdxxcx" %>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>票种核定信息查询</title>
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="/BsfwtWeb/apps/css/ie.css"/>
    <![endif]-->

    <link rel="stylesheet" type="text/css" href="../../css/ws_default.css" /> 
    <link rel="stylesheet" type="text/css" href="../../css/header.css" /> 
    <link rel="stylesheet" href="./pzhdxxcx.css" />

</head>
<body>
<!--引入头部-->
<!--
    @require 'apps/css/miniui.scss'
    @require 'apps/css/reset.scss'
    @require 'apps/views/header/header.scss'
    @require 'apps/views/header/header.js'
-->



<div class="container">
    <div class="main-title"> 票种核定信息查询 </div>
    <div class="main">
<!--         <table id="pzhdxxcxForm" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto">
            <tbody><tr>
                <th width="10%" nowrap="nowrap">纳税人识别号：</th>
                <td width="35%" align="left"><input id="nsrsbh" name="nsrsbh" class="mini-textbox"
                                        style="width:100%;" vtype="nsrsbh" required="true"/></td>
                <th  width="10%" height="60" colspan="2" align="center" style="padding-left: 10px;" nowrap="nowrap"><a class="btn-blue mini-button mini-button-span" onclick="search();"  iconcls="ico-next pngbg">查询</a></th>
                <th width="45%" height="60" colspan="2" align="left"  style="padding-left: 10px;" nowrap="nowrap"><a class="btn-blue mini-button mini-button-span" onclick="reset();" iconcls="ico-next pngbg">重置</a></th>
                <th nowrap="nowrap" style="display:none;">纳税人名称：</th>
                <td align="left" style="display:none;"><input id="nsrmc" name="nsrmc" class="mini-textbox"
                                                              style="width:100%;" required="false"/></td>
            </tbody>
        </table> -->


        <div class="cx-line"></div>
        <!--列表开始-->
        <div id="pzhdxxGrid" class="mini-datagrid" style="width:100%; min-height: 300px; height: auto !important;" height="400px"
             showPager="true" dependMerge="true" allowCellEdit="true"
             allowCellSelect="true" multiSelect="true" editNextOnEnterKey="true"
             editNextRowCell="true" showEmptyText="false" emptyText="没有对应查询数据" onbeforeload="onbeforeload">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30"> 序号 </div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="center" width="130">发票种类名称</div>
                <div field="dffpzgkpxe" headeralign="center" allowsort="false" align="center" width="130">单份发票最高开票限额</div>
                <div field="myzggpsl" headeralign="center" allowsort="false" align="center" width="130"> 每月最高购票数量 </div>
                <div field="mczggpsl" headeralign="center" allowsort="false" align="center" width="130">每次最高购票数量</div>
                <div field="cpzgsl" headeralign="center" allowsort="false" align="center" width="130" >持票最高数量</div>
                <div field="yxqQ" headeralign="center" allowsort="false" align="center" width="130" >有效期起</div>
                <div field="yxqZ" headeralign="center" allowsort="false" align="center" width="130" >有效期止</div>
            </div>
        </div>
        <!--列表结束-->
        <!--
        <div class="pages">
          <table border="0" align="center" cellpadding="0" cellspacing="0" style="margin:auto;">
            <tr>
              <td><A href="#"><</A> <STRONG>1</STRONG> <A href="#">2</A> <A href="#">3</A> <A href="#">4</A> <A href="#">5</A> <A href="#">6</A> <A href="#">7</A> <A href="#">...12</A> <A href="#">></A></td>
            </tr>
          </table>
        </div>
        -->
    </div>
</div>
</div>
<script src="../../jquery1.5/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="../../javascript/common.js" type="text/javascript"></script>
<script src="../../javascript/miniui.js" type="text/javascript"></script>
<script src="../../javascript/scripts/sui/store.js" type="text/javascript"></script>
<script src="../../javascript/includeHeader.js" type="text/javascript"></script>
<!--<script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>-->
<script src="pzhdxxCx.js" type="text/javascript"></script>
</body>
</html>
