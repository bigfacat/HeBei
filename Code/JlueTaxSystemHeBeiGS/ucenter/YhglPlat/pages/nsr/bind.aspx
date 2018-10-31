<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bind.aspx.cs" Inherits="JlueTaxSystemHBGS.ucenter.YhglPlat.pages.nsr.bind" %>

<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>我的企业</title>
	<link href="../../lib/sui/themes/default/miniui.css" rel="stylesheet" />
	<link href="../../lib/sui/themes/icons.css" rel="stylesheet" />
	<link rel="stylesheet" href="../../styles/override-miniui.css">
	<link rel="stylesheet" href="../../styles/normalize.css">
	<link rel="stylesheet" href="../../styles/yhgl.css">
</head>

<body>
	<div class="corporate-bind" style="height:400px;">
		<h2 class="mtb10">我的企业</h2>
		<hr>
		<div id="corporateBindForm" class="choice-agent-form mt20">
			<div id="agentData" class="mini-datagrid" idField="id" showPager="false" style="width:100%">
				<div property="columns">
					<div field="nsrmc" width="280" headerAlign="center" align="center">
						企业名称 <input property="editor" class="mini-textbox" />
					</div>
					<div field="nsrsbh" width="150" align="center" headerAlign="center">纳税人识别号</div>
					<div field="type" width="100" align="center" headerAlign="center" renderer="onTypeRenderer">身份</div>
					<div field="isDefault" width="100" headerAlign="center" align="center" headerAlign="center" renderer="onStateRenderer">状态
					</div>
					<div field="createTime" width="100" headerAlign="center" align="center" headerAlign="center" renderer="onDateRenderer">获取时间
					</div>
					<div field="action" name="action" width="100" headerAlign="center" align="center" renderer="onActionRenderer" cellStyle="padding:0;">操作
					</div>
				</div>
			</div>

			<div id="cancelBindWindow" class="mini-window" title="授权解除原因填写" style="width: 510px;" showModal="true" allowDrag="true">
				<div id="editform" class="form">
					<table style="margin: 0 auto">
						<tr>
							<td width="400px;">请输入解除原因</td>
						</tr>
						<tr>
							<td>
								<input id="reason" name="reason" onblur="trim(this.id)" class="mini-textarea" style="width:300px;" vtype="required;maxLength:200" onvalidation="addressValidation" />
								<span id="reason_error" class="validation-error-text"></span>
							</td>
						</tr>
						<tr>
							<td style="text-align:center"><a class="btn-blue" style="display:inline-block;height:30px;line-height:30px;font-size:13px;color:#fff;padding:0 8px;background-color:#0994dc;border-radius:4px;width:80px;text-align:center;margin-top:20px;" href="javascript:updateCancelBindRow()">确定</a></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="../../lib/base1/jquery.min.js"></script>
	<script type="text/javascript" src="../../lib/sui/mini-all-min.js"></script>
	<script type="text/javascript" src="../../scripts/pagejs/global/global.js"></script>
	<script type="text/javascript" src="../../scripts/pagejs/global/common.js"></script>
	<script type="text/javascript" src="../../scripts/commonjs/validate.js"></script>
	<script type="text/javascript" src="../../scripts/pagejs/grant/grant.js"></script>
	<script type="text/javascript" src="../../scripts/pagejs/nsr/bind.js"></script>
</body>

</html>

