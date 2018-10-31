/**
 * Created by fsg on 2017/11/21.
 */
var grid, ylgrid, fbzlGrid, ylfbzlgrid, currentSqxh;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var fplg = {};
fplg.ghfnsrsbh = "";
fplg.ghfdjxh = "";
fplg.selectedData = [];

stepNav.run = function () {
    //步骤
    stepNav.initSteps([
        {id: 0, title: '填写申请信息表', url: 'cxlfpView.aspx'},
        {id: 1, title: '预览提交', url: 'ylView.aspx',yltj: true},
        {id: 2, title: '审核中', url: '../public1/shz/shz.aspx', js:true},
        {id: 3, title: '完成', url: '../public1/wc/wc.aspx'}
    ]);

    mini.parse();
    grid = mini.get("fpds_grid");
    fbzlGrid = mini.get('fbzl-grid');
    ylfbzlgrid = mini.get("fbzl-yl-grid");
    ylgrid = mini.get("fpds1_grid");
    $.ajax({
        url: "../../../api/fp/cxlfptp/getHxzgFpxx.ashx",
        async: false,
        dataType: "json",
        type: "POST",
        success: function (data) {
            if (data.success == true) {
                gridData = mini.decode(data.value);
                if(gridData.length>0){
                    grid.setData(gridData);
                    grid.setTotalCount(gridData.length);
                    grid.onlyCheckSelection = true;
                }else {
                    mini.alert('您未核定过票种，不能办理此业务', "提示", function() {
                        window.close();
                    });
                }
            }
        },
        error: function (e) {

        }
    });
    fplg.userInfo = nsrxxUtil.getUserInfo();
    var now = (new Date()).format('yyyy-MM-dd');
    var lastDay = (new Date()).getLastDateOfMonth('yyyy-MM-dd');
    mini.get('nsrsbh').setValue(wssqUtil.nsrjbxx.nsrsbh);
    mini.get('nsrmc').setValue(fplg.userInfo.NsrInfo.gsNsrmc);
    mini.get('dyljykdefpje').setValue("0");//定额发票累计购票金额
    mini.get('defpsqtpje').setValue("0");//定额发票申请特批金额
    mini.get('zgqxq').setValue(now);//申请期限起
    mini.get('zgqxz').setValue(lastDay);//申请期限止
    mini.get('sqrq').setValue(now);//申请日期
    grid.on('cellclick',function (e) {
        if(e.column.field=='sqzggpsl'){
            mini.VTypes["zggpslLimitErrorText"] = "申请特批数量不能超过每月最高购票数量";
            mini.VTypes["zggpslLimit"] = function (v) {
                //不对空值进行校验
                if (!v || v === "") return true;

                if (parseInt(e.row.sqzggpsl) > parseInt(e.row.myzggpsl)) {
                    return false;
                } else {
                    return true;
                }
            };
            e.column.vtype = "required;int;zggpslLimit";
        }
    });
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    var swsxMxDmList = [];
    var fpxxForm = new mini.Form("#fpxx");
    var fpxxData = fpxxForm.getData(true);
    var bsxxForm = new mini.Form("#bsxx");
    var bsxxData = bsxxForm.getData(true);
    //已经录入了发票等信息,将转到附报资料
    if (currentIndex == 0) {
        if (checkFpzmsqxxOnNavigate() == false) {
            return false;
        }
    }
    //提交
    else if (currentIndex == 1) {
        var fphlData = grid.getData();
        return submitFpzmsq(fpxxData, bsxxData, fphlData);
    }

    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if (currentIndex == 1) {
        var fpxxForm = new mini.Form("#fpxx");
        var ylfpxxForm = new mini.Form("#yl-fpxx");
        var bsxxForm = new mini.Form("#bsxx");
        var ylbsxxForm = new mini.Form("#yl-bsxx");
        ylfpxxForm.setData(fpxxForm.getData(true));
        ylbsxxForm.setData(bsxxForm.getData(true));
        var gridData = grid.getData();
        ylgrid.setData(gridData);
    }
};
stepNav.onFinished = function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用', '我的办税大厅', '/web-front/bszm-front/apps/views/home/home.html');
};

//提交发票证明申请信息
function submitFpzmsq(fpxxData, bsxxData, fphlData) {

    var formData = buildFpzmsqData(fpxxData, bsxxData, fphlData);
    var submitResult = true;

    wssqUtil.tjsq("../../../api/fp/cxlfptp/submitCxlFptpsqxx", formData, function (data) {
        var resultData = mini.decode(data);
        if (!resultData.success) {
            mini.alert("专用发票证明提交失败");
            submitResult = false;
        } else {
            currentSqxh = resultData.value.sqxh;
            submitResult = true;
        }
    });

    return submitResult;
}

//检查发票证明申请信息（主要是页面上的数据）
function checkFpzmsqxxOnNavigate() {
    var fpdsForm = new mini.Form("#fpds");

    fpdsForm.validate();
    if (!fpdsForm.isValid()) {
        return false;
    }

    var allNotCheck = false;
    var $Grid = $('#mini-grid-table-bodyfpds_grid');
    var $GridTr =  $Grid.find('tr.mini-grid-row');
    if($Grid.length>0){
        for(var n=0;n<$GridTr.length;n++){
            var val = $GridTr.eq(n).find('td').eq(3).html();
            if(val!="&nbsp;"){
                allNotCheck = true;
                break;
            }
        }
    }
    if(!allNotCheck){
        mini.alert('请填写申请特批数量！');
        return false;
    }
}

function isValidData(data) {
    if (data == null || data == "" || data == "undefined") {
        return false;
    } else {
        return true;
    }
}

//构造需要提交的json数据 组织报文
function buildFpzmsqData(fpxxData, bsxxData, fphlData) {

    var zmsqData = {
        gptpSqspVO:{
            sjgsdq: wssqUtil.nsrjbxx.sjgsdq,
            hzswjgDm: wssqUtil.currentSwsxDm,//税务机构代码
            zgqxz: bsxxData.zgqxz,//申请期限止
            djxh: nsrxxUtil.getNsrInfo().djxh,//登记序号
            dyljykdefpje: bsxxData.dyljykdefpje,//定额发票累计购票金额
            hdslid:"",
            sqrxm: wssqUtil.nsrjbxx.nsrmc,//申请人姓名
            zgqxq: bsxxData.zgqxq,//申请期限起
            lcslid:"",
            tpuuid:"",
            sqrq: bsxxData.sqrq,//申请日期
            hzrDm:"",
            lrrDm: nsrxxUtil.getNsrxxVO().lrrDm,//录入人代码
            ljgpje:"",
            slswjgDm: wssqUtil.currentSwsxDm,//受理税务机构代码
            sqly: bsxxData.sqly,//申请理由
            xgrDm: wssqUtil.nsrjbxx.xgrDm,
            hzrq:"",
            gptplxDm:"",
            slrq:"",//受理日期
            slrDm:"",//受理人代码
        },
        gptpSqspMxVOList:{
            gptpSqspMxVOListlb:[]
        }
    };
    for(var j=0;j<fphlData.length;j++){
        zmsqData.gptpSqspMxVOList.gptpSqspMxVOListlb.push({
            sjgsdq: wssqUtil.nsrjbxx.sjgsdq,
            hzzggpsl: fphlData[j].myzggpsl,//每月最高购票数量
            fpzlDm: fphlData[j].fpzlDm,//发票种类代码
            zsbz:"",
            tpuuid:"",
            sqzggpsl: fphlData[j].sqzggpsl,//申请特批数量
            tpmxuuid:"",
            dyykfpxse:"",
            lrrDm: nsrxxUtil.getNsrxxVO().lrrDm,//录入人代码
            xgrDm: wssqUtil.nsrjbxx.xgrDm//修改人代码
        })
    }
    return mini.encode(zmsqData);
}


/**
 * 增加行
 * @param datagridName
 * @param beginEditCellName
 */
fplg.addRow = function (datagridName, beginEditCellName) {
    var grid = mini.get(datagridName);
    var newRow = {};
    grid.addRow(newRow, grid.getData().length);
    grid.beginEditCell(newRow, beginEditCellName);
}

fplg.onFpdjChange = function (e) {
    var fpdj = e.value;
    if (!isValidData(fpdj)) {
        return;
    }

    if (!fplg.isNumber(fpdj)) {
        mini.alert("请输入数字");
        mini.get("fpdj").setValue("");
    }
}

fplg.onFpslChange = function (e) {
    var fpsl = e.value;
    if (!isValidData(fpsl)) {
        return;
    }

    if (!fplg.isNumber(fpsl)) {
        mini.alert("请输入数字");
        mini.get("fpsl").setValue("");
    }
}

fplg.onGhfnsrsbhBlur = function (e) {
    var txtGhfmc = mini.get("ghfmc");
    txtGhfmc.setValue("");
    var ghfnsrsbh = e.source.value;
    if (ghfnsrsbh == null || ghfnsrsbh == "") {
        return;
    }
    var xhfnsrsbh = mini.get("nsrsbh").getValue();
    if (xhfnsrsbh == ghfnsrsbh) {
        mini.alert("销货方纳税人识别号不能与购货方纳税人识别号相同，请重新输入");
        mini.get("nsrsbh").focus();
        return;
    }

    if (fplg.ghfnsrsbh == ghfnsrsbh) {
        return;
    }
    fplg.ghfnsrsbh = ghfnsrsbh;
    $.ajax({
        url: "../../../api/fp/fpzm/get/nsrxx",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        data: {
            nsrsbh: ghfnsrsbh
        },
        success: function (data) {
            if (data.success == true && data.value != null) {
                if (data.value.length > 1) {
                    fplg.checkGhfxxWin.show();
                    fplg.checkGhfxxGrid.setData(data.value);
                } else if (data.value.length == 1) {
                    txtGhfmc.setValue(data.value[0].nsrmc);
                    fplg.ghfdjxh = data.value[0].djxh;
                }
            }
        },
        error: function (e) {
        }
    });
};

fplg.onNssbrqChange = function (e) {
    if (e.value == "" || e.value == null || e.value == undefined) {
        return;
    }

    var nssbrq = mini.encode(e.value);
    if (nssbrq.length < 11) {
        return;
    }
    nssbrq = nssbrq.substring(1, 11);

    $.ajax({
        url: "../../../api/fp/fpzm/get/skssq",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        data: {
            nssbq: nssbrq
        },
        success: function (data) {
            if (data.success == true && data.value != null) {
                mini.get("skssqq").setValue(data.value.skssqq);
                mini.get("skssqz").setValue(data.value.skssqz);
            }
        },
        error: function (e) {
        }
    });

}

fplg.onskssqz = function (e) {
    var Yxqq = mini.get("skssqq").getValue();
    if (Yxqq == "" || Yxqq == null || Yxqq == undefined) {
        return;
    }

    if (Yxqq > e.value) {
        mini.alert("税款所属期止不能小于税款所属期起，请重新选择税款所属期止！", "提示信息", function () {
            e.sender.setValue("");
            e.isValid = false;
            e.sender.focus();
        })
    }
}
fplg.onskssqq = function (e) {
    var Yxqz = mini.get("skssqz").getValue();
    if (Yxqz == "" || Yxqz == null || Yxqz == undefined) {
        return;
    }

    if (Yxqz < e.value) {
        mini.alert("税款所属期起不能大于税款所属期止，请重新填写税款所属期起！", "提示信息", function () {
            e.sender.setValue("");
            e.isValid = false;
            e.sender.focus();
        })
    }
}

fplg.isNumber = function(data) {
    var validator = new Validator();
    if (!validator.isDecimal(data)) {
        return false;
    } else {
        return true;
    }
}

fplg.onDrawDate = function (e) {
    var d = new Date();
    var m = d.getLastDateOfMonth('yyyy-MM-dd');//月末
    if (e.date.getTime() + 86400000 < d.getTime()||(e.date.getTime() + 86400000 > new Date(m).getTime() + 86400000)) {
        e.allowSelect = false;
    }
};
fplg.onFpdsCommitEdit = function(e){
    var field = e.field;
    var je=0;
    if(field =='sqzggpsl'){
        if(isValidData(e.record.myzggpsl)){
            if(!fplg.isNumber(e.value)){
                return;
            }
        }
    }
}