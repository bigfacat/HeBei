<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="creditCenter.aspx.cs" Inherits="JlueTaxSystemHBGS.bszm_web.apps.views.creditGrade.creditCenter" %>

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
</head>
<body>
    <div class="context-box">
        <div class="leftMenu creditCenter"><a class="menuBtn creditBtn active">企业信用</a> <a class="menuBtn personBtn">个人信用</a></div>
        <div class="rightMenu creditMenu">
            <div class="creditCon">
                <div class="radar-chart" id="company-chart"></div>
                <div class="influ-title">信用分析报告</div>
                <div class="influ-item">单位特质</div>
                <ul>
                    <li>经营期限：<span id="jyqx"></span> 天</li>
                    <li>注册资本：<span id="zczb"></span> 元</li>
                </ul>
                <div class="influ-break-line"></div>
                <div class="influ-item">财务能力</div>
                <ul>
                    <li>最近12个月内全部销售收入合计： <span class="ml20">所得税：<span id="sdsJqxssrNhj"></span></span> 元 <span class="ml20">增值税：<span id="zzsJqxssrNhj"></span></span> 元</li>
                    <li>最近12个月内全部缴纳税额合计： <span class="ml20">所得税：<span id="sdsJqjsNhj"></span></span> 元 <span class="ml20">增值税：<span id="zzsJqjsNhj"></span></span> 元</li>
                    <li>最近12个月内延期申报次数：<span id="yqsbcsNhj"></span> 次</li>
                    <li>最近12个月内延期缴纳税款次数：<span id="yqjnskcsNhj"></span> 次</li>
                    <li>截止当期欠缴税款金额：<span id="jzdqqjskje"></span> 元</li>
                </ul>
                <div class="influ-break-line"></div>
                <div class="influ-item">信用记录</div>
                <ul>
                    <li>最近5年违法违章次数：<span id="wfwzcs"></span> 次</li>
                    <li>最近2年纳税评估入库税额：<span id="nspgrkse"></span> 元 <span class="ml20">进项税转出金额：<span id="jxszcje"></span> 元</span> <span class="ml20">调整应纳所得税额：<span id="tzynsdse"></span> 元</span></li>
                    <li>最近2年当期自开(增专、增普）发票作废率：<span id="dqzkfpzfl"></span></li>
                    <li>最近2年当期代开(增专、增普）发票作废次数：<span id="dqdkfpzfcs"></span> 次</li>
                    <li>最近2年催报次数：<span id="cbcs"></span> 次</li>
                    <li>最近2年催缴次数：<span id="cjcs"></span> 次</li>
                    <li>最近2年更正或作废申报次数：<span id="gzhzfsbcs"></span> 次</li>
                    <li>最近2年开具红字发票次数：<span id="kjhzfpcs"></span> 次</li>
                    <li>是否存在劳动仲裁为欠薪且未执行到位的：<span></span></li>
                </ul>
                <div class="influ-break-line"></div>
                <div class="influ-item">客户关系</div>
                <ul>
                    <li>与您发生交易行为的上游企业有：<div id="syqys"></div>
                    </li>
                    <li>与您发生交易行为的下游企业有：<div id="xyqys"></div>
                    </li>
                </ul>
            </div>
            <div class="personCon">
                <div class="radar-chart" id="person-chart"></div>
                <div class="influ-title">信用影响因素</div>
                <div class="influ-item">身份特质</div>
                <ul>
                    <li>个人所得税额</li>
                    <li>个人荣誉</li>
                    <li>注册资本</li>
                </ul>
                <div class="influ-break-line"></div>
                <div class="influ-item">信用记录</div>
                <ul>
                    <li>个人信用记录</li>
                    <li>履职信用记录</li>
                </ul>
            </div>
        </div>
    </div>
    <script src="/bszm-web/apps/scripts/bszm-common.js"></script>
    <script src="/bszm-web/apps/scripts/public.js"></script>
    <script src="../../../lib/echarts/echarts-all.js"></script>
    <script src="creditGrade.js"></script>
</body>
</html>
