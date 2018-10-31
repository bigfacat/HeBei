/**
 * Created by mjial on 2017-2-14.
 */



(function () {
    var curMode = store.getSession('curMode');

    /*已办事项分页*/
    var $nextPageBtn = $('#allDoneList-next');
    var $prevPageBtn = $('#allDoneList-prev');
    var pageIndex = 1;
    $prevPageBtn.on('click', function () {
        if (pageIndex === 1) {
            $prevPageBtn.attr('disabled', 'disabled');
        } else {
            $prevPageBtn.removeAttr('disabled');
            $nextPageBtn.removeAttr('disabled');
            pageIndex--;
            getListDate('ybsxTab', 'prev');
        }

    });
    $nextPageBtn.on('click', function () {
        pageIndex++;
        $prevPageBtn.removeAttr('disabled');
        getListDate('ybsxTab', 'next');
    });

    /*通知公示分页*/
    var $nextPageBtn2 = $('#allDoneList-next-tzgs');
    var $prevPageBtn2 = $('#allDoneList-prev-tzgs');
    var pageIndex2 = 1;
    $prevPageBtn2.on('click', function () {
        if (pageIndex2 === 1) {
            $prevPageBtn2.attr('disabled', 'disabled');
        } else {
            $prevPageBtn2.removeAttr('disabled');
            $nextPageBtn2.removeAttr('disabled');
            pageIndex2--;
            getListDate('tzgsTab', 'prev');
        }

    });
    $nextPageBtn2.on('click', function () {
        pageIndex2++;
        $prevPageBtn2.removeAttr('disabled');
        getListDate('tzgsTab', 'next');
    });


    $('.changeVersion a').removeClass('curVersion');
    if (curMode == 'P') {
        $('#professionMode').addClass('curVersion');
    } else if (curMode == 'S') {
        $('#simpleMode').addClass('curVersion');
    } else {
        getUserMode().then(function (data) {
            data = mini.decode(data);
            if (data.success) {
                if (data.data.userMode == 'SIMPLE') {
                    store.setSession('curMode', 'S');
                    $('#simpleMode').addClass('curVersion');
                } else {
                    store.setSession('curMode', 'P');
                    $('#professionMode').addClass('curVersion');
                }
            } else {
                if (data.message == 'ajaxSessionTimeOut') {
                    window.location.reload();
                } else {
                    mini.alert(data.message);
                }
            }
        });
    }
    if (location.href.indexOf("&allDone") < 0 && location.href.indexOf("type=sx") < 0) {
        $nextPageBtn.parent().hide();
        $nextPageBtn2.parent().hide();
        getListDate();
    } else {
        $(".ico-tab").removeClass('active');
        $(".ico-ybsxTab").addClass('active');
        $nextPageBtn.parent().show();
        getListDate(true);
    }
    //切换到简捷模式
    $("#simpleMode").click(function () {
        changeUserMode('SIMPLE').then(function (data) {
            data = mini.decode(data);
            if (data.success) {
                store.setSession('curMode', 'S');
                window.parent.window.location.href = window.globalUrl + '/apps/views/personPage/personPage.aspx';
            } else {
                if (data.message == 'ajaxSessionTimeOut') {
                    window.location.reload();
                } else {
                    mini.alert(data.message);
                }
            }
        });
    });
    //切换到专业模式
    $("#professionMode").click(function () {
        changeUserMode('PROFESSIONAL').then(function (data) {
            data = mini.decode(data);
            if (data.success) {
                store.setSession('curMode', 'P');
                window.parent.window.location.href = window.globalUrl + '/apps/views/personPage/personPage.aspx';
            } else {
                if (data.message == 'ajaxSessionTimeOut') {
                    window.location.reload();
                } else {
                    mini.alert(data.message);
                }
            }
        });
    });

    $(".ico-tab").each(function () {
        $(this).click(function () {
            $(".ico-tab").removeClass('active');
            $(this).addClass('active');
            getListDate($(this).attr("data-type"));
        });
    });

    function getListDate(tab, type) {
        mini.mask("loading...");
        if (tab === 'ybsxTab') {
            $nextPageBtn2.parent().hide();
            allDoneList(pageIndex, 20).then(function (data) {
                mini.unmask();
                data = mini.decode(data);
                if (data.success) {
                    if (pageIndex === 1) {
                        $prevPageBtn.attr('disabled', 'disabled');
                    }
                    if (type === 'next') {
                        if (!(data.total - 20 * pageIndex > 0)) {
                            $nextPageBtn.attr('disabled', 'disabled');
                        } else {
                            $nextPageBtn.removeAttr('disabled');
                        }
                    } else if (type === undefined) {
                        if (data.total <= 20) {
                            $nextPageBtn.parent().hide();
                            $nextPageBtn2.parent().hide();
                        } else {
                            $nextPageBtn.parent().show();
                        }
                    }

                    $('#page-index').text(pageIndex);
                    $('#page-total').text(Math.ceil(data.total / 20));
                    data.data.pageIndex = pageIndex - 1;
                    $(".sxContent").html(template('sxContentHtml', data.data));
                } else {
                    if (data.message == 'ajaxSessionTimeOut') {
                        window.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                }
            });
        } else if (tab === 'bszyTab') {
            getTodoList();
            $nextPageBtn.parent().hide();
            $nextPageBtn2.parent().hide();
        } else if (tab === 'tzgsTab') {
            $nextPageBtn.parent().hide();
            var userInfo = mini.decode(store.getSession('getUserInfo'));
            var params = {
                needBrief: 1,//是否需要摘要
                nsrsbh: userInfo.NsrInfo.nsrsbhGs,//纳税人识别号
                pageSize: 20,//一页数量
                pageIndex: pageIndex2 - 1//当前页，从0开始计算
            };

            getTzgs(mini.encode(params)).then(function (data) {
                if (data.success) {
                    var tzgg = JSON.parse(data.value);

                    if (pageIndex2 === 1) {
                        $prevPageBtn2.attr('disabled', 'disabled');
                    }
                    if (type === 'next') {
                        if (!(tzgg.total - 20 * pageIndex2 > 0)) {
                            $nextPageBtn2.attr('disabled', 'disabled');
                        } else {
                            $nextPageBtn2.removeAttr('disabled');
                        }
                    } else if (type === undefined) {
                        if (tzgg.total <= 20) {
                            $nextPageBtn2.parent().hide();
                        } else {
                            $nextPageBtn2.parent().show();
                        }
                    }

                    $('#page-index-tzgs').text(pageIndex2);
                    $('#page-total-tzgs').text(Math.ceil(tzgg.total / 20));
                    tzgg.pageIndex = pageIndex2 - 1;

                    $(".sxContent").html(template('sxContentHtml', tzgg));
                } else if (data.message === 'ajaxSessionTimeOut') {
                    top.location.reload();
                } else {
                    mini.alert(data.message);
                }
                mini.unmask();
            });
        }
    }


})();

(function () {
    //处理入口 带参数进来 直接跳到对应页面 指引 和 事项
    var type = location.href.split('&type=')[1];
    if (type) {
        $('a[data-type=' + type + ']').trigger('click');
    }

    initXdRobot();
})();