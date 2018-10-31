/**
 * Created by lizm on 2017/4/21.
 */

var riskCenter = {};

/**
 * 查询反馈信息
 * @param params
 */
riskCenter.doSearch = function (params) {
    getRiskInfo(mini.encode(params)).then(function (data) {

        if (data.success) {
            data = data.value;
            riskCenter.grid.setData(data);
            riskCenter.fxxxData = data;
        } else {
            riskCenter.grid.setData('');
        }
    });
};

/**
 * 风险信息名称
 * @param e
 */
riskCenter.onFxmcRenderer = function (e) {
    var record = e.record;
    var str = e.cellHtml;
    var len = record.zbxx.length;
    if (len > 0) {
        var yxys = [], yxysxz = [];
        for (var i = 0; i < len; i++) {
            yxys.push(record.zbxx[i].zbmc);
            yxysxz.push(record.zbxx[i].zbz);
        }
        yxys = yxys.join('、');
        yxysxz = yxysxz.join('、');

        var cellTip = '分析期间： ' + record.fxqjQ + ' 至 ' + record.fxqjZ + '<br/><br/>' +
            '影响因素： ' + yxys + '<br/><br/>' +
            '影响因素现状： ' + yxysxz;
        str = '<a href="javascript:void(0)" class="txt-blue" data-placement="top" data-tooltip="' + cellTip + '">' + e.cellHtml + '</a>';
    }
    return str;
};

/**
 * 反馈操作
 * @param e
 * @returns {string}
 */
riskCenter.onZtRenderer = function (e) {
    var record = e.record;
    var str = '';
    var zcfkqxTime = new Date(record.zcfkqx.replace(/-/g, '/')).getTime() + 24 * 3600 * 1000; // 加 1 天
    var curDateTime = new Date().getTime();
    if (record.zt === '02') {
        str = '<span>已反馈</span>';
    } else if (record.zt === '01') {
        str = '<a href=javascript:riskCenter.openFkWin(' + e.rowIndex + ') class="a-tips">反馈</a>';
        if (curDateTime > zcfkqxTime) {
            str = '<span>超过反馈期限</span>';
        }
    }
    return str;
};

/**
 * 打开反馈窗口
 * @param data
 */
riskCenter.openFkWin = function (index) {
    var data = riskCenter.fxxxData[index];
    mini.open({
        url: 'fxfk.html',
        title: "风险反馈",
        width: 700,
        height: 555,
        allowResize: false,       //允许尺寸调节
        showMaxButton: false,     //显示最大化按钮
        onload: function () {//弹出页面加载完成
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化
            iframe.contentWindow.fxfk.setData(data);
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action === 'ok') {
                //getWfkfxNum();// 刷新条数
                window.location.reload(true);

            }
        }
    })
};


$(function () {
    mini.parse();
    // 初始化 mini-tips
    var tip = new mini.ToolTip();
    tip.set({
        target: document,
        selector: '[data-tooltip], [title]'
    });
    riskCenter.grid = mini.get('risk-grid');
    riskCenter.searchForm = new mini.Form('#rick-search');
    // 初始化 ajax 配置
    $.ajaxSetup({
        contentType: 'application/json;charset=utf-8'
    });
    $('#search-risk-btn').on('click', function () {
        riskCenter.doSearch(riskCenter.searchForm.getData(true));
    });
    // 初始化就执行一次查询,参数为空
    riskCenter.doSearch(riskCenter.searchForm.getData(true));
    $('#risk-grid').removeAttr('tabindex'); // 防止出现滚动条时跳动
});






