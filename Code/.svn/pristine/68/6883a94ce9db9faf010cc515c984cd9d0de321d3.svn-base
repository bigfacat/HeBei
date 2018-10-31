<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jkpzSpdy.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.jk.jkpzSpdy" %>


<!doctype html>
<html>
<head>
<title>河北省国家税务局网上办税服务厅</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script src="../../scripts/boot.js" type="text/javascript"></script>
<script type="text/javascript" src="../../scripts/pagejs/jk/jkpzSpdy.js"></script>
</head>
<body>
	<script type="text/template" id="tztemp">
 			  <li style="overflow: hidden;height: 6px"><span style="float: left;">{brief}</span><span>{publishDate}</span></li>
        </script>

	<!--top-->
	<div class="toparea">
		<div class="width970">
			<div style="float:right;">
				<img src="../../scripts/sui/themes/hbwt/images/login/top_hbswj.png"
					width="261" height="65" alt="" />
			</div>
			<img src="../../scripts/sui/themes/hbwt/images/login/logo.png"
				width="330" height="65" alt="" />
		</div>
	</div>

	<!--banner_area-->
	<div class="banner_area">
		<div class="width970">
			<div class="topbanner">缴款凭证打印</div>
		</div>
	</div>

<div style="margin:0 auto;width:1150px;overflow:hidden;">
<div class="place pngbg">您现在的位置：我的办税大厅 >缴款凭证打印</div>
<div class="userspace_ListNav01_rtwo">
		<div>
			<div class="mini-toolbar" style="border-bottom:0;padding:2px;">
				<table style="width:100%;">
					<tr>
						<td><span>缴款日期起：</span></td>
						<td><span><input id="jksjQ" name="jksjQ"
								class="mini-datepicker" allowInput="false"
								ondrawdate="onDrawDateJksjQ" emptyText="请选择日期" /></span></td>
						<td><span>缴款日期止：</span></td>
						<td><span><input id="jksjZ" name="jksjZ"
								class="mini-datepicker" allowInput="false"
								ondrawdate="onDrawDateJksjZ" emptyText="请选择日期" /></span></td>
						<td><span>打印情况：</span></td>
						<td><span> <input id="dyqk" shownullitem="false"
								style="width:120px;" class="mini-combobox"
								data="[{ 'id': '', 'text': '-全部-' },{ 'id': '0', 'text': '未打印' },{ 'id': '1', 'text': '已打印' }]"
								value="" textfield="text" valuefield="id" /></span></td>
						<td><a class="mini-button" id="button"
							onclick="spxxCxClick()" iconCls="icon-search">查询</a></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<!--content_area-->
		<div id="spxxGrid" class="mini-datagrid" style="width:100%;" url="/jk/wyjsAction_querySpxxDy.ashx" idField="id"
		sizeList="[10,20,50,100]" pageSize="20" autoLoad=false multiSelect="true"
		sortField="sdate" sortOrder="asc" showEmptyText="true" showpager="false"
		emptyText='<font color="red">无记录或查询出错</font>'>
		<div property="columns">
			<div type="checkcolumn"></div>
			<div field="yhzh" headerAlign="center" align="center">银行账号</div>
			<div field="sphm" headerAlign="center" align="center">系统税票号</div>
			<div field="sz" headerAlign="center" align=center>税(费)种</div>
			<div field="sm" headerAlign="center" align=center>税(费)目</div>
			<div field="sssqQ" headerAlign="center" align=center renderer="sssqRendererQ">所属时期起</div>
			<div field="sssqZ" headerAlign="center" align=center renderer="sssqRendererZ">所属时期止</div>
			<div field="sjje" headerAlign="center" align=center>实缴金额</div>
			<div field="jkrq" headerAlign="center" align=center
				dateFormat="yyyy-MM-dd">缴款日期</div>
			<div field="dycs" headerAlign="center" align=center renderer = "dycsRenderer">
				打印次数
			</div>
		</div>
	</div>
	<div style="padding-top: 20px;"><a class="mini-button" onclick="dyyl()">打印预览</a>
	<a class="mini-button" href="jkpzDyls.aspx" target="_blank">打印记录</a></div>
	</div>

		<!--foot_area-->
		<hr />
		<iframe src="/BsfwtWeb/pages/foot.aspx" width="100%" frameborder="0"
			id="footpage"></iframe>
</body>
<script src="../../scripts/pagejs/other/txsublist.js"></script>
</html>

