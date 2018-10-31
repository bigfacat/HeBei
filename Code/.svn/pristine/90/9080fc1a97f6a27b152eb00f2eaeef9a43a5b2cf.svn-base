<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="XxwhView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.ckzhzhbg.XxwhView" %>

<!DOCTYPE html>


<h2></h2>
<section>
    <div class="grid-toolbar" data-bind-grid="ckzhzhxx-grid">
        <div class="grid-title">存款账户账号信息</div>
        <a class="mini-button toolBtn-blue grid-add" iconcls="icon-add" onclick="ckzhzhbg.openKhxkz">增加</a> <a class="mini-button grid-add" iconcls="icon-edit" onclick="ckzhzhbg.openEditPage">修改</a> <a class="mini-button grid-remove" iconcls="icon-remove">删除</a></div>
    <div id="ckzhzhxx-grid" class="mini-datagrid" style="width: 1160px; height: 160px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
        <div property="columns">
            <div type="checkcolumn" width="50">选择</div>
            <div type="indexcolumn" width="50">序号</div>
            <div field="sxjszhbz" type="comboboxcolumn">缴税账号
                <input property="editor" class="mini-combobox" style="width: 100%;" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'></div>
            <div field="zhmc">账户名称</div>
            <div field="yhzhxzDm" width="160" displayfield="yhzhxzDmText" renderer="ckzhzhbg.zhxzRenderer">账户性质</div>
            <div field="xzqhszDm" visible="false" displayfield="xzqhszDmText" renderer="ckzhzhbg.xzqhRenderer">行政区划</div>
            <div field="yhkhdjzh" width="200">核准号<br>
                （银行开户登记证号）</div>
            <div field="ffrq" dateformat="yyyy-MM-dd">发证日期</div>
            <div field="yhhbDm" width="150" visible="false" displayfield="yhhbDmText" renderer="ckzhzhbg.yhzlRenderer">银行种类</div>
            <div field="yhyywdDm" width="288" displayfield="yhyywdDmText" renderer="ckzhzhbg.khyhRenderer">开户银行</div>
            <div field="yhzh" width="218">银行账号</div>
            <div field="hbszDm" displayfield="hbszDmText" renderer="ckzhzhbg.bzRenderer">币种</div>
            <div field="khrq" dateformat="yyyy-MM-dd">开户时间</div>
            <div field="cktszhbz" type="comboboxcolumn">出口退税账号
                <input property="editor" class="mini-combobox" style="width: 100%;" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'></div>
            <div field="tszhbz" type="comboboxcolumn">退税账号标志
                <input property="editor" class="mini-combobox" style="width: 100%;" data='[{"ID":"Y","MC":"是"},{"ID":"N","MC":"否"}]'></div>
        </div>
    </div>
</section>
