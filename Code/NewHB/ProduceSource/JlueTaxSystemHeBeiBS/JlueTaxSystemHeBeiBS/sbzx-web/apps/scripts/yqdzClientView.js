/**
 * Created by lizm on 2017/6/5.
 */
/*
* 亿企代账客户端需要嵌入网厅的查看申报表
* */

$(function () {

    function getUrlParamByName(attrName) {
        var locs = location.href.split("?");
        if (locs.length === 1) {
            return null;
        }
        var params = locs[1].split("&");
        var value = null;
        for(var i=0;i<params.length;i++){
            var param = params[i].split("=");
            if (param[0] === attrName) {
                value = param[1];
                break;
            }
        }
        return value;
    }

    var qqWjm = getUrlParamByName('qqwjm'); // 请求文件名

    if(!!qqWjm){
        mini.mask('数据加载中...');
        $.ajax({
            url : "/sbzx-web/api/sb/common/getsbbw",//返回申报表的报文，里面带有填表的数据，
            type : "post",
            data : {
                qqwjm : qqWjm
            },
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            success : function(result) {
                mini.unmask();
                var viewData='';
                if(result.success && !!result.value){
                    viewData = mini.decode(result.value);
                }else{
                    mini.alert(result.message);
                    return;
                }
                if(window.location.href.indexOf('xgmsb-view.html')>-1){
                    $.isFunction(xgmsbView.setViewData) && xgmsbView.setViewData(viewData);
                }else{
                    servyouReport.preview(viewData);
                }
            },
            error : function(req) {
                var msg = req.message || '查询失败！';
                mini.alert(msg);
                mini.unmask();
            }
        });
    }
});