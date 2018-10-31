var JbsbzlDmArray = ['10110', '10116', '10418', '10419', '26502', '29826', '29836', '10103',
		'17701', '29827', '29824', '29823', '29825', '29839', '29842',
		'10312', '10313', '10314', '10315', '10316', '10317', '10318', '10319'];
var YbsbzlDmArray = ['10101', '10115', '10416', '10417', '26501', '29806', '26535',
		'10601', '10602', '10102', '10306', '29807', '29803', '29802', '29835', '29804',
		'29838', '29841'];
var gzsbzg = "N";
var pzxh = "";
var fkms = "";
function jk(record) {
    window.location.href = "/BsfwtWeb/pages/jk/jk_jsxxcx.aspx";
}
function showerror(data) {
    mini.open({
        url: "../submit_error.html",
        showMaxButton: true,
        allowResize: true,
        title: "申报错误信息",
        onload: function () {
            var iframe = this.getIFrameEl();
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
        },
        width: 900,
        height: 650
    });
}

function querySbqkSbxx(djxh, sssqq, sssqz, sbzlDm) {
    mini.parse();
    var sbqkData = null;
    var messageid = mini.loading("数据加载中...", "提示");
    setTimeout(function () {
        mini.hideMessageBox(messageid);
    }, 5000);
    $.ajax({
        url: "/sb/sbcommon_querySbqkSbxx.ashx",
        type: "post",
        async: false,
        data: {
            djxh: nsrData.djxh,
            sssqq: sssqq,
            sssqz: sssqz,
            sbzlDm: sbzlDm
        },
        success: function (data) {
            mini.hideMessageBox(messageid);
            var result = mini.decode(data);
            if (null != result.data) {
                sbqkData = result.data;
                if (sbqkData.sbztDm == "0000" && sbqkData.sbztms.indexOf("征期外申报") != -1) { //即查询逾期申报的情况下
                    mini.alert("申报成功，但您属于征期外申报，请联系主管税务机关是否需要处罚。");
                }
            }
        },
        error: function (data) {
        }
    });
    return sbqkData
}

/** =================获取核定信息，并判断是否有次税种核定信息===============* */
function getHdxx() {
    //SUI.store.clear();
    var hdxxData = JSON.parse(SUI.store.get("hdxxData"));
    debugger;
    if (null == hdxxData) {
        // 1、 缓存取不到核定信息，调用后台去数据库取
        var messageid = mini.loading("数据加载中...", "提示");
        $.ajax({
            url: "/sb/sbcommon_getHdxx.ashx",
            type: "post",
            async: false,
            data: {
                djxh: nsrData.djxh,
                sbny: getSbny()
            },
            success: function (data) {
                mini.hideMessageBox(messageid);
                var result = mini.decode(data);
                if (null != result.data) {
                    hdxxData = result.data;
                    SUI.store.set("hdxxData", mini.encode(hdxxData));
                }
            },
            error: function (data) {
            }
        });
    }
    return hdxxData;
}

function isExsitSbzlHdxx(sbzlArray, hdxxData) {
    if (null == hdxxData || "" == hdxxData) {
        return null;
    }
    var hdxxVo = hdxxData.HdxxResponseVo;
    var sbzlNode = null;
    for (var r = 0; r < hdxxVo.SBZL.length; r++) {
        var sbzl = hdxxVo.SBZL[r].SBZLCODE;

        if (sbzlArray.indexOf(sbzl) != -1) {
            sbzlNode = hdxxVo.SBZL[r];
            SUI.store.set("HDXX_" + sbzl, mini.encode(sbzlNode));
            break;
        }
    }
    return sbzlNode;
}

function sbztRenderer(e) {
    var record = e.record;
    var sbztDm = record.sbztDm;
    if ("0000" == sbztDm) {
        return "申报成功";
    } else if ("2003" == sbztDm) {
        return "作废中";
    } else if ("2" == sbztDm.substr(0, 1)) {
        return "申报中";
    } else if ("3000" == sbztDm) {
        return "作废成功";
    }
    else {
        return "申报失败";
    }
}

function getSssqBySbny(sbny) {
    var d = new Date();
    var vYear = d.getFullYear();// 当前年
    var vMon = d.getMonth();// 当前月，从0-11
    var ssn = vYear;
    var ssy = vMon;
    if (vMon == 0) {
        ssn = ssn - 1;
        ssy = 12;
    }
    var new_date = new Date(vYear, (vMon), 1);
    var sssqzdate = new Date(new_date.getTime() - 1000 * 60 * 60 * 24);
    if (ssy < 10) {
        ssy = "0" + ssy;
    }
    sssqq = ssn + "" + ssy + "01";
    sssqz = mini.formatDate(sssqzdate, "yyyyMMdd");
    return new Array(sssqq, sssqz);
};

/** 获取所属时期起止 */
function getSssq(sbny, sbzlDm) {
    var ssn = sbny.substr(0, 4);// 当前年
    var vMon = sbny.substr(4, 2);// 所属月
    var sssqq = "";
    var sssqz = "";
    if (JbsbzlDmArray.indexOf(sbzlDm) != -1) {
        if (vMon >= 1 && vMon < 4) {
            sssqq = ssn + "0101"
            sssqz = ssn + "0331"
        }
        if (vMon >= 4 && vMon < 7) {
            sssqq = ssn + "0401"
            sssqz = ssn + "0630"
        }
        if (vMon >= 7 && vMon < 10) {
            sssqq = ssn + "0701"
            sssqz = ssn + "0930"
        }
        if (vMon >= 10 && vMon < 13) {
            sssqq = ssn + "1001"
            sssqz = ssn + "1231"
        }
    } else {
        sssqq = ssn + "" + vMon + "01";
        var new_date = new Date(ssn, (vMon), 1);
        var sssqzdate = new Date(new_date.getTime() - 1000 * 60 * 60 * 24)
        sssqz = mini.formatDate(sssqzdate, "yyyyMMdd");
    }

    return new Array(sssqq, sssqz);

}

function getSbny() {
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth();
    if (vMon == 0) {
        vYear = vYear - 1;
        vMon = 12;
    }
    if (vMon < 10) {
        vMon = "0" + vMon;
    }
    return vYear + "" + vMon;
}

function setSbnyValue() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var t = mini.get("sbny");
    t.setValue(year + "-" + month);
}

/** 查看申报表 record申报查询结果 sbjgckUrl申报结果查看链接 */
function viewSbxml(qqwjm, sbjgckUrl) {
    mini.alert("申报表查询数据为空，请确认该申报表是否由网厅申报成功！", '查询失败');
    //var messageid = mini.loading("数据加载中...", "提示");
    //$.ajax({
    //    url: "/sb/sbcommon_getSbxml.do",//返回申报表的报文，里面带有填表的数据，
    //    type: "post",
    //    data: {
    //        wjm: qqwjm
    //    },
    //    success: function (data) {
    //        mini.hideMessageBox(messageid);
    //        var result = mini.decode(data);
    //        var sbxml = result.data;
    //        if (sbxml == null) {
    //            mini.alert("申报表查询数据为空，请确认该申报表是否由网厅申报成功！", '查询失败');
    //            return;
    //        }
    //        if (!!sbxml['ybnsr_new']) {
    //            mini.open({
    //                url: '/BsfwtWeb/pages/sb/ybnsrsb/ybnsrsb_view.html',
    //                showMaxButton: true,
    //                allowResize: false,
    //                title: "申报表查看",
    //                width: 1200,
    //                height: 600,
    //                onload: function () {
    //                    var iframe = this.getIFrameEl();
    //                    iframe.contentWindow.SetData(sbxml);
    //                }
    //            }).max();
    //        } else {
    //            mini.open({
    //                url: sbjgckUrl,
    //                showMaxButton: true,
    //                allowResize: false,
    //                title: "申报表查看",
    //                width: 1200,
    //                height: 600,
    //                onload: function () {
    //                    var iframe = this.getIFrameEl();
    //                    iframe.contentWindow.SetData(sbxml);
    //                },
    //                ondestroy: function (action) {
    //                }
    //            });
    //        }

    //    },
    //    error: function (data) {
    //        mini.alert("查询失败！", '查询失败');
    //    }
    //});
}

function getNsrxxVO() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    // 暂时处理客户端多企业切换登录session未清理的问题
    var suiSessionId = SUI.store.get("JSESSIONID");
    var cookie_val = getCookie("JSESSIONID");
    if (nsrData != null && cookie_val != suiSessionId) {
        nsrData = null;
        SUI.store.remove("NsrjbxxVO");
        SUI.store.remove("JSESSIONID");
    }
    // 亿企代帐 切换用户 TGC 改变重新获取纳税人信息
    if (location.href.indexOf('DZSWJ_TGC') > -1) {
        nsrData = null;
        SUI.store.remove("NsrjbxxVO");
    }
    if (nsrData == null) {
        $.ajax({
            url: "/login/login_getNsrxxVo.ashx?",
            type: "post",
            async: false,
            success: function (data) {
                var returndata = mini.decode(data);
                if (returndata.data) {
                    var str = JSON.stringify(returndata.data);
                    SUI.store.set("NsrjbxxVO", str);
                    SUI.store.set("JSESSIONID", cookie_val);
                    nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
                } else {
                    mini.alert("未获取到纳税人信息!");
                    return;
                }
            }
        });
    }
    return nsrData;
}


/** 修改申报表之前先查看之前的申报表 record申报查询结果 XGSbjgckUrl修改申报结果查看链接 */
var gzsburl = '';
var nsrData = getNsrxxVO(); //mini.decode(SUI.store.get("NsrjbxxVO"));
var nsrsbh = nsrData.nsrsbh;
function viewXGSbxml(record, XGSbjgckUrl) {
    var qqwjm = record.qqwjm;
    if (gzsbzg == "N") {
        mini.alert("您不能进行更正申报操作，具体原因：" + fkms);
        return;
    }
    if (SUI.store.get('zfbz') == 'true') {
        mini.alert("您已做过申报作废，不能进行更正申报操作！请点击页面中查询按钮，重新申报！");
        return;
    }
    //校验一下session里面的纳税人是不是当前的纳税人
    nsrData = mini.decode(SUI.store.get("NsrjbxxVO"));
    if (record.nsrsbh != nsrData.nsrsbh) {
        mini.alert("当前登录账号已失效，请重新登录！");
        return;
    }

    var nsrflId = nsrData.nsrflId;//纳税人分类id 小规模纳税人 2001（企业2011（个体建账户 2012	（双定户-起征点以上2013（双定户-起征点以下
    var nsrtype = getWsxxValueByCode(hdSbzlData, "SZLBDM");
    //服务和混营的非双定户需提示（双定户无扣除额所以无需提示）
    if (("02" == nsrtype || "03" == nsrtype) && ("2012" != nsrflId) && ("2013" != nsrflId)) {
        mini.open({
            url: "sb_xgmsbcekc.html",
            showMaxButton: true,
            allowResize: true,
            title: "差额扣除提示",
            onload: function () {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.isGzsb(true);
            },
            ondestroy: function (action) {
                var iframe = this.getIFrameEl();
                //获取选中、编辑的结果
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须。克隆数据。
                if (data) {
                    //window.close();
                    openGzsb(qqwjm, XGSbjgckUrl);
                }

            },
            width: 900,
            height: 650
        });
    }
    else {
        openGzsb(qqwjm, XGSbjgckUrl)
    }
}
function viewSBXGSbxml() {
    mini.alert("您有申报失败的记录，不允许更正申报，请点击重新申报!");
    return;
}
function openGzsb(qqwjm, XGSbjgckUrl) {
    var messageid = mini.loading("数据加载中...", "提示");
    $.ajax({
        url: "/sb/sbcommon_getSbxml.do",//返回申报表的报文，里面带有填表的数据，
        type: "post",
        data: {
            wjm: qqwjm
        },
        success: function (data) {
            mini.hideMessageBox(messageid);
            var result = mini.decode(data);
            var sbxml = result.data;
            if (sbxml == null) {
                mini.alert("申报表查询数据为空，请确认该申报表是否由网厅申报成功！", '查询失败');
                return;
            }
            var gezbWin = mini.open({
                url: XGSbjgckUrl,
                showMaxButton: true,
                allowResize: false,
                title: "申报表修改",
                width: 1200,
                height: 600,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.SetData(sbxml);
                },
                ondestroy: function (action) {
                }
            });
            gezbWin.max(); //窗口最大化
        },
        error: function (data) {
            mini.alert("查询失败！", '查询失败');
        }
    });
}
function getWsxxValueByCode(sbzlNode, wsxxcode) {
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
}

// 获取申报报表文件名
function getBbFilename(bbid, SBZLCODE) {
    return SBZLCODE + "_" + bbid + ".xml";
}

function sbtj(sssqq, sssqz, sbzlDm, sbwjs, formData, sbqkcxpath, NSRSBH, DJXH) {
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
    var sbaction = "/sb/sbcommon_sbcl.ashx";
    var messageid = mini.loading("数据加载中...", "提示");
    $.ajax({
        url: sbaction,
        type: "post",
        data: sbnr,
        success: function (result) {
            mini.hideMessageBox(messageid);
            //if (typeof (window.external.CallFun) != 'undefined') {
            //    var param = '{"version":1, "method": "set", "data":{ "nsrsbh": ' + NSRSBH + ', "lx":"sb_fs"}}';
            //    window.external.CallFun("wt.sb", param, function (data) { });
            //}
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
function gzsbtj(sssqq, sssqz, sbzlDm, sbwjs, formData, sbqkcxpath, NSRSBH, DJXH) {
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
    sbnr['sblxDm'] = "03";
    sbnr['pzxh'] = SUI.store.get('pzxh');
    var sbaction = "/sb/sbcommon_sbcl.do";
    var messageid = mini.loading("数据加载中...", "提示");
    $.ajax({
        url: sbaction,
        type: "post",
        data: sbnr,
        success: function (result) {
            mini.hideMessageBox(messageid);
            result = mini.decode(result);
            if (!result.success) {
                mini.alert(result.message);
                return false;
            }
            window.location.href = '../sb_ts.html?' + sbqkcxpath;
        },
        error: function (data) {
            mini.hideMessageBox(messageid);
            mini.alert("网络异常，请稍后重试！"); // 系统繁忙，请稍后再试！
        }
    });
}
function sbtj_qz(sssqq, sssqz, sbzlDm, caSignData, formData, sbqkcxpath, catype, isControl, NSRSBH, DJXH) {

    // 校验缓存中的纳税人识别号、登记序号是否和当前提交申报业务的纳税人识别号和登记序号一致
    if (!checkNsrsbhAndDjxh(NSRSBH, DJXH)) {
        mini.alert('信息已过期，请重新打开窗口');
        return false;
    }

    var sbnr = mini.decode(formData);
    sbnr['sbformdata'] = mini.encode(formData);
    sbnr['sssqq'] = sssqq;
    sbnr['sssqz'] = sssqz;
    sbnr['sbzlDm'] = sbzlDm;
    sbnr['caSignData'] = caSignData;
    sbnr['catype'] = catype;
    sbnr['isControl'] = isControl;
    var sbaction = "/sb/sbcommon_sbclqz.do";
    var messageid = mini.loading("数据加载中...", "提示");
    $.ajax({
        url: sbaction,
        type: "post",
        data: sbnr,
        success: function (result) {
            mini.hideMessageBox(messageid);
            result = mini.decode(result);
            if (!result.success) {
                mini.alert(result.message);
                return false;
            }
            window.location.href = '../sb_ts.html?' + sbqkcxpath;
        },
        error: function (data) {
            mini.hideMessageBox(messageid);
            mini.alert("网络异常，请稍后重试！"); // 系统繁忙，请稍后再试
        }
    });

}

//获取申报表url
function getSbjgckUrl(sbzlDm) {
    var sbjgckUrl = "";
    if ("10102" == sbzlDm || "10103" == sbzlDm) {
        sbjgckUrl = "xgmzzs/sb_xgmsbview.html";
    } else if ("10101" == sbzlDm || "10110" == sbzlDm) {
        sbjgckUrl = "ybnsrzzs/sb_ybnsrsb_view.html";
    } else if ("26501" == sbzlDm || "26502" == sbzlDm) {
        sbjgckUrl = "whsyjsf/sb_whsyview.html";
    } else if ("10416" == sbzlDm || "10418" == sbzlDm) {
        sbjgckUrl = "qysds/suodeshuiA_view.html";
    } else if ("10417" == sbzlDm || "10419" == sbzlDm) {
        sbjgckUrl = "qysds/suodeshuiB_view.html";
    } else if ("10601" == sbzlDm) {
        sbjgckUrl = "grcxcklxsds/sb_grcxcklxsds_5.html"
    } else if ("10602" == sbzlDm) {
        sbjgckUrl = "grcxcklxsds/sb_grcxcklxsds_20.html";
    } else if ("17701" == sbzlDm || "17702" == sbzlDm) {
        sbjgckUrl = "fqdzcpcljjsqb/sb_fqdzcpcljj.html";
    } else if (sbzlDm == "10306" || "10316" == sbzlDm) {
        sbjgckUrl = "xfs/sb_xfs_sb.html";
    } else if (sbzlDm == "29835" || sbzlDm == "29836") {
        sbjgckUrl = "cwbb/cwbbview_xqy.html";
    } else if (sbzlDm == "29803" || sbzlDm == "29824") {
        sbjgckUrl = 'cwbb/sb_cwbb_bx.html';
    } else if (sbzlDm == "29807" || sbzlDm == "29827") {
        sbjgckUrl = 'cwbb/sb_cwbb_ybqy.html';
    } else if (sbzlDm == "29802" || sbzlDm == "29823") {
        sbjgckUrl = 'cwbb/sb_cwbb_yh.html';
    } else if (sbzlDm == "29804" || sbzlDm == "29825") {
        sbjgckUrl = 'cwbb/sb_cwbb_zq.html';
    } else if (sbzlDm == "29838" || sbzlDm == "29839") {
        sbjgckUrl = 'cwbb/sb_cwbb_db.html';
    } else if (sbzlDm == "29841" || sbzlDm == "29842") {
        sbjgckUrl = 'cwbb/sb_cwbb_sy.html';
    } else if (sbzlDm == "29806" || sbzlDm == "29826") {
        sbjgckUrl = "cwbb/cwbbview.html";
    } else if (sbzlDm == "10421") {
        sbjgckUrl = "qysds/sb_qysds_B_year_view.html";
        sbUrl = "qysds/sb_qysds_B_year.html";
    }

    if (sbjgckUrl != "") {
        //增加相对路径
        var prefix = "/BsfwtWeb/pages/sb/";
        sbjgckUrl = prefix + sbjgckUrl;
    }
    return sbjgckUrl;
}
//获取修改申报表url

function getXGSbjgckUrl(sbzlDm) {
    var nsrflId = nsrData.nsrflId;//纳税人分类id 小规模纳税人 2001（企业2011（个体建账户 2012	（双定户-起征点以上2013（双定户-起征点以下
    var nsrtype = getWsxxValueByCode(hdSbzlData, "SZLBDM");

    if ("01" == nsrtype) {
        gzsburl = "sb_xgmsb_hw.html";
    }
    if ("02" == nsrtype) {
        gzsburl = "sb_xgmsb_fw.html";
    }
    if ("03" == nsrtype) {
        gzsburl = "sb_xgmsb_hy.html";
    }
    var sbjgckUrl = "";
    if ("10102" == sbzlDm || "10103" == sbzlDm) {
        sbjgckUrl = "xgmzzs/" + gzsburl;
    }
    if (sbjgckUrl != "") {
        //增加相对路径
        var prefix = "/BsfwtWeb/pages/sb/";
        sbjgckUrl = prefix + sbjgckUrl;
    }
    return sbjgckUrl;
}

//查询结果按钮
function czRenderer(e) {
    var record = e.record;
    var sbztDm = record.sbztDm;
    var sbzlDm = record.sbzlDm;
    if (record.qdid == "HswyClient") {
        return "";
    }
    var sbjgckUrl = getSbjgckUrl(sbzlDm);
    var XGSbjgckUrl = "#";//getXGSbjgckUrl(sbzlDm);
    if (sbzlDm == "10102" || sbzlDm == "10103") {
        XGSbjgckUrl = getXGSbjgckUrl(sbzlDm);
    }
    if (sbztDm == "0000") {
        // 财务报表(小企业会计准则、企业会计制度)、废弃电器电子、储蓄利息因使用新框架，查询不到数据暂不出现“查看申报表”按钮；
        var displayCksbb = true;
        var sbrq = mini.parseDate(record.sbrq);
        var beginTime = new Date('2016-02-29 00:00:00').getTime();
        if ('17701,10601,10602'.indexOf(sbzlDm) > -1 && beginTime > sbrq.getTime()) {
            displayCksbb = false;
        }

        var sbse = record.sbse || 0;
        if (sbse > 0) {
            if (!displayCksbb) {
                return "<a href='javascript:jk(" + mini.encode(record) + ")'>缴款</a>";
            }
            if ('10102'.indexOf(sbzlDm) > -1 || '10103'.indexOf(sbzlDm) > -1) {
                gzsbzgcx(record);
                pzxh = record.pzxh;
                SUI.store.set("pzxh", pzxh);
                return "<a href='javascript:jk(" + mini.encode(record) + ")'>缴款</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:viewXGSbxml(" + mini.encode(record) + "," + mini.encode(XGSbjgckUrl) + ")'>修改申报表</a>";
            }
            if ((sbzlDm == "10416" || sbzlDm == "10417" || sbzlDm == "10418" || sbzlDm == "10419") && (nsrData.swjgDm.substr(0, 5) == "11311" || nsrData.swjgDm.substr(0, 7) == "1130123" || nsrData.swjgDm.substr(0, 7) == "1130181")) {
                /*满足企业所得税月(季)度预缴纳税A、B申报表且11311开头是衡水、1130123开头是正定、1130181开头是辛集的添加风险扫描结果查询链接*/
                return "<a href='javascript:jk(" + mini.encode(record) + ")'>缴款</a>&nbsp&nbsp&nbsp&nbsp&nbsp" +
					"<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>&nbsp&nbsp&nbsp&nbsp&nbsp" +
					"<a href='javascript:viewFxsmjgcx(" + sbzlDm + ")'>风险扫描结果查询</a>";
            }
            //<a href='javascript:jk(" + mini.encode(record) + ")'>缴款</a>&nbsp&nbsp&nbsp&nbsp&nbsp
            return "<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>";
        } else {
            if (!displayCksbb) {
                return "";
            }
            if ('10102'.indexOf(sbzlDm) > -1 || '10103'.indexOf(sbzlDm) > -1) {
                gzsbzgcx(record);
                pzxh = record.pzxh;
                SUI.store.set("pzxh", pzxh);
                return "<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:viewXGSbxml(" + mini.encode(record) + "," + mini.encode(XGSbjgckUrl) + ")'>修改申报表</a>";
            }
            if ((sbzlDm == "10416" || sbzlDm == "10417" || sbzlDm == "10418" || sbzlDm == "10419") && (nsrData.swjgDm.substr(0, 5) == "11311" || nsrData.swjgDm.substr(0, 7) == "1130123" || nsrData.swjgDm.substr(0, 7) == "1130181")) {
                /*满足企业所得税月(季)度预缴纳税A、B申报表且11311开头是衡水、1130123开头是正定、1130181开头是辛集的添加风险扫描结果查询链接*/
                return "<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>&nbsp&nbsp&nbsp&nbsp&nbsp" +
                    "<a href='javascript:viewFxsmjgcx(" + sbzlDm + ")'>风险扫描结果查询</a>";
            }
            return "<a href='javascript:viewSbxml(" + mini.encode(record.qqwjm) + "," + mini.encode(sbjgckUrl) + ")'>查询申报表</a>";
        }
    } else if ("2" == sbztDm.substr(0, 1)) {
        return "";
    } else if ("3" == sbztDm.substr(0, 1)) {
        if ('10102'.indexOf(sbzlDm) > -1 || '10103'.indexOf(sbzlDm) > -1) {
            return "<a href='javascript:sb(" + mini.encode(record) + ")'>重新申报</a>";
        }
        return "<a href='javascript:sb(" + mini.encode(record) + ")'>重新申报</a>";
    } else {
        if ('10102'.indexOf(sbzlDm) > -1 || '10103'.indexOf(sbzlDm) > -1) {
            return "<a href='javascript:sb(" + mini.encode(record) + ")'>重新申报</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:showerror(" + mini.encode(record) + ")'>查看错误原因</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:viewSBXGSbxml()'>修改申报表</a>";
        }
        return "<a href='javascript:sb(" + mini.encode(record) + ")'>重新申报</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:showerror(" + mini.encode(record) + ")'>查看错误原因</a>";
    }
}

function gzsbzgcx(record) {
    $.ajax({
        url: "/sb/sbcommon_queryGZSBZG.do",
        type: "post",
        async: false,
        data: {
            //data :mini.encode(record)
            nsrsbh: record.nsrsbh,
            sblx: "GZSB",
            sbzldm: record.sbzlDm,
            sssqq: record.skssqq,
            sssqz: record.skssqz,
            sbse: record.sbse,
            sbwjm: record.qqwjm,
            djxh: nsrData.djxh
        },
        success: function (resultvo) {
            var result = mini.decode(resultvo);
            if (result.success) {
                if (result.data.fkjg == 0) {
                    gzsbzg = "Y";
                } else {
                    gzsbzg = "N";
                    fkms = result.data.fkms;
                }
            } else {
                mini.alert(result.message);
            }
        },
        error: function (resultvo) {
            mini.hideMessageBox(mask);
            mini.alert("更正申报资格失败");
        }
    });
}


//toFixed 四舍五入问题修复
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

        } if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    } return this + "";

};
//校验缓存中的纳税人识别号、登记序号是否和当前提交申报业务的纳税人识别号和登记序号一致
function checkNsrsbhAndDjxh(nsrsbh, djxh) {
    var newNsrxxData = mini.decode(SUI.store.get('NsrjbxxVO'));
    if (nsrsbh == newNsrxxData.nsrsbh && djxh == newNsrxxData.djxh) {
        return true;
    } else {
        return false;
    }
}

function addMinutes(date, minutes) {

    minutes = parseInt(minutes);

    var interTimes = minutes * 60 * 1000;

    interTimes = parseInt(interTimes);

    return mini.formatDate(new Date(Date.parse(date) + interTimes), 'yyyy-MM-dd HH:mm:ss');

}
function checkTime(nsrsbh, sbzlDm, name) {
    var result = true,
	sbTimeStr = nsrsbh + '_' + sbzlDm + '_sbTime',
    sinceTimeStr = nsrsbh + '_' + sbzlDm + '_sinceTime';

    var sinceTime = SUI.store.get(sinceTimeStr) || '';
    var currentTime = mini.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (!!sinceTime && ((new Date(currentTime.replace(/-/g, "\/"))) > (new Date(sinceTime.replace(/-/g, "\/"))))) {
        result = true;
        SUI.store.remove(sinceTimeStr);
        SUI.store.remove(sbTimeStr);
    } else {
        var sinceTime = SUI.store.get(sinceTimeStr),
            sbTime = SUI.store.get(sbTimeStr);
        if (!!sinceTime && !!sbTime) {
            mini.alert('系统检测到您在' + sbTime + '已经成功提交了' + name + '，大约在' + sinceTime +
                '可以查询到申报结果，请您耐心等待，勿重复申报，谢谢！');
            result = false;
        }
    }
    return result;
}