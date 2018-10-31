/**
 * Created by lkl on 2017/2/11.
 */

var cwkjzdbaService={
    Api:function(){
        if(Api.mock) {  //假数据
            return {

            }
        } else { // 真实接口
            return function(){
                var baseUrl = '../../..',
                    realUrl = {
                        kjbbmc:'/api/baseCode/get/basecodedata/DM_KJBBMC.ashx',
                        zjffxl:'/api/baseCode/get/baseCode2CombSelect3.ashx',
                        cwkjzdbaxx:'/api/dj/cwkjzdba/get/cwkjzdbaxx.ashx',
                        tj:"/api/dj/cwkjzdba/submit/cwkjzdbaxx",
                        yxqq:"/api/dj/cwkjzdba/get/kjzdzxqq.ashx"
                    }
                for (var url in realUrl) {
                    realUrl[url] = baseUrl + realUrl[url];
                }
                return realUrl;
            }();
        }
    }(),
    getKjbbmc:function(params, successCallback, errCallback) {
        var url = cwkjzdbaService.Api.kjbbmc;
        ajax.get(url, params, successCallback, errCallback)
    },
    getZjffxl:function(params, successCallback, errCallback) {
        var url = cwkjzdbaService.Api.zjffxl;
        ajax.get(url, params, successCallback, errCallback)
    },
    getCwkjzdbaxx:function(params, successCallback, errCallback) {
        var url = cwkjzdbaService.Api.cwkjzdbaxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    tj:function (params, successCallback, errCallback) {
        var url = cwkjzdbaService.Api.tj;
        wssqUtil.tjsq(url,params, successCallback, errCallback);
    },
    getYxqq:function (params, successCallback, errCallback) {
        var url = cwkjzdbaService.Api.yxqq;
        ajax.post(url, params, successCallback, errCallback)
    }
}
