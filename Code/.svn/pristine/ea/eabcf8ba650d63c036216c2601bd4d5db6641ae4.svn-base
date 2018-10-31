<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jk_jsxxcx.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.jk.jk_jsxxcx" %>



<!doctype html>
<html>
<head>
    <title>我要缴税记录查询- 河北省国家税务局网上办税服务厅</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
   <script src="/BsfwtWeb/scripts/boot.js" type="text/javascript"></script>
   <script type="text/javascript" src="/BsfwtWeb/scripts/pagejs/jk/jk_jsxxcx.js"></script>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            border: 0;
            width: 100%;
            height: 100%;
            
            background: #fbfcfc;
        }
        .new-tips{padding:10px;font-size:14px;border:1px solid #aaefa2;background:#ecf8eb;margin-bottom:10px;color:#006b40;}
     	a.jsbtn {width:120px;height:40px;display:block;line-height:40px;text-align:center;color:#fff;border-radius:5px;background:#298acb;border:0 none;font-size:14px;font-weight:700;margin-top:10px; position: absolute;left: 45%;}
     	.mini-button {width:120px;}
     	a.Delete_Button {width:90px;height:24px;display:inline-block;text-align:center;line-height:24px;background:#298acb;color:#fff;border-radius:5px;margin-left:5px;margin-top:3px;}
        body .mini-grid-body {
         min-height: 200px !important;
       }
       body .wjs.mini-fit {
        height: auto !important;
       }
    </style>
</head>
<body>
<!--top-->
 <form method="post" name="wjsxxQueryForm" id="wjsxxQueryForm">
<input type="hidden" name="Version" id="Version"/> 
<input type="hidden" name="MPIReq" id="MPIReq"/> 
<input type="hidden" name="TermUrl" id="TermUrl"/>
<input type="hidden" name="HostPayUrl" id="HostPayUrl"/>


<div class="toparea">
    <div class="width970">
        <div style="float:right;">
            <img src="/BsfwtWeb/scripts/sui/themes/hbwt/images/login/top_hbswj.png" width="261" height="65" alt="" />
        </div>
        <img src="/BsfwtWeb/scripts/sui/themes/hbwt/images/login/logo.png" width="330" height="65" alt="" />
    </div>
</div>

<!--banner_area-->
<div class="banner_area">
    <div class="width970" style="position:relative;">
        <img src="/BsfwtWeb/scripts/sui/themes/hbwt/images/topbanner/normal.png" width="419" height="120"/>
        <span style="font-size:30px;font-weight:700;line-height:120px;margin-left:10px;color:#fff;position:absolute;left:120px;">我要缴税</span>
    </div>
</div>
<div class="width970">
    <div class="place pngbg">您现在的位置：我的办税大厅 > 我要缴税</div>
    <div class="width970 infodiv" style="padding:0">
        <div class="mini-tabs" activeindex="0" style="width:100%;height:500px;">
            <div title="未缴税">
                <div class="mini-fit wjs" style="overflow:hidden;height:auto;">
                    <div class="new-tips">
                        尊敬的纳税人，您的应缴税费清单如下：
                        如果您的应征信息发生变化，请<a href="javascript:refreshCurrentPage();">刷新</a>后尝试
                    </div>
                    <div class="mini-fit wjs" style="height:auto;">
                        <div id="wjscx" class="mini-datagrid"
                             style="width:100%;height:auto;"
                              idfield="nsrsbh"
                             allowresize="true" showpager="false" sizelist="[20,30,50,100]"
                             pagesize="20">
                            <div property="columns">
                                <div type="checkcolumn"></div>
                                <div type="indexcolumn" width="4%" headeralign="center" allowsort="true">序号</div>
                                <div field="zsxmmc" width="10%" headeralign="center" align="center" allowsort="true">征收项目</div>
                                <div field="zspmmc" width="10%" headeralign="center" allowsort="true">征收品目</div>
                                <div field="pzzldm" width="15%" headeralign="center" allowsort="true">应征凭证种类</div>
                                <div field="sssqq" width="13%" headeralign="center" align="center" allowsort="true"  dateformat="yyyy-MM-dd"> 税款所属时期起 </div>
                                <div field="sssqz" width="13%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">税款所属时期止</div>
                                <div field="kkse" width="10%" headeralign="center" align="center" allowsort="true" renderer="onActionRendererYjse">税额</div>
                                <div field="jkqx" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">缴款期限</div>
								<!-- <div width="25%" headeralign="center" align="center" allowsort="true" renderer="onActionRenderer">操作</div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0)" class="jsbtn" onclick="js()" id="dzjk">电子缴款</a>
            </div>


            <div title="已缴税" style="padding:0">
                <div class="mini-fit" style="overflow:hidden">
                    <div id="yjscxT" style="width:100%">
                        <table class="form-table" style="width:10%;border-bottom:0">
                            <tr>
                                <td width="" align="right" nowrap="nowrap" style="padding-left:20px"> 缴款日期：</td>
                                <td width="" align="left" nowrap="nowrap">
                                    <input id="sssqq" class="mini-datepicker" style="width:120px;" />
                                   	 至
                                    <input id="sssqz" class="mini-datepicker" style="width:120px;" />
                                </td>
                                <td width="" nowrap="nowrap">
                                    <a class="mini-button blue font14 mini-button-iconRight"
                                       onclick="queryYjsjl()" id="stepnext"
                                       style="margin: 0 5px; padding: 6px 20px;"
                                       iconcls="ico-next pngbg">查 询</a>

                                </td>
                            </tr>

                        </table>
                    </div>
                    <div class="mini-fit">
                        <div id="yjscx" class="mini-datagrid"
                             style="width:100%;height:97%;"
                             url="" idfield="nsrsbh" showpager="false"
                             allowresize="false" showsummaryrow="true" ondrawsummarycell="onDrawSummaryCell">
                            <div property="columns">
                                <div type="indexcolumn" width="5%" headeralign="center" allowsort="true">序号</div>
                                <div field="sssqq" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">税款所属时期起</div>
                                <div field="sssqz" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">税款所属时期止</div>
                                <div field="zsxmmc" width="10%" headeralign="center" align="center" allowsort="true">征收项目</div>
                                <div field="zspmmc" width="10%" headeralign="center" align="center" allowsort="true"> 征收品目 </div>
                                <div field="yzfsrq" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">应征发生日期</div>
                                <div field="sksxdm" width="15%" headeralign="center" align="center" allowsort="true">税款属性</div>
                                <div field="jkqx" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">缴款期限</div>
                                <!-- <div field="ybtse" width="15%" headeralign="center" allowsort="true">应补退税额</div> -->
                                <div field="jkfsrq" width="10%" headeralign="center" align="center" allowsort="true" dateformat="yyyy-MM-dd">缴款日期</div>
                                <div field="kkse" width="10%" headeralign="center" align="center" allowsort="true" renderer="onActionRendererYjse">已缴税额</div>
                            </div>
                        </div>
                    </div>
                     
                </div>

            </div>
        </div>
	</div>
</div>
<!--foot_area-->
<iframe src="/BsfwtWeb/pages/foot.aspx" width="100%" frameborder="0"  id="footpage"></iframe>
</form>
</body>
</html>
