<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zsrdView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.ybnsrjyzsrd.zsrdView" %>

<!DOCTYPE html>


<h2>一般纳税人简易办法征收认定</h2>
<section>
    <h5>纳税人基本信息</h5>
    <table class="form-table table_bg ynnsr-table">
        <tr>
            <th style="width: 170px;">纳税人识别号：</th>
            <td>
                <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 280px;" vtype="required;"></td>
            <th style="width: 170px;">纳税人名称：</th>
            <td>
                <input id="nsrmc" name="nsrmc" class="mini-textbox" enabled="false" vtype="required;specialChar;maxLength:40" style="width: 280px;"></td>
        </tr>
    </table>
    <div class="grid-toolbar" data-bind-grid="jyzsGrid"><a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="ybnsrjyzsrd.addZslx">增加</a> <a class="mini-button grid-remove" iconcls="icon-remove">删除</a></div>
    <div id="jyzsGrid" class="mini-datagrid" style="width: 1160px; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" oncellendedit="onCellcommitedit" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" allowcellvalid="true">
        <div property="columns">
            <div type="checkcolumn" width="50">选择</div>
            <div type="indexcolumn" width="50">序号</div>
            <div field="jybfzslxDm" displayfield="jybfzslxMc" vtype="required">简易办法征收增值税类型<input property="editor" id="jybfzslxDm" name="jybfzslxDm" class="mini-combobox" allowinput="true" valuefromselect="true" shownullitem="false" textfield="MC" valuefield="ID" autoload="false" required="true" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_RD_JYBFZSZZSLX.ashx"></div>
            <div field="yxqq" width="100" vtype="required" align="center" headeralign="center" allowsort="false">有效期起<input property="editor" name="yxqq" id="yxqq" class="mini-monthpicker" format="yyyy-MM" required="true" type="text"></div>
            <div field="yxqz" width="100" vtype="required" align="center" headeralign="center" allowsort="false">有效期止<input property="editor" name="yxqz" id="yxqz" class="mini-monthpicker" format="yyyy-MM" required="true" type="text"></div>
        </div>
    </div>
</section>
