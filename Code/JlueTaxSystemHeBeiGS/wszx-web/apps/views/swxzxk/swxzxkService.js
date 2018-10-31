/**
 * Created by jiangmq on 2017/3/2.
 */

var mock = false;
var swxzxkService = {
    Api: function () {
        if (Api.mock) { //假数据
            return {}
        } else { // 真实接口
            var baseUrl = "../../../",
                realUrl = {
                    canDoSwxzxksq: 'api/swxzxk/get/canDoSwxzxksq.ashx',
                    tj: 'api/swxzxk/submit/swxzxk'
                }
            for (var url in realUrl) {
                realUrl[url] = baseUrl + realUrl[url];
            }
            return realUrl;
        }
    }(),
    tj: function (params, successCallback, errCallback) {
        var url = swxzxkService.Api.tj ;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    },
    canDoSwxzxksq: function (successCallback, errCallback) {
        var url = swxzxkService.Api.canDoSwxzxksq;
        ajax.get(url, {}, successCallback, errCallback);
    }
}
