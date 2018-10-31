var grid, ylgrid, fbzlGrid,ylfbzlgrid;
stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var wcjyhdkj = {};
wcjyhdkj.successFlag = false;
var getAccountInfo; // 登录用户信息
stepNav.run = function () {
    //步骤
    stepNav.initSteps([
        {id: 0, title: '账户信息', url: 'WcjyView.aspx', js: true},
        // {id: 1, title: '上传附报资料', url: '../public/fbzl/FbzlView.html', js: true},
        {id: 2, title: '预览提交', url: 'WcjyylView.aspx', yltj: true},
        {id: 3, title: '审核中', url: '../public1/shz/shz.aspx', js: true},
        {id: 4, title: '完成', url:'../public1/wc/wc.aspx',js:true}
    ]);

    mini.parse();
    grid = mini.get("wcjyzm_grid");
    fbzlGrid = mini.get('fbzl-grid');
    ylgrid = mini.get("wcjyzm1_grid");
    ylfbzlgrid = mini.get("fbzl-yl-grid");
	var qysds = mini.get("qysds");
	
    wcjyhdkj.selectSwjgWin = mini.get('select-swjg-win');// 选择税务机关弹框
    wcjyhdkj.selectedSwjg = wssqUtil.nsrjbxx.zgswjDm; // 选择的税务机关
    wcjyhdkj.swjgListRadio = mini.get('swjg-list'); // 税务机关列表

    wcjyhdkj.doInitData();

    //前置校验 智数中心来控制
    //wcjyhdkj.roleValidate();

    /*放开代码*/
	//var btn = ' <button id="xzwcjyzm-btn">下载跨区域税务事项报告表</button> ';
    //$('#actions').append(btn);
    // 打印外管证
    //$("#xzwcjyzm-btn").click(function () {
    //    window.open('/wszx-web/api/wgz/wcjyzmkj/download/pdf');
    //});

    // 外出经营证明开具  打印外管证
    /*var btn = ' <button id="xzwcjyzm-btn">下载外出经营证明</button> ';
    $('#actions').append(btn);*/
	
	// 跨区域经营情况 默认添加一条
	grid.addRow({}, 1);
	
	// 企业所得税 数据
	qysds.setData([
		{ 'ID': '1', 'MC': '国税'},
		{ 'ID': '2', 'MC': '地税'},
		{ 'ID': '0', 'MC': '无企业所得税'},
	]);


};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
   //wssqUtil.currentSwsxDm = 'SX01';
    var swsxMxDmList = [];
    if (currentIndex == 0) {
        //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        // fbzlAjax(datas,'requestFbzllist'); // 暂时不用附报资料

        //fbzlAjax({},'oldFbzllist');
        // 外出经营证明的申请信息Form
        var formObj = new mini.Form("#wizard");
        formObj.validate();
        if(!formObj.isValid()){
            return;
        }

        // 判断申请表是否进行了填写
        var sqbGrid = mini.get("wcjyzm_grid");
	    var kqyjyData = sqbGrid.getRow(0);
	    
		//合同编号长度
		if( kqyjyData.htbh && kqyjyData.htbh.len() > 60 ){
			mini.showTips({
				content: '合同编号输入太长，限制60个字符',
				state: 'warning',
				offset: [150, 150]
			});
			return false;
		}
		
        if (sqbGrid.getRow(0) == null) {
            mini.alert("输入数据不完整，请填写跨区域涉税事项报告申请表"); // 外出经营证明开具
            return false;
        }
		
		
	
	    if( !kqyjyData.htmc || !kqyjyData.wcjyhwyxqxq || !kqyjyData.wcjyhwyxqxz || !kqyjyData.wcjyhwzz ){
		    mini.alert("输入数据不完整，跨区域经营情况除“合同编号”外全部为必填"); // 外出经营证明开具
		    return false;
	    }
		
		
		
		
		wcjyhdkj.validateSqRqGridData();
        // 判断明细最大时间和最小时间差是否大于180天
        // if (!wcjyhdkj.validateSqRqGridData()) {
        //     mini.alert("证明有效期止不得超过证明有效期起180日！");
        //     return false;
        // }
    }
    // else if(currentIndex == 1){
    //     //判断是否按要求上传附报资料
    //     // if(!isCondition()){  // 不需要附报资料判断
    //     //     return;
    //     // }
    //     // ylfbzlgrid.setData(fbzldata);
    // }
    else if (currentIndex == 1) {
        var formdata = wcjyhdkj.getTxData();
        //console.log(mini.encode(formdata));
        /*var postdata = {
            "fbzlList": fbzldata
        };*/
        //console.log(formdata);
        //return false;
        //postdata = mini.encode(postdata);
        //console.log(postdata);
        wcjyhdkj.successFlag = false;

        // 第4步 index=3  提交文书申请
        wcjyzmkjService.tj(formdata, function (data) {
            var resultData = mini.decode(data);
            if (!resultData.success) {
                mini.alert(data.message);
            } else {
                wcjyhdkj.successFlag = true;
                // 打印外管证
               $("#xzwcjyzm-btn").click(function () {
                    //window.open('/wszx-web/api/wgz/wcjyzmkj/download/pdf/' + resultData.value.sqxh);
					window.open('/wszx-web/api/wgz/wcjyzmkj/download/pdf/kqysssxbg/' + resultData.value.sqxh);
                });
            }
        });

        if (!wcjyhdkj.successFlag){
            return false;
        }
    }
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if (currentIndex == 1) {
        //var wcjyzmkjsqForm = new mini.Form("#wizard");
        ylgrid.setData(grid.getData());

        var wcjyzmTxForm = new mini.Form("#step_tx_form");
        var wcjyzmYlForm = new mini.Form("#step_yl_form");
	    wcjyhdkj.formBaseData = wcjyzmTxForm.getDataAndText(true);
        wcjyzmYlForm.setData( wcjyhdkj.formBaseData );
        //
        mini.get('wcjyd_yl').setTooltip( wcjyhdkj.formBaseData.wcjyd );
        mini.get('kqyjyd').setTooltip( wcjyhdkj.formBaseData.kqyjyd );
        /*var formFields = wcjyzmkjsqForm.getFields();
        for (var t in formFields) {
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
    else if (currentIndex == 3) {

    }


    return true;
};
stepNav.onFinished = function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用', '我的办税大厅', '/web-front/bszm-front/apps/views/home/home.html');
};

/**
 *  初始化数据
 */
wcjyhdkj.doInitData = function () {
    mini.get("nsrsbh").setValue(wssqUtil.nsrjbxx.nsrsbh);
    mini.get("nsrmc").setValue(wssqUtil.nsrjbxx.nsrmc);
    //mini.get("djzclxDm").setValue(wssqUtil.nsrjbxx.djzclxDm);
    mini.get("swdjd").setValue(wssqUtil.nsrjbxx.scjydz);
    //jQuery("#djzclxMc").html(mini.get("djzclxDm").getText());

	if( !getAccountInfo ){
		getAccountInfo = nsrxxUtil.getAccountInfo();
	}
	
    mini.get("lxrxm").setValue( getAccountInfo.fullName);
    mini.get("lxdh").setValue( getAccountInfo.mobile);

    mini.get("djzclxDmText").setValue(baseCode.getMcById("DM_DJ_DJZCLX.ashx" ,wssqUtil.nsrjbxx.djzclxDm));

}

/**
 *  角色（资格）校验 - 办理业务前置校验
 */
wcjyhdkj.roleValidate = function () {
    // 1、 校验纳税人状态是否正常 [03]
    /*if (wssqUtil.nsrjbxx.nsrztDm != '03') {
        mini.alert("您的纳税人状态不是正常状态，不能使用该功能，请联系主管税务机关。", "提示",
            function () {
                window.location.href = wcjyzmkjService.Api.mainPage;
            }
        )
        return false;
    }*/

    // 2、 检查是否存在超过10日未核销外管证
    /*wcjyzmkjService.checkWhxWgz({}, function (data) {
        var resultData = mini.decode(data);
        if (!resultData.success) {
            window.location.href = wcjyzmkjService.Api.mainPage;
        }
    })*/

    // .... 更多校验 在此添加

}

wcjyhdkj.wgzList = "";

/* 初始化纳税人名下所有外管证信息 -- 用于校验一地一证 */
function initNsrWgzList(){
    // 若已经初始化，则直接返回
    if (!!wcjyhdkj.wgzList) {
        return;
    }
    // 初始化 纳税人名下所有外管证
    wcjyzmkjService.getWgzList(function (result) {
        if (result.success){
            wcjyhdkj.wgzList = result.value;
        }
    });

}

/**
 * [一地一证校验] 当前行政区划下是否存在外管证
 *
 * @param xzqhszDm 行政区划代码
 * @param xzqhszDmText 行政区划
 */
function isWgzExistInXzqh(xzqhszDm, xzqhszDmText) {
    var result = true;
    if (!!wcjyhdkj.wgzList){
        if ($.isArray(wcjyhdkj.wgzList)) {
            $.each(wcjyhdkj.wgzList, function (i, n) {
                if (xzqhszDm == wcjyhdkj.wgzList[i]["wcjydxzqhszDm"]){
                    mini.alert("您当前在"+ xzqhszDmText + "存在未核销外出经营证明, 不得再次开具！");
                    result = false;
                    return result;
                }
            });
        }
    }
    return result;
}


/**
 * 是否选中经营方式建筑安装
 *
 * @param e
 * @returns {number}
 */
function isChooseJyfsJzaz() {
    var result = 0;

    var jyfsStr = mini.get("jyfs").getValue();
    var jyfsArr = jyfsStr.split(",");
    if(jyfsArr.length > 0){
        for(var i=0;i<jyfsArr.length;i++){
            if(!!!jyfsArr[i]){
                continue;
            }
            //判断经营方式是否为"建筑安装"
            if(jyfsArr[i] == "19"){
                result = 1;
            } else{
                result = -1;
            }
        }
    }

    return result ;
}

/**
 * 纳税人是否建筑安装行业
 *
 * @param e
 * @returns {number}
 */
function isJzazhyNsr() {
    //判断行业代码大类是否为47、48、49、50
    var hyDm = wssqUtil.nsrjbxx.hyDm;
    var subHyDm = hyDm.substring(0, 2);
    var hyArr = new Array();
    hyArr.push(subHyDm);
    //查询副营行业信息
    $.ajax({
        url: wcjyzmkjService.Api.getFyhy,
        type: "POST",
        async: false,
        success: function (data) {
            var resultData = mini.decode(data);
            if (!("" == resultData || null == resultData || "" == resultData.value || null == resultData.value || 0 == resultData.value.length)) {
                for (var i = 0; i < resultData.value.length; i++) {
                    hyArr.push(resultData.value[i].hyDm.substring(0, 2));
                }
            }
        }
    });
    var tmpFlag = false;
    for (var j = 0; j < hyArr.length; j++) {
        if (hyArr[j] == "47" || hyArr[j] == "48" || hyArr[j] == "49" || hyArr[j] == "50") {
            return true;
        }
    }
    return false;
}


/**
 *  当行政区划改变时，触发事件
 *
 * @param e
 */
wcjyhdkj.onXzqhChanged = function (e) {
    var xzqhszDm = e.value;
    var xzqhszDmText = e.sender.text;

    // 当选中经营方式  且非建筑安装时 或者纳税人行业不是建筑安装行业时
    if (isChooseJyfsJzaz() == -1 || !isJzazhyNsr){
        initNsrWgzList();
        // if (!isWgzExistInXzqh(xzqhszDm, xzqhszDmText)) {
        //     mini.get("wcjydxzqh").setValue("");
        //     mini.get("wcjydxxdzDm").setValue("");
        //     return false;
        // }
    }


    mini.get("wcjydxxdzDm").setValue("");
    if(!!!xzqhszDm){
        mini.get("wcjydxxdzDm").setData([]);
        return;
    }
	

				
    // 街道乡镇下拉初始化
    wcjyzmkjService.getJdxz({xzqhDm: xzqhszDm},
        function (result) {
            mini.get("wcjydxxdzDm").setData(result);
            if(mini.encode(result) == "[{}]"){
                 mini.get("wcjydxxdzDm").required=false;
				// mini.get("wcjyd").required=true;
				
                document.getElementById("jdxzdiv").style.display="none";

                
                document.getElementById("wcjyddiv").style.display="";
				
				mini.get("wcjyd").setVtype ? mini.get("wcjyd").setVtype('required;maxLength:80') : '';
				//mini.get("wcjydxxdzDm").setVtype ? mini.get("wcjydxxdzDm").setVtype('') : '';
				mini.get("wcjydxxdzDm").setIsValid(true);
				mini.get("wcjyd").setIsValid(false);
            }else{
                mini.get("wcjyd").required=false;
				mini.get("wcjydxxdzDm").required=true;
                document.getElementById("wcjyddiv").style.display="none";
                document.getElementById("jdxzdiv").style.display="";
				
				mini.get("wcjyd").setIsValid(true);
				mini.get("wcjydxxdzDm").setIsValid(false);
				
				//mini.get("wcjyd").setVtype ? mini.get("wcjyd").setVtype('maxLength:80') : '';
				//mini.get("wcjydxxdzDm").setVtype ? mini.get("wcjydxxdzDm").setVtype('required') : '';
				
                mini.get("wcjydxxdzDm").setData(result);
                // 获取税务机关列表
                if(parseInt(wcjyzmkjService.getWcjyMode())===2){
                    wcjyzmkjService.getSwjgList({xzqhDm: xzqhszDm},function (result) {
                        if(result.success){
                            if(result.value){
                                if (result.value.length === 1) {
                                    wcjyhdkj.selectedSwjg = result.value[0].swjgDm;
                                } else if(result.value.length > 1){
                                    wcjyhdkj.swjgListRadio.setData(result.value);
                                    wcjyhdkj.selectSwjgWin.show();
                                }
                            }
                        }else{
                            mini.alert(result.message);
                            return false;
                        }
                    })
                }

            }
        }
    );


};


/**
 *  点击下一步的时候对最大时间和最小时间差是否大于180天判断
 *
 * @returns {boolean}
 */
wcjyhdkj.validateSqRqGridData = function () {
    var arrObj = new Array();
    var hwxx = grid.getData();
    for (var i = 0; i < hwxx.length; i++) {
        arrObj.push(hwxx[i].wcjyhwyxqxq.replace(/\-/g, ''));
        arrObj.push(hwxx[i].wcjyhwyxqxz.replace(/\-/g, ''));
    }

    //对传入的数据排序
    function creatComationFuntion(object1, object2) {
        if (object1 > object2) {
            return 1;
        } else if (object1 < object2) {
            return -1;
        } else {
            return 0;
        }
    }

    arrObj.sort(creatComationFuntion);
    var min = arrObj[0];
    var max = arrObj[arrObj.length - 1];
    min = min.substring(0, 4) + '/' + min.substring(4, 6) + '/' + min.substring(6, 8);
    max = max.substring(0, 4) + '/' + max.substring(4, 6) + '/' + max.substring(6, 8);
    wcjyhdkj.zmyxqxq = min;
    wcjyhdkj.zmyxqxz = max;
    var minTime = new Date(min);
    var maxTime = new Date(max);
    var days = maxTime.getTime() - minTime.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24));
    if (isJzazhyNsr) {
        return true;
    }
    if (time > 180) {
        return false;
    }
    return true;

}


/**
 * 获取grid的合计值
 *
 * @returns {htzje:""}
 */
wcjyhdkj.getSumData = function () {
    var sum = 0;
    var targetobj = {};
    hwarrayObj = grid.getData();
    if ($.isArray(hwarrayObj)) {
        $.each(hwarrayObj, function (i, n) {
            sum += parseFloat(hwarrayObj[i]["wcjyhwzz"]);
        });
    }
    targetobj["htzje"] = sum;
    return targetobj;

}
/*删除外出经营证明开具申请表*/
wcjyhdkj.deletSqb = function(){
    var lwhwSelecteds = grid.getSelecteds();
    if(grid.getData().length ==0){
        mini.alert("没有可以删除的数据");
        return ;
    }
    if(lwhwSelecteds.length){
        mini.confirm('确定删除选中的记录吗？','提示',function(action){
            if(action == "ok"){
                grid.removeRows(lwhwSelecteds);
                var objHj = wcjyhdkj.getSumData();
                if (!isNaN(objHj["htzje"])) {
                    mini.get("htzje").setValue(objHj["htzje"]);
                } else {
                    mini.get("htzje").setValue("");
                }

            }
        });
    }else{
        mini.alert("请选中一条纪录");
    }

}


/**
 * 编辑结束时发生
 *
 */
wcjyhdkj.oncellendedit = function (e) {

    // 计算合计金额和总计金额
    var objHj = wcjyhdkj.getSumData();
    if (!isNaN(objHj["htzje"])) {
        mini.get("htzje").setValue(objHj["htzje"]);
    } else {
        mini.get("htzje").setValue("");
    }

    if (!!e && (e.field == 'wcjyhwyxqxz')){
        if (!!e.record.wcjyhwyxqxz && !!e.record.wcjyhwyxqxq){
            if (mini.parseDate(e.record.wcjyhwyxqxz) < mini.parseDate(e.record.wcjyhwyxqxq)){
                //mini.alert("合同有效期止不能早于合同有效期起");
                e.sender.updateRow(e.row, {wcjyhwyxqxz:""});
                return;
            }
        }
        
        if (!!e.record.wcjyhwyxqxz){
            if (e.record.wcjyhwyxqxz < new Date().format('yyyy-MM-dd')){
                //mini.alert("合同有效期限止必须大于当前日期");
                e.sender.updateRow(e.row, {wcjyhwyxqxz:""});
                return;
            }
        }
    }
    if (!!e && (e.field == 'wcjyhwyxqxq')){
        if (!!e.record.wcjyhwyxqxz && !!e.record.wcjyhwyxqxq){
            if (mini.parseDate(e.record.wcjyhwyxqxq) > mini.parseDate(e.record.wcjyhwyxqxz)){
                //mini.alert("合同有效期起不能晚于合同有效期止");
                e.sender.updateRow(e.row, {wcjyhwyxqxq:""});
                return;
            }
        }
    }


}

/**
 * 禁止选中父节点
 * @param e
 */
wcjyhdkj.beforeNodeSelect = function (e) {
    e.tree.expandOnNodeClick = true;
    //禁止选中父节点
    if (e.isLeaf == false) {
        e.cancel = true;
    }
};

/**
 * 当街道乡镇变化时
 * @param e
 */
wcjyhdkj.onJdxzChanged = function (e){
    var wcjyd = mini.get("wcjydxxdzDm").text;

    mini.get("wcjyd").setValue(wcjyd);
}

/**
 * 获取填写数据
 * @returns {{wcjyzmkjsqForm: mini.Form, wcjyzmkjsqFormData: *, wcjyzm: *, wcjyzmData: *}}
 */
wcjyhdkj.getTxData = function () {
    // 外出经营证明的申请信息Form
    var wcjyzmkjsqForm = new mini.Form("#wizard");
    var wcjyzmkjsqFormData = wcjyzmkjsqForm.getData();

    // 外出经营证明的申请货物的dataGrid
    var wcjyzmDataGrid = mini.get("wcjyzm_grid").getData();//mini.decode(mini.encode(mini.get("wcjyzm_grid").getData(),'yyyy-MM-dd'));

    //var nsrxxJson = mini.encode(nsrData); 取纳税人缓存
    //wcjyzmkjsqFormData = mini.encode(wcjyzmkjsqFormData);
    //var wcjyzmDataGridData = mini.encode(wcjyzmDataGrid);

    var SwjgVO = {
        zmyxqxq: wcjyhdkj.zmyxqxq,//证明有效期起 (取合同起止) yyyy-MM-dd
        zmyxqxz: wcjyhdkj.zmyxqxz,//证明有效期止 yyyy-MM-dd
        htdfnsrsbh: wcjyzmkjsqFormData.htdfnsrsbh,
        htdfnsrdjxh: "",
        htdfnsrmc: wcjyzmkjsqFormData.htdfnsrmc
    };
	if( !getAccountInfo ){
		getAccountInfo = nsrxxUtil.getAccountInfo();
	}
    var wjcyzmsqb = {
        insertHwxxGrid: {
            wcjyzmhwxxGridlb: []
        },
        zmWcjyhdssglzmxxVO: {
            djxh: wssqUtil.nsrjbxx.djxh,//取纳税缓存的djxh
            wcjyzmuuid: "",
            zg: "",
            nh: "",
            wh: "",
            swjgjg: "",
            jdxzDm: mini.get("wcjydxxdzDm").getValue(),
            swjgjbrxm: "",
            swjgfzrxm: "",
            bylcslid: "",
            hxrq: "",
            hxlcslid: "",
            byrq: "",
            ywpzuuid: "",
            zfbz1: "N",
            zfrDm: "",
            zfrq1: "",
            dzwgzbz: "",
            jydswjgDm: "",
            jydswjgmc: "",
            yxbz: "Y",
            wszzgzDm: "",
            wcjyhdssglzmffdw: "", //传税务机关代码  -- 需确认传空是否有问题
            jyfsdmjhmc: mini.get("jyfs").getText(),
            sqr: mini.get("lxrxm").getValue(),
            lxr: mini.get("kqysssxlxr").getValue(), //mini.get("kqysssxlxr").getValue(), //
            lxdh: mini.get("lxrzj").getValue() || '', //jbrzj  mini.get("lxrsjh").getValue(), // 跨区域
            htdfnsrsbh: wcjyzmkjsqFormData.htdfnsrsbh,
            htdfnsrdjxh: "",
            htdfnsrmc: wcjyzmkjsqFormData.htdfnsrmc,
            wcjyd: mini.get("kqyjyd").getValue(),//mini.get("wcjyd").getValue(),
            swdjd: mini.get("swdjd").getValue(),
            swdjdswjgyj: "",
            jyfsdmjh: mini.get("jyfs").getValue(),//取页面的经营方式 多个时候用,分割
            wcjyhtzje: mini.get("htzje").getValue(),
            wcjydxzqhszDm:mini.get("wcjydxzqh").getValue(),
            ywcjyhdssglzmbh: "",
            wcjyhdssglzmbh: "",
            sjgsdq: wssqUtil.nsrjbxx.sjgsdq,
            wcjyzhyDm: wssqUtil.nsrjbxx.hyDm,
            zmyxqxq: wcjyhdkj.zmyxqxq, // 证明有效期起 (取合同起止) yyyy-MM-dd
            zmyxqxz: wcjyhdkj.zmyxqxz, // 证明有效期止 yyyy-MM-dd
            
            // 增加的字段
	        qysdsgljgbz: wcjyhdkj.formBaseData.qysds || '', //wcjyhdkj.formBaseData,
	        kjzmuuid: '',
	        kjswjgDm: wcjyhdkj.selectedSwjg,
	        lxrsj: mini.get("lxrsjh").getValue() || '', //getAccountInfo.mobile || '', //nsrxxUtil.getAccountInfo().mobile || '', // 跨区域
	        jbr: mini.get("lxrxm").getValue() || '', //nsrxxUtil.getAccountInfo().fullName || '',  //经办人
	        jbrsj: mini.get("lxdh").getValue() || '',  // 经办人 手机
	        jbrzj: mini.get("jbrzj").getValue() || ''   // 经办人 座机
        }
    };

    if ($.isArray(wcjyzmDataGrid)) {
        $.each(wcjyzmDataGrid, function (i, n) {
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i] = wcjyzmDataGrid[i];
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].yxbz = "Y";
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].djxh = wssqUtil.nsrjbxx.djxh;
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].hwuuid = "";
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].lcslid = "";
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].wcjyzmuuid = "";
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].sjgsdq = wssqUtil.nsrjbxx.sjgsdq;
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].wcjyhwmc = wcjyzmDataGrid[i].htmc;
            wjcyzmsqb.insertHwxxGrid.wcjyzmhwxxGridlb[i].wcjyhwxsdd = wcjyzmDataGrid[i].wcjyhwxsdd || '';
			
        });
    }

    var reqJson = {
        "djxh": wssqUtil.nsrjbxx.djxh, //取纳税人缓存djxh
        "lcslid": "",
        "wjcyzmsqb": wjcyzmsqb,
        "SwjgVO": SwjgVO,
        "swjgDm":wcjyhdkj.selectedSwjg, /*选中的税务机关代码*/
		"zgswskfjDm": ''
    };

    return mini.encode(reqJson);


}


/**
 * 绘制日期控件时，触发事件
 * @param e
 */
wcjyhdkj.onDrawDate = function (e) {
    var date = e.date;
    if (date.getTime() < new Date()-1000*24*60*60) { // 小于当前日期的禁选
        e.allowSelect = false;
    }
}

/**
 * 货物有效期起止校验
 * @param e
 */
wcjyhdkj.onDateChanged = function (e) {
    if(!e.sender.value){
        return;
    };
    if (e.sender.name == "wcjyhwyxqxq"){
        if(!!mini.get("wcjyhwyxqxz").getValue()){
            if (!!e.sender.value && e.sender.value >= mini.get("wcjyhwyxqxz").getValue()){
                mini.alert("合同有效期起必须小于等于合同有效期止");
                mini.get("wcjyhwyxqxq").setValue("")
                return;
            }
        } else {
            return ;
        }
    } else {
    	
    	if (!!e.sender.value && e.sender.value.format("yyyy-MM-dd") < new Date().format('yyyy-MM-dd')){
       	    mini.get("wcjyhwyxqxz").setValue("");
            mini.alert("合同有效期限止必须大于等于当前日期");
            return;
       }
    	
        if(!!mini.get("wcjyhwyxqxq").getValue()){
            if (!!e.sender.value && e.sender.value <= mini.get("wcjyhwyxqxq").getValue()){
                mini.get("wcjyhwyxqxz").setValue("");
                mini.alert("合同有效期止必须大于等于合同有效期起");
                return;
            }
        } else {
            return ;
        }
    }


}


/**
 * 当经营方式改变
 *
 * @param e
 */
wcjyhdkj.onJyfsChanged = function (e) {

    if ((isChooseJyfsJzaz() == -1 || !isJzazhyNsr) && !!mini.get("wcjydxzqh").getValue()) {
        initNsrWgzList();
        // if (!isWgzExistInXzqh(mini.get("wcjydxzqh").getValue(), mini.get("wcjydxzqh").getText())) {
        //     mini.get("jyfs").setValue("");
        //     return false;
        // }
    }


    var jyfsStr = mini.get("jyfs").getValue();
    var jyfsArr = jyfsStr.split(",");
    if(jyfsArr.length > 0){
        for(var i=0;i<jyfsArr.length;i++){
            //判断经营方式是否为"建筑安装"
            if(jyfsArr[i] == "19"){
                //判断行业代码大类是否为47、48、49、50
                var hyDm = wssqUtil.nsrjbxx.hyDm;
                var subHyDm = hyDm.substring(0,2);
                var hyArr = new Array();
                hyArr.push(subHyDm);
                //查询副营行业信息
                $.ajax({
                    url: wcjyzmkjService.Api.getFyhy,
                    type: "POST",
                    async: false,
                    success: function (data) {
                        var resultData = mini.decode(data);
                        if (!("" == resultData || null == resultData || "" == resultData.value || null == resultData.value || 0 == resultData.value.length)) {
                            for (var i = 0; i < resultData.value.length; i++) {
                                hyArr.push(resultData.value[i].hyDm.substring(0, 2));
                            }
                        }
                    }
                });
                var tmpFlag = false;
                for(var j=0; j<hyArr.length; j++){
                    if(hyArr[j] == "47" || hyArr[j] == "48" || hyArr[j] == "49" || hyArr[j] == "50"){
                        tmpFlag = true;
                        break;
                    }
                }
                if(!tmpFlag){
                    mini.alert("纳税人没有维护该经营范围，请咨询主管税务局！");
                    mini.get("jyfs").setValue("");
                    tmpFlag = false;
                }
            }
        }
    }
};
// 选择税务机关
wcjyhdkj.selectSwjgOk = function (e) {
    var value = wcjyhdkj.swjgListRadio.getValue();
    // 选择了税务机关的时候
    if(!!value){
        wcjyhdkj.selectedSwjg = value;
        wcjyhdkj.selectSwjgWin.hide();
    }else{
        mini.alert('请选择税务机关');
        return false;
    }
};
// 取消选择税务机关
wcjyhdkj.selectSwjgCancel = function (e) {
    mini.get('wcjydxzqh').setValue('');
    wcjyhdkj.selectSwjgWin.hide();
};
//
wcjyhdkj.checkSelectedSwjg = function () {
    var value = wcjyhdkj.swjgListRadio.getValue();
    // 选择了税务机关的时候
    if(!value){
        mini.get('wcjydxzqh').setValue('');
    }
};


wcjyhdkj.jeNumber = function(e){
    //console.log(e);
    //miniobj.setIsValid( false );
    
    if( Number(e.sender.value) > 9999999999999999.991 ){
        e.sender.value = '0';
        e.sender._textEl.value = '0'
        e.sender._textEl.blur();
        e.sender.setIsValid(false);
        mini.showTips({
            content: '金额整数最多16位，且最多只能两位小数',
            state: 'warning',
            offset: [150, 150]
        });
    }
};

//座机号码
mini.VTypes["zjphoneErrorText"] = "请输正确座机号码";
mini.VTypes["zjphone"] = function (v) {

	var re = /^(\d{2,4}-?)?\d{7,8}$/;
    if(Tools.trim(v)=="")return true;
    if (re.test(v)){
        return true;
    }else{
        return false;
    }


}


String.prototype.len = function(){
	return this.replace(/[^\x00-\xff]/g,"xxx").length; //这样转换一下再判断就可以 你们改一下吧
}