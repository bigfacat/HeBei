/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/28
 * Time：9:29
 *
 */

var sbjg={};
sbjg.nsrData = nsrxxUtil.getNsrxxVO();
sbjg.szlbData = [
    {ID: "10101", MC: "增值税"},
    {ID: "10102", MC: "消费税"},
    {ID: "10104", MC: "所得税"},
    {ID: "29835", MC: "财务报表"},
    {ID: "30217", MC: "文化事业建设费"},
    {ID: "10106", MC: "储蓄存款"},
    {ID: "30175", MC: "废旧电子"}
    //{ID: "10110", MC: "房产税"},
    //{ID: "10112", MC: "城镇土地使用税"}
];

sbjg.querySbjlUrl = '/sbzx-web/api/hb/sb/common/sbqkcx.ashx';  // 查询申报记录
sbjg.queryViewUrl = '../../data/url/urlMap.ashx';  // 查询查看申报表配置
sbjg.querySbbwUrl = '/sbzx-web/api/hb/sb/common/getsbbw.ashx';   // 查询申报报文
sbjg.hbxgmYdsUrl  = '/sbzx-web/apps/views/xgmsb-yds_new/xgmsb.html'; // 河北小规模引导式申报链接，重新申报，其他地区复写成 空；

/*
* 河北申报并不全是新的，1.0申报的不能在2.0上查看
* 2.0上现在有 小规模引导式、小规模填表式、电池消费税、涂料消费税
*
* */
sbjg.allowViewSbb = ['10102','10103','10310','10311','10318','10319'];

sbjg.initUrlData = function () {

    ajax.get(sbjg.queryViewUrl,'',function(data){
        if(data){
            sbjg.viewSbbUrl = data;
        }
    });
};

// 查询申报记录
sbjg.searchRecord = function (event) {
    if(event && !sbjg.checkSearchTime()){
        return ;
    }
    sbjg.searchFormData = sbjg.searchForm.getData(true);
    if(!sbjg.searchForm.validate()){
        return;
    }
    mini.mask('查询中...');
    var params={
        zsxmDm:sbjg.searchFormData.zsxmDm,
        sbztDm:sbjg.searchFormData.sbztDm,
        sssqQ:sbjg.searchFormData.skssqq,
        sssqZ:sbjg.searchFormData.skssqz,
        sbrqQ:sbjg.searchFormData.sbrqq,
        sbrqZ:sbjg.searchFormData.sbrqz
    };

    ajax.post(sbjg.querySbjlUrl,mini.encode(params),function (result) {
        if(result.success && result.value){
            sbjg.sbjgGrid.setData(result.value);
        }else{
            sbjg.sbjgGrid.setData('');
            !!result.message && mini.alert(result.message);
            return false;
        }
    },function (req) {
        !!req.message && mini.alert(req.message);
        sbjg.sbjgGrid.setData('');
    });
    $.cookie('lastSearchTime_sbjgcx_'+sbjg.nsrData.djxh,new Date().getTime());
    if(event){
        sbjg.runTimer();
    }
    mini.unmask();

};
sbjg.defaultTimerTemp = 10;//两次查询的时间间隔，单位秒
sbjg.timerTemp = 10;//两次查询的时间间隔，单位秒
/**
 * 校验当次查询与上次查询的时间间隔，用到cookie是为了在重开页面的情况下同样要做到校验
 * */
sbjg.checkSearchTime = function () {
    var lastSearchTime = $.cookie('lastSearchTime_sbjgcx_'+this.nsrData.djxh);
    if(!lastSearchTime){
        return true;
    }
    var curSearchTime = new Date().getTime();
    var restTime = Math.floor(this.defaultTimerTemp-(curSearchTime-lastSearchTime)/1000);//剩余时间
    if(restTime >= 0){
        mini.alert(restTime+'秒后可再次查询');
        return false;
    }
    return true;
};
/**
 * 计时器
 * */
sbjg.runTimer = function () {
    this.timerTemp = this.defaultTimerTemp-1;
    $('#timer-seconds').text(this.timerTemp);
    $('#timer').show();
    var _this = this;
    sbjg.timer = setInterval(function () {
        _this.timerTemp--;
        if(_this.timerTemp === -1){
            window.clearInterval(_this.timer);
            $('#timer').hide();
            $.removeCookie('lastSearchTime_sbjgcx_'+_this.nsrData.djxh);//删除cookie
        }
        $('#timer-seconds').text(_this.timerTemp);
    },1000)
};

/**
 * 校验当次查询与上次查询的时间间隔，用到cookie是为了在重开页面的情况下同样要做到校验
 * */
/*sbjg.checkSearchTime = function () {
    var lastSearchTime = $.cookie('lastSearchTime_sbjgcx');
    var _this = this;
    if(!lastSearchTime){
        return true;
    }
    var curSearchTime = new Date().getTime();
    var restTime = Math.floor(this.timerTemp-(curSearchTime-lastSearchTime)/1000);//剩余时间
    if(restTime >= 0 ){
        var tip = '秒后可再次查询';
        this.timerBoxId = mini.showMessageBox({
            title: '提示',
            buttons: ["ok"],
            html: '<span id="timer" class="txt-red" style="font-size: 14px;"><span id="timer-seconds">'+restTime+'</span>'+tip+'</span>',
            callback: function(){
                window.clearInterval(_this.timer);
            }
        });
        this.runTimer(restTime);
        return false;
    }
    return true;
};*/
/**
 * 计时器
 * */
/*sbjg.runTimer = function (restTime) {
    var _this = this;
    this.timer = setInterval(function () {
        restTime--;
        $('#timer-seconds').text(restTime);
        if(restTime === -1){
            window.clearInterval(_this.timer);
            $.removeCookie('lastSearchTime_sbjgcx');//删除cookie
            mini.hideMessageBox(_this.timerBoxId);
        }
    },1000)
};*/
// 快速链接的按钮
sbjg.actionsRenderer=function (e) {
    var record = e.record;
    var qqwjm = record.qqwjm;
    var sbzlDm = record.sbzlDm;
    var sbrq = record.sbrq;
    var sbxh = record.sbxh;
    var sbztDm = record.sbztDm;

    var url = sbjg.viewSbbUrl[sbzlDm].url || '#';
    if(sbzlDm==='10102'||sbzlDm==='10103'){
        url = !!sbjg.hbxgmYdsUrl? (sbjg.hbxgmYdsUrl+'?sbzlDm='+ sbzlDm +'&code='+ sbzlDm +'&id=16'): sbjg.viewSbbUrl[sbzlDm].url;
    }

    if(record.qqwjm){
        var s = '<a class="no-dec mr10" href="javascript:sbjg.viewSbxml(\''+ qqwjm +'\',\''+ sbzlDm + '\',\'' + sbrq + '\',\'' + sbxh + '\',\'' + record.skssqq + '\',\'' + record.skssqz + '\')">查看申报表</a>';
        if($.inArray(sbzlDm,sbjg.allowViewSbb)===-1){
            s = '';
        }

        if(Number(record.sbse)>0){
            s += '<a class="no-dec" href="/BsfwtWeb/pages/jk/jk_jsxxcx.aspx">缴款</a>';
        }
        if($.inArray(sbzlDm,sbjg.allowViewSbb)>-1 && sbztDm!=='0000'){
            s = '<a class="no-dec" href='+ url +' target="_blank">重新申报</a>'
        }
        return s;
    }
};
sbjg.viewSbxml = function (qqwjm,sbzlDm,sbrq,sbxh,skssqq,skssqz) {

    mini.mask('查询中...');
    $.ajax({
        url : sbjg.querySbbwUrl,//返回申报表的报文，里面带有填表的数据，
        type : "post",
        data : mini.encode({
            qqwjm : qqwjm,
            sbrq : sbrq,
            sbxh : sbxh,
            sbzlDm : sbzlDm
        }),
        contentType:"application/json;charset=utf-8",
        success : function(result) {
            mini.unmask();
            var viewData='';
            if(result.success && !!result.value){
                viewData = mini.decode(result.value);
            }else{
                mini.alert('申报表查询数据为空，请确认该申报表是否由云厅2.0申报成功！');
                return;
            }
            var xgmsbViewUrl = sbjg.viewSbbUrl[sbzlDm].url + '&preview=Y';
            if(viewData.hasOwnProperty('xgmsb_zb')){
                xgmsbViewUrl = '/sbzx-web/apps/views/xgmsb-yds/xgmsb-view.html';
            }
            mini.open({
                url : xgmsbViewUrl,
                showMaxButton : false,
                allowResize : false,
                title : "申报表查看",
                width : 1220,
                height : 600,
                onload : function() {
                    var iframe = this.getIFrameEl();
                    /*
                    *    xgmsb_zb : zbData,
                    *    xgmsb_fb1 : fb1Data,
                    *    xgmsb_jmb : jmbData
                    * */
                    if(viewData.hasOwnProperty('xgmsb_zb')){
                        viewData['sbrq'] = sbrq;
                        iframe.contentWindow.xgmsbView.setViewData(viewData,qqwjm,sbrq,skssqq,skssqz);
                    }else{
                        iframe.contentWindow.servyouReport.preview(viewData);
                    }

                }
            });
        },
        error : function(req) {
            var msg = req.message || '查询失败！';
            mini.alert(msg);
            mini.unmask();
        }
    });
};
// 是否自动查询
sbjg.autoSearch = function () {
    var zsxmDm = Tools.getUrlParamByName('zsxmDm');
    if(!!zsxmDm){
        mini.get('zsxmDm').setValue(zsxmDm);
        sbjg.searchRecord();
    }
};

$(function () {
    wssqUtil.initPageHdFt('head');
    mini.parse();

    sbjg.initUrlData();

    var date = new Date();
    var firstDay = date.getFirstDateOfMonth('yyyy-MM-dd');
    var lastDay = date.getLastDateOfMonth('yyyy-MM-dd');
    mini.get('sbrqq').setValue(firstDay);
    mini.get('sbrqz').setValue(lastDay);

    sbjg.searchBtn = $('#search-btn');
    sbjg.skssqq = mini.get('skssqq');
    sbjg.skssqz = mini.get('skssqz');
    sbjg.sbrqq = mini.get('sbrqq');
    sbjg.sbrqz = mini.get('sbrqz');
    sbjg.sbjgGrid = mini.get('sbjg-grid');
    sbjg.searchForm = new mini.Form('#search-condition');
    sbjg.searchBtn.click(sbjg.searchRecord);
    // 根据条件自动查询
    sbjg.autoSearch();
});