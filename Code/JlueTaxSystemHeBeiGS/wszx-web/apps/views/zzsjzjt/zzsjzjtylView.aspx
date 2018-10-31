<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsjzjtylView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.zzsjzjt.zzsjzjtylView" %>

<!DOCTYPE html>

<h2>预览提交</h2>
<section>
    <div class="zzsjzjtbaYl" id="step_yl_form" data-view-type="form">
        <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%; height: auto;">
            <div title="增值税即征即退备案">
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
                <div data-view-type="datagrid">
                    <div id="jzjt1_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enable="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div field="jmsspsxMc" headeralign="center" align="center">税务资格备案事项</div>
                            <div field="zspmMc" headeralign="center" align="center">征收品目</div>
                            <div field="jmzcMc" headeralign="center" align="center">减免政策名称</div>
                            <div field="jmxzdlMc" headeralign="center" align="center">减免性质大类</div>
                            <div field="jmxzxlMc" headeralign="center" align="center">减免性质小类</div>
                            <div field="jmlxMc" headeralign="center" align="center">减免类型</div>
                            <div field="jmqxq" headeralign="center" align="center">减免有效期起</div>
                            <div field="jmqxz" headeralign="center" align="center">减免有效期止</div>
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
