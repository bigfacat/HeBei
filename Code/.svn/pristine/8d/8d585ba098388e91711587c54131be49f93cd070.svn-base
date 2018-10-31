var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbzlDm="";
var sbzlArray = ['10306','10316'];


var fjsBz = false;
function getFjsSbBz() {
    // 附加税启用标志
    $.ajax({
        url : "/sb/sbcommon_getFjsSbQybz.do",
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

function selfgetSbny(){
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth();
	if(vMon==0){
		vYear=vYear-1;
		vMon=12;
	}
	if(vMon<10){
		vMon="0"+vMon;
	}
	return vYear+"-"+vMon;
}
$(function() {
	mini.parse();
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	if(null == hdxxData) {
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系", '提示信息', function() {
			window.close();
		});
		return;
	}
	var sbzlNode = isExsitSbzlHdxx(sbzlArray, hdxxData);
	if (sbzlNode == null) {
		$("#xgmsb-btn").hide();
		mini.alert("未获取到您当前所属时期需要申报的税种信息，请确认您是否为新登记纳税人或与您的主管税务机关联系");
		return;
	}
	if('N'==sbzlNode.QCCGBZ){
		$("#xgmsb-btn").hide();
		mini.alert(sbzlNode.QCCGBZMS, '提示信息', function() {
			window.close();
		});
		return;
	}
	sbzlDm = sbzlNode.SBZLCODE;
	mini.get("sbny").setValue(selfgetSbny());

    getFjsSbBz();

	search();


});
function sb() {
    if(!isGdsxxSame){
        mini.get('gds-win').show();
    }else{
        if(fjsBz){
            sessionStorage.setItem('xfs_qt_fjs',true);
        }else{
            sessionStorage.removeItem('xfs_qt_fjs')
        }
        window.location.href = './sb_xfs_sb.html?'+sbzlDm;
    }
}

function gotoSb() {
    sessionStorage.setItem('xfs_qt_fjs',false);// 不能申报附加税
    window.location.href = './sb_xfs_sb.html?'+sbzlDm;
}
// 比较过地税信息是否一致
var isGdsxxSame = true;
function chenckGdsxx(){
	/*if (!cwbbSbqk()) {
		mini.alert("您未成功申报财务报表，不能申报一般纳税人增值税", '提示信息', function() {});
		return;
	}*/
	if(!fjsBz){
	    return;
    }
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
                return false;
            }
        },
        error : function() {

        }
    });
}
//返回为true才可以申报一般纳税人
function cwbbSbqk(){
	// 获取核定信息，判断核定信息是否存在
	var hdxxData = getHdxx();
	var cwbbsbzlArray = ['29835','29836', '29806', '29826'];
	var cwbbsbzlNode = isExsitSbzlHdxx(cwbbsbzlArray, hdxxData);
	if (cwbbsbzlNode == null) {
		return false;
	}
	var cwbbsbzlDm = cwbbsbzlNode.SBZLCODE;
	
	var sssqArray = getSssq(getSbny(), sbzlDm);
	var sbqkVO = querySbqkSbxx(nsrData.djxh, sssqArray[0], sssqArray[1], cwbbsbzlDm);// 查询是否已经申报过
	
	if (sbqkVO == null) {
		$("#xgmsb-btn").hide();
		mini.alert("征管系统处理繁忙，请稍后点击【查询】按钮，查询申报结果！");
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
		mini.alert("您已成功申报过其他消费税申报，但未使用本系统申报,故无法查询申报记录！");
		$("#xgmsb-btn").hide();
	} else if (sbqkVO.sbztDm == 'hxzgFail') {
	} else if (sbqkVO.sbztDm == '0000'||(sbqkVO.sbztDm.indexOf('20')==0)) {
		$("#xgmsb-btn").hide();
		grid.setData(new Array(sbqkVO));
	} else {
		grid.setData(new Array(sbqkVO));
	}

    chenckGdsxx();

	return;
}