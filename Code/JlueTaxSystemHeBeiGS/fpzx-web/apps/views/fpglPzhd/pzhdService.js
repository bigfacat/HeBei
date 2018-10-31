/*
* @Author: Marte
* @Date:   2017-02-12 21:00:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-03-17 21:03:22
*/
var pzhdService = {
    mock: false
};
$.extend(pzhdService, {
    Api: function () {
        if (pzhdService.mock) {  // 假数据
            return {

      }
    } else { // 真实接口
      return function() {
        // 真实接口
        var real = {
          //选择领票人
          xzlprUrl: '/fpzx-web/api/fp/pzhd/get/getLprxx',
          isExistPzhdApi: '/fpzx-web/api/fp/pzhd/get/hasPzhdNotFilter.ashx',
          getPzhdInfo: '/fpzx-web/api/fp/pzhd/get/getPzhdxx.ashx',
          getNsrState: '/fpzx-web/api/fp/pzhd/get/getnsrRole.ashx',
          getYxLprxx: '/fpzx-web/api/fp/pzhd/get/getYxLprxx',
          getYhdzje: '/${wszx-web}/api/dj/gtgshdehd/get/dexx'
        };
        for (var u in real) {
          real[u] = real[u];
        }
        return real;
      }();
    }
  }(),
  chooseLpr: function(params, successCallback, errCallback) {
    var url = pzhdService.Api.xzlprUrl;
    ajax.post(url, params, successCallback, errCallback)
  },
  /**
   * [isExistPzhd 是否存在票种核定，存在票种核定就让用户选择去票种核定调整或者领票两个链接，不存在就可以继续核定]
   * @return {object} [promise对象]
   */
  isExistPzhd: function() {
    var deferred = $.Deferred();
    $.ajax({
      url: pzhdService.Api.isExistPzhdApi,
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
  getPzhdInfo: function() {
    var deferred = $.Deferred();
    $.ajax({
      url: pzhdService.Api.getPzhdInfo,
      type: "POST",
      success: function(data) {
        deferred.resolve(data);
      },
      error: function(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  },
  initFirstStepsNsrState: function(sussCallback, failCallback) {
    $.ajax({
      url: pzhdService.Api.getNsrState,
      type: "POST",
      async: false,
      success: function(data) {
        var resultData = mini.decode(data);
        sussCallback(resultData);
      },
      error: function(err) {
        failCallback(err);
      }
    });
  },
  //票种核定调整时获取已选购票人信息
  getYxLprxx: function(sussCallback, failCallback) {
    $.ajax({
      url: pzhdService.Api.getYxLprxx,
      type: "POST",
      success: function(data) {
        var resultData = mini.decode(data);
        sussCallback(resultData);
      },
      error: function(err) {
        failCallback(err);
      }
    });
  },
    
    // 获取 已核定领用总金额
    getYhdlyje: function(data, sussCallback, failCallback){
	    $.ajax({
		    url: pzhdService.Api.getYhdzje, //'/${wszx-web}/api/dj/gtgshdehd/get/dexx',
		    type: "POST",
		    data: data,
		    success: function(data) {
			    var resultData = mini.decode(data);
			    sussCallback(resultData);
		    },
		    error: function(err) {
			    failCallback(err);
		    }
	    })
    }
});