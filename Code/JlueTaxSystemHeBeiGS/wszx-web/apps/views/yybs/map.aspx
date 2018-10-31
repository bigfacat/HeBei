<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="map.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yybs.map" %>

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
    <title>百度地图</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }

        .baidu-map {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="" class="baidu-map" id="map"></iframe>
    <script>
        function setSrc(address) {
            var baiduMapUrl = 'http://api.map.baidu.com/geocoder?address='
                    + address + '&region=河北&output=html&src=Servyou|HbTax';
            document.getElementById('map').src = baiduMapUrl;
        }
    </script>
</body>
</html>
