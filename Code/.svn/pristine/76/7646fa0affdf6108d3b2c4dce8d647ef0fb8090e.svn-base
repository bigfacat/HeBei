<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wcjyzmhx.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wcjyzmhx.wcjyzmhx" %>

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
    <title>跨区域涉税事项报验登记缴销</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="wcjyzmhx.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="win1" style="width: 900px; height: 390px; display: none" title="增加" showtoolbar="false" showfooter="true">
        <form id="form1" method="post">
            <input name="id" class="mini-hidden"><div style="padding-left: 11px; padding-bottom: 5px;">
                <table class="addtable" style="table-layout: fixed;" width="100%">
                    <tr>
                        <td width="18%">货物（服务）名称：</td>
                        <td width="30%" class="textLeft">
                            <input name="wcjyhwmc" width="100%" class="mini-textbox" required="true" requirederrortext="货物（服务）名称不能为空"></td>
                        <td width="22%">预缴税款征收率（2%或3%）：</td>
                        <td width="30%" class="textLeft">
                            <input name="yjskzsl" width="100%" class="mini-combobox" required="true" textfield="MC" valuefield="ID" data='[{"ID":"0.02","MC":"2%"},{"ID":"0.03","MC":"3%"} ]' requirederrortext="预缴税款征收率（2%或3%）不能为空"></td>
                    </tr>
                    <tr>
                        <td>已缴纳税款金额：</td>
                        <td class="textLeft">
                            <input name="yyjskje" width="100%" class="mini-moneybox" datatype="float" required="true" requirederrortext="已缴纳税款金额不能为空"></td>
                        <td>实际合同金额：</td>
                        <td class="textLeft">
                            <input name="sjhtje" width="100%" class="mini-moneybox" required="true" requirederrortext="实际合同金额不能为空"></td>
                    </tr>
                    <tr>
                        <td>开具发票金额（自开）：</td>
                        <td class="textLeft">
                            <input name="kjfpjezk" width="100%" class="mini-moneybox" datatype="float" requirederrortext="开具发票金额（自开）不能为空"></td>
                        <td>开具发票金额（代开）：</td>
                        <td class="textLeft">
                            <input name="kjfpjedk" width="100%" class="mini-moneybox" datatype="float" requirederrortext="开具发票金额（代开）不能为空"></td>
                    </tr>
                    <tr>
                        <td>应补预缴税款金额：</td>
                        <td class="textLeft">
                            <input name="ybyjskje" width="100%" class="mini-moneybox" datatype="float" required="true" requirederrortext="应补预缴税款金额不能为空"></td>
                        <td></td>
                        <td class="textLeft"></td>
                    </tr>
                </table>
            </div>
        </form>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="onOk1">保存</a> <a class="mini-button toolBtn-white" onclick="onCancel">取消</a></div>
    </div>
    <div class="mini-window" id="win2" style="width: 760px; height: 350px; display: none" title="增加" showtoolbar="false" showfooter="true">
        <form id="form2" method="post">
            <input name="id" class="mini-hidden"><div style="padding-left: 11px; padding-bottom: 5px;">
                <table class="addtable" style="table-layout: fixed;" width="100%">
                    <tr>
                        <td width="14%">完税凭证种类：</td>
                        <td width="33%">
                            <input id="pzzlDm" name="pzzlDm" class="mini-combobox" required="true" valuefield="ID" textfield="MC" requirederrortext="完税凭证种类不能为空"></td>
                        <td width="14%">完税凭证号码：</td>
                        <td width="33%">
                            <input name="pzhm" class="mini-textbox"></td>
                    </tr>
                    <tr>
                        <td>电子税票号码：</td>
                        <td>
                            <input name="dzsphm" class="mini-textbox" required="true" requirederrortext="电子税票号码不能为空"></td>
                        <td>征收项目：</td>
                        <td>
                            <input id="zsxmDm" name="zsxmDm" class="mini-combobox" required="true" valuefield="ID" textfield="MC" onvaluechanged="wcjyzmhx.onZsxmDmChanged" requirederrortext="征收项目不能为空"></td>
                    </tr>
                    <tr>
                        <td>征收品目：</td>
                        <td>
                            <input id="zspmDm" name="zspmDm" class="mini-combobox" required="true" valuefield="ID" textfield="MC" url="" requirederrortext="征收品目不能为空"></td>
                        <td>税额：</td>
                        <td>
                            <input name="sjje" class="mini-moneybox" datatype="float" required="true" requirederrortext="税额不能为空"></td>
                    </tr>
                </table>
            </div>
        </form>
        <div property="footer"><a class="mini-button toolBtn-blue" onclick="onOk2">保存</a> <a class="mini-button toolBtn-white" onclick="onCancel">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/wssqcommon.js"></script>
    <script src="wcjyzmhxService.js"></script>
    <script src="wcjyzmhx.js"></script>
    <script src="wcjyzmhxService.js"></script>
    <script src="addView.js"></script>
</body>
</html>
