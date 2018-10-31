/*自定义vtype:两次密码输入*/
mini.VTypes["differErrorText"] = "两次密码输入不一致";
mini.VTypes["differ"] = function (v) {
    var pwd = mini.get("password");
    if (v === pwd.value) return true;
    return false;
}
/*自定义vtype:新密码两次密码输入*/
mini.VTypes["newdifferErrorText"] = "两次密码输入不一致";
mini.VTypes["newdiffer"] = function (v) {
    var pwd = mini.get("newPassword");
    if (v === pwd.value) return true;
    return false;
}
/*自定义vtype: username*/
mini.VTypes["usernameErrorText"] = "请输入8-32位以字母开头字符(字母、数字组合)";
mini.VTypes["username"] = function (v) {
    var reg = /^[a-zA-Z][a-zA-Z0-9]{7,31}$/;
    var czm = /^[a-zA-Z]{7,31}$/;
    if (!v || reg.test(v) || czm.test(v)) return true;
    return false;
}

/*自定义vtype: 英文和数字*/
mini.VTypes["englishAndNumErrorText"] = "请输入8-16位字符区分大小写";
mini.VTypes["englishAndNum"] = function (v) {
    var re = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,32}$/;
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype:16位整数，两位小数金额*/
mini.VTypes["double16ErrorText"] = "请输入最大16位整数2位小数";
mini.VTypes["double16"] = function (v) {
    var re = new RegExp("^(([-]?[0-9]{1,16}[.]{1}[0-9]{1,2})$|([-]?[0-9]{1,16})$)");
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype:纳税人识别号*/
mini.VTypes["nsrsbhErrorText"] = "请输入正确的纳税人识别号";
mini.VTypes["nsrsbh"] = function (v) {
    var re = new RegExp("^[a-zA-Z0-9\-]{15,20}$");
    var num = /^\d{15,20}$/;
    if (!v || num.test(v)) return true;
    if (!v || re.test(v)) return true;
    return false;
}

/* 是否汉字42个 */
mini.VTypes["isChinese42ErrorText"] = "请输入少于42个汉字";
mini.VTypes["isChinese42"] = function (v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    // var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    if (re.test(v)) {
        if (v.length > 42) {
            return false;
        }
    }
    return true;
}

/* 是否汉字50个 */
mini.VTypes["isChinese50ErrorText"] = "请输入少于50个汉字";
mini.VTypes["isChinese50"] = function (v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    // var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    if (re.test(v)) {
        if (v.length > 50) {
            return false;
        }
    }
    return true;
}

/* 是否汉字340个 */
mini.VTypes["isChinese340ErrorText"] = "请输入少于340个汉字";
mini.VTypes["isChinese340"] = function (v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    // var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    if (re.test(v)) {
        if (v.length > 340) {
            return false;
        }
    }
    return true;
}

/*自定义vtype:手机号码*/
mini.VTypes["telNumErrorText"] = "请输入11位数字的手机号码";
mini.VTypes["telNum"] = function (v) {
    var re = /^[0-9]{11}$/;
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype:身份证号码*/
mini.VTypes["idCardErrorText"] = "请输入正确的身份证号码";
mini.VTypes["idCard"] = function (v) {
    v = v.replace("x", "X");
    mini.get("sfzhm").setValue(v);
    //是否为空
    if (v === '') {
        return false;
    }
    //检验位的检测
    if (checkParity(v) === false) {
        return false;
    }
    //校验长度，类型
    if (isCardNo(v) === false) {
        return false;
    }
    return true;
}

/*自定义vtype: 银行卡号*/
mini.VTypes["bankNumErrorText"] = "请输入正确的银行卡号";
mini.VTypes["bankNum"] = function (v) {
    var re = new RegExp("^[0-9\*]{16,19}$");
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype: 正数*/
mini.VTypes["positiveNumErrorText"] = "请输入正数";
mini.VTypes["positiveNum"] = function (v) {
    var re = new RegExp("^[0-9]*[1-9][0-9]*$");
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype:  大于0*/
mini.VTypes["largerThan0ErrorText"] = "请输入大于0的数字";
mini.VTypes["largerThan0"] = function (v) {
    var re = /^[1-9]\d*(\.\d+)?$/;
    if (!v || re.test(v)) return true;
    return false;
}

/*自定义vtype: 密码*/
mini.VTypes["pwdErrorText"] = "8-16位，数字和英文组合，可以含有下划线";
mini.VTypes["pwd"] = function (v) {
    var alphaReg = /^[a-z]+$/i; //字母
    var pwdReg = /^(?![0-9]+$)\w{8,}$/;
    if (alphaReg.test(v)) return false;
    if (pwdReg.test(v) && v.length > 7 && v.length <= 16) return true;
    return false;
}

//校验位的检测
var checkParity = function (card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0,
          i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};

// 15位转18位身份证号
var changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
				4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
				'2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};

// 检查号码是否符合规范，包括长度，类型
var isCardNo = function (card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }
    return true;
};

// 验证不通过提示错误
function updateError(e) {
    var id = e.sender.id + "_error";
    var el = document.getElementById(id);
    if (el) {
        el.innerHTML = e.errorText;
    }
}

// 用户名校验
function onUserNameValidation(e) {
    updateError(e);
}

// 密码校验
function onPwdValidation(e) {
    updateError(e);
}

// 确认密码
function confirmPasswordValidation(e) {
    updateError(e);
}

// 姓名校验
function onNameValidation(e) {
    updateError(e);
}

// 身份证号校验
function onIdCardNumberValidation(e) {
    updateError(e);
}

// 手机号码校验
function telNumberValidation(e) {
    updateError(e);
}

// 验证码校验
function codeValidation(e) {
    updateError(e);
}

// 邮箱校验
function emailValidation(e) {
    updateError(e);
}

// 微信校验
function wechatNumValidation(e) {
    updateError(e);
}

//地址校验
function addressValidation(e) {
    if (e.value == "") {
        e.isValid = false;
        e.errorText = "不能为空";
    }
    else {
        e.isValid = true;
        e.errorText = "";
    }
    updateError(e);
}

//地址校验
function addressValidation11(e) {
    if (e.value == "") {
        e.isValid = false;
        e.errorText = "不能为空";
        var el = document.getElementById("address1_1_error");
        if (el) {
            el.innerHTML = "不能为空";
        }
    } else {
        var id = e.sender.id + "";
        var temp = id.substring(0, id.length - 1);
        var value1 = mini.get(temp + "1").getValue();
        var value2 = mini.get(temp + "2").getValue();
        var value3 = mini.get(temp + "3").getValue();
        e.isValid = true;
        e.errorText = "";
        if (!checkIsNull(value1) && !checkIsNull(value2) && !checkIsNull(value3)) {
            var el = document.getElementById("address1_1_error");
            if (el) {
                el.innerHTML = "";
            }
        }
    }
}

function addressValidation1(e) {
    var id = e.sender.id + "";
    var temp = id.substring(0, id.length - 1);
    var value1 = mini.get(temp + "1").getValue();
    var value2 = mini.get(temp + "2").getValue();
    var value3 = mini.get(temp + "3").getValue();
    if (checkIsNull(value1) && checkIsNull(value2) && checkIsNull(value3) ||
			!checkIsNull(value1) && !checkIsNull(value2) && !checkIsNull(value3)) {
        e.isValid = true;
        e.errorText = "";
    } else {
        e.isValid = false;
        e.errorText = "请填写完整地址";
    }
    updateError(e);
}

function addressValidation2(e) {
    var id = e.sender.id + "";
    var temp = id.substring(0, id.length - 1);
    var value1 = mini.get(temp + "1").getValue();
    var value2 = mini.get(temp + "2").getValue();
    var value3 = mini.get(temp + "3").getValue();
    if (!checkIsNull(value1) && !checkIsNull(value2) && !checkIsNull(value3) ||
			checkIsNull(value1) && checkIsNull(value2) && checkIsNull(value3)) {
        var d = mini.get(temp + "3");
        d.setIsValid(true);
        d.errorText = "";
        var el = document.getElementById(temp + "3_error");
        if (el) {
            el.innerHTML = "";
        }
    }
}
//判断是否为空或者undefined
function checkIsNull(value) {
    if (value == undefined || value == "undefined" || value == "") {
        return true;
    } else {
        return false;
    }

}

//银行卡号校验
function bankNumValidation(e) {
    updateError(e);
}

//注册地址校验
function registerAddressValidation(e) {
    updateError(e);
}

//注册资本校验
function registerCapitalValidation(e) {
    updateError(e);
}

//经营范围校验
function busniessScopeValidation(e) {
    updateError(e);
}

//税号校验
function englishAndNumValidation(e) {
    updateError(e);
}

//纳税人名称
function taxpayerName(e) {
    updateError(e);
}

//去掉前后空格
function trim(id) {
    var d = mini.get(id);
    var value = d.getValue();
    if (value == "") return;
    var reg = /^\s*|\s*$/g;
    value = value.replace(reg, "");
    d.setValue(value);
}
