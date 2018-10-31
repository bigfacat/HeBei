/**
 * Created by chenjunj on 2017/6/24 9:50.
 */
var ybnsr = {
    needOuterYbjc: false,//是否需要外部一表集成功能
    needInnerYbjc: false,//是否需要内部一表集成功能
    needInnerSbhy: false,//是否需要内部十表合一功能
    needInnerYbjcOrSbhy: /needInnerYbjc=Y|needInnerSbhy=Y/,//是否需要内部一表集成或者十表合一功能
    isFromYbjc: false,//是否来自一表集成
    isFromSbhy: false,//是否来自十表合一
    outerYbjcData: null,//外部一表集成的数据
    bindEvent: function () {
        this.bindDklDelete();
    },
    bindDklDelete: function () {
        var that = this;
        $('#content-table').on('click', '#dkl_del', function () {
            mini.confirm('确认删除该表数据？', '提示', function (action) {
                var request = {
                    djxh: yearReport.djxh,
                    sbzlDm: yearReport.sbzlDm,
                    bbid: '404',
                    sssqQ: yearReport.sssqq,
                    sssqZ: yearReport.sssqz,
                    sblxDm: yearReport.sblxDm
                };
                if (action === 'ok' && that.ajaxDklDelete() && sbcommon.deleteSingleTableData(request)) {
                    yearReport.afterSingleDelete('404');
                }
            });
        });
    },
    ajaxDklDelete: function () {
        var url = '/sbzx-web/api/sb/ybnsr/delDkl';
        var request = {
            sssqQ: yearReport.sssqq,
            sssqZ: yearReport.sssqz,
            djxh: yearReport.djxh
        };
        return Api.getIfSuccess(url, request);
    },
    bindEditStepEvent: function () {
        $('#sideBar-step').on('mouseover', function () {
            $(this).find('.step').stop().animate({
                width: '898px',
                height: '458px',
                left: '-898px',
                top: '-200px',
                border: '1px solid #eee'
            }, 100);
        }).on('mouseout', function () {
            $(this).find('.step').stop().animate({
                width: '0',
                height: '0',
                left: '0',
                top: '50%',
                border: 'none'
            }, 100);
        })
    },
    //外部一表集成过来时，若001,002,003,083中存在已填的，那么就要把对应的表状态改为暂存状态
    onConditionOuterYbjc: function (_this) {
        this.needOuterYbjc = true;
        this.outerYbjcData = mini.decode(sessionStorage.getItem('outerYbjcData'));
        var bbidArr = ['001', '002', '003'];
        var changeList = [];
        $.each(bbidArr, function (i, bbid) {
            if (_this.sb_data[bbid].status === '1') {
                var obj = {
                    bbid: bbid,
                    status: '2',
                    checkData: {}
                };
                changeList.push(obj);
            }
        });
        var updateChangeList = _this.transformChangeList(changeList);
        var request = {
            djxh: _this.djxh,
            sbzlDm: _this.sbzlDm,
            sssqQ: _this.sssqq,
            sssqZ: _this.sssqz,
            sbData: updateChangeList,
            sblxDm: _this.sblxDm
        };
        if (updateChangeList.length > 0 && sbcommon.updateListData(request)) {
            _this.afterUpdateList(changeList);
        }
    },
    /**
     * 设置数据到表中，这里的数据都是{'001_1_1':'123.00'}形式
     * */
    setDataFromSbhy: function (data) {
        $.each(data, function (id, val) {
            var idReg = /\d+_\d+_\d+/;
            if (idReg.test(id)) {
                $('#' + id).val(val).change().blur();
            }
        });
    }
};
yearReport.getYnse = function () {
    return (Number(this.sb_data['001'].checkData['44_6'] || 0) + Number(this.sb_data['001'].checkData['44_9']) || 0).toFixed(2);
};
yearReport.dependOnHd = true;//报表由核定决定
yearReport.baseFileName = 'sb_ybnsr';//当前html的名称
//页面展示的特定顺序
yearReport.specialOrder = ['401', '402', '403', '404', '405', '001', '002', '003', '006', '031', '081', '082', '406',
                    '085', '064', '076', '077', '075', '025', '073', '052', '054', '053', '055', '056', '007', '079', '409', '407', '408', '032', '601', '066'];
yearReport.customEvent = function () {
    ybnsr.bindEvent();
};
yearReport.afterInit = function () {
    if (window.location.href.indexOf('needOuterYbjc=Y') !== -1) {
        ybnsr.onConditionOuterYbjc(this);
    }
};
yearReport.beforeRenderList = function () {
    if (window.location.href.indexOf('needInnerSbhy=Y') !== -1) {
        this.specialOrder.unshift('087');
        ybnsr.needInnerSbhy = true;
    }
    if (window.location.href.indexOf('needInnerYbjc=Y') !== -1) {
        this.specialOrder.unshift('086');
        ybnsr.needInnerYbjc = true;
    }
};
$(function () {
    yearReport.init();//启用本地数据
});
/**
 * Created by liun on 2018/5/3.
 */

//配置与附加税关联申报
yearReport.reportWithNext = {
    getHdByDM: '10115',
    sbzlDmArr: ['10115', '10116'],
    sbzlMc: '附加税',
    url: '../sb_fjs/sb_fjs.html?sbzlDm=10115'
};
/*yearReport.customReportBtns = function () {
    yearReport.reportBtns.unshift({
        id: 'sb_szjk',
        cls: 'btn btn-orange',
        text: '政策风险提示服务',
        callback: function () {
            ybnsr.zcfxts();
        },
        whenToShow: 'report,correct,past,overdue'
    });
};*/
ybnsr.glfjsBz = false;
/*ybnsr.zcfxts = function () {
//校验是否存在必填表未填写或者子表已填而父表未填的情况
    if(!(yearReport.checkMustEdited() && yearReport.checkParentTableEdited())){
        return false;
    }
    //纯js校验
    if(!yearReport.checkData()){
        return ;
    }
    //校验saveCheckData,sendCheckData
    var saveCheckErrMsg = yearReport.checkSaveCheckData();
    if(saveCheckErrMsg.length>0){
        var newErrorMsgArr = [];
        $.each(saveCheckErrMsg, function (i,msg) {
            newErrorMsgArr.push('（'+(i+1)+'）'+msg);
        });
        mini.alert(newErrorMsgArr.join('<br>'),'您目前存在以下错误，请确认！');
        return ;
    }
    //校验doShowMessage
    var doShowMessageErrMsg = yearReport.checkDoShowMessage();
    if(doShowMessageErrMsg.length >0){
        var newErrorMsgArr = [];
        $.each(doShowMessageErrMsg, function (i,msg) {
            newErrorMsgArr.push('（'+(i+1)+'）'+msg);
        });
        var newErrorMsgs = newErrorMsgArr.join('<br>');
        mini.confirm(newErrorMsgs,'点击确定，继续发送政策风险扫描申请！',function (action) {
            if(action === 'ok'){
                mini.alert('1. 您是批发行业，【增值税纳税申报表】(第1+5+7+8栏)的"一般项目"累计数与"即征即退项目"累计数之和不能小于财务报表中【资产负债表】中第10行“存货”的年初余额-期末余额。<br>'+
                '2. 【增值税纳税申报表】(第1+5+7+8栏)的"一般项目"累计数与"即征即退项目"累计数之和不能小于财务报表中【利润表】中第1行“一、营业收入”的本期金额。','政策风险提示');
            }
        });
    }else{
        mini.alert('1. 您是批发行业，【增值税纳税申报表】(第1+5+7+8栏)的"一般项目"累计数与"即征即退项目"累计数之和不能小于财务报表中【资产负债表】中第10行“存货”的年初余额-期末余额。<br>'+
            '2. 【增值税纳税申报表】(第1+5+7+8栏)的"一般项目"累计数与"即征即退项目"累计数之和不能小于财务报表中【利润表】中第1行“一、营业收入”的本期金额。','政策风险提示');
    }
};*/
/*ybnsr.getFjsBz = function (_this) {
    // 附加税启用标志
    var fjsSbQybz = Api.getData('/sbzx-web/api/hb/sb/fjs/getFjsSbQybz',{},'get',false);
    var request = {
        nsrsbh:_this.nsrsbh,
        djxh: _this.djxh,
        sssq: _this.sssqz.substr(0,4) + _this.sssqz.substr(5,2),
        sbzldm: _this.sbzlDm,
        gdslx:'ds'
    };
    var fjsSbxx = null;
    ajax.post('/sbzx-web/api/hb/sb/fjs/getFjsSbxx',mini.encode(request),function (data) {
        if (data.success){
            fjsSbxx = mini.decode(data.value);
        } else if (data.msgCode !== '0'){
            mini.alert(data.message);
        }
    },function (data) {
        mini.alert(data.message);
    });
    if (fjsSbQybz.value === 'Y' && !(!!fjsSbxx && !!fjsSbxx.sbxx && fjsSbxx.sbxx.sbxxmx.length>0 && fjsSbxx.sbxx.sbxxmx[0].sfysb === 'Y')){
        return true;
    } else {
        return false;
    }
};*/
ybnsr.compareGds = function (_this) {
    var gdsData = mini.decode(Api.getData('/sbzx-web/api/hb/sb/fjs/compareGdsNsrxx.ashx', { sbzldm: _this.sbzlDm }, 'post', false));
    if (!!gdsData) {
        var message = '';
        var gsData = gdsData.gs;
        var dsData = gdsData.ds;
        for (var g in gsData) {
            $('#gs-' + g).html(gsData[g]);
        }
        for (var d in dsData) {
            $('#ds-' + d).html(dsData[d]);
        }
        var compareList = [];
        if ((!!gdsData.gs.nsrsbh || !!gdsData.ds.nsrsbh) && gdsData.gs.nsrsbh !== gdsData.ds.nsrsbh) {
            compareList.push('纳税人识别号');
        }
        if ((!!gdsData.gs.nsrmc || !!gdsData.ds.nsrmc) && gdsData.gs.nsrmc !== gdsData.ds.nsrmc) {
            compareList.push('纳税人名称');
        }
        if ((!!gdsData.gs.shxydm || !!gdsData.ds.shxydm) && gdsData.gs.shxydm !== gdsData.ds.shxydm) {
            compareList.push('社会信用代码');
        }
        if ((!!gdsData.gs.fddbrsfzjlxDm || !!gdsData.ds.fddbrsfzjlxDm) && gdsData.gs.fddbrsfzjlxDm !== gdsData.ds.fddbrsfzjlxDm) {
            compareList.push('法人证件类型');
        }
        if ((!!gdsData.gs.fddbrsfzjhm || !!gdsData.ds.fddbrsfzjhm) && gdsData.gs.fddbrsfzjhm !== gdsData.ds.fddbrsfzjhm) {
            compareList.push('法人证件号码');
        }
        if ((!!gdsData.gs.fddbrxm || !!gdsData.ds.fddbrxm) && gdsData.gs.fddbrxm !== gdsData.ds.fddbrxm) {
            compareList.push('法人姓名');
        }
        if ((!!gdsData.gs.ssdabh || !!gdsData.ds.ssdabh) && gdsData.gs.ssdabh !== gdsData.ds.ssdabh) {
            compareList.push('税收档案编号');
        }
        if (compareList.length > 0) {
            message += '<div>您在原地税机关登记的<span style="color:red">' + compareList.join("，") + '</span>信息与您在原国税机关登记的不一致，请确认该户纳税人与您在原国税机关登记的是否' +
                '为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
        } else {
            message += '您在原地税机关登记的基本信息与您在原国税机关登记的一致，请再次确认该户纳税人与您在原国税机关登记的是否为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
        }
        $(".gds-message").html(message);
        mini.get('gds-win').show();
    }
};
/*ybnsr.getYbtse = function (_this) {
    return (Number(_this.getValueFromCheckData('001','44_6')) + Number(_this.getValueFromCheckData('001','44_9'))).toFixed(2);
};
ybnsr.getBhsxse = function (_this) {
    return (Number(_this.getValueFromCheckData('001','11_6')) + Number(_this.getValueFromCheckData('001','11_9')) +
        Number(_this.getValueFromCheckData('001','15_6')) + Number(_this.getValueFromCheckData('001','15_9')) +
        Number(_this.getValueFromCheckData('001','17_6')) + Number(_this.getValueFromCheckData('001','18_6'))).toFixed(2);
};*/
/*ybnsr.sbSend = function () {
    yearReport.confirmBeforeSend();
    if (window.CloseOwnerWindow){
        return window.CloseOwnerWindow("cancel");
    }
};*/
ybnsr.changeFjsbz = function (hasFjs) {
    if (!hasFjs) {
        yearReport.reportWithNext = null;
        yearReport.nextReportHd = null;
    }
    mini.get('gds-win').hide();
};
yearReport.afterInit = function () {
    if (window.location.href.indexOf('needOuterYbjc=Y') !== -1) {
        ybnsr.onConditionOuterYbjc(this);
    }
    if (this.businessType !== 'correct' && this.nextReportHd) {
        ybnsr.compareGds(this);
    }
};
yearReport.checkIsReportWithOthers = function (request) {
    if (this.sblxDm !== '11') {//非正常申报  不使用关联申报
        return false;
    }
    if (this.reportWithNext && this.nextReportHd) {//关联申报，且后续表未申报时
        // var nextReportHd = sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM);
        var nextReportSbzlDm = this.nextReportHd ? (this.nextReportHd.sbzlxlcode || this.nextReportHd.sbzlcode) : '';
        if (this.nextReportHd && nextReportSbzlDm) {//能取到核定，即判定为后续表还没有申报
            var sbtjData = {
                ynse: this.getYnse(this),
                zsxmbm: this.hd.zsxmbm,
                url: location.href,//链接地址，在下个页面返回到当前页面时用到
                request: request//申报提交的请求数据
            };
        }
        sessionStorage.setItem('sbtjData_' + this.sbzlDm, mini.encode(sbtjData));//将申报提交的数据保存到session中
        var curReportWithSbzlDm = Tools.getUrlParamByName('reportWithSbzlDm') || '';
        var postfix = '&reportWithSbzlDm=' + (curReportWithSbzlDm ? curReportWithSbzlDm + '_' + this.sbzlDm : this.sbzlDm);
        window.location.href = this.reportWithNext.url + postfix;//跳转到下一申报界面
        return true;
        // }
    }
    if (!this.reportWithNext && Tools.getUrlParamByName('reportWithSbzlDm')) {//关联申报，无后续申报，且前置申报已申报完成时
        var prevSbtjDatas = this.getPrevSbtjDatas();
        //前置申报的申报数据必须大于0，否则将走正常申报提交的接口
        if (prevSbtjDatas.length > 0) {
            prevSbtjDatas.push(request);
            if (this.checkSubmitTime() && sbcommon.sbtj_batch(prevSbtjDatas)) {
                $.cookie('lastSubmitTime_' + this.sbzlDm + '_' + this.djxh, new Date().getTime());
                window.location.href = this.successUrl + '?sbzlDm=' + this.sbzlDm;
            }
            return true;
        }
    }
    return false;
};
/*yearReport.customConfirmBeforeSend = function () {
    var previewTable = '';
    for (var i=1; i<4; i++){
        if (this.sb_data['00'+i].status === '1'){
            previewTable += sessionStorage.getItem('ybnsr_table_00'+i) ? sessionStorage.getItem('ybnsr_table_00'+i) : '';
        }
    }
    previewTable += (this.sb_data['052'].status === '1' && sessionStorage.getItem('ybnsr_table_052')) ? sessionStorage.getItem('ybnsr_table_052') : '';
    previewTable += (this.sb_data['081'].status === '1' && sessionStorage.getItem('ybnsr_table_081')) ? sessionStorage.getItem('ybnsr_table_081') : '';
    if (!!previewTable){
        mini.open({
            cls:'fixedWindowTop0',
            url: 'sb_ybnsr_view.html',
            showMaxButton : false,
            allowResize : false,
            allowDrag: true,
            title : "预览报表",
            width : 1220,
            height : 600,
            onload: function () {
                var iframe = this.getIFrameEl();
                //调用弹出页面方法进行初始化
                var btnHtml = '<div class="btn-group"><a class="btn btn-blue" >发送报表</a></div>'
                $(iframe.contentWindow.DOC).find('.view-container').html(previewTable);
            }
        });
    } else {
        this.confirmBeforeSend();
    }
};*/
yearReport.needYcsbd = Api.getData('/sbzx-web/api/sb/sbbd/needBd.ashx', '', 'get').value || false;
yearReport.confirmBeforeSend = function () {
    var that = this;
    mini.confirm('请确认您所提交的申报数据真实有效，若存在问题税务机关将触发异常比对流程，期间网上不再支持申报更正和申报作废，解除异常后重新提供网上更正申报！', '提示', function (action) {
        if (action === 'ok') {
            that.doSend();
        }
    });
};