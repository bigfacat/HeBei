/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/20
 * Time：20:35
 *
 */


var fpyjService = {
    mock: false
};
$.extend(fpyjService, {
    Api: function () {
        if (fpyjService.mock) {  // 假数据
            return {
                /*tj: '/api/wgz/wcjyzmkj/submit/sqxx'*/
            }
        } else {  // 真实接口
            return function () {
                var baseUrl = '../../..',
                    // 真实接口
                    real = {
                        tj: '/api/fp/fpyj/submit/fpyjsq.ashx'
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real
            }();
        }
    }(),
    tj: function (params, successCallback, errCallback) {
        var url = fpyjService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    }
});
