// 获取每一步的form表单数据
function getFormData(id) {
    var oForm = {};
    var firstForm = $('#' + id).serializeArray();
    // 获取form表单数组对象
    $.each(firstForm, function () {
        oForm[this.name] = this.value;
    });
    return oForm;
}

/**
 * [transformToEllipsis 省略手机号]
 * @param  {[string or number]}  num [手机号]
 * @return {string}     [转换后的手机号]
 */
function transformToEllipsis(num) {
    if ('' == num || null == num) {
        return num;
    }

    var newStr = '';
    var reg = /^\d+$/;
    if (reg.test(num)) num = num + '';
    newStr = num.substring(0, 3) + '****' + num.substring(7);
    return newStr;
}

/**
 * [valiTips 每一个输入框校验]
 * @param  {[object]} _this   [当前的输入框]
 * @param  {[boolean]} bool    [true or false]
 * @param  {[string]} message [提示信息]
 * @return {[type]}         [null]
 */
function valiTips(_this, bool, message) {
    var self = $(_this);
    if (bool) {
        if (self.next('span').length === 0 || self.next('span').hasClass(
				'error')) {
            if (self.next('span').hasClass('error')) {
                self.next('span').remove();
            }
            self.removeClass('error').after('<span class="right"></span>');
        }
    } else {
        self.parent().find('.right').remove();
        if (!self.hasClass('error')) {
            self.addClass('error').after('<span class="error">' + message + '</span>');
        }
    }
}
/**
 * [timeCountDown 倒计时]
 * @param  {[object]} currentObj [当前对象]
 * @param  {[number]} count      [数字 eg:60]
 * @return {[type]}            [null]
 */
function timeCountDown(currentObj, count) {
    var clear = null;
    var o = {
        timer: function () {
            clear = setTimeout(arguments.callee, 1000);
            if (count === 0) {
                clearTimeout(clear);
                currentObj.removeClass('button-disabled');
                currentObj.text("重新发送");
            } else {
                currentObj.addClass('button-disabled');
                currentObj.text(count + ' s');
                count--;
            }
        }
    };
    o.timer();
}
/**
 * [maxStrCount 密码中出现最多的字符的个数算法]
 * @param  {[string]} str [密码字符串]
 * @return {[number]}     [最大的次数]
 */
function maxStrCount(str) {
    var o = {},
		k = "",
		num = 0,
		value = "";
    for (var i = 0, len = str.length; i < len; i++) {
        var k = str[i];
        if (o[k]) {
            o[k]++
        } else {
            o[k] = 1;
        }
    }
    for (key in o) {
        if (num < o[key]) {
            num = o[key];
            value = key;
        }
    }
    return num;
}

/**
 * [passwordComplexity 密码强度]
 * @param  {[string],[object]} val [输入框的值,校验类]
 * @return {[number]}     [0弱，1中，2强]
 */
function passwordComplexity(val, validator) {
    var index = 0;
    var len = val.length;
    var flagLen = len > 6 && len < 9;
    var alphaReg = /^[a-z]+$/i; //字母
    var pwdReg = /^(?![0-9]+$)\w{8,}$/;
    //是不是密码规则，数字和英文组合，可以含有下划线
    var isPwd = function () {
        if (alphaReg.test(val)) return false;
        if (pwdReg.test(val) && val.length > 7) return true;
        return false;
    };
    //弱
    if (!val && len < 6) {
        return index;
    }
    if (len > 6 && validator.isNatural(val) || len > 6 && validator.isAlpha(
			val)) {
        return index;
    }
    if (flagLen && validator.isAlphaAndNum(val)) {
        return index;
    }
    //中
    if (len > 8 && validator.isAlphaAndNum(val)) {
        index = 1;
    }
    //强
    if (len > 12 && isPwd(val) && maxStrCount(val) < 6) {
        index = 2;
    }
    return index;
}

//显示消息提示
//如果res中的message为非空显示res.message，则显示message参数的信息
function showMessage(res, message) {
    if (null != res.message && typeof (res.message) != "undefined") {
        parent.layer.msg(res.message);
    } else {
        parent.layer.msg(message);
    }
}

//注册发送短信认证码
function sendRegisterSMSCode(obj, mobile, yzmcode) {
    if (obj.text() === '点击发送' || obj.text() === '重新发送') {
        var result = registerSendCode(mobile, yzmcode); // 发送手机短信认证码
        if (result) {
            timeCountDown(obj, 60);
        }
        return true;
    }
    return false;
}

//发送短信验证码
function sendSMSCodeByCaptcha(obj, mobile, yzmcode) {
    if (obj.text() === '点击发送' || obj.text() === '重新发送') {
        sendVerifyCodeByCaptcha(mobile, yzmcode); // 发送手机短信认证码 sms.js
        timeCountDown(obj, 60);
        return true;
    }
    return false;
}

//根据token发送验证码
function sendSMSCodeByToken(obj, token, yzmcode) {
    if (obj.text() === '点击发送' || obj.text() === '重新发送') {
        var result = sendVerifyCodeByToken(token, yzmcode); // 发送手机短信认证码
        if (result) {
            timeCountDown(obj, 60);
        }
        return true;
    }
    return false;
}

//根据token校验短信认证码
function checkSMSCodeByToken(token, code) {
    $.ajax({
        url: apiUrl + "/checkVerifyCodeByToken",
        type: "get",
        data: {
            "token": token,
            "code": code
        },
        contentType: "application/json",
        success: function (res) {
            // 正确，下一步
            if (res.success) {
                //检验成功跳转到下一步
                stepNav.goNextStep();
            } else {
                showMessage(res, res.message);
            }
        },
        error: function (res) {
            layer.msg('图片认证码校验失败，请稍后再试！');
        }
    });
}

//刷新图片认证码
function refreshCaptcha(id) {
    $(id).attr('src', '../../../captcha.jpg?' + Math.random());
}
