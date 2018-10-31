var nsrData = getNsrxxVO();
var sbzlDm="";
var sbzlArray = ['26501','26502'];
var sbzlNode;

$(function() {
	mini.parse();
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	if(hdxxData == null){
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
	}
	sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
	if (sbzlNode == null) {
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	sbzlDm = sbzlNode.SBZLCODE;	
	if(""==sbzlDm){
		$("#xgmsb-btn").hide();
		mini.alert("当前用户税种登记信息中不存在文化事业建设费，不能进行文化事业建设费申报", '提示信息', function() {
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
	var sssqArray = getSssq(getSbny(), sbzlDm);
	var reg=new RegExp("-","g");
	sssqq = sssqArray[0].replace(reg, "");
	sssqz = sssqArray[1].replace(reg, "");
	$.ajax({
		url : "/sb/whsyjs_queryZzsSbqk.do",
		async : false,
		type : "POST",
		data:{
			djxh: nsrData.djxh,
			nsrsbh: nsrData.nsrsbh,
			sssqq: sssqq,
			sssqz: sssqz
		},
		success : function(data) {
				var json = mini.decode(data);
				if (!json.success){
					mini.alert("查询增值税申报情况出错", '提示信息');
					return;
				}
				var count = json.data;
				if (count == 0){
					mini.alert("您未申报增值税，不能进行文化事业建设费申报", '提示信息');
					return;
				}else {
					var bz = getWsxxValueByCode(sbzlNode, "GGYSFYXCEKC");
					if ("Y" == bz){
						window.location.href = './sb_whsyysfwkcqd.html';		
					}else{
						window.location.href = './sb_whsysb.html';
					}
				}
		},error : function() {
			mini.alert("查询增值税申报情况出错", '提示信息',function (){parent.parent.$('body').trigger('close.frame.dialog');});
		}
	});
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
		mini.alert("您已成功申报过文化事业建设费申报，但未使用本系统申报,故无法查询申报记录！");
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





