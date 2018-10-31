//++++++++++++++++++++++++++++++++++++++++++++《废弃电器电子产品处理基金申请表申报》+++++++++++++++++++++++++
var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlDm="";
var sbzlArray = ['17701'];
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
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			
		});
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
	setSbnyValue();
	//mini.get("sbny").setValue(getSbny());
	search();
});

function sb(){
	window.location.href = './sb_fqdzcpcljj.html';
}

function search() {
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
	var sssqArray = getSssq(sbny, sbzlDm);
	var sbqkVO = querySbqkSbxx(nsrData.djxh, sssqArray[0], sssqArray[1], sbzlDm);// 查询是否已经申报过
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
		return;
	}
	if (sbqkVO.sbztDm == 'hxzgSuccess') {
		mini.alert("您已成功申报过废弃电器电子产品处理基金申报，但未使用本系统申报,故无法查询申报记录！");
		$("#xgmsb-btn").hide();
	} else if (sbqkVO.sbztDm == 'hxzgFail') {
	} else if (sbqkVO.sbztDm == '0000'||(sbqkVO.sbztDm.indexOf('20')==0)) {
		$("#xgmsb-btn").hide();
		grid.setData(new Array(sbqkVO));
	} else {
		grid.setData(new Array(sbqkVO));
	}
	return;
}