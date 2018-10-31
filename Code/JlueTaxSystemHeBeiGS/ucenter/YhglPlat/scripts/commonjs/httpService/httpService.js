/**
 * @Author: zhouqy
 * @Date: 2017-02-23
 * @description:http服务基类，依赖jquery Ajax
 */
function HttpService() {

}

HttpService.prototype = {
    mock: false,
    /**
     * [ajaxFun ajax请求]
     * @param  {[string]} url    [api]
     * @param  {[string]} method [请求方法，post or get]
     * @param  {[type]} params [请求参数]
     * @return {[object]}        [promise]
     */
    ajaxFun: function (url, method, params) {
        //增加加载提高用户体验
        var index = parent.layer.load(0, {
            shade: [0.1, '#000']
        });
        var deferred = $.Deferred();
        $.ajax({
            url: url,
            type: method,
            data: params,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                deferred.resolve(data);
                parent.layer.close(index);
            },
            error: function (err) {
                deferred.reject(err);
                parent.layer.close(index);
            }
        });
        return deferred.promise();
    }
};
