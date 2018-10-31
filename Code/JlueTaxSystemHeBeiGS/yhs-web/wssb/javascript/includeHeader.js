/**
 * Created by chenjunj on 2017/6/2 14:56.
 */
var header = function(){
    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    var loadHeader = function (url) {
        // 如果有参数指定初始化头或尾，则按参数来初始化
        var nsrxx = {};
        nsrxx.title = $('title').get(0).innerText;
        var tplUrl = '../../sjcx/HeadView.aspx';
        if(url){
            tplUrl = url;
        }
        var html = loadTemplate(tplUrl, nsrxx);
        $('body').prepend(html);
    };
    /**
     *  加载模版
     * @param url
     * @param Data
     * @returns {string}
     */
    var loadTemplate = function(url,Data) {
        var html='';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                if(!!Data){
                    try{
                        var reg = /(?:\{\{)(\w+(\.\w)*)(?:\}\})/g; // 匹配 {{ data.param }}
                        data = data.replace(reg, function(_, item) {
                            return eval("Data." + item);
                        });
                    } catch (e){
                        // TODO
                    }
                }
                html = data;
            },
            error: function () {
                console.log('加载html出错');
            }
        });
        return html;
    };
    return {
        init: function (url) {
            loadHeader(url);
        }
    }
}();
header.init();
