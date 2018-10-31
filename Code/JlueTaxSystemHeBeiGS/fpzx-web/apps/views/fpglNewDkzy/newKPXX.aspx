<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="newKPXX.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglNewDkzy.newKPXX" %>

<!DOCTYPE html>


<h2>填写开票信息</h2>
<section class="">
    <div class="kpxx-box">
        <div class="kpxx-title">
            <div class="big-text">增值税专用发票</div>
            <div class="small-text">此联不做报销、扣税凭证使用</div>
        </div>
        <div class="" style="padding-top: 10px;">
            <div class="text-right">开票日期：<span class="dqrq_text"></span></div>
            <p class="tip text-center">货物劳务信息超过 <span class="red">8</span> 条，请填写清单 <a class="green go-upload">去填写</a> <a class="green show-upload" onclick="dkzyfp.showLwHwView()" style="display: none">查看清单</a></p>
            <p class="tip">温馨提示：您可填写金额（含税），系统会自动计算金额（不含税）。</p>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="kpxx" style="table-layout: fixed;">
            <tr>
                <td class="gray-td vertical-td" style="width: 5%">购<br>
                    买<br>
                    方</td>
                <td colspan="4" class="bor-right-none company-info">
                    <form id="showTxl" style="width: 400px;">
                        <label>名<em class="w4"></em>称：</label>
                        <input style="width: 96%" class="mini-textbox" name="ghfNsrmc" id="ghfNsrmc_ghf" required="true" requirederrortext="购买方名称不能为空" settooltip=""><br>
                        <label>纳税人识别号：</label>
                        <input style="width: 96%" class="mini-textbox" onblur="kpxxObj.onTxlxxBlur" name="ghfNsrsbh" id="ghf_ghfNsrsbh" vtype="nsrsbh;required" requirederrortext="购买方纳税人识别号不能为空"><br>
                        <input name="issnnsr" class="mini-hidden" style="width: 100%">
                        <label>地<em class="w_25"></em>址<em class="w_25"></em>、<em class="w_25"></em>电<em class="w_25"></em>话：</label>
                        <input style="width: 55%" class="mini-textbox" name="ghfDz" id="ghfDz_ghf" required="true" requirederrortext="购买方地址不能为空">
                        <input style="width: 40%" class="mini-textbox" name="ghfLxdh" required="true" onvalidation="dkzyfp.onlxdh" requirederrortext="购买方电话不能为空"><br>
                        <label>开户行及账号：</label>
                        <input style="width: 55%" class="mini-textbox" name="ghfYhyywdMc" id="ghfYhyywdMc_ghf" required="true" requirederrortext="购买方开户行不能为空">
                        <input style="width: 40%" class="mini-textbox" name="ghfYhkhzh" vtype="int;required" requirederrortext="购买方账号不能为空">
                        <input class="mini-textbox mini-hidden" name="ghfYhhbMc">
                        <input class="mini-textbox mini-hidden" name="ghfYhhbDm"><input class="mini-hidden" name="djxh" readonly="true"></form>
                </td>
                <td colspan="2" class="bor-left-none text-right" width="221px" style="padding-right: 10px;"><a class="kpxx_btn green-btn" method="openTXL"><i class="ion-txl"></i><span class="openTXL-btn">从购买方通讯录导入</span></a></td>
                <td class="gray-td vertical-td">
                    <label style="display: block; width: 50px;">密<br>
                        码<br>
                        区</label></td>
                <td colspan="3" style="width: 28%"></td>
            </tr>
            <tr>
                <td colspan="11"><span>选择征收品目：</span> <span class="input-box" style="width: 300px; display: inline-block;">
                    <input id="zspmDm" name="zspmdm" class="mini-combobox" valuefield="zspmdm" textfield="zspmmc" required="true" onvaluechanged="zspmChange" requirederrortext="征收品目不能为空"></span></td>
            </tr>
            <tr>
                <td colspan="11" style="padding: 0px;">
                    <div id="lwhwxx-grid" class="mini-datagrid" style="width: 100%; height: 318px;" oncellcommitedit="kpCommitEdit" oncellendedit="kpEndEdit" allowresizecolumn="false" allowcelledit="true" allowcellselect="true" multiselect="true" editnextonenterkey="true" editnextrowcell="true" idfield="id">
                        <div property="columns">
                            <div field="hwlwmc" width="165">货物或应税劳务、服务名称<span class="red">*</span>
                                <input property="editor" name="hwlwmc" class="mini-textbox" maxlength="30"></div>
                            <div field="MC" width="165">货物或应税劳务、服务名称<span class="red">*</span>
                                <input property="editor" name="MC" class="mini-textbox" emptytext="非必填" readonly=""></div>
                            <div field="ggxh">规格型号
                                <input property="editor" name="ggxh" class="mini-textbox" emptytext="非必填"></div>
                            <div field="dwslDm" displayfield="dwslDmText" type="comboboxcolumn" width="100">单位
                                <input property="editor" name="dw" class="mini-combobox" textfield="MC" valuefield="ID" emptytext="非必填" allowinput="true" shownullitem="true" nullitemtext="请选择" onvaluechanged="selectChangeDw" data="dwData"></div>
                            <div field="hlsl">数量
                                <input property="editor" vtype="float;maxLength:18" name="hlsl" class="mini-textbox" onvalidation="onFloatValidae" emptytext="非必填"></div>
                            <div field="hldj">单价 <span class="instruction-ico" type="dj"></span>
                                <input property="editor" vtype="float;maxLength:18" onvalidation="onFloatValidae" class="mini-textbox"></div>
                            <div field="jeHs">金额（含税）
                                <input property="editor" vtype="float;maxLength:18" class="mini-textbox" onvalidation="onFloatValidae"></div>
                            <div field="je">金额（不含税）<span class="red">*</span> <span class="instruction-ico" type="je"></span>
                                <input property="editor" vtype="float;maxLength:18" class="mini-textbox" onvalidation="onFloatValidae"></div>
                            <div class="gray-td" field="slv" width="60">税率</div>
                            <div field="se" class="bor-right-none" width="100" style="width: 100px;">税额 <span class="red">*</span>
                                <input property="editor" name="se" class="mini-textbox" readonly=""></div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="input-nobor hj-td" id="hjse">
                <td class="gray-td" colspan="2">合计</td>
                <td class="gray-td bor-right-none"></td>
                <td class="gray-td bor-right-none bor-left-none"></td>
                <td class="gray-td bor-right-none bor-left-none"></td>
                <td class="gray-td bor-right-none bor-left-none"></td>
                <td class="gray-td bor-left-none text-center bor-right-none" colspan="2" width="151px">
                    <input class="mini-textbox text-center" id="jehsHj" name="jehsHj" readonly=""></td>
                <td class="gray-td bor-right-none bor-left-none" width="140px">
                    <input class="mini-textbox" id="jebhsHj" name="jebhsHj" readonly=""></td>
                <td class="gray-td bor-right-none bor-left-none" width="69px"></td>
                <td class="gray-td bor-left-none" width="119px">
                    <input class="mini-textbox" id="seHj" name="seHj" readonly=""></td>
            </tr>
            <tr id="jshj_view" class="input-nobor">
                <td class="gray-td" colspan="2">价税合计（大写）</td>
                <td colspan="9" style="line-height: 24px;" class="input-nobor">
                    <input class="mini-textbox" name="hjdx" style="width: 40%; padding: 0px" readonly="" value="零元整">
                    <label style="margin-left: 30%;">（小写）</label>￥
                    <input class="mini-textbox" style="width: 170px; padding: 0px" name="hjxx" readonly=""></td>
            </tr>
            <tr id="xhfxx">
                <td class="gray-td vertical-td">销<br>
                    售<br>
                    方</td>
                <td colspan="6" class="company-info">
                    <label>名<em class="w4"></em>称：</label>
                    <input style="width: 80%" class="mini-textbox" name="nsrmc" readonly=""><br>
                    <label>纳税人识别号：</label>
                    <input style="width: 80%" class="mini-textbox" name="nsrsbh" readonly=""><br>
                    <label>地<em class="w_25"></em>址<em class="w_25"></em>、<em class="w_25"></em>电<em class="w_25"></em>话：</label>
                    <input style="width: 50%" class="mini-textbox" name="scjydz" required="true" requirederrortext="销货方地址不能为空">
                    <input style="width: 30%" class="mini-textbox" name="jbrdh" required="true" onvalidation="dkzyfp.onlxdh" requirederrortext="销货方电话不能为空"><br>
                    <label>开户行及账号：</label>
                    <input name="yhyywdMc" style="width: 50%" class="mini-textbox" readonly=""><input name="yhzh" style="width: 30%" class="mini-textbox" readonly=""><input class="mini-hidden" name="yhhbDm"><input class="mini-hidden" name="yhhbDm">
                    <input class="mini-hidden" name="djxh" readonly="true"><input class="mini-hidden" name="zspm" id="ghf_zspm"><input class="mini-hidden" name="hyDm" id="ghf_hydm"></td>
                <td class="gray-td vertical-td">
                    <label>备<br>
                        注</label></td>
                <td colspan="3">
                    <input id="bz" maxlength="200" class="mini-textarea bz-text" name="bz" emptytext="请输入备注" vtype="maxLength:200" style="height: 110px; width: 95%; line-height: 18px;"></td>
            </tr>
            <tr class="bor-none" id="sfrFhfForm">
                <td colspan="3">
                    <label>收款人：</label>
                    <input class="mini-textbox" name="skr" style="width: 150px;" required="true" requirederrortext="收款人不能为空"></td>
                <td colspan="2">
                    <label>复核人：</label>
                    <input class="mini-textbox" name="fhr" style="width: 150px;" required="true" requirederrortext="复核人不能为空"></td>
                <td colspan="2">
                    <label>开票人：</label><input class="mini-textbox" name="kpr" style="width: 150px;"><input class="mini-hidden" name="jbr" id="zpdk-skfxx-jbrxm"></td>
                <td colspan="4">
                    <label>销售方：</label>（章）</td>
            </tr>
        </table>
        <div class="mini-window" id="fkfTx" style="width: 1000px; height: 600px;" title="常用购买方" showtoolbar="false" showfooter="true" showcolumnsmenu="true">
            <div class="txl-tip"><i class="tip-ico">!</i>若您的银行信息发生变化，请联系主管税务机关变更银行信息！</div>
            <div class="grid-toolbar" data-bind-grid="fkftx-grid"><a class="toolBtn-blue toolBtn-blue kpxx_btn btn" method="addLXR">增加</a> <a class="kpxx_btn btn toolBtn-blue" method="editLXR">修改</a> <a class="kpxx_btn btn toolBtn-blue" method="deleteLXR">删除</a></div>
            <div id="fkftx-grid" class="mini-datagrid" style="width: 100%; height: 320px;" allowresize="false" idfield="id" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="false" allowsortcolumn="false" checkselectiononly="true" allowcellselect="true" allowcelledit="true">
                <div property="columns">
                    <div type="checkcolumn" width="50">选择</div>
                    <div field="ghfNsrsbh" maxlength="20" vtype="nsrsbh" width="160">纳税人识别号
                        <input name="ghfNsrsbh" class="mini-textbox"></div>
                    <div field="ghfNsrmc" required="true">纳税人名称
                        <input class="mini-hidden" name="djxh">
                        <input name="ghfNsrmc" class="mini-textbox"></div>
                    <div field="ghfDz" maxlength="200" vtype="maxLength:200">地址
                        <input name="ghfDz" class="mini-textbox"></div>
                    <div field="ghfLxdh" required="true" vtype="rangeLength:8,13;numeric;">联系电话
                        <input name="ghfLxdh" class="mini-textbox"></div>
                    <div field="ghfYhhbDm" required="true" visible="false">开户银行类别代码
                        <input name="ghfYhhbDm" class="mini-textbox" width="103%"></div>
                    <div field="ghfYhyywdMc" required="true">开户行
                        <input name="ghfYhyywdMc" class="mini-textbox"></div>
                    <div field="ghfYhkhzh" required="true">账号
                        <input name="ghfYhkhzh" class="mini-textbox"></div>
                    <div field="djxh" visible="false">登记序号
                        <input name="djxh" class="mini-textbox"></div>
                    <div field="issnnsr" visible="false">是否是省内
                        <input name="issnnsr" class="mini-textbox"></div>
                </div>
            </div>
            <form id="add_txl_form">购买方信息：<br>
                <div class="axx-box clear">
                    <div class="add-part">
                        <label><span class="red">*</span>纳税人识别号</label>
                        <span class="input-box">
                            <input name="ghfNsrsbh" id="ghfNsrsbhxz" required="true" class="mini-textbox" maxlength="20" vtype="nsrsbh" onblur="kpxxObj.onFkfxxBlur" requirederrortext="纳税人识别号不能为空">
                            <input name="djxh" class="mini-hidden" style="width: 100%">
                            <input name="issnnsr" class="mini-hidden" style="width: 100%"></span></div>
                    <div class="add-part">
                        <label><span class="red">*</span>纳税人名称</label>
                        <span class="input-box">
                            <input name="ghfNsrmc" class="mini-textbox" vtype="required" requirederrortext="纳税人名称不能为空"></span></div>
                    <div class="add-part">
                        <label><span class="red">*</span>地址</label>
                        <span class="input-box">
                            <input name="ghfDz" class="mini-textbox" vtype="required" requirederrortext="地址不能为空"></span></div>
                    <div class="add-part">
                        <label><span class="red">*</span>联系电话</label>
                        <span class="input-box">
                            <input name="ghfLxdh" class="mini-textbox" vtype="required" onvalidation="dkzyfp.onlxdh" requirederrortext="联系电话不能为空" mobilephoneerrortext="联系电话输入不正确"></span></div>
                    <div class="add-part big-part">
                        <label><span class="red">*</span>开户行及账号</label>
                        <span class="input-box">
                            <input class="mini-hidden" name="ghfYhyywdDm">
                            <input class="mini-textbox" name="ghfYhyywdMc" vtype="required" shownullitem="true" style="width: 38%" requirederrortext="开户银行不能为空"><input name="ghfYhkhzh" class="mini-textbox text-khyhzh" id="text-khyhzh" vtype="int;required" style="width: 38%" requirederrortext="开户银行账号不能为空"></span></div>
                </div>
                <div class="clear text-center"><a class="txl_btn btn yello-btn" method="saveAddTxl">确定</a>&nbsp;&nbsp;&nbsp; <a class="txl_btn btn gray-btn" method="calcelAddTxl">取消</a></div>
            </form>
            <div property="footer"><a class="mini-button toolBtn-blue panel_btn" id="save-btn">选择</a> <a class="mini-button toolBtn-white panel_btn" id="cancle-btn">取消</a></div>
        </div>
        <div class="mini-window" id="lwhwView" style="width: 1000px; height: 600px;" title="查看劳务货物信息" showtoolbar="false" showfooter="true" showcolumnsmenu="true">
            <div id="lwhwViewGrid" class="mini-datagrid" style="width: 100%; height: 460px;" idfield="id" multiselect="true">
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
</section>
