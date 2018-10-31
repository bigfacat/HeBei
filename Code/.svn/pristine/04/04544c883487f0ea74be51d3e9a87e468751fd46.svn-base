function check() {
    if (!!$('#nsrsbhFlag').val()) {
        if (!validateNsrsbh()) {
            return;
        }
    }
    if (document.form1.sssq_q.value == "") {
        alert("所属时期起不能为空!!!");
        document.form1.sssq_q.focus();
        document.form1.sssq_q.select();
        return;
    }
    var sssq = document.form1.sssq_q.value;
    if (!IsDate(sssq)) {
        alert("错误信息：请输入正确日期数据！");
        document.form1.sssq_q.value = "";
        document.form1.sssq_q.focus();
        document.form1.sssq_q.select();
        return;
    }
    if (document.form1.sssq_z.value == "") {
        alert("所属时期止不能为空!!!");
        document.form1.sssq_z.focus();
        document.form1.sssq_z.focus();
        document.form1.sssq_z.select();
        return;
    }
    sssq = document.form1.sssq_z.value;
    if (!IsDate(sssq)) {
        alert("错误信息：请输入正确日期数据！");
        document.form1.sssq_z.value = "";
        document.form1.sssq_z.focus();
        document.form1.sssq_z.select();
        return;
    }

    var param = {
        zsxm: $('#zsxm_dm').val(),
        sssqq: $('#sssq_q').val(),
        sssqz: $('#sssq_z').val()
    };

    if (!!$('#nsrsbhFlag').val()) {
        param.nsrsbh = $('#lssbNsrsbh').val();
    }
    debugger;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../../api/lssb/get/sbxxlist.ashx",
        data: {
            zsxm: $('#zsxm_dm').val(),
            sssqq: $('#sssq_q').val(),
            sssqz: $('#sssq_z').val()
        },
        success: function (result) {
            if (!result.success) {
                alert(result.message);
                return;
            }
            var initDataHelp = new initDataObj();
            initDataHelp.init(result.value);
        },
        error: function (result) {
            alert("系统异常，请稍后再试！");
        }
    });
}

/**
 * 校验纳税人识别号
 */
function validateNsrsbh() {
    var val = document.form1.lssbNsrsbh.value;
    if (val == "") {
        alert("纳税人识别号：不能为空");
        document.form1.lssbNsrsbh.focus();
        document.form1.lssbNsrsbh.select();
        return false;
    }
    var nsrsbhReg = /^[a-zA-Z0-9\-]{15,20}$/;
    if (!nsrsbhReg.test(val)) {
        alert("纳税人识别号必须为15位到20位 数字或字母!");
        document.form1.lssbNsrsbh.focus();
        document.form1.lssbNsrsbh.select();
        return false;
    }
    return true;
}

function initDataObj() {
    debugger;
    this.init = function (rows) {
        if (!!rows && rows.length > 0) {
            $("#table1 tr:gt(0)").remove();
            var spanList = $("#table1");
            
            debugger;
            $(rows).each(function (_index, _row) {
                debugger
                var selectValue = "";
                selectValue=$("#zsxm_dm").find("option:selected").text();
                debugger;
                if(selectValue=="增值税"){
                    TrHtml = "<tr class=''>"
			            + "<td class='txt-c w5' height='25'><div class='txt-c'>" + (_index + 1) + "</div></td>"
			            + "<td class='txt-c w25'><div class='txt-c'>" + _row.pzzl_mc + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sbrq + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_q + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_z + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.ybtse + "</div></td>"
			            //+ "<td class='txt-r w15'><div class='txt-c'><a href='print_nssbb_zzfw_zzs.aspx?k=" + _index + "' target='_blank' class='a04'><b>查看报表</b></a></div></td>"
			            + "</tr>";
                    spanList.append(TrHtml);
                    return;
                }
                if (selectValue == "2013版财务报表") {
                    TrHtml = "<tr class=''>"
			            + "<td class='txt-c w5' height='25'><div class='txt-c'>" + (_index + 1) + "</div></td>"
			            + "<td class='txt-c w25'><div class='txt-c'>" + _row.pzzl_mc + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sbrq + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_q + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_z + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.ybtse + "</div></td>"
			            //+ "<td class='txt-r w15'><div class='txt-c'><a href='print_nssbb_zzfw_cwbb.aspx?k=" + _index + "' target='_blank' class='a04'><b>查看报表</b></a></div></td>"
			            + "</tr>";
                    spanList.append(TrHtml);
                    return;
                }
                if (selectValue == "增值税预缴税款表") {
                    TrHtml = "<tr class=''>"
			            + "<td class='txt-c w5' height='25'><div class='txt-c'>" + (_index + 1) + "</div></td>"
			            + "<td class='txt-c w25'><div class='txt-c'>" + _row.pzzl_mc + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sbrq + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_q + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_z + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.ybtse + "</div></td>"
			            + "<td class='txt-r w15'><div class='txt-c'><a href='print_nssbb_zzfw_zzsyj.aspx?k=" + _index + "' target='_blank' class='a04'><b>查看报表</b></a></div></td>"
			            + "</tr>";
                    spanList.append(TrHtml);
                    return;
                }
                
                TrHtml = "<tr class=''>"
			            + "<td class='txt-c w5' height='25'><div class='txt-c'>" + (_index + 1) + "</div></td>"
			            + "<td class='txt-c w25'><div class='txt-c'>" + _row.pzzl_mc + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sbrq + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_q + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.sssq_z + "</div></td>"
			            + "<td class='txt-c w12'><div class='txt-c'>" + _row.ybtse + "</div></td>"
			            //+ "<td class='txt-r w15'><div class='txt-c'><a href='print_nssbb_zzfw.aspx?k=" + _index + "' target='_blank' class='a04'><b>查看报表</b></a></div></td>"
			            + "</tr>";
                spanList.append(TrHtml);

            })

        } else {
            $("#table1 tr:gt(0)").remove();
            var spanList = $("#table1");
            TrHtml = "<tr class=''>"
                     + "<td class='txt-c w5' colspan='7' height='25'><div style='color: #ff0000'>查询无数据</div></td></tr>";
            spanList.append(TrHtml);
        }
    };
}