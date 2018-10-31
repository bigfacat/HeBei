/**
 * Created by hqh on 2017/8/1.
 */

var kpService = {
	
	setDw: function( success, error ){  //设置单位的值
		ajax.get('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_JLDW.ashx', {}, success, error );
	},
	
	setLwHwMc: function( success, error ){ //设置劳务货物名称
		ajax.get('../../data/hwlwMcData.ashx', {}, success, error );
	},
	
	isNeedDKFP: function(data, success, error){ //判断是否需要 打开发票
		ajax.post( '../../../api/fp/zzszyfpdk/get/checkXhfIsNeedDkfp/' + data , {}, success, error);
	},
	
	getXHFyhzh: function(data, success, error){ // 获取销货方银行账号
		ajax.post('../../../api/fp/zzszyfpdk/get/queryZzsFpdkYhxx/' + data, {}, success, error);
	},
	
	getAccountInfo: function(success, error){ // 获取账户信息
		ajax.post('/wszx-web/api/base1/userInfo/get.ashx', {}, success, error );
	},
	
	deleteTxl: function(params, success, error){ // 删除一条通讯录
		ajax.post('../../../api/fp/ghftxl/get/deleteGhfxx/', params, success, error);
	},
	
	getSkrFhr: function(params, success, error){ // 获取收款人 复核人信息
		ajax.post('../../../api/fp/zzszyfpdk/get/queryFpSkrfhr/', params, success, error);
	},

	getGjnsr: function(params, success, error){  //,//根据纳税人识别号查询购货方纳税人信息
		ajax.post('../../../api/fp/ghftxl/get/queryGhfxxSingle/', params, success, error);
		//../../../api/fp/zzszyfpdk/get/queryGhfxxSingle/
	},
	
	getyhzh: function(params, success, error){ //获取银行账号
		ajax.post('../../../api/fp/zzszyfpdk/get/yhzh/', params, success, error);
	},
	
	getyywd: function(params, success, error){  //获取营业网点名称
		ajax.post('../../../api/fp/zzszyfpdk/get/yhyywd/', params, success, error)
	},
	
	getZspmHy: function(params, success, error){ //获取增收品目代码 行业代码
		ajax.post('../../../api/fp/zzszyfpdk/get/queryZzsFpdkZspms/' + params, {}, success, error);
	},
	
	getYnsfInfo: function(params, success, error){  //获取应缴税费信息
		ajax.get('../../../api/fp/zzszyfpdk/get/queryDkzyfpYjsf/', params, success, error);
	},
	
	getSl: function(params, success, error){ //获取税率
		ajax.post('../../../api/fp/zzszyfpdk/get/dkzyfpZsl/', params, success, error)
	},
	
	getTxl: function( params, success, error){  //获取通讯录
		ajax.post('../../../api/fp/ghftxl/get/queryGhfxxAll/'+params, params, success, error)
	},
	
	saveTxl: function(params, success, error){  //保存通讯录
		ajax.post('../../../api/fp/ghftxl/update/updateOrInsertGhfxx/', params, success, error);
	},
	
	isHasTxl: function(params, success, error){ //是否存在通讯录  true 已经有了
		ajax.get('../../../api/fp/ghftxl/isexist', params, success, error);
	},
	
	nsrzg: function(params, success, error){  // 查询购货方纳税人资格
		ajax.post('../../../api/fp/zzszyfpdk/get/checkGhfNsrzgxx/'+params, params, success, error);
	},
	
	ghfzt: function(params, success, error){ // 购货方纳税人状态
		ajax.post('../../../api/fp/zzszyfpdk/get/checkGhfNsrzt/'+params, params, success, error);
	}

};

function toDX(n) {
	return moneyUtil.arabicToChinese(n); 
	// if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
	// 	return "数据非法";
	// var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
	// n += "00";
	// var p = n.indexOf('.');
	// if (p >= 0)
	// 	n = n.substring(0, p) + n.substr(p+1, 2);
	// unit = unit.substr(unit.length - n.length);
	// for (var i=0; i < n.length; i++)
	// 	str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	// return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");

}

/**
 * Created by hqh on 2017/8/1.
 */
kpService.getGjnsr = function(params, success, error){  //,//根据纳税人识别号查询购货方纳税人信息
	ajax.post('../../../api/fp/zzszyfpdk/get/queryGhfxxSingle/', params, success, error);
};


$(function(){ });