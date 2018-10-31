<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ssxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yshd.ssxxcx" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>涉税信用信息表</title>
    <link rel="stylesheet" href="../../../apps/styles/style.css">
    <link rel="stylesheet" href="yshd.css">
    <style id="print-style">
        .print-area table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000;
            margin: 20px 0;
        }

            .print-area table tr td {
                border: 1px solid #000;
                text-align: center;
                font-size: 14px;
                padding: 7px 5px;
            }

        .print-area .fs20 {
            font-size: 20px;
            text-align: center;
            margin: 20px;
            font-weight: bold;
        }

        .print-area .fs16 {
            font-size: 16px;
            border-bottom: 1px dotted #000;
            padding-bottom: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="wizard"></div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="../../../lib/lodop/lodopPrint.js"></script>
    <script src="ssxxcx.js"></script>
</body>
</html>
