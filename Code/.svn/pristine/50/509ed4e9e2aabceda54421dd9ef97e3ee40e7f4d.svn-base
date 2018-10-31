<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="hlsjcj_client_main.aspx.cs" Inherits="JlueTaxSystemHBGS.HlcjPlat.pages.sb.hlsjcj_client.hlsjcj_client_main" %>



<!doctype html>
<html>
<head>
    <title>营改增数据采集首页</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" media="all" href="../../../style/hlsjcj_client/hlsjcj_client.css" title="default" />
</head>
<body>
    <!--top-->
    <div style="padding-bottom: 8px; padding-left: 10px; padding-top: 10px;">
        <span>申报属期</span>
        <input id="sbsq" class="mini-monthpicker" style="width: 120px;" onvaluechanged="querysbxx" format="yyyyMM" />
    </div>
    <div class="mini-fit">
        <div id="sjcjmaindatagrid" class="mini-datagrid"
            style="width: 100%; height: 100%;"
            showpager="false" allowresize="false" ondrawcell="onActionRenderer">
            <div property="columns">
                <div type="indexcolumn" width="5%" headeralign="center"
                    allowsort="true">
                    序号
                </div>
                <div field="BDMC" width="20%" headeralign="center"
                    align="center" allowsort="false">
                    填报表名
                </div>
                <div field="BDDM" width="20%" headeralign="center" visible="false"
                    align="center" allowsort="false">
                </div>
                <div field="TJZT" width="15%" headeralign="center"
                    align="center" allowsort="false">
                    提交状态
                </div>
                <div field="SHZT" width="15%" headeralign="center"
                    align="center" allowsort="false">
                    审核状态
                </div>
                <div field="BYCJQX" width="10%" headeralign="center" headerstyle="color:red;"
                    align="center" allowsort="false">
                    本月采集期限
                </div>
                <div field="CJSJ" width="10%" headeralign="center"
                    align="center" allowsort="false" dateformat="yyyyMMdd">
                    最近提交日期
                </div>
                <div field="opt" width="8%" headeralign="center" align="center"
                    allowsort="false">
                    操作
                </div>
            </div>
        </div>
    </div>
    <!--  
				<div class="bz_tip">
					<p>备注：近期通过采集纳税人相关建议，定于5月对河北公路货物运输企业涉税基础信息采集系统进行优化升级，升级期间采用新旧系统相结合方式运行。即：石家庄、邢台地区用户日前使用新系统申报、其他地区用户使用旧系统申报。
					</p>
				</div>	
				-->
    <div class="listbottom_div box-bottom">
        <div class="listbutton_div">
            <a href="##" onclick="FormOp.downInstruction();">
                <div>
                    <span class="icon_export"></span>操作说明下载
                </div>
            </a>
        </div>
    </div>
</body>
</html>
<form name="linkForm" method="post" style="display: none" id="linkForm"></form>
<iframe id="downloadFrame" name="downloadFrame" style="width: 0; height: 0"></iframe>
<script type="text/javascript" src="../../../scripts/base1/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="../../../scripts/miniui/miniui.js"></script>
<script type="text/javascript" src="../../../scripts/miniui/store.js"></script>
<script type="text/javascript" src="../../../scripts/pagejs/sb/hlsjcj_client/hlsjcj_client_main.js"></script>
