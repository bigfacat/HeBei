<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsjzjt.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.zzsjzjt.zzsjzjt" %>



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
    <title>增值税即征即退</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="zzsjzjt.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="win1" style="width: 760px; height: 400px; display: none" showtoolbar="false" showfooter="true">
        <form id="form1" method="post">
            <input name="id" class="mini-hidden"><div style="padding-left: 11px; padding-bottom: 5px;">
                <table class="addtable" style="table-layout: fixed;">
                    <tr>
                        <td style="width: 60px;">税务备案事项</td>
                        <td style="width: 200px;">
                            <input id="jmsspsxDm" name="jmsspsxDm" allowinput="true" class="mini-combobox" textfield="MC" valuefield="ID" onvaluechanged="zzsjzjt.getJmzc" popupwidth="300" required="required" requirederrortext="税务资格备案事项不能为空" url="zzsjzjt.zzsjzjtService.Api.jmsspsx"></td>
                        <td style="width: 60px;">征收品目</td>
                        <td style="width: 200px;">
                            <input name="zspmDm" id="zspmDm" class="mini-combobox" required="true" requirederrortext="征收项目不能为空"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免政策名称</td>
                        <td style="width: 200px;">
                            <input id="ssjmxzhzDm" name="ssjmxzhzDm" allowinput="true" class="mini-combobox" textfield="MC" valuefield="ID" url="" popupwidth="600" required="required" requirederrortext="减免政策名称不能为空" onvaluechanged="zzsjzjt.getDlXl"></td>
                        <td style="width: 60px;">减免性质大类</td>
                        <td style="width: 200px;">
                            <input name="ssjmxzdlDm" id="_ssjmxzdlMc" class="mini-textbox" required="true" requirederrortext="减免性质大类不能为空" enabled="false"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免性质小类</td>
                        <td style="width: 200px;">
                            <input name="ssjmxzxlDm" id="_ssjmxzxlMc" class="mini-textbox" required="true" requirederrortext="减免性质小类不能为空" enabled="false"></td>
                        <td style="width: 60px;">减免类型</td>
                        <td style="width: 200px;">
                            <input id="jmlxDm" name="jmlxDm" class="mini-combobox" allowinput="true" valuefromselect="true" shownullitem="false" textfield="MC" valuefield="ID" autoload="false" required="true" requirederrortext="减免类型不能为空" url="zzsjzjt.zzsjzjtService.Api.jmlx"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免有效期起</td>
                        <td style="width: 200px;">
                            <input name="jmqxq" id="jmqxq" class="mini-monthpicker" onvaluechanged="zzsjzjt.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期起不能为空"></td>
                        <td style="width: 60px;">减免有效期止</td>
                        <td style="width: 200px;">
                            <input name="jmqxz" id="jmqxz" class="mini-monthpicker" onvaluechanged="zzsjzjt.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期止不能为空"></td>
                    </tr>
                </table>
            </div>
        </form>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="onOk">保存</a> <a class="mini-button toolBtn-white" onclick="onCancel">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="zzsjzjt.js"></script>
    <script src="/wszx-web/apps/views/public1/fbzl/FbzlView.js "></script>
</body>
</html>
