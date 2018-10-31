var ssoserverUrl;

$(document).ready(function () {
    ssoserverUrl = getXtcs("SSOSERVER_URL"); //获取单点登录地址
});

//获取系统参数
function getXtcs(paramName) {
    var result = "";
    $.ajax({
        url: apiUrl + "/getXtcs.ashx",
        async: false,
        type: 'get',
        data: {
            paramCode: paramName,
            random: Math.random()
        },
        dataType: 'json',
        success: function (res) {
            if (res.success) {
                result = res.data;
            }
        },
    });
    return result;
}

function callbackFun2(e) {

}

//获取公钥
function getRsaPublicKey() {
    var pubKey = "";
    if (ssoserverUrl == "" || ssoserverUrl == undefined) {
        return;
    }

    $.ajax({
        url: ssoserverUrl + "/base/getRsaPublicKey.do",
        async: false,
        dataType: 'JSONP',
        type: 'get',
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "callbackFun2", //callback的function名称,服务端会把名称和data一起传递回来
        success: function (data) {
            if (data.success) {
                getRsaPublicKeyCallback(data.data.pk); //回调
            }
            else {
                alert('获取公钥失败，请刷新网页重试!');
            }
        },
        error: function (res) {
            alert('获取公钥失败，请刷新网页重试!');
        }
    });
}

var countdown = 60; //倒计时时间
//倒计时
function setTime(obj) {
    clearTime = setTimeout(function () {
        setTime(obj);
    }, 1000);
    if (countdown === 0) {
        clearTimeout(clearTime);
        obj.sender.setEnabled(true);
        obj.sender.el.innerText = "重新发送";
        countdown = 60;
    } else {
        obj.sender.setEnabled(false);
        obj.sender.el.innerText = "重新发送(" + countdown + "s" + ")";
        countdown--;
    }
}

//判断是否存在指定函数   
function isExitsFunction(funcName) {
    try {
        if (typeof (eval(funcName)) == "function") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

// 判断是否存在指定变量   
function isExitsVariable(variableName) {
    try {
        if (typeof (variableName) == "undefined") {
            return false;
        } else {
            return true;
        }
    } catch (e) {
    }
    return false;
}
