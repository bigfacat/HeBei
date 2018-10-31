var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlDm="";
var sbzlArray = ['10101','10110'];
var YQWRDBZ = ''; // 是否是小规模逾期未认定
$(function() {
	mini.parse();
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	if(null == hdxxData) {
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			parent.$('body').trigger('close.frame.dialog');
		});
		return;
	}
	var sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
	if (sbzlNode == null) {
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	//if (!cwbbSbqk()) {
	//	mini.alert("您未成功申报财务报表，不能申报一般纳税人增值税", '提示信息', function() {
	//		window.close();
	//	});
	//	return;
	//}
	sbzlDm = sbzlNode.SBZLCODE;

    YQWRDBZ = getWsxxValueByCode(sbzlNode,'YQWRDBZ');

	setSbnyValue();
	//mini.get("sbny").setValue(getSbny());
	search();

	getFjsSbBz();
});
var fjsBz = false;
function getFjsSbBz() {
    // 附加税启用标志
    $.ajax({
        url : "/sb/sbcommon_getFjsSbQybz.ashx",
        type : "get",
        async : false,
        success : function(data) {
            data = mini.decode(data);
            if (data.success && data.data =='Y') {
                fjsBz = true; // 申报附加税
            }
        }
    });
}

function sb(){
	/****
	 * 网厅不支持航空企业、成品油企业、铁路运输企业、电信企业、邮政企业、部分产品销售统计表的校验
	 * ***/
	var hdData = getHdxx();
	var HD =hdData.HdxxXml; 
	var ybnsr = $(HD).find('SBZLCODE:contains(10101)').parent();
	if(ybnsr.length===0){
        ybnsr = $(HD).find('SBZLCODE:contains(10110)').parent();
	}
	if($(ybnsr).find('QCCGBZ').text()==='N'){
		var msg = $(ybnsr).find('QCCGBZMS').text();
        mini.alert(msg);
        return false;
	}
	var WSXX = $(ybnsr).find('WSXX');
	var fbID = ['001','002','085','082','003','083','006','031','081','030'];
	var fbName = {
			'001':'增值税纳税申报表',
			'002':'本期销售情况明细',
			'003':'本期进项税额明细',
			'006':'服务、不动产和无形资产扣除项目明细',
			'007':'成品油购销存情况明细表',
			'025':'电力企业增值税销项税额和进行税额传递单',
			'030':'固定资产进项税额抵扣情况表',
			'031':'税额抵减情况表',
			'052':'农产品核定扣除增值税进项税额计算表（汇总表）',
			'053':'投入产出法核定农产品增值税进项税额计算表',
			'054':'成本法核定农产品增值税进项税额计算表',
			'055':'购进农产品直接销售核定农产品增值税进项税额计算表',
			'056':'购进农产品用于生产经营且不构成货物实体核定农产品增值税进项税额计算表',
			'064':'航空运输企业试点地区分支机构传递单',
			'075':'邮政企业分支机构增值税汇总纳税信息传递单',
			'076':'铁路运输企业分支机构增值税汇总纳税信息传递单',
			'077':'电信企业分支机构增值税汇总纳税信息传递单',
			'079':'部分产品销售统计表',
			'081':'增值税减免税申报明细表',
		    '082':'不动产分期抵扣计算表',
		    '083':'本期抵扣进项税额结构明细表',
		    '085':'营改增税负分析测算明细表',
			'601':'分支机构增值税汇总纳税信息传递单'
	}
	var result = true;
	var code;
	$.each(WSXX,function(i,v){
		code = $(this).find('CODE').html();
		if(code=="DXQYBZ"||code=="HKYSQYBZ"||code=="YZQYBZ"||code=="TLYSQYBZ"){
			if($(this).find("VALUE").html()=="Y"){
				result = false;
				return false;
			}
		}
		//成品油
		if(code=="TSHY"){
			if($(this).find("VALUE").html()==2){
				result = false;
				return false;
			}
		}
	})
	var tempArr=[];
	//部分销售：判断bbid里是否有079这张表
	$.each(ybnsr.find("SBB"),function(){
		if($(this).html()=='079'){
			result = false;
		}
		tempArr.push($(this).html());
	})
	if(!result){
		var nameID=$.grep(tempArr,function(n,i){
		    if($.inArray(n,fbID)<0){
		        return n
		    }
		})
		var _name=[];
		$.each(nameID,function(i,v){
			_name.push(fbName[v]);
		})
		var str = _name.join('，');
		mini.alert("您需要报送【"+str+"】，网厅暂不支持该报表的申报，您可以通过【河北省国家税务局网上办税系统】申报！");
	}else{
	    if(fjsBz){
            var isGdsxxSame = true;
            var htmlContent = document.getElementById("htmlContent");
            $.ajax({
                url : "/sb/sbcommon_compareGdsNsrxx.do",
                type : "post",
                async : false,
                data:{
                  sbzlDm:sbzlDm
                },
                success : function(data) {
                    data = mini.decode(data);
                    if (data.success && !!data.data) {
                        var gsData = data.data.gs;
                        var dsData = data.data.ds;
                        isGdsxxSame = false;
                        for(var g in gsData){
                            $('#gs-'+g).html(gsData[g]).parent().show();
                        }
                        for(var d in dsData){
                            $('#ds-'+d).html(dsData[d]);
                        }
                        mini.get('gds-win').show();
                        return false;
                    }
                },
                error : function(data) {
                    mini.alert('对比国地税信息失败，请联系运维人员或者稍后再试！')
                }
            });
            if(isGdsxxSame){
                if(YQWRDBZ=='1'){
                    window.location.href = '../xgmyqwrd_fjs/sb_ybnsrsb.html?'+sbzlDm;
                }
                if(YQWRDBZ=='0'){
                    window.location.href = '../ybnsr_fjs/sb_ybnsrsb.html?'+sbzlDm;
                }
            }
        }else{
            if(YQWRDBZ=='1'){
                window.location.href = '../xgmyqwrd/sb_ybnsrsb.html?'+sbzlDm;
            }
            if(YQWRDBZ=='0'){
				window.location.href = '../ybnsrsb/sb_ybnsrsb.aspx?'+sbzlDm;
            }
        }

	}
}
function gotoSb() {
    mini.get('gds-win').hide();
    if(YQWRDBZ=='1'){
        window.location.href = '../xgmyqwrd/sb_ybnsrsb.html?'+sbzlDm;
    }
    if(YQWRDBZ=='0'){
        window.location.href = '../ybnsrsb/sb_ybnsrsb.aspx?'+sbzlDm;
    }
}
//返回为true才可以申报一般纳税人
function cwbbSbqk(){
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	var cwbbsbzlArray = ['29835','29836', '29806', '29826'];
	var cwbbsbzlNode = isExsitSbzlHdxx(cwbbsbzlArray, hdxxData);
	if (cwbbsbzlNode == null) {
		return true;
	}
	var cwbbsbzlDm = cwbbsbzlNode.SBZLCODE;
	
	var sssqArray = getSssq(getSbny(), cwbbsbzlDm);
	var sbqkVO = querySbqkSbxx(nsrData.djxh, sssqArray[0], sssqArray[1], cwbbsbzlDm);// 查询是否已经申报过
	
	if (sbqkVO == null) {
		return false;
	}
	if (sbqkVO.sbztDm == 'hxzgSuccess') {
		return true;
	} else if (sbqkVO.sbztDm == 'hxzgFail') {
		return false;
	} else if (sbqkVO.sbztDm == '0000') {
		return true;
	} else {
		return false;
	}
}

function search() {
	var grid = mini.get("sbqkGrid");
	grid.setData("");
	var sbny = getSbny();
	var sbnyInput = mini.get("sbny").text;
	if (sbny != sbnyInput) {
		sbny = sbnyInput;
		$("#xgmsb-btn").hide();
	}else{
		$("#xgmsb-btn").show();
	}
	var sssqArray = getSssq(sbny, sbzlDm);
	var sbqkVO = querySbqkSbxx(nsrData.djxh, sssqArray[0], sssqArray[1], sbzlDm);// 查询是否已经申报过
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
		return;
	}
	if (sbqkVO.sbztDm == 'hxzgSuccess') {
		mini.alert("您已成功申报过一般纳税人增值税申报，但未使用本系统申报,故无法查询申报记录！");
		$("#xgmsb-btn").hide();
	} else if (sbqkVO.sbztDm == 'hxzgFail') {
	} else if (sbqkVO.sbztDm == '0000'||(sbqkVO.sbztDm.indexOf('20')==0)) {
		$("#xgmsb-btn").hide();
		grid.setData(new Array(sbqkVO));
	} else {
		grid.setData(new Array(sbqkVO));
	}
	return;
}
/*-----------------------------------*/

function setSbnyValue() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var t = mini.get("sbny");
	t.setValue(year + "-" + month);
}