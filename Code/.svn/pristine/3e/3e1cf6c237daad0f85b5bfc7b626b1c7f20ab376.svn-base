//提示
function alertMsg(res) {
    if (null != res.message && typeof (res.message) != "undefined") {
        showMessage(res, res.message);
    }
    else {
        showMessage(res, '发送验证码失败，请刷新重试');
    }
}

//用户注册手机短信认证码
function registerSendCode(mobile, code, callback) {
    var result = true;
    $.ajax({
        url: apiUrl + "/registerSendCode",
        type: "get",
        data: {
            phone: mobile,
            code: code
        },
        async: false,
        success: function (res) {
            //var data = JSON.parse(res);
            if (!res.success) {
                alertMsg(res);
                result = false;
                //刷新图片验证码
                refreshCaptcha('#vality img');
            }
            callback && $.isFunction(callback) ? callback() : '';
        },
        error: function (res) {

        }
    });

    return result;
}

//发送验证码，需要检测手机号是否注册
function sendVerifyCode(mobile, callback) {
    $.ajax({
        url: apiUrl + "/sendVerifyCode",
        type: "get",
        data: {
            phone: mobile
        },
        success: function (res) {
            //var data = JSON.parse(res);
            if (!res.success) {
                alertMsg(res);
                return;
            }
            $.isFunction(callback) ? callback() : '';
        },
        error: function (res) {

        }
    });
}

//发送验证码
function sendVerifyCodeByCaptcha(mobile, code) {
    $.ajax({
        url: apiUrl + "/sendVerifyCodeByCaptcha",
        type: "get",
        data: {
            phone: mobile,
            code: code
        },
        success: function (res) {
            //var data = JSON.parse(res);
            if (!res.success) {
                alertMsg(res);
            }
        },
        error: function (res) {

        }
    });
}

//根据TOKEN发送验证码
function sendVerifyCodeByToken(token, yzmcode) {
    var result = true;
    $.ajax({
        url: apiUrl + "/sendVerifyCodeByToken",
        type: "get",
        data: {
            token: token,
            code: yzmcode
        },
        async: false,
        success: function (res) {
            //var data = JSON.parse(res);
            if (!res.success) {
                alertMsg(res);
                //刷新图片验证码
                refreshCaptcha('#valityForm img');

                result = false;
            }
        },
        error: function (res) {

        }
    });

    return result;
}

//校验手机验证码
function checkMobileVerifyCode(phone, code) {
    var result = false;
    $.ajax({
        url: apiUrl + "/checkVerifyCode",
        type: "get",
        data: { 'phone': phone, 'code': code },
        async: false,
        success: function (res) {
            //var data = JSON.parse(res);
            if (res.success) {
                result = true;
            } else {
                showMessage(res, '手机验证码错误！');
            }
        },
        error: function (res) {
            layer.msg('系统异常，请稍后再试...');
        }
    });
    return result;
}


function showMessage(res, message) {
    if (null != res.message && typeof (res.message) != "undefined") {
        mini.alert(res.message);
    } else {
        mini.alert(message);
    }
}

