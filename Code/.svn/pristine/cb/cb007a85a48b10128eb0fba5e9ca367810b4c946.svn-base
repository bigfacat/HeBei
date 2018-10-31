/**
 * Created with JetBrains WebStorm
 * Author：lmyue
 * Date：2017/1/19
 * Time：20:41
 */
var grid, ylgrid, fbzlGrid;

stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var bgdjDw = {};
var returnBoolean = false;
function getNsrjbxx() {
    return mini.clone(nsrjbxx);
}
function setNsrjbxx(nsrjbxx) {
    this.nsrjbxx = nsrjbxx;
}
function getPzjgxx() {
    return pzjgxx;
}
function setPzjgxx(pzjgxx) {
    this.pzjgxx = pzjgxx;
}
function getSwdjbxx() {
    return mini.clone(swdjbxx);
}
function setSwdjbxx(swdjbxx) {
    this.swdjbxx = swdjbxx;
}

stepNav.run = function () {
    var flag = true;
    //判断单位、个人、临时纳税人
    if (wssqUtil.nsrjbxx) {
        if (wssqUtil.nsrjbxx.kzztdjlxDm == "1120") {
            location.href = "../bgdjGr/bgdjGr.html";
        } else if (wssqUtil.nsrjbxx.kzztdjlxDm.indexOf("113") > -1) {
            alert("您是临时纳税人，请至大厅前台办理变更登记");
        } else {
            flag = true;
        }
    } else {
        //如果缓存中没有纳税人基本信息
        flag = true;
    }

    if (flag) {
        stepNav.initSteps([
            { id: 0, title: '信息变更', url: 'bgdjDwView.aspx' },
            { id: 1, title: '预览', url: 'YlView.aspx', yltj: true },
            { id: 2, title: '完成', url: '../public1/wc/wc.aspx', js: true }
        ]);
        bgdjDw.init();
    }
    mini.parse();
    ylgrid = mini.get("yl");
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        //校验数据格式
        var formObj = new mini.Form("#nsrxx");
        formObj.validate();
        if (!formObj.isValid()) {
            return false;
        }

        //获取变更项
        bgdjDw.getBgdjData();

        //判断是不是有变更项
        var bgFlag = true;
        var bgxxToDB = bgdjDw.getBgdjData();
        if (bgxxToDB.bgxx.length <= 0) {
            bgFlag = false;
        }
        //没有变更项目变动
        if (!bgFlag) {
            mini.alert("您本次没有变更任何项，请重新进行变更。");
            return false;
        }
    }
    if (currentIndex == 1) {
        bgdjDw.tjsqxx();
        return returnBoolean;
    }
    return true;
};
stepNav.onFinished = function (event, currentIndex) {
    //wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','../../../apps/views/home/home.html');
};

stepNav.onStepDataSaved = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
    }
};

// 存放后台查询的数据
var nsrjbxx;// 纳税人基本信息
var bgxmxx;// 变更项目代码表数据
var pzjgxx;//批准机关信息
var swdjbxx;//税务登记表信息

bgdjDw.init = function () {
    mini.parse();
    //身份证类型==前端页面解决
    bgdjDw.doInitData();
};

bgdjDw.doInitData = function () {

    var messageid = mini.loading("查询中, 请稍等 ...", "查询中");
    bgdjDwService.getDjNsrxx(mini.encode({}), function (data) {
        var resultData = mini.decode(data, false);
        if (!resultData.success) {
            mini.hideMessageBox(messageid);
            mini.alert(resultData.message, "提示信息", function () {
                //closeFrameDialogCut();
                wssqUtil.closeWin();
            });
            return;
        }

        //根据纳税人身份判断可变更哪些信息
        if (nsrxxUtil.getAccountInfo()) {
            //roleid参看RoleEnum
            bgdjDw.nsrsfpd(nsrxxUtil.getAccountInfo().roleId);
        }

        var swdjblxdm = resultData.value.bgcxswdjb.bgcxDJSwdjbxxVO.kzztdjlxDm;
        //获取变更项目
        $.ajax({
            type: "GET",
            async: false,
            url: "../../../api/baseCode/get/dmBgxm/1110.ashx?" + swdjblxdm,
            data: {},
            success: function (bgxmdata) {
                bgxmxx = mini.decode(bgxmdata);
            }
        });

        // 获取查询数据
        var bgcxswdjb = resultData.value.bgcxswdjb;
        setPzjgxx(bgcxswdjb.bgcxDJPzjgxxVO);
        setSwdjbxx(bgcxswdjb.bgcxDJSwdjbxxVO);
        setNsrjbxx(bgcxswdjb.bgcxDJSwdjbxxVO);
        var nsrxxForm = new mini.Form("#nsrxx");
        //批准机构信息
        nsrxxForm.setData(pzjgxx);
        mini.copyIf(pzjgxx, nsrxxForm.getDataAndText(true));

        // 税务登记表信息
        nsrxxForm.setData(swdjbxx);
        mini.copyIf(swdjbxx, nsrxxForm.getDataAndText(true));  //将表单中数据(包括combox的名称)复制到查询的初始纳税人信息中,便于预览时显示名称

        var nsrxx = nsrxxForm.getDataAndText(true);


        //根据工商机关标识初始化页面 (01工商 99其他)
        //var pzsljglxDm = bgcxswdjb.bgcxDJPzjgxxVO.pzsljglxDm;
        //mini.get("pzsljglxDm").setValue(pzsljglxDm);

        bgdjDw.initSfzjhmValidate(bgcxswdjb.bgcxDJSwdjbxxVO.cwfzrsfzjzlDm, "cwfzrsfzjhm");
        bgdjDw.initSfzjhmValidate(bgcxswdjb.bgcxDJSwdjbxxVO.bsrsfzjzlDm, "bsrsfzjhm");
        mini.hideMessageBox(messageid);
    }, function (res) {
        mini.hideMessageBox(messageid);
        mini.alert(res.message)
    });
};
/**
 * 初始化身份证件号码校验规则
 */
bgdjDw.initSfzjhmValidate = function (zjlxDm, zjhmId) {
    if (zjlxDm == "201") {
        mini.get(zjhmId).setVtype("sfzjhm");
    } else {
        mini.get(zjhmId).setVtype("zjhm");
    }
};
/**
 * 身份证件类型变化后修改身份证件号码的校验规则
 */
bgdjDw.doSfzjlxchanged = function (params, zjhmId) {
    var zjlxDm = params.getValue();
    if (zjlxDm == "201") {
        mini.get(zjhmId).setVtype("sfzjhm");
    } else {
        mini.get(zjhmId).setVtype("zjhm");
    }
};

bgdjDw.getFormData = function () {
    var formData = {};
    // 1.取基本信息
    var form = new mini.Form("#nsrxx");
    formData = form.getDataAndText(true);
    return formData;
};
var bgxxToDB = {};
/**
 * 获取完整的变更登记信息，包括变更项目列表，变更后的信息等。
 * @returns
 */
bgdjDw.getBgdjData = function () {
    // 获取变更后的信息
    var formData = bgdjDw.getFormData();
    // 获取变更前纳税人信息
    var nsrjbxxInit = getNsrjbxx();

    bgxxToDB.bgxx = bgdjDw.getYwsxList();
    //需要在原始的纳税人信息基础上覆盖新的值，保证页面上不显示的值存在
    bgxxToDB.nsrxx = nsrjbxxInit;
    if (nsrjbxxInit.kzztdjlxDm.indexOf("113") > -1) {
        bgxxToDB.nsrxx.kzztdjlxDm = "1130";//后台根据1130确定临时纳税人
    }
    mini.copyTo(bgxxToDB.nsrxx, formData.nsrxx);

    //单位纳税人和临时纳税人登记变更
    if (nsrjbxxInit.kzztdjlxDm == "1110" || nsrjbxxInit.kzztdjlxDm.indexOf("113") > -1) {
        bgxxToDB.zczb = formData.zczb;
        bgxxToDB.tzze = formData.tzze;
        bgxxToDB.tzfxx = formData.tzfxx;
        bgxxToDB.fzjgxx = formData.fzjgxx;
        bgxxToDB.zjgxx = formData.zjgxx;
    }
    //个体纳税人需要获取分店信息
    /*if(nsrjbxxInit.kzztdjlxDm=="1120"){
        bgxxToDB.fdxx = formData.fdxx;
        bgxxToDB.hhrxx = formData.hhrxx;
    }*/
    ylgrid.setData(bgxxToDB.bgxx);
    return bgxxToDB;
};

/**
 * 获取变更项目列表
 */
bgdjDw.getYwsxList = function () {
    var bgxxData = new Array();
    // 获取变更前纳税人信息
    var nsrjbxxInit = getNsrjbxx();

    // 获取变更项目配置信息
    var bgxmData = bgxmxx;// 变更项目代码表信息

    // 获取变更后的信息
    var formData = bgdjDw.getFormData(); // 变更后的内容，包括投资方、分店等信息

    // 获取变更后的纳税人信息
    var nsrjbxx = formData;

    // 1.比较变更前后的数据
    // 1.1获取变更的纳税人信息
    bgdjDw.getBgxxOfNsrxx(nsrjbxxInit, nsrjbxx, bgxmData, bgxxData);
    return bgxxData;
}
/**
 * 获取纳税人信息相关的变更信息
 * @param nsrjbxxInit
 *            初始纳税人信息
 * @param nsrjbxx
 *            变更后纳税人信息
 * @param bgxmData
 *            变更项目配置信息
 * @param bgxxData
 *            变更信息数据
 */
bgdjDw.getBgxxOfNsrxx = function (nsrjbxxInit, nsrjbxx, bgxmData, bgxxData) {
    for (var e in nsrjbxx) {
        if (nsrjbxx[e] != nsrjbxxInit[e] && bgdjDw.isBgxm(bgxmData, e)) {
            if (!mini.get(e).getEnabled()) {		//判断是否为只读属性，如为只读，则不进行对比
                continue;
            }
            var bgxmmc = bgdjDw.getBgxmmcByName(bgxmData, e);
            var bgqz = nsrjbxxInit[e];
            var bghz = nsrjbxx[e];

            // 将变更内容中的代码转换成名称
            if (!!nsrjbxxInit[e + "Text"]) {
                bgqz = nsrjbxxInit[e + "Text"];
            }
            if (!!nsrjbxx[e + "Text"]) {
                bghz = nsrjbxx[e + "Text"];
            }

            // 根据数据库列名获取变更项目代码
            var bgxmdm = bgdjDw.getBgxmDmByLmc(bgxmData, e);

            // 组织传入后台的json格式
            var bgxxObj = {};
            bgxxObj.ywsxDm = bgxmdm;
            bgxxObj.bgxmMc = bgxmmc;
            //bgxxObj.bgqz = nsrjbxxInit[e];
            //bgxxObj.bghz = nsrjbxx[e];
            // 将变更前后的内容单独存放，便于预览显示
            bgxxObj.bgqnr = nsrjbxxInit[e];
            bgxxObj.bghnr = nsrjbxx[e];
            bgxxObj.bgqz = bgqz;
            bgxxObj.bghz = bghz;

            bgxxData.push(bgxxObj);
        }
    }
};
/**
 * 判断当前字段是否是变更项目
 * @param bgxmData 变更项目代码信息
 * @param name 当前字段名称
 * @returns {Boolean}
 */
bgdjDw.isBgxm = function (bgxmData, name) {
    var bgxmFlag = false;
    for (var index = 0; index < bgxmData.length; index++) {
        var bgxmVO = bgxmData[index];
        if (bgdjDw.changeToEleStyle(bgxmVO.LMC) == bgdjDw.changeToEleStyle(name)) {
            bgxmFlag = true;
        }
    }
    return bgxmFlag;
};

/**
 * 将数据库元素转化成界面元素，替换其中的‘_’符号并转换成小写
 *
 * @param name
 * @returns
 */
bgdjDw.changeToEleStyle = function (name) {
    name = name.toLowerCase();
    while (name.indexOf("_") > -1) {
        name = name.replace("_", "");
    }
    return name;
};
/**
 * 获取变更项目名称
 *
 * @param bgxmData
 * @param lmc
 * @returns {String}
 */
bgdjDw.getBgxmmcByName = function (bgxmData, lmc) {
    var value = "";
    for (var index = 0; index < bgxmData.length; index++) {
        var bgxmVO = bgxmData[index];
        if (bgdjDw.changeToEleStyle(bgxmVO.LMC) == bgdjDw.changeToEleStyle(lmc)) {
            value = bgxmVO.BGXM_MC;
            break;
        }
    }
    return value;
};
/**
 * 根据列名获取变更项目代码
 *
 * @param bgxmData
 * @param lmc
 * @returns {String}
 */
bgdjDw.getBgxmDmByLmc = function (bgxmData, e) {
    var value = "";
    for (var index = 0; index < bgxmData.length; index++) {
        var bgxmVO = bgxmData[index];
        if (bgdjDw.changeToEleStyle(bgxmVO.LMC) == bgdjDw.changeToEleStyle(e)) {
            value = bgxmVO.YWSXDM;
            break;
        }
    }
    return value;
};
//提交变更登记申请信息
bgdjDw.tjsqxx = function () {
    var bgdjmxGridlb = [];
    for (var i = 0; i < bgxxToDB.bgxx.length; i++) {
        var arr =
            {
                "bgqnr": bgxxToDB.bgxx[i].bgqnr,
                "bgxmDm": bgxxToDB.bgxx[i].ywsxDm,
                "bghnr": bgxxToDB.bgxx[i].bghnr
            };
        bgdjmxGridlb.push(arr);
    }
    var requestData = {
        bgswdjb: {
            "bgdjmxGrid": {
                "bgdjmxGridlb": bgdjmxGridlb
            },
            bgslxxvo: {},
            inserttzfxxGrid: {},
            insertfzjgxxGrid: {},
            updateZczbxxGrid: {},
            insertnsrfyhyxxGrid: {},
            updatetzfxxGrid: {},
            updatensrfyhyxxGrid: {},
            deleteTzzexxGrid: {},
            deleteZczbxxGrid: {},
            updatefzjgxxGrid: {},
            deletensrfyhyxxGrid: {},
            djZjgxxvo: {},
            deletefzjgxxGrid: {},
            insertZczbxxGrid: {},
            updateTzzexxGrid: {},
            deletetzfxxGrid: {},
            insertTzzexxGrid: {}
        }
    };
    bgdjDwService.tj(mini.encode(requestData), function (data) {
        var resultData = mini.decode(data);
        if (!resultData.success) {
            mini.alert(resultData.message, "提示信息");
        } else {
            //if(resultData.data.sxlxDm=="01"){  //免受理免审核则直接打开税务事项通知书
            //showSwsxtzs(resultData.data);
            //}
            returnBoolean = true;
        }
    });
};
//根据纳税人身份判断可变更哪些信息
bgdjDw.nsrsfpd = function (nsrsfbz) {
    if (nsrsfbz == 5 || nsrsfbz == 7) {
        //法人身份才显示
    } else if (nsrsfbz == 6 || nsrsfbz == 8) {
        //财务负责人身份才显示(财务负责人只允许改自己的和办税人的信息)
        mini.get("fddbryddh").setReadOnly(true);
        mini.get("fddbrgddh").setReadOnly(true);
        mini.get("fddbrdzxx").setReadOnly(true);
    } else {
        //办税人身份才显示(办税人权限最低只允许改自己的信息)
        mini.get("fddbryddh").setReadOnly(true);
        mini.get("fddbrgddh").setReadOnly(true);
        mini.get("fddbrdzxx").setReadOnly(true);
        mini.get("cwfzrxm").setReadOnly(true);
        mini.get("cwfzrsfzjzlDm").setReadOnly(true);
        mini.get("cwfzrsfzjhm").setReadOnly(true);
        mini.get("cwfzryddh").setReadOnly(true);
        mini.get("cwfzrgddh").setReadOnly(true);
        mini.get("cwfzrdzxx").setReadOnly(true);

    }

};
function onTelValidation(e) {
    if (e.isValid) {
        if (e.value != "" && isTel(e.value) == false) {
            e.errorText = "电话号码格式错误";
            e.isValid = false;
        }
    }
}
/* 是否数字+ '-' */
function isTel(v) {
    var re = new RegExp("^[0-9\-]+$");
    if (re.test(v)) return true;
    return false;
}
/**
 * 河北特色
 * Author：lmyue
 * Date：2017/1/19
 * Time：20:41
 */

bgdjDw.doInitData = function () {

    var messageid = mini.loading("查询中, 请稍等 ...", "查询中");
    bgdjDwService.getDjNsrxx(mini.encode({}), function (data) {
        var resultData = mini.decode(data, false);
        if (!resultData.success) {
            mini.hideMessageBox(messageid);
            mini.alert(resultData.message, "提示信息", function () {
                window.close();
            });
            return;
        }

        var swdjblxdm = resultData.value.bgcxswdjb.bgcxDJSwdjbxxVO.kzztdjlxDm;
        //获取变更项目
        $.ajax({
            type: "GET",
            async: false,
            url: "../../../api/baseCode/get/dmBgxm/1110.ashx?" + swdjblxdm,
            data: {},
            success: function (bgxmdata) {
                bgxmxx = mini.decode(bgxmdata);
                var hiddenBgxm = ['zcdyzbm', 'scjydyzbm', 'hsfsDm', 'cyrs', 'fddbryddh', 'fddbrgddh', 'fddbrdzxx', 'cwfzrxm', 'cwfzrsfzjzlDm', 'cwfzrsfzjhm', 'cwfzrgddh', 'cwfzrdzxx', 'cwfzryddh', 'bsrxm', 'bsrsfzjzlDm', 'bsrsfzjhm', 'bsryddh', 'bsrgddh', 'bsrdzxx'];
                for (var x = 0, len_x = hiddenBgxm.length; x < len_x; x++) {
                    mini.get(hiddenBgxm[x]).setReadOnly(true);
                    for (var y = 0, len_y = bgxmxx.length; y < len_y; y++) {
                        if (!bgxmxx[y].LMC && !hiddenBgxm[x]) {
                            continue;
                        }
                        if (bgdjDw.changeToEleStyle(hiddenBgxm[x]) == bgdjDw.changeToEleStyle(bgxmxx[y].LMC)) {
                            mini.get(hiddenBgxm[x]).setReadOnly(false);
                            break;
                        }
                    }
                }
            }
        });


        //根据纳税人身份判断可变更哪些信息
        if (nsrxxUtil.getAccountInfo()) {
            //roleid参看RoleEnum
            bgdjDw.nsrsfpd(nsrxxUtil.getAccountInfo().roleId);
        }

        // 获取查询数据
        var bgcxswdjb = resultData.value.bgcxswdjb;
        setPzjgxx(bgcxswdjb.bgcxDJPzjgxxVO);
        setSwdjbxx(bgcxswdjb.bgcxDJSwdjbxxVO);
        setNsrjbxx(bgcxswdjb.bgcxDJSwdjbxxVO);
        var nsrxxForm = new mini.Form("#nsrxx");
        //批准机构信息
        nsrxxForm.setData(pzjgxx);
        mini.copyIf(pzjgxx, nsrxxForm.getDataAndText(true));

        // 税务登记表信息
        nsrxxForm.setData(swdjbxx);
        mini.copyIf(swdjbxx, nsrxxForm.getDataAndText(true));  //将表单中数据(包括combox的名称)复制到查询的初始纳税人信息中,便于预览时显示名称

        var nsrxx = nsrxxForm.getDataAndText(true);

        bgdjDw.initSfzjhmValidate(bgcxswdjb.bgcxDJSwdjbxxVO.cwfzrsfzjzlDm, "cwfzrsfzjhm");
        bgdjDw.initSfzjhmValidate(bgcxswdjb.bgcxDJSwdjbxxVO.bsrsfzjzlDm, "bsrsfzjhm");
        mini.hideMessageBox(messageid);
    }, function (res) {
        mini.hideMessageBox(messageid);
        mini.alert(res.message)
    });

    // 财务负责人与办税人身份证件号码必须实名认证
    var nsrsfbz = nsrxxUtil.getAccountInfo().roleId
    if (nsrsfbz == 5 || nsrsfbz == 7) {// 法人
        mini.get("cwfzrsfzjhm").vtype = "sfzjhm;smrz";
        mini.get("bsrsfzjhm").vtype = "sfzjhm;smrz";
        // mini.get("cwfzrxm").vtype = "smrz";
    } else if (nsrsfbz == 6 || nsrsfbz == 8) {// 财务负责人角色
        mini.get("cwfzrsfzjhm").vtype = "sfzjhm;smrz";
    } else {
        mini.get("bsrsfzjhm").vtype = "sfzjhm;smrz";// 办税人等其他角色只校验办税人
        // mini.get("bsrxm").vtype = "smrz";
    }
};


/*自定义vtype:sm*/
mini.VTypes["smrzErrorText"] = "该办税员未完成实名认证，请先完成实名认证后再进行变更！";
mini.VTypes["smrz"] = function (v) {
    return doSmrzValidate(v);
}
/* 保存前一次校验值 */
var previousVal = "";
/* 保存前一次校验结果 */
var previousFlag = false;
function doSmrzValidate(val) {
    var flag = false;
    // 防止同一值重复触发校验，频繁调用后台
    /*if(previousFlag && val == previousVal){ // 如果前一次是校验通过的，且这次val与前一次相等则直接返回true
		return true;
	}
	if(!previousFlag && val == previousVal){// 如果前一次未通过且这次值没变，则直接返回false.
		return false;
	}
	previousVal = val;*/
    var xm = mini.get("cwfzrxm").getValue();
    if (val != mini.get("cwfzrsfzjhm").getValue()) {
        xm = mini.get("bsrxm").getValue();
    }
    var valparam = {
        "sfzjhm": val,
        "xm": xm
    };
    ajax.post("../../../api/public1/smrzxx/get.ashx", mini.encode(valparam), function (data) {
        if (data.success) {
            flag = true;
        }
    }, function (error) {
        previousFlag = false;// 异常情况下重置前一次值，使其下次校验重头记录
        previousVal = "";
        return false;
    })
    previousFlag = flag;
    return flag;
}
