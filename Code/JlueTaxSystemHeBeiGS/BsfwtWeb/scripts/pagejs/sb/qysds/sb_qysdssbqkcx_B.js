var SBZLCODE="";
var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var resultData="";
var sbzlArray = ['10417','10419'];
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
	setSbnyValue();
	//mini.get("sbny").setValue(getSbny());
	search();
	
	setTitlename(SBZLCODE);

});
/*所得税风险异常查询*/
function viewFxsmjgcx(sbzlDm){
	//JA 10418 所得税A类季报,JB 10419是所得税B类季报, YA 10416 是所得税A类月报，YB 10417 所得税B类月报
	var bblx='';
	if(sbzlDm=="10416"){
		bblx='YA';
	}else if(sbzlDm=="10417"){
		bblx='YB';
	}else if(sbzlDm=="10418"){
		bblx='JA';
	}else if(sbzlDm=="10419"){
		bblx='JB';
	}
	$.ajax({
		url : "/xgmsb/qysdsSb_getSdsFxyy.do",
		type : "post",
		async:false,
		data : {
			bblx:bblx
		},
		success : function(resultvo) {
			var result = mini.decode(resultvo);
			if (result.success) {
				var fxyy = result.data.SdsFXXXResponseVo.response.fxyys.fxyy;
				$("#ssfxts .errorText").empty();
				$("#tbljcw .errorText").empty();
				var fxzbNum= 0,yxcwNum=0;
				if (fxyy && fxyy.length > 0) {
					for (var i = 0; i < fxyy.length; i++) {
						if (fxyy[i].fxzbTs != "") {
							fxzbNum++;
							var fxzbTs = '<span>所属期起：' + fxyy[i].sssq_q +
								'</span><br/><span>所属期止：' + fxyy[i].sssq_z +
								'</span><br/><span>报表编号：' + fxyy[i].bbid +
								'</span><br/><span>报表名称：' + fxyy[i].bbmc +
								'</span><br/><span>涉税风险提示:' + fxyy[i].fxzbTs +
								'</span>';
							$("#ssfxts .errorText").append(fxzbTs);
						}
						if (fxyy[i].yxcwTs != "") {
							yxcwNum++;
							var yxcwTs = '<span>所属期起：' + fxyy[i].sssq_q +
								'</span><br/><span>所属期止：' + fxyy[i].sssq_z +
								'</span><br/><span>报表编号：' + fxyy[i].bbid +
								'</span><br/><span>报表名称：' + fxyy[i].bbmc +
								'</span><br/><span>填报逻辑错误提示：' + fxyy[i].yxcwTs +
								'</span>';
							$("#tbljcw .errorText").append(yxcwTs);
						}
					}
					if(fxzbNum==0){
						var fxzbTs = '<span>没有涉税风险提示</span>';
						$("#ssfxts .errorText").empty();
						$("#ssfxts .errorText").append(fxzbTs);
					}
					if(yxcwNum==0){
						var yxcwTs = '<span>没有填报逻辑错误提示</span>';
						$("#tbljcw .errorText").empty();
						$("#tbljcw .errorText").append(yxcwTs);
					}
				} else {
					var fxzbTs = '<span>没有涉税风险提示</span>';
					var yxcwTs = '<span>没有填报逻辑错误提示</span>';
					$("#ssfxts .errorText").empty();
					$("#ssfxts .errorText").append(fxzbTs);
					$("#tbljcw .errorText").empty();
					$("#tbljcw .errorText").append(yxcwTs);
				}
			} else {
				mini.alert(result.message);
			}
		},
		error : function() {
			mini.alert("所得税风险异常查询失败");
		}
	});
	$("#sdsfxyccx").show();
}
/*填报逻辑错误*/
function showTbljcw(){
	$("#sdsfxyccx").hide();
	$("#tbljcw").show();
}
/*涉税风险提示*/
function showSsfxts(){
	$("#sdsfxyccx").hide();
	$("#ssfxts").show();
}
function hideWin(){
	$("#sdsfxyccx").hide();
	$("#tbljcw").hide();
	$("#ssfxts").hide();
}
function setTitlename(SBZLCODE){
	if("10417" == SBZLCODE || "10419" == SBZLCODE){
		$("#titlename").html("B类");
	} else {
		$("#titlename").html("A类");
	}
}

function sb(){
	if ("10417" == SBZLCODE || "10419" == SBZLCODE) {
		window.open('suodeshuiB.html');
	} else if("10416" == SBZLCODE || "10418" == SBZLCODE){
		window.open('suodeshuiA.html');
	}
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
	var sssqArray =getSssq(sbny,SBZLCODE);
	var sbqkVO = querySbqkSbxx(nsrData.djxh,sssqArray[0],sssqArray[1],SBZLCODE)	;// 查询是否已经申报过
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
		return;
	}
	if(sbqkVO.sbztDm == 'hxzgSuccess'){
		$("#xgmsb-btn").hide();
		if("10417" == SBZLCODE || "10419" == SBZLCODE){
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


