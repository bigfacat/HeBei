﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="swxzxkyltj.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.swxzxk.swxzxkyltj" %>

<!DOCTYPE html>


<h2>预览</h2>
<section>
    <div class="mini-tabs tab-content" activeindex="0" id="sqb2">
        <div title="税务行政许可申请">
            <table border="" cellspacing="" cellpadding="" data-view-type="form" id="swxzxk-yltj">
                <h4 class="swxzxk-yltj-h4">税务行政许可申请表</h4>
                <tr>
                    <td style="border: none" colspan="4">
                        <input class="mini-textbox mini-textbox-border swxzxk-date" name="sqrq" readonly="true"></td>
                </tr>
                <tr>
                    <th rowspan="8" width="80">申请人</th>
                    <th>申请人名称</th>
                    <td colspan="3">
                        <input class="mini-textbox mini-textbox-border" name="sqrmc" readonly="true"></td>
                </tr>
                <tr>
                    <th>统一社会信用代码<br>
                        （纳税人识别号）</th>
                    <td colspan="3">
                        <input class="mini-textbox mini-textbox-border mini-required" name="nsrsbh" readonly="true"></td>
                </tr>
                <tr>
                    <th>法定代表人<br>
                        (负责人)</th>
                    <td colspan="3">
                        <input class="mini-textbox mini-textbox-border mini-required" name="fddbr" readonly="true"></td>
                </tr>
                <tr>
                    <th>地址和邮政编码</th>
                    <td colspan="3">
                        <input class="mini-textbox mini-textbox-border" name="dzyzbm" readonly="true"></td>
                </tr>
                <tr>
                    <th width="140">经办人</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" name="jbr" readonly="true"></td>
                    <th width="140">身份证件号码</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" name="jbr_sfzh" readonly="true"></td>
                </tr>
                <tr>
                    <th width="140">联系电话</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" readonly="true" name="jbr_lxdh"></td>
                    <th width="140">联系地址</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" required="true" name="jbr_lxdz" readonly="true"></td>
                </tr>
                <tr>
                    <th width="140">委托代理人</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" name="wtdlr" readonly="true"></td>
                    <th width="140">身份证号</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border" name="wtdlr_sfzh" readonly="true"></td>
                </tr>
                <tr>
                    <th width="140">联系电话</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" name="wtdlr_lxdh" readonly="true"></td>
                    <th width="140">联系地址</th>
                    <td width="220">
                        <input class="mini-textbox mini-textbox-border mini-required" name="wtdlr_lxdz" readonly="true"></td>
                </tr>
                <tr>
                    <th>申请事项</th>
                    <td colspan="4">
                        <div class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" onload="onload" data="[{'ID':'1', 'text':'一、企业印制发票审批'}, {'ID':'2', 'text':'二、对纳税人延期申报的核准'}, {'ID':'3', 'text':'三、对纳税人延期缴纳税款的核准','enabled':false}, {'ID':'4', 'text':'四、对纳税人变更纳税定额的核准'}, {'ID':'5', 'text':'五、增值税专用发票（增值税税控系统）最高开票限额审批'}, {'ID':'6', 'text':'六、对采取实际利润额预缴以外的其他企业所得税预缴方式的核定'}, {'ID':'7', 'text':'七、非居民企业选择由其主要机构场所汇总缴纳企业所得税的审批'}]" name="sqsx" enabled="false"></div>
                    </td>
                </tr>
                <tr>
                    <th rowspan="7">申请材料</th>
                    <td colspan="4" id="sqcl-block">
                        <p class="info">除提供经办人身份证件外,应根据申请事项提供以下相应材料:</p>
                        <h4>一、企业印制材料审批</h4>
                        <div name="sqcl-1" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'011','text':'1.税务登记证件'}, {'ID':'012','text':'2.《印刷经营许可证》或《其他印刷品印制许可证》'}, {'ID':'013','text':'3.生产设备、生产流程及安全管理制度'}, {'ID':'014','text':'4.生产工艺及产品检验制度'}, {'ID':'015','text':'5.保存、运输及交付相关制度'}]" enabled="false"></div>
                        <h4>二、对纳税人延期申报的核准</h4>
                        <div name="sqcl-2" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'031','text':'1.《延期申报申请核准表》'}, {'ID':'032','text':'2.确有困难不能正常申报的情况说明'}]" enabled="false"></div>
                        <h4>三、对纳税人延期缴税税款的核准</h4>
                        <div name="sqcl-3" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'id':'021','text':'1.《延期缴纳税款申请审批表》'}, {'ID':'022','text':'2.纳税人申请延期缴纳税款报告（详细说明申请延期原因，人员工资、社会保险费支出情况，连续3个月缴纳税款情况）'}, {'ID':'023','text':'3.当期货币资金余额情况及所有银行存款账户的对账单'}, {'ID':'024','text':'4.应付职工工资和社会保险费等省税务机关要求提供的支出预算'}, {'ID':'025','text':'5.《资产负债表》'}, {'ID':'026','text':'6.因不可抗力，导致纳税人发生较大损失，正常生产经营活动受到较大影响的，应报送因不可抗力的灾情报告或公安机关出具的事故证明'}]" enabled="false"></div>
                        <h4>四、对纳税人变更税定额的核准</h4>
                        <div name="sqcl-4" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'041','text':'1.申请变更纳税定额的相关证明材料'}]" enabled="false"></div>
                        <h4>五、增值税专用发票(增值税税控系统)最高开票限额审批</h4>
                        <div name="sqcl-5" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'051','text':'1.增值税专用发票最高开票限额申请单'}]" enabled="false"></div>
                        <h4>六、对采取实际利润额预缴以外的其他企业所得税预缴方式的核定</h4>
                        <div name="sqcl-6" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'061','text':'1.按照月度或者季度的实际利润额预缴确有困难的证明材料'}]" enabled="false"></div>
                        <h4>七、非居民企业选择由其主要机构场所汇总缴纳企业所得税的审批</h4>
                        <div name="sqcl-7" class="mini-checkboxlist sqsx-yl" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'071','text':'1.汇总缴纳企业所得税的机构、场所对其他机构、场所负有管理责任的证明材料'}, {'ID':'072','text':'2.设有完整的账簿、凭证，能够准确反映各机构、场所的收入、成本、费用和盈亏情况的证明材料'}]" enabled="false"></div>
                    </td>
                </tr>
            </table>
        </div>
        <div title="附报资料">
            <div data-view-type="datagrid">
                <div id="fbzl-yl-grid" class="mini-datagrid" style="width: 1140px; height: 260px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="true" emptytext="该事项不需要上传附报资料">
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
    </div>
</section>
