/**
 * Created by mjial on 2017-2-7.
 */

var tstxData;
(function () {
    //存储当前模式
    mini.mask({ "cls": "mini-mask-loading", "message": "数据加载中，请稍后..." });

    store.setSession('curMode', 'S');

    //请求常用功能数据
    commonFunctions().then(function (data) {
        if (data.success) {
            store.setSession('commonFunctions', data);
            $(".cygnContent").html(template('cygnUlHtml', data));
        } else {
            if (data.message === 'ajaxSessionTimeOut') {
                window.location.reload();
            } else {
                mini.alert(data.message);
            }
        }
    });

    // 小东机器人
    initXdRobot();
    // 在线帮助
    setOnlineSupportAnchor('wdbsdt');
    // 提示提醒
    initTstxData();

    // 已办事项等
    $('.sxTabContent').on('click', 'a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tab = $(this).attr('data-type');
        $('ul.common').hide();
        $('#break-line').hide();
        $('ul.' + tab).show();
        mini.mask({ "cls": "mini-mask-loading", "message": "数据加载中，请稍后..." });
        switch (tab) {
            case 'bszyTab':
                $('a.zy,#break-line').show();
                $('a.sx,a.tz').hide();
                todoList().then(function (data) {
                    $('#break-line').show();
                    var ysbqcData = { data: [] };
                    var qtsxData = { data: [] };
                    if (data.success) {
                        for (var i = 0, len = data.data.length; i < len; i++) {
                            var item = data.data[i];
                            if (item.category === 'message') {
                                qtsxData.data.push(item);
                            } else if (item.category === 'sb' || item.category === 'declaration') {
                                ysbqcData.data.push(item);
                            } else {
                                // TODO
                            }
                        }
                        $(".qtsxTab").html(template('qtsxList', qtsxData));

                        $('.ysbqcTab').html(template('ysbqcList', ysbqcData));

                    } else if (data.message === 'ajaxSessionTimeOut') {
                        top.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                    mini.unmask();
                });

                break;
            case 'ybsxTab':
                $('a.sx').show();
                $('a.zy,a.tz,#break-line').hide();
                doneList().then(function (data) {
                    data = mini.decode(data);
                    if (data.success) {
                        $(".ybsxTab").html(template('ybsxList', data.data));
                    } else if (data.message === 'ajaxSessionTimeOut') {
                        top.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                    mini.unmask();
                });
                break;
            case 'tzgsTab':
                $('a.tz').show();
                $('a.zy,a.sx,#break-line').hide();
                var userInfo = mini.decode(store.getSession('getUserInfo'));
                var params = {
                    needBrief: 1,//是否需要摘要
                    nsrsbh: userInfo.NsrInfo.nsrsbhGs,//纳税人识别号
                    pageSize: 5,//一页数量
                    pageIndex: 0//当前页，从0开始计算
                };

                getTzgs(mini.encode(params)).then(function (data) {
                    if (data.success) {
                        var tzgg = JSON.parse(data.value);
                        $(".tzgsTab").html(template('tzgsList', tzgg));
                    } else if (data.message === 'ajaxSessionTimeOut') {
                        top.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                    mini.unmask();
                });
                break;
            case 'tstxTab':

                initTstxData();
                break;
            default:
                break;
        }
    });



    $('.ico-dbsxTab').trigger('click');
    $("#searchFunc img").on('click', function () {
        var value = $('#searchFunc input').val();
        window.open("/bszm-web/apps/views-wrt/simpleCompany/searchFunction.aspx?value=" + value);
    });

    $("#searchFunc input").on("keydown", function (event) {
        event = event ? event : window.event;
        if (event.keyCode == 13) {
            $("#searchFunc img").click();
        }
    });

})();

function initTstxData() {
    $('a.zy,a.sx,a.tz,#break-line').hide();
    var unreadNum = 0;
    getSfxyTstx().then(function (data) {
        if (data.success && !!data.value) {
            tstxData = data;
            for (var i = 0, len = tstxData.value.length; i < len; i++) {
                var item = tstxData.value[i];
                if (item.ydzt === 'N') {
                    unreadNum++;
                }
            }
            if (unreadNum > 0) {
                $('#unread-num').text(unreadNum).show();
            } else {
                $('#unread-num').hide();
            }
            $(".tstxTab").html(template('tstxList', tstxData));
        } else if (data.success && !data.value) {
            $(".tstxTab").html('<img style="margin-left: 250px" src="../../images/home/no-data.png" alt="暂无数据" title="暂无数据">');
        }
        else if (data.message === 'ajaxSessionTimeOut') {
            top.location.reload();
        } else {
            mini.alert(data.message);
        }
        mini.unmask();
    });
}

function showTstxDetails(index) {
    mini.get('tstx-win').show();
    var item = tstxData.value[index];
    $('#tstx-title').html(item.subject);
    $('#tstx-content').html(item.content);
    if (item.sfxyTzlx == '01') {
        $('#tstx-link').html('<a onclick="goSfxy()" class="txt-blue">>>去撤销</a>')

    } else {
        $('#tstx-link').empty();
    }
    // 没有阅读的，点击 查看详情 后改变状态
    if (item.ydzt === 'N') {
        changeTstxStatus(item.sfxyTzlx).then(function (data) {
            if (data.message === 'ajaxSessionTimeOut') {
                top.location.reload();
            }
        });
    }

}
function goSfxy() {
    mini.alert("模拟系统不支持撤销！");
    //window.open('/wszx-web/apps/views/sfxy/sfxyxx.html?code=110703&id=80&_t=' + new Date().getTime());
}