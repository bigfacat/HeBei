/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/08/04
 * Time：17:41
 *
 */

var fpyj = {};
stepNav.run = function () {
    stepNav.initSteps([
        { id: 0, title: '选择发票种类', url: 'XxwhView.aspx' },
        { id: 1, title: '填写验旧信息', url: 'txyjxx.aspx' },
        { id: 2, title: '预览提交', url: 'yltjView.aspx', yltj: true },
        { id: 3, title: '完成', url: '../public1/wc/wc.aspx' }
    ]);

    mini.parse();
    fpyj.grid = mini.get("fpyj-grid");
    fpyj.form = new mini.Form('#fpyjTable');
    fpyj.ylForm = new mini.Form('#fpyjTable-yl');
    $.ajax({
        type: "POST",
        url: "../../../api/fp/fpyj/get/fpyjjcxx.ashx",
        async: false,
        success: function (result) {
            if (!!result.success && !!result.value) {
                fpyj.grid.setData(result.value);
            } else {
                mini.alert('没有可以验旧的发票信息', '提示信息', function () {
                    window.close();
                })
            }
        },
        error: function (e) {
            return false;
        }
    });

    fpyj.initToolTips(['kjyf', 'fpzzhmXg']);
    fpyj.initWcPage();
};
fpyj.initWcPage = function () {
    $('#sl-result').nextAll().remove();
    $('.wc-actions').empty().append('<button id="fpyj-continue">继续验旧</button><button id="go-fply">申领新发票</button><button id="close">关闭</button>');
    $('#fpyj-continue').on('click', function () {
        window.location.reload(true);
    });
    $('#go-fply').on('click', function () {
        window.location.href = '../fpglFply/fply.html?code=110209&id=11';
    });
    $('#close').click(function () {
        wssqUtil.closeWin();
    });
};

fpyj.initToolTips = function (arr) {
    var setTips = function (id) {
        var miniObj = mini.get(id);
        var cfg = mini.decode(miniObj['data-options']);
        miniObj.on('focus', function (e) {
            var dom = $('#' + e.sender.id);
            var tipDom = dom.next('.tool-tip');
            if (tipDom.length === 0) {
                dom.after('<div class="tool-tip ' + cfg.placement + ' ' + cfg.type + '">' + cfg.title + '</div>')
            } else {
                tipDom.html(cfg.title).show();
            }
        }).on('blur', function (e) {
            $('#' + e.sender.id).next('.tool-tip').hide();
        })
    };
    for (var i = 0, len = arr.length; i < len; i++) {
        setTips(arr[i]);
    }
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex === 0) {
        if (!fpyj.setSelectData()) {
            return false
        }
    }
    if (currentIndex === 1) {
        if (!fpyj.form.validate() || !checkFs() || !checkFpzzhm() || !checkKpje()) {
            return false
        }
        var ylData = fpyj.form.getDataAndText(true);
        ylData.fpzlMcText = fpyj.selectedRow.fpzlMc;
        ylData.fpDmText = fpyj.selectedRow.fpDm;

        fpyj.ylForm.setData(ylData);
    }
    if (currentIndex === 2) {
        if (!sendSqsj()) {
            return false
        }
    }
    return true;
};
fpyj.setSelectData = function () {
    var flag = true;
    fpyj.selectedRow = fpyj.grid.getSelected();
    if (!fpyj.selectedRow) {
        mini.alert('请选择一种发票进行验旧');
        return false;
    }
    $(".fpzlMcText").html(fpyj.selectedRow.fpzlMc);
    $(".fpDmText").html(fpyj.selectedRow.fpDm);
    var zfs = fpyj.selectedRow.fpzzhm - fpyj.selectedRow.fpqshm + 1;
    mini.get("fsXg").setEmptyText("1-" + zfs + "份");
    mini.get("fpqshmXg").setValue(fpyj.selectedRow.fpqshm);
    fpyj.fpme = 0;//设置默认面额为0
    if (fpyj.selectedRow.fpzlDm !== '113004100360') {
        $.ajax({
            type: "POST",
            url: "../../../api/fp/fpyj/get/fpYjJcxxFpme/" + fpyj.selectedRow.fpDm + "",
            async: false,
            success: function (result) {
                result = mini.decode(result);
                if (!!result.success && !!result.value) {
                    fpyj.fpme = result.value;
                    mini.get("kpje").setEnabled(false);
                } else if (!!result.success && result.value == null) {
                    mini.alert("您选择的发票单张面额为空，无法进行验旧！");
                    flag = false;
                } else {
                    mini.alert(result.message);
                    flag = false;
                }
            },
            error: function (e) {
                flag = false;
                return false;
            }
        });
    }
    mini.get("kjyf").on("valuechanged", checkKjyf);

    mini.get("fsXg").on("valuechanged", checkFs);

    mini.get("fpzzhmXg").on("valuechanged", checkFpzzhm);
    mini.get("fpkjqkDm").on("valuechanged", checkFpkjqk);

    return flag;
};

function checkKjyf() {
    var lrrq = fpyj.selectedRow.lrrq, flag = true;
    var kjyf = mini.get("kjyf").getText();
    var kjqk = mini.get("fpkjqkDm").getValue();
    if (kjqk == "10") {
        if (kjyf < lrrq.substr(0, 7)) {
            mini.alert("开具月份不能早于领票时间！");
            //mini.get("kjyf").setValue("");
            flag = false;
            return;
        }
    }
    return flag;
}

function checkKpje() {
    var kpjeInput = mini.get('kpje');
    var isEnabled = kpjeInput.getEnabled();
    if (isEnabled) {
        var fs = mini.get('fsXg').getValue();
        var je = kpjeInput.getValue();
        var maxVal = fs * 99999 / 100;
        if (maxVal < je) {
            mini.alert('开具金额不能大于' + maxVal.toFixed(2) + '元');
            return false;
        }
    }
    return true;
}

function checkFs() {
    var zfs = Number(fpyj.selectedRow.fpzzhm) - Number(fpyj.selectedRow.fpqshm) + 1;
    var yjfs = mini.get("fsXg").getValue();
    var flag = true;
    //1.校验输入格式是否符合；2.校验数值
    // if(yjfs <= 0){
    // 	mini.alert("份数必须大于0！");
    // 	mini.get("fsXg").setValue("");
    //           flag = false;
    // 	return;
    // }
    if (yjfs > zfs || yjfs <= 0) {
        mini.alert("份数必须大于0且不能大于" + zfs + "！");
        mini.get("fsXg").setValue("1");
        flag = false;
        return;
    }
    var yjfpzzhm = Number(fpyj.selectedRow.fpqshm) + Number(yjfs) - 1;
    yjfpzzhm = FormatNum(yjfpzzhm + "", 8);
    mini.get("fpzzhmXg").setValue(yjfpzzhm);
    var kjqk = mini.get("fpkjqkDm").getValue();
    if (fpyj.fpme != null && fpyj.fpme != "" && kjqk == "10") {
        mini.get("kpje").setValue(fpyj.fpme * yjfs);
    }
    return flag;
}

function checkFpzzhm() {
    var fpzzhm = fpyj.selectedRow.fpzzhm;
    var fpqshm = fpyj.selectedRow.fpqshm;
    var yjfpzzhm = mini.get("fpzzhmXg").getValue();
    var yjfs = mini.get("fsXg").getValue();
    if (!!yjfs) {
        var _yjfpzzhm = Number(fpqshm) + Number(yjfs) - 1;
        _yjfpzzhm = FormatNum(_yjfpzzhm + "", 8);
    }
    var flag = true;
    //1.校验输入格式是否符合；2.校验数值
    if (yjfpzzhm < fpqshm) {
        mini.alert("终止号码不能小于起始号码！", '提示', function () {
            mini.get("fpzzhmXg").setValue(_yjfpzzhm);
        });
        //mini.get("fpzzhmXg").setValue("");
        flag = false;
        return false;
    }
    if (yjfpzzhm > fpzzhm) {
        mini.alert("终止号码超出范围！", '提示', function () {
            mini.get("fpzzhmXg").setValue(_yjfpzzhm);
        });
        //mini.get("fpzzhmXg").setValue("");
        flag = false;
        return false;
    }
    var yjfs = Number(yjfpzzhm) - Number(fpqshm) + 1;
    mini.get("fsXg").setValue(yjfs);
    var kjqk = mini.get("fpkjqkDm").getValue();
    if (fpyj.fpme != null && fpyj.fpme != "" && kjqk == "10") {
        mini.get("kpje").setValue(fpyj.fpme * yjfs);
    }
    return flag;
}

function checkFpkjqk(e) {
    var kjqk = mini.get("fpkjqkDm").getValue();
    var jpyl = $("#jpsl");// 剪票样例
    if (kjqk === "10") {
        if (fpyj.selectedRow.fpzlDm == '113004100360') {
            mini.get("kpje").setEnabled(true);
            mini.get("kpje").setRequired(true);
        } else {
            mini.get("kpje").setRequired(false);
        }
        mini.get("kjyf").setEnabled(true);
        mini.get("kjyf").setRequired(true);
        jpyl.hide();
        var yjfs = mini.get("fsXg").getValue();
        if (fpyj.fpme != null && fpyj.fpme != "" && yjfs != "") {
            mini.get("kpje").setValue(fpyj.fpme * yjfs);
        }
        return;
    }
    if (kjqk === "22") {
        //开具日期干掉
        mini.get("kjyf").setValue("");
        mini.get("kpje").setValue("");
        mini.get("kjyf").setEnabled(false);
        mini.get("kpje").setEnabled(false);
        mini.get("kjyf").setRequired(false);
        // 加链接
        jpyl.show();
        return;
    }
    if (kjqk === "21") {
        mini.get("kpje").setValue("");
        mini.get("kjyf").setValue("");
        mini.get("kjyf").setEnabled(false);
        mini.get("kpje").setEnabled(false);
        mini.get("kjyf").setRequired(false);
        jpyl.hide();
        return;
    }
}

function editFpyj(id) {
    fpyj.selectedRow = grid.getRowByUID(id);
    $("#fpzlMcText").html(fpyj.selectedRow.fpzlMc);
    $("#fpDmText").html(fpyj.selectedRow.fpDm);
    var zfs = fpyj.selectedRow.fpzzhm - fpyj.selectedRow.fpqshm + 1;
    mini.get("fsXg").setEmptyText("1-" + zfs + "份");
    mini.get("fpqshmXg").setValue(fpyj.selectedRow.fpqshm);
    fpyj.fpme = 0;//设置默认面额为0
    if (fpyj.selectedRow.fpzlDm != '113004100360') {
        $.ajax({
            type: "POST",
            url: "../../../api/fp/fpyj/get/fpYjJcxxFpme/" + fpyj.selectedRow.fpDm + "",
            async: false,
            success: function (result) {
                var result = mini.decode(result);
                if (!!result.success) {
                    if (result.value != "") {
                        fpyj.fpme = result.value;
                        mini.get("kpje").setEnabled(false);
                    }
                }
            },
            error: function (e) {
                return false;
            }
        });
    }

    mini.get("kjyf").on("valuechanged", checkKjyf);

    mini.get("fsXg").on("valuechanged", checkFs);

    mini.get("fpzzhmXg").on("valuechanged", checkFpzzhm);
    mini.get("fpkjqkDm").on("valuechanged", checkFpkjqk);
}

function validateSqsj() {
    if (!checkFpzzhm() || !checkFs()) {
        return false;
    }
    return true;
}

function sendSqsj() {
    var flag = true;
    fpyj.kpjeSl = mini.get("kpje").getValue();
    if (validateSqsj()) {
        fpyjService.tj(mini.encode(getSqsj()), function (data) {
            var result = mini.decode(data);
            if (!result.success) {
                flag = false;
            }
        });


    }
    return flag;
}

/**格式化数字为一个定长的字符串，前面补0
 *参数:
 * Source 待格式化的字符串
 * Length 需要得到的字符串的长度
 */
function FormatNum(Source, Length) {
    var strTemp = "";

    for (var i = 1; i <= Length - Source.length; i++) {
        strTemp += "0";
    }
    return strTemp + Source;
}

function getSqsj() {
    var kpjzrq = "";
    var kpqsrq = "";
    if (mini.get("kjyf").getValue() != "") {
        var date = new Date(mini.get("kjyf").getValue());
        kpjzrq = date.getLastDateOfMonth("yyyy-MM-dd");
        kpqsrq = date.getFirstDateOfMonth("yyyy-MM-dd");
    }

    var fpyjjgDm = "0";
    var fpkjqkDm = mini.get("fpkjqkDm").getValue();
    if (fpkjqkDm == "21") {
        fpyjjgDm = "2";
        var date = new Date();
        if (fpyj.selectedRow.lrrq) {
            date = new Date(fpyj.selectedRow.lrrq);
        }
        kpjzrq = date.getLastDateOfMonth("yyyy-MM-dd");
        kpqsrq = date.getFirstDateOfMonth("yyyy-MM-dd");
    } else if ("10" == fpkjqkDm) {
        fpyjjgDm = "1";
    } else if ("22" == fpkjqkDm) {
        fpyjjgDm = "3";
        var date = new Date();
        if (fpyj.selectedRow.lrrq) {
            date = new Date(fpyj.selectedRow.lrrq);
        }
        kpjzrq = date.getLastDateOfMonth("yyyy-MM-dd");
        kpqsrq = date.getFirstDateOfMonth("yyyy-MM-dd");
    }
    var fpyjjcyqkMxVOList = {
        "fpyjjcyqkMxVOListlb": [{
            "fpzlDm": fpyj.selectedRow.fpzlDm,
            "kpjzrq": kpjzrq,
            "ywuuid": "",
            "fpzzhm": mini.get("fpzzhmXg").getValue(),
            "kpqsrq": kpqsrq,
            "se": "0",
            "fpyjjgDm": fpyjjgDm,
            "zfbz1": "N",
            "fpqshm": mini.get("fpqshmXg").getValue(),
            "xgrDm": "",
            "kpje": fpyj.kpjeSl,
            "cyfpmxuuid": "",
            "fpcyuuid": "",
            "fpkjqkDm": mini.get("fpkjqkDm").getValue(),
            "sjgsdq": "",
            "lrrDm": "",
            "fs": mini.get("fsXg").getValue(),
            "fpDm": fpyj.selectedRow.fpDm
        }]
    };
    return { fpyjjcyqkMxVOList: fpyjjcyqkMxVOList };
}


// 剪票示例
function showJpsl() {
    mini.showMessageBox({
        width: 660,
        maxHeight: 600,
        title: "剪票示例",
        buttons: ["ok"],
        message: "",
        html: $('#fpyjsl').html()
    });
}