<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TxsqbView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.tydj.TxsqbView" %>

<!DOCTYPE html>

<h2>填写申请表</h2>
<section class="first-step">
    <h5 class="title">停业登记报告表</h5>
    <table class="tydj-table" id="tydjForm" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="search-item">纳税人识别号：</td>
            <td class="search-item-control"><span class="nsrsbh"></span></td>
            <td class="search-item">纳税人名称：</td>
            <td class="search-item-control"><span class="nsrmc"></span></td>
        </tr>
        <tr>
            <td class="search-item">停业期限起：</td>
            <td>
                <input class="mini-monthpicker" format="yyyy-MM" onvaluechanged="tydj.onvaluechangedHztyqxq" id="tyDateStart" name="tyDateStart" width="100%" required="true" requirederrortext="停业期限起不能为空"></td>
            <td class="search-item">停业期限止：</td>
            <td class="search-item-control">
                <input class="mini-monthpicker" format="yyyy-MM" onvaluechanged="tydj.onvaluechangedHztyqxz" id="tyDateEnd" name="tyDateEnd" width="100%" required="true" requirederrortext="停业期限止不能为空"></td>
        </tr>
        <tr>
            <td class="search-item" width="7%">报告日期：</td>
            <td class="search-item-control">
                <input class="mini-datepicker" format="yyyy-MM-dd" id="tybgrq" name="tybgrq" width="100%" required="true" requirederrortext="报告日期不能为空"></td>
        </tr>
    </table>
    <div style="display: none;">
        <h5>缴存发票情况</h5>
        <div id="jcfp-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcelledit="false">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpzlmc">发票种类</div>
                <div field="fpDm">发票代码</div>
                <div field="fpqshm">发票起始号码</div>
                <div field="fpzzhm">发票终止号码</div>
                <div field="fs">数量</div>
            </div>
        </div>
        <h5>缴存税务资料情况</h5>
        <div class="grid-toolbar" data-bind-grid="jcswzl-grid"><a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="tydj.addJcswzl()">增加</a> <a class="mini-button" iconcls="icon-remove" onclick="tydj.removeRow('jcswzl-grid')">删除</a></div>
        <div id="jcswzl-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" multiselect="true" allowcellselect="true" allowcelledit="true">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="swdjzjzl" displayfield="swdjzjzlText" renderer="tydj.swdjzjzlRenderer" vtype="required" requirederrortext="税务登记证件种类不能为空">税务登记证件种类
                    <input property="editor" class="mini-combobox" data="tydj.swdjzjzl"></div>
                <div field="swdjzjhm" vtype="required" requirederrortext="税务登记证件号码">税务登记证件号码
                    <input property="editor" class="mini-textbox"></div>
            </div>
        </div>
        <h5>缴存其他税务资料情况</h5>
        <div class="grid-toolbar" data-bind-grid="jcqtswzl-grid"><a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="tydj.addJcqtswzl()">增加</a> <a class="mini-button" iconcls="icon-remove" onclick="tydj.removeRow('jcqtswzl-grid')">删除</a></div>
        <div id="jcqtswzl-grid" class="mini-datagrid" style="width: 1160px; height: 220px;" multiselect="true" allowcellselect="true" allowcelledit="true">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="jcqtswzlmc" vtype="required">其他税务资料名称
                    <input property="editor" class="mini-textbox"></div>
                <div field="jcqtswzlsl" vtype="required;int">数量
                    <input property="editor" class="mini-textbox"></div>
            </div>
        </div>
    </div>
</section>
