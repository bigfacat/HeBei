var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlArray = ['29835', '29836', '29806', '29826'];
var nsrsbh, nsrmc, djxh;
var sssqq, sssqz, tbrq;
var SBZLCODE = "";
var sbzlNode;
$(function () {
    mini.parse();
    $.ajax({
        url: "../../data/cwbb/sb_cwbb_xqykjzz.ashx",
        async: false,
        success: function (data) {
            var resultData = mini.decode(data);
            mini.get("xjllbGrid").setData(resultData.xjllData);
            mini.get("lrbGrid").setData(resultData.lrData);
            mini.get("zcfzbGrid").setData(resultData.zcfzData);
        }
    })
    init();
})

function init() {
    // 获取核定信息，判断核定信息是否存在
    var hdxxData = getHdxx();
    sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
    //全局变量
    nsrsbh = nsrData.nsrsbh;
    nsrmc = nsrData.nsrmc;
    djxh = nsrData.djxh;
    SBZLCODE = sbzlNode.SBZLCODE;
    initPage();
}

function initPage() {
    var sssqArray = getSssq(getSbny(), SBZLCODE);
    var reg = new RegExp("-", "g");
    sssqq = sssqArray[0].replace(reg, "");
    sssqz = sssqArray[1].replace(reg, "");
    var d = new Date();
    tbrq = mini.formatDate(d, "yyyyMMdd");
    $(".sssqq").text(sssqq);
    $(".sssqz").text(sssqz);
    $(".nsrsbh").text(nsrsbh);
    $(".nsrmc").text(nsrmc);
    setDisable();
}
/***lizm 报表单元格设置只读 2016-7-14***/
function setDisable() {
    var gridTables = $(".mini-tabs-body");
    //现金流量表所有TR
    var xjllbTrs = $(gridTables[0]).find(".mini-grid-body .mini-grid-table .mini-grid-row");
    //利润表所有TR
    var lrbTrs = $(gridTables[1]).find(".mini-grid-body .mini-grid-table .mini-grid-row");
    //资产负债表所有TR
    var zcfzbTrs = $(gridTables[2]).find(".mini-grid-body .mini-grid-table .mini-grid-row");

    //设置现金流量表只读单元格
    var trIndex = [0, 7, 8, 14, 15, 21, 22, 24];
    $(trIndex).each(function (i, v) {
        $(xjllbTrs).eq(v).find(".mini-grid-cell:gt(1)").css({ "background": "#f5f3f3", "color": "#aaa" });
    })
    //设置利润表只读单元格
    /*var trIndex=[20,29,31];
	$(trIndex).each(function (i,v) {
		//$(lrbTrs).eq(v).find(".mini-grid-cell:gt(1)").addClass("uninputBox");
		$(lrbTrs).eq(v).find(".mini-grid-cell:gt(1)").css({"background":"#f5f3f3","color":"#aaa"});
	})*/
    //设置资产负债表只读单元格

    var arr1 = [0, 15, 16, 21, 30, 31];
    var arr2 = [0, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31];
    $(arr1).each(function (i, v) {
        $(zcfzbTrs).eq(v).find(".mini-grid-cell:lt(4):gt(1)").css({ "background": "#f5f3f3", "color": "#aaa" });
    })
    $(arr2).each(function (i, v) {
        $(zcfzbTrs).eq(v).find(".mini-grid-cell:gt(5)").css({ "background": "#f5f3f3", "color": "#aaa" });
    })


}
/***********over**************/

function OnCellBeginEdit(e) {
    var field = e.field;
    var rowIndex = e.rowIndex;
    if ((field == "xjllHc" || field == "xjllBnljje" || field == "xjllByje")
			&& (rowIndex == '0' || rowIndex == '8' || rowIndex == '15'
					|| rowIndex == '7' || rowIndex == '14' || rowIndex == '21'
					|| rowIndex == '22' || rowIndex == '24')) {
        e.cancel = true; // 不允许编辑此单元格
    }
    if (rowIndex == '0'
			|| rowIndex == '30'
			|| rowIndex == '31'
			|| ((field == "zcfzHc2" || field == "zcfzQmye2" || field == "zcfzNcye2") && (rowIndex == "12"
					|| rowIndex == '11' || rowIndex == '17' || rowIndex == '18' || rowIndex == '25'))) {
        e.cancel = true; // 不允许编辑此单元格
    }
    for (var i = 19; i < 25; i++) {
        if (rowIndex == (i + '')
				&& (field == "zcfzHc2" || field == "zcfzQmye2" || field == "zcfzNcye2")) {
            e.cancel = true; // 不允许编辑此单元格
        }
    }
    if ((field == "zcfzHc" || field == "zcfzQmye" || field == "zcfzNcye")
			&& (rowIndex == '16' || rowIndex == '15' || rowIndex == '21')) {
        e.cancel = true; // 不允许编辑此单元格
    }
    if (field == "zcfzHc2") {
        e.cancel = true;
    }
}

var tab1key = false;
var tab2key = false;
var tab3key = false;

function activechanged() {
    var tabs = mini.get("tab2");
    var index = tabs.activeIndex;
    if (index == "0") {
        tab1key = true;
    }
    if (index == "1") {
        tab2key = true;
    }
    if (index == "2") {
        tab3key = true;
    }
}

/**
 * 自动计算现金流量表： 第07栏 经营活动产生的现金流量净额=1+2-3-4-5-6； 第13栏 投资活动产生的现金流量净额=8+9+10-11-12；
 * 第19栏 筹资活动产生的现金流量净额=14+15-16-17-18； 第20栏 现金净增加额=7+13+19； 第22栏 期末现金余额=20+21
 * 其他栏次，手工录入
 */
function countXjllb(e) {
    var xjllbGrid = mini.get("xjllbGrid");
    var xjllbData = xjllbGrid.getData();

    var rowIndex = e.rowIndex;
    var field = e.field;
    if (field == "xjllByje") {
        xjllbData[rowIndex].xjllBnljje = Number(xjllbData[rowIndex].xjllByje);
    }
    // 经营活动产生的现金流量净额
    var bnjyhdcsje = 0.00;
    var byjyhdcsje = 0.00;
    for (var i = 1; i < 7; i++) {
        if (i < 3) {
            bnjyhdcsje = round2(bnjyhdcsje + round2(xjllbData[i].xjllBnljje));
            byjyhdcsje = round2(byjyhdcsje + round2(xjllbData[i].xjllByje));
        } else {
            bnjyhdcsje = round2(bnjyhdcsje - round2(xjllbData[i].xjllBnljje));
            byjyhdcsje = round2(byjyhdcsje - round2(xjllbData[i].xjllByje));
        }
    }
    xjllbData[7].xjllBnljje = bnjyhdcsje;
    xjllbData[7].xjllByje = byjyhdcsje;

    // 投资活动产生的现金流量净额
    var bntzhdcsje = 0.00;
    var bytzhdcsje = 0.00;
    for (var i = 9; i < 14; i++) {
        if (i < 12) {
            bntzhdcsje = round2(bntzhdcsje + round2(xjllbData[i].xjllBnljje));
            bytzhdcsje = round2(bytzhdcsje + round2(xjllbData[i].xjllByje));
        } else {
            bntzhdcsje = round2(bntzhdcsje - round2(xjllbData[i].xjllBnljje));
            bytzhdcsje = round2(bytzhdcsje - round2(xjllbData[i].xjllByje));
        }
    }
    xjllbData[14].xjllBnljje = bntzhdcsje;
    xjllbData[14].xjllByje = bytzhdcsje;

    // 筹资活动产生的现金流量净额
    var bncjhdcsje = 0.00;
    var bycjhdcsje = 0.00;
    for (var i = 16; i < 21; i++) {
        if (i < 18) {
            bncjhdcsje = round2(bncjhdcsje + round2(xjllbData[i].xjllBnljje));
            bycjhdcsje = round2(bycjhdcsje + round2(xjllbData[i].xjllByje));
        } else {
            bncjhdcsje = round2(bncjhdcsje - round2(xjllbData[i].xjllBnljje));
            bycjhdcsje = round2(bycjhdcsje - round2(xjllbData[i].xjllByje));
        }
    }
    xjllbData[21].xjllBnljje = bncjhdcsje;
    xjllbData[21].xjllByje = bycjhdcsje;

    // 现金净增加额
    xjllbData[22].xjllBnljje = round2(round2((xjllbData[7].xjllBnljje))
			+ round2((xjllbData[14].xjllBnljje))
			+ round2((xjllbData[21].xjllBnljje)));
    xjllbData[22].xjllByje = round2(round2((xjllbData[7].xjllByje))
			+ round2((xjllbData[14].xjllByje))
			+ round2((xjllbData[21].xjllByje)));

    // 期末现金余额
    xjllbData[24].xjllBnljje = round2(round2((xjllbData[22].xjllBnljje))
			+ round2((xjllbData[23].xjllBnljje)));
    xjllbData[24].xjllByje = round2(round2((xjllbData[22].xjllByje))
			+ round2((xjllbData[23].xjllByje)));

    var row7 = xjllbGrid.indexOf(7);
    var row14 = xjllbGrid.indexOf(14);
    var row21 = xjllbGrid.indexOf(21);
    var row22 = xjllbGrid.indexOf(22);
    var row24 = xjllbGrid.indexOf(24);

    xjllbGrid.updateRow(rowIndex, xjllbData[rowIndex]);
    xjllbGrid.updateRow(row7, xjllbData[7]);
    xjllbGrid.updateRow(row14, xjllbData[14]);
    xjllbGrid.updateRow(row21, xjllbData[21]);
    xjllbGrid.updateRow(row22, xjllbData[22]);
    xjllbGrid.updateRow(row24, xjllbData[24]);

    setDisable();
}

/**
 * 自动计算利润表： 21栏 营业利润=1-2-3-11-14-18+20； 30栏 利润总和=21+22-24； 32栏 净利润=30-31
 * 其他栏次，手工录入
 */
function countLrb(e) {
    var llbGrid = mini.get("lrbGrid");
    var llbData = llbGrid.getData();

    var rowIndex = e.rowIndex;
    var field = e.field;
    if (field == "lrByje") {
        llbData[rowIndex].lrBnljje = Number(llbData[rowIndex].lrByje);
    }
    // 营业利润
    var bnlylr = 0.00;
    var bylylr = 0.00;
    bnlylr = round2(round2((llbData[0].lrBnljje))
			- round2((llbData[1].lrBnljje)) - round2((llbData[2].lrBnljje))
			- round2((llbData[10].lrBnljje)) - round2((llbData[13].lrBnljje))
			- round2((llbData[17].lrBnljje)) + round2((llbData[19].lrBnljje)));
    bylylr = round2(round2((llbData[0].lrByje)) - round2((llbData[1].lrByje))
			- round2((llbData[2].lrByje)) - round2((llbData[10].lrByje))
			- round2((llbData[13].lrByje)) - round2((llbData[17].lrByje))
			+ round2((llbData[19].lrByje)));
    llbData[20].lrBnljje = bnlylr;
    llbData[20].lrByje = bylylr;

    // 利润总和
    var bnlrzh = 0.00;
    var bylrzh = 0.00;
    bnlrzh = round2(round2((llbData[20].lrBnljje))
			+ round2((llbData[21].lrBnljje)) - round2((llbData[23].lrBnljje)));
    bylrzh = round2(round2((llbData[20].lrByje)) + round2((llbData[21].lrByje))
			- round2((llbData[23].lrByje)));
    llbData[29].lrBnljje = bnlrzh;
    llbData[29].lrByje = bylrzh;

    // 净利润
    var bnjlr = 0.00;
    var byjlr = 0.00;
    bnjlr = round2(round2((llbData[29].lrBnljje))
			- round2((llbData[30].lrBnljje)));
    byjlr = round2(round2((llbData[29].lrByje)) - round2((llbData[30].lrByje)));
    llbData[31].lrBnljje = bnjlr;
    llbData[31].lrByje = byjlr;

    var row20 = llbGrid.indexOf(20);
    var row29 = llbGrid.indexOf(29);
    var row31 = llbGrid.indexOf(31);

    llbGrid.updateRow(rowIndex, llbData[rowIndex]);
    llbGrid.updateRow(row20, llbData[20]);
    llbGrid.updateRow(row29, llbData[29]);
    llbGrid.updateRow(row31, llbData[31]);
}

/**
 * 自动计算资产负债表 15栏 流动资产合计=1+2+3+4+5+6+7+8+9+14； 其中第9栏需>=10+11+12+13； 20栏
 * 固定资产账面价值=18-19； 29栏 非流动资产合计=16+17+20+21+22+23+24+25+26+27+28； 30栏 资产总计=15+29；
 * 41栏 流动负债合计=31+..+40； 46栏 非流动负债合计=42+43+44+45； 47栏 负债合计=41+46； 52栏
 * 所有者权益合计=48+49+50+51； 53栏 负债和所有者权益（或股东权益）总计=47+52； 其他栏次，手工录入
 */
function countZcfzb(e) {
    var zcfzbGrid = mini.get("zcfzbGrid");
    var zcfzbData = zcfzbGrid.getData();

    // 流动资产合计
    var ldzchjnc = 0.00;
    var ldzchjqm = 0.00;
    for (var i = 1; i < 10; i++) {
        ldzchjnc = round2(ldzchjnc + round2(zcfzbData[i].zcfzNcye));
        ldzchjqm = round2(ldzchjqm + round2(zcfzbData[i].zcfzQmye));
    }
    ldzchjnc = round2(ldzchjnc + round2(zcfzbData[14].zcfzNcye));
    ldzchjqm = round2(ldzchjqm + round2(zcfzbData[14].zcfzQmye));
    zcfzbData[15].zcfzNcye = ldzchjnc;
    zcfzbData[15].zcfzQmye = ldzchjqm;

    // 固定资产账面价值
    zcfzbData[21].zcfzNcye = round2(round2((zcfzbData[19].zcfzNcye))
			- round2((zcfzbData[20].zcfzNcye)));
    zcfzbData[21].zcfzQmye = round2(round2((zcfzbData[19].zcfzQmye))
			- round2((zcfzbData[20].zcfzQmye)));

    // 非流动资产合计
    var fldzchjnc = 0.00;
    var fldzchjqm = 0.00;
    fldzchjnc = round2(round2((zcfzbData[17].zcfzNcye))
			+ round2((zcfzbData[18].zcfzNcye)));
    fldzchjqm = round2(round2((zcfzbData[17].zcfzQmye))
			+ round2((zcfzbData[18].zcfzQmye)));
    for (var i = 21; i < 30; i++) {
        fldzchjnc = round2(fldzchjnc + round2(zcfzbData[i].zcfzNcye));
        fldzchjqm = round2(fldzchjqm + round2(zcfzbData[i].zcfzQmye));
    }
    zcfzbData[30].zcfzNcye = fldzchjnc;
    zcfzbData[30].zcfzQmye = fldzchjqm;

    // 资产总计
    zcfzbData[31].zcfzNcye = round2(round2((zcfzbData[15].zcfzNcye))
			+ round2((zcfzbData[30].zcfzNcye)));
    zcfzbData[31].zcfzQmye = round2(round2((zcfzbData[15].zcfzQmye))
			+ round2((zcfzbData[30].zcfzQmye)));

    // 流动负债合计
    var ldfzhjnc = 0.0;
    var ldfzhjqm = 0.0;
    for (var i = 1; i < 11; i++) {
        ldfzhjnc = round2(ldfzhjnc + round2(zcfzbData[i].zcfzNcye2));
        ldfzhjqm = round2(ldfzhjqm + round2(zcfzbData[i].zcfzQmye2));
    }
    zcfzbData[11].zcfzNcye2 = ldfzhjnc;
    zcfzbData[11].zcfzQmye2 = ldfzhjqm;

    // 非流动负债合计
    var fldzchjnc = 0.0;
    var fldzchjqm = 0.0;
    for (var i = 13; i < 17; i++) {
        fldzchjnc = round2(fldzchjnc + round2(zcfzbData[i].zcfzNcye2));
        fldzchjqm = round2(fldzchjqm + round2(zcfzbData[i].zcfzQmye2));
    }
    zcfzbData[17].zcfzNcye2 = fldzchjnc;
    zcfzbData[17].zcfzQmye2 = fldzchjqm;

    // 负债合计
    zcfzbData[18].zcfzNcye2 = round2(round2((zcfzbData[11].zcfzNcye2))
			+ round2((zcfzbData[17].zcfzNcye2)));
    zcfzbData[18].zcfzQmye2 = round2(round2((zcfzbData[11].zcfzQmye2))
			+ round2((zcfzbData[17].zcfzQmye2)));

    // 所有者权益合计
    var syzqyhjnc = 0.0;
    var syzqyhjqm = 0.0;
    for (var i = 26; i < 30; i++) {
        syzqyhjnc = round2(syzqyhjnc + round2(zcfzbData[i].zcfzNcye2));
        syzqyhjqm = round2(syzqyhjqm + round2(zcfzbData[i].zcfzQmye2));
    }
    zcfzbData[30].zcfzNcye2 = syzqyhjnc;
    zcfzbData[30].zcfzQmye2 = syzqyhjqm;

    // 负债和所有者权益（或股东权益）总计
    zcfzbData[31].zcfzNcye2 = round2(round2((zcfzbData[18].zcfzNcye2))
			+ round2((zcfzbData[30].zcfzNcye2)));
    zcfzbData[31].zcfzQmye2 = round2(round2((zcfzbData[18].zcfzQmye2))
			+ round2((zcfzbData[30].zcfzQmye2)));

    var row11 = zcfzbGrid.indexOf(11);
    var row15 = zcfzbGrid.indexOf(15);
    var row17 = zcfzbGrid.indexOf(17);
    var row18 = zcfzbGrid.indexOf(18);
    var row21 = zcfzbGrid.indexOf(21);
    var row30 = zcfzbGrid.indexOf(30);
    var row31 = zcfzbGrid.indexOf(31);

    zcfzbGrid.updateRow(row11, zcfzbData[11]);
    zcfzbGrid.updateRow(row15, zcfzbData[15]);
    zcfzbGrid.updateRow(row17, zcfzbData[17]);
    zcfzbGrid.updateRow(row18, zcfzbData[18]);
    zcfzbGrid.updateRow(row21, zcfzbData[21]);
    zcfzbGrid.updateRow(row30, zcfzbData[30]);
    zcfzbGrid.updateRow(row31, zcfzbData[31]);

    setDisable();
}

/** 保存财务报表数据 */
function onClick() {
    if (!validata()) {
        return;
    }
    // ===========chenbw===========转换表中数据类型为String,Start==========
    // 1.
    var zcfzbArray = mini.get("zcfzbGrid").getData();
    var zcfzbArrayNew = new Array();
    for (var int = 0; int < zcfzbArray.length; int++) {
        var map = zcfzbArray[int];
        map._index = map._index;
        map._uid = map._uid;
        map.zcfzFzhsyzqy = map.zcfzFzhsyzqy;
        map.zcfzHc = map.zcfzHc + "";
        map.zcfzHc2 = map.zcfzHc2 + "";
        map.zcfzNcye = map.zcfzNcye + "";
        map.zcfzNcye2 = map.zcfzNcye2 + "";
        map.zcfzQmye = map.zcfzQmye + "";
        map.zcfzQmye2 = map.zcfzQmye2 + "";
        map.zcfzZc = map.zcfzZc;
        zcfzbArrayNew[int] = map;
    }
    // 2.
    var lrbArray = mini.get("lrbGrid").getData();
    var lrbArrayNew = new Array();
    for (var int = 0; int < lrbArray.length; int++) {
        var map = lrbArray[int];
        map._index = map._index;
        map._state = map._state;
        map._uid = map._uid;
        map.lrBnljje = map.lrBnljje + "";
        map.lrByje = map.lrByje + "";
        map.lrHc = map.lrHc + "";
        map.lrXm = map.lrXm + "";
        lrbArrayNew[int] = map;
    }
    // 3.
    var xjllbArray = mini.get("xjllbGrid").getData();
    var xjllbArrayNew = new Array();
    for (var int = 0; int < xjllbArray.length; int++) {
        var map = xjllbArray[int];
        map._index = map._index;
        map._uid = map._uid;
        map.xjllXm = map.xjllXm;
        map.xjllBnljje = map.xjllBnljje + "";
        map.xjllByje = map.xjllByje + "";
        map.xjllHc = map.xjllHc + "";
        xjllbArrayNew[int] = map;
    }
    // ===========chenbw=======================END================
    var formdata = {};
    formdata.zcfzb = zcfzbArrayNew;
    formdata.lrb = lrbArrayNew;
    formdata.xjllb = xjllbArrayNew;
    formdata.sssqq = sssqq;
    formdata.sssqz = sssqz;

    var xjllbcontent = buildeXjllb();
    var lrbcontent = buildeLrb();
    var zcfzbcontent = buildeZcfzb();

    var sbwjs = [{
        bbwjm: getBbFilename('001', SBZLCODE),
        bbxml: zcfzbcontent
    },
	{
	    bbwjm: getBbFilename('002', SBZLCODE),
	    bbxml: lrbcontent
	},
	{
	    bbwjm: getBbFilename('003', SBZLCODE),
	    bbxml: xjllbcontent
	}
    ];

    sbtj(sssqq, sssqz, SBZLCODE, sbwjs, formdata, "cwbb", nsrsbh, djxh);

}
function valueToString() {

}
/**
 * 保存前规则校验 利润表： 第3栏>=4+...+10，月季年报都强制校验； 第11栏>=12+13，月季报提示性校验，年报强制校验；
 * 第14栏>=15+16+17，月季报提示性校验，年报强制校验； 第18栏>=19，月季报提示性校验，年报强制校验；
 * 第22栏>=23，月季报提示性校验，年报强制校验； 第24栏>=25+...+29，月季报提示性校验，年报强制校验； 资产负债表： 第9栏
 * 存货>=10+11+12+13；月季报提示性校验，年报强制校验； 30行=53行，月季年报都强制校验；
 */
function validata() {
    // if(!tab1key && !tab2key && !tab3key){
    if (!tab1key || !tab2key || !tab3key) {
        mini.alert("所有表格信息都必须填写完整", '提示信息');
        return false;
    }
    var llbGrid = mini.get("lrbGrid");
    var llbData = llbGrid.getData();
    var zcfzbGrid = mini.get("zcfzbGrid");
    var zcfzbData = zcfzbGrid.getData();
    /** 利润表校验 */
    // 第3栏>=4+...+10，月季年报都强制校验；
    var sumBy4_10 = 0.00;
    var sumBn4_10 = 0.00;
    for (var i = 3; i < 10; i++) {
        sumBy4_10 = round2(sumBy4_10 + round2(llbData[i].lrByje));
        sumBn4_10 = round2(sumBn4_10 + round2(llbData[i].lrBnljje));
    }
    if (sumBy4_10 > Number(llbData[2].lrByje)) {
        mini.alert("利润表第3栏中营业税金及附加本月金额应大于等于第4-10栏之和，请重新填写", '提示信息');
        return false;
    }
    if (sumBn4_10 > Number(llbData[2].lrBnljje)) {
        mini.alert("利润表第3栏中营业税金及附加本年累计金额应大于等于第4-10栏之和，请重新填写", '提示信息');
        return false;
    }

    // 第11栏>=12+13，月季报提示性校验，年报强制校验；
    var sumBy12_13 = round2((llbData[11].lrByje))
			+ round2((llbData[12].lrByje));
    var sumBn12_13 = round2((llbData[11].lrBnljje))
			+ round2((llbData[12].lrBnljje));
    if (sumBy12_13 > Number(llbData[10].lrByje)) {
        mini.alert("利润表第11栏本月金额应大于等于第12+13栏本月金额，请重新填写", '提示信息');
        return false;
    }
    if (sumBn12_13 > Number(llbData[10].lrBnljje)) {
        mini.alert("利润表第11栏本年累计金额应大于等于第12+13栏本年累计金额，请重新填写", '提示信息');
        return false;
    }

    // 第14栏>=15+16+17，月季报提示性校验，年报强制校验；
    var sumBy14_17 = 0.00;
    var sumBn14_17 = 0.00;
    for (var i = 14; i < 17; i++) {
        sumBy14_17 = round2(sumBy14_17 + round2(llbData[i].lrByje));
        sumBn14_17 = round2(sumBn14_17 + round2(llbData[i].lrBnljje));
    }
    if (sumBy14_17 > round2((llbData[13].lrByje))) {
        mini.alert("利润表第14栏本月金额应大于等于第15+16+17栏本月金额，请重新填写", '提示信息');
        return false;
    }
    if (sumBn14_17 > round2((llbData[13].lrBnljje))) {
        mini.alert("利润表第14栏本年累计金额应大于等于第15+16+17栏本年累计金额，请重新填写", '提示信息');
        return false;
    }

    // 第18栏>=19，月季报提示性校验，年报强制校验；
    if (Number(llbData[17].lrByje) < llbData[18].lrByje) {
        mini.alert("利润表第18栏本月金额应大于等于第19栏本月金额，请重新填写", '提示信息');
        return false;
    }
    if (Number(llbData[17].lrBnljje) < llbData[18].lrBnljje) {
        mini.alert("利润表第18栏本年累计金额应大于等于第19栏本年累计金额，请重新填写", '提示信息');
        return false;
    }

    // 第22栏>=23，月季报提示性校验，年报强制校验；
    if (Number(llbData[21].lrByje) < llbData[22].lrByje) {
        mini.alert("利润表第22栏本月金额应大于等于第23栏本月金额，请重新填写", '提示信息');
        return false;
    }
    if (Number(llbData[21].lrBnljje) < llbData[22].lrBnljje) {
        mini.alert("利润表第22栏本年累计金额应大于等于第23栏本年累计金额，请重新填写", '提示信息');
        return false;
    }
    // 第24栏>=25+...+29，月季报提示性校验，年报强制校验；
    var sumBy25_29 = 0.00;
    var sumBn25_29 = 0.00;
    for (var i = 24; i < 29; i++) {
        sumBy25_29 = round2(sumBy25_29 + round2(llbData[i].lrByje));
        sumBn25_29 = round2(sumBn25_29 + round2(llbData[i].lrBnljje));
    }
    if (Number(llbData[23].lrByje) < sumBy25_29) {
        mini.alert("利润表第24栏本月金额应大于等于第25-29栏本月金额之和，请重新填写", '提示信息');
        return false;
    }
    if (Number(llbData[23].lrBnljje) < sumBn25_29) {
        mini.alert("利润表第24栏本年累计金额应大于等于第25-29栏本年累计金额之和，请重新填写", '提示信息');
        return false;
    }
    /*
	 *//** 资产负债表检验 */
    // 第9栏 存货>=10+11+12+13；月季报提示性校验，年报强制校验；
    var sumNc10_13 = 0.00;
    var sumQm10_13 = 0.00;
    for (var i = 10; i < 14; i++) {
        sumNc10_13 = round2(sumNc10_13 + round2(zcfzbData[i].zcfzNcye));
        sumQm10_13 = round2(sumQm10_13 + round2(zcfzbData[i].zcfzQmye));
    }
    if (Number(zcfzbData[9].zcfzQmye) < sumQm10_13) {
        mini.alert("资产负债表第9栏期末余额应大于等于第10+11+12+13栏期末余额，请重新填写", '提示信息');
        return false;
    }
    if (Number(zcfzbData[9].zcfzNcye) < sumNc10_13) {
        mini.alert("资产负债表第9栏年初余额应大于等于第10+11+12+13栏年初余额，请重新填写", '提示信息');
        return false;
    }
    // 30行=53行，月季年报都强制校验；
    if (Number(zcfzbData[31].zcfzQmye) != Number(zcfzbData[31].zcfzQmye2)) {
        mini.alert("资产负债表第30栏中资产总计期末余额【" + zcfzbData[31].zcfzQmye + "】应等于第53栏负债和所有者权益（或股东权益）总计期末余额【" + zcfzbData[31].zcfzQmye2 + "】, 请重新填写", '提示信息');
        return false;
    }
    if (Number(zcfzbData[31].zcfzNcye) != Number(zcfzbData[31].zcfzNcye2)) {
        mini.alert("资产负债表第30栏中资产总计年初余额【" + zcfzbData[31].zcfzNcye + "】应等于第53栏负债和所有者权益（或股东权益）总计年初余额【" + zcfzbData[31].zcfzNcye2 + "】, 请重新填写", '提示信息');
        return false;
    }

    return true;
}


/** build-现金流量表-总 */
function buildeXjllb() {
    var xjlrbData = mini.get("xjllbGrid").getData();
    var xjlrbXml = '<syxqyxjllb>' + '<nsrxxForm3>' + getNsrxxXml()
			+ '</nsrxxForm3>' + '<xqyxjllbGrid>' + getXjllbJexx(xjlrbData)
			+ '</xqyxjllbGrid>' + '</syxqyxjllb>';
    return xjlrbXml;

}

/** build-现金流量表-金额信息 */
function getXjllbJexx(xjlrbData) {
    var xjllbJexxXml = "";

    for (var i = 0; i < xjlrbData.length; i++) {
        if (xjlrbData[i].xjllHc != null && xjlrbData[i].xjllHc != "") {
            xjllbJexxXml += '<xqyxjllbGridlb>' + '<ewbhxh>'
					+ xjlrbData[i].xjllHc.trim() + '</ewbhxh>' + '<hmc>'
					+ xjlrbData[i].xjllXm.trim() + '</hmc>' + '<bnljje>'
					+ xjlrbData[i].xjllBnljje + '</bnljje>' + '<byje>'
					+ xjlrbData[i].xjllByje + '</byje>' + '</xqyxjllbGridlb>';

        }
    }
    return xjllbJexxXml;
}

/** 利润表-build-金额信息 */
function buildeLrbJexx(lrbData) {
    var lrbjexx = "";
    for (var i = 0; i < lrbData.length; i++) {
        if (lrbData[i].lrHc != null && lrbData[i].lrHc != "")
            lrbjexx += '<syxqylrbGridlb>' + '<ewbhxh>' + lrbData[i].lrHc.trim()
					+ '</ewbhxh>' + '<hmc>' + lrbData[i].lrXm.trim() + '</hmc>'
					+ '<bnljje>' + lrbData[i].lrBnljje + '</bnljje>' + '<byje>'
					+ lrbData[i].lrByje + '</byje>' + '</syxqylrbGridlb>';
    }
    return lrbjexx;
}

/** 利润表-build-总 */
function buildeLrb() {
    var lrbData = mini.get("lrbGrid").getData();
    var lrbXml = '<syxqylrb>' + '<nsrxxForm2>' + getNsrxxXml()
			+ '</nsrxxForm2>' + '<syxqylrbGrid>' + buildeLrbJexx(lrbData)
			+ '</syxqylrbGrid>' + '</syxqylrb>';
    return lrbXml;
}

/** build-纳税人信息 */
function getNsrxxXml() {
    var nsrxxXml = '<nsrsbh>' + nsrData.nsrsbh + '</nsrsbh>' + '<nsrmc>'
			+ nsrData.nsrmc + '</nsrmc>' + '<bsrq>' + tbrq + '</bsrq>'
			+ '<skssqq>' + sssqq + '</skssqq>' + '<skssqz>' + sssqz
			+ '</skssqz>';
    return nsrxxXml;
}

/** 资产负债-build-总 */
function buildeZcfzb() {
    var zcfzbData = mini.get("zcfzbGrid").getData();
    var zcfzbXml = '<syxqyzcfzb>' + '<nsrxxForm1>' + getNsrxxXml()
			+ '</nsrxxForm1>' + '<syxqyzcfzbGrid>' + getZcfzbJexx(zcfzbData)
			+ '</syxqyzcfzbGrid>' + '</syxqyzcfzb>';
    return zcfzbXml;
}

/** 资产负债-build-金额信息 */
function getZcfzbJexx(zcfzbData) {
    var jexxZcXml = '';
    var j = 1;
    for (var i = 1; i < zcfzbData.length; i++) {
        jexxZcXml += '<xqyzcfzbGridlb>' + '<ewbhxh>' + j
					+ '</ewbhxh>' + '<zcxmmc>' + zcfzbData[i].zcfzZc.trim()
					+ '</zcxmmc>' + '<qmyeZc>' + zcfzbData[i].zcfzQmye
					+ '</qmyeZc>' + '<ncyeZc>' + zcfzbData[i].zcfzNcye
					+ '</ncyeZc>' + '<qyxmmc>' + zcfzbData[i].zcfzFzhsyzqy.trim() + '</qyxmmc>'
					+ '<qmyeQy>' + zcfzbData[i].zcfzQmye2 + '</qmyeQy>' + '<ncyeQy>' + zcfzbData[i].zcfzNcye2
					+ '</ncyeQy>' + '</xqyzcfzbGridlb>';

        j++;
    }

    return jexxZcXml;

}

function validate(t) {
    var value = t[0].getValue();
    var te = /^\-?\d*\.?\d*$/;
    if (te.test(value)) {
        t[0].setValue(Number(value).toFixed(2));
    } else {
        t[0].setValue('');
    }

}

function keyPress() {
    var keyCode = event.keyCode;
    event.returnValue = ((keyCode >= 45 && keyCode <= 57 && keyCode != 47));
}

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


// xml的<>\,&字符转义
function toEncodedXml(s_string) {
    if (s_string == null) {
        return "";
    }
    // s_string = s_string.replaceAll("&", "&amp;");
    s_string = s_string.replaceAll("<", "&lt;");
    s_string = s_string.replaceAll(">", "&gt;");
    s_string = s_string.replaceAll("\"", "&quot;");
    // s_string = s_string.replaceAll("'", "&apos;");
    return s_string;
}

function CloseWindow(action) {
    /*
	 * var form = new mini.Form("#xqyForm");
	 * 
	 * if (action == "cancel" && form.isChanged()) { if
	 * (confirm("数据被修改了，是否先保存？")) { return false; } } if
	 * (window.CloseOwnerWindow) return window.CloseOwnerWindow(action); else
	 * window.close();
	 */
    window.close();
}

function onCancel(e) {
    CloseWindow("cancel");
}