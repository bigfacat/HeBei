/**
 * Created with JetBrains WebStorm
 * Author：lmyue
 * Date：2017/1/20
 * Time：20:35
 *
 */

var xzaxgmService = {
    mock: false
};
$.extend(xzaxgmService, {
    Api: function () {
        if (xzaxgmService.mock) {  // 假数据
            return {
                /*tj: '/api/wgz/wcjyzmkj/submit/sqxx'*/
            }
        } else {  // 真实接口
            return function () {
                var baseUrl = '../../..',
                    // 真实接口
                    real = {
                        getXgmnsdj:'/api/rd/xgmdjgl/get/xgmnsdj.ashx',
                        getLjxse:'/api/rd/xgmdjgl/get/ljxse',
                        tj:"/api/rd/xgmdjgl/submit/nsrxxBg"
                        /*getDjNsrxx: '/api/dj/bgdj/get/djNsrxx',
                        getHsfs: '/api/baseCode/get/baseCode2CombSelect2/DM_GY_HSFS',
                        getSfzjlx: '/api/baseCode/get/baseCode2CombSelect2/DM_GY_SFZJLX',
                        tj: '/api/dj/bgdj/submit/nsrxxBg'*/
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real
            }();
        }
    }(),
    /*tj: function (params, successCallback, errCallback) {
        var url = xzaxgmService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    },
    getDjNsrxx: function (params, successCallback, errCallback) {
        var url = xzaxgmService.Api.getDjNsrxx;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    }*/
    getXgmnsdj: function (params, successCallback, errCallback) {
        var url = xzaxgmService.Api.getXgmnsdj;
        ajax.post(url, params, successCallback, errCallback);
    },
    getLjxse:function(params, successCallback, errCallback){
        var url = xzaxgmService.Api.getLjxse;
        ajax.post(url, params, successCallback, errCallback);
    },
    tj:function(params, successCallback, errCallback){
        var url = xzaxgmService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    }

});
