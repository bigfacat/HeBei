var ssxxts={};
var djxh = '';
var yhdm;
var yhmc;
var xzcfxxGrid,jyxxGrid,skjnxxGrid;
var ssxyxxdata ={};
var jbxx='';
var wcUrl= '';
var selectMapsXzcfxx = {};
var selectMapsJyxx = {};
var selectMapsSkjn = {};
stepNav.run = function () {
	stepNav.initSteps([
		{id: 0, title: '涉税信用信息表', url: 'ssxxtsView.aspx'},
		{id: 1, title: '授权', url: 'sqView.aspx'},
		{id: 2, title: '选择银行', url: 'xzyhView.aspx', yltj:true},
		{id: 3, title: '完成', url: 'wcView.aspx'}
	]);

	// miniui初始化
	mini.parse();
	ssxxts.initYh();

	djxh = wssqUtil.nsrjbxx.djxh;
	ssxxts.ssxxForm = new mini.Form('#ssxx'); // 信息补录总的form
	ssxxts.jbxx = new mini.Form('#jbxx');

	xzcfxxGrid = mini.get("xzcfxx");
	jyxxGrid = mini.get("jyxx");
	skjnxxGrid = mini.get("skjnxx");

	ssxxts.getNsrjbxx();
	ssxxts.getXyxx(djxh);
	ssxxts.getXzcfxx(djxh);
	ssxxts.getJyxx(djxh);
	ssxxts.getSkjnxx(djxh);

	$('.content').height($('#ssxx').height()+ 100);
};
// 步骤跳转前执行
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
	if (currentIndex === 0) {
		ssxyxxdata.jbxx = ssxxts.jbxx.getDataAndText(true);
		ssxyxxdata.xyxx = mini.get('xyxx').getData(); //信用信息

		var xzcfxx = new Array();
		for(var j =0;j<xzcfxxGrid.totalPage;j++){
			var rows=selectMapsXzcfxx[j];
			if(rows){
				for(var i=0;i<rows.length;i++){
					var row = rows[i];
					xzcfxx.push(row);
				}
			}
		}
		var xzcfxxJson = xzcfxx;

		var jyxx = new Array();
		for(var j =0;j<jyxxGrid.totalPage;j++){
			var rows=selectMapsJyxx[j];
			if(rows){
				for(var i=0;i<rows.length;i++){
					var row = rows[i];
					jyxx.push(row);
				}
			}
		}
		var jyxxJson = jyxx;

		var skjnxx = new Array();
		for(var j =0;j<skjnxxGrid.totalPage;j++){
			var rows=selectMapsSkjn[j];
			if(rows){
				for(var i=0;i<rows.length;i++){
					var row = rows[i];
					skjnxx.push(row);
				}
			}
		}
		var skjnxxJson = skjnxx;

		ssxyxxdata.xzcfxx = xzcfxxJson; //行政处罚信息
		ssxyxxdata.jyxx = jyxxJson; //经营信息
		ssxyxxdata.skjnxx = skjnxxJson;//税款缴纳信息

		for (var item in ssxyxxdata) {
			var prop = ssxyxxdata[item];
			if ($.isArray(prop)) {
				for (var i = 0; i < prop.length; i++) {
					delete prop[i]['_index'];
					delete prop[i]['_uid'];
					delete prop[i]['autorowno'];
				}
			}
		}
		return true;
	}
	if (currentIndex === 1) {
		var checkeds = mini.get('checkSqsm');
		if(checkeds.checked == false){
			mini.alert("请仔细阅读授权说明，然后勾选已阅读，再点击下一步！");
		}else{
			return true;
		}
	}
	if (currentIndex === 2) {
		wssqUtil.tjsqResponse = '';
		wssqUtil.tjsqResponse.shfsDm='02';
		return ssxxts.tj();
	}
};

stepNav.onStepChanged = function (event, currentIndex, prevIndex) {

};


//获取基本信息
ssxxts.getNsrjbxx = function(){
	mini.get('nsrsbh').setValue(wssqUtil.nsrjbxx.nsrsbh);
	mini.get('nsrmc').setValue(wssqUtil.nsrjbxx.nsrmc);
	mini.get('scjydz').setValue(wssqUtil.nsrjbxx.scjydz);
	mini.get('zcdz').setValue(wssqUtil.nsrjbxx.zcdz);
	mini.get('fddbrxm').setValue(wssqUtil.nsrjbxx.fddbrxm);
	mini.get('fddbrsfzjhm').setValue(wssqUtil.nsrjbxx.fddbrsfzjhm);
	mini.get('cwfzrxm').setValue(wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrxm);
	mini.get('cwfzrsfzjhm').setValue(wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrsfzjhm);

};

ssxxts.onGridBeforeLoad=function (e) {
	e.data = JSON.stringify(e.data);
};

//信用信息
ssxxts.getXyxx = function(djxh) {
	$.ajax({
		url: "../../../api/qt/get/queryXyxx.ashx",
		type: "post",
		async: false,
		data: {
			djxh: djxh
		},
		success: function (data) {
			var resultData = mini.decode(data).value;
			if (null != resultData) {
				var xyxx = mini.get("xyxx");
				xyxx.setData(resultData);
			}
		},
		error: function (data) {
		}
	});
};
//行政处罚信息
ssxxts.getXzcfxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	xzcfxxGrid.on('beforeload',ssxxts.onGridBeforeLoad);
	xzcfxxGrid.setUrl("../../../api/qt/get/queryXzcfxx.ashx");
	xzcfxxGrid.load(paramobj);
};
//经营信息
ssxxts.getJyxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	jyxxGrid.on('beforeload', ssxxts.onGridBeforeLoad);
	jyxxGrid.setUrl("../../../api/qt/get/queryJyxx.ashx");
	jyxxGrid.load(paramobj);

	//合并经营信息表相同的cell
	jyxxGrid.on("load", function () {
		jyxxGrid.mergeColumns(["jyxxnd", "jyxxjysr"]);
	});
};
//税款缴纳信息
ssxxts.getSkjnxx = function(djxh) {
	var paramobj = {};
	paramobj.djxh = djxh;
	var param = mini.encode(paramobj);
	skjnxxGrid.on('beforeload', ssxxts.onGridBeforeLoad);
	skjnxxGrid.setUrl("../../../api/qt/get/querySkjnxx.ashx");
	skjnxxGrid.load({
		data: param
	}, function (data) {
	});

	//合并税款缴纳信息表相同的cell
	skjnxxGrid.on('load', function () {
		skjnxxGrid.mergeColumns(['skjnxxnd', 'skjnxxyjskhj', 'skjnxxyf']);
	});
};

//提交
ssxxts.tj = function () {
	var result=false;
	//ssxyxxdata = mini.encode(ssxyxxdata);
	// if(yhdm==null){
	// 	mini.alert("请选择要推送的银行");
	// }
	var data={
			djxh:djxh,
			yhdm:yhdm,
			yhmc:yhmc,
			ssxyxx:ssxyxxdata
	};
	if(yhdm != null){
	ajax.post('../../../api/qt/send/encryptAndSendSsxyxx', mini.encode(data), function(data){
		if (!data.success) {
			//mini.alert(data.message);
			mini.unmask();
			mini.alert("推送失败，请稍后再试！");
		}else {
			//result = true;
			var json = mini.decode(data);
				if (yhdm == "yc" && json.success) {
					//mini.hideMessageBox(messageid);
					mini.unmask();
					flag = true;
					return flag;
				}
				var s=mini.decode(json.value);
			if (json.success && s.success) {
					//mini.hideMessageBox(messageid);
					result = true;
					var pid='';
					if (yhdm == 'gd') {
						pid = '01';
					} else if (yhdm == 'ms') {
						pid = '02';
					} else if (yhdm == 'pa') {
						pid = '03';
					}
				    if(yhdm == 'gd' || yhdm == 'ms' || yhdm == 'pa'){
				    	nsrsbhCry = json.resultMap.nsrsbhCry;
					    ssxxts.wcUrl = 'http://www.vzoom.com/certtax/new/invokeJsonFb.html?nsrsbh='+nsrsbhCry+'&tax=hebei&ver=pc&pid='+pid;
					    $("#viewSqzl").html('<a style="color:#0a94dd" href="'+ssxxts.wcUrl+'">点击完成银行产品在线申请</a>');
				    }else{
					    $("#viewSqzl").hide();
				    }
			}else{
				mini.unmask();
				mini.alert("推送失败，请稍后再试！");
				flag = false;
				return flag;
			}
		}
	});}
	else{
		mini.alert("请选择要推送的银行");
	}
	mini.unmask();
	return result;
};

//银行列表
ssxxts.initYh = function() {
	var data = [
		{"id": "gs", "text": "工商银行", "src": "gsyh"},
		{"id": "ny", "text": "农业银行", "src": "nyyh"},
		{"id": "zg", "text": "中国银行", "src": "zgyh"},
		{"id": "js", "text": "建设银行", "src": "jsyh"},
		{"id": "jt", "text": "交通银行", "src": "jtyh"},
		{"id": "zx", "text": "中信银行", "src": "zxyh"},
		{"id": "gd", "text": "光大银行", "src": "gdyh"},
		{"id": "hx", "text": "华夏银行", "src": "hxyh"},
		{"id": "zs", "text": "招商银行", "src": "zsyh"},
		{"id": "pf", "text": "浦发银行", "src": "pfyh"},
		{"id": "xy", "text": "兴业银行", "src": "xyyh"},
		{"id": "ms", "text": "民生银行", "src": "msyh"},
		{"id": "pa", "text": "平安银行", "src": "payh"},
		{"id": "hb", "text": "河北银行", "src": "hbyh"},
		{"id": "bj", "text": "北京银行", "src": "bjyh"},
		{"id": "yc", "text": "邮储银行", "src": "ycyh"},
		{"id": "nx", "text": "农信联社", "src": "nxls"},
		{"id": "lf", "text": "廊坊银行", "src": "lfyh"},
		{"id": "xt", "text": "邢台银行", "src": "xtyh"}
	];
	var iskhd = false;
	var reg = new RegExp("(^|&)khddm=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	var khddm  ;
	if('' != r && r != null ){
		khddm =  unescape(r[2]);
		if(''==khddm||khddm==null){
			iskhd = false;
		}else{
			iskhd = true;
		}
	}
	var xzyh = $('#xzyh');
	var item = '';
	for (var i = 0; i < data.length; i++) {
		item += '<div class="yh-box"><input type="radio" name="yh"  class="yh-radio" value="' + data[i].id + '"/>'
			+ '<img src="../../images/yh/' + data[i].src + '.png" class="yh-img"/>'
			+ '<span class="yh-name">' + data[i].text + '</span></div>';

			if (i == 4 || i == 9 || i == 14 || i == 18) {
			item += '<br>';
		}
		if(iskhd){
			if(data[i].src == khddm){
				yhdm = data[i].id;
				yhmc = data[i].text;
			}
		}

	}
	xzyh.html(item);
	if(iskhd){
		xzyh.css("text-align","center");
		$(".yh-box").each(function(i){
			if($(this).find('input').val() != yhdm)
			{
				$(this).hide();
			}
		});
	}else{
		xzyh.css("text-align","left");
	}
	/*if(xzyh.find('.yh-box').find('input').val == "yc"){
	 xzyh.find('.yh-box').find('input').attr('checked', true);
	 }*/
	$('.yh-box.active').removeClass('active');
	$(".yh-box input").attr('disabled','disabled').parents(".yh-box").removeClass('active');
	if(iskhd){
		$(".yh-box input[value = '"+yhdm+"' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = '"+yhdm+"' ]").attr('checked', true);
		$("#mqktyhmc").html("");
		$("#dbt").html("");
		$("#dbt").html("推送银行");
	}else{
		$(".yh-box input[value = 'yc' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = 'jt' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = 'zg' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = 'bj' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		//$(".yh-box input[value = 'xt' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = 'ms' ]").removeAttr('disabled').parents(".yh-box").addClass('active');
		$(".yh-box input[value = 'js' ]").removeAttr('disabled').parents(".yh-box").addClass('active');

	}
	//yhdm = "yc";
	//yhmc = "邮储银行";
	xzyh.find('.yh-box').click(function () {
		console.log($(this).find('input').val());
		if(!iskhd){
			if($(this).find('input').val() == "yc"
				|| $(this).find('input').val() == "jt"
				//|| $(this).find('input').val() == "xt"
				|| $(this).find('input').val() == "ms"
				|| $(this).find('input').val() == "js"
				|| $(this).find('input').val() == "bj"
				|| $(this).find('input').val() == "zg"){
				$('.yh-box.active').removeClass('active');
				$(this).addClass('active');
				$(this).find('input').attr('checked', true);
				yhdm = $(this).find('input').val();
				yhmc = $(this).find('span').text();
			}
		}
	});
}

//跨页多选


ssxxts.onXzcfGridLoad =function(e) {
	var rows = selectMapsXzcfxx[xzcfxxGrid.getPageIndex()];
	if(rows){
		for(var i=0;i<rows.length;i++){
			var row = rows[i];
			xzcfxxGrid.setSelected(xzcfxxGrid.getRow(row._index));
		}
	}
}
ssxxts.onXzcfSelectoinChanged = function(e) {
	var rows = xzcfxxGrid.getSelecteds();
	selectMapsXzcfxx[xzcfxxGrid.getPageIndex()] = rows;
}

ssxxts.onJyxxGridLoad =function(e) {
	var rows = selectMapsJyxx[jyxxGrid.getPageIndex()];
	if(rows){
		for(var i=0;i<rows.length;i++){
			var row = rows[i];
			jyxxGrid.setSelected(jyxxGrid.getRow(row._index));
		}
	}
}
ssxxts.onJyxxSelectoinChanged = function(e) {
	var rows = jyxxGrid.getSelecteds();
	selectMapsJyxx[jyxxGrid.getPageIndex()] = rows;
}

//税款缴纳信息
ssxxts.onSkjnGridLoad =function(e) {
	var rows = selectMapsSkjn[skjnxxGrid.getPageIndex()];
	if(rows){
		for(var i=0;i<rows.length;i++){
			var row = rows[i];
			skjnxxGrid.setSelected(skjnxxGrid.getRow(row._index));
		}
	}
}
ssxxts.onSkjnSelectoinChanged = function(e) {
	var rows = skjnxxGrid.getSelecteds();
	selectMapsSkjn[skjnxxGrid.getPageIndex()] = rows;
}

//去掉selectMap中的序号
ssxxts.deleteIndex = function(t){

}