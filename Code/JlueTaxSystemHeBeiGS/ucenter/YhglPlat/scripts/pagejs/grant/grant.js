//授权标志，0未授权，1已授权，2发起授权等待确认，3授权驳回，4授权解除

var existCwfzr = false; //是否已经存在财务负责人
var BSZM_QHSF_URL = ""; //办税桌面企业身份切换地址

//弹出身份选择框
function openQhsf() {
    if ("" == BSZM_QHSF_URL) { //为空，进行获取
        BSZM_QHSF_URL = getXtcs("BSZM_QHSF_URL");
    }

    mini.open({
        url: BSZM_QHSF_URL, //页面地址
        title: "选择办税身份",	//标题
        width: 600,      	//宽度
        height: 400,     	//高度
        allowResize: false,	//允许尺寸调节
        allowDrag: false,	//允许拖拽位置
        showMaxButton: false,	//显示最大化按钮
        currentWindow: false,	//是否在本地弹出页面,默认false
        onload: function () {	//弹出页面加载完成
        },
        ondestroy: function (action) {  //弹出页面关闭前
        }
    });
}

function changeGrSf() {
    $.ajax({
        url: apiUrl + "/yhgl/changeGrSf",
        type: "get",
        data: {},
        success: function (res) {
            if (sessionStorage) {
                sessionStorage.clear();
            }
            top.location.reload();
        },
        error: function (res) {
        }
    });
}

//根据角色进行排序
function sortByRole(datas) {
    var roleIds = [5, 7, 6, 8, 2, 3, 9, 4, 1]; //角色从大到小序号
    var result = [];
    //roleIds中一个一个的获取对应的角色信息
    for (var i = 0; i < roleIds.length; i++) {
        for (var j = 0; j < datas.length; j++) {
            var data = datas[j];
            if (data.type == roleIds[i]) {
                result.push(data);
            }
        }
    }
    return result;
}

//执行授权操作
function doGrant(json) {
    form.loading("请稍候......");
    $.ajax({
        url: apiUrl + grantUrl,
        type: "post",
        contentType: "application/json",
        data: json,
        success: function (res) {
            form.unmask();
            var data = mini.decode(res);
            if (data.success) {
                if ('Y' == data.data) {
                    //弹出身份选择框
                    changeGrSf();
                }
                loadGrid();
            } else {
                mini.alert(data.message);
            }
        },
        error: function (res) {
            form.unmask();
            mini.alert("授权操作,请稍后再试!");
        }
    });
}

/**
 * 同意授权
 * @param row
 */
function agreeGrantRow(row) {
    if (row) {
        mini.showMessageBox({
            width: 420,
            //height : 220,
            title: "授权提醒",
            buttons: ["同意", "不同意"],
            message: "是否同意授权？",
            callback: function (action) {
                if (action == "同意" || action == "不同意") { //只对同意与不同意进行操作处理
                    if (action == "同意") {
                        row.qxbz = "1"; //已授权
                    }
                    else if (action == "不同意") {
                        row.qxbz = "3"; //授权驳回
                    }
                    doGrant(mini.encode(row));
                }
            }
        });
    }
}

/**
 * 解除授权
 */
function cancelGrantRow(row, reason) {
    if (row) {
        $('#addbsr').removeAttr('disabled'); //解除授权显示添加 add by wfj 2017.6.20  #190568
        row.qxbz = "4"; //解除授权
        row.reason = reason; //获取解除原因
        doGrant(mini.encode(row));
    }
}

/**
 * 显示解除原因
 * @param ryxxId
 */
function showReasion(ryxxId) {
    form.loading("获取解除原因，请稍候......");
    $.ajax({
        url: apiUrl + "/yhgl/getCustomField",
        type: "get",
        data: {
            type: 'CANCELGRANT',
            objectid: ryxxId,
            key: 'REASON'
        },
        success: function (res) {
            form.unmask();
            var data = mini.decode(res);
            if (data.success) {
                mini.showMessageBox({
                    width: 250,
                    title: "解除授权原因",
                    buttons: ["关闭"],
                    message: data.data.value,
                    //html: "",
                    showModal: true
                });
            } else {
                mini.alert(data.message);
            }
        },
        error: function (res) {
            form.unmask();
            mini.alert("获取解除原因失败,请稍后再试!");
        }
    });
}

/**
 * 显示授权状态
 * @param record
 * @returns {String}
 */
function showState(record) {
    var sqbz = record.sqbz;
    var ryxxId = '';
    if (typeof (record.ryxxId) == "undefined" || record.ryxxId == "undefined") {
        ryxxId = record.id;
    }
    else {
        ryxxId = record.ryxxId;
    }

    //0未授权，1已授权，2发起授权等待确认，3授权驳回，4解除授权
    if (sqbz == 0) {
        return "未授权";
    } else if (sqbz == 1) {
        return "已授权";
    } else if (sqbz == 2) {
        return "等待授权";
    } else if (sqbz == 3) {
        return "驳回授权";
    } else if (sqbz == 4) {
        return '<a class="freeze-button" href="javascript:showReasion(\'' + ryxxId + '\')" style="padding:0 10px;">解除授权</a>'; //需要加增解除授权原因显示
    }
}

function showUserType(record) {
    var type = record.type;

    if (type == 1) {
        return "办税员";
    }
    if (type == 2) {
        return "法人";
    }
    if (type == 3) {
        if (record.sqbz == '1' || record.sqbz == '2') { //已授权或授权等待确认
            existCwfzr = true;
        }
        return "财务负责人";
    }
    if (type == 4) {
        return "代理人";
    }
}
