<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qysdsyhsxbaylView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.qysdsyhsxba.qysdsyhsxbaylView" %>

<!DOCTYPE html>


<h2>预览提交</h2>
<section>
    <div class="main_text">
        <div id="tabs1" class="mini-tabs" activeindex="0" style="width: 1120px; height: 100%; overflow: visible">
            <div title="企业所得税优惠事项备案表">
                <div class="qysdsYhsxBaYl" id="step_yl_form" data-view-type="form">
                    <h3 class="txtCenter">填写纳税人信息</h3>
                    <div class="bandYl txtCenter">（<input name="band" class="mini-textbox" style="border-width: 0px; padding: 0px; width: 50px;" readonly="">）年度</div>
                    <h5>纳税人基本信息</h5>
                    <table class="form-table table_bg">
                        <tr>
                            <th width="15%">纳税人识别号</th>
                            <td width="35%">
                                <input name="nsrsbh" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="15%">纳税人名称</th>
                            <td width="35%">
                                <input name="nsrmc" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">经办人</th>
                            <td width="35%">
                                <input name="jbr" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="15%">联系人</th>
                            <td width="35%">
                                <input name="lxdh" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                    </table>
                    <h5>备案情况</h5>
                    <table class="form-table table_bg">
                        <tr>
                            <th width="15%" style="vertical-align: text-top;">优惠事项名称</th>
                            <td colspan="6">
                                <input name="yhsxmc" class="mini-textarea" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">备案类别</th>
                            <td colspan="6">
                                <input name="balbText" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">优惠有效期起</th>
                            <td width="35%" colspan="3">
                                <input name="yhyxqq" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="15%">优惠有效期止</th>
                            <td width="35%" colspan="2">
                                <input name="yhyxqz" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%" style="vertical-align: text-top;">主要政策依据文件及文件号</th>
                            <td colspan="6">
                                <input name="zcyj" class="mini-textarea" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">具备相关资格的批准文件（证书）及文号（编号）</th>
                            <td colspan="6">
                                <input name="xgzg" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">文件（证书）有效期起</th>
                            <td width="35%" colspan="3">
                                <input name="wjyxqq" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="15%">文件（证书）有效期止</th>
                            <td width="35%" colspan="2">
                                <input name="wjyxqz" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">有关情况说明</th>
                            <td colspan="6">
                                <input name="ygqksm" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th width="15%">企业留存备查资料清单</th>
                            <td colspan="6">
                                <input name="qylczlqd" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th rowspan="3" style="vertical-align: text-top;">企业说明</th>
                            <td colspan="6" class="txtLeft">我单位已知悉本优惠事项全部相关政策和管理要求。此表是根据《中华人民共和国企业所得税法》及其实施条例和 国家税收规定填报的，是真实、完整的，提交的资料真实、合法、有效。</td>
                        </tr>
                        <tr>
                            <td colspan="6" class="txtRight">（企业公章）</td>
                        </tr>
                        <tr>
                            <th width="8%">财务负责人</th>
                            <td width="12%">
                                <input name="cwfzr" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="15%">法定代表人（负责人）</th>
                            <td width="15%">
                                <input name="fddbr" class="mini-textbox" width="100%" readonly=""></td>
                            <td width="10%"></td>
                            <th width="20%" class="txtLeft">
                                <input name="xtsj" class="mini-textbox" width="100%" readonly="">（系统时间）</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div title="汇总纳税企业分支机构已备案优惠事项清单">
                <div class="fzjgbaqk">
                    <div class="area-title">分支机构备案情况表</div>
                    <div data-view-type="datagrid">
                        <div id="fzjgbGrid_yl" class="mini-datagrid" style="width: 1100px; height: 280px;" allowresize="false" showemptytext="true" autoload="false" enabled="false" allowcelledit="true" allowcellselect="false" showpager="false" idfield="id" multiselect="true">
                            <div property="columns">
                                <div type="indexcolumn" width="78" headeralign="center">序号</div>
                                <div field="nsrsbh_fz" width="220" headeralign="center" allowsort="true" vtype="required">纳税人识别号</div>
                                <div field="nsrmc_fz" width="220" headeralign="center" allowsort="true" vtype="required">分支机构名称</div>
                                <div field="swjgMc" width="220" headeralign="center" allowsort="true" vtype="required">分支机构主管税务机关</div>
                                <div field="yhsxmc_fz" width="220" headeralign="center" allowsort="true" vtype="required">优惠项目</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div title="附报资料">
                <div class="bszl" data-view-type="datagrid">
                    <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 100%; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="fbzlMc" class="xxxxx">资料名称</div>
                            <div field="scCount">上传数量</div>
                            <div field="applyStatus" renderer="onRenderApply">要求</div>
                            <div field="status" renderer="ylonRenderOpearte" align="center">操作</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
