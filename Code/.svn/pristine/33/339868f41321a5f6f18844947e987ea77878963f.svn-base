/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-08-18
 * Time: 13:59
 * Description:
 */

/*不需要事前监控*/

wssqUtil.prepareValidate = function () {
    $.noop();
};

var ybnsr = {};
ybnsr.xxfpTjxx = {};//里面有uuid 和 nsqxDm
ybnsr.jxfpTjxx = {};//里面有uuid 和 nsqxDm
ybnsr.sggjData = [];

ybnsr.jxFpsArr = [];//缓存汇总页面的进项发票
ybnsr.jxfpmxSaveBz = false;

ybnsr.wkjfp = [];
/*未开具的发票*/
ybnsr.allXxfp = [];
/*包含汇总销项发票和手工归集发票*/

ybnsr.sssq = hdxxUtil.getSbny();//所属时期
ybnsr.JYZSBZ = '';
ybnsr.SZLBDM = '';
ybnsr.sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';

stepNav.run = function () {
    stepNav.initSteps([{ id: '0', title: '发票信息采集', url: 'txfpxxView.aspx' }]);

    mini.parse();

    ybnsr.$xxfpSggjTr = $('#xxfp-sggj');
    ybnsr.$jxfpSggjTr = $('#jxfp-sggj');
    ybnsr.$xxfpSggjFs = $('#xxfp-sggj-fs');
    ybnsr.$jxfpSggjFs = $('#jxfp-sggj-fs');
    ybnsr.$xxfpSggjBtn = $('#xxfp-sggj-btn');
    ybnsr.$xxfpXmmxBtn = $('#xxfp-xxmxcx-btn');
    ybnsr.$xxfpWkjfpBtn = $('#xxfp-wkjfp-btn');


    ybnsr.$jxfpMxcxBtn = $("#jxfp-xxmxcx-btn");
    ybnsr.$jxfpSggjBtn = $('#jxfp-sggj-btn');
    debugger;
    ybnsr.$generateSbbBtn = $('#generate-btn');
    ybnsr.$cancelBtn = $('#cancel-btn');

    ybnsr.dklxList = $('.dklxList li');

    ybnsr.xxmxWin = mini.get("xxfp-xxmx-win");
    ybnsr.wkjfpWin = mini.get("xxfp-wkjfp-win");
    ybnsr.xxfpWin = mini.get('xxfp-add-win');
    ybnsr.jxfpWin = mini.get('jxfp-add-win');
    ybnsr.jxfpFpmxWin = mini.get('jxfp-mxcx-win');


    ybnsr.xxfpGrid = mini.get('xxfp-grid');
    ybnsr.jxfpGrid = mini.get('jxfp-grid');
    ybnsr.xxmxGrid = mini.get('xxmx-grid');
    ybnsr.xxmxGrid = mini.get("xxmx-grid");
    ybnsr.wkjfpGrid = mini.get("wkjfp-grid");
    ybnsr.jxfpFpmxGrid = mini.get("jxfp-fpmx-grid");

    ybnsr.xxmxForm = new mini.Form("xxmx-form");

    ybnsr.jxfpForm = new mini.Form("jxfp-form");


    ybnsr.xxmxSearchBtn = mini.get("xxmx-search-btn");
    ybnsr.xxmxClearBtn = mini.get("xxmx-clear-btn");


    ybnsr.jxfpSearchBtn = mini.get("jxfp-search-btn");
    ybnsr.jxfpClearBtn = mini.get("jxfp-clear-btn");


    ybnsr.wkjfpSaveBtn = mini.get('wkjfp-save-btn');
    ybnsr.wkjfpCancelBtn = mini.get('wkjfp-cancel-btn');
    ybnsr.xxfpSaveBtn = mini.get('xxfp-save-btn');
    ybnsr.xxfpCancelBtn = mini.get('xxfp-cancel-btn');
    ybnsr.jxfpSaveBtn = mini.get('jxfp-save-btn');
    ybnsr.jxfpCancelBtn = mini.get('jxfp-cancel-btn');
    ybnsr.jkfpPldkBtn = mini.get("jxfp-pldk-btn");

    ybnsr.jxfpmxSaveBtn = mini.get("jxfpmx-save-btn");
    ybnsr.jxfpmxCancleBtn = mini.get("jxfpmx-cancel-btn");


    ybnsr.bqxsmxForm = new mini.Form('#bqxsmx');
    ybnsr.bqdkjxsejgmxForm = new mini.Form('#bqdkjxsejgmx');
    ybnsr.bqjxsemxForm = new mini.Form('#bqjxsemx');

    ybnsr.zfbzObj = {
        "Y": "是",
        "N": '否'
    };

    ybnsr.slOrzsl = [
        { "ID": '0.17', MC: '17%' },
        { "ID": '0.13', MC: '13%' },
        { "ID": '0.11', MC: '11%' },
        { "ID": '0.06', MC: '6%' },
        { "ID": '0.05', MC: '5%' },
        { "ID": '0.04', MC: '4%' },
        { "ID": '0.03', MC: '3%' },
        { "ID": '0', MC: '0%' }
    ];

    ybnsr.jsfsmxGridData = [
        { "ID": '1', MC: '一般计税' },
        { "ID": '2', MC: '简易计税' },
        { "ID": '3', MC: '免税' }
    ];

    /*表格中用到的征收项目*/
    ybnsr.zzxmGridData = [
        { "ID": '1', "MC": '应税货物' },
        { "ID": '2', "MC": '应税劳务' },
        { "ID": '3', "MC": '应税服务、不动产或无形资产' },
        { "ID": '4', "MC": '应税服务、不动产或无形资产' },
        { "ID": '5', "MC": '应税服务、不动产或无形资产' }
    ];
    /*下拉选择框用到的征收项目*/
    ybnsr.zzxmData = [
        { "ID": '', "MC": '全部' },
        { "ID": '1', "MC": '应税货物' },
        { "ID": '2', "MC": '应税劳务' },
        { "ID": '3', "MC": '应税服务、不动产或无形资产' }
    ];
    ybnsr.zzxmObj = {
        "1": 'yshw',
        "2": 'yslw',
        "3": 'ysfw',
        "4": 'ysfw',
        "5": 'ysfw'
    };
    ybnsr.jsfsObj = {
        "1": 'ybjs',
        "2": 'jyjs',
        "3": 'ms'
    };
    ybnsr.fplbObj = {
        "1": '增值税专用发票',
        "2": '增值税普通发票',
        "3": '卷式发票',
        "4": '电子发票',
        "5": '机动车统一发票',
        "6": '农产品',
        "7": '海关发票',
        "8": '其他'
    };

    ybnsr.fplbData = [
        { "ID": '1', "MC": '增值税专用发票' },
        { "ID": '2', "MC": '增值税普通发票' },
        { "ID": '3', "MC": '卷式发票' },
        { "ID": '4', "MC": '电子发票' },
        { "ID": '5', "MC": '机动车统一发票' },
        { "ID": '6', "MC": '农产品' },
        { "ID": '7', "MC": '海关发票' },
        { "ID": '8', "MC": '其他' }
    ];

    ybnsr.sfdkData = [
        { "ID": 'N', "MC": '是' },
        { "ID": 'Y', "MC": '否' }
    ];
    /*表格中的下拉框用到的*/
    ybnsr.jxgjGridData = [
        { "ID": '01', "MC": '有形动产租赁' },
        { "ID": '02', "MC": '运输服务' },
        { "ID": '03', "MC": '电信服务' },
        { "ID": '04', "MC": '建筑安装服务' },
        { "ID": '05', "MC": '不动产租赁服务' },
        { "ID": '06', "MC": '受让土地使用权' },
        { "ID": '07', "MC": '金融保险服务' },
        { "ID": '08', "MC": '生活服务' },
        { "ID": '09', "MC": '无形资产' },
        { "ID": '10', "MC": '货物及加工、修理修配劳务' }
    ];
    ybnsr.jxgjFormData = [
        { "ID": '', "MC": '全部' },
        { "ID": '01', "MC": '有形动产租赁' },
        { "ID": '02', "MC": '运输服务' },
        { "ID": '03', "MC": '电信服务' },
        { "ID": '04', "MC": '建筑安装服务' },
        { "ID": '05', "MC": '不动产租赁服务' },
        { "ID": '06', "MC": '受让土地使用权' },
        { "ID": '07', "MC": '金融保险服务' },
        { "ID": '08', "MC": '生活服务' },
        { "ID": '09', "MC": '无形资产' },
        { "ID": '10', "MC": '货物及加工、修理修配劳务' }
    ];

    ybnsr.jxgjObj = {
        "01": '有形动产租赁',
        "02": '运输服务',
        "03": '电信服务',
        "04": '建筑安装服务',
        "05": '不动产租赁服务',
        "06": '受让土地使用权',
        "07": '金融保险服务',
        "08": '生活服务',
        "09": '无形资产',
        "10": '货物及加工、修理修配劳务'
    };

    ybnsr.jxfplxObj = {
        "01": 'yxdc',
        "02": 'ysfw',
        "03": 'dxfw',
        "04": 'jzazfw',
        "05": 'bdcfw',
        "06": 'srtdsyq',
        "07": 'jrbxfw',
        "08": 'shfw',
        "09": 'wxzc',
        "10": 'hwjg'
    };
    ybnsr.nsrxxVo = nsrxxUtil.getNsrxxVO();
    // 延迟初始化，显示遮罩
    mini.mask('正在获取核定信息，请稍候...');
    setTimeout(function () {
        // 先获取核定信息，设置sbzlDm

        /*  var hdxx=ybnsr.initHdxx();*/
        var hdxx = ybnsr.getHdxxData();
        if (!hdxx) {
            return false;
        }
        ybnsr.initCombData();
        //ybnsr.initXxfpCombData();
        ybnsr.initFpData();
        ybnsr.bindEvent();
    }, 300);

};
ybnsr.initFpData = function () {
    /*销项发票所有的td都隐藏*/
    $("#bqxsmx tbody td").hide();
    /*进项发票*/
    $("#bqdkjxsejgmx tbody tr").hide();
    $('#bqdkjxsejgmx .jxfp-hjxx').show();
    mini.unmask();

    var param = {
        sssq: ybnsr.sssq,
        sbzlDm: ybnsr.sbzlDm
    };
    ybnsrService.getFphzxx(mini.encode(param), function (result) {
        if (result.success) {
            // 销项发票数据
            ybnsr.initXxfp(result.value.xxfpdata);
            // 进项发票数据
            ybnsr.initJxfp(result.value.jxfpdata);
        } else {
            mini.alert(result.message);
        }
    });
};

ybnsr.bindEvent = function () {
    ybnsr.$xxfpSggjBtn.on('click', ybnsr.openXxfpWin);
    ybnsr.$jxfpSggjBtn.on('click', ybnsr.openJxfpWin);
    ybnsr.$generateSbbBtn.on('click', ybnsr.generateYbnsrSbb);
    ybnsr.$cancelBtn.on('click', window.close);

    ybnsr.$xxfpXmmxBtn.on('click', ybnsr.openXxmxWin);
    ybnsr.$xxfpWkjfpBtn.on('click', ybnsr.openWkjfpWin);
    ybnsr.$jxfpMxcxBtn.on('click', ybnsr.openJxfpmxWin);


    ybnsr.xxfpSaveBtn.on('click', ybnsr.xxfpSave);
    ybnsr.xxfpCancelBtn.on('click', ybnsr.xxfpCancel);

    ybnsr.wkjfpSaveBtn.on('click', ybnsr.wkjfpSave);
    ybnsr.wkjfpCancelBtn.on('click', ybnsr.wkjfpCancel);


    ybnsr.xxmxSearchBtn.on('click', ybnsr.xxmxSearch);
    ybnsr.xxmxClearBtn.on('click', ybnsr.xxmxClear);

    ybnsr.jxfpSaveBtn.on('click', ybnsr.jxfpSave);
    ybnsr.jxfpCancelBtn.on('click', ybnsr.jxfpCancel);

    ybnsr.jxfpSearchBtn.on('click', ybnsr.jxfpSearch);
    ybnsr.jxfpClearBtn.on('click', ybnsr.jxfpClear);

    ybnsr.jkfpPldkBtn.on('click', ybnsr.pldk);
    ybnsr.dklxList.on('click', ybnsr.setPldk);

    ybnsr.jxfpmxSaveBtn.on('click', ybnsr.jxfpmxSave);
    ybnsr.jxfpmxCancleBtn.on('click', ybnsr.jxfpmxCancle);


};

/*初始化，销项发票下拉选择框的data ( 简易计税 和 征收项目)*/
ybnsr.initXxfpCombData = function () {
    /*简易征收标志位1 才有简易征收选项*/
    if (ybnsr.JYZSBZ === "1") {
        ybnsr.jsfsData = [
            { "ID": '1', MC: '一般计税' },
            { "ID": '2', MC: '简易计税' },
            { "ID": '3', MC: '免税' }
        ];
    } else {
        ybnsr.jsfsData = [
            { "ID": '1', MC: '一般计税' },
            { "ID": '3', MC: '免税' }
        ];
    }

    /*征收类别代码*/
    if (ybnsr.SZLBDM === "01") {
        ybnsr.zzxmNoAll = [
            { "ID": '1', "MC": '应税货物' },
            { "ID": '2', "MC": '应税劳务' }];
    } else if (ybnsr.SZLBDM === "02") {
        ybnsr.zzxmNoAll = [
            { "ID": '3', "MC": '应税服务、不动产或无形资产' }
        ];
    } else if (ybnsr.SZLBDM === "03") {
        ybnsr.zzxmNoAll = [
            { "ID": '1', "MC": '应税货物' },
            { "ID": '2', "MC": '应税劳务' },
            { "ID": '3', "MC": '应税服务、不动产或无形资产' }
        ];
    }
};

/*为了测试 屏蔽掉核定的*/
ybnsr.initCombData = function () {
    ybnsr.jsfsData = [
        { "ID": '1', MC: '一般计税' },
        { "ID": '2', MC: '简易计税' },
        { "ID": '3', MC: '免税' }
    ];
    ybnsr.zzxmNoAll = [
        { "ID": '1', "MC": '应税货物' },
        { "ID": '2', "MC": '应税劳务' },
        { "ID": '3', "MC": '应税服务、不动产或无形资产' }
    ];
};

/*获取一些核定信息*/
ybnsr.getHdxxData = function () {
    mini.unmask();
    ybnsr.sbzlNode = hdxxUtil.getSbzlNode();
    ybnsr.sbzlDm = ybnsr.sbzlNode.sbzlcode;
    ybnsr.SZLBDM = hdxxUtil.getWsxxValueByCode('SZLBDM', ybnsr.sbzlNode);
    ybnsr.JYZSBZ = hdxxUtil.getWsxxValueByCode('JYZSBZ', ybnsr.sbzlNode);
    ybnsr.YQWRDBZ = hdxxUtil.getWsxxValueByCode('YQWRDBZ', ybnsr.sbzlNode);
    if (ybnsr.sbzlNode) {
        return true
    } else {
        return false;
    }
};


//获取核定信息
ybnsr.initHdxx = function () {
    var isContinue = true;
    var param = {
        djxh: ybnsr.nsrxxVo.djxh,
        sbny: hdxxUtil.getSbny()
    };
    $.ajax({
        url: "/sb/sbcommon_getHdxx.ashx",
        type: "post",
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: param,
        success: function (data) {
            var result = mini.decode(data);
            if (!data.success) {
                isContinue = false;
                mini.unmask();
                mini.alert(data.message, '提示', function () {
                    window.close();
                });
                return false;
            }
            debugger;
            if (!!result.data) {
                var hdxxData = result.data;
                store.setLocal('hdxxData', hdxxData); // 做local缓存
                ybnsr.skssqq = hdxxData.HdxxResponseVo.QSSJ;
                ybnsr.skssqz = hdxxData.HdxxResponseVo.JZSJ;
                var sbzlArray = ['10101', '10110'];
                ybnsr.sbzlNode = ybnsr.isExsitSbzlHdxx(sbzlArray, hdxxData);
                // 校验核定内的相关资格
                ybnsr.sbzlDm = ybnsr.checkHd(ybnsr.sbzlNode);
                if (!ybnsr.sbzlDm) {
                    isContinue = false;
                    mini.unmask();
                    return false;
                }
                //重复申报校验
                if (!ybnsr.checkCfsb()) {
                    isContinue = false;
                    mini.unmask();
                    return false;
                }
                ybnsr.SZLBDM = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'SZLBDM');
                ybnsr.JYZSBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'JYZSBZ');
                ybnsr.YQWRDBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'YQWRDBZ');
            }
            mini.unmask();
        },
        error: function () {
            isContinue = false;
            mini.unmask();
            mini.alert("核定信息查询出错！", '提示', function () {
                window.close();
            });
        }
    });
    return isContinue;
};
ybnsr.isExsitSbzlHdxx = function (sbzlArray, hdxxData) {
    var hdxxVo = hdxxData.HdxxResponseVo;
    var sbzlNode = null;
    for (var r = 0; r < hdxxVo.SBZL.length; r++) {
        var sbzl = hdxxVo.SBZL[r].SBZLCODE;
        if (sbzlArray.indexOf(sbzl) !== -1) {
            sbzlNode = hdxxVo.SBZL[r];
            break;
        }
    }
    return sbzlNode;
};
ybnsr.getWsxxValueByCode = function (sbzlNode, wsxxcode) {
    var wsxxs = sbzlNode.WSXXS.WSXX;
    var wsxxvalue = "";
    for (var i = 0; i < wsxxs.length; i++) {
        var wsxxnode = wsxxs[i];
        if (wsxxcode == wsxxnode.CODE) {
            wsxxvalue = wsxxnode.VALUE;
            break;
        }
    }
    return wsxxvalue;
};
ybnsr.checkHd = function (sbzlNode) {
    if (!sbzlNode) {
        mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示', function () {
            window.close();
        });
        return false;
    }

    if (sbzlNode.QCCGBZ === 'N') {
        mini.alert(sbzlNode.QCCGBZMS, '提示', function () {
            window.close();
        });
        return false;
    }
    var fbID = ['001', '002', '085', '082', '003', '083', '006', '031', '081', '030'];
    var fbName = {
        '001': '增值税纳税申报表',
        '002': '本期销售情况明细',
        '003': '本期进项税额明细',
        '006': '服务、不动产和无形资产扣除项目明细',
        '007': '成品油购销存情况明细表',
        '025': '电力企业增值税销项税额和进行税额传递单',
        '030': '固定资产进项税额抵扣情况表',
        '031': '税额抵减情况表',
        '052': '农产品核定扣除增值税进项税额计算表（汇总表）',
        '053': '投入产出法核定农产品增值税进项税额计算表',
        '054': '成本法核定农产品增值税进项税额计算表',
        '055': '购进农产品直接销售核定农产品增值税进项税额计算表',
        '056': '购进农产品用于生产经营且不构成货物实体核定农产品增值税进项税额计算表',
        '064': '航空运输企业试点地区分支机构传递单',
        '075': '邮政企业分支机构增值税汇总纳税信息传递单',
        '076': '铁路运输企业分支机构增值税汇总纳税信息传递单',
        '077': '电信企业分支机构增值税汇总纳税信息传递单',
        '079': '部分产品销售统计表',
        '081': '增值税减免税申报明细表',
        '082': '不动产分期抵扣计算表',
        '083': '本期抵扣进项税额结构明细表',
        '085': '营改增税负分析测算明细表',
        '601': '分支机构增值税汇总纳税信息传递单'
    };
    var WSXX = sbzlNode.WSXXS.WSXX;
    var result = true;
    $.each(WSXX, function (i, v) {
        var code = v.CODE;
        if (code === "DXQYBZ" || code === "HKYSQYBZ" || code === "YZQYBZ" || code === "TLYSQYBZ") {
            if (v.VALUE === "Y") {
                result = false;
                return false;
            }
        }
        //成品油
        if (code === "TSHY") {
            if (Number(v.VALUE) === 2) {
                result = false;
                return false;
            }
        }
    });

    var tempArr = [];
    var SBB = sbzlNode.SBBS.SBB;
    //部分销售：判断bbid里是否有079这张表
    for (var i = 0, len = SBB.length; i < len; i++) {
        if (SBB[i] === '079') {
            result = false;
        }
        tempArr.push(SBB[i]);
    }
    if (!result) {
        var nameID = $.grep(tempArr, function (n, i) {
            if ($.inArray(n, fbID) < 0) {
                return n
            }
        });
        var _name = [];
        $.each(nameID, function (i, v) {
            _name.push(fbName[v]);
        });
        var str = _name.join('，');
        mini.alert("您需要报送【" + str + "】，网厅暂不支持该报表的申报，您可以通过【河北省国家税务局网上办税系统】申报！",
            "提示", function () {
                window.close();
            });
        return false;
    }
    return sbzlNode.SBZLCODE;
};
ybnsr.checkCfsb = function () {
    var sbqkData = {};
    $.ajax({
        url: "/sb/sbcommon_querySbqkSbxx.ashx",
        type: "post",
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {
            djxh: ybnsr.nsrxxVo.djxh,
            sssqq: ybnsr.skssqq,
            sssqz: ybnsr.skssqz,
            sbzlDm: ybnsr.sbzlDm
        },
        success: function (data) {
            if (!data.success) {
                mini.alert(data.message, '提示', function () {
                    window.close();
                });
                return false;
            }
            var result = mini.decode(data);
            if (!!result.data) {
                sbqkData = result.data;
            }
        }, error: function () {
            mini.alert('查询申报记录出错，请联系运维人员或稍后再试！', '提示', function () {
                window.close();
            })
        }
    });
    if (sbqkData.sbztms.indexOf("征期外申报") !== -1 && sbqkData.sbztDm === "0000") { //即查询逾期申报的情况下
        mini.alert("您已经成功申报过增值税一般纳税人申报表，但属于征期外申报，请联系主管税务机关是否需要处罚。", "提示", function () {
            window.close();
        });
        return false;
    }
    if (sbqkData.sbztDm === '0000' || (sbqkData.sbztDm.indexOf('20') === 0)) {
        mini.alert("您已经成功申报过增值税一般纳税人申报表，请勿重复申报。", "提示", function () {
            window.close();
        });
        return false;
    }
    if (sbqkData.sbztDm === "hxzgSuccess") { //即查询逾期申报的情况下
        mini.alert("您已经成功申报过增值税一般纳税人申报表，但未使用本系统申报。", "提示", function () {
            window.close();
        });
        return false;
    }
    return true;
};


/*初始销项发票*/
ybnsr.initXxfp = function (xxfpdata) {
    var xxfpTjxx = mini.clone(xxfpdata.xxfpTjxx);

    ybnsr.xxfpTjxx = mini.clone(xxfpTjxx);

    /*分类发票显示*/
    ybnsr.flfpHz(xxfpTjxx, false);

    /*手工归集 Y显示*/
    if (xxfpTjxx.sggjBz === "Y") {
        $('#xxfp-sggj').show();
        $("#xxfp-sggj-fs").text(xxfpdata.sgGjMxs.sgGjMx.length);
    }

    /*销项发票明细*/
    var xxfpArr = mini.clone(xxfpdata.xxFps.xxFp);

    ybnsr.xxfpArr = mini.clone(xxfpArr);
    /*用于缓存，汇总的销项发票 不会改变*/

    ybnsr.allXxfp = mini.clone(xxfpArr);
    /*用于缓存汇总的销项发票和归集发票*/

    ybnsr.renderXxfpData(xxfpArr);

    /*未开具发票隐藏*/
    $("#bqxsmx .wjkfptd,#bqxsmx .wjkfp-title").hide();
};

/*处理汇总行发票数据，便于在页面中渲染数据*/
ybnsr.getFplbTjxx = function (fplyTjxx) {
    var data = mini.clone(fplyTjxx);
    var fplbObj = {};
    $.each(data, function (i, item) {
        if (item.fplb === "1") {
            fplbObj.zzszyfp = item;
        } else if (item.fplb === "2") {
            fplbObj.zzsptfp = item;
        } else if (item.fplb === "3") {
            fplbObj.jsfp = item;
        } else if (item.fplb === "4") {
            fplbObj.dzfp = item;
        } else if (item.fplb === "5") {
            fplbObj.jdcfp = item;
        }
    });
    return fplbObj;
};

/*保存时，将数据渲染到汇总页面*/
ybnsr.renderXxfpData = function (xxfpArr, isWkp) {
    if (xxfpArr.length > 0) {
        if (isWkp) {
            $('.wjkfp-title').show();
        }
        ;
        var obj = ybnsr.getXxfpObj();
        var wjkObj = ybnsr.getWkjfpObj();
        $.each(xxfpArr, function (i, item) {
            var zsxm = ybnsr.zzxmObj[item.zzszsxmId];
            var jsfsId = ybnsr.jsfsObj[item.jsfsId];
            $("." + jsfsId + ' ' + "td").eq(0).show();
            var slNum = Number(item.sl) * 100 + '';
            var $class = zsxm + slNum;
            var $slItem = $("." + $class);
            if (slNum === "6" && jsfsId === "ybjs") {
                $slItem = $('.sl6');
            }
            $slItem.find("td").show();
            $slItem.find('.wjkfptd').hide();
            if (isWkp) {
                wjkObj = ybnsr.renderWkjfp($slItem, wjkObj, item);
            } else {
                obj = ybnsr.renderXxfp(obj, item);
            }

        });
        if (!isWkp) {
            for (var j in obj) {
                var jCtrl = mini.get(j);
                if (jCtrl) {
                    jCtrl.setValue(obj[j]);
                    $("#" + j).find('.mini-textbox-input').attr('title', obj[j].toFixed(2));
                }

            }
        } else {
            for (var m in wjkObj) {
                var wkjCtr = mini.get(m);
                if (wkjCtr) {
                    wkjCtr.setValue(wjkObj[m]);
                    $("#" + m).find(".mini-textbox-input").attr("title", wjkObj[m].toFixed(2));
                }
            }
        }

    }
};
ybnsr.renderWkjfp = function ($slItem, wjkObj, item) {
    var zsxm = ybnsr.zzxmObj[item.zzszsxmId];
    var jsfsId = ybnsr.jsfsObj[item.jsfsId];
    var slNum = Number(item.sl) * 100 + '';
    $slItem.find('.wjkfptd').show();
    item.fplb = item.fplb ? item.fplb : "3";
    var xseCtrl;
    var jeCtrl;
    /*税率为6 的时候根据计税方式来赋值*/
    if (zsxm === "ysfw" && slNum != "6" && slNum != "4") {

        wjkObj[zsxm + "-" + slNum + "-" + item.fplb + '-xse'] = Number(wjkObj[zsxm + "-" + slNum + "-" + item.fplb + '-xse']) + Number(item.je);
        wjkObj[zsxm + "-" + slNum + "-" + item.fplb + '-se'] = Number(wjkObj[zsxm + "-" + slNum + "-" + item.fplb + '-se']) + Number(item.se);

    } else {
        wjkObj[jsfsId + "-" + slNum + "-" + item.fplb + '-xse'] = Number(wjkObj[jsfsId + "-" + slNum + "-" + item.fplb + '-xse']) + Number(item.je);
        wjkObj[jsfsId + "-" + slNum + "-" + item.fplb + '-se'] = Number(wjkObj[jsfsId + "-" + slNum + "-" + item.fplb + '-se']) + Number(item.se);
    }
    return wjkObj;

};

ybnsr.renderXxfp = function (obj, item) {
    var zsxm = ybnsr.zzxmObj[item.zzszsxmId];
    var jsfsId = ybnsr.jsfsObj[item.jsfsId];
    var slNum = Number(item.sl) * 100 + '';
    var fplb = item.fplb;
    if (zsxm === "yslw" || zsxm === "yshw" || slNum == "6" || slNum == "4") {
        obj[jsfsId + '-' + slNum + "-" + fplb + '-xse'] = Number(obj[jsfsId + '-' + slNum + "-" + fplb + '-xse']) + Number(item.je);
        obj[jsfsId + '-' + slNum + "-" + fplb + '-se'] = Number(obj[jsfsId + '-' + slNum + "-" + fplb + '-se']) + Number(item.se);

    } else {
        /*服务、不动产和无形资产*/
        /* mini.get("#"+zsxm + "-"+slNum +"-"+ item.fplb +'-xse').setValue(item.je);
         mini.get("#"+zsxm + "-"+slNum +"-"+ item.fplb  + '-se').setValue(item.je);*/
        obj['ysfw-' + slNum + "-" + fplb + '-xse'] = Number(obj['ysfw-' + slNum + "-" + fplb + '-xse']) + Number(item.je);
        obj['ysfw-' + slNum + "-" + fplb + '-se'] = Number(obj['ysfw-' + slNum + "-" + fplb + '-se']) + Number(item.se);
    }
    return obj

};

/*分类发票 汇总*/
ybnsr.flfpHz = function (xxfpTjxx, isXxmx) {
    if (mini.encode(xxfpTjxx) === "{}") {
        return false;
    }
    var flfpData = ybnsr.getFplbTjxx(xxfpTjxx.fplbTjxxs.fplbTjxx);
    for (var i in flfpData) {
        var item = flfpData[i];
        for (var j in item) {
            if (isXxmx) {
                $('#xxmx' + '-' + i + '-' + j).text(item[j]);
            } else {
                $('#' + i + '-' + j).text(item[j]);
            }
        }
    }
    if (isXxmx) {
        /*汇总显示销项发票的总金额，销售额、份数*/
        $("#xxmx-fs").text(xxfpTjxx.hzfs);
        $("#xxmx-je").text(xxfpTjxx.hzje);
        $("#xxmx-se").text(xxfpTjxx.hzse);
    } else {
        /*汇总显示销项发票的总金额，销售额、份数*/
        $("#xxfp-fs").text(xxfpTjxx.hzfs);
        $("#xxfp-je").text(xxfpTjxx.hzje);
        $("#xxfp-se").text(xxfpTjxx.hzse);
    }
};

/*销项发票的金额、税额 obj*/
ybnsr.getXxfpObj = function () {
    var obj = {};
    var slArr = ['17', '13', '11', '6', '5', '4', '3', '0'];
    var fplbArr = ['1', '2', '3'];
    var jsfsIdArr = ['ybjs', 'jyjs', 'ms', 'ysfw'];
    $.each(slArr, function (i, item) {
        var slItem = item;
        $.each(fplbArr, function (j, fplb) {
            $.each(jsfsIdArr, function (l, jsfs) {
                obj[jsfs + '-' + slItem + '-' + fplb + '-xse'] = 0;
                obj[jsfs + '-' + slItem + '-' + fplb + '-se'] = 0;
            });

        });
    });
    return obj;
};

ybnsr.getWkjfpObj = function () {
    var obj = {};
    var slArr = ['17', '13', '11', '6', '5', '4', '3', '0'];
    var jsfsIdArr = ['ybjs', 'jyjs', 'ms', 'ysfw'];
    $.each(slArr, function (i, item) {
        var slItem = item;
        $.each(jsfsIdArr, function (l, jsfs) {
            obj[jsfs + '-' + slItem + '-' + 3 + '-xse'] = 0;
            obj[jsfs + '-' + slItem + '-' + 3 + '-se'] = 0;
        });
    });
    return obj;
};


//初始化进项发票
ybnsr.initJxfp = function (jxfpdata) {
    var jxfpTjxx = mini.clone(jxfpdata.jxfpTjxx);
    ybnsr.jxfpTjxx = mini.clone(jxfpTjxx);
    ybnsr.jxfpmxRenderHj(jxfpTjxx, false);

    if (jxfpTjxx.fdqBz === "N") {
        $(".showByfdq").show();
    } else if (jxfpTjxx.fdqBz === "Y") {
        $(".showByfdq").hide();
    }

    if (jxfpTjxx.sggjBz === "Y") {
        $("#jxfp-sggj").show();
    }

    var jxFpsArr = mini.clone(jxfpdata.jxFps.jxFp);
    ybnsr.jxFpsArr = mini.clone(jxFpsArr);

    if (jxfpdata.sgGjMxs) {
        $("#jxfp-sggj-fs").html(jxfpdata.sgGjMxs.sgGjMx.length);
    }

    ybnsr.rendeJxfpHz(jxFpsArr);

    ybnsr.dkData = mini.clone(jxfpdata.jxfpTjxx.sbdkse);

    ybnsr.rendererDkxx(ybnsr.dkData, jxfpTjxx.fdqBz);
};
ybnsr.rendererDkxx = function (allData, fdqBz) {
    var dkData = {};
    if (fdqBz === "N") {
        dkData = {
            dk: {
                zyfpxx: {
                    fs: allData.zyfpxx ? allData.zyfpxx.fs : 0,
                    se: allData.zyfpxx ? allData.zyfpxx.se : 0,
                    je: allData.zyfpxx ? allData.zyfpxx.je : ''
                },
                hgpxx: {
                    fs: allData.hgpxx ? allData.hgpxx.fs : 0,
                    se: allData.hgpxx ? allData.hgpxx.se : 0,
                    je: allData.hgpxx ? allData.hgpxx.je : 0
                }
            }
        };
    } else if (fdqBz === "Y") {
        dkData = {
            ddk: {
                zyfpxx: {
                    fs: allData.zyfpxx ? allData.zyfpxx.fs : 0,
                    se: allData.zyfpxx ? allData.zyfpxx.se : 0,
                    je: allData.zyfpxx ? allData.zyfpxx.je : ''
                },
                hgpxx: {
                    fs: allData.hgpxx ? allData.hgpxx.fs : 0,
                    se: allData.hgpxx ? allData.hgpxx.se : 0,
                    je: allData.hgpxx ? allData.hgpxx.je : 0
                }
            }
        };
    }
    for (var i in dkData) {
        for (var j in dkData[i]) {
            for (var h in dkData[i][j]) {

                mini.get(i + "-" + j + "-" + h).setValue(dkData[i][j][h]);
            }
        }
    }
};

/*
ybnsr.renderJxfpData = function(jxFpsArr){
    $.each(jxFpsArr,function(i,item){
        var jxfllxId =  ybnsr.jxfplxObj[item.jxfllxId];
        $("."+ jxfllxId).show();
        var slValue = Number(item.sl) * 100;
        var jeCtrol = mini.get("#"+jxfllxId + "-"+slValue + '-je');
        var seCtrol =  mini.get("#"+jxfllxId + "-"+slValue + '-se');
        if(jeCtrol && seCtrol){
            jeCtrol.setValue(item.je);
            seCtrol.setValue(item.se);
        }
    });
    ybnsr.jxfpCount(jxFpsArr);

};*/

/*进项发票汇总*/
ybnsr.rendeJxfpHz = function (jxFpsArr) {
    /*进项发票*/
    $("#bqdkjxsejgmx tbody tr").hide();
    $('#bqdkjxsejgmx .jxfp-hjxx').show();

    var obj = ybnsr.getJxfphzObj();
    $.each(jxFpsArr, function (i, item) {
        var jxfllxId = ybnsr.jxfplxObj[item.jxfllxid] || ybnsr.jxfplxObj[item.jxgjId];
        $("." + jxfllxId).show();
        var slValue = Number(item.sl) * 100;
        obj[jxfllxId + "-" + slValue + '-je'] = Number(obj[jxfllxId + "-" + slValue + '-je']) + Number(item.je);
        obj[jxfllxId + "-" + slValue + '-se'] = Number(obj[jxfllxId + "-" + slValue + '-se']) + Number(item.se);

    });
    for (i in obj) {
        var ctrl = mini.get(i);
        if (ctrl) {
            mini.get(i).setValue(obj[i]);
            $("#" + i).find(".mini-textbox-input").attr('title', Number(obj[i]).toFixed(2));
        }
    }
    /*进项发票合计*/
    ybnsr.jxfpCount(jxFpsArr);
};
ybnsr.getJxfphzObj = function () {
    var obj = {};
    var jxfllxId = ["yxdc", "ysfw", "dxfw", "jzazfw", "bdcfw", "srtdsyq", "jrbxfw", "shfw", "wxzc", "hwjg"];
    var sl = ["17", "13", "11", "6", "5", "3"];

    $.each(jxfllxId, function (i, item) {
        var jxfllx = item;
        $.each(sl, function (j, slItem) {
            obj[jxfllx + '-' + slItem + '-je'] = 0;
            obj[jxfllx + '-' + slItem + '-se'] = 0;
        });
    });
    return obj;
};


//进项发票合计计算
ybnsr.jxfpCount = function (jxfpsAll) {
    var obj = {
        '17_je': '083_7_4',
        '17_se': '083_7_7',
        '13_je': '083_9_4',
        '13_se': '083_9_7',
        '11_je': '083_10_4',
        '11_se': '083_10_7',
        '6_je': '083_16_4',
        '6_se': '083_16_7',
        '5_je': '083_21_4',
        '5_se': '083_21_7',
        '3_je': '083_23_4',
        '3_se': '083_23_7'
    };
    var hjObj = {};

    $.each(jxfpsAll, function (i, item) {
        var jxfllxId = ybnsr.jxfplxObj[item.jxfllxid] || ybnsr.jxfplxObj[item.jxgjId];
        if (jxfllxId) {
            var jeKey = Number(item.sl) * 100 + '_je';
            var seKey = Number(item.sl) * 100 + '_se';
            var jeField = obj[jeKey];
            var seField = obj[seKey];
            if ((!hjObj[jeField]) || (!hjObj[seField])) {
                hjObj[jeField] = 0;
                hjObj[seField] = 0;
            }

            hjObj[jeField] += Number(item.je);
            hjObj[seField] += Number(item.se);
        }
    });
    for (var i in hjObj) {
        $("#jxhj_" + i).find(".mini-textbox-input").attr('title', Number(hjObj[i]).toFixed(2));
    }
    ybnsr.bqdkjxsejgmxForm.setData(hjObj);

};

/*计算合计*/
ybnsr.jsHj = function (xxfpArr) {
    var fs = xxfpArr.length;
    var je = 0, se = 0;
    for (var i = 0; i < fs; i++) {
        je += Number(xxfpArr[i].je);
        se += Number(xxfpArr[i].se);
    }
    $('#xxfp-zfs').text(fs);
    $('#xxfp-zje').text(je.toFixed(2));
    $('#xxfp-zse').text(se.toFixed(2));
};


/*打开销项明细*/
ybnsr.openXxmxWin = function () {
    mini.get("xxmx-slOrzsl").setData(ybnsr.slOrzsl);
    mini.get("xxmx-zzxm").setData(ybnsr.zzxmData);
    mini.get("xxmx-zzxm").setValue('');
    scrollTo(0, 0);
    ybnsr.xxmxWin.show();
};

/*查询销项明细*/
ybnsr.xxmxSearch = function () {
    ybnsr.xxmxForm = new mini.Form("xxmx-form");
    ybnsr.xxmxGrid = mini.get("xxmx-grid");


    /*发票分类显示*/
    ybnsr.flfpHz(ybnsr.xxfpTjxx, true);

    var formData = ybnsr.xxmxForm.getData(true);
    /*发请求*/
    ybnsr.xxmxGrid.setUrl('../../../api/sb/fpxxtq/queryXxfpMx.ashx');
    formData.nsqxDm = ybnsr.xxfpTjxx.nsqxDm;
    formData.djxh = ybnsr.nsrxxVo.djxh;
    formData.sssq = ybnsr.sssq;
    formData.sbzlDm = ybnsr.sbzlDm;
    ybnsr.xxmxGrid.load(formData, function (data) {

    }, function (data) {
        var result = mini.decode(data.errorMsg);
        if (result.message === "ajaxSessionTimeOut") {
            top.location.reload();
            return;
        }
        mini.alert(result.message);
    });

};

/*发票明细查询之前 加载前*/
ybnsr.xxfpMxBeforeload = function (e) {
    e.contentType = "application/json;charset=utf-8";
    e.data.pageNum = e.data.pageSize;
    e.data.pageUrl = Number(e.data.pageIndex) + 1;
    e.data = mini.encode(e.data);
};
/*重置发票明细form*/
ybnsr.xxmxClear = function () {
    ybnsr.xxmxForm.clear();
};

/*销项发票-手工归集-打开*/
ybnsr.openXxfpWin = function () {

    /*  ybnsr.xxfpGrid.setUrl('../../data/ybnsr_ybjc/xxfp-win.json');
     ybnsr.xxfpGrid.load({}, function (data) {
     var res = data.data;
     var fs = res.length;
     var je = 0, se = 0;
     for (var i = 0; i < fs; i++) {
     je += Number(res[i].je);
     se += Number(res[i].se);
     }
     $('#xxfp-zfs').text(fs);
     $('#xxfp-zje').text(je.toFixed(2));
     $('#xxfp-zse').text(se.toFixed(2));

     });*/
    ybnsr.xxfpGrid.setData('');
    ybnsr.xxfpGrid.setUrl('../../../api/sb/fpxxtq/getXxfpGjxx');
    ybnsr.xxfpGrid.load({}, function (data) {
        if (data.result.value) {
            ybnsr.sggjData = data.result.value.sgGjMx;
            ybnsr.xxfpSggjHj(ybnsr.sggjData);
        } else {
            ybnsr.sggjData = [];
            ybnsr.xxfpSggjHj(ybnsr.sggjData);
        }
    }, function (data) {
        var result = mini.decode(data.errorMsg);
        ybnsr.sggjData = [];
        ybnsr.xxfpSggjHj(ybnsr.sggjData);
        if (result.message === "ajaxSessionTimeOut") {
            top.location.reload();
            return;
        }
        mini.alert(result.message);
    });

    scrollTo(0, 0);
    ybnsr.xxfpWin.show();
};

ybnsr.xxfpSggjHj = function (sggjData) {
    var fs = sggjData.length;
    var je = 0;
    var se = 0;

    $.each(sggjData, function (i, item) {
        je += Number(item.je);
        se += Number(item.se);
    });

    $('#xxfp-zfs').text(fs);
    $('#xxfp-zje').text(je.toFixed(2));
    $('#xxfp-zse').text(se.toFixed(2));
};


/*保存手工归集的数据的时候，为了和汇总数据保持一致，对fpLb进项处理，1为专票，2、4、5、6、7、8为其他*/
ybnsr.xxfpSaveData = function (xxfpArr) {
    var xxfpSggj = [];
    $.each(xxfpArr, function (i, item) {
        if (item.fpLb === "1") {
            item.fplb = "1";
        } else {
            item.fplb = "2";
        }
        xxfpSggj.push(item);
    });
    return xxfpSggj;

};

/*销项发票-手工归集-取消*/
ybnsr.xxfpCancel = function () {
    ybnsr.xxfpWin.hide();
};

/*销项发票-手工归集-加载前*/
ybnsr.xxfpGjBeforeload = function (e) {
    e.contentType = "application/json;charset=utf-8";
    e.data.uuid = ybnsr.xxfpTjxx.uuid ? ybnsr.xxfpTjxx.uuid : '';
    e.data = mini.encode(e.data);
};


/*未开具发票-打开弹框*/
ybnsr.openWkjfpWin = function () {
    scrollTo(0, 0);
    ybnsr.wkjfpWin.show();
};

/*未开具发票-新增*/
ybnsr.addWkjfp = function () {
    var row = {};
    ybnsr.wkjfpGrid.addRow(row);
};

/*未开具发票-编辑表格*/
ybnsr.onCellCommitEdit = function (e) {
    var record = e.record;
    if (e.field === "je") {
        if (e.value && record.sl) {
            var se = Number(e.value) * Number(record.sl);
            ybnsr.wkjfpGrid.updateRow(record, {
                se: se
            });
        }
    }
    if (e.field === "sl") {
        if (e.value && record.je) {
            var seValue = Number(record.je) * Number(e.value);
            ybnsr.wkjfpGrid.updateRow(record, {
                se: seValue
            });
            ybnsr.jsfsValidate(e.value, record.jsfsId, e);
        }
    }
    if (e.field === "jsfsId") {
        ybnsr.slValidate(record.sl, e.value, e);
    }
};
/*税率校验*/
ybnsr.jsfsValidate = function (sl, jsfsId, e) {
    var ybjsSl = ["0.17", "0.13", "0.11", "0.06", "0"];
    var yjjsSl = ["0.06", "0.05", "0.04", "0.03"];

    if (ybnsr.jsfsObj[jsfsId] === "ybjs") {

        if (ybjsSl.indexOf(sl) <= -1) {
            ybnsr.wkjfpGrid.updateRow(record, {
                sl: '',
                slValue: '',
                se: ''
            });
            mini.alert("一般计税的税率为17%、13%、11%、6%、0%，当前税率不属于请重新选择计税方式");
            e.cancel = true;
        }
    } else if (ybnsr.jsfsObj[jsfsId] === "jyjs") {

        if (yjjsSl.indexOf(sl) <= -1) {
            ybnsr.wkjfpGrid.updateRow(record, {
                sl: '',
                slValue: '',
                se: ''
            });
            mini.alert("简易计税的税率为6%、5%、4%、3%，请重新选择计税方式");
            e.cancel = true;
        }
    } else if (ybnsr.jsfsObj[jsfsId] === "ms") {
        if (sl != 0) {
            ybnsr.wkjfpGrid.updateRow(record, {
                sl: '',
                slValue: '',
                se: ''
            });
            mini.alert("免税的税率为0%，请重新选择计税方式");
            e.cancel = true;
        }
    }
};


/*选择计税方式的时候校验*/
ybnsr.slValidate = function (sl, jsfsId, e) {
    var ybjsSl = ["0.17", "0.13", "0.11", "0.06", "0"];
    var yjjsSl = ["0.06", "0.05", "0.04", "0.03"];

    if (ybnsr.jsfsObj[jsfsId] === "ybjs") {

        if (ybjsSl.indexOf(sl) <= -1) {
            ybnsr.wkjfpGrid.updateRow(record, {
                jsfsId: '',
                jsfs: ''
            });
            mini.alert("一般计税的税率为17%、13%、11%、6%、0%，当前税率不属于请重新选择计税方式");
            e.cancel = true;
        }
    } else if (ybnsr.jsfsObj[jsfsId] === "jyjs") {

        if (yjjsSl.indexOf(sl) <= -1) {
            ybnsr.wkjfpGrid.updateRow(record, {
                jsfsId: '',
                jsfs: ''
            });
            mini.alert("简易计税的税率为6%、5%、4%、3%，请重新选择计税方式");
            e.cancel = true;
        }
    } else if (ybnsr.jsfsObj[jsfsId] === "ms") {
        if (sl != 0) {
            ybnsr.wkjfpGrid.updateRow(record, {
                jsfsId: '',
                jsfs: ''
            });
            mini.alert("免税的税率为0%，请重新选择计税方式");
            e.cancel = true;
        }
    }
};


/*未开具发票-保存*/
ybnsr.wkjfpSave = function () {
    ybnsr.wkjfpGrid.validate();
    if (!ybnsr.wkjfpGrid.isValid()) {
        return false;
    }
    var wkjData = ybnsr.wkjfpGrid.getSelecteds();
    if (wkjData.length > 0) {
        ybnsr.wkjfp = mini.clone(wkjData);

        ybnsr.renderXxfpData(wkjData, true);
        ybnsr.initAllFpxx();
        ybnsr.wkjfpWin.hide();
    } else {
        mini.alert("请先选中要保存的数据");
    }
};

/*未开具发票 校验-校验征收项目*/
ybnsr.wkjfpValidate = function (e) {
    var record = e.record;
    if (e.field === "zzszsxmId") {
        if (!e.value) {
            return;
        }
        if (record.jsfsId === "1" && record.sl === "0.13" && e.value === "3") {
            e.isValid = false;
            e.errorText = "计税方式是一般计税，税率是0.13，征收项目只能选择应税货物或应税劳务";
        } else if (record.jsfsId === "1" && record.sl === "0.06" && e.value != "3") {
            e.isValid = false;
            e.errorText = "计税方式是一般计税，税率是0.06，征收项目只能应税服务、不动产或无形资产";
        } else if (record.jsfsId === "2" && record.sl === "0.06" && e.value == "3") {
            e.isValid = false;
            e.errorText = "计税方式是简易计税，税率是0.06，征收项目只能选择应税货物或应税劳务";
        } else {
            e.isValid = true;
        }
    }
};

/*将查出来的发票显示*/
ybnsr.initAllFpxx = function () {
    var xxfpArr = mini.clone(ybnsr.allXxfp);
    $.each(xxfpArr, function (i, item) {
        var slNum = Number(item.sl) * 100 + '';
        var zsxm = ybnsr.zzxmObj[item.zzszsxmId];
        var jsfsId = ybnsr.jsfsObj[item.jsfsId];
        var $class = zsxm + slNum;
        var $slItem = $("." + $class);
        if (slNum === "6" && jsfsId === "ybjs") {
            $slItem = $('.sl6');
        }
        $slItem.find("td").show();
    });
};

/*未开具发票-取消*/
ybnsr.wkjfpCancel = function () {
    ybnsr.wkjfpWin.hide();
};


/*进项发票发票明细-打开弹框*/
ybnsr.openJxfpmxWin = function () {
    mini.get("jxfp-sl").setData(ybnsr.slOrzsl);
    mini.get("jxfp-jxgj").setData(ybnsr.jxgjFormData);

    $(".dklxList").hide();

    /*默认选全部*/
    mini.get("jxfp-jxgj").setValue('');
    var pldkBtnCtrl = mini.get("jxfp-pldk-btn");

    if (ybnsr.jxfpTjxx.fdqBz == "Y") {
        pldkBtnCtrl.setReadOnly(true);
    } else {
        pldkBtnCtrl.setReadOnly(false);
    }


    ybnsr.jxfpForm.clear();
    ybnsr.jxfpFpmxGrid.unmask();
    ybnsr.jxfpFpmxGrid.setData('');
    scrollTo(0, 0);
    ybnsr.jxfpFpmxWin.show();


};

/*进项发票手工归集-打开弹框*/
ybnsr.openJxfpWin = function () {
    ybnsr.jxfpGrid.setData('');

    ybnsr.jxfpGrid.setUrl('../../../api/sb/fpxxtq/getJxfpGjxx.ashx');

    var param = {};
    param.uuid = ybnsr.jxfpTjxx.uuid;

    ybnsr.jxfpGrid.load(param, function (data) {
        var jxfpArr = [];
        if (data.result.value) {
            jxfpArr = data.result.value.sgGjMx;
            ybnsr.jxfpGjHj(jxfpArr);
        } else {
            jxfpArr = [];
            ybnsr.jxfpGjHj(jxfpArr);
        }
    }, function (data) {
        var result = mini.decode(data.errorMsg);
        if (result.message === "ajaxSessionTimeOut") {
            top.location.reload();
            return;
        }
        mini.alert(result.message);
    });
    scrollTo(0, 0);
    ybnsr.jxfpWin.show();
};


/*销项发票手工归集--征收项目和计税方式必填-校验*/
ybnsr.xxfpValidate = function (xxfpArr) {
    for (var i = 0, len = xxfpArr.length; i < len; i++) {
        if (!xxfpArr[i].jsfsId || !xxfpArr[i].zzszsxmId) {
            return false;
        }
    }
    return true;
};

//销项发票表格-税率、计税方式、征收项目校验
ybnsr.xxfpGridValidate = function (e) {
    var record = e.record;
    var ybjsSl = ["0.17", "0.13", "0.11"];
    var jyjsSl = ["0.05", "0.04", "0.03"];


    /*if(e.field === "jsfsId" && record.sl){
        if(ybjsSl.indexOf(record.sl)>=0 && (e.value!="1")){
            e.isValid = false;
            e.errorText = "当前税率为"+record.sl+",请选择一般计税方式";
            mini.alert("当前税率为"+record.sl+",请选择一般计税方式");
        }else if(jyjsSl.indexOf(record.sl) >=0 && (e.value != "2")){
            e.isValid = false;
            e.errorText = "当前税率为"+record.sl+",请选择简易计税方式";
            mini.alert("当前税率为"+record.sl+",请选择简易计税方式");
        }else if(record.sl == "0.06" && e.value ==="3"){
            e.isValid = false;
            e.errorText = "当前税率为"+record.sl+",请选择简易计税方式或一般计税方式";
            mini.alert("当前税率为"+record.sl+",请选择简易计税方式或一般计税方式");
        }else if(record.sl == "0" && (e.value != "0")){
            e.isValid = false;
            e.errorText = "当前税率为"+record.sl+",请选择免税";
            mini.alert("当前税率为"+record.sl+",请选择免税");
        }else{
            e.isValid = true;
        }
    }*/
    if (e.field === "zzszsxmId") {
        if (!e.value) {
            return;
        }
        if (record.jsfsId === "1" && record.sl === "0.13" && e.value === "3") {
            e.isValid = false;
            e.errorText = "计税方式是一般计税，税率是0.13，征收项目只能选择应税货物或应税劳务";
        } else if (record.jsfsId === "1" && record.sl === "0.06" && e.value != "3") {
            e.isValid = false;
            e.errorText = "计税方式是一般计税，税率是0.06，征收项目只能应税服务、不动产或无形资产";
        } else if (record.jsfsId === "2" && record.sl === "0.06" && e.value == "3") {
            e.isValid = false;
            e.errorText = "计税方式是简易计税，税率是0.06，征收项目只能选择应税货物或应税劳务";
        } else {
            e.isValid = true;
        }
    }
};

/*销项发票手工归集*/
ybnsr.onxxfpSggjCellCommitEdit = function (e) {
    var record = e.record;
    var ybjsSl = ["0.17", "0.13", "0.11"];
    var jyjsSl = ["0.05", "0.04", "0.03"];

    if (!e.value) {
        return;
    }
    if (e.field === "jsfsId" && record.sl) {
        if (ybjsSl.indexOf(record.sl) >= 0 && (e.value != "1")) {
            /* ybnsr.xxfpGrid.updateRow(record, {
                 jsfsId : '',
                 jsfs : ''
             });*/
            mini.alert("当前税率为 " + record.sl + ",请选择一般计税方式");

            e.cancel = true;
        } else if (jyjsSl.indexOf(record.sl) >= 0 && (e.value != "2")) {

            mini.alert("当前税率为 " + record.sl + "，请选择简易计税");
            e.cancel = true;
        } else if (record.sl == "0.06" && e.value === "3") {

            mini.alert("当前税率为 " + record.sl + "，请选择一般计税或简易计税");
            e.cancel = true;
        } else if (record.sl == "0" && (e.value != "0")) {
            mini.alert("当前税率为 " + record.sl + "，请选择免税");
            e.cancel = true;
        }
    }
};

/*销项发票-手工归集-保存*/
ybnsr.xxfpSave = function () {
    var xxfpArr = ybnsr.xxfpGrid.getSelecteds();
    if (xxfpArr.length <= 0) {
        mini.alert('请选择一条要保存的数据');
        return false;
    }
    if (!ybnsr.xxfpValidate(xxfpArr)) {
        mini.alert("选中的数据中，还有征收项目或者计价方式未选择，请选择后再保存");
        return false;
    }
    ybnsr.xxfpGrid.validate();
    if (!ybnsr.xxfpGrid.isValid()) {
        return false;
    }

    var sgGjMxObj = {
        sgGjMx: ybnsr.xxfpGrid.getData()
    };
    var param = {
        uuid: ybnsr.xxfpTjxx.uuid,
        gjxx: mini.encode(sgGjMxObj)
    };

    var xxfpSggjData = ybnsr.xxfpSaveData(xxfpArr);
    var xxfpGj = ybnsr.xxfpArr.concat(xxfpSggjData);

    ybnsr.allXxfp = mini.clone(xxfpGj);

    ybnsr.renderXxfpData(xxfpGj, false);

    /*考虑到先新增开具发票 然后在归集，开具发票的数据会覆盖，所以归集的时候在将开具的数据渲染一下*/
    if (ybnsr.wkjfp.length > 0) {
        ybnsr.renderXxfpData(ybnsr.wkjfp, true);
        ybnsr.initAllFpxx();
    }

    /*发请求请求*/
    ybnsrService.saveXxfpGj(mini.encode(param), function (result) {
        if (result.success) {
            ybnsr.xxfpWin.hide();
        } else {
            mini.alert(result.message);
        }

    });
};


ybnsr.jxfpGjHj = function (jxfpArr) {
    var fs = jxfpArr.length;
    var je = 0;
    var se = 0;
    $.each(jxfpArr, function (i, item) {
        je += Number(item.je);
        se += Number(item.se);
    });

    $("#jxfp-zfs").html(fs);
    $("#jxfp-zje").html(je.toFixed(2));
    $("#jxfp-zse").html(se.toFixed(2));
};

/*进项发票手工归集，加载前*/
ybnsr.jxfpgjBeforeload = function (e) {
    e.contentType = "application/json;charset=utf-8";
    e.data = mini.encode(e.data);
};

/*进项发票明细-翻页的时候*/
ybnsr.jxfpmxPagechanged = function (e) {
    var dataChanged = ybnsr.jxfpFpmxGrid.getChanges();
    if (dataChanged.length > 0) {
        ybnsr.saveJxfpmxAjax();
    }
};

/*进项发票明细-加载前*/
ybnsr.jxfpmxBeforeload = function (e) {
    e.contentType = "application/json;charset=utf-8";
    e.data.pageNum = e.data.pageSize;
    e.data.pageUrl = Number(e.data.pageIndex) + 1;
    e.data = mini.encode(e.data);
};
/*进项发票明细-查询*/
ybnsr.jxfpSearch = function () {
    var formData = ybnsr.jxfpForm.getData(true);
    ybnsr.jxfpFpmxGrid.setUrl('../../../api/sb/fpxxtq/queryJxfpMx.ashx');

    var dataChanged = ybnsr.jxfpFpmxGrid.getChanges();
    if (dataChanged.length > 0) {
        mini.confirm('您修改了表格中的数据，是否需要保存？', '提示', function (action) {
            if (action == "ok") {
                ybnsr.saveJxfpmxAjax();
                ybnsr.jxfpmxSearch(formData);
            } else {
                ybnsr.jxfpmxSearch(formData);
            }
        });
        return;
    }

    ybnsr.jxfpmxSearch(formData);

};

ybnsr.jxfpmxSearch = function (formData) {
    formData.sssq = ybnsr.sssq;
    formData.nsqxDm = ybnsr.jxfpTjxx.nsqxDm;
    formData.uuid = ybnsr.jxfpTjxx.uuid;
    formData.sbzlDm = ybnsr.sbzlDm;

    ybnsr.jxfpFpmxGrid.load(formData, function (data) {

    }, function (data) {
        var result = mini.decode(data.errorMsg);
        if (result.message === "ajaxSessionTimeOut") {
            top.location.reload();
            return;
        }
        mini.alert(result.message);
    });
    ybnsr.jxfpmxRenderHj(ybnsr.jxfpTjxx, true);
};


/*进项发票明细 保存*/
ybnsr.jxfpmxSave = function () {
    ybnsr.jxfpFpmxGrid.commitEdit();
    var changedData = ybnsr.jxfpFpmxGrid.getChanges();
    if (changedData.length > 0) {
        var saveSuccess = ybnsr.saveJxfpmxAjax();
        if (saveSuccess) {
            ybnsr.getdkxx();
        }
    } else {
        ybnsr.getdkxx();
    }
};

/*保存发票明细-请求*/
ybnsr.saveJxfpmxAjax = function () {
    var saveSuccess = false;
    var param = {
        uuid: ybnsr.jxfpTjxx.uuid,
        mxxx: mini.encode(ybnsr.jxfpFpmxGrid.getChanges())
    };
    ybnsrService.saveJxfpmx(mini.encode(param), function (data) {
        if (data.success) {
            saveSuccess = true;
        } else {
            mini.alert(data.message);
        }
    });

    return saveSuccess;
};

/*进项发票明细 取消*/
ybnsr.jxfpmxCancle = function () {
    ybnsr.jxfpFpmxWin.hide();
};

ybnsr.jxfpmxRenderHj = function (jxfpTjxx, fpmx) {
    debugger;
    if (fpmx) {
        $("#jxfp-fpmx-fs").html(jxfpTjxx.hzfs);
        $("#jxfp-fpmx-je").html(jxfpTjxx.hzje);
        $("#jxfp-fpmx-se").html(jxfpTjxx.hzse);
    } else {
        $("#jxfp-fs").html(jxfpTjxx.hzfs);
        $("#jxfp-je").html(jxfpTjxx.hzje);
        $("#jxfp-se").html(jxfpTjxx.hzse);
    }

};

/*进项发票-重置*/
ybnsr.jxfpClear = function () {
    ybnsr.jxfpForm.clear();
};

/*进项发票批量抵扣*/
ybnsr.pldk = function () {
    $(".dklxList").show();
};
ybnsr.setPldk = function () {
    var dkObj = {
        'N': '是',
        'Y': '否'
    };
    $(".dklxList").hide();
    var dataSelected = ybnsr.jxfpFpmxGrid.getSelecteds();
    if (dataSelected.length <= 0) {
        mini.alert('请选择至少一条发票数据');
        return;
    }
    var dkLx = $(this).attr('data-type');
    $.each(dataSelected, function (i, item) {
        item.sfdk = dkLx;
        item.sfdkMC = dkObj[dkLx];
        var row = ybnsr.jxfpFpmxGrid.getRowByUID(item._uid);
        //ybnsr.jxfpFpmxGrid.beginEditRow(row);
        if (row) {
            ybnsr.jxfpFpmxGrid.cancelEdit();
            ybnsr.jxfpFpmxGrid.updateRow(row, { ddkbz: dkLx, sfdkMC: dkObj[dkLx] });
        }

        //ybnsr.jxfpFpmxGrid.cancelEditRow(row);
    });
    //ybnsr.jxfpFpmxGrid.commitEdit();
};


/*进项发票-手工归集-保存*/
ybnsr.jxfpSave = function () {
    var jxfpData = ybnsr.jxfpGrid.getSelecteds();
    if (jxfpData.length <= 0) {
        mini.alert("请先选择至少一条要保存的数据");
        return false;
    }
    if (!ybnsr.jxfpGridrValidate(jxfpData)) {
        mini.alert("选中的数据中未选择进项归集，请选择后再保存");
        return false;
    }
    var jxfpsAll = [];

    var jxgjHz = ybnsr.jxFpsArr.concat(jxfpData);
    ybnsr.rendeJxfpHz(jxgjHz);

    /*保存进项发票手工归集*/
    var gjxx = {
        sgGjMx: ybnsr.jxfpGrid.getData()
    };
    var param = {
        uuid: ybnsr.jxfpTjxx.uuid,
        gjxx: mini.encode(gjxx)
    };
    ybnsrService.saveJXfpgjxx(mini.encode(param), function (data) {
        if (data.success) {
            ybnsr.jxfpWin.hide();
        } else {
            mini.alert(data.message);
        }
    });
};


/*进项发票-取消*/
ybnsr.jxfpCancel = function () {
    ybnsr.jxfpWin.hide();
};

//被选中的的进项发票-进项归集-必填校验
ybnsr.jxfpGridrValidate = function (data) {
    var isValidate = true;
    for (var i = 0, len = data.length; i < len; i++) {
        if (!data[i].jxgjId || (data[i].jxgjId == "00")) {
            isValidate = false;
            return isValidate;
        }
    }
    return isValidate;
};

/*明细以及手工归集 发票类别*/
ybnsr.onfplbRenderer = function (e) {
    var record = e.record;
    var fpblMc = ybnsr.fplbObj[record.fpLb] || '';
    var html = "<span>" + fpblMc + "</span>";
    return html;
};
/*进项归集*/
ybnsr.onjxgjRenderer = function (e) {
    var record = e.record;
    var jxfjMC = ybnsr.jxgjObj[record.jxgjId] || '';
    var html = "<span>" + jxfjMC + "</span>";
    return html;
};

//是否抵扣
/*ybnsr.onsfdkRenderer = function (e) {
    console.log(e);
};*/

//获取抵扣情况
ybnsr.getdkxx = function () {
    var param = {
        uuid: ybnsr.jxfpTjxx.uuid
    };
    ybnsrService.getDkxx(mini.encode(param), function (result) {
        if (result.success) {
            ybnsr.jxfpFpmxWin.hide();
            var dkData = ybnsr.gldkxx(result.value);
            for (var i in dkData) {
                for (var j in dkData[i]) {
                    for (var h in dkData[i][j]) {
                        mini.get(i + "-" + j + "-" + h).setValue(dkData[i][j][h]);
                    }
                }
            }
        } else {
            mini.alert(result.message);
        }
    });
};

//过滤一下抵扣data 将hgpxx下面的hgpxx 信息初始化一下
ybnsr.gldkxx = function (dkData) {
    var obj = {
        ddk: {
            hgpxx: {
                fs: dkData.ddk.hgpxx ? dkData.ddk.hgpxx.fs : 0,
                je: dkData.ddk.hgpxx ? dkData.ddk.hgpxx.je : 0,
                se: dkData.ddk.hgpxx ? dkData.ddk.hgpxx.se : 0
            },
            zyfpxx: {
                fs: dkData.ddk.zyfpxx ? dkData.ddk.zyfpxx.fs : 0,
                je: dkData.ddk.zyfpxx ? dkData.ddk.zyfpxx.je : 0,
                se: dkData.ddk.zyfpxx ? dkData.ddk.zyfpxx.se : 0
            }
        },
        dk: {
            hgpxx: {
                fs: dkData.dk.hgpxx ? dkData.dk.hgpxx.fs : 0,
                je: dkData.dk.hgpxx ? dkData.dk.hgpxx.je : 0,
                se: dkData.dk.hgpxx ? dkData.dk.hgpxx.se : 0
            },
            zyfpxx: {
                fs: dkData.dk.zyfpxx ? dkData.dk.zyfpxx.fs : 0,
                je: dkData.dk.zyfpxx ? dkData.dk.zyfpxx.je : 0,
                se: dkData.dk.zyfpxx ? dkData.dk.zyfpxx.se : 0
            }
        }
    };

    return obj;

};


/*渲染作废标志*/
ybnsr.zfbzRender = function (e) {
    var record = e.record;
    var zfbzMc = ybnsr.zfbzObj[record.zfbz] || '';
    var html = "<span>" + zfbzMc + "</span>";
    return html;
};
/*组织主表的数据*/
ybnsr.generatezbData = function () {
    var xxfpData = ybnsr.allXxfp.concat(ybnsr.wkjfp);
    var zbYshwXse = 0;
    /*主表-应税货物-销售额*/
    var zbYslwXse = 0;
    /*主表-应税劳务-销售额*/
    var zbMshwXse = 0;
    /*主表-免税货物-销售额*/
    var zbMsLwXse = 0;
    /*主表-免税劳务-销售额*/

    $.each(xxfpData, function (i, item) {

        if (item.jsfsId === "1" && ybnsr.zzxmObj[item.zzszsxmId] === "yshw") {
            /*一般计税-劳务-专票+其他+未开具*/
            zbYshwXse += Number(item.je);

        } else if (item.jsfsId === "1" && ybnsr.zzxmObj[item.zzszsxmId] === "yslw") {
            /* [销项发票][非作废][一般计税][劳务]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbYslwXse += Number(item.je);

        } else if (item.jsfsId === "3" && ybnsr.zzxmObj[item.zzszsxmId] === "yshw") {
            /*统计[销项发票][非作废][货物][免税]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbMshwXse += Number(item.je);

        } else if (item.jsfsId === "3" && ybnsr.zzxmObj[item.zzszsxmId] === "yslw") {
            /*自动取值（发票明细）:统计[销项发票][非作废][劳务][免税]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbMsLwXse += Number(item.je);
        }
    });

    var zbObj = {
        "7_0": zbYshwXse || 0,//1. 自动取值（发票明细）:统计 [销项发票][一般计税][货物]增值税专票、开具其他发票、未开发票的金额之和;
        "8_0": zbYslwXse || 0,//1. 自动取值（发票明细）:统计[销项发票][非作废][一般计税][劳务]增值税专票、开具其他发票、未开发票的金额之和;
        "14_0": zbMshwXse || 0,//1. 自动取值（发票明细）:统计[销项发票][非作废][货物][免税]增值税专票、开具其他发票、未开发票的金额之和;
        "15_0": zbMsLwXse || 0 //1. 自动取值（发票明细）:统计[销项发票][非作废][劳务][免税]增值税专票、开具其他发票、未开发票的金额之和;
    };
    return zbObj;
};

/*生成一般纳税人申报表*/
ybnsr.generateYbnsrSbb = function () {
    var data = ybnsr.generatezbData();
    var sbbData = {
        bqxsmx: ybnsr.bqxsmxForm.getData(),
        bqdkjxsejgmx: ybnsr.bqdkjxsejgmxForm.getData(),
        bqjxsemx: ybnsr.bqjxsemxForm.getData(),
        zzsnssbb: data

    };
    store.setSession('outerYbjcData', sbbData);
    // 先发一个请求判断登录超时，方便超时的时候重定向到 一表集成的页面
    var nsrxx = nsrxxUtil.getUserInfo();
    if (!!nsrxx) {
        window.location.href = '/sbzx-web/apps/views/sb_ybnsr/sb_ybnsr.html?sbzlDm=' + ybnsr.sbzlDm + '&needOuterYbjc=Y';

    }
};


stepNav.run = function () {
    stepNav.initSteps([{ id: '0', title: '发票信息采集', url: 'txfpxxView.aspx' }]);

    mini.parse();

    ybnsr.$xxfpSggjTr = $('#xxfp-sggj');
    ybnsr.$jxfpSggjTr = $('#jxfp-sggj');
    ybnsr.$xxfpSggjFs = $('#xxfp-sggj-fs');
    ybnsr.$jxfpSggjFs = $('#jxfp-sggj-fs');
    ybnsr.$xxfpSggjBtn = $('#xxfp-sggj-btn');
    ybnsr.$xxfpXmmxBtn = $('#xxfp-xxmxcx-btn');
    ybnsr.$xxfpWkjfpBtn = $('#xxfp-wkjfp-btn');


    ybnsr.$jxfpMxcxBtn = $("#jxfp-xxmxcx-btn");
    ybnsr.$jxfpSggjBtn = $('#jxfp-sggj-btn');
    debugger;
    ybnsr.$generateSbbBtn = $('#generate-btn');
    ybnsr.$cancelBtn = $('#cancel-btn');

    ybnsr.dklxList = $('.dklxList li');

    ybnsr.xxmxWin = mini.get("xxfp-xxmx-win");
    ybnsr.wkjfpWin = mini.get("xxfp-wkjfp-win");
    ybnsr.xxfpWin = mini.get('xxfp-add-win');
    ybnsr.jxfpWin = mini.get('jxfp-add-win');
    ybnsr.jxfpFpmxWin = mini.get('jxfp-mxcx-win');


    ybnsr.xxfpGrid = mini.get('xxfp-grid');
    ybnsr.jxfpGrid = mini.get('jxfp-grid');
    ybnsr.xxmxGrid = mini.get('xxmx-grid');
    ybnsr.xxmxGrid = mini.get("xxmx-grid");
    ybnsr.wkjfpGrid = mini.get("wkjfp-grid");
    ybnsr.jxfpFpmxGrid = mini.get("jxfp-fpmx-grid");

    ybnsr.xxmxForm = new mini.Form("xxmx-form");

    ybnsr.jxfpForm = new mini.Form("jxfp-form");


    ybnsr.xxmxSearchBtn = mini.get("xxmx-search-btn");
    ybnsr.xxmxClearBtn = mini.get("xxmx-clear-btn");


    ybnsr.jxfpSearchBtn = mini.get("jxfp-search-btn");
    ybnsr.jxfpClearBtn = mini.get("jxfp-clear-btn");


    ybnsr.wkjfpSaveBtn = mini.get('wkjfp-save-btn');
    ybnsr.wkjfpCancelBtn = mini.get('wkjfp-cancel-btn');
    ybnsr.xxfpSaveBtn = mini.get('xxfp-save-btn');
    ybnsr.xxfpCancelBtn = mini.get('xxfp-cancel-btn');
    ybnsr.jxfpSaveBtn = mini.get('jxfp-save-btn');
    ybnsr.jxfpCancelBtn = mini.get('jxfp-cancel-btn');
    ybnsr.jkfpPldkBtn = mini.get("jxfp-pldk-btn");

    ybnsr.jxfpmxSaveBtn = mini.get("jxfpmx-save-btn");
    ybnsr.jxfpmxCancleBtn = mini.get("jxfpmx-cancel-btn");


    ybnsr.bqxsmxForm = new mini.Form('#bqxsmx');
    ybnsr.bqdkjxsejgmxForm = new mini.Form('#bqdkjxsejgmx');
    ybnsr.bqjxsemxForm = new mini.Form('#bqjxsemx');

    ybnsr.zfbzObj = {
        "Y": "是",
        "N": '否'
    };

    ybnsr.slOrzsl = [
        { "ID": '0.17', MC: '17%' },
        { "ID": '0.13', MC: '13%' },
        { "ID": '0.11', MC: '11%' },
        { "ID": '0.06', MC: '6%' },
        { "ID": '0.05', MC: '5%' },
        { "ID": '0.04', MC: '4%' },
        { "ID": '0.03', MC: '3%' },
        { "ID": '0', MC: '0%' }
    ];

    ybnsr.jsfsmxGridData = [
        { "ID": '1', MC: '一般计税' },
        { "ID": '2', MC: '简易计税' },
        { "ID": '3', MC: '免税' }
    ];

    /*表格中用到的征收项目*/
    ybnsr.zzxmGridData = [
        { "ID": '1', "MC": '应税货物' },
        { "ID": '2', "MC": '应税劳务' },
        { "ID": '3', "MC": '应税服务、不动产或无形资产' },
        { "ID": '4', "MC": '应税服务、不动产或无形资产' },
        { "ID": '5', "MC": '应税服务、不动产或无形资产' }
    ];
    /*下拉选择框用到的征收项目*/
    ybnsr.zzxmData = [
        { "ID": '', "MC": '全部' },
        { "ID": '1', "MC": '应税货物' },
        { "ID": '2', "MC": '应税劳务' },
        { "ID": '3', "MC": '应税服务、不动产或无形资产' }
    ];
    ybnsr.zzxmObj = {
        "1": 'yshw',
        "2": 'yslw',
        "3": 'ysfw',
        "4": 'ysfw',
        "5": 'ysfw'
    };
    ybnsr.jsfsObj = {
        "1": 'ybjs',
        "2": 'jyjs',
        "3": 'ms'
    };
    ybnsr.fplbObj = {
        "1": '增值税专用发票',
        "2": '增值税普通发票',
        "3": '卷式发票',
        "4": '电子发票',
        "5": '机动车统一发票',
        "6": '农产品',
        "7": '海关发票',
        "8": '其他'
    };

    ybnsr.fplbData = [
        { "ID": '1', "MC": '增值税专用发票' },
        { "ID": '2', "MC": '增值税普通发票' },
        { "ID": '3', "MC": '卷式发票' },
        { "ID": '4', "MC": '电子发票' },
        { "ID": '5', "MC": '机动车统一发票' },
        { "ID": '6', "MC": '农产品' },
        { "ID": '7', "MC": '海关发票' },
        { "ID": '8', "MC": '其他' }
    ];

    ybnsr.sfdkData = [
        { "ID": 'N', "MC": '是' },
        { "ID": 'Y', "MC": '否' }
    ];
    /*表格中的下拉框用到的*/
    ybnsr.jxgjGridData = [
        { "ID": '01', "MC": '有形动产租赁' },
        { "ID": '02', "MC": '运输服务' },
        { "ID": '03', "MC": '电信服务' },
        { "ID": '04', "MC": '建筑安装服务' },
        { "ID": '05', "MC": '不动产租赁服务' },
        { "ID": '06', "MC": '受让土地使用权' },
        { "ID": '07', "MC": '金融保险服务' },
        { "ID": '08', "MC": '生活服务' },
        { "ID": '09', "MC": '无形资产' },
        { "ID": '10', "MC": '货物及加工、修理修配劳务' }
    ];
    ybnsr.jxgjFormData = [
        { "ID": '', "MC": '全部' },
        { "ID": '01', "MC": '有形动产租赁' },
        { "ID": '02', "MC": '运输服务' },
        { "ID": '03', "MC": '电信服务' },
        { "ID": '04', "MC": '建筑安装服务' },
        { "ID": '05', "MC": '不动产租赁服务' },
        { "ID": '06', "MC": '受让土地使用权' },
        { "ID": '07', "MC": '金融保险服务' },
        { "ID": '08', "MC": '生活服务' },
        { "ID": '09', "MC": '无形资产' },
        { "ID": '10', "MC": '货物及加工、修理修配劳务' }
    ];

    ybnsr.jxgjObj = {
        "01": '有形动产租赁',
        "02": '运输服务',
        "03": '电信服务',
        "04": '建筑安装服务',
        "05": '不动产租赁服务',
        "06": '受让土地使用权',
        "07": '金融保险服务',
        "08": '生活服务',
        "09": '无形资产',
        "10": '货物及加工、修理修配劳务'
    };

    ybnsr.jxfplxObj = {
        "01": 'yxdc',
        "02": 'ysfw',
        "03": 'dxfw',
        "04": 'jzazfw',
        "05": 'bdcfw',
        "06": 'srtdsyq',
        "07": 'jrbxfw',
        "08": 'shfw',
        "09": 'wxzc',
        "10": 'hwjg'
    };
    ybnsr.nsrxxVo = nsrxxUtil.getNsrxxVO();
    // 延迟初始化，显示遮罩
    mini.mask('正在获取核定信息，请稍候...');
    setTimeout(function () {
        ybnsr.queryYcfp();
        // 先获取核定信息，设置sbzlDm
        var hdxx = ybnsr.initHdxx();
        if (!hdxx) {
            mini.unmask();
            return false;
        }
        if (ybnsr.isRepeatSb(ybnsr.sbzlDm)) {
            return;
        }
        ybnsr.initCombData();
        //ybnsr.initXxfpCombData();
        ybnsr.initFpData();
        ybnsr.bindEvent();
    }, 300);

};
ybnsr.isRepeatSb = function (sbzlDm) {
    var result = false;
    ajax.post('/sbzx-web/api/hb/sb/common/validateCfsb.ashx', mini.encode({ sbzlDm: sbzlDm }), function (response) {
        if (!response.success) {
            mini.alert(response.message, '提示', function () {
                window.close();
            });
            result = true;
        }
    }, function (response) {
        mini.alert('服务异常！');
    });
    return result;
};
// 查询异常发票
ybnsr.queryYcfp = function () {
    var params = {
        djxh: ybnsr.nsrxxVo.djxh,
        kpyf: hdxxUtil.getSbny()
    };
    ajax.post('/sbzx-web/api/sb/fpxxtq/getYcfpxx.ashx', mini.encode(params), function (data) {
        if (!!data.success && !!data.value) {
            var result = data.value;
            var $ycfxtx = $('#yccfxtx');
            if (result.skfp.length > 0) {
                mini.get('skfp-grid').setData(result.skfp);
                $ycfxtx.is(':hidden') && $ycfxtx.show();
            } else {
                $('#skfp').hide();
            }
            if (result.zffp.length > 0) {
                mini.get('zffp-grid').setData(result.zffp);
                $ycfxtx.is(':hidden') && $ycfxtx.show();
            } else {
                $('#zffp').hide();
            }
            if (result.hzfp.length > 0) {
                mini.get('hzfp-grid').setData(result.hzfp);
                $ycfxtx.is(':hidden') && $ycfxtx.show();
            } else {
                $('#hzfp').hide();
            }
        }
    })
};

//获取核定信息
ybnsr.initHdxx = function () {
    var hdxx = store.getLocal('hdxxData');
    if (!!hdxx) {
        mini.unmask();
        //增加 代码 成功的逻辑处理
        var hdxxData = hdxx;
        ybnsr.skssqq = hdxxData.HdxxResponseVo.QSSJ;
        ybnsr.skssqz = hdxxData.HdxxResponseVo.JZSJ;
        var sbzlArray = ['10101', '10110'];
        ybnsr.sbzlNode = ybnsr.isExsitSbzlHdxx(sbzlArray, hdxxData);
        // 校验核定内的相关资格
        ybnsr.sbzlDm = ybnsr.checkHd(ybnsr.sbzlNode);
        ybnsr.SZLBDM = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'SZLBDM');
        ybnsr.JYZSBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'JYZSBZ');
        ybnsr.YQWRDBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'YQWRDBZ');

        return hdxx;
    }
    var param = {
        djxh: ybnsr.nsrxxVo.djxh,
        sbny: hdxxUtil.getSbny()
    };
    $.ajax({
        url: "/sb/sbcommon_getHdxx.ashx",
        type: "post",
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: param,
        success: function (data) {
            var result = mini.decode(data);
            if (!data.success) {
                hdxx = null;
                mini.unmask();
                mini.alert(data.message, '提示', function () {
                    window.close();
                });
                return false;
            }
            if (!!result.data) {
                var hdxxData = result.data;

                ybnsr.skssqq = hdxxData.HdxxResponseVo.QSSJ;
                ybnsr.skssqz = hdxxData.HdxxResponseVo.JZSJ;
                var sbzlArray = ['10101', '10110'];
                ybnsr.sbzlNode = ybnsr.isExsitSbzlHdxx(sbzlArray, hdxxData);
                // 校验核定内的相关资格
                ybnsr.sbzlDm = ybnsr.checkHd(ybnsr.sbzlNode);
                if (!ybnsr.sbzlDm) {
                    hdxx = null;
                    mini.unmask();
                    return false;
                }
                store.setLocal('hdxxData', hdxxData); // 做local缓存
                //重复申报校验
                if(!ybnsr.checkCfsb()){
                    hdxx = null;
                    mini.unmask();
                    return false;
                }
                ybnsr.SZLBDM = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'SZLBDM');
                ybnsr.JYZSBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'JYZSBZ');
                ybnsr.YQWRDBZ = ybnsr.getWsxxValueByCode(ybnsr.sbzlNode, 'YQWRDBZ');
                hdxx = hdxx || hdxxData;
            }
            mini.unmask();
        },
        error: function () {
            hdxx = null;
            mini.unmask();
            mini.alert("核定信息查询出错！", '提示', function () {
                window.close();
            });
        }
    });
    return hdxx;
};

//进项发票合计计算
ybnsr.jxfpCount = function (jxfpsAll) {
    var obj = {
        '17_je': '3_2',
        '17_se': '3_3',
        '13_je': '5_2',
        '13_se': '5_3',
        '11_je': '6_2',
        '11_se': '6_3',
        '6_je': '12_2',
        '6_se': '12_3',
        '5_je': '17_2',
        '5_se': '17_3',
        '3_je': '19_2',
        '3_se': '19_3'
    };
    var hjObj = {};

    $.each(jxfpsAll, function (i, item) {
        var jxfllxId = ybnsr.jxfplxObj[item.jxfllxid] || ybnsr.jxfplxObj[item.jxgjId];
        if (jxfllxId) {
            var jeKey = Number(item.sl) * 100 + '_je';
            var seKey = Number(item.sl) * 100 + '_se';
            var jeField = obj[jeKey];
            var seField = obj[seKey];
            if ((!hjObj[jeField]) || (!hjObj[seField])) {
                hjObj[jeField] = 0;
                hjObj[seField] = 0;
            }

            hjObj[jeField] += Number(item.je);
            hjObj[seField] += Number(item.se);
        }
    });
    for (var i in hjObj) {
        $("#jxhj_" + i).find(".mini-textbox-input").attr('title', Number(hjObj[i]).toFixed(2));
    }
    ybnsr.bqdkjxsejgmxForm.setData(hjObj);

};

/*组织主表的数据*/
ybnsr.generatezbData = function () {
    var xxfpData = ybnsr.allXxfp.concat(ybnsr.wkjfp);
    var zbYshwXse = 0;
    /*主表-应税货物-销售额*/
    var zbYslwXse = 0;
    /*主表-应税劳务-销售额*/
    var zbMshwXse = 0;
    /*主表-免税货物-销售额*/
    var zbMsLwXse = 0;
    /*主表-免税劳务-销售额*/

    $.each(xxfpData, function (i, item) {

        if (item.jsfsId === "1" && ybnsr.zzxmObj[item.zzszsxmId] === "yshw") {
            /*一般计税-劳务-专票+其他+未开具*/
            zbYshwXse += Number(item.je);

        } else if (item.jsfsId === "1" && ybnsr.zzxmObj[item.zzszsxmId] === "yslw") {
            /* [销项发票][非作废][一般计税][劳务]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbYslwXse += Number(item.je);

        } else if (item.jsfsId === "3" && ybnsr.zzxmObj[item.zzszsxmId] === "yshw") {
            /*统计[销项发票][非作废][货物][免税]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbMshwXse += Number(item.je);

        } else if (item.jsfsId === "3" && ybnsr.zzxmObj[item.zzszsxmId] === "yslw") {
            /*自动取值（发票明细）:统计[销项发票][非作废][劳务][免税]增值税专票、开具其他发票、未开发票的金额之和;*/
            zbMsLwXse += Number(item.je);
        }
    });

    var zbObj = {
        "1_2": zbYshwXse || 0,//1. 自动取值（发票明细）:统计 [销项发票][一般计税][货物]增值税专票、开具其他发票、未开发票的金额之和;
        "2_2": zbYslwXse || 0,//1. 自动取值（发票明细）:统计[销项发票][非作废][一般计税][劳务]增值税专票、开具其他发票、未开发票的金额之和;
        "8_2": zbMshwXse || 0,//1. 自动取值（发票明细）:统计[销项发票][非作废][货物][免税]增值税专票、开具其他发票、未开发票的金额之和;
        "9_2": zbMsLwXse || 0 //1. 自动取值（发票明细）:统计[销项发票][非作废][劳务][免税]增值税专票、开具其他发票、未开发票的金额之和;
    };
    return zbObj;

};

/*生成一般纳税人申报表*/
ybnsr.generateYbnsrSbb = function () {
    var data = ybnsr.generatezbData();
    var sbbData = {
        bqxsmx: ybnsr.bqxsmxForm.getData(),
        bqdkjxsejgmx: ybnsr.bqdkjxsejgmxForm.getData(),
        bqjxsemx: ybnsr.bqjxsemxForm.getData(),
        zzsnssbb: data

    };
    store.setSession('ybjcData', sbbData);
    // 先发一个请求判断登录超时，方便超时的时候重定向到 一表集成的页面
    var nsrxx = nsrxxUtil.getUserInfo();
    if (!!nsrxx) {
        if (ybnsr.YQWRDBZ == '1') {
            //window.location.href = '../xgmyqwrd/sb_ybnsrsb.html?'+sbzlDm;
            window.location.href = '/BsfwtWeb/pages/sb/xgmyqwrd/sb_ybnsrsb.html?' + ybnsr.sbzlDm;
        }
        if (ybnsr.YQWRDBZ == '0') {
            window.location.href = '/BsfwtWeb/pages/sb/ybnsrsb/sb_ybnsrsb.aspx?' + ybnsr.sbzlDm;
        }
    }
};

ybnsr.initFpData = function () {
    /*销项发票所有的td都隐藏*/
    $("#bqxsmx tbody td").hide();
    /*进项发票*/
    $("#bqdkjxsejgmx tbody tr").hide();
    $('#bqdkjxsejgmx .jxfp-hjxx').show();

    var param = {
        sssq: ybnsr.sssq,
        sbzlDm: ybnsr.sbzlDm
    };
    if (ybnsr.sbzlDm == false) {
        mini.unmask();
        return;
    }
    ybnsrService.getFphzxx(mini.encode(param), function (result) {
        if (result.success) {
            // 销项发票数据
            ybnsr.initXxfp(result.value.xxfpdata);
            // 进项发票数据
            ybnsr.initJxfp(result.value.jxfpdata);
        } else {
            mini.alert(result.message);
        }
    });
    mini.unmask();
};

ybnsr.openXxmxWin = function () {
    /*mini.get("xxmx-slOrzsl").setData(ybnsr.slOrzsl);
    mini.get("xxmx-zzxm").setData(ybnsr.zzxmData);
    mini.get("xxmx-zzxm").setValue('');*/
    mini.get('xxmx-fplb').setData(ybnsr.fplbData);
    scrollTo(0, 0);
    ybnsr.xxmxWin.show();
};
/*进项发票发票明细-打开弹框*/
ybnsr.openJxfpmxWin = function () {
    /*mini.get("jxfp-sl").setData(ybnsr.slOrzsl);*/
    //mini.get("jxfp-jxgj").setData(ybnsr.jxgjFormData);

    $(".dklxList").hide();

    /*默认选全部*/
    //mini.get("jxfp-jxgj").setValue('');
    mini.get('jxmx-fplb').setData(ybnsr.fplbData);
    var pldkBtnCtrl = mini.get("jxfp-pldk-btn");

    if (ybnsr.jxfpTjxx.fdqBz == "Y") {
        pldkBtnCtrl.setReadOnly(true);
    } else {
        pldkBtnCtrl.setReadOnly(false);
    }


    ybnsr.jxfpForm.clear();
    ybnsr.jxfpFpmxGrid.unmask();
    ybnsr.jxfpFpmxGrid.setData('');
    scrollTo(0, 0);
    ybnsr.jxfpFpmxWin.show();


};
ybnsr.onXxfpActionRenderer = function (e) {
    var rowIndex = e.rowIndex;
    return '<a href="javascript:ybnsr.showXxmxDetails(' + rowIndex + ')">详情</a>';
};
ybnsr.showXxmxDetails = function (rowIndex) {
    var datas = mini.get('xxmx-grid').getData();
    mini.get('xxfp-detail-win').show('center', '50px');
    var record = datas[rowIndex];
    var params = {
        fplb: record.fpLb,
        fpdm: record.fpdm,
        fphm: record.fphm
    };
    var grid = mini.get('xxmx-detail-grid');
    ajax.post('/sbzx-web/api/sb/fpxxtq/queryXxfpXq.ashx', JSON.stringify(params), function (data) {
        if (!!data.success && !!data.value) {
            grid.setData(data.value);
        }
    })
};
ybnsr.onJxfpActionRenderer = function (e) {
    var rowIndex = e.rowIndex;
    return '<a href="javascript:ybnsr.showJxmxDetails(' + rowIndex + ')">详情</a>';
};
ybnsr.showJxmxDetails = function (rowIndex) {
    var datas = mini.get('jxfp-fpmx-grid').getData();
    mini.get('jxfp-detail-win').show('center', '50px');
    var record = datas[rowIndex];
    var params = {
        fplb: record.fpLb,
        fpdm: record.fpdm,
        fphm: record.fphm
    };
    var grid = mini.get('jxfp-detail-grid');
    ajax.post('/sbzx-web/api/sb/fpxxtq/queryJxfpXq.ashx', JSON.stringify(params), function (data) {
        if (!!data.success && !!data.value) {
            grid.setData(data.value);
        }
    })
};

ybnsr.pldk = function () {
    $(".dklxList").slideToggle();
};

ybnsr.jxfpSearch = function () {
    var formData = ybnsr.jxfpForm.getData(true);
    formData.nsqxDm = ybnsr.jxfpTjxx.nsqxDm;
    formData.djxh = ybnsr.nsrxxVo.djxh;
    formData.sssq = ybnsr.sssq;
    formData.sbzlDm = ybnsr.sbzlDm;
    ybnsr.jxfpFpmxGrid.setUrl('../../../api/sb/fpxxtq/queryJxfpMx.ashx');
    ybnsr.jxfpFpmxGrid.load(formData, function (data) {

    }, function (data) {
        var result = mini.decode(data.errorMsg);
        if (result.message === "ajaxSessionTimeOut") {
            top.location.reload();
            return;
        }
        mini.alert(result.message);
    });

    var dataChanged = ybnsr.jxfpFpmxGrid.getChanges();
    if (dataChanged.length > 0) {
        mini.confirm('您修改了表格中的数据，是否需要保存？', '提示', function (action) {
            if (action === "ok") {
                ybnsr.saveJxfpmxAjax();
                ybnsr.jxfpmxSearch(formData);
            } else {
                ybnsr.jxfpmxSearch(formData);
            }
        });
        return;
    }

    ybnsr.jxfpmxSearch(formData);

};
