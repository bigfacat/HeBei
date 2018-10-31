<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addRowView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.ckzhzhbg.addRowView" %>

<!DOCTYPE html>


<div class="mini-window" id="addRow-win" style="width: 780px; height: 620px; display: none" title="存款账户账号详细信息" showtoolbar="false" onbeforehide="ckzhzhbg.onbeforehide">
    <div class="form-table" id="addRow-form">
        <table width="100%" height="470">
            <tr>
                <th colspan="6" class="td-border-bottom">账号信息</th>
            </tr>
            <tr>
                <td width="100" colspan="3">缴税账号：
                    <input id="add-sxjszhbz" name="sxjszhbz" onvaluechanged="ckzhzhbg.changeSxjszhbz" class="mini-radiobuttonlist" textfield="MC" valuefield="ID" required="true" requirederrortext="请选择缴税账号" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'></td>
            </tr>
            <tr>
                <td colspan="3">账户性质：
                    <input name="yhzhxzDm" id="yhzhxzDm" type="text" class="mini-combobox" style="width: 255px" allowinput="true" onvaluechanged="ckzhzhbg.changeZhxz" required="true" requirederrortext="请选择账户性质" valuefromselect="true"></td>
                <td colspan="3">账户名称：
                    <input name="zhmc" id="_zhmc" type="text" class="mini-textbox" style="width: 255px" vtype="required;maxLength:80" requirederrortext="账户名称不能为空"></td>
            </tr>
            <tr>
                <td colspan="3">行政区划：
                    <input id="xzqhszDm" name="xzqhszDm" type="text" class="mini-combobox" style="width: 255px" required="true" requirederrortext="请选择行政区划" allowinput="true" onvaluechanged="ckzhzhbg.xzqhChaged" valuefromselect="true" emptytext="" nullitemtext=""></td>
            </tr>
            <tr>
                <th colspan="6" class="td-border-bottom">银行账户信息</th>
            </tr>
            <tr height="15"></tr>
            <tr id="hzh-tr">
                <td colspan="3" class="pd-l-1em">核准号：
                    <input name="yhkhdjzh" type="text" id="_yhkhdjzh" class="mini-textbox" vtype="maxLength:30;aphaNumeric" style="width: 255px" requirederrortext="核准号不能为空" maxlengtherrortext="核准号长度不能超过30个字符" data-options="{aphaNumericErrorText:'核准号只能输入数字或字母'}"></td>
                <td><a class="a-tips" onclick="ckzhzhbg.showHzhEg()">示例</a></td>
                <td class="txt-r">发证日期：</td>
                <td>
                    <input name="ffrq" type="text" id="_ffrq" class="mini-datepicker" format="yyyy-MM-dd" ondrawdate="ckzhzhbg.onDrawDate" onvaluechanged="ckzhzhbg.validateFzrq" requirederrortext="发证日期不能为空"></td>
            </tr>
            <tr>
                <td colspan="3">开户银行：
                    <input name="yhhbDm" id="yhhbDm" type="text" class="mini-combobox" required="true" style="width: 100px" onvaluechanged="ckzhzhbg.yhhbChanged" requirederrortext="银行种类名称不能为空" allowinput="true" valuefromselect="true" popupwidth="200" emptytext="" nullitemtext="">
                    <input id="yhyywdDm" name="yhyywdDm" required="true" requirederrortext="银行营业网点名称不能为空" type="text" class="mini-combobox" allowinput="true" valuefromselect="true" style="width: 150px" popupwidth="330" emptytext="" nullitemtext=""></td>
                <td><a class="a-tips" onclick="ckzhzhbg.showKhyhHelp()">帮助</a></td>
                <td class="txt-r">开户日期：</td>
                <td>
                    <input name="khrq" type="text" id="_khrq" class="mini-datepicker" required="true" format="yyyy-MM-dd" ondrawdate="ckzhzhbg.onDrawDate" onvaluechanged="ckzhzhbg.validateKhrq" requirederrortext="开户时间不能为空"></td>
            </tr>
            <tr>
                <td colspan="3">银行账号：
                    <input name="yhzh" type="text" required="true" vtype="maxLength:50" requirederrortext="银行账号不能为空" class="mini-textbox" style="width: 255px"></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td class="pd-l-2em" colspan="6">币种：
                    <input id="bzRadio" class="mini-radiobuttonlist" vtype="required" textfield="MC" valuefield="ID" required="true" onvaluechanged="ckzhzhbg.changeBZRadio" requirederrortext="请选择币种" value="156" data='[{"ID":"156","MC":"人民币元"},{"ID":"840","MC":"美元"},{"ID":"978","MC":"欧元"},{"ID":"0","MC":"其他"}]'>
                    <input id="bzCombox" class="mini-combobox" style="width: 200px" onvaluechanged="ckzhzhbg.changeBZCombox" allowinput="true" valuefromselect="true" enabled="false" requirederrortext="请选择币种">
                    <input id="hbszDm" name="hbszDm" class="mini-hidden"></td>
            </tr>
            <tr>
                <th colspan="6" class="td-border-bottom">退税信息</th>
            </tr>
            <tr height="15"></tr>
            <tr>
                <td colspan="3">出口退税账号：
                    <input id="add-cktszhbz" name="cktszhbz" onvaluechanged="ckzhzhbg.changeCktszhbz" class="mini-radiobuttonlist" textfield="MC" valuefield="ID" required="true" value="N" requirederrortext="请选择出口退税账号" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'>
                    <span style="margin-left: 10px; font-size: 12px; color: #999"></span></td>
                <td colspan="3">是否退税账号：
                    <input id="add-tszhbz" name="tszhbz" onvaluechanged="ckzhzhbg.changeTszhbz" class="mini-radiobuttonlist" textfield="MC" valuefield="ID" required="true" requirederrortext="请选择是否退税账号" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'>
                    <span style="margin-left: 10px; font-size: 12px; color: #999"></span></td>
            </tr>
        </table>
        <div class="footer"><a class="mini-button toolBtn-blue" style="padding: 0 25px" onclick="ckzhzhbg.addRowOk">保存</a> <a class="mini-button toolBtn-white" style="padding: 0 25px" onclick="ckzhzhbg.addRowCancel">取消</a></div>
    </div>
    <div id="hzh" style="display: none;">
        <img src="../../images/ckzhzhbg/hzh-eg.png" width="600" alt="开户许可证"></div>
</div>
<div class="mini-window" id="khxkz-win" style="width: 780px; height: 620px; display: none" title="开户许可证">
    <div class="form-table mb10 txt-c"><span class="txt-c"><span style="font-size: 18px">您是否已办理开户许可证</span><span style="font-size: 16px">(开户许可证类似下图所示)</span></span></div>
    <div class="txt-c">
        <img src="../../images/ckzhzhbg/hzh-eg.png" width="600" alt="开户许可证"></div>
    <div class="txt-c mt20"><a class="mini-button toolBtn-blue" style="padding: 0 25px; height: 34px; width: 99px; font-size: 18px" onclick="ckzhzhbg.confirmY">是</a> <a class="mini-button toolBtn-white" style="padding: 0 25px; height: 34px; width: 99px; font-size: 18px" onclick="ckzhzhbg.confirmN">否</a></div>
</div>
