/**
 * @Author: zhouqy
 * @Date: 2017-02-24
 * @description:定额信息采集http服务
 */
var dexxcjService = (function($) {
  var mock = false;
  var api = {
    //nsrStyle: "/wszx-web/api/dj/gtgshdehd/init/gtgshdehe", //纳税人类型前置校验
    deStyle: "/wszx-web/api/dj/gtgshdehd/get/decjydys.ashx", //定额类型
    decjxx: "/wszx-web/api/dj/gtgshdehd/submit/decjxx", //提交
    deje: "/wszx-web/api/dj/gtgshdehd/get/deje", //定额金额
    hasAccept: "/wszx-web/api/dj/gtgshdehd/submit/dehdje", //接受和不接受
    jyfs:"/wszx-web/api/baseCode/get/baseCode2CombSelect/DM_JYFS.ashx" //经营方式
  };
  /**
   * [ajaxFun ajax请求,私有方法]
   * @param  {[string]} url    [api]
   * @param  {[string]} method [请求方法，post or get]
   * @param  {[type]} params [请求参数]
   * @return {[object]}        [promise]
   */
  var ajaxFun = function(url, method, params, bool) {
    var deferred = $.Deferred();
    $.ajax({
      url: url,
      type: method,
      async: bool,
      data: mini.encode(params),
      success: function(data) {
        deferred.resolve(data);
      },
      error: function(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  };
  return {
    /**
     * [纳税人是个体工商户（DJZCLX_DM为411），且有有效的税种认定信息 (RD_SFZRDXXB)，
     * 以企业的身份登录云厅，才可以进行定额核定申请]
     * @return {object} [promise对象]
     */
    // getNsrStyle: function() {
    //   return ajaxFun(api.nsrStyle, "POST", '', false);
    // },
    /**
     * [getDeStyle 获取定额信息类型]
     * @return {[type]} [promise对象]
     */
    getDeStyle: function() {
      return ajaxFun(api.deStyle, "POST", '', false);
    },
    /**
     * [getDeStyle 提交定额申请数据]
     * @return {[type]} [promise对象]
     */
    submitDecjxx: function(param) {
      return ajaxFun(api.decjxx, "POST", param, true);
    },
    /**
     * [getDejeData 获取定额金额数据]
     * @param  {[string]} param [申请序号]
     * @return {[type]}       [promise对象]
     */
    getDejeData: function(param) {
      return ajaxFun(api.deje, "POST", param, true);
    },
    /**
     * [getDejeData 接受和不接受]
     * @param  {[string]} param [申请序号]
     * @return {[type]}       [promise对象]
     */
    hasAcceptResult: function(param) {
      return ajaxFun(api.hasAccept, "POST", param, true);
    },

    getJyfs:function() {
      return ajaxFun(api.jyfs, "GET", "", true);
    }
  }
})(jQuery);
