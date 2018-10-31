var grid,ylgrid,fbzlGrid,fbzlylGrid,
	jmxzxl,jmxzxlId,jmxzdl,jmxzdlId,isWho,selectedRowIndex,
	date=new Date(),
	minDate=new Date("2015-07-01");
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
/** 增值税即征即退*/
var zzsjzjt = {};
/** 统一管理Ajax返回的数据*/
zzsjzjt.resultObject={};
/** 统一管理提交的数据*/
/** 统一管理下拉框事件是否发生数值改变*/
zzsjzjt.selectValues={
    jmsspsxDm:"",
    zsxmDm:"",
    ssjmxzhzDm:""
}
var n=0;
var oldValue;
var flagBoolean=false;
var flag=true;
stepNav.run=function () {

    //步骤
    stepNav.initSteps([
        {id:0,title:'填写备案信息',url:'zzsjzjtView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'zzsjzjtylView.aspx',yltj:true},
        {id:3,title:'审核中',url:'../public1/shz/shz.aspx',js:true},
        {id:4,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();

    grid = mini.get("jzjt_grid");
    ylgrid = mini.get("jzjt1_grid");
    /** 初始化附报资料-grid*/
    fbzlGrid=mini.get("fbzl-grid");
    fbzlylGrid=mini.get("fbzl-yl-grid");

    /** 初始化*/
   /* if(!validateNsrZzblzt()&&!flag){
        return;
    }*/
    zzsjzjt.initNsrxxData();

    /**征收品目获取*/
    var zspmurl=Api.replaceUrl(zzsjzjt.zzsjzjtService.Api.zspm,"zspmDm",{'zspmDm':10101});
    zzsjzjt.httpAjax(zspmurl);
    if(!zzsjzjt.resultObject.success){
        mini.alert(zzsjzjt.resultObject.message);
        return false;
    }else {
        /** 初始化征收品目数据*/
        zzsjzjt.zspmData=zzsjzjt.resultObject.value;
    }
    mini.get('zspmDm').setData(zzsjzjt.zspmData);

}

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if(currentIndex==0){
		if(!grid.getData().length){
			mini.alert("请至少填写一条减免税备案登记");
			return;
		}
        /** 校验页面的数值*/
        var jzjt_grid=mini.get("#jzjt_grid");
        jzjt_grid.validate();
        if(!jzjt_grid.isValid()){
           var errors =  jzjt_grid._cellErrors;
            if(!!errors){
                var msg='';
                for(var i=0;i<errors.length;i++){
                    msg += errors[i].column.header +　errors[i].errorText + '<br/>';
                }
                mini.alert(msg);
            }

            return false;
        }
        /** 附报资料*/
        var swsxMxDmList= getSwsxList(); //如果有税务事项明细代码请组织好
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

        if(n==0){
            ylHeight=$("#wizard-p-2").outerHeight();
            n++;
        }
    }else if(currentIndex==2){
        /** 提交post数据操作*/
        var url=zzsjzjt.zzsjzjtService.Api.tj;
        zzsjzjt.tj(url);
        return flagBoolean;
    }
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
        ylgrid.setData( grid.getData());

        var wcjyzmTxForm = new mini.Form("#step_tx_form");
        var wcjyzmYlForm = new mini.Form("#step_yl_form");
        wcjyzmYlForm.setData(wcjyzmTxForm.getDataAndText(true));

        var formdata = zzsjzjt.getTxData();
        var formFields = formdata.jzjtForm.getFields();
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
 * @returns {{jzjtForm: mini.Form, jzjtFormData: *}}
 */
zzsjzjt.getTxData = function () {
    // 外出经营证明的申请信息Form
    var jzjtForm = new mini.Form("#wizard");
    var jzjtFormData = jzjtForm.getData();

    // 转化成json字符串
    jzjtFormData = mini.encode(jzjtFormData);

    return {
        "jzjtForm" : jzjtForm,
        "jzjtFormData" : jzjtFormData
    };
}
zzsjzjt.zzsjzjtService= {
    Api:function () {
        return function () {
            var baseUrl = '../../..',
                realUrl = {
                    /** 查询纳税人税费种认定信息*/
                    jzjtsfzrd: '/api/dj/zzsjzjt/get/ckzhzhxx',
                    /** 税务资格备案事项-jmsspsxDm*/
                    jmsspsx: '/api/baseCode/get/baseCode2CombSelect/JZJTBASX.ashx',
                    /** 征收项目-zsxmDm*/
                    zsxm: '/api/baseCode/get/baseCode2CombSelect/HB_DM_GY_ZSXM',
                    /** 获取税费种认定信息-征收品目代码-zspmMc*/
                    zspm:'/api/yh/zzsjzjt/get/{{zspmDm}}/zspm.ashx',
                    /** 减免政策名称-jmzcMc*/
                    jmzc: '/api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZ',
                    /** 减免性质大类-jmxzdlMc*/
                    jmxzdl:'/api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZDL',
                    /** 减免性质小类-jmxzxlMc*/
                    jmxzxl:'/api/baseCode/CombSelect/common1.ashx?codeName=SSJMXZXL',
                    /** 减免类型-jmlxMc*/
                    jmlx:'/api/baseCode/get/baseCode2CombSelect/DM_YH_JMLX.ashx',
                    /** 减免方式-jmfsMc*/
                    jmfs:'/api/baseCode/get/baseCode2CombSelect/DM_YH_JMFS',
                    /** 即征即退提交*/
                    tj:'/api/yh/zzsjzjt/submit/jzjtxx',
                    /** 登记注册类型名称*/
                    djzclxDm:'/api/baseCode/get/baseCode2CombSelect/DM_DJ_DJZCLX.ashx',
                    /**  验证纳税人状态*/
                    nsrzturl:'/api/yh/zzsjzjt/validate/{{djxh}}/jzjtnsrzt',
                    /** 税费种认定:year,zsxmDm=110101*/
                    sfzrdurl:'/api/yh/zzsjzjt/submit/{{zsxmDm}}/jzjtsfzrd',
                    /** 初始化即征即退校验*/
                    jzjtjyurl:'/api/yh/zzsjzjt/init/initZzsjzjtXx'
                }
            for (var url in realUrl) {
                realUrl[url] = baseUrl + realUrl[url];
            }
            return realUrl;
        }();
    }()
}
/**
 * 通用的Ajax
 * @param url
 * @param data
 */
zzsjzjt.httpAjax=function (url) {
	ajax.post(url,"",function(result){
		zzsjzjt.resultObject=result;
	},function(){
		mini.alert("请求发生异常情况！");
	})
}
zzsjzjt.initNsrxxData=function () {
    mini.get("nsrsbh").setValue(nsrxxUtil.getNsrxxVO().nsrsbh);
    mini.get("nsrmc").setValue(nsrxxUtil.getNsrxxVO().nsrmc);
    mini.get("scjydz").setValue(nsrxxUtil.getNsrxxVO().scjydz);
    mini.get("djzclx").setValue(baseCode.getMcById("DM_DJ_DJZCLX.ashx",wssqUtil.nsrjbxx.djzclxDm));
}
function validateNsrZzblzt(){
    /** 1、校验纳税人状态*/
    var nsrztDm=nsrxxUtil.getNsrxxVO().nsrztDm;
    if(nsrztDm!="03"){
        mini.alert("您的纳税人状态异常，不能申请备案！","提示",function(){
            wssqUtil.closeWin();
        });
        return false;
    }
    /** 2、校验即征即退校验*/
    var jzjtjyURL=zzsjzjt.zzsjzjtService.Api.jzjtjyurl;
    var postData={
        "year":"2016",
        "zsxmDm":"10101"
    }
    ajax.post(jzjtjyURL,mini.encode(postData),function (result) {
        if(!result.success){
            mini.alert(result.message,'提示',function () {
                wssqUtil.closeWin();
            });
            flag=false;
        }
    },function () {
        mini.alert("请求异常，稍后再试！",'提示',function () {
            wssqUtil.closeWin();
        });
        flag=false;
    });
}
zzsjzjt.tj=function (url){
    /** 1、组织纳税人基本提交数据*/
    zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtjbxxForm.nsrsbh=nsrxxUtil.getNsrxxVO().nsrsbh;
    zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtjbxxForm.nsrmc=nsrxxUtil.getNsrxxVO().nsrmc;
    zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtjbxxForm.djxh=nsrxxUtil.getNsrxxVO().djxh;
    /** 2、组织备案信息采集数据*/
    var jzjt_gridData=mini.get("jzjt_grid").getData();
    for(var i = 0, len = jzjt_gridData.length; i < len; i++){
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i]={
			"djxh":"",
			"jmsspsxDm":"",
			"zsxmDm":"",
			"zspmDm":"",
			"jmzlxDm":"",
			"jmlxDm":"",
			"jmfsDm":"",
			"ssjmxzhzDm":"",
			"ssjmxzdlDm":"",
			"ssjmxzxlDm":"",
			"jmwjDm":"",
			"jmxmdlDm":"",
			"jmxmxlDm":"",
			"jmxzdl_dm":"",
			"jmxzxl_dm":"",
			"lmdybz":"",
			"sblm":"",
			"jmqxq":"",
			"jmqxz":"",
			"jzsl":"",
			"jzfd":"",
			"jzed":"",
			"ssjmsblmDm":""
		}
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].djxh=nsrxxUtil.getNsrxxVO().djxh;
		//zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmfsDm=jzjt_gridData[i].jmfsDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmlxDm=jzjt_gridData[i].jmlxDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmqxq=jzjt_gridData[i].jmqxq;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmqxz=jzjt_gridData[i].jmqxz;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmsspsxDm=jzjt_gridData[i].jmsspsxDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].ssjmxzdlDm=jzjt_gridData[i].jmxzdlDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].ssjmxzxlDm=jzjt_gridData[i].jmxzxlDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmxzdl_dm=jzjt_gridData[i].jmxzdlDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].jmxzxl_dm=jzjt_gridData[i].jmxzxlDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].ssjmxzhzDm=jzjt_gridData[i].ssjmxzhzDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].lmdybz="N";
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].zspmDm=jzjt_gridData[i].zspmDm;
		zzsjzjt.PostData.zzsjzjtsqxx.zzsjzjtGrid.zzsjzjtGridlb[i].zsxmDm=jzjt_gridData[i].zsxmDm;
	}



    formdata = mini.encode(zzsjzjt.PostData)
    wssqUtil.tjsq(url,formdata,function(req){
        if(req.success){
            flagBoolean=true;
        }else{
            mini.alert(req.message);
        }
    })
}
/**
 * 用户每个单元格，用于监测是否存值操作
 * @param e
 */
function onCellbeginedit(e) {
    var row = e.row;
    var record = e.record;
    var field = e.field, value = e.value;
    var editor = e.editor;
	oldValue= e.value;
    if(e.value){
        return;
    }
    if(e.field=="ssjmxzhzDm"){
        /** 减免政策名称*/
        var id=record.jmsspsxDm;
        if(id){
            var url=zzsjzjt.zzsjzjtService.Api.jmzc+"&filterVal="+id;
            editor.setUrl(url);
        }else{
            e.cancel=true;
        }
    }else if(e.field=="ssjmxzdlDm"){
        /** 减免性质大类*/
        var id=record.ssjmxzhzDm;
        if(id){
            var url=zzsjzjt.zzsjzjtService.Api.jmxzdl+"&filterVal="+id;
            editor.setUrl(url);
        }else{
            e.cancel=true;
        }
    }else if(e.field=="ssjmxzxlDm"){
        /** 减免性质小类*/
        var id=record.ssjmxzhzDm;
        if(id){
            var url=zzsjzjt.zzsjzjtService.Api.jmxzxl+"&filterVal="+id;
            editor.setUrl(url);
        }else{
            e.cancel=true;
        }
    }else if(e.field=="zspmDm"){
        /**征收品目*/
        var id=record.zsxmDm;
        if(id){
            editor.setData(zzsjzjt.zspmData);
        }else{
            e.cancel=true;
        }
    }
}
function Cellendedit(e) {
    var row = e.row;
    var field = e.field;
	var editor = e.editor;
    var record = e.record;
    if(field=="jmsspsxDm"){
        if(record.jmsspsxDm==e.value) {
            var rowData = {ssjmxzhzDm: '',jmzcMc:'', ssjmxzdlDm: '',jmxzdlMc:'', ssjmxzxlDm: '',jmxzxlMc:''};
            grid.updateRow(row, rowData);
        }
    }else if(field=="ssjmxzhzDm"){
        if(record.ssjmxzhzDm==e.value) {
            var rowData = {ssjmxzdlDm: '',jmxzdlMc:'', ssjmxzxlDm: '',jmxzxlMc:''};
            grid.updateRow(row, rowData);
        }
    }else if(field=="jmqxq"||field=="jmqxz"){
		if(!record.jmqxq || !record.jmqxz) return;
		if(record.jmqxq.format('yyyy-MM-dd')>record.jmqxz.format('yyyy-MM-dd')){
			if(field=="jmqxq"){
				grid.updateRow(e.rowIndex,"jmqxq",oldValue)
			}else {
				grid.updateRow(e.rowIndex, "jmqxz", oldValue);
			}
			var jmsNewdata=grid.getData();
			grid.clearRows();
			grid.setData(jmsNewdata);
		}
    }else if(field == "jmlxMc"){
		grid.updateRow(e.rowIndex,"jmlxMc",editor.text);
		grid.updateRow(e.rowIndex,"jmlxDm",editor.value);
	}/*else if(field == "jmfsMc"){
		grid.updateRow(e.rowIndex,"jmfsMc",editor.text);
		grid.updateRow(e.rowIndex,"jmfsDm",editor.value);
	}*/

}
/** 组织post数据格式*/
zzsjzjt.PostData={
    "lcslid":"",
    "hdslid":"",
    "sjgsdq":"",
    "lcswsxDm":"",
    "slswsxDm":"",
    "zzsjzjtsqxx":{
        "zzsjzjtjbxxForm":{
            "nsrsbh":"",
            "nsrmc":"",
            "djxh":""
        },
        "zzsjzjtGrid":{
            "zzsjzjtGridlb":[]
        },
        "zzsjzjtslxxForm":{
            "jbr":"",
            "sqrq":"",
            "slrDm":"",
            "slrq":"",
            "slswjgDm":""
        }
    },
    "spjg":""
}
/**
 * 增加方法修改
 * ywy 2017/3/14
 * */
zzsjzjt.addRow = function (){
	var form2 = '<div class="mini-panel-title">增加</div>';
	if(isWho!="edit"&&isWho!="add"){
		$(".mini-panel-header-inner").append(form2);
	}
	if(isWho=="edit"){
		$(".mini-panel-header-inner .mini-panel-title").remove();
		$(".mini-panel-header-inner").append(form2);
	}
	isWho="add";
	mini.get("win1").show();
	var firstDay = date.getFirstDateOfMonth();
	mini.get('jmqxq').setValue(firstDay);
}
var form = new mini.Form("form1");
zzsjzjt.getJmzc = function (){
	var id=mini.get("jmsspsxDm").getValue();
	if(id){
		var url=zzsjzjt.zzsjzjtService.Api.jmzc+"&filterVal="+id;
		mini.get("ssjmxzhzDm").setUrl(url);
	}
}
zzsjzjt.getDlXl = function (){
	var id = mini.get("ssjmxzhzDm").getValue();
    var id2=mini.get("jmsspsxDm").getValue();
	var url1=zzsjzjt.zzsjzjtService.Api.jmxzdl+"&filterVal="+id + id2;
	var url2=zzsjzjt.zzsjzjtService.Api.jmxzxl+"&filterVal="+id + id2;
	if(!mini.get("jmsspsxDm").getValue()&&id){
		mini.alert("请先选择税务备案事项！");
		mini.get("ssjmxzhzDm").setValue("");
		return;
	}
	ajax.get(url1,"",function(data){
		var resultData = data;
		mini.get('_ssjmxzdlMc').setValue(resultData[0].MC);
		jmxzdl=resultData[0].MC;
		jmxzdlId=resultData[0].ID;
	},function(){
		mini.alert("请求异常，稍后再试！",'提示',function () {
			wssqUtil.closeWin();
		});
	})
	ajax.get(url2,"",function(data){
		var resultData = data;
		mini.get('_ssjmxzxlMc').setValue(resultData[0].MC);
		jmxzxl=resultData[0].MC;
		jmxzxlId=resultData[0].ID;
	},function(){
		mini.alert("请求异常，稍后再试！",'提示',function () {
			wssqUtil.closeWin();
		});
	})
};
zzsjzjt.onDateChanged = function (e) {
	if (e.sender.name == "jmqxq"){
        e.sender.setValue(e.value.getFirstDateOfMonth());
		if(e.value<minDate&&mini.get("jmqxq").getValue()){
			mini.alert("有效期起必须大于2015-07-01");
			mini.get("jmqxq").setValue("")
			return;
		}
		if(!!mini.get("jmqxz").getValue()){
			if (!!e.sender.value && e.sender.value > mini.get("jmqxz").getValue()){
				mini.alert("减免有效期起不能晚于减免有效期止");
				mini.get("jmqxz").setValue("");
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
function SaveData() {
	var newRow = form.getData();

	newRow.jmsspsxMc=mini.get("jmsspsxDm").getText();
	newRow.zsxmDm=10101;
	newRow.zspmMc=zzsjzjt.zspmData[0].MC;
	newRow.zspmDm=zzsjzjt.zspmData[0].ID;
	newRow.jmzcMc=mini.get("ssjmxzhzDm").getText();
	newRow.jmxzdlMc=jmxzdl;
	newRow.jmxzdlDm=jmxzdlId;
	newRow.jmxzxlMc=jmxzxl;
	newRow.jmxzxlDm=jmxzxlId;
	newRow.jmlxMc=mini.get("jmlxDm").getText();
	//newRow.jmfsMc=mini.get("jmfsDm").getText();
	newRow.jmqxq=mini.get("jmqxq").getText();
	newRow.jmqxz=mini.get("jmqxz").getText();
	if(isWho=="add"){
		grid.addRow(newRow,  grid.getData().length);
	}else if(isWho=="edit"){
		grid.updateRow(selectedRowIndex,newRow);
	}

}
function onOk(e) {

	if (!form.validate()) return;
	SaveData();
	mini.get('win1').hide();
	form.reset();
    mini.get('_ssjmxzdlMc').setValue('');
    mini.get('_ssjmxzxlMc').setValue('');
	//wcjyhdkj.oncellendedit();
}
function onCancel(e) {
	//CloseWindow("cancel");
	mini.get('win1').hide();
	form.reset();
    mini.get('_ssjmxzdlMc').setValue('');
    mini.get('_ssjmxzxlMc').setValue('');
}
zzsjzjt.editRow = function (){
	var rows = grid.getSelecteds();
	if (rows.length > 0) {
		mini.get('win1').show();
		if(isWho=="add"){
			var form1 = '<div class="mini-panel-title">编辑</div>'
			$(".mini-panel-header-inner .mini-panel-title").remove();
			$(".mini-panel-header-inner").append(form1);
		}
		//mini.get("jmqxq").setValue(rows[0].jmqxq);
		//mini.get("jmqxz").setValue(rows[0].jmqxz);
		isWho="edit";
		selectedRowIndex=rows[0]._uid;
		form.setData(rows[0]);
	}else{
		mini.alert("请选中一条数据！");
		return;
	}
}
function getSwsxList() {
	var swsxData = new Array();
	var jzjt_gridData=mini.get("jzjt_grid").getData();
	for(var i = 0, len = jzjt_gridData.length; i < len; i++){
		swsxData[i]={
			"swsxMxDm":""
		}
		swsxData[i].swsxMxDm=jzjt_gridData[i].jmsspsxDm;
	}
	return swsxData;

}