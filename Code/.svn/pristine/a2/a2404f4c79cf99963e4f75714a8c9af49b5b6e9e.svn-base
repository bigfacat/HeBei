<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jzsb.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.BsfwtWeb.pages.sb.jzsb" %>

<!doctype html>
<html>
<head>
<title>介质导入申报</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script src="../../scripts/boot.js" type="text/javascript"></script>
<script src="../../scripts/pagejs/sb/jzsb.js" type="text/javascript"></script>
<script src="../../scripts/pagejs/sb/sbcommon.js" type="text/javascript"></script>
<script src="../../scripts/swfupload/swfupload.js" type="text/javascript"></script>
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
}
.mini-window .mini-panel-header { background:none repeat scroll 0 0 #d6e4f2;}
</style>
</head>
<body style="background:#fff;">
<div class="place" style="padding:0 10px;"></div>
<div class="searchdiv" id="nsrxxdiv">
  <table width="96%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <th>申报文件：</th>
      <td>
      <input id="fileupload1" class="mini-fileupload" name="uploadFile" limitType="*.xml" 
    style="width: 500px;" required="true"
    flashUrl="../../scripts/swfupload/swfupload.swf"
    limitSize = "100KB"  emptyText = "请选择申报文件"
    uploadOnSelect="false"  
    onuploadsuccess="onUploadSuccess" usequerystring="true"
    onuploaderror="onUploadError" 
    />
      </td>
       <br>
      
    </tr>
   
   
    <tr>
      <td colspan="4" align="center" style="padding-top:10px;"><input type="button" value="执行" onclick="startUpload();" class="bt-search"/>
        &nbsp;
        <input type="button" value="重置" onclick="reset();" class="bt-search"/></td>
    </tr>
    <tr>
    <td colspan="4" align="center"> 
    <span class="tips" style = "color:#FF0000">备注：导入只支持“.xml”格式，文件不能超过100KB</span>
    </td>
    </tr>
  </table>
    <div style="color:#EF0732;font-weight: bold">
     <tr>
     <a href="http://download.servyou.com.cn/uploads/%E6%B2%B3%E5%8C%97%E9%80%9A%E7%94%A8%E7%94%B3%E6%8A%A5%E5%8D%95%E4%BC%81%E4%B8%9A%E6%B2%B3%E5%8C%97%E5%85%AC%E5%8F%B8%EF%BC%88%E5%8D%95%E4%BC%81%E4%B8%9A%E7%89%88%EF%BC%89170.rar" style="color:#0000FF;font-weight: bold">河北国税汇算清缴软件下载
</a>
     </tr>
     </div>
     <p></p>
     <div style="color:#000000;font-weight: bold">
     <tr style="color:#000000;font-weight: bold">
     操作说明：<br/>第一步，下载并安装“河北国税汇算清缴软件”；<br/>
第二步，打开河北国税汇算清缴软件，注册成功后，下载基本信息，核定信息，填写财务报表年报、汇算清缴年报、年度关联往来业务报告表，并进行介质导出；<br/>
第三步，把第二步导出的介质文件，在本页面进行介质导入申报。
     </tr>
    </div>
</div>
<!-- 反馈信息窗口 -->
<div id="windowshow" class="mini-window po" title="申报结果" style="width:500px;height:300px;" 
    showToolbar="false" showFooter="true" showModal="true" allowResize="false" allowDrag="true"
    >
    <table width="480px" border="0" cellspacing="0" cellpadding="0" style="TABLE-LAYOUT: fixed;overflow-x:hidden;" class="add_tables_check">
      <tr>
        <th align="left" id="title">
        </th>
      </tr>
	  <tr>
		<td align="left" style="width:20%;">申报结果：</td>
	  </tr>
	<tr>    	
      	<td class="add_tables_right" align="left" id="content" style="WORD-WRAP: break-word;">
      	</td>
      </tr>
      
    </table> 
  
   <div class="btdiv" style="position: private;bottom: 0;">
		<a class="mini-button gray font14 pngbg" onclick="javascript:hideWin()">关闭</a>
   </div>
</div>


</body>
</html>
