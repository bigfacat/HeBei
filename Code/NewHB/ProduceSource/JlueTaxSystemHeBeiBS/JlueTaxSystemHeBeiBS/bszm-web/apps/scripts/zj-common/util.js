/**
 * Created with JetBrains WebStorm 2018.2.1
 * Author: lizm
 * Date: 2018/10/10
 * Time:9:08
 * Description:util
 */

var bszmUtil = {
    loadHtmlTemp: function (url) {
        var html = '';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                html = data;
            },
            error: function () {
                //console.log('加载'+url+'出错，检查：1.路径是否正确；2.文件是否存在');
            }
        });
        return html;
    },
    initUserInfo: function (dom, cb) {
        var _this = this;
        var userInfo = store.getSession('getUserInfo');
        if (userInfo || !cb) {
            $(dom).html(_this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/userInfo.html'));
            $(dom).html(template('header-user-temp', userInfo));
            cb && cb();
        } else {
            getUserInfo().then(function (data) {
                data = mini.decode(data);
                if (data.success) {
                    store.setSession('getUserInfo', data.data);
                    userInfo = data.data;
                    $(dom).html(_this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/userInfo.html'));
                    $(dom).html(template('header-user-temp', userInfo));
                    cb && cb();
                } else {
                    if (data.message === 'ajaxSessionTimeOut') {
                        window.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                }
            });
        }
    },
    initSearch: function (dom) {
        var _this = this;
        $(dom).html(this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/search.html'));
        var $input = $('.search-input');
        var $btn = $('.search-btn');

        function search(e) {
            var value = $($input[1]).val() || $($input[0]).val();
            if (!value) {
                return false;
            }
            if (e.keyCode === 13 || (e.type === 'click' && e.target.className === 'search-btn')) {
                $input.val(value);
                //_this.searchByKeyWord(value);
                var allFnData = store.getSession('searchFnData') || [];
                var result = [];
                for (var i = 0, l = allFnData.length; i < l; i++) {
                    var fn = allFnData[i];
                    if (fn.name.indexOf(value) > -1) {
                        result.push(fn);
                    }
                }
                template.defaults.escape = false;
                $('#search-ul').html(template('search-ul-li', { functions: result, keyWord: value }));
                mini.parse('#search-result-win');
                var searchWin = mini.get('search-result-win');
                searchWin.on('beforehide', function () {
                    $input.val('');
                });
                searchWin.show();
            }

        }

        $input.on('keydown', function (e) {
            if (e.keyCode === 13) {
                search(e);
            }
        });
        $btn.on('click', search);
    },
    searchByKeyWord: function (keyword) {
        var $input = $('.search-input');
        searchFn(keyword).then(function (res) {
            if (res.success) {
                var result = res.data;
                result = result.sort(function (it1, it2) {
                    return it2.sim - it1.sim;
                });
                $('#search-ul').html(template('search-ul-li', { functions: result, keyWord: keyword }));
                mini.parse('#search-result-win');
                var searchWin = mini.get('search-result-win');
                searchWin.on('beforehide', function () {
                    $input.val('');
                });
                searchWin.show();
            } else {

            }
        });
    },
    getUrlParam: function (name, url) {
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&|#|/]*)(\\s|&|#|/|$)', 'i');
        return reg.test(url || window.location.href) ? window.decodeURIComponent(RegExp.$2.replace(/\+/g, '')) : undefined;
    },
    stopBubble: function (e) {
        //一般用在鼠标或键盘事件上
        if (e && e.stopPropagation) {
            //W3C取消冒泡事件
            e.stopPropagation();
        } else {
            //IE取消冒泡事件
            window.event.cancelBubble = true;
        }
    },
    formatDateTime: function (time) {
        var date = new Date(time),
            y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    },
    updateMsgStatus: function (idArr) {
        updateReceiveStatus([idArr]).then(function (res) {
            if (!res.success) {
                res.message && mini.alert(res.message);
            }
        });
    },
    getOs: function () {
        var os = navigator.platform;
        var ua = navigator.userAgent;
        if (os.indexOf('Win') > -1) {
            if (ua.indexOf('Windows NT 5.0') > -1) {
                return 'Win2000';
            } else if (ua.indexOf('Windows NT 5.1') > -1) {
                return 'WinXP';
            } else if (ua.indexOf('Windows NT 5.2') > -1) {
                return 'Win2003';
            } else if (ua.indexOf('Windows NT 6.0') > -1) {
                return 'WindowsVista';
            } else if (ua.indexOf('Windows NT 6.1') > -1 || ua.indexOf('Windows 7') > -1) {
                return 'Win7';
            } else if (ua.indexOf('Windows 8') > -1) {
                return 'Win8';
            } else if (ua.indexOf('Windows NT 10') > -1) {
                return 'Win10';
            } else {
                return 'Other';
            }
        } else if (os.indexOf('Mac') > -1) {
            return 'Mac';
        } else if (os.indexOf('X11') > -1) {
            return 'Unix';
        } else if (os.indexOf('Linux') > -1) {
            return 'Linux';
        } else {
            return 'Other';
        }
    },
    getBrower: function () {
        var ua = navigator.userAgent.toLowerCase(),
            webkit = ua.match(/webkit\/([\d.]+)/),
            chrome = ua.match(/chrome\/([\d.]+)/) ||
                ua.match(/crios\/([\d.]+)/),

            ie = ua.match(/msie\s([\d\.]+)/) ||
                ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
            firefox = ua.match(/firefox\/([\d.]+)/),
            safari = ua.match(/safari\/([\d.]+)/),
            opera = ua.match(/opr\/([\d.]+)/);
        if (!!ie) {
            return 'IE ' + (ie[1] || '');
        } else if (!!chrome) {
            return 'Chrome' + (chrome[1] ? '/' + chrome[1] : '');
        } else if (!!firefox) {
            return 'FireFox' + (firefox[1] ? '/' + firefox[1] : '');
        } else if (!!opera) {
            return 'Opera' + (opera[1] ? '/' + opera[1] : '');
        } else if (!!safari) {
            return 'Safari' + (safari[1] ? '/' + safari[1] : '');
        }
    },
    isOnline: function () {
        return navigator.onLine;
    },
    renderFooter: function (selector) {
        var html = this.loadHtmlTemp('../publicTemps/foot.html');
        $(selector).html(html);
    },
    /**
     * 给所有 a 标签绑定事件，办税指引
     */
    initBszy: function () {
        var _this = this;
        $(document).on('click', 'a', function (e) {
            var url = $(this).attr('href');
            var name = $(this).text().trim();
            if (name != "申报信息查询"&&name!="办理"&&name!="进度") {
                return false;
            } else {
                var id = _this.getUrlParam('id', url);
                var code = _this.getUrlParam('code', url);
                if (url.indexOf('wszx-web') > -1 || url.indexOf('fpzx-web') > -1) {
                    _this.queryBszyData(code, id, url, name);
                    return false;
                }
            }
        });
    },
    /**
     * 处理不需要办税指引的税务事项
     * @param code
     * @param id
     * @param url
     */
    handleNoBszySwsx: function (code, id, url) {

        if (['110002', '110101', '110121'].indexOf(code) > -1) { // 新办纳税人套餐 110002,税务登记信息补录 110101。110121
            mini.open({
                url: '/bszm-web/apps/views-zj/publicPages/addCompany.html', //页面地址
                title: '选择办理企业', //标题
                width: 600, //宽度
                height: 400, //高度
                allowResize: false, //允许尺寸调节
                allowDrag: false, //允许拖拽位置
                showMaxButton: false, //显示最大化按钮
                currentWindow: false, //是否在本地弹出页面,默认false
                onload: function () { //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.addComp.setCode(code, id, url);
                }
            });
        } else {
            window.open(url);
        }
    },
    /**
     * 查询办税指引数据
     * @param code
     * @param id
     * @param url
     * @param name
     */
    queryBszyData: function (code, id, url, name) {
        var _this = this;
        queryBszyData(id).then(function (data) {
            if (!data.success || !data.value) {
                if (data.message === 'ajaxSessionTimeOut') {
                    top.location.reload();
                } else {
                    data.message && mini.alert(data.message);
                }
                return;
            }
            var bszyData = data.value;
            if (bszyData.opend === 'N') { // 设置了不再显示的税务事项
                bszmUtil.handleNoBszySwsx(code, id, url);
            } else {
                // 打开办税指引弹窗
                var win = mini.open({
                    url: '/bszm-web/apps/views-zj/publicPages/bszy.html', //页面地址
                    title: '《' + name + '》办税指引', //标题
                    width: 900, //宽度
                    height: 550, //高度
                    allowResize: false, //允许尺寸调节
                    allowDrag: false, //允许拖拽位置
                    showMaxButton: false, //显示最大化按钮
                    currentWindow: false, //是否在本地弹出页面,默认false
                    onload: function () { //弹出页面加载完成
                        var iframe = this.getIFrameEl();
                        iframe.contentWindow.bszy.setBszyData(bszyData); // 设置办税指引数据
                    },
                    ondestroy: function (action) { //弹出页面关闭前
                        if (action === 'continue') { // 继续办理
                            _this.handleNoBszySwsx(code, id, url);
                        } else if (action === 'noHint') { // 我知道了，不再提示
                            _this.bszyNoHint(code, id, url);
                        }
                    }
                });
                $('#' + win.id).find('.mini-panel-header-inner').css({
                    'text-align': 'center'
                }).find('.mini-panel-title').css({
                    'width': '100%',
                    'font-size': '15px'
                });
            }
        });
    },
    /**
     * 办税指引，不再提示
     * @param code
     * @param id
     * @param url
     */
    bszyNoHint: function (code, id, url) {
        var _this = this;
        setNoBszy(id).then(function (data) {
            if (!data.success || !data.value) {
                if (data.message === 'ajaxSessionTimeOut') {
                    top.location.reload();
                } else {
                    data.message && mini.alert(data.message);
                }
                return false;
            }
            _this.handleNoBszySwsx(code, id, url);
        });
    },
    /**
     * 关闭miniui弹窗
     * @param action
     * @returns {*}
     */
    closeWin: function (action) {
        if (!action) {
            action = 'close';
        }
        if (window.CloseOwnerWindow) {
            return window.CloseOwnerWindow(action);
        } else {
            window.close();
        }
    }
};
/**
 * art-template 配套的分页方法
 * @returns {{init: init, setBtnStatus: setBtnStatus}}
 * @constructor
 */
var ArtTempPager = function () {
    return {
        init: function (container, queryFn, pageSize) {
            if (!$(container).length) {
                throw new Error('没有找到分页容器，页面没有相应DOM元素');
            }
            this.$pagerContainer = $(container);

            this.$nextPageBtn = this.$pagerContainer.find('.next');
            this.$prevPageBtn = this.$pagerContainer.find('.prev');
            this.$current = this.$pagerContainer.find('.current');
            this.$total = this.$pagerContainer.find('.total');
            this.pageIndex = 1;
            this.pageSize = pageSize;
            var _this = this;
            this.$prevPageBtn.on('click', function () {
                if (_this.pageIndex === 1) {
                    _this.$prevPageBtn.attr('disabled', 'disabled');
                } else {
                    _this.$prevPageBtn.removeAttr('disabled');
                    _this.$nextPageBtn.removeAttr('disabled');
                    _this.pageIndex--;
                    queryFn('prev');
                }

            });
            this.$nextPageBtn.on('click', function () {
                _this.pageIndex++;
                _this.$prevPageBtn.removeAttr('disabled');
                queryFn('next');
            });
        },
        setBtnStatus: function (data, action) {
            if (this.pageIndex === 1) {
                this.$prevPageBtn.attr('disabled', 'disabled');
            }
            var total = data.resultMap.totalNum; // 总数
            if (action === 'next') {
                if (!(total - this.pageSize * this.pageIndex > 0)) {
                    this.$nextPageBtn.attr('disabled', 'disabled');
                } else {
                    this.$nextPageBtn.removeAttr('disabled');
                }
            } else if (!action) {
                if (total <= this.pageSize) {
                    this.$pagerContainer.hide();
                } else {
                    this.$pagerContainer.show();
                }
            }
            var c = this.pageIndex < 10 ? '0' + this.pageIndex : this.pageIndex;
            var t = Math.ceil(total / this.pageSize);
            t = t < 10 ? '0' + t : t;
            this.$current.text(c);
            this.$total.text(t);
            data.total = total;
            data.pageSize = this.pageSize;
            data.pageIndex = this.pageIndex - 1;
        }
    };

};