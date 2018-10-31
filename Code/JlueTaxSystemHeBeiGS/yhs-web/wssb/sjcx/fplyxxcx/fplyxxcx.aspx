<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fplyxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.yhs_web.wssb.sjcx.fplyxxcx.fplyxxcx" %>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>发票领用信息查询</title>
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="../../css/ie.css"/>
    <![endif]-->


    <link rel="stylesheet" type="text/css" href="../../css/ws_default.css" />
    <link rel="stylesheet" type="text/css" href="../../css/header.css" /> 
    <link rel="stylesheet" href="fplyxxcx.css" />

</head>
<body>



<div class="container">
    <div class="main-title"> 发票领用信息查询 </div>
    <div class="main">
        <table id="xxcxForm" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto">
            <tbody><tr>
              <th nowrap="nowrap" align="right" width="5%">领购日期：</th>
              <td align="left" width="10%"><input id="cxsjq" name="cxsjq" required="true" class="mini-datepicker" onvaluechanged="onvaluechanged1" format="yyyy-MM-dd" style="width:100%;" /></td>
              <th nowrap="nowrap" align="center" width="5%">至：</th>
              <td align="left" width="10%"><input id="cxsjz" name="cxsjz" required="true" class="mini-datepicker" onvaluechanged="onvaluechanged2" format="yyyy-MM-dd" style="width:100%;" /></td>
                <th nowrap="nowrap" width="70%"></th>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <th height="60" align="left" style="padding-right: 10px" nowrap="nowrap"><a class="btn-blue mini-button mini-button-span" onclick="search()" id="stepnext" iconcls="ico-next pngbg">查询</a></th>
          </tr>
          </tbody>
        </table>


        <div class="cx-line"></div>
        <!--列表开始-->
        <div id="xxGrid" class="mini-datagrid" style="width:100%; min-height: 300px; height: auto !important;" height="400px"
             showPager="true" dependMerge="true" allowCellEdit="true"
             allowCellSelect="true" multiSelect="true" editNextOnEnterKey="true"
             editNextRowCell="true" showEmptyText="false" emptyText="没有对应查询数据" onbeforeload="onbeforeload">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30"> 序号 </div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="left" width="260">发票种类名称 </div>
                <!--<div field="fpmc" headeralign="center" allowsort="false" align="center" width="260"> 发票名称</div>-->
                <div field="fpDm" headeralign="center" allowsort="false" align="center" width="160">发票代码</div>
                <div field="fpqshm" headeralign="center" allowsort="false" align="center" width="180">发票起号</div>
                <div field="fpzzhm" headeralign="center" allowsort="false" align="center" width="180"> 发票止号 </div>
                <div field="slrq" headeralign="center" allowsort="false" align="center" width="130">发票购买日期</div>
                <div field="fpsl" headeralign="center" allowsort="false" align="center" width="130">发票本（份）数</div>
            </div>
        </div>
    </div>
</div>
</div>
<script src="../../jquery1.5/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="../../javascript/common.js" type="text/javascript"></script>
<script src="../../javascript/miniui.js" type="text/javascript"></script>
<script src="../../javascript/scripts/sui/store.js" type="text/javascript"></script>
<script src="../../javascript/includeHeader.js" type="text/javascript"></script>
<script src="fplyxxcx.js" type="text/javascript"></script>
</body>
</html>
