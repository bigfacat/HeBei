var win;
var form;
var fileupload;
var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
$(function() {
	mini.parse();
	init();
});
function init(){
	win = mini.get("windowshow");
	form = $("#resForm");
	fileupload = mini.get("fileupload1");
	// 获取核定信息，判断核定信息是否存在
	var sbzlArray=['10423'];
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	var resultData = isExsitSbzlHdxx(sbzlArray, hdxxData);
	if(""==resultData||null==resultData){
		mini.alert("当前用户税种登记信息中不存在企业所得税A类年报，不能进行企业所得税A类年报申报", '提示信息', function() {
			window.close();
		});
		return;
	}
	SBZLCODE = resultData.SBZLCODE;
	if(""==SBZLCODE){
		mini.alert("当前用户税种登记信息中不存在企业所得税A类年报，不能进行企业所得税A类年报申报", '提示信息', function() {
			window.close();
		});
		return;
	}
	if('N'==resultData.QCCGBZ){
		mini.alert(resultData.QCCGBZMS, '提示信息', function() {
			window.close();
		});
		return;
	}
}

var startUpload = function(){
    if(""==fileupload.value||null==fileupload.value){
    	mini.alert("请选择上传介质申报所需要的文件。");
    	return ;
    }
    fileupload.setUploadUrl("/sb/sbcommon_jzsb.do");
    fileupload.startUpload();
    messageId = mini.loading("申报处理中，请稍等......", "处理中");
};

function onUploadSuccess(e) {
    mini.hideMessageBox(messageId);
    var result = mini.decode(e.serverData);
    if(""==result||null == result){
    	mini.alert("申报失败，请联系工作人员。");
    }
    if (!result.success) { //申报失败
    	if(""==result.message){
    		mini.alert("申报失败，请联系工作人员。");
    	}else{
    		mini.alert(result.message);
    	}
        return;
    } else {
        $("#title").text("介质申报");
		$("#content").html(result.message);
		$("#reponseXml").attr("value",result.data);
		win.show();
    }
}

function onUploadError(e) {
    mini.hideMessageBox(messageId);
    mini.alert("请点击重置！然后重新选择申报文件！");
}

/**
 * 下载反馈
 
function downloadFk(){
	form.submit();
}
*/
/**
 * 重置
 */
function reset(){
	fileupload.setValue("");
	fileupload.setText("");
}

//隐藏window
function hideWin(){
	win.hide();
}