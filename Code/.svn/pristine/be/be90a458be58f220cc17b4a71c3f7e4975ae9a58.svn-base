/**
 * 缴款凭证查询的js
 */
$(function() {

	init();
});

/** 初始化 */
function init() {

	initSssq();

}

/** 初始化所属期 */
function initSssq() {
	// 2. 缴款凭证打印页面，默认进去时，缴款日期起为当前月份第一天，缴款日期止为当日
	 var firstDate = new Date();
	// firstDate.setMonth(firstDate.getMonth() - 1);
	// firstDate.setDate(1); // 第一天
	//
	// var endDate = new Date(firstDate);
	// endDate.setMonth(firstDate.getMonth() + 1);
	// endDate.setDate(0);// 最后一天

	firstDate.setDate(1); // 第一天
	var date = new Date();// 获取当前日期

	mini.get("sssqQ").setValue(mini.formatDate(firstDate, "yyyy-MM-dd"));
	mini.get("sssqZ").setValue(mini.formatDate(date, "yyyy-MM-dd"));

}

/**
 * 查询缴款凭证信息
 */
function pzCxClick() {

	var sssqQ = mini.formatDate(mini.get("sssqQ").getValue(), "yyyyMMdd");
	var sssqZ = mini.formatDate(mini.get("sssqZ").getValue(), "yyyyMMdd");
	var jksjQ = mini.formatDate(mini.get("jksjQ").getValue(), "yyyyMMdd");
	var jksjZ = mini.formatDate(mini.get("jksjZ").getValue(), "yyyyMMdd");
	var dysjQ = mini.formatDate(mini.get("dysjQ").getValue(), "yyyyMMdd");
	var dysjZ = mini.formatDate(mini.get("dysjZ").getValue(), "yyyyMMdd");
	var jkpzxh = mini.get("jkpzxh").getValue();
	var sphm = mini.get("sphm").getValue();

	if (sssqQ == null || sssqQ == "") {
		mini.alert("请输入您要查询的缴款记录所属期起");
		return;
	}

	if (sssqZ == null || sssqZ == "") {
		mini.alert("请输入您要查询的缴款记录所属期止");
		return;
	}

	var data = {
		"sssqQ" : sssqQ,
		"sssqZ" : sssqZ,
		"jksjQ" : jksjQ,
		"jksjZ" : jksjZ,
		"dysjQ" : dysjQ,
		"dysjZ" : dysjZ,
		"sssqQ" : sssqQ,
		"jkpzxh" : jkpzxh,
		"sphm" : sphm
	};

	// 执行查询
	mini.get("pzYdyGrid").load(data, function() {
		successLoad()
	}, function() {
		failLoad()
	});
}

/** 成功调用的回调函数 */
function successLoad() {

}

/** 调用失败的回调函数 */
function failLoad() {
	mini.alert("查询税票信息失败！");
}

/**
 * 所属期起校验
 */
function onDrawDateSssqQ(e) {

	var date = e.date;
	var o2 = mini.get("sssqZ").getValue();
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
	// 起始日期大于截止日期的禁选
	if (o2 != "" && o2 < date.getTime()) {
		e.allowSelect = false;
	}
}

/**
 * 所属期止校验
 */
function onDrawDateSssqZ(e) {
	var date = e.date;
	var o1 = mini.get("sssqQ").getValue();

	if (date.getTime() < o1) { // 小于起始日期的禁选
		e.allowSelect = false;
	}
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
}

/**
 * 缴款时间起校验
 */
function onDrawDateJksjQ(e) {
	var date = e.date;
	var o2 = mini.get("jksjZ").getValue();
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
	// 起始日期大于截止日期的禁选
	if (o2 != "" && o2 < date.getTime()) {
		e.allowSelect = false;
	}
}

/**
 * 缴款时间止校验
 */
function onDrawDateJksjZ(e) {
	var date = e.date;
	var o1 = mini.get("jksjQ").getValue();

	if (date.getTime() < o1) { // 小于起始日期的禁选
		e.allowSelect = false;
	}
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
}

/**
 * 打印时间起
 */
function onDrawDateDysjQ(e) {
	var date = e.date;
	var o2 = mini.get("dysjZ").getValue();
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
	// 起始日期大于截止日期的禁选
	if (o2 != "" && o2 < date.getTime()) {
		e.allowSelect = false;
	}
}

/**
 * 打印时间止
 */
function onDrawDateDysjZ(e) {
	var date = e.date;
	var o1 = mini.get("dysjQ").getValue();

	if (date.getTime() < o1) { // 小于起始日期的禁选
		e.allowSelect = false;
	}
	if (date.getTime() > new Date()) { // 大于当前日期的禁选
		e.allowSelect = false;
	}
}

function sssqRendererQ(e) {
	var grid = e.sender;
	var record = e.record;
	var sssqQ = record.sssqQ;
	return getSssq(sssqQ);
}

function sssqRendererZ(e) {
	var grid = e.sender;
	var record = e.record;
	var sssqZ = record.sssqZ;
	return getSssq(sssqZ);
}

function getSssq(ssq) {
	return ssq.substring(0, 4) + "年" + ssq.substring(4, 6) + "月"
			+ ssq.substring(6, 8) + "日";

}

function dycsRenderer(e) {
	var grid = e.sender;
	var record = e.record;
	var djcdy = record.djcdy;
	return "第 <font color='red'>" + djcdy + "</font> 次";
}

function jkpzxhRenderer(e) {
	var grid = e.sender;
	var record = e.record;
	var jkpzxh = record.jkpzxh;
	return '<a onclick=queryJkpzxh("' + jkpzxh + '")>' + jkpzxh + '</a>';

}

/**
 * 根据缴款凭证序号查询，弹出页面
 * 
 * @param jkpzxh
 */
function queryJkpzxh(jkpzxh) {
	mini.open({
		url : "pz_ydy.html",
		allowResize : false,
		title : "打印记录",
		width : 830,
		height : 580,
		onload : function() {
			var iframe = this.getIFrameEl();
			var data = {
				jkpzxh : jkpzxh
			};
			iframe.contentWindow.setData(data);

		},
		ondestroy : function() {

			var iframe = this.getIFrameEl();
			// var data = iframe.contentWindow.GetData();
			// data = mini.clone(data);
			// mini.alert(data);
		}
	});
}
