var grid,fbzlGrid,ylgrid,jmfbzlGrid,yhsxDm;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var xfs = {};
var formdata=[];
var n=0;
var resultData;
var date=new Date();
var myDate=date.format('yyyy-MM-dd');
var oldValue;//表格编辑前数据
var returnBoolean;
//步骤
stepNav.run = function () {
	mini.parse();
	if(!xfs.roleValidate()){
		return;
	}
	if(!xfs.nsrsfzRd()){
		return;
	}
    stepNav.initSteps([
        {id: 0, title: '填写备案信息', url: 'xfsssjmbaView.html'},
		{id: 1, title: '上传附报资料', url: '../public1/fbzl/FbzlView.aspx', js: true},
        {id: 'yl', title: '预览提交', url: 'xfsssjmbaylView.html', yltj: true},
        {id: 2, title: '完成', url:'../public1/wc/wc.aspx',js:true}
    ]);


	grid = mini.get("xfs_grid");
	fbzlGrid = mini.get('fbzl-grid');
	ylgrid = mini.get("xfs1_grid");
	jmfbzlGrid = mini.get("fbzl-yl-grid");
	yhsxDm=mini.get("ssyhsx");
	initSsyhsx();
	//纳税人基本信息
	getNsrjbxx();
}
stepNav.onStepChanging = function (event, currentIndex, newIndex) {

    if(currentIndex==0){
		var resultBoolean = true;
		var formObj = new mini.Form("#wizard");
		formObj.validate();
		if (!formObj.isValid()) {
			return;
		}
		if(grid.getData().length==0){
			mini.alert("请至少增加一条“享受减免税优惠”");
			return;
		}
		var gridData = grid.getData();
		for(var i = 0, len = gridData.length; i < len; i++){
			if(gridData[i].jmlxDm == 1&& !gridData[i].jzsl){
				mini.alert("减免类型为税率式减免，减征税率虚大于0")
				resultBoolean = false;
			}else if(gridData[i].jmlxDm == 2 && !gridData[i].jzed){
				mini.alert("减免类型为税额式减免，减征额度必录")
				resultBoolean = false;
			}else if(gridData[i].jmlxDm == 3 && !gridData[i].jzfd){
				mini.alert("减免类型为税基式减免，减征幅度必录")
				resultBoolean = false;
			}
		}

		var swsxMxDm={"swsxMxDm":mini.get("ssyhsx").getValue()};
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
		return true;
	}else if(currentIndex==2){

			var jmsData = ylgrid.getData();
			formdata = {
				"djxh": "",
				"zgswskfjDm": "",
				"lcslid": "",
				"ssjmbaVO": {
					"jbr":"",
					"sqrq": "",
					"slrq": "",
					"slswjgDm": "",
					"YHJmssqspbVO": {
						"squuid": "",
						"djxh": "",
						"lcslid": "",
						"hdslid": "",
						"qddybscjysrrq":"",
						"zfbz1": "",
						"lrrDm": "",
						"lrrq": "",
						"sjgsdq": ""
					},
					"YHJmssqspbMxGrid": {
						"YHJmssqspbMxGridlb": []
					},
					"slswsxDm": wssqUtil.currentSwsxDm
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
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmsspsxDm=yhsxDm.getValue();
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].zsxmDm=10102;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmzlxDm=jmsData[n].jmzlxDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmlxDm=jmsData[n].jmlxDm;
				//formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmfsDm=jmsData[n].jmfsDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzhzDm=jmsData[n].jmzcId;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzdlDm=jmsData[n].ssjmxzdlDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].ssjmxzxlDm=jmsData[n].ssjmxzxlDm;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmqxq=jmsData[n].jmqxq;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jmqxz=jmsData[n].jmqxz;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzsl=jmsData[n].jzsl;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzed=jmsData[n].jzed;
				formdata.ssjmbaVO.YHJmssqspbMxGrid.YHJmssqspbMxGridlb[n].jzfd=jmsData[n].jzfd;
			}
			formdata = mini.encode(formdata)
			wssqUtil.tjsq("../../../api/yh/ssjm/submit/xfsssjmxx",formdata,function(req){
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
		formData.ssyhsxDm = formData.ssyhsx;
		formData.ssyhsx = mini.get("ssyhsx").getText();
		wcjyzmYlForm.setData(formData);

		var formdata = xfs.getTxData();
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
xfs.getTxData = function () {
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

/**
 * 校验
 * @returns {boolean}
 */
xfs.roleValidate = function () {
	// 1、 校验纳税人状态是否正常 [03]
	var resultValue=true;
	if (wssqUtil.nsrjbxx.nsrztDm != '03') {
		mini.alert("纳税人状态异常，流程终止", "错误",
			function () {
				wssqUtil.closeWin();
			}
		)
		resultValue=false;
	}

	// .... 更多校验 在此添加
	return resultValue;
}
/**
 * 获得所需纳税人信息
 */
function getNsrjbxx(){
	var djzclxmc = baseCode.getMcById("DM_DJ_DJZCLX.ashx",wssqUtil.nsrjbxx.djzclxDm);
	mini.get('nsrsbh').setValue(wssqUtil.nsrjbxx.nsrsbh);
	mini.get('nsrmc').setValue(wssqUtil.nsrjbxx.nsrmc);
	mini.get('djzclx').setValue(djzclxmc);
	mini.get('scjydz').setValue(wssqUtil.nsrjbxx.scjydz);
}

/**
 * 货物有效期起止校验
 * @param e
 */
xfs.onDateChanged = function (e) {
	if(!e.value) {
		return;
	}
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
			editor.disable();
			grid.updateRow(e.rowIndex,"jzsl","");
		}
	}
}
var cellendedit = function (e) {
	var value= e.value;
	var index= e.rowIndex;
	var field= e.field;
	var record= e.record;
	if(field=="jmlx"){
		for(var n = 0,len = jmlxData.length ; n < len ; n++ ){
			if(value==jmlxData[n].ID){
				grid.updateRow(index,"jmlx",jmlxData[n].MC);
				grid.updateRow(index,"jmlxDm",jmlxData[n].ID);
				grid.updateRow(index,"jzed","");
				grid.updateRow(index,"jzfd","");
				grid.updateRow(index,"jzsl","");
			}
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
					var gridToolBar = $('#xfs_grid').prev();
					gridToolBar.find('.grid-edit').show();
					gridToolBar.find('.grid-save').hide();
				}
			)
		}
	}
}
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
xfs.nsrsfzRd = function (){
	var resultValue=false;
	ajax.post("../../../api/yh/ssjm/submit/ssjmsfzrd/10102.ashx","",function(data){
		var resultData = data;

		if(resultData.success==true){
			if(resultData.value){
				resultValue=true;
			}else{

				mini.alert("您未认定为消费税费种种类，不予受理","错误",function(){
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
function initSsyhsx(){
	ajax.post("../../../api/yh/ssjm/get/ssyhsx/10102","",function(data){
		var resultData = data;
		if(resultData.success){
			if(resultData.value){
				yhsxDm.setData(resultData.value);
			}
		}else{
			mini.alert(resultData.message);
		}
	});
}