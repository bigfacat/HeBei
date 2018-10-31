<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="localUpload.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.public1.fbzl.localUpload" %>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>本地上传</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script type="text/javascript" src="/wszx-web/lib/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/wszx-web/lib/fex-webuploader/dist/webuploader.js"></script>
    <link href="./localUpload.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="content-body" id="content-body">
        <div class="clearfix upload-tip">请上传大小在2M以内，格式为 jpg,jpeg,png 的图片。</div>
        <ul class="imgList clearfix">
            <li class="add-file">
                <div class="picker big-picker">+</div>
            </li>
        </ul>
        <div class="footer">
            <label>
                <input type="checkbox" id="tbzlk">
                将上传的文件保存到『我的资料库』</label><br>
            <button class="btn btn-blue retry-submit hide _btn" method="retrySubmit">重新上传</button>
            <button class="btn btn-blue reset _btn hide" method="resetFile">重新选择</button>
            <button class="btn btn-blue _btn submit-file" method="submitFile">开始上传</button>
            <button class="btn btn-white _btn" method="closeWin">取消</button>
            <button class="btn btn-white _btn" method="openDzzlk">打开电子资料库</button></div>
        <div class="loading hide">加载中...</div>
        <div class="timer-out hide"><span>您上传的文件太多或网络太差，请试试分批上传或换一个网络试试</span><br>
            <span class="btn blue reset _btn" method="resetFile">重新选择</span><br>
            <span class="btn timer-out-cancel _btn" method="timerOutCalnel">取消</span></div>
    </div>
    <script type="text/javascript" src="./localUpload.js"></script>
</body>
</html>
