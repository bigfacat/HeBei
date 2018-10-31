$(function () {
    if ($.browser.msie && $.browser.version == "6.0") DD_belatedPNG.fix('img,.pngbg');
})





; (function ($) {

    jQuery.fn.extend({

        /**
        @功能：设置切换盒组件
        @参数： def:"class1" 默认的按钮效果
                chg:"class2" 变化后的按钮效果	
                chglist:"具体的需要变化的列表对象选择" 
                wennull:"当chglist里的内容为空时是否需要显示该BOX" 	
                index:"默认显示第几个" 	
                bindevent:"绑定事件"
        @返回:  无
        @实例:  $(".index_top2 .box3 .list2 div").SwichBox({def:"b2",chg:"b1",chglist:".index_top2 .box3 .list2 ul"})	
        */
        SwichBox: function (settings) {
            settings = $.extend({ def: "", chg: "", chglist: "", whennull: false, index: 0, bindevent: "mouseover" }, settings);
            var now = $(this);
            now.unbind();
            settings.chg = settings.chg.replace(".", "");
            settings.def = settings.def.replace(".", "");
            now.each(function (index) {
                if (index == settings.index) {
                    $(this).addClass(settings.chg);
                    $(settings.chglist).eq(index).css("display", "");
                    if (settings.whennull) {
                        if ($(settings.chglist).eq(index).html() == "") { $(settings.chglist).eq(index).css("display", "none") }
                    }

                } else {
                    $(this).removeClass(settings.chg).addClass(settings.def);
                    $(settings.chglist).eq(index).css("display", "none");
                }

                $(this).bind(
                    settings.bindevent,
                    function (e) {
                        if (e.target.nodeName.toLowerCase() == "a") {
                            stopDefault(e);
                        }

                        if ($(this).attr("class") == settings.chg) return;
                        if ($(this).attr("disable")) { return; }

                        now.removeClass(settings.chg).addClass(settings.def);
                        $(this).removeClass(settings.def).addClass(settings.chg);

                        $(settings.chglist).css("display", "none");
                        $(settings.chglist).eq(index).fadeIn("fast");
                        if (settings.whennull) {
                            if ($(settings.chglist).eq(index).html() == "") { $(settings.chglist).eq(index).css("display", "none") }
                        }
                    }
                )
            })
        }

    });
})(jQuery);


/*
 * 创建浮动图片广告（Generate a dock AD image）
 *
 * USAGE: 
 *	$(selector).higo_plugins_ad({
 *		src:null,                    // 广告图片路径
 *		closeSrc:null,               // 关闭图片路径
 *		href:"#",                    // 广告图片链接地址
 *		autoHide:true,               // 是否自动隐藏
 *		hideSecond:10,               // 延迟隐藏秒数
 *		top:20,                      // 距离顶部偏移高度
 *		layout:"left",               // 图片位置：left 居左 ,right 居右, center 居中, 
 *		width:100,                   // 宽度
 *		height:100,                  // 高度
 *		opacity:0.5					 // 透明度opacity:0.5(firefox), filter:alpha(opacity=50)(IE)
 *		setPosition:function(left, top){ // 预留自定义显示位置的方法（尚未实现）
 *			return;
 *		}	
 *	})
 */

(function ($) {
    $.fn.lastScrollY = 0;
    $.fn.higo_plugins_ad = function (options) {
        $(this).addClass("higo_plugins_ad");
        var settings = $.extend({
            html: null,
            src: null,
            closeSrc: null,
            href: "#",
            autoHide: true,
            hideSecond: 10,
            top: 20,
            layout: "left",
            width: 100,
            height: 100,
            opacity: 0.5,
            setPosition: function (left, top) {
                return;
            }
        }, options || {});

        if (true) {

            var closeImgEl = "<a href=\"#\"; onclick=\"this.parentElement.style.visibility='hidden'\"><img border=0 src='" + settings.closeSrc + "'/></a>";

            if (settings.html != null) {
                $(this).append(settings.html);
                $(this).css({ width: settings.width, height: settings.height });
            } else {
                var imgEl = "<a href='" + settings.href + "' target='_blank'><img border=0 width='" + settings.width + "px' height='" + settings.height + "px' src='" + settings.src + "'/> <br></a>";
                $(this).append(imgEl);
            }
            if (settings.closeSrc != null) {
                $(this).append(closeImgEl);
            }

            $(this).css("z-index", "999999");
            $(this).css("position", "absolute");
            $(this).css("top", settings.top + "px");
            $(this).css("opacity", settings.opacity);
            $(this).css("filter", "alpha(opacity=" + parseInt(settings.opacity * 100) + ")");

            switch (settings.layout) {
                case "left":
                    $(this).css("left", "22px");
                    break;
                case "right":
                    $(this).css("right", "22px");
                    break;
                case "center":
                    var left = (parseInt(window.screen.availWidth) - parseInt(settings.width)) / 2 + "px";
                    $(this).css("left", left);
                    break;
                default:
                    $(this).css("left", "22px");
                    break;
            }
        } else {
            return;
        }

        if (settings.autoHide) {
            setTimeout("(function(){$('" + $(this).selector + "').hide();})();", parseInt(settings.hideSecond) * 1000);
        }

        window.onscroll = function () {
            var diffY;
            if (document.documentElement && document.documentElement.scrollTop)
                diffY = document.documentElement.scrollTop;
            else if (document.body)
                diffY = document.body.scrollTop
            else {
                /*Netscape stuff*/
            }

            percent = 1 * (diffY - $.fn.lastScrollY);
            if (percent > 0)
                percent = Math.ceil(percent);
            else
                percent = Math.floor(percent);

            var top = $('.higo_plugins_ad').css("top");

            $('.higo_plugins_ad').css("top", parseInt(top) + percent + "px");
            $.fn.lastScrollY += percent;
        }
    }
})(jQuery);

$(document).bind('click', function (e) {
    var target = e.target || e.srcElement;
    $('.listsearchover').each(function () {
        if ($(this).next(".dropcon") && $(target).closest(".listsearchbox").length == 0 && $(this).next(".dropcon").is(':visible')) {
            if ($(target).closest(".mini-popup").length != 0) return;
            $(this).next(".dropcon").hide();
            $(this).removeClass("listsearchover");
        }
    })
});
$(function () {
    var cls = false;
    $("#stepnext").live("click", function () {
        if ($(this).text().indexOf("完成") != -1) {
            if (!cls) {
                cls = true;
                return;
            } else {
                onCancel();
                cls = false;
            }

        }
    })


    var sm2 = "经办人系本人，此项业务真实，上传的附列资料真实、有效。我（单位）愿承担由此产生的一切法律责任。";
    var sm1 = "经办人系本人，此项业务真实，填写的表单内容真实、有效。我（单位）愿承担由此产生的一切法律责任。"

    $("#sm1").html(sm1);

    $("#sm2").html(sm2);

})



