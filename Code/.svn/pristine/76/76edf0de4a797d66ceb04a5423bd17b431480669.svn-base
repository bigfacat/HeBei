<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xfsssjmba.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.xfsssjmba.xfsssjmba" %>



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
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>消费税税收减免备案</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="../zzsssjmba/zzsssjmba.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="win1" style="width: 760px; height: 455px; display: none" title="增加" showtoolbar="false" showfooter="true">
        <form id="form1" method="post">
            <input name="id" class="mini-hidden"><div style="padding-left: 11px; padding-bottom: 5px;">
                <table class="addtable" style="table-layout: fixed;">
                    <tr>
                        <td style="width: 60px;">减免政策名称</td>
                        <td style="width: 200px;">
                            <input id="jmzcmc" name="jmzcmc" allowinput="true" class="mini-combobox" textfield="MC" valuefield="ID" required="required" requirederrortext="减免政策名称不能为空" onvaluechanged="xfs.getDlXl"></td>
                        <td style="width: 60px;">减免性质大类</td>
                        <td style="width: 200px;">
                            <input name="jmxzdl" class="mini-textbox" required="true" requirederrortext="减免性质大类不能为空" enabled="false"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免性质小类</td>
                        <td style="width: 200px;">
                            <input name="jmxzxl" class="mini-textbox" required="true" requirederrortext="减免性质小类不能为空" enabled="false"></td>
                        <td style="width: 60px;">减免类型</td>
                        <td style="width: 200px;">
                            <input id="jmlx" name="jmlx" class="mini-combobox" allowinput="true" valuefromselect="true" shownullitem="false" textfield="MC" valuefield="ID" autoload="false" required="true" requirederrortext="减免类型不能为空" onvaluechanged="jzlxChanged" url="../../../api/baseCode/get/baseCode2CombSelect/DM_YH_JMLX.ashx"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免征类型</td>
                        <td style="width: 200px;">
                            <input id="jmzlx" name="jmzlx" class="mini-textbox" required="true" requirederrortext="减免方式不能为空" enabled="false"></td>
                        <td style="width: 60px;">减征额度</td>
                        <td style="width: 200px;">
                            <input name="jzed" id="jzed" class="mini-textbox" vtype="double12"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减征幅度</td>
                        <td style="width: 200px;">
                            <input name="jzfd" id="jzfd" class="mini-textbox" vtype="double12"></td>
                        <td style="width: 60px;">减征税率</td>
                        <td style="width: 200px;">
                            <input name="jzsl" id="jzsl" class="mini-spinner" vtype="float;" numberformat="n2" decimalplaces="2" increment="0.01" maxvalue="1.00" width="200px"></td>
                    </tr>
                    <tr>
                        <td style="width: 60px;">减免有效期起</td>
                        <td style="width: 200px;">
                            <input name="jmqxq" id="jmqxq" class="mini-monthpicker" onvaluechanged="xfs.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期起不能为空"></td>
                        <td style="width: 60px;">减免有效期止</td>
                        <td style="width: 200px;">
                            <input name="jmqxz" id="jmqxz" class="mini-monthpicker" onvaluechanged="xfs.onDateChanged" format="yyyy-MM-dd" required="true" requirederrortext="减免有效期止不能为空"></td>
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
    <script src="xfsssjmba.js"></script>
    <script src="addView.js"></script>
</body>
</html>
