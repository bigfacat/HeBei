$(function () {
    //监听左侧菜单点击事件
    $("body").delegate("#menu li", "click", function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    // $("#mainframe").load(function() {
    //   var mainheight = $(this).contents().find("body").height() + 30;
    //   $(this).height(mainheight);
    // });
    function getUrlParamByName(attrName) {
        var locs = location.href.split("?");
        if (locs.length == 1) {
            return null;
        }
        var params = locs[1].split("&");
        var value = null;
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            if (param[0] == attrName) {
                value = param[1];
                break;
            }
        }

        return value;
    }

    function initMenu() {
        var grxysjcjIndex = '';
        $.ajax({
            url: '/ucenter/api/yhgl/initMenu.ashx',
            type: "get",
            success: function (data) {
                //初始化菜单列表
                var source = {
                    clsName: ['first', 'second', 'three', 'four', 'five'],
                    hashUrl: [],
                    list: []
                };
                for (var i = 1, len = data.length; i < len; i++) {
                    source.hashUrl.push(data[i].url);
                    source.list.push(data[i].menuName);
                    if (data[i].menuName == '个人信息采集') {
                        grxysjcjIndex = i - 1;
                    }
                }
                // source.hashUrl[0] =
                //   "/ucenter/YhglPlat/pages/personInfo/personInfo.html";
                $('#menu').html(template('menuTpl', source));
                //默认初始化第一个菜单账户信息
                var index = getUrlParamByName('target');
                if (index) {
                    $('#menu li').eq(grxysjcjIndex).addClass('selected');
                    $("#mainframe").attr("src", source.hashUrl[grxysjcjIndex]);

                } else {
                    $('#menu li').eq(0).addClass('selected');
                    $("#mainframe").attr("src", source.hashUrl[0]);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    initMenu();
    // var data = {
    //   clsName: ['first', 'second', 'three', 'four'],
    //   hashUrl: ['./views/accountInfo/accountTpl.html',
    //     './views/businessInfo/businessInfoTpl.html',
    //     './views/authorityManager/authorityManagerTpl.html',
    //     './views/modifyPwd/modifyPwdTpl.html'
    //   ],
    //   list: ['账户信息', '企业信息', '授权信息', '个人信息']
    // };
    //初始化菜单
    $('#menu li').eq(0).addClass('selected');

    // //第一次进来默认加载账户信息
    // $('#router').load('./views/accountInfo/accountTpl.html').show();
    // //配置路由跳转模块
    // //账户信息
    // $.routes.add('/accountInfo', function() {
    //   $('#router').load('./views/accountInfo/accountTpl.html').show();
    // });
    // //企业信息
    // $.routes.add('/businessInfo', function() {
    //   $('#router').load('./views/businessInfo/businessInfoTpl.html').show();
    // });
    // //授权管理
    // $.routes.add('/authorityManager', function() {
    //   $('#router').load(
    //     './views/authorityManager/authorityManagerTpl.html').show();
    // });
    // //个人信息
    // $.routes.add('/personInfo', function() {
    //   $('#router').load('./views/personInfo/personInfoTpl.html').show();
    // });
    // //修改密码
    // $.routes.add('/modifyPwd', function() {
    //   $('#router').load('./views/modifyPwd/modifyPwdTpl.html').show();
    // });
});
