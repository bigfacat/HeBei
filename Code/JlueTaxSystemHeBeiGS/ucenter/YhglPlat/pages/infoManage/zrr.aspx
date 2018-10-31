<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zrr.aspx.cs" Inherits="JlueTaxSystemHBGS.ucenter.YhglPlat.pages.infoManage.zrr" %>

<!DOCTYPE html>
<html lang="zh">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>电子税务局</title>
	<link rel="stylesheet" href="../../styles/normalize.css">
	<link rel="stylesheet" href="../../lib/layerUI/css/layui.css">
	<link rel="stylesheet" href="../../styles/yhgl.css">
	<link rel="stylesheet" href="../../styles/register.css">
</head>


<body>
<div style="position:relative">
	<!-- <script id="accountInfoTpl" type="text/html">
	<ul>
	  {{each list as value i}}
	  <li>
		<span class="first">{{keyName[i]}}</span>
		<span class="second">{{value}}</span>
	  </li>
	  {{/each}}
	</ul>
  </script> -->
	<form class="accountInfo" id="accountInfo">
		<ul>
			<li><span class="first">姓名</span><input type="text" name="xm" class="second no-border" readonly="true"/>
			</li>
			<li><span class="first">身份证号</span><input type="text" name="sfzhm"
			                                                                       class="second no-border"
			                                                                       readonly="true"/></li>
			<li><span class="first">手机号</span><input type="text" name="mobile" class="second" disabled="true"/><i
				id="phone-tip">外省手机号收不到短信验证码，请录入河北省内的手机号</i></li>
			<li id="yhkh" class="hidden"><span class="first">银行卡号</span><input type="text" name="yhkh" class="second"
			                                                                   disabled="true"/></li>
			<li id="picCode" class="hidden">
				<span class="first">图片验证码</span>
				<input type="text" name="yzmcode" placeholder="请输入图片验证码"/>
				<a>
					<img id="tpcode" class="qrcode" alt="验证码" src="../../../captcha.jpg"
					     onclick="this.src='../../../captcha.jpg?'+Math.random();">
				</a>
			</li>
			<li id="messCode" class="hidden">
				<span class="first">短信验证码</span>
				<input type="text" name="code" placeholder="请输入短信验证码"/>
				<a href="javascript:void(0)" class="button button-grey sendMessage" id="sendMessage">点击发送</a>
			</li>
		</ul>
	</form>
	
	
	<form class="layui-form" id="uploadFile"
	      style="background-color: #fbfcfd;border: 1px solid #ececec;padding-top: 8px;">
		<label class="layui-form-label font-color6 big-title">实名认证信息采集：(可到税务机关采集实名认证图像)</label>
		<div>
			<ul>
				<li class="SFZZM">
					<span class="img-title">人像面</span>
					<a class="img-box"><img src="../../images/sfzzm.png" alt="人像面"></a>
					<div class="layui-form-item layui-inline upload-box">
						<i class="layui-icon hidden" style="color:#5FB878;margin-left: -12px;">&#xe618;</i>
						<i class="layui-icon hidden" style="color:#FF5722;font-weight:bolder;margin-left: -12px;">&#x1006;</i>
						<span class="preview-pic font-blueColor hidden" data-img="" style="cursor: pointer;">预览</span>
					</div>
				</li>
				
				<li class="SFZFM">
					<span class="img-title">国徽面</span>
					<a class="img-box"><img src="../../images/sfzfm.png" alt="国徽面"></a>
					<div class="layui-form-item layui-inline upload-box">
						<i class="layui-icon hidden" style="color:#5FB878;margin-left: -12px;">&#xe618;</i>
						<i class="layui-icon hidden" style="color:#FF5722;font-weight:bolder;margin-left: -12px;">&#x1006;</i>
						<span class="preview-pic font-blueColor hidden" data-img="" style="cursor: pointer;">预览</span>
					</div>
				</li>
				
				<li class="SCSFZZP">
					<span class="img-title">手持照</span>
					<a class="img-box"><img src="../../images/scsfz.png" alt="手持照"></a>
					<div class="layui-form-item layui-inline upload-box">
						<i class="layui-icon hidden" style="color:#5FB878;margin-left: -12px;">&#xe618;</i>
						<i class="layui-icon hidden" style="color:#FF5722;font-weight:bolder;margin-left: -12px;">&#x1006;</i>
						<span class="preview-pic font-blueColor hidden" data-img="" style="cursor: pointer;">预览</span>
					</div>
				</li>
			</ul>
		</div>
		
		
		
	</form>
	
	
	<div class="accountInfo">
		<div class="actions">
			<input type="button" value="修改" class="button button-blue" id="confirmModify"/>
			<span class="cancel hidden" id="cancelModify">取消</span>
		</div>
	</div>
</div>
<script src="../../lib/base1/jquery.min.js"></script>
<script src="../../scripts/pagejs/global/global.js"></script>
<script src="../../scripts/pagejs/global/sms.js"></script>
<script src="../../scripts/pagejs/user/common.js"></script>
<script src="../../scripts/commonjs/validator.js"></script>
<script src="../../lib/layerUI/layui.js"></script>
<!-- <script src="../../lib/artTemplate/template.js"></script> -->
<script src="./accountInfo.js"></script>
</body>

</html>

