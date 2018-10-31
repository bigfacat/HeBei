var grid,ylgrid,fbzlGrid,ylfbzlgrid,currentSqxh;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var fpds = {};
fpds.ghfnsrsbh="";
fpds.ghfdjxh="";
stepNav.run=function () {
    //步骤
    stepNav.initSteps([
        {id:0,title:'填写申请信息表',url:'fpdsView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'fpdsylView.aspx',yltj:true},
        {id:3,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();
    grid = mini.get("fpds_grid");
    fbzlGrid = mini.get('fbzl-grid');
    ylfbzlgrid = mini.get("fbzl-yl-grid");
    ylgrid = mini.get("fpds1_grid");
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.checkGhfxxWin = mini.get("checkGhfxx");// 弹框 根据购货方纳税人识别号查询购货方信息
    fpds.checkGhfxxGrid = mini.get("ghfxx-grid");//弹框内的表格
    /*根据购货方纳税人识别号  确认选择*/
    $("#fpds-ok").click(function(){
    	console.log("ok");
        var ghfxxSelected = fpds.checkGhfxxGrid.getSelected();
        if(ghfxxSelected){
        	mini.get("ghfmc").setValue(ghfxxSelected.nsrmc);
    		fpds.ghfdjxh=ghfxxSelected.djxh;
        }else{
            mini.alert("请选择一条购货方信息");
        }

        fpds.checkGhfxxWin.hide();
    });

    /*根据购货方纳税人识别号  取消*/
    $("#fpds-cancle").click(function(){
         fpds.checkGhfxxWin.hide();
    });

   fpds.onInit();
   checkUser();
};


stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    var swsxMxDmList = [];
    var fpxxForm = new mini.Form("#fpxx");
    var fpxxData=fpxxForm.getData(true);
	var bsxxForm =new mini.Form("#bsxx");
	var bsxxData=bsxxForm.getData(true);
    //已经录入了发票等信息,将转到附报资料
	if(currentIndex==0){
		if(checkFpzmsqxxOnNavigate()==false){
			return false;
		}
    	var fphlData=grid.getData();
    	if(checkFpzmsq(fpxxData,bsxxData,fphlData)==true){
    		 //获取附报资料列表
            var datas = {
                'swsxDm': wssqUtil.currentSwsxDm,
                'swsxMxDmList':swsxMxDmList
            };
            fbzlAjax(datas,'requestFbzllist');
    	    return true;
    	}else{
    		return false;
    	}
    }
	//已上传了附报资料，将转到提交页面
	else if(currentIndex==1){
		  //判断是否按要求上传附报资料
        if(!isCondition()){
            return false;
        }
        ylfbzlgrid.setData(fbzldata);
        return true;
	}
    //提交
    else if(currentIndex==2){
    	var fphlData=grid.getData();
    	return submitFpzmsq(fpxxData,bsxxData,fphlData);
    }

    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
    	var  fpxxForm  = new mini.Form( "#fpxx");
    	var ylfpxxForm=new mini.Form("#yl-fpxx");
    	var bsxxForm=new mini.Form("#bsxx");
    	var ylbsxxForm=new mini.Form("#yl-bsxx");
    	ylfpxxForm.setData(fpxxForm.getData(true));
    	ylbsxxForm.setData(bsxxForm.getData(true));
        ylgrid.setData( grid.getData());
    }
};
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','/web-front/bszm-front/apps/views/home/home.html');
};

fpds.onInit=function(){
	mini.get("nsrsbh").setValue(wssqUtil.nsrjbxx.nsrsbh);
    mini.get("nsrmc").setValue(wssqUtil.nsrjbxx.nsrmc);
}

function checkUser(){
	var isValid=true;
	var message="";
	 $.ajax({
			url: "../../../api/fp/fpzm/get/canDoFpzm.ashx",
	        async: false,
	        type:"POST",
	        success: function (data) {
	        	if(data.success==false){
	        		isValid=false;
	        		if(data.message==null){
	        			message="当前登录者不是一般纳税人或者没有领用过增值税专用发票，不能进行证明办理";
	        		}else{
	        			message=data.message;
	        		}
	        		isValid=false;
	        	}else{
	        		isValid=true;
	        	}
	        },
	        error: function (e) {
	        	message="系统异常，请稍后再办理证明";
	            isValid=false;
	        }
	    });

	 if(!isValid){
			mini.alert(message,"提示",function(){
				window.close();
			});
	}
}

//校验发票证明申请信息 formData:表单数据 fphlData:发票货劳数据
function checkFpzmsq(fpxxData,bsxxData,fphlData){
	var formData=buildFpzmsqData(fpxxData,bsxxData,fphlData);
	var checkResult=true;
	 $.ajax({
			url: "../../../api/fp/fpzm/get/checkFpzm",
	        async: false,
	        dataType:"json",
	        type:"POST",
	        data:formData,
	        success: function (data) {
	        	if(data.success==false){
	        		if(data.message==null){
	        			mini.alert("在申报期内未申报或发票号码金额和税额不正确");
	        		}else{
	        			mini.alert(data.message);
	        		}
	        		checkResult=false;
	        	}else{
	        		checkResult=true;
	        	}
	        },
	        error: function (e) {
	            mini.alert("专用发票证明申请验证失败");
	            checkResult=false;
	        }
	    });
	 return checkResult;
}

//提交发票证明申请信息
function submitFpzmsq(fpxxData,bsxxData,fphlData){
	 var formData=buildFpzmsqData(fpxxData,bsxxData,fphlData);
	 var submitResult=true;

	 wssqUtil.tjsq("../../../api/fp/fpzm/submit/sqzzszyfpzm", formData, function (data) {
         var resultData = mini.decode(data);
         if (!resultData.success) {
             mini.alert("专用发票证明提交失败");
             submitResult=false;
         } else {
            currentSqxh = resultData.value.sqxh;
        	 submitResult= true;
         }
     });

	 return submitResult;
}

//检查发票证明申请信息（主要是页面上的数据）
function checkFpzmsqxxOnNavigate(){
	var fpdsForm = new mini.Form("#fpds");
	/*var fpxxForm = new mini.Form("#fpxx");
	var bsxxForm = new mini.Form("#bsxx");
	fpxxForm.validate();
	bsxxForm.validate();
	if(!(fpxxForm.isValid()  &&  bsxxForm.isValid())){
		 return false;
	}*/
	fpdsForm.validate();
	if(!fpdsForm.isValid()){
		return false;
	}

	var fphlData=grid.getData();
	var isValid=true;
	var mcValid=true;
	var jeValid=true;
	var seValid=true;
	var emptyCount=0;
	for(var i=0;i<fphlData.length;i++){
		if(!isValidData(fphlData[i].hwlwmc) && !isValidData(fphlData[i].dj) &&
				!isValidData(fphlData[i].sl) && !isValidData(fphlData[i].je) &&
				!isValidData(fphlData[i].se)){
			emptyCount=emptyCount+1;
			continue;
		}
		mcValid=isValidData(fphlData[i].hwlwmc);
		jeValid=isValidData(fphlData[i].je);
		seValid=isValidData(fphlData[i].se);
		//名称金额和税额不能为空
		if(!(mcValid && jeValid &&	seValid)){
			isValid=false;
			break;
		}
	}

	if(!mcValid){
		mini.alert("货劳名称不能为空，请输入货劳名称");
	}

	if(!jeValid){
		mini.alert("金额不能为空，请输入金额");
	}

	if(!seValid){
		mini.alert("税额不能为空，请输入税额");
	}

	if(emptyCount==4){
		mini.alert("货劳明细不能为空，请输入货劳明细信息");
		isValid=false;
	}
	return isValid;
}

function isValidData(data){
	if(data==null || data=="" || data=="undefined"){
	     return false;
	}else{
		return true;
	}
}

//构造需要提交的json数据
function buildFpzmsqData(fpxxData,bsxxData,fphlData){
	var hlmx=[];
	for(var i=0;i<fphlData.length;i++){
		if(!isValidData(fphlData[i].je) || !isValidData(fphlData[i].se)){
			delete fphlData[i];
		}else{
			var obj={};
			obj.hwlwmc=isValidData(fphlData[i].hwlwmc) ? fphlData[i].hwlwmc:"";
			obj.dj=isValidData(fphlData[i].dj) ? fphlData[i].dj:"";
			obj.sl=isValidData(fphlData[i].sl) ? fphlData[i].sl:"";
			obj.je=isValidData(fphlData[i].je) ? fphlData[i].je:"";
			obj.se=isValidData(fphlData[i].se) ? fphlData[i].se:"";
			hlmx.push(obj);
		}
	}

    var fpxx={
	    	"xhfdjxh":wssqUtil.nsrjbxx.djxh,
	    	"xhfnsrsbh":fpxxData.nsrsbh,
	    	"xhfnsrmc":fpxxData.nsrmc,
	    	"ghfdjxh":fpds.ghfdjxh,
	    	"ghfnsrsbh":fpxxData.ghfnsrsbh,
	    	"ghfnsrmc":fpxxData.ghfmc,
	    	"fpdm":fpxxData.fpdm,
	    	"fphm":fpxxData.fphm
		}

    var bsxx={
    	"bsrq":bsxxData.byrq,
    	"nssbrq":bsxxData.nssbrq,
    	"skssqq":bsxxData.skssqq,
    	"skssqz":bsxxData.skssqz
    }

    var zmsqData={
    		"djxh": wssqUtil.nsrjbxx.djxh, //取纳税人缓存djxh
            "lcslid": "",
    		"fpxx":fpxx,
    		"hlxx":hlmx,
    		"bsxx":bsxx
    }
   return mini.encode(zmsqData);
}


/**
 * 增加行
 * @param datagridName
 * @param beginEditCellName
 */
fpds.addRow = function (datagridName,beginEditCellName) {
    var grid = mini.get(datagridName);
    var newRow = {};
    grid.addRow(newRow,  grid.getData().length);
    grid.beginEditCell(newRow, beginEditCellName);
}

fpds.onFpdjChange=function(e){
	var fpdj=e.value;
	if(!isValidData(fpdj)){
		return;
	}

	if(!isNumber(fpdj)){
		mini.alert("请输入数字");
		mini.get("fpdj").setValue("");
	}
}

fpds.onFpslChange=function(e){
	var fpsl=e.value;
	if(!isValidData(fpsl)){
		return;
	}

	if(!isNumber(fpsl)){
		mini.alert("请输入数字");
		mini.get("fpsl").setValue("");
	}
}

fpds.onGhfnsrsbhBlur=function(e){
	var txtGhfmc=mini.get("ghfmc");
	txtGhfmc.setValue("");
	var ghfnsrsbh=e.source.value;
	if(ghfnsrsbh==null || ghfnsrsbh==""){
		return;
	}
	var xhfnsrsbh=mini.get("nsrsbh").getValue();
	if(xhfnsrsbh==ghfnsrsbh){
		mini.alert("销货方纳税人识别号不能与购货方纳税人识别号相同，请重新输入");
		mini.get("nsrsbh").focus();
		return;
	}

	if(fpds.ghfnsrsbh==ghfnsrsbh){
		return;
	}
	fpds.ghfnsrsbh=ghfnsrsbh;
	$.ajax({
		url: "../../../api/fp/fpzm/get/nsrxx",
        async: false,
        contentType:"application/x-www-form-urlencoded",
        type:"POST",
        data: {
        	nsrsbh: ghfnsrsbh
        },
        success: function (data) {
        	if(data.success==true && data.value!=null){
        		if(data.value.length>1){
        			  fpds.checkGhfxxWin.show();
                      fpds.checkGhfxxGrid.setData(data.value);
        		}else if(data.value.length==1){
        			txtGhfmc.setValue(data.value[0].nsrmc);
            		fpds.ghfdjxh=data.value[0].djxh;
        		}
        	}
        },
        error: function (e) {
        }
    });
}

function onGhfNsrsbhChange(e){
	var txtGhfmc=mini.get("ghfmc");
	txtGhfmc.setValue("");
	var ghfnsrsbh=mini.get("ghfnsrsbh").getValue();
	if(ghfnsrsbh==null || ghfnsrsbh==""){
		return;
	}
	var xhfnsrsbh=mini.get("nsrsbh").getValue();
	if(xhfnsrsbh==ghfnsrsbh){
		mini.alert("销货方纳税人识别号不能与购货方纳税人识别号相同，请重新输入");
		mini.get("nsrsbh").focus();
		return;
	}

	if(fpds.ghfnsrsbh==ghfnsrsbh){
		return;
	}
	fpds.ghfnsrsbh=ghfnsrsbh;
	$.ajax({
		url: "../../../api/fp/fpzm/get/nsrxx",
        async: false,
        contentType:"application/x-www-form-urlencoded",
        type:"POST",
        data: {
        	nsrsbh: ghfnsrsbh
        },
        success: function (data) {
        	if(data.success==true && data.value!=null){
        		txtGhfmc.setValue(data.value.nsrmc);
        		fpds.ghfdjxh=data.value.djxh;
        	}
        },
        error: function (e) {
        }
    });
}

fpds.onNssbrqChange=function(e){
	if(e.value=="" || e.value==null || e.value==undefined){
	       return;
	}

	var nssbrq=mini.encode(e.value);
	if(nssbrq.length<11){
		return;
	}
	nssbrq=nssbrq.substring(1,11);

	$.ajax({
		url: "../../../api/fp/fpzm/get/skssq",
        async: false,
        contentType:"application/x-www-form-urlencoded",
        type:"POST",
        data: {
        	nssbq: nssbrq
        },
        success: function (data) {
        	if(data.success==true && data.value!=null){
        		mini.get("skssqq").setValue(data.value.skssqq);
        		mini.get("skssqz").setValue(data.value.skssqz);
        	}
        },
        error: function (e) {
        }
    });

}

fpds.onskssqz = function(e){
    var Yxqq=mini.get("skssqq").getValue();
    if(Yxqq=="" || Yxqq==null || Yxqq==undefined){
        return;
    }

    if(Yxqq> e.value){
        mini.alert("税款所属期止不能小于税款所属期起，请重新选择税款所属期止！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}
fpds.onskssqq = function(e){
    var Yxqz=mini.get("skssqz").getValue();
    if(Yxqz == ""||Yxqz == null||Yxqz == undefined){
        return;
    }

    if(Yxqz< e.value){
        mini.alert("税款所属期起不能大于税款所属期止，请重新填写税款所属期起！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}

function isNumber(data){
	var validator = new Validator();
	if(!validator.isDecimal(data)){
		return false;
	}else{
		return true;
	}
}

function onFpdsCommitEdit(e){
	var field = e.field;
	var je=0;
	if(field =='dj'){
		if(isValidData(e.record.sl)){
			if(!isNumber(e.value)){
				return;
			}

			je=e.value*e.record.sl;
			e.record.je=je+"";
			//e.record.se=je*0.03+"";
		}
	}else	if(field=='sl'){
		if(isValidData(e.record.dj)){
			if(!isNumber(e.value)){
				return;
			}

			je=e.record.dj*e.value;
			e.record.je=je+"";
			//e.record.se=je*0.03+"";
		}
	}else if(field=='je')	{
		if(isValidData(e.value)){
			if(!isNumber(e.value)){
				return;
			}
			//e.record.se=e.value*0.03+"";
		}
	}
}
var nsqxDm;
var skssqq;
var skssqz;
stepNav.run=function () {
    //步骤
    stepNav.initSteps([
        {id:0,title:'填写申请信息表',url:'fpdsView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'fpdsylView.aspx',yltj:true},
        {id:3,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();
    grid = mini.get("fpds_grid");
    fbzlGrid = mini.get('fbzl-grid');
    ylfbzlgrid = mini.get("fbzl-yl-grid");
    ylgrid = mini.get("fpds1_grid");
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.addRow('fpds_grid');
    fpds.checkGhfxxWin = mini.get("checkGhfxx");// 弹框 根据购货方纳税人识别号查询购货方信息
    fpds.checkGhfxxGrid = mini.get("ghfxx-grid");//弹框内的表格
    /*根据购货方纳税人识别号  确认选择*/
    $("#fpds-ok").click(function(){
    	console.log("ok");
        var ghfxxSelected = fpds.checkGhfxxGrid.getSelected();
        if(ghfxxSelected){
        	mini.get("ghfmc").setValue(ghfxxSelected.nsrmc);
    		fpds.ghfdjxh=ghfxxSelected.djxh;
        }else{
            mini.alert("请选择一条购货方信息");
        }

        fpds.checkGhfxxWin.hide();
    });

    /*根据购货方纳税人识别号  取消*/
    $("#fpds-cancle").click(function(){
         fpds.checkGhfxxWin.hide();
    });

    $.ajax({
		url: "../../../api/fp/fpdszm/get/nsqx.ashx",
        async: false,
        contentType:"application/x-www-form-urlencoded",
        type:"POST",
        data: {},
        success: function (data) {
        	if(data.success==true && data.value!=null){
        		nsqxDm = data.value;
        	} else {
        		mini.alert(data.message)
        	}
        },
        error: function (e) {
        	mini.alert(e.message,'提示',function(){
                window.close();
            });
        }
    });
    
   fpds.onInit();
   checkUser();
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    var swsxMxDmList = [];
    var fpxxForm = new mini.Form("#fpxx");
    var fpxxData=fpxxForm.getData(true);
	var bsxxForm =new mini.Form("#bsxx");
	var bsxxData = {
			'byrq':bsxxForm.getData(true).byrq,
			'nssbrq':bsxxForm.getData(true).nssbrq,
			'skssqq':skssqq,
			'skssqz':skssqz
	}
    //已经录入了发票等信息,将转到附报资料
	if(currentIndex==0){
		if(checkFpzmsqxxOnNavigate()==false){
			return false;
		}
    	var fphlData=grid.getData();
    	if(checkFpzmsq(fpxxData,bsxxData,fphlData)==true){
    		 //获取附报资料列表
            var datas = {
                'swsxDm': wssqUtil.currentSwsxDm,
                'swsxMxDmList':swsxMxDmList
            };
            fbzlAjax(datas,'requestFbzllist');
    	    return true;
    	}else{
    		return false;
    	}
    }
	//已上传了附报资料，将转到提交页面
	else if(currentIndex==1){
		  //判断是否按要求上传附报资料
        if(!isCondition()){
            return false;
        }
        ylfbzlgrid.setData(fbzldata);
        return true;
	}
    //提交
    else if(currentIndex==2){
    	var fphlData=grid.getData();
    	return submitFpzmsq(fpxxData,bsxxData,fphlData);
    }

    return true;
};

fpds.onskssqq = function(e){
	if(typeof e.value !=='object'){
		return;
	}
	var Yxqq=mini.encode(e.value).substring(1,8);
	skssqq = Yxqq+"-01";
	if (nsqxDm == "08") {
		if("01,04,07,10".indexOf(Yxqq.substring(5)) == -1) {
			mini.alert("您是季报用户，所属期起只能选择1,4,7,10这四个月份。")
			return ;
		}
	}
	$.ajax({
		url: "../../../api/fp/fpdszm/get/nssbrq/"+Yxqq+".ashx",
        async: false,
        contentType:"application/x-www-form-urlencoded",
        type:"POST",
        success: function (data) {
        	if(data.success==true && data.value!=null){
        		mini.get("skssqz").setValue(data.value.skssqz);
        		mini.get("nssbrq").setValue(data.value.nssbrq);
        		skssqz = data.value.skssqz.substring(0,10);
        	} else {
        		mini.get("skssqz").setValue("");
        		mini.get("nssbrq").setValue("");
        		mini.alert(data.message)
        	}
        },
        error: function (e) {
        	mini.alert(e.message,'提示',function(){
                window.close();
            });
        }
    });
}