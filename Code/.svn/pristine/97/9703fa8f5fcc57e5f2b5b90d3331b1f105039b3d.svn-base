/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/20
 * Time：20:35
 *
 */


var qysdsyhsxbaService = {
    mock: false
};
$.extend(qysdsyhsxbaService, {
    Api: function () {
        if (qysdsyhsxbaService.mock) {  // 假数据
            return {
                /*tj: '/api/wgz/wcjyzmkj/submit/sqxx'*/
            };
        } else {  // 真实接口
            return function () {
                var baseUrl = '../../..',
                    // 真实接口
                    real = {
                        getSfzrdxx: '/api/yh/qysdsyhsx/get/qysdssfzrd.ashx',
                        getInitData: '/api/yh/qysdsyhsx/get/initData/',
                        getNsrxx: '/api/yh/qysdsyhsx/get/nsrxx/',
                        tj: '/api/yh/qysdsyhsx/submit/qysdsxx'
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real;
            }();
        }
    }(),
    tj: function (params, successCallback, errCallback) {
        var url = qysdsyhsxbaService.Api.tj ;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    },
    getInitData: function (params, successCallback, errCallback) {
        var url = qysdsyhsxbaService.Api.getInitData + mini.decode(params).band+'.ashx';
        ajax.post(url, params, successCallback, errCallback);
    },
    getNsrxx: function (params, successCallback, errCallback) {
        var url = qysdsyhsxbaService.Api.getNsrxx + mini.decode(params).nsrsbh;
        ajax.post(url, params, successCallback, errCallback);
    },
    getSfzrdxx: function (params, successCallback, errCallback) {
        var url = qysdsyhsxbaService.Api.getSfzrdxx;
        ajax.post(url, params, successCallback, errCallback);
    }
});
