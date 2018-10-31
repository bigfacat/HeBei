/**
 * Created by chenjunj on 2017/5/27 17:10.
 */
var dc = {
    //初始化下拉菜单
    initSelect: function (_this) {
        $('#table_007').find('select[lb="jmmc"]').empty().append(xfs.getJmxmmcSelectData());
        var ZSPM = _this.hd['zspms']['zspmList'];
        var $trs =$('#table_001').find('tbody tr');
        var ysxfpmx='<option value=""></option>';
        $.each(ZSPM,function(i,v){
            var pmmc = this.pmmc;
            var sl = Number(this.sl);
            var len = this.sl.split('.')[1].length;
            var slInt = Number(this.sl.replace('.',''));
            var pmbm = this.pmbm;
            $inputs = $trs.eq(i+3).find('input:visible');
            $inputs.eq(0).val(pmmc).attr("value",pmmc).attr('pmbm',pmbm);
            $inputs.eq(1).val((slInt/Math.pow(10,len-2))+'%').attr("value",(slInt/Math.pow(10,len-2))+'%');
            if(pmbm === '101021601'){
                ysxfpmx += '<option sl='+sl+' sllx="01" value="'+pmbm+'">'+pmmc+'</option>';
            }
        });
        $('#table_007').find('select[lb="ysxfpmc"]').empty().append(ysxfpmx);

    },
    initTable001FromHd: function (_this) {
        var qcwjse = _this.wsxxMap['QCWJSE'];
        $('#qcwjse').val(qcwjse).attr('value',qcwjse).blur();
        var bqyj = _this.wsxxMap['BQYJ'];
        $('#bqyj').val(bqyj).attr('value',bqyj).blur();
    },
    /*001表添加Title*/
    table001AddTitle: function () {
        var $trs = $('#table_001 tbody tr:gt(2):lt(9)');
        $.each($trs,function (i,curTr) {
            var $ysxfpmc = $(curTr).find('td:eq(0) input');
            $ysxfpmc.attr('title',$ysxfpmc.val());
        })
    },
    /*007表中select change事件*/
    bind007SelectChange: function () {
        var that = this;
        $("#table_007").on('change', 'select', function(){
            $(this).attr('lb') === 'jmmc'? that.jmmcChange(this): that.ysxfpmcChange(this);
        });
    },
    /*应税消费品名称改变*/
    ysxfpmcChange: function (_this) {
        xfs.resetRow($(_this));
        var code = $(_this).find('option:selected').attr("sl");
        var sllx = $(_this).find('option:selected').attr("sllx");
        var optVal = $(_this).find('option:selected').text();
        var $tr = $(_this).parent().parent();
        if(sllx == "01"){
            var len = code.split('.')[1].length;
            code = Number(code.replace('.',''));
            $tr.find('td:eq(4) input').val((code/Math.pow(10,len-2))+'%').attr("value",(code/Math.pow(10,len-2))+'%');
        }else if(sllx == "02"){
            $tr.find('td:eq(6) input').val(code).attr("value",code);
        }
        var $td2Select = $tr.find('td:eq(2) select');
        var $td3Input = $tr.find('td:eq(3) input');
        if(optVal !== ""){
            $td2Select.removeAttr('disabled');
            $td3Input.removeAttr('disabled');
        }else{
            $td2Select.attr("disabled","disabled");
            $td3Input.attr("disabled","disabled");
        }
    },
    /*减免名称改变*/
    jmmcChange: function (_this) {
        var code = $(_this).children('option:selected').attr("value");
        $(_this).parent().prev().find("input").val(code).attr('value',code);
    },
    /*主表无核定的行，不允许编辑*/
    disableNoHdRow: function () {
        for(var i=3;i<12;i++){
            var $tr = $("#table_001 tbody tr").eq(i);
            if($tr.find('td:eq(0) input').val() === '')
                $tr.find('input').parent().html('').removeClass('enable');
        }
    },
    /*校验明细表减免性质相同时，应税消费品是否重复*/
    check007YsxfpmcRepeat: function () {
        var $trs = $('#table_007 tbody tr:lt(10):gt(2)');
        var jmxzMap = {};
        for(var i=0;i<$trs.length;i++){
            var $curZspmSelect = $($trs[i]).find('td:eq(0) select');
            var zspmdm = $curZspmSelect.val();
            var ysxfpmc = $curZspmSelect.find('option:selected').html();
            var jmxzdm = $($trs[i]).find('td:eq(1) input').val();
            if(zspmdm){
                if(jmxzMap[jmxzdm]){
                    if(jmxzMap[jmxzdm].indexOf(zspmdm) === -1){
                        jmxzMap[jmxzdm].push(zspmdm);
                    }else{
                        var $zspmTrs = $trs.find('select[lb="ysxfpmc"] option[value="'+zspmdm+'"]:selected').parent().parent().parent();
                        $zspmTrs.find('td:lt(3)').addClass('report_error');
                        mini.get('tabs').activeTab('007');
                        mini.alert('减免性质代码相同时，征收品目(应税消费品名称)不能重复！');
                        return false;
                    }
                }else{
                    jmxzMap[jmxzdm] = [zspmdm];
                }
            }
        }
        return true;
    },
    /*检验本期减免计算表本期减(免)税额合计是否与主表本期减免税额相等*/
    check002Jmsehj002EqualBqjmse001: function () {
        var $jmsehj002Input = $('#table_002 tbody tr:eq(10) td:eq(4) input');
        var $bqjmse001Input = $('#table_001 tbody tr:eq(14) td:eq(2) input');
        var jmsehj002 = Number($jmsehj002Input.val());//计算表应纳税额合计
        var bqjmse001 = Number($bqjmse001Input.val());//主表本期减免税额
        if(jmsehj002 !== bqjmse001){
            $jmsehj002Input.parent().addClass('report_error');
            $bqjmse001Input.parent().addClass('report_error');
            mini.get('tabs').activeTab('002');
            mini.alert('《本期减（免）税额计算表》表中“本期减免税额合计”必须等于主表的“本期减免税额”！');
            return false;
        }
        return true;
    },
    /*校验本期减免计算表中的XXX品目的本期减免税额不能大于主表相同品目对应的应纳税额*/
    check002Bqynse001LessThanJmsehj002: function () {
        var $jmsehj002Input = $('#table_002 tbody tr:eq(10) td:eq(4) input');
        var $bqynse001Input = $('#table_001 tbody tr:eq(12) td:eq(4) input');
        var jmsehj002 = Number($jmsehj002Input.val());//计算表应纳税额合计
        var bqynse001 = Number($bqynse001Input.val());  //主表应纳税额合计
        if(jmsehj002 > bqynse001){
            $jmsehj002Input.parent().addClass('report_error');
            $bqynse001Input.parent().addClass('report_error');
            mini.get('tabs').activeTab('002');
            mini.alert('《本期减（免）税额计算表》表中“本期减免税额合计”不能大于主表的“应纳税额合计”！');
            return false;
        }
        return true;
    }
};
/*自定义初始化*/
servyouReport.customInit = function () {
    dc.initSelect(this);
    dc.disableNoHdRow();
};
servyouReport.customInitFromHd = function () {
    dc.initTable001FromHd(this);
};
servyouReport.afterInit = function () {
    dc.table001AddTitle();
};
/*自定义事件*/
servyouReport.customEvent = function () {
    dc.bind007SelectChange();
};
/*js校验002表*/
servyouReport.checkTable_002 = function () {
    return dc.check002Jmsehj002EqualBqjmse001() && dc.check002Bqynse001LessThanJmsehj002();
};
/*js校验007表*/
servyouReport.checkTable_007 = function () {
    return dc.check007YsxfpmcRepeat();
};
/*001转报文*/
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001 tbody tr');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text(this.tbrq);
    $xml.find('qcwjse').text(this.getInputValue($trs.eq(15).find('td:eq(2) input')));
    $xml.find('bqjnqqynse').text(this.getInputValue($trs.eq(16).find('td:eq(2) input')));
    $xml.find('bqyjse').text(this.getInputValue($trs.eq(17).find('td:eq(2) input')));
    $xml.find('bqybtse').text(this.getInputValue($trs.eq(18).find('td:eq(2) input')));
    $xml.find('qmwjse').text(this.getInputValue($trs.eq(19).find('td:eq(2) input')));
    $xml.find('bqzykcse').text(this.getInputValue($trs.eq(13).find('td:eq(2) input')));
    $xml.find('bqjmse').text(this.getInputValue($trs.eq(14).find('td:eq(2) input')));
    var count = 0;
    var $sbsjxxGrid7 = $xml.find('sbsjxxGrid7');
    var lbClone = $sbsjxxGrid7.find('sbsjxxGridlb:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var i=3;i<12;i++){
        var $curTr = $trs.eq(i);
        var $ysxfpmcInput = $curTr.find('td:eq(0) input');
        var ysxfpmc = this.getInputValue($ysxfpmcInput);
        if(ysxfpmc && ysxfpmc !== ''){
            count += 1;
            var newLbClone = lbClone.clone();
            $(newLbClone).find('ewbhxh').text(count);
            $(newLbClone).find('zspmDm').text($ysxfpmcInput.attr('pmbm'));
            var sl = this.getInputValue($curTr.find('td:eq(1) input'));
            $(newLbClone).find('sl1').text(sl);
            $(newLbClone).find('xssl').text(this.getInputValue($curTr.find('td:eq(2) input')));
            $(newLbClone).find('xse').text(this.getInputValue($curTr.find('td:eq(3) input')));
            $(newLbClone).find('ynse').text(this.getInputValue($curTr.find('td:eq(4) input')));
            $sbsjxxGrid7.append(newLbClone);
        }
    }
    return $xml;
};
/*002转报文*/
servyouReport.changeXml_002 = function () {
    var $trs = $('#table_002 tbody tr');
    var $xml = this.getJ3Xml('002');
    for(var i=0;i<7;i++){
        var $curTr = $trs.eq(i+3);
        $xml.find('bqjmsejsbdcGridlb:eq('+i+') bqjmsl').text(this.getInputValue($curTr.find('td:eq(1) input')));
        $xml.find('bqjmsejsbdcGridlb:eq('+i+') bqjmxse').text(this.getInputValue($curTr.find('td:eq(2) input')));
        $xml.find('bqjmsejsbdcGridlb:eq('+i+') sysl').text(this.getInputValue($curTr.find('td:eq(3) input')));
        $xml.find('bqjmsejsbdcGridlb:eq('+i+') bqjmse').text(this.getInputValue($curTr.find('td:eq(4) input')));
    }
    return $xml;
};
/*003转报文*/
servyouReport.changeXml_007 = function () {
    var $trs = $('#table_007 tbody tr');
    var $xml = this.getJ3Xml('007');
    var $bqjmsemxbGrid = $xml.find('bqjmsemxbGrid');
    var lbClone = $bqjmsemxbGrid.find('bqjmsemxbGridlb:eq(0)').clone();
    $bqjmsemxbGrid.empty();
    var count = 0;
    for(var i=0;i<7;i++){
        var $curTr = $trs.eq(i+3);
        var zspmDm = $curTr.find('td:eq(0) select option:selected').val();
        if(zspmDm){
            count += 1;
            var newLbClone = lbClone.clone();
            $(newLbClone).find('ewbhxh').text(count);
            $(newLbClone).find('zspmDm').text(zspmDm);
            var ssjmxzDm = $curTr.find('td:eq(2) select option:selected').val();
            $(newLbClone).find('ssjmxzDm').text(ssjmxzDm);
            var curSwsxDm = xfs.getSwsxDm($curTr.find('td:eq(1) input').val());
            $(newLbClone).find('swsxDm').text(curSwsxDm);
            var bqjmxse = this.getInputValue($curTr.find('td:eq(3) input'));
            $(newLbClone).find('bqjmxse').text(bqjmxse);
            var blsl = this.getInputValue($curTr.find('td:eq(4) input'));
            $(newLbClone).find('blsl').text(blsl);
            var bqjmsl = this.getInputValue($curTr.find('td:eq(5) input'));
            $(newLbClone).find('bqjmsl').text(bqjmsl);
            var desl1 = this.getInputValue($curTr.find('td:eq(6) input'));
            $(newLbClone).find('desl1').text(desl1);
            var bqjmse = this.getInputValue($curTr.find('td:eq(7) input'));
            $(newLbClone).find('bqjmse').text(bqjmse);
            $bqjmsemxbGrid.append(newLbClone);
        }
    }
    return $xml;
};
/*004转报文*/
servyouReport.changeXml_003 = function () {
    var $trs = $('#table_003 tbody tr');
    var $xml = this.getJ3Xml('003');
    var $bqdsdjsejsbdcGridlbs = $xml.find('bqdsdjsejsbdcGridlb');
    var that = this;
    $.each($bqdsdjsejsbdcGridlbs, function (i,v) {
        var index = i===0?i+1:i+2;
        var sysl = that.getInputValue($trs.eq(2).find('td:eq('+index+') input'));
        $(this).find('sysl').text(sysl);
        var stjgsl = that.getInputValue($trs.eq(3).find('td:eq('+index+') input'));
        $(this).find('stjgsl').text(stjgsl);
        var tlcpxsjg = that.getInputValue($trs.eq(4).find('td:eq('+index+') input'));
        $(this).find('tlcpxsjg').text(tlcpxsjg);
        var clcb = that.getInputValue($trs.eq(5).find('td:eq('+index+') input'));
        $(this).find('clcb').text(clcb);
        var jgf = that.getInputValue($trs.eq(6).find('td:eq('+index+') input'));
        $(this).find('jgf').text(jgf);
        var zcjsjg = that.getInputValue($trs.eq(7).find('td:eq('+index+') input'));
        $(this).find('zcjsjg').text(zcjsjg);
        var bqdsdjsk = i===0?that.getInputValue($trs.eq(8).find('td:eq('+index+') input')):'0.00';
        $(this).find('bqdsdjsk').text(bqdsdjsk);
        var bqstjgjmsk = i===0?'0.00':that.getInputValue($trs.eq(9).find('td:eq('+index+') input'));
        $(this).find('bqstjgjmsk').text(bqstjgjmsk);
    });
    return $xml;
};
$(function () {
    servyouReport.init();
});