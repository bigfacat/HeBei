//自然人进行同意或解除授权操作（我的企业）

var grantUrl = "/yhgl/nsrGrant/agree";//授权地址

mini.parse();
var form = new mini.Form("#corporateBindForm");
var cancelBindWindow = mini.get("cancelBindWindow");
var grid = mini.get("agentData");

//加载已绑定用户列表
function loadGrid() {
    form.loading("正在获取授权信息，请稍候......");
    $.ajax({
        url: apiUrl + "/yhgl/nsrGrant/query.ashx",
        type: "get",
        success: function (res) {
            form.unmask();
            var data = mini.decode(res);
            if (!data.success) {
                mini.alert(res.message);
            } else {
                grid.setData(sortByRole(data.data));
            }
        },
        error: function (res) {
            form.unmask();
            mini.alert("请求失败,请稍后再试");
        }
    });
}

$(function () {
    loadGrid();
});

$(cancelBindWindow._toolsEl).on("click", function () {
    cancelBindWindow.hide();
});

/**
 * 显示时间
 * @param e
 */
function onDateRenderer(e) {
    if (!e.record.createTime) {
        return;
    }
    return e.record.createTime.substr(0, 10);
}

/**
 * 显示授权状态
 * @param e
 */
function onStateRenderer(e) {
    return showState(e.record);
}

/**
 * 显示身份类型
 * @param e
 */
function onTypeRenderer(e) {
    return showUserType(e.record);
}

/*
 * 显示授权操作栏
 */
function onActionRenderer(e) {
    var record = e.record;
    if (record.type == '2') { //法人不允许操作
        return "";
    }

    var uid = record._uid;
    //0未授权，1已授权，2发起授权等待确认，3授权驳回
    var sqbz = record.sqbz;
    var s = "";
    if (sqbz == "1") {
        s = '<a class="cancel-agent-button" href="javascript:cancelAgent(\''
			+ uid + '\')" style="padding:0 10px;">解除授权</a>';
    } else if (sqbz == "2") {
        s = '<a class="cancel-agent-button" href="javascript:agreeAgent(\''
			+ uid + '\')" style="padding:0 10px;">同意授权</a>';
    }
    return s;
}

/**
 * 是否同意授权
 * @param row_uid
 */
function agreeAgent(row_uid) {
    var row = grid.getRowByUID(row_uid);
    agreeGrantRow(row);
}

//var selectRowId = 0; //选择当前行
// 不填写解除原因 del by wfj 2017.2.27
function cancelAgent(row_uid) {
    var row = grid.getRowByUID(row_uid);
    if (row) {
        mini.showMessageBox({
            width: 420,
            title: "授权解除提醒",
            buttons: ["确定", "取消"],
            message: "请确认是否要对" + row.nsrmc + "解除授权？",
            callback: function (action) {
                if (action == "确定") {
                    cancelGrantRow(row, "");//执行解除授权
                }
            }
        });
    }
    //selectRowId = row_uid; //保存
    //cancelBindWindow.showAtPos(showWindowX, showWindowY);
}

/**
 * 解除授权
 */
function updateCancelBindRow() {
    var form = new mini.Form("#editform");
    form.validate();
    if (form.isValid() == false)
        return;

    var row = grid.getRowByUID(selectRowId);
    var reason = mini.get("reason").getValue();
    cancelGrantRow(row, reason);//执行解除授权
    cancelBindWindow.hide(); //隐藏解除窗体
}

var onBindingListload = function (e) {
    var data = e.data;
    if (e.result.success == false) {
        mini.alert(e.result.paramList[0]);
    }
};
