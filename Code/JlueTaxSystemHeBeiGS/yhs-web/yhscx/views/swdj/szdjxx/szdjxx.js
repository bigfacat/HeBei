var szdjxx = {
    search: function () {
        var zsxm_grid = mini.get("#zsxm");
        if (!zsxm_grid.text) {
            mini.alert("征收项目不能为空！");
            zsxm_grid.addCls("mini-invalid");
            return;
        }
        var con = zsxm_grid.value;
        var obj = {
            data: {
                logicName: 'Logic_querySfzrdxx',
                paramJson: {
                    zsxmDm: con
                }
            },
            gridId: 'szdjxxGrid'
        };
        yhscx.loadGridData(obj);
    },
    initList: function () {
        $.ajax({
            url: "../api/common/basecode.ashx?baseCodeName=DM_GY_ZSXM",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            success: function (e) {
                if (e.success) {
                    var grid = mini.get("zsxm");
                    $.each(e.value, function (i, c) {
                        c[1] = c[1] + "(" + c[0] + ")";
                    });
                    e.value.unshift(['', "全部"]);
                    grid.setData(e.value);
                    grid.setValue(e.value[0][0]);
                } else {
                    mini.alert("数据初始化失败！");
                }
            },
            error: function () {
                mini.alert("初始化失败！")
            }
        });

    }
};
$(function () {
    mini.parse();
    szdjxx.initList();
    yhscx.initGrid("szdjxxGrid");
});