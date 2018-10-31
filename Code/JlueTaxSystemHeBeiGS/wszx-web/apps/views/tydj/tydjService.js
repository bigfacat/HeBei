/**
 * Created by lkl on 2017/2/17.
 */

var tydjService = {
    Api:function () {
        if(Api.mock) {  //假数据
            return {

            }
        } else { // 真实接口
            return function (){
                var baseUrl = '../../..',
                    realUrl={
                        fpjcqk:'/api/dj/tydj/query/jcfpqk',
                        tj:'/api/dj/tydj/submit/tydjxx'
                    }
                for (var url in realUrl) {
                    realUrl[url] = baseUrl + realUrl[url];
                }
                return realUrl;
            }();
        }
    }(),

    tj: function (params, successCallback, errCallback) {
        var url = tydjService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback)
    },
    getFpjcqk:function (params, successCallback, errCallback) {
        var url = tydjService.Api.fpjcqk;
        ajax.post(url, params, successCallback, errCallback)
    },
}