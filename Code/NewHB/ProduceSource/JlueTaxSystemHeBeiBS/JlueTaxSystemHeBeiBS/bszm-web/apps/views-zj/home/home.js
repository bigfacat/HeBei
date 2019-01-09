/**
 * Created with JetBrains WebStorm 2018.2.1
 * Author: lizm
 * Date: 2018/10/7
 * Time:11:25
 * Description:home
 */

var home = {
    menuId: '', // 菜单类型 10 个人，20企业，30 社保
    leftMenu: {},
    rightMenu: {},
    needQueryDsTodo: false, // 是否需要查询地税待办
    targetPanel: bszmUtil.getUrlParam('tab'), //tab=wdxx
    bindTabClickEvents: function () {
        // tab 点击切换事件
        var _this = this;
        var flag = 0;
        $('#mine-ul li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var tagPanel = $(this).attr('data-tag-panel');
            var tagTab = $('#' + tagPanel);
            tagTab.addClass('active').siblings('.mine-panel').removeClass('active');
            // 点击[我的已办] 重新刷新 已办事项状态
            if ((tagPanel.replace('panel-', '')).slice(1) === '2050') {
                $('.tzgg-tab').show().click().siblings('li').hide();
                $('#todo-ul a').show();
            } else {
                $('#todo-ul li').show().eq(flag).click();
                $('.tzgg-tab').hide();
                $('#todo-ul a').hide();
            }

            setTimeout(function () {
                _this.resetMenuHeight();
            }, 50);
        });
        //#
        $('#todo-ul li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var tagPanel = $(this).attr('data-tag-panel');
            var tagTab = $('#' + tagPanel);
            tagTab.addClass('active').siblings('.todo-panel').removeClass('active');
            // 点击[我的已办] 重新刷新 已办事项状态
            if (tagPanel === 'wddb-panel') {
                flag = 0;
            }
            if (tagPanel === 'tstx-panel') {
                flag = 1;
            }
            setTimeout(function () {
                _this.resetMenuHeight();
            }, 50);
        });
        // 我的信息
        if (home.targetPanel) {
            var p = home.targetPanel;
            var lis = $('#mine-ul li');
            switch (p) {
                case 'wdxx':
                    $(lis).eq(0).click();
                    break;
                case 'wybs':
                    $(lis).eq(1).click();
                    break;
                case 'wycx':
                    $(lis).eq(2).click();
                    break;
                case 'hdzx':
                    $(lis).eq(3).click();
                    break;
                case 'gzfw':
                    $(lis).eq(4).click();
                    break;
                default:
                    break;
            }
        } else {
            $('#mine-ul li:eq(0)').click();
        }


    },
    /**
     * 根据用户类型设置菜单类型
     */
    setUserType: function () {
        var userInfo = store.getSession('getUserInfo');
        if (userInfo) {
            var userType = userInfo.userType; //01 企业；02个人；03社保户
            var isByh = userInfo.NsrInfo ? (userInfo.NsrInfo.byhBz === '2') : false; // 报验户
            // 20 企业，40 报验户
            // 10 个人 30 社保户 不查询地税
            if (isByh) {
                this.menuId = '40';
                this.needQueryDsTodo = true;
                return;
            }
            switch (userType) {
                case '01':
                    this.menuId = '20';
                    this.needQueryDsTodo = true;
                    break;
                case '02':
                    this.menuId = '10';
                    break;
                case '03':
                    this.menuId = '30';
                    break;
                default:
                    break;
            }
        }
    },
    /**
     * 常用功能设置数据
     */
    queryCustomMenu: function () {
        //请求常用功能数据
        commonFunctionsEx().then(function (data) {
            if (data.success) {
                store.setSession('customFns', data.data);
            } else {
                data = { data: null };
                if (data.message === 'ajaxSessionTimeOut') {
                    window.location.reload();
                } else {
                    data.message && mini.alert(data.message);
                }
            }
            $('#custom-menu-ul').html(template('custom-menu-li', data));
        });
    },
    /**
     * 查询全部菜单功能
     */
    queryAllFunctions: function (cb) {
        var _this = this;
        if (store.hasSession('allFunctions')) {
            var allFunctionsData = store.getSession('allFunctions');
            _this.setMenuData(allFunctionsData);
            cb();
        } else {
            allFunctions().then(function (data) {
                if (data.success) {
                    data = mini.decode(data);
                    store.setSession('allFunctions', data.data);
                    _this.setMenuData(data.data);
                    cb();
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
    /**
     * 展开所有功能菜单，存session，用于功能搜索
     * @param item
     * @param res
     */
    storeFnDataForSearch: function (item, res) {
        if (item.subMenus.length) {
            for (var j = 0, k = item.subMenus.length; j < k; j++) {
                this.storeFnDataForSearch(item.subMenus[j], res);
            }
        } else {
            for (var i = 0, l = item.functions.length; i < l; i++) {
                res.push(item.functions[i]);
            }
        }

        store.setSession('searchFnData', res);

    },
    setMenuData: function (data) {
        var menuData;
        for (var i = 0, l = data.length; i < l; i++) {
            if (data[i].menuId + '' === this.menuId) {
                menuData = data[i];
                break;
            }
        }
        if (menuData) {
            for (var j = 0, k = menuData.subMenus.length; j < k; j++) {
                var name = menuData.subMenus[j].menuName;
                if (name === 'LEFT') { // 左侧菜单
                    this.leftMenu = menuData.subMenus[j];
                    $('#left-menu-ajax').html(template('left-menu', this.leftMenu));
                } else if (name === 'CONTENT') {
                    this.rightMenu = menuData.subMenus[j]; // 右侧菜单
                    $('#mine-menu').html(template('right-menu', this.rightMenu));
                }
            }
        }
    },
    setWdSession: function () {
        try {
            Form.Set(key, value);
        } catch (e) {

        }
    },
    /**
     * 待办事项
     */
    queryTodoList: function () {
        var _this = this;
        var ysbqcData = { data: [] }; // 应申报清册
        var qtsxData = { data: [] }; // 其他事项
        var whsyjsf = [], // 文化事业建设费
            wyjs = [], //我要缴税
            gsbb = [], //国税必办
            dsbb = [], //地税必办
            gsxb = [], //国税选办
            dsxb = []; //地税选办

        var handleResData = function (d, isDsToDoList) {
            for (var i = 0, len = d.length; i < len; i++) {
                var item = d[i];
                if (isDsToDoList) {
                    store.setSession('ds_' + item.code, item);
                    _this.setWdSession('ds_' + item.code, mini.encode(item));
                    item.url = '/bszm-web/apps/views/publicPage/gds/dssbIndex.html?code=' + item.code;
                    if (item.code === '3208' && !item.required) { //印花税纳税申报（报告）表
                        item.url = '/sbzx-web/apps/views/sb_gdlh_yhs/sb_gdlh_yhs.html?sbzlDm=21101';
                    } else if (item.code === '3001' && !item.required) { //通用申报表（工会经费）
                        item.url = '/sbzx-web/apps/views/sb_gdlh_tysbb/sb_gdlh_tysbb.html?sbzlDm=21102';
                    } else if (item.code === '3003' && !item.required) { //附加税（费）申报
                        item.url = '/sbzx-web/apps/views/sb_fjs/sb_fjs.html?sbzlDm=10115';
                    }
                }
                if (item.category === 'message') {
                    qtsxData.data.push(item);
                } else if (item.category === 'sb' || item.category === 'declaration') {

                    // 26501,26502文化事业建设费月季报, wyjs 我要缴税
                    if (item.code !== '26501' && item.code !== '26502' && item.code !== 'wyjs') {
                        //ysbqcData.data.push(item);
                        if (item.required) { // 必办
                            if (item.gdsBz === '1') { //国税
                                gsbb.push(item);
                            } else { // 地税
                                dsbb.push(item);
                            }
                        } else { // 选办
                            if (item.gdsBz === '1') { // 国税
                                gsxb.push(item);
                            } else { // 地税
                                dsxb.push(item);
                            }
                        }
                    } else if (item.code === 'wyjs') {
                        wyjs.push(item);
                    } else {
                        whsyjsf.push(item);
                    }
                }
            }
        };
        var handleDs = function () {
            var renderHtml = function () {
                mini.unmask();
                ysbqcData.data = gsbb.concat(whsyjsf, dsbb, wyjs); // 我要缴税 放在最后面,有地税的也要放在地税后面
                qtsxData.data = gsxb.concat(dsxb, qtsxData.data);
                // 其他事项
                $('#qtTbody').html(template('qtTrs', qtsxData));
                // 申报事项
                $('#sbTbody').html(template('sbTrs', ysbqcData));
                setTimeout(function () {
                    _this.resetMenuHeight();
                }, 50);
            };
            if (home.needQueryDsTodo) {
                getDsTodoList().then(function (res) {

                    if (res.success) {
                        store.removeSession('dsNsrxxErr');
                        handleResData(res.data, true);
                    } else if (res.message === 'ajaxSessionTimeOut') {
                        top.location.reload();
                    } else if (!!res.messageCode && res.messageCode === '80489079') {
                        store.setSession('dsNsrxxErr', 'Y');
                        mini.alert(res.message);
                    } else {
                        mini.alert(res.message);
                    }
                    renderHtml();

                }, function () {
                    store.setSession('dsNsrxxErr', 'Y');
                    renderHtml();
                });
            } else {
                renderHtml();
            }
        };
        mini.mask({ cls: 'mini-mask-loading', message: '待办事项数据加载中，请稍候...' });
        todoList().then(function (data) {
            if (data.success) {
                handleResData(data.data);
                // 文化事业建设费放在增值税之后
                ysbqcData.data = gsbb.concat(whsyjsf, dsbb, wyjs);
                // 获取地税办税指引数据
                handleDs();
                // 我的待办 数据出来了再 点击 切换过去
                $('li[data-tag-panel="wddb-panel"]').click();
            } else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
        }, function () {
            handleDs();
        });
    },
    /**
     * 已办事项
     */
    queryAllDoneList: function () {
        mini.mask({ cls: 'mini-mask-loading', message: '已办事项数据加载中，请稍候...' });
        doneList().then(function (data) {
            mini.unmask();
            data = mini.decode(data);
            if (data.success) {
                $('#ybsxTbody').html(template('ybsxTrs', data.data));
            } else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
        });
    },
    /**
     * 通知公告
     */
    queryTzgg: function () {

        /*var tzgg = {};
        queryUserMessage('tzgg', 0, 5).then(function (data) {
            if (data.success) {
                tzgg = {data: data.value || []};
                if (tzgg.data.length) {
                    for (var i = 0, l = tzgg.data.length; i < l; i++) {
                        var item = tzgg.data[i];
                        item.createDate = bszmUtil.formatDateTime(item.createDate);
                    }
                }
            } else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
            $('#tzggTbody').html(template('tzggTrs', tzgg));
        });*/
        var tzgg = {};
        $.get('../../../apps/data/zj/tzgg.json').then(function (data) {
            data = mini.decode(data);
            if (data.success) {
                tzgg = { data: data.value || [] };
                if (tzgg.data.length) {
                    for (var i = 0, l = tzgg.data.length; i < l; i++) {
                        var item = tzgg.data[i];
                        item.createDate = bszmUtil.formatDateTime(item.createDate);
                    }
                }
            } else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
            $('#tzggTbody').html(template('tzggTrs', tzgg));
        });
    },
    queryTstx: function () {

        var unreadNum = 0;
        var _this = this;
        queryUserMessage('tstx', 0, 5).then(function (data) {
            if (data.success && !!data.value) {
                _this.tstxData = data;
                for (var i = 0, len = _this.tstxData.value.length; i < len; i++) {
                    var item = _this.tstxData.value[i];
                    if (item.receiveStatus === 'unread') {
                        unreadNum++;
                    }
                    item.createDate = bszmUtil.formatDateTime(item.createDate);
                }
                if (unreadNum > 0) {
                    $('#unread-num').text(unreadNum).show();
                } else {
                    $('#unread-num').hide();
                }
                $('#tstxTbody').html(template('tstxTrs', _this.tstxData));
            }
            else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
        });

    },
    /**
     * 政策速递
     */
    queryZcsd: function () {
        var zcsdData = [];
        queryUserMessage('ztzcjd', 0, 5).then(function (data) {
            if (data.success && !!data.value) {
                zcsdData = data;
                for (var i = 0, len = zcsdData.value.length; i < len; i++) {
                    var item = zcsdData.value[i];
                    item.createDate = bszmUtil.formatDateTime(item.createDate);
                }
                $('#zcsdTbody').html(template('zcsdTrs', zcsdData));
            }
            else if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            } else {
                mini.alert(data.message);
            }
        });
    },


    resetMenuHeight: function () {
        var $leftMenu = $('.left-menu'),
            leftH = $('#custom-menu-ul').height() + $('#left-menu-ajax').height() + $('.custom-menu.title').height(),
            rightH = $('.mine-menu').height() + $('.todo-panel.active').height() + $('#todo-ul').height() + 20,
            higher = leftH > rightH ? leftH : rightH;
        if (leftH > rightH) {
            $('.todo-menu').height(higher - $('.mine-menu').height() - 22);
            $leftMenu.height(higher - 1);
        } else {
            $('.todo-menu').height(higher - $('.mine-menu').height() - 19);
            $leftMenu.height(higher + 2);
        }


    }
};

template.helper('resetMenuId', function (id) {
    return (id + '').slice(1);
});

$(function () {
    // 初始化用户信息
    var _this = home;
    bszmUtil.initSearch('.home-search');
    /*bszmUtil.renderFooter('#foot-temp');*/
    bszmUtil.initUserInfo('.home-user', function () {
        _this.setUserType();
        _this.queryCustomMenu();
        _this.queryAllFunctions(function () {
            _this.storeFnDataForSearch(_this.rightMenu, []);
            _this.queryTodoList();
            //_this.queryAllDoneList();
            _this.queryTzgg();
            _this.queryTstx();
            //_this.queryZcsd();
            _this.bindTabClickEvents();
        });
    });
   
    bszmUtil.initBszy();
});