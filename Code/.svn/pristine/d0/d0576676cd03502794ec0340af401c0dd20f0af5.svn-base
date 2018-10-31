<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ssxxView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.yshd.ssxxView" %>

<!DOCTYPE html>


<h2>涉税信用信息表</h2>
<section>
    <h4>基本信息</h4>
    <table class="form-table table_bg" id="jbxx" style="margin-top: 10px;">
        <tr>
            <td width="100px">纳税人名称：</td>
            <td width="190px">
                <input id="nsrmc" name="nsrmc" class="mini-textbox" enabled="false"></td>
            <td width="110px">纳税人识别号：</td>
            <td width="180px">
                <input id="nsrsbh" name="nsrsbh" class="mini-textbox" enabled="false" style="width: 180px;"></td>
            <td width="100px">注册地址：</td>
            <td width="190px">
                <input id="zcdz" name="zcdz" class="mini-textbox" enabled="false" style="width: 190px;"></td>
            <td width="80px">经营地址：</td>
            <td width="210px">
                <input id="scjydz" name="scjydz" class="mini-textbox" enabled="false" style="width: 210px;"></td>
        </tr>
        <tr>
            <td>法定代表人：</td>
            <td>
                <input id="fddbrxm" name="fddbrxm" class="mini-textbox" enabled="false" style="width: 180px;"></td>
            <td>身份证号：</td>
            <td>
                <input id="fddbrsfzjhm" name="fddbrsfzjhm" class="mini-textbox" enabled="false" style="width: 180px;"></td>
            <td>财务负责人：</td>
            <td>
                <input id="cwfzrxm" name="cwfzrxm" class="mini-textbox" enabled="false" style="width: 180px;"></td>
            <td>身份证号：</td>
            <td>
                <input id="cwfzrsfzjhm" name="cwfzrsfzjhm" class="mini-textbox" enabled="false" style="width: 180px;"></td>
        </tr>
    </table>
    <h4>信用信息</h4>
    <div id="xyxx" class="mini-datagrid" showpager="false" showemptytext="true" emptytext='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div field="pdnd" width="50%" headeralign="center" align="center" allowsort="false">年度</div>
            <div field="pdjb" width="50%" headeralign="center" align="center" allowsort="false">信用级别</div>
        </div>
    </div>
    <h4>行政处罚信息</h4>
    <div id="xzcfxx" class="mini-datagrid" multiselect="true" style="width: 100%" showemptytext="true" showpager="true" datafield="value.data" totalfield="value.total" emptytext='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="xzcfnd" width="150" headeralign="center" align="center" allowsort="false">年度</div>
            <div field="xzcfsj" width="150" headeralign="center" align="center" allowsort="false">处罚时间</div>
            <div field="xzcfsx" width="150" headeralign="center" align="center" allowsort="false">处罚事项</div>
            <div field="xzcfje" width="150" headeralign="center" align="center" allowsort="false">处罚金额(元)</div>
        </div>
    </div>
    <h4>经营信息</h4>
    <div id="jyxx" class="mini-datagrid" multiselect="true" style="width: 100%" showemptytext="true" showpager="true" datafield="value.data" totalfield="value.total" emptytext='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="jyxxnd" name="jyxxnd" width="150" headeralign="center" align="center" allowsort="false">年度</div>
            <div field="jyxxjysr" name="jyxxjysr" width="150" headeralign="center" align="center" allowsort="false">经营收入（元）</div>
            <div field="jyxxyf" width="150" headeralign="center" align="center" allowsort="false">月份</div>
            <div field="jyxxzyjysr" width="150" headeralign="center" align="center" allowsort="false">主营业务收入（元）</div>
        </div>
    </div>
    <h4>税款缴纳信息</h4>
    <div id="skjnxx" class="mini-datagrid" multiselect="true" style="width: 100%" showemptytext="true" showpager="true" datafield="value.data" totalfield="value.total" emptytext='<font color="red" style="float: left;padding-right: 2%;">无记录</font>'>
        <div property="columns">
            <div type="checkcolumn"></div>
            <div field="skjnxxnd" name="skjnxxnd" width="150" headeralign="center" align="center" allowsort="false">年度</div>
            <div field="skjnxxyjskhj" name="skjnxxyjskhj" width="150" headeralign="center" align="center" allowsort="false">已缴税款合计（元）</div>
            <div field="skjnxxyf" name="skjnxxyf" width="150" headeralign="center" align="center" allowsort="false">月份</div>
            <div field="skjnxxzsxm" width="150" headeralign="center" align="center" allowsort="false">征收项目</div>
            <div field="skjnxxje" width="150" headeralign="center" align="center" allowsort="false">金额（元）</div>
        </div>
    </div>
    <div class="footer">
        <button type="submit" class="btn" id="tsBtn" onclick="ssxxcx.printSssj()">打印</button>
        <button type="submit" class="btn" id="tsBtn1" onclick="ssxxcx.sqsm()">授权声明</button>
        <input type="hidden" id="sfdy" value="0"><br>
        <br>
        <div><span class="txt-red">温馨提示：</span>行政处罚信息、经营信息、税款缴纳信息，请先勾选需要打印的行，再打印。</div>
        <br>
    </div>
    <div id="print-area" style="display: none">
        <div class="print-area">
            <div class="fs20">涉税信用信息表</div>
            <div class="box">
                <div class="fs16">基本信息</div>
                <table>
                    <tr>
                        <td>纳税人名称：</td>
                        <td><span class="nsrmc"></span></td>
                        <td>纳税人识别号：</td>
                        <td><span class="nsrsbh"></span></td>
                        <td>注册地址：</td>
                        <td><span class="zcdz"></span></td>
                        <td>经营地址：</td>
                        <td><span class="scjydz"></span></td>
                    </tr>
                    <tr>
                        <td>法定代表人：</td>
                        <td><span class="fddbrmc"></span></td>
                        <td>身份证号：</td>
                        <td><span class="fddbrsfzjhm"></span></td>
                        <td>财务负责人：</td>
                        <td><span class="cwfzrxm"></span></td>
                        <td>身份证号：</td>
                        <td><span class="cwfzrsfzjhm"></span></td>
                    </tr>
                </table>
            </div>
            <div class="box">
                <div class="fs16">信用信息</div>
                <table>
                    <thead>
                        <tr>
                            <td>年度</td>
                            <td>信用级别</td>
                        </tr>
                    </thead>
                    <tbody id="xyxx-tbody"></tbody>
                </table>
            </div>
            <div class="box">
                <div class="fs16">行政处罚信息</div>
                <table>
                    <thead>
                        <tr>
                            <td>年度</td>
                            <td>处罚时间</td>
                            <td>处罚事项</td>
                            <td>处罚金额(元)</td>
                        </tr>
                    </thead>
                    <tbody id="xzcfxx-tbody"></tbody>
                </table>
            </div>
            <div class="box">
                <div class="fs16">经营信息</div>
                <table>
                    <thead>
                        <tr>
                            <td>年度</td>
                            <td>经营收入（元）</td>
                            <td>月份</td>
                            <td>主营业务收入（元）</td>
                        </tr>
                    </thead>
                    <tbody id="jyxx-tbody"></tbody>
                </table>
            </div>
            <div class="box">
                <div class="fs16">税款缴纳信息</div>
                <table>
                    <thead>
                        <tr>
                            <td>年度</td>
                            <td>已缴税款合计（元）</td>
                            <td>月份</td>
                            <td>征收项目</td>
                            <td>金额（元）</td>
                        </tr>
                    </thead>
                    <tbody id="skjnxx-tbody"></tbody>
                </table>
            </div>
        </div>
    </div>
</section>
