var fbzlGrid, fbzlylGrid;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var xgm = {};
var hw_jssjq;
var hw_jssjz;
var ys_jssjq;
var ys_jssjz;

stepNav.run=function () {
    //查询是否有正在办理中的任务
/*    if(!wssqUtil.checkZzbl(Tools.getUrlParamByName('code'))){
        return;
    }*/
    //步骤
    stepNav.initSteps([
        {id:0,title:'填写账户信息',url:'xzaxgmView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'xzaxgmylView.aspx',yltj:true},
        {id:3,title:'审核中',url:'../public1/shz/shz.aspx',js:true},
        {id:4,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);
    fbzlGrid = mini.get('fbzl-grid');
    fbzlylGrid = mini.get('fbzl-yl-grid');
    xgm.queryXgmns();
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if(currentIndex==0){
        var form1=new mini.Form('#xgmnsrxx');
        if(!form1.validate()){
            return;
        }
        var swsxMxDmList=[];//如果有税务事项明细代码请组织好
        //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        fbzlAjax(datas,'requestFbzllist');

    }else if(currentIndex==1){
        //判断是否按要求上传附报资料
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);

    }else if(currentIndex==2){
        return xgm.tjsqxx();
        filterExcessData();//加在组织数据前
        var postdata = {
            "data":formdata,//自己本身业务的数据
            "fbzlList": fbzldata//附报资料的数据
        };
        postdata = mini.encode(postdata);
    }
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
        var wcjyzmTxForm = new mini.Form("#step_tx_form");
        var wcjyzmYlForm = new mini.Form("#step_yl_form");
        var formData = wcjyzmTxForm.getDataAndText(true);
        wcjyzmYlForm.setData(formData);

        var formdata = xgm.getTxData();
        var formFields = formdata.xgmForm.getFields();
        for ( var t in formFields) {
            var tempField = formFields[t];
            var name = tempField.name;
            var value = tempField.value;
            var text = tempField.text;
            if (tempField.type != 'undefined') {
                if (tempField.type == 'combobox') { // 下拉列表
                    $("#" + name + "_view").text(text);
                } else if (tempField.type == 'textbox') { //
                    $("#" + name + "_view").text(value);
                } else if (tempField.type == 'treeselect') { // 单选树
                    $("#" + name + "_view").text(text);
                } else if (tempField.type == 'datepicker') { // 时间
                    $("#" + name + "_view").text(text);
                } else if (tempField.type == 'textarea') {
                    $("#" + name + "_view").text(value);
                } else if (tempField.type == 'moneybox') {
                    $("#" + name + "_view").text(value);
                }
                if (tempField.type == 'checkbox') { //
                    $("#" + name + "_view").text((value == 'Y') ? '是' : '否');
                }
            }
        }

    }
};
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','/web-front/bszm-front/apps/views/home/home.html');
};
xgm.queryXgmns =function() { //前置的校验
    xzaxgmService.getXgmnsdj(mini.encode({}), function (data) {
        var resultData = mini.decode(data);
        if (!resultData.success) {
            mini.alert(resultData.message,'提示信息',function(){
                window.close();
            });
        } else {
            xgm.init();
        }
    });
};

xgm.init = function(){
    mini.parse();
    hw_jssjq=mini.get("hwjssjq");
    hw_jssjz=mini.get("hwjssjz");
    ys_jssjq=mini.get("ysjssjq");
    ys_jssjz=mini.get("ysjssjz");

    mini.get("nsrsbh").setValue(wssqUtil.nsrjbxx.nsrsbh);
    mini.get("nsrmc").setValue(wssqUtil.nsrjbxx.nsrmc);

    var date =new Date();
    hw_jssjq.setValue(date.getFirstDateOfMonth("yyyy-MM-dd"));
    hw_jssjz.setValue(date.getLastDateOfMonth("yyyy-MM-dd"));
    ys_jssjq.setValue(date.getFirstDateOfMonth("yyyy-MM-dd"));
    ys_jssjz.setValue(date.getLastDateOfMonth("yyyy-MM-dd"));

    //查询货物劳务和应税劳务的 销售总额
    xgm.queryHwlwXse();
    xgm.queryYslwXse();
};

xgm.queryHwlwXse = function(){ //查询货物劳务销售额
    $.ajax({
        type : "POST",
        url: xzaxgmService.Api.getLjxse+"/"+1+"/"+hw_jssjq.getFormValue()+"/"+hw_jssjz.getFormValue()+'.ashx',
        async : false,
        data : mini.encode({}),
        success : function(json) {
            if(json.message==='ajaxSessionTimeOut'){
                top.location.reload(true);
                return;
            }
            var resultData = mini.decode(json);
            if(resultData.success){
                if(resultData.value.ljxse=="")
                    mini.get("hwlwhj").setValue(0);
                else
                    mini.get("hwlwhj").setValue(resultData.value.ljxse);
            }else{
                mini.get("hwlwhj").setValue(0);
                mini.alert("货物劳务累计销售额查询失败");
            }
        }
    });
};

xgm.queryYslwXse = function(){ //查询应税劳务销售额
    $.ajax({
        type : "POST",
        url: xzaxgmService.Api.getLjxse+"/"+2+"/"+ys_jssjq.getFormValue()+"/"+ys_jssjz.getFormValue(),
        async : false,
        data : {
            ewblxh :2,
            djxh:wssqUtil.nsrjbxx.djxh,
            jssjq:ys_jssjq.getFormValue(),
            jssjz:ys_jssjz.getFormValue()
        },
        success : function(json) {
            if(json.message==='ajaxSessionTimeOut'){
                top.location.reload(true);
                return;
            }
            var resultData = mini.decode(json);
            if(resultData.success){
                if(resultData.value.ljxse=="")
                    mini.get("ysfwhj").setValue(0);
                else
                    mini.get("ysfwhj").setValue(resultData.value.ljxse);
            }else{
                mini.get("ysfwhj").setValue(0);
                mini.alert("查询应税服务累计销售额查询失败");
            }
        }
    });
};
function onDrawDate1(e){
    var date = e.date;
    var d = new Date(hw_jssjz.getValue());
    if(date.getTime() > d.getTime()){
        e.allowSelect = false;
    }
}
function onDrawDate2(e){
    var date = e.date;
    var d = new Date(hw_jssjq.getValue());
    if(date.getTime() < d.getTime()){
        e.allowSelect = false;
    }
}
function onDrawDate3(e){
    var date = e.date;
    var d = new Date(ys_jssjz.getValue());
    if(date.getTime() > d.getTime()){
        e.allowSelect = false;
    }
}
function onDrawDate4(e){
    var date = e.date;
    var d = new Date(ys_jssjq.getValue());
    if(date.getTime() < d.getTime()){
        e.allowSelect = false;
    }
}

function onValueChanged1(e){
    var date =e.value;
    hw_jssjq.setValue(new Date(date.getFullYear(),date.getMonth(), 1));
    if(hw_jssjz.getValue()!=""&&hw_jssjq.getValue()!=""){
        if(getMonthNumber(hw_jssjq.getFormValue(),hw_jssjz.getFormValue())<=12){
            xgm.queryHwlwXse();
        }else {
            mini.get("hwlwhj").setValue(0);
            mini.alert("货物劳务累计销售额的计算时间不得超过12个月","错误",
                function(){
                    xgm.init();
                }
            );
        }
    }
}

function onValueChanged2(e){
    var date =e.value;
    var jssjqDate =hw_jssjq.getValue();
    hw_jssjz.setValue(new Date(date.getFullYear(),date.getMonth() , getlastDate(date.getFullYear(),date.getMonth()+1)));
    if(hw_jssjz.getValue()!=""&&hw_jssjq.getValue()!=""){
        if(getMonthNumber(hw_jssjq.getFormValue(),hw_jssjz.getFormValue())<=12){
            if(hw_jssjq.getValue().format("yyyy-MM-dd") > hw_jssjz.getValue().format("yyyy-MM-dd") ){
                mini.alert("计算时间止应大于计算时间起");
                hw_jssjz.setValue(new Date(jssjqDate.getFullYear(),jssjqDate.getMonth() , getlastDate(jssjqDate.getFullYear(),jssjqDate.getMonth())));
                return;
            }else{
                xgm.queryHwlwXse();
            }
        }else {
            mini.get("hwlwhj").setValue(0);
			mini.alert("货物劳务累计销售额的计算时间不得超过12个月","错误",
				function(){
					xgm.init();
				}
			);
        }
    }
}

function onValueChanged3(e){
    var date =e.value;
    ys_jssjq.setValue(new Date(date.getFullYear(),date.getMonth(), 1));
    if(ys_jssjq.getValue()!=""&&ys_jssjz.getValue()!=""){
        if(getMonthNumber(ys_jssjz.getFormValue(),ys_jssjq.getFormValue())<=12){
            xgm.queryYslwXse();
        }else{
            mini.get("ysfwhj").setValue(0);
			mini.alert("货物劳务累计销售额的计算时间不得超过12个月","错误",
				function(){
					xgm.init();
				}
			);
        }
    }
}
function onValueChanged4(e){
    var date =e.value;
    var jssjqDate = ys_jssjq.getValue();
    ys_jssjz.setValue(new Date(date.getFullYear(),date.getMonth() , getlastDate(date.getFullYear(),date.getMonth()+1)));
    if(ys_jssjq.getValue()!=""&&ys_jssjz.getValue()!=""){
        if(getMonthNumber(ys_jssjz.getFormValue(),ys_jssjq.getFormValue())<=12){
            if(ys_jssjq.getValue().format("yyyy-MM-dd") > ys_jssjz.getValue().format("yyyy-MM-dd") ){
                mini.alert("计算时间止应大于计算时间起");
                ys_jssjz.setValue(new Date(jssjqDate.getFullYear(),jssjqDate.getMonth() , getlastDate(jssjqDate.getFullYear(),jssjqDate.getMonth())));
                return;
            }else{
                xgm.queryYslwXse();
            }
        }else{
            mini.get("ysfwhj").setValue(0);
			mini.alert("货物劳务累计销售额的计算时间不得超过12个月","错误",
				function(){
					xgm.init();
				}
			);
        }
    }
}


//计算月份差
function getMonthNumber(date1,date2){
    //默认格式为"20030303",根据自己需要改格式和方法
    var year1 =  date1.substring(0,4);
    var year2 =  date2.substring(0,4);
    var month1 = date1.substring(5,7);
    var month2 = date2.substring(5,7);
    var len=(year2-year1)*12+(month2-month1);
    return Math.abs(len)+1;
}
function getlastDate(year,month){
    var date;
    var days=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2){
        if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){//是闰年
            date=days[1];
        }else {
            date=29;
        }
    }else {
        date=days[month-1];
    }
    return parseInt(date);
}
/**
 * 获取填写数据
 * @returns {{xgmForm: mini.Form, xgmFormData: *}}
 */
xgm.getTxData = function () {
    // 外出经营证明的申请信息Form
    var xgmForm = new mini.Form("#wizard");
    var xgmFormData = xgmForm.getData();

    // 转化成json字符串
    xgmFormData = mini.encode(xgmFormData);

    return {
        "xgmForm" : xgmForm,
        "xgmFormData" : xgmFormData
    };
};
xgm.tjsqxx = function(){
    var returnFlag = true;
    var requestData = {
        "brdzzsybnsrForm" : {
            "ljyshwxsejssjq" : mini.formatDate(mini.parseDate(mini.get("hwjssjq").getValue()), "yyyy-MM-dd"),
            "ljysfwxsejssjq" : mini.formatDate(mini.parseDate(mini.get("ysjssjq").getValue()), "yyyy-MM-dd"),
            "ljysfwxse" : mini.get("ysfwhj").getValue(),
            "rduuid" : "",
            "slrq" : "",
            "slr" : "",
            "ljysfwxsejssjz" : mini.formatDate(mini.parseDate(mini.get("ysjssjz").getValue()), "yyyy-MM-dd"),
            "qksm" : mini.get("qksm").getValue(),
            "fddbr" : "",
            "dlr" : "",
            "ljyshwxse" : mini.get("hwlwhj").getValue(),
            "jbr" : "",
            "nsryj" : "",
            "sqrq" : new Date().format("yyyy-MM-dd"),
            "slswjgmc" : "",
            "ljyshwxsejssjz" : mini.formatDate(mini.parseDate(mini.get("hwjssjz").getValue()), "yyyy-MM-dd")
        },
        "djxh" : "",
        "zgswskfjDm" : "",
        "lcslid" : ""
    };
    var messageid = mini.loading("提交中, 请稍等 ...", "提交中");
    xzaxgmService.tj(mini.encode(requestData), function (data) {
        var resultData = mini.decode(data);
        mini.hideMessageBox(messageid);
        if (!resultData.success) {
            mini.alert(resultData.message,"提示信息");
            returnFlag = false;
            return;
        } else {
            //if(resultData.data.sxlxDm=="01"){  //免受理免审核则直接打开税务事项通知书
            //showSwsxtzs(resultData.data);
            //}
        }
    });
    return returnFlag;
};
/*function tjsqxx() { // 提交申请信息
    var formData = xgm.getTxData().xgmFormData;
    var returnFlag = true;
    var zlsfqq = "";//stepNav.getIFrameByStep(1).getZlsfqq()
    var messageid = mini.loading("提交中, 请稍等 ...", "提交中");
    $.ajax({
        type : "POST",
        url : "",///gggn/xgmgl_saveXzXgmnsdj.do
        data : {
            data : mini.encode(formData),
            nsrsbh : wssqUtil.nsrjbxx.nsrsbh,
            swsxdm : "110403",//wssqUtil.currentSwsxDm
            zlsfqq : zlsfqq
        },
        success : function(data) {
            mini.hideMessageBox(messageid);
            var resultData = mini.decode(data);
            if (!resultData.success) {
                mini.alert(resultData.message, "提示信息");
                returnFlag = false;
                return;
            }
            // 即办、非即办事项则进入下一个页面。
                blsx = resultData.data.blsx;
                $("#close").show();
                $("#stepnext").hide();
                $("#stepprev").hide();
                $("#cancel").hide();
                stepNav.nextstep();
        },
        error : function(e) {
            mini.hideMessageBox(messageid);
        }
    });
    return returnFlag;
}*/
/**
 * 时间填写规则
 * @param e
 */
/*
xgm.onhwjssjz = function(e){
    var Yxqq=mini.get("hwjssjq").getValue();
    if(Yxqq==""||Yxqq==null||Yxqq==undefined){
        mini.alert("请先填写计算时间起！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            mini.get("hwjssjq").focus();
        } )
    }
    if(Yxqq> e.value){
        mini.alert("计算时间止不能小于计算时间起，请重新填写计算时间起！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}
xgm.onhwjssjq = function(e){
    var Yxqz=mini.get("hwjssjz").getValue();
    if(Yxqz == ""||Yxqz == null||Yxqz == undefined){

    }else{
        if(Yxqz< e.value){
            mini.alert("计算时间起不能大于计算时间止，请重新填写计算时间起！","提示信息",function(){
                e.sender.setValue("");
                e.isValid=false;
                e.sender.focus();
            })
        }
    }

}
xgm.onysjssjz = function(e){
    var Yxqq=mini.get("ysjssjq").getValue();
    if(Yxqq==""||Yxqq==null||Yxqq==undefined){
        mini.alert("请先填写计算时间起！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            mini.get("ysjssjq").focus();
        } )
    }
    if(Yxqq> e.value){
        mini.alert("计算时间止不能小于计算时间起，请重新填写计算时间起！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}
xgm.onysjssjq = function(e){
    var Yxqz=mini.get("ysjssjz").getValue();
    if(Yxqz == ""||Yxqz == null||Yxqz == undefined){

    }else{
        if(Yxqz< e.value){
            mini.alert("计算时间起不能大于计算时间止，请重新填写计算时间起！","提示信息",function(){
                e.sender.setValue("");
                e.isValid=false;
                e.sender.focus();
            })
        }
    }

}*/
