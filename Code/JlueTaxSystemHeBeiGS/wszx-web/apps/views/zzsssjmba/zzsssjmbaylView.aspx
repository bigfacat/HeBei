<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsssjmbaylView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.zzsssjmba.zzsssjmbaylView" %>

<!DOCTYPE html>

<h2>预览提交</h2>
<section>
    <div class="wcjykjYl" id="step_yl_form" data-view-type="form">
        <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%; height: auto;">
            <div title="增值税税收减免备案">
                <h5>纳税人基本信息</h5>
                <table class="form-table table_bg">
                    <tr>
                        <th width="15%">纳税人识别号：</th>
                        <td width="35%">
                            <input name="nsrsbh" class="mini-textbox" width="100%" readonly=""></td>
                        <th width="15%">纳税人名称：</th>
                        <td width="35%">
                            <input name="nsrmc" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                    <tr>
                        <th width="15%">登记注册类型：</th>
                        <td width="35%">
                            <input name="djzclx" class="mini-textbox" width="100%" readonly=""></td>
                        <th width="15%">生产经营地址：</th>
                        <td width="35%">
                            <input name="scjydz" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                </table>
                <h5>减免税备案登记表</h5>
                <table class="form-table table_bg">
                    <tr>
                        <th width="15%">合同名称：</th>
                        <td width="35%">
                            <input name="htmc" class="mini-textbox" width="100%" readonly=""></td>
                        <th width="15%">合同编号：</th>
                        <td width="35%">
                            <input name="htbh" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                    <tr>
                        <th>减免有效期起：</th>
                        <td>
                            <input name="jmqxq" class="mini-textbox" width="100%" readonly=""></td>
                        <th>减免有效期止：</th>
                        <td>
                            <input name="jmqxz" class="mini-textbox" width="100%" readonly=""></td>
                    </tr>
                </table>
                <div data-view-type="datagrid">
                    <div id="jms1_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="false" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div field="swsxmc" vtype="required">税收优惠事项</div>
                            <div field="ssjmxzmc" vtype="required">减免政策名称</div>
                            <div field="ssjmxzdlmc" vtype="required">减免性质大类</div>
                            <div field="ssjmxzxlmc" vtype="required">减免性质小类</div>
                            <div field="jmzlxmc" vtype="required">减免征类型</div>
                            <div field="jmlxmc" vtype="required">减免类型</div>
                            <div field="jzed" vtype="required">减征额度</div>
                            <div field="jzfd" vtype="required">减征幅度</div>
                            <div field="jzsl" vtype="required">减征税率</div>
                        </div>
                    </div>
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
    </div>
</section>
