/**
 * Created by lizm on 2016/7/27.
 */

stepNav.run=function () {
    stepNav.initSteps([{id: '0', title: '大厅实况', url: 'dtsk_.aspx'}]);
};
$(function () {
    mini.parse();

    var nsrxxData =  wssqUtil.nsrjbxx;
    var tips ; // 异步请求请示信息


    var selectedSwjdDtDm = ''; // 选择业务对应的税务机关代码

    var dtxxDom=$('#swjgList'); // 大厅信息列表 ul

    var specialCity={
        11301810000:'辛集市', // 石家庄市分离出来的
        11306820000:'定州市'  // 保定市分离出来的
    };
    // 当前纳税人的swjgDm
    //var currentSwjgDm = nsrxxData.swjgDm;

    var urlSwjgDm = window.location.search.split('swjgDm=')[1];
    var currentSwjgDm = nsrxxData.zgswjDm;
    var _xzqhDm = nsrxxData.zcdzxzqhszdm; // 纳税人生产注册地的行政区划代码
    if(urlSwjgDm){
        currentSwjgDm = urlSwjgDm;
    }

    // 判断当前纳税人的swjgDm是否是特殊的分离出来的城市
    var special = specialCity[currentSwjgDm];
    if(special){
        setCurrentCity(special,currentSwjgDm);
    }


    //税务机关代码前五位对应到市级
    var currentXzqhDm = currentSwjgDm.substr(0,5);

    // 查询城市列表
    var cityList = yybsService.getXzqhList();
    try{
        if (cityList.success && cityList.value != '') {
            cityList = cityList.value;
            var html = '', xzqhDm='';

            for (var i = 0; i < cityList.length; i++) {
                // 设置当前 市级
                xzqhDm = cityList[i].swjgDm.substr(0,5);
                if(!specialCity[cityList[i].swjgDm] && (currentXzqhDm == xzqhDm)){
                    setCurrentCity(cityList[i].xzqhmc,cityList[i].swjgDm,cityList[i].xzqhsz);
                }
                // 组织下拉列表
                html += '<li class="cityItem" data-xzqhsz="'+ cityList[i].xzqhsz +'" data-swjgdm="' + cityList[i].swjgDm + '">' + cityList[i].xzqhmc + '</li>'
            }
            $('#cityList').html(html);
        }else{
            $('#cityList').empty();
            mini.alert(cityList.message);
            return false;
        }
    }catch (e){
        console.log(e);
    }


    // 设置当前城市
    function setCurrentCity(name,swjgDm,xzqhsz) {
        $('#currentCity').html(name).attr('data-swjgdm',swjgDm).attr('data-xzqhsz',xzqhsz);
        renderCounty(xzqhsz);
    }

    function setCurrentCounty(name,xzqhsz) {
        $('#currentCounty').html(name).attr('data-xzqhsz',xzqhsz);
        var _sjdqDm = $('#currentCity').attr('data-swjgdm');
        renderDtxx(_sjdqDm,xzqhsz);
    }

    // 去取号按钮，切换到远程取号页面
    var search = location.search;
    $('#go-qh').click(function () {
        location.href = location.href.replace(search,'').replace('dtsk.html', 'ycqh.html?swjgDm='+selectedSwjdDtDm);
    });
    // 去预约按钮，切换到我要预约
    $('#go-yy').click(function () {
        location.href = location.href.replace(search,'').replace('dtsk.html', 'wyyy.html?swjgDm='+selectedSwjdDtDm);
    });


    //切换城市按钮，显示城市列表
    $('.changeCity').click(function () {
        $('.cityList').toggle();
        $('.countyList').hide();
        //阻止冒泡
        if (document.all) {
            window.event.cancelBubble = true;
        } else {
            event.stopPropagation();
        }
    });

    //切换区县按钮，显示区县列表
    $('.changeCounty').click(function () {
        $('.countyList').toggle();
        $('.cityList').hide();
        //阻止冒泡
        if (document.all) {
            window.event.cancelBubble = true;
        } else {
            event.stopPropagation();
        }
    });

    //点击页面其他地方 ，城市列表关闭
    document.onclick = function () {
        $('.cityList').hide();
        $('.countyList').hide();
    };

    // 切换城市
    $('.cityItem').click(function () {
        $('#currentCity').text($(this).text());
        $('#currentCounty').text('选择区县').removeAttr('data-swjgdm');
        $('#swjgList').empty();

        var xzqhsz = $(this).attr('data-xzqhsz');

        renderCounty(xzqhsz);
    });

    // 切换区县
    $('.countyList').delegate('.countyItem','click',function () {
        $('#currentCounty').text($(this).text());
        //var swjgDm = $(this).attr('data-swjgdm');
        var _sjdqDm = $('#currentCity').attr('data-swjgdm');
        var xzqhsz = $(this).attr('data-xzqhsz');
        renderDtxx(_sjdqDm,xzqhsz);
    });

    // 获取区县
    function renderCounty(xzqhsz) {
        var countyList = yybsService.getCountyList(xzqhsz);
        if (countyList.success && countyList.value != '') {
            countyList = countyList.value;
            var html = '',flag=false;

            for (var i = 0; i < countyList.length; i++) {
                // 设置当前 区县
                //xzqhDm = countyList[i].swjgDm.substr(0,5);

                if(countyList[i].xzqhsz == _xzqhDm){
                    flag=true;
                    setCurrentCounty(countyList[i].xzqhmc,countyList[i].xzqhsz);
                }
                // 组织下拉列表
                html += '<li class="countyItem" data-xzqhsz="'+ countyList[i].xzqhsz +'">' + countyList[i].xzqhmc + '</li>'
            }
            $('#countyList').html(html);
            // 如果没有匹配到，默认去第一个
            if(!flag){
                setCurrentCounty(countyList[0].xzqhmc,countyList[0].xzqhsz);
            }


        }else{
            $('#countyList').empty();
            mini.alert(countyList.message!=null?countyList.message:'');
            return false;
        }
    }

    // 渲染大厅信息
    //var initArr=[];
    function renderDtxx(_sjdqDm,xzqhsz) {
        var html='',yysxList='';
        var _dtxx = yybsService.getSwjgdt(xzqhsz);
        var dtxxTr = $('.dtxx-tr').first().clone();
        var dtxxTd = $('.blsxItem').first().clone();
        if(_dtxx.success && _dtxx.value !=''){
            var dtxx = [],ulHeight = 0,scrollDiv = $('#scrollDiv');
            for(var dm in _dtxx.value){
                $.merge(dtxx,_dtxx.value[dm]);
            }

            // 获取当前税务机关对应的业务说明信息
            tips = yybsService.getYysxTips(_sjdqDm);
            if(tips.success && tips.value!=''){
                tips=tips.value;
            }
            // 设置税务机关信息，以及对应的业务信息
            for(var i=0;i<dtxx.length;i++){
                $(dtxxTr).find('.swjgMc').text(dtxx[i].swjgMc); // 税务机关名称
                $(dtxxTr).find('.lxdh').text(dtxx[i].lxdh);     // 联系电话
                $(dtxxTr).find('.dtdz').text(dtxx[i].dtdz);     // 大厅地址
                $(dtxxTr).find('.mapTag').attr('data-address',dtxx[i].dtdz); // 地图大厅地址
                var swjgDm = dtxx[i].swjgDm;
                var swjgDtDm = dtxx[i].dtDm;
                //实时排队情况
                yysxList = dtxx[i].sspdqk;
                // 行数 ， 每行3条
                var lines = Math.ceil(yysxList.length/3);
                var trHtml = '';

                for (var j = 1; j < lines+1; j++) {
                    var tdHtml='';
                    var arr=[1,2,3];
                    for (var k = (j-1)*3; k < Math.min( j * 3,yysxList.length); k++) {
                        $(dtxxTd).find('.blsxTitle').html(yysxList[k].yysxDlMc);
                        $(dtxxTd).find('.blsxPdrs').text(yysxList[k].ddrs);
                        $(dtxxTd).find('.blsxDqsl').text(yysxList[k].dqslhm);

                        // 业务事项小类
                        var tipArr = tips[yysxList[k].yysxDlDm];
                        if(!!tipArr){
                            $(dtxxTd).find('.blsx-dl').attr('data-ywsxxl',tipArr.toString());
                        }else{
                            $(dtxxTd).find('.blsx-dl').attr('data-ywsxxl','');
                        }

                        tdHtml += '<td class="blsxItem">'+$(dtxxTd).html()+'</td>';
                        arr.pop();
                    }
                    for (var m = 0; m < arr.length; m++) {
                        tdHtml += '<td class="blsxItem"></td>';
                    }

                    trHtml += '<tr class="blsxList" data-dtdm="'+ swjgDtDm +'"data-swjgdtdm="'+ swjgDm +'">' + tdHtml + '</tr>';
                }
                html +='<li>' +
                            '<table class="swjgItem">' +
                                '<tr class="dtxx-tr">' + dtxxTr.html() + '</tr>' + trHtml +
                            '</table>' +
                       '</li>';

            }

            dtxxDom.html(html);

            if (dtxx.length > 0) {
                $('.dtsk-options').show();
            }else{
                $('.dtsk-options').hide();
            }
            ulHeight = $('#swjgList').height();
            if (ulHeight > 550) {
                //initArr.push(xzqhsz);
                // 大厅信息列表切换
                //$("#scrollDiv").Scroll({line: 3, speed: 1000, timer: 0, up: "btn-up", down: "btn-down"});
                //$('#scrollDiv').slideDown
                
                $('#btn-down').click(function () {
                    scrollDiv.animate({height:ulHeight + 'px'});
                });
                $('#btn-up').click(function () {
                    scrollDiv.animate({height:'530px'});
                })
            }
            $('.cityList').hide();
            $('.countyList').hide();

        }else{
            $('#swjgList').empty();
            $('.cityList').hide();
            $('.countyList').hide();
            mini.alert(_dtxx.message);
            return false;
        }

    }


    // 点击某一个税务事项,鼠标悬浮事件
    $('#swjgList').delegate('.blsx-dl','click',function () {
        selectedSwjdDtDm = $(this).parent().parent().attr('data-dtdm');

        var width = $(this).parent().width() + 3;
        $('#scrollDiv').find('.active').removeClass('active');
        $(this).addClass('active').css('width', width);
    }).delegate('.blsx-dl','mouseenter',function (){
        var text = $(this).attr('data-ywsxxl').replace(/,/g,'，');
        if(text==''){
            return;
        }
        var height = Math.ceil(text.length / 25) * 20;
        var left = $(this).offset().left +  45;
        var top = $(this).offset().top - height -28;

        $('.tooltip-content').text(text);
        $('.ywsxxl').css({top:top,left:left,height:height}).show();
    }).delegate('.blsx-dl','mouseleave',function (){
        $('#ywsxxl').hide();
    });

    //地图
    $('#scrollDiv').delegate('.mapTag','click',function () {
        $(document).scrollTop(0);
        var address = $(this).attr('data-address');
        mini.open({
            url: "map.aspx",
            title: "百度地图-" + address,
            width: 880,
            height: 560,
            onload: function () {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.setSrc(address);
            },
            ondestroy: function (action) {

            }
        });
    });

});
