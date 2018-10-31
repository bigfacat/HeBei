var ssxxcx={};
var djxh = '';
var xzcfxxGrid, jyxxGrid, skjnxxGrid;

stepNav.run = function () {

	stepNav.initSteps([
		{id: 0, title: '涉税信用信息表', url: 'ssxxView.aspx'}
	]);

	// miniui初始化
	mini.parse();
	djxh = wssqUtil.nsrjbxx.djxh;

	xzcfxxGrid = mini.get("xzcfxx");
	jyxxGrid = mini.get("jyxx");
	skjnxxGrid = mini.get("skjnxx");

	ssxxcx.getNsrjbxx();
	ssxxcx.getXyxx(djxh);
	ssxxcx.getXzcfxx(djxh);
	ssxxcx.getJyxx(djxh);
	ssxxcx.getSkjnxx(djxh);
	setTimeout(function () {
		var pHeight = $('#wizard-p-0').height();
        $('.content').height(pHeight + 40);
    }, 500);

};
// 步骤跳转前执行
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
	if (currentIndex === 0) {

		//获取附报资料列表
	}

	return false;
};
stepNav.onStepChanged = function (event, currentIndex, prevIndex) {
};

//获取基本信息
ssxxcx.getNsrjbxx = function(){
	mini.get('nsrsbh').setValue(wssqUtil.nsrjbxx.nsrsbh);
	mini.get('nsrmc').setValue(wssqUtil.nsrjbxx.nsrmc);
	mini.get('scjydz').setValue(wssqUtil.nsrjbxx.scjydz);
	mini.get('zcdz').setValue(wssqUtil.nsrjbxx.zcdz);
	mini.get('fddbrxm').setValue(wssqUtil.nsrjbxx.fddbrxm);
	mini.get('fddbrsfzjhm').setValue(wssqUtil.nsrjbxx.fddbrsfzjhm);
	mini.get('cwfzrxm').setValue(wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrxm);
	mini.get('cwfzrsfzjhm').setValue(wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrsfzjhm);

};
//
/**
 * 信用信息
 * @param djxh
 */
ssxxcx.getXyxx = function (djxh) {
	$.ajax({
		url: "../../../api/qt/get/queryXyxx.ashx",
		type: "post",
		async: false,
		data: {
			djxh: djxh
		},
		success: function (data) {
			var resultData = mini.decode(data).resultMap;
			if (null != resultData) {
				var xyxx = mini.get("xyxx");
				xyxx.setData(resultData);
				// 设置打印
				var xyxxHtml = "";
				for (var i = 0; i < resultData.length; i++) {
					xyxxHtml += "<tr>" +
						"<td>" + resultData[i].pdnd + "</td>" +
						"<td>" + resultData[i].pdjb + "</td>" +
						"</tr>>";

				}
				$("#xyxx-tbody").html(xyxxHtml);
			}
		},
		error: function (data) {
		}
	});
};


ssxxcx.onGridBeforeLoad=function (e) {
	if (e.url === "") {
		e.cancel = true;
	}
	e.data["pageIndex"]=''+e.data.pageIndex;
	e.data["pageSize"] = ''+e.data.pageSize;
	e.data = JSON.stringify(e.data);
};

//行政处罚信息
ssxxcx.getXzcfxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	xzcfxxGrid.on('beforeload',ssxxcx.onGridBeforeLoad);
	xzcfxxGrid.setUrl("../../../api/qt/get/queryXzcfxx.ashx");
	xzcfxxGrid.load(paramobj);
};
/**
 * 经营信息
 * @param djxh
 */
ssxxcx.getJyxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	jyxxGrid.on('beforeload', ssxxcx.onGridBeforeLoad);
	jyxxGrid.setUrl("../../../api/qt/get/queryJyxx.ashx");
	jyxxGrid.load(paramobj);

	//合并经营信息表相同的cell
	jyxxGrid.on("load", function () {
		jyxxGrid.mergeColumns(["jyxxnd", "jyxxjysr"]);
	});
};
/**
 * 税款缴纳信息
 * @param djxh
 */
// {"skjnxxyjskhj":"3056.26","djxh":"10111309000113050936","autorowno":"1","skjnxxzsxm":"城市维护","skjnxxyf":"08月","skjnxxnd":"2016","skjnxxje":"3056.26"},{"skjnxxyjskhj":"2112.12","djxh":"10111309000113050936","autorowno":"2","skjnxxzsxm":"城市维护","skjnxxyf":"07月","skjnxxnd":"2017","skjnxxje":"2112.12"}],"success":true,"msgCode":null,"resultMap":{},"msgParams":null}
ssxxcx.getSkjnxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	skjnxxGrid.on('beforeload', ssxxcx.onGridBeforeLoad);
	skjnxxGrid.setUrl("../../../api/qt/get/querySkjnxx.ashx");
	skjnxxGrid.load(paramobj);
	//合并税款缴纳信息表相同的cell
	skjnxxGrid.on('load', function () {
		skjnxxGrid.mergeColumns(['skjnxxnd', 'skjnxxyjskhj', 'skjnxxyf']);
	});

};

/**
 * 授权声明
 */
ssxxcx.sqsm = function(){
	mini.open({
		url : "yshd_shouquan.aspx",
		title : "授权声明",
		width : 620,
		height : 400,
		currentWindow:true,
		ondestroy : function(action) {
			$("#sfdy").val("1");
		}
	});

}

/**
 * 打印
 */
ssxxcx.printSssj = function() {
	//mini.get(mini.get('choice'));
	/**
	 * 是否查看授权声明
	 */
	var sqsq = $("#sfdy").val();
	if(sqsq == 0){
		mini.alert("请阅读授权声明");
		return false;
	}
	/**
	 * 设置打印内容
	 * @type {any}
	 */
	var xzcfxxRow = xzcfxxGrid.getSelecteds(), xzcfxxHtml = '';
	var jyxxRow = jyxxGrid.getSelecteds(), jyxxHtml = '';
	var skjnxxRow = skjnxxGrid.getSelecteds(), skjnxxHtml = '';
	for (var i = 0; i < xzcfxxRow.length; i++) {
		xzcfxxHtml += "<tr>" +
			"<td>" + xzcfxxRow[i].xzcfnd + "</td>" +
			"<td>" + xzcfxxRow[i].xzcfsj + "</td>" +
			"<td>" + xzcfxxRow[i].xzcfsx + "</td>" +
			"<td>" + xzcfxxRow[i].xzcfje + "</td>" +
			"</tr>";
	}
	for (var j = 0; j < jyxxRow.length; j++) {
		jyxxHtml += "<tr>" +
			"<td>" + jyxxRow[j].jyxxnd + "</td>" +
			"<td>" + jyxxRow[j].jyxxjysr + "</td>" +
			"<td>" + jyxxRow[j].jyxxyf + "</td>" +
			"<td>" + jyxxRow[j].jyxxzyjysr + "</td>" +
			"</tr>";
	}
	for (var k = 0; k < skjnxxRow.length; k++) {
		skjnxxHtml += "<tr>" +
			"<td>" + skjnxxRow[k].skjnxxnd + "</td>" +
			"<td>" + skjnxxRow[k].skjnxxyjskhj + "</td>" +
			"<td>" + skjnxxRow[k].skjnxxyf + "</td>" +
			"<td>" + skjnxxRow[k].skjnxxzsxm + "</td>" +
			"<td>" + skjnxxRow[k].skjnxxje + "</td>" +
			"</tr>";
	}
	$("#xzcfxx-tbody").html(xzcfxxHtml);
	$("#jyxx-tbody").html(jyxxHtml);
	$("#skjnxx-tbody").html(skjnxxHtml);

	/**
	 * 开始初始化打印
	 */
	var LODOP = getLodop();
	var printHtml = document.getElementById('print-area').innerHTML;
	var cssStr = document.getElementById('print-style').innerHTML,
		strBodyStyle, strFormHtml;

	strBodyStyle = '<style>' + cssStr + '</style>';
	strFormHtml = strBodyStyle + '<body>' + printHtml + '</body>';
	LODOP.PRINT_INIT("涉税信用信息表打印"); //
	LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张横向打印 第一个参数 1正向，2横向
	LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);// 1正向显示，0横向显示
	LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); // Auto-Width 整宽不变形
	LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 0, 0, "涉税信用信息表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
	LODOP.ADD_PRINT_HTM("1mm", "2mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
	LODOP.PREVIEW(); // 打开打印预览窗口
}







