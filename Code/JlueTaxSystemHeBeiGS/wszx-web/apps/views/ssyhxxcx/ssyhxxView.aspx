<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ssyhxxView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.ssyhxxcx.ssyhxxView" %>

<!DOCTYPE html>


<h2></h2>
<section>
    <h4 style="margin-top: 0">纳税人基本信息</h4>
    <table width="100%" height="80" style="background: #f7f7f7; margin-bottom: 20px">
        <tr>
            <td width="12%" align="right">纳税人识别号：</td>
            <td width="20%" id="nsrsbh" align="left"></td>
            <td width="12%" align="right">纳税人名称：</td>
            <td id="nsrmc" align="left"></td>
        </tr>
    </table>
    <h4>税收优惠备案情况</h4>
    <div id="ssyhxx-grid" class="mini-datagrid" style="width: 1160px; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false">
        <div property="columns">
            <div type="indexcolumn" width="50">序号</div>
            <div field="jmsspsxmc" width="150">减免税审批事项名称</div>
            <div field="zsxmmc" width="100" align="center">征收项目</div>
            <div field="jmzlxmc" width="100" align="center">减免征类型</div>
            <div field="jmqxq" width="100" dateformat="yyyy-MM-dd" align="center">减免期限起</div>
            <div field="jmqxz" width="100" dateformat="yyyy-MM-dd" align="center">减免期限止</div>
            <div field="zfrq1" width="100" dateformat="yyyy-MM-dd" align="center">取消日期</div>
            <div field="jzed" width="100" align="center">减征额度</div>
            <div field="jzfd" width="100" align="center">减征幅度</div>
            <div field="jzsl" width="100" align="center">减征税率</div>
        </div>
    </div>
</section>
