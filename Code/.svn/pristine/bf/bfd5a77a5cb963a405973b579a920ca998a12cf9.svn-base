/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */
var Api = {

    mock:true,

    getUrl: function (obj, name) {
        for (var url in obj) {
            if (url == name) {
                return obj[name];
                break;
            }
        }
        return this;
    },
    replaceUrl: function (url,name, data) {
        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
        url = url.replace(reg, function(_, item) {
            if(typeof data=='object'){
                return eval('data.' + item);
            }else if(typeof data=='string'){
                return item
            }else if(typeof data=='array'){
                return eval('data[' + item + ']');
            }

        });
        return url;
    }
};
if(Api.mock){
    $.extend(Api,{
        bz:'../../data/bz.json', // 币种
        yhhb: '../../data/yhhb.json', // 银行行别
        xzqh:'../../data/xzqh.json' // 行政区划
    });
}else{
    $.extend(Api,{
        bz:'../../data/bz.json', // 币种
        yhhb: '../../data/yhhb.json', // 银行行别
        xzqh:'../../data/xzqh.json' // 行政区划
    });
}