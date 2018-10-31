<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LwHwXx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglDkZy.LwHwXx" %>

<!DOCTYPE html>


<h2>劳务货物信息</h2>
<section class="third-step">
    <div class="grid-toolbar" data-bind-grid="lwhwxx-grid"><a class="mini-button toolBtn-blue grid-add" id="add-button" iconcls="icon-add" onclick="dkptfp.addLwhwXX()">添加</a> <a class="mini-button" onclick="dkzyfp.modifyLwhwxx()">修改</a> <a class="mini-button" onclick="dkzyfp.deletLwhwxx()">删除</a> <a class="mini-button" onclick="dkzyfp.startUpload()">导入</a> <a class="mini-button" onclick="dkzyfp.downloadModel()">模板下载</a> <a class="mini-button" onclick="dkptfp.lwhwZsSave()">暂存</a> <a class="mini-button" onclick="dkptfp.getzcsjCheck()">查询暂存</a> <a class="mini-button" onclick="dkptfp.YlLwhwxx()">预览</a> <span style="color: red; padding-left: 10px;">注：货物或劳务信息超过八条，建议下载模板，使用导入功能。</span></div>
    <div id="lwhwxx-grid" class="mini-datagrid" style="width: 100%; height: 220px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="true" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
        <div property="columns">
            <div type="checkcolumn" width="50">选择</div>
            <div type="indexcolumn" width="50">序号</div>
            <div field="hwlwmc" width="136">货物或劳务名称</div>
            <div field="ggxh" width="106">规格型号</div>
            <div field="dwslDm" displayfield="dwslDmText" width="100">计量单位</div>
            <div field="hlsl" width="80">数量</div>
            <div field="hldj" width="90">单价（不含税）</div>
            <div field="je" width="120">金额（不含税）</div>
            <div field="jeHs" width="120">金额（含税）</div>
            <div field="slv" width="80">税率</div>
            <div field="se" width="100">税额</div>
        </div>
    </div>
    <div class="bottom" id="hj_form">
        <p>金额合计（不含税）：<strong class="jehj" id="jehj"></strong> 税额合计：<strong class="sehj" id="sehj"></strong></p>
        <p>价税合计（金额+税额）：<strong class="jshj" id="jshj"></strong></p>
    </div>
    <div class="mini-window" id="add-lwhwxx" style="width: 760px; height: 400px; display: none" title="新增劳务货物信息" showtoolbar="false" showfooter="true">
        <table class="addtable" id="lwhw-form" style="table-layout: fixed;" width="100%">
            <tr>
                <td width="17%">货物或劳务名称<strong class="text-red">*</strong>：</td>
                <td width="32%">
                    <input name="hwlwmc" class="mini-textbox" id="hwlwmc" required="true" requirederrortext="货物或劳务名称不能为空" maxlength="30" vtype="rangeLength:30"></td>
                <td width="17%">规格型号：</td>
                <td>
                    <input name="ggxh" class="mini-textbox"></td>
            </tr>
            <tr>
                <td width="15%">计量单位：</td>
                <td width="30%">
                    <input class="mini-combobox" name="dwslDm" id="dwslDm" width="100%" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_JLDW.ashx"></td>
                <td>数量<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="hlsl" id="hlsl" class="mini-textbox" vtype="float;maxLength:16;rangeDecimals:2" value="1" required="true" requirederrortext="数量不能为空" onblur="dkptfp.slChanged"></td>
            </tr>
            <tr>
                <td>单价（不含税）<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="hldj" id="hldj" class="mini-textbox" vtype="float;rangeDecimals:6;maxLength:18" required="true" requirederrortext="单价（不含税）不能为空" onblur="dkptfp.djChanged"></td>
                <td>金额（不含税）<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="je" id="je" class="mini-textbox" vtype="float;rangeDecimals:6" required="true" requirederrortext="金额（不含税）不能为空" value="0" onblur="dkptfp.jeChanged"></td>
            </tr>
            <tr>
                <td>金额（含税）<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="jeHs" id="jeHs" class="mini-textbox" vtype="float;rangeDecimals:6" required="true" requirederrortext="金额（含税）不能为空" onblur="dkptfp.jeHsChanged"></td>
                <td>税率：</td>
                <td>
                    <input name="slv" id="slv" class="mini-textbox" readonly="true" value="3%"></td>
            </tr>
            <tr>
                <td>税额：</td>
                <td>
                    <input name="se" id="se" class="mini-textbox" vtype="float;rangeDecimals:6" value="0" readonly="true"></td>
            </tr>
        </table>
        <div property="footer"><a class="mini-button toolBtn-blue" id="lwhw-save">保存</a> <a class="mini-button toolBtn-white" id="lwhw-cancle">取消</a></div>
    </div>
    <div class="mini-window" id="yl-zzspy" style="width: 1200px; height: 650px; display: none" title="增值税专用发票票样" showtoolbar="false" showfooter="true">
        <div class="ylContainer" id="zzsdk_pyyl">
            <div class="header">
                <div class="header-main">
                    <h1>增值税专用发票</h1>
                    <div class="breakLine"></div>
                    <p>此联不作报销、扣税凭证使用</p>
                </div>
                <div class="header-right">
                    <img src="../../images/fpgl/zzs_NO.jpg" class="NO-image"><div><span class="NO-1"></span>
                        <br>
                        <span class="NO-2"></span></div>
                    <p>开票日期：<span class="kprq" name="kprq" id="kprq"></span></p>
                </div>
            </div>
            <div class="py-content">
                <div class="content-center">
                    <table>
                        <thead>
                            <tr>
                                <td width="36px"></td>
                                <td width="210px"></td>
                                <td width="105px"></td>
                                <td width="53px"></td>
                                <td width="84px"></td>
                                <td width="24px"></td>
                                <td width="27px"></td>
                                <td width="44px"></td>
                                <td width="133px"></td>
                                <td width="50px"></td>
                                <td width="134px"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="title">购<br>
                                    <br>
                                    买<br>
                                    <br>
                                    方</td>
                                <td colspan="5" class="text-left">
                                    <p><span class="mc-title">名</span>称：<span class="mc" name="ghfNsrmc"></span></p>
                                    <p>纳税人识别号：<span class="nsrsbh" name="ghfNsrsbh"></span></p>
                                    <p><span class="dzdh-title">地址<span class="comma">、</span>电话</span>：<span class="dzdh" name="ghfDz"></span></p>
                                    <p>开户行及账号：<span class="khhjzh" name="ghfYhkhzh"></span></p>
                                </td>
                                <td class="title">密<br>
                                    <br>
                                    码<br>
                                    <br>
                                    区</td>
                                <td colspan="4" class="text-left">
                                    <div class="mmq-div"><span class="mmq"></span></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="no-right no-bottom">货物或应税劳务名称</td>
                                <td class="no-right no-left no-bottom">规格型号</td>
                                <td class="no-right no-left no-bottom">单位</td>
                                <td class="no-right no-left no-bottom">数量</td>
                                <td colspan="3" class="no-right no-left no-bottom">单价</td>
                                <td class="no-right no-left no-bottom">金额</td>
                                <td class="no-right no-left no-bottom">税率</td>
                                <td class="no-left no-bottom">税额</td>
                            </tr>
                        </tbody>
                        <tbody id="plusSpmc"></tbody>
                        <tbody>
                            <tr class="grey-tr">
                                <td colspan="2" class="no-right no-top">
                                    <div>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</div>
                                </td>
                                <td class="no-left no-right no-top">
                                    <div class="hj-ggxh"></div>
                                </td>
                                <td class="no-left no-right no-top">
                                    <div class="hj-danw"></div>
                                </td>
                                <td class="no-left no-right no-top">
                                    <div class="hj-sul"></div>
                                </td>
                                <td colspan="3" class="no-left no-right no-top">
                                    <div class="hj-dj"></div>
                                </td>
                                <td class="no-left no-right no-top">
                                    <div class="hj-je" id="hj_je" style="color: #000 !important;"></div>
                                </td>
                                <td class="no-left no-right no-top">
                                    <div class="hj-sl"></div>
                                </td>
                                <td class="no-left no-top">
                                    <div class="hj-se" id="hj_se" style="color: #000 !important;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">价税合计（大写）</td>
                                <td colspan="9" class="text-left"><span class="dx" id="jshf_big"></span>（小写） <span class="xx" id="jshf_small"></span></td>
                            </tr>
                            <tr>
                                <td class="title">销<br>
                                    <br>
                                    售<br>
                                    <br>
                                    方</td>
                                <td colspan="5" class="text-left">
                                    <p><span class="mc-title">名</span>称：<span class="mc" name="xhfnsrmc"></span></p>
                                    <p>纳税人识别号：<span class="nsrsbh" name="xhfnsrsbh"></span></p>
                                    <p><span class="dzdh-title">地址<span class="comma">、</span>电话</span>：<span class="dzdh" name="xhfdz"></span></p>
                                    <p>开户行及账号：<span class="khhjzh" name="xhfyhzh"></span></p>
                                </td>
                                <td class="title">备<br>
                                    <br>
                                    注</td>
                                <td colspan="4" class="text-left">
                                    <p><span class="mc-title">名</span>称：<span class="mc" name="xhfmcxx" id="xhfmcxx"></span></p>
                                    <p><span class="mc-title">纳税人识别号：<span class="mc" name="xhfshxx" id="xhfshxx"></span></span></p>
                                    <p><span class="mc-title">备</span>注:<span class="mc" name="xhfbz" id="xhfbz"></span></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="footer">
                <p>收款人：<span class="skr" id="skr" name="zpdk-skfxx-skrxm"></span> 复核：<span class="fh" name="zpdk-skfxx-fhrxm" id="fhr"></span> 开票人：<span class="kpr"></span> 销售方：（章）</p>
            </div>
        </div>
    </div>
</section>
