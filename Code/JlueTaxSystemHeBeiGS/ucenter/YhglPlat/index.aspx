<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="JlueTaxSystemHBGS.ucenter.YhglPlat.index" %>

<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- 让360双核浏览器用webkit内核渲染页面 !!! 注意，这行最好放在前面，防止浏览器开始解析的时候采用其它内置的渲染方案  -->
  <meta name="renderer" content="webkit">
  <!-- 让IE浏览器用最高级内核渲染页面 还有用 Chrome 框架的页面用webkit 内核 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>河北省国家税务局云办税厅</title>
  <link rel="stylesheet" href="./lib/layerUI/css/layui.css">
  <link rel="stylesheet" href="./styles/normalize.css">
  <link rel="stylesheet" href="./styles/yhgl.css">
</head>

<body>
  <div class="yhgl-wrap yhgl-index">
    <!-- 左侧菜单模版 -->
    <script id="menuTpl" type="text/html">
      <ul>
        {{each list as value i}}
        <li class={{clsName[i]}}><a href="{{hashUrl[i]}}" target="routerContent">{{value}}</a>
        </li>
        {{/each}}
      </ul>
    </script>
    <!-- 存放菜单容器 -->
    <div class="menu fl" id="menu"></div>
    <div class="router fl" id="router">
      <iframe id="mainframe" frameborder="0" name="routerContent" style="width:100%;height:475px" border="0"></iframe>
    </div>
  </div>
  <script src="./lib/base1/jquery.min.js"></script>
  <script src="./lib/sui/mini-all-min.js"></script>
  <script src="./scripts/pagejs/global/global.js" type="text/javascript"></script>
  <script src="./scripts/pagejs/global/common.js" type="text/javascript"></script>
  <script src="./lib/Dialog/layer.min.js"></script>
  <script src="./lib/artTemplate/template.js"></script>
  <script type="text/javascript" src="./index.js"></script>
</body>

</html>

