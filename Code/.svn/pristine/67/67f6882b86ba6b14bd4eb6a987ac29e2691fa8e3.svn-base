<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_cwbb_xqykjzz_old.aspx.cs" Inherits="JlueTaxSystemHBGS.BsfwtWeb.pages.sb.cwbb.sb_cwbb_xqykjzz_old" %>

<!doctype html>
<html>
<head>
    <title>财务报表 - 河北省国家税务局网上办税服务厅</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <script src="../../../scripts/pagejs/common/DecimalUtil.js" type="text/javascript"></script>
    <script src="../../../scripts/boot.js" type="text/javascript"></script>
    <script src="../../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
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
        /***lizm 设置报表单元格样式 2016-07-14***/
        .mini-grid-border {
            border: 1px solid  #bbd8eb;
        }

        .mini-grid-headerCell {
            background: #ddedfe;
            border-right: 1px solid #bbd8eb;
            border-bottom: 1px solid #bbd8eb;
        }
        .mini-grid-cell {
            border-right: 1px solid #bbd8eb;
            border-bottom: 1px solid #bbd8eb;
        }
        .mini-grid-cell:first-child{
            background: #f5f3f3;
        }
        .mini-grid-cell:nth-child(2),
        .mini-grid-cell:nth-child(5),
        .mini-grid-cell:nth-child(6){
            background: #f5f3f3;
        }
        body .mini-datagrid .mini-grid-cell-selected{
            background: inherit;
        }
        tr.sb-head,tr.sb-head th {
            background: #fff8ff !important;
        }
        /*****over*****/
    </style>
</head>
<body>
    <div class="mini-fit">

        <div id="tab2" onactivechanged="activechanged()" class="mini-tabs sbb" activeindex="0" style="width:100%;height:100%" plain="false">
            <div class="step-content" style="display:block" title="现金流量表">
                <!--内容1开始-->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sbbtab2" style="border-bottom:0px;">
                    <tr class="sb-head">
                        <th colspan="6" align="center" >
                            <p>
                                现金流量表<br>
                                (适用执行小企业会计准则的企业)
                            </p>
                        </th>
                    </tr>
                    <tr class="sb-head">
                        <td width="200">纳税人识别号：<span class="nsrsbh"></span></td>
                        <td width="281"></td>
                      	<td width="200">税款所属期：<span class="sssqq"></span> - <span class="sssqz"></span></td>
                      	<td width="281"></td>
                        <td width="100">单位：元</td>
                        <td width="95"></td>
                    </tr>
                </table>

			<div id="xjllbGrid" class="mini-datagrid" style="width:100%;height:850px;"
                 idfield="id" allowresize="false" showpager="false" url="../../data/cwbb/sb_cwbb_xqykjzz.ashx" oncellendedit="countXjllb" oncellbeginedit="OnCellBeginEdit"
                 allowCellValid="true" allowCellEdit="true" allowCellSelect="true" multiSelect="true" allowAlternating="true">
              	<div property="columns">
		            <div field="xjllXm" width="300" vtype="required" headeralign="center" allowsort="false">项目
		            </div>
		            <div field="xjllHc" width="150" vtype="required;" headeralign="center" align="center" allowsort="false">行次
		            </div>
		            <div field="xjllBnljje" width="150" vtype="required;" headeralign="center" allowsort="false">本年累计金额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
		            <div field="xjllByje" width="150" vtype="required;" headeralign="center" allowsort="false">本月金额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
          		</div>
        	</div>


            </div>

            <div title="利润表">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sbbtab2" style="border-bottom:0px;">
                    <tr class="sb-head">
                        <th colspan="6" align="center">
                            <p>
                                利润表<br>
                                (适用执行小企业会计准则的企业)
                            </p>
                        </th>
                    </tr>
                    <tr class="sb-head">
                        <td width="200">纳税人识别号：<span class="nsrsbh"></span></td>
                        <td width="281"></td>
                      	<td width="200">税款所属期：<span class="sssqq"></span> - <span class="sssqz"></span></td>
                      	<td width="281"></td>
                        <td width="100">单位：元</td>
                        <td width="95"></td>
                    </tr>
                </table>
                
                <div id="lrbGrid" class="mini-datagrid" style="width:100%;height:1060px;"
                 url="../../data/cwbb/sb_cwbb_xqykjzz.ashx" idfield="id" allowresize="false" showpager="false" oncellendedit="countLrb"
                 allowCellValid="true" allowCellEdit="true" allowCellSelect="true" multiSelect="true" allowAlternating="true">
              	<div property="columns">
		            <div field="lrXm" width="384" vtype="required;" headeralign="center" allowsort="false">项目
		            </div>
		            <div field="lrHc" width="100" vtype="required;" headeralign="center" allowsort="false">行次
		            </div>
		            <div field="lrBnljje" width="130" vtype="required;" headeralign="center" allowsort="false">本年累计金额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
		            <div field="lrByje" width="132" vtype="required;" headeralign="center" allowsort="false">本月金额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
          		</div>
        	</div>
            </div>
            
            
            
            <div title="资产负债表">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sbbtab2" style="border-bottom:0px;">
                    <tr class="sb-head">
                        <th colspan="6" align="center">
                            <p>
                                资产负债表<br>
                                (适用执行小企业会计准则的企业)
                            </p>
                        </th>
                    </tr>
                    <tr class="sb-head">
                        <td width="200">纳税人识别号：<span class="nsrsbh"></span></td>
                        <td width="281"></td>
                      	<td width="200">税款所属期：<span class="sssqq"></span> - <span class="sssqz"></span></td>
                      	<td width="281"></td>
                        <td width="100">单位：元</td>
                        <td width="95"></td>
                    </tr>
                </table>
                <div id="zcfzbGrid" class="mini-datagrid" style="width:100%;height:1060px;"
                 url="../../data/cwbb/sb_cwbb_xqykjzz.ashx" idfield="id" allowresize="false" showpager="false" allowCellValid="true" oncellbeginedit="OnCellBeginEdit"
                 allowCellEdit="true" oncellendedit="countZcfzb" allowCellSelect="true" multiSelect="true" allowAlternating="true">
              	<div property="columns">
		            <div field="zcfzZc" width="216" vtype="" headeralign="center" allowsort="false">资产
		            </div>
		            <div field="zcfzHc" width="72" vtype="" headeralign="center" allowsort="false">行次
		            </div>
		            <div field="zcfzQmye" width="72" vtype="required;" headeralign="center" allowsort="false">期末余额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
		            <div field="zcfzNcye" width="144" vtype="required;" headeralign="center" allowsort="false">年初余额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
		            <div field="zcfzFzhsyzqy" width="288" vtype="required" headeralign="center" allowsort="false">负债和所有者权益
		            </div>
		            <div field="zcfzHc2" width="72" vtype="required;" headeralign="center" allowsort="false">行次
		            	<input property="editor" class="mini-textbox" style="width:100%;"/>
		            </div>
		            <div field="zcfzQmye2" width="72" vtype="required;" headeralign="center" allowsort="false">期末余额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
		            <div field="zcfzNcye2" width="72" vtype="required;" headeralign="center" allowsort="false">年初余额
		            	<input property="editor" class="mini-textbox" value="0.00" onkeypress="keyPress()" onvaluechanged="validate($(this))" style="width:100%;"/>
		            </div>
          		</div>
        	</div>
                
             
            </div>
        </div>


    </div>

    <div class="step-footer">
       <a class="mini-button blue font14 mini-button-iconRight"
            onclick="onClick()" style="margin:0 auto; padding:6px 20px;">确认发送</a>&nbsp;&nbsp;
        <a class="mini-button red font14 mini-button-iconLeft  "
            onclick="onCancel()" style="margin:0 5px; padding:6px 20px;"
            iconcls="ico-close pngbg">取消</a>
    </div>
</body>
    <script src="../../../scripts/pagejs/sb/cwbb/sb_cwbb_xqykjzz_old.js" type="text/javascript"></script>
</html>

