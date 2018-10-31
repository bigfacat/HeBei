var wjzyqbgService = {
    Api: {
        wgzList:'../../../api/wgzyq/get/wgzList',
        wgzyqxx:'../../../api/wgzyq/get/wgzyqxx/',
        jdxzUrl: '../../../api/baseCode/get/jdxzByXzqhszdm/',
        tj:'../../../api/wgzyq/save/yqxx'
    }
};
$.extend(wjzyqbgService, {
    getWgzList: function (params, successCallback, errCallback) {
        var url = wjzyqbgService.Api.wgzList;
        ajax.post(url, mini.encode(params), successCallback, errCallback)
    },
    getWgzyqxx:function(params, successCallback, errCallback){
        var url = wjzyqbgService.Api.wgzyqxx + params;
        ajax.post(url, '', successCallback, errCallback)
    },
    getJdxzUrl:function(params, successCallback, errCallback){
        var url = wjzyqbgService.Api.jdxzUrl + params;
        ajax.get(url, '', successCallback, errCallback)
    },
    tj:function(params, successCallback, errCallback){
        var url = wjzyqbgService.Api.tj;
        wssqUtil.tjsq(url, params, successCallback, errCallback);
    }
});

