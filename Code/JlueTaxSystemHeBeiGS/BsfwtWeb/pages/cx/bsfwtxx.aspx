<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bsfwtxx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.cx.bsfwtxx" %>

<!doctype html>
<html>
<head>
<title>河北省国家税务局网上办税服务厅</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script src="../../scripts/boot.js" type="text/javascript"></script>
<script type="text/javascript"
	src="../../scripts/pagejs/common/DecimalUtil.js"></script>
</head>
<body>

<!--top-->
<div class="toparea">
  <div class="width970">
    <div style="float:right;"><img src="../../scripts/sui/themes/hbwt/images/login/top_hbswj.png" width="261" height="65" alt=""/></div>
    <img src="../../scripts/sui/themes/hbwt/images/login/logo.png" width="330" height="65" alt=""/></div>
</div>

<!--banner_area-->
 <div class="banner_area">
        <div class="width970">
            <div class="topbanner">
                	办税服务厅信息汇总
            </div>
        </div>
    </div>


<!--content_area-->
<div class="width970">
  <div class="place pngbg">您现在的位置：我的办税大厅 >办税服务厅信息</div>
  <div class="width970 clearfix">
  
		<!-- <div class="inputbg clearfix" style="height: 70px">
			<table style="margin: 0 auto">
				<tr>
					<th align="right" style="" nowrap="nowrap">
						地市主管税务局:
					</th>
					<td align="left">
						<input id="gszgswjgJDm" name="gszgswjgJDm"  onbeforenodeselect="beforeZgswjgSelect" url="/common/BaseCodeAction_getDmSwjgDs.do" onvaluechanged="doZgswjSelected" class="mini-treeselect" textfield="MC" valuefield="ID" parentField="PID" shownullitem="true"  style="width:100%;"/>
					</td>
					<th align="right" style="" nowrap="nowrap">
						区县主管税务局:
					</th>
					<td align="left">
						<input id="nsrSwjgDm" name="nsrSwjgDm"  class="mini-treeselect" textfield="MC" valuefield="ID" parentField="PID" shownullitem="true"  style="width:100%;"/>
					</td>
					<td>
						<a class="mini-button blue font14 mini-button-iconRight"
							onclick="search(0)" id="stepnext"
							style="margin: 0 5px; padding: 6px 20px;width: 63px;"
							iconcls="ico-next pngbg">查 询</a>
							
							<a class="mini-button red font14 mini-button-iconLeft  " onClick="window.open('cx_map.html','_self')" style="margin:0 5px; padding:6px 20px;" iconcls="ico-close pngbg" >切换至地图模式</a> 
					</td>
				</tr>
			</table>
		</div>  -->
  
        <div id="datagrid2" class="mini-datagrid" style="width:100%;clear : none"
             idfield="id" allowresize="false" showpager="false" allowalternating="false"
             sizelist="[30,50,100]" pagesize="10" >
            <div property="columns">
                <div field="ssdsdwmc" name="ssdsdwmc" width="120" headeralign="center">所在地市单位名称</div>
                <div field="bsfwtmc" width="120" headeralign="center">办税服务厅名称</div>
                <div field="dz" width="120" headeralign="center">地址</div>
                <div field="fwdh" width="100" headeralign="center" align="center">服务电话</div>
                <div field="gxfw" width="120" headeralign="center" align="center">管辖范围</div>
                <div field="gzsj" width="120" headeralign="center" align="center">办公时间</div>
            </div>
        </div>

    </div>
  </div>
</div>

	
	

<!--foot_area-->
<hr/>
<iframe src="/BsfwtWeb/pages/foot.aspx" width="100%" frameborder="0" id="footpage"></iframe>
</body>
  <script src="../../scripts/pagejs/cx/bsfwtxx.js"></script>
</html>
