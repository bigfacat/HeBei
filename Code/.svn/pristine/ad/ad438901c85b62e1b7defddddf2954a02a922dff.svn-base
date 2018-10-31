/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-08-21
 * Time: 20:33
 * Description:
 */

;(function () {
    function loadScript(url) {
        var script = document.createElement("script"),
            body = document.getElementsByTagName('body')[0];

        script.src = url.indexOf('.html')!==-1 ? url.replace('.html', '.js') : url;
        body.appendChild(script);
    }
    loadScript('../../../lib/js-base64/base64.min.js');
    var timer = setTimeout(function () {
        if(typeof(window.external.CallFun) != 'undefined'){
            $.ajax({
                url:'/wszx-web/api/baseCode/get/sysParam64/GATE_REQUEST_XZS',
                type:'GET',
                dataType:'text',
                async:false,
                success:function (txt) {
                    var url = Base64.decode(txt);
                    loadScript(url);
                    timer=null;
                },err:function (err) {
                    console.log(err);
                }
            });
        }

    },1000);

})();