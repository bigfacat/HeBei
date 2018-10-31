var regx = /(onload|onclick|onchange|onmousedown|onmouseover|onmouseenter|onmouseouter|onmouseup|javascript:|onmouseout|onkeyup|onkeydown|onkeypress|<script|<\/script)/gi;

 (function($) {
     var $_ajax = $.ajax;
     $.extend({
         _ajax : $_ajax,
         /**
          * 重写ajax方法：增加遮罩配置及异常处理
          *
          * @author 赵美丹
          * @param options
          *            请参见jquery.ajax参数
          * @param options.url
          *            请求url
          * @param options.type
          *            请求方式:[GET\POST]
          * @param options.data
          *            发送到服务器的数据
          * @param options.dataType
          *            预期服务器返回的数据类型，默认为json
          * @param options.success
          *            请求成功时的回调函数（error=0的情况）
          * @param options.failure
          *            请求失败时的回调函数
          * @param options.timeout
          *            请求超时时间（毫秒）
          * @param options.showMask
          *            是否显示遮罩，默认为false，手动调用时需将其设置为true
          * @param options.maskMassage
          *            显示遮罩时显示的信息，默认为"数据加载中，请稍后..."
          * @param el
          *            遮罩对象（DOM id），可选，默认为document.body
          */

         dataFilter: function(data){
             if(typeof data == "string"){
                 data = data.replace(regx, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
             }else if(typeof data == "object" && typeof data != "undefined" && data != null){
                 for(var i in data){
                     if(data[i] instanceof Array){
                         var arry = [];
                         for(var j=0;j<data[i].length;j++){
                             arry.push(this.dataFilter(data[i][j]));
                         }
                         data[i] = arry;
                     }else{
                         data[i] = this.dataFilter(data[i]);
                     }
                 }
             }
             return data;
         },
         ajax : function(options, el) {
             options = $.extend({
                 url : "",
                 type : "POST",
                 data : {},
                 dataType : "json",
                 success : $.noop,
                 failure : $.noop,
                 timeout : 1000000,
                 async : true,
                 showMask : false,
                 headers: {},
                 contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                 maskMassage : "数据加载中，请稍后..." // 等待提示信息
             }, options);

             if (!options.error) {
                 options.error = $.noop;
             }

             if (options.showMask) {
                 mini.mask({
                     el : el,
                     html : options.maskMassage
                 });
             }

             //防止XSS攻击，对提交数据进行过滤
             //options.url = options.url.replace(regx, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
             //options.data = this.dataFilter(options.data);

             return $_ajax({
                 url : options.url,
                 type : options.type,
                 dataType : options.dataType,
                 contentType: options.contentType,
                 data : options.data,
                 timeout : options.timeout,
                 cache : false,
                 async : options.async,
                 headers : options.headers,
                 complete : function(req, st) {
                     if(options.complete){
                         options.complete.call(this, req, st);
                     }
                     if (options.showMask) {
                         mini.unmask(el);
                     }
                     if (st == "success" && req.status == "200") {
                         if (req.responseJSON) {// jsonp\json
                             if (req.responseJSON.success == false) {
                                 if (req.responseJSON.messageCode == "SESSION_TIME_OUT") {//session超时
                                     top.location.replace("/BsfwtWeb/apps/views/login/login.html");
                                 } else {
                                     options.success.call(this, req.responseJSON);
//                                     alert(req.responseJSON.message, function() {
//                                         options.failure.call(this, req.responseJSON);
//                                     });
                                 }
                             } else {//成功
                                 options.success.call(this, req.responseJSON);
                             }
                         } else if(req.responseXML){
                             options.success.call(this, req.responseXML);
                         } else {//其他
                             var regx = /"success"[ ]?:[ ]?false/g;
                             if (regx.test(req.responseText)) {
                                 var obj;
                                 try {
                                     if (mini) {
                                         obj = mini.decode(req.responseText);
                                     } else {
                                         obj = jQuery.parseJSON(req.responseText);
                                     }
                                 } catch (e) {
                                     obj = req.responseText;
                                 }
                                 if(obj.messageCode == "SESSION_TIME_OUT"){//session超时
                                     top.location.replace("/BsfwtWeb/apps/views/login/login.html");
                                 }else{
                                     options.error.call(this, req, st);
//                                     alert(obj.message, function() {
//                                         options.failure.call(this, req.responseText);
//                                     });
                                 }
                                 delete obj;
                             } else {
                                 if(options.dataType == "json") {//兼容低版本jquery
                                     obj = jQuery.parseJSON(req.responseText);
                                     options.success.call(this, obj);
                                 }else if(options.dataType == "xml"){
                                     obj = jQuery.parseXML(req.responseText);
                                     options.success.call(this, obj);
                                 }else{
                                     options.success.call(this, req.responseText);
                                 }
                             }
                         }
                     } else if (st == "error" && req.status == "404") {
                         options.error.call(this, req, st);
                         error("错误 404 - 文件或服务未找到。", function() {
                             options.failure.call(this, req.responseText);
                         });
                     } else if (st == "error" && req.status == "500") {// 服务出错
                         options.error.call(this, req, st);
                         error("服务出错，请联系管理员。", function() {
                             options.failure.call(this, req.responseText);
                         });
                     } else if (st == "timeout") {
                         options.error.call(this, req, st);
                         alert("连接超时，请刷新后重试。", function() {
                             options.failure.call(this, req.responseText);
                         });
                     } else if (st == "error" && req.status == "900") {// session超时
                         top.location.replace("/login.html");
                     } else if(st == "parsererror"){
                         options.error.call(this, req, st);
                         error("数据异常，请稍后再试", function() {
                             options.failure.call(this, req.responseText);
                         });
                     } else if(st != "abort"){
                         options.error.call(this, req, st);
                         error("连接失败，请检查网络后重试。", function() {
                             options.failure.call(this, req.responseText);
                         });
                     }
                 }
             });
         }

     });

     var $_fn_removeAttr = $.fn.removeAttr;
     var $_fn_attr = $.fn.attr;
     $.fn.extend({
         removeAttr : function(attr){
             var returnVal = $_fn_removeAttr.call(this, attr);
             if(attr == "disabled"){
                 this.trigger("disabledRemoved", attr);
             }

             return returnVal;
         },
         attr : function(){
             if(arguments.length == 2 && arguments[0] == "disabled"){
                 this.trigger("disabledChanged", arguments);
             }
             var returnVal = $_fn_attr.apply(this, arguments);

             return returnVal;
         }
     })
 })(jQuery);

/**
 * 事件工具类
 * @type {{}}
 */
var EventUtil = {};
/**
 * 禁止回退键
 */
EventUtil.stopBackspace = function() {
    $(document).keydown(function(e) {
        if (e.keyCode == 8) {
            var target = e.target;
            var $target = $(target);
            var tag = target.tagName.toUpperCase();
            if ((tag == 'INPUT' && !$target.attr("readonly")) || (tag == 'TEXTAREA' && !$target.attr("readonly"))) {
                if ("RADIO,CHECKBOX".indexOf(target.type.toUpperCase()) != -1) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    });
}

$(function() {
    // 禁止回退键
    EventUtil.stopBackspace();
    
    if(window.location.href.toLowerCase().indexOf('swmh') == -1){
    	//点击事件冒泡,子页面点击后关闭父页面的浮出层
    	$("body").bind("mousedown", function(){
            if(window != parent){
                parent.$("body").mousedown();
            }
        })
	}

    /**
     * filter DOM tags and JS event
     * 防止脚本攻击
     */
    //禁止对inputtype=‘file’监控
    $("body").delegate("input:not([type='file']),textarea", "keyup",function(){
        if($(this).val() != "" && regx.test($(this).val())) {
            $(this).val($(this).val().replace(regx, ""));
        }
    }).delegate("input:not([type='file']),textarea", "blur", function(){
        if($(this).val() != "") {
            $(this).val($(this).val().replace(regx, ""));
        }
    });

    //回车同tab
    $("body>div:gt(0)").delegate(":input, #pagedown", "keydown", function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            var inputs = $("body>div:gt(0)").find(':input:not([readOnly],[disabled]):visible,#pagedown');
            var index = inputs.index(this);
            if(this.id == "pagedown"){
                $(this).click();
                return;
            }
            inputs.eq( index+ 1 ).focus();
        }
    });
    /*监听window**/
	if(!window.parent || window.parent == window){
    	$(window).load(resizeWindow);
    }    
});

var CommonUtil = {};
CommonUtil.getUrlParamByName = function(attrName){
    var locs = location.href.split("?");
    if(locs.length == 1){
        return null;
    }
    var params = locs[1].split("&");
    var value = null;
    $.each(params, function(){
        var param = this.split("=");
        if(param[0] == attrName){
            value = param[1];
            return false;
        }
    });
    return value;
}

/**
 * 防止低版本IE使用console.log时报错
 */
if(!window.console){
    window.console = {
        log: function(){}
    }
}
function setCookie(name, value, days, path) {
    if (!days)
        days = -1;
    var expire = new Date();
    expire.setTime(expire.getTime() + 86400000 * days);

    document.cookie = name + "=" + escape(value) + "; expires="
            + expire.toGMTString() + ";" + (path ? 'path=' + path : '');
}
/**默认最大化*/
function resizeWindow(){ 
	if (window.screen) {//判断浏览器是否支持window.screen判断浏览器是否支持screen 
		var myw = screen.availWidth; //定义一个myw，接受到当前全屏的宽 
		var myh = screen.availHeight; //定义一个myw，接受到当前全屏的高
		window.moveTo(0, 0); //把window放在左上脚 
		window.resizeTo(myw, myh); //把当前窗体的长宽跳转为myw和myh 
		} 
	}

document.write('<script type="text/javascript" src="../../javascript/message.js"></script>');
