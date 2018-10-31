<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="swxzxksqb.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.swxzxk.swxzxksqb" %>

<!DOCTYPE html>


<h2>填写申请表</h2>
<section>
    <div class="wrapper" id="tx-swxksqb">
        <h2>税务行政许可申请表</h2>
        <table id="sqb1" border="" cellspacing="" cellpadding="">
            <tr>
                <td style="border: none" colspan="4">
                    <input class="mini-textbox mini-textbox-border swxzxk-date" id="swszxk-date" name="sqrq" readonly="true"></td>
            </tr>
            <tr>
                <th rowspan="8" width="80">申请人</th>
                <th>申请人名称</th>
                <td colspan="3"><span class="mini-textbox mini-textbox-border" id="sqrmc" name="sqrmc" readonly="true"></span></td>
            </tr>
            <tr>
                <th>统一社会信用代码<br>
                    （纳税人识别号）</th>
                <td colspan="3"><span class="mini-textbox mini-textbox-border mini-required" id="nsrsbh" name="nsrsbh" readonly="true"></span></td>
            </tr>
            <tr>
                <th>法定代表人<br>
                    (负责人)</th>
                <td colspan="3"><span class="mini-textbox mini-textbox-border mini-required" id="fddbr" name="fddbr" readonly="true"></span></td>
            </tr>
            <tr>
                <th>地址和邮政编码</th>
                <td colspan="3"><span class="mini-textbox mini-textbox-border" required="true" id="dzyzbm" name="dzyzbm" requirederrortext="地址和邮政编码不能为空"></span></td>
            </tr>
            <tr>
                <th width="140">经办人</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" id="jbr" required="true" name="jbr" requirederrortext="经办人不能为空"></span></td>
                <th width="140">身份证件号码</th>
                <td width="220">
                    <input class="mini-textbox mini-textbox-border" required="true" vtype="sfzjhm" requirederrortext="经办人身份证号码输入不能为空" sfzjhmerrortext="经办人身份证号码输入不正确" id="jbr_sfzh" name="jbr_sfzh"></td>
            </tr>
            <tr>
                <th width="140">联系电话</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" vtype="mobilePhone" mobilephoneerrortext="经办人联系电话输入不正确" id="jbr_lxdh" required="true" name="jbr_lxdh" requirederrortext="经办人联系电话不能为空"></span></td>
                <th width="140">联系地址</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" id="jbr_lxdz" required="true" name="jbr_lxdz" requirederrortext="经办人联系地址不能为空"></span></td>
            </tr>
            <tr>
                <th width="140">委托代理人</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" id="wtdlr" name="wtdlr"></span></td>
                <th width="140">身份证件号码</th>
                <td width="220"><span class="mini-textbox mini-textbox-border" id="wtdlr_sfzh" name="wtdlr_sfzh" vtype="sfzjhm" sfzjhmerrortext="委托代理人身份证号码输入不正确" requirederrortext="委托代理人身份证号码不能为空"></span></td>
            </tr>
            <tr>
                <th width="140">联系电话</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" id="wtdlr_lxdh" name="wtdlr_lxdh" vtype="mobilePhone" mobilephoneerrortext="委托代理人联系电话输入不正确" requirederrortext="委托代理人联系电话不能为空"></span></td>
                <th width="140">联系地址</th>
                <td width="220"><span class="mini-textbox mini-textbox-border mini-required" id="wtdlr_lxdz" name="wtdlr_lxdz"></span></td>
            </tr>
            <tr>
                <th>申请事项</th>
                <td colspan="4">
                    <div id="sqsx" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" onload="onload" data="[{'ID':'1', 'text':'一、企业印制发票审批'}, {'ID':'2', 'text':'二、对纳税人延期申报的核准'}, {'ID':'3', 'text':'三、对纳税人延期缴纳税款的核准'}, {'ID':'4', 'text':'四、对纳税人变更纳税定额的核准'}, {'ID':'5', 'text':'五、增值税专用发票（增值税税控系统）最高开票限额审批'}, {'ID':'6', 'text':'六、对采取实际利润额预缴以外的其他企业所得税预缴方式的核定'}, {'ID':'7', 'text':'七、非居民企业选择由其主要机构场所汇总缴纳企业所得税的审批'}]" name="sqsx" onvaluechanged="swxzxk.doCheckChanged"></div>
                </td>
            </tr>
            <tr>
                <th rowspan="7">申请材料</th>
                <td colspan="4" id="sqcl-block">
                    <p class="info">除提供经办人身份证件外,应根据申请事项提供以下相应材料:</p>
                    <h4>一、企业印制材料审批</h4>
                    <div id="sqcl-1" name="sqcl-1" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'011','text':'1.税务登记证件'}, {'ID':'012','text':'2.《印刷经营许可证》或《其他印刷品印制许可证》'}, {'ID':'013','text':'3.生产设备、生产流程及安全管理制度'}, {'ID':'014','text':'4.生产工艺及产品检验制度'}, {'ID':'015','text':'5.保存、运输及交付相关制度'}]"></div>
                    <h4>二、对纳税人延期申报的核准</h4>
                    <div id="sqcl-2" name="sqcl-2" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'031','text':'1.《延期申报申请核准表》'}, {'ID':'032','text':'2.确有困难不能正常申报的情况说明'}]"></div>
                    <h4>三、对纳税人延期缴税税款的核准</h4>
                    <div id="sqcl-3" name="sqcl-3" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'021','text':'1.《延期缴纳税款申请审批表》'}, {'ID':'022','text':'2.纳税人申请延期缴纳税款报告（详细说明申请延期原因，人员工资、社会保险费支出情况，连续3个月缴纳税款情况）'}, {'ID':'023','text':'3.当期货币资金余额情况及所有银行存款账户的对账单'}, {'ID':'024','text':'4.应付职工工资和社会保险费等省税务机关要求提供的支出预算'}, {'ID':'025','text':'5.《资产负债表》'}, {'ID':'026','text':'6.因不可抗力，导致纳税人发生较大损失，正常生产经营活动受到较大影响的，应报送因不可抗力的灾情报告或公安机关出具的事故证明'}]"></div>
                    <h4>四、对纳税人变更税定额的核准</h4>
                    <div id="sqcl-4" name="sqcl-4" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'041','text':'1.申请变更纳税定额的相关证明材料'}]"></div>
                    <h4>五、增值税专用发票(增值税税控系统)最高开票限额审批</h4>
                    <div id="sqcl-5" name="sqcl-5" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'051','text':'1.增值税专用发票最高开票限额申请单'}]"></div>
                    <h4>六、对采取实际利润额预缴以外的其他企业所得税预缴方式的核定</h4>
                    <div id="sqcl-6" name="sqcl-6" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'061','text':'1.按照月度或者季度的实际利润额预缴确有困难的证明材料'}]"></div>
                    <h4>七、非居民企业选择由其主要机构场所汇总缴纳企业所得税的审批</h4>
                    <div id="sqcl-7" name="sqcl-7" class="mini-checkboxlist" repeatdirection="vertical" repeatitems="8" repeatlayout="table" textfield="text" valuefield="ID" value="ID,text" onload="onload" data="[{'ID':'071','text':'1.汇总缴纳企业所得税的机构、场所对其他机构、场所负有管理责任的证明材料'}, {'ID':'072','text':'2.设有完整的账簿、凭证，能够准确反映各机构、场所的收入、成本、费用和盈亏情况的证明材料'}]"></div>
                </td>
            </tr>
        </table>
    </div>
    <div class="mini-window" id="blyj-window" title="办理依据-详细信息" style="width: 820px;" showmodal="true" allowdrag="true">
        <div class="content-text">
            <div class="blyj-list" id="blyj-list-1">
                <div class="blyj-title">
                    <h1>企业印制发票审批</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国税收征收管理法》第22条：“增值税专用发票由国务院税务主管部门指定的企业印制； 其他发票，按照国务院税务主管部门的规定，分别由省、自治区、直辖市国家税务局、地方税务局指定企业印制。 未经前款规定的税务机关指定，不得印制发票。”</p>
                <p>2.《中华人民共和国发票管理办法》第7条：“增值税专用发票由国务院税务主管部门确定的企业印制； 其他发票，按照国务院税务主管部门的规定，分别由省、自治区、直辖市税务机关确定的企业印制。 禁止私自印制、伪造、变造发票。”</p>
                <p>3.《中华人民共和国发票管理办法》第8条：“印制发票的企业应当具备下列条件：（一）取得印刷经营许可证和营业执照； （二）设备、技术水平能够满足印刷发票的需要；（三）有健全的财务制度和严格的质量监督、安全管理、保密制度。 税务机关应当以招标方式确定印制发票的企业，并发给发票准印证。”</p>
                <p>4.《中华人民共和国发票管理办法》第14条：“各省、自治区、直辖市内的单位和个人使用的发票，除增值税专用发票外， 应当在本省、自治区、直辖市内印制；确有必要到外省、自治区、直辖市印制的，应当由省、自治区、直辖市税务机关商印制地省、 自治区、直辖市税务机关同意，由印制地省、自治区、直辖市税务机关指定的印制发票的企业印制。禁止在境外印制发票。”</p>
            </div>
            <div class="blyj-list" id="blyj-list-2">
                <div class="blyj-title">
                    <h1>对纳税人延期申报的核准</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国税收征收管理法》第27条：“纳税人、扣缴义务人不能按期办理纳税申报或者报送代扣代缴、 代收代缴税款报告表的，经税务机关核准，可以延期申报。”</p>
                <p>2.《中华人民共和国税收征收管理法实施细则》第37条：“纳税人、扣缴义务人按照规定的期限办理纳税申报或者报送代扣代缴、 代收代缴税款报告表确有困难，需要延期的，应当在规定的期限内向税务机关提出书面延期申请，经税务机关核准， 在核准的期限内办理。纳税人、扣缴义务人因不可抗力，不能按期办理纳税申报或者报送代扣代缴、代收代缴税款报告表的， 可以延期办理；但是，应当在不可抗力情形消除后立即向税务机关报告。税务机关应当查明事实，予以核准。”</p>
            </div>
            <div class="blyj-list" id="blyj-list-3">
                <div class="blyj-title">
                    <h1>对纳税人延期缴纳税款的核准</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国税收征收管理法》第31条第2款：“纳税人因有特殊困难，不能按期缴纳税款的， 经省、自治区、直辖市国家税务局、地方税务局批准，可以延期缴纳税款，但是最长不得超过三个月。”</p>
                <p>2.《中华人民共和国税收征收管理法实施细则》第41条：“计划单列市国家税务局、地方税务局可以参照税收征管法 第三十一条第二款的批准权限，审批纳税人延期缴纳税款。”</p>
            </div>
            <div class="blyj-list" id="blyj-list-4">
                <div class="blyj-title">
                    <h1>对纳税人变更纳税定额的核准</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国税收征收管理法实施细则》第47条：“纳税人对税务机关采取本条规定的方法核定的应纳税额有异议的， 应当提供相关证据，经税务机关认定后，调整应纳税额.”</p>
            </div>
            <div class="blyj-list" id="blyj-list-5">
                <div class="blyj-title">
                    <h1>增值税专用发票（增值税税控系统）最高开票限额审批</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《国务院对确需保留的行政审批项目设定行政许可的决定》（国务院令第412号）附件第236项：增值税防伪税控系统最高 开票限额审批。《国家税务总局关于在全国开展营业税改征增值税试点有关征收管理问题的公告》（国家税务总局公告〔2013〕39号） 第三条：“增值税专用发票（增值税税控系统）实行最高开票限额管理。最高开票限额，是指单份专用发票或货运专票开具的 销售额合计数不得达到的上限额度。最高开票限额由一般纳税人申请，区县税务机关依法审批。一般纳税人申请最高开票限额时， 需填报《增值税专用发票最高开票限额申请单》。主管税务机关受理纳税人申请以后，根据需要进行实地查验。实地查验的范围和方法 由各省国税机关确定。税务机关应根据纳税人实际生产经营和销售情况进行审批，保证纳税人生产经营的正常需要。”</p>
            </div>
            <div class="blyj-list" id="blyj-list-6">
                <div class="blyj-title">
                    <h1>对采取实际利润额预缴以外的其他企业所得税预缴方式的核定</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国企业所得税法实施条例》第128条：“企业所得税分月或分季预缴，由税务机关具体核定。企业根据企业所得税法 第五十四条规定分月或者分季预缴企业所得税时，应当按照月度或者季度的实际利润额预缴；按照月度或者季度的实际利润额预缴 有困难的，可以按照上一纳税年度应纳税所得额的月度或者季度平均额预缴，或者按照经税务机关认可的其他方法预缴。”</p>
            </div>
            <div class="blyj-list" id="blyj-list-7">
                <div class="blyj-title">
                    <h1>非居民企业选择由其主要机构场所汇总缴纳企业所得税审批</h1>
                </div>
                <h2>办理依据</h2>
                <p>1.《中华人民共和国企业所得税法》第51条：“非居民企业取得本法第三条第二款规定的所得，以机构、场所所在地为纳税地点。 非居民企业在中国境内设立两个或者两个以上机构、场所的，经税务机关审核批准，可以选择由其主要机构、场所汇总缴纳 企业所得税。非居民企业取得本法第三条第三款规定的所得，以扣缴义务人所在地为纳税地点。”</p>
                <p>2.《中华人民共和国企业所得税法实施条例》第127条：“企业所得税法第五十一条所称经税务机关审核批准，是指经各机构、 场所所在地税务机关的共同上级税务机关审核批准。非居民企业经批准汇总缴纳企业所得税后，需要增设、合并、迁移、关闭机构、 场所或者停止机构、场所业务的，应当事先由负责汇总申报缴纳企业所得税的主要机构、场所向其所在地税务机关报告； 需要变更汇总缴纳企业所得税的主要机构、场所的，依照前款规定办理。”</p>
            </div>
            <div class="btn-agree">
                <button class="mini-button" onclick="closeBlyjWin()">确定</button></div>
        </div>
    </div>
</section>
