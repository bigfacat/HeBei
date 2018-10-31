<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xzaxgmView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.xzaxgmnsrns.xzaxgmView" %>

<!DOCTYPE html>


<h2>选择按小规模纳税人纳税的情况说明</h2>
<section>
    <div id="step_tx_form" data-view-type="form">
        <div id="xgmnsrxx" style="height: 500px">
            <h4>纳税人基本信息</h4>
            <table class="form-table table_bg">
                <tr>
                    <th style="width: 170px;">纳税人识别号</th>
                    <td>
                        <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
                    <th style="width: 170px;">纳税人名称</th>
                    <td>
                        <input id="nsrmc" name="nsrmc" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
                </tr>
            </table>
            <h5>连续不超过12个月的经营期内累计应税销售额：</h5>
            <table class="form-table">
                <tr>
                    <td class="text-left" colspan="6">货物劳务</td>
                </tr>
                <tr>
                    <th style="width: 170px;"><span style="color: red">*</span>计算时间起</th>
                    <td>
                        <input id="hwjssjq" name="hwjssjq" class="mini-datepicker" format="yyyy-MM-dd" required="true" onvaluechanged="onValueChanged1" ondrawdate="onDrawDate1"></td>
                    <th style="width: 170px;"><span style="color: red">*</span>计算时间止</th>
                    <td>
                        <input id="hwjssjz" name="hwjssjz" class="mini-datepicker" format="yyyy-MM-dd" required="true" onvaluechanged="onValueChanged2" ondrawdate="onDrawDate2"></td>
                    <th style="width: 100px;"><span style="color: red">*</span>共</th>
                    <td>
                        <input id="hwlwhj" name="hwlwhj" class="mini-moneybox" datatype="float" vtype="required" requirederrortext="货物劳务金额不能为空"></td>
                </tr>
                <tr>
                    <td class="text-left" colspan="6">应税服务</td>
                </tr>
                <tr>
                    <th style="width: 170px;"><span style="color: red">*</span>计算时间起</th>
                    <td>
                        <input id="ysjssjq" name="ysjssjq" class="mini-datepicker" format="yyyy-MM-dd" required="true" onvaluechanged="onValueChanged3" ondrawdate="onDrawDate3"></td>
                    <th style="width: 170px;"><span style="color: red">*</span>计算时间止</th>
                    <td>
                        <input id="ysjssjz" name="ysjssjz" class="mini-datepicker" format="yyyy-MM-dd" required="true" onvaluechanged="onValueChanged4" ondrawdate="onDrawDate4"></td>
                    <th style="width: 100px;"><span style="color: red">*</span>共</th>
                    <td>
                        <input id="ysfwhj" name="ysfwhj" class="mini-moneybox" datatype="float" vtype="required" requirederrortext="应税服务金额不能为空"></td>
                </tr>
                <tr>
                    <td class="text-left" colspan="6">情况说明</td>
                </tr>
                <tr>
                    <td class="text-left" colspan="6">
                        <input class="mini-textarea" id="qksm" name="qksm" vtype="required" requirederrortext="情况说明不能为空" width="100%" height="100px"></td>
                </tr>
            </table>
        </div>
    </div>
</section>
