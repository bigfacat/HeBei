<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xzaxgmylView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.xzaxgmnsrns.xzaxgmylView" %>

<!DOCTYPE html>


<h2>预览提交</h2>
<section>
    <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%; height: auto;">
        <div title="按小规模纳税人纳税的情况说明">
            <div class="xzaxgmylView" id="step_yl_form" data-view-type="form">
                <h5>填写纳税人信息</h5>
                <table class="form-table table_bg">
                    <tr>
                        <th style="width: 170px;">纳税人识别号</th>
                        <td>
                            <input name="nsrsbh" class="mini-textbox" width="100%" readonly=""></td>
                        <th style="width: 170px;">纳税人名称</th>
                        <td>
                            <input name="nsrmc" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                </table>
                <h5>连续不超过12个月的经营期内累计应税销售额：</h5>
                <table class="form-table table_bg">
                    <tr>
                        <td class="text-left" colspan="6">货物劳务</td>
                    </tr>
                    <tr>
                        <th style="width: 10%;">计算时间起</th>
                        <td style="width: 20%;">
                            <input name="hwjssjq" class="mini-textbox" width="100%" readonly=""></td>
                        <th style="width: 10%;">计算时间止</th>
                        <td style="width: 20%;">
                            <input name="hwjssjz" class="mini-textbox" width="100%" readonly=""></td>
                        <th style="width: 10%;">共</th>
                        <td style="width: 20%;">
                            <input name="hwlwhj" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                    <tr>
                        <td class="text-left" colspan="6">应税服务</td>
                    </tr>
                    <tr>
                        <th style="width: 10%;">计算时间起</th>
                        <td style="width: 20%;">
                            <input name="ysjssjq" class="mini-textbox" width="100%" readonly=""></td>
                        <th style="width: 10%;">计算时间止</th>
                        <td style="width: 20%;">
                            <input name="ysjssjz" class="mini-textbox" width="100%" readonly=""></td>
                        <th style="width: 10%;">共</th>
                        <td style="width: 20%;">
                            <input name="ysfwhj" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                    <tr>
                        <td class="text-left" colspan="6">情况说明</td>
                    </tr>
                    <tr>
                        <td class="text-left" colspan="6">
                            <input name="qksm" class="mini-textarea" width="100%" readonly=""></td>
                    </tr>
                </table>
            </div>
        </div>
        <div title="附报资料">
            <div data-view-type="datagrid">
                <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 1160px; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
                    <div property="columns">
                        <div type="indexcolumn" width="50">序号</div>
                        <div field="fbzlMc" class="xxxxx">资料名称</div>
                        <div field="scCount">上传数量</div>
                        <div field="bslxDm" renderer="onRenderApply">要求</div>
                        <div field="status" renderer="ylonRenderOpearte" align="center">操作</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
