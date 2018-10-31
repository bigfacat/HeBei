<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.yhs_web.yhscx.index" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="纳税人档案,一户式查询">
    <meta name="description" content="一户式查询">
    <title>纳税人档案查询</title>
    <link rel="stylesheet" href="styles/default.css">
</head>
<body>
<div class="main">
    <!--左侧菜单容器-->
    <div class="main-nav" id="main-nav"></div>
    <!--右侧内容显示-->
    <div class="main-content">
        <div id="cx-container"></div>
    </div>
</div>
<script src="lib/jquery/jquery.min.js"></script>
<script src="scripts/store.js"></script>
<script src="scripts/miniui.js"></script>
<script src="lib/artTemplate/template.js"></script>
<script src="scripts/yhscx.js"></script>
<script>
    $(function () {
        yhscx.init();
    });
</script>
</body>
</html>
