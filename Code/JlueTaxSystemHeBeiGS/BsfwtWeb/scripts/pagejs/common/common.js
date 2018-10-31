/** ========获取缓存纳税人信息方法集合== */
function setCacheObject(key, data) {
    var str = JSON.stringify(data);
    SUI.store.set(key, str);
}

function getCacheObject(key) {
    return JSON.parse(SUI.store.get(key));
}

function getNsrxxVO() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    // 暂时处理客户端多企业切换登录session未清理的问题
    var suiSessionId = SUI.store.get("JSESSIONID");
    var cookie_val = getCookie("JSESSIONID");
    // modified by zhjn 惠税客户端首次打开页面suiSessionId和cookie_val都为空的但nsrData不为空情况，清空下缓存 
    if ((nsrData != null) && ((cookie_val != suiSessionId) || (cookie_val == "" || !cookie_val))) {
        nsrData = null;
        SUI.store.remove("NsrjbxxVO");
        SUI.store.remove("JSESSIONID");
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

function getNsrsbh() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    if (nsrData == null)
        return "";
    return nsrData.nsrsbh;
}
function getNsrmc() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    if (nsrData == null)
        return "";
    return nsrData.nsrmc;
}

function getNsrFlId() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    if (nsrData == null)
        return "";
    return nsrData.nsrflId;
}
/**
 * 获取增值税纳税人类型 如果是1说明是增值税 小规模纳税人
 * 
 * @returns
 */
function getNsrlxId() {
    var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
    if (nsrData == null)
        return "";
    return nsrData.nsrlx;
}

var swsxConstants = {
    SWSX_DM_DWNSRDJ: "110101",
    SWSX_DM_GTGSHDJ: "110121",
    SWSX_DM_LSNSRDJ: "110122",
    SWSX_DM_CKZHZHBG: "110111",
    SWSX_DM_CWKJZDBA: "110112",
    SWSX_DM_ZZSYBNSRDJ: "110113",
    /* SWSX_DM_FPPZHD : "110207", */
    SWSX_DM_FPDK: "110210",// 普通发票代开申请
    SWSX_DM_ZZSFPDK: "110212",// 增值税专用发票代开申请
    SWSX_DM_ZZSHYFPDK: "110213",// 增值税货运发票代开申请
    SWSX_DM_ZXDJ: "110107",
    SWSX_DM_BGDJ: "110104",
    SWSX_DM_DYHSBBGB: "110301",
    SWSX_DM_FPPZBG: "110208",
    SWSX_DM_ZZSJMBA: "110401",
    SWSX_DM_XZXGMNS: "110403",
    SWSX_DM_ZGMCCJ: "110404",
    SWSX_DM_FPLYSQ: "110207",
    SWSX_DM_FPZCLY: "110209",
    SWSX_DM_XGMDJGM: "110114", // 4.1.17 选择按小规模纳税人纳税登记管理
    SWSX_DM_YBNSRJYBFZSBA: "110402",
    SWSX_DM_WCJYZMKJ: "110801",
    SWSX_DM_WCJYZMHX: "110802",
    SWSX_DM_WCJYBYDJ: "110132",
    SWSX_DM_WCJYSB: "110133",
    SWSX_DM_JZJT: "110407",
    SWSX_DM_SQKCBA_CJRZFGZKC: "110405",
    SWSX_DM_SQKCBA_QYYFFYKC: "110406",
    SWSX_DM_SWXZXK: "110408",
    SWSX_DM_QYSDS_YHSXBA: "110409",
    SWSX_DM_ZZSPTFPDK: "110214"
};
var swsx = {
    "110101": "设立税务登记（适用单位纳税人）",
    "110121": "设立税务登记 （适用个体工商户）",
    "110122": "设立税务登记 （适用临时税务登记）",
    "110111": "存款账户账号报告",
    "110112": "财务会计制度备案",
    "110209": "普通发票领用",
    "110210": "普通发票代开",
    "110104": "变更税务登记",
    "110301": "多元化申报报告表",
    "110302": "多元化申报报告表撤销",
    "110208": "普通发票票种限额限量变更",
    "110207": "普通发票领用申请",
    "110801": "外出经营证明开具",
    "110801": "外出经营证明核销",
    "110409": "企业所得税优惠事项备案",
    "110214": "增值税普通发票代开"
}

// 车牌号规则
var vCarNumber = {
    11301000000: "A",// 石家庄 冀A
    11302000000: "B",// 唐山 冀B
    11303000000: "C",// 秦皇岛 冀C
    11304000000: "D",// 邯郸市 冀D
    11305000000: "E",// 邢台市 冀E
    11306000000: "F",// 保定 冀F
    11307000000: "G",// 张家口市 冀G
    11308000000: "H",// 承德市 冀H
    11309000000: "J",// 沧州市 冀J
    11310000000: "R",// 廊坊市 冀R
    11311000000: "T"// 衡水市 冀T
}

/** ========iframe框架========= */
/*
 * StepNav = function () { "use strict"; var dts = []; var objul = ""; var setup = {
 * makeLi: function (obj) { var html = ""; for (var i = 0; i < dts.length; i++) {
 * html += '
 * <li class="wizard-steps  ' + (i == 0 ? " stepstart" : "") + '  ' + (i == dts.length - 1 ? "stepend" : "") + '  "><span
 * class="ok">.</span><span class="step">' + (i + 1) + '</span><span
 * class="title">' + dts[i][0] + '</span></li>'; }
 * $(obj).empty().append(html); _setStep(0); } } var _init = function (obj,
 * data) { dts = data; objul = obj; setup.makeLi(obj); }
 * 
 * var _getCurrentStep = function () { var objs = $(objul).find("li"); return
 * objs.index($(objul).find(".current")); }
 * 
 * var _setStep = function (stepnum) { var objs = $(objul).find("li");
 * objs.removeClass("stepsover").removeClass("current");
 * objs.eq(stepnum).addClass("current").addClass("stepsover");
 * objs.eq(stepnum).prevAll().addClass("stepsover");
 * objs.eq(stepnum).nextAll().removeClass("stepsover"); $("#content
 * iframe").hide(); if ($("#content .stepcontent" + stepnum).length == 0) {
 * //设置iframe的id var frameId = ""; if (dts[stepnum].length > 2) { frameId =
 * dts[stepnum][2]; } else { frameId = "stepcontent" + stepnum; }
 * $("#content").append('<iframe class="stepcontent' + stepnum + '" src="' +
 * dts[stepnum][1] + '" width="100%" height="100%" frameborder="0" id="' +
 * frameId + '"></iframe>'); } else { $(".stepcontent" + stepnum).show(); } }
 * 
 * var _nextStep = function () { var c = _getCurrentStep(); if (c == dts.length -
 * 1) { return; } _setStep(c + 1); }
 * 
 * var _prevStep = function () { var c = _getCurrentStep(); if (c == 0) {
 * return; } _setStep(c - 1); }
 * 
 * var _lastStep = function () { var c = _getCurrentStep(); if (c == dts.length -
 * 2) { return true; } return false; }
 * 
 * var _getIFrame = function (frameId) { return $('#' +
 * frameId)[0].contentWindow; }
 * 
 * var _getIFrameByStep = function (stepNum) { return $('#' +
 * dts[stepNum][2])[0].contentWindow; }
 * 
 * var _setLoadUrl = function (stepNum, loadUrl) { dts[stepNum][1] = loadUrl; if
 * ($("#content .stepcontent" + stepNum).length > 0) { $("#content .stepcontent" +
 * stepNum).remove(); } }
 * 
 * return { init: _init, //设定参数 setstep: _setStep, //设定当前需要跳到第几步 getcurentnum:
 * _getCurrentStep,//获取当前步骤 nextstep: _nextStep,//执行下一步 prevstep: _prevStep,
 * //执行上一步 laststep: _lastStep, //判断是否最后一步 getIFrame: _getIFrame,
 * //根据frameid取iframe getIFrameByStep: _getIFrameByStep, //根据步骤取iframe
 * setLoadUrl: _setLoadUrl } }
 * 
 */
//
mini.copyTo(mini.Form.prototype, {
    getDataAndText: function (flag) {
        var formData = this.getData(flag);
        var fields = this.getFields();
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].type == "combobox") {
                formData[fields[i].getId() + "Text"] = fields[i].getText();
            }
        }
        return formData;
    }
});

function getCookie(name) {
    var c = new Object();
    var i = 0;
    var clen = document.cookie.length;
    while (i < clen) {
        var endstr = document.cookie.indexOf(";", i);
        if (endstr == -1)
            endstr = document.cookie.length;

        var v = unescape(document.cookie.substring(i, endstr));
        var key = v.substring(0, v.indexOf("=", 0));
        var val = v.substring(v.indexOf("=") + 1);
        c[key] = val;
        i = endstr + 2;
    }
    if (name)
        return c[name] == undefined ? "" : c[name];
    return "";
}

function setCookie(name, value, days, path) {
    if (!days)
        days = -1;
    var expire = new Date();
    expire.setTime(expire.getTime() + 86400000 * days);

    document.cookie = name + "=" + escape(value) + "; expires="
			+ expire.toGMTString() + ";" + (path ? 'path=' + path : '');
}

$(function () {
    $(".mini-textbox").each(function () {
        var input = mini.get(this.id);
        //mini.get(this.id).on("keyup", function(sender) {
        $(this.id).bind("keyup", function (sender) {
            var inputValue = sender.sender.getInputText();
            var re = /^([\S\s]*[\s]+)$|^([\s]+[\S\s]*)$/;
            if (re.test(inputValue)) {
                sender.sender.setInputText(inputValue.trim());
                input.setValue(inputValue.trim());
            }
        });
    });
    bodyAddAttr();
});
// 返回true,表示当前税务不是正在办理状态

function zzblrwcxValidate(swsxdm) {
    var nsrsbh = getNsrsbh();
    var flag = false;
    $.ajax({
        url: "/gggncx/zzblrw_queryZzblrw.do",
        async: false,
        type: "POST",
        data: {
            nsrsbh: nsrsbh,
            swsxdm: swsxdm
        },
        success: function (json) {
            var resultData = mini.decode(json);
            if (!resultData.success) {
                mini.alert(resultData.message, "提示信息", function () {
                    if (typeof (window.parent.closeWin) === "function") {
                        window.parent.closeWin();
                    } else {
                        closeFrameDialogCut();
                    }
                });
            } else {
                flag = true;

            }
        },
        error: function () {
            mini.alert("办理任务查询出错！", '提示信息');
        }
    });
    return flag;
}
// 展示静态内容
function preview(form) {
    var formFields = form.getFields();
    for (var t in formFields) {
        var tempField = formFields[t];
        var name = tempField.name;
        var value = tempField.value;
        var text = tempField.text;
        if (tempField.type != 'undefined') {
            if (tempField.type == 'combobox') { // 下拉列表
                $("#" + name + "_view").text(text);
            } else if (tempField.type == 'textbox') { //
                $("#" + name + "_view").text(value);
            } else if (tempField.type == 'treeselect') { // 单选树
                $("#" + name + "_view").text(text);
            } else if (tempField.type == 'datepicker') { // 时间
                $("#" + name + "_view").text(text);
            } else if (tempField.type == 'textarea') {
                $("#" + name + "_view").text(value);
            }
            if (tempField.type == 'checkbox') { //
                $("#" + name + "_view").text((value == 'Y') ? '是' : '否');
            }
        }
    }
}

var sm3 = "经办人系本人，此项业务真实，填写的表单内容和上传的附列资料真实、有效。我（单位）愿承担由此产生的一切法律责任。"

/**
 * 金额小写转化为大写
 * 
 * @param numberValue
 * @returns {string}
 */

function numberTransformUppercase(numberValue) {
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        alert("超出计算范围");
        return "";
    }
    if (numberValue == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11)
				&& i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            } else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        } else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            } else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    return chineseValue;
}

$(document).ajaxComplete(function (evt, request, settings) {
    var text = request.responseText;
    if (text == "'notlogin'") {
        mini.alert("登录超时，请重新登录。", "提示信息", function () {
            window.parent.location.href("/")
        });
    }
})

function bodyAddAttr() {
    $("body").attr("isClient", true);
}
// 取消调用
function closeFrameDialog() {
    mini.confirm("确定关闭窗口？", "关闭窗口", function (action) {
        if (action == "ok") {
            rhwtCloseDialog();
            if (parent.$('body').attr('isClient') === "true") {
                window.location.href = 'servyou://windowcmd.closewindow/';
            } else {
                parent.$('body').trigger('close.frame.dialog'); // 调用前后端分离框架
                // 窗口关闭
            }
        } else {
            return;
        }
    });
}
// 完结(没有confirm)
function closeFrameDialogWj() {
    rhwtCloseDialog();
    if (parent.$('body').attr('isClient') === "true") {
        window.location.href = 'servyou://windowcmd.closewindow/';
    } else {
        parent.$('body').trigger('close.frame.dialog'); // 调用前后端分离框架 窗口关闭
    }
}

//cut调用(没有confirm)
function closeFrameDialogCut() {
    rhwtCloseDialog();
    if (parent.parent.$('body').attr('isClient') === "true") {
        window.location.href = 'servyou://windowcmd.closewindow/';
    } else {
        parent.parent.$('body').trigger('close.frame.dialog'); // 调用前后端分离框架 窗口关闭
    }
}
// 融合网厅业务办理窗口关闭
function rhwtCloseDialog() {
    if (parent.window.location.href.indexOf('rhwt') > -1) {
        var miniWinCloseBtn = parent.$('body').find('.mini-tools-close');
        if (miniWinCloseBtn) {
            $(miniWinCloseBtn).click();
        }
    }
}
