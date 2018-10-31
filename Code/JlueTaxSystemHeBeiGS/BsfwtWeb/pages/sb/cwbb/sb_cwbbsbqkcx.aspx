<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_cwbbsbqkcx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.sb.cwbb.sb_cwbbsbqkcx" %>

<!doctype html>
<html>
    <head>
        <title>我要财务报表申报</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <script src="../../../scripts/boot.js" type="text/javascript"></script>
        <script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
        <script src="../../../scripts/pagejs/sb/cwbb/sb_cwbbsbqkcx.js" type="text/javascript"></script>
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
</style>
    </head>
    <body>
        <!--top start-->
        <div class="toparea">
            <div class="width970">
                <div style="float: right;">
                    <img src="../../../scripts/sui/themes/hbwt/images/login/top_hbswj.png"
                        width="261" height="65" alt="" />
                </div>
            <img src="../../../scripts/sui/themes/hbwt/images/login/logo.png"
                width="330" height="65" alt="" />
        </div>
        </div>
        <div class="banner_area2">
            <div class="width970 topinfo">
                
            </div>
        </div>
        <!--top end-->

        <div class="inputbg clearfix" style="height: 60px;padding:6px 0 0 0">
            <table style="margin: 0 auto;width:1000px;">
                <tr><td align="left">
                    <a href='javascript:sb()'><div class="xgmsb-btn pngbg" id="xgmsb-btn"></div></a>

                        
                    </td>
                </tr>
            </table>
        </div>
        
        <div>
            <table style="margin: 0 auto">
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
                        <div field="sbny" width="20%" headeralign="center"
                            allowsort="false" align="center">
                            申报年月
                        </div>
                        <div field="sbztMc" width="20%" headeralign="center"
                            allowsort="false" align="center" renderer="sbztRenderer">
                            申报结果
                        </div>
                        <div field="lrsj" width="20%" headeralign="center"
                            allowsort="true" align="center" dateformat="yyyy-MM-dd">
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
    </body>
</html>

