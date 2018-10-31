<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qrupload.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.public1.fbzl.qrupload" %>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>扫码上传</title>
    <link rel="stylesheet" href="../../../styles/style.css">
    <style>
        html, body {
            min-width: 0;
        }
    </style>
</head>
<body style="font-family: 微软雅黑;">
    <img id="qrImg" src="#" style="height: 170px; width: 170px; margin-left: 90px;"><br>
    <div style="text-align: center;">请使用app扫描二维码并拍照上传图片</div>
    <script src="../../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../../lib/sui-miniui/mini-all-source.js"></script>
    <script src="../../../../lib/ds-commonFront/build/common-front.js"></script>
    <script src="qrupload.js"></script>
</body>
</html>
