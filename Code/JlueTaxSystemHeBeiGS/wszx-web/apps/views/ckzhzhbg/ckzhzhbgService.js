/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/20
 * Time：20:35
 *
 */

var ckzhzhbgService = {};
debugger;
ckzhzhbgService.api = {
    hqzhxx: "../../../api/dj/ckzhzhbg/get/ckzhzhxx.ashx", // 存款账户账号信息
    tj: "../../../api/dj/ckzhzhbg/submit/ckzhzhxx", // 提交
    yhzhxz: "/wszx-web/api/baseCode/CombSelect/common/DM_GY_YHZHXZ.ashx", // 银行账户性质
    hbxzqh: "/wszx-web/api/baseCode/CombSelect/common/DM_GY_XZQH_HB_CITY.ashx", // 行政区划
    khyh: "../../../api/baseCode/get/baseCode2CombSelect4.ashx",   // 开户银行
    bz: "/wszx-web/api/baseCode/CombSelect/common/DM_GY_HB.ashx", // 币种
    cyyhzl: "/wszx-web/api/baseCode/CombSelect/common/DM_GY_YHHB.ashx" // 常用银行种类
};

// 获取账户信息

ckzhzhbgService.hqzhxx = function (params, successCallback, errCallback) {
    debugger;
    var url = ckzhzhbgService.api.hqzhxx;
    ajax.post(url, {}, successCallback, errCallback)
};
// 行别行政区划

ckzhzhbgService.hbxzqh = function (params, successCallback, errCallback) {
    debugger;
    var url = ckzhzhbgService.api.hbxzqh;
    ajax.post(url, params, successCallback, errCallback)
};
// 银行账户性质

ckzhzhbgService.yhzhxz = function (params, successCallback, errCallback) {
    debugger;
    var url = ckzhzhbgService.api.yhzhxz;
    ajax.post(url, params, successCallback, errCallback)
};
// 开户银行

ckzhzhbgService.getKhyh = function (params, successCallback, errCallback) {
    debugger;
    var url = ckzhzhbgService.api.khyh;
    ajax.post(url, params, successCallback, errCallback)
};
// 币种

ckzhzhbgService.getBz = function (params, successCallback, errCallback) {
    debugger
    var url = ckzhzhbgService.api.bz;
    ajax.post(url, params, successCallback, errCallback)
};
// 常用银行种类

ckzhzhbgService.cyyhzl = function (params, successCallback, errCallback) {
    debugger;
    var url = ckzhzhbgService.api.cyyhzl;
    ajax.post(url, params, successCallback, errCallback)
};
// 提交
ckzhzhbgService.tj = function (params, successCallback, errCallback) {
    var url = ckzhzhbgService.api.tj;
    wssqUtil.tjsq(url, params, successCallback, errCallback);
};
