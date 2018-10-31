/**
 * @Author: yuepu
 * @Last modified by:zhouqy
 * @Date: 2017-02-10
 * @description:票种核定common
 */

//定义票种核定模块命名空间
var pzhd = {
    arrPzhdedInfo: [],
    nsrStateInfo: {},
    showGprGridData: null,
    isDefpStyle: false,
    isExistPzhds: false, //是否存在票种核定
    isExistPzhdsTz: false,
    isSupportTz: true, //系统是否支持票种核定调整
    pzhdsqspMxGrid: null, //提交的发票种类数据
    arrLprxxData: [], //调整时已选领票人数据
    strParseQueryUrl: location.href.split("&")[1].split("=")[0],
    isOnlyChangLpr: false, //是否只改了领票人
    nsrStateObj: {
        //01:个体工商户起征点以上 只有普通发票
        getGtysData: function() {
            var o = [{
                fpzlmc: "增值税普通发票",
                fpzlDm: pzhdCommon.fpStyleCode.zzspt,
                defpbz: "N"
            }];
            var arrFpme = ["100000", "10000", "1000"];
            var arrTopCount = [10, 25, 100];
            var index = 0;
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            for (var key in data) {
                if (data[key] && data[key] !== "") {
                    o[0].fpme = arrFpme[index];
                    o[0].cpzgsl = data[key];
                    o[0].topCount = arrTopCount[index];
                    break;
                }
                index++;
            }
            return o;
        },
        //02:个体工商户起征点以下-餐饮业  专票 普票 手工 定额
        getGtyxData: function() {
            var o = [];
            var arrFpme = ["1000", "1000", "50", "10", "5", "1"];
            var arrTopCount = [25, 1, 100, 100, 100, 100];
            var arrFpzlmc = ['增值税普通发票', '手工E版发票',
                '定额发票', '定额发票', '定额发票', '定额发票'
            ];
            var index = 0;
            var ptDm = pzhdCommon.fpStyleCode.zzspt;
            var sg = pzhdCommon.fpStyleCode.sg;
            var de = pzhdCommon.fpStyleCode.defp;
            var arrFpzlDm = [ptDm, sg, de[0], de[1], de[2], de[3]];
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            for (var key in data) {
                if (data[key] && data[key] !== "") {
                    o.push({
                        fpme: arrFpme[index],
                        cpzgsl: data[key],
                        topCount: arrTopCount[index],
                        fpzlmc: arrFpzlmc[index],
                        fpzlDm: arrFpzlDm[index],
                        defpbz: "Y"
                    });

                }
                index++;
            }
            return o;
        },
        //03:增值税小规模纳税人 专票 普票
        getZzsxgmData: function() {
            var o = [];
            var arrFpme = ["100000", "10000", "1000", "10000", "1000"];
            var arrTopCount = [10, 25, 100, 25, 100];
            var arrFpzlmc = ['增值税普通发票', '增值税普通发票',
                '增值税普通发票', '增值税专用发票', '增值税专用发票'
            ];
            var arrFpzlmc = ['增值税普通发票', '增值税普通发票',
                '增值税普通发票', '增值税专用发票', '增值税专用发票', '增值税专用发票'
            ];
            var ptDm = pzhdCommon.fpStyleCode.zzspt;
            var zyDm = pzhdCommon.fpStyleCode.zzszy;
            var arrFpzlDm = [ptDm, ptDm, ptDm, zyDm, zyDm, zyDm];
            var index = 0;
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            for (var key in data) {
                if (data[key] && data[key] !== "") {
                    o.push({
                        fpme: arrFpme[index],
                        cpzgsl: data[key],
                        topCount: arrTopCount[index],
                        fpzlmc: arrFpzlmc[index],
                        fpzlDm: arrFpzlDm[index],
                        defpbz: "N"
                    });
                }
                index++;
            }
            return o;
        },
        //04:增值税一般纳税人
        getZzsybData: function() {
            var o = [];
            var arrFpme = ["100000", "10000", "1000", "100000", "10000", "1000"];
            var arrTopCount = [10, 25, 100, 10, 25, 100];
            var arrFpzlmc = ['增值税普通发票', '增值税普通发票',
                '增值税普通发票', '增值税专用发票', '增值税专用发票', '增值税专用发票'
            ];
            var ptDm = pzhdCommon.fpStyleCode.zzspt;
            var zyDm = pzhdCommon.fpStyleCode.zzszy;
            var arrFpzlDm = [ptDm, ptDm, ptDm, zyDm, zyDm, zyDm];
            var index = 0;
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            for (var key in data) {
                if (data[key] && data[key] !== "") {
                    o.push({
                        fpme: arrFpme[index],
                        cpzgsl: data[key],
                        topCount: arrTopCount[index],
                        fpzlmc: arrFpzlmc[index],
                        fpzlDm: arrFpzlDm[index],
                        defpbz: "N"
                    });
                }
                index++;
            }
            return o;
        },
        // 非餐饮业
        getFcyyData: function() {
            var o = [];
            var arrFpme = ["1000", "100"];
            var arrTopCount = [25, 1];
            var arrFpzlmc = [
                '增值税普通发票', '手工E版发票'
            ];
            var index = 0;
            var ptDm = pzhdCommon.fpStyleCode.zzspt;
            var sg = pzhdCommon.fpStyleCode.sg;
            var arrFpzlDm = [ptDm, sg];
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            for (var key in data) {
                if (data[key] && data[key] !== "") {
                    o.push({
                        fpme: arrFpme[index],
                        cpzgsl: data[key],
                        topCount: arrTopCount[index],
                        fpzlmc: arrFpzlmc[index],
                        fpzlDm: arrFpzlDm[index],
                        defpbz: "N"
                    });
                }
                index++;
            }
            return o;
        }
    },
    pzhdtzInfo: function(ispz,jldwmc){
        if (ispz) {
                $(function() {
                    $("#pztzq").show();
                })
            }else{
                $("#pztzq").hide();
            }
        if (location.href.indexOf('bz=tz') !== -1) {
            $.map(pzhd.arrPzhdedInfo,function(item, index) {
                item.jldwmc = jldwmc;
            })
            // pzhd.arrPzhdedInfo[0].jldwmc = '份';
            mini.get("showTzqLpContent").setData(pzhd.arrPzhdedInfo);
        }
    },
    initYlView: function(ispz, islpr) {
        if (pzhd.nsrStateInfo.value.nsrRole === "01") {
            var data = pzhd.nsrStateObj.getGtysData();
            pzhd.pzhdsqspMxGrid = {
                "pzhdsqspMxGridlb": data
            };
            data[0].jldwmc = '份';
            mini.get("showLpContent").setData(data);
            //显示调整前的值
            pzhd.pzhdtzInfo(ispz,'份');
        }
        if (pzhd.nsrStateInfo.value.nsrRole === "02") {
            var data = pzhd.nsrStateObj.getGtyxData();
            pzhd.pzhdsqspMxGrid = {
                "pzhdsqspMxGridlb": data
            };
            //fpzldm 000008101200 "增值税普通发票"
            //fpzldm 113004100360 手工E票
            if (data[0].fpzlDm == '000008101200') {
                data[0].jldwmc = '份';
                pzhd.pzhdtzInfo(ispz,'份');

            } else if (data[0].fpzlDm == '113004100360') {
                pzhd.pzhdtzInfo('本');
                data[0].jldwmc = '本';
            } else {
                $.map(data,function(item, index) {
                    item.jldwmc = '本';
                })
                pzhd.pzhdtzInfo(ispz,'本');

            }
            mini.get("showLpContent").setData(data);

        }

        if (pzhd.nsrStateInfo.value.nsrRole === "03") {
            var data = pzhd.nsrStateObj.getZzsxgmData();
            pzhd.pzhdsqspMxGrid = {
                "pzhdsqspMxGridlb": data
            };
            data[0].jldwmc = '份';
            mini.get("showLpContent").setData(data);
             pzhd.pzhdtzInfo(ispz,'份');
        }
        if (pzhd.nsrStateInfo.value.nsrRole === "04") {
            var data = pzhd.nsrStateObj.getZzsybData();
            pzhd.pzhdsqspMxGrid = {
                "pzhdsqspMxGridlb": data
            };
            $.map(data,function(item,index){
                item.jldwmc = '份';
            })
            mini.get("showLpContent").setData(data);
            pzhd.pzhdtzInfo(ispz,'份');

        }
        if (pzhd.nsrStateInfo.value.nsrRole === "05") {
            var data = pzhd.nsrStateObj.getFcyyData();
            pzhd.pzhdsqspMxGrid = {
                "pzhdsqspMxGridlb": data
            };

            if (data[0].fpzlDm == '000008101200') {
                data[0].jldwmc = '份';
                 pzhd.pzhdtzInfo(ispz,'份');

            } else {
                data[0].jldwmc = '本';
                 pzhd.pzhdtzInfo(ispz,'本');
            }
            mini.get("showLpContent").setData(data);
        }
        var showGprList = mini.get('showGprList');
        var showTzqGprList = mini.get('showTzqGprList');
        var showNewGprGridData = [];
        for (var i = 0; i < pzhd.showGprGridData.length; i++) {
            showNewGprGridData.push({
                loginname: pzhd.showGprGridData[i].loginname,
                sfzhm: pzhd.showGprGridData[i].sfzhm,
                phone_num: pzhd.showGprGridData[i].phone_num,
                position_name: pzhd.showGprGridData[i].position_name
            });
        }

        if (islpr) {
            $(function() {
                $("#lprtzq").show();
                var arrLprxxData = [];
                for(var i=0;i<pzhd.arrLprxxData.length;i++){
                        arrLprxxData.push({
                            loginname: pzhd.arrLprxxData[i].loginname,
                            sfzhm: pzhd.arrLprxxData[i].sfzhm,
                            phone_num: pzhd.arrLprxxData[i].phone_num,
                            position_name: pzhd.arrLprxxData[i].position_name
                        })
                    }

                showTzqGprList.setData(arrLprxxData);
            })

        }else{
            $("#lprtzq").hide();
        }
        showGprList.setData(showNewGprGridData);
    }
};
var chooseGrid, fbzlGrid, bszlGrid ,fpdefpForm;

function getNsrState(nsrStateData) {
    var url = "";
    //个体工商户起征点以上
    if (nsrStateData.nsrRole === '01') {
        url = 'XzpzsView.html';
    }
    //个体工商户起征点以下-餐饮业
    if (nsrStateData.nsrRole === '02') {
        url = 'XzpzView.html';
        $(function() {
            $("#fp-defp .deTotal").text(nsrStateData.ynsjye);
        })
    }
    //增值税小规模纳税人
    if (nsrStateData.nsrRole === '03') {
        url = 'XzpzXgm.html';
    }
    //增值税一般纳税人
    if (nsrStateData.nsrRole === '04') {
        url = 'XzpzYbns.html';
    }
    // 个体工商户起征点以下-非餐饮业
    if (nsrStateData.nsrRole === '05') {
        url = 'XzpzFcyy.html';

    }
    return url;
}
//获取纳税人状态类型 01:个体工商户起征点以上；02：个体工商户起征点以下；03：增值税小规模纳税人；
//04：增值税一般纳税人;05:个体工商户起征点以下-非餐饮业
pzhdService.initFirstStepsNsrState(function(data) {
    pzhd.nsrStateInfo = data;
	//待删除
	// pzhd.nsrStateInfo.value.nsrRole = '02';
	// pzhd.nsrStateInfo.value.ynsjye = 20000;
}, function(err) {
    mini.alert(data.message);
});

stepNav.wizard = $('#wizard');
stepNav.run = function() {
    var nsrStateUrl = '';
    //获取纳税人类型
    if (pzhd.nsrStateInfo.success) {
        nsrStateUrl = getNsrState(pzhd.nsrStateInfo.value);
    } else {
        mini.alert(pzhd.nsrStateInfo.message);
        return;
    }
    if (location.href.indexOf('bz=tz') !== -1) {
        //存在票种核定，票种核定调整页面，初始化已票种核定数据
        pzhdService.getPzhdInfo().then(function(data) {
            //初始化已核定的票种信息
            document.title = "票种核定调整";
            $('.breadcrumb-Nav').find('span').text('票种核定调整');

            if (!data.success) {
                var msg = data.message || '获取票种核定数据失败！';
                mini.alert(msg);
                return false;
            }
            var pzhdData = data.value;
            for (var i = 0, len = pzhdData.length; i < len; i++) {
                if (Number(pzhdData[i].dffpzgkpxe) > 100000) {
                    mini.alert('暂不支持单份最高开票限额大于10万元的发票票种核定调整，您需要去大厅前台办理，由此给您带来不便，敬请谅解！','提示',function () {
                        window.close();
                    })
                    return false;
                }
            }

            var arrSteps = pzhdCommon.initArrSteps(nsrStateUrl);
            stepNav.initSteps(arrSteps);
            pzhdCommon.initSelectedPzhd(data.value, pzhd.nsrStateInfo.value.nsrRole);
            pzhd.arrPzhdedInfo = data.value;
        }, function(err) {
            mini.alert(err.message);
        });
    } else {
        var arrSteps = pzhdCommon.initArrSteps(nsrStateUrl);
        stepNav.initSteps(arrSteps);
    }

    mini.parse();
    //第二步 选择领票人的表格
    chooseGrid = mini.get("chooseUser");
    if( $('#fp-defp').length ){
	    fpdefpForm =  new mini.Form('fp-defp');
    }
    //第三步 上传附报资料的表格
    fbzlGrid = mini.get("fbzl-grid");

    //第四步 预览 附报资料表格
    bszlGrid = mini.get("fbzl-yl-grid");
    //针对不同的纳税人类型进行票种及数量点击事件绑定操作
    if (pzhd.nsrStateInfo.value.nsrRole === "04") {
        //一般纳税人绑定票种及数量点击事件
        var currentInput = $(".fp-checked"); //已经选中的
        var currentId,currentIdArr = [];
        if(location.href.indexOf('bz=tz')>-1){
            if(currentInput.length==2){
                currentIdArr.push(currentInput[0].parentElement.parentElement.getAttribute('id'), currentInput[1].parentElement.parentElement.getAttribute('id'));
            }else{
                currentIdArr.push(currentInput[0].parentElement.parentElement.getAttribute('id'));
            }
        }


        //var currentId = currentInput.parent().parent().attr('id');
        $(".icon-select-ybnsr").click(function() {
            var _this = $(this);
            var input = $(".fp-checked"); //已经选中的
            var inputParentId = _this.parent().parent().parent().attr('id');
            if (!_this.parent().hasClass("fp-checked")) {
                var liEl = _this.parent().parent().find('li.fp-content');
                for (var i = 0, len = liEl.length; i < len; i++) {
                    if (liEl.eq(i).hasClass("fp-checked")) {
                        //当前已选中mini输入框的id
                        if(location.href.indexOf('bz=tz')>-1 && currentIdArr.indexOf(inputParentId) >-1){
                                return;
                        }

                        var inputId = liEl.eq(i).find('span.mini-textbox').attr('id');
                        var miniInputObj = mini.get(inputId);
                        miniInputObj.setValue("");
                        miniInputObj.disable();
                        break;
                    }
                }
                liEl.removeClass("fp-checked");
                var thisId = _this.siblings().find('span.mini-textbox').attr('id');
                mini.get(thisId).enable();
                _this.parent().addClass("fp-checked");
            } else {
                if(currentIdArr.indexOf(inputParentId)>-1){
                    return;
                }else{
                    var miniInputObj = mini.get(_this.parents(".fp-content").find('span.mini-textbox').attr('id'));
                    if(currentInput.length!=2){
                        miniInputObj.setValue("");
                        miniInputObj.disable();
                        _this.parent().removeClass("fp-checked");
                    }
                }
            }
        });
    } else {
        //调整页面时除了一般纳税人类型其他只可调增数量而不能更改发票种类
        if (location.href.indexOf('bz=tz') === -1 ) {
            /*第一步 */
            //选择票种及数量,初始化事件
            $(".icon-select").click(function() {
                var _this = $(this);
                var input = $(".fp-checked"); //已经选中的
                var defpId = _this.parents(".fp-item").attr('id'); //定额发票的id
                if (!_this.parent().hasClass("fp-checked")) {
                    if (input.length !== 0) {
                        if (defpId !== 'fp-defp') {
                            pzhd.isDefpStyle = false;
                            for (var i = 0, len = input.length; i < len; i++) {
                                var inputId = $(".fp-checked").eq(i).find(
                                        'span.mini-textbox')
                                    .attr('id');
                                var miniInputObj = mini.get(inputId);
                                miniInputObj.setValue("");
                                miniInputObj.disable();
                            }
                        } else {
                            if (!pzhd.isDefpStyle) {
                                //餐饮业特殊处理
                                var miniInputObj = mini.get($(".fp-checked").eq(0).find(
                                    'span.mini-textbox').attr('id'));
                               miniInputObj.setValue("");
                               miniInputObj.disable();
                            }
                            pzhd.isDefpStyle = true;
                        }
                    }
                    var thisId = _this.siblings().find('span.mini-textbox').attr(
                        'id');
                    mini.get(thisId).enable();
                    _this.parents(".fp-item").siblings().find('.fp-content').removeClass(
                        "fp-checked enable").addClass("disable");

                    if (defpId !== 'fp-defp') {
                        //定额发票可以多选，其他均为单选
                        _this.parent().parent().find('.fp-content').removeClass(
                            "fp-checked");
                    }
                    _this.parents(".fp-content").addClass("fp-checked");
                } else {
                    if (defpId === 'fp-defp') {
                        //是定额发票
                        var miniInputObj = mini.get(_this.parents(".fp-content").find(
                            'span.mini-textbox').attr('id'));
                        miniInputObj.setValue("");
                        miniInputObj.disable();
                        _this.parent().removeClass("fp-checked");
                    }
                }
            });
        }
    }

    /*第三步 tab*/
    $(".tab li").click(function() {
        $(this).addClass("selected").siblings().removeClass("selected");

    });

    /*第六步 导航*/
    $(".nav li").click(function() {
        var className = $(this).attr("data-type");
        $(this).addClass("checked").siblings().removeClass("checked");
        $(this).find("img").attr("src",
            "../../images/public/ico-checked.png");
        $("li").not(".checked").find("img").attr("src", "");
        $("." + className).css("display", "block").siblings().css("display",
            "none");
        $(".wizard>.content").css("height", "");
    });
};
pzhd.slideLeft = function (dom1,dom2) {
    var outerWidth = dom1.outerWidth(true),
        posFadeOut = -(outerWidth),
        posFadeIn = outerWidth;
    $.when(dom1.animate({ left: posFadeOut },function(){$(this).hide()}),
        dom2.css("left",posFadeIn+"px").show().animate({left:0}));
    $('li.current').removeClass('current').addClass('done');
    $('li.disabled').eq(0).removeClass('disabled').addClass('current');
    if($('li.current').index() === stepNav.config.length - 1){
        $('li.current').removeClass('current').addClass('done');
        $('li.disabled').eq(0).removeClass('disabled').addClass('current');
    }
};
stepNav.onStepChanging = function(event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        var objFirstStepVali = pzhdCommon.isFirstStepVali('firstStep');
        //mini Form默认的校验
        if (objFirstStepVali === "defaultValid") {
            return;
        }
        if (!objFirstStepVali) {
            mini.alert("请选中发票种类及正确填入数量");
            return false;
        }
        //个体工商户起征点以下-餐饮业,定额户发票总面值不超核定月销售额
        if (pzhd.nsrStateInfo.value.nsrRole === "02") {
            //校验数量
            var form = new mini.Form("#firstStep");
            var data = form.getData();
            var deFivety = Number(data.deFivety);
            var deTen = Number(data.deTen);
            var deFive = Number(data.deFive);
            var deOne = Number(data.deOne);
            var sumJe = (50 * deFivety + 10 * deTen + 5 * deFive + 1 * deOne) * 100;

            if (sumJe > pzhd.nsrStateInfo.value.ynsjye) {
                mini.alert("定额发票总金额不能超过可领取总计金额");
                return;
            }
        }

        pzhdService.chooseLpr({}, function(data) {
            if(!data.success){
                mini.alert(data.message);
                return false;
            }
            var resultData = mini.decode(data.value);
            var rows = mini.decode(data.value);
            //chooseGrid.setData(resultData);
           // var rows = chooseGrid.getData();
            //票种核定
            if (location.href.indexOf('bz=tz') === -1) {
                chooseGrid.setData(resultData);
                //设置法人默认选中
                pzhdCommon.setFrSelected(rows, chooseGrid, "2");
            } else {
                //获取调整时已选购票人信息
                pzhdService.getYxLprxx(function(datas) {
                    if (datas.success) {
                       pzhd.arrLprxxData = datas.value;

                        if (datas.value.length > 0) {
                            var concatArr = resultData.concat(datas.value);
                            var newConcatArr = unique.uniquebykeys(concatArr,['sfzhm']);
                            chooseGrid.setData(newConcatArr);
                            $.map(newConcatArr,function(item,index){
                                 for(var i =0;i<datas.value.length;i++){
                                     if(item.sfzhm ==datas.value[i].sfzhm){
                                         chooseGrid.setSelected(chooseGrid.getRow(index));
                                     }

                                }
                            })
                        } else {
                            pzhdCommon.setFrSelected(rows, chooseGrid, "2");
                            pzhd.arrLprxxData = [chooseGrid.getSelected()];
                        }

                    } else {
                        mini.alert(datas.message,'提示信息',function(){
                            window.close();
                        });
                    }
                }, function(err) {
                    mini.alert("获取已选领票人失败，请稍后再试");
                });
            }
        });
    }
    //选择领票人
    if (currentIndex == 1) {
        var chooseGridGetSelecteds = chooseGrid.getSelecteds();
        if (chooseGridGetSelecteds.length === 0) {
            mini.alert("请选择领票人");
            return false;
        }

        if ((pzhd.nsrStateInfo.value.gtgs != "true")&&(chooseGridGetSelecteds.length > pzhd.nsrStateInfo.value.cyrs)){
            mini.alert("领票人数不能超过企业登记从业人员人数");
            return false;
        }

        if (chooseGridGetSelecteds.length > 10) {
            mini.alert("领票人数不能超过10人");
            return false;
        }
        //票种核定调整判断是否变更
        if (location.href.indexOf('bz=tz') !== -1) {
            var isEqualFp = pzhdCommon.isEqualFpData(pzhd.arrPzhdedInfo, pzhdCommon
                .objFirstStepData);
            var isEqualLpr = pzhdCommon.isEqualLprData(pzhd.arrLprxxData,
                chooseGridGetSelecteds);
            pzhd.isOnlyChangLpr = false;
            pzhd.isOnlyChangeLqpz = false;
            if (isEqualFp && isEqualLpr) {
                // 领票数据和领票人都没变更
                mini.alert("信息未做修改，不能进行下一步");
                return false;

            }else if (!isEqualFp && !isEqualLpr) { // 领票数据和领票人都发生变更
                pzhd.isOnlyChangeLqpz = true;
                pzhd.isOnlyChangLpr = true;

            }else if (isEqualFp && !isEqualLpr) { // 领票数据没变，领票人变了
                pzhd.isOnlyChangeLqpz = false;
                pzhd.isOnlyChangLpr = true;
            }else if(!isEqualFp && isEqualLpr){ // 领票数据变了，领票人没变
                pzhd.isOnlyChangeLqpz = true;
                pzhd.isOnlyChangLpr = false;
            }
            mini.get("tabsPzhd").removeTab("fbzlYlView");
        }
        //缓存购票人信息
        pzhd.showGprGridData = chooseGrid.getSelecteds();
        if (location.href.indexOf('bz=tz') !== -1) {


            pzhd.initYlView(pzhd.isOnlyChangeLqpz, pzhd.isOnlyChangLpr);

        } else {
            var swsxMxDmList;
            var swsxMxDm = [];
            //wssqUtil.currentSwsxDm = 'SX01';
            //获取附报资料列表
            var datas = {
                'swsxDm': wssqUtil.currentSwsxDm,
                'swsxMxDmList': swsxMxDm
            };
            fbzlAjax(datas, 'requestFbzllist');
        }
        //fbzlGrid.setData(data1);
    }
    //附报资料
    if (currentIndex === pzhdCommon.stepIndex[0]) {
        //判断是否按要求上传附报资料
        if (!isCondition()) {
            return;
        }
        pzhd.initYlView();
        mini.get('fbzl-yl-grid').setData(fbzldata);
        // bszlGrid.setData(data1);
    }
    //预览
    if (currentIndex === pzhdCommon.stepIndex[1]) {
        /*组装领票人*/
        var pzhdsqspGprGrid;
        var goFinished = false;
        // var pzhdsqspGprGridlb = new Array();
        // var gprxx;
        // gprGrid = mini.get('chooseUser');
        // if(pzhdsqspGprGridlb.length == 0){
        //  return ;
        // }
        // for(var i = 0; i< gprGrid.data.length; i++){
        //  gprxx = new Object();
        //  gprxx.gprxm = gprGrid.data[i].loginname;
        //  gprxx.lxdh = pzhdsqspGprGridlb[i].phone_num;
        //  gprxx.sfzjhm = pzhdsqspGprGridlb[i].position_name;
        //  pzhdsqspGprGridlb[i] = grpxx;
        // }
        var pzhdsqspGprGridlb = chooseGrid.getSelecteds();
        for (var i in pzhdsqspGprGridlb) {
            pzhdsqspGprGridlb[i].gprxm = pzhdsqspGprGridlb[i].loginname;
            pzhdsqspGprGridlb[i].lxdh = pzhdsqspGprGridlb[i].phone_num;
            pzhdsqspGprGridlb[i].sfzjhm = pzhdsqspGprGridlb[i].sfzhm;
        }
        pzhdsqspGprGrid = {
                "pzhdsqspGprGridlb": pzhdsqspGprGridlb
            }
            /*组装申请审批*/
        var pzhdsqsp = {
            "ljgpje": pzhd.nsrStateInfo.value.ynsjye
        };

        var pzhdsqspMxGridlb = new Array();
        var fpmx;
        // $('.fp-item').each(function(i, v) {
        //
        //   $(v).find('.fp-input').each(function(index, value) {
        //     var id = $(value).find('span.title').attr('class').replace(
        //       'title', '').trim();
        //     var text = $(value).find('span.title').text();
        //     //var fs = mini.get(id).getValue();
        //
        //   })
        // });
        var requestData = {
            "pzhdsqspGprGrid": pzhdsqspGprGrid,
            "sfts": "false",
            "isQdZgkpxelc": "false",
            "sfwbnsr": "false",
            "pzhdsqsp": pzhdsqsp,
            "pzhdsqspMxGrid": pzhd.pzhdsqspMxGrid,
            "isQdFpdblc": "false",
            "djxh": wssqUtil.nsrjbxx.djxh
        };
        var tzOrPzhdUrl = "/fpzx-web/api/fp/pzhd/submit/pzhdsq/hd";
        if (location.href.indexOf('bz=tz') !== -1) {
            tzOrPzhdUrl = "/fpzx-web/api/fp/pzhd/submit/pzhdsq/hdtz";
            requestData["isChangeFpxx"] = pzhd.isOnlyChangeLqpz + ""; //转字符串
        }
        wssqUtil.tjsq(tzOrPzhdUrl, mini.encode(
                requestData),
            function(data) {
                if (data.success) {
                    goFinished = true;

                } else {
                    mini.alert(data.message);
                }
            },
            function(err) {
                mini.alert(err);
            });
        return goFinished;
    }
    if (currentIndex == pzhdCommon.stepIndex[2]) {

    }
    if (currentIndex == pzhdCommon.stepIndex[3]) {

    }
    return true;
};
stepNav.onStepChanged = function(event, currentIndex,prevIndex) {
    if(currentIndex === 3){

        if (pzhd.isOnlyChangLpr && !pzhd.isOnlyChangeLqpz) { // 领票人变了，领票数据没变
            pzhd.slideLeft($("#wizard-p-3"),$("#wizard-p-4"));
        }else{
            wssqUtil.tjsqResponse.shfsDm = '02';
        }
    }

};

// 票种核定 数量限制
//获取纳税人状态类型 01:个体工商户起征点以上；02：个体工商户起征点以下；03：增值税小规模纳税人；
//04：增值税一般纳税人;05:个体工商户起征点以下-非餐饮业
//pzhd.nsrStateInfo.value.nsrRole


function countValidat(miniobj, type, number, deType){  // deType 定额专用type 区分 1 5 10 50
	//console.log( miniobj, type, number );
	if( location.href.indexOf('bz=tz') >= 0 ){  // 调整修改的时候 不限制
	   return;
    }
	if( miniobj.value && !$.isNumeric( miniobj.value ) ){
		mini.showTips({
			content: '请输入正整数',
			state: 'warning',
			offset: [150, 150]
		});
		return;
	}
	var minCount = 1, maxCount;  // 最高上限
	if( type == 'pt' ){ // 普通增值税发票
		maxCount = validatNumberType.pt( number );
	}
	if( type == 'zy'){
		maxCount = validatNumberType.zy( number );
	}
	if( type == 'sg_e'){ //
		maxCount = validatNumberType.sge( number );
	}
	if( type == 'de' ){ // 定额
		validatNumberType.getDeCount( deType );
		if( Number(miniobj.value) > 0 ){
			maxCount = validatNumberType.de( number );
		}
	}
	if( parseFloat(miniobj.value) > maxCount || parseFloat(miniobj.value) < minCount && miniobj.value != 0 ){
		miniobj.setIsValid( false );
		content = '请输入数量 ( 0~' + maxCount + ')';
		if( maxCount == 0 ){
			content = '已达到核定总金额上线，不能再选择';
		}
		mini.showTips({
			content: content,
			state: 'warning',
			offset: [150, 150]
		});
		miniobj.setVtype('int;range:0,'+maxCount);
	}else{
		miniobj.setIsValid( true );
	}
	
};

var validatNumberType = {
	deCount: 0,
	
	getDeCount: function( deType ){
		var data = fpdefpForm.getData();  // 定额数据
        var result = 0;
        var cx = 0; // 乘以多少 1 5 10 50
        $.each(data, function(i, obj){  // 计算除了当前编辑的 其他的总和
            if( i != deType ){
	            if( i == 'deOne' ){ cx = 1; }
                if( i == 'deFive' ){ cx = 5; }
                if( i == 'deTen' ){ cx = 10; }
                if( i == 'deFivety' ){cx = 50; }
	            result += Number(obj || 0) * 100 * cx;
            }
        });
        this.deCount =  result;
	},
	
	pt: function( number ){  // 增值税普通发票
		var maxCount;
		if(number == '100000'){
			maxCount = 10;
		}else if( number == '10000' ){
			maxCount = 25;
		}else if( number == '1000' ){
			maxCount = 100;
		}
		return maxCount;
	},
	
	zy: function( number ){
		var maxCount;
		if(number == '100000'){
			maxCount = 10;
		}else if( number == '10000' ){
			maxCount = 25;
		}else if( number == '1000' ){
			maxCount = 100;
		}
		return maxCount;
	},
	
	sge: function( number ){
		return 1;
	},
	
	de: function( number ){  // 份数*面额  不能超过 已核定领用总金额
		var result;
		var canUseJe = Number(pzhd.nsrStateInfo.value.ynsjye) - this.deCount; // 还能核定的金额   核定总金额 减去 已经选中核定的
		if( canUseJe <= 0 ){
		    return 0;
        }
        console.log( 'canUseJe:' + canUseJe, 'deCount:' +  this.deCount);
        result = Math.floor( canUseJe / ( Number(number) * 100 ) );
		return result;
	}
}

//数组对象去重
var unique = {
    objkey: function(obj, keys){
        var n = keys.length,
        key = [];
        while(n--){
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    },
    uniquebykeys: function(array,keys){
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = unique.objkey(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr .push(array[i]);
            }
        }
        return arr ;
    }
};

// 票种核定 数量限制
//获取纳税人状态类型 01:个体工商户起征点以上；02：个体工商户起征点以下；03：增值税小规模纳税人；
//04：增值税一般纳税人;05:个体工商户起征点以下-非餐饮业
//pzhd.nsrStateInfo.value.nsrRole


function countValidat(miniobj, type, number, deType){  // deType 定额专用type 区分 1 5 10 50
	//console.log( miniobj, type, number );
	if( location.href.indexOf('bz=tz') >= 0 ){  // 调整修改的时候 不限制
		return;
	}
	if( miniobj.value && !$.isNumeric( miniobj.value ) ){
		mini.showTips({
			content: '请输入正整数',
			state: 'warning',
			offset: [150, 150]
		});
		return;
	}
	var minCount = 1, maxCount;  // 最高上限
	if( type == 'pt' ){ // 普通增值税发票
		maxCount = validatNumberType.pt( number );
	}
	if( type == 'zy'){
		maxCount = validatNumberType.zy( number );
	}
	if( type == 'sg_e'){ //
		maxCount = validatNumberType.sge( number );
	}
	if( type == 'de' ){ // 定额
		validatNumberType.getDeCount( deType );
		if( Number(miniobj.value) > 0 ){
			maxCount = validatNumberType.de( number );
		}
	}
	if( parseFloat(miniobj.value) > maxCount || parseFloat(miniobj.value) < minCount && miniobj.value != 0 ){
		miniobj.setIsValid( false );
		content = '请输入数量 ( 0~' + maxCount + ')';
		if( maxCount == 0 ){
			content = '已达到核定总金额上线，不能再选择';
		}
		mini.showTips({
			content: content,
			state: 'warning',
			offset: [150, 150]
		});
		miniobj.setVtype('int;range:0,'+maxCount);
	}else{
		miniobj.setIsValid( true );
	}
};

var validatNumberType = {
	deCount: 0,
	
	getDeCount: function( deType ){
		var data = fpdefpForm.getData();  // 定额数据
		var result = 0;
		var cx = 0; // 乘以多少 1 5 10 50
		$.each(data, function(i, obj){  // 计算除了当前编辑的 其他的总和
			if( i != deType ){
				if( i == 'deOne' ){ cx = 1; }
				if( i == 'deFive' ){ cx = 5; }
				if( i == 'deTen' ){ cx = 10; }
				if( i == 'deFivety' ){cx = 50; }
				result += Number(obj || 0) * 100 * cx;
			}
		});
		this.deCount =  result;
	},
	
	pt: function( number ){  // 增值税普通发票
		var maxCount;
		if(number == '100000'){
			maxCount = 10;
		}else if( number == '10000' ){
			maxCount = 25;
		}else if( number == '1000' ){
			if( pzhd.nsrStateInfo.value.nsrRole == '02' || pzhd.nsrStateInfo.value.nsrRole == '05' ){ // 餐饮或者起征点以下 都是限25份
				maxCount = 25;
			}else{
				maxCount = 100;
			}
			
		}
		return maxCount;
	},
	
	zy: function( number ){
		var maxCount;
		if(number == '100000'){
			maxCount = 10;
		}else if( number == '10000' ){
			maxCount = 25;
		}else if( number == '1000' ){
			maxCount = 100;
		}
		return maxCount;
	},
	
	sge: function( number ){
		return 1;
	},
	
	de: function( number ){  // 份数*面额  不能超过 已核定领用总金额
		var result;
		var canUseJe = Number(pzhd.nsrStateInfo.value.ynsjye) - this.deCount; // 还能核定的金额   核定总金额 减去 已经选中核定的
		if( canUseJe <= 0 ){
			return 0;
		}
		console.log( 'canUseJe:' + canUseJe, 'deCount:' +  this.deCount);
		result = Math.floor( canUseJe / ( Number(number) * 100 ) );
		return result;
	}
}