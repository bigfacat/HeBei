<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pz_wdy.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.jk.pz_wdy" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>河北国税网上开具缴款凭证系统</title>
    <!-- <link href="style/default.css" rel="stylesheet" type="text/css" /> -->
    <script src="../../scripts/boot.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../scripts/print/printThis.js"></script>
    <script type="text/javascript" src="../../scripts/pagejs/jk/pz_wdy.js"></script>
    <style type="text/css">
        body, html {
            font-size: 12px;
            font-family: verdana, "宋体";
            padding: 0;
            margin: 0;
            background: #FFF;
            height: 100%;
            width: 100%;
        }

        a img {
            border: 0px;
        }

        a {
            text-decoration: none;
            color: #186fd1;
        }

        a:visited {
            text-decoration: none;
            color: #186fd1;
        }

        a:hover {
            text-decoration: underline;
            color: #F60;
        }

        ul {
            list-style-type: none;
        }

        .bt_s {
            background: url(../../images/jk/bt_s.jpg) no-repeat left top;
            color: #FFF;
            width: 63px;
            height: 21px;
            border: 0 none;
            cursor: pointer;
            margin: 10px 0px;
        }
    </style>
</head>
<body>
<div id="printForm">
    <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" style="height:28px;">
        <tr>
            <td colspan="2" valign="middle"
                style="height:60px; text-align:center; font-size:24px; font-weight:bold;position:relative;">
                河北省国家税务局电子缴款凭证
                <img src="/BsfwtWeb/images/jk/guo.jpg" style="position:absolute;right:5px;top:15px;"/>
            </td>
        </tr>
        <tr>
            <td style="height:28px;">
                打印日期：
                <span id="dyrq"></span>
            </td>
            <td style="text-align:right; white-space:nowrap;">
                冀国电缴&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-size:14px; font-weight:bold;">N</span>
                <span id="jkpzxh"></span>
            </td>
        </tr>
        <tr>
            <td style="height:28px;">防伪码：<span id="fwm"></span></td>
            <td>&nbsp;</td>
        </tr>
    </table>
    <table width="98%" border="1" align="center" cellpadding="0" cellspacing="0" style="border:solid 1px black;">
        <tr>
            <td colspan="3" style="padding:0px;">
                <table width="100%" border="0" cellpadding="0" align="left" cellspacing="0"
                       style=" height:45px;line-height:15px; ">
                    <tr>
                        <th style="font-weight:normal;text-align:left; white-space:nowrap; height:20px;padding:5px;">
                            纳税人识别号：
                        </th>
                        <td id="nsrsbh"></td>
                        <th style="font-weight:normal;text-align:left; white-space:nowrap; height:20px;padding:5px;">
                            税务征收机关：
                        </th>
                        <td id="nsrSwjg"></td>
                    </tr>
                    <tr>
                        <th style="font-weight:normal;text-align:left; white-space:nowrap; height:20px;padding:5px;">
                            纳税人全称：
                        </th>
                        <td id="nsrmc"></td>
                        <th style="font-weight:normal;text-align:left; white-space:nowrap; height:20px;padding:5px;">
                            银行账号：
                        </th>
                        <td id="yhzh"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="spxxs"
                       style="text-align:center; white-space:nowrap; line-height:28px; height:28px;">

                </table>
                <br/>
                <br/>
                <br/>
                <br/>

            </td>
        </tr>
        <tr>
            <td class="swjg" style="width:50px; text-align:center;">
                税<br/>
                务<br/>
                机<br/>
                关
            </td>
            <td>
                <img src="/BsfwtWeb/images/jk/tz.gif" style="padding:20px;"/>
            </td>
            <td style="line-height:26px; padding:10px;">
                <span style="font-weight:bold;">说明：</span>
                本缴款凭证仅作为纳税人记账核算凭证使用，电子缴款的，需与银行对账单电子划缴记录核对一致方有效。纳税人如需汇总开具正式完税证明，请凭税务登记证或身份证明到主管税务机关开具。<br/>
                2、备注中显示的是本条记录的打印次数。
            </td>
        </tr>
    </table>
</div>
<div align="center">
    <input type="button" value="打印" id="print" class="bt_s" onclick="printPage()"/>
    <input type="button" value="返回" id="back" class="bt_s" onclick="onCancel()"/>
</div>
</body>
</html>

