/**
 * Created by yuepu on 2017/2/9.
 */
var fplyService  = {
    mock: false
};
$.extend(fplyService, {
  Api: function() {
    if (fplyService.mock) { // 假数据
      return {
        hqzhxx: '../../data/ckzhzhbg.json',
        tj: ''
      }
    } else { // 真实接口
      return function() {
        var baseUrl = '',
          // 真实接口
          real = {
            fplyxx: '/fpzx-web/api/fp/fply/get/fplyxx.ashx', //获得发票领用的信息
            pzhdxx: '/fpzx-web/api/fp/pzhd/get/getPzhdxxLy.ashx', //获得票种核定的信息
            tj: '/fpzx-web/api/fp/fply/submit/fplyxx',
            isExistPzhdApi: '/fpzx-web/api/fp/pzhd/get/hasPzhdLy.ashx',
            nsrfplyZl:'/fpzx-web/api/fp/fply/get/fplyzg.ashx'//获取纳税人发票领用资格
          };
        for (var u in real) {
          real[u] = baseUrl + real[u];
        }
        return real
      }();
    }
  }(),
  hqzhxx: function(params, successCallback, errCallback) {
    var url = fplyService.Api.hqzhxx;
    ajax.post(url, params, successCallback, errCallback)
  },
  tj: function(params, successCallback, errCallback) {
    var url = fplyService.Api.tj;
    ajax.post(url, params, successCallback, errCallback)
  },
  getFplyxx: function(params, successCallback, errCallback) {
    var url = fplyService.Api.fplyxx;
    ajax.post(url, params, successCallback, errCallback)
  },
  getPzhdxx: function(params, successCallback, errCallback) {
    var url = fplyService.Api.pzhdxx;
    ajax.post(url, params, successCallback, errCallback)
  },
  /**
   * [isExistPzhd 是否存在票种核定，存在票种核定就让用户选择去票种核定调整或者领票两个链接，不存在就可以继续核定]
   * @return {object} [promise对象]
   */
  isExistPzhd: function() {
    var deferred = $.Deferred();
    $.ajax({
      url: fplyService.Api.isExistPzhdApi,
      type: "POST",
      async: false,
      success: function(data) {
        deferred.resolve(data);
      },
      error: function(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  },
  /*获取发票领用资格*/
  hasFplyzg :function(params, successCallback, errCallback) {
    var url = fplyService.Api.nsrfplyZl;
    ajax.post(url, params, successCallback, errCallback)
  }
});
