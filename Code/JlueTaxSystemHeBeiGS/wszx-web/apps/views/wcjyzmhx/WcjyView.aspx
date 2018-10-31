<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WcjyView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wcjyzmhx.WcjyView" %>

<!DOCTYPE html>


<h2>跨区域涉税事项报验登记缴销</h2>
<section>
    <div id="step_tx_form">
        <h5>纳税人基本信息</h5>
        <div class="table_bg table_div">
            <table class="form-table table_bg" width="80%">
                <tr>
                    <th width="16%">纳税人识别号：</th>
                    <td width="34%">
                        <input id="nsrsbh" name="nsrsbh" class="mini-textbox" value="" enabled="false" width="100%" vtype="required;"></td>
                    <th width="16%">纳税人名称：</th>
                    <td width="34%">
                        <input id="nsrmc" name="nsrmc" class="mini-textbox" value="" enabled="false" vtype="required;specialChar;maxLength:40" width="100%"></td>
                </tr>
                <tr>
                    <th>证明有效期起：</th>
                    <td>
                        <input class="mini-textbox" width="100%" value="" id="zmyxqq" enabled="false" name="zmyxqq" required="true" textfield="MC" valuefield="ID" url=""></td>
                    <th>证明有效期止：</th>
                    <td>
                        <input id="zmyxqz" name="zmyxqz" class="mini-textbox" value="" enabled="false" vtype="required;specialChar;maxLength:80" width="100%"></td>
                </tr>
                <tr>
                    <th>实际经营期起：</th>
                    <td>
                        <input class="mini-textbox" width="100%" value="" id="sjjyqq" enabled="false" name="sjjyqq" required="true" textfield="MC" valuefield="ID" url=""></td>
                    <th>实际经营期止：</th>
                    <td>
                        <input id="sjjyqz" name="sjjyqz" class="mini-textbox" value="" enabled="false" vtype="required;specialChar;maxLength:80" width="100%"></td>
                </tr>
                <tr>
                    <th>到达日期：</th>
                    <td>
                        <input class="mini-textbox" width="100%" value="" id="ddrq" enabled="false" name="ddrq" required="true" textfield="MC" valuefield="ID" url=""></td>
                    <th>报验日期：</th>
                    <td>
                        <input id="byrq" name="byrq" class="mini-textbox" value="" enabled="false" vtype="required;specialChar;maxLength:80" width="100%"></td>
                </tr>
                <tr>
                    <th>经营地点：</th>
                    <td>
                        <input class="mini-textbox" width="100%" value="" id="jydd" enabled="false" name="jydd" required="true" textfield="MC" valuefield="ID" url=""></td>
                    <th>货物存放地点：</th>
                    <td>
                        <input id="hwcfdd" name="hwcfdd" class="mini-textbox" value="" enabled="false" vtype="specialChar;maxLength:80" width="100%"></td>
                </tr>
            </table>
        </div>
        <table class="form-table">
            <tr>
                <th style="width: 220px;"><span style="color: red">*</span>跨区域涉税事项报验管理编号：</th>
                <td style="width: 300px;">
                    <input id="wcjyhdssglzmbh" name="wcjyhdssglzmbh" class="mini-combobox" valuefromselect="true" style="width: 280px;" textfield="wcjyhdssglzmbh" valuefield="wcjyzmuuid" datafield="value" requirederrortext="跨区域涉税事项报验管理编号不能为空" multiselect="false" allowinput="false" url="wcjyzmhxService.Api.getWgzbh" popupwidth="100%" required="true" showclose="true" onvaluechanged="wcjyzmhx.OnWgzbhChanged"></td>
                <th style="width: 220px;"></th>
                <td></td>
            </tr>
        </table>
        <h5>跨区域涉税事项报验登记缴销—外出经营情况</h5>
        <div class="grid-toolbar wc_tool" data-bind-grid="wcjyzmhx_grid"><a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="wssqUtil.addRow('wcjyzmhx_grid','win1')">增加</a> <a class="mini-button grid-edit" iconcls="icon-edit">修改</a> <a class="mini-button grid-save" iconcls="icon-save">保存</a> <a class="mini-button grid-remove" iconcls="icon-remove">删除</a></div>
        <div id="wcjyzmhx_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="wcjyhwmc" vtype="required"><span style="color: red">*</span>货物（服务）名称<input property="editor" class="mini-textbox" required="true"></div>
                <div field="yjskzsl" width="160" vtype="required" datatype="float"><span style="color: red">*</span>预缴税款征收率（2%或3%）<input property="editor" class="mini-combobox" required="true" textfield="MC" valuefield="ID" data='[{"ID":"0.02","MC":"2%"},{"ID":"0.03","MC":"3%"} ]'></div>
                <div field="yyjskje" width="100" vtype="required" datatype="float"><span style="color: red">*</span>已缴纳税款金额
                    <input property="editor" class="mini-moneybox" required="true"></div>
                <div field="sjhtje" width="120" vtype="required,float"><span style="color: red">*</span>实际合同金额<input property="editor" class="mini-moneybox" required="true"></div>
                <div field="kjfpjezk" width="120" datatype="float">开具发票金额（自开）<input property="editor" class="mini-moneybox"></div>
                <div field="kjfpjedk" width="120" datatype="float">开具发票金额（代开）<input property="editor" class="mini-moneybox"></div>
                <div field="ybyjskje" width="120" vtype="required" datatype="float"><span style="color: red">*</span>应补预缴税款金额<input property="editor" class="mini-moneybox" required="true"></div>
            </div>
        </div>
        <h5>缴款信息情况</h5>
        <div class="grid-toolbar wc_tool" data-bind-grid="jkxx_grid"><a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="wssqUtil.addRow('jkxx_grid','win2')">增加</a> <a class="mini-button grid-edit" iconcls="icon-edit">修改</a> <a class="mini-button grid-save" iconcls="icon-save">保存</a> <a class="mini-button grid-remove" iconcls="icon-remove">删除</a></div>
        <div id="jkxx_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" oncellbeginedit="onJkxxCellBeginEdit" oncellcommitedit="oncellcommitedit" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="pzzlDm" displayfield="pzzlDmText" vtype="required"><span style="color: red">*</span>完税凭证种类<input property="editor" class="mini-combobox" data="wcjyzmhx.pzzlDmData" required="true" valuefield="ID" textfield="MC"></div>
                <div field="pzhm">完税凭证号码
                    <input property="editor" class="mini-textbox"></div>
                <div field="dzsphm">电子税票号码
                    <input property="editor" class="mini-textbox" required="true"></div>
                <div field="zsxmDm" displayfield="zsxmDmText" width="120" vtype="required"><span style="color: red">*</span>征收项目
                    <input property="editor" class="mini-combobox" required="true" valuefield="ID" textfield="MC" data="wcjyzmhx.zsxmDmData" onvaluechanged="wcjyzmhx.onZsxmDmChanged"></div>
                <div field="zspmDm" displayfield="zspmDmText" width="120" vtype="required"><span style="color: red">*</span>征收品目<input property="editor" class="mini-combobox" required="true" valuefield="ID" textfield="MC"></div>
                <div field="sjje" width="120" vtype="required" datatype="float"><span style="color: red">*</span>税额<input property="editor" class="mini-moneybox" required="true"></div>
            </div>
        </div>
    </div>
</section>
