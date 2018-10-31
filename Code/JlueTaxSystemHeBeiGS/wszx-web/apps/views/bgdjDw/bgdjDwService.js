/**
 * Created with JetBrains WebStorm
 * Author：lmyue
 * Date：2017/1/20
 * Time：20:35
 *
 */


var bgdjDwService = {
    mock: false
};
$.extend(bgdjDwService, {
    Api: function () {
        if (bgdjDwService.mock) {  // 假数据
            return {
                /*tj: '/api/wgz/wcjyzmkj/submit/sqxx'*/
            }
        } else {  // 真实接口
            return function () {
                var baseUrl = '../../..',
                    // 真实接口
                    real = {
                        getDjNsrxx: '/api/dj/bgdj/get/djNsrxx.ashx',
                        getHsfs: '/api/baseCode/get/baseCode2CombSelect2/DM_GY_HSFS.ashx',
                        getSfzjlx: '/api/baseCode/get/baseCode2CombSelect2/DM_GY_SFZJLX.ashx',
                        tj: '/api/dj/bgdj/submit/nsrxxBg'
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real
            }();
        }
    }(),
    tj: function (params, successCallback, errCallback) {
        var url = bgdjDwService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    },
    getDjNsrxx: function (params, successCallback, errCallback) {
        var url = bgdjDwService.Api.getDjNsrxx;
        ajax.post(url, params, successCallback, errCallback);
    }
});
