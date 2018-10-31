/**
 * Created by yuepu on 2017/2/6.
 */

var tydj={};

stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer

stepNav.run=function () {
    stepNav.initSteps([
        {id:0,title:'填写申请表',url:'TxsqbView.aspx'},
        {id:1,title:'预览提交',url:'YlView.aspx',yltj:true},
        {id:2,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);

    // miniui初始化
    mini.parse();
    tydj.tydjForm = new mini.Form("#tydjForm");
    tydj.tydjYlForm = new mini.Form("#tydjYlForm");
    tydj.jcfpGrid = mini.get('jcfp-grid');
    tydj.jcswzlGrid = mini.get('jcswzl-grid');
    tydj.jcqtswzlGrid = mini.get('jcqtswzl-grid');

    tydj.jcfpylGrid = mini.get('jcfpYl-grid');
    tydj.jcswzlylGrid = mini.get('jcswzlYl-grid');
    tydj.jcqtswzlylGrid = mini.get('jcqtswzlYl-grid');
    tydj.hdzxqq = "";
    tydj.sjzxqz = "";

    function closeWindow(){// 点击确认后关闭
  	 window.close();
    }
    //税务登记证件种类
    //tydj.swdjzjzl = baseCode.getDataByCodeName('DM_DJ_SWZJZL2')||[]; // 账户性质下拉框
    //mini.get('swdjzjzlDm').setData(tydj.swdjzjzl);

    //初始化
    tydj.init();
    $.ajax({
	    url: "/wszx-web/api/dj/tydj/query/gtdqdeHdxx.ashx",
	    type: "POST",
	    async: false,
	    success: function(data) {
	        var resultData = mini.decode(data);
	      	if(resultData.success){
	      		tydj.hdzxqq = resultData.value.hdzxqq;
	      		tydj.sjzxqz = resultData.value.sjzxqz;
	      	}else{
	      		mini.alert(resultData.message,"确定",closeWindow);
	      	}
	    },
	    error: function(err) {
	    	mini.alert("请求异常");
	    }
	  });
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    var result= false;
    if(currentIndex==0){
    	if(! tydj.checkZxqqz(tydj.tydjForm.getData(true))) {
    		return false;
    	}
        if(! tydj.tydjForm.validate()){
            return false;
        }
        tydj.jcswzlGrid.validate();
        tydj.jcqtswzlGrid.validate();
        if(tydj.jcswzlGrid.isValid() && tydj.jcqtswzlGrid.isValid()){
            result = true;
        }else{
            result = false;
        }
        if(result) {
            var yltjData = tydj.setDateK(tydj.tydjForm.getData(true));
            yltjData.nsrsbh = nsrxxUtil.getNsrxxVO().nsrsbh;
            yltjData.nsrmc = nsrxxUtil.getNsrxxVO().nsrmc;
            tydj.tydjYlForm.setData(yltjData);
            tydj.jcfpylGrid.setData(tydj.jcfpGrid.getData());
            tydj.jcswzlylGrid.setData(tydj.jcswzlGrid.getData());
            tydj.jcqtswzlylGrid.setData(tydj.jcqtswzlGrid.getData());
        }
    }
    if(currentIndex==1){
        result = tydj.yltj();
    }

    return result;
};
stepNav.onStepChanged = function (event, currentIndex, previIndex) {

    if(currentIndex==1){
        mini.layout(tydj.jcfpylGrid);
        mini.layout(tydj.jcswzlylGrid);
        mini.layout(tydj.jcqtswzlylGrid);
    }
};
stepNav.onFinished=function (event, currentIndex) {
    cwkjzdba.yltj();
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','../../../apps/views/home/home.html');
};

stepNav.onStepDataSaved=function (event, currentIndex, newIndex) {
};

tydj.swdjzjzlRenderer = function (e) {
    var row = e.row,
        swdjzjzlText = '';
    var data = tydj.swdjzjzl; // 税务登记证件种类下拉框
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID == row.swdjzjzl) {
            swdjzjzlText = data[i].MC;
            break;
        }
    }
    e.row.swdjzjzlText = swdjzjzlText;
    return swdjzjzlText;
}

tydj.init = function () {
    var dates= new Date();
    //停业期起
    var dates2 = mini.addDate(dates,1,'MO');
    var dateStr = mini.formatDate(dates2,"yyyy-MM");
    var hztyqxq = mini.get("tyDateStart");
    hztyqxq.setValue(dateStr);
    //报告日期
    var dateStr = mini.formatDate(dates,"yyyy-MM-dd");
    var bgrq = mini.get("tybgrq");
    bgrq.setValue(dateStr);

    // tydjService.getFpjcqk({},function (data) {
    //     var resultData = mini.decode(data);
    //     if(resultData.success){
    //         tydj.jcfpGrid.setData(resultData.value||[]);
    //     }else{
    //         mini.alert(data.message,'提示信息', function () {
    //             window.close();
    //         });
    //     }
    // },function (err) {
    //     mini.alert(err.message, '提示信息', function () {
    //         window.close();
    //     });
    // })
}

tydj.addJcswzl = function () {
    var newRow = {
        "swdjzjzl" : "",
        "swdjzjhm" : ""
    };
    tydj.jcswzlGrid.addRow(newRow, 0);
};

tydj.addJcqtswzl = function () {
    var newRow = {
        "swdjzjzl" : "",
        "swdjzjhm" : ""
    };
    tydj.jcqtswzlGrid.addRow(newRow, 0);
};

tydj.removeRow = function (grid_id) {

    var grid = mini.get(grid_id);
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        mini.confirm('确定删除选中的记录吗？','提示',function (action) {
            if(action==='ok'){
                grid.removeRows(rows, false); // false 不会自动选中下一条记录
                wssqUtil.isValid=true;
                wssqUtil.isSaved=true;
                wssqUtil.showTips('删除成功','表格数据删除成功','success',2000);
            }
        });
    } else {
        mini.alert("请选中一条记录");
    }
}

tydj.getG3RequestVO = function () {
    tydj.tydjVo = {
        bbh:'',
        djxh:'',
        lcslid:'',
        xmlbh:'',
        xmlmc:'',
        zgswskfjDm:nsrxxUtil.getNsrxxVO().zgswskfjDm,
        tydjsl:''
    };

    tydj.nsrxxFrom = {
        bgrq:tydj.tydjYlForm.getData(true).tybgrq,
        hztyqxq:tydj.tydjYlForm.getData(true).tyDateStart,
        hztyqxz:tydj.tydjYlForm.getData(true).tyDateEnd,
        nsrmc:$('.nsrmc')[0].innerText,
        nsrsbh:$('.nsrsbh')[0].innerText,
        slrDm:'',
        slrq:'',
        slswjgmc:''
    };

    var jcfpData = tydj.jcfpGrid.getData();
    tydj.jcfpqkGridlb = [];
    if(jcfpData && jcfpData.length > 0) {
        for(var i=0;i<jcfpData.length;i++){
            var fpjc = {
                jcfpqkuuid:'',
                fpzzhm:jcfpData[i].fpzzhm,
                djxh:'',
                jhfpzlDm:jcfpData[i].fpzlDm,
                fpsl:jcfpData[i].fs,
                fpDm:jcfpData[i].fpDm,
                fpqshm:jcfpData[i].fpqshm
            };
            tydj.jcfpqkGridlb.push(fpjc);
        }
    }
    tydj.jcfpqkGrid = {
        jcfpqkGridlb:tydj.jcfpqkGridlb
    };

    var jcswzlData = tydj.jcswzlGrid.getData();
    tydj.swzjzlGridlb = [];
    if(jcswzlData && jcswzlData.length > 0) {
        for(var i=0;i<jcswzlData.length;i++){
            var jcswzl = {
                swzjzlDm:jcswzlData[i].swdjzjzl,
                swzjhm:jcswzlData[i].swdjzjhm
            };
            tydj.swzjzlGridlb.push(jcswzl);
        }
    }
    tydj.swzjzlGrid = {
        swzjzlGridlb:tydj.swzjzlGridlb
    };

    var jcqtswzlData = tydj.jcqtswzlGrid.getData();
    tydj.qtswzlmcGridlb = [];
    if(jcqtswzlData && jcqtswzlData.length > 0){
        for(var i=0;i<jcqtswzlData.length;i++){
            var jcqtswzl = {
                jcqtswzlmc:jcqtswzlData[i].jcqtswzlmc,
                jcqtswzlsl:jcqtswzlData[i].jcqtswzlsl
            }
            tydj.qtswzlmcGridlb.push(jcqtswzl);
        }
    }
    tydj.qtswzlmcGrid = {
        qtswzlmcGridlb:tydj.qtswzlmcGridlb
    };

    tydj.tydjsl = {
        nsrxxFrom:tydj.nsrxxFrom,
        qtswzlmcGrid:tydj.qtswzlmcGrid,
        swzjzlGrid:tydj.swzjzlGrid,
        jcfpqkGrid:tydj.jcfpqkGrid
    };

    tydj.tydjVo.tydjsl = tydj.tydjsl;

    return tydj.tydjVo;
}

tydj.yltj = function () {
    var result = false;
    tydj.g3RequestData = mini.encode(tydj.getG3RequestVO());
    tydjService.tj(tydj.g3RequestData,function (data) {
        if (!data.success) {
            mini.alert(data.message);
        }else {
            result = true;
        }
    });

    return  result;
}

tydj.onvaluechangedHztyqxq = function () {
    var hztyqxq = mini.get("tyDateStart");
    if (hztyqxq.getValue() == "") {
        return;
    }
    var hztyqxz = mini.get("tyDateEnd");
    hztyqxz.setValue('');
    var hztyqxqStr = mini.formatDate(hztyqxq.getValue(), "yyyy-MM");
    var d = new Date();
    var dates2 = mini.addDate(d,1,'MO');
    var dStr = mini.formatDate(dates2, "yyyy-MM");
    if (dStr > hztyqxqStr) {
        hztyqxq.setValue(dStr);
        mini.alert("停业期限起需大于当前月");
        return;
    }
    hztyqxz.setValue('');
}

tydj.onvaluechangedHztyqxz = function () {
    var hztyqxq = mini.get("tyDateStart");
    var hztyqxz = mini.get("tyDateEnd");
    if (hztyqxz == "") {
        return;
    }
    var hztyqxqStr = mini.formatDate(hztyqxq.value, "yyyy-MM");
    var hztyqxzStr = mini.formatDate(hztyqxz.value, "yyyy-MM");
    if ("" !=hztyqxzStr && hztyqxqStr > hztyqxzStr) {
        hztyqxz.setValue("");
        mini.alert("停业月份止必须大于等于停业月份起");
        return;
    }
    //var dY = mini.addDate(hztyqxq.value, 1, 'Y');
    var dY = mini.addDate(hztyqxq.value, 5, 'MO');
    var dYStr = mini.formatDate(dY, "yyyy-MM");
    if (dYStr < hztyqxzStr) {
        hztyqxz.setValue("");
        //mini.alert("停业期限起为" + mini.formatDate(hztyqxq.value, "yyyy-MM-dd ")
        //		+ ",停业期限不能大于一年！");
        mini.alert("停业时间不得超过6个月，如有特殊需要，您可以联系税务机关办理延期申请。");
        return;
    }
}

/**
 * 停业登记起、停业登记止让用户只能选择年月，日期自动计算。起使用月初第一天，止使用月末最后一天。起从次月开始让用户选择。
 * 在这里转换，加上日期
 */
tydj.setDateK = function (jbxxData){
    //1.1起时间转换
    var hztyqxq = jbxxData.tyDateStart;
    var hztyqxqData = mini.parseDate(hztyqxq);
    hztyqxq = mini.formatDate(hztyqxqData,'yyyy-MM-dd');
    //1.2止时间转换
    var hztyqxz = jbxxData.tyDateEnd;
    var hztyqxzData = mini.parseDate(hztyqxz);
    hztyqxzData = mini.addDate(hztyqxzData,1,'MO');
    hztyqxzData = mini.addDate(hztyqxzData,-1,'D');
    hztyqxz = mini.formatDate(hztyqxzData,'yyyy-MM-dd');
    //2设置值
    jbxxData.tyDateStart = hztyqxq;
    jbxxData.tyDateEnd = hztyqxz;
    return jbxxData;

}

/**
 * 停业登记起、停业登记止与执行期起止进行比较，查看是否在执行期内。
 */
tydj.checkZxqqz = function (jbxxData) {
	var hztyqxq = jbxxData.tyDateStart;
    var hztyqxqData = mini.parseDate(hztyqxq);
    hztyqxq = mini.formatDate(hztyqxqData,'yyyy-MM-dd');

    var hztyqxz = jbxxData.tyDateEnd;
    var hztyqxzData = mini.parseDate(hztyqxz);
    hztyqxz = mini.formatDate(hztyqxzData,'yyyy-MM-dd');
    
    var hdzxqqDate = mini.formatDate(mini.parseDate(tydj.hdzxqq),'yyyy-MM-dd');
    var sjzxqzDate = mini.formatDate(mini.parseDate(tydj.sjzxqz),'yyyy-MM-dd');
    
    if(hztyqxq < hdzxqqDate || hztyqxz > sjzxqzDate) {
        mini.alert("您的定期定额执行期为"+hdzxqqDate+"至"+sjzxqzDate+"，所选停业期不在定期定额执行期内，不能申请停业");
        return false;
    }
    return true;
}





tydj.init = function () {
    var dates= new Date();
    //停业期起
    var hztyqxq = mini.get("tyDateStart");
    var relDate = mini.formatDate(dates, "yyyy/M/d");
    var firDate = dates.getFirstDateOfMonth("yyyy/M/d");
    if(relDate==firDate){
        var tyrq = mini.formatDate(dates, "yyyy-MM");
        hztyqxq.setValue(tyrq);
    }else{
        var tyrq = dates.getFirstDateOfNextMonth('yyyy-MM');
        hztyqxq.setValue(tyrq);
    }
    //报告日期
    var dateStr = mini.formatDate(dates,"yyyy-MM-dd");
    var bgrq = mini.get("tybgrq");
    bgrq.setValue(dateStr);
}

tydj.onvaluechangedHztyqxq = function () {
    var hztyqxq = mini.get("tyDateStart");
    if (hztyqxq.getValue() == "") {
        return;
    }
    var tyrq = null;
    var hztyqxz = mini.get("tyDateEnd");
    hztyqxz.setValue('');
    var hztyqxqStr = mini.formatDate(hztyqxq.getValue(), "yyyy-MM");
    var dates = new Date();
    var relDate = mini.formatDate(dates, "yyyy/M/d");
    var firDate = dates.getFirstDateOfMonth("yyyy/M/d");
    if(relDate==firDate){
        tyrq = mini.formatDate(dates, "yyyy-MM");
    }else{
        tyrq = dates.getFirstDateOfNextMonth('yyyy-MM');
    }
    if (tyrq > hztyqxqStr) {
        hztyqxq.setValue(tyrq);
        mini.alert("停业期限起需大于当前月");
        return;
    }
    hztyqxz.setValue('');
}

tydj.onvaluechangedHztyqxz = function () {
    var hztyqxq = mini.get("tyDateStart");
    var hztyqxz = mini.get("tyDateEnd");
    if (hztyqxz.value == "") {
        return;
    }
    var date = new Date(hztyqxq.value);
    var hztyqxqStr = date.getFirstDateOfMonth('yyyy/M/d');
    var date = new Date(hztyqxz.value);
    var hztyqxzStr = date.getLastDateOfMonth('yyyy/M/d');

    if ("" !=hztyqxzStr && hztyqxq.value > hztyqxz.value) {
        hztyqxz.setValue("");
        mini.alert("停业月份止必须大于等于停业月份起");
        return;
    }
    if(isExist(hztyqxqStr)&&isExist(hztyqxzStr)){
        hztyqxz.setValue("");
        mini.alert("该时间段已做过停业登记，请勿重复申请。");
        return;
    };

    if(checkTydjrq(hztyqxqStr, hztyqxzStr)){
        hztyqxz.setValue("");
        mini.alert("连续停业时间不能超过6个月");
        return;
    }
}

function checkTydjrq(hztyqxq, hztyqxz) {
    var flag = false;
    $.ajax({
        type : "POST",
        url : "../../../api/dj/tydj/get/checktyrq?hztyqxq="+hztyqxq+"&hztyqxz="+hztyqxz,
        async : false,
        success : function(data) {
            if (data.success&&data.value==true) {
                flag = true;
            }
        },
        error : function(e) {
            console.error(e);
        }
    });
    return flag;
}
function isExist(qxrq) {
    var flagExit = false;
    $.ajax({
        type : "POST",
        url : "../../../api/dj/tydj/get/exist?qxrq="+qxrq,
        async : false,
        success : function(data) {
            if (data.success&&data.value==true) {
                flagExit = true;
            }
        },
        error : function(e) {
            console.error(e);
        }
    });
    return flagExit;
}