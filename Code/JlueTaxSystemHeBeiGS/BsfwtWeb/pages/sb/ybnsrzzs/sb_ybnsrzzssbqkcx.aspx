<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_ybnsrzzssbqkcx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.sb.ybnsrzzs.sb_ybnsrzzssbqkcx" %>

<!doctype html>
<html>
<head>
    <title>我要一般纳税人增值税申报</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <script src="../../../scripts/boot.js" type="text/javascript"></script>
    <script src="../../../scripts/sui/store.js" type="text/javascript"></script>
    <script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
    <script src="../../../scripts/pagejs/sb/ybnsrzzs/sb_ybnsrzzssbqkcx.js" type="text/javascript"></script>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            border: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
            background: #fbfcfc;
        }

        .mini-button-iconRight .mini-button-icon {
            margin-right: 0px;
        }
        .gds-table{
            border:1px #000 solid;
            border-collapse: collapse;
            margin: 0 auto;
        }
        .gds-table tr td{
            border:1px #000 solid;
            padding: 3px;
            font-size: 14px;
        }
        .gds-table .gds-hidden{
            display: none;
        }
        .gds-message{
            text-indent: 2em;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 15px;
        }
        .gds-footer{
            margin: 15px 0 10px 0;
            text-align: center;
        }
    </style>
</head>
<body>
<!--top start-->
<div class="toparea">
    <div class="width970">
        <div style="float: right;">
            <img src="../../../scripts/sui/themes/hbwt/images/login/top_hbswj.png"
                 width="261" height="65" alt=""/>
        </div>
        <img src="../../../scripts/sui/themes/hbwt/images/login/logo.png"
             width="330" height="65" alt=""/>
    </div>
</div>
<div class="banner_area2">
    <div class="width970 topinfo">

    </div>
</div>
<!--top end-->

<div class="inputbg clearfix" style="height: 60px;padding:6px 0 0 0">
    <table style="margin: 0 auto;width:1000px;">
        <tr>
            <td align="left">
                <div class="xgmsb-btn pngbg" id="xgmsb-btn" onclick="sb()"></div>
            </td>
        </tr>
    </table>
</div>
<div style="border-bottom:1px solid #f5f5f5;width:100%;">
    <div class="place pngbg" style="width:1000px;margin: 0 auto;">您现在的位置：我的办税大厅 > 纳税申报 > 增值税一般纳税人申报</div>
</div>
<div>
    <table style="margin: 15px auto 0px auto;">
        <tr>
            <th align="right" style="" nowrap="nowrap">
                所属年月:
            </th>
            <td align="left">
                <input id="sbny" class="mini-monthpicker" format="yyyyMM" onbuttonclick="setSbnyValue()"/>
            </td>
            <td>
                <a class="mini-button blue font14 mini-button-iconRight"
                   onclick="search()" id="stepnext"
                   style="margin: 0 5px; padding: 6px 20px;width: 63px;"
                   iconcls="ico-next pngbg">查 询</a>
            </td>
        </tr>
    </table>
</div>


<div class="mini-fit" id="content">

    <div class="" style="display: block; width:1000px;margin:15px auto;">

        <div id="sbqkGrid" class="mini-datagrid"
             style="width: 100%; height: 271px;"
             url="" idfield="nsrsbh"
             allowresize="false" showpager="false" sizelist="[30,30,30,30]"
             pagesize="20" showEmptyText="true"
             emptyText='<font color="red">无记录</font>'>
            <div property="columns">
                <!-- 	<div field="sbXh"  width="20%" headeralign="center"
                        align="center" allowsort="true">
                        申报序号
                    </div> -->
                <div field="sbny" width="20%" headeralign="center"
                     allowsort="false" align="center">
                    申报年月
                </div>
                <div field="sbztMc" width="20%" headeralign="center"
                     allowsort="false" align="center" renderer="sbztRenderer">
                    申报结果
                </div>
                <div field="lrsj" width="20%" headeralign="center"
                     allowsort="true" align="center" dateformat="yyyy-MM-dd HH:mm:ss">
                    申报时间
                </div>
                <div field="cz" name="cz" width="20%" headeralign="center" allowsort="false"
                     align="center" renderer="czRenderer">
                    操作
                </div>
            </div>
        </div>

    </div>

</div>
<div class="mini-window" id="gds-win" title="提示" style="width: 460px;display:none;">
    <div>
        <div class="gds-message">
            由于您在地税登记的信息与国税信息不一致，不能通过云厅申报地税业务，但不影响您申报增值税一般
            纳税人申报表（国税业务），点击【确定】按钮将跳转至增值税一般纳税人申报页面，是否继续？
        </div>
        <table class="gds-table">
            <tr>
                <td></td>
                <td align="center">国税</td>
                <td align="center">地税</td>
            </tr>
            <tr class="gds-hidden">
                <td>纳税人识别号</td>
                <td id="gs-nsrsbh"></td>
                <td id="ds-nsrsbh"></td>
            </tr>
            <tr class="gds-hidden">
                <td>纳税人名称</td>
                <td id="gs-nsrmc"></td>
                <td id="ds-nsrmc"></td>
            </tr>
            <tr class="gds-hidden">
                <td>社会信用代码</td>
                <td id="gs-shxydm"></td>
                <td id="ds-shxydm"></td>
            </tr>
            <tr class="gds-hidden">
                <td>法人证件类型</td>
                <td id="gs-fddbrsfzjlxDm"></td>
                <td id="ds-fddbrsfzjlxDm"></td>
            </tr>
            <tr class="gds-hidden">
                <td>法人证件号码</td>
                <td id="gs-fddbrsfzjhm"></td>
                <td id="ds-fddbrsfzjhm"></td>
            </tr>
            <tr class="gds-hidden">
                <td>法人姓名</td>
                <td id="gs-fddbrxm"></td>
                <td id="ds-fddbrxm"></td>
            </tr>
            <tr class="gds-hidden">
                <td>登记序号</td>
                <td id="gs-djxh"></td>
                <td id="ds-djxh"></td>
            </tr>
            <tr class="gds-hidden">
                <td>税收档案编号</td>
                <td id="gs-ssdabh"></td>
                <td id="ds-ssdabh"></td>
            </tr>
        </table>
        <div class="gds-footer">
            <a class="mini-button" onclick="gotoSb()">确定</a>
            <a class="mini-button" onclick="mini.get('gds-win').hide()">取消</a>
        </div>
    </div>
</div>
</body>
</html>
