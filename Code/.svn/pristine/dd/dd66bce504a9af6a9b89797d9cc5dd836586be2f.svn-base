<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WcjyylView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wcjyzmhx.WcjyylView" %>

<!DOCTYPE html>

<h2>预览</h2>
<section>
    <div class="wcjykjYl" id="step_yl_form" data-view-type="form">
        <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%;">
            <div title="外出经营核销证明申请">
                <h5>纳税人基本信息</h5>
                <div class="table_bg table_div">
                    <table class="form-table table_bg" width="80%">
                        <tr>
                            <th width="20%">纳税人识别号：</th>
                            <td width="30%">
                                <input name="nsrsbh" class="mini-textbox" width="100%" readonly=""></td>
                            <th width="16%">纳税人名称：</th>
                            <td width="30%">
                                <input name="nsrmc" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th>证明有效期起：</th>
                            <td>
                                <input name="zmyxqq" class="mini-textbox" width="100%" readonly=""></td>
                            <th>证明有效期止：</th>
                            <td>
                                <input name="zmyxqz" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th>实际经营期起：</th>
                            <td>
                                <input name="sjjyqq" class="mini-textbox" width="100%" readonly=""></td>
                            <th>实际经营期止：</th>
                            <td>
                                <input name="sjjyqz" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th>到达日期：</th>
                            <td>
                                <input name="ddrq" class="mini-textbox" width="100%" readonly=""></td>
                            <th>报验日期：</th>
                            <td>
                                <input name="byrq" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th>经营地点：</th>
                            <td>
                                <input name="jydd" class="mini-textbox" width="100%" readonly=""></td>
                            <th>货物存放地点：</th>
                            <td>
                                <input name="hwcfdd" class="mini-textbox" width="100%" readonly=""></td>
                        </tr>
                        <tr>
                            <th>跨区域涉税事项报验管理编号：</th>
                            <td>
                                <input name="wcjyhdssglzmbhText" class="mini-textbox" width="100%" readonly=""></td>
                            <th></th>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <h5>货物或服务信息</h5>
                <div data-view-type="datagrid">
                    <div id="wcjyzmhx1_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="wcjyhwmc" vtype="required">货物（服务）名称</div>
                            <div field="yjskzsl" width="160" vtype="required" datatype="float">预缴税款征收率（2%或3%）</div>
                            <div field="yyjskje" width="100" vtype="required" datatype="float">已缴纳税款金额</div>
                            <div field="sjhtje" width="120" vtype="required,float">实际合同金额</div>
                            <div field="kjfpjezk" width="120" vtype="required" datatype="float">开具发票金额（自开）</div>
                            <div field="kjfpjedk" width="120" vtype="required" datatype="float">开具发票金额（代开）</div>
                            <div field="ybyjskje" width="120" vtype="required" datatype="float">应补预缴税款金额</div>
                        </div>
                    </div>
                </div>
                <h5>缴款信息情况</h5>
                <div data-view-type="datagrid">
                    <div id="jkxx1_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="pzzlDm" displayfield="pzzlDmText" vtype="required">完税凭证种类</div>
                            <div field="pzhm">完税凭证号码</div>
                            <div field="dzsphm">电子税票号码</div>
                            <div field="zsxmDm" displayfield="zsxmDmText" width="100" vtype="required">征收项目</div>
                            <div field="zspmDm" displayfield="zspmDmText" width="120" vtype="required,float">征收品目</div>
                            <div field="sjje" width="120" vtype="required,float">税额</div>
                        </div>
                    </div>
                </div>
            </div>
            <div title="附报资料">
                <div class="bszl" data-view-type="datagrid">
                    <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 100%; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="zlName" class="xxxxx">资料名称</div>
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
