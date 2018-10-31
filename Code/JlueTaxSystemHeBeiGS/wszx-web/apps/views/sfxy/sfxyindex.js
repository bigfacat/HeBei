$(function () {
    init();
});
function init(){
	var url = "../../../api/dj/sfxy/submit/" + nsrxxUtil.getNsrxxVO().djxh + "/getSfxxqdQk.ashx";
    var code = Tools.getUrlParamByName('code');
    var id = Tools.getUrlParamByName('id');
    var search = location.search;
    ajax.post(url, null, function (result) {
        if (!result.success) {
            mini.alert(result.message, "提示", function () {
                wssqUtil.closeWin();
            });
        } else {
            if (result.value) {
                search = search.replace(id,'80').replace(code,'110703');
                window.location.href = 'sfxyxx.aspx'+search;
            } else {
                search = search.replace(id,'79').replace(code,'110701');
                window.location.href = 'wtkkxys.html'+search;
            }
        }
    }, function () {
        mini.alert("请求发生异常情况！", '提示', function () {
            wssqUtil.closeWin();
        });
    });
}

/**验证是否存在旧税号的三方协议*/