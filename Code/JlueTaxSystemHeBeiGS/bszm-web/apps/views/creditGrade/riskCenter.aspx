<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="riskCenter.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views.creditGrade.riskCenter" %>

<!DOCTYPE html>
<html class="no-js" lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="description" content="河北省国家税务局云办税厅">
    <meta name="keywords" content="河北省,国家税务局,云厅,云办税厅,网厅,网上办税服务厅">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>河北省国家税务局云办税厅</title>
    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="creditGrade.css">
    <link rel="stylesheet" href="riskCenter.css">
</head>
<body>
    <div class="context-box">
        <div class="leftMenu"><a class="menuBtn riskBtn active">风险管理</a></div>
        <div class="rightMenu">
            <div>
                <div id="rick-search" class="risk-search-area">
                    <table width="100%">
                        <tr>
                            <td>发布时间：
                                <input class="mini-datepicker" width="200" id="fbsjq" name="fbsjq">
                                <span class="ml10 mr10">至</span>
                                <input class="mini-datepicker" width="200" id="fbsjz" name="fbsjz"></td>
                            <td align="right"><span>反馈状态：</span>
                                <input type="text" class="mini-combobox" width="200" valuefield="ID" textfield="MC" id="fkzt" name="fkzt" data="[{'ID':'01','MC':'未反馈'},{'ID':'02','MC':'已反馈'}]"></td>
                        </tr>
                    </table>
                    <div class="mt20 mb20 txt-c">
                        <button class="button-blue" id="search-risk-btn">查询</button></div>
                </div>
                <div id="risk-result">
                    <div id="risk-grid" class="mini-datagrid" style="width: 100%;" showpager="false" showemptytext="true" allowcellwrap="true">
                        <div property="columns">
                            <div type="indexcolumn" width="60" headeralign="center" align="center">序号</div>
                            <div field="smfamc" width="120" headeralign="center" align="center" renderer="riskCenter.onFxmcRenderer">风险信息名称</div>
                            <div field="fxms" width="120" headeralign="center" align="center">风险信息描述</div>
                            <div field="ydcs" width="120" headeralign="center" align="center">应对措施</div>
                            <div field="lrrq" width="120" headeralign="center" align="center" dateformat="yyyy-MM-dd">发布时间</div>
                            <div field="zcfkqx" width="120" headeralign="center" align="center" dateformat="yyyy-MM-dd">自查反馈期限</div>
                            <div field="zt" width="120" headeralign="center" align="center" renderer="riskCenter.onZtRenderer">操作</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="riskCenter.js"></script>
</body>
</html>
