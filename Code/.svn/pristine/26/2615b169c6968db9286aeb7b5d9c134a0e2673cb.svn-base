/**
 * 税票信息查询js
 */
$(function() {
	init();
});

var yhzh;

/** 初始化 */
function init() {
	initJkqz();
}

/** 初始化缴款起止 */
function initJkqz() {

	var firstDate = new Date();
	firstDate.setDate(1); // 第一天
	// 2. 缴款凭证打印页面，默认进去时，缴款日期起为当前月份第一天，缴款日期止为当日
	// firstDate.setMonth(firstDate.getMonth() - 1);
	// firstDate.setDate(1); // 第一天
	// var endDate = new Date(firstDate);
	// endDate.setMonth(firstDate.getMonth() + 1);
	// endDate.setDate(0);// 最后一天
	var date = new Date();// 获取当前日期

	mini.get("jksjQ").setValue(mini.formatDate(firstDate, "yyyy-MM-dd"));
	mini.get("jksjZ").setValue(mini.formatDate(date, "yyyy-MM-dd"));
	spxxCxClick();
}

/**
 * 税票信息查询
 */
function spxxCxClick() {

	var jksjQ = mini.formatDate(mini.get("jksjQ").getValue(), "yyyy-MM-dd");
	var jksjZ = mini.formatDate(mini.get("jksjZ").getValue(), "yyyy-MM-dd");
	var dyqk = mini.get("dyqk").getValue();

	if (jksjQ == null || jksjQ == "") {
		mini.alert("请输入您要查询的税票信息的缴款期起");
		return;
	}

	if (jksjZ == null || jksjZ == "") {
		mini.alert("请输入您要查询的税票信息的缴款期止");
		return;
	}

	var data = {
		"jksjQ" : jksjQ,
		"jksjZ" : jksjZ,
		"dyqk" : dyqk
	};

	// 执行查询
	mini.get("spxxGrid").load(data, function() {
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
 * 缴款期起校验
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
 * 缴款期止校验
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
	var dycs = record.dycs;
	return " <font color='red'>" + dycs + "</font> ";
}

/**
 * 打印预览
 * 
 * @param e
 */
function dyyl(e) {
	var grid = mini.get("spxxGrid");
	var gridArray = grid.getData();
	var spxxArray = grid.getSelecteds();

	var length = spxxArray.length;

	if (length == 0) {
		mini.alert("您还没有选择想要预览的税票信息");
		return;
	}
	
	for (var i = 0; i < length; i++){
		var dySphm = spxxArray[i].sphm;
		var gridNum = this.sameSphmNum(gridArray,dySphm);
		var spxxNum = this.sameSphmNum(spxxArray,dySphm);
		if(gridNum!=spxxNum){
			mini.alert("税票["+dySphm+"]有"+gridNum+"条数据，但您只选择了["+spxxNum+"]条，不能打印");
			return;
		}
	}
	
	for (var i = 0; i < length; i++){
		if (spxxArray[0].yhzh != spxxArray[i].yhzh){
			mini.alert("不相同的银行账号支付缴款凭证不能一起打印！");
			return;
		}
	}

	if (length > 5) {
		mini.alert("每次所打印的缴款税票应小于5条");
	}

	mini.open({
		url : "pz_wdy.aspx",
		allowResize : false,
		title : "打印预览",
		width : 830,
		height : 580,
		onload : function() {
			var iframe = this.getIFrameEl();
			var data = {
				spxxArray : spxxArray
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

/**
 * 获取列表中相同税票数量
 * @param array
 * @param sphm
 * @returns {Number}
 */
function sameSphmNum(array,sphm){
	var sum=0;
	for (var i = 0; i < array.length; i++){
		if(sphm==array[i].sphm){
			sum++;
		}
	}
	return sum;
}
