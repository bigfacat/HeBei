<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpyj-xzfpzl.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpyj.fpyj_xzfpzl" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="description" content="电子税务局,网上办税服务厅">
    <meta name="keywords" content="电子税务局,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../../images/public/favicon.ico" rel="icon" type="image/x-icon">
    <title>发票验旧</title>
    <link rel="stylesheet" href="../../../apps/styles/style.css">
    <link rel="stylesheet" href="fpyj.css">
    <link rel="stylesheet" href="fpyj-hb.css">
</head>
<body>
    <div id="wizard" class="wizard" style="display: block">
        <div class="content">
            <section class="fpyj-zp">
                <div class="title">请选择发票类型</div>
                <div class="first-box" data-fpyjtype="fpyj">
                    <div class="second-box">
                        <img src="../../images/fpyj/icon-1.png"><p>定额/手工发票</p>
                    </div>
                    <div class="third-box">主要验旧<br>
                        通用手工发票、定额发票、景点门票等发票</div>
                </div>
                <div class="first-box" data-fpyjtype="fpyj-zp">
                    <div class="second-box">
                        <img src="../../images/fpyj/icon-2.png"><p>增值税发票</p>
                    </div>
                    <div class="third-box">主要验旧<br>
                        增值税专用发票、增值税普通发票、电子发票、机动车销售统一发票</div>
                </div>
            </section>
        </div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../lib/sui-miniui/mini-all-source.js"></script>
    <script src="../../../lib/ds-commonFront/build/common-front.js"></script>
    <script src="../../../lib/ds-commonFront/build/wssqUtil.js"></script>
    <script>
        wssqUtil.initPageHdFt('head');
        $('.first-box').click(function () {
            window.location.href = $(this).attr('data-fpyjType') + ".aspx?code=110211&id=131";
        })
    </script>
</body>
</html>
