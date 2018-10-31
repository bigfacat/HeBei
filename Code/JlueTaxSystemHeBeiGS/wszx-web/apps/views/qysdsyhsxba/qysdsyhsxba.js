var grid,grid1,fbzlGrid,fbzlylGrid,fzjgData,rdyxqq,fzjgGrid;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var qysdsyhsxba = {};
var fzjgba = {};
var flagBoolean=false;
stepNav.run=function () {
    //步骤
    var flag = true;
    if (flag) {
        stepNav.initSteps([
            {id:0,title:'选择优惠事项',url:'qysdsyhsxbaView.aspx'},
            {id:1,title:'填写优惠事项备案表',url:'yhsxbaView.aspx'},
            {id:2,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
            {id:3,title:'预览提交',url:'qysdsyhsxbaylView.aspx',yltj:true},
            {id:4,title:'审核中',url:'../public1/shz/shz.aspx',js:true},
			{id:5,title:'完成',url:'../public1/wc/wc.aspx',js:true}
        ]);

    } else {
        wssqUtil.initPrePage("由于您是新开企业，需要先完成", "税务登记信息补录",
            "../../../apps/views/swdjxxbl/swdjxxbl.html");
    }

    mini.parse();
    grid = mini.get("qysdsyhsxba_grid");
    grid1 = mini.get("ybayhsxqdb_grid");
	fzjgGrid = mini.get("fzjg_grid");
    fbzlGrid = mini.get('fbzl-grid');
    fbzlylGrid = mini.get('fbzl-yl-grid');
    //执行demo test
	validateSdsRd()
    qysdsyhsxba.initTxsq();
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
	if(currentIndex==0){
		if(mini.get("band").getValue()<rdyxqq){
			mini.alert("您不存在所得税费种类认定");
			return;
		}
		var obj = mini.get("yhsxInit");
		var value = obj.getValue();
	     if(value.length == 0){
	         mini.alert("请先选中备案事项，再进行下一步操作！","提示");
	         return false;
	     }
	    qysdsyhsxba.initYhsxbaSqb();
    }
	if(currentIndex==1){
		var form1=new mini.Form('#dataGrid');
        if(!form1.validate()){
            return;
        }		
	    var swsxMxDmList = getYwsxList(); 
	         //获取附报资料列表
	        var datas = {
	            'swsxDm': wssqUtil.currentSwsxDm,
	            'swsxMxDmList':swsxMxDmList
	        };
	        fbzlAjax(datas,'requestFbzllist');
    }
	if(currentIndex==2){
		//判断是否按要求上传附报资料
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);
	}
	if(currentIndex==3){
		qysdsyhsxba.tjsqxx();
		return flagBoolean;
	}	
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==3){
		var wcjyzmTxForm = new mini.Form("#step_tx_form");
		var wcjyzmYlForm = new mini.Form("#step_yl_form");
		wcjyzmYlForm.setData(wcjyzmTxForm.getDataAndText(true));

        var formdata = qysdsyhsxba.getTxSqbData();
        var info =  mini.decode(formdata);
        $("#band_yl").html(info.band);
        $('#nsrsbh_yl').html(info.nsrsbh);
        $("#nsrmc_yl").html(info.nsrmc);
        $("#jbr_yl").html(info.jbr);
        $("#lxdh_yl").html(info.lxdh);
        $("#yhsxmc_yl").html(info.yhsxmc);
        if (info.balb == 1){
            $("#zcba_yl").html("√");
            $("#bgba_yl").html("");
        }else {
            $("#zcba_yl").html("");
            $("#bgba_yl").html("√");
        }
        var yhyxqq = mini.formatDate(mini.parseDate(info.yhyxqq), "yyyy年MM月dd日");
        $("#yhyxqq_yl").html(yhyxqq);
        var yhyxqz = mini.formatDate(mini.parseDate(info.yhyxqz), "yyyy年MM月dd日");
        $("#yhyxqz_yl").html(yhyxqz);
        $("#zcyj_yl").html(info.zcyj);
        $("#xgzg_yl").html(info.xgzg);
        var wjyxqq = mini.formatDate(mini.parseDate(info.wjyxqq), "yyyy年MM月dd日");
        $("#wjyxqq_yl").html(wjyxqq);
        var wjyxqz = mini.formatDate(mini.parseDate(info.wjyxqz), "yyyy年MM月dd日");
        $("#wjyxqz_yl").html(wjyxqz);
        $("#ygqksm_yl").html(info.ygqksm);
        $("#qylczlqd_yl").html(info.qylczlqd);
        $("#cwfzr_yl").html(info.cwfzr);
        $("#fddbr_yl").html(info.fddbr);
        $("#sbrq_yl").html(info.sbrq);
        $("#swjghz_yl").html(info.swjghz);
        
        if (info.bz == "1"){   		
    		if (fzjgData != null){
    			var fzjgbGrid_yl=mini.get("fzjgbGrid_yl");
    			fzjgbGrid_yl.setData(fzjgData);
    		}	
    	}
    }
};
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','/web-front/bszm-front/apps/views/home/home.html');
};
qysdsyhsxba.getTxData = function () {
	var obj = mini.get("yhsxInit");
	var list = obj.getSelecteds();	
	var value = obj.getValue();
	var content = "";
	var text = "";
	for (var i = 0; i < list.length; i++){
		text =  text + (i + 1) + "." + list[i].MC + "    ";
		content = content + list[i].YJ;
	}
	var yhsx = new Object;
	yhsx.sysDate = mini.get("sysDate").getValue();
	yhsx.content = content;
	yhsx.bz = mini.get("kdqhzbz").getValue();
	yhsx.value = value;
	yhsx.text = text;
	yhsx.band = mini.get("band").getValue();
	yhsx.nsrsbh = wssqUtil.nsrjbxx.nsrsbh;
	yhsx.nsrmc = wssqUtil.nsrjbxx.nsrmc;
	yhsx.djxh = wssqUtil.nsrjbxx.djxh;
	yhsx.swjgdm=wssqUtil.nsrjbxx.swjgDm;
    return yhsx;
};
qysdsyhsxba.initTxsq = function(){
	var form =new mini.Form("#nsrjbxx");
	form.setData({
		djxh: wssqUtil.nsrjbxx.djxh,
		nsrsbh_init: wssqUtil.nsrjbxx.nsrsbh,
		nsrmc_init: wssqUtil.nsrjbxx.nsrmc,
		scjydz: wssqUtil.nsrjbxx.scjydz,
		djzclxMc: baseCode.getMcById('DM_DJ_DJZCLX.ashx',wssqUtil.nsrjbxx.djzclxDm)
	});
    var end = mini.formatDate(new Date(), "yyyy");
    mini.get("band").setMaxValue(end);
   
	//初始化优惠备案信息
    /*
    ajax.post("../../../api/yh/ssjm/get/ssyhsx/10104","",function(data){
        var resultData = data;
        if(resultData.success){
            if(resultData.value){
                mini.get("yhsxInit").setData(resultData.value);
            }
        }else{
            mini.alert(resultData.message);
        }
    });
    */

    qysdsyhsxbaService.getInitData(mini.encode({"band":mini.get("band").getValue()}),function(data) {
        var json = mini.decode(data);
        if (json.success){
			var map = json.value;
			mini.get("sysDate").setValue(map.sysDate);
			if (map.bz == "1"){
				$("#ybayhsxqdb_div").show();
			}else {
				$("#ybayhsxqdb_div").hide();
			}
			mini.get("kdqhzbz").setValue(map.bz);
			mini.get("yhsxInit").setData(map.yhsxs);
			var qysdsYhsxBaXxVo = map.qysdsYhsxBaXxVo;
			if (qysdsYhsxBaXxVo != null){
				var ybaGrid = mini.get("qysdsyhsxba_grid");
				ybaGrid.setData(qysdsYhsxBaXxVo);
				var kdqQyYhBaXxVos = qysdsYhsxBaXxVo[0].kdqQyYhBaXxVos;
				if (kdqQyYhBaXxVos != null){
					var kdqGrid = mini.get("ybayhsxqdb_grid");
					kdqGrid.setData(kdqQyYhBaXxVos);
				}
			}else {
				var ybaGrid = mini.get("qysdsyhsxba_grid");
				ybaGrid.clearRows();
				var kdqGrid = mini.get("ybayhsxqdb_grid");
				kdqGrid.clearRows();
			}
		}else {
			mini.alert("初始化企业所得税优惠备案信息失败", '提示信息',function (){
				wssqUtil.closeWin();
			});	
		}
    });
    
};
function getYwsxList() {
	var jmxxData = new Array();
	var yhsxDm = mini.get("yhsxInit").getValue();
	var jmxxObj = {'swsxMxDm':yhsxDm};
	jmxxData.push(jmxxObj);
	return jmxxData;
}
qysdsyhsxba.initYhsxbaSqb = function(e){
	var yhsx = qysdsyhsxba.getTxData();
	mini.get("band_ba").setValue(mini.get("band").getValue());
	mini.get("yhsxmc").setValue(yhsx.text);
	mini.get("yhsx").setValue(yhsx.value);
	mini.get("bz").setValue(yhsx.bz);
	mini.get("band").setValue(yhsx.band);
	mini.get("djxh").setValue(yhsx.djxh);
	mini.get("nsrsbh").setValue(yhsx.nsrsbh);
	mini.get("nsrmc").setValue(yhsx.nsrmc);
	mini.get("swjgdm").setValue(yhsx.swjgdm);
	mini.get("zcyj").setValue(yhsx.content);
	var height = Math.ceil(yhsx.text.length / 70) * 20;
	$("#yhsxmc").css("height", height + "px");
	height = Math.ceil(yhsx.content.length / 70) * 20;
	$("#zcyj").css("height", height + "px");
	if (yhsx.bz == "1"){
		$("#fzjghzqd").show();
	}
	//系统时间
	mini.get("sysDate").setValue(yhsx.sysDate);
	mini.get("xtsj").setValue(yhsx.sysDate);
	return true;
};
qysdsyhsxba.ValidateYHqzrq = function(e){
	if(e.sender.name == "yhyxqz"){
        e.sender.setValue(e.value.getLastDateOfMonth());
	}else{
        e.sender.setValue(e.value.getFirstDateOfMonth());
	}
    var Yxqq=mini.get("yhyxqq").getValue();
	var Yxqz=mini.get("yhyxqz").getValue();
	if(!Yxqq||!Yxqz){
		return;
	}
	if(Yxqq> Yxqz){
		mini.alert("有效期止不能小于有效期起，请重新填写有效期起！","提示信息",function(){
			e.sender.setValue("");
			e.isValid=false;
			e.sender.focus();
		});
	}
};
qysdsyhsxba.ValidateWJqzrq = function(e){
	var Yxqq=mini.get("wjyxqq").getValue();
	var Yxqz=mini.get("wjyxqz").getValue();
	if(!Yxqq||!Yxqz){
		return;
	}
	if(Yxqq> Yxqz){
		mini.alert("有效期止不能小于有效期起，请重新填写有效期起！","提示信息",function(){
			e.sender.setValue("");
			e.isValid=false;
			e.sender.focus();
		});
	}
};
function openWin(){
	var win = mini.get("win1");
    win.show();
	
};

/** 获取填写数据 */
qysdsyhsxba.getTxSqbData = function(e) {
	 var form = new mini.Form("#dataGrid");            
     var data = form.getData();      //获取表单多个控件的数据
    return data;

};

/**校验手机号*/
qysdsyhsxba.onSjhmValidation = function(e){
    var pattern = /^1[34578]\d{9}$/;
    if(e.value==""){
        e.isValid=false;
    }
    else{
        if (!pattern.test(e.value)) {
            mini.alert("手机号码填写有误！","提示",function(){
                e.sender.setValue("");
            });
            return false;
        }
    }
    return true;
};
qysdsyhsxba.tjsqxx = function(e){    		
	var frameData = qysdsyhsxba.getTxSqbData();
	frameData.yhyxqq = mini.formatDate(mini.parseDate(frameData.yhyxqq), "yyyy-MM-dd");
	frameData.yhyxqz = mini.formatDate(mini.parseDate(frameData.yhyxqz), "yyyy-MM-dd");
	frameData.wjyxqq = mini.formatDate(mini.parseDate(frameData.wjyxqq), "yyyy-MM-dd");
	frameData.wjyxqz = mini.formatDate(mini.parseDate(frameData.wjyxqz), "yyyy-MM-dd");

	if (fzjgData != null){
		frameData.kdqQyYhBaXxVos = fzjgData;
	}	
	filterExcessData();
	qysdsyhsxbaService.tj(mini.encode(frameData), function (data) {
        var result = mini.decode(data);
        if (result.success) {        	
        	flagBoolean=true;
        } else {
            mini.alert(result.message);
        }
    });
};
function validateSdsRd(){
	qysdsyhsxbaService.getSfzrdxx("",function(data) {
		var json = mini.decode(data);
		if (json.success){
			if(!json.value){
				mini.alert("未查询到税费种认定信息！","错误",
					function(){
						wssqUtil.closeWin();
					});
			}else{
				var arr = json.value.rdyxqq.split("-");
				rdyxqq =arr[0];
			}
		}else {
			mini.alert(json.message);
		}
	});
}
fzjgba.addRow = function (){
	var fzjgbGrid = mini.get("fzjg_grid");
	var newRow = {
	        fzjgmc : "",
	        nsrsbh_fz : "",
	        yhxm : "",
	        fzjgzgswjg : "",
	    };
	fzjgbGrid.addRow(newRow, 0);
};
fzjgba.removeRow = function (){
	var fzjgbGrid = mini.get("fzjg_grid");
	var rows = fzjgbGrid.getSelecteds();
	if (rows.length > 0) {
		mini.confirm('确定删除选中的记录吗？','提示',function (action) {
			if(action==='ok'){
				fzjgbGrid.removeRows(rows, false); // false 不会自动选中下一条记录
				wssqUtil.showTips('删除成功','表格数据删除成功','success',2000);
			}
		});
	} else {
		mini.alert("请选中一条记录");
	}
}
fzjgba.save = function (){
	fzjgGrid.validate();
	if(!fzjgGrid.isValid()){
		var errors = fzjgGrid.getCellErrors(),errorObj={},errorText='';
		for (var i = 0; i < errors.length; i++) {
			errorObj = errors[i];
			errorText += errorObj.column.editor.requiredErrorText +'<br/>';
		}
		wssqUtil.showTips('保存失败',errorText,'danger');
		return;
	}
	var win = mini.get("win1");
    win.hide();
/*    var fzjgbGrid = mini.get("fzjg_grid");
    var fzjgGridData = mini.decode(fzjgbGrid.getData());*/
    fzjgData =  mini.get("fzjg_grid").getData();
    for(var i=0;i<fzjgData.length;i++){
		fzjgData[i].nsrsbh = fzjgData[i].nsrsbh_fz;
		fzjgData[i].nsrmc = fzjgData[i].nsrmc_fz;
		fzjgData[i].yhsx = fzjgData[i].yhsx_fz;
		fzjgData[i].yhsxmc = fzjgData[i].MC;
		fzjgData[i].yhsxmc_fz = fzjgData[i].MC;
	 /*var arr  =
	 {
	 "nsrsbh" : fzjgGridData[i].nsrsbh_fz,
	 "nsrsbh_fz" : fzjgGridData[i].nsrsbh_fz,
	 "nsrmc" : fzjgGridData[i].nsrmc_fz,
	 "nsrmc_fz" : fzjgGridData[i].nsrmc_fz,
	 "yhsx" : fzjgGridData[i].yhsx_fz,
	 "yhsx_fz" : fzjgGridData[i].yhsx_fz,
	 "yhsxmc" : fzjgGridData[i].MC,
	 "yhsxmc_fz" : fzjgGridData[i].MC,
	 "swjgDm" : fzjgGridData[i].swjgDm,
	 "swjgMc" : fzjgGridData[i].swjgMc
	 };
	 fzjgData.push(arr);*/
	 }
};
fzjgba.cancel = function(){
	var win = mini.get("win1");
    win.hide();
};
function onCellcommitedit(e){
    var grid_fz = e.sender;
    var record = e.record;
    var row = e.row;
    var field = e.field, value = e.value;
    //提交 编辑纳税人识别号 时发生
    if(field=="nsrsbh_fz"){
    	 qysdsyhsxbaService.getNsrxx(mini.encode({"nsrsbh":value}),function(data) {
    		 var json = mini.decode(data);
    		 if (json.success){
				 if(!json.value){
					 mini.alert("无法找到相应的纳税人信息","提示",
						 function(){
							 var map = {
								 "nsrsbh_fz" : "",
								 "nsrmc_fz" : "",
								 "swjgMc" : "",
								 "swjgDm" : "",
							 } ;
							 grid_fz.updateRow(row, map);
						 })
				 }else{
					 var nsrxx = json.value;
					 var map = {
						 "nsrsbh_fz" : nsrxx.nsrsbh,
						 "nsrmc_fz" : nsrxx.nsrmc,
						 "swjgMc" : baseCode.getMcById('DM_GY_SWJG',nsrxx.zgswjDm ),
						 "swjgDm" : nsrxx.zgswjDm
					 } ;
					 grid_fz.updateRow(row, map);
				 }
 			}else {
 				mini.alert(json.message);
 			}
    	  });  	
    }
	if(field=="yhxm"){	
    	var editor=e.editor;
		row.swjgDm = row.swjg.swjgDm;
    }
}
