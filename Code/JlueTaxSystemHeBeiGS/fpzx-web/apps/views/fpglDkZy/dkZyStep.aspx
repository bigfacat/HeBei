<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="dkZyStep.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglDkZy.dkZyStep" %>



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
    <title>增值税专用发票代开</title>
    <link rel="stylesheet" href="../../../apps/styles/style.css">
    <link rel="stylesheet" href="dkZyStep.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window second-step check-fkf-window" id="checkAgain" style="width: 760px; height: 500px; display: none" title="购买方信息核对" showtoolbar="false" showfooter="true">
        <p class="check-again-title">请再次核对您输入的信息是否与付款方提供的信息一致，以免开错发票，增加您的办税成本。</p>
        <p class="check-again-title">若您的银行信息发生变化，请联系主管税务机关变更银行信息！</p>
        <table id="fkf-check-form" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td width="38%">购买方纳税人识别号</td>
                <td width="62%" class="item-control">
                    <input class="mini-textbox" name="ghfNsrsbh" readonly="true" width="103%" maxlength="20" vtype="nsrsbh"></td>
            </tr>
            <tr>
                <td>购买方名称 <strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-textbox" name="ghfNsrmc" readonly="true" width="103%" required="true" requirederrortext="付款方名称不能为空"></td>
            </tr>
            <tr>
                <td>购买方地址<strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-textbox" name="ghfDz" width="103%" readonly="true" maxlength="200" required="true" requirederrortext="付款方地址不能为空" vtype="maxLength:200"></td>
            </tr>
            <tr>
                <td>购买方开户银行类别<strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-combobox" name="ghfYhhbDm" required="true" shownullitem="true" nullitemtext="注：若您需要选择的银行不存在，请联系主管税务机关维护银行信息" width="103%" textfield="MC" valuefield="ID" readonly="true" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2"></td>
            </tr>
            <tr>
                <td>购买方银行营业网点名称<strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-textbox" name="ghfYhyywdMc" width="103%" readonly="true" required="true" requirederrortext="付款方银行营业网点名称不能为空"></td>
            </tr>
            <tr>
                <td>购买方银行账号<strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-textbox" name="ghfYhkhzh" width="103%" readonly="true" onvalidation="dkptfp.onyhzhValidate"></td>
            </tr>
            <tr>
                <td>联系电话 <strong class="text-red">*</strong></td>
                <td class="item-control">
                    <input class="mini-textbox" name="ghfLxdh" width="103%" readonly="true" required="true" requirederrortext="联系电话不能为空" vtype="rangeLength:8,13"></td>
            </tr>
        </table>
        <div id="addToFkftxl" name="addToFkftxl" class="mini-checkbox" checked="true" text="将该纳税人信息加入购货方通讯录" style="margin: 10px 0 0 60px"></div>
        <div property="footer"><a class="mini-button toolBtn-blue" id="check-ok">确认</a> <a class="mini-button toolBtn-white" id="check-cancle">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="dkZyService.js"></script>
    <script src="dkZyStep.js"></script>
</body>
</html>
