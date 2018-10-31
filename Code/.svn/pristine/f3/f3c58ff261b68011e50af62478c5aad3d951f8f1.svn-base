/**
 * Created by ywy on 2017/6/29.
 */
var ybnsr031 = {
    initHd: function (hd) {
        if (servyouReport.wsxxMap['ZGLXDM'] === "543" && servyouReport.wsxxMap['YBNSRZFJGBZ'] === "1") {
            var $tr = $("#table_031 tbody tr").eq(3);
            $tr.find("td:eq(4) input").removeAttr("disabled");
            $tr.find("td:eq(8) input").removeAttr("disabled");
            $tr.find("td:eq(3) input").val(servyouReport.wsxxMap['FB4FZJGYJQCYE']).blur();
        }
        var inputs = $("#table_031 tbody tr").find("td:eq(3) input");
        inputs.eq(0).val(servyouReport.wsxxMap['FB4JZEQCYE']).blur();
        inputs.eq(2).val(servyouReport.wsxxMap['FB4JZFWYJQCYE']).blur();
        inputs.eq(3).val(servyouReport.wsxxMap['FB4XSBDCYJQCYE']).blur();
        inputs.eq(4).val(servyouReport.wsxxMap['FB4CZBDCYJQCYE']).blur();
        $("#table_031 tbody tr").eq(2).find("td:eq(4) input").val(servyouReport.wsxxMap['FB4JZEBQFSE']).blur();
    }
};
servyouReport.autoAddAllId = true;
servyouReport.customInitFromHd = function () {
    ybnsr031.initHd(this.hd);
};
servyouReport.afterInit = function () {
    /*if(parent.ybnsr.isFromSbhy){
        var data087 = parent.yearReport.sb_data['087'].checkData;
        if(data087 && !$.isEmptyObject(data087)){
            ybnsrService.setDataFromSbhy(data087['031']);
        }
    }*/
    var data087 = parent.yearReport.sb_data['087'];
    if (parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(data087.checkData)) {
        ybnsrService.setDataFromDataMap(data087['checkData']['031']);
    }
};
servyouReport.setDataIntoCheckData = function () {
    var obj = {
        '8_6': $('#031_8_6').val(),
        '8_8': $('#031_8_8').val(),
        '9_8': $('#031_9_8').val(),
        '10_8': $('#031_10_8').val(),
        '11_8': $('#031_11_8').val(),
        '12_8': $('#031_12_8').val()
    };
    return obj;
};
servyouReport.changeXml_031 = function () {
    var $trs = $('#table_031 tbody tr');
    var $xml = this.getJ3Xml('031');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    var $sbsjxxGrid7 = $xml.find('bqjxsemxbGrid');
    var lbClone = $sbsjxxGrid7.find('bqjxsemxbGridlbVO:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for (var i = 1; i < 6; i++) {
        var $curTr_1 = $trs.eq(i + 1);
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(i);
        $(newLbClone).find('hmc').text($curTr_1.find('td:eq(2)').text());
        $(newLbClone).find('qcye').text(this.getInputValue($curTr_1.find('td:eq(3) input')));
        $(newLbClone).find('bqydjse').text(this.getInputValue($curTr_1.find('td:eq(6) input')));
        $(newLbClone).find('bqsjdjse').text(this.getInputValue($curTr_1.find('td:eq(8) input')));
        $(newLbClone).find('bqfse').text(this.getInputValue($curTr_1.find('td:eq(4) input')));
        $(newLbClone).find('qmye').text(this.getInputValue($curTr_1.find('td:eq(10) input')));
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.customResumeFromXml_031 = function () {
    var _this = this;
    var $trs = $('#table_031 tbody tr');
    $(this.j3CorrectXml).find('zzssyyybnsr04_bqjxsemxb bqjxsemxbGrid bqjxsemxbGridlbVO').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex = ewbhxh + 1;
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('qcye').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('bqydjse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(8)').children(), $(this).find('bqsjdjse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('bqfse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(10)').children(), $(this).find('qmye').text());
    })
};
$(function () {
    servyouReport.init();
});
/**
 * Created by chenjunj on 2018/8/30 14:14.
 */
ybnsr031.bindConfirm = function () {
    $('#table_031').on('blur', '#031_8_8', function () {
        var curVal = $(this).val();
        if (Number(curVal) > 480) {
            mini.alert('根据“国家发展和改革委员会关于降低增值税税控系统产品及维护服务价格等有关问题的通知”您填写的“本期实际抵减税额”【' + curVal + '】，已超过上限【480.00】，请再次核实！');
        }
    });
};
servyouReport.customEvent = function () {
    ybnsr031.bindConfirm();
};