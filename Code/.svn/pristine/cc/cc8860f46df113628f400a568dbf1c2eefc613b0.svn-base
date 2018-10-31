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
        var url = blztApi.queryBlzt + blzt.sqxh+".ashx";

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
                if(blzt.czztDm=='05'){
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
    var wcZtdm = ['01','02','04','05']; // 定义跳转到完成页面的状态代码

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
        url: '../public1/sqzl/viewSqzl.aspx',
        title: '我的申请资料',
        width: 1200,
        height: 600,
        allowResize: true,
        allowDrag: true,
        onload: function () {
            var iframe = this.getIFrameEl();
            //调用弹出页面方法进行初始化
            var data = mini.clone(blzt.viewData);
            iframe.contentWindow.sqzl.initPage(blzt.ylUrl, data,blzt.ylCss);

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
            ajax.post(blztApi.cancelApply,mini.encode(params),function (result) {
                if(result.success){
                    mini.alert('撤销成功','提示',function () {
                        wssqUtil.closeWin();
                    })
                    return false;
                }else{
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
            if(window.parent.blzt.czztDm == '02'){
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
            if(isqs){
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
