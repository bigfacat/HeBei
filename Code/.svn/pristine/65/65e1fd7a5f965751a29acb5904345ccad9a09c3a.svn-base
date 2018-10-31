<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qysdsyhsxba.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.qysdsyhsxba.qysdsyhsxba" %>



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
    <title>企业所得税优惠信息备案</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="bayl.css">
    <link rel="stylesheet" href="qysdsyhsxba.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="win1" style="width: 850px; height: 600px; display: none" title="分支机构备案情况表" showtoolbar="false" showfooter="true">
        <div class="grid-toolbar">
            <div class="grid-title" style="font-weight: bold;">分支机构备案情况表</div>
            <a class="mini-button toolBtn-blue" iconcls="icon-add" onclick="fzjgba.addRow">增加</a> <a class="mini-button" iconcls="icon-remove" onclick="fzjgba.removeRow">删除</a></div>
        <div id="fzjg_grid" class="mini-datagrid" style="margin: 0 auto;" allowresize="false" oncellcommitedit="onCellcommitedit" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="nsrsbh_fz" vtype="required" align="center" headeralign="center">纳税人识别号<input property="editor" name="nsrsbh_fz" class="mini-textbox" allowinput="true" required="true" requirederrortext="纳税人识别号不能为空"></div>
                <div field="nsrmc_fz" vtype="required">分支机构名称<input property="editor" name="nsrmc_fz" field="fzjgmc" class="mini-textbox" allowinput="true" required="true" requirederrortext="分支机构名称不能为空"></div>
                <div field="swjgMc" vtype="required">分支机构主管税务机关<input name="swjgMc" property="editor" class="mini-textbox" allowinput="true" required="true" requirederrortext="分支机构主管税务机关不能为空">
                    <input class="mini-hidden" name="swjgDm" id="swjgDm" style="display: none"></div>
                <div field="yhsx_fz" displayfield="MC" vtype="required">优惠项目<input property="editor" id="yhsx_fz" class="mini-combobox" allowinput="true" url="../../../api/baseCode/get/baseCode2CombSelect2/DM_QYSDS_YHSX" textfield="MC" valuefield="ID" required="true" requirederrortext="优惠项目不能为空"></div>
            </div>
        </div>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="fzjgba.save">保存</a> <a class="mini-button toolBtn-white" onclick="fzjgba.cancel">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="qysdsyhsxba.js"></script>
    <script src="qysdsyhsxbaService.js"></script>
</body>
</html>
