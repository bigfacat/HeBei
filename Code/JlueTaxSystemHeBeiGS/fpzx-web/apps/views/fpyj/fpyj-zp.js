/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-10-11
 * Time: 16:53
 * Description:
 */

var grid, jcxxRow, fpme;
var fpyj = {};

stepNav.run = function() {
    stepNav.initSteps([{id: 0, title: '结存信息', url: 'fpyj-zp-jcxx.aspx'}]);

    mini.parse();
    fpyj.ylForm = new mini.Form('#fpyjTable-yl');
    setKpjzrq();
    queryFwskYjxx();
};

function setKpjzrq(){
    var myDate = new Date();
    var datepicker = mini.get("kpjzrq");
    datepicker.setValue(myDate);
}


function queryFwskYjxx(){
    grid = mini.get("fpyj-grid");
    var kpjzrq = new Date(mini.get("kpjzrq").getValue());
    kpjzrq = kpjzrq.getFullYear() + '-' + (kpjzrq.getMonth() + 1) + '-' + kpjzrq.getDate();
    $.ajax({
        type: "GET",
        url: "/fpzx-web/api/fp/fpyj/list/fwskYjxx/" + kpjzrq+".ashx",
        async: false,
        success: function(result) {
            if (result.success) {
                if (!!result.value) {
                    grid.setData(result.value);
                } else {
                    fpyj.showNsrfpyjxx();
                }
            }else{
                mini.alert(result.message, '提示信息', function() {
                    window.close();
                });
            }
        },
        error: function(e) {
            return false;
        }
    });
}

function queryFwskYjxx1(){
    grid = mini.get("fpyj-grid");
    var kpjzrq = new Date(mini.get("kpjzrq").getValue());
    kpjzrq = kpjzrq.getFullYear() + '-' + (kpjzrq.getMonth() + 1) + '-' + kpjzrq.getDate();
    $.ajax({
        type: "GET",
        url: "/fpzx-web/api/fp/fpyj/list/fwskYjxx/" + kpjzrq+"_1.ashx",
        async: false,
        success: function(result) {
            if (result.success) {
                if (!!result.value) {
                    grid.setData(result.value);
                } else {
                    fpyj.showNsrfpyjxx();
                }
            }else{
                mini.alert(result.message, '提示信息', function() {
                    window.close();
                });
            }
        },
        error: function(e) {
            return false;
        }
    });
}

function getSqsj(){
    var yjxxs = grid.getSelecteds();
    var ylData = {};

    ylData.fpzlMcText = yjxxs[0].fpzlMc;
    ylData.fpDmText = yjxxs[0].fpdm;
    ylData.fpkjqkDmText = yjxxs[0].fptkztMc;
    ylData.kjyf = yjxxs[0].kprqq;
    ylData.fsXg = yjxxs[0].fs;
    ylData.fpqshmXg = yjxxs[0].fpqshm;
    ylData.fpzzhmXg = yjxxs[0].fpzzhm;
    ylData.kpje = yjxxs[0].kpje;

    fpyj.ylForm.setData(ylData);
    var length = yjxxs.length;
    if (0 === length){
        return "";
    }
    var fpyjjcyqkMxVOListlb = [];
    var fpyjjcyqkMxVOList = {"fpyjjcyqkMxVOListlb": []};
    for (var i=0; i<length; i++){
        var yjxx = yjxxs[i];
        fpyjjcyqkMxVOListlb.push(getMxVO(yjxx));
    }
    fpyjjcyqkMxVOList.fpyjjcyqkMxVOListlb = fpyjjcyqkMxVOListlb;

    return {
        fpyjjcyqkMxVOList:fpyjjcyqkMxVOList
    };
}

function getMxVO(yjxx) {
    var fpyjjgDm = "0";
    if ("10" === yjxx.fptkzt){	//正常填开
        fpyjjgDm = "1";
    }
    if ("20" === yjxx.fptkzt){	//填用作废
        fpyjjgDm = "2";
    }
    return {
        "fpzlDm": yjxx.fpzlDm,
        "kpjzrq": yjxx.kprqz,
        "ywuuid": "",
        "fpzzhm": yjxx.fpzzhm,
        "kpqsrq": yjxx.kprqq,
        "se": yjxx.se,
        "fpyjjgDm": fpyjjgDm,
        "zfbz1": "N",
        "fpqshm": yjxx.fpqshm,
        "xgrDm": "",
        "kpje": yjxx.kpje,
        "cyfpmxuuid": "",
        "fpcyuuid": "",
        "fpkjqkDm": yjxx.fptkzt,
        "sjgsdq": "",
        "lrrDm": "",
        "fs": yjxx.fs,
        "fpDm": yjxx.fpdm
    };
}

function sendSqsj() {
    var sqsj = getSqsj();
    if (!sqsj){
        mini.alert("请选择需要验旧的发票信息");
        return;
    }
    mini.mask('正在提交验旧数据，请稍候...');
    setTimeout(function () {
        fpyjService.tj(mini.encode(sqsj), function(data) {
            mini.unmask();
            var result = mini.decode(data);
            if (result.success) {
                mini.alert("发票验旧成功！","提示",function(){
                    queryFwskYjxx1();
                });
            }else {
                mini.alert(result.message);
            }
        });
    },300);

}

fpyj.showNsrfpyjxx = function(){
//    var tsxx = "<span>网厅可以验旧以下四种发票，验旧其他发票请到大厅处理：<br>"
//        + "增值税专用发票（中文六联无金额限制版）<br>"
//        + "增值税专用发票（中文三联无金额限制版）<br>"
//        + "2008版增值税普通发票（五联无金额限制版）<br>"
//        + "2008版增值税普通发票（二联无金额限制版）</span>";
    var tsxx = "未查询到当前开票截止日期之前的发票验旧信息";
    mini.alert(tsxx, "提示", function() {
        // window.close();
    });

};
