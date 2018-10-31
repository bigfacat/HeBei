<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="txfpxxView.aspx.cs" Inherits="JlueTaxSystemHBGS.sbzx_web.apps.views.sb_ybnsr_ybjc.txfpxxView" %>

<!DOCTYPE html>


<h2>发票信息采集</h2>
<section>
    <div>为减少您的人工录入量，节约办税时间，系统自动获取您的发票信息，如下所示，请仔细核对您的 发票数据，系统将依据您的发票数据， 自动生成<span class="color-warn">《增值税纳税申报表主表》、《增值税纳税申报表附列资料（一）》、《增值税纳税申报表附列资料（二）》</span>的相关栏次</div>
    <div class="table-container">
        <table>
            <tr>
                <td colspan="2"><span class="color-info txt-bold">销项发票汇总</span>
                    <button class="btn-sggj mg-l-20 width-100" id="xxfp-xxmxcx-btn">销项明细查询</button></td>
            </tr>
            <tr height="40">
                <td width="80">销项发票：</td>
                <td>共 <span class="txt-blue" id="xxfp-fs">0</span> 份， 总金额 <span class="txt-blue" id="xxfp-je">0</span> 元， 总税额 <span class="txt-blue" id="xxfp-se">0</span> 元；</td>
            </tr>
            <tr>
                <td align="right" style="vertical-align: top;">其中：</td>
                <td class="xxfp-flhz">
                    <div class="fp-name">增值税专用发票</div>
                    份数：<span class="txt-blue" id="zzszyfp-fs">0</span> 份， 金额：<span class="txt-blue" id="zzszyfp-je">0</span> 元， 税额：<span class="txt-blue" id="zzszyfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name">增值税普通发票</div>
                    份数：<span class="txt-blue" id="zzsptfp-fs">0</span> 份， 金额：<span class="txt-blue" id="zzsptfp-je">0</span> 元， 税额：<span class="txt-blue" id="zzsptfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name">电子发票</div>
                    份数：<span class="txt-blue" id="dzfp-fs">0</span> 份， 金额：<span class="txt-blue" id="dzfp-je">0</span> 元， 税额：<span class="txt-blue" id="dzfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name">卷式发票</div>
                    份数：<span class="txt-blue" id="jsfp-fs">0</span> 份， 金额：<span class="txt-blue" id="jsfp-je">0</span> 元， 税额：<span class="txt-blue" id="jsfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name">机动车销售统一发票</div>
                    份数：<span class="txt-blue" id="jdcfp-fs">0</span> 份， 金额：<span class="txt-blue" id="jdcfp-je">0</span> 元， 税额：<span class="txt-blue" id="jdcfp-se">0</span> 元；</td>
            </tr>
            <tr id="xxfp-sggj" style="display: none">
                <td></td>
                <td>
                    <div><span class="color-warn">无商品编码的销项发票 <span class="txt-blue" id="xxfp-sggj-fs"></span>份，需要手工归集发票属性</span>
                        <button class="btn-sggj mg-l-20" id="xxfp-sggj-btn">手工归集</button></div>
                </td>
            </tr>
            <tr height="60">
                <td></td>
                <td>
                    <div><span class="color-warn" style="padding-right: 16px">若您有未开具发票收入，需要手工录入未开具发票</span>
                        <button class="btn-sggj mg-l-28" id="xxfp-wkjfp-btn">未开具发票</button></div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div class="xxfp-container">
                        <table class="fphz-table" id="bqxsmx">
                            <thead>
                                <tr>
                                    <td width="30%" colspan="2" rowspan="2">税率（征收率）</td>
                                    <td colspan="2">增值税专用发票</td>
                                    <td colspan="2">其他发票</td>
                                    <td colspan="2" class="wjkfp-title">未开具发票</td>
                                </tr>
                                <tr>
                                    <td width="150">销售额</td>
                                    <td width="150">销项（应纳）税额</td>
                                    <td width="150">销售额</td>
                                    <td width="150">销项（应纳）税额</td>
                                    <td width="150" class="wjkfp-title">销售额</td>
                                    <td width="150" class="wjkfp-title">销项（应纳）税额</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="ybjs yshw17 yslw17">
                                    <td rowspan="6" width="100" id="ybjs-tr">一般计税方法</td>
                                    <td class="td-align-l" width="340">17%税率的货物及加工修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-17-1-xse" value="0" width="100%" name="0_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-17-1-se" value="0" width="100%" name="0_5" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-17-2-xse" value="0" width="100%" name="0_6" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-17-2-se" value="0" width="100%" name="0_7" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input id="ybjs-17-3-xse" class="mini-moneybox" value="0" width="100%" name="0_8"></td>
                                    <td class="wjkfptd">
                                        <input id="ybjs-17-3-se" class="mini-moneybox" value="0" width="100%" name="0_9"></td>
                                </tr>
                                <tr class="ysfw17">
                                    <td class="td-align-l">17%税率的服务、不动产和无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-17-1-xse" value="0" width="100%" name="1_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-17-1-se" value="0" width="100%" name="1_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-17-2-xse" value="0" width="100%" name="1_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-17-2-se" value="0" width="100%" name="1_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input id="ysfw-17-3-xse" class="mini-moneybox" value="0" width="100%" name="1_6"></td>
                                    <td class="wjkfptd">
                                        <input id="ysfw-17-3-se" class="mini-moneybox" value="0" width="100%" name="1_7"></td>
                                </tr>
                                <tr class="yslw13 yshw13 ysfw13">
                                    <td class="td-align-l">13%税率</td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-13-1-xse" value="0" width="100%" name="2_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-13-1-se" value="0" width="100%" name="2_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-13-2-xse" value="0" width="100%" name="2_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-13-2-se" value="0" width="100%" name="2_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ybjs-13-3-xse" value="0" width="100%" name="2_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ybjs-13-3-se" value="0" width="100%" name="2_7"></td>
                                </tr>
                                <tr class="yshw11 yslw11">
                                    <td class="td-align-l">11%税率的货物及加工修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-11-1-xse" value="0" width="100%" name="3_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-11-1-se" value="0" width="100%" name="3_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-11-2-xse" value="0" width="100%" name="3_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ybjs-11-2-se" value="0" width="100%" name="3_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ybjs-11-3-xse" width="100%" name="3_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ybjs-11-3-se" width="100%" name="3_7"></td>
                                </tr>
                                <tr class="ysfw11">
                                    <td class="td-align-l">11%税率的服务、不动产和无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-1-xse" name="4_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-1-se" name="4_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-2-xse" name="4_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-2-se" name="4_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ysfw-11-3-xse" width="100%" name="4_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ysfw-11-3-se" width="100%" name="4_7"></td>
                                </tr>
                                <tr class="sl6">
                                    <td class="td-align-l">6%税率</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="ybjs-6-1-xse" name="5_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="ybjs-6-1-se" name="5_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="ybjs-6-2-xse" name="5_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="ybjs-6-2-se" name="5_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ybjs-6-3-xse" width="100%" name="5_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="ybjs-6-3-se" width="100%" name="5_7"></td>
                                </tr>
                                <tr class="jyjs yshw6 yslw6 ysfw6">
                                    <td rowspan="6" id="jyjs-tr">简易计税方法</td>
                                    <td class="td-align-l">6%征收率</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-6-1-xse" width="100%" name="8_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-6-1-se" width="100%" name="8_5" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-6-2-xse" width="100%" name="8_6" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-6-2-se" width="100%" name="8_7" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="jyjs-6-3-xse" width="100%" name="8_8"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" value="0" id="jyjs-6-3-se" width="100%" name="8_9"></td>
                                </tr>
                                <tr class="yshw5 yslw5">
                                    <td class="td-align-l">5%税率的货物及加工修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-5-1-xse" width="100%" name="9_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-5-1-se" width="100%" name="9_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-5-2-xse" width="100%" name="9_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" id="jyjs-5-2-se" width="100%" name="9_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input id="jyjs-5-3-xse" class="mini-moneybox" value="0" width="100%" name="9_6"></td>
                                    <td class="wjkfptd">
                                        <input id="jyjs-5-3-se" class="mini-moneybox" value="0" width="100%" name="9_7"></td>
                                </tr>
                                <tr class="ysfw5">
                                    <td class="td-align-l">5%税率的服务、不动产和无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-5-1-xse" value="0" width="100%" name="10_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-5-1-se" value="0" width="100%" name="10_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-5-2-xse" value="0" width="100%" name="10_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" id="ysfw-5-2-se" value="0" width="100%" name="10_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-5-3-xse" value="0" width="100%" name="10_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-5-3-se" value="0" width="100%" name="10_7"></td>
                                </tr>
                                <tr class="xxfp-hidden yshw4 yslw4 ysfw4 jyjs4">
                                    <td class="td-align-l">4%征收率</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-4-1-xse" name="11_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-4-1-se" name="11_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-4-2-xse" name="11_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-4-2-se" name="11_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="jyjs-4-3-xse" value="0" width="100%" name="11_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="jyjs-4-3-se" value="0" width="100%" name="11_7"></td>
                                </tr>
                                <tr class="yshw3 yslw3">
                                    <td class="td-align-l">3%税率的货物及加工修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-3-1-xse" name="12_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-3-1-se" name="12_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-3-2-xse" name="12_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" value="0" id="jyjs-3-2-se" name="12_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="jyjs-3-3-xse" width="100%" value="0" name="12_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="jyjs-3-3-se" width="100%" value="0" name="12_7"></td>
                                </tr>
                                <tr class="ysfw3">
                                    <td class="td-align-l">3%税率的服务、不动产和无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-3-1-xse" value="0" name="13_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-3-1-se" value="0" name="13_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-3-2-xse" value="0" name="13_4" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-3-2-se" value="0" name="13_5" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-3-3-xse" width="100%" value="0" name="13_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-3-3-se" width="100%" value="0" name="13_7"></td>
                                </tr>
                                <tr class="ms yshw0 yslw0">
                                    <td rowspan="2">免税</td>
                                    <td class="td-align-l">货物及加工修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ms-0-1-xse" name="21_3" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ms-0-1-se" name="21_4" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ms-0-2-xse" name="21_5" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ms-0-2-se" name="21_6" value="0" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ms-0-3-xse" width="100%" value="0" name="21_7"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ms-0-3-se" width="100%" value="0" name="21_8"></td>
                                </tr>
                                <tr class="ysfw0">
                                    <td class="td-align-l">服务、不动产和无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-0-1-xse" name="22_2" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-0-1-se" name="22_3" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-0-2-xse" name="22_4" value="0" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" width="100%" id="ysfw-0-2-se" name="22_5" value="0" readonly=""></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-0-3-xse" width="100%" value="0" name="22_6"></td>
                                    <td class="wjkfptd">
                                        <input class="mini-moneybox" id="ysfw-0-3-se" width="100%" value="0" name="22_7"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr height="60">
                <td></td>
                <td>
                    <div class="color-warn">温馨提示：请您核实并确认以上数据，云厅将据此生成《增值税纳税申报表附列资料一（本期销售情况明细）》</div>
                </td>
            </tr>
        </table>
        <div id="ycfp-content" class="ycfp-content">
            <div style="display: none" id="yccfxtx">
                <div class="color-info txt-bold mb10">异常抵扣凭证风险提醒：</div>
                <div class="color-warn mb10">您取得的以下增值税扣税凭证属于异常抵扣凭证，请及时按规定进行处理：<br>
                    1.增值税失控发票、作废增值税专用发票和作废机动车销售统一发票，暂不得作为增值税进项税额的抵扣凭证，需经核查后按有关规定进行处理。<br>
                    2.红字增值税专用发票和红字机动车销售统一发票，所对应蓝字发票已抵扣税款，应进行进项税额转出。<br>
                    3.异常增值税扣税凭证，尚未申报抵扣或申报出口退税的，暂不允许抵扣或办理退税；已经申报抵扣的，需要先作进项税额转出。<br>
                </div>
            </div>
            <div id="skfp" class="grid-box">
                <div class="color-warn txt-bold mb10">失控发票</div>
                <div id="skfp-grid" class="mini-datagrid" style="width: auto; height: 190px;" allowresize="false" allowsortcolumn="false" showpager="false" allowheaderwrap="true">
                    <div property="columns">
                        <div type="indexcolumn" width="50">序号</div>
                        <div field="fpdm" width="108">发票代码</div>
                        <div field="fphm" width="80">发票号码</div>
                        <div field="fpzt" width="80">发票状态</div>
                        <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                        <div field="gfnsrsbh" width="100">购货方纳税人识别号</div>
                        <div field="gfnsrmc" width="100">购货方纳税人名称</div>
                        <div field="xfnsrsbh" width="100">销货方纳税人识别号</div>
                        <div field="xfnsrmc" width="100">销货方纳税人名称</div>
                        <div field="je" width="100">金额</div>
                        <div field="se" width="100">税额</div>
                    </div>
                </div>
            </div>
            <div id="zffp" class="grid-box">
                <div class="color-warn txt-bold mb10">作废发票</div>
                <div id="zffp-grid" class="mini-datagrid" style="width: auto; height: 190px;" allowresize="false" allowsortcolumn="false" showpager="false" allowheaderwrap="true">
                    <div property="columns">
                        <div type="indexcolumn" width="50">序号</div>
                        <div field="fpdm" width="108">发票代码</div>
                        <div field="fphm" width="80">发票号码</div>
                        <div field="fpzt" width="80">发票状态</div>
                        <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                        <div field="gfnsrsbh" width="100">购货方纳税人识别号</div>
                        <div field="gfnsrmc" width="100">购货方纳税人名称</div>
                        <div field="xfnsrsbh" width="100">销货方纳税人识别号</div>
                        <div field="xfnsrmc" width="100">销货方纳税人名称</div>
                        <div field="je" width="100">金额</div>
                        <div field="se" width="100">税额</div>
                    </div>
                </div>
            </div>
            <div id="hzfp" class="grid-box">
                <div class="color-warn txt-bold mb10">红字发票</div>
                <div id="hzfp-grid" class="mini-datagrid" style="width: auto; height: 190px;" allowresize="false" allowsortcolumn="false" showpager="false" allowheaderwrap="true">
                    <div property="columns">
                        <div type="indexcolumn" width="50">序号</div>
                        <div field="fpdm" width="108">发票代码</div>
                        <div field="fphm" width="80">发票号码</div>
                        <div field="fpzt" width="80">发票状态</div>
                        <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                        <div field="gfnsrsbh" width="100">购货方纳税人识别号</div>
                        <div field="gfnsrmc" width="100">购货方纳税人名称</div>
                        <div field="xfnsrsbh" width="100">销货方纳税人识别号</div>
                        <div field="xfnsrmc" width="100">销货方纳税人名称</div>
                        <div field="je" width="100">金额</div>
                        <div field="se" width="100">税额</div>
                    </div>
                </div>
            </div>
        </div>
        <table>
            <tr>
                <td colspan="2"><span class="color-info txt-bold">进项发票汇总</span>
                    <button class="btn-sggj mg-l-20 width-100" id="jxfp-xxmxcx-btn">进项明细查询</button></td>
            </tr>
            <tr height="40">
                <td width="80">进项发票：</td>
                <td>共 <span class="txt-blue" id="jxfp-fs">0</span> 份， 总金额 <span class="txt-blue" id="jxfp-je">0</span> 元， 总税额 <span class="txt-blue" id="jxfp-se">0</span> 元；</td>
            </tr>
            <tr class="showByfdq" style="display: none">
                <td></td>
                <td>
                    <div><span class="color-warn" style="padding-right: 16px">请在【进项明细查询】中，设置发票的抵扣类型，否则默认本期抵扣</span></div>
                </td>
            </tr>
            <%--<tr height="60" id="jxfp-sggj" style="display: none">
                <td></td>
                <td>
                    <div><span class="color-warn">无商品编码的进项发票 <span class="txt-blue" id="jxfp-sggj-fs">0</span> 份，需要手工归集发票属性</span>
                        <button class="btn-sggj mg-l-20" id="jxfp-sggj-btn">手工归集</button></div>
                </td>
            </tr>--%>
            <tr style="display: none;">
                <td></td>
                <td>
                    <div class="xxfp-container">
                        <table class="fphz-table" id="bqdkjxsejgmx">
                            <thead>
                                <tr>
                                    <td rowspan="3">进项分类</td>
                                    <td colspan="12">税率（征收率）</td>
                                </tr>
                                <tr>
                                    <td colspan="2">17%税率</td>
                                    <td colspan="2">13%税率</td>
                                    <td colspan="2">11%税率</td>
                                    <td colspan="2">6%税率</td>
                                    <td colspan="2">5%税率</td>
                                    <td colspan="2">3%税率</td>
                                </tr>
                                <tr>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                    <td width="120">金额</td>
                                    <td width="120">税额</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="yxdc">
                                    <td class="td-align-l">有形动产租赁</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-17-je" readonly="" name="4_2"></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-17-se" readonly="" name="4_3"></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-11-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-11-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-3-je" name="25_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="yxdc-3-se" name="25_3" readonly=""></td>
                                </tr>
                                <tr class="ysfw">
                                    <td class="td-align-l">运输服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-je" name="7_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-11-se" name="7_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-3-je" name="21_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="ysfw-3-se" name="21_3" readonly=""></td>
                                </tr>
                                <tr class="dxfw">
                                    <td class="td-align-l">电信服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-11-je" name="8_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-11-se" name="8_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-6-je" name="13_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-6-se" name="13_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-3-je" name="22_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="dxfw-3-se" name="22_3" readonly=""></td>
                                </tr>
                                <tr class="jzazfw">
                                    <td class="td-align-l">建筑安装服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-11-je" name="9_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-11-se" name="9_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-3-je" name="23_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jzazfw-3-se" name="23_3" readonly=""></td>
                                </tr>
                                <tr class="bdcfw">
                                    <td class="td-align-l">不动产租赁服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-11-je" name="10_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-11-se" name="10_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-5-je" name="18_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-5-se" name="18_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-3-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="bdcfw-3-se" readonly=""></td>
                                </tr>
                                <tr class="srtdsyq">
                                    <td class="td-align-l">受让土地使用权</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-11-je" name="11_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-11-se" name="11_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-3-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="srtdsyq-3-se" readonly=""></td>
                                </tr>
                                <tr class="jrbxfw">
                                    <td class="td-align-l">金融保险服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-11-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-11-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-6-je" name="14_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-6-se" name="14_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-3-je" name="24_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jrbxfw-3-se" name="24_3" readonly=""></td>
                                </tr>
                                <tr class="shfw">
                                    <td class="td-align-l">生活服务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-11-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-11-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-6-je" name="15_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-6-se" name="15_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-3-je" name="26_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="shfw-3-se" name="26_3" readonly=""></td>
                                </tr>
                                <tr class="wxzc">
                                    <td class="td-align-l">无形资产</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-11-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-11-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-6-je" name="16_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-6-se" name="16_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-3-je" name="27_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="wxzc-3-se" name="27_3" readonly=""></td>
                                </tr>
                                <tr class="hwjg">
                                    <td class="td-align-l">货物及加工、修理修配劳务</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-17-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-17-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-13-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-13-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-11-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-11-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-6-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-6-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-5-je" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-5-se" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-3-je" name="20_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="hwjg-3-se" name="20_3" readonly=""></td>
                                </tr>
                                <tr class="jxfp-hjxx">
                                    <td class="td-align-l">合计</td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_3_2" name="3_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_3_3" name="3_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_5_2" name="5_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_5_3" name="5_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_6_2" name="6_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_6_3" name="6_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_12_2" name="12_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_12_3" name="12_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_17_2" name="17_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_17_3" name="17_3" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_19_2" name="19_2" readonly=""></td>
                                    <td>
                                        <input class="mini-moneybox" value="0" width="100%" id="jxhj_19_3" name="19_3" readonly=""></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr height="60">
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <table class="fphz-table" id="bqjxsemx">
                        <tr>
                            <th colspan="4">一、申报抵扣的进项税额</th>
                        </tr>
                        <tr>
                            <td width="350">项目</td>
                            <td width="210">份数</td>
                            <td width="210">金额</td>
                            <td width="210">税额</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="td-align-l">（一）认证相符的增值税专用发票</td>
                        </tr>
                        <tr>
                            <td class="td-align-l indent-2em">其中：本期认证相符且本期申报抵扣</td>
                            <td>
                                <input class="mini-textbox" id="dk-zyfpxx-fs" value="0" width="100%" name="1_2" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="dk-zyfpxx-je" value="0" width="100%" name="1_3" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="dk-zyfpxx-se" value="0" width="100%" name="1_4" readonly=""></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="td-align-l">（二）其他扣税凭证</td>
                        </tr>
                        <tr>
                            <td class="td-align-l indent-2em">其中：海关进口增值税专用缴款书</td>
                            <td>
                                <input class="mini-textbox" id="dk-hgpxx-fs" value="0" width="100%" name="4_2" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="dk-hgpxx-je" value="0" width="100%" name="4_3" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="dk-hgpxx-se" value="0" width="100%" name="4_4" readonly=""></td>
                        </tr>
                        <tr>
                            <th colspan="4">三、待抵扣进项税额</th>
                        </tr>
                        <tr>
                            <td>项目</td>
                            <td>份数</td>
                            <td>金额</td>
                            <td>税额</td>
                        </tr>
                        <tr>
                            <td class="td-align-l" colspan="4">（一）认证相符的增值税专用发票</td>
                        </tr>
                        <tr>
                            <td class="td-align-l indent-2em">本期认证相符且本期申报抵扣</td>
                            <td>
                                <input class="mini-textbox" id="ddk-zyfpxx-fs" value="0" width="100%" name="30_2" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="ddk-zyfpxx-je" value="0" width="100%" name="30_3" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="ddk-zyfpxx-se" value="0" width="100%" name="30_4" readonly=""></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="td-align-l">（二）其他扣税凭证</td>
                        </tr>
                        <tr>
                            <td class="td-align-l indent-2em">其中：海关进口增值税专用缴款书</td>
                            <td>
                                <input class="mini-textbox" id="ddk-hgpxx-fs" value="0" width="100%" name="34_2" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="ddk-hgpxx-je" value="0" width="100%" name="34_3" readonly=""></td>
                            <td>
                                <input class="mini-textbox" id="ddk-hgpxx-se" value="0" width="100%" name="34_4" readonly=""></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr height="60">
                <td></td>
                <td>
                    <div class="color-warn">温馨提示：请您核实并确认以上数据，云厅将据此生成《增值税纳税申报表附列资料二（本期进项税额明细）》</div>
                </td>
            </tr>
        </table>
        <div class="txt-r">
            <button class="btn-sggj" id="generate-btn">生成申报表</button>
            <button class="btn-cancel mg-r-20" id="cancel-btn">取消</button></div>
    </div>
</section>
