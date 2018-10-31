/**
 * Created by yuepu on 2017/5/9.
 */
/**
 * Created by mjial on 2017-2-7.
 */
var commonData = '';
var allFunctionsData = '';
(function () {
    var customStatus = false;//点击自定义按钮状态
    //存储当前模式
    store.setSession('curMode', 'P');
    initPage();//页面初始化
    initXdRobot();
    //点击全部功能Tab
    $(".allTab a").each(function (i) {
        $(this).click(function () {
            $(".allTab a").removeClass('active');
            $(this).addClass('active');
            var that = this;
            if (customStatus) {
                $(".qbgnUlEdit").hide();
                $(".qbgnUlEdit").each(function (i) {
                    if ($(".qbgnUlEdit").eq(i).hasClass(that.id)) {
                        $(".qbgnUlEdit").eq(i).show().siblings().hide();
                    }
                });
            } else {
                $(".qbgnUl").hide();
                $(".qbgnUl").each(function (i) {
                    if ($(".qbgnUl").eq(i).hasClass(that.id)) {
                        $(".qbgnUl").eq(i).show().siblings().hide();
                    }
                });
            }
        });
    });
    function initTab() {//请求常用功能数据/已办事项数据
        //请求常用功能数据
        commonFunctions().then(function (data) {
            mini.unmask();
            data = mini.decode(data);
            if (data.success) {
                commonData = data;
                store.setSession('commonFunctions', data);
                $(".cygnUl").html(template('cygnUlHtml', data));
            } else {
                if (data.message == 'ajaxSessionTimeOut') {
                    window.location.reload();
                } else {
                    mini.alert(data.message);
                }
            }
        });
    }
    function initPage() {
        mini.mask("loading...");
        //请求常用功能数据
        initTab();
        //请求全部功能数据
        if (store.hasSession('allFunctions')) {
            allFunctionsData = store.getSession('allFunctions');
            $(".qbgnDiv").html(template('qbgnUlHtml', allFunctionsData));
            initCss();
        } else {
            allFunctions().then(function (data) {
                data = mini.decode(data);
                if (data.success) {
                    allFunctionsData = data;
                    store.setSession('allFunctions', data);
                    $(".qbgnDiv").html(template('qbgnUlHtml', data));
                    initCss();
                } else {
                    if (data.message == 'ajaxSessionTimeOut') {
                        window.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                }
            });
        }
    }

    function initCss() {
        $(".qbgnUl").hide();
        $(".qbgnUl").each(function (i) {
            if ($(".qbgnUl").eq(i).hasClass($(".allTab a.active")[0].id)) {
                $(".qbgnUl").eq(i).show().siblings().hide();
            }
        });
        $(".ico-ybsxTab").show();
        customStatus = false;
    }
   
})();

function mnsetfunction() {
    mini.alert("模拟系统不支持自定义！");
}