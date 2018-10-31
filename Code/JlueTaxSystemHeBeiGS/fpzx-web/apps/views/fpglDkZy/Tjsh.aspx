<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Tjsh.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglDkZy.Tjsh" %>



<h2>预览</h2>
<section class="forth-step">
    <div class="dkzyYl" id="step_yl_form" data-view-type="form">
        <div id="tabs1" class="mini-tabs tab-content" activeindex="0" style="width: 100%;">
            <div title="专用发票代开申请"><strong>卖方：销货单位（收款方基本信息）</strong><div class="xh-info yl-input" id="ylxh-form" data-view-type="form">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="item-label" width="20%">纳税人识别号：</td>
                        <td width="33%">
                            <input class="mini-hidden" name="djxh" readonly="true">
                            <input class="mini-textbox" name="nsrsbh" readonly="true" width="103%" maxlength="20" vtype="nsrsbh"></td>
                        <td class="item-label" width="14%">纳税人名称：</td>
                        <td width="33%">
                            <input class="mini-textbox" name="nsrmc" width="103%" value="纳税人名称" readonly="true" required="true" requirederrortext="纳税人名称不能为空"></td>
                    </tr>
                    <tr>
                        <td class="item-label">征收品目名称：</td>
                        <td>
                            <input class="mini-textbox" name="zspmText" readonly="true" width="100%"></td>
                        <td class="item-label">行业：</td>
                        <td>
                            <input class="mini-textbox" name="hyMc" id="ylHyMc" readonly="true" width="100%"></td>
                    </tr>
                    <tr>
                        <td class="item-label">经营范围：</td>
                        <td>
                            <input class="mini-textbox" name="jyfw" width="100%" readonly="true"></td>
                        <td class="item-label">地址：</td>
                        <td>
                            <input class="mini-textbox" name="dz" width="100%" required="true" readonly="true" requirederrortext="地址不能为空" maxlength="40" vtype="maxLength:40"></td>
                    </tr>
                    <tr>
                        <td class="item-label">开户银行类别：</td>
                        <td>
                            <input class="mini-textbox" name="khyhlbText" width="100%" readonly="true"></td>
                        <td class="item-label">银行营业网点名称：</td>
                        <td>
                            <input class="mini-textbox" name="yhyywdMc" readonly="true" width="100%"></td>
                    </tr>
                    <tr>
                        <td class="item-label">银行账号：</td>
                        <td>
                            <input class="mini-textbox" name="yhzh" readonly="true" width="100%"></td>
                        <td class="item-label">经办人：</td>
                        <td>
                            <input class="mini-textbox" name="jbr" width="100%" readonly="true"></td>
                    </tr>
                    <tr>
                        <td class="item-label">经办人联系电话：</td>
                        <td>
                            <input class="mini-textbox" name="jbrdh" width="100%" readonly="true">
                            <input class="mini-hidden" name="fhr" width="100%" readonly="true">
                            <input class="mini-hidden" name="skr" width="100%" readonly="true"></td>
                        <td class="item-label">备注：</td>
                        <td>
                            <input class="mini-textbox" name="bz" width="100%" readonly="true"></td>
                    </tr>
                </table>
            </div>
                <strong class="gh-strong">买方：购货单位（付款方基本信息）</strong><div class="gh-info yl-input" id="gh-info" data-view-type="form">
                    <table id="ylfkf-form" data-view-type="form" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td class="item-label" width="24%">付款方纳税人识别号：</td>
                            <td width="28%">
                                <input class="mini-hidden" name="djxh" readonly="true">
                                <input class="mini-textbox" name="ghfNsrsbh" readonly="true" width="100%"></td>
                            <td class="item-label" width="20%">付款方名称：</td>
                            <td width="28%">
                                <input class="mini-textbox" name="ghfNsrmc" width="100%" readonly="true"></td>
                        </tr>
                        <tr>
                            <td class="item-label">付款方地址：</td>
                            <td>
                                <input class="mini-textbox" name="ghfDz" width="100%" readonly="true"></td>
                            <td class="item-label">付款方开户银行类别：</td>
                            <td>
                                <input class="mini-textbox" name="_ghfYhhbDmText" readonly="true" shownullitem="true" nullitemtext="注：若您需要选择的银行不存在，请联系主管税务机关维护银行信息" width="100%"></td>
                        </tr>
                        <tr>
                            <td class="item-label">付款方银行营业网点名称：</td>
                            <td>
                                <input class="mini-textbox" name="ghfYhyywdMc" width="100%" readonly="true"></td>
                            <td class="item-label">付款方银行账号：</td>
                            <td>
                                <input class="mini-textbox" name="ghfYhkhzh" width="100%" readonly="true"></td>
                        </tr>
                        <tr>
                            <td class="item-label">联系电话：</td>
                            <td>
                                <input class="mini-textbox" name="ghfLxdh" width="100%" readonly="true"></td>
                        </tr>
                    </table>
                </div>
                <strong class="gh-strong">劳务货物信息</strong><div data-view-type="datagrid">
                    <div id="lwhwYl-grid" class="mini-datagrid" style="width: 1152px; height: 210px" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="hwlwmc" width="128">货物或劳务名称</div>
                            <div field="ggxh" width="106">规格型号</div>
                            <div field="dwslDm" displayfield="dwslDmText" width="106">计量单位</div>
                            <div field="hlsl" width="98">数量</div>
                            <div field="hldj" width="100">单价（不含税）</div>
                            <div field="je" width="115">金额（不含税）</div>
                            <div field="jeHs" width="103">金额（含税）</div>
                            <div field="slv" width="113">税率</div>
                            <div field="se" width="114">税额</div>
                        </div>
                    </div>
                </div>
                <div class="bottom" id="ylHj" data-view-type="form" style="height: 100px; width: 1152px">
                    <table class="form-table table_bg table-bg-green" style="width: 49%">
                        <tr>
                            <th>金额合计（不含税）：</th>
                            <td width="20%" class="htzje">
                                <input class="mini-textbox" id="yl-jehj" name="jehj" readonly="true"></td>
                            <th>税额合计：</th>
                            <td>
                                <input class="mini-textbox" width="66%" name="sehj" id="yl-sehj" readonly="true"></td>
                        </tr>
                        <tr>
                            <th>价税合计（金额+税额）：</th>
                            <td class="jshj-text" colspan="3">
                                <input class="mini-textbox" name="jshj" id="yl-jshj" width="82%" readonly="true"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div title="附报资料">
                <div class="bszl" data-view-type="datagrid">
                    <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 100%; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="fbzlMc" class="xxxxx">资料名称</div>
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
