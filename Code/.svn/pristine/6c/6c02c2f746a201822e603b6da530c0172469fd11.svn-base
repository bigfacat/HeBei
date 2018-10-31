<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wcjyzmkj.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.kqysssxbg.wcjyzmkj" %>



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
    <title>跨区域涉税事项报告</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="wcjyzmkj.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="win1" style="width: 760px; height: 350px; display: none" title="增加" showtoolbar="false" showfooter="true">
        <form id="form1" method="post">
            <input name="id" class="mini-hidden"><div style="padding-left: 11px; padding-bottom: 5px;">
                <table class="addtable" style="table-layout: fixed;">
                    <tr>
                        <td style="width: 120px;">货物或服务名称：</td>
                        <td style="width: 200px;">
                            <input name="wcjyhwmc" class="mini-textbox" vtype="required;maxLength:50" requirederrortext="货物或服务名称不能为空" maxlengtherrortext="货物或服务名称最大长度不能超过50"></td>
                        <td style="width: 120px;">外出经营地点：</td>
                        <td style="width: 200px;">
                            <input name="wcjyhwxsdd" class="mini-textbox" required="true" requirederrortext="外出经营地点不能为空"></td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">合同有效期起：</td>
                        <td style="width: 200px;">
                            <input name="wcjyhwyxqxq" id="wcjyhwyxqxq" class="mini-datepicker" onvaluechanged="wcjyhdkj.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="合同有效期起不能为空"></td>
                        <td style="width: 120px;">合同有效期止：</td>
                        <td style="width: 200px;">
                            <input name="wcjyhwyxqxz" id="wcjyhwyxqxz" class="mini-datepicker" onvaluechanged="wcjyhdkj.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="合同有效期止不能为空"></td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">合同总额：</td>
                        <td style="width: 200px;">
                            <input name="wcjyhwzz" class="mini-moneybox" datatype="float" required="true" minvalue="0.00" requirederrortext="合同总额不能为空"></td>
                        <td style="width: 120px;"></td>
                        <td style="width: 200px;"></td>
                    </tr>
                </table>
            </div>
        </form>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="onOk();scrollTo(0,2000)">保存</a> <a class="mini-button toolBtn-white" onclick="onCancel();scrollTo(0,2000)">取消</a></div>
    </div>
    <div class="mini-window" id="select-swjg-win" style="width: 500px; height: auto; display: none" title="选择外出经营地税务机关" repeatdirection="vertical" showtoolbar="false" showfooter="true" onbeforehide="wcjyhdkj.checkSelectedSwjg">
        <div class="xzswjg-tips">您选择的行政区划存在多个税务机关，请选择您的受理税务机关：</div>
        <div id="swjg-list" class="mini-radiobuttonlist" textfield="swjgMc" valuefield="swjgDm" repeatitems="1" repeatlayout="table" repeatdirection="horizontal"></div>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="wcjyhdkj.selectSwjgOk">确定</a> <a class="mini-button toolBtn-white" onclick="wcjyhdkj.selectSwjgCancel">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="../apiService/publicService.js"></script>
    <script src="../blzt/blztcommon.js"></script>
    <script src="wcjyzmkjService.js"></script>
    <script src="wcjyzmkj.js"></script>
    <script src="addView.js"></script>
</body>
</html>
