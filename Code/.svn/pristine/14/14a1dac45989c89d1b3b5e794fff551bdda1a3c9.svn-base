/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/20
 * Time：20:35
 *
 */


var wcjyzmkjService = {
    Api: {
        checkWhxWgz: '../../../api/wgz/wcjyzmkj/get/checkWhxWcjyzm',
        getWgzList: '../../../api/wgz/wcjyzmkj/get/wgzList.ashx',
        getXzqhUrl: '../../../api/baseCode/get/baseCodeTree/DM_GY_XZQH_QG.ashx',
        getJdxzUrl: '../../../api/baseCode/get/jdxzByXzqhszdm/',
        getSwjgList: '../../../api/wgz/wcjyzmkj/get/swjg/',
        getdjzclxUrl: '../../../api/baseCode/CombSelect/common?codeName=DM_DJ_DJZCLX.ashx',
        getFyhy: '../../../api/wgz/wcjyzmkj/get/nsrfshyxx',
        tj: '../../../api/wgz/wcjyzmkj/submit/sqxx',
        getWcjyMode:'../../../api/baseCode/get/sysParam/WCJYZM_MODE.ashx'
    }
};
$.extend(wcjyzmkjService, {

    checkWhxWgz: function (params, successCallback, errCallback) {
        var url = wcjyzmkjService.Api.checkWhxWgz;
        ajax.post(url, params, successCallback, errCallback)
    },
    getJdxz: function(params, successCallback, errCallback) {
        var url = wcjyzmkjService.Api.getJdxzUrl + params.xzqhDm+".ashx";
        ajax.get(url, params, successCallback, errCallback)
    },
    getWgzList: function(successCallback, errCallback) {
        var url = wcjyzmkjService.Api.getWgzList;
        ajax.post(url, "", successCallback, errCallback)
    },
    /*行政区划对应多个税务机关的时候*/
    getSwjgList: function (params, successCallback, errCallback) {
        var url = wcjyzmkjService.Api.getSwjgList + params.xzqhDm+'.ashx';
        ajax.post(url, "", successCallback, errCallback)
    },
    tj: function (params, successCallback, errCallback) {
        var url = wcjyzmkjService.Api.tj;
        //ajax.post(url, params, successCallback, errCallback)
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    },
    // mode = 2 时，代表新增加的选择税务机关的模式
    // 其他情况 为普通模式
    getWcjyMode:function () {
        var result = '';
        ajax.get(wcjyzmkjService.Api.getWcjyMode,'',function (mode) {
            result = mode;
        });
        return result;
    }

});

