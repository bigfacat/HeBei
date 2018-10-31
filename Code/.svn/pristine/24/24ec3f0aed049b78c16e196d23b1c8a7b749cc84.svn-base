<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fpdsView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpds.fpdsView" %>

<!DOCTYPE html>


<h2>丢失增值税专用发票已报税证明申请</h2>
<section>
    <div id="fpds">
        <h5>填写纳税人信息</h5>
        <div id="fpxx">
            <table class="form-table table_bg">
                <tr>
                    <th style="width: 170px;">销货方纳税人识别号</th>
                    <td>
                        <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 280px;" required="true" requirederrortext="销货方纳税人识别号不能为空"></td>
                    <th style="width: 170px;">销货方名称</th>
                    <td>
                        <input id="nsrmc" name="nsrmc" class="mini-textbox" value="" enabled="false" vtype="specialChar;maxLength:40" required="true" requirederrortext="销货方名称不能为空" style="width: 280px;"></td>
                </tr>
            </table>
            <table class="form-table">
                <tr>
                    <th style="width: 170px;"><span style="color: red">*</span>购货方纳税人识别号</th>
                    <td>
                        <input id="ghfnsrsbh" name="ghfnsrsbh" class="mini-textbox" value="" style="width: 280px;" vtype="nsrsbh" required="true" requirederrortext="购货方纳税人识别号不能为空" onblur="fpds.onGhfnsrsbhBlur"></td>
                    <th style="width: 170px;"><span style="color: red">*</span>购货方名称</th>
                    <td>
                        <input id="ghfmc" name="ghfmc" class="mini-textbox" value="" vtype="specialChar;maxLength:40" required="true" requirederrortext="购货方名称不能为空" style="width: 280px;"></td>
                </tr>
                <tr>
                    <th style="width: 170px;"><span style="color: red">*</span>发票代码</th>
                    <td>
                        <input id="fpdm" name="fpdm" class="mini-textbox" value="" style="width: 280px;" required="true" requirederrortext="发票代码不能为空"></td>
                    <th style="width: 170px;"><span style="color: red">*</span>发票号码</th>
                    <td>
                        <input id="fphm" name="fphm" class="mini-textbox" value="" vtype="specialChar;maxLength:40" required="true" requirederrortext="发票号码不能为空" style="width: 280px;"></td>
                </tr>
            </table>
        </div>
        <h5>填写发票信息</h5>
        <div class="fbzl-tips">
            <div>劳务信息超过4条的，只需录入总金额和总税额，存在销货清单的，将清单作为附报资料上传。</div>
        </div>
        <div class="grid-toolbar" data-bind-grid="fpds_grid"></div>
        <div id="fpds_grid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" allowcellvalid="true" idfield="id" allowcellselect="true" allowcelledit="true" oncellcommitedit="onFpdsCommitEdit">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="hwlwmc" vtype="specialChar;maxLength:50"><span style="color: red">*</span>货物（服务）名称<input property="editor" class="mini-textbox"></div>
                <div field="dj" width="160" vtype="float">单价<input property="editor" class="mini-textbox" id="fpdj" onvaluechanged="fpds.onFpdjChange"></div>
                <div field="sl" width="100" vtype="float" datatype="float">数量<input property="editor" class="mini-textbox" id="fpsl" onvaluechanged="fpds.onFpslChange"></div>
                <div field="je" width="120" vtype="float" datatype="float"><span style="color: red">*</span>金额<input property="editor" class="mini-moneybox"></div>
                <div field="se" width="120" vtype="float" datatype="float"><span style="color: red">*</span>税额<input property="editor" class="mini-moneybox"></div>
            </div>
        </div>
        <h5>填写报税信息</h5>
        <table class="form-table" id="bsxx">
            <tr>
                <th style="width: 170px;">税款所属期起</th>
                <td>
                    <input id="skssqq" name="skssqq" class="mini-monthpicker" errormode="border" format="yyyy-MM" onvaluechanged="fpds.onskssqq" style="width: 280px;" required="true" requirederrortext="税款所属期起不能为空"></td>
                <th style="width: 170px;">税款所属期止</th>
                <td>
                    <input id="skssqz" name="skssqz" class="mini-monthpicker" format="yyyy-MM" style="width: 280px;" readonly="readonly" disabled="disabled"></td>
            </tr>
            <tr>
                <th style="width: 170px;">报税日期</th>
                <td>
                    <input id="byrq" name="byrq" class="mini-datepicker" format="yyyy-MM-dd" style="width: 280px;" required="true" requirederrortext="报税日期不能为空"></td>
                <th style="width: 170px;">纳税申报日期</th>
                <td>
                    <input id="nssbrq" name="nssbrq" class="mini-datepicker" format="yyyy-MM-dd" style="width: 280px;" readonly="readonly" disabled="disabled"></td>
            </tr>
        </table>
        <div class="mini-window" id="checkGhfxx" style="width: 700px; height: 600px;" title="根据购货方纳税人识别号查询购货方信息" showtoolbar="false" showfooter="true" showcolumnsmenu="true">
            <div id="ghfxx-grid" class="mini-datagrid" style="width: 100%; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="false" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                <div property="columns">
                    <div type="checkcolumn" width="50">选择</div>
                    <div field="nsrmc" required="true">纳税人名称</div>
                    <div field="zgsws" maxlength="200" vtype="maxLength:200">主管税务所（科、分局）</div>
                </div>
            </div>
            <div property="footer"><a class="mini-button toolBtn-blue" id="fpds-ok">确认</a> <a class="mini-button toolBtn-white" id="fpds-cancle">取消</a></div>
        </div>
    </div>
</section>
