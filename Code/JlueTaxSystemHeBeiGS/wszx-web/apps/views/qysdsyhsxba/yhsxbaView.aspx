<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="yhsxbaView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.qysdsyhsxba.yhsxbaView" %>

<!DOCTYPE html>


<h2>企业所得税优惠信息备案</h2>
<section>
    <div id="step_tx_form">
        <div class="main-content" id="dataGrid">
            <h1 class="form-title">企业所得税优惠事项备案表</h1>
            <div class="band">（<input id="band_ba" name="band" class="mini-textbox" required="true" style="border-width: 0px; padding: 0px; width: 40px;">）年度</div>
            <div class="nsrjbxx-area">
                <table>
                    <tr>
                        <td colspan="4" class="title">纳税人基本信息</td>
                    </tr>
                    <tr>
                        <td width="15%">纳税人识别号</td>
                        <td>
                            <input class="mini-hidden" name="djxh" id="djxh" style="display: none">
                            <input class="mini-hidden" name="swjgdm" id="swjgdm" style="display: none">
                            <input class="mini-hidden" name="bz" id="bz" style="display: none">
                            <input id="nsrsbh" name="nsrsbh" class="mini-textbox" width="100%" enabled="false"></td>
                        <td align="center">纳税人名称</td>
                        <td>
                            <input id="nsrmc" name="nsrmc" class="mini-textbox" width="100%" enabled="false"></td>
                    </tr>
                    <tr>
                        <td>经办人</td>
                        <td>
                            <input name="jbr" class="mini-textbox" width="100%" vtype="maxLength:20" required="true" requirederrortext="请输入经办人"></td>
                        <td align="center">联系电话</td>
                        <td>
                            <input name="lxdh" class="mini-textbox" width="100%" required="true" requirederrortext="请输入联系电话" onvaluechanged="qysdsyhsxba.onSjhmValidation"></td>
                    </tr>
                </table>
            </div>
            <div class="baqk-area">
                <table>
                    <tr>
                        <td colspan="4" class="title">备案情况</td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top" width="15%">优惠事项名称</td>
                        <td colspan="3">
                            <input class="mini-hidden" name="yhsx" id="yhsx" style="display: none">
                            <input class="mini-hidden" name="sysDate" id="sysDate" style="display: none">
                            <input name="yhsxmc" id="yhsxmc" class="mini-textarea" width="100%" enabled="false"></td>
                    </tr>
                    <tr>
                        <td>备案类别</td>
                        <td colspan="3">
                            <input class="mini-combobox" id="balb" name="balb" width="100%" data='[{id: "1", mc:"正常备案"}, {id: "2", mc:"变更备案"}]' textfield="mc" valuefield="id" value="1" required="true" requirederrortext="请选择备案类别"></td>
                    </tr>
                    <tr>
                        <td>优惠有效期起</td>
                        <td>
                            <input name="yhyxqq" id="yhyxqq" class="mini-monthpicker" format="yyyy-MM-dd" width="100%" required="true" requirederrortext="请选择优惠有效期起" onvaluechanged="qysdsyhsxba.ValidateYHqzrq"></td>
                        <td align="center">优惠有效期止</td>
                        <td>
                            <input name="yhyxqz" id="yhyxqz" class="mini-monthpicker" format="yyyy-MM-dd" width="100%" required="true" requirederrortext="请选择优惠有效期止" onvaluechanged="qysdsyhsxba.ValidateYHqzrq"></td>
                    </tr>
                    <tr height="auto">
                        <td style="vertical-align: top">主要政策依据文件及文件号：</td>
                        <td colspan="3">
                            <input name="zcyj" id="zcyj" class="mini-textarea" width="100%" height="auto" vtype="maxLength:2000" required="true" requirederrortext="请输入主要政策依据文件及文件号"></td>
                    </tr>
                    <tr>
                        <td>具备相关资格的批准文件（证书）及文号（编号）：</td>
                        <td colspan="3">
                            <input name="xgzg" id="xgzg" class="mini-textarea" width="100%" vtype="maxLength:1000"></td>
                    </tr>
                    <tr>
                        <td>文件（证书）有效期起</td>
                        <td>
                            <input name="wjyxqq" id="wjyxqq" class="mini-datepicker" format="yyyy-MM-dd" width="100%" onvaluechanged="qysdsyhsxba.ValidateWJqzrq"></td>
                        <td align="center" width="150">文件（证书）有效期止</td>
                        <td>
                            <input name="wjyxqz" id="wjyxqz" class="mini-datepicker" format="yyyy-MM-dd" width="100%" onvaluechanged="qysdsyhsxba.ValidateWJqzrq"></td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top">有关情况说明：</td>
                        <td colspan="3">
                            <input name="ygqksm" class="mini-textarea" width="100%" vtype="maxLength:1000" required="true" requirederrortext="请输入有关情况说明"></td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top">企业留存备查资料清单：</td>
                        <td colspan="3">
                            <input name="qylczlqd" class="mini-textarea" width="100%" vtype="maxLength:1000"></td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top">企业说明：</td>
                        <td colspan="3" style="border: 1px #a5acb5 solid; padding: 10px 5px; background: #eee">我单位已知悉本优惠事项全部相关政策和管理要求。此表是根据《中华人民共和国企业所得税法》及其实施条例和 国家税收规定填报的，是真实、完整的，提交的资料真实、合法、有效。<div style="height: 75px"><span style="float: right; margin-top: 25px">（企业公章）</span></div>
                            <div>财务负责人：<input name="cwfzr" class="mini-textbox" width="160" vtype="maxLength:20" required="true" requirederrortext="请输入财务负责人">
                                <span style="margin-left: 20px">法定代表人（负责人）：</span><input name="fddbr" class="mini-textbox" width="160" vtype="maxLength:20" required="true" requirederrortext="请输入法定代表人（负责人）">
                                <span>
                                    <input id="xtsj" name="xtsj" class="mini-textbox" width="160" readonly=""></span>（系统时间）</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input class="mini-hidden" name="shyj" id="shyj" style="display: none">
                            <input class="mini-hidden" name="shr" id="shr" style="display: none"></td>
                        <td colspan="3" style="height: 60px">
                            <div id="fzjghzqd" style="display: none"><span style="font-weight: bold">您属于跨地区汇总纳税企业，需要填写</span> <a href="javascript:void(0)" style="color: red; margin-left: 20px; font-weight: bold" onclick="openWin()">跨地区汇总纳税企业分支机构已备案优惠事项清单表</a></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</section>
