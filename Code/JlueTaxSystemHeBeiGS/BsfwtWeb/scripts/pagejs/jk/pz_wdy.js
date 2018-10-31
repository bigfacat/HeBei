/**
 * 展示未打印的税票
 */
$(function() {

});

var nsrData = getNsrxxVO();

/** 存储要打印的税票信息号码 */
var sphms = new Array();

/**
 * 打印缴款凭证操作
 */
function printPage() {
	sphms = sphms.toString();
	$.ajax({
		url : '/jk/wyjsAction_printJkpz.do',
		data : {
			sphms : sphms.toString()
		},
		type : 'post',
		dataType : 'json',
		success : function(obj) {
			var data = mini.decode(obj);
			if (data.jkpzxh != null) {
				$("#jkpzxh").html("O：" + data.jkpzxh);
				$("#fwm").html(data.fwm);
				$("#dyrq").html(mini.formatDate(new Date(), "yyyy年MM月dd日"));
				if (data.data != null) {
					var yhzh = data.data[0].yhzh;
				}
				$('#printForm').printThis();//print();
			} else {
				mini.alert("打印税票信息出错！");
			}
		},
		error : function(e) {
			console.error(e);
		}
	});
}

function print() {
	LODOP = getLodop();
	LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", document
			.getElementById("printForm").innerHTML);
	LODOP.PREVIEW();
};

/** 组合Spxx的Html语句 */
function createSpxxHtml(spxxArray) {

	$("#nsrsbh").html(nsrData.nsrsbh);
	$("#nsrSwjg").html(nsrData.swjgMc);
	$("#nsrmc").html(nsrData.nsrmc);
	$("#yhzh").html(spxxArray[0].yhzh);

	// 税票信息提示头部
	var spxxTitleTrHtml = '<tr>' + '<th width="20%" height="24">系统税票号</th>'
			+ '<th width="15%">税(费)种</th>' + '<th width="15%">税(品)目</th>'
			+ '<th width="15%">所属时期(年/月/日)</th>' + '<th width="10%">实缴金额</th>'
			+ '<th width="15%">缴款日期</th>' + '<th width="10%">备注</th></tr>';

	var length = spxxArray.length;
	// 税票信息主体部分
	var spxxTrsHtml = "";
	var hjje = new Number();
	for ( var i = 0; i < length; i++) {
		spxxTrsHtml += '<tr><td height="24">' + spxxArray[i].sphm + '</td><td>'
				+ spxxArray[i].sz + '</td><td>' + spxxArray[i].sm + '</td><td>'
				+ getSssq(spxxArray[i].sssqQ, spxxArray[i].sssqZ) + '</td><td>'
				+ spxxArray[i].sjje + '</td><td>' + spxxArray[i].jkrq
				+ '</td><td>' + spxxArray[i].dycs + '</td></tr>';

		sphms.push(spxxArray[i].sphm);
		hjje += new Number(spxxArray[i].sjje);
	}

	// 合计金额两位小数点
	hjje = hjje.toFixed(2);

	// 大写汉字总金额
	var hjjeDxHz = digit_uppercase(hjje);

	// 税票信息空行
	var spxxBlank = "";

	for ( var i = 0; i < 6 - length; i++) {
		spxxBlank += '<tr><td height="24">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
	}

	// 税票信息尾部合计
	var spxxTailTrHtml = '<tr><td colspan="4">大写（合计）金额：' + hjjeDxHz
			+ '</td><td colspan="3">' + hjje + '</td></tr>';

	var spanList = $("#spxxs");

	spanList.html(spxxTitleTrHtml + spxxTrsHtml + spxxBlank + spxxTailTrHtml);
}

/** 获取所属时期 */
function getSssq(sssqQ, sssqZ) {
	var sssq = sssqQ.substring(2, 4) + '/' + sssqQ.substring(4, 6) + '/'
			+ sssqQ.substring(6, 8) + '~' + sssqZ.substring(2, 4) + '/'
			+ sssqZ.substring(4, 6) + '/' + sssqZ.substring(6, 8);
	return sssq;
}

/**
 * 获取父页面的传递数据
 * 
 * @param data
 * @return
 */
function setData(data) {

	var spxxArray = mini.clone(data.spxxArray);

	createSpxxHtml(spxxArray);// 组合Spxx的Html语句

}

/**
 * 关闭窗口
 * 
 * @param e
 * @return
 */
function onCancel() {
	CloseWindow("cancel");
}
/**
 * 关闭窗口
 * 
 * @param action
 * @return
 */

function CloseWindow(action) {
	if (window.CloseOwnerWindow)
		return window.CloseOwnerWindow(action);
	else
		window.close();
}

/** 数字金额简繁转换(可以处理整数,小数,负数) */
function digit_uppercase(n) {
	var fraction = [ '角', '分' ];
	var digit = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
	var unit = [ [ '元', '万', '亿' ], [ '', '拾', '佰', '仟' ] ];
	var head = n < 0 ? '欠' : '';
	n = Math.abs(n);

	var s = '';

	for ( var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i])
				.replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);

	for ( var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for ( var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head
			+ s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/,
					'零元整');
}