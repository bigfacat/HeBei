var SBZLCODE="";
var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var resultData="";
var sbzlArray = ['10421'];
var month;
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
	resultData = isExsitSbzlHdxx(sbzlArray, hdxxData);
	
	if(""==resultData||null==resultData){
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	SBZLCODE = resultData.SBZLCODE;
	if(""==SBZLCODE){
		$("#xgmsb-btn").hide();
		mini.alert("当前用户税种登记信息中不存在企业所得税B类，不能进行企业所得税B类申报", '提示信息', function() {
			window.close();
		});
		return;
	}
	if('N'==resultData.QCCGBZ){
		$("#xgmsb-btn").hide();
		mini.alert(resultData.QCCGBZMS, '提示信息', function() {
			window.close();
		});
		return;
	}
	//单独重写初始化年月
	var date = new Date();
    year = date.getFullYear() - 1;
    month = date.getMonth() + 1;
    var t = mini.get("sbny");
    t.setValue(year+"-"+month);
	search();
	
	setTitlename(SBZLCODE);	
});

function setTitlename(SBZLCODE){
	if("10417" == SBZLCODE || "10419" == SBZLCODE|| "10421" == SBZLCODE){
		$("#titlename").html("B类");
	} else {
		$("#titlename").html("A类");
	}
}


function sb(){
	if ("10417" == SBZLCODE || "10419" == SBZLCODE|| "10421" == SBZLCODE) {
		window.open('sb_qysds_B_year.html');
	}else{
		//window.close();
	}
	window.close();

}

function search(){
	var grid = mini.get("sbqkGrid");
	grid.setData("");
	var sbnyInput = mini.get("sbny").text;
	if (year != sbnyInput) {
		year = sbnyInput;
		$("#xgmsb-btn").hide();
	}else{
		if (month > 6){// 2016 年，年报延期，由 5 改成 6 lizm 下面还有2个 month > 6 ，2016-6-1 17：41
			$("#xgmsb-btn").hide();
		}else {
			$("#xgmsb-btn").show();
		}		
	}
	var ssssq = year + '-01-01';
	var ssssz = year + '-12-31';
	var sbqkVO = querySbqkSbxx(nsrData.djxh,ssssq,ssssz,SBZLCODE)	;// 查询是否已经申报过
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管查询异常，请稍后再试！");
		return;
	}
	if(sbqkVO.sbztDm == 'hxzgSuccess'){
		$("#xgmsb-btn").hide();
		if("10417" == SBZLCODE || "10419" == SBZLCODE|| "10421" == SBZLCODE){
			mini.alert("您已成功申报过所得税B类，但未使用本系统申报,故无法查询申报记录！","提示信息",function(){
				window.close();
			});
		} else if("10416" == SBZLCODE || "10418" == SBZLCODE){
			mini.alert("您已成功申报过所得税A类，但未使用本系统申报,故无法查询申报记录！","提示信息",function(){
				window.close();
			});
		}else{
			mini.alert("您已成功申报过所得税，但未使用本系统申报,故无法查询申报记录！","提示信息",function(){
				window.close();
			});
		}
	}else if(sbqkVO.sbztDm == 'hxzgFail'){
		if (month > 6){
			$("#xgmsb-btn").hide();
		}
	}else if(sbqkVO.sbztDm == '0000'||(sbqkVO.sbztDm.indexOf('20')==0)){
		$("#xgmsb-btn").hide();
		var grid = mini.get("sbqkGrid");
		grid.setData(new Array(sbqkVO));
	}else {
		if (month > 6){
			$("#xgmsb-btn").hide();
		}
		var grid = mini.get("sbqkGrid");
		grid.setData(new Array(sbqkVO));
	}
	return;
}

function szRenderer(e){
	return "<span>企业所得税B类</span>";
}

