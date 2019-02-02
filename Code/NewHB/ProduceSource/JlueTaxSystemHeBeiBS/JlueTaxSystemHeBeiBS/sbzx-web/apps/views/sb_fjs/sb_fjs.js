/**
 * Created by liun on 2017/12/5.
 */
var fjs = {
    isInit: true,
    xfsPmbms: ['302030300','101090103','302160300'],// 消费税品目编码
    zzsPmbms: ['302160100','302030100','101090101'],//增值税品目编码
    // xfsSbzLDms: [],
    zzsSbzLDms: ['10101','10110','10102','10103'],//增值税申报种类代码
    nsrdjxh: '',
    jmxzArr: [],
    // dfjyffjData: [{jmxzDm: '0099129999', jmxzMc: '其他'}],// 地方教育费附加  0099129999
    dfjyffjOptions: '<option value="">--请选择--</option>' +
                    '<option value="0099129999">其他</option>',
    /*jyffjData: [{jmxzDm: '0061042801', jmxzMc: '小微企业免征教育费附加|《财政部 国家税务总局关于对小微企业免征有关政府性基金的通知》 财税〔2014〕122号第一条'},
                {jmxzDm: '0061042802', jmxzMc: '按月纳税的月销售额或营业额不超过10万元缴纳义务人免征教育费附加|《财政部 国家税务总局关于扩大有关政府性基金免征范围的通知》 财税〔2016〕12号第一条'},
                {jmxzDm: '0061064002', jmxzMc: '国家重大水利工程建设基金免征教育费附加|《财政部 国家税务总局关于免征国家重大水利工程建设基金的城市维护建设税和教育费附加的通知》 财税〔2010〕44号'},
                {jmxzDm: '0061129999', jmxzMc: '其他'}],// 教育费附加  0061129999、0061042801、0061042802、0061064002*/
    jyffjOptions: '<option value="">--请选择--</option>' +
                    '<option value="0061042801">小微企业免征教育费附加|《财政部 国家税务总局关于对小微企业免征有关政府性基金的通知》 财税〔2014〕122号第一条</option>' +
                    '<option value="0061042802">按月纳税的月销售额或营业额不超过10万元缴纳义务人免征教育费附加|《财政部 国家税务总局关于扩大有关政府性基金免征范围的通知》 财税〔2016〕12号第一条</option>' +
                    '<option value="0061064002">国家重大水利工程建设基金免征教育费附加|《财政部 国家税务总局关于免征国家重大水利工程建设基金的城市维护建设税和教育费附加的通知》 财税〔2010〕44号</option>' +
                    '<option value="0061129999">其他</option>',
    /*cjfData: [{jmxzDm:'0007064002', jmxzMc:'国家重大水利工程建设基金免征城市维护建设税|《财政部 国家税务总局关于免征国家重大水利工程建设基金的城市维护建设税和教育费附加的通知》 财税〔2010〕44号'}, ,
              {jmxzDm:'0007129999', jmxzMc:'其他'}],// 城建费 0007064002、0007129999*/
    cjfOptions: '<option value="">--请选择--</option>' +
                '<option value="0007064002">国家重大水利工程建设基金免征城市维护建设税|《财政部 国家税务总局关于免征国家重大水利工程建设基金的城市维护建设税和教育费附加的通知》 财税〔2010〕44号</option>' +
                '<option value="0007129999">其他</option>',
    initHdJmxz: function (_this) {
        $.each(_this.hd.jmxx,function () {
            fjs.jmxzArr.push(this.ssjmxzhzDm+'-'+this.jmsspsxDm);
        })
    },
    customInit001:function (_this) {
        var that = this;
        var $trs = $('#table_001 tbody tr:gt(6):lt(20)');
        var zspms = _this.hd.zspms.zspmList;
        $('#djzclx').html(Api.getMcByDm('djzclx',_this.nsrData.djzclxDm)); //登记注册类型
        $('#sshy').html(Api.getMcByDm('hy',_this.nsrData.hyDm)); // 行业名称
        $('.sfzjhm').val(_this.nsrData.fddbrsfzjhm).attr('value',_this.nsrData.fddbrsfzjhm).blur();//身份证件号码
        $('.lxfs').val(_this.nsrData.nsrxxKzVO.scjydlxdh).attr('value',_this.nsrData.nsrxxKzVO.scjydlxdh).blur();//联系电话
        var count = -1;
        $.each(zspms,function (i,zspm) {
            var zsxmdm = zspm['zsxmdm'];
            var curPmType = '';
            if ((zspm['pmbm'].substr(0,5) === '10109' && zspm['pmbm'].substr(8,1) === '1') || (zspm['pmbm'].substr(0,5) !== '10109' && zspm['pmbm'].substr(6,1) === '1')){
                curPmType = 'zzs';
            } else {
                curPmType = 'xfs';
            }
            // if(that.zzsPmbms.indexOf(zspm['pmbm']) !== -1){
            //     curPmType = 'zzs';
            // }else{
            //     curPmType = 'xfs';
            // }
            if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
                if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) !== -1 && curPmType === 'xfs'){//主税种为增值税
                    return true;
                }else if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) === -1 && curPmType === 'zzs'){//主税种为消费税
                    return true;
                }
            }
            count++;
            var firstInput = $trs.eq(count).find('input:first');
            firstInput.val(zspm['pmmc']).attr("data-zspmbm",zspm['pmbm']).attr("data-zsxmdm",zspm['zsxmdm'])
                .attr("data-uuid",zspm['rdpzuuid']).attr("title",zspm['pmmc']).blur();
            if(curPmType === 'zzs'){
                $trs.eq(count).find('td:eq(2)').addClass('enable').find('input').attr('jsyjbz','zzs-ybzzs').removeAttr('disabled','disabled');
                $trs.eq(count).find('td:eq(3)').addClass('enable').find('input').attr('jsyjbz','zzs-mdse').removeAttr('disabled','disabled');
            } else {
                $trs.eq(count).find('td:eq(4)').addClass('enable').find('input').attr('jsyjbz','xfs-xfs').removeAttr('disabled','disabled');
            }
            $trs.eq(count).find('td:gt(1):lt(3) input').blur();
            $trs.eq(count).find('td:eq(11)').addClass('enable').find('input').removeAttr('disabled','disabled').blur();
            $trs.eq(count).find('td:eq(10) input').val('0.00').attr('value','0.00');
            $trs.eq(count).find('td:eq(7) input').val(zspm['sl']).blur();
            var $jmxz = $trs.eq(count).find('select[data-type="jmxz"]');
            $jmxz.removeAttr('disabled');
            var jmxzOptions = '<option value="">--请选择--</option>';
            var jmxz = Api.getData('/sbzx-web/api/baseCode/get/dsJmxxZsxm/'+zsxmdm+".ashx", null, 'get', false);
            if (!!jmxz && jmxz.length > 0){
                $.each(jmxz,function () {
                    //if ($.inArray(this.JMXZDM+'-'+this.SWSXDM,fjs.jmxzArr) !== -1){
                        jmxzOptions += '<option value="'+this.JMXZDM+'" title="'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'">'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'</option>'
                    //}
                })
            }
            $jmxz.append(jmxzOptions);
            /*if(zsxmdm === '30216'){
                $jmxz.append(fjs.dfjyffjOptions);
            }else if (zsxmdm === '30203'){
                $jmxz.append(fjs.jyffjOptions);
            }else if (zsxmdm === '10109'){
                $jmxz.append(fjs.cjfOptions);
            }*/
            if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
                var ynseTdIndex = curPmType === 'zzs'?'2':'4';
                $trs.eq(count).find('td:eq('+ynseTdIndex+') input').val(_this.prevSBtjData.ynse).blur();//主税种列带出数据
                $trs.eq(count).find('td:lt(5):gt(1) input').attr('disabled','disabled');//非主税种列只读
                if(zsxmdm === '10109'){
                    $jmxz.attr('disabled','disabled');
                }
            }
        });
        for (var i = count+1; i<$trs.length; i++){
            var trIndex = $('#table_001').find('tr').index($trs.eq(i));
            servyouReport.deleteRow('001',trIndex);
        }
    },
    jmxzChange: function (e) {
        $('#table_001').on('change','select', function () {
            var that = this;
            if(!$(this).val()){
                $(this).parent().next().removeClass('enable').find('input').val('0.00').attr('value','0.00').attr('disabled','disabled').blur();
            }else {
                /*if ($.inArray($(this).val(),fjs.jmxzArr) === -1){
                    mini.confirm('所选择的税收减免性质没有进行税收减免备案。','提示(点击“确定”继续选择所选项，点击“取消”按钮取消所选项)',function (action) {
                        if (action === 'cancel'){
                            $(that).val('').change().blur();
                        }
                    });
                }*/
                $(this).parent().next().addClass('enable').find('input').removeAttr('disabled').blur();
                if (!(servyouReport.businessType === 'correct' && fjs.isInit)){
                    $(this).parent().next().addClass('enable').find('input').val('').blur()
                }
            }
        });
    },
    /*sfzjhmChange: function () {
        $('#table_001 thead tr td').removeClass('report_error');
        var validator = new Validator();
        $('#table_001').on('blur','input.sfzjhm',function () {
            var that = this;
            if($(that).val() && !validator.isSfzhm($(that).val())){
                $(that).parent().addClass('report_error');
                mini.alert('您填写的身份证件号码格式不正确，请重填！','提示',function () {
                    $(that).val('').blur();
                });
            }
        })
    },
    lxfsChange: function () {
        $('#table_001 thead tr td').removeClass('report_error');
        var validator = new Validator();
        $('#table_001').on('blur','input.lxfs',function () {
            var that = this;
            if($(that).val() && !validator.isPhoneNum($(that).val()) && !validator.isTelNum($(that).val())){
                $(that).parent().addClass('report_error');
                mini.alert('您填写的联系方式格式不正确，请重填！','提示',function () {
                    $(that).val('').blur();
                });
            }
        })
    },*/
    jsyjChange: function () {
        $('#table_001').on('change','input[jsyjbz="zzs-ybzzs"]',function () {
            $('input[jsyjbz="zzs-ybzzs"]').not($(this)).val($(this).val()).blur();
        }).on('change','input[jsyjbz="zzs-mdse"]',function () {
            $('input[jsyjbz="zzs-mdse"]').not($(this)).val($(this).val()).blur();
        }).on('change','input[jsyjbz="xfs-xfs"]',function () {
            $('input[jsyjbz="xfs-xfs"]').not($(this)).val($(this).val()).blur();
        })
    },
    checkTable_001: function () {
        var $trs = $('#table_001 tbody tr:gt(6):lt(20)');
        var $sfzjhm = $('input.sfzjhm');
        $trs.find('td').removeClass('report_error');
        $sfzjhm.parent().removeClass('report_error');
        var flag = true;
        if($("input[type='radio']:checked").val() === '2' && !$sfzjhm.val()){
            $sfzjhm.parent().addClass('report_error');
            mini.alert('身份证件号码填写不完整，请检查！');
            return false;
        }
        $.each($trs,function(i){
            var bqynsfe = Number($(this).find('td:eq(8) input').val());
            var jme = Number($(this).find('td:eq(10) input').val());
            var bqyj = Number($(this).find('td:eq(11) input').val());
            if(!$(this).find('td:eq(0) input').val()){
                return false;
            }
            if(jme>bqynsfe){
                mini.alert('第9列减免额必须小于等于第7列本期应纳税（费）额');
                $(this).find('td:eq(8)').addClass('report_error');
                $(this).find('td:eq(10)').addClass('report_error');
                flag = false;
                return false;
            }
            if (bqyj > bqynsfe){
                mini.alert('第10列本期已缴税（费）额必须小于等于第7列本期应纳税（费）额');
                $(this).find('td:eq(8)').addClass('report_error');
                $(this).find('td:eq(10)').addClass('report_error');
                flag = false;
                return false;
            }
            if($(this).find('select').val() && jme<=0){
                mini.alert('“减免性质代码”不为空时，第9列“减免额”必须大于0.00');
                $(this).find('td:eq(9)').addClass('report_error');
                $(this).find('td:eq(10)').addClass('report_error');
                flag = false;
                return false;
            }
        });
        return flag;
    }
};
servyouReport.showReportTip = false;
servyouReport.customInitLocalData = function () {
    fjs.initHdJmxz(this);
};
//自定义事件
servyouReport.customInit = function () {
    fjs.customInit001(this);
};
servyouReport.customEvent = function () {
    // fjs.sfzjhmChange();
    // fjs.lxfsChange();
    fjs.jmxzChange();
    fjs.jsyjChange();
};
servyouReport.afterInit = function () {
    mini.alert('请据实填写报表“一般增值税、免抵税额、消费税、本期减免税（费）额、本期已缴税（费）额”等内容。');
    fjs.isInit = false;
};
//js校验001表
servyouReport.checkTable_001 = function () {
    return fjs.checkTable_001();
};
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001 tbody tr:gt(6):lt(20)');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text("2019-01-15");
    $xml.find('sbsxDm1').text('11');    //申报属性代码，11是正常申报
    $xml.find('djlx').text('1');    //默认djlx为单位
    $xml.find('djzclxDm').text(this.nsrData.djzclxDm);
    $xml.find('hyDm').text(this.nsrData.hyDm);
    $xml.find('zjhm').text($('.sfzjhm').val());
    $xml.find('lxfs').text($('.lxfs').val());
    $xml.find('slrq').text("2019-01-15");
    // $xml.find('slswjg').text(Api.getMcByDm('swjg',this.nsrData.zgswjDm));
    var $sbxxGrid = $xml.find('sbxxGrid');
    var $lbClone= $sbxxGrid.find('sbxxGridlbVO:eq(0)').clone();
    $sbxxGrid.empty();
    for(var i=0; i<20; i++){
        var $curTr = $trs.eq(i);
        if(!$curTr.find('td:eq(0) input').val()){
            break;
        }
        var $newlbClone = $lbClone.clone();
        $newlbClone.find('ewbhxh').text(i+1);
        $newlbClone.find('zsxmDm').text($curTr.find('td:eq(0) input').attr('data-zsxmdm'));
        $newlbClone.find('zspmDm').text($curTr.find('td:eq(0) input').attr('data-zspmbm'));
        $newlbClone.find('ybzzs').text($curTr.find('td:eq(2) input').val() || '0.00');
        $newlbClone.find('zzsmdse').text($curTr.find('td:eq(3) input').val() || '0.00');
        $newlbClone.find('xfs').text($curTr.find('td:eq(4) input').val() || '0.00');
        $newlbClone.find('yys').text($curTr.find('td:eq(5) input').val() || '0.00');
        $newlbClone.find('hj').text($curTr.find('td:eq(6) input').val() || '0.00');
        $newlbClone.find('sl1').text(this.getInputValue($curTr.find('td:eq(7) input')));
        $newlbClone.find('bqynsfe').text($curTr.find('td:eq(8) input').val());
        $newlbClone.find('jmxzDm').text($curTr.find('select').val());
        $newlbClone.find('ssjmxzDm').text($curTr.find('select').val());
        $newlbClone.find('jme').text($curTr.find('td:eq(10) input').val());
        $newlbClone.find('bqyjse').text($curTr.find('td:eq(11) input').val());
        $newlbClone.find('bqybtse').text($curTr.find('td:eq(12) input').val());
        $newlbClone.find('rdpzuuid').text($curTr.find('td:eq(0) input').attr('data-uuid'));
        $sbxxGrid.append($newlbClone);
    }
    return $xml;
};
sbcommon.getResumeData_fjs = function () {
    var url = '/sbzx-web/api/sb/fjs/getSbmx';
    var request = {
        sbxh: sessionStorage.getItem('sbxh'),
        qqwjm: sessionStorage.getItem('qqwjm')
    };
    return Api.getData(url, request);
};
servyouReport.chooseToGo = function () {
    var request = {
        djxh: this.djxh,
        sbzlDm: this.sbzlDm,
        sssqQ: this.sssqq,
        sssqZ: this.sssqz,
        sblxDm: this.sblxDm
    };
    if(sessionStorage.getItem('zsZsxmDm')){
        request = {
            sbxh: sessionStorage.getItem('sbxh'),
            qqwjm: sessionStorage.getItem('qqwjm')
        };
        var resumeData = sbcommon.getResumeData_fjs(request);
    }else{
        var resumeData = sbcommon.getResumeData_normal(request);
    }
    this.nextReportHd = this.reportWithNext && this.reportWithNext.getHdByDM ? sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM): null;
    if(resumeData && resumeData.jsonData && resumeData.jsonData.htmlData){
        this.resumeData = resumeData;
        var that = this;
        if(this.sblxDm === '11' && this.reportWithNext && this.nextReportHd && sessionStorage.getItem(this.sbzlDm+'isBackFromNext') === 'Y'){//关联申报,有下级申报，且有下级申报核定，且存在暂存数据时,且从下级申报返回过来，直接使用暂存数据
            this.useResumeData = true;
            // this.businessType = 'resume';
            this.run();
            return;
        }
        if(this.sblxDm === '11' && location.href.indexOf('reportWithSbzlDm') !== -1){//关联申报,无下级申报，永不使用暂存数据
            this.run();
            return ;
        }
        if(this.sblxDm === '11' && sessionStorage.getItem('zsZsxmDm')){//关联申报在重新申报时，直接使用暂存数据
            this.useResumeData = true;
            // this.businessType = 'resume';
            this.run();
            return;
        }
        mini.confirm('系统检测到您上次填写了申报表，点击确定还原上次填写的数据，点击取消重新填写申报表！', '提示', function (action) {
            if(action === 'ok'){
                that.useResumeData = true;
            }else{
                that.useResumeData = false;
            }
            that.run();
        });
    }else{
        this.run();
    }
};
servyouReport.send = function () {
    var that = this;
    var j3Xmls = [];
    $('table[type="sb"]').each(function () {
        var sb_id = $(this).attr('sb_id');
        if(typeof that['changeXml_'+sb_id] === 'function'){
            var obj = {};
            var $xml = that['changeXml_'+sb_id].apply(that,[]);
            var bbxml = '';
            if($xml.children().length !== 0){
                bbxml = xmlUtil.turnXmlToStr($xml[0]).replace(/[\n\t]/g,'').replace(/>\s+</g,'><');
                //(去除换行及节点间的空格)
            }
            obj['bbwjm'] = that.sbzlDm+'_'+sb_id+'.xml';
            obj['bbxml'] = bbxml;
            j3Xmls.push(obj);
        }
    });
    if(this.prevSbzlDm || sessionStorage.getItem('zsSbzlDm')){
        var zszZsxmDm = '';
        var zszSbzlDm = '';
        if(this.prevSbzlDm){
            zszZsxmDm = this.prevSBtjData.zsxmbm;
            zszSbzlDm = this.prevSbzlDm;
        }else if(sessionStorage.getItem('zsSbzlDm')){
            zszZsxmDm = sessionStorage.getItem('zsZsxmDm');
            zszSbzlDm = sessionStorage.getItem('zsSbzlDm');
        }
        var  xmlObj = {
            "bbwjm": this.sbzlDm +"_002.xml",
            "bbxml": "<taxML><sbxx><zsxmDm>"+zszZsxmDm+"</zsxmDm><sbzldm>"+zszSbzlDm+"</sbzldm></sbxx></taxML>"
        };
        j3Xmls.push(xmlObj);
    }
    var htmlData = this.getPreviewData();
    var formulaData = this.getFormulas();
    var r = window.location.search.substr(1);
    var values = r.split('&');
    function data(i) {
        var pos = values[i].indexOf('=');
        var data = values[i].substr(pos + 1);
        return data;
    }
    var request = {
        id:data(1),
        djxh: this.gsNsrData.djxh,
        sblxDm: this.sblxDm,
        pzxh: this.pzxh,
        sssqq: this.sssqq,
        sssqz: this.sssqz,
        formulaData: mini.encode(formulaData),
        sbformdata: mini.encode(htmlData),
        sbzlDm: this.sbzlDm,
        sbwjs: mini.encode(j3Xmls)
    };
    if(this.checkSubmitTime() && sbcommon.sbtj_normal(request)){//正常申报提交
        $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());
        //window.location.href = this.successUrl+'?sbzlDm='+this.sbzlDm;
        mini.alert('已完成申报！');
    }
};
$(function () {
    servyouReport.init();
});
/**
 * Created by liun on 2018/5/15.
 */
/*fjs.xfsPms = {
    "101090103": "消费税附征城市维护建设费",
    "101090203": "消费税附征县城、镇维护建设费",
    "101090303": "消费税附征非市区、县城、镇维护建设费",
    "302030300": "消费税教育费附加",
    "302160300": "消费税地方教育费附加"
};
fjs.zzsPms = {
    "101090101":"增值税附征城市维护建设费",
    "101090201":"增值税附征县城、镇维护建设费",
    "101090301":"增值税附征非市区、县城、镇维护建设费",
    "302030100":"增值税教育费附加",
    "302160100":"增值税地方教育费附加"
};*/
fjs.xfsPmbms = ['302030300','101090103','302160300','101090203', '101090303'];// 消费税品目编码
fjs.zzsPmbms = ['302160100','302030100','101090101','101090201', '101090301'];//增值税品目编码
fjs.customInit001 = function (_this) {
    var that = this;
    var $trs = $('#table_001 tbody tr:gt(6):lt(20)');
    var zspms = _this.hd.zspms.zspmList;
    $('#djzclx').html(Api.getMcByDm('djzclx',_this.nsrData.djzclxDm)); //登记注册类型
    $('#sshy').html(Api.getMcByDm('hy',_this.nsrData.hyDm)); // 行业名称
    $('.sfzjhm').val(_this.nsrData.fddbrsfzjhm).attr('value',_this.nsrData.fddbrsfzjhm).blur();//身份证件号码
    $('.lxfs').val(_this.nsrData.nsrxxKzVO.scjydlxdh).attr('value',_this.nsrData.nsrxxKzVO.scjydlxdh).blur();//联系电话
    var count = -1;
    var temp;
    for (var i=0; i<zspms.length-1; i++){
        if (Number(zspms[i].zsxmdm) > Number(zspms[i+1].zsxmdm)){
            temp = zspms[i];
            zspms[i] = zspms[i+1];
            zspms[i+1] = temp;
        }
    }
    $.each(zspms,function (i,zspm) {
        var zsxmdm = zspm['zsxmdm'];
        var curPmType = '';
        if(that.zzsPmbms.indexOf(zspm['pmbm']) !== -1){
            curPmType = 'zzs';
        }else{
            curPmType = 'xfs';
        }
        if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
            if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) !== -1 && curPmType === 'xfs'){//主税种为增值税
                return true;
            }else if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) === -1 && curPmType === 'zzs'){//主税种为消费税
                return true;
            }
        }
        count++;
        var firstInput = $trs.eq(count).find('input:first');
        var pmmc = zspm['pmmc'];
        firstInput.val(pmmc).attr("data-zspmbm",zspm['pmbm']).attr("data-zsxmdm",zspm['zsxmdm'])
            .attr("data-uuid",zspm['rdpzuuid']).attr("title", pmmc).blur();
        if(curPmType === 'zzs'){
            $trs.eq(count).find('td:eq(2)').addClass('enable').find('input').attr('jsyjbz','zzs-ybzzs').removeAttr('disabled','disabled');
            $trs.eq(count).find('td:eq(3)').addClass('enable').find('input').attr('jsyjbz','zzs-mdse').removeAttr('disabled','disabled');
        } else {
            $trs.eq(count).find('td:eq(4)').addClass('enable').find('input').attr('jsyjbz','xfs-xfs').removeAttr('disabled','disabled');
        }
        $trs.eq(count).find('td:eq(11)').addClass('enable').find('input').removeAttr('disabled','disabled').blur();
        $trs.eq(count).find('td:eq(10) input').val('0.00').attr('value','0.00');
        $trs.eq(count).find('td:eq(7) input').val(zspm['sl']).blur();
        var $jmxz = $trs.eq(count).find('select[data-type="jmxz"]');
        $jmxz.removeAttr('disabled');
        var jmxzOptions = '<option value="">--请选择--</option>';
        var jmxz = Api.getData('/sbzx-web/api/baseCode/get/dsJmxxZsxm/'+zsxmdm+".ashx", null, 'get', false);
        if (!!jmxz && jmxz.length > 0){
            $.each(jmxz,function () {
                //if ($.inArray(this.JMXZDM+'-'+this.SWSXDM,fjs.jmxzArr) !== -1){
                    jmxzOptions += '<option value="'+this.JMXZDM+'" title="'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'">'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'</option>'
                //}
            })
        }
        $jmxz.append(jmxzOptions);
        /*if(zsxmdm === '30216'){
            $jmxz.append(fjs.dfjyffjOptions);
        }else if (zsxmdm === '30203'){
            $jmxz.append(fjs.jyffjOptions);
        }else if (zsxmdm === '10109'){
            $jmxz.append(fjs.cjfOptions);
        }*/
        // $jmxz.val(zspm['ssjmxzDm']).change();
        if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
            var ynseTdIndex = curPmType === 'zzs'?'2':'4';
            $trs.eq(count).find('td:eq('+ynseTdIndex+') input').val(_this.prevSBtjData.ynse).blur();//主税种列带出数据
            $trs.eq(count).find('td:lt(5):gt(1) input').attr('disabled','disabled');//非主税种列只读
            /*if(ynseTdIndex==='2'){
                $trs.eq(count).find('td:eq('+ynseTdIndex+') input').removeAttr("disabled");//增殖税可修改
            }*/
            if(zsxmdm === '10109'){
                $jmxz.attr('disabled','disabled');
            }
            /*$jmxz.attr('disabled','disabled');
            if (!!$jmxz.val()){
                $trs.eq(count).find('td:eq(10) input').val(zspm['jmse']).attr({'value':zspm['jmse'], 'disabled':'disabled'}).blur();
                $trs.eq(count).find('td:eq(10)').removeClass('enable');
                $trs.eq(count).find('td:eq(11)').removeClass('enable').find('input').attr('disabled','disabled');
            }*/
        }
    });
    for (var i = count+1; i<$trs.length; i++){
        var trIndex = $('#table_001').find('tr').index($trs.eq(i));
        servyouReport.deleteRow('001',trIndex);
    }
};
/*servyouReport.setHd = function () {
    if (this.mock){
        this.hd = this.getLocalJson(this.mockApi['hd']);
    } else {
        var sbzlDms = Tools.getUrlParamByName('reportWithSbzlDm').split('_');
        if (sbzlDms.length > 0){
            var sbtjData = mini.decode(sessionStorage.getItem('sbtjData_'+sbzlDms[sbzlDms.length-1]));
            if($.inArray(sbtjData.request.sbzlDm,['10101','10306','10102','10302','10303','10304','10305','10307','10310','10311']) !== -1){
                this.sbzlDm='10115';
            }else{
                this.sbzlDm='10116';
            }
            fjs.ybtse = sbtjData.ybtse;
            fjs.bhsxse = sbtjData.bhsxse;
            fjs.zszSbzlDm = sbtjData.request.sbzlDm;
            fjs.zsxmbm = sbtjData.zsxmbm;
            var params = {
                djxh:this.nsrData.djxh,     // 登记序号
                ssdabh:'',   // 档案编号
                skssqq:sbtjData.request.sssqq,   // 税款所属期起
                skssqz:sbtjData.request.sssqz,   // 税款所属期止
                zsxmDm:sbtjData.zsxmbm,   // 征收项目代码
                jylxDm:'101',   // 101计算税款，102正式申报
                fjsjsyj:sbtjData.ybtse,  // 应补退税额
                bhsxse:sbtjData.bhsxse    // 不含税销售额
            };
            var fjsHdXml = '';
            ajax.post('/sbzx-web/api/hb/sb/fjs/getFjsjsxx', mini.encode(params), function (response) {
                if(response.success){
                    fjsHdXml = mini.decode(response.value);
                }else{
                    mini.alert(response.message,'提示',function () {
                        window.history.go(-1);
                    });
                }
            }, function () {
                mini.alert('附加税计税依据信息获取失败','提示',function () {
                    window.history.go(-1);
                });
            });
            fjsHdXml = fjsHdXml.replace('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>', '');
            if (!!fjsHdXml){
                this.hd = xmlUtil.turnXmlToJson(xmlUtil.turnStrToXml(fjsHdXml)).taxML.sbxx;
            }
        }
    }
    //next step
    if(this.checkHd()){
        this.setCommonData();
        this.initMiniTab(['001']);
        //next step
        if(this.preCondition()){
            this.chooseToGo();
        }
    }
};
servyouReport.setCommonData = function () {
    this.sssqq = this.hd['skssqq'];	//所属时期起
    this.sssqz = this.hd['skssqz'];	//所属时期止
    this.tbrq = Date.getLocalDate().format('yyyy-MM-dd');//填表日期
    /!*以下用于关联申报*!/
    var reportWithSbzlDms = Tools.getUrlParamByName('reportWithSbzlDm');
    if(reportWithSbzlDms){
        reportWithSbzlDms = reportWithSbzlDms.split('_');
        this.prevSbzlDm = reportWithSbzlDms[reportWithSbzlDms.length-1];
        this.prevSBtjData = mini.decode(sessionStorage.getItem('sbtjData_'+this.prevSbzlDm));
    }
};*/
/*servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml('001');
    $xml.find('djxh').text(this.hd.djxh);
    $xml.find('ssdabh').text(this.hd.ssdabh);
    // $xml.find('sbzldm').text(fjs.zszSbzlDm);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('fjsjsyj').text(fjs.ybtse);
    $xml.find('bhsxse').text(fjs.bhsxse);
    $xml.find('zsxmDm').text(fjs.zsxmbm);
    return $xml;
};*/
servyouReport.afterInit = function () {
    mini.alert('请据实填写报表“一般增值税、免抵税额、消费税、本期减免税（费）额、本期已缴税（费）额”等内容。');
    /*if(this.prevSBtjData.url.indexOf('zzzd') !== -1){
        this.successUrl = '../public/sb_success_zzzd.html';
    }*/
};
