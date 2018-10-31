/**
 * Created by dongxuewen on 2017/9/26.
 */
var yhdkcp = {};
stepNav.run = function () {

	stepNav.initSteps([
		{id: 0, title: '银行贷款产品介绍', url: 'yhdkView.aspx'}
	]);

	// miniui初始化
	mini.parse();
	var mock = true; // 切换本地数据，false为使用本地数据，true 为 ajax
	var container = $('#yh-list'); // 银行列表 <ul>
	var yhData = [{
		"yhdm": "gsyh",
		"yhmc": "中国工商银行",
		"dkcpmc": "税务贷",
		"dkcpjj": "最高授信700万，分期还款",
		"nllv": "年利率：5.4567%",
		"zgsxed": "700万",
		"ljxq": "http://www.baidu.com"
	}, {
		"yhdm": "jsyh",
		"yhmc": "中国建设银行",
		"dkcpmc": "税易贷",
		"dkcpjj": "最高授信900万，分期还款",
		"nllv": "年利率：5.8888%",
		"zgsxed": "900万",
		"ljxq": "http://www.sougou.com"
	}];

	if (!mock) {
		renderYhList(yhData);
	} else {
		$.ajax({
			url: "../../../api/qt/get/queryYhdkcpjsxx.ashx",
			type: "post",
			async: false,
			data: {},
			success: function (data) {
				var result = data;
				if (!result.success || result == null) {
					container.empty().html('暂无推荐产品');
					return false;
				}
				renderYhList(result.value);
			},
			error: function () {
				container.empty().html('暂无推荐产品');
			}
		});
	}
    $('.content').height($('#wizard-p-0').height()+ 40);

    // 渲染页面
	function renderYhList(list) {
		var html = '';
		var targetHtml = container.clone();
		for (var i = 0; i < list.length; i++) {
			$(targetHtml).find('.yhdm').attr('src', '../../images/yshd/' + list[i].yhdm + '.png');
			$(targetHtml).find('.dkcpmc').text(list[i].dkcpmc);
			$(targetHtml).find('.dkcpjj').text(list[i].dkcpjj);
			$(targetHtml).find('.nllv').text(list[i].nllv);
			$(targetHtml).find('.zgsxed').text(list[i].zgsxed);
			$(targetHtml).find('.ljxq').attr('href', list[i].ljxq);

			html += $(targetHtml).html();
		}

		container.html(html);

}
};