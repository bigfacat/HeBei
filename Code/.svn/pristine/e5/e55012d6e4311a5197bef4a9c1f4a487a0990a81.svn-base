var grid,jkgrid,ylgrid,yljkgrid,fbzlGrid,fbzlylGrid;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var wcjyzmhx = {};
stepNav.run=function () {
    //步骤
    stepNav.initSteps([
        {id:0,title:'账户信息',url:'WcjyView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'WcjyylView.aspx',yltj:true},
        {id:3,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();
    grid = mini.get("wcjyzmhx_grid");
    jkgrid = mini.get('jkxx_grid')
    fbzlGrid = mini.get('fbzl-grid');
    ylgrid = mini.get("wcjyzmhx1_grid");
    yljkgrid = mini.get('jkxx1_grid');
    fbzlylGrid = mini.get('fbzl-yl-grid');
    mini.get("nsrsbh").setValue(wssqUtil.nsrjbxx.nsrsbh);
    mini.get("nsrmc").setValue(wssqUtil.nsrjbxx.nsrmc);


    // 征收项目
    wcjyzmhx.zsxmDmData = baseCode.getDataByCodeName('HB_DM_GY_ZSXM.ashx')||[]; // 行政区划下拉框
    mini.get('zsxmDm').setData(wcjyzmhx.zsxmDmData);
    // 凭证种类
    wcjyzmhx.pzzlDmData = baseCode.getDataByCodeName('HB_DM_PZ_PZZL.ashx')||[]; // 行政区划下拉框
    mini.get('pzzlDm').setData(wcjyzmhx.pzzlDmData);


    //************ 前置 资格校验 ********************
    //wcjyzmhx.roleValidate();
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    //wssqUtil.currentSwsxDm = 'SX01';
    var swsxMxDmList = [];
    if(currentIndex==0){
       //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        fbzlAjax(datas,'requestFbzllist');

        // 外出经营申报的申请信息Form
        var formObj = new mini.Form("#wizard");
        formObj.validate();
        if(!formObj.isValid()){
            return;
        }

        // 判断申请表是否进行了填写
        /*var sqbGrid = mini.get("wcjyzmhx_grid");
        if (sqbGrid.getRow(0) == null) {
            mini.alert("输入数据不完整，请填写外出经营活动货物（劳务）信息");
            return false;
        }*/

        // 判断申请表是否进行了填写
        /*var jkxxGrid = mini.get("jkxx_grid");
        if (jkxxGrid.getRow(0) == null) {
            mini.alert("输入数据不完整，请填写外出经营活动缴款信息");
            return false;
        }*/


    }else if(currentIndex==1){
        //判断是否按要求上传附报资料
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);
    }
    else if (currentIndex == 2) {
        var formdata = wcjyzmhx.getTxData();
        //过滤掉当附报资料为非必传且没有上传任何资料的数据
        filterExcessData();
        formdata = mini.encode(formdata);
       /* var postdata = {
            "data":formdata,
            "fbzlList": fbzldata
        };
        postdata = mini.encode(postdata);*/
        var successFlag = false;
        // 第4步 index=2 提交文书申请
        wcjyzmhxService.tj(formdata, function (data) {
            var resultData = mini.decode(data);
            if (!resultData.success) {
                mini.alert(data.message);
            } else {
            	successFlag = true;
            }
        })

        if (!successFlag){
            return false;
        }
    }
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
        ylgrid.setData( grid.getData());
        yljkgrid.setData(jkgrid.getData());
        var wcjyzmTxForm = new mini.Form("#step_tx_form");
        var wcjyzmYlForm = new mini.Form("#step_yl_form");

        wcjyzmYlForm.setData(wcjyzmTxForm.getDataAndText(true));
        /*var wcjyzmhxsqForm = new mini.Form("#wizard");
        var formFields = wcjyzmhxsqForm.getFields();
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
        }*/

    }
};
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','/web-front/bszm-front/apps/views/home/home.html');
};


/**
 *  角色（资格）校验 - 办理业务前置校验
 */
wcjyzmhx.roleValidate = function () {
    // 1、 校验纳税人状态是否正常 [03]
    if (wssqUtil.nsrjbxx.nsrztDm != '03') {
        mini.alert("您的纳税人状态不是正常状态，不能使用该功能，请联系主管税务机关。", "提示",
            function () {
            }
        )
        return false;
    }

    // .... 更多校验 在此添加

}

wcjyzmhx.isCanContinue = false;
wcjyzmhx.isWgzFinishBydj = false;
wcjyzmhx.skipNextEvent = false;
/**
 * 跨区域涉税事项报验管理编号 触发事件
 */
wcjyzmhx.OnWgzbhChanged = function (e){
    wcjyzmhx.isCanContinue = false;
    wcjyzmhx.isWgzFinishBydj = false;
    if(wcjyzmhx.skipNextEvent) {
        wcjyzmhx.skipNextEvent = false;
        return ;
    }

	if(e.value == "" || e.value == null){
		mini.alert("请选择“跨区域涉税事项报验管理编号”");
	}
	else{
        wcjyzmhx.initWidget(); // 初始化

		var wcjyhdssglzmbh = e.sender.text;//mini.get("wcjyhdssglzmbh").text;
		wcjyzmhxService.getJyzmYxqByWgzbh(wcjyhdssglzmbh, function (data) {
	        if (!data.success) {
	            mini.alert("系统忙，请稍后重试！");//查询外管证编号有效期失败
	        } else {
	        	var resultData = data.value;
	        	mini.get("zmyxqq").setValue(resultData.zmyxqxq);
				mini.get("zmyxqz").setValue(resultData.zmyxqxz);
				var rq = resultData.zmyxqxz;
				var minTime = new Date(rq);
				var nowTime = new Date();
				var days= nowTime.getTime() - minTime.getTime();
				var time = parseInt(days / (1000 * 60 * 60 * 24));
				if(time>10){
					mini.alert("该《跨区域涉税事项报告》逾期核销，请到税务机关接受处罚");
				} else {
                    wcjyzmhx.isCanContinue = true;
                }
	        }
	    });
        // 判断上一步处理结果
		if (!wcjyzmhx.isCanContinue) {
            return false;
        }
        /**
         * 设置报验时间和经营地点值
         */
        wcjyzmhx.isCanContinue = false;

		var wcjyzmuuid = e.value;
		wcjyzmhxService.getBysjAndJYdd(wcjyzmuuid, function (data){
			if (!data.success) {
				mini.alert("系统忙，请稍后重试!");//查询报验时间和经营地失败
			} else {
				var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    /*mini.get("sjjyqq").setValue(resultData[0].sjjyqjq);	//实际经营期起
                    mini.get("sjjyqz").setValue(resultData[0].sjjyqjz);	//实际经营期止
                    mini.get("ddrq").setValue(resultData[0].ddrq);	//到达日期
                    mini.get("hwcfdd").setValue(resultData[0].hwcfdd);	//货物存放地点*/
                    mini.get("jydd").setValue(resultData[0].wcjyd); //经营地点
                    mini.get("byrq").setValue(resultData[0].bysj);  //报验日期
                    wcjyzmhx.isWgzFinishBydj = true;
                    wcjyzmhx.isCanContinue = true;
                } else {
                    mini.alert("您尚未进行报验登记，请确认是否核销该外管证!点击确定可继续核销！");
                    wcjyzmhx.isCanContinue = false;
                }
			}
		});
        // 判断上一步处理结果
        if (!wcjyzmhx.isCanContinue) {
            return false;
        }

        /*grid.clearRows();
        jkgrid.clearRows();*/

        /**
         * 获取外出经营申报基本信息
         */
        wcjyzmhx.isCanContinue = false;
        wcjyzmhxService.getWcjySbJbxx(wcjyhdssglzmbh, function (data){
            if (data.success)  {
                var resultData = data.value;
                if (!!resultData && !!resultData.wcjyhdqksbuuid) {
                    wcjyzmhx.sbUUID = resultData.wcjyhdqksbuuid;
                    mini.get("sjjyqq").setValue(resultData.sjjyqjq);	//实际经营期起
                    mini.get("sjjyqz").setValue(resultData.sjjyqjz);	//实际经营期止
                    mini.get("ddrq").setValue(resultData.ddrq);	//到达日期
                    mini.get("hwcfdd").setValue(resultData.hwcfdd);	//货物存放地点
                    wcjyzmhx.isCanContinue = true;
                }
            }
        });
        // 已报验登记 且 未申报
        if (wcjyzmhx.isWgzFinishBydj && !wcjyzmhx.isCanContinue) {
            mini.alert("纳税人的该外管证尚未进行外出经营活动情况申报，不允许核销!");
            wcjyzmhx.skipNextEvent = true;
            e.sender.setText("");
            e.sender.setValue("");
            return false;
        }

        // 判断上一步处理结果
        if (!wcjyzmhx.isCanContinue) {
            return false;
        }

        /**
         * 获取外出经营申报货物信息
         */
        wcjyzmhxService.getWcjySbHwxx(wcjyzmhx.sbUUID, function (data){
            if (data.success){
                var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    grid.clearRows();
                }
                if ($.isArray(resultData)) {
                    $.each(resultData, function (i, n) {
                        grid.addRow(resultData[i],  grid.getData().length);
                    });
                }
            }
        });

        /**
         * 获取外出经营申报完税信息
         */
        wcjyzmhxService.getWcjySbWsxx(wcjyzmhx.sbUUID, function (data){
            if (data.success) {
                var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    jkgrid.clearRows();
                }
                if ($.isArray(resultData)) {
                    $.each(resultData, function (i, n) {
                        resultData[i].zsxmDmText = baseCode.getMcById('HB_DM_GY_ZSXM.ashx', resultData[i].zsxmDm);
                        resultData[i].zspmDmText = baseCode.getMcById('HB_DM_GY_ZSPM', resultData[i].zspmDm);
                        resultData[i].pzzlDmText = baseCode.getMcById('HB_DM_PZ_PZZL.ashx', resultData[i].pzzlDm);
                        jkgrid.addRow(resultData[i],  grid.getData().length);
                    });
                }
            }
        });

	}
}

/**
 * 初始化页面 控件的初始值
 *
 * @param e
 * @author zhangjun
 */
wcjyzmhx.initWidget = function(e) {
    mini.get("sjjyqq").setValue('');	//实际经营期起
    mini.get("sjjyqz").setValue('');	//实际经营期止
    mini.get("ddrq").setValue('');	//到达日期
    mini.get("hwcfdd").setValue('');	//货物存放地点
    mini.get("jydd").setValue(''); //经营地点
    mini.get("byrq").setValue('');  //报验日期
    grid.clearRows();
    jkgrid.clearRows();
}


/**
 * 当征收项目改变时
 *
 * @param e
 */
wcjyzmhx.onZsxmDmChanged = function(e) {
    var zsxmDm = e.value;
    if(!!zsxmDm) {
        wcjyzmhxService.Api.getZspmUrl = wcjyzmhxService.Api.getZspmBaseUrl + "&filterVal=" + zsxmDm;
    }
    mini.get("zspmDm").setUrl(wcjyzmhxService.Api.getZspmUrl);
}


/**
 * 获取填写数据
 *
 * @returns {{wcjyzmhxsqForm: mini.Form, wcjyzmhxsqFormData: *}}
 */
wcjyzmhx.getTxData = function () {
    // 外出经营证明的申请信息Form
    var wcjyzmhxsqForm = new mini.Form("#wizard");
    var wcjyzmhxsqFormData = wcjyzmhxsqForm.getData();

    //货物或劳务信息
    var wcjyzmhxHwxxFormData = mini.get("wcjyzmhx_grid").getData();
    //缴款信息情况
    var wcjyzmhxjnskxxGridData = mini.get("jkxx_grid").getData();
    var wcjyzmhxsqb = {
    		wcjyzmhxhwxxGrid:{//货物信息
    			wcjyzmhxhwxxGridlb:[]
    		},
    		wcjyzmhxlwxxGrid:{//劳务信息
	            wcjyzmhxlwxxGridlb:[]
	        },
    		wcjyzmhxjnskxxGrid:{//缴税款信息
    			wcjyzmhxjnskxxGridlb:[]
    		},
	        zmWcjyzmhxxxVO:{
	            wcjyhdssglzmbh:mini.get("wcjyhdssglzmbh").text,
	            wcjyzmuuid:wcjyzmhxsqFormData.wcjyhdssglzmbh
	        }

    }

    if($.isArray(wcjyzmhxHwxxFormData)) {
        $.each(wcjyzmhxHwxxFormData, function (i, n) {
        	wcjyzmhxsqb.wcjyzmhxhwxxGrid.wcjyzmhxhwxxGridlb[i] = wcjyzmhxHwxxFormData[i];
        	wcjyzmhxsqb.wcjyzmhxhwxxGrid.wcjyzmhxhwxxGridlb[i].hwxse = 0.0; //货物销售额
        	wcjyzmhxsqb.wcjyzmhxhwxxGrid.wcjyzmhxhwxxGridlb[i].xshwjnsk = 0.0; //销售货物缴纳税额
            wcjyzmhxsqb.wcjyzmhxhwxxGrid.wcjyzmhxhwxxGridlb[i].yxbz = 'Y';
            wcjyzmhxsqb.wcjyzmhxhwxxGrid.wcjyzmhxhwxxGridlb[i].sjgsdq = wssqUtil.nsrjbxx.sjgsdq;
        });
    }
    if ($.isArray(wcjyzmhxjnskxxGridData)) {
        $.each(wcjyzmhxjnskxxGridData, function (j, m) {
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j] = {};
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].pzhm = wcjyzmhxjnskxxGridData[j].pzhm; //凭证号码
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].pzzlDm = wcjyzmhxjnskxxGridData[j].pzzlDm; //凭证种类代码
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].sjje = wcjyzmhxjnskxxGridData[j].sjje; //实缴税额
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].zspmDm = wcjyzmhxjnskxxGridData[j].zspmDm; //征收品目代码
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].zsxmDm = wcjyzmhxjnskxxGridData[j].zsxmDm; //征收项目代码
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].dzsphm = wcjyzmhxjnskxxGridData[j].dzsphm; //电子税票号码
        	wcjyzmhxsqb.wcjyzmhxjnskxxGrid.wcjyzmhxjnskxxGridlb[j].yxbz = "Y";
        });

    }

    return {
    	"djxh":wssqUtil.nsrjbxx.djxh, //获取缓存djxh
    	"lcslid":"",
        "wcjyzmhxsqb" : wcjyzmhxsqb
    };
}



function onJkxxCellBeginEdit(e) {
    var field = e.field;
    var record = e.record;
    var editor = e.editor;
    if (field=="zspmDm") {
        if (id) {
            if(!!wcjyzmhxService.Api.getZspmUrl){
                editor.setUrl(wcjyzmhxService.Api.getZspmUrl);
            }
        } else {
            e.cancel = true;
        }
    }
}



function oncellcommitedit(e) {
    var field = e.field;
    var record = e.record;
    var editor = e.editor;
    if (field=="zsxmDm" || field=="zspmDm" || field== "pzzlDm") {
        if (id) {
            record[field + 'Text']= editor.getText();
        } else {
            e.cancel = true;
        }
    }
}


wcjyzmhx.OnWgzbhChanged = function (e){
    wcjyzmhx.isCanContinue = false;
    wcjyzmhx.isWgzFinishBydj = false;
    if(wcjyzmhx.skipNextEvent) {
        wcjyzmhx.skipNextEvent = false;
        return ;
    }

	if(e.value == "" || e.value == null){
		mini.alert("请选择“跨区域涉税事项报验管理编号”");
	}
	else{
        wcjyzmhx.initWidget(); // 初始化

		var wcjyhdssglzmbh = e.sender.text;//mini.get("wcjyhdssglzmbh").text;
		wcjyzmhxService.getJyzmYxqByWgzbh(wcjyhdssglzmbh, function (data) {
	        if (!data.success) {
	            mini.alert("系统忙，请稍后重试！");//查询外管证编号有效期失败
	        } else {
	        	var resultData = data.value;
	        	mini.get("zmyxqq").setValue(resultData.zmyxqxq);
				mini.get("zmyxqz").setValue(resultData.zmyxqxz);
				var rq = resultData.zmyxqxz;
				var minTime = new Date(rq);
				var nowTime = new Date();
				var days= nowTime.getTime() - minTime.getTime();
				var time = parseInt(days / (1000 * 60 * 60 * 24));
				if(time>10){
					mini.alert("该《跨区域涉税事项报告》逾期核销，请到税务机关接受处罚");
				} else {
                    wcjyzmhx.isCanContinue = true;
                }
	        }
	    });
        // 判断上一步处理结果
		if (!wcjyzmhx.isCanContinue) {
            return false;
        }
        /**
         * 设置报验时间和经营地点值
         */
        wcjyzmhx.isCanContinue = false;

		var wcjyzmuuid = e.value;
		wcjyzmhxService.getBysjAndJYdd(wcjyzmuuid, function (data){
			if (!data.success) {
				mini.alert("系统忙，请稍后重试!");//查询报验时间和经营地失败
			} else {
				var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    /*mini.get("sjjyqq").setValue(resultData[0].sjjyqjq);	//实际经营期起
                    mini.get("sjjyqz").setValue(resultData[0].sjjyqjz);	//实际经营期止
                    mini.get("ddrq").setValue(resultData[0].ddrq);	//到达日期
                    mini.get("hwcfdd").setValue(resultData[0].hwcfdd);	//货物存放地点*/
                    mini.get("jydd").setValue(resultData[0].wcjyd); //经营地点
                    mini.get("byrq").setValue(resultData[0].bysj);  //报验日期
                    wcjyzmhx.isWgzFinishBydj = true;
                    wcjyzmhx.isCanContinue = true;
                }
			}
		});
        // 判断上一步处理结果
        if (!wcjyzmhx.isCanContinue) {
            return false;
        }

        /*grid.clearRows();
        jkgrid.clearRows();*/

        /**
         * 获取外出经营申报基本信息
         */
        wcjyzmhx.isCanContinue = false;
        wcjyzmhxService.getWcjySbJbxx(wcjyhdssglzmbh, function (data){
            if (data.success)  {
                var resultData = data.value;
                if (!!resultData && !!resultData.wcjyhdqksbuuid) {
                    wcjyzmhx.sbUUID = resultData.wcjyhdqksbuuid;
                    mini.get("sjjyqq").setValue(resultData.sjjyqjq);	//实际经营期起
                    mini.get("sjjyqz").setValue(resultData.sjjyqjz);	//实际经营期止
                    mini.get("ddrq").setValue(resultData.ddrq);	//到达日期
                    mini.get("hwcfdd").setValue(resultData.hwcfdd);	//货物存放地点
                    wcjyzmhx.isCanContinue = true;
                }
            }
        });
        // 已报验登记 且 未申报
        if (wcjyzmhx.isWgzFinishBydj && !wcjyzmhx.isCanContinue) {
            mini.alert("纳税人的该外管证尚未进行外出经营活动情况申报，不允许核销!");
            wcjyzmhx.skipNextEvent = true;
            e.sender.setText("");
            e.sender.setValue("");
            return false;
        }

        // 判断上一步处理结果
        if (!wcjyzmhx.isCanContinue) {
            return false;
        }

        /**
         * 获取外出经营申报货物信息
         */
        wcjyzmhxService.getWcjySbHwxx(wcjyzmhx.sbUUID, function (data){
            if (data.success){
                var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    grid.clearRows();
                }
                if ($.isArray(resultData)) {
                    $.each(resultData, function (i, n) {
                        grid.addRow(resultData[i],  grid.getData().length);
                    });
                }
            }
        });

        /**
         * 获取外出经营申报完税信息
         */
        wcjyzmhxService.getWcjySbWsxx(wcjyzmhx.sbUUID, function (data){
            if (data.success) {
                var resultData = data.value;
                if (!!resultData && resultData.length > 0) {
                    jkgrid.clearRows();
                }
                if ($.isArray(resultData)) {
                    $.each(resultData, function (i, n) {
                        resultData[i].zsxmDmText = baseCode.getMcById('HB_DM_GY_ZSXM.ashx', resultData[i].zsxmDm);
                        resultData[i].zspmDmText = baseCode.getMcById('HB_DM_GY_ZSPM', resultData[i].zspmDm);
                        resultData[i].pzzlDmText = baseCode.getMcById('HB_DM_PZ_PZZL.ashx', resultData[i].pzzlDm);
                        jkgrid.addRow(resultData[i],  grid.getData().length);
                    });
                }
            }
        });

	}
}

