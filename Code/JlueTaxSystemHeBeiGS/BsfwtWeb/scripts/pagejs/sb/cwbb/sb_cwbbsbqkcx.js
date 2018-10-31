var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var nsrsbh = nsrData.nsrsbh;
var sbzlDm = "";
var sbzlArray = ['29835', '29836', '29804', '29825', '29803', '29824', '29807', '29827', '29802', '29823', '29806', '29826', '29838', '29839', '29841', '29842'];
var sbzlNode;

$(function () {
    mini.parse();
    // 获取核定信息，判断核定信息是否存在
    var hdxxData = getHdxx();
    if (hdxxData == null) {
        mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function () {
            window.close();
        });
    }
    sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
    if (sbzlNode == null) {
        var sbzls = hdxxData.HdxxResponseVo.SBZL;
        var msg = sbzlMsg(sbzls);
        if (msg == "") {
            mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function () {
                window.close();
            });
        }
        return;
    }
    sbzlDm = sbzlNode.SBZLCODE;
    //	var msg = sbzlMsg(sbzlDm);
    //	if (msg.length > 0){
    //		mini.alert("您申报的是"+ msg + ", 目前网厅仅支持【企业会计制度财务报表】、【小企业会计准则财务报表】、【一般企业财务报表】、【商业银行财务报表】、【保险公司财务报表】、【证券公司财务报表】 、【担保公司财务报表】, 您可以采用河北国税网上办税系统或到税务大厅进行报送", '提示信息', function() {
    //			window.close();
    //		});
    //		return;
    //	}
    setSbnyValue();
    search();
});

function sbzlMsg(sbzlDm) {
    var msg = "";
    if (sbzlDm == 29841 || sbzlDm == 29842) {
        msg = "【事业单位财务报表】";
    }
    return msg;
}

function sb() {
    if (!checkTime(nsrsbh, sbzlDm, '财务报表')) {
        return false;
    }
    //判断增值税是否申报，增值税申报成功才能申报
    if (sbzlDm == "29835" || sbzlDm == "29836") {
        window.location.href = './sb_cwbb_xqykjzz_old.aspx';
        //证券
    } else if (sbzlDm == "29804" || sbzlDm == "29825") {
        window.location.href = './sb_cwbb_zq.html';
    } else if (sbzlDm == "29803" || sbzlDm == "29824") {
        window.location.href = './sb_cwbb_bx.html';
    } else if (sbzlDm == "29807" || sbzlDm == "29827") {
        window.location.href = './sb_cwbb_ybqy.html';
    } else if (sbzlDm == "29802" || sbzlDm == "29823") {
        window.location.href = './sb_cwbb_yh.html';
    } else if (sbzlDm == "29838" || sbzlDm == "29839") {
        window.location.href = './sb_cwbb_db.html';
    } else if (sbzlDm == "29841" || sbzlDm == "29842") {
        window.location.href = './sb_cwbb_sy.html';
    } else {
        window.location.href = './sb_cwbb_xqykjzz_old.aspx';
    }
}

function search() {
    var grid = mini.get("sbqkGrid");
    grid.setData("");
    var sbny = getSbny();
    var sbnyInput = mini.get("sbny").text;
    if (sbny != sbnyInput) {
        sbny = sbnyInput;
        $("#xgmsb-btn").hide();
    }
    var sssqArray = getSssq(sbny, sbzlDm);
    var sbqkVO = querySbqkSbxx(nsrData.djxh, sssqArray[0], sssqArray[1], sbzlDm);// 查询是否已经申报过
    if (sbqkVO == null) {
        mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
        return;
    }
    if (!sbqkVO.sbztDm && !sbqkVO.sbxh) {
        return;
    } else if (sbqkVO.sbztDm == 'hxzgFail') {
    } else if (sbqkVO.sbztDm == '0000') {
        //申报成功的话，财务报表也可以再次申报，注释掉申报按钮隐藏$("#xgmsb-btn").hide();
        grid.setData(new Array(sbqkVO));
    } else {
        grid.setData(new Array(sbqkVO));
    }
    return;
}
