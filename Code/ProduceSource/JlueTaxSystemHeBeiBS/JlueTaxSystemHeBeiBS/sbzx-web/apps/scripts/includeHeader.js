/**
 * Created by chenjunj on 2017/6/2 14:56.
 */
var header = function () {
    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    var loadHeader = function (url) {
        /**
         * 若客户端嵌入，则将头部隐藏
         * */
        if (Tools.getUrlParamByName('client') === 'Y') {
            localStorage.setItem('client', 'Y');
            return;
        }
        if (localStorage.getItem('client') === 'Y') {
            return;
        }
        // 如果有参数指定初始化头或尾，则按参数来初始化
        var nsrxx = nsrxxUtil.getNsrxxVO('/sbzx-web/api/base/nsrxx/get.ashx') || {};
        nsrxx.zgswjMc = getSwjgMc(nsrxx.zgswjDm);
        nsrxx.title = $('title').get(0).innerText;
        var reg = /sbzx-[^\/]+/g;
        var baseName = location.pathname.split('/apps/')[0];
        var tplUrl = baseName + '/apps/views/public/head/HeadView.html';
        if (url) {
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
    var loadTemplate = function (url, Data) {
        var html = '';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                if (!!Data) {
                    try {
                        var reg = /(?:\{\{)(\w+(\.\w)*)(?:\}\})/g; // 匹配 {{ data.param }}
                        data = data.replace(reg, function (_, item) {
                            return eval("Data." + item);
                        });
                    } catch (e) {
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
    var getSwjgMc = function (dm) {
        var result = null;
        ajax.get('/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG.ashx?dm=' + dm, {}, function (response) {
            result = response;
        }, function (response) {
            mini.alert(response.message);
        });
        if (result && result.MC) {
            return result.MC;
        }
        return '';
    };
    return {
        init: function (url) {
            loadHeader(url);
        }
    }
}();
