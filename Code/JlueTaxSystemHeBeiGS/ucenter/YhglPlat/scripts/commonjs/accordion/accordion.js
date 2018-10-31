/**
 * @Author: zhouqy
 * @Date: 2017-02-16
 * @description:手风琴组件
 */

(function ($, win) {
    /**
     * [Accordion Accordion构造函数]
     * @param {[type]} el       [组件id]
     * @param {[type]} multiple [description]
     */
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        // Evento
        links.on('click', {
            el: this.el,
            self: this,
            multiple: this.multiple
        }, this.dropdown)
    };
    /**
     * [dropdown 显示、隐藏动画效果]
     * @param  {[object]} e [事件target]
     * @return {[type]}   [description]
     */
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        var $this = $(this);
        var $next = $this.next();
        if (!e.data.self.canClick($this)) {
            return;
        }
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    };
    /**
     * [canClick 是否能点击]
     * @param  {[type]} currentEl [当前点击页面元素]
     * @return {[布尔值]}           [true or false]
     */
    Accordion.prototype.canClick = function (currentEl) {
        var flag = true;
        if (currentEl.find('a').hasClass('disable')) {
            flag = false;
        }
        return flag;
    };
    //暴露的接口
    window.Accordion = Accordion;
})(jQuery, window);
