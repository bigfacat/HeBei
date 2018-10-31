<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sbcx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.sb.sbzf.sbcx" %>

<!doctype html>
<html>
<head>
<title>申报作废</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script src="../../../scripts/boot.js" type="text/javascript"></script>
<script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
<script src="../../../scripts/pagejs/sb/sbzf/sbcx.js" type="text/javascript"></script>
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: #fbfcfc;
}
</style>
</head>
<body>
	<!--top start-->
	<div class="toparea">
		<div class="width970">
			<div style="float: right;">
				<img src="../../../scripts/sui/themes/hbwt/images/login/top_hbswj.png" width="261" height="65" alt="" />
			</div>
			<img src="../../../scripts/sui/themes/hbwt/images/login/logo.png" width="330" height="65" alt="" />
		</div>
	</div>
	<div class="banner_area2">
		<div class="width970 topinfo"> </div>
	</div>
	<!--top end-->
    <div class="inputbg clearfix" style="height: 60px;padding:6px 0 0 0">
        <!-- <table style="margin: 0 auto;width:1000px;">
            <tr><td align="left">
                <a href='javascript:sb()' id="xgmsb-btn" style="display:none;">
                	<div class="xgmsb-btn pngbg"></div>
                </a>
                </td>
            </tr>
        </table> -->
    </div>
	<div>
		<table style="margin: 0 auto">
			<tr>
				<th align="right" nowrap="nowrap">
					所属年月:
				</th>
				<td align="left">
					<input id="sbny" class="mini-monthpicker" format="yyyyMM" /> 
				</td>
				<th align="right" nowrap="nowrap">
					税种:
				</th>
				<td align="left">
					<input id="sz" name="sz" class="mini-combobox" valueField="id"  textField="text" showNullItem="true" nullItemText="- 全部 -"/>    
				</td>
				<td>
					<a class="mini-button blue font14 mini-button-iconRight" onclick="search()" id="stepnext"
						style="margin: 0 5px; padding: 6px 20px;width: 67px;" iconcls="ico-next pngbg">查 询</a>
				</td>
			</tr>
		</table>
	</div> 
	<div class="mini-fit" id="content">
		<div class="" style="display: block; width:1000px;margin:15px auto;">
			<div id="sbqkGrid" class="mini-datagrid" style="width: 100%; height: 271px;" 
				 idfield="nsrsbh" allowresize="false" showpager="false" sizelist="[30,30,30,30]"
				pagesize="20" showEmptyText="true"  emptyText='<font color="red">无记录</font>'>
				<div property="columns">
					<div field="sbny" width="20%" headeralign="center" allowsort="false" align="center">
						申报年月 </div>
					<div field="sz" width="20%" headeralign="center" allowsort="false" align="center" renderer="szRenderer" >
						税种 </div>
					<div field="sbztmc" width="20%" headeralign="center" allowsort="false" align="center"  >
						申报结果 </div>
					<div field="sbsj" width="20%" headeralign="center" allowsort="true" align="center">
						申报时间 </div>
					<div field="sblxmc" width="20%" headeralign="center" allowsort="true" align="center">
						申报类型 </div>
					<div field="cz" width="20%" headeralign="center" allowsort="false" align="center" renderer="czRenderer">
						操作 </div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>


