/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */
var Api = {

    mock:false,

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
        cyyhzl: '../../data/yhhb.json'// 常用银行种类
    });
}else{
    $.extend(Api,{
        bz:'../../../api/baseCode/get/baseCode2CombSelect/DM_GY_HB', // 币种
        cyyhzl: '../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx' // 常用银行种类
    });
}