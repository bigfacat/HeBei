<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="newDKYL.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglNewDkzy.newDKYL" %>

<!DOCTYPE html>

<h2></h2>
<section>
    <div id="tabs1" class="mini-tabs tab-content" activeindex="0">
        <div title="发票信息">
            <div class="yl_body" id="step_yl_form" data-view-type="form">
                <div class="kpxx-title text-center">
                    <div class="big-text">增值税专用发票</div>
                    <div class="small-text">此联不做报销、扣款凭证使用</div>
                </div>
                <div class="" style="padding-top: 10px;">
                    <div class="text-right">开票日期：<div data-view-type="form" id="kprq_form" style="display: inline-block; width: 130px;">
                        <input class="mini-textbox" name="kprq_val" id="kprq_val" readonly="true"></div>
                    </div>
                    <p class="tip">注：请与购买方再次确认银行账号等重要信息是否正确，以免填写错误。若缴税后发现信息错误，将无法在云厅处理，需到办税大厅作废！ &nbsp;&nbsp;<a class="green show-upload" onclick="dkzyfp.showLwHwView()" style="display: none">查看清单</a></p>
                </div>
                <table cellpadding="0" cellspacing="0" border="0" class="kpxx" style="table-layout: fixed;">
                    <tr>
                        <td class="gray-td vertical-td" style="width: 5%">购<br>
                            买<br>
                            方</td>
                        <td colspan="4" class="bor-right-none company-info">
                            <form id="gh-info" data-view-type="form">
                                <label>名<em class="w4"></em>称：</label>
                                <input style="width: 96%" class="mini-textbox" name="ghfNsrmc" readonly=""><br>
                                <input id="zspmDm_yl" name="zspmDmText" class="mini-hidden" readonly="">
                                <label>纳税人识别号：</label>
                                <input style="width: 96%" class="mini-textbox" name="ghfNsrsbh" readonly=""><br>
                                <label>地<em class="w_25"></em>址<em class="w_25"></em>、<em class="w_25"></em>电<em class="w_25"></em>话：</label>
                                <input style="width: 55%" class="mini-textbox" name="ghfDz" readonly="">
                                <input style="width: 40%" class="mini-textbox" name="ghfLxdh" readonly=""><br>
                                <label>开户行及账号：</label><input style="width: 55%" class="mini-textbox" name="ghfYhyywdMc" readonly=""><input style="width: 40%" class="mini-textbox" name="ghfYhkhzh" readonly="">
                                <input class="mini-textbox mini-hidden" name="_ghfYhhbDmText">
                                <input class="mini-textbox mini-hidden" name="ghfYhhbDm"><input class="mini-hidden" name="djxh" readonly="true"></form>
                        </td>
                        <td colspan="2" class="bor-left-none text-right" style="padding-right: 10px;"></td>
                        <td class="gray-td vertical-td">
                            <label style="display: block; width: 50px;">密<br>
                                码<br>
                                区</label></td>
                        <td colspan="3">
                            <div style="width: 312px;">&nbsp;</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="padding: 0px;">
                            <div data-view-type="datagrid">
                                <div id="lwhwYl-grid" class="mini-datagrid" style="width: 100%; height: 317px;" allowresizecolumn="false" allowcelledit="true" allowcellselect="true" multiselect="true" editnextonenterkey="true" editnextrowcell="true" idfield="id">
                                    <div property="columns">
                                        <div field="hwlwmc" width="165">货物或应税劳务、服务名称</div>
                                        <div field="ggxh">规格型号</div>
                                        <div field="dwslDmText">单位</div>
                                        <div field="hlsl">数量</div>
                                        <div field="hldj">单价</div>
                                        <div field="je" width="129">金额（不含税）</div>
                                        <div class="gray-td" field="slv" width="60">税率</div>
                                        <div class="gray-td bor-right-none" field="se" datatype="float" width="100">税额</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tbody id="ylHj" data-view-type="form">
                        <tr class="input-nobor hj-td" id="hjse_yl" data-view-type="form">
                            <td class="gray-td" colspan="2">合计</td>
                            <td class="gray-td bor-right-none"></td>
                            <td class="gray-td bor-right-none bor-left-none"></td>
                            <td class="gray-td bor-right-none bor-left-none"></td>
                            <td class="gray-td bor-right-none bor-left-none"></td>
                            <td class="gray-td bor-left-none bor-right-none text-center" colspan="2" width="161px"></td>
                            <td class="gray-td bor-right-none bor-left-none" width="140px">
                                <input class="mini-textbox" id="jebhsHj" name="jehj" readonly=""></td>
                            <td class="gray-td bor-right-none bor-left-none" width="69px"></td>
                            <td class="gray-td bor-left-none" width="119px">
                                <input class="mini-textbox" id="seHj" name="sehj" readonly=""></td>
                        </tr>
                        <tr id="jshj_yl_view" data-view-type="form">
                            <td class="gray-td" colspan="2">价税合计（大写）</td>
                            <td colspan="9" style="line-height: 24px;" class="input-nobor">
                                <input class="mini-textbox dx_jshj" name="hjdx" style="width: 40%; padding: 0px" readonly="" value="">
                                <label style="margin-left: 30%;">（小写）</label>￥
                                <input class="mini-textbox xx_jshj" style="width: 170px; padding: 0px" name="jshj" readonly=""></td>
                        </tr>
                    </tbody>
                    <tbody id="ylxh-form" data-view-type="form">
                        <tr id="xhfxx_yl">
                            <td class="gray-td vertical-td">销<br>
                                售<br>
                                方</td>
                            <td colspan="6" class="company-info">
                                <label>名<em class="w4"></em>称：</label>
                                <input style="width: 96%" class="mini-textbox" name="nsrmc" readonly=""><br>
                                <label>纳税人识别号：</label>
                                <input style="width: 96%" class="mini-textbox" name="nsrsbh" readonly=""><br>
                                <label>地<em class="w_25"></em>址<em class="w_25"></em>、<em class="w_25"></em>电<em class="w_25"></em>话：</label>
                                <input style="width: 50%" class="mini-textbox" name="dz" readonly=""><input style="width: 30%" class="mini-textbox" name="jbrdh" readonly="" id="zpdk-skfxx-jbrdh"><br>
                                <label>开户行及账号：</label>
                                <input name="yhyywdMc" style="width: 50%" class="mini-textbox" readonly=""><input name="yhzh" style="width: 30%" class="mini-textbox" readonly=""></td>
                            <td class="gray-td vertical-td">
                                <label>备<br>
                                    注</label></td>
                            <td colspan="3">
                                <input maxlength="200" style="height: 110px; width: 95%; line-height: 18px;" class="mini-textarea bz-text" name="bz" readonly=""></td>
                        </tr>
                        <tr class="bor-none" id="sfrFhfForm_yl">
                            <td colspan="3">
                                <label>收款人：</label>
                                <input class="mini-textbox" name="skr" id="skr" style="width: 150px;" readonly=""></td>
                            <td colspan="2">
                                <label>复核人：</label>
                                <input class="mini-textbox" name="fhr" id="fhr" style="width: 150px;" readonly=""></td>
                            <td colspan="2">
                                <label>开票人：</label>
                                <input class="mini-textbox" name="kpr" style="width: 150px;" readonly=""></td>
                            <td colspan="4">
                                <label>销售方：</label>（章）</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div title="附报资料">
            <div data-view-type="datagrid">
                <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 1160px; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
                    <div property="columns">
                        <div type="indexcolumn" width="50">序号</div>
                        <div field="fbzlMc" class="xxxxx">资料名称</div>
                        <div field="scCount">上传数量</div>
                        <div field="bslxDm" renderer="onRenderApply">要求</div>
                        <div field="status" renderer="ylonRenderOpearte" align="center">操作</div>
                    </div>
                </div>
            </div>
        </div>
        <div title="发票清单">
            <div data-view-type="datagrid">
                <div id="lwhwViewGrid_yl" class="mini-datagrid" style="width: 100%; height: 460px;" idfield="id" multiselect="true">
                    <div property="columns">
                        <div field="hwlwmc" width="120" headeralign="center" allowsort="true">货物或劳务名称</div>
                        <div field="ggxh" width="120" headeralign="center" allowsort="true">规格型号</div>
                        <div field="dwslDmText" width="70">计量单位</div>
                        <div field="hlsl" width="50">数量</div>
                        <div field="hldj">单价（不含税）</div>
                        <div field="jeHs">金额（含税）</div>
                        <div field="je">金额（不含税）</div>
                        <div field="slv" width="50">税率</div>
                        <div field="se">税额</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script>
    $(function () {
        var timer = setInterval(function () {
            var xx = $('.xx_jshj input').val();
            var dx = $('.dx_jshj input').val();
            if (xx && !dx) {
                if (top.moneyUtil) {
                    $('.dx_jshj input').val(top.moneyUtil.arabicToChinese(xx));
                    clearInterval(timer);
                }
            }
        }, 200);
    });
</script>
