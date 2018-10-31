/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/4
 * Time：20:41
 *
 */

// 存款账户账号报告命名空间，收归所有和 存款账户账号报告 相关的变量和方法，避免产生过多的全局变量
// 建议每一个功能模块都有一个自己的命名空间

var ckzhzhbg = {};

// 步骤框架的入口
stepNav.run = function () {

    stepNav.initSteps([
        { id: 0, title: '账户信息', url: 'XxwhView.aspx' },
        { id: 1, title: '预览提交', url: 'YltjView.aspx', yltj: true },
        { id: 2, title: '完成', url: '../public1/wc/wc.aspx', js: true }

    ]);

    // 添加一条账户信息窗口
    var html = wssqUtil.loadTemplate('addRowView.aspx');
    $('body').append(html);
    // 添加一条查看报告窗口
    var ckBgViewHtml = wssqUtil.loadTemplate('ckBgView.aspx');
    $('body').append(ckBgViewHtml);

    // miniui初始化
    mini.parse();
    ckzhzhbg.sqbGrid = mini.get("ckzhzhxx-grid");
    ckzhzhbg.ylGrid = mini.get("yltj");
    ckzhzhbg.addRowWin = mini.get("addRow-win");
    ckzhzhbg.addHiddenBz = mini.get('hbszDm');
    ckzhzhbg.ckckzhzhbgWin = mini.get("ckbg-win");
    ckzhzhbg.ckbg = mini.get("ckbg");

    ckzhzhbg.khxkzWin = mini.get("khxkz-win"); // 开户许可证


    // 账户性质 1

    ckzhzhbg.zhxzdata = baseCode.getDataByCodeName('DM_GY_YHZHXZ.ashx') || []; // 账户性质下拉框
    mini.get('yhzhxzDm').setData(ckzhzhbg.zhxzdata);

    // 行政区划 2
    ckzhzhbg.xzqhData = baseCode.getDataByCodeName('DM_GY_XZQH_HB_CITY.ashx') || []; // 行政区划下拉框
    mini.get('xzqhszDm').setData(ckzhzhbg.xzqhData);

    // 银行种类 3
    ckzhzhbg.cyyhzlData = baseCode.getDataByCodeName('DM_GY_YHHB.ashx') || [];
    mini.get('yhhbDm').setData(ckzhzhbg.cyyhzlData);

    // 币种 5
    ckzhzhbg.bzData = baseCode.getDataByCodeName('DM_GY_HB.ashx') || [];
    mini.get('bzCombox').setData(ckzhzhbg.bzData);


    // 获取账户信息
    ckzhzhbgService.hqzhxx({}, function (data) {
        ckzhzhbg.xxwhData = data.value;
        ckzhzhbg.sqbGrid.setData(ckzhzhbg.xxwhData);
    }, function (err) {
        mini.alert(err.message);
    });

};
//获取纳税人的基本信息

// 步骤跳转前执行
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        var ckzhzhxxgrid = mini.get('ckzhzhxx-grid');
        if (ckzhzhxxgrid.getRow(0) == null) {
            mini.alert('当前没有存款账户账号信息，不能点击下一步');
            return;
        }

        var bgxx = ckzhzhbg.sqbGrid.getChanges(null, false);
        if (bgxx.length <= 0) {
            mini.alert('信息未作修改，不能点击下一步');
            return;
        } else {
            var ylData = ckzhzhbg.sqbGrid.getData();
            ckzhzhbg.ylGrid.setData(ylData);
            for (var i = 0; i < ylData.length; i++) {
                if (ylData[i].sxjszhbz == 'Y') {
                    // 完成页面添加内容和按钮
                    var html = '<div id="gosfxy-page"> <div>建议您完成<span class="txt-blue">三方协议签订</span>，便于之后进行三方协议缴款。免去前台排队烦恼，体验云厅便捷缴税！</div></div>'
                    var btn = ' <button id="qdsfxy-btn">去签订三方协议</button> ';
                    $('#content').append(html);
                    $('#actions').append(btn);
                    //签订三方协议
                    $("#qdsfxy-btn").click(function () {
                        window.location.href = "../sfxy/wtkkxys.html?code=110701";
                    });
                    break;
                }
            }


            var nsrjbxx = nsrxxUtil.getNsrxxVO();
            var lxdh = '';
            if (nsrjbxx.nsrxxKzVO) {
                lxdh = nsrjbxx.nsrxxKzVO.scjydlxdh || '';
            }
            var formData = {
                nsrsbh: nsrjbxx.nsrsbh,
                nsrmc: nsrjbxx.nsrmc,
                scjydz: nsrjbxx.scjydz,
                scjydlxdh: lxdh
            };
            var form1 = new mini.Form('#nsrjbxx-form');
            var form2 = new mini.Form('#ckbg-nsrjbxx-form');
            form1.setData(formData);
            form2.setData(formData);

        }
    }
    if (currentIndex == 1) {
        // 判断是否提示三方协议签订
        /*var insertGridVo = ckzhzhbg.sqbGrid.getChanges('added', false),
            updateGridVo = ckzhzhbg.sqbGrid.getChanges('modified', false);

        if (insertGridVo.length != 0 || updateGridVo.length != 0) {
            for (var insertNo = 0; insertNo < insertGridVo.length; insertNo++) {
                if ("N" == insertGridVo[insertNo].sxjszhbz) {
                    $("#gosfxy-page").hide();
                    break;
                }
            }

            for (var updateNo = 0; updateNo < updateGridVo.length; updateNo++) {
                if ("N" == updateGridVo[updateNo].sxjszhbz) {
                    $("#gosfxy-page").hide();
                    break;
                }
            }
        }*/

        return ckzhzhbg.tj();
    }
    if (currentIndex == 2) {

    }
    return true;
};


// 存款账户账号纳税人信息对象
ckzhzhbg.ckzhzhbgbjbxxForm = {
    slswjgDm: "",
    slrDm: "",
    jbr: "",
    nsrmc: "",
    nsrsbh: "",
    slrq: "",
    bgrq1: ""
};

// 存款账户账号增加数据集对象
ckzhzhbg.insertCkzhzhxxGrid = {};
// 存款账户账号删除数据集对象
ckzhzhbg.deleteCkzhzhxxGrid = {};
// 存款账户账号更新数据集对象
ckzhzhbg.updateCkzhzhxxGrid = {};

// 存款账户账号报告汇总信息对象
ckzhzhbg.nsrckzhzhbgb = {
    ckzhzhbgbjbxxForm: ckzhzhbg.ckzhzhbgbjbxxForm
};

//金3请求数据对象
ckzhzhbg.gt3RequestData = {
    slswsxDm: "",
    djxh: "",
    lcslid: "",
    nsrckzhzhbgb: ckzhzhbg.nsrckzhzhbgb
};

ckzhzhbg.joinDjNsrckzhzhxx = function (gridVo, leixin) {
    var insertCkzhzhxxGridlb = [],
        updateCkzhzhxxGridlb = [],
        deleteCkzhzhxxGridlb = [];

    if (gridVo.length != 0) {
        for (var i = 0; i < gridVo.length; i++) {
            // 存款账户账号信息对象
            ckzhzhbg.djNsrckzhzhxxVO = {};

            ckzhzhbg.djNsrckzhzhxxVO.ckzhuuid = gridVo[i].ckzhuuid || '';
            ckzhzhbg.djNsrckzhzhxxVO.lcslid = gridVo[i].lcslid || '';
            ckzhzhbg.djNsrckzhzhxxVO.cktszhbz = gridVo[i].cktszhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.ffrq = gridVo[i].ffrq || '';
            ckzhzhbg.djNsrckzhzhxxVO.khrq = gridVo[i].khrq || '';
            ckzhzhbg.djNsrckzhzhxxVO.hbszDm = gridVo[i].hbszDm || '';
            ckzhzhbg.djNsrckzhzhxxVO.sxjszhbz = gridVo[i].sxjszhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.tszhbz = gridVo[i].tszhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.xzqhszDm = gridVo[i].xzqhszDm || '';
            ckzhzhbg.djNsrckzhzhxxVO.yhhbDm = gridVo[i].yhhbDm || '';
            ckzhzhbg.djNsrckzhzhxxVO.yhkhdjzh = gridVo[i].yhkhdjzh || '';
            ckzhzhbg.djNsrckzhzhxxVO.yhyywdDm = gridVo[i].yhyywdDm || '';
            ckzhzhbg.djNsrckzhzhxxVO.yhzh = gridVo[i].yhzh || '';
            ckzhzhbg.djNsrckzhzhxxVO.yhzhxzDm = gridVo[i].yhzhxzDm || '';
            ckzhzhbg.djNsrckzhzhxxVO.zhmc = gridVo[i].zhmc || '';
            ckzhzhbg.djNsrckzhzhxxVO.djkskzhbz = gridVo[i].djkskzhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.sxjfzhbz = gridVo[i].sxjfzhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.tfzhbz = gridVo[i].tfzhbz || '';
            ckzhzhbg.djNsrckzhzhxxVO.yxbz = gridVo[i].yxbz || '';


            if (leixin == "insert") {
                insertCkzhzhxxGridlb.push(ckzhzhbg.djNsrckzhzhxxVO);
            } else if (leixin == "update") {
                updateCkzhzhxxGridlb.push(ckzhzhbg.djNsrckzhzhxxVO);
            } else if (leixin == "delete") {
                deleteCkzhzhxxGridlb.push(ckzhzhbg.djNsrckzhzhxxVO);
            } else {
                break;
            }
        }
    }

    if (leixin == "insert") {
        return insertCkzhzhxxGridlb;
    }
    if (leixin == "update") {
        return updateCkzhzhxxGridlb;
    }
    if (leixin == "delete") {
        return deleteCkzhzhxxGridlb;
    }
}

// 提交
ckzhzhbg.tj = function () {
    var insertGridVo = ckzhzhbg.sqbGrid.getChanges('added', false),
        deleteGridVo = ckzhzhbg.sqbGrid.getChanges('removed', false),
        updateGridVo = ckzhzhbg.sqbGrid.getChanges('modified', false),
        result = false;

    ckzhzhbg.insertCkzhzhxxGrid.insertCkzhzhxxGridlb = ckzhzhbg.joinDjNsrckzhzhxx(insertGridVo, "insert");
    ckzhzhbg.deleteCkzhzhxxGrid.deleteCkzhzhxxGridlb = ckzhzhbg.joinDjNsrckzhzhxx(deleteGridVo, "delete");
    ckzhzhbg.updateCkzhzhxxGrid.updateCkzhzhxxGridlb = ckzhzhbg.joinDjNsrckzhzhxx(updateGridVo, "update");

    ckzhzhbg.nsrckzhzhbgb.insertCkzhzhxxGrid = ckzhzhbg.insertCkzhzhxxGrid
    ckzhzhbg.nsrckzhzhbgb.deleteCkzhzhxxGrid = ckzhzhbg.deleteCkzhzhxxGrid;
    ckzhzhbg.nsrckzhzhbgb.updateCkzhzhxxGrid = ckzhzhbg.updateCkzhzhxxGrid;

    ckzhzhbg.gt3RequestData.nsrckzhzhbgb = ckzhzhbg.nsrckzhzhbgb;

    ckzhzhbgService.tj(mini.encode(ckzhzhbg.gt3RequestData), function (data) {
        console.log(data);
        if (!data.success) {
            mini.alert(data.message);
        } else {
            result = true;
        }
    });
    return result;

};

//打开开户许可页面
ckzhzhbg.openKhxkz = function () {
    ckzhzhbg.khxkzWin.show();
};

ckzhzhbg.confirmY = function () {
    var zhmc = mini.get('_zhmc'); // 账户名称
    var yhzhxz = mini.get('yhzhxzDm'); // 账户性质
    var hzh = mini.get('_yhkhdjzh'); // 核准号
    var fzrq = mini.get('_ffrq'); // 发证日期
    var $hzhTr = $('#hzh-tr');

    ckzhzhbg.khxkzWin.hide();
    ckzhzhbg.openAddPage();
    mini.get('bzRadio').setValue('156');
    mini.get('add-cktszhbz').setValue('N');
    !tszhbzFlag && mini.get('add-tszhbz').setValue('Y');

    yhzhxz.setData([
                    { ID: '1110', MC: '基本存款账户' },
                    { ID: '1120', MC: '一般存款账户' }
    ]);
    hzh.setRequired(true);
    fzrq.setRequired(true);
    $hzhTr.show();
    zhmc.setValue(wssqUtil.nsrjbxx.nsrmc); // 账户名称默认纳税人名称
    yhzhxz.setValue('1110'); // 默认基本存款账户，可修改
    yhzhxz.enable(); //
};

//
ckzhzhbg.confirmN = function () {
    //    var khxzxk = mini.get('is-khxkz');
    //    var isCompany =khxzxk.getValue();
    var zhmc = mini.get('_zhmc'); // 账户名称
    var yhzhxz = mini.get('yhzhxzDm'); // 账户性质
    var hzh = mini.get('_yhkhdjzh'); // 核准号
    var fzrq = mini.get('_ffrq'); // 发证日期
    var $hzhTr = $('#hzh-tr');

    //    if(!isCompany){
    //        khxzxk.setIsValid(false);
    //        mini.alert('请选择是否已办理开户许可证');
    //        return false;
    //    }

    ckzhzhbg.khxkzWin.hide();
    ckzhzhbg.openAddPage();
    mini.get('bzRadio').setValue('156');
    mini.get('add-cktszhbz').setValue('N');
    !tszhbzFlag && mini.get('add-tszhbz').setValue('Y');


    //    if(isCompany == 'Y'){ // 企业
    //        yhzhxz.setData([
    //            {ID:'1110', MC:'基本存款账户'},
    //            {ID:'1120', MC:'一般存款账户'}
    //        ]);
    //        hzh.setRequired(true);
    //        fzrq.setRequired(true);
    //        $hzhTr.show();
    //        zhmc.setValue(wssqUtil.nsrjbxx.nsrmc); // 账户名称默认纳税人名称
    //        yhzhxz.setValue('1110'); // 默认基本存款账户，可修改
    //        yhzhxz.enable(); //
    //    }else if(isCompany == 'N'){
    yhzhxz.setData(ckzhzhbg.zhxzdata);
    $hzhTr.hide(); // 核准号那一行不需要了
    hzh.setRequired(false);
    fzrq.setRequired(false);
    zhmc.setValue(wssqUtil.nsrjbxx.fddbrxm); // 法定代表人名称
    yhzhxz.setValue('1200'); // 默认"个人银行结算账户"，不可修改
    yhzhxz.disable(); //
    //    }

};

// 打开增加页面
ckzhzhbg.openAddPage = function () {
    var form = new mini.Form('#addRow-win');
    form.clear();

    //有缴税账户
    if (ckzhzhbg.isSxjszhbz("add")) {
        mini.get('add-sxjszhbz').setValue('N');
    }

    //有出口退税帐号
    if (ckzhzhbg.isCktszhbz("add")) {
        mini.get('add-cktszhbz').setValue('N');
    }

    //有退税帐号
    if (ckzhzhbg.isTszhbz("add")) {
        mini.get('add-tszhbz').setValue('N');
    }

    mini.get('xzqhszDm').setValue(nsrxxUtil.getNsrInfo().zcdxzqh);


    // 确认添加
    ckzhzhbg.addRowOk = function () {
        ckzhzhbg.addForm = new mini.Form("#addRow-form");
        ckzhzhbg.addForm.validate();
        if (ckzhzhbg.addForm.isValid() == false) return false;
        var formdata = ckzhzhbg.addForm.getDataAndText(true);
        if (formdata.hbszDm == '156') {
            formdata.hbszDmText = '人民币元';
        } else if (formdata.hbszDm == '840') {
            formdata.hbszDmText = '美元';
        } else if (formdata.hbszDm == '978') {
            formdata.hbszDmText = '欧元';
        } else {
            formdata.hbszDmText = mini.get('bzCombox').getText();
        }
        ckzhzhbg.sqbGrid.addRow(formdata, 0);

        ckzhzhbg.addRowWin.hide();
    };

    ckzhzhbg.addRowWin.show();
};

ckzhzhbg.openEditPage = function () {
    var rows = ckzhzhbg.sqbGrid.getSelecteds();
    mini.get('yhzhxzDm').setData(ckzhzhbg.zhxzdata);
    if (rows.length == 0) {
        alert("请选中一条记录");
    } else if (rows.length == 1) {
        var form = new mini.Form('#addRow-win');
        form.setData(rows[0]);
        var hbDm = rows[0].hbszDm;
        var bzRadio = mini.get("bzRadio");
        var bzCombox = mini.get("bzCombox");
        if (hbDm == '156' || hbDm == '840' || hbDm == '978') {
            bzRadio.setValue(hbDm);
        } else {
            bzRadio.setValue('0');
            bzCombox.setValue(hbDm);
            bzCombox.enable();
        }

        sxjszhbzFlag = ckzhzhbg.isSxjszhbz("edit");
        cktszhbzFlag = ckzhzhbg.isCktszhbz("edit");
        tszhbzFlag = ckzhzhbg.isTszhbz("edit");

        // 确认修改
        ckzhzhbg.addRowOk = function () {
            ckzhzhbg.addForm = new mini.Form("#addRow-form");
            ckzhzhbg.addForm.validate();
            if (ckzhzhbg.addForm.isValid() == false) return false;
            var formdata = ckzhzhbg.addForm.getDataAndText(true);
            if (sxjszhbzFlag && "Y" == formdata.sxjszhbz) {
                mini.alert(" 您已有缴税账户 ，不能重复选择！", '提示信息');
                return false;
            }

            if (cktszhbzFlag && "Y" == formdata.cktszhbz) {
                mini.alert(" 您已有出口退税账号 ，不能重复选择！", '提示信息');
                return false;
            }

            if (tszhbzFlag && "Y" == formdata.tszhbz) {
                mini.alert(" 您已有退税账号 ，不能重复选择！", '提示信息');
                return false;
            }

            if (formdata.hbszDm == '156') {
                formdata.hbszDmText = '人民币元';
            } else if (formdata.hbszDm == '840') {
                formdata.hbszDmText = '美元';
            } else if (formdata.hbszDm == '978') {
                formdata.hbszDmText = '欧元';
            } else {
                formdata.hbszDmText = bzCombox.getText();
            }
            ckzhzhbg.sqbGrid.updateRow(rows[0], formdata);
            ckzhzhbg.addRowWin.hide();
        };

        ckzhzhbg.addRowWin.show();
    } else {
        alert("只能修改一条记录");
    }
};


// 取消添加
ckzhzhbg.addRowCancel = function () {
    ckzhzhbg.addForm = new mini.Form("#addRow-form");
    ckzhzhbg.addForm.reset();
    ckzhzhbg.addRowWin.hide();
};

ckzhzhbg.onbeforehide = function () {
    sxjszhbzFlag = false;
    cktszhbzFlag = false;
    tszhbzFlag = false;

    mini.get('add-sxjszhbz').enable();
    mini.get('add-cktszhbz').enable();
    mini.get('add-tszhbz').enable();
}

// 开户银行帮助
ckzhzhbg.showKhyhHelp = function () {
    var khyhTips = '<div style="font-size: 14px">1、您可以搜索，查询您的银行信息 <br />' +
        '2、若搜索不到，请更换银行卡或联系开户银行，请开户银行到税务机关备案 <br />' +
        '3、常用银行信息：河北银行 属于 城市商业银行</div>';
    mini.showMessageBox({
        width: 600,
        maxHeight: 350,
        title: "开户银行帮助",
        buttons: ["ok"],
        message: "",
        html: khyhTips
    });
};

// 核准号示例
ckzhzhbg.showHzhEg = function () {
    mini.showMessageBox({
        width: 660,
        maxHeight: 600,
        title: "开户许可证示例",
        buttons: ["ok"],
        message: "",
        html: $('#hzh').html()
    });
};
// 账户性质 1
ckzhzhbg.zhxzRenderer = function (e) {
    var row = e.row,
        yhzhxzDmText = '';
    var data = ckzhzhbg.zhxzdata; // 账户性质下拉框
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID == row.yhzhxzDm) {
            yhzhxzDmText = data[i].MC;
            break;
        }
    }
    e.row.yhzhxzDmText = yhzhxzDmText;
    return yhzhxzDmText;
};

// 行政区划 2
ckzhzhbg.xzqhRenderer = function (e) {
    var row = e.row,
        xzqhszDmText = '';
    var data = ckzhzhbg.xzqhData;
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID == row.xzqhszDm) {
            xzqhszDmText = data[i].MC;
            break;
        }
    }
    e.row.xzqhszDmText = xzqhszDmText;
    return xzqhszDmText;
};
// 银行种类 3

ckzhzhbg.yhzlRenderer = function (e) {
    var row = e.row,
        yhhbDmText = '';
    var data = ckzhzhbg.cyyhzlData;
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID == row.yhhbDm) {
            yhhbDmText = data[i].MC;
            break;
        }
    }
    e.row.yhhbDmText = yhhbDmText;
    return yhhbDmText;
};

//开户银行 4
ckzhzhbg.khyhRenderer = function (e) {
    var row = e.row,
        xzqh = row.xzqhszDm,
        yhhbdm = row.yhhbDm,
        yhyywdDmText = "";
    var params = {
        'codename': 'DM_GY_YHYYWD',
        'dlName': 'yhhb_dm',
        'dlValue': yhhbdm,
        'dlName2': 'XZQHSZ_DM',
        'dlValue2': xzqh
    };

    ckzhzhbgService.getKhyh(params, function (data) {

        if (!!data) {
            ckzhzhbg.khyhData = data; // 开户银行下拉框

            for (var i = 0; i < data.length; i++) {
                if (data[i].ID == row.yhyywdDm) {
                    yhyywdDmText = data[i].MC;
                    break;
                }
            }
        }
    });
    e.row.yhyywdDmText = yhyywdDmText;
    return yhyywdDmText;
};

// 币种 5

ckzhzhbg.bzRenderer = function (e) {
    var row = e.row,
        hbszDmText = '';
    var data = ckzhzhbg.bzData; // 币种下拉框数据

    for (var i = 0; i < data.length; i++) {
        if (data[i].ID == row.hbszDm) {
            hbszDmText = data[i].MC;
            break;
        }
    }
    e.row.hbszDmText = hbszDmText;
    return hbszDmText;
};
//账户性质改变时
ckzhzhbg.changeZhxz = function (e) {
    if (!sxjszhbzFlag) {
        if (e.value == "1110" || e.value == "1200") {
            mini.get('add-sxjszhbz').setValue('Y');
        } else {
            mini.get('add-sxjszhbz').setValue('N');
        }
    }
    /*
    * 账户性质为基本存款账户、预算单位专用存款账户、临时存款账户时，校验核准号非空,校验发证日期非空
     */
    if (e.value == '1110' || e.value == '1131' || e.value == '1132' || e.value == '1140') {
        mini.get('_yhkhdjzh').setRequired(true);
        mini.get('_ffrq').setRequired(true);
    } else {
        mini.get('_yhkhdjzh').setRequired(false);
        mini.get('_ffrq').setRequired(false);
    }

};
//行政区划改变时，清空银行
ckzhzhbg.xzqhChaged = function (e) {
    mini.get('yhhbDm').setValue(null); // 银行行别
    mini.get('yhyywdDm').setValue(null); // 银行营业网点
};
//银行种类改变时
ckzhzhbg.yhhbChanged = function (e) {
    var yhhbDm = e.value,
        xzqhDm = mini.get("xzqhszDm").getValue();

    ckzhzhbgService.getKhyh({
        'codename': 'DM_GY_YHYYWD',
        'dlName': 'yhhb_dm',
        'dlValue': yhhbDm,
        'dlName2': 'XZQHSZ_DM',
        'dlValue2': xzqhDm
    }, function (data) {
        mini.get('yhyywdDm').setData(data);
    })
};

// 币种单选按钮组选择
ckzhzhbg.changeBZRadio = function (e) {
    var bzRadioValue = e.value,
        comboxObj = mini.get('bzCombox');

    if (bzRadioValue == 0) {
        comboxObj.enable();
        ckzhzhbg.addHiddenBz.setValue("");
        comboxObj.setRequired(true);
    } else {
        comboxObj.disable();
        comboxObj.setRequired(false);
        comboxObj.setValue("");
        ckzhzhbg.addHiddenBz.setValue(bzRadioValue);
    }
}

// 币种下拉框选择
ckzhzhbg.changeBZCombox = function (e) {
    ckzhzhbg.addHiddenBz.setValue(e.value);
};

// 是否有缴税账号
var sxjszhbzFlag = false;
ckzhzhbg.isSxjszhbz = function (act) {
    var ckzhzhbgData = ckzhzhbg.sqbGrid.getData(),
        dataLength = ckzhzhbgData.length;

    if ("add" == act) {
        if (dataLength >= 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].sxjszhbz) {
                    sxjszhbzFlag = true;
                    break;
                }
            }
        }
    }

    if ("edit" == act) {
        var row = ckzhzhbg.sqbGrid.getSelected();
        var row_index = ckzhzhbg.sqbGrid.indexOf(row);
        if (dataLength > 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].sxjszhbz && i != row_index) {
                    sxjszhbzFlag = true;
                    break;
                }
            }
        }
    }

    return sxjszhbzFlag;
}

// 缴税账号标志选择
ckzhzhbg.changeSxjszhbz = function (e) {
    if (sxjszhbzFlag && "Y" == e.value) {
        mini.alert(" 您已有缴税账户 ，不能重复选择！", '提示信息');
        mini.get('add-sxjszhbz').setValue('N');
        mini.get('add-sxjszhbz').disable();
    }
}

// 是否有出口退税帐号
var cktszhbzFlag = false;
ckzhzhbg.isCktszhbz = function (act) {
    var ckzhzhbgData = ckzhzhbg.sqbGrid.getData(),
        dataLength = ckzhzhbgData.length;
    if ("add" == act) {
        if (dataLength >= 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].cktszhbz) {
                    cktszhbzFlag = true;
                    break;
                }
            }
        }
    }

    if ("edit" == act) {
        var row = ckzhzhbg.sqbGrid.getSelected();
        var row_index = ckzhzhbg.sqbGrid.indexOf(row);
        if (dataLength > 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].cktszhbz && i != row_index) {
                    cktszhbzFlag = true;
                    break;
                }
            }
        }
    }

    return cktszhbzFlag;
}

// 出口退税标志选择
ckzhzhbg.changeCktszhbz = function (e) {
    if (cktszhbzFlag && "Y" == e.value) {
        mini.alert(" 您已有出口退税账户 ，不能重复选择！", '提示信息');
        mini.get('add-cktszhbz').setValue('N');
        mini.get('add-cktszhbz').disable();
    }
}

// 是否有退税帐号
var tszhbzFlag = false;
ckzhzhbg.isTszhbz = function (act) {
    var ckzhzhbgData = ckzhzhbg.sqbGrid.getData(),
        dataLength = ckzhzhbgData.length;
    if ("add" == act) {
        if (dataLength >= 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].tszhbz) {
                    tszhbzFlag = true;
                    break;
                }
            }
        }
    }

    if ("edit" == act) {
        var row = ckzhzhbg.sqbGrid.getSelected();
        var row_index = ckzhzhbg.sqbGrid.indexOf(row);
        if (dataLength > 1) {
            for (var i = 0; i < dataLength; i++) {
                if ("Y" == ckzhzhbgData[i].tszhbz && i != row_index) {
                    tszhbzFlag = true;
                    break;
                }
            }
        }
    }

    return tszhbzFlag;
}

// 退税帐号标志选择
ckzhzhbg.changeTszhbz = function (e) {
    if (tszhbzFlag && "Y" == e.value) {
        mini.alert(" 您已有退税账户 ，不能重复选择！", '提示信息');
        mini.get('add-tszhbz').setValue('N');
        mini.get('add-tszhbz').disable();
    }
}

ckzhzhbg.ckckzhzhbg = function () {
    ckzhzhbg.ckbg.setData(ckzhzhbg.sqbGrid.getData());
    ckzhzhbg.ckckzhzhbgWin.show();
}

/**
 * 开户日期（发放日期）必须小于等于当前日期
 * @param e
 */
ckzhzhbg.onDrawDate = function (e) {
    var date = e.date;
    var d = new Date();

    if (date.getTime() > d.getTime()) {
        e.allowSelect = false;
    }
}

ckzhzhbg.validateKhrq = function () {
    var selectDate = mini.get('_khrq').getValue();
    var d = new Date();

    if (selectDate && selectDate.getTime() > d.getTime()) {
        mini.alert("开户日期必须小于等于当前日期！");
        mini.get('_khrq').setValue();
    }
}

ckzhzhbg.validateFzrq = function () {
    var selectDate = mini.get('_ffrq').getValue();
    var d = new Date();

    if (selectDate && selectDate.getTime() > d.getTime()) {
        mini.alert("发证日期必须小于等于当前日期！");
        mini.get('_ffrq').setValue();
    }
}











/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/4
 * Time：20:41
 *
 */
var sqbGridFlag = false;
// 步骤框架的入口
stepNav.run = function () {

    stepNav.initSteps([
        { id: 0, title: '账户信息', url: 'XxwhView.aspx' },
        { id: 1, title: '预览提交', url: 'YltjView.aspx', yltj: true },
        { id: 2, title: '完成', url: '../public1/wc/wc.aspx', js: true }

    ]);

    // 添加一条账户信息窗口
    var html = wssqUtil.loadTemplate('addRowView.aspx');
    $('body').append(html);
    // 添加一条查看报告窗口
    var ckBgViewHtml = wssqUtil.loadTemplate('ckBgView.aspx');
    $('body').append(ckBgViewHtml);

    // miniui初始化
    mini.parse();
    ckzhzhbg.sqbGrid = mini.get("ckzhzhxx-grid");
    ckzhzhbg.ylGrid = mini.get("yltj");
    ckzhzhbg.addRowWin = mini.get("addRow-win");
    ckzhzhbg.addHiddenBz = mini.get('hbszDm');
    ckzhzhbg.ckckzhzhbgWin = mini.get("ckbg-win");
    ckzhzhbg.ckbg = mini.get("ckbg");

    ckzhzhbg.khxkzWin = mini.get("khxkz-win"); // 开户许可证


    // 账户性质 1

    ckzhzhbg.zhxzdata = baseCode.getDataByCodeName('DM_GY_YHZHXZ.ashx') || []; // 账户性质下拉框
    mini.get('yhzhxzDm').setData(ckzhzhbg.zhxzdata);

    // 行政区划 2
    ckzhzhbg.xzqhData = baseCode.getDataByCodeName('DM_GY_XZQH_HB_CITY.ashx') || []; // 行政区划下拉框
    mini.get('xzqhszDm').setData(ckzhzhbg.xzqhData);

    // 银行种类 3
    ckzhzhbg.cyyhzlData = baseCode.getDataByCodeName('DM_GY_YHHB.ashx') || [];
    mini.get('yhhbDm').setData(ckzhzhbg.cyyhzlData);

    // 币种 5
    ckzhzhbg.bzData = baseCode.getDataByCodeName('DM_GY_HB.ashx') || [];
    mini.get('bzCombox').setData(ckzhzhbg.bzData);


    // 获取账户信息
    ckzhzhbgService.hqzhxx({}, function (data) {
        if (!(data.value.length > 0)) {
            sqbGridFlag = true;
        }
        ckzhzhbg.xxwhData = data.value;
        ckzhzhbg.sqbGrid.setData(ckzhzhbg.xxwhData);
    }, function (err) {
        mini.alert(err.message);
    });

};
//获取纳税人的基本信息

// 步骤跳转前执行
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        var ckzhzhxxgrid = mini.get('ckzhzhxx-grid');
        if (sqbGridFlag) {
            if (ckzhzhxxgrid.getRow(0) == null) {
                mini.alert('当前没有存款账户账号信息，不能点击下一步');
                return;
            }
        }

        var bgxx = ckzhzhbg.sqbGrid.getChanges(null, false);
        if (bgxx.length <= 0) {
            mini.alert('信息未作修改，不能点击下一步');
            return;
        } else {
            var ylData = ckzhzhbg.sqbGrid.getData();
            ckzhzhbg.ylGrid.setData(ylData);
            for (var i = 0; i < ylData.length; i++) {
                if (ylData[i].sxjszhbz == 'Y') {
                    // 完成页面添加内容和按钮
                    var html = '<div id="gosfxy-page"> <div>建议您完成<span class="txt-blue">三方协议签订</span>，便于之后进行三方协议缴款。免去前台排队烦恼，体验云厅便捷缴税！</div></div>'
                    var btn = ' <button id="qdsfxy-btn">去签订三方协议</button> ';
                    $('#content').append(html);
                    $('#actions').append(btn);
                    //签订三方协议
                    $("#qdsfxy-btn").click(function () {
                        window.location.href = "../sfxy/wtkkxys.html?code=110701";
                    });
                    break;
                }
            }


            var nsrjbxx = nsrxxUtil.getNsrxxVO();
            var lxdh = '';
            if (nsrjbxx.nsrxxKzVO) {
                lxdh = nsrjbxx.nsrxxKzVO.scjydlxdh || '';
            }
            var formData = {
                nsrsbh: nsrjbxx.nsrsbh,
                nsrmc: nsrjbxx.nsrmc,
                scjydz: nsrjbxx.scjydz,
                scjydlxdh: lxdh
            };
            var form1 = new mini.Form('#nsrjbxx-form');
            var form2 = new mini.Form('#ckbg-nsrjbxx-form');
            form1.setData(formData);
            form2.setData(formData);

        }
    }
    if (currentIndex == 1) {
        // 判断是否提示三方协议签订
        /*var insertGridVo = ckzhzhbg.sqbGrid.getChanges('added', false),
            updateGridVo = ckzhzhbg.sqbGrid.getChanges('modified', false);

        if (insertGridVo.length != 0 || updateGridVo.length != 0) {
            for (var insertNo = 0; insertNo < insertGridVo.length; insertNo++) {
                if ("N" == insertGridVo[insertNo].sxjszhbz) {
                    $("#gosfxy-page").hide();
                    break;
                }
            }

            for (var updateNo = 0; updateNo < updateGridVo.length; updateNo++) {
                if ("N" == updateGridVo[updateNo].sxjszhbz) {
                    $("#gosfxy-page").hide();
                    break;
                }
            }
        }*/

        return ckzhzhbg.tj();
    }
    if (currentIndex == 2) {

    }
    return true;
};




