/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-06-19
 * Time: 17:57
 * Description:
 */

//var nsrData = {"nsrdzdah":null,"djxh":"10111302000016655004","nsrmc":"自动化测试用户一般增值税","nsrsbh":"113021821000004","nsrztDm":"03","nsrbm":null,"bhrq":null,"bsrmc":null,"csbzS":null,"csbzX":null,"dhhm":null,"djzclxDm":"190","dwxzDm":null,"gghbz":null,"gszgswjgJDm":"16301930400","zgswskfjDm":"11304069205","zgswskfjMc":"邯郸市峰峰矿区国家税务局稽查局局长室","hyDm":"6610","jdxzDm":"130521000","kyslrq":null,"lghbz":null,"lrrq":"2007-12-13 09:57:15","lrrDm":"11305000672","lsgxDm":null,"lsswdjlxDm":null,"nsrJcjgDm":null,"nsrSwjgDm":"16301930400","nsrZsjgDm":null,"scjydz":"邢台县南石门镇南岗西村村南","scjydYb":null,"kzztdjlxDm":"1110","swdjzhm":null,"swjgDm":"16301930400","wspzxh":null,"xgrq":"2014-09-15 15:30:03","xgrDm":"11305000529","zclxDm":null,"zgSwgyDm":null,"zjgBz":null,"zjhm":null,"zzjgDm":"669089609","jyfw":"许可经营项目：无**一般经营项目：五金、交电、涂料（不含危险化学品）、日用杂货（不含烟花爆竹）、建材（不含木材）、矿山专用配件的销售**","swjgMc":"青海省西宁市国家税务局第3稽查局检查一科","nsrflId":null,"djzclxMc":"其他企业","nsrlx":null,"hzdjrq":null,"hgdm":null,"sjgsdq":"11305211100","zcdz":"邢台县南石门镇南岗西村村南","hymc":"中央银行服务","scjydlxdh":"13131968169","zcdzxzqhszdm":"130500","scjydzxzqhszdm":"130500","pzsljglxdm":"01","pzsljgdm":"130426000","pzsljgmc":null,"fddbrmc":"范晶晶","frzjlxDm":"201","fddbrsfzjlxmc":"居民身份证","fddbrsfzjhm":"130503198201021863","fddbryddh":"13111111111","cwfzrxm":"齐新生","cwfzrsfzjzlDm":"201","cwfzrsfzjlxmc":"居民身份证","cwfzrsfzjhm":"130504195702231220","cwfzryddh":"13784139989","bsrxm":"齐新生","bsrsfzjzlDm":"201","bsrsfzjlxmc":"居民身份证","bsrsfzjhm":"130504195702231220","bsryddh":"13794139989","djrq":"2007-04-21 00:00:00.0","cyrs":"5","zczb":"500000","zzsqylxDm":"0","scjydyzbm":null,"dlrsf":"fr","zcdlxdh":null,"shxydm":"12"}
var pageUrl = window.location.href;
var isCorrect = false;
if (pageUrl.indexOf('correct=Y') !== -1) {
    isCorrect = true;
} var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlDm = pageUrl.split('?')[1].split('&')[0];
var skssq = getSssq(getSbny(), sbzlDm);
var tbrq = mini.formatDate(new Date(), "yyyy-MM-dd");

var _nsrsbh = nsrData.nsrsbh,
    _nsrmc = nsrData.nsrmc,
    _scjydz = nsrData.scjydz,
    _fddbrmc = nsrData.fddbrmc,
    _djzclxMc = nsrData.djzclxMc,
    _zcdz = nsrData.zcdz,
    _hymc = nsrData.hymc,
    _scjydlxdh = nsrData.scjydlxdh;

var ygzChanged, jmxmChanged, jsxmArr = [], msxmArr = [], jmSelects = '';
var is085Col7Col14 = false; // 提示性校验，营改增税负分析测算表合计行第7列如果大于14列的2倍，则提示，但是不阻断
var zb11hj = 0, zb19hj = 0; // 主表11栏1/3合计，主表19栏1/3合计
var Exist017 = false; // 085 测算表是否存在 17%，11% 6%
$(function () {

    mini.parse();

    //一表集成
    debugger;
    var ybjcData = window.sessionStorage.getItem('ybjcData');
    if (!!ybjcData) {
        ybjcData = mini.decode(ybjcData);

        var hdxxData = getHdxx();
        if (!hdxxData) {
            mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function () {
                window.close();
            });
            return;
        }
        var sbzlNode = isExsitSbzlHdxx(['10101', '10110'], hdxxData);
        if (!sbzlNode) {
            mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function () {
                window.close();
            });
            return;
        }
        sbzlDm = sbzlNode.SBZLCODE;
        HD = mini.decode(SUI.store.get('HDXX_10101') || SUI.store.get('HDXX_10110'));
        if (isCorrect) {
            HD = JSON.parse(SUI.store.getSession('gzxx')).hdxx;
        }
    }


    var has085 = false; // 核定SBBS中是否存在085 税负分析测算表
    var ysxmdmjmcList = [];// 营改增税负分析测算表 应税项目代码及名称 下拉框数据
    //假如获取 期初成功标志 为 N 则不让纳税人填写报表，直接弹出错误提示
    if (HD.QCCGBZ === 'N') {
        mini.alert(HD.QCCGBZMS, '提示信息', function () {
            window.close();
        });
        return false;
    }
    //sbzlDm = HD.SBZLCODE;
    var _hdxxData = getHdxx();
    var _sbzlNode = isExsitSbzlHdxx(['10101', '10110'], _hdxxData);
    var hdStr = getHdXmlStr(); // 核定信息xml转成字符串格式的

    /**
     *  获取缓存的金三报文 2017.11.13 by liun
     * */
    var j3CorrectXml = {};//更正报文
    if (isCorrect && !!j3CorrectXml) {
        var temp = JSON.parse(SUI.store.getSession('gzxx'));
        j3CorrectXml = reportSB.loadXML(temp.sbxx);
        hdStr = JSON.parse(temp.hdxx).SBZL[0];
    }

    //var JYZSBZ = getWsxxValueByCode(hdSbzlData,"JYZSBZ"); // 简易征收标志
    //var GZLX = getHdValueByCode("GZLX", 'wsxx'), // 挂账类型 0 非挂账企业，1挂账企业
    //var szlbDm = getHdValueByCode('SZLBDM', 'wsxx'); //税种类别代码？
    var WKJFPXSEHJ = Number(getWsxxValueByCode(_sbzlNode, "WKJFPXSEHJ")); //未开具发票销售额合计
    var WKJFPXXSEHJ = Number(getWsxxValueByCode(_sbzlNode, "WKJFPXXSEHJ")); //未开具发票销项税额合计

    setHeadValue(); // 设置表头相关信息

    var sb_bw = {}, fb = {}, index = '', cspmLength = 0; //核定中下发的 测算表的应税项目个数
    var isClick = [], page = [0, 1, 2, 3, 4, 5, 6, 7],
        //fbID = ['001', '002', '003', '006', '031', '082', '030', '083', '081'],
        fbID = ['001', '002', '003', '006', '031', '082', '081'],
        allClick = [
            '<br><span class="redfont">增值税纳税申报表</span>',
            '<br><span class="redfont">本期销售情况明细表</span>',
            '<br><span class="redfont">本期进项税额明细表</span>',
            '<br><span class="redfont">服务、不动产和无形资产扣除项目明细表</span>',
            '<br><span class="redfont">税额抵减情况表</span>',
            '<br><span class="redfont">不动产分期抵扣计算表</span>',
            //'<br><span class="redfont">固定资产（不含不动产）进项税额抵扣情况表</span>',
            //'<br><span class="redfont">本期抵扣进项税额结构明细表</span>',
            '<br><span class="redfont">增值税减免税申报明细表</span>'
        ];
    var flag001 = false, flag002 = false, flag003 = false, flag006 = true, flag031 = true,
        flag082 = true, flag081 = false, flag085 = false;
    // 主表初始化,执行数据格式校验，从未点击数组中去除
    debugger;
    zzsnssbb_init(true);
    //  附表一、附表二 初始化  触发事件 向主表赋值
    bqxsmx_init(true);
    bqjxsemx_init(true);

    fb['001'] = page[0].onlysave();
    allClick.splice(0, 1, 0);
    //增值税减免税申报明细表初始化，营改增税负分析测算明细表初始化
    zzsjmmxb_init(true);

    if ($.inArray('085', HD.SBBS.SBB) > -1) {
        has085 = true;
        fbID.push('085');
        allClick.push('<br><span class="redfont">营改增税负分析测算明细表</span>');
        ygzsffxcsmx_init(true);
    } else {
        mini.get("ybnsrsb-tabs").removeTab('085');
    }


    // 页面的dom初始化完毕后去除表格遮罩
    hideLoading();

    // tab标签页切换，切换时再初始化对应的表格
    mini.get("ybnsrsb-tabs").on("activechanged", function (tab) {
        var tabName = tab.name;
        index = tab.index;
        if ($.inArray(tabName, isClick) < 0) {
            isClick.push(tabName);
            switch (tabName) {
                case "001":
                    zzsnssbb_init(flag001);
                    flag001 = false;
                    break;
                case "002":
                    bqxsmx_init(flag002);
                    flag002 = false;
                    break;
                case "003":
                    bqjxsemx_init(flag003);
                    flag003 = false;
                    break;
                case "006":
                    ysfwkcxmmx_init(flag006);
                    flag006 = false;
                    break;
                case "031":
                    sedjqkb_init(flag031);
                    flag031 = false;
                    break;
                case "082":
                    bdcfqdkjsb_init(flag082);
                    flag082 = false;
                    break;
                    /*case "030" :
                        gdzcjxsedkqkb_init(flag030);
                        flag030 = false;
                        break;
                    case "083":
                        bqdkjxsejgmx_init(flag083);
                        flag083 = false;
                        break;*/
                case "081":
                    zzsjmmxb_init(flag081);
                    flag081 = false;
                    break;
                case "085":
                    ygzsffxcsmx_init(flag085);
                    flag085 = false;
                    break;
                default:
                    break;
            }
        }
        // 特色表不需要校验数据
        if (index !== 6 && index !== 7 && index !== 8 && index !== 9) {
            fb[fbID[index]] = page[index].onlysave();
        }
        allClick.splice(index, 1, 0);
    });

    function setYbjcData(id) {

        if (!ybjcData) {
            return;
        }
        var data = ybjcData[id];
        var tr = $('table.' + id).find('tbody tr');
        for (var row_col in data) {
            var arr = row_col.split('_'),
                row = arr[0],
                col = arr[1],
                val = data[row_col];
            tr.eq(row).find('td').eq(col).find('input').val(val);
        }
        if (id === 'zzsnssbb') {
            tr.eq(1).find('input:eq(0)').blur();
            tr.eq(2).find('input:eq(0)').blur();
            tr.eq(8).find('input:eq(0)').blur();
            tr.eq(9).find('input:eq(0)').blur();
        } else if (id === 'bqdkjxsejgmx') {
            tr.eq(3).find('input').blur();
        } else if (id === 'bqxsmx') {
            showLoading('数据加载中...');
            var timer = setTimeout(function () {
                $('table.bqxsmx tbody tr').each(function (i, v) {
                    $(v).find('input:eq(0)').blur();
                });
                timer = null;
                hideLoading();
            }, 400);

        } else if (id === 'bqjxsemx') {
            tr.eq(1).find('input').blur();
            tr.eq(4).find('input').blur();
        } else {
            // TODO
        }
    }

    // 设置表头基础信息
    function setHeadValue() {
        $('span.ybnsr_skssq').text(skssq[0] + ' 至 ' + skssq[1]);
        $('span.ybnsr_tbrq').text(tbrq);
        $('span.ybnsr_nsrsbh').text(_nsrsbh);
        $('span.ybnsr_nsrmc').text(_nsrmc);
        $('span.ybnsr_scjyd').text(_scjydz);
        $('span.ybnsr_fddbrxm').text(_fddbrmc);
        $('span.ybnsr_djzclx').text(_djzclxMc);
        $('span.ybnsr_zcdz').text(_zcdz);
        $('span.ybnsr_sshy').text(_hymc);
        $('span.ybnsr_dhhm').text(_scjydlxdh);
        $('span.ybnsr_newtbrq').text(skssq[0] + ' 至 ' + skssq[1]);
    }

    /**
     * table1 增 值 税 纳 税 申 报 表
     * ***/
    function zzsnssbb_init(flag) {
        debugger;
        if (flag) {
            var cfg = sb_zzsybnsr_cfg;
            reportSB.setTable('table.zzsnssbb');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_zzsybnsr_savexml);
            page[0] = reportSB.init();
            page[0].setTitle('增值税纳税申报表');
            debugger;
            setYbjcData('zzsnssbb');

            var tr = $('table.zzsnssbb').find('tbody tr'), j,
                arr = [17, 28, 29, 32, 33, 34, 35, 38, 45, 46, 47, 48, 51, 53, 54, 55, 58, 60, 64, 66, 67, 71, 72, 74, 75, 76];
            //13,
            for (var i = 0; i < 77; i++) {
                j = i + 1;
                if ($.inArray(j, arr) < 0 && j < 39) {
                    tr.eq(i).find('input:eq(1)').attr('data-lsxx', getHdValueByCode(j, 'lsxx'));
                    tr.eq(i).find('input:eq(0)').bind('blur', function (el) {
                        resetVal($(this), $(this).attr("value"));
                        var index = $(el.target).parents('tr').index() - 1;
                        if (index === 19 || index === 17) {
                            // 20行本年累计
                            //var value = getValue(tr, 12, 3) - getValue(tr, 17, 3);
                            //setValue(tr, 19, 3, value);
                            setValue(tr, index, 3, '0.00');
                        } else {
                            tr.eq(index).find('input:eq(1)').val(
                                (Number(tr.eq(index).find('input:eq(1)').attr('data-lsxx')) +
                                Number(tr.eq(index).find('input:eq(0)').val())).toFixed(2) || 0);
                        }

                    });
                }
                if ($.inArray(j, arr) < 0 && j > 38) {
                    var k = i - 38;
                    tr.eq(k).find('input:eq(3)').attr('data-lsxx', getHdValueByCode(j, 'lsxx'));
                    tr.eq(k).find('input:eq(2)').bind('blur', function (el) {
                        resetVal($(this), $(this).attr("value"));
                        var index = $(el.target).parents('tr').index() - 1;
                        tr.eq(index).find('input:eq(3)').val(
                            (Number(tr.eq(index).find('input:eq(3)').attr('data-lsxx')) +
                            Number(tr.eq(index).find('input:eq(2)').val())).toFixed(2) || 0);
                    });
                }
            }

            // 13 行设置值
            setValue(tr, 12, 2, getHdValueByCode('YBHWFWQCLD', 'wsxx'));
            // setValue(tr, 12, 2, '0.00');
            /*if (GZLX === '0') {
                setValue(tr, 12, 3, 0); // 13行
                setValue(tr, 17, 3, 0); // 18行
            } else {
                //setValue(tr, 12, 3, getHdValueByCode('SQLDSE', 'wsxx'));// 13行
                setValue(tr, 12, 3, '0.00');// 13行
                zb18Bnlj(tr); // 18行
            }*/
            setValue(tr, 12, 3, 0); // 13行
            setValue(tr, 17, 3, 0); // 18行

            setValue(tr, 12, 5, getHdValueByCode('JZJTQCLD', 'wsxx'));
            // 15
            setValue(tr, 14, 2, getHdValueByCode('MDTYTSEBYS', 'wsxx'));

            // 25栏本月数
            setValue(tr, 24, 3, getHdValueByCode('YBJSQCWJSEBYS', 'wsxx'));
            setValue(tr, 24, 6, getHdValueByCode('JZJTQCWJSEBYS', 'wsxx'));
            // 29栏本月数
            setValue(tr, 28, 2, getHdValueByCode('CKKJZYJKSYJSE', 'wsxx'));
            // 36栏本月数
            setValue(tr, 35, 2, getHdValueByCode('QCWJCBSEBYS', 'wsxx'));

            //设置计算规则
            setTable1event(tr, arr);

            // 设置核定值后，触发所有计算
            for (var s = 0; s < 39; s++) {
                tr.eq(s).find('input:eq(0)').blur();
                tr.eq(s).find('input:eq(2)').blur();
            }
            debugger;
            //金三报文回填 by liun
            if (isCorrect) {
                dataToTable1();
                // reportSB.preview('table.zzsnssbb',j3CorrectXml,cfg);
            }
        }

    }

    /*function zb18Bnlj(tr) {
        /!**
         * 本栏“一般货物及劳务和应税服务”列“本年累计”：
         * 将“挂帐留抵税额本期期初余额”与“一般计税方法的一般货物及劳务应纳税额”两个数据相比较， 取二者中小的数据。
         *其中：挂帐留抵税额本期期初余额＝第13栏“上期留抵税额”“一般货物及劳务和应税服务”列“本年累计”；
         * 其中：一般计税方法的一般货物及劳务应纳税额＝
         * （第11栏“销项税额”“一般货物及劳务和应税服务”列“本月数”-第18栏“实际抵扣税额”“一般货物及劳务和应税服务”列“本月数”）
         * ×一般货物及劳务销项税额比例；
         * 一般货物及劳务销项税额比例＝（《附列资料（一）》第10列第1、3行之和-第10列第6行）÷
         * 第11栏“销项税额”“一般货物及劳务和应税服务”列“本月数”×100％。
         * *!/

        var fb1Tr = $('table.bqxsmx tbody tr'), // 附表一 本期销售情况明细
            zbTr = tr;
        // 分子:numerator 分母:denominator
        var numerator = getValue(fb1Tr, 0, 13) + getValue(fb1Tr, 2, 11) - getValue(fb1Tr, 5, 12),
            denominator = getValue(zbTr, 10, 3),
            ybxmxxsebl;
        // 一般项目销项税额比例

        if (szlbDm === '03') {
            //分母为0时：分子为正，比例为1；分子为0，比例为50%；分子为负数，比例为0。
            if (denominator === 0) {
                if (numerator > 0) {
                    ybxmxxsebl = 1;
                } else if (numerator === 0) {
                    ybxmxxsebl = 0.5;
                } else {
                    ybxmxxsebl = 0;
                }
                //分母为负数时：分子为正，比例为1；分子为0，比例为1；分子为负数，用1去减比例。
            } else if (denominator < 0) {
                if (numerator < 0) {
                    ybxmxxsebl = 1 - (numerator / denominator * 100 / 100);
                } else {
                    ybxmxxsebl = 1;
                }
            } else { //当分母为正数时：分子为正，按公式正常计算；分子为0，比例为0；分子为负数，比例为0。
                ybxmxxsebl = (numerator / denominator * 100 / 100);
            }
        }
        else {

        }
        // “比例”遵循应介于0和1之间的规则，当“比例”小于0时为0，大于1时为1，
        if (ybxmxxsebl < 0) {
            ybxmxxsebl = 0;
        }
        if (ybxmxxsebl > 1) {
            ybxmxxsebl = 1;
        }
        // 一般计税方法的一般项目应纳税额
        var ybjsffdybxmynse = (getValue(zbTr, 10, 3) - getValue(zbTr, 17, 2)) * ybxmxxsebl;
        // 实际抵扣税额 一般项目 本年累计
        var valz = Math.min(getValue(zbTr, 12, 3), ybjsffdybxmynse);
        setValue(tr, 17, 3, valz); // 18行 本年累计
    }*/

    function setTable1event(tr) {
        tr.find('input:visible').not('[disabled]').bind('blur', function () {
            resetVal($(this), $(this).attr("value"));
        });
        var tabs = mini.get("ybnsrsb-tabs");
        var eventTr = tr.filter(':lt(16)').filter(':gt(9)');
        var index, value, parent;
        var calArr = [17, 18, 19, 23, 26, 31];
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            parent = $(this).parent().parent();
            index = parent.index();
            if (parent.parent().find('td').length === 9) {
                index = index - 1;
            }
            //17
            value = getValue(tr, 11, index) + getValue(tr, 12, index) - getValue(tr, 13, index) - getValue(tr, 14, index) + getValue(tr, 15, index);
            setValue(tr, 16, index, value);

            //18
            value = getValue(tr, 10, index + 1) > getValue(tr, 16, index) ? getValue(tr, 16, index) : getValue(tr, 10, index + 1);
            setValue(tr, 17, index, value);
            //19
            value = getValue(tr, 10, index + 1) - getValue(tr, 17, index) - getValue(tr, 17, index + 1);
            setValue(tr, 18, index, value);
            /*if (index === 2) {
                //value = getValue(tr, 10, index + 1) - getValue(tr, 17, index) - getValue(tr, 17, index+1);
                var a = getValue(tr, 17, index);
                var b = getValue(tr, 10, index + 1);
                if (a < b) {
                    value = b - a;
                } else {
                    value = 0;
                }
                setValue(tr, 18, index, value);
            } else {
                value = getValue(tr, 10, 2) - getValue(tr, 17, 2) -  getValue(tr, 17, 3);
                setValue(tr, 18, 2, value);
            }*/

            //20
            value = getValue(tr, 16, index) - getValue(tr, 17, index);
            setValue(tr, 19, index, value);

            //24
            value = getValue(tr, 18, index) + getValue(tr, 20, index) - getValue(tr, 22, index);
            setValue(tr, 23, index, value);
            //34
            value = getValue(tr, 23, index) - getValue(tr, 27, index) - getValue(tr, 28, index);
            setValue(tr, 33, index, value);

            for (var i = 0; i < calArr.length; i++) {
                tr.eq(calArr[i]).find('input').eq(0).blur();
                tr.eq(calArr[i]).find('input').eq(2).blur();
            }

            //第20行 第2列 值强制设置为0
            /* setTimeout(function () {
                 $(tr[19]).find("input:eq(1)").val("0.00");
             }, 10)*/
            $(tr[19]).find("input:eq(1)").val("0.00");
            $(tr[12]).find("input:eq(1)").val("0.00");
        });

        //24
        eventTr = tr.filter(':lt(25)').filter(':gt(17)');
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            parent = $(this).parent().parent();
            index = parent.index();

            // 23行 值校验
            if (getValue(tr, 22, 2) > getValue(tr, 20, 2) + getValue(tr, 18, 2)) {
                tabs.activeTab(0);
                SetErrors(tr, 22, 2);
                reportSB.showAlert("一般项目本月数第23栏应纳税额减征额必须小于等于21栏简易计税办法计算的应纳税额 + 19栏应纳税额之和，请检查！", "增值税减免税申报明细表", function () {
                    tr.find('.report_error').find('input').focus();
                });
            } else {
                removeErrors(tr, 22, 2);
            }
            // 23行 值校验
            if (getValue(tr, 22, 5) > getValue(tr, 20, 5) + getValue(tr, 18, 5)) {
                tabs.activeTab(0);
                SetErrors(tr, 22, 5);
                reportSB.showAlert("即征即退项目本月数第23栏应纳税额减征额必须小于等于21栏简易计税办法计算的应纳税额 + 19栏应纳税额之和，请检查！", "增值税减免税申报明细表", function () {
                    tr.find('.report_error').find('input').focus();
                });
            } else {
                removeErrors(tr, 22, 5);
            }

            value = getValue(tr, 18, index) + getValue(tr, 20, index) - getValue(tr, 22, index);
            setValue(tr, 23, index, value);
            //24
            value = getValue(tr, 18, index) + getValue(tr, 20, index) - getValue(tr, 22, index);
            setValue(tr, 23, index, value);
            //32

            value = getValue(tr, 23, index) + getValue(tr, 24, index + 1) + getValue(tr, 25, index) - getValue(tr, 26, index);
            setValue(tr, 31, index, value);
            setValue(tr, 31, index + 1, value);
            // 34
            value = getValue(tr, 23, index) - getValue(tr, 27, index) - getValue(tr, 28, index);
            setValue(tr, 33, index, value);

            for (var i = 0; i < calArr.length; i++) {
                tr.eq(calArr[i]).find('input').eq(0).blur();
                tr.eq(calArr[i]).find('input').eq(2).blur();
            }
        });
        //27
        eventTr = tr.filter(':lt(33)').filter(':gt(26)');
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            parent = $(this).parent().parent();
            index = parent.index();
            value = getValue(tr, 27, index) + getValue(tr, 28, index) + getValue(tr, 29, index) + getValue(tr, 30, index);
            setValue(tr, 26, index, value);

            //32
            value = getValue(tr, 23, index) + getValue(tr, 24, index + 1) + getValue(tr, 25, index) - getValue(tr, 26, index);
            setValue(tr, 31, index, value);
            setValue(tr, 31, index + 1, value);

            //33
            value = getValue(tr, 24, index + 1) + getValue(tr, 25, index) - getValue(tr, 26, index);
            if (value < 0) {
                value = 0;
            }
            setValue(tr, 32, index, value);

            for (var i = 0; i < calArr.length; i++) {
                tr.eq(calArr[i]).find('input').eq(0).blur();
                tr.eq(calArr[i]).find('input').eq(2).blur();
            }
        });
        //32--34
        eventTr = tr.filter(':lt(29)').filter(':gt(22)');
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            parent = $(this).parent().parent();
            index = parent.index();
            if (parent.parent().find('td').length === 9) {
                index = index - 1;
            }
            //32
            value = getValue(tr, 23, index) + getValue(tr, 24, index + 1) + getValue(tr, 25, index) - getValue(tr, 26, index);
            setValue(tr, 31, index, value);
            setValue(tr, 31, index + 1, value);

            //33
            value = getValue(tr, 24, index + 1) + getValue(tr, 25, index) - getValue(tr, 26, index);
            if (value < 0) {
                value = 0;
            }
            setValue(tr, 32, index, value);
            //34
            value = getValue(tr, 23, index) - getValue(tr, 27, index) - getValue(tr, 28, index);
            setValue(tr, 33, index, value);

            for (var i = 0; i < calArr.length; i++) {
                tr.eq(calArr[i]).find('input').eq(0).blur();
                tr.eq(calArr[i]).find('input').eq(2).blur();
            }
        });
        //38
        eventTr = tr.filter('.event38');
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            parent = $(this).parent().parent();
            index = parent.index();
            value = getValue(tr, 15, index) + getValue(tr, 21, index) + getValue(tr, 35, index) - getValue(tr, 36, index);
            setValue(tr, 37, index, value);
            setValue(tr, 37, index + 1, value);

            for (var i = 0; i < calArr.length; i++) {
                tr.eq(calArr[i]).find('input').eq(0).blur();
                tr.eq(calArr[i]).find('input').eq(2).blur();
            }
        });
    }

    //table2      增值税纳税申报表附列资料一
    function bqxsmx_init(flag) {
        if (flag) {
            var cfg = sb_bqxsqkmx_cfg;
            reportSB.setTable('table.bqxsmx');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_bqxsqkmx_savexml);
            page[1] = reportSB.init();
            page[1].setTitle('本期销售情况明细');

            setTable2event();

            setYbjcData('bqxsmx');
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.bqxsmx',j3CorrectXml,cfg);
                dataToTable2();
            }
        }
    }

    function setTable2event() {
        var table = $('table.bqxsmx');
        var tr = table.find('tbody tr'), value, value2, parent, trIndex, pen, tdindex, tdIndex;
        var seTdArr = [];

        tr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            tdIndex = parent.index();
            trIndex = parent.parent().index();


            //	销售额 *3% < = 销项(应纳)税额 < = 销售额 *17%
            if (trIndex === 0 || trIndex === 8) {
                seTdArr = [5, 7, 9, 11];
            } else if ($.inArray(trIndex, [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 20, 22]) > -1) {
                seTdArr = [3, 5, 7, 9];
            } else if (trIndex === 15 || trIndex === 16) {
                seTdArr = [2, 4, 6];
            } else if (trIndex === 6 || trIndex === 17) {
                seTdArr = [12];
            } else if (trIndex === 7 || trIndex === 18) {
                seTdArr = [11];
            }
            //下面这个判断为屏蔽判读出差判读
            if (trIndex === 21 || (tdIndex === 12 && trIndex === 17) && (tdIndex === 11 && trIndex === 18)
                || (tdIndex === 7 && trIndex === 19) || (tdIndex === 5 && trIndex === 19)) {
                seTdArr = [];
            }
            if ($.inArray(tdIndex, seTdArr) === -1) {
                var xse = getValue(tr, trIndex, tdIndex - 1),
                    ynse = getValue(tr, trIndex, tdIndex);
                if (trIndex === 0 || trIndex === 1) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.17);
                } else if (trIndex === 2) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.13);
                } else if (trIndex === 3 || trIndex === 4) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.11);
                } else if (trIndex === 5 || trIndex === 8) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.06);
                } else if (trIndex === 9 || trIndex === 10) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.05);
                } else if (trIndex === 11) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.04);
                } else if (trIndex === 12 || trIndex === 13) {
                    setValue(tr, trIndex, tdIndex + 1, ynse * 0.03);
                }
                $($($($(".bqxsmx  tbody tr")[trIndex]).find("td")[tdIndex + 1]).find("input")).blur();
            }

            tdindex = 2;
            if (trIndex === 6 || trIndex === 19 || trIndex === 21 || trIndex === 17) {
                tdindex = 3
            } else if (trIndex === 0 || trIndex === 8) {
                tdindex = 4
            } else if (trIndex === 15 || trIndex === 16) {
                tdindex = 1
            }
            if (tdIndex === (13 + tdindex)) {
                return;
            }


            //第9列 9 = 1 + 3 + 5 + 7
            if ((tdIndex !== (8 + tdindex)) && (tdIndex !== (9 + tdindex)) &&
                (tdIndex !== (10 + tdindex)) && (tdIndex !== (11 + tdindex)) &&
                (tdIndex !== (12 + tdindex))) {
                value = getValue(tr, trIndex, tdindex) + getValue(tr, trIndex, (2 + tdindex)) +
                    getValue(tr, trIndex, (4 + tdindex)) + getValue(tr, trIndex, (6 + tdindex));
                setValue(tr, trIndex, (8 + tdindex), value);
                //第10列 10 = 2 + 4 + 6 + 8
                value2 = getValue(tr, trIndex, (1 + tdindex)) + getValue(tr, trIndex, (3 + tdindex)) +
                    getValue(tr, trIndex, (5 + tdindex)) + getValue(tr, trIndex, (7 + tdindex));
                setValue(tr, trIndex, (9 + tdindex), value2);


                if (trIndex < 6) {
                    newRule({ tr: trIndex, td: (8 + tdindex), value: value }, "rule1");
                    if ((6 + tdindex)) {
                        newRule({ tr: trIndex, td: (8 + tdindex), value: value }, "rule3");
                    }
                } else if (trIndex > 7 && trIndex < 16) {
                    newRule({}, "rule4");
                } else if (trIndex === 19 || trIndex === 20) {
                    newRule({}, "rule6");
                } else if (trIndex === 21 || trIndex === 22) {
                    newRule({}, "rule7");
                }
            }

            if ((tdIndex === 12 || tdIndex === 11) && (trIndex === 6 || trIndex === 7)) {
                newRule({}, "rule1");
                newRule({}, "rule2");
            }
            if ((tdIndex === 12 || tdIndex === 11) && (trIndex === 17 || trIndex === 18)) {
                newRule({}, "rule4");
                newRule({}, "rule5");
            }
            if (tdIndex === (tdindex + 8) && (trIndex === 6 || trIndex === 7)) {
                newRule({}, "rule1");
                newRule({}, "rule2");
            } else if (tdIndex === (tdindex + 8) && (trIndex === 17 || trIndex === 18)) {
                newRule({}, "rule4");
                newRule({}, "rule5");
            }

            //11
            if ((tdIndex !== (10 + tdindex)) && (tdIndex !== (11 + tdindex))) {
                value = getValue(tr, trIndex, (9 + tdindex)) + getValue(tr, trIndex, (8 + tdindex));
                setValue(tr, trIndex, (10 + tdindex), value);
            }
            //13
            if (tdIndex !== (12 + tdindex)) {
                value = getValue(tr, trIndex, (10 + tdindex)) - getValue(tr, trIndex, (11 + tdindex));
                setValue(tr, trIndex, (12 + tdindex), value);
            }
            //14

            pen = tr.eq(trIndex).find('td:last').find('input').attr('pen');
            if (pen) {
                pen = parseFloat(pen);
            } else {
                return;
            }
            value = getValue(tr, trIndex, 11 + tdindex) === 0 ?
                getValue(tr, trIndex, 9 + tdindex) : (getValue(tr, trIndex, (12 + tdindex)) / (1 + pen)) * pen;
            setValue(tr, trIndex, (13 + tdindex), value);


        });

        //自动取值（附表一）：第10列6栏+14列7栏
        var $zzsnssbbTrs = $(".zzsnssbb tbody tr");
        tr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            tdIndex = parent.index();
            trIndex = parent.parent().index();


            //销项税额 input 0 自动取值（附表一）：第10列（1+3+4a-6栏）+第14列（2+4+5-7栏）;
            var d11 = getValue(tr, 0, 13) + getValue(tr, 2, 11) + getValue(tr, 3, 11) - getValue(tr, 6, 12) + getValue(tr, 1, 15) + getValue(tr, 3, 15) + getValue(tr, 4, 15) + getValue(tr, 5, 15) - getValue(tr, 7, 15);
            $zzsnssbbTrs.eq(10).find("input").eq(0).val(d11).blur();
            //销项税额 input 2 自动取值（附表一）：第10列6栏+14列7栏
            var d11_2 = getValue(tr, 6, 12) + getValue(tr, 7, 15);
            $zzsnssbbTrs.eq(10).find('input').eq(2).val(d11_2).blur();
            //简易计税办法计算的应纳税额  input 0   自动取值(附表一)：第10列（8+9a+10+11-14栏）+14列（9b+12+13a+13b-15栏）;
            var d21 = getValue(tr, 8, 13) + getValue(tr, 9, 11) + getValue(tr, 11, 11) + getValue(tr, 12, 11) - getValue(tr, 17, 12) + getValue(tr, 10, 15) + getValue(tr, 13, 15) + getValue(tr, 14, 15) + getValue(tr, 15, 14) - getValue(tr, 18, 15);
            $zzsnssbbTrs.eq(20).find('input').eq(0).val(d21).blur();
            //简易计税办法计算的应纳税额 input 2    自动取值(附表一)：第10列14栏）+14列15栏;
            var d21_2 = getValue(tr, 17, 12) + getValue(tr, 18, 15);
            $zzsnssbbTrs.eq(20).find('input').eq(2).val(d21_2).blur();
            //按适用税率计算的纳税检查应补缴税额 16 自动取值附表一第8列第1至5行之和+附表二第19栏之和
            var tab2_8 = getValue(tr, 0, 11) + getValue(tr, 1, 9) + getValue(tr, 2, 9) + getValue(tr, 3, 9) + getValue(tr, 4, 9) + getValue(tr, 5, 9);
            var tr3 = $('table.bqjxsemx').find('tbody tr');
            var d16 = tab2_8 + getValue(tr3, 21, 2);
            $zzsnssbbTrs.eq(15).find('input').eq(0).val(d16).blur();

            zb11hj = Number($('#zb11-1').val()) + Number($('#zb11-3').val());
            zb19hj = Number($('#zb19-1').val()) + Number($('#zb19-3').val());
        });

        function newRule(data, rule) {
            switch (rule) {
                case "rule1":
                    var d = getData(0, 8) + getData(1, 8) + getData(2, 8) + getData(3, 8) + getData(4, 8) + getData(5, 8) - getData(6, 8) - getData(7, 8);
                    $zzsnssbbTrs.eq(0).find('input').eq(0).val(d).blur();
                case "rule2":
                    var d = getData(6, 8) + getData(7, 8);
                    $zzsnssbbTrs.eq(0).find('input').eq(2).val(d).blur();
                    break;
                case "rule3":
                    var d = getData(0, 6) + getData(1, 6) + getData(2, 6) + getData(3, 6) + getData(4, 6) + getData(5, 6);
                    $zzsnssbbTrs.eq(3).find('input').eq(0).val(d).blur();
                    break;
                case "rule4":
                    var d = getData(8, 8) + getData(9, 8) + getData(10, 8) + getData(11, 8) + getData(12, 8) + getData(13, 8) + getData(14, 8) + getData(15, 8);
                    d = d - getData(17, 8) - getData(18, 8);
                    $zzsnssbbTrs.eq(4).find('input').eq(0).val(d).blur();
                    break;
                case "rule5":
                    var d = getData(17, 8) + getData(18, 8);
                    $zzsnssbbTrs.eq(4).find('input').eq(2).val(d).blur();
                    break;
                case "rule6":
                    var d = getData(19, 8) + getData(20, 8);
                    $zzsnssbbTrs.eq(6).find('input').eq(0).val(d).blur();
                    break;
                case "rule7":
                    var d = getData(21, 8) + getData(22, 8);
                    $zzsnssbbTrs.eq(7).find('input').eq(0).val(d).blur();
                    break;
            }
        }

        function getData(trIndex, tdInedex) {
            var tdindex = 2;
            if (trIndex === 6 || trIndex === 19 || trIndex === 21 || trIndex === 17) {
                tdindex = 3
            } else if (trIndex === 0 || trIndex === 8) {
                tdindex = 4
            } else if (trIndex === 15 || trIndex === 16) {
                tdindex = 1
            }
            if (tdIndex === (13 + tdindex)) {
                return;
            }
            return getValue(tr, trIndex, tdInedex + tdindex);
        }
    };

    /**
     *    085营改增税负分析测算明细表
     * */

    function ygzsffxcsmx_init(flag) {
        if (flag) {
            var cfg = sb_ygzsffxcsmx_cfg;
            reportSB.setTable('table.ygzsffxcsmx');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_ygzsffxcsmx_savexml);
            page[7] = reportSB.init();
            page[7].setTitle('营改增税负分析测算明细表');
            // 拉框值改变触发
            ygzChanged = function (th) {
                var inputDom = $(th).parent().nextAll().find("input");
                $(inputDom).val("0.00");//税率下拉框值改变时，该行的输入框全部重置为0
                $(inputDom).eq(3).blur();//重新激活一次失去焦点的计算
                // 应税项目代码及名称
                var pmbm = $(th).val();
                var id = $(th).attr('id');
                if (id.indexOf('ysxmdmjmc-') > -1) {
                    if (!!pmbm) {
                        inputDom.eq(0).removeAttr('disabled').parent().removeClass('readonly');
                        inputDom.eq(3).removeAttr('disabled').parent().removeClass('readonly');
                        for (var i = 0, j = ysxmdmjmcList.length; i < j; i++) {
                            if (pmbm === ysxmdmjmcList[i].pmbm) {
                                var item = ysxmdmjmcList[i];

                                var zzsslOptions = '', yysslOptions = '', zzsslArr = [], yysslArr = [];
                                var index = Number(id.replace('ysxmdmjmc-', ''));
                                var zzssl = item.zzssl;
                                var yyssl = item.yyssl;
                                var zzscsbz = item.zzscsbz;
                                var yyscsbz = item.yyscsbz;

                                var zzssldom = $('.zzsSelect' + index),
                                    yyssldom = $('.yysSelect' + index);
                                if (zzssl.indexOf(',') > -1) {
                                    zzsslArr = zzssl.split(',');
                                } else {
                                    zzsslArr.push(zzssl);
                                }
                                if (yyssl.indexOf(',') > -1) {
                                    yysslArr = yyssl.split(',');
                                } else {
                                    yysslArr.push(yyssl);
                                }

                                for (var j = 0; j < zzsslArr.length; j++) {
                                    zzsslOptions += '<option value=' + Number((zzsslArr[j].split("%"))[0] / 100) + '>' + zzsslArr[j] + '</option>';
                                }
                                for (var k = 0; k < yysslArr.length; k++) {
                                    yysslOptions += '<option value=' + Number((yysslArr[k].split("%"))[0] / 100) + '>' + yysslArr[k] + '</option>';
                                }

                                $(zzssldom).html(zzsslOptions);
                                $(yyssldom).html(yysslOptions);

                                if (zzscsbz === "N") { //选中项的增值税差额征税标记 为 N
                                    $(".unActive" + index + ":lt(2)").addClass("readonly").attr("disabled", "disabled");
                                }
                                else {
                                    $(".unActive" + index + ":lt(2)").removeClass("readonly").removeAttr("disabled");
                                }
                                if (yyscsbz === "N") { //选中项的营业税差额征税标记 为 N
                                    $(".unActive" + index + ":gt(1)").addClass("readonly").attr("disabled", "disabled");
                                }
                                else {
                                    $(".unActive" + index + ":gt(1)").removeClass("readonly").removeAttr("disabled");
                                }

                                break;
                            }
                        }
                    } else {
                        $(th).parent().nextAll().find('select').html('');
                        inputDom.attr({
                            "disabled": "disabled",
                            "value": ""
                        });
                        inputDom.parent().each(function (i, v) {
                            !$(v).hasClass('readonly') && $(v).addClass('readonly');
                        });
                    }
                }
            };
            // 初始化营改增税负分析测算表的下拉框数据
            cspmLength = initYgzsffxcsb(HD);
            settable11event();
            fb[fbID[7]] = page[7].onlysave();
            var tr = $('table.ygzsffxcsmx tr').filter(':gt(' + (cspmLength + 4) + ')');
            tr.find('input').val('');
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.ygzsffxcsmx',j3CorrectXml,cfg);
                dataToTable11();
            }
        }
    }

    function settable11event() {
        var tr = $('table.ygzsffxcsmx tr').filter(':gt(4)');
        var trindex, value, parent;
        zb11hj = Number($('#zb11-1').val()) + Number($('#zb11-3').val());
        zb19hj = Number($('#zb19-1').val()) + Number($('#zb19-3').val());
        tr.find('input').bind("blur", function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            trindex = tr.index(parent);
            var parent2 = $(this).parent();
            var zzssl = Number(getSelectValue(tr, trindex, 1));
            var yyssl = Number(getSelectValue(tr, trindex, 2));

            var pmbmArr = ['070301', '060804', '060403', '060802', '010100', '010201', '010202', '010300', '010400', '010500',
                '090100', '090200'];
            var selectedPmbm = tr.eq(trindex).find('td').eq(0).find('select').val();//getSelectValue(tr, trindex, 0); // 选中的品目编码

            var tdIndex = $(this).parent().index();

            if (!isNaN(zzssl)) {

                //不含税销售额 2
                value = getValue(tr, trindex, 3) * zzssl;
                if (parent2[0].cellIndex !== 4 && parent2[0].cellIndex !== 6) {
                    setValue(tr, trindex, 4, value.toFixed(2));
                }

                // 3 =1+2
                value = getValue(tr, trindex, 3) + getValue(tr, trindex, 4);
                setValue(tr, trindex, 5, value.toFixed(2));
                // 5=3-4
                value = getValue(tr, trindex, 5) - getValue(tr, trindex, 6);
                setValue(tr, trindex, 7, value.toFixed(2));
                //6=5÷(100%+增值税税率或征收率)×增值税税率或征收率
                value = getValue(tr, trindex, 7) / (1 + zzssl) * zzssl;
                setValue(tr, trindex, 8, value.toFixed(2));
                //7
                /* a、一般计税方法计税情况下：即根据选择的应税项目对应的“增值税税率/征收率”为17%、11%、6%时：
                 本列各行次＝第6列对应各行次÷《增值税纳税申报表（一般纳税人适用）》主表第11栏“销项税额”“一般项目”和“即征即退项目”“本月数”之和×《增值税纳税申报表（一般纳税人适用）》主表第19栏“应纳税额”“一般项目”和“即征即退项目”“本月数”之和。
                 b、简易计税方法计税情况下：即根据选择应税项目对应的“增值税税率/征收率”为5%、3%时：
                 本列各行次＝第6列对应各行次。*/
                if (zzssl === 0.17 || zzssl === 0.11 || zzssl === 0.06) {
                    var v6 = getValue(tr, trindex, 8);
                    var v11 = Number($('#zb11-1').val()) + Number($('#zb11-3').val());
                    var v19 = Number($('#zb19-1').val()) + Number($('#zb19-3').val());
                    if (v11 !== 0) {
                        var v7 = v6 / v11 * v19;
                    } else {
                        var v7 = 0.00;
                    }
                    setValue(tr, trindex, 9, v7.toFixed(2));
                    Exist017 = true;
                    zb11hj = v11;
                    zb19hj = v19;
                }
                //增值税税率/征收率”为5%、3%时：7＝第6列对应各行次。
                if (zzssl === 0.05 || zzssl === 0.03) {
                    value = getValue(tr, trindex, 8);
                    setValue(tr, trindex, 9, value.toFixed(2));
                }
                //10=8+9
                value = getValue(tr, trindex, 10) + getValue(tr, trindex, 11);
                setValue(tr, trindex, 12, value.toFixed(2));
                //11≤3且11≤10
                var v3 = getValue(tr, trindex, 5);
                var v10 = getValue(tr, trindex, 12);
                //var v11 = getValue(eventTr, trindex, 13);
                /*1.当第10列各行次≤第3列对应行次时
                 11列 本列各行次＝第10列对应各行次；
                 2.当第10列各行次>第3列对应行次时
                 11列 本列各行次＝第3列对应各行次。*/
                var TDindex = parent2[0].cellIndex;
                if (TDindex === 3 || TDindex === 4 || TDindex === 10 || TDindex === 11 || TDindex === 13) {

                    if (TDindex !== 13) {
                        if (v10 > v3) {
                            if (v3 < 0) v3 = 0.00;
                            setValue(tr, trindex, 13, v3);
                        }
                        else {
                            if (v10 < 0) v10 = 0.00;
                            setValue(tr, trindex, 13, v10);
                        }
                    } else {
                        if (getValue(tr, trindex, 13) > v3 || getValue(tr, trindex, 13) > v10) {
                            SetErrors(tr, trindex, 13);
                            reportSB.showAlert("第11列“本期实际扣除金额”应该小于等于第10列“本期应扣除金额”且小于等于第3列“价税合计”，请检查！", "营改增税负分析测算表", function () {
                                tr.find('.report_error').find('input').focus();
                            });
                            return;
                        } else {
                            removeErrors(tr, trindex, 13);
                        }
                    }
                }

                //12=10-11
                value = getValue(tr, trindex, 12) - getValue(tr, trindex, 13);
                setValue(tr, trindex, 14, value.toFixed(2));

                //13=3-11
                value = getValue(tr, trindex, 5) - getValue(tr, trindex, 13);
                setValue(tr, trindex, 15, value.toFixed(2));
                //14=13×营业税税率
                value = getValue(tr, trindex, 15) * yyssl;
                setValue(tr, trindex, 16, value.toFixed(2));

                /*第4列与第10列绝对值判断*/
                var isCol4Readonly = $(tr).eq(trindex).find('td:eq(6)').find('input').attr('disabled');
                var isCol11Readonly = $(tr).eq(trindex).find('td:eq(13)').find('input').attr('disabled');
                var vcol11 = Number($(tr).eq(trindex).find('td:eq(13)').find('input').val());
                var vcol4 = Number($(tr).eq(trindex).find('td:eq(6)').find('input').val());

                function removeValidation(s, t) {
                    $(s).eq(t).removeAttr('data-col4col11').find('.report_error').removeClass('report_error');
                }
                function checkAbs(isIn) {
                    if (isIn && selectedPmbm == '060802' && (vcol4 === 0 || vcol11 === 0)) {
                        removeValidation(tr, trindex);
                        return;
                    }
                    if (isIn && selectedPmbm != '060802' && vcol11 === 0) {
                        removeValidation(tr, trindex);
                        return;
                    }
                    if (Math.abs(vcol4 - vcol11) > 10) {
                        $(tr).eq(trindex).attr('data-col4col11', 'notPass');
                    } else {
                        removeValidation(tr, trindex);
                    }
                }
                if (!isCol4Readonly && !isCol11Readonly) { // 营业税税率，增值税税率 都为 Y
                    // 在列表中
                    if ($.inArray(selectedPmbm, pmbmArr) > -1) {
                        checkAbs(true);
                    } else if ($.inArray(selectedPmbm, pmbmArr) === -1) { // 不在列表中
                        checkAbs(false);
                    }

                }
            }
            var hjArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = 0; i < tr.length; i++) {
                for (var k = 0; k < hjArr.length; k++) {
                    hjArr[k] += getValue(tr, i, k + 3);
                }
            }
            for (var n = 1; n < 15; n++) {
                var dom = '.hjl' + n;
                $(dom).val(hjArr[n - 1].toFixed(2));
            }

            is085Col7Col14 = false;
            var hj14 = hjArr[13];
            var hj7 = hjArr[6];
            if (Number(hj14) != 0) { //14列不为0
                if (!(hj7 / hj14 > 0.5) || !(hj7 / hj14 < 2)) {
                    is085Col7Col14 = true;
                }
            }
            else {
                if (Number(hj7) != 0) {//14列为0，7列不为0
                    if (!(hj14 / hj7 > 0.5) || !(hj14 / hj7 < 2)) {
                        is085Col7Col14 = true;
                    }

                }
                else {
                    is085Col7Col14 = false; //都为0，可以申报
                }
            }
        });
    }

    //根据核定对税负分析测算表配置应税项目下拉框数据
    function initYgzsffxcsb(HD) {
        var csbzspms = HD.CSBZSPMS.csbzspmList;
        var ysxmdmjmcOptions = '<option value=""></option>';
        if (csbzspms && csbzspms.length > 0) {
            $("input[class^=hjl]").val("0.00");
            $.each($(csbzspms), function (i, v) {
                ysxmdmjmcList.push({
                    index: i + 1,
                    pmbm: v.PMBM,
                    pmmc: v.MC,
                    pmbmjmc: v.PMBM + "|" + v.MC,
                    zzssl: v.ZZSSL,
                    yyssl: v.YYSSL,
                    zzscsbz: v.ZZSCEBZ,
                    yyscsbz: v.YYSCSBZ
                });
                ysxmdmjmcOptions += '<option value=' + v.PMBM + '>' + v.PMBM + "|" + v.MC + '</option>';

            });
            for (var j = 1; j < 16; j++) {
                var inputdom = $('#ysxmdmjmc-' + j);
                inputdom.html(ysxmdmjmcOptions);
                if (j > csbzspms.length) {
                    var selsector = ".zzsSelect" + j;
                    var $trs = $(selsector).parent().parent();
                    $trs.find('td').filter(':gt(2)').each(function (i, v) {
                        !$(v).hasClass('readonly') && $(v).addClass('readonly');
                    });
                    $trs.find('input').attr('disabled', 'disabled');
                } else {
                    inputdom.val(ysxmdmjmcList[(j - 1)].pmbm);
                    ygzChanged(inputdom);
                }

            }
            //Exist_085 = true;
            return csbzspms.length;
        } else {
            //Exist_085 = false;
            return 0;
        }
    }


    /**
     * table6 增值税减免税申报明细表
     * **/
    function zzsjmmxb_init(flag) {
        if (flag) {
            var tr = $('table.zzsjmmxb tbody tr');
            var cfg = sb_zzsjmssbmxb_cfg;
            reportSB.setTable('table.zzsjmmxb');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_zzsjmssbmxb_savexml);
            page[6] = reportSB.init();
            page[6].setTitle('增值税减免税申报明细表');

            settable6event(tr);
            fb[fbID[6]] = page[6].onlysave();

            setSelect();
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.zzsjmmxb',j3CorrectXml,cfg);
                dataToTable6();
            }
        }
    }

    function settable6event(tr) {
        var parent, index, trIndex;
        tr.find('select').bind('change.sb', function () {
            var selectIndex = tr.index($(this).parent().parent());
            if (!$(this).val()) {
                tr.eq(selectIndex).find('input').not('[disabled]').blur();
            }
        });
        tr.find('input').bind('blur.sb', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            index = parent.index();
            trIndex = tr.index(parent.parent());
            if (trIndex < 6) {
                var value = getValue(tr, 1, index) + getValue(tr, 2, index) + getValue(tr, 3, index) + getValue(tr, 4, index) + getValue(tr, 5, index);
                setValue(tr, 0, index, value);
                value = getValue(tr, trIndex, 4) + getValue(tr, trIndex, 5);
                setValue(tr, trIndex, 6, value);
                value = getValue(tr, trIndex, 6) - getValue(tr, trIndex, 7);
                setValue(tr, trIndex, 8, value);
                value = getValue(tr, 0, 4) + getValue(tr, 0, 5);
                setValue(tr, 0, 6, value);
                value = getValue(tr, 0, 6) - getValue(tr, 0, 7);
                setValue(tr, 0, 8, value);
                if (index === 7) {
                    // 第4列大于等于0
                    if (getValue(tr, trIndex, index) < 0) {
                        SetErrors(tr, trIndex, 7);
                        reportSB.showAlert("减税项目第4列本期实际抵减税额应大于等于0，请检查！", "增值税减免税申报明细表", function () {
                            tr.find('.report_error').find('input').focus();
                        });
                    } else if (getValue(tr, trIndex, 6) < getValue(tr, trIndex, 7)) {
                        SetErrors(tr, trIndex, 7);
                        reportSB.showAlert("减税项目第4列本期实际抵减税额应小于等于第3列本期应抵减税额，请检查！", "增值税减免税申报明细表", function () {
                            tr.find('.report_error').find('input').focus();
                        });
                    } else {
                        removeErrors(tr, trIndex, 7);
                    }

                }
            } else if (trIndex > 9) {
                var v1 = getValue(tr, 10, 4);
                var v2 = getValue(tr, 11, 4);
                if (v2 > v1) {
                    reportSB.showAlert("“其中：跨境服务”必须 ≤ “出口免税”，请检查！", "增值税减免税申报明细表");
                    SetErrors(tr, 10, 4);
                    SetErrors(tr, 11, 4);
                } else {
                    removeErrors(tr, 10, 4);
                    removeErrors(tr, 11, 4);
                }
                value = getValue(tr, 10, index) + getValue(tr, 12, index) + getValue(tr, 13, index) + getValue(tr, 14, index) +
                    getValue(tr, 15, index) + getValue(tr, 16, index) + getValue(tr, 17, index) + getValue(tr, 18, index);
                setValue(tr, 9, index, value);
                if (trIndex !== 10 && trIndex !== 11) {
                    value = getValue(tr, trIndex, 4) - getValue(tr, trIndex, 5);
                    setValue(tr, trIndex, 6, value);
                    if (value < getValue(tr, trIndex, 7)) {
                        SetErrors(tr, trIndex, 7);
                        reportSB.showAlert("免税项目免税销售额对应的进项税额必须小于等于扣除后免税销售额，请检查！", "增值税减免税申报明细表", function () {
                            tr.find('.report_error').find('input').focus();
                        });
                    } else {
                        removeErrors(tr, trIndex, 7);
                    }
                }
                value = getValue(tr, 9, 4) - getValue(tr, 9, 5);
                setValue(tr, 9, 6, value);
                if (getValue(tr, trIndex, 8) < 0) {
                    SetErrors(tr, trIndex, 8);
                    reportSB.showAlert("免税项目第5列免税额应大于等于0，请检查！", "增值税减免税申报明细表", function () {
                        tr.find('.report_error').find('input').focus();
                    });
                } else {
                    removeErrors(tr, trIndex, 8);
                }

            } else {

            }
        });

    }

    function setSelect() {
        jmSelects = $('#table8 select');
        var jmxxItems = HD.JMXX, trs = $('#table8 .jmtr');
        var jsOptions = '', msOptions = '', jslength = 0, mslength = 0,
            jsSelect = jmSelects.filter(':lt(5)'),
            msSelect = jmSelects.filter(':gt(4)');
        $.each(jmxxItems, function (index, val) {
            var jmxzDm = val.ssjmxzhzDm,//减免性质代码
                jmxzMc = val.jmxzMc,    //减免性质名称
                jmxlDm = val.jmzlxDm;   //减免类型代码 01 减税，02 免税

            if (jmxlDm === '01') {
                jsOptions += '<option value=' + jmxzDm + '>' + jmxzMc + '</option>';
                jslength++;
            } else {
                msOptions += '<option value=' + jmxzDm + '>' + jmxzMc + '</option>';
                mslength++;
            }
        });
        jsSelect.append(jsOptions).attr('onchange', 'jmxmChanged(this)');
        msSelect.append(msOptions).attr('onchange', 'jmxmChanged(this)');
        if (jslength > 0) {
            trs.filter(':lt(' + jslength + ')').find('select').removeAttr('disabled').parent().removeClass('readonly');
            trs.filter(':lt(5):gt(' + (jslength - 1) + ')').find('input').val('');
        }
        if (mslength > 0) {
            trs.filter(':lt(' + (mslength + 5) + '):gt(4)').find('select').removeAttr('disabled').parent().removeClass('readonly');
            trs.filter(':gt(' + (mslength + 4) + ')').find('input').val('');
        }
    }

    jmxmChanged = function (th) {
        var tr = $(th).parent().parent(),
            index = tr.index();
        var jmxmDm = $(th).val();
        var jmxmMc = $(th).find('option:selected').text();
        for (var i = 0, j = jmSelects.length; i < j; i++) {
            var dm = $(jmSelects[i]).val();
            if (!!jmxmDm && jmxmDm === dm && Number(tr.attr('data-index')) !== i) {
                reportSB.showAlert("您已经选择过该项，请勿重复选择！", "增值税减免税申报明细表");
                $(th).val('');
                jmxmMc = '';
                break;
            }
        }


        if (!!jmxmMc) {
            tr.find('input').removeAttr('disabled');
            tr.children().filter(':gt(3)').removeAttr('disabled');
        } else {
            tr.find('input').attr('disabled', 'disabled').val('0.00');
            tr.children().filter(':gt(3)').attr('disabled', 'disabled');
        }
        if (index < 6) {
            tr.find('td').eq(6).attr('disabled', 'disabled').find('input').attr('disabled', 'disabled');
            tr.find('td').eq(8).attr('disabled', 'disabled').find('input').attr('disabled', 'disabled');
        } else {
            tr.find('td').eq(6).attr('disabled', 'disabled').find('input').attr('disabled', 'disabled');
        }

    };


    /*table
     * 新增 附列资料 5 不动产分期抵扣计算表
     * */
    function bdcfqdkjsb_init(flag) {
        if (flag) {
            var tr = $('table.bdcfqdkjsb').find('tbody tr');
            var cfg = sb_bdcfqdkjsb_cfg;
            reportSB.setTable('table.bdcfqdkjsb');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_bdcfqdkjsb_savexml);
            page[5] = reportSB.init();
            page[5].setTitle('不动产分期抵扣计算表');
            settable9event(tr);
            setValue(tr, 2, 0, getHdValueByCode('FB5DDKBDCQCYE', 'wsxx'));
            tr.eq(2).find('input').eq(1).blur();
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.bdcfqdkjsb',j3CorrectXml,cfg);
                dataToTable9();
            }
        }

    }

    var settable9event = function (tr) {
        var eventTr = tr;
        var trindex, value, parent, parent2;
        // $.each(eventTr,function(i,v){
        eventTr.find('input:visible').not('[disabled]').bind('blur', function () {
            //1
            resetVal($(this), $(this).attr("value"));
            parent2 = $(this).parent().parent();
            parent = parent2.parent();
            trindex = tr.index(parent);
            //第 6 列自动计算
            value = getValue(tr, trindex, 0) + getValue(tr, trindex, 1) - getValue(tr, trindex, 2) + getValue(tr, trindex, 3) - getValue(tr, trindex, 4);
            setValue(tr, trindex, 5, value);
            if (Number(getValue(tr, 2, 2)) > Number(getValue(tr, 2, 0)) + Number(getValue(tr, 2, 1)) + Number(getValue(tr, 2, 3))) {
                reportSB.showAlert("第3列必须≤第1列+第2列+第4列，请检查！", "不动产分期抵扣计算表", function () {
                    tr.eq(trindex).find('.report_error').find("input").focus();
                });
                return false;
            }
            else if (Number(getValue(tr, 2, 4)) > Number(getValue(tr, 2, 0)) + Number(getValue(tr, 2, 3))) {
                reportSB.showAlert("第5列必须≤第1列+第4列，请检查！", "不动产分期抵扣计算表", function () {
                    tr.eq(trindex).find('.report_error').find("input").focus();
                });
                return false;
            }
            else {
            }
        })
    };

    //----table3	 增值税纳税申报表附列资料二
    function bqjxsemx_init(flag) {
        if (flag) {
            var cfg = sb_bqjxsemx_cfg;
            reportSB.setTable('table.bqjxsemx');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_bqjxsemx_savexml);
            page[2] = reportSB.init();
            page[2].setTitle('本期进项税额明细表');

            settable3event();

            setYbjcData('bqjxsemx');
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.bqjxsemx',j3CorrectXml,cfg);
                dataToTable3();
            }
        }
    }

    function settable3event() {
        var tr = $('table.bqjxsemx').find('tbody tr');
        var eventTr = tr.filter(':lt(12)').filter(':gt(0)');
        var index, value, parent;
        // $.each(eventTr,function(i,v){
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            //1
            parent = $(this).parent().parent();
            index = parent.index();

            value = getValue(tr, 1, index) + getValue(tr, 2, index);
            setValue(tr, 0, index, value);

            //4
            value = getValue(tr, 4, index) + getValue(tr, 5, index) + getValue(tr, 6, index) + getValue(tr, 7, index) + getValue(tr, 8, index);
            setValue(tr, 3, index, value);
            //12
            value = getValue(tr, 0, index) + getValue(tr, 3, index) - getValue(tr, 9, index) + getValue(tr, 10, index) + getValue(tr, 11, index);
            setValue(tr, 12, index, value);

            //第12行  一般项目  进项税额          本月数  等于附表2第12栏税额  --- 逾期未认定 YQWRZ 标志为0  逾期为认定跳转到了另外一个页面
            $($($(".zzsnssbb tbody tr")[11]).find("input")[0]).val(value).blur();
            //47
            value = getValue(tr, 1, index) + getValue(tr, 42, index);
            setValue(tr, 41, index, value);

            var v1 = getValue(tr, 0, index) + getValue(tr, 3, index); //第1栏 + 第4栏
            var v2 = getValue(tr, 9, index); //第9栏
            //第9栏值小于0，直接设置为0
            if (v2 < 0) {
                setValue(tr, 9, index, 0);
                setValue(tr, 12, index, 0);
            }
            if (index !== 4 && v2 > v1) {
                SetErrors(tr, 9, index);
                reportSB.showAlert("第9栏必须 ≤ 第1栏+第4栏，请检查！", "本期进项税额明细表", function () {
                    tr.eq(9).find('.report_error').find("input").focus();
                });
                setValue(tr, 12, index, 0);
            }
            value = getValue(tr, 29, index) + getValue(tr, 30, index) - getValue(tr, 2, index);
            setValue(tr, 31, index, value);//27行=25+26-3
            value = getValue(tr, 30, index) + getValue(tr, 1, index);
            setValue(tr, 41, index, value);//只读   第35行=2+26
        });
        //13
        eventTr = tr.filter(':lt(26)').filter(':gt(15)');
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            //13
            index = 2;

            value = getValue(tr, 16, index) + getValue(tr, 17, index) + getValue(tr, 18, index) + getValue(tr, 19, index) +
                getValue(tr, 20, index) + getValue(tr, 21, index) + getValue(tr, 22, index) +
                getValue(tr, 23, index) + getValue(tr, 24, index) + getValue(tr, 25, index);
            setValue(tr, 15, index, value);
            //13合计值自动赋值到主表   进项税额转出  14 2017-5-3
            $($($(".zzsnssbb tbody tr")[13]).find("input")[0]).val(value).blur();
            $($($(".zzsnssbb tbody tr")[13]).find("input")[2]).val(value).blur();
            //19 2017-5-3
            //按适用税率计算的纳税检查应补缴税额 16 自动取值附表一第8列第1至5行之和+附表二第19栏之和
            var tab1tr = $('table.bqxsmx').find('tbody tr');
            var tab2_8 = getValue(tab1tr, 0, 11) + getValue(tab1tr, 1, 11) + getValue(tab1tr, 2, 11) + getValue(tab1tr, 3, 11) + getValue(tab1tr, 4, 11) + getValue(tab1tr, 5, 11);
            var d16 = tab2_8 + getValue(tr, 21, 2);
            $($($(".zzsnssbb tbody tr")[15]).find("input")[0]).val(d16).blur();

        });
        // 第27行=25+26-3，只读 //只读   第35行=2+26
        eventTr = tr.filter(':lt(33)').filter(':gt(28)');
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            index = parent.index();

            value = getValue(tr, 29, index) + getValue(tr, 30, index) - getValue(tr, 2, index);
            setValue(tr, 31, index, value);//27行=25+26-3

            if (getValue(tr, 32, index) > value) { // 28《=27
                SetErrors(tr, 32, index);
                reportSB.showAlert("第28栏必须小于等于第27栏，请检查！", "本期进项税额明细表", function () {
                    setValue(tr, 32, index, '0.00');
                });
            } else {
                removeErrors(tr, 32, index);
            }

            value = getValue(tr, 30, index) + getValue(tr, 1, index);
            setValue(tr, 41, index, value);//只读   第35行=2+26

        });
        //29
        eventTr = tr.filter(':lt(38)').filter(':gt(33)');
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);

            parent = $(this).parent().parent();
            index = parent.index();

            value = getValue(tr, 34, index) + getValue(tr, 35, index) + getValue(tr, 36, index) + getValue(tr, 37, index);
            setValue(tr, 33, index, value);
        });
        //47
        eventTr = tr.eq(42);
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);
        });
    };

    /*table
     * 新增 083本期抵扣进项税额结构明细表
     * */
    /*function bqdkjxsejgmx_init(flag) {
        if (flag) {
            var cfg = sb_bqdkjxsejgmx_cfg;
            reportSB.setTable('table.bqdkjxsejgmx');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_bqdkjxsejgmx_savexml)
            page[7] = reportSB.init();
            page[7].setTitle('本期抵扣进项税额结构明细表');

            settable10event();

            setYbjcData('bqdkjxsejgmx');
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.bqdkjxsejgmx',j3CorrectXml,cfg);
                dataToTable10();
            }
        }
    }*/

    /*var settable10event = function () {
        var tr = $('table.bqdkjxsejgmx tbody tr');
        var trindex, value, parent, parent2, tdIndex;
        // $.each(eventTr,function(i,v){

        tr.find('input:visible').not('[disabled]').bind('blur', function () {
            var total_je = 0, total_se = 0;
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);
            parent2 = $(this).parent().parent();
            parent = parent2.parent();
            trindex = tr.index(parent);

            tdIndex = parent2.index();
            //1
            value = getValue(tr, trindex, 2);

            if (!value) {
                value = parseFloat(0).toFixed(2);
            }
            else {
                value = parseFloat(value);
            }
            if (tdIndex === 2) {
                if (2 < trindex && trindex < 5) {
                    value = value * 0.17;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (trindex === 5) {
                    value = value * 0.13;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (5 < trindex && trindex < 12) {
                    value = value * 0.11;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (11 < trindex && trindex < 17) {
                    value = value * 0.06;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (16 < trindex && trindex < 19) {
                    value = value * 0.05;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (18 < trindex && trindex < 28) {
                    value = value * 0.03;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else if (trindex === 28) {
                    value = value * 0.015;
                    setValue(tr, trindex, 3, value.toFixed(2));
                }
                else {
                }
            }


            for (var i = 2; i < tr.length; i++) {
                if (i === 3 || i === 5 || i === 6 || i === 12 || i === 17 || i === 19 || i === 28 || i === 31 || i === 32) {
                    total_je += getValue(tr, i, 2);//金额合计
                    total_se += getValue(tr, i, 3);//税额合计
                }
            }
            setValue(tr, 1, 2, total_je.toFixed(2));//设置金额合计值
            setValue(tr, 1, 3, total_se.toFixed(2));//设置税额合计值


            var allow = checkValue(tdIndex);
            if (!allow) {
                return false;
            }
            //第2栏≥第3栏
            function checkValue(column) {
                removeErrors(tr, trindex, tdIndex);
                if (Number(getValue(tr, 4, column)) > Number(getValue(tr, 3, column))) {
                    SetErrors(tr, 3, column);
                    reportSB.showAlert("第2栏必须≥第3栏，请检查！", "本期抵扣进项税额结构明细表", function () {
                        tr.eq(4).find('.report_error').find("input").focus();
                    });
                    return false;
                }
                    //第5栏≥第6栏+第7栏+第8栏+第9栏+第10栏
                else if (Number(getValue(tr, 6, column)) < Number(getValue(tr, 7, column)) + Number(getValue(tr, 8, column)) +
                    Number(getValue(tr, 9, column)) + Number(getValue(tr, 10, column)) + Number(getValue(tr, 11, column))) {
                    SetErrors(tr, 6, column);
                    reportSB.showAlert("第5栏必须≥第6栏+第7栏+第8栏+第9栏+第10栏，请检查！", "本期抵扣进项税额结构明细表", function () {
                        parent2.find("input").focus();
                    });
                    return false;
                }
                    //第11栏≥第12栏+第13栏+第14栏+第15栏
                else if (Number(getValue(tr, 12, column)) < Number(getValue(tr, 13, column)) + Number(getValue(tr, 14, column))
                    + Number(getValue(tr, 15, column)) + Number(getValue(tr, 16, column))) {
                    SetErrors(tr, 12, column);
                    reportSB.showAlert("第11栏必须≥第12栏+第13栏+第14栏+第15栏，请检查！", "本期抵扣进项税额结构明细表", function () {
                        parent2.find("input").focus();
                    });
                    return false;
                }
                    //第16栏≥第17栏；
                else if (Number(getValue(tr, 17, column)) < Number(getValue(tr, 18, column))) {
                    SetErrors(tr, 18, column);
                    reportSB.showAlert("第16栏必须≥第17栏，请检查！", "本期抵扣进项税额结构明细表", function () {
                        tr.eq(18).find('.report_error').find("input").focus();
                    });
                    return false;
                }
                    // 第18栏≥第19栏+第20栏+第21栏+第22栏+第23栏+第24栏+第25栏+第26栏
                else if (Number(getValue(tr, 19, column)) < Number(getValue(tr, 20, column)) + Number(getValue(tr, 21, column)) +
                    Number(getValue(tr, 22, column)) + Number(getValue(tr, 23, column)) + Number(getValue(tr, 24, column)) +
                    Number(getValue(tr, 25, column)) + Number(getValue(tr, 26, column)) + Number(getValue(tr, 27, column))) {
                    SetErrors(tr, 19, column);
                    reportSB.showAlert("第18栏必须≥第19栏+第20栏+第21栏+第22栏+第23栏+第24栏+第25栏+第26栏，请检查！",
                        "本期抵扣进项税额结构明细表", function () {
                            parent2.find("input").focus();
                        });
                    return false;
                }
                else {
                }
                return true;
            }


        })
    };*/

    /***
     * table4 增值税纳税申报表附列资料（三）
     * **/
    function ysfwkcxmmx_init(flag) {
        if (flag) {
            var cfg = sb_ysfwkcxmmx_cfg;
            reportSB.setTable('table.ysfwkcxmmx');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_ysfwkcxmmx_savexml)
            page[3] = reportSB.init();
            page[3].setTitle('服务、不动产和无形资产扣除项目明细');

            settable4event();
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.ysfwkcxmmx',j3CorrectXml,cfg);
                dataToTable4();
            }
        }
    }

    var settable4event = function () {
        var tr = $('table.ysfwkcxmmx').find('tbody tr');
        var eventTr = tr;
        var trindex, value, parent;

        // $.each(eventTr,function(i,v){
        eventTr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);
            //1

            var parent2 = $(this).parent().parent();
            parent = parent2.parent();
            trindex = tr.index(parent);
            // 4
            value = getValue(tr, trindex, 2) + getValue(tr, trindex, 3);
            setValue(tr, trindex, 4, value);

            value = getValue(tr, trindex, 4) - getValue(tr, trindex, 5);
            setValue(tr, trindex, 6, value);
            var v1 = getValue(tr, trindex, 1);
            var v4 = getValue(tr, trindex, 4);
            var v5 = getValue(tr, trindex, 5);
            if (!(v1 < 0 || v4 < 0)) {
                if (v5 > v1) {
                    SetErrors(tr, trindex, 5);
                    reportSB.showAlert("第5列必须 ≤ 第1列，请检查！", "服务、不动产和无形资产扣除项目明细", function () {
                        tr.find('.report_error').find("input").focus();
                    })
                }
                else if (v5 > v4) {
                    SetErrors(tr, trindex, 5);
                    reportSB.showAlert(" 第5列必须 ≤ 第4列，请检查！", "服务、不动产和无形资产扣除项目明细", function () {
                        tr.find('.report_error').find("input").focus();
                    })
                } else {
                    removeErrors(tr, trindex, 5);
                }
            }
            else {
                if (v5 != 0) {
                    SetErrors(tr, trindex, 5);
                    reportSB.showAlert("第1列或第4列为负数时，第5列必须为0，请检查！", "服务、不动产和无形资产扣除项目明细", function () {
                        tr.find('.report_error').find("input").focus();
                    })
                } else {
                    removeErrors(tr, trindex, 5);
                }
            }

        });
        // 设置期初核定
        for (var i = 0; i < 8; i++) {
            tr.eq(i).find('input:eq(1)').val(getHdValueByCode('YBNSRFB3QCYE' + (i + 1), 'wsxx')).blur();
        }
    };

    /**
     * table5
     * **/
    function sedjqkb_init(flag) {
        if (flag) {
            var cfg = sb_sedjqkb_cfg;
            var tr = $('table.sedjqkb').find('tbody tr');
            reportSB.setTable('table.sedjqkb');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_sedjqkb_savexml);
            page[4] = reportSB.init();
            page[4].setTitle('税额抵减情况表');

            settable5event(tr);
            // ZGLXDM=543，YBNSRZFJGBZ=1时第2行本期发生额、本期实际抵减税额可编辑，否则只读
            var ZGLXDM = getHdValueByCode('ZGLXDM', 'wsxx');
            var YBNSRZFJGBZ = getHdValueByCode('YBNSRZFJGBZ', 'wsxx');
            if (ZGLXDM == '543' && YBNSRZFJGBZ == '1') {
                tr.eq(1).find('td:eq(3),td:eq(7)').removeClass('readonly').find('input').removeAttr('disabled');
            }
            // 期初余额取核定值
            var wsxxArr = ['FB4JZEQCYE', 'FB4FZJGYJQCYE', 'FB4JZFWYJQCYE', 'FB4XSBDCYJQCYE', 'FB4CZBDCYJQCYE'];
            for (var i = 0; i < 5; i++) {
                var inputDom = tr.eq(i).find('input');
                inputDom.eq(0).val(Number(getHdValueByCode(wsxxArr[i], 'wsxx')).toFixed(2));
                inputDom.eq(1).blur();
            }
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.sedjqkb',j3CorrectXml,cfg);
                dataToTable5();
            }
        }

    }

    var settable5event = function (tr) {
        var value1, value2, value3;
        tr.find('input').not('[disabled]').bind('blur', function () {
            var input_val = $(this).attr("value");
            resetVal($(this), input_val);
            function check(v1, v2, dom1, dom2) {
                var v3 = Number(v1) - Number(v2);
                if (v3 < 0) {
                    v3 = 0;
                    reportSB.showAlert("第4列必须 ≤ 第3列，请检查！", "税额抵减情况表", function () {
                        $(dom1).focus();
                    });
                }
                tr.find(dom2).val(v3.toFixed(2));
            }

            var trindex = tr.index($(this).parent().parent().parent());
            if (trindex === 0) {
                value1 = tr.find('input.sum11').val();
                value2 = tr.find('input.sum12').val();
                value3 = parseFloat(value1) + parseFloat(value2);
                tr.find('input.sum13').val(value3.toFixed(2));

                value1 = tr.find('input.sum13').val();
                value2 = tr.find('input.sum14').val();
                check(value1, value2, 'input.sum14', 'input.sum15');//计算第3列第5列
            } else if (trindex === 1) {
                value1 = tr.find('input.sum21').val();
                value2 = tr.find('input.sum22').val();
                value3 = parseFloat(value1) + parseFloat(value2);
                tr.find('input.sum23').val(value3.toFixed(2));

                value1 = tr.find('input.sum23').val();
                value2 = tr.find('input.sum24').val();
                check(value1, value2, 'input.sum24', 'input.sum25');//计算第3列第5列
            } else if (trindex === 2) {
                value1 = tr.find('input.sum31').val();
                value2 = tr.find('input.sum32').val();
                value3 = parseFloat(value1) + parseFloat(value2);
                tr.find('input.sum33').val(value3.toFixed(2));

                value1 = tr.find('input.sum33').val();
                value2 = tr.find('input.sum34').val();
                check(value1, value2, 'input.sum34', 'input.sum35');//计算第3列第5列
            } else if (trindex === 3) {
                value1 = tr.find('input.sum41').val();
                value2 = tr.find('input.sum42').val();
                value3 = parseFloat(value1) + parseFloat(value2);
                tr.find('input.sum43').val(value3.toFixed(2));

                value1 = tr.find('input.sum43').val();
                value2 = tr.find('input.sum44').val();
                check(value1, value2, 'input.sum44', 'input.sum45');//计算第3列第5列
            } else if (trindex === 4) {
                value1 = tr.find('input.sum51').val();
                value2 = tr.find('input.sum52').val();
                value3 = parseFloat(value1) + parseFloat(value2);
                tr.find('input.sum53').val(value3.toFixed(2));

                value1 = tr.find('input.sum53').val();
                value2 = tr.find('input.sum54').val();
                check(value1, value2, 'input.sum54', 'input.sum55');//计算第3列第5列
            } else {
            }
        })
    };


    /***
     * 固定资产
     * table7           固定资产进项税额抵扣情况表
     * **/
    /*function gdzcjxsedkqkb_init(flag) {
        if (flag) {
            var cfg = sb_gdzc_cfg;
            var tr = $('table.gdzcjxsedkqkb tbody tr');
            var value1 = getHdValueByCode('77', 'lsxx'),
                value2 = getHdValueByCode('78', 'lsxx');
            reportSB.setTable('table.gdzcjxsedkqkb');
            reportSB.loadConfig(cfg);
            reportSB.loadHD(hdStr);
            reportSB.loadSaveXML(sb_gdzc_savexml)
            page[6] = reportSB.init();
            page[6].setTitle('固定资产（不含不动产）进项税额抵扣情况表');

            setTable7event(tr, Number(value1), Number(value2));

            setValue(tr, 0, 2, value1);
            setValue(tr, 0, 2, value2);
            tr.eq(0).find('input').eq(0).blur();
            //金三报文回填 by liun
            if (isCorrect) {
                // reportSB.preview('table.gdzcjxsedkqkb',j3CorrectXml,cfg);
                dataToTable7();
            }
        }

    }*/

    /*var setTable7event = function (tr, v1, v2) {
        var value;
        tr.find('input:visible').not('[disabled]').bind('blur', function () {
            resetVal($(this), $(this).attr("value"));
            value = getValue(tr, 0, 1) + v1;
            setValue(tr, 0, 2, value);
            value = getValue(tr, 1, 1) + v2;
            setValue(tr, 1, 2, value);

            setValue(tr, 2, 1, getValue(tr, 0, 1) + getValue(tr, 1, 1));

            setValue(tr, 2, 2, getValue(tr, 0, 2) + getValue(tr, 1, 2));
        });
    };*/

    /** 根据核定信息，判断企业是否是总分机构企业和特殊行业企业
     *总分机构企业和特殊行业企业不支持网厅申报，缺少相关的报表，
     *发送报表时，直接不校验数据的正确性，让总局打回，作申报失败处理*/
    function getHDNUB() {
        var result = {};
        var length = 0;
        var code = $(HD).find('WSXXS').find('CODE');
        $.each(code, function (i, v) {
            var val = $(v).text();
            if (val === 'YBNSRHZJNZG') {
                result['YBNSRHZJNZG'] = $(v).nextAll('VALUE').text();
                length++;
            } else if (val === 'TSHY') {
                result['TSHY'] = $(v).nextAll('VALUE').text();
                length++;
            }
            if (length === 2) {
                return false;
            }
        });
        if (result['YBNSRHZJNZG'] === 0 || result['YBNSRHZJNZG'] === 1 || result['TSHY'] === 1 || result['TSHY'] === 2 || result['TSHY'] === 3) {
            return true;
        }
        return false;
    }

    /**
     * 组织主表的sbbhead节点信息
     */
    function buildZbSbbhead() {
        var sbbhead = '<sbbhead>' +
            '<nsrsbh>' + _nsrsbh + '</nsrsbh>' +
            '<nsrmc>' + _nsrmc + '</nsrmc>' +
            '<skssqq>' + skssq[0] + '</skssqq>' +
            '<skssqz>' + skssq[1] + '</skssqz>' +
            '<sbsxDm1>11</sbsxDm1>' +
            '<sbrq1>' + tbrq + '</sbrq1>' +
            '</sbbhead>';
        return sbbhead;
    }

    /**
     * 组织附表的sbbhead节点信息
     */
    function buildFbSbbhead(sbbheadNode) {
        // 头节点
        sbbheadNode = sbbheadNode || 'sbbhead';
        var sbbhead = '<' + sbbheadNode + '>' +
            '<nsrsbh>' + _nsrsbh + '</nsrsbh>' +
            '<nsrmc>' + _nsrmc + '</nsrmc>' +
            '<skssqq>' + skssq[0] + '</skssqq>' +
            '<skssqz>' + skssq[1] + '</skssqz>' +
            '</' + sbbheadNode + '>';
        return sbbhead;
    }

    //table1--ok
    var changetable1 = function () {
        debugger;
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildZbSbbhead();
        sb_zzsybnsr_newxml = sb_zzsybnsr_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['001'], sb_zzsybnsr_newxml);
        var temp = 2;
        for (var i = 0; i < 38; i++) {
            temp = 2 + i;
            reportUtil.turn('SB_NSSBB_MXXX.SB_NSSBB_JEXX.[' + i + '].1 to zbGrid.zbGridlbVO.[0].' + temp);
            reportUtil.turn('SB_NSSBB_MXXX.SB_NSSBB_JEXX.[' + i + '].2 to zbGrid.zbGridlbVO.[1].' + temp);
            reportUtil.turn('SB_NSSBB_MXXX.SB_NSSBB_JEXX.[' + i + '].3 to zbGrid.zbGridlbVO.[2].' + temp);
            reportUtil.turn('SB_NSSBB_MXXX.SB_NSSBB_JEXX.[' + i + '].4 to zbGrid.zbGridlbVO.[3].' + temp);
        }
        var xml = reportUtil.end();
        $(xml).find("zbGridlbVO:eq(1) qmldse").html("0.00");
        sb_bw['001'] = xml;
    };
    function dataToTable1() {
        var $trs = $('table.zzsnssbb tbody tr');
        // var $zzssyyybnsrZb = reportSB.loadXML(sb_zzsybnsr_newxml);  //本地测试用
        var $zzssyyybnsrZb = $(j3CorrectXml).find('zzssyyybnsr_zb');
        var $zbGridlbVO = $zzssyyybnsrZb.find('zbGrid zbGridlbVO');
        var arr = [[34], [16, 27, 28, 32, 33, 34], [6, 7, 8, 9, 14, 15, 21, 25, 28, 35, 36, 37], [6, 7, 8, 9, 12, 14, 15, 16, 19, 21, 25, 27, 28, 32, 33, 35, 36, 37]];
        var arr_3 = [0, 10, 24];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 38; j++) {
                if ($.inArray(j, arr[i]) > -1) {
                    continue;
                }
                if ($.inArray(j, arr_3) > -1) {
                    if (i === 0) {
                        $trs.eq(j).find('td:eq(3)').find('input').val($zbGridlbVO.eq(0).children().eq(j + 2).text());
                    } else if (i === 1) {
                        $trs.eq(j).find('td:eq(4)').find('input').val($zbGridlbVO.eq(1).children().eq(j + 2).text());
                    } else if (i === 2) {
                        $trs.eq(j).find('td:eq(6)').find('input').val($zbGridlbVO.eq(2).children().eq(j + 2).text());
                    } else if (i === 3) {
                        $trs.eq(j).find('td:eq(8)').find('input').val($zbGridlbVO.eq(3).children().eq(j + 2).text());
                    }
                } else {
                    if (i === 0) {
                        $trs.eq(j).find('td:eq(2)').find('input').val($zbGridlbVO.eq(0).children().eq(j + 2).text());
                    } else if (i === 1) {
                        $trs.eq(j).find('td:eq(3)').find('input').val($zbGridlbVO.eq(1).children().eq(j + 2).text());
                    } else if (i === 2) {
                        $trs.eq(j).find('td:eq(5)').find('input').val($zbGridlbVO.eq(2).children().eq(j + 2).text());
                    } else if (i === 3) {
                        $trs.eq(j).find('td:eq(7)').find('input').val($zbGridlbVO.eq(3).children().eq(j + 2).text());
                    }
                }
            }
        }
    }

    //table2--本期销售情况明细表
    var changetable2 = function () {
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildFbSbbhead();
        sb_bqxsqkmx_newxml = sb_bqxsqkmx_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['002'], sb_bqxsqkmx_newxml);
        for (var i = 0; i < 23; i++) {
            reportUtil.turn('SB_FLZLY_MXXX.SB_FLZLY_MX.[' + i + '].1-2-3-4-5-6-7-8-9-10-11-12-13-14 to bqxsqkmxbGrid.bqxsqkmxbGridlbVO.[' + i + '].2-3-4-5-6-7-8-9-10-11-12-13-14-15');
        }
        var xml = reportUtil.end();
        // 页面上为 -- 的单元格，转成报文时节点为空，移除为空的节点
        $(xml).find('bqxsqkmxbGridlbVO').children().each(function (i, v) {
            if (!$(v).text()) {
                $(v).remove();
            }
        });
        sb_bw['002'] = xml;
    };
    function dataToTable2() {
        var $trs = $('table.bqxsmx tbody tr');
        var $bqxsqkmxb = $(j3CorrectXml).find('zzssyyybnsr01_bqxsqkmxb');
        var $bqxsqkmxbGridlbVO = $bqxsqkmxb.find('bqxsqkmxbGrid bqxsqkmxbGridlbVO');
        var arr = [[10, 11, 12, 13], [], [10, 11, 12, 13], [10, 11, 12, 13], [], [], [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6, 7], [6, 7.10, 11, 12, 13],
            [6, 7, 10, 11, 12, 13], [6, 7], [6, 7, 10, 11, 12, 13], [6, 7, 10, 11, 12, 13], [6, 7], [6, 7], [6, 7], [6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6, 7],
            [0, 1, 3, 5, 6, 7, 9, 10, 11, 12, 13], [0, 1, 3, 5, 6, 7, 9, 13], [3, 5, 6, 7, 9, 10, 11, 12, 13], [0, 1, 3, 5, 6, 7, 9, 13]];
        var arr_4 = [0, 8];
        var arr_3 = [6, 17, 19, 21];
        var arr_1 = [15, 16];
        for (var i = 0; i < 23; i++) {
            for (var j = 0; j < 14; j++) {
                if ($.inArray(j, arr[i]) > -1) {
                    continue;
                }
                if ($.inArray(i, arr_4) > -1) {
                    $trs.eq(i).find('td:eq(' + (j + 4) + ')').find('input').val($bqxsqkmxbGridlbVO.eq(i).children().eq(j + 2).text());
                } else if ($.inArray(i, arr_3) > -1) {
                    $trs.eq(i).find('td:eq(' + (j + 3) + ')').find('input').val($bqxsqkmxbGridlbVO.eq(i).children().eq(j + 2).text());
                } else if ($.inArray(i, arr_1) > -1) {
                    $trs.eq(i).find('td:eq(' + (j + 1) + ')').find('input').val($bqxsqkmxbGridlbVO.eq(i).children().eq(j + 2).text());
                } else {
                    $trs.eq(i).find('td:eq(' + (j + 2) + ')').find('input').val($bqxsqkmxbGridlbVO.eq(i).children().eq(j + 2).text());
                }

            }
        }
    }
    // 监控未开具发票数据
    function checkWkjfb() {
        var fb1_col5_total = 0;
        var fb1_col6_total = 0;
        var tr = $('table.bqxsmx tbody tr');
        var col5Arr = [8, 6, 6, 6, 6, 6, 0, 0, 8, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 7, 6, 7, 6];
        var col6Arr = [9, 7, 7, 7, 7, 7, 0, 0, 9, 7, 7, 7, 7, 7, 7, 6, 6, 0, 0, 0, 0, 0, 0];
        for (var i = 0, len = col5Arr.length; i < len; i++) {
            var col5Td = col5Arr[i];
            if (col5Td !== 0) {
                fb1_col5_total += (Number(tr.eq(i).find('td').eq(col5Td).find('input').val()) || 0);
            }
        }
        for (var j = 0, lent = col6Arr.length; j < lent; j++) {
            var col6Td = col6Arr[j];
            if (col6Td !== 0) {
                fb1_col6_total += (Number(tr.eq(j).find('td').eq(col6Td).find('input').val()) || 0);
            }
        }
        var msgCol5 = '您填写的增值税纳税申报表附列资料（一）【本期销售情况明细表】中未开具发票销售额所有栏次之和小于0，请至办税大厅申报。',
            msgCol6 = '您填写的增值税纳税申报表附列资料（一）【本期销售情况明细表】中未开具发票销项(应纳)税额所有栏次之和小于0，请至办税大厅申报。';

        if (fb1_col5_total < 0) {
            if (WKJFPXSEHJ > 0) {
                if (Math.abs(fb1_col5_total) > WKJFPXSEHJ) {
                    reportSB.showAlert(msgCol5);
                    return false;
                }
            } else {
                if (fb1_col5_total < 0) {
                    reportSB.showAlert(msgCol5);
                    return false;
                }
            }
        }
        if (fb1_col6_total < 0) {

            if (WKJFPXXSEHJ > 0) {
                if (Math.abs(fb1_col6_total) > WKJFPXXSEHJ) {
                    reportSB.showAlert(msgCol6);
                    return false;
                }
            } else {
                if (fb1_col6_total < 0) {
                    reportSB.showAlert(msgCol6);
                    return false;
                }
            }
        }
        return true;
    }

    //table3--本期进项税额明细表
    var changetable3 = function () {
        var tr = $('table.bqjxsemx').find('tbody tr'), v1, v2, v3;
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildFbSbbhead();
        sb_bqjxsemx_newxml = sb_bqjxsemx_newxml.replace('<sbbhead></sbbhead>', sbbhead);

        reportUtil.setIn_OutXML(fb['003'], sb_bqjxsemx_newxml);

        // 一、申报抵扣的进项税额
        for (var i = 0; i < 13; i++) {
            if (i < 7) {
                reportUtil.turn('SB_FLZLE_SBDKDJXSE_MXXX.[' + i + '].1-2-3 to bqjxsemxbGridlbVO.[' + i + '].4-5-6');
            } else if (i === 7) {
                reportUtil.turn('SB_FLZLE_SBDKDJXSE_MXXX.[7].3 to bqjxsemxbGridlbVO.[36].6');
            } else if (i > 7) {
                reportUtil.turn('SB_FLZLE_SBDKDJXSE_MXXX.[' + i + '].1-2-3 to bqjxsemxbGridlbVO.[' + (i - 1) + '].4-5-6');
            }

        }
        // 二、进项税额转出额
        for (var i = 13; i < 24; i++) {
            reportUtil.turn('SB_FLZLE_JXSEZCE_MXXX.[' + (i - 13) + '].1 to bqjxsemxbGridlbVO.[' + (i - 1) + '].4');
        }
        // 三、待抵扣进项税额
        for (var i = 24; i < 35; i++) {
            reportUtil.turn('SB_FLZLE_DDKJXSE_MXXX.[' + (i - 24) + '].1-2-3 to bqjxsemxbGridlbVO.[' + (i - 1) + '].4-5-6');
        }
        // 四、其他
        reportUtil.turn('SB_FLZLE_QT_MXXX.[0].1-2-3 to bqjxsemxbGridlbVO.[34].4-5-6');
        reportUtil.turn('SB_FLZLE_QT_MXXX.[1].1-2-3 to bqjxsemxbGridlbVO.[35].4-5-6');
        var xml = reportUtil.end();
        sb_bw['003'] = xml;
    };
    function dataToTable3() {
        var $trs = $('table.bqjxsemx tbody tr');
        var $bqjxsemxb = $(j3CorrectXml).find('zzssyyybnsr02_bqjxsemxb');
        var $bqjxsemxbGridlbVO = $bqjxsemxb.find('bqjxsemxbGrid bqjxsemxbGridlbVO');
        var arr = [[7, 10, 11, 24, 34, 36], [6, 7, 10, 11, 24, 32, 34, 36], [24, 34]];
        for (var i = 0; i < 3; i++) {
            for (var j = 1; j < 38; j++) {
                if ($.inArray(j, arr[i]) > -1) {
                    continue;
                }
                var $curTr_1 = $trs.eq(j - 1);
                var $curTr_0 = $trs.eq(j);
                var $curTr_2 = $trs.eq(j + 2);
                var $curTr_4 = $trs.eq(j + 4);
                var $curTr_6 = $trs.eq(j + 6);
                if (j < 8) {
                    $curTr_1.find('td:eq(' + (i + 2) + ') input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(i + 4).text());
                } else if (j > 7 && j < 13) {
                    $curTr_0.find('td:eq(' + (i + 2) + ') input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(i + 4).text());
                } else if (j > 12 && j < 24 && i === 0) {
                    $curTr_2.find('td:eq(2) input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(6).text());
                } else if (j > 23 && j < 34) {
                    $curTr_4.find('td:eq(' + (i + 2) + ') input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(i + 4).text());
                } else if (j > 34 && j < 37) {
                    $curTr_6.find('td:eq(' + (i + 2) + ') input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(i + 4).text());
                } else if (j === 37) {
                    $trs.eq(8).find('td:eq(' + (i + 2) + ') input').val($bqjxsemxbGridlbVO.eq(j - 1).children().eq(i + 4).text());
                }
            }
        }
    }

    //table4 附列三  应税服务项目扣除明细
    var changetable4 = function () {
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildFbSbbhead();
        sb_ysfwkcxmmx_newxml = sb_ysfwkcxmmx_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['006'], sb_ysfwkcxmmx_newxml);
        for (var i = 0; i < 9; i++) {
            reportUtil.turn('SB_FLZL3_MXXX.SB_FLZL3_JEXX.[' + i + '].1-2-3-4-5-6 to ysfwkcxmmxGrid.ysfwkcxmmxGridlbVO.[' + i + '].4-2-7-5-6-3');
        }
        var xml = reportUtil.end();
        sb_bw['006'] = xml;
    };
    function dataToTable4() {
        var $trs = $('table.ysfwkcxmmx tbody tr');
        var $ysfwkcxmmx = $(j3CorrectXml).find('zzssyyybnsr03_ysfwkcxmmx');
        var $ysfwkcxmmxGridlbVO = $ysfwkcxmmx.find('ysfwkcxmmxGrid ysfwkcxmmxGridlbVO');
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 6; j++) {
                $trs.eq(i).find('td:eq(' + (j + 1) + ')').find('input').val($ysfwkcxmmxGridlbVO.eq(i).children().eq(j + 2).text());
            }
        }
    }

    //table5-- 税额抵减情况
    var changetable5 = function () {
        var tr = $('table.sedjqkb').find('tbody tr');
        var v1, v2, v3, v4, v5;
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildFbSbbhead();
        sb_sedjqkb_newxml = sb_sedjqkb_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['031'], sb_sedjqkb_newxml);
        for (var i = 0; i < 5; i++) {
            v1 = getBwValue(tr, i, 2);
            v2 = getBwValue(tr, i, 3);
            v3 = getBwValue(tr, i, 5);
            v4 = getBwValue(tr, i, 7);
            v5 = getBwValue(tr, i, 9);
            reportUtil.turn('(' + v1 + ') to bqjxsemxbGrid.bqjxsemxbGridlbVO.[' + i + '].qcye');
            reportUtil.turn('(' + v2 + ') to bqjxsemxbGrid.bqjxsemxbGridlbVO.[' + i + '].bqfse');
            reportUtil.turn('(' + v3 + ') to bqjxsemxbGrid.bqjxsemxbGridlbVO.[' + i + '].bqydjse');
            reportUtil.turn('(' + v4 + ') to bqjxsemxbGrid.bqjxsemxbGridlbVO.[' + i + '].bqsjdjse');
            reportUtil.turn('(' + v5 + ') to bqjxsemxbGrid.bqjxsemxbGridlbVO.[' + i + '].qmye');
        }
        var xml = reportUtil.end();
        sb_bw['031'] = xml;
    };
    function dataToTable5() {
        var $trs = $('table.sedjqkb tbody tr');
        var $bqjxsemxb = $(j3CorrectXml).find('zzssyyybnsr04_bqjxsemxb');
        var $bqjxsemxbGridlbVO = $bqjxsemxb.find('bqjxsemxbGrid bqjxsemxbGridlbVO');
        for (var i = 0; i < 5; i++) {
            $trs.eq(i).find('td:eq(2)').find('input').val($bqjxsemxbGridlbVO.eq(i).children().eq(2).text());
            $trs.eq(i).find('td:eq(3)').find('input').val($bqjxsemxbGridlbVO.eq(i).children().eq(3).text());
            $trs.eq(i).find('td:eq(5)').find('input').val($bqjxsemxbGridlbVO.eq(i).children().eq(4).text());
            $trs.eq(i).find('td:eq(7)').find('input').val($bqjxsemxbGridlbVO.eq(i).children().eq(5).text());
            $trs.eq(i).find('td:eq(9)').find('input').val($bqjxsemxbGridlbVO.eq(i).children().eq(6).text());
        }
    }

    //table6 增值税减免明细表
    var changetable6 = function () {
        reportUtil.setIn_OutXML(fb['081'], sb_zzsjmssbmxb_newxml);
        var jmxmSelect = $('#table8 tbody select');
        msxmArr = [];
        jsxmArr = [];
        for (var i = 0; i < jmxmSelect.length; i++) {
            var value = $(jmxmSelect[i]).val();
            if (!!value) {
                //var text = $(jmxmSelect[i]).val();
                if (i > 4) {
                    msxmArr.push(value);
                } else {
                    jsxmArr.push(value);
                }
            }

        }
        for (var i = 0; i < jsxmArr.length; i++) {
            reportUtil.turn('(' + jsxmArr[i] + ') to zzsjmssbmxbjsxmGridlbVO.[' + (i + 1) + '].1');
            reportUtil.turn('SB_ZZSJMSSBMXB_JSMXXX.SB_ZZSJMSSBMXB_JEXX.[' + (i + 1) + '].2-3-4-5-6 to zzsjmssbmxbjsxmGridlbVO.[' + (i + 1) + '].2-3-4-5-6');
        }
        for (var i = 0; i < msxmArr.length; i++) {
            reportUtil.turn('(' + msxmArr[i] + ') to zzsjmssbmxbmsxmGridlbVO.[' + (i + 3) + '].1');
            reportUtil.turn('SB_ZZSJMSSBMXB_MSMXXX.SB_ZZSJMSSBMXB_JEXX.[' + (i + 3) + '].2-3-4-5-6 to zzsjmssbmxbmsxmGridlbVO.[' + (i + 3) + '].2-3-4-5-6');
        }
        reportUtil.turn('SB_ZZSJMSSBMXB_BTXX.20-21-22-23-24 to zzsjmssbmxbjsxmGridlbVO.[0].2-3-4-5-6');
        reportUtil.turn('SB_ZZSJMSSBMXB_BTXX.27-28-29-30-31 to zzsjmssbmxbmsxmGridlbVO.[0].2-3-4-5-6');
        reportUtil.turn('SB_ZZSJMSSBMXB_BTXX.25 to zzsjmssbmxbmsxmGridlbVO.[1].2');
        reportUtil.turn('SB_ZZSJMSSBMXB_BTXX.26 to zzsjmssbmxbmsxmGridlbVO.[2].2');
        var xml = reportUtil.end();

        if (jsxmArr.length === 0) {
            $(xml).find('zzsjmssbmxbjsxmGridlbVO').filter(':gt(0)').remove();
        } else {
            $(xml).find('zzsjmssbmxbjsxmGridlbVO').filter(':gt(' + jsxmArr.length + ')').remove();
        }
        if (msxmArr.length === 0) {
            $(xml).find('zzsjmssbmxbmsxmGridlbVO').filter(':gt(2)').remove();
        }
        else {
            $(xml).find('zzsjmssbmxbmsxmGridlbVO').filter(':gt(' + (msxmArr.length + 2) + ')').remove();
        }
        sb_bw['081'] = xml;
    };
    function dataToTable6() {
        var $trs = $('table.zzsjmmxb tbody tr');
        var $zzsjmssbmxb = $(j3CorrectXml).find('zzsjmssbmxb');
        var $zzsjmssbmxbjsxmGridlbVO = $zzsjmssbmxb.find('zzsjmssbmxbjsxmGrid zzsjmssbmxbjsxmGridlbVO');
        var $zzsjmssbmxbmsxmGridlbVO = $zzsjmssbmxb.find('zzsjmssbmxbmsxmGrid zzsjmssbmxbmsxmGridlbVO');
        for (var i = 0; i < 6; i++) {
            var $curTr_3 = $trs.eq(i + 9);
            if (i === 0) {
                $trs.eq(i).find('td:eq(4)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(3).text());
                $trs.eq(i).find('td:eq(5)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(4).text());
                $trs.eq(i).find('td:eq(6)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(7)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(8)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(7).text());
            } else if (i > 0 && i < 6) {
                $trs.eq(i).find('td:eq(0)').find('select').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(2).text());
                $trs.eq(i).find('td:eq(4)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(3).text());
                $trs.eq(i).find('td:eq(5)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(4).text());
                $trs.eq(i).find('td:eq(6)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(7)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(6).text());
                $trs.eq(i).find('td:eq(8)').find('input').val($zzsjmssbmxbjsxmGridlbVO.eq(i).children().eq(7).text());
            }
        }
        for (var i = 0; i < 10; i++) {
            if (i === 0) {
                $curTr_3.find('td:eq(4)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(3).text());
                $curTr_3.find('td:eq(5)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(4).text());
                $curTr_3.find('td:eq(6)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(5).text());
                $curTr_3.find('td:eq(7)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(6).text());
                $curTr_3.find('td:eq(8)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(7).text());
            } else if (i > 0 && i < 3) {
                $curTr_3.find('td:eq(4)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(3).text());
            } else if (i > 2) {
                $curTr_3.find('td:eq(0)').find('select').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(2).text());
                $curTr_3.find('td:eq(4)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(3).text());
                $curTr_3.find('td:eq(5)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(4).text());
                $curTr_3.find('td:eq(6)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(5).text());
                $curTr_3.find('td:eq(7)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(6).text());
                $curTr_3.find('td:eq(8)').find('input').val($zzsjmssbmxbmsxmGridlbVO.eq(i).children().eq(7).text());
            }
        }
    }

    //table7--固定资产进项税额抵扣
    /*var changetable7 = function () {
        // 组织替换报表sbbhead节点信息
        var sbbhead = buildFbSbbhead('sbbheadVO');
        sb_gdzc_newxml = sb_gdzc_newxml.replace('<sbbheadVO></sbbheadVO>', sbbhead);
        reportUtil.setIn_OutXML(fb['030'], sb_gdzc_newxml);
        reportUtil.turn('sb_gdzcjxsedkqkb_mxxx.jexx.[0].0-1 to gdzcjxsedkqkbformVO.3-1');
        reportUtil.turn('sb_gdzcjxsedkqkb_mxxx.jexx.[1].0-1 to gdzcjxsedkqkbformVO.2-0');
        var xml = reportUtil.end();
        sb_bw['030'] = xml;
    };*/
    /*function dataToTable7 () {
        var $trs = $('table.gdzcjxsedkqkb tbody tr');
        var $gdzcjxsedkqkb = $(j3CorrectXml).find('zzsybnsrsb_gdzcjxsedkqkb');
        var $gdzcjxsedkqkbformVO = $gdzcjxsedkqkb.find('gdzcjxsedkqkbformVO');
        $trs.eq(0).find('td:eq(1)').find('input').val($gdzcjxsedkqkbformVO.find("zzszyfpJxse").text());
        $trs.eq(0).find('td:eq(2)').find('input').val($gdzcjxsedkqkbformVO.find("zzszyfpJxselj").text());
        $trs.eq(1).find('td:eq(1)').find('input').val($gdzcjxsedkqkbformVO.find("hgjkzzszyjksJxse").text());
        $trs.eq(1).find('td:eq(2)').find('input').val($gdzcjxsedkqkbformVO.find("zzszyfpJxse").text());
    }*/
    //table8  应税服务项目扣除清单
    var changetable8 = function () {
        reportUtil.setIn_OutXML(fb['033'], sb_ysfwkcqd_newxml);
        var index = reportUtil.match('SB_YSFWKCXMQD_MXXX.SB_YSFWKCXMQD_JEXX to sb_fb_ysfwjcxmqd_sbxxGrid.sb_fb_ysfwjcxmqd_sbxxGridlb', 0)
        for (var i = 0; i < index; i++) {
            reportUtil.turn('SB_YSFWKCXMQD_MXXX.SB_YSFWKCXMQD_JEXX.[' + i + '].1-2-3-4-5-6-7 to sb_fb_ysfwjcxmqd_sbxxGrid.sb_fb_ysfwjcxmqd_sbxxGridlb.[' + i + '].0-1-2-3-4-5-6');
        }
        var xml = reportUtil.end();
        var $select = $('table.sb_ysfwkc').find('select');
        var length = 0;
        $.each($select, function (i, v) {
            var value = $(v).val();
            if (!!value) {
                length++;
            }
        });
        if (length === 0) {
            $(xml).find('sb_fb_ysfwjcxmqd_sbxxGridlb').remove();
        }
        sb_bw['033'] = xml;
    };
    // 不动产分期抵扣
    var changetable9 = function () {
        var sbbhead = buildFbSbbhead();
        sb_bdcfqdkjsb_newxml = sb_bdcfqdkjsb_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['082'], sb_bdcfqdkjsb_newxml);
        var tr = $('table.bdcfqdkjsb').find('tbody tr');

        for (var i = 0; i <= 5; i++) {
            var value = getBwValue(tr, 2, i);
            //reportUtil.turn('SB_ZZSFBWSBMXB_MXXX.SB_ZZSFBWSBMXB_JEXX.[0].0-1-2-3-4-5-6-7 to bdcfqdkjsbGrid.bdcfqdkjsbGridlbVO.[0].0-1-2-3-4-5-6-7');
            reportUtil.turn('(' + value + ') to bdcfqdkjsbGrid.bdcfqdkjsbGridlbVO.[0].' + (i + 2));
        }

        var xml = reportUtil.end();
        sb_bw['082'] = xml;
    };
    function dataToTable9() {
        var $trs = $('table.bdcfqdkjsb tr');
        var $bdcfqdkjsb = $(j3CorrectXml).find('zzssyyybnsr05_bdcfqdkjsb');
        var $bdcfqdkjsbGridlbVO = $bdcfqdkjsb.find('bdcfqdkjsbGrid bdcfqdkjsbGridlbVO');
        $trs.eq(2).find('td:eq(0)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(2).text());
        $trs.eq(2).find('td:eq(1)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(3).text());
        $trs.eq(2).find('td:eq(2)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(4).text());
        $trs.eq(2).find('td:eq(3)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(5).text());
        $trs.eq(2).find('td:eq(4)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(6).text());
        $trs.eq(2).find('td:eq(5)').find('input').val($bdcfqdkjsbGridlbVO.eq(0).children().eq(7).text());
    }
    // 本期抵扣进项税额
    /*var changetable10 = function () {
        var sbbhead = buildFbSbbhead();
        sb_bqdkjxsejgmx_newxml = sb_bqdkjxsejgmx_newxml.replace('<sbbhead></sbbhead>', sbbhead);
        reportUtil.setIn_OutXML(fb['083'], sb_bqdkjxsejgmx_newxml);
        var tr = $('table.bqdkjxsejgmx').find('tbody tr');
        var j = 0;
        for (var i = 0; i < 33; i++) {
            if (i !== 0 && i !== 2 && i !== 29 && i !== 30) {//循环获取表格填写的数据，转到报文相应的行
                var value_je = getBwValue(tr, i, 2);
                var value_se = getBwValue(tr, i, 3);
                reportUtil.turn('(' + value_je + ') to bqdkjxsejgmxbGrid.bqdkjxsejgmxbGridlbVO.[' + j + '].je');
                reportUtil.turn('(' + value_se + ') to bqdkjxsejgmxbGrid.bqdkjxsejgmxbGridlbVO.[' + j + '].se');
                //报文行自增
                j++;
                if (j == 27) j = j + 1; //跳除没有值的那一栏
            }
        }
        var xml = reportUtil.end();
        sb_bw['083'] = xml;
    };*/
    /*function dataToTable10 () {
        var $trs = $('table.bqdkjxsejgmx tr');
        var $bqdkjxsejgmxb = $(j3CorrectXml).find('zzssyyybnsr_bqdkjxsejgmxb');
        var $bqdkjxsejgmxbGridlbVO = $bqdkjxsejgmxb.find('bqdkjxsejgmxbGrid bqdkjxsejgmxbGridlbVO');
        for (var i = 0; i < 30; i++) {
            if (i === 0) {
                $trs.eq(1).find('td:eq(2)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(2).text());
                $trs.eq(1).find('td:eq(3)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(3).text());
            } else if (i > 0 && i < 27) {
                $trs.eq(i + 2).find('td:eq(2)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(2).text());
                $trs.eq(i + 2).find('td:eq(3)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(3).text());
            } else if (i > 27) {
                $trs.eq(i + 3).find('td:eq(2)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(2).text());
                $trs.eq(i + 3).find('td:eq(3)').find('input').val($bqdkjxsejgmxbGridlbVO.eq(i).children().eq(3).text());
            }

        }
    }*/
    // 营改增税负分析测算表
    function changetable11() {
        var tr = $('table.ygzsffxcsmx tr:lt(' + (cspmLength + 5) + '):gt(4)');
        var j = 0, zzssl, yyssl, ysxmdm, ysxmmc;
        reportUtil.setIn_OutXML(fb['085'], sb_ygzsffxcsmx_newxml);
        for (var i = 0; i < 15; i++) {
            ysxmdm = $('#ysxmdmjmc-' + (i + 1)).val();
            if (!!ysxmdm) {
                zzssl = $('.zzsSelect' + (i + 1)).val();
                yyssl = $('.yysSelect' + (i + 1)).val();

                //ysxmmc = $('#ysxmdmjmc-' + (i + 1)).attr('value');
                //reportUtil.turn('(' + ysxmmc + ') to ygzsffxcsmxbGrid.ygzsffxcsmxbGridlbVO.[' + i + '].hmc');
                reportUtil.turn('(' + ysxmdm + ') to ygzsffxcsmxbGrid.ygzsffxcsmxbGridlbVO.[' + i + '].ysxmdmjmc');
                reportUtil.turn('(' + zzssl + ') to ygzsffxcsmxbGrid.ygzsffxcsmxbGridlbVO.[' + i + '].zzsslhzsl');
                reportUtil.turn('(' + yyssl + ') to ygzsffxcsmxbGrid.ygzsffxcsmxbGridlbVO.[' + i + '].yyssl');

                reportUtil.turn('SB_YGZSFFXCSMXB_MXXX.SB_YGZSFFXCSMXB_JEXX.[' + i + '].5-6-7-8-9-10-11-12-13-14-15-16-17-18 to ygzsffxcsmxbGrid.ygzsffxcsmxbGridlbVO.[' + i + '].5-6-7-8-9-10-11-12-13-14-15-16-17-18');
                j++;
            }

        }

        var xml = reportUtil.end();

        $(xml).find('ygzsffxcsmxbGridlbVO').filter(':gt(' + (j - 1) + ')').remove();
        if (cspmLength == 0) {
            $(xml).find('ygzsffxcsmxbGrid').empty();
        }
        sb_bw['085'] = xml;
    }
    function dataToTable11() {
        var $trs = $('table.ygzsffxcsmx tbody tr');
        var $ygzsffxcsmxb = $(j3CorrectXml).find('zzssyyybnsr_ygzsffxcsmxb');
        var $ygzsffxcsmxbGridlbVO = $ygzsffxcsmxb.find('ygzsffxcsmxbGrid ygzsffxcsmxbGridlbVO');
        for (var i = 0; i < 26; i++) {
            if (i === 0) {
                $trs.eq(i).find('td:eq(3)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(4)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(5)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(6)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(7)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(8)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(9)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(10)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(11)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(12)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(13)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(14)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(15)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(16)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
            } else {
                $trs.eq(i).find('td:eq(0)').find('select').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(2).text());
                $trs.eq(i).find('td:eq(1)').find('select').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(3).text());
                $trs.eq(i).find('td:eq(2)').find('select').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(4).text());
                $trs.eq(i).find('td:eq(3)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(4)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(5)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(6)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(7)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(8)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(9)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(10)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(11)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(12)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(13)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(14)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(15)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
                $trs.eq(i).find('td:eq(16)').find('input').val($ygzsffxcsmxbGridlbVO.eq(i).children().eq(5).text());
            }
        }
    }

    //检查主表的第11栏的1，3列 和19栏的1，3列是否再次编辑
    function checkZb() {
        var checkzb_result = false;
        var v11 = Number($('#zb11-1').val()) + Number($('#zb11-3').val());
        var v19 = Number($('#zb19-1').val()) + Number($('#zb19-3').val());
        if (v11 != zb11hj || v19 != zb19hj) {
            checkzb_result = true; //发生改变
        }
        return checkzb_result;
    }
    // 检查税负分析测算表的第4列与第10列是否符合要求
    function check085Col4Col11() {
        var tr = $('table.ygzsffxcsmx tr[data-col4col11]');
        var arr = [];
        if (tr.length === 0) {
            return false;
        }
        tr.each(function (i, v) {
            var trIndex = $(v).index();
            arr.push(trIndex);
        });
        if (arr.length === 0) {
            tr.find('.report_error').removeClass('.report_error');
            return false;
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            SetErrors(tr, i, 6);
            SetErrors(tr, i, 13);
        }
        reportSB.showAlert("第4列减第11列的差额的绝对值必须小于等于10，请检查！", "营改增税负分析测算表", function () {
            mini.get("ybnsrsb-tabs").activeTab('085');
        });

        return arr;
    }

    /****
     * save
     * ***/
    $('a.sendOK').bind('click', function () {
        debugger;
        var temp = allClick.concat();
        allClick = $.grep(allClick, function (n, i) {
            return n !== 0;
        });
        var continueSend = function (message) {
            debugger;
            var obj = [];
            var result = false;
            for (var i = 0, len = fbID.length; i < len; i++) {
                fb[fbID[i]] = page[i].onlysave();
                obj.push(page[i]);
            }
            $.each(obj, function (i, v) {
                v.loadFB(fb);
                result = v.save();
                if (!result) {
                    return false;
                }
            });

            if ($('.sb_alert').is(":visible")) {
                hideLoading();
                return false;
            }
            mini.confirm(message, "提示", function (action) {
                if (action === "ok") {

                    result && changeXML();
                    result && sendXML();

                } else {
                    hideLoading();
                    return false;
                }
            });
        };

        if (allClick.length > 0) {
            var str = '您还有：' + allClick.join(',') + '<br>未填写，请返回相应表格填写数据！';
            reportSB.showAlert(str, '申报表未填写完整');
            allClick = temp;
        }
        else {
            if (getHdValueByCode('WKPJKBMD', 'wsxx') === 'N') {
                if (!checkWkjfb()) {
                    return false;
                }
            }
            if (has085 && checkZb()) {
                var msg = '增值税纳税申报表第11栏“销项税额”或第19栏“应纳税额”已变更，' +
                    '营改增税负分析测算明细表第7列“增值税应纳税额（测算）”相应未变更，' +
                    '请重新填写营改增税负分析测算明细表！';
                reportSB.showAlert(msg);
                return false;
            }
            if (has085 && check085Col4Col11()) {
                return false;
            }
            var str = '【营改增税负分析测算明细表】合计行第7列“增值税应纳税额（测算）”与第14列“营业税应纳税额”相差太大，请核实！”' +
                '点击【确定】将继续发送，是否确认发送？'
            var nsrHD = getHDNUB();  // 总分机构的企业，特殊行业的企业，不支持网厅申报，直接不校验
            if (nsrHD) {             // 让总局打回
                if (is085Col7Col14) {
                    continueSend(str);
                } else {
                    changeXML();
                    sendXML();
                }
            } else {
                if (is085Col7Col14) {
                    continueSend(str);
                } else {
                    continueSend("是否确认发送？");
                }

            }

        }
    });
    function sendXML() {
        var sbbw = [], formData = {};
        for (var i = 0; i < fbID.length; i++) {
            sbbw.push({
                bbwjm: sbzlDm + '_' + fbID[i] + '.xml',
                bbxml: turnXmlDocumentToXmlStr(sb_bw[fbID[i]]).replace(/<[^<]+>--<[^>]+>/g, "")
            });
        }
        // 下面这两张表是没有的，但是老版的申报组织这两个表的报文
        var extra032_newxml = '<zzsybnsrsb_dkdjsstyjksdkqd>' +
            '<sbbheadVO></sbbheadVO>' +
            '<dkdjsstyjksdkqdGrid>' +
            '</dkdjsstyjksdkqdGrid>' +
            '</zzsybnsrsb_dkdjsstyjksdkqd>';
        var extra007_newxml = '<zzssyyybnsr_cpygxcqkmxb>' +
            '<sbbheadVO></sbbheadVO>' +
            '<cpygxcqkmxbGrid>' +
            '</cpygxcqkmxbGrid>' +
            '</zzssyyybnsr_cpygxcqkmxb>';
        var sbbhead = buildFbSbbhead('sbbheadVO');
        extra032_newxml = extra032_newxml.replace('<sbbheadVO></sbbheadVO>', sbbhead);
        extra007_newxml = extra007_newxml.replace('<sbbheadVO></sbbheadVO>', sbbhead);
        sbbw.push({
            bbwjm: sbzlDm + '_032.xml',
            bbxml: extra032_newxml
        });
        sbbw.push({
            bbwjm: sbzlDm + '_007.xml',
            bbxml: extra007_newxml
        });

        for (var pop in fb) {
            try {
                //IE
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    formData[pop] = $(fb[pop]).children()[0].xml.replace(/<[^<]+>--<[^>]+>/g, "");

                } else { //chrome
                    formData[pop] = $(fb[pop]).children()[0].outerHTML.replace(/<[^<]+>--<[^>]+>/g, "");
                }
            } catch (e) {
            }
        }
        formData['tbrq'] = tbrq;
        formData['nsrsbh'] = _nsrsbh;
        formData['nsrmc'] = _nsrmc;
        formData['scjyd'] = _scjydz;
        formData['fddbrxm'] = _fddbrmc;
        formData['djzclx'] = _djzclxMc;
        formData['sssqq'] = skssq[0];
        formData['sssqz'] = skssq[1];
        formData['zcdz'] = _zcdz;
        formData['sshy'] = _hymc;
        formData['dhhm'] = _scjydlxdh;
        formData['has085'] = has085;
        formData['ybnsr_new'] = true;// 用于区分是否为新的广东版一般纳税人申报

        if (isCorrect) {
            gzsbtj(skssq[0], skssq[1], sbzlDm, sbbw, formData, 'ybnsrzzs', _nsrsbh, nsrData.djxh);
        } else {
            sbtj_ybnsr(skssq[0], skssq[1], sbzlDm, sbbw, formData, 'ybnsrzzs', _nsrsbh, nsrData.djxh);
        }
    }
    function sbtj_ybnsr(sssqq, sssqz, sbzlDm, sbwjs, formData, sbqkcxpath, NSRSBH, DJXH) {
        // 校验缓存中的纳税人识别号、登记序号是否和当前提交申报业务的纳税人识别号和登记序号一致
        if (!checkNsrsbhAndDjxh(NSRSBH, DJXH)) {
            mini.alert('信息已过期，请重新打开窗口');
            return false;
        }
        // 2016-04-29 liuxin, 减少提交给后台的数据量
        var sbnr = {};//mini.decode(formData);
        sbnr['sbformdata'] = mini.encode(formData);
        sbnr['sssqq'] = sssqq;
        sbnr['sssqz'] = sssqz;
        sbnr['sbzlDm'] = sbzlDm;
        sbnr['sbwjs'] = mini.encode(sbwjs);
        if (ybjcData) {
            sbnr['ybjcSbbz'] = 'Y';
        } else {
            sbnr['ybjcSbbz'] = 'N';
        }
        var sbaction = "/sb/sbcommon_sbcl.ashx";
        var messageid = mini.loading("数据加载中...", "提示");
        $.ajax({
            url: sbaction,
            type: "post",
            data: sbnr,
            success: function (result) {
                mini.hideMessageBox(messageid);
                if (typeof (window.external.CallFun) != 'undefined') {
                    var param = '{"version":1, "method": "set", "data":{ "nsrsbh": ' + NSRSBH + ', "lx":"sb_fs"}}';
                    window.external.CallFun("wt.sb", param, function (data) { });
                }
                result = mini.decode(result);
                if (!result.success) {
                    mini.alert(result.message);
                    return false;
                }
                else {
                    mini.alert(result.message);
                    return false;
                }

                //var data = mini.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
                //var TenMinLater = addMinutes(data, 10);
                //SUI.store.set(nsrsbh + '_' + sbzlDm + '_sinceTime', TenMinLater);
                //SUI.store.set(nsrsbh + '_' + sbzlDm + '_sbTime', data);

                //window.location.href = '../sb_ts.html?' + sbqkcxpath;
            },
            error: function (data) {
                mini.hideMessageBox(messageid);
                mini.alert("网络异常，请稍后重试！"); // 系统繁忙，请稍后再试！
            }
        });

    }
    //['001','002','085','082',003','083',006','031','081','030','033'];
    function changeXML() {
        for (var pop in fb) {
            switch (pop) {
                case '001':
                    changetable1();
                    break;
                case '002':
                    changetable2();
                    break;
                case '085':
                    changetable11();
                    break;
                case '082':
                    changetable9();
                    break;
                case '003':
                    changetable3();
                    break;
                    /*case '083':
                        changetable10();
                        break;*/
                case '006':
                    changetable4();
                    break;
                case '031':
                    changetable5();
                    break;
                case '081':
                    changetable6();
                    break;
                    /*case '030':
                        changetable7();
                        break;*/
                case '033':
                    changetable8();
                    break;
                default:
                    break;
            }
        }
    }
});
