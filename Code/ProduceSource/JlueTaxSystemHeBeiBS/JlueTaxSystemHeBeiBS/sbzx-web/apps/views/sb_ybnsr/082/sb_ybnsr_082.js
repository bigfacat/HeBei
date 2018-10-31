/**
 * Created by liuws on 2017/6/26.
 */
var ybnsr082 = {
    init_qcse: function () {
        $("#082_7_0").val(servyouReport.wsxxMap['FB5DDKBDCQCYE']).blur();
    },
    check082: function () {
        var trs = $("#table_082 tbody tr");
        var bqkdk = Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(4) input")));
        var he124 = Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(0) input"))) + Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(2) input"))) +
            Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(6) input")));
        if (bqkdk > he124) {
            alert("本期可抵扣不动产进项税额应小于等于期初待抵扣不动产进项税额、本期不动产进项税额增加额、本期转入的待抵扣不动产进项税额的和");
            return false;
        }
        var bqzcjxse = Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(8) input")));
        var he14 = Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(0) input"))) + Number(servyouReport.getInputValue(trs.eq(3).find("td:eq(6) input")));
        if (bqzcjxse > he14) {
            alert("本期转出的待抵扣不动产进项税额应小于等于期初待抵扣不动产进项税额、本期转入的待抵扣不动产进项税额的和");
            return false
        }
        return true;
    },
    set_0: function () {
        //  系统控制逾期未认定一般纳税人，不能填写一下附表：《增值税纳税申报表附列资料五（不动产分期抵扣计算表）》 前端控制这几个表不能编辑，全都为0 2017-08-10
        if (servyouReport.wsxxMap['YQWRDBZ'] === "1") {
            $("#table_082 tbody tr").find("td input").val("0.00").attr({ disabled: "disabled", value: "0.00" });
            mini.alert('您为逾期未认定一般纳税人，不能填写《增值税纳税申报表附列资料五（不动产分期抵扣计算表）》，如有问题请与税务局联系');
            return false;
        }
        return true;
    }
};
/*自定义初始化*/
servyouReport.afterInit = function () {
    var result = ybnsr082.set_0();
    /*if(result && parent.ybnsr.isFromSbhy){
        var data087 = parent.yearReport.sb_data['087'].checkData;
        if(data087 && !$.isEmptyObject(data087)){
            ybnsrService.setDataFromSbhy(data087['082']);
        }
    }*/
    var data087 = parent.yearReport.sb_data['087'];
    if (result && parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(data087.checkData)) {
        ybnsrService.setDataFromDataMap(data087['checkData']['082']);
    }
};
servyouReport.customInitFromHd = function () {
    ybnsr082.init_qcse();
};
/*检验082*/
servyouReport.checkTable_082 = function () {
    return ybnsr082.check082();
};
servyouReport.autoAddAllId = true;
servyouReport.setDataIntoCheckData = function () {
    var obj = {
        "7_2": $('#082_7_2').val(),     //附表五第2列本期不动产进项税额增加额
        "7_4": $('#082_7_4').val(),     //附表五第3列本期可抵扣不动产进项税额
        "7_6": $('#082_7_6').val()      //附表五第4列本期转入的待抵扣不动产进项税额
    };
    return obj;
};
/*082表转报文*/
servyouReport.changeXml_082 = function () {
    var $trs = $("#table_082 tbody tr");
    var $xml = this.getJ3Xml('082');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find("ewbhxh").text(1);

    $xml.find("qcye").text(this.getInputValue($trs.eq(3).find("td:eq(0) input")));
    $xml.find("bqydjse").text(this.getInputValue($trs.eq(3).find("td:eq(4) input")));
    $xml.find("bqsjdjse").text(this.getInputValue($trs.eq(3).find("td:eq(6) input")));
    $xml.find("bqsjdjse1").text(this.getInputValue($trs.eq(3).find("td:eq(8) input")));
    $xml.find("bqfse").text(this.getInputValue($trs.eq(3).find("td:eq(2) input")));
    $xml.find("qmye").text(this.getInputValue($trs.eq(3).find("td:eq(10) input")));
    return $xml;
};
servyouReport.customResumeFromXml_082 = function () {
    var $trs = $('#table_082 tbody tr');
    var $bdcfqdkjsbGridlbVO = $(this.j3CorrectXml).find('zzssyyybnsr05_bdcfqdkjsb bdcfqdkjsbGrid bdcfqdkjsbGridlbVO')
    this.setTargetVal($trs.eq(3).find('td:eq(0)').children(), $bdcfqdkjsbGridlbVO.find('qcye').text());
    this.setTargetVal($trs.eq(3).find('td:eq(4)').children(), $bdcfqdkjsbGridlbVO.find('bqydjse').text());
    this.setTargetVal($trs.eq(3).find('td:eq(6)').children(), $bdcfqdkjsbGridlbVO.find('bqsjdjse').text());
    this.setTargetVal($trs.eq(3).find('td:eq(8)').children(), $bdcfqdkjsbGridlbVO.find('bqsjdjse1').text());
    this.setTargetVal($trs.eq(3).find('td:eq(2)').children(), $bdcfqdkjsbGridlbVO.find('bqfse').text());
    this.setTargetVal($trs.eq(3).find('td:eq(10)').children(), $bdcfqdkjsbGridlbVO.find('qmye').text());
};
$(function () {
    servyouReport.init();
});