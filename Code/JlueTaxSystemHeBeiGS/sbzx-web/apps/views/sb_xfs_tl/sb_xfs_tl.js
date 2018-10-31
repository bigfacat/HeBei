var tl = {
    //初始化下拉菜单
    initSelect: function (hd) {
        $('#table_007').find('select[lb="jmmc"]').empty().append(xfs.getJmxmmcSelectData());
        var ZSPM = hd['zspms']['zspmList'];
        var $trs = $('#table_001').find('tbody tr');
        var ysxfpmx = '<option value=""></option>';
        $.each(ZSPM, function (i, v) {
            var pmmc = this.pmmc;
            var sl = Number(this.desl);
            var pmbm = this.pmbm;
            var sllx = this.sllx;
            if (sllx == "01") {
                sl = Number(this.sl);
            } else if (sllx == "02") {
                sl = Number(this.desl);
            }
            ysxfpmx += '<option sl=' + sl + ' sllx="' + sllx + '" value="' + pmbm + '">' + pmmc + '</option>';
        });
        $('select[lb="ysxfpmc"]').empty().append(ysxfpmx);
        var bqjnqqynse = hdxxUtil.getWsxxValueByCode('BQJNQQYNSE', hd);
        $('#bqjnqqynse').val(bqjnqqynse).attr('value', bqjnqqynse).blur();
        var qcwjse = hdxxUtil.getWsxxValueByCode('QCWJSE', hd);
        $('#qcwjse').val(qcwjse).attr('value', qcwjse).blur();
        var bqyj = hdxxUtil.getWsxxValueByCode('BQYJ', hd);
        $('#bqyj').val(bqyj).attr('value', bqyj).blur();

        servyouReport.addFormulas("003", "B13=if(B9>0.00,round(B9*B8*B7,2),round(B12*B7,2))");
        servyouReport.addFormulas("003", "D14=if(D9>0.00,round(D9*D8*D7,2),round(D12*D7,2))");
    },
    /*007表中select change事件*/
    table007SelectChange: function () {
        var that = this;
        $("#table_007").on('change', 'select', function () {
            $(this).attr('lb') === 'jmmc' ? that.jmmcChange(this) : that.ysxfpmcChange(this);
        });
    },

    /*应税消费品名称改变*/
    ysxfpmcChange: function (_this) {
        xfs.resetRow($(_this));
        var code = $(_this).find('option:selected').attr("sl");
        var sllx = $(_this).find('option:selected').attr("sllx");
        var optVal = $(_this).find('option:selected').text();
        var $tr = $(_this).parent().parent();
        if (sllx == "01") {
            var len = code.split('.')[1].length;
            code = Number(code.replace('.',''));
            $tr.find('td:eq(4) input').val((code / Math.pow(10,len-2)) + '%').attr("value", (code / Math.pow(10,len-2)) + '%');
        } else if (sllx == "02") {
            $tr.find('td:eq(6) input').val(code).attr("value", code).blur();
        }
        if (optVal !== "" && sllx == "01") {
            $tr.find('td:eq(2) select').removeAttr('disabled');
            $tr.find('td:eq(3) input').removeAttr('disabled').val('').attr('class', "enable").blur();
            $tr.find('td:eq(5) input').removeClass("enable").attr("disabled", "disabled").val('').blur();
        } else if (optVal !== "" && sllx == "02") {
            $tr.find('td:eq(2) select').removeAttr('disabled');
            $tr.find('td:eq(5) input').removeAttr('disabled').val('').attr('class', "enable");
            $tr.find('td:eq(3) input').removeClass("enable").attr("disabled", "disabled").val('').blur();
        } else {
            $tr.find('td:eq(2) select').attr("disabled", "disabled");
            $tr.find('td:eq(5) input').attr("disabled", "disabled").removeClass("enable");
            $tr.find('td:eq(3) input').val('').blur();
        }
    }
    ,
    /*主表无核定的行，不允许编辑*/
    disableNoHdRow: function () {
        for (var i = 3; i < 12; i++) {
            var $tr = $("#table_001 tbody tr").eq(i);
            if ($tr.find('td:eq(0) input').val() === '')
                $tr.find('input').parent().html('').removeClass('enable');
        }
    }
    ,
    /*减免名称改变*/
    jmmcChange: function (_this) {
        var code = $(_this).children('option:selected').attr("value");
        $(_this).parent().prev().find("input").val(code).attr("value", code);
    }
    ,
    check007YsxfpmcRepeat: function () {
        /*--------------------校验明细表减免性质相同时，应税消费品是否重复---------begin-------------*/
        var $trs = $('#table_007 tbody tr:lt(10):gt(2)');
        var jmxzMap = {};
        $('table td.report_error').removeClass('report_error');
        for (var i = 0; i < $trs.length; i++) {
            var zspmdm = $($trs[i]).find('td:eq(0) select option:selected').attr('value');
            var jmxzdm = $($trs[i]).find('td:eq(1) input').val();
            if (zspmdm) {
                if (jmxzMap[jmxzdm]) {
                    if (jmxzMap[jmxzdm].indexOf(zspmdm) === -1) {
                        jmxzMap[jmxzdm].push(zspmdm);
                    } else {
                        var $zspmTrs = $('#table_007 select[lb="ysxfpmc"] option[value="' + zspmdm + '"]:selected').parent().parent().parent();
                        $zspmTrs.find('td:lt(3)').addClass('report_error');
                        mini.get('tabs').activeTab('007');
                        mini.alert('减免性质代码相同时，征收品目(应税消费品名称)不能重复！');
                        return false;
                    }
                } else {
                    jmxzMap[jmxzdm] = [zspmdm];
                }
            }
        }
        /*--------------------校验明细表减免性质相同时，应税消费品是否重复---------end-------------*/
        return true;
    },
    check007BqjmseNoMoreThan001Ynse: function () {
        /*--------------------校验本期减免计算表中的XXX品目的本期减免税额不能大于主表相同品目对应的应纳税额--begin1-----*/
        var $trs = $('#table_007 tbody tr:lt(10):gt(2)');
        var ysxfp_Map = {};
        $.each($trs, function () {
            var xfpmc_sb_code = $(this).find('td:eq(0) select option:selected').attr('value');
            if (xfpmc_sb_code) {
                var curJmse = $(this).find('td:eq(7) input').val();
                if (ysxfp_Map[xfpmc_sb_code]) {
                    ysxfp_Map[xfpmc_sb_code] = Number(ysxfp_Map[xfpmc_sb_code]) + Number(curJmse);
                } else {
                    ysxfp_Map[xfpmc_sb_code] = curJmse;
                }
            }
        });
        //获取主表的sb_code
        var table0trs = $('#table_001 tbody tr:lt(10):gt(1)');
        for (var i = 0; i < table0trs.length; i++) {
            //var sb_code0 = $('table0').find('input[sb_code='+ysxfp_Map[xfpmc_sb_code]+']');
            var zspmdm = $(table0trs[i]).find('td:eq(0) input').attr('pmbm');
            if (ysxfp_Map[zspmdm]) {//Map 如果存在对应pm
                //做比较
                var x = Number($(table0trs[i]).find('td:eq(5) input').val());
                var y = Number(ysxfp_Map[zspmdm]);
                if (y > x) {
                    mini.get('tabs').activeTab('001');
                    $(table0trs[i]).find('td:eq(5)').addClass('report_error');
                    mini.alert('《减免税额明细表》中相同品目的减免税额合计不能大于主表相同品目对应的应纳税额');
                    return false;
                }
            }

        }

        /*--------------------校验本期减免计算表中的XXX品目的本期减免税额不能大于主表相同品目对应的应纳税额--end1-----*/
        return true;
    }
    ,
    check002Ynse: function () {
        var jmse001 = Number($('#table_001 tbody tr:eq(1) td:eq(4) input').val());//主表应纳税额
        var jmse002 = Number($('#table_002 tbody tr:eq(1) td:eq(4) input').val());//计算表本期减免税额(合计)
        if (jmse002 > jmse001) {
            $('#table_002 tbody tr:eq(1) td:eq(4)').addClass('report_error');
            $('#table_001 tbody tr:eq(1) td:eq(4)').addClass('report_error');
            mini.get('tabs').activeTab('002');
            mini.alert('《本期减（免）税额计算表》表中“本期减免税额合计”不能大于主表的“本期应纳税额”！');
            return false;
        }
        return true;
    }
}

/*001转报文*/
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001 tbody tr');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text(this.tbrq);
    $xml.find('bqzykcse').text(this.getInputValue($trs.eq(2).find('td:eq(2) input')));
    $xml.find('bqjmse').text(this.getInputValue($trs.eq(3).find('td:eq(2) input')));
    $xml.find('qcwjse').text(this.getInputValue($trs.eq(4).find('td:eq(2) input')));
    $xml.find('bqjnqqynse').text(this.getInputValue($trs.eq(5).find('td:eq(2) input')));
    $xml.find('bqyjse').text(this.getInputValue($trs.eq(6).find('td:eq(2) input')));
    $xml.find('bqybtse').text(this.getInputValue($trs.eq(7).find('td:eq(2) input')));
    $xml.find('qmwjse').text(this.getInputValue($trs.eq(8).find('td:eq(2) input')));
    $xml.find('xssl').text(this.getInputValue($trs.eq(1).find('td:eq(2) input')));
    $xml.find('xse').text(this.getInputValue($trs.eq(1).find('td:eq(3) input')));
    $xml.find('ynse').text(this.getInputValue($trs.eq(1).find('td:eq(4) input')));
    return $xml;
};

/*002转报文*/
servyouReport.changeXml_002 = function () {
    var $trs = $('#table_002 tbody tr');
    var $xml = this.getJ3Xml('002');
    $xml.find('bqjmsl').text(this.getInputValue($trs.eq(1).find('td:eq(2) input')));
    $xml.find('bqjmxse').text(this.getInputValue($trs.eq(1).find('td:eq(3) input')));
    $xml.find('bqjmse').text(this.getInputValue($trs.eq(1).find('td:eq(4) input')));
    return $xml;
};

/*003转报文*/
servyouReport.changeXml_003 = function () {
    var $trs = $('#table_003 tbody tr');
    var $xml = this.getJ3Xml('003');
    var $bqdsdjsejsbtlGrid = $xml.find('bqdsdjsejsbtlGrid');
    var lbClone = $bqdsdjsejsbtlGrid.find('bqdsdjsejsbtlGridlb:eq(0)').clone();
    $bqdsdjsejsbtlGrid.empty();
    var count = 0;
    for (var i = 0; i < 2; i++) {
        count += 1;
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewblxh').text(count);
        var lmc = count == 1 ? "非减（免）税涂料" : "减（免）税涂料";
        $(newLbClone).find('lmc').text(lmc);
        $(newLbClone).find('sysl').text(0.0400);
        var stjgsl = this.getInputValue($trs.eq(3).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('stjgsl').text(stjgsl);
        var tlcpxsjg = this.getInputValue($trs.eq(4).find('td:eq(' + (1 + 2 * i) + ') input'))
        $(newLbClone).find('tlcpxsjg').text(tlcpxsjg);
        var clcb = this.getInputValue($trs.eq(5).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('clcb').text(clcb);
        var jgf = this.getInputValue($trs.eq(6).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('jgf').text(jgf);
        var zcjsjg = this.getInputValue($trs.eq(7).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('zcjsjg').text(zcjsjg);
        var bqdsdjsk = this.getInputValue($trs.eq(8).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('bqdsdjsk').text(bqdsdjsk);
        var bqstjgjmsk = this.getInputValue($trs.eq(9).find('td:eq(' + (1 + 2 * i) + ') input'));
        $(newLbClone).find('bqstjgjmsk').text(bqstjgjmsk);
        $bqdsdjsejsbtlGrid.append(newLbClone);
    }
    return $xml;
};

/*007转报文*/
servyouReport.changeXml_007 = function () {
    var $trs = $('#table_007 tbody tr');
    var $xml = this.getJ3Xml('007');
    var $bqjmsemxbGrid = $xml.find('bqjmsemxbGrid');
    var lbClone = $bqjmsemxbGrid.find('bqjmsemxbGridlb:eq(0)').clone();
    $bqjmsemxbGrid.empty();
    var count = 0;
    for (var i = 0; i < 7; i++) {
        var $curTr = $trs.eq(i + 3);
        var zspmDm = $curTr.find('td:eq(0) select option:selected').val();
        if (zspmDm) {
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

/*js校验002表*/
servyouReport.checkTable_002 = function () {
    return tl.check002Ynse();
};

/*js校验007表*/
servyouReport.checkTable_007 = function () {
    return tl.check007YsxfpmcRepeat() && tl.check007BqjmseNoMoreThan001Ynse();
};

/*自定义初始化*/
servyouReport.customInit = function () {
    tl.initSelect(this.hd);
};

/*自定义事件*/
servyouReport.customEvent = function () {
    tl.table007SelectChange();
};

$(function () {
    servyouReport.init();
});