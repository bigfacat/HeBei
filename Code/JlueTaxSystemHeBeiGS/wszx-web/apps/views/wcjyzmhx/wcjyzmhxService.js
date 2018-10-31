/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/20
 * Time：20:35
 *
 */


var wcjyzmhxService = {
    mock: false
};
$.extend(wcjyzmhxService, {
    Api: function () {
        if (wcjyzmhxService.mock) {  // 假数据
            return {
                getWgzbh : '/api/wgz/wcjyzmhx/get/wcjybh.ashx',  //查询外管证编号
                getJyzmYxqByWgzbh : '/api/wgz/wcjyzmhx/get/wcjyYxq', //经营证明有效期
            	getPzzl : '/wszx-web/api/baseCode/CombSelect/common/HB_DM_PZ_PZZL.ashx', //凭证种类
                getZsxm: '/wszx-web/api/baseCode/CombSelect/common/HB_DM_GY_ZSXM.ashx', //征收项目
                mainPage: 'http://www.baidu.com',
                getZspm: '/api/baseCode/get/baseCode2CombSelect/HB_DM_GY_ZSPM', //征收品目
                getBysjAndByd : '/api/wgz/wcjyzmhx/get/wcjyBysjAndJyd' , //查询外出经营报验时间和报验地点
                tj: '/api/wgz/wcjyzmhx/submit/wcjyzmhxSq'
            }
        } else {  // 真实接口
            return function () {
                var baseUrl = '../../..',
                    // 真实接口
                    real = {
                		getWgzbh : '/api/wgz/wcjyzmhx/get/wcjybh.ashx',  //查询外管证编号
                        getJyzmYxqByWgzbh : '/api/wgz/wcjyzmhx/get/wcjyYxq', //经营证明有效期
                    	getPzzl : '/wszx-web/api/baseCode/CombSelect/common/HB_DM_PZ_PZZL.ashx', //凭证种类
                        getZsxmUrl: '/api/baseCode/CombSelect/common/HB_DM_GY_ZSXM.ashx?codeName=HB_DM_GY_ZSXM',//征收项目
                        mainPage: 'http://www.baidu.com',
                        getZspmBaseUrl: '/api/baseCode/CombSelect/common?codeName=HB_DM_GY_ZSPM',//征收品目
                        getBysjAndByd : '/api/wgz/wcjyzmhx/get/wcjyBysjAndJyd' , //查询外出经营报验时间和报验地点
                        getWcjySbJbxx : '/api/wgz/wcjyzmsb/get/wcjysb/jbxx', // 查询外出经营申报基本信息
                        getWcjySbHwxx : '/api/wgz/wcjyzmsb/get/wcjysb/hwxx', // 获取外出经营申报货物信息
                        getWcjySbWsxx : '/api/wgz/wcjyzmsb/get/wcjysb/wsxx', // 获取外出经营申报完税信息
                        tj: '/api/wgz/wcjyzmhx/submit/wcjyzmhxSq'
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real
            }();
        }
    }(),
    getBysjAndJYdd: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.getBysjAndByd;
        ajax.post(url, params, successCallback, errCallback)
    },
    getWcjySbJbxx: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.getWcjySbJbxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    getWcjySbHwxx: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.getWcjySbHwxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    getWcjySbWsxx: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.getWcjySbWsxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    getJyzmYxqByWgzbh: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.getJyzmYxqByWgzbh;
        ajax.post(url, params, successCallback, errCallback)
    },
    tj: function (params, successCallback, errCallback) {
        var url = wcjyzmhxService.Api.tj;
        //ajax.post(url, params, successCallback, errCallback)
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    }
});

