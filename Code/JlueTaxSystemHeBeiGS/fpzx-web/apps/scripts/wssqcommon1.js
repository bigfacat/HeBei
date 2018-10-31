/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */
var Api = {

    mock: true,

    getUrl: function (obj, name) {
        for (var url in obj) {
            if (url == name) {
                return obj[name];
                break;
            }
        }
        return this;
    },
    replaceUrl: function (url, name, data) {
        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
        url = url.replace(reg, function (_, item) {
            if (typeof data == 'object') {
                return eval('data.' + item);
            } else if (typeof data == 'string') {
                return item
            } else if (typeof data == 'array') {
                return eval('data[' + item + ']');
            }

        });
        return url;
    }
};
if (Api.mock) {
    $.extend(Api, {
        bz: '../../data/bz.json', // 币种
        yhhb: '../../data/yhhb.json', // 银行行别
        xzqh: '../../data/xzqh.json' // 行政区划
    });
} else {
    $.extend(Api, {
        bz: '../../data/bz.json', // 币种
        yhhb: '../../data/yhhb.json', // 银行行别
        xzqh: '../../data/xzqh.json' // 行政区划
    });
}
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：18:03
 *
 */

// 文书申请工具类

window.wssqUtil = function () {

    var wssq = {};
    wssq.isValid = true;
    wssq.isSaved = true;
    // 当前功能的税务事项代码
    wssq.currentSwsxDm = null;

    // 纳税人基本信息
    wssq.nsrjbxx = null;

    // 登记序号

    wssq.djxh = null;

    /**
     * 抛出错误
     * @param message
     */
    function throwError(message) {
        if (arguments.length > 1) {
            message = message.format(Array.prototype.slice.call(arguments, 1));
        }
        throw new Error(message);
    }
    /**
     *  加载 js
     * @param htmlUrl
     */
    wssq.loadScript = function (url) {
        var script = document.createElement("script"),
            body = document.getElementsByTagName('body')[0];

        script.src = url.indexOf('.html') !== -1 ? url.replace('.html', '.js') : url;
        body.appendChild(script);
    };
    /**
     * 在 <head> 中加载js
     * @param url
     */
    wssq.loadHeadScript = function (url) {
        var script = document.createElement("script"),
            head = document.getElementsByTagName('head')[0];

        script.src = url.indexOf('.html') !== -1 ? url.replace('.html', '.js') : url;
        head.appendChild(script);
    };
    /**
     * 加载 css
     */
    wssq.loadCss = function (url) {
        var link = document.createElement("link"),
            head = document.getElementsByTagName('head')[0];

        link.href = url;
        link.rel = "stylesheet";
        head.appendChild(link);
    };
    /**
     * 创建 <meta>
     * @param propObj 属性
     * @returns {Element}
     */
    wssq.createMeta = function (propObj) {
        var meta = document.createElement("meta");
        for (var prop in propObj) {
            meta[prop] = propObj[prop];
        }
        return meta;
    };

    /**
     *  加载模版
     * @param url
     * @param Data
     * @returns {string}
     */
    wssq.loadTemplate = function (url, Data) {
        var html = '';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data, textStatus) {
                if (!!Data) {
                    try {
                        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
                        data = data.replace(reg, function (_, item) {
                            return eval("Data." + item);
                        });
                    } catch (e) {
                        // TODO
                    }
                }
                html = data;
                //wssq.loadScript(url);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('加载html出错');
            }
        });
        return html;
    };

    /**
     * mini show tips
     * @param title
     * @param content
     * @param type
     * @param time
     */
    wssq.showTips = function (title, content, type, time) {
        var _time = 3000;
        if (!!time) {
            _time = time;
        }
        mini.showTips({
            content: "<b>" + title + "</b><br/>" + content,
            state: type,
            x: 'center',
            y: 'top',
            offset: [0, 58],
            timeout: _time
        })
    };

    /**
     * mini-datagrid 编辑按钮，激活改datagrid
     * @param grid_id
     * @private
     */
    function _editGrid(grid_id) {
        var grid = mini.get(grid_id);
        var gridToolBar = $('#' + grid_id).prev();
        grid.setAllowCellEdit(true);
        // 校验表格，以激活颜色
        grid.validate();
        gridToolBar.find('.grid-edit').hide();
        gridToolBar.find('.grid-save').css('display', 'inline-block');
        wssq.isSaved = false;

    }

    /**
     * mini-datagrid 保存修改
     * @param grid_id
     * @returns {boolean}
     * @private
     */
    function _saveGrid(grid_id) {
        var grid = mini.get(grid_id);
        // 校验表格
        grid.validate();
        if (!grid.isValid()) {
            var errors = grid.getCellErrors(), errorObj = {}, errorText = '';
            for (var i = 0; i < errors.length; i++) {
                errorObj = errors[i];
                errorText += errorObj.column.header + errorObj.errorText + '<br/>';
            }
            wssq.showTips('保存失败', errorText, 'danger');
            wssq.isValid = false;
            return false;
        } else {
            var gridToolBar = $('#' + grid_id).prev();
            grid.setAllowCellEdit(false);
            grid.validate();
            gridToolBar.find('.grid-edit').show();
            gridToolBar.find('.grid-save').hide();
            wssq.showTips('保存成功', '表格数据保存成功', 'success', 2000);

            wssq.isValid = true;
            wssq.isSaved = true;

            var stepSection = gridToolBar.parent();
            if (!stepSection.is('section')) {
                return true;
            } else {
                var currentIndex = Number(stepSection.attr('id').replace('wizard-p-', ''));
                var newIndex = Number(stepSection.next().attr('id').replace('wizard-h-', ''));
                stepNav.onStepDataSaved(this, currentIndex, newIndex);
            }
        }
    }

    /**
     * mini-datagrid 删除行
     * @param grid_id
     * @private
     */
    function _removeRow(grid_id) {
        var grid = mini.get(grid_id);
        var rows = grid.getSelecteds();
        if (rows.length > 0) {
            mini.confirm('确定删除选中的记录吗？', '提示', function (action) {
                if (action === 'ok') {
                    grid.removeRows(rows, false); // false 不会自动选中下一条记录
                    wssq.showTips('删除成功', '表格数据删除成功', 'success', 2000);
                }
            });
        } else {
            mini.alert("请选中一条记录");
        }
    }

    /**
     * mini-datagrid 增加行 ，
     * @param grid_id
     * @param url
     */
    wssq.addRow = function (grid_id, url) {

        var grid = mini.get(grid_id);
        // 如果是参数含有html，则使用 mini.open
        if (url.indexOf('.html') > -1) {
            mini.open({
                url: url,        //页面地址
                title: '增加',      //标题
                iconCls: '',    //标题图标
                width: 760,      //宽度
                height: 600,     //高度
                allowResize: false,       //允许尺寸调节
                allowDrag: true,         //允许拖拽位置
                showCloseButton: true,   //显示关闭按钮
                showMaxButton: false,     //显示最大化按钮
                showModal: true,         //显示遮罩
                currentWindow: false,      //是否在本地弹出页面,默认false
                effect: 'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    var data = {};
                    //调用弹出页面方法进行初始化
                    //iframe.contentWindow.SetData(data);

                },
                ondestroy: function (action) {  //弹出页面关闭前
                    if (action == "ok") {       //如果点击“确定”
                        var iframe = this.getIFrameEl();
                        //获取选中、编辑的结果
                        //var data = iframe.contentWindow.GetData();
                        var data = mini.clone(data);    //必须。克隆数据。
                    }
                }

            });
        } else { // show指定的 mini-window id
            try {
                var form = new mini.Form('#' + url);
                form.clear()
            } catch (e) {
                // TODO
            }
            mini.get(url).show();
        }
    };

    /**
     * 设置datagrid tool bar
     * @returns {string}
     */
    wssq.initGridToolBar = function () {

        $('.grid-toolbar').each(function () {

            // 绑定纳税人信息面板展开方法
            $(this).delegate('a.nsrxx-pannel', 'click', function () {
                $(this).find('ul').slideToggle();
            });

            // 每一个 grid-toolbar 必须通过自定义属性 data-bind-grid 绑定一个 mini-datagrid
            var bindedGrid = $(this).attr('data-bind-grid'),
                optionCollection = $(this).children('a.mini-button');

            for (var i = 0; i < optionCollection.length; i++) {

                var btn = $(optionCollection[i]),
                    classCollection = btn.attr('class');
                /*if (classCollection.indexOf('grid-add') !== -1) {
                 btn.on('click', function () {
                 wssq.addRow(bindedGrid);
                 });
                 }*/
                if (classCollection.indexOf('grid-edit') !== -1) {
                    btn.on('click', function () {
                        _editGrid(bindedGrid)
                    });
                }
                if (classCollection.indexOf('grid-save') !== -1) {
                    btn.on('click', function () {
                        _saveGrid(bindedGrid)
                    });
                }
                if (classCollection.indexOf('grid-remove') !== -1) {
                    btn.on('click', function () {
                        _removeRow(bindedGrid)
                    });
                }
            }
            var targetGrid = ''; // 绑定的grid
            if (!!bindedGrid) {
                targetGrid = mini.get(bindedGrid);
                targetGrid.setShowModified(false); // 不显示 修改后的小三角
                targetGrid.setAllowCellValid(true); //　编辑后自动校验
                /*targetGrid.on('cellendedit',function (e) {
                 e.sender.validate();
                 });*/
                targetGrid.on('cellvalidation', function (e) {
                    if (!!e.errorText) {
                        //e.focus()
                        wssq.showTips('修改失败', e.errorText, 'danger');
                        wssq.isValid = false;
                        return false;
                    } else if (!e.errorText) {
                        wssq.isValid = true;
                    }
                })
            } else {
                var nextDom = $(this).next();
                if (nextDom.is('div') && nextDom.hasClass('mini-datagrid')) {

                }
            }
        });
        return 'GridToolBarInitialized';
    };

    /**
     * 初始化前置条件
     * @param reason
     * @param pre
     * @param url
     */
    wssq.showPrePage = function (reason, pre, url) {

        // 加载模版
        var data = { reason: reason, pre: pre, url: url, preTime: 10, goText: '立刻跳转到' + pre },
            html = wssq.loadTemplate('../../../apps/views/public/prepare/PrepareView.html', data);
        $(stepNav.wizard).before(html);

        // 设置跳转倒计时
        var preTime = 9,
            preInterval = setInterval(function () {
                if (preTime < 10) {
                    preTime = '0' + preTime;
                }
                $('#pre-time').text(preTime);
                preTime--;
                if (preTime == -1) {
                    clearInterval(preInterval);
                    window.location.href = url;
                }
            }, 1000);
    };

    /**
     * steps 最后一步结束后 ，显示结果页面
     * @param reason
     * @param pre
     * @param url
     */
    wssq.showResult = function (reason, pre, url) {

        //加载模版
        var data = { reason: reason, pre: pre, url: url },
            html = wssq.loadTemplate('../../../apps/views/public//result/ResultView.html', data);
        stepNav.wizard.children().last().hide().prev().html(html);

        // 倒计时 15 秒 跳转
        var preTime = 14,
            preInterval = setInterval(function () {
                if (preTime < 10) {
                    preTime = '0' + preTime;
                }
                $('#pre-time').text(preTime);
                preTime--;
                if (preTime == -1) {
                    clearInterval(preInterval);
                    window.location.href = url;
                }
            }, 1000);
    };

    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    wssq.initPageHdFt = function (type) {
        var HdFt = type, tplUrl = '';
        // 如果有参数指定初始化头或尾，则按参数来初始化
        if (!!HdFt) {
            if (HdFt == 'head') {
                stepNav = window.stepNav || {};
                var nsrxxvo = nsrxxUtil.getNsrxxVO() || {};
                var nsrxx = stepNav.isLoggedIn ? nsrxxvo : {};
                nsrxx.title = document.title;
                tplUrl = '../../../apps/views/public1/head/HeadView.aspx';
                var html = wssq.loadTemplate(tplUrl, nsrxx);
                $('body').prepend(html);

                // 有纳税人识别号和纳税人名称时才显示
                if (!nsrxx.hasOwnProperty('nsrsbh') || !nsrxx.hasOwnProperty('nsrmc')) {
                    $('.company-info').remove();
                }

                return 'Page Header Initialized';
            } else if (HdFt == 'foot') {
                return 'Page Footer Initialized';
            }

        } else { // 若没有参数，则页头页脚都初始化

            return 'Page Header And Footer Initialized';
        }

    };
    wssq.yltjIndex = null;
    wssq.setBtnDisabled = function (btn, seconds) {
        wssq.yltjIndex = wssq.yltjIndex || stepNav.yltjStep;
        var curentNav = 0;
        $(btn).attr({ disabled: 'disabled', href: 'href' }).css('cursor', 'not-allowed').text(seconds + '秒后重试');
        var timer = setInterval(function () {
            seconds = Number(seconds) - 1;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            $(btn).text(seconds + '秒后重试');
            if (Number(seconds) == 0) {
                $('li[role="tab"]').each(function (i, v) {
                    if ($(v).hasClass('current')) {
                        curentNav = i;
                    }
                });
                var btnText = curentNav < wssq.yltjIndex ? '下一步' : '提交';
                clearInterval(timer);
                $(btn).text(btnText).removeAttr('disabled').attr('href', '#next').css('cursor', 'pointer');
            }
        }, 1000);
    }
    wssq.tjsq = function (url, content, success, err) {

        // 校验缓存的登记序号是否和当前记录的登记序号一致
        if (stepNav.isLoggedIn && !_validateDjxh()) {
            mini.unmask();
            return false;
        }
        // ca 验签
        /*if(!_makeCaEcp()){
            return false;
        }*/

        var _lqfsDm = '',
            _yjddxx = '',
            fbzl = '[]';
        // 组织领取方式代码
        if (!!window.lqfs) {
            _lqfsDm = lqfs.selected;
        }
        // 邮寄订单信息
        if (typeof emailInfo != 'undefined') {
            _yjddxx = mini.encode(emailInfo.getData());
        }
        // 组织附报资料数据
        if (!!window.fbzldata) {
            filterExcessData();
            fbzl = mini.encode(fbzldata);
        }
        var data = {
            data: content,
            lqfsDm: _lqfsDm,
            yjDdxxDto: _yjddxx,
            fbzlList: fbzl,
            stepConfig: mini.encode(stepNav.config),
            viewData: mini.encode(_getViewData())
        };

        ajax.post(url, mini.encode(data), function (response) {

            if (response.success && response.value) {
                wssq.tjsqResponse = response.value;
                wssq.sqxh = response.value.sqxh;

                //初始化办理状态
                blzt.initBlzt();
            } else {
                stepNav.confirmSubmit = false;

                mini.alert(response.message, '提示', function () {
                    wssq.setBtnDisabled($('a[href="#next"]'), 60);
                });

            }
            // 执行各自业务的回调
            success(response);

        }, err);
        mini.unmask();
    };

    wssq.tjsqGr = function (url, content, extraParams, success, err) {

        // 校验缓存的登记序号是否和当前记录的登记序号一致
        if (stepNav.isLoggedIn && !_validateDjxh()) {
            mini.unmask();
            return false;
        }
        // ca 验签
        /*if(!_makeCaEcp()){
            return false;
        }*/

        var _lqfsDm = '',
            _yjddxx = '',
            fbzl = '[]';
        // 组织领取方式代码
        if (!!window.lqfs) {
            _lqfsDm = lqfs.selected;
        }
        // 邮寄订单信息
        if (typeof emailInfo != 'undefined') {
            _yjddxx = mini.encode(emailInfo.getData());
        }
        // 组织附报资料数据
        if (!!window.fbzldata) {
            filterExcessData();
            fbzl = mini.encode(fbzldata);
        }
        var data = {
            data: content,
            lqfsDm: _lqfsDm,
            yjDdxxDto: _yjddxx,
            fbzlList: fbzl,
            stepConfig: mini.encode(stepNav.config),
            viewData: mini.encode(_getViewData())
        };
        $.extend(data, extraParams);
        ajax.post(url, mini.encode(data), function (response) {

            if (response.success && response.value) {
                wssq.tjsqResponse = response.value;
                wssq.sqxh = response.value.sqxh;

                //初始化办理状态
                blzt.initBlzt();
            } else {
                stepNav.confirmSubmit = false;

                mini.alert(response.message, '提示', function () {
                    wssq.setBtnDisabled($('a[href="#next"]'), 60);
                });

            }
            // 执行各自业务的回调
            success(response);

        }, err);
        mini.unmask();
    };

    // 检查登记序号是否一致
    function _validateDjxh() {
        var curNsrxx = nsrxxUtil.getUserInfo(true) || {};
        curNsrxx.NsrInfo = curNsrxx.NsrInfo || {};// 税务登记信息补录没有NsrInfo
        var curDjxh = curNsrxx.NsrInfo.djxh || store.getSession('grDjxh') || '';
        if (curDjxh !== wssqUtil.djxh) {
            mini.alert('会话已经过期，请重新打开页面', '提示', function () {
                window.close();
            });
            return false;
        }
        return true;
    }

    // ca 验签
    function _makeCaEcp() {
        var result = null;
        ajax.post('/wszx-web/api/casz/query/nsrcaszxx', {}, function (result) {
            if (result.success && !!result.value) {
                wssq.caType = result.value.catype;
            } else {
                mini.alert(result.message);
                return false;
            }
        });
        if (!!wssq.caType) {
            if (wssq.caType === 'HBCA') { // 联通CA
                result = CAES.signWithHBCA();
            } else if (wssq.caType === 'HBDSCA') { // 河北CA
                result = CAES.signWithHBDSCA();
            } else if (wssq.caType === 'BJCA') { // 北京CA
                result = CAES.signWithBJCA();
            }
        }
        return result;
    }

    // 获取查看我的附报资料的数据
    function _getViewData() {
        var elements = document.querySelectorAll("[data-view-type]"),
            targetId = null,
            targetType = null,
            data = {};
        for (var i = 0, len = elements.length; i < len; i++) {
            targetId = elements[i].getAttribute("id");
            targetType = elements[i].getAttribute("data-view-type");
            if (!!targetType) {
                targetType = targetType.toLowerCase();
                if (targetType === "form") {
                    var form = new mini.Form("#" + targetId);
                    data[targetId] = form.getDataAndText(true); // form 获取下拉框和树数据的text

                } else if (targetType === "datagrid") {
                    targetId = elements[i].children[0].getAttribute("id") || $(elements[i]).children(0)._id();
                    if (!targetId) {
                        throwError("data-view-type=datagrid 第一个子节点的id未获取到，请检查第一个子节点！");
                        return false;
                    }
                    var grid = mini.get(targetId);
                    data[targetId] = grid.getData();
                }
            } else {
                // 报错
                throwError("预览提交模版页面上某个标签的属性[data-view-type]没有被赋值，请检查！")
            }
        }
        return data;
    }

    // 查询是否有正在办理的业务
    wssq.checkZzbl = function (swsxDm) {
        var url = '../../../api/base/zzblrw/query/' + swsxDm;
        var hasZzblyw = true;
        ajax.post(url, {}, function (result) {
            // 没有正在办理
            if (result.success) {
                hasZzblyw = true;
            } else { // 有正在办理
                hasZzblyw = false;
                mini.alert(result.message, '提示', function () {
                    window.close();
                })
            }
        });

        return hasZzblyw;

    };
    // 关闭 mini open 的window
    wssq.closeWin = function (action) {
        if (window.CloseOwnerWindow) {
            return window.CloseOwnerWindow(action);
        }
        else {
            if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
                window.location.href = "about:blank";
                win_close();
            } else {
                window.opener = null;
                window.open("", "_self");
                win_close();
            }
        }
    };

    wssq.payLoad = function (e) {
        e.contentType = 'application/json;charset=utf-8';
        e.data = mini.encode(e.data);
    };

    /**
     * mini-datagrid 去除 tabindex 属性，否则会在focus事件触发是位置发生改变 ,私有静态方法
     */
    /* wssq.removeTabIndex=function () {
     $('div.mini-grid.mini-datagrid').removeAttr('tabindex');
     return 'GridTabIndexRemoved';
     }();*/

    // 事项监控
    wssq.prepareValidate = function () {
        var resultData = {};
        var code = Tools.getUrlParamByName('code'),
            id = Tools.getUrlParamByName('id');
        var url = '../../../api/validate/beforehand/null1.ashx';
        mini.mask('系统正在进行事前监控校验，请稍候...');
        ajax.asyncGet(url, {}, function (result) {
            mini.unmask();
            if (!result.success) {
                mini.alert(result.message, '提示', function () {
                    wssq.closeWin();
                });
                return;
            }
            if (!result.value) {
                return;
            }
            //由于智数中心返回errorcount不正确，暂时自己计算 begin
            var errorCount = 0;
            var resultCount = 0;
            var errorResult = [];
            var isNull = true; //是否都为空标识
            var needCloseWin = false; // 是否需要关闭整个功能页面
            var data = result.value.ruleResults;
            for (var i = 0; i < data.length; i++) {
                if (!data[i].resultValue && data[i].ruleDegree == '01') {
                    errorResult[resultCount] = data[i];
                    resultCount++;
                    errorCount++;
                    needCloseWin = true;
                }
                if (!data[i].resultValue && data[i].ruleDegree == '02') {
                    errorResult[resultCount] = data[i];
                    resultCount++;
                    errorCount++;
                }
            }
            for (var j = 0; j < errorResult.length; j++) {
                if (!!errorResult[j].resultUrl) {
                    isNull = false;
                }
            }
            result.value.ruleErrorCount = errorCount;   //由于智数中心返回errorcount不正确，暂时自己计算
            result.value.ruleResults = errorResult; // 只保留校验不通过的数据
            resultData = result.value;
            // 校验不通过的项目大于0条就弹窗提示
            if (errorCount > 0) {
                mini.open({
                    url: "../itemValidate/validationWin.aspx",        //页面地址
                    title: "事项监控",      //标题
                    width: 1200,      //宽度
                    height: 600,     //高度
                    allowResize: false,       //允许尺寸调节
                    allowDrag: true,         //允许拖拽位置
                    showCloseButton: false,   //显示关闭按钮
                    showMaxButton: false,     //显示最大化按钮
                    showModal: true,         //显示遮罩
                    currentWindow: false,      //是否在本地弹出页面,默认false
                    onload: function () {       //弹出页面加载完成
                        var iframe = this.getIFrameEl();
                        //调用弹出页面方法进行初始化
                        var data = mini.clone(resultData);
                        iframe.contentWindow.initValidateGrid(data, isNull, needCloseWin);
                    }
                })
            }

        }, function (err) {
            mini.unmask();
            mini.alert('事前监控服务调用发生异常，请您稍后重试！', '提示', function () {
                wssq.closeWin();
            })
        });
    };

    return wssq;
}();



/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/20
 * Time：18:43
 *
 */
; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.baseCode = factory();
    }
}(this, function () {

    var baseCode = {};

    var baseCodeData = store.getLocal('baseCode') || { version: 0 };

    var checkVersionUrl = '../../../api/baseCode/get/version';
    var baseCodeUrl = '../../../api/baseCode/CombSelect/common/';

    baseCode.getDataByCodeName = function (codeName) {

        // 检查版本号
        ajax.get(checkVersionUrl, {}, function (versionOnserver) {

            // 版本号存在且与本地一致
            versionOnserver = versionOnserver.version;
            if (!!versionOnserver && versionOnserver == baseCodeData.version) {

                // 缓存中存在该codename对应的数据
                if (!!baseCodeData[codeName]) {
                    return baseCodeData[codeName]

                } else {// 不存在，则发请求，并存入缓存

                    ajax.get(baseCodeUrl + codeName, {}, function (data) {
                        baseCodeData[codeName] = data;
                        store.setLocal('baseCode', baseCodeData);
                    })
                }

            } else {
                // 版本号不一致,重新存储 baseCodeData

                baseCodeData = { version: versionOnserver };

                ajax.get(baseCodeUrl + codeName, {}, function (data) {
                    baseCodeData[codeName] = data;
                    store.setLocal('baseCode', baseCodeData);
                })

            }
            //获取版本号错误时，直接去请求
        }, function (req) {
            baseCodeData = { version: 0 };

            ajax.get(baseCodeUrl + codeName, {}, function (data) {
                baseCodeData[codeName] = data;
                store.setLocal('baseCode', baseCodeData);
            })
        });
        return baseCodeData[codeName];


    };

    baseCode.getMcById = function (codeName, Id) {
        var data = baseCode.getDataByCodeName(codeName);
        var MC = null;
        if (!!data) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                if (obj.ID == Id) {
                    MC = obj.MC;
                    break;
                }
            }
        }
        return MC;
    };
    return baseCode;

}));

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/17
 * Time：15:12
 *
 */

var blzt = {};

var blztApi = {
    queryBlzt: '../../../api/wssq/cx/getSqxxBySqxh/',
    cancelApply: '../../../api/base/submit/cancelSqxx'
};
blzt.stepDom = $('<div><li><a><span class="connect-line"></span><span class="number"></span><div class="title"></div></a></li></div>');
blzt.stepsCollection = $('#steps');
blzt.contentCollection = $('#content');
blzt.actions = $('#actions');

blzt.stepHead = $('#step-patch-head');
blzt.stepTail = $('#step-patch-tail');


// 询办理状态，包含返回的预览数据
blzt.initBlzt = function () {

    ajax.get('../../data/swsxDmConfig.ashx', {}, function (responseJson) {
        blzt.swsxDmConfig = responseJson;
        blzt.sqxh = Tools.getUrlParamByName('sqxh') || wssqUtil.sqxh;
        var data = null;
        //var url = blztApi.queryBlzt + blzt.sqxh;
        var url = blztApi.queryBlzt + '6d2a0019c0294eb0a30b3a9d8c6312fc.ashx';
        ajax.post(url, {}, function (result) {
            if (result.success && result.value) {
                data = result.value;
                blzt.swsxDm = data.swsxDm;
                blzt.title = blzt.swsxDmConfig[blzt.swsxDm].name;
                blzt.swsxDlMc = data.swsxDlMc;
                blzt.blztDm = data.blztDm;
                blzt.blztMc = data.blztMc;
                blzt.czztDm = data.czztDm;
                blzt.stepConfig = mini.decode(data.stepConfig) || null;
                blzt.viewData = mini.decode(data.viewData) || null;
                blzt.ylUrl = blzt.swsxDmConfig[blzt.swsxDm].ylView;
                blzt.ylCss = blzt.swsxDmConfig[blzt.swsxDm].ylStyle;
                if (blzt.czztDm == '05') {
                    $('#signFile').hide();
                }
            } else {
                mini.alert(result.message);
                return false;
            }
        });
    })

};
/*blzt.blztDm 办理状态代码
 *
 * 00 待受理
 * 01 受理通过
 * 02 不与受理
 * 03 待审批
 * 04 审批通过
 * 05 审批不通过
 * 06 补正资料
 * 07 已补正
 * 10 受理中
 * 30 受理通过未缴邮费
 * 31 受理通过已缴邮费
 * 32 邮件已寄出
 *
 * */

blzt.initNavBar = function () {
    if (!blzt.stepConfig || blzt.stepConfig.length == 0) {
        $('#wizard >.steps').remove();
        return false;
    }
    // 设置导航条
    var stepsHtml = '';
    var yltjIndex = 20; // 预览提交 步骤的index，默认一个较大值
    var shzFlag = false; // 是否有“审核中”步骤
    var len = blzt.stepConfig.length;
    var wcZtdm = ['01', '02', '04', '05']; // 定义跳转到完成页面的状态代码

    for (var i = 0; i < len; i++) {
        var step = blzt.stepConfig[i];
        blzt.stepDom.find('span.number').text(i + 1);
        blzt.stepDom.find('div.title').html(step.title);
        if (step.yltj) {
            yltjIndex = i; // 赋值 预览提交
        }
        // 有“审核中”步骤,且不在需要跳转到完成页面的数组中
        if (yltjIndex == len - 3 && $.inArray(blzt.blztDm, wcZtdm) === -1) {
            shzFlag = true
        }

        if (i < yltjIndex + 1) {
            blzt.stepDom.find('li').addClass('done');
        } else if (i == yltjIndex + 1) {

            if (shzFlag) {
                blzt.stepDom.find('li').addClass('current');
                blzt.stepTail.addClass('disabledBg');
            } else {
                blzt.stepDom.find('li').addClass('done');
                blzt.stepTail.addClass('doneBg');
            }

        } else {
            blzt.stepDom.find('li').addClass($.inArray(blzt.blztDm, wcZtdm) > -1 ? 'done' : 'disabled');

        }

        stepsHtml += blzt.stepDom.html();
        blzt.stepDom.find('li').removeAttr('class');
    }

    blzt.stepsCollection.html(stepsHtml);
    blzt.stepHead.css('width', (100 - 10 * len) / 2 + '%');
    blzt.stepTail.css('width', (100 - 10 * len) / 2 + '%');

};
// 查看我的申请资料
blzt.showSqzl = function () {
    mini.open({
        url: '../public/sqzl/viewSqzl.html',
        title: '我的申请资料',
        width: 1200,
        height: 600,
        allowResize: true,
        allowDrag: true,
        onload: function () {
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化
            var data = mini.clone(blzt.viewData);
            iframe.contentWindow.sqzl.initPage(blzt.ylUrl, data, blzt.ylCss);

        },
        ondestroy: function (action) {  //弹出页面关闭前

        }

    });
};
// 撤销申请
blzt.cancelApply = function () {
    mini.confirm('确定撤销申请吗？', '提示', function (action) {
        if (action == 'ok') {
            // do something
            var params = {
                swsxDm: blzt.swsxDm,
                sqxh: blzt.sqxh
            };
            ajax.post(blztApi.cancelApply, mini.encode(params), function (result) {
                if (result.success) {
                    mini.alert('撤销成功', '提示', function () {
                        window.close();
                    })
                    return false;
                } else {
                    mini.alert(result.message);
                    return false;
                }
            });

        }
    });
    return true;

};
// 签收
blzt.signFile = function () {
    mini.open({
        url: '../blzt/qs.html',
        title: '签收',
        width: 1200,
        height: 600,
        allowResize: true,
        allowDrag: true,
        showCloseButton: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化
            // iframe.contentWindow.sqzl.initPage(blzt.ylUrl, blzt.viewData);
            if (window.parent.blzt.czztDm == '02') {
                iframe.contentWindow.$('#prev').hide();
                iframe.contentWindow.$('#download').hide();
                iframe.contentWindow.$('#next').text('确定');
                iframe.contentWindow.qs.index = 2;
                iframe.contentWindow.$('#oneStep').hide();
                iframe.contentWindow.$('#twoStep').hide();
                iframe.contentWindow.$('#threeStep').show();

            }
        },
        ondestroy: function (isqs) {  //弹出页面关闭前
            if (isqs) {
                //如果签收成功，签收按钮变评价按钮
                $('#signFile').hide();
            }
        }
    })
};
// 补正资料
blzt.bzzl = function () {
    mini.open({
        url: '../public/bzzl/bzzl.html',
        title: '补正资料',
        width: 1200,
        height: 600,
        allowResize: true,
        allowDrag: true,
        onload: function () {
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化
            var data = mini.clone(blzt.viewData);
            iframe.contentWindow.sqzl.initbzzlPage(blzt.ylUrl, data);
            mini.parse();
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action != 'close') {
                console.log(23234);
            }
        }

    });
};

// 下载审批通知书
blzt.downloadFile = function () {
    mini.open({
        url: '../public/jstzs/jstzs.html',
        title: '下载审批结果通知书',
        width: 1200,
        height: 600,
        allowResize: true,
        allowDrag: true,
        onload: function () {
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化

        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action != 'close') {

            }
        }

    });
};


// 增加显示内容
blzt.addContent = function (dom) {
    blzt.contentCollection.append(dom);
};
// 增加自定义按钮，以及按钮绑定的事件
blzt.addButton = function (dom, type, func) {
    blzt.actions.append(dom);
    $(dom).attr(type, func);
};


blzt.wcPageLoadMsg = function (blztDm) {
    if (!!blztDm) {
        var yltjTemplate = wssqUtil.loadTemplate('../ckzhzhbg/YltjView.html');
        // wssqUtil.loadScript('../../ckzhzhbg/ckzhzhbgService.js');
        blzt.contentCollection.html(yltjTemplate);
        mini.parse();
        for (var d in blzt.viewData) {
            if ($.isArray(blzt.viewData[d])) {
                mini.get(d).setData(blzt.viewData[d]);
            } else {
                var form = new mini.Form('#' + d);
                form.setData(blzt.viewData[d]);
            }
        }
    }
};

blzt.initBreadNav = function () {
    wssqUtil.initPageHdFt('head');  // 加载头部
    $('.breadcrumb-Nav > span').text(blzt.title); //　面包屑导航换成税务事项名称
    $('#current-swsxMc').text(blzt.title);
};

/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-09-21
 * Time: 17:20
 * Description:
 */
; (function () {
    /*页面插入侧边栏*/
    var html = wssqUtil.loadTemplate('../public1/sidebar/sidebar-hb.aspx');
    $('body').append(html);

    /*回到顶部*/
    $('.item-top').on('click', function () {
        scrollTo(0, 0);
    });

    /*在线帮助*/
    var config = {
        "simpleCompany": "4-2",
        "sb_xgmsb_yjlsb": "5-1-1",
        "sb_ybnsrzzssbqkcx": "5-1-2",
        "sb_xfs": "5-1-3",
        "sb_qysdssbqkcx_A": "5-1-4",
        "jzsb": "5-1-5",
        "sb_qysdssbqkcx_B": "5-1-6",
        "sb_qysdssbqkcx_B_year": "5-1-7",
        "sb_whsysbqkcx": "5-1-8",
        "sb_fqdzcpcljjsqbsbqkcx": "5-1-9",
        "sb_grcxcklxsdssbqkcx_5": "5-1-10",
        "sb_grcxcklxsdssbqkcx_20": "5-1-11",
        "sb_cwbbsbqkcx": "5-1-12",
        "sb_hdf_sbqkcx": "5-1-13",
        "sb_hdf_jkqkcx": "5-1-14",
        "jkpzSpdy": "5-1-15",
        "sbcx": "5-1-16",
        //我要缴纳车购税
        "jk_jsxxcx": "5-1-18",
        "sbjgcx": "5-1-19",
        "xgmsb": "5-1-20",
        "zzsybnsrYbjc": "5-1-21",
        "pzhd": "5-2-1",
        "fplyIndex": "5-2-2",
        "dkZy": "5-2-3",
        //增值税普通发票代开作废 n
        "fpyj": "5-2-5",
        "fpds": "5-2-6",
        "bgdjDw": "5-3-1",
        //税务信息登记补录 n
        "tydj": "5-3-3",
        "fydj": "5-3-4",
        "dexxcj": "5-3-5",
        "cwkjzdba": "5-3-6",
        "ckzhzhbg": "5-3-7",
        "sfxyindex": "5-3-8",
        "wcjyzmkj": "5-3-9",
        "zzsyjsb": "5-3-10",
        "wcjyhdsb": "5-3-11",
        "wcjyzmhx": "5-3-12",
        "wcjyhdssglzmcx": "5-3-13",
        "zzsjzjt": "5-4-1",
        "zzsssjmba": "5-4-2",
        "xfsssjmba": "5-4-3",
        "qysdsyhsxba": "5-4-4",
        "lsyhbaxxcx": "5-4-5",
        "xzaxgm": "5-4-6",
        "ybnsrjyzsrd": "5-4-7",
        "wyyy": "5-5-1",
        "wdyy": "5-5-2",
        "dtsk": "5-5-3",
        "ycqh": "5-5-4",
        "yhdkcpjs": "5-6-1",
        "yshd_xzsssj": "5-6-2",
        "swxzxk": "5-6-3",
        "hlsjcj_client_main": "5-6-4",
        //个体定额查询
        "cx_xydjcx": "5-7-2",
        "cxtj_ybnsrrdxx": "5-7-3",
        //发票查验 http://mobile.zgcszkw.com/?redirect=Papers#&PagePapers
        "school": "5-7-5",
        //办税指南 http://www.hebtax.gov.cn/hbgsww_new/bsfw/bszn/
        //税收知识库 http://12366.he-n-tax.gov.cn/hbgsww/FullTextSearchBLH_searchMain.do
        //智能问答 http://12366.he-n-tax.gov.cn/hbgsww/BsfzBLH_Zdwd.do
        //qq咨询..互助咨询
        "bsfwtxx": "5-7-11",
        //对外公开电话..财税智库法规库
        "wcjyhdssglzmcx": "5-7-12"
        //投诉举报
        //资料下载 n
        //税收执法公示 n
        //办税日历 n
    };
    $('.item-help').on('click', function () {
        var arr = location.href.split('.html')[0].split('/');
        var htmlName = arr[arr.length - 1];
        var anchor = config[htmlName];
        //window.open('/hbyt/#' + anchor);
		window.open('/hbyt/zxbz.aspx?' + anchor);
    });
    /*微课程*/
    $('.item-video').on('click', function () {
        window.open('/login-web/wkc/wkc-index.aspx');
    });

    /*问题反馈*/
    $('.item-feedback').on('click', function () {
        $.noop();
    });
}());