/**
 * Created with JetBrains WebStorm
 * Author：yaopf
 * Date：2017/2/13
 * Time：20:35
 *
 */

var ybnsrjyzsrdService= {
    Api: function () {
        if (Api.mock) {  // 假数据
            return {
                hqzhxx: '../../data/ckzhzhbg.json',
                tj: ''
            };
        } else {  // 真实接口
            return function(){
                var baseUrl = '../../..',
                    realUrl = {
                        queryYbnsrZg: '/api/rd/ybnsrjybfzsrd/check/checkNsrzg.ashx',
                        tj: '/api/rd/ybnsrjybfzsrd/submit/ybnsrjybfzsrdxx'
                    };
                for (var url in realUrl) {
                    realUrl[url] = baseUrl + realUrl[url];
                }
                return realUrl;
            }();
        }
    }(),
    queryYbnsrZg: function (params, successCallback, errCallback) {
        var url = ybnsrjyzsrdService.Api.queryYbnsrZg;
        ajax.post(url, params, successCallback, errCallback);
    },
    tj: function (params, successCallback, errCallback) {
        var url = ybnsrjyzsrdService.Api.tj;
        wssqUtil.tjsq(url,params, successCallback, errCallback);
    }
};
