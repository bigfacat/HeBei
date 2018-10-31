<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zzsybnsrYbjc.aspx.cs" Inherits="JlueTaxSystemHBGS.sbzx_web.apps.views.sb_ybnsr_ybjc.zzsybnsrYbjc" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="renderer" content="webkit">
    <title>增值税一般纳税人纳税申报（一表集成）</title>
    <link rel="stylesheet" href="../../../apps/styles/style.css">
    <link rel="stylesheet" href="zzsybnsrYbjc.css">
</head>
<body>
    <div id="wizard"></div>
    <div class="mini-window" id="xxfp-xxmx-win" style="width: 1300px; height: 630px; display: none" title="销项发票明细查询">
        <table class="form-table" style="margin-top: -30px" id="xxmx-form">
            <tr>
                <th width="10%" class="form-th"><span>发票类别：</span></th>
                <td width="20%">
                    <input class="mini-combobox" name="fplb" id="xxmx-fplb" width="90%"></td>
                <th width="10%" class="form-th"><span>发票代码：</span></th>
                <td width="20%">
                    <input class="mini-textbox" name="fpdm" id="xxmx-fpdm" width="90%"></td>
                <th width="10%" class="form-th"><span>发票号码：</span></th>
                <td width="20%">
                    <input class="mini-textbox" name="fphm" id="xxmx-fphm" width="90%"></td>
                <td>
                    <div class="btn"><a class="mini-button" id="xxmx-search-btn">查询</a> <a class="mini-button" id="xxmx-clear-btn">重置</a></div>
                </td>

            </tr>
        </table>
        <div id="xxmx-grid" showpager="true" class="mini-datagrid" style="height: 417px;" allowresize="false" enabled="true" allowcelledit="false" showreloadbutton="false" onbeforeload="ybnsr.xxfpMxBeforeload" showemptytext="true" allowsortcolumn="false" allowcellselect="true" totalfield="value.totleRecords" datafield="value.fpmxs.fpmx" allowheaderwrap="true">
            <div property="columns">
                <div type="indexcolumn" width="8%">序号</div>
                <div field="fpLb" type="comboboxcolumn" width="14%">发票类别
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.fplbData"></div>
                <div field="fpdm" width="10%" align="center">发票代码</div>
                <div field="fphm" width="10%" align="center">发票号码</div>
                <div field="kprq" width="10%" dateformat="yyyy-MM-dd" align="center">开票日期</div>
                <div field="gfnsrsbh" width="15%" align="center">购货方纳税人识别号</div>
                <div field="gfnsrmc" width="25%" align="center">购货方纳税人名称</div>
                <div field="action" width="8%" align="center" renderer="ybnsr.onXxfpActionRenderer">操作</div>

            </div>

        </div>
        <div class="table-container">
            <table>
                <tr height="40">
                    <td width="50">合计：</td>
                    <td>共 <span class="txt-blue" id="xxmx-fs">0</span> 份， 总金额 <span class="txt-blue" id="xxmx-je">0</span> 元， 总税额 <span class="txt-blue" id="xxmx-se">0</span> 元；</td>

                </tr>
                <tr height="40">
                    <td width="50" style="vertical-align: top;">其中：</td>
                    <td class="xxfp-flhz">
                        <div class="fp-name xxfp-name">增值税专用发票</div>
                        份数：<span class="txt-blue" id="xxmx-zzszyfp-fs">0</span> 份， 金额：<span class="txt-blue" id="xxmx-zzszyfp-je">0</span> 元， 税额：<span class="txt-blue" id="xxmx-zzszyfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name xxfp-name">增值税普通发票</div>
                        份数：<span class="txt-blue" id="xxmx-zzsptfp-fs">0</span> 份， 金额：<span class="txt-blue" id="xxmx-zzsptfp-je">0</span> 元， 税额：<span class="txt-blue" id="xxmx-zzsptfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name xxfp-name">电子发票</div>
                        份数：<span class="txt-blue" id="xxmx-dzfp-fs">0</span> 份， 金额：<span class="txt-blue" id="xxmx-dzfp-je">0</span> 元， 税额：<span class="txt-blue" id="xxmx-dzfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name xxfp-name">卷式发票</div>
                        份数：<span class="txt-blue" id="xxmx-jsfp-fs">0</span> 份， 金额：<span class="txt-blue" id="xxmx-jsfp-je">0</span> 元， 税额：<span class="txt-blue" id="xxmx-jsfp-se">0</span> 元；&nbsp;&nbsp;&nbsp;<div class="fp-name xxfp-name">机动车销售统一发票</div>
                        份数：<span class="txt-blue" id="xxmx-jdcfp-fs">0</span> 份， 金额：<span class="txt-blue" id="xxmx-jdcfp-je">0</span> 元， 税额：<span class="txt-blue" id="xxmx-jdcfp-se">0</span> 元；</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="mini-window" id="xxfp-detail-win" style="width: 1300px; display: none" title="销项发票详情">
        <div id="xxmx-detail-grid" showpager="true" class="mini-datagrid" allowresize="false" enabled="true" allowcelledit="false" showreloadbutton="false" onbeforeload="ybnsr.xxfpMxBeforeload" showemptytext="true" allowsortcolumn="false" allowcellselect="true" totalfield="value.totleRecords" datafield="value.fpmxs.fpmx" allowheaderwrap="true">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpLb" type="comboboxcolumn">发票类别
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.fplbData"></div>
                <div field="fpdm" width="110">发票代码</div>
                <div field="fphm" width="90">发票号码</div>
                <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                <div field="gfnsrsbh" width="100">购货方纳税人识别号</div>
                <div field="gfnsrmc" width="100">购货方纳税人名称</div>
                <div field="je" datatype="float">金额</div>
                <div field="se" datatype="float">税额</div>
                <div field="sl" width="65" datatype="percent">税率或征收率</div>
                <div field="hwmc" width="140">货物劳务或服务名称</div>
                <div field="zzszsxmId" type="comboboxcolumn">征收项目
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.zzxmGridData"></div>
                <div field="jsfsId" width="100" type="comboboxcolumn">计税方式
                    <input property="editor" class="mini-combobox" width="100%" data="ybnsr.jsfsmxGridData"></div>
                <div field="zfbz" width="40" renderer="ybnsr.zfbzRender">作废标志</div>
            </div>
        </div>
    </div>
    <div class="mini-window" id="xxfp-add-win" style="width: 1300px; height: 600px; display: none" title="销项发票手工归集">
        <div class="grid-toolbar" data-bind-grid="xxfp-grid"></div>
        <div id="xxfp-grid" class="mini-datagrid" style="height: 410px;" allowresize="false" enabled="true" allowcelledit="true" oncellvalidation="ybnsr.xxfpGridValidate" multiselect="true" showreloadbutton="false" onbeforeload="ybnsr.xxfpGjBeforeload" datafield="value.sgGjMx" oncellcommitedit="ybnsr.onxxfpSggjCellCommitEdit" showemptytext="true" allowsortcolumn="false" allowcellselect="true" allowheaderwrap="true">
            <div property="columns">
                <div type="checkcolumn" width="50"></div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpLb" renderer="ybnsr.onfplbRenderer">发票类别</div>
                <div field="fpdm" width="115">发票代码</div>
                <div field="fphm" width="100">发票号码</div>
                <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                <div field="je" width="100" datatype="float">金额</div>
                <div field="se" width="100" datatype="float">税额</div>
                <div field="sl" width="65">税率或征收率</div>
                <div field="hwmc" width="140">货物劳务或服务名称</div>
                <div field="zzszsxmId" displayfield="zzszsxm" type="comboboxcolumn">征收项目
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.zzxmNoAll"></div>
                <div field="jsfsId" displayfield="jsfs" type="comboboxcolumn">计税方式
                    <input property="editor" class="mini-combobox" width="100%" data="ybnsr.jsfsData"></div>
                <div field="zfbz" width="40" renderer="ybnsr.zfbzRender">作废标志</div>
            </div>
        </div>
        <div class="mt20">合计：发票共 <span id="xxfp-zfs">0</span> 份，总金额 <span id="xxfp-zje">0</span> 元，总税额 <span id="xxfp-zse">0</span> 元</div>
        <div class="footer txt-r mt20"><a class="mini-button toolBtn-blue" style="padding: 0 25px" id="xxfp-save-btn">保存</a> <a class="mini-button toolBtn-white" style="padding: 0 25px" id="xxfp-cancel-btn">取消</a></div>
    </div>
    <div class="mini-window" id="xxfp-wkjfp-win" style="width: 1200px; height: 750px; display: none" title="录入未开具发票">
        <div class="grid-toolbar" data-bind-grid="wkjfp-grid"><a class="mini-button toolBtn-blue grid-add" onclick="ybnsr.addWkjfp">增加</a> <a class="mini-button grid-remove">删除</a></div>
        <div id="wkjfp-grid" class="mini-datagrid" style="width: 1160px; height: 410px;" allowresize="false" oncellvalidation="ybnsr.wkjfpValidate" enabled="true" allowcelledit="true" allowcellvalid="true" multiselect="true" oncellcommitedit="ybnsr.onCellCommitEdit" showpager="false" showemptytext="true" allowsortcolumn="false" allowcellselect="true">
            <div property="columns">
                <div type="checkcolumn" width="50"></div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="je" datatype="float" vtype="required">金额
                    <input property="editor" class="mini-moneybox" width="100%"></div>
                <div field="sl" displayfield="slValue" vtype="required">税率
                    <input property="editor" class="mini-combobox" width="100%" valuefiled="ID" textfield="MC" popupwidth="200" data="ybnsr.slOrzsl"></div>
                <div field="se" datatype="float" vtype="required">税额</div>
                <div field="zzszsxmId" type="comboboxcolumn" vtype="required">征收项目
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.zzxmNoAll"></div>
                <div field="jsfsId" displayfield="jsfs" type="comboboxcolumn" vtype="required">计税方式
                    <input property="editor" class="mini-combobox" width="100%" data="ybnsr.jsfsData"></div>
            </div>
        </div>
        <div class="footer txt-r mt20"><a class="mini-button toolBtn-blue" style="padding: 0 25px" id="wkjfp-save-btn">保存</a> <a class="mini-button toolBtn-white" style="padding: 0 25px" id="wkjfp-cancel-btn">取消</a></div>
    </div>
    <div class="mini-window" id="jxfp-mxcx-win" style="width: 1200px; height: auto; display: none" title="进项发票明细查询">
        <table class="form-table" id="jxfp-form" style="margin-top: -30px">
            <tr>
                <th width="10%" class="form-th"><span>发票类别：</span></th>
                <td width="23%">
                    <input class="mini-combobox" name="fplb" id="jxmx-fplb" width="90%"></td>
                <th width="10%" class="form-th"><span>发票代码：</span></th>
                <td width="23%">
                    <input class="mini-textbox" name="fpdm" id="jxmx-fpdm" width="90%"></td>
                <th width="10%" class="form-th"><span>发票号码：</span></th>
                <td width="23%">
                    <input class="mini-textbox" name="fphm" id="jxmx-fphm" width="90%"></td>
                <td>
                    <div class="btn" style="width: 360px"><a class="mini-button" id="jxfp-search-btn">查询</a> <a class="mini-button" id="jxfp-clear-btn" style="margin-left: 5px;">重置</a><div class="dk-set"><a class="mini-button plgj" style="width: 120px; margin-left: 5px;" id="jxfp-pldk-btn">批量设置抵扣类型</a><ul class="dklxList" style="display: none">
                        <li data-type="N">抵扣</li>
                        <li data-type="Y">不抵扣</li>
                    </ul>
                    </div>
                    </div>
                </td>
            </tr>
        </table>
        <div id="jxfp-fpmx-grid" class="mini-datagrid" style="width: auto; height: 417px;" allowresize="false" allowsortcolumn="false" multiselect="true" showreloadbutton="false" onbeforeload="ybnsr.jxfpmxBeforeload" showpager="true" showemptytext="true" onpagechanged="ybnsr.jxfpmxPagechanged" totalfield="value.totleRecords" datafield="value.fpmxs.fpmx" allowheaderwrap="true">
            <div property="columns">
                <div type="checkcolumn" width="5%">选择</div>
                <div type="indexcolumn" width="5%">序号</div>
                <div field="fpLb" width="" renderer="ybnsr.onfplbRenderer" align="center">发票类别</div>
                <div field="fpdm" width="10%" align="center">发票代码</div>
                <div field="fphm" width="10%" align="center">发票号码</div>
                <div field="kprq" width="10%" dateformat="yyyy-MM-dd" align="center">开票日期</div>
                <div field="gfsbh" width="17%" align="center">购货方纳税人识别号</div>
                <div field="gfnsrmc" width="17%" align="center">购货方纳税人名称</div>
                <div field="ddkbz" width="8%" type="comboboxcolumn" vtype="required" align="center">是否抵扣
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.sfdkData"></div>
                <div field="action" width="8%" align="center" renderer="ybnsr.onJxfpActionRenderer">操作</div>
            </div>
        </div>
        <div class="mt10">合计：发票共 <span id="jxfp-fpmx-fs"></span> 份，总金额 <span id="jxfp-fpmx-je"></span>元，总税额 <span id="jxfp-fpmx-se"></span>元</div>
        <div class="footer txt-r"><a class="mini-button toolBtn-blue" style="padding: 0 25px" id="jxfpmx-save-btn">保存</a> <a class="mini-button toolBtn-white" style="padding: 0 25px" id="jxfpmx-cancel-btn">取消</a></div>
    </div>
    <div class="mini-window" id="jxfp-detail-win" style="width: 1200px; height: auto; display: none" title="进项发票明详情">
        <div id="jxfp-detail-grid" class="mini-datagrid" style="width: auto; height: 410px;" allowresize="false" allowsortcolumn="false" multiselect="true" showreloadbutton="false" onbeforeload="ybnsr.jxfpmxBeforeload" showpager="true" showemptytext="true" onpagechanged="ybnsr.jxfpmxPagechanged" totalfield="value.totleRecords" datafield="value.fpmxs.fpmx" allowheaderwrap="true">
            <div property="columns">
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpLb" width="" renderer="ybnsr.onfplbRenderer">发票类别</div>
                <div field="fpdm" width="108">发票代码</div>
                <div field="fphm" width="80">发票号码</div>
                <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                <div field="gfsbh" width="120" align="center">购货方纳税人识别号</div>
                <div field="gfnsrmc" width="120" align="center">购货方纳税人名称</div>
                <div field="je" datatype="float">金额</div>
                <div field="sl" width="54" datatype="percent">税率</div>
                <div field="se" width="90" datatype="float">税额</div>
                <div field="hwmc" width="80">货物劳务或服务名称</div>
                <div field="rzsj" width="100" dateformat="yyyy-MM-dd">认证时间</div>
                <div field="jxgjId" renderer="ybnsr.onjxgjRenderer">进项归集</div>
            </div>
        </div>
    </div>
    <div class="mini-window" id="jxfp-add-win" style="width: 1200px; height: auto; display: none" title="进项发票手工归集">
        <div id="jxfp-grid" class="mini-datagrid" style="width: 1160px; height: 410px;" allowresize="false" enabled="true" allowcelledit="true" multiselect="true" showreloadbutton="false" onbeforeload="ybnsr.jxfpgjBeforeload" datafield="value.sgGjMx" allowheaderwrap="true" showemptytext="true" allowsortcolumn="false" allowcellselect="true">
            <div property="columns">
                <div type="checkcolumn" width="50"></div>
                <div type="indexcolumn" width="50">序号</div>
                <div field="fpLb" renderer="ybnsr.onfplbRenderer">发票类别</div>
                <div field="fpdm" width="110">发票代码</div>
                <div field="fphm" width="85">发票号码</div>
                <div field="kprq" width="100" dateformat="yyyy-MM-dd">开票日期</div>
                <div field="je" datatype="float">金额</div>
                <div field="sl" width="60">税率</div>
                <div field="se" datatype="float">税额</div>
                <div field="hwmc" width="80">货物劳务或服务名称</div>
                <div field="rzsj" width="100" dateformat="yyyy-MM-dd">认证时间</div>
                <div field="jxgjId" displayfield="jxgj" type="comboboxcolumn" vtype="required">进项归集
                    <input property="editor" class="mini-combobox" width="100%" popupwidth="200" data="ybnsr.jxgjGridData"></div>
            </div>
        </div>
        <div class="mt20">合计：发票共 <span id="jxfp-zfs">0</span> 份，总金额 <span id="jxfp-zje">0</span> 元，总税额 <span id="jxfp-zse">0</span> 元</div>
        <div class="footer txt-r mt20 jxfp-btn"><a class="mini-button toolBtn-blue" style="padding: 0 25px" id="jxfp-save-btn">保存</a> <a class="mini-button toolBtn-white" style="padding: 0 25px" id="jxfp-cancel-btn">取消</a></div>
    </div>
    <script src="../../../lib/jquery/jquery.min.js"></script>
    <script src="../../../apps/scripts/steps.js"></script>
    <script src="../../../apps/scripts/miniui.js"></script>
    <script src="../../../apps/scripts/sbzxcommon.js"></script>
    <script src="zzsybnsrYbjcService.js"></script>
    <script src="zzsybnsrYbjc.js"></script>
</body>
</html>
