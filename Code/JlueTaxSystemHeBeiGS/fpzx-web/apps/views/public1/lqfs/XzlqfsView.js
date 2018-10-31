/**
 * Created by mjial on 2017-2-20.
 */
var lqfs = {};
lqfs.selected = '01';//设置默认选中第一个
lqfs.className;
lqfs.swsxDm = Tools.getUrlParamByName('code');//获取税务事项代码

(function () {
    /*点击选择领取方式按钮*/
    $(document).on("click", ".xzlqfs-step .nav li", function () {
        //$(".nav li").click(function () {
        var className = $(this).attr("data-type");
        lqfs.className = className;
        lqfs.selected = $(this).attr("data-num");
        $(this).addClass("checked").siblings().removeClass("checked");
        /*       $(this).find("img").attr("src", "../../images/public/ico-checked.png");*/
        /*        $("li").not(".checked").find("img").removeAttr("src");*/

        if (className != "type-post") {
            $("." + className).css("display", "block").siblings().css("display", "none");
            $(".wc-post").css("display", "none");
            $(".success").css("margin-top", "120px")
        } else {
            $(".post").css("display", "block").siblings().css("display", "none");
            $(".wc-post").css("display", "block");
            $(".success").css("margin-top", "0px");
            checkFpdwzl();
        }
        $(".wizard>.content").css("height", "");
    });
})();
//获取领票方式
function getTicketsWay() {
    $.ajax({
        url: "/fpzx-web/api/base1/query/lqfs/''/" + lqfs.swsxDm + ".ashx",
		//url: "/fpzx-web/api/base1/query/lqfs/''/110209.ashx",
        type: "POST",
        async: false,
        success: function (data) {
            var resultData = mini.decode(data);
            if (resultData.length > 0) {
                if (lqfs.swsxDm == '110209') {

                    if (lqfs.fpdwzl == null || lqfs.fpdwzl == undefined || lqfs.fpdwzl == '' || lqfs.fpdwzl == 0) {//发票单位重量
                        $(".xzlqfs-step .nav li").hide();
                        //隐藏温馨提示第三条
                        $('#xxyj-text').hide();
                        $.each(resultData, function (i, res) {
                            if (res.id == '03') {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") != '03' && $(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            } else {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            }
                        })
                        // $.each(resultData,function(i,res){
                        //     if(res.id=='03'){
                        //         $(".xzlqfs-step .nav li").each(function(){
                        //             if($(this).attr("data-num")!='03'){
                        //                 $(this).css("display", "inline-block");
                        //             }
                        //         });
                        //     }else {
                        //         $(".xzlqfs-step .nav li").each(function () {
                        //             if ($(this).attr("data-num") == res.id) {

                        //                 $(this).css("display", "inline-block");
                        //                 return false;
                        //             }
                        //         });
                        //     }
                        // });
                    } else {
                        $(".xzlqfs-step .nav li").hide();
                        $.each(resultData, function (i, res) {
                            $(".xzlqfs-step .nav li").each(function () {
                                if ($(this).attr("data-num") == res.id) {
                                    $(this).css("display", "inline-block");
                                    return false;
                                }
                            });
                        });
                    }
                } else if (lqfs.swsxDm == '110212' || lqfs.swsxDm == '110214') {
                    $(".xzlqfs-step .nav li").hide();
                    //隐藏温馨提示第三条
                    $('#xxyj-text').hide();
                    $.each(resultData, function (i, res) {
                        $(".xzlqfs-step .nav li").each(function () {
                            if ($(this).attr("data-num") == res.id) {
                                $(this).css("display", "inline-block");
                                return false;
                            }
                        });
                    });

                }
            }
        },
        error: function (err) {
            mini.alert(err);
        }
    });
}
//校验领取的其中一项为fpdwzl是否为零
function checkFpdwzl(className) {
    var flag = true;
    if (lqfs.className == 'type-post') {
        $.each(lqData, function (index, item) {
            if (item.fpdwzl == '0') {
                mini.alert("您好，您选择的" + item.fpzlMc + "暂不支持邮寄，请选择大厅自助终端领取或大厅工作窗口领取！", '提示信息', function () {
                    lqfs.selected = '01';
                });
                flag = false;
                return;
            }
        })
    } else {
        flag = true;
    }

    return flag;
}

//获取领票方式
function getGsTicketsWay() {
    $.ajax({
        url: "../../../api/base1/query/lqfs/" + lqfs.swsxDm,
		//url: "/fpzx-web/api/base1/query/lqfs/''/110209.ashx",
        type: "POST",
        async: false,
        success: function (data) {
            var resultData = mini.decode(data);
            if (resultData.length > 0) {
                if (lqfs.swsxDm == '110209') {

                    if (lqfs.fpdwzl == null || lqfs.fpdwzl == undefined || lqfs.fpdwzl == '' || lqfs.fpdwzl == 0) {//发票单位重量
                        $(".xzlqfs-step .nav li").hide();
                        //隐藏温馨提示第三条
                        $('#xxyj-text').hide();
                        $.each(resultData, function (i, res) {
                            if (res.id == '03') {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") != '03' && $(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            } else {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            }
                        });
                    } else {
                        $(".xzlqfs-step .nav li").hide();
                        $.each(resultData, function (i, res) {
                            $(".xzlqfs-step .nav li").each(function () {
                                if ($(this).attr("data-num") == res.id) {
                                    $(this).css("display", "inline-block");
                                    return false;
                                }
                            });
                        });
                    }
                } else if (lqfs.swsxDm == '110212' || lqfs.swsxDm == '110214') {
                    $(".xzlqfs-step .nav li").hide();
                    //隐藏温馨提示第三条
                    $('#xxyj-text').hide();
                    $.each(resultData, function (i, res) {
                        $(".xzlqfs-step .nav li").each(function () {
                            if ($(this).attr("data-num") == res.id) {
                                $(this).css("display", "inline-block");
                                return false;
                            }
                        });
                    });

                }
            }
        },
        error: function (err) {
            mini.alert(err);
        }
    });
}
lqfs.xydj = JSON.parse(sessionStorage.getItem('getUserInfo')).xydj;

//获取领票方式
function getTicketsWay() {
    $.ajax({
        url: "/fpzx-web/api/base1/query/lqfs/''/" + lqfs.swsxDm + ".ashx",
		//url: "/fpzx-web/api/base1/query/lqfs/''/110209.ashx",
        type: "POST",
        async: false,
        success: function (data) {
            var resultData = mini.decode(data);
            if (resultData.length > 0) {
                if (lqfs.swsxDm == '110209') {
                    var xydjArr = ['A', 'B', 'C'];
                    if ($.inArray(lqfs.xydj, xydjArr) === -1) {
                        $('li[data-type="type-post"]').remove();
                        $('#xxyj-text').hide();
                    }
                    if (!lqfs.fpdwzl || lqfs.fpdwzl == 0) {//发票单位重量
                        $(".xzlqfs-step .nav li").hide();
                        //隐藏温馨提示第三条
                        $('#xxyj-text').hide();
                        $.each(resultData, function (i, res) {
                            if (res.id == '03') {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") != '03' && $(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            } else {
                                $(".xzlqfs-step .nav li").each(function () {
                                    if ($(this).attr("data-num") == res.id) {
                                        $(this).css("display", "inline-block");
                                    }
                                });
                            }
                        })
                    } else {
                        $(".xzlqfs-step .nav li").hide();
                        $.each(resultData, function (i, res) {
                            $(".xzlqfs-step .nav li").each(function () {
                                if ($(this).attr("data-num") == res.id) {
                                    $(this).css("display", "inline-block");
                                    return false;
                                }
                            });
                        });
                    }
                } else if (lqfs.swsxDm == '110212' || lqfs.swsxDm == '110214') {
                    $(".xzlqfs-step .nav li").hide();
                    //隐藏温馨提示第三条
                    $('#xxyj-text').hide();
                    $.each(resultData, function (i, res) {
                        $(".xzlqfs-step .nav li").each(function () {
                            if ($(this).attr("data-num") == res.id) {
                                $(this).css("display", "inline-block");
                                return false;
                            }
                        });
                    });
                }

            }
        },
        error: function (err) {
            mini.alert(err);
        }
    });
}