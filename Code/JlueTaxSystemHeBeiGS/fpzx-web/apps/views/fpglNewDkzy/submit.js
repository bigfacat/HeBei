//提交方法


function submitDk(){
	$.each(fbzldata , function(i, obj){
		if( obj.bsmxlist && !obj.bsmxlist.length ){ // 为空
			delete obj.bsmxlist;  // 删除这个节点
		}
	});
	//提交
	var tjParam={};
	var ptSkData = $.extend(configData.xhfxx.getData(), configData.sfrFhfForm.getData()); // dkzyfp.zySkForm.getData();//销货方信息  销货方  复核人信息结合
	
	var fkfData = configData.showTxl.getData();// 购货方信息  通讯录信息
	fkfData.ghfYhkhzh = fkfData.ghfYhkhzh;
	fkfData.ghfYhyywdMc =   fkfData.ghfYhyywdMc? fkfData.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', fkfData.ghfYhyywdDm);
	
	//过滤销货方
	var xhfDataParam = dkzyfp.glXhffData(ptSkData);
	
	/*过滤购货方信息*/
	var fkfDataParam = dkzyfp.glFkfData(fkfData);

	tjParam.fpdkZzsGhfnsrxxVO = fkfDataParam;//购货方信息数据组织
	
	var datas = $.extend({},xhfDataParam,fkfDataParam);
	
	datas.xhfsfzjzlDm = "201";//证件种类代码
	datas.yjse = hjData.seHj+'';  //税额合计
	datas.jshj = hjData.jehsHj+'';  //价税合计
	datas.kjhzzzszyfptzdhm = '';
	datas.lrrDm = '';
	datas.lzfpdm = '';
	datas.sfdkhzfp = '';
	datas.sjgsdq = '';
	datas.xgrDm = '';
	datas.zzsfpuuid = '';
	datas.bz = ptSkData.bz;
	datas.dksquuid = '';
	tjParam.fpdkZzsfpVO = datas;
	
	/*劳务货物信息*/
	var lwhwGrid = dkzyfp.lwHwData( configData.lwhuData ); //劳务货物数据 //dkzyfp.lwhwGrid.getData();
	var lwhw = {};
	
	if( configData.isUpload ){  //上传excel  //带调整
		var lwhObj = {};
		var lwhArr = [];
		lwhObj.hwlwmc = "详见清单";
		lwhObj.slzsl = dkzyfp.slvValue;
		lwhObj.lrrDm = "";
		lwhObj.je = hjData.jebhsHj +'';
		lwhObj.se = hjData.seHj +'';
		lwhObj.jsxj = hjData.jehsHj +'';
		lwhObj.xse = Number(hjData.jebhsHj) * Number(dkzyfp.slvValue + 1) +'';
		
		lwhArr[0] = lwhObj;
		lwhw.fpdkZzsfpHlmxGridlb = lwhArr;
	}else{
		$.each(lwhwGrid, function(i,item){
			item.slv = dkzyfp.slvValue;
			item.dj =  item.hldj;
			item.xse = item.jeHs +'';
			item.slzsl = dkzyfp.slvValue;
			item.je = item.je +'';
			item.lrrDm ='';
			item.sjgsdq =  '';
			item.xgrDm =  '';
			item.zzsfpmxuuid =  '';
			item.zzsfpuuid =  '';
			item.jsxj = item.jeHs+'';
		});
		lwhw.fpdkZzsfpHlmxGridlb = lwhwGrid;
		
		
	}
	
	tjParam.fpdkZzsfpHlmxGrid = lwhw;

	//总计
	var currentDate = new Date();
	var fpdkTemp = {};
	var zj = {};
	var zjTeml= {};
	zj.djxh = dkzyfp.djxh;
	zj.dkfplbDm = "01";
	zj.dksqje = hjData.jebhsHj + '';
	zj.dksquuid = "";
	zj.hyDm =  ptSkData.hyDm;//行业代码
	zj.jdxzDm = "";//行业代码
	zj.jmsbz = "N";
	zj.jmslxDm = "";
	zj.jmyy = "";
	zj.kjbz = "N";
	zj.kpje = hjData.jehsHj +'';
	zj.kplxDm = "01";
	zj.lcslid = "";
	zj.lrrDm = "";
	zj.pzxh = "";
	zj.sjgsdq = "";
	zj.slrDm = "";
	zj.slswjgDm = "";
	zj.sqdhm = "";
	zj.sqrq = "";
	zj.sqrxm = "";
	zj.xgrDm = "";
	zj.xzqhszDm = "";
	zj.ybsfe = hjData.seHj;
	zj.zfbz1 = "";
	zj.zfrDm = "";
	zj.zfrq1 = "";
	zj.zgswskfjDm = "";
	zj.zrrbz = "N";
	
	tjParam.fpdkSqVO = zj;
	
	var fpdkSfmxArr = [];
	var fpdkSfmxGridlb={};
	fpdkSfmxGridlb.dkfplbDm = '01';
	fpdkSfmxGridlb.dksquuid = '';
	fpdkSfmxGridlb.hyDm = ptSkData.hyDm;
	fpdkSfmxGridlb.jmsfe = "0";
	fpdkSfmxGridlb.jmspjguuid = '';
	fpdkSfmxGridlb.jsfyj = hjData.jebhsHj; //金额含税合计
	fpdkSfmxGridlb.jyxmDm = '';
	fpdkSfmxGridlb.lrrDm = '';
	fpdkSfmxGridlb.nsqnyjse = '';
	fpdkSfmxGridlb.sfl = dkzyfp.slvValue;  //税率
	fpdkSfmxGridlb.sfmxuuid = '';
	fpdkSfmxGridlb.sjgsdq = '';
	fpdkSfmxGridlb.skssqq = currentDate.getFirstDateOfMonth('yyyy-MM-dd');
	fpdkSfmxGridlb.skssqz = currentDate.getLastDateOfMonth('yyyy-MM-dd');
	fpdkSfmxGridlb.srze = hjData.jebhsHj +'';
	fpdkSfmxGridlb.sskcs = '';
	fpdkSfmxGridlb.ghfYhyywdMc = fkfData.ghfYhyywdMc;
	fpdkSfmxGridlb.tddjDm = '';
	fpdkSfmxGridlb.xgrDm = '';
	fpdkSfmxGridlb.ybsfe = hjData.seHj +'';
	fpdkSfmxGridlb.yjsfe = '0';
	fpdkSfmxGridlb.ynsfe = hjData.seHj+'';
	fpdkSfmxGridlb.yxkcje = '0';
	fpdkSfmxGridlb.zfbz1 = 'N';
	fpdkSfmxGridlb.zfrDm = '';
	fpdkSfmxGridlb.zfrq1 = '';
	fpdkSfmxGridlb.zspmDm = ptSkData.zspm;
	fpdkSfmxGridlb.zsxmDm = '10101';
	fpdkSfmxGridlb.zszmDm = '';
	fpdkSfmxGridlb.zszspmDm = '';
	fpdkSfmxGridlb.zszsxmDm = '';
	fpdkSfmxGridlb.zszszmDm = '';
	//fpdkSfmxGridlb.submitParam = dkzyfp.ynsfInfo
	
	fpdkSfmxArr[0] = fpdkSfmxGridlb;
	//fpdkSfmxArr = fpdkSfmxArr.concat(dkzyfp.ynsfInfo); // 拼接两个数组
	var tempObj = {};
	tempObj.fpdkSfmxGridlb=fpdkSfmxArr;
	var gridTeml = {};
	tjParam.fpdkSfmxGrid = tempObj;
	
 
	var submitParam = {};
	submitParam.fpzzszyfpdksbdVO = tjParam;
	submitParam.bbh='';
	submitParam.xmlbh='';
	submitParam.xmlmc='';
	submitParam.skr = ptSkData.skr;
	submitParam.fhr = ptSkData.fhr;
	submitParam.jbr = ptSkData.jbr;
	submitParam.slv = dkzyfp.slvValue;
	submitParam.xhfnsrsbh = wssqUtil.nsrjbxx.nsrsbh;//销货方纳税人识别号
	submitParam.xhfnsrmc = wssqUtil.nsrjbxx.nsrmc;//销货方纳税人名称
	
	/*合计报文 自己家的*/
	var dpdkHjVO = {};
	dpdkHjVO.jehj = hjData.jebhsHj;
	dpdkHjVO.sehj = hjData.seHj;
	dpdkHjVO.jshj = hjData.jehsHj;
	submitParam.dpdkHjVO = dpdkHjVO;
	
	
	var hwlwqd = {};
	if( configData.isUpload ){ //大于8条 上传excel
		hwlwqd.isqdxx = "Y";
		$.each(lwhwGrid,function(i,item){
			item.slv = dkzyfp.slvValue;
			item.dj =  item.hldj;
			item.xse = item.jeHs +'';
			item.slzsl = dkzyfp.slvValue;
			item.je = item.je +'';
			item.lrrDm ='';
			item.sjgsdq =  '';
			item.xgrDm =  '';
			item.zzsfpmxuuid =  '';
			item.zzsfpuuid =  '';
			item.jsxj = item.jeHs+'';
		});
		hwlwqd.hwlwqdmx = lwhwGrid;
	}else{
		hwlwqd.isqdxx = "N";
		hwlwqd.hwlwqdmx = '';
	}
	submitParam.hwlwqd = hwlwqd;
	
	var result = false;
	console.log( submitParam , '这里是提交的数据');
	//新疆发票代开需要将登录人的身份信息存进去，管理端审核的时候需要用到
	
	submitParam.dlrsf = mini.decode(sessionStorage.getItem('getUserInfo')).NsrInfo.roleId;
	wssqUtil.tjsq("../../../api/fp/zzszyfpdk/submit/zzszyfptj/", mini.encode(submitParam), function(data){
		if (!data.success) {
			mini.alert(data.message);
		} else {
			result = true;
		}
	});
	return result;
	//return false;
}
//提交方法


function submitDk(){
	$.each(fbzldata , function(i, obj){
		if( obj.bsmxlist && !obj.bsmxlist.length ){ // 为空
			delete obj.bsmxlist;  // 删除这个节点
		}
	});
	//提交
	var tjParam={};
	var ptSkData = $.extend(configData.xhfxx.getData(), configData.sfrFhfForm.getData()); // dkzyfp.zySkForm.getData();//销货方信息  销货方  复核人信息结合
	
	var fkfData = configData.showTxl.getData();// 购货方信息  通讯录信息
	fkfData.ghfYhkhzh = fkfData.ghfYhkhzh;
	fkfData.ghfYhyywdMc =   fkfData.ghfYhyywdMc? fkfData.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', fkfData.ghfYhyywdDm);
	
	//过滤销货方
	var xhfDataParam = dkzyfp.glXhffData(ptSkData);
	
	/*过滤购货方信息*/
	var fkfDataParam = dkzyfp.glFkfData(fkfData);

	tjParam.fpdkZzsGhfnsrxxVO = fkfDataParam;//购货方信息数据组织
	
	var datas = $.extend({},xhfDataParam,fkfDataParam);
	
	datas.xhfsfzjzlDm = "201";//证件种类代码
	datas.yjse = hjData.seHj+'';  //税额合计
	datas.jshj = hjData.jehsHj+'';  //价税合计
	datas.kjhzzzszyfptzdhm = '';
	datas.lrrDm = '';
	datas.lzfpdm = '';
	datas.sfdkhzfp = '';
	datas.sjgsdq = '';
	datas.xgrDm = '';
	datas.zzsfpuuid = '';
	datas.bz = ptSkData.bz;
	datas.dksquuid = '';
	tjParam.fpdkZzsfpVO = datas;
	
	/*劳务货物信息*/
	var lwhwGrid = dkzyfp.lwHwData( configData.lwhuData ); //劳务货物数据 //dkzyfp.lwhwGrid.getData();
	var lwhw = {};
	
	if( configData.isUpload ){  //上传excel  //带调整
		var lwhObj = {};
		var lwhArr = [];
		lwhObj.hwlwmc = "详见销货清单";
		lwhObj.slzsl = dkzyfp.slvValue;
		lwhObj.lrrDm = "";
		lwhObj.je = hjData.jebhsHj +'';
		lwhObj.se = hjData.seHj +'';
		lwhObj.jsxj = hjData.jehsHj +'';
		lwhObj.xse = Number(hjData.jebhsHj) * Number(dkzyfp.slvValue + 1) +'';
		
		lwhArr[0] = lwhObj;
		lwhw.fpdkZzsfpHlmxGridlb = lwhArr;
	}else{
		$.each(lwhwGrid, function(i,item){
			item.slv = dkzyfp.slvValue;
			item.dj =  item.hldj;
			item.xse = item.jeHs +'';
			item.slzsl = dkzyfp.slvValue;
			item.je = item.je +'';
			item.lrrDm ='';
			item.sjgsdq =  '';
			item.xgrDm =  '';
			item.zzsfpmxuuid =  '';
			item.zzsfpuuid =  '';
			item.jsxj = item.jeHs+'';
		});
		lwhw.fpdkZzsfpHlmxGridlb = lwhwGrid;
		
		
	}
	
	tjParam.fpdkZzsfpHlmxGrid = lwhw;

	//总计
	var currentDate = new Date();
	var fpdkTemp = {};
	var zj = {};
	var zjTeml= {};
	zj.djxh = dkzyfp.djxh;
	zj.dkfplbDm = "01";
	zj.dksqje = hjData.jebhsHj + '';
	zj.dksquuid = "";
	zj.hyDm =  ptSkData.hyDm;//行业代码
	zj.jdxzDm = "";//行业代码
	zj.jmsbz = "N";
	zj.jmslxDm = "";
	zj.jmyy = "";
	zj.kjbz = "N";
	zj.kpje = hjData.jehsHj +'';
	zj.kplxDm = "01";
	zj.lcslid = "";
	zj.lrrDm = "";
	zj.pzxh = "";
	zj.sjgsdq = "";
	zj.slrDm = "";
	zj.slswjgDm = "";
	zj.sqdhm = "";
	zj.sqrq = "";
	zj.sqrxm = "";
	zj.xgrDm = "";
	zj.xzqhszDm = "";
	zj.ybsfe = hjData.seHj;
	zj.zfbz1 = "";
	zj.zfrDm = "";
	zj.zfrq1 = "";
	zj.zgswskfjDm = "";
	zj.zrrbz = "N";
	
	tjParam.fpdkSqVO = zj;
	
	var fpdkSfmxArr = [];
	var fpdkSfmxGridlb={};
	fpdkSfmxGridlb.dkfplbDm = '01';
	fpdkSfmxGridlb.dksquuid = '';
	fpdkSfmxGridlb.hyDm = ptSkData.hyDm;
	fpdkSfmxGridlb.jmsfe = "0";
	fpdkSfmxGridlb.jmspjguuid = '';
	fpdkSfmxGridlb.jsfyj = hjData.jebhsHj; //金额含税合计
	fpdkSfmxGridlb.jyxmDm = '';
	fpdkSfmxGridlb.lrrDm = '';
	fpdkSfmxGridlb.nsqnyjse = '';
	fpdkSfmxGridlb.sfl = dkzyfp.slvValue;  //税率
	fpdkSfmxGridlb.sfmxuuid = '';
	fpdkSfmxGridlb.sjgsdq = '';
	fpdkSfmxGridlb.skssqq = currentDate.getFirstDateOfMonth('yyyy-MM-dd');
	fpdkSfmxGridlb.skssqz = currentDate.getLastDateOfMonth('yyyy-MM-dd');
	fpdkSfmxGridlb.srze = hjData.jebhsHj +'';
	fpdkSfmxGridlb.sskcs = '';
	fpdkSfmxGridlb.ghfYhyywdMc = fkfData.ghfYhyywdMc;
	fpdkSfmxGridlb.tddjDm = '';
	fpdkSfmxGridlb.xgrDm = '';
	fpdkSfmxGridlb.ybsfe = hjData.seHj +'';
	fpdkSfmxGridlb.yjsfe = '0';
	fpdkSfmxGridlb.ynsfe = hjData.seHj+'';
	fpdkSfmxGridlb.yxkcje = '0';
	fpdkSfmxGridlb.zfbz1 = 'N';
	fpdkSfmxGridlb.zfrDm = '';
	fpdkSfmxGridlb.zfrq1 = '';
	fpdkSfmxGridlb.zspmDm = ptSkData.zspm;
	fpdkSfmxGridlb.zsxmDm = '10101';
	fpdkSfmxGridlb.zszmDm = '';
	fpdkSfmxGridlb.zszspmDm = '';
	fpdkSfmxGridlb.zszsxmDm = '';
	fpdkSfmxGridlb.zszszmDm = '';
	//fpdkSfmxGridlb.submitParam = dkzyfp.ynsfInfo
	
	fpdkSfmxArr[0] = fpdkSfmxGridlb;
	//fpdkSfmxArr = fpdkSfmxArr.concat(dkzyfp.ynsfInfo); // 拼接两个数组
	var tempObj = {};
	tempObj.fpdkSfmxGridlb=fpdkSfmxArr;
	var gridTeml = {};
	tjParam.fpdkSfmxGrid = tempObj;
	
 
	var submitParam = {};
	submitParam.fpzzszyfpdksbdVO = tjParam;
	submitParam.bbh='';
	submitParam.xmlbh='';
	submitParam.xmlmc='';
	submitParam.skr = ptSkData.skr;
	submitParam.fhr = ptSkData.fhr;
	submitParam.jbr = ptSkData.jbr;
	submitParam.slv = dkzyfp.slvValue;
	submitParam.xhfnsrsbh = wssqUtil.nsrjbxx.nsrsbh;//销货方纳税人识别号
	submitParam.xhfnsrmc = wssqUtil.nsrjbxx.nsrmc;//销货方纳税人名称
	
	/*合计报文 自己家的*/
	var dpdkHjVO = {};
	dpdkHjVO.jehj = hjData.jebhsHj;
	dpdkHjVO.sehj = hjData.seHj;
	dpdkHjVO.jshj = hjData.jehsHj;
	submitParam.dpdkHjVO = dpdkHjVO;
	
	
	var hwlwqd = {};
	if( configData.isUpload ){ //大于8条 上传excel
		hwlwqd.isqdxx = "Y";
		$.each(lwhwGrid,function(i,item){
			item.slv = dkzyfp.slvValue;
			item.dj =  item.hldj;
			item.xse = item.jeHs +'';
			item.slzsl = dkzyfp.slvValue;
			item.je = item.je +'';
			item.lrrDm ='';
			item.sjgsdq =  '';
			item.xgrDm =  '';
			item.zzsfpmxuuid =  '';
			item.zzsfpuuid =  '';
			item.jsxj = item.jeHs+'';
		});
		hwlwqd.hwlwqdmx = lwhwGrid;
	}else{
		hwlwqd.isqdxx = "N";
		hwlwqd.hwlwqdmx = '';
	}
	submitParam.hwlwqd = hwlwqd;
	
	var result = false;
	console.log( submitParam , '这里是提交的数据');
	//新疆发票代开需要将登录人的身份信息存进去，管理端审核的时候需要用到
	
	submitParam.dlrsf = mini.decode(sessionStorage.getItem('getUserInfo')).NsrInfo.roleId;
	wssqUtil.tjsq("../../../api/fp/zzszyfpdk/submit/zzszyfptj/", mini.encode(submitParam), function(data){
		if (!data.success) {
			mini.alert(data.message);
		} else {
			result = true;
		}
	});
	return result;
	//return false;
}