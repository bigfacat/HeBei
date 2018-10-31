<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ssxxtsView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yshdSsxxts.ssxxtsView" %>

<!DOCTYPE html>

<h2>涉税信用信息表</h2>
<section>
    <div id="ssxx">
    <div >
    <h4>基本信息</h4>
    <table class="form-table table_bg" id="jbxx" style="margin-top:10px;height:90px" >
        <tr>
            <td width="100px">纳税人名称：</td>
            <td width="190px"><input id="nsrmc" name="nsrmc" class="mini-textbox"
                                     enabled="false"/></td>
            <td width="110px">纳税人识别号：</td>
            <td width="180px"><input id="nsrsbh" name="nsrsbh" class="mini-textbox"
                                     enabled="false" style="width:180px;" /></td>
            <td width="100px">注册地址：</td>
            <td width="190px"><input id="zcdz" name="zcdz" class="mini-textbox"
                                     enabled="false"
                                     style="width:190px;" /></td>
            <td width="80px">经营地址：</td>
            <td width="210px"><input id="scjydz" name="scjydz" class="mini-textbox"
                                     enabled="false"
                                     style="width:210px;" /></td>
        </tr>
        <tr>
            <td>法定代表人：</td>
            <td><input id="fddbrxm" name="fddbrxm" class="mini-textbox"
                       enabled="false"
                       style="width:180px;" /></td>
            <td>身份证号：</td>
            <td><input id="fddbrsfzjhm" name="fddbrsfzjhm" class="mini-textbox"
                       enabled="false"
                       style="width:180px;" /></td>
            <td>财务负责人：</td>
            <td><input id="cwfzrxm" name="cwfzrxm" class="mini-textbox"
                       enabled="false"
                       style="width:180px;" /></td>
            <td>身份证号：</td>
            <td><input id="cwfzrsfzjhm" name="cwfzrsfzjhm" class="mini-textbox"
                       enabled="false"
                       style="width:180px;" /></td>
        </tr>
    </table>
    <!--信用信息-->
    <h4>信用信息</h4>
    <div id="xyxx" class="mini-datagrid" showpager="false"
         showEmptyText="true" style="height:100px;"
         emptyText='<div><font color="red" style="float: left;padding-right: 2%;">无记录</font></div>'>
        <div property="columns">
            <div field="pdnd" width="50%" headerAlign="center" align="center" allowSort="false">年度</div>
            <div field="pdjb" width="50%" headerAlign="center" align="center" allowSort="false">信用级别</div>
        </div>
    </div>

    <!--行政处罚信息-->
    <h4>行政处罚信息</h4>
    <div id="xzcfxx" class="mini-datagrid"  multiSelect="true" pageSize="10" sizeList="[10,20,30]"
         showEmptyText="true" showPager="true" datafield="value.data" totalfield="value.total" style="width:1158px;height:300px;"
         onselectionchanged="ssxxts.onXzcfSelectoinChanged" onload="ssxxts.onXzcfGridLoad"
         emptyText='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="xzcfnd" width="150" headerAlign="center" align="center" allowSort="false">年度</div>
            <div field="xzcfsj" width="150" headerAlign="center" align="center" allowSort="false">处罚时间</div>
            <div field="xzcfsx" width="150" headerAlign="center" align="center" allowSort="false">处罚事项</div>
            <div field="xzcfje" width="150" headerAlign="center" align="center" allowSort="false">处罚金额(元)</div>
        </div>
    </div>

    <!-- 经营信息 -->
    <h4>经营信息</h4>
    <div id="jyxx" class="mini-datagrid"  multiSelect="true" pageSize="10" sizeList="[10,20,30]"
         showEmptyText="true" showPager="true" datafield="value.data" totalfield="value.total"
         onselectionchanged="ssxxts.onJyxxSelectoinChanged" onload="ssxxts.onJyxxGridLoad" style="width: 100%;height:300px;"
         emptyText='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="jyxxnd" name="jyxxnd" width="150" headerAlign="center" align="center" allowSort="false">
                年度
            </div>
            <div field="jyxxjysr" name="jyxxjysr" width="150" headerAlign="center" align="center"
                 allowSort="false">经营收入（元）
            </div>
            <div field="jyxxyf" width="150" headerAlign="center" align="center" allowSort="false">月份</div>
            <div field="jyxxzyjysr" width="150" headerAlign="center" align="center" allowSort="false">
                主营业务收入（元）
            </div>
        </div>
    </div>
    <!-- 税款缴纳信息 -->
    <h4>税款缴纳信息</h4>
    <div id="skjnxx" class="mini-datagrid"  multiSelect="true" pageSize="10" sizeList="[10,20,30]"
         showEmptyText="true" showPager="true" datafield="value.data" totalfield="value.total"
         onselectionchanged="ssxxts.onSkjnSelectoinChanged" onload="ssxxts.onSkjnGridLoad" style="width: 100%;height:300px;"
         emptyText='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="skjnxxnd" name="skjnxxnd" width="150" headerAlign="center" align="center"
                 allowSort="false">年度
            </div>
            <div field="skjnxxyjskhj" name="skjnxxyjskhj" width="150" headerAlign="center" align="center"
                 allowSort="false">已缴税款合计（元）
            </div>
            <div field="skjnxxyf" name="skjnxxyf" width="150" headerAlign="center" align="center"
                 allowSort="false">月份
            </div>
            <div field="skjnxxzsxm" width="150" headerAlign="center" align="center" allowSort="false">征收项目</div>
            <div field="skjnxxje" width="150" headerAlign="center" align="center" allowSort="false">金额（元）</div>
        </div>
    </div>
            <div  class="footer">
                <span class="txt-red">温馨提示：</span>行政处罚信息、经营信息、税款缴纳信息，请先勾选需要推送的行次，再点击下一步。</div>
        </div>

        <div></div>
    </div>
</section>