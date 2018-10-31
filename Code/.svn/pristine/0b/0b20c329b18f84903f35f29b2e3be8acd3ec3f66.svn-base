var grid,ylgrid,fbzlGrid,jmfbzlGrid,yhsx;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var n= 0,//用于判断是否第一次进入含tab页的steps页
	date=new Date(),//获取当前时间
	myDate=date.format('yyyy-MM-dd'),//格式化date
	jms = {},
	formdata,
	ylHeight,//存贮第一次进入tabs页时的高度
	oldValue,//jms_grid表格单元格编辑前的值
	returnBoolean=false;
	jms.yhsxDm="";
	jms.yhsxMc="";
	cytjData=[];
var htForm;
//步骤
stepNav.run = function () {

/*	if(!jms.nsrsfzRd()){
		return;
	}*/
    stepNav.initSteps([
        {id: 0, title: '填写备案信息', url: 'zzsssjmbaView.aspx'},
        {id: 1, title: '上传附报资料', url: '../public1/fbzl/FbzlView.aspx', js: true},
        {id: 2, title: '预览提交', url: 'zzsssjmbaylView.aspx', yltj: true},
        {id: 3, title: '完成', url:'../public1/wc/wc.aspx',js:true}
    ]);
    mini.parse();
    if(!jms.roleValidate()){
        return;
    }
	grid = mini.get("jms_grid");
	fbzlGrid = mini.get('fbzl-grid');
	ylgrid = mini.get("jms1_grid");
	jmfbzlGrid = mini.get("fbzl-yl-grid");
	yhsx=mini.get("ssyhsx");
    htForm = new mini.Form('ht_info');
	initSsyhsx();
	//纳税人基本信息
	getNsrjbxx();
	getSwsxmc();
}
stepNav.onStepChanging = function (event, currentIndex, newIndex) {

    if(currentIndex==0){
		var resultBoolean = true;
		var formObj = new mini.Form("#wizard");
		formObj.validate();
		if (!formObj.isValid()) {
			return;
		}
		if(!grid.getData().length){
			mini.alert("请至少增加一条“享受减免税优惠”");
			return;
		}
		if(!isDataGridError()){
			return;
		}

        // 技术转让  要填合同信息
        if( jms.isJszr ){
            mini.get('htmc').setVtype('required');
            mini.get('htbh').setVtype('required');
        }else{
            mini.get('htmc').setVtype('');
            mini.get('htbh').setVtype('');
        }
        if( !htForm.validate() ){
            return false;
        }


        var gridData = grid.getData();
		for(var i = 0, len = gridData.length; i < len; i++){
			if( gridData[i].jmzlxDm == '02' ){
				continue;
			}
			if(gridData[i].jmlxDm == 1&& !gridData[i].jzsl){
				mini.alert("减免类型为税率式减免，减征税率需大于0")
				resultBoolean = false;
			}else if(gridData[i].jmlxDm == 2 && !gridData[i].jzed){
				mini.alert("减免类型为税额式减免，减征额度必录")
				resultBoolean = false;
			}else if(gridData[i].jmlxDm == 3 && !gridData[i].jzfd){
				mini.alert("减免类型为税基式减免，减征幅度必录")
				resultBoolean = false;
			}
		}

		var swsxMxDm={"swsxMxDm":grid.getData()[0].jmsspsxDm};
		var swsxMxDmList = []; //如果有税务事项明细代码请组织好
		swsxMxDmList.push(swsxMxDm);
		//获取附报资料列表
		var datas = {
			'swsxDm': wssqUtil.currentSwsxDm,
			'swsxMxDmList':swsxMxDmList
		};
		fbzlAjax(datas,'requestFbzllist');
		return resultBoolean;
    }else if(currentIndex==1){
		//判断是否按要求上传附报资料
		if(!isCondition()){
			return;
		}
		//给预览提交的附报资料赋值
		jmfbzlGrid.setData(fbzldata);

		if(!n){
			ylHeight=$("#wizard-p-2").outerHeight();
			n++;
		}
		return true;
	}else if(currentIndex==2){

			var jmsData = ylgrid.getData();
			formdata = {
				"djxh": "",
				"zgswskfjDm": "",
				"lcslid": "",
				"ssjmbaVO": {
					"sqrq": "",
					"slrq": "",
					"slswjgDm": "",
					"YHJmssqspbVO": {
						"squuid": "",
						"djxh": "",
						"lcslid": "",
						"hdslid": "",
						"zfbz1": "",
						"lrrDm": "",
						"lrrq": "",
						"sjgsdq": ""
					},
					"YHJmssqspbMxGrid": {
						"YHJmssqspbMxGridlb": []
					},
					"slswsxDm": Tools.getUrlParamByName('code')
				}
			}
			for(var n = 0, len = jmsData.length ; n < len ; n++ ){
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n]={
					"djxh": "",
					"lcslid": "",
					"hdslid": "",
					"jmsspsxDm": "",
					"zsxmDm": "",
					"zspmDm": "",
					"jmzlxDm": "",
					"jmlxDm": "",
					"jmfsDm": "",
					"ssjmxzhzDm": "",
					"ssjmxzdlDm": "",
					"ssjmxzxlDm": "",
					"sblm": "",
					"jmqxq": "",
					"jmqxz": "",
					"jzsl": "",
					"jzed": "",
					"jzfd": ""
				};
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmsspsxDm=jmsData[n].jmsspsxDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].zsxmDm=10101;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmzlxDm=jmsData[n].jmzlxDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmlxDm=jmsData[n].jmlxDm;
				//formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmfsDm=jmsData[n].jmfsDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzhzDm=jmsData[n].ssjmxzDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzdlDm=jmsData[n].ssjmxzdlDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzxlDm=jmsData[n].ssjmxzxlDm;

				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmqxq=mini.get("jmqxq").getText();
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmqxz=mini.get("jmqxz").getText();
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzsl=jmsData[n].jzsl;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzed=jmsData[n].jzed;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzfd=jmsData[n].jzfd;


                if( jms.isJszr ){
                    formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].htmc = mini.get('htmc').getValue() || '';
                    formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].htbh = mini.get('htbh').getValue() || '';
                }else{
                    formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].htmc = '';
                    formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].htbh = '';
                }


            }
		    formdata = mini.encode(formdata)
		    wssqUtil.tjsq("../../../api/yh/ssjm/submit/zzsssjmxx",formdata,function(req){
				if(req.success){
					returnBoolean=true;
				}else{
					mini.alert(req.message);
				}
			})
			return returnBoolean;
		}
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
        ylgrid.setData( grid.getData());

		var wcjyzmTxForm = new mini.Form("#step_tx_form");
		var wcjyzmYlForm = new mini.Form("#step_yl_form");
		var formData = wcjyzmTxForm.getDataAndText(true);
		formData.ssyhsxDm = jms.yhsxDm;
		formData.ssyhsx = jms.yhsxMc;
		wcjyzmYlForm.setData(formData);

        var formdata = jms.getTxData();
        var formFields = formdata.jmsForm.getFields();
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
/**
 * 获取填写数据
 * @returns {{fpdsForm: mini.Form, fpdsFormData: *}}
 */
jms.getTxData = function () {
    // 外出经营证明的申请信息Form
    var jmsForm = new mini.Form("#wizard");
    var jmsFormData = jmsForm.getData();

    // 转化成json字符串
    jmsFormData = mini.encode(jmsFormData);

    return {
        "jmsForm" : jmsForm,
        "jmsFormData" : jmsFormData
    };
}


$(".mini-tabs-header tr").children("td").eq(1).click(function(){
	$(".content").css("height",ylHeight);
})
/**
 * 校验
 * @returns {boolean}
 */
jms.roleValidate = function () {
	// 1、 校验纳税人状态是否正常 [03]
	var resultValue = true;
	if (wssqUtil.nsrjbxx.nsrztDm != '03') {
		mini.alert("纳税人状态异常，流程终止", "错误",
			function () {
				wssqUtil.closeWin();
			}
		)
		resultValue = false;
	}

	// .... 更多校验 在此添加
	return resultValue;
}
/**
 * 获得所需纳税人信息
 */
function getNsrjbxx(){
	mini.get('nsrsbh').setValue(wssqUtil.nsrjbxx.nsrsbh);
	mini.get('nsrmc').setValue(wssqUtil.nsrjbxx.nsrmc);
	mini.get('djzclx').setValue(baseCode.getMcById("DM_DJ_DJZCLX.ashx",wssqUtil.nsrjbxx.djzclxDm));
	mini.get('scjydz').setValue(wssqUtil.nsrjbxx.scjydz);
}
function getSwsxmc(){
	yhsx.disable();
	ajax.post("../../../api/yh/ssjm/get/cyyhsx.ashx","",function(data){
		if(data.success){
			cytjData=data.value;
		}else{
			mini.alert(data.message);
		}
	},function(){

	})
	if(!$(".icon-border").length){
		for(var i = 0, len = cytjData.length; i < len; i++){
			form="<p class='icon-border'>"+cytjData[i].swsxmc+"</p>";
			$(".check-icon").append(form);
		}
	}
	$(".icon-border").click(function(){
        jms.isJszr = false;
        $('.ht_info').hide();
		yhsx.setValue("");
		ssyhsxChanged();
		yhsx.disable();
		$(".more-icon").removeClass("inhover");
		var formData=this.innerHTML;
		for(var i = 0, len = cytjData.length; i < len; i++){
			$(".icon-border").eq(i).removeClass("inhover");
			if(formData == cytjData[i].swsxmc){
                if( formData.match('技术转让') ){  // 选中的技术转让
                    jms.isJszr = true;
                    $('.ht_info').show();
                }
				$(".icon-border").eq(i).addClass("inhover");
				//cytjMC = cytjData[i].swsxmc;
				//cytjID = cytjData[i].jmsspsxDm;
				grid.addRow(cytjData[i],  grid.getData().length);
				grid.setAllowCellEdit(true);
			}
		}
	})
	$(".more-icon").click(function(){
		ssyhsxChanged();
		for(var i = 0, len = cytjData.length; i < len; i++){
			$(".icon-border").eq(i).removeClass("inhover");
		}
		$(".more-icon").addClass("inhover");
		yhsx.enable();
	})
}
jms.ssyhsxChecked = function(e){
	ssyhsxChanged();
    if( e.selected && e.selected.ID == 'SXA031900244' ){
        jms.isJszr = true;
        $('.ht_info').show();
    }else{
        jms.isJszr = false;
        $('.ht_info').hide();
    }
	grid.setAllowCellEdit(true);
	var newRow = {
		swsxmc:yhsx.getText(),
		jmsspsxDm:yhsx.getValue()
	}
	grid.addRow(newRow,  grid.getData().length);
}
/**
 * 货物有效期起止校验
 * @param e
 */
jms.onDateChanged = function (e) {
	if (e.sender.name == "jmqxq"){
        e.sender.setValue(e.value.getFirstDateOfMonth());
		if(!!mini.get("jmqxz").getValue()){
			if (!!e.sender.value && e.sender.value > mini.get("jmqxz").getValue()){
				mini.alert("减免有效期起不能晚于减免有效期止");
				mini.get("jmqxz").setValue("")
				return;
			}
		} else {
			return ;
		}
	} else {
		e.sender.setValue(e.value.getLastDateOfMonth());
		if(!!mini.get("jmqxq").getValue()){
			if (!!e.sender.value && e.sender.value.format('yyyy-MM-dd') < mini.get("jmqxq").getValue().format('yyyy-MM-dd')){
				mini.get("jmqxz").setValue("");
				mini.alert("减免有效期止不能早于减免有效期起");
				return;
			}
		} else {
			return ;
		}
	}
}
var cellbeginedit = function (e) {
	oldValue= e.value;
	var field = e.field;
	var row = e.row;
	var editor = e.editor;
	if(field == "jzed"){
		editor.enable();
		//editor.allowInput = true;
		if(row.jmlxDm != 2){
			editor.disable();
			//editor.allowInput = false;
		}
	}else if(field == "jzfd"){
		editor.enable();
		//editor.allowInput = true;
		if(row.jmlxDm != 3){
			editor.disable();
			//editor.allowInput = false;
		}
	}else if(field == "jzsl"){
		editor.enable();
		if(row.jmlxDm != 1){
			grid.updateRow(e.rowIndex,"jzsl","");
			editor.disable();
		}
	}else if(field == "ssjmxzmc"){
		var url = "../../../api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZ&filterVal="+grid.getData()[0].jmsspsxDm;
		ajax.get(url,"",function(data){
			var jmzcData = data;
			editor.setData(jmzcData);
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})

	}
}
var cellendedit = function (e) {
	var value= e.value;
	var index= e.rowIndex;
	var field= e.field;
	var record= e.record;
	var editor= e.editor;
	if(field=="jmlxmc"){
		for(var n = 0,len = editor.data.length ; n < len ; n++ ){
			if(value==editor.data[n].ID){
				grid.updateRow(index,"jmlxmc",editor.data[n].MC);
				grid.updateRow(index,"jmlxDm",editor.data[n].ID);
				grid.updateRow(index,"jzed","");
				grid.updateRow(index,"jzfd","");
				grid.updateRow(index,"jzsl","");
			}
		}
		grid.unFrozenColumns();
	}else if(field=="ssjmxzmc"){
		for(var n = 0, len = editor.data.length ; n < len; n++ ){
			if(value==editor.data[n].ID){
				grid.updateRow(index,"ssjmxzmc",editor.data[n].MC);
				grid.updateRow(index,"ssjmxzDm",editor.data[n].ID);
			}
		}
		if(!value){
				grid.updateRow(0,"ssjmxzdlmc","");
				grid.updateRow(0,"ssjmxzdlDm","");
				grid.updateRow(0,"ssjmxzxlmc","");
				grid.updateRow(0,"ssjmxzxlDm","");
				grid.updateRow(0,"jmzlxDm","");
				grid.updateRow(0,"jmzlxmc","");
		}
	}else if(field=="jmqxq"|| field=="jmqxz"){
		if(record.jmqxq.format('yyyy-MM-dd')> record.jmqxz.format('yyyy-MM-dd')){
			mini.alert("减免有效期起不能大于减免有效期止","提示",
				function(){
					if(field=="jmqxq"){
						grid.updateRow(index,"jmqxq",oldValue);
					}else{
						grid.updateRow(index,"jmqxz",oldValue);
					}
					var jmsNewdata=grid.getData();
					grid.clearRows();
					grid.setData(jmsNewdata);
					var gridToolBar = $('#jms_grid').prev();
					gridToolBar.find('.grid-edit').show();
					gridToolBar.find('.grid-save').hide();
				}
			)
		}
	}
};
var jzlxChanged = function (e){
	var jzedInput = mini.get("jzed");
	var jzfdInput = mini.get("jzfd");
	var jzslInput = mini.get("jzsl");
	jzedInput.setValue("");
	jzfdInput.setValue("");
	jzslInput.setValue("");
	jzedInput.disable();
	jzfdInput.disable();
	//jzedInput.allowInput=false;
	//jzfdInput.allowInput=false;
	jzslInput.disable();
	if(e.value == 1){
		jzslInput.enable();
	}else if(e.value == 2){
		jzedInput.enable();
		//jzedInput.allowInput=true;
	}else if(e.value == 3){
		jzfdInput.enable();
		//jzfdInput.allowInput=true;
	}
};
jms.nsrsfzRd = function (){
	var resultValue=false;
	ajax.post("../../../api/yh/ssjm/submit/ssjmsfzrd/10101.ashx","",function(data){
		var resultData = data;
		if(resultData.success){
			if(resultData.value){
				resultValue = true;
			}else{
				mini.alert("您未认定为增值税费种种类，不予受理","错误",function(){
					wssqUtil.closeWin();
				});
			}

		}else{
			mini.alert(resultData.message);
		}
	},function(){
		mini.alert("请求异常，稍后再试！",'提示',function () {
			wssqUtil.closeWin();
		});
	})
	return resultValue;
}
function closeWin(){
	wssqUtil.closeWin();
}
function ssyhsxChanged(){
	grid.clearRows();
}
function getssjmxzmc(){
	var url="../../../api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZ&filterVal="+yhsx.getValue();
	ajax.get(url,"",function(data){
		jmzcData = data;
		mini.get('ssjmxzmc').setData(jmzcData);
	},function(){
		mini.alert("请求异常，稍后再试！",'提示',function () {
			wssqUtil.closeWin();
		});
	})
}
jms.getDlXl = function (e) {
	if(grid.getData()[0].ssjmxzDm){
		var filterVal = grid.getData()[0].ssjmxzDm+grid.getData()[0].jmsspsxDm;
		var url1="../../../api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZDL&filterVal="+filterVal,
			url2="../../../api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZXL&filterVal="+filterVal,
			url3="../../../api/baseCode/CombSelect/common1.ashx?codeName=DM_GY_ZZSJMZLX&filterVal="+grid.getData()[0].ssjmxzDm;
		/*获取大类*/
		ajax.get(url1,"",function(data){
			var resultData = data;
			grid.updateRow(0,"ssjmxzdlmc",resultData[0].MC);
			grid.updateRow(0,"ssjmxzdlDm",resultData[0].ID);
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
		/*获取小类*/
		ajax.get(url2,"",function(data){
			var resultData = data;
			grid.updateRow(0,"ssjmxzxlmc",resultData[0].MC);
			grid.updateRow(0,"ssjmxzxlDm",resultData[0].ID);
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
		/*获取减免征*/
		ajax.get(url3,"",function(data){
			var resultData = data;
			grid.updateRow(0,"jmzlxDm",resultData[0].ID);
			if(resultData[0].ID == 02){
				//减免类型 默认税额式减免  后面改成非必录
				grid.updateRow(0,"jmzlxmc","免征");
				grid.updateRow(0,"jmlxmc","税额式减免");
				// mini.get('htmc').setVtype('required');
 			}else if(resultData[0].ID == 01){
				grid.updateRow(0,"jmzlxmc","减征");
			}
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
	}

}
function isDataGridError(){
	var gridData = grid.getData()[0];
	if(!gridData.ssjmxzmc){
		mini.alert("减免性质名称不能为空");
		return false;
	}else if(!gridData.ssjmxzdlmc){
		mini.alert("减免性质大类不能为空");
		return false;
	}else if(!gridData.ssjmxzxlmc){
		mini.alert("减免性质小类不能为空");
		return false;
	}else if(!gridData.jmzlxmc){
		mini.alert("减免征类型不能为空");
		return false;
	}else if(!gridData.jmlxmc){
		mini.alert("减免类型不能为空");
		return false;
	}else {
		return true;
	}
}
/*
function showCytj(){
	cytjContain.show();
	qbContain.hide();
	qb.removeClass("incheck uncheck");
	cytj.removeClass("incheck uncheck");
	cytj.addClass("incheck");
	qb.addClass("uncheck");
	isWho = "cytj";
}
function showQb(){
	cytjContain.hide();
	qbContain.show();
	qb.removeClass("incheck uncheck");
	cytj.removeClass("incheck uncheck");
	cytj.addClass("uncheck");
	qb.addClass("incheck");
	isWho = "qb";
}
function ssyhsxOk(){
	if(isWho == "qb"){
		if(yhsx){
			ssyhsxChanged();
			jms.yhsxDm = yhsx.getValue();
			jms.yhsxMc = yhsx.getText();
			mini.get("ssyhsxLl").setValue(jms.yhsxMc);
			mini.get("win2").hide();
		}else{
			mini.alert("请选择一个优惠事项");
		}
	}else{
		if(!cytjMC){
			mini.alert("请选择一个优惠事项");
		}else{
			ssyhsxChanged();
			jms.yhsxMc = cytjMC;
			jms.yhsxDm = cytjID;
			mini.get("ssyhsxLl").setValue(jms.yhsxMc);
			mini.get("win2").hide();
		}
	}
}
function ssyhsxCancel(){
	mini.get("win2").hide();
}*/
function initSsyhsx(){
	ajax.post("../../../api/yh/ssjm/get/ssyhsx/10101.ashx","",function(data){
		var resultData = data;
		if(resultData.success){
			if(resultData.value){
				yhsx.setData(resultData.value);
			}
		}else{
			mini.alert(resultData.message);
		}
	});
}