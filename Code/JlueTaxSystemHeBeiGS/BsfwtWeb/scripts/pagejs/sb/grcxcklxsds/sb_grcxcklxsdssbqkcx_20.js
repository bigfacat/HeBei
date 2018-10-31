//++++++++++++++++++++++++++++++++++++++++++++《个人储蓄存款利息所得税》+++++++++++++++++++++++++
var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlDm="";
var sbzlArray = ["10602"];
$(function() {
	mini.parse();
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	if (hdxxData == null) {
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	var sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
	if (sbzlNode == null) {
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系");
		return;
	}
	sbzlDm = sbzlNode.SBZLCODE;
	if(""==sbzlDm){
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	if('N'==sbzlNode.QCCGBZ){
		$("#xgmsb-btn").hide();
		mini.alert(sbzlNode.QCCGBZMS, '提示信息', function() {
			window.close();
		});
		return;
	}
	$(".titlename").html("20%");
	setSbnyValue();
	//mini.get("sbny").setValue(getSbny());
	search();
});


function sb(){
	window.open('sb_grcxcklxsds_20.html');
	window.close();
}



function search(){
	var grid = mini.get("sbqkGrid");
	grid.setData("");
	var sbny = getSbny();
	var sbnyInput = mini.get("sbny").text;
	if (sbny != sbnyInput) {
		sbny = sbnyInput;
		$("#xgmsb-btn").hide();
	}else{
		$("#xgmsb-btn").show();
	}
	var sssqArray =getSssq(sbny,sbzlDm);
	var sbqkVO = querySbqkSbxx(nsrData.djxh,sssqArray[0],sssqArray[1],sbzlDm)	;// 查询是否已经申报过
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
		return;
	}
	if(sbqkVO.sbztDm == 'hxzgSuccess'){
		$("#xgmsb-btn").hide();
		mini.alert("您已成功申报过个人储蓄存款利息所得税20%，但未使用本系统申报,故无法查询申报记录！");
	}else if(sbqkVO.sbztDm == 'hxzgFail'){
	}else if(sbqkVO.sbztDm == '0000'||(sbqkVO.sbztDm.indexOf('20')==0)){
		$("#xgmsb-btn").hide();
		var grid = mini.get("sbqkGrid");
		grid.setData(new Array(sbqkVO));
	}else {
		var grid = mini.get("sbqkGrid");
		grid.setData(new Array(sbqkVO));
	}
	return;
	
	
}



