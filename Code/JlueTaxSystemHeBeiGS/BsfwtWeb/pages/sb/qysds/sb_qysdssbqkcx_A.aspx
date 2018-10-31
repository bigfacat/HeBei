<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_qysdssbqkcx_A.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.BsfwtWeb.pages.sb.qysds.sb_qysdssbqkcx_A" %>

<!doctype html>
<html>
	<head>
		<title>我要企业所得税申报</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<script src="../../../scripts/boot.js" type="text/javascript"></script>
		<script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
		<script src="../../../scripts/sui/store.js" type="text/javascript"></script>
		<script src="../../../scripts/pagejs/sb/qysds/sb_qysdssbqkcx_A.js" type="text/javascript"></script>
		<style type="text/css">
body {
	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: #fbfcfc;
}#sdsfxyccx,#tbljcw,#ssfxts{
	 z-index: 1001;
	 position: absolute;
	 left: 400px;
	 top: 150px;
 }
#sdsfxyccx .content,
#sdsfxyccx .errorText,
#tbljcw .content,
#tbljcw .errorText,
#ssfxts .content,
#ssfxts .errorText{
	word-wrap: break-word;word-break: break-all;
	margin: 0px !important;
	padding: 6px !important;
}
.borderBottom{
	border-bottom: 1px solid #000;
}
#sdsfxyccx span,#tbljcw span,#ssfxts span{
	height: 20px;
	line-height: 20px;
}
#sdsfxyccx .footer,#tbljcw .footer,#ssfxts .footer{
	text-align: center;height: 50px;line-height: 50px;background-color: #F0F3F8;
}
#sdsfxyccx .footer input[button],#tbljcw .footer input,#ssfxts .footer input{
	color: #fff;
	background-color: #72B3DD;
	vertical-align:middle;height: 30px;
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
		
		<div class="inputbg clearfix" style="height: 60px;padding:6px 0 0 0">
			<table style="margin: 0 auto;width:1000px;">
				<tr>
					<td align="left">
	                    <div class="xgmsb-btn pngbg" id="xgmsb-btn" onclick="sb()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="border-bottom:1px solid #f5f5f5;width:100%;">
			<div class="place pngbg" style="width:1000px;margin: 0 auto;">您现在的位置：我的办税大厅 > 纳税申报 > 企业所得税月(季)度预缴纳税申报表(<span id="titlename">A类</span>，2015年版)</div>
		</div>
		<div>
			<table style="margin: 15px auto 0px auto;">
				<tr>
					<th align="right" style="" nowrap="nowrap">
						所属年月:
					</th>
					<td align="left">
					<input id="sbny" class="mini-monthpicker" format="yyyyMM" onbuttonclick="setSbnyValue()"/> 
					</td>
					
					<th align="right" style="" nowrap="nowrap">
						月季报类型:
					</th>
					<td align="left">
					<input id="sbzldm" name="sbzldm" class="mini-combobox"  valueField="id"  textField="text" value='10416'  data='[{"id":"10416","text":"月报"},{"id":"10418","text":"季报"}]'/> 
					</td>
					<td>
						<a class="mini-button blue font14 mini-button-iconRight"
							onclick="search()" id="stepnext"
							style="margin: 0 5px; padding: 6px 20px;width: 65px;"
							iconcls="ico-next pngbg">查 询</a>
					</td>
				</tr>
			</table>
		</div> 
		
		
		<div class="mini-fit" id="content">

			<div class="" style="display: block; width:1000px;margin:15px auto;">

				<div id="sbqkGrid" class="mini-datagrid"
					style="width: 100%; height: 271px;"
					url="" idfield="nsrsbh"
					allowresize="false" showpager="false" sizelist="[30,30,30,30]"
					pagesize="20" showEmptyText="true"
					emptyText='<font color="red">无记录</font>'>
					<div property="columns">
					<!-- 	<div field="sbXh"  width="20%" headeralign="center"
							align="center" allowsort="true">
							申报序号
						</div> -->
						<div field="sbny" width="20%" headeralign="center"
							allowsort="false" align="center">
							申报年月
						</div>
						<div field="sbztMc" width="20%" headeralign="center"
							allowsort="false" align="center" renderer="sbztRenderer">
							申报结果
						</div>
						<div field="lrsj" width="20%" headeralign="center"
							allowsort="true" align="center" dateformat="yyyy-MM-dd HH:mm:ss">
							申报时间
						</div>
						<div field="cz" name="cz" width="20%" headeralign="center" allowsort="false"
							align="center" renderer="czRenderer">
							操作
						</div>
					</div>
				</div>

			</div>

		</div>
		<!--所得税风险异常查询-->
		<div id="sdsfxyccx" class="mini-window" title="所得税风险异常查询" allowResize="true"
			 showFooter="true" allowDrag="true" style="width:500px;">
			<div class="content">
				<span>尊敬的纳税人,您的本月(季)企业所得税预缴纳税申报存在填报逻辑错误和涉税风险疑点,请点击"填报逻辑错误"或"涉税风险提示"按钮查看,
					"填报逻辑错误"请在预缴申报期内修改,"涉税风险提示"请结合贵单位实际情况分析处理。</span>
			</div>
			<div property="footer" class="footer">
				<input type='button' value='填报逻辑错误' onclick="showTbljcw()"/>
				<input type='button' value='涉税风险提示' onclick="showSsfxts()"/>
			</div>
		</div>
		<div id="tbljcw" class="mini-window" title="所得税风险异常查询" style="width:500px;"
			 showToolbar="true" showFooter="true" showModal="true" allowDrag="true">
			<div class="content borderBottom">
				<span>填报逻辑错误提示</span><br />
				<span>依据《国家税务总局关于发布&lt;中华人民共和国企业所得税月（季）度预缴申报表（2015年版）等报表&gt;的公告》（2015年第31号）和《国家税务总局关于修改企业所得税月（季）度预缴税申报表的公告》（2015年第79号），你单位申报的《企业所得税月（季）度预缴纳税申报表》存在以下表内、表间逻辑错误，请务必于企业所得税月（季）度预缴申报期结束前进行更正。</span><br />
				<span>温馨提示：企业所得税月（季）度申报错误及风险点扫描仅对您的首次申报推送提示信息，对更正、补充申报不再推送提示信息，如有疑问请您及时联系相关税务机关。</span>
			</div>
			<div class="errorText borderBottom"></div>
			<div property="footer" class="footer">
				<input type='button' value='确定' onclick="hideWin()"/>
			</div>
		</div>
		<div id="ssfxts" class="mini-window" title="所得税风险异常查询" style="width:500px;"
			 showToolbar="true" showFooter="true" showModal="true" allowDrag="true" allowResize="true">
			<div class="content borderBottom">
				<span>涉税风险提示</span><br />
				<span>你单位申报的《企业所得税月（季）度预缴纳税申报表》存在以下风险信息，为避免涉税风险，请认真甄别核查，如属填报错误的，请于企业所得税月（季）度预缴申报期结束前及时进行更正。</span><br />
				<span>温馨提示：企业所得税月（季）度申报错误及风险点扫描仅对您的首次申报推送提示信息，对更正、补充申报不再推送提示信息，如有疑问请您及时联系相关税务机关。</span>
			</div>
			<div class="errorText borderBottom"></div>
			<div property="footer" class="footer">
				<input type='button' value='确定' onclick="hideWin()"/>
			</div>
		</div>
	</body>
</html>

