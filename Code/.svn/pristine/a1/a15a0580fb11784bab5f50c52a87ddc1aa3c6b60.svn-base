/**
 * Created by yuepu on 2017/1/21.
 */

var fydj = {};
var currenDate;

stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var fydjObj = {};

stepNav.run=function () {
    stepNav.initSteps([
        {id:0,title:'填写申请表',url:'TxsqView.aspx'},
        {id:1,title:'预览提交',url:'YlView.aspx',yltj:true},
        {id:2,title:'完成',url: '../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();
    /*获取纳税人的基本信息*/
    var nsrjbxx = wssqUtil.nsrjbxx;
    $('#nsrsbh').text(nsrjbxx.nsrsbh);
    $('#nsrmc').text(nsrjbxx.nsrmc);
    /* 报告日期默认为当前日*/
     currenDate = new Date();
    var bgrqControl = mini.get("bgrq");//获取报告日期控件
    bgrqControl.setValue(currenDate.format("yyyy-MM-dd"));
    bgrqControl.disable();

    /*第一步*/
    fydj.lhswzlqkGrid = mini.get("lhswzlqk");
    fydj.qtzlGrid = mini.get("qtzl");
    fydj.lhfpGrid = mini.get("lhfp");
    fydj.tyrqStart = mini.get("tyrqStart");
    fydj.tyrqEnd = mini.get('tyrqEnd');
    fydj.tfyuuid = "";
    function closeWindow(){// 点击确认后关闭
//        wssqUtil.closeWinOwnerWindow("ok");
    	 wssqUtil.closeWin();
    }
    $.ajax({
	    url: "/wszx-web/api/dj/fydj/get/tyxx.ashx",
	    type: "POST",
	    async: false,
	    success: function(data) {
	      var resultData = mini.decode(data);
	      	if(resultData.success){
	      		fydj.tyrqStart.setValue(resultData.value.hztyqxq.format("yyyy-MM-dd"));
	            fydj.tyrqEnd.setValue(resultData.value.hztyqxz.format("yyyy-MM-dd"));
	            fydj.tyrqStart.disable();
	            fydj.tyrqEnd.disable();
	            fydj.lhswzlqkGrid.setData(resultData.value.djnsrzjjcxx);
	            fydj.qtzlGrid.setData(resultData.value.djtysqxxJcqtswzlqk);
	            fydj.lhfpGrid.setData(resultData.value.djtysqxxJcfpqk);
	            fydj.tfyuuid = resultData.value.tfyuuid;
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
    if(currentIndex==0){
        /*复业日期：必需在停业期限起止之内， 同时不能小于当日*/
        var fydjContrl = mini.get("fydj");//获取复业登记控件
        var tyrqStartControl = mini.get("tyrqStart");//获取停业期限起控件
        var tyrqEndControl = mini.get("tyrqEnd");//获取停业期限止控件
        var fydjValue =fydjContrl.getValue();


        if((fydjValue>=tyrqStartControl.getValue() && fydjValue <=tyrqEndControl.getValue()) && fydjValue.format("yyyy-MM-dd") >= currenDate.format("yyyy-MM-dd")){

        }else{
            mini.alert("复业日期必须大于等于当前日期，且必须在停业起止期限范围内");
            return;
        }
        if(tyrqStartControl.getValue() > tyrqEndControl.getValue()){
            mini.alert("停业期限止应大于停业期限起");
            return;
        }
        /*预览页面赋值*/
        var yllhswzlqk = mini.get('yllhswzlqk');
        var ylqtzl = mini.get('ylqtzl');
        var yllhfp = mini.get('yllhfp');
        yllhswzlqk.setData(fydj.lhswzlqkGrid.getData());
        ylqtzl.setData(fydj.qtzlGrid.getData());
        yllhfp.setData(fydj.lhfpGrid.getData());
//        $('#ylnsrsbh').text($('#nsrsbh').text());
//        $('#ylnsrmc').text($('#nsrmc').text());
//        $('#ylbgrq').text(mini.get('bgrq').getValue().format("yyyy-MM-dd"));
//        $('#ylfydjrq').text(fydjContrl.getValue().format("yyyy-MM-dd"));
//        $('#yltyqxq').text(tyrqStartControl.getValue().format("yyyy-MM-dd"));
//        $('#yltyqxz').text(tyrqEndControl.getValue().format("yyyy-MM-dd"));
        mini.get('ylnsrsbh').setValue($('#nsrsbh').text());
        mini.get('ylnsrmc').setValue($('#nsrmc').text());
        mini.get('ylbgrq').setValue(mini.get('bgrq').getValue().format("yyyy-MM-dd"));
        mini.get('ylfydjrq').setValue(fydjContrl.getValue().format("yyyy-MM-dd"));
        mini.get('yltyqxq').setValue(tyrqStartControl.getValue().format("yyyy-MM-dd"));
        mini.get('yltyqxz').setValue(tyrqEndControl.getValue().format("yyyy-MM-dd"));
    }
    if(currentIndex==1){
    	fydjObj.successFlag = false;
    	var fysqxx = {
        		bgrq : mini.get('bgrq').getValue().format("yyyy-MM-dd"),
        		fyrq : mini.get('fydj').getValue().format("yyyy-MM-dd"),
        		slrq : mini.get('bgrq').getValue().format("yyyy-MM-dd"),
        		tfyuuid : fydj.tfyuuid
        	}
        	var requestData = {
        		      "fytqfysqb": fysqxx,
        		    };
        	fydjService.tj(mini.encode(requestData),function(data){
        		var resultData = mini.decode(data);
                if (!resultData.success) {
                    mini.alert("提交失败");
                } else {
                	fydjObj.successFlag = true;
                }
        	});
        	
        	if (!fydjObj.successFlag){
                return false;
            }
    }
    if(currentIndex==2 && newIndex ==3){
    	
    }
    return true;
};
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','../../../apps/views/home/home.html');
};

stepNav.onStepDataSaved=function (event, currentIndex, newIndex) {
    if(currentIndex==0){

    }
    if(currentIndex==1){

    }
    if(currentIndex==2){

    }
};
