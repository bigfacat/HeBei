<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xxbgView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.cwkjzdba.xxbgView" %>

<!DOCTYPE html>


<h2>填写申请表</h2>
<section class="txsq">
    <h3 class="txt-c">财务会计制度及核算软件备案报告书</h3>
    <div class="txt-c" style="background: #f9f9f9; margin-bottom: 20px; padding: 20px 0">
        <table width="100%">
            <tr>
                <td class="txt-r" height="35">纳税人识别号：</td>
                <td class="txt-l" id="nsrsbh" name="nsrsbh"></td>
                <td class="txt-r">纳税人名称：</td>
                <td class="txt-l" id="nsrmc" name="nsrmc"></td>
            </tr>
        </table>
    </div>
    <div class="form-table" id="cwkjzdbas">
        <input style="width: 100%" class="mini-hidden" id="nsrsbh_hidden" name="nsrsbh_hidden">
        <input style="width: 100%" class="mini-hidden" id="nsrmc_hidden" name="nsrmc_hidden"><p><strong class="text-red">*</strong> 表示必填</p>
        <table width="70%" height="450">
            <tr>
                <td class="txt-r">财务会计制度<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjzdzzDm" name="kjzdzzDm" style="width: 100%;" class="mini-combobox" onvaluechanged="cwkjzdba.showCwbbxx" required="true" requirederrortext="财务会计制度不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">低值易耗品摊销方法<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="dzyhptxffDm" name="dzyhptxffDm" style="width: 100%" class="mini-combobox" required="true" requirederrortext="低值易耗品摊销方法不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">折旧方法<strong class="text-red">*</strong>：</td>
                <td class="search-item-control">
                    <input id="zjfsdlDm" name="zjfsdlDm" style="width: 100%;" class="mini-combobox" emptytext="大类" onvaluechanged="cwkjzdba.zjffValueChange" required="true" requirederrortext="折旧方法大类不能为空"></td>
                <td class="search-item-control" width="46%">
                    <input id="zjfsxlDm" name="zjfsxlDm" style="width: 100%;" class="mini-combobox" emptytext="小类" required="true" requirederrortext="折旧方法小类不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">会计报表名称<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjbb" name="kjbb" style="width: 100%;" class="mini-textbox" required="true" readonly="readonly" requirederrortext="会计报表名称不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">会计制度执行期起<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="yxqq" name="yxqq" format="yyyy-MM" style="width: 100%;" class="mini-datepicker" readonly="readonly" requirederrortext="会计制度执行期起不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">成本核算方法<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="cbhsffDm" name="cbhsffDm" style="width: 100%;" class="mini-combobox" required="true" requirederrortext="成本核算方法不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">会计报表报送期限<strong class="text-red">*</strong>：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjbbbsqxDm" name="kjbbbsqxDm" style="width: 100%;" class="mini-combobox" required="true" requirederrortext="会计报表报送期限不能为空"></td>
            </tr>
            <tr>
                <td class="txt-r">软件名称：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjhsrjmc" name="kjhsrjmc" style="width: 100%;" class="mini-textbox" vtype="rangeChar:0,10" required="false" rangecharerrortext="软件名称字符数必须在 0 到 10 之间"></td>
            </tr>
            <tr>
                <td class="txt-r">数据库名称：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjhsrjsjklxmc" name="kjhsrjsjklxmc" style="width: 100%;" class="mini-combobox"></td>
            </tr>
            <tr>
                <td class="txt-r">软件启用时间：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjhsrjqysj" name="kjhsrjqysj" format="yyyy-MM-dd" style="width: 100%;" class="mini-datepicker"></td>
            </tr>
            <tr>
                <td class="txt-r">版本号：</td>
                <td class="search-item-control" colspan="2">
                    <input id="kjhsrjbbh" name="kjhsrjbbh" style="width: 100%;" class="mini-textbox" vtype="rangeChar:0,10" minlengtherrortext="必填项最大10个字符"></td>
            </tr>
            <tr style="display: none">
                <td class="txt-r"></td>
                <td class="search-item-control" colspan="2">
                    <input id="sbbDm" name="sbbDm" style="width: 100%;" class="mini-textbox" required="true" value=""></td>
            </tr>
        </table>
        <div class="txt-c pt20">
            <button id="closeBtn" class="button-blue" style="padding: 7px 30px; font-size: 14px">关闭</button></div>
    </div>
</section>
