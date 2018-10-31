<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpdsylView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpds.fpdsylView" %>

<!DOCTYPE html>


<h2>预览提交</h2>
<section class="third-yltj">
    <div class="fpdsYl">
        <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%;">
            <div title="申请表">
                <h5>纳税人信息</h5>
                <div class="table_bg table_div">
                    <table class="form-table table_bg" data-view-type="form" id="yl-fpxx">
                        <tr>
                            <th style="width: 170px;">销货方纳税人识别号</th>
                            <td id="nsrsbh_view">
                                <input name="nsrsbh" class="mini-textbox" readonly="true"></td>
                            <th style="width: 170px;">销货方名称</th>
                            <td id="nsrmc_view">
                                <input name="nsrmc" class="mini-textbox" readonly="true"></td>
                        </tr>
                        <tr>
                            <th style="width: 170px;">购货方纳税人识别号</th>
                            <td id="ghfnsrsbh_view">
                                <input name="ghfnsrsbh" class="mini-textbox" readonly="true"></td>
                            <th style="width: 170px;">购货方名称</th>
                            <td id="ghfmc_view">
                                <input name="ghfmc" class="mini-textbox" readonly="true"></td>
                        </tr>
                        <tr>
                            <th style="width: 170px;">发票代码</th>
                            <td id="fpdm_view">
                                <input name="fpdm" class="mini-textbox" readonly="true"></td>
                            <th style="width: 170px;">发票号码</th>
                            <td id="fphm_view">
                                <input name="fphm" class="mini-textbox" readonly="true"></td>
                        </tr>
                    </table>
                </div>
                <h5>发票信息</h5>
                <div data-view-type="datagrid">
                    <div id="fpds1_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="false" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="hwlwmc" vtype="required">货物（服务）名称</div>
                            <div field="dj" width="160" vtype="required">单价</div>
                            <div field="sl" width="100" vtype="required">数量</div>
                            <div field="je" width="120" vtype="required" datatype="float">金额</div>
                            <div field="se" width="120" vtype="required" datatype="float">税额</div>
                        </div>
                    </div>
                </div>
                <h5>报税信息</h5>
                <table class="form-table" id="yl-bsxx" data-view-type="form">
                    <tr>
                        <th style="width: 170px;">报税日期</th>
                        <td id="byrq_view">
                            <input name="byrq" class="mini-datepicker" format="yyyy-MM-dd" readonly="true"></td>
                        <th style="width: 170px;">纳税申报日期</th>
                        <td id="nssbrq_view">
                            <input name="nssbrq" class="mini-datepicker" format="yyyy-MM-dd" readonly="true"></td>
                    </tr>
                    <tr>
                        <th style="width: 170px;">税款所属期起</th>
                        <td id="skssqq_view">
                            <input name="skssqq" class="mini-datepicker" format="yyyy-MM-dd" readonly="true"></td>
                        <th style="width: 170px;">税款所属期止</th>
                        <td id="skssqz_view">
                            <input name="skssqz" class="mini-datepicker" format="yyyy-MM-dd" readonly="true"></td>
                    </tr>
                </table>
            </div>
            <div title="附报资料">
                <div class="bszl" data-view-type="datagrid">
                    <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 100%; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
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
