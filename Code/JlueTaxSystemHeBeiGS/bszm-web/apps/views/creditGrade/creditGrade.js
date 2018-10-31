/**
 * Created by mjial on 2017-2-14.
 * Modified by lizm on 2017-4-27.
 */
$(function () {
    var $creditCon = $(".creditCon");
    var $personCon = $(".personCon");

    // 左侧菜单点击切换效果
    $(".creditCenter").on('click', '.menuBtn', function () {

        $(this).addClass('active').siblings().removeClass('active');
        var cls = $(this).attr('class');
        var vis = $creditCon.is(':visible');
        if (cls.indexOf('credit') > -1 && !vis) {
            $creditCon.show();
            $personCon.hide();
            getCreditInfo(djxh);
        }
        vis = $personCon.is(':visible');
        if (cls.indexOf('person') > -1 && !vis) {
            $creditCon.hide();
            $personCon.show();
        }
    });
    $('#complete-info').on('click', function () {
        $(parent.document).find('.menuUl li').eq(1).click();
        var index = top.location.href.indexOf('personPage.html') > -1 ? 3 : 4;
        window.location.href = '/ucenter/YhglPlat/index.aspx?target=' + index;
    });

    function getCreditInfo(djxh) {
        getCompanyCreditInfo(djxh).then(function (data) {
            if (data.success) {
                for (var p in data.value) {
                    if (p == 'syqys' || p == 'xyqys') {
                        if (!data.value[p]) {
                            return;
                        }
                        var html = '';
                        for (var i = 0, len = data.value[p].length; i < len; i++) {
                            html += '<li>' + data.value[p][i] + '</li>';
                        }
                        $('#' + p).html('<ul>' + html + '</ul>')
                    } else {
                        $('#' + p).text(data.value[p] || '');
                    }


                }
            } else {
                mini.alert(data.message);
            }
        });
    }
    // 绘制企业行用，个人信用 雷达图
    var personChart = echarts.init(document.getElementById('person-chart'));
    var fullName = store.getSession('getUserInfo').AccountInfo.fullName;
    var personOption = {
        title: {   //标题
            text: '个人信用影响因素'
        },
        color: ['#33ccff'],
        tooltip: {   //提示框，鼠标悬浮交互时的信息提示
            show: true,
            trigger: 'axis'
        },
        legend: {    //图例，每个图表最多仅有一个图例
            x: 'center',
            data: [fullName]
        },
        polar: [{    //极坐标
            indicator: [{ text: '身份特质', max: 100 },
                { text: '履职能力', max: 100 },
                { text: '行为偏好', max: 100 },
                { text: '人际关系', max: 100 },
                { text: '信用记录', max: 100 }
            ],
            radius: 100,
            startAngle: 90,   // 改变雷达图的旋转度数
        }],

        series: [{         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
            name: '信用评分',
            type: 'radar',
            itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: [{
                value: [81, 79, 80, 93, 87],      //外部加载，也可以通过ajax去加载外部数据。
                name: fullName
            }]
        }]
    };
    personChart.setOption(personOption, true);
    $personCon.hide();
    //请求企业信用数据
    var nsrInfo = store.getSession('getUserInfo').NsrInfo;
    var djxh = nsrInfo ? nsrInfo.djxh : null;
    if (!!djxh) {
        var companyChart = echarts.init(document.getElementById('company-chart'));
        var nsrmc = store.getSession('getUserInfo').NsrInfo.gsNsrmc;
        var companyOption = {
            title: {   //标题
                text: '企业信用影响因素'
            },
            tooltip: {   //提示框，鼠标悬浮交互时的信息提示
                show: true,
                trigger: 'axis'
            },
            legend: {    //图例，每个图表最多仅有一个图例
                x: 'center',
                data: [nsrmc]
            },
            polar: [{    //极坐标
                indicator: [{ text: '单位特质', max: 100 },
                    { text: '信用记录', max: 100 },
                    { text: '财务能力', max: 100 },
                    { text: '客户关系', max: 100 }
                ],
                radius: 100,
                startAngle: 90   // 改变雷达图的旋转度数
            }],

            series: [{         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
                name: '信用评分',
                type: 'radar',
                itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [{
                    value: [81, 79, 80, 87],      //外部加载，也可以通过ajax去加载外部数据。
                    name: nsrmc
                }]
            }]
        };
        companyChart.setOption(companyOption, true);
        getCreditInfo(djxh);

    } else {
        $creditCon.hide();
        $personCon.show();
        $('.creditBtn').remove();
        $('.personBtn').addClass('active');
    }
});