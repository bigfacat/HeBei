<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jkpzDyls.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.jk.jkpzDyls" %>



<!doctype html>
<html>
<head>
<title>河北省国家税务局网上办税服务厅</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script src="../../scripts/boot.js" type="text/javascript"></script>
<script type="text/javascript" src="../../scripts/pagejs/jk/jkpzDyls.js"></script>
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
		<div class="place pngbg">您现在的位置：我的办税大厅 >缴款凭证打印记录</div>
		<div class="userspace_ListNav01_rtwo">
			<div>
				<div class="mini-toolbar" style="border-bottom:0;padding:2px;">
					<table>
						<tr>
							<td><span>所属时期起：</span></td>
							<td><span><input id="sssqQ" name="sssqQ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateSssqQ" emptyText="请选择日期" /></span></td>
							<td><span>所属时期止：</span></td>
							<td><span><input id="sssqZ" name="sssqZ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateSssqZ" emptyText="请选择日期" /></span></td>
							<td><span>缴款时间起：</span></td>
							<td><span><input id="jksjQ" name="jksjQ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateJksjQ" emptyText="请选择日期" /></span></td>
							<td><span>缴款时间止：</span></td>
							<td><span><input id="jksjZ" name="jksjZ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateJksjZ" emptyText="请选择日期" /></span></td>
							<td><span></span></td>
							<td><span></span></td>
						</tr>
						<tr>
							<td><span>打印时间起：</span></td>
							<td><span><input id="dysjQ" name="dysjQ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateDysjQ" emptyText="请选择日期" /></span></td>
							<td><span>打印时间止：</span></td>
							<td><span><input id="dysjZ" name="dysjZ"
									class="mini-datepicker" allowInput="false"
									ondrawdate="onDrawDateDysjZ" emptyText="请选择日期" /></span></td>
							<td><span>缴款凭证序号</span></td>
							<td><span><input id="jkpzxh" class="mini-textbox"/></span></td>
							<td><span>税票号码</span></td>
							<td><span><input id="sphm" class="mini-textbox"/></span></td>
							<td align = center><a class="mini-button" id="button"
							onclick="pzCxClick()" iconCls="icon-search">查询</a></td>

						</tr>
					</table>
				</div>
			</div>
		</div>
		<!--content_area-->

		<div id="pzYdyGrid" class="mini-datagrid" style="width:100%;"
			url="/jk/wyjsAction_queryWTJkpz.ashx" idField="id"
			sizeList="[10,20,50,100]" pageSize="20" autoLoad=false
			sortField="sdate" sortOrder="asc" showEmptyText="true"
			showpager="false" emptyText='<font color="red">无记录或查询出错</font>'>
			<div property="columns">
				<div type="indexcolumn"></div>
				<div field="sphm" headerAlign="center" align="center">系统税票号</div>
				<div field="sz" headerAlign="center" align=center>税费种</div>
				<div field="sm" headerAlign="center" align=center>税(费)目</div>
				<div field="sssqQ" headerAlign="center" align=center
					renderer="sssqRendererQ">所属时期起</div>
				<div field="sssqZ" headerAlign="center" align=center
					renderer="sssqRendererZ">所属时期止</div>
				<div field="sjje" headerAlign="center" align=center>实缴金额</div>
				<div field="jkrq" headerAlign="center" align=center
					dateFormat="yyyy-MM-dd">缴款日期</div>
				<div field="djcdy" headerAlign="center" align=center
					renderer="dycsRenderer">打印次数</div>
				<div field="jkpzxh" headerAlign="center" align=center
					renderer="jkpzxhRenderer">电子缴款凭证序号</div>
			</div>
		</div>
	</div>

	<!--foot_area-->
	<hr />
	<iframe src="/BsfwtWeb/pages/foot.aspx" width="100%" frameborder="0"
		id="footpage"></iframe>
</body>
<script src="../../scripts/pagejs/other/txsublist.js"></script>
</html>
