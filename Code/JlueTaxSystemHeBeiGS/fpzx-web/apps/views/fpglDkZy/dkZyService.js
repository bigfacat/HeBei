/**
 * Created by yuepu on 2017/2/23.
 */
/**
 * Created by yuepu on 2017/2/11.
 */

var dkZyService = {
    mock: false
    /*baseUrl:'//127.0.0.1:63342'*/
};

$.extend(dkZyService, {
    Api: function () {
        if (dkZyService.mock) {  // 假数据
            return {
                tj: '/api/wgz/wcjyzmkj/submit/sqxx'
            }
        } else {  // 真实接口
            return function () {
                var baseUrl = '',
                // 真实接口
                    real = {
                        lastMonth: '/fpzx-web/api/fp/zzszyfpdk/get/queryOnly1ZzsLxdkje/',//查询过去一个月连续代开的金额
                        last12Month:'/fpzx-web/api/fp/zzszyfpdk/get/queryZzsDkje12Month/',//查询过去的12个月代开的金额和次数
                        zspm:'/fpzx-web/api/fp/zzszyfpdk/get/queryZzsFpdkZspms/',//征收品目
                        kuyh:'/fpzx-web/api/fp/zzszyfpdk/get/queryZzsFpdkYhxx/',//查询开户银行
                        gjnsr:'/fpzx-web/api/fp/zzszyfpdk/get/queryGhfxxSingle/',//根据纳税人识别号查询购货方纳税人信息
                        fkftxl:'/fpzx-web/api/fp/zzszyfpdk/get/queryGhfxxAll/',//查询所有的付款方通讯录
                        updateFkfxx: '/fpzx-web/api/fp/zzszyfpdk/update/updateOrInsertGhfxx/',//修改和新增通讯录
                        deletFkfxx: '/fpzx-web/api/fp/zzszyfpdk/get/deleteGhfxx/',//删除通讯录
                        nsrzg:'/fpzx-web/api/fp/zzszyfpdk/get/checkGhfNsrzgxx/',//查询购货方纳税人资格
                        ghfzt:'/fpzx-web/api/fp/zzszyfpdk/get/checkGhfNsrzt/',//购货方纳税人状态
                        xhfnsrzg:'/fpzx-web/api/fp/zzszyfpdk/get/checkXhfNsrzgxx/',//检查销货方纳税人资格
                        xhfIsXydk:'/fpzx-web/api/fp/zzszyfpdk/get/checkXhfIsNeedDkfp/',//检查销货方纳税人是否需要代开发票
                        isXqwdnsr:'/fpzx-web/api/fp/zzszyfpdk/get/checkYqwdybnsr/',//判断是否逾期未定一般纳税人
                        zcsj:'/fpzx-web/api/fp/zzszyfpdk/save/zzsfpzc/',//保存暂存数据
                        zcsjCheck:'/fpzx-web/api/fp/zzszyfpdk/get/zzsfpzchw/',//获取暂存数据 需要传销货方纳税人识别号
                        cxzhdksp:'/fpzx-web/api/fp/zzszyfpdk/get/queryZzsdkLastSpmc/',//查询最后进行代开的商品名称
                        slv:'/fpzx-web/api/fp/zzszyfpdk/get/dkzyfpZsl/',//获取税率
                        yywd:'/fpzx-web/api/fp/zzszyfpdk/get/yhyywd/',//获取营业网点名称
                        yhzh:'/fpzx-web/api/fp/zzszyfpdk/get/yhzh/',//获取银行账号
                        yhhb:'/fpzx-web/api/fp/zzszyfpdk/get/yhhb/',//银行行别
                        accountInfo:'/wszx-web/api/base1/userInfo/get.ashx',// 登录人信息
                        skrfhr:'/fpzx-web/api/fp/zzszyfpdk/get/queryFpSkrfhr/'//收款人复核人信息
                    };

                for (var u in real) {
                    real[u] = baseUrl + real[u];
                }
                return real
            }();
        }
    }(),
    checkLastMonth: function (urlParam,params, successCallback, errCallback) {
        /*urlParam:为登记序号*/
        var api =  mini.decode(dkZyService.Api);
        var url = api.lastMonth+urlParam+'.ashx';
        ajax.post(url, params, successCallback, errCallback)
    },
    checkLast12Month:function(urlParam,params, successCallback, errCallback){
        /*urlParam:为登记序号*/
        var api =  mini.decode(dkZyService.Api);
        var url = api.last12Month+urlParam+'.ashx';
        ajax.post(url, params, successCallback, errCallback);
    },
    getzspm:function(urlParam,params, successCallback, errCallback){
        /*urlParam:为登记序号*/
        var api =  mini.decode(dkZyService.Api);
        var url = api.zspm+urlParam+'.ashx';
        ajax.post(url, params, successCallback, errCallback);
    },
    getKuyh:function(urlParam,params, successCallback, errCallback){
        /*urlParam:为登记序号*/
        var api =  mini.decode(dkZyService.Api);
        var url = api.kuyh+urlParam+'.ashx';
        ajax.post(url, params, successCallback, errCallback);
    },
    getGjnsr:function(params, successCallback, errCallback){
        /*urlParam:ghfNsrsbh*/
        var api =  mini.decode(dkZyService.Api);
        var url = api.gjnsr;
        ajax.post(url, params, successCallback, errCallback);
    },
    getFkftxl:function (urlparam,params, successCallback, errCallback) {
        var api =  mini.decode(dkZyService.Api);
        var url =api.fkftxl+urlparam;
        ajax.post(url, params, successCallback, errCallback)
    },
    updateFkfxx: function (params, successCallback, errCallback) {
        //xhfDjxh:10111305000017554904
        var api =  mini.decode(dkZyService.Api);
        var url =api.updateFkfxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    deleteFkfxx:function(params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.deletFkfxx;
        ajax.post(url, params, successCallback, errCallback)
    },
    checkNsrzg:function(urlParam,params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.nsrzg+urlParam;
        ajax.post(url, params, successCallback, errCallback)
    },
    checkGhfzt:function(urlParam,params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.ghfzt+urlParam;
        ajax.post(url, params, successCallback, errCallback)
    },
    checkXhfzg:function(urlParam,params, successCallback, errCallback){
        /*urlParam：xhfNsrsbh*/
        var api =  mini.decode(dkZyService.Api);
        var url =api.xhfnsrzg+urlParam;
        ajax.post(url, params, successCallback, errCallback)
    },
    checkXhfIsXydk:function(urlParam,params, successCallback, errCallback){
        /*urlParam：xhfNsrsbh*/
        var api =  mini.decode(dkZyService.Api);
        var url =api.xhfIsXydk+urlParam+'.ashx';
        ajax.post(url, params, successCallback, errCallback)
    },
    checkIsXqwdnsr:function(urlParam,params, successCallback, errCallback){
        /*urlParam：djxh*/
        var api =  mini.decode(dkZyService.Api);
        var url =api.isXqwdnsr+urlParam;
        ajax.post(url, params, successCallback, errCallback)
    },
    saveZcsj: function (params, successCallback, errCallback) {
        var api =  mini.decode(dkZyService.Api);
        var url =api.zcsj;
        ajax.post(url, params, successCallback, errCallback)
    },
    getZcsj:function(urlParams,params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.zcsjCheck+urlParams;
        ajax.post(url, params, successCallback, errCallback)
    },
    getCxzhdksp:function(urlParams,params, successCallback, errCallback){
        /*urlParams：djxh*/
        var api =  mini.decode(dkZyService.Api);
        var url =api.cxzhdksp+urlParams;
        ajax.post(url, params, successCallback, errCallback)
    },
    getSlv:function(params, successCallback, errCallback){
        /*urlParams：djxh*/
        var api =  mini.decode(dkZyService.Api);
        var url =api.slv+'1.ashx';
        ajax.post(url, params, successCallback, errCallback)
    },
    getyywd:function(params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.yywd;
        ajax.post(url, params, successCallback, errCallback)
    },
    getyhzh:function(params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.yhzh;
        ajax.post(url, params, successCallback, errCallback)
    },
    getyhhb:function(params, successCallback, errCallback){
        var api =  mini.decode(dkZyService.Api);
        var url =api.yhhb;
        ajax.post(url, params, successCallback, errCallback)
    },
    getAccountInfo: function (params, successCallback, errCallback) {
        var api = mini.decode(dkZyService.Api);
        var url = api.accountInfo+'.ashx';
        ajax.post(url, params, successCallback, errCallback)
    },
    getSkrfhr: function (params, successCallback, errCallback) {
        var api = mini.decode(dkZyService.Api);
        var url = api.skrfhr+'2.ashx';
        ajax.post(url, params, successCallback, errCallback)
    }

});

/*dkZyService*/
