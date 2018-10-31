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
        var messageid = mini.loading("数据加载中...", "提示");
        $.ajax({
            url : '/sb/sbcommon_getSbxml.do',//返回申报表的报文，里面带有填表的数据，
            type : 'post',
            data : {
                wjm : qqWjm
            },
            success : function(data) {
                var result = mini.decode(data);
                var sbData = result.data;
                if (!!sbData) {
                    $.isFunction(SetData) && SetData(sbData);
                }else{
                    mini.alert('申报表查询数据为空，请确认该申报表是否由网厅申报成功！');
                    return false;
                }
                mini.hideMessageBox(messageid);

            },
            error : function() {
                mini.alert('查询失败！');
                mini.hideMessageBox(messageid);
            }
        });
    }
});