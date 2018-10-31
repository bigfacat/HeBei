<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpjcxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.yhs_web.wssb.sjcx.fpjcxxcx.fpjcxxcx" %>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>发票结存信息查询</title>
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="/BsfwtWeb/apps/css/ie.css"/>
    <![endif]-->


    <link rel="stylesheet" type="text/css" href="../../css/ws_default.css" />
    <link rel="stylesheet" type="text/css" href="../../css/header.css" /> 
    <link rel="stylesheet" href="./fpjcxxcx.css" />

</head>
<body>

<!--引入头部-->
<!-- <script type="text/javascript" src="/BsfwtWeb/apps/js/common_include.js"></script>

<div class="sbcx_help">
    <ul class="sbcx_menu">
		<li class="menu_blue">在线帮助</li>
	</ul>
</div> -->

<div class="container">
    <div class="main-title"> 发票结存信息查询 </div>
    <div class="main">
       <!--  <table id="xxcxForm" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;width:40%;">
            <tbody>
          <tr>
          	  <td align="left" nowrap="nowrap">校验码:</td>
              <td align="left">
                <div id="yzmInput" style=" display:'';">
  								<div style="float:left" class="cad">
  									<input id="txyzm" class="mini-buttonedit icon4" required="true" emptytext="图形验证码" selectonfocus="true" style="width:130px;margin-top:0px; margin-bottom:5PX;" />
  								</div>
  								<div class="yzmimg cad" style="float:left;margin:5px">
  									<span>
  										<img id="jymImg" src="" onclick="show('jymImg');" title="如看不清,请点击进行更新" width="69" height="25">
  									</span>
  								</div>
  					   </div>
              </td>
              <td height="60" align="right" style="padding-right: 10px" nowrap="nowrap"><a class="btn-blue mini-button mini-button-span" onclick="search()" id="stepnext" iconcls="ico-next pngbg">查询</a></td>
          </tr>
          </tbody>
        </table> -->

        <div class="cx-line"></div>
        <!--列表开始-->
        <div id="xxGrid" class="mini-datagrid" style="width:100%; min-height: 300px; height: auto !important;" height="400px"
             showPager="true" dependMerge="true" allowCellEdit="true"
             allowCellSelect="true" multiSelect="true" editNextOnEnterKey="true"
             editNextRowCell="true" showEmptyText="false" emptyText="没有对应查询数据" onbeforeload="onbeforeload">
            <div property="columns">
                <div type="indexcolumn" headeralign="center" allowsort="false" align="center" width="30"> 序号 </div>
                <div field="fpzlmc" headeralign="center" allowsort="false" align="left" width="260">发票种类名称 </div>
              <!--   <div field="fpmc" headeralign="center" allowsort="false" align="center" width="260"> 发票名称</div> -->
                <div field="fpDm" headeralign="center" allowsort="false" align="center" width="160">发票代码</div>
                <div field="fpqshm" headeralign="center" allowsort="false" align="center" width="180">发票起号</div>
                <div field="fpzzhm" headeralign="center" allowsort="false" align="center" width="180"> 发票止号 </div>
                <div field="fpztmc" headeralign="center" allowsort="false" align="center" width="130">发票库存状态</div>
                <div field="fs" headeralign="center" allowsort="false" align="center" width="130">发票本(份)数</div>
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
<script src="fpjcxxcx.js" type="text/javascript"></script>
</body>
</html>