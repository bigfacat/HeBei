/**
 * Created by yuepu on 2017/9/8.
 */
var ybnsrService = {};
var mock = true;
ybnsrService.api = {
    hdxx: '/sb/sbcommon_getHdxx.ashx',//核定信息
    fphzxx: '../../../api/sb/fpxxtq/queryFpHzxx.ashx', //发票汇总信息
    saveXxfpGjxx: '../../../api/sb/fpxxtq/saveXxfpGjxx', //保存销项发票归集信息
    searchXxfpGjxx: '../../../api/sb/fpxxtq/getXxfpGjxx', //查询销项发票归集信息
    saveJXfpgjxx: '../../../api/sb/fpxxtq/saveJxfpGjxx.ashx',//保存进行发票归集信息
    saveJXfpmx: '../../../api/sb/fpxxtq/saveJxfpMx',//保存进项发票明细信息
    dkxx: '../../../api/sb/fpxxtq/getJxfpDkqk.ashx'//保存进项发票明细信息
};
ybnsrService.mockApi = {
    fphzxx: 'fphzxx.json' //发票汇总信息
};


// 获取汇总信息
ybnsrService.getFphzxx = function (params, successCallback, errCallback) {
    var url = ybnsrService.api.fphzxx;
    ajax.post(url, params, successCallback, errCallback);
};
//查询销项发票归集信息sbcommon_getHdxxgetFphzxx
ybnsrService.searchXxfpGjxx = function (params, successCallback, errCallback) {
    var url = ybnsrService.mockApi.fphzxx;
    ajax.post(url, params, successCallback, errCallback);
};

// 保存销项归集发票
ybnsrService.saveXxfpGj = function (params, successCallback, errCallback) {
    var url = ybnsrService.api.saveXxfpGjxx;
    ajax.post(url, params, successCallback, errCallback);
};

/*保存-进项发票归集信息*/
ybnsrService.saveJXfpgjxx = function (params, successCallback, errCallback) {
    var url = ybnsrService.api.saveJXfpgjxx;
    ajax.post(url, params, successCallback, errCallback);
};

/*保存 - 进项发票-明细*/
ybnsrService.saveJxfpmx = function (params, successCallback, errCallback) {
    var url = ybnsrService.api.saveJXfpmx;
    ajax.post(url, params, successCallback, errCallback);
};

//获取抵扣信息
ybnsrService.getDkxx = function (params, successCallback, errCallback) {
    var url = ybnsrService.api.dkxx;
    ajax.post(url, params, successCallback, errCallback);
};