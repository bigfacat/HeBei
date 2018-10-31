var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
var sbnynb=""; //年报的查询
var comboboxData = [
	{
		id:"10101",
		text:"增值税"
	},
	{
		id:"10102",
		text:"消费税"
	},
	{
		id:"10104",
		text:"所得税"
	},
    {
		id:"30217",
		text:"文化事业建设费"
	},
    {
		id:"10106",
		text:"储蓄存款"
	},
    {
		id:"30175",
		text:"废旧电子"
	},
    {
		id:"10103",
		text:"小规模季报"
	}];

var szAndUrl = [
            	{
            		id:"10112",
            		text:"跨境应税服务免税企业情况调查表",
            		url:""
            	},
            	{
            		id:"12107",
            		text:"重点税源",
            		url:""
            	},
            	{
            		id:"10424",
            		text:"固定资产加速折旧月报",
            		url:""
            	},
            	{
            		id:"10425",
            		text:"固定资产加速折旧季报",
            		url:""
            	},
                {
            		id:"29802",
            		text:"商业银行财务报表月报",
            		url:""
            	},
                {
            		id:"29835",
            		text:"财务报表小企业会计准则-月报",
            		url:"../cwbb/cwbbview_xqy.html"
            	},
            	{
            		id:"29836",
            		text:"财务报表小企业会计准则-季报",
            		url:"../cwbb/cwbbview_xqy.html"
            	},
            	{
            		id:"29823",
            		text:"商业银行财务报表-季报",
            		url:""
            	},
            	{
            		id:"29808",
            		text:"商业银行财务报表-年报",
            		url:""
            	},
            	{
            		id:"29803",
            		text:"保险公司财务报表-月报",
            		url:""
            	},
            	{
            		id:"29824",
            		text:"保险公司财务报表-季报",
            		url:""
            	},
            	{
            		id:"29809",
            		text:"保险公司财务报表-年报",
            		url:""
            	},
            	{
            		id:"29804",
            		text:"证券公司财务报表-月报",
            		url:""
            	},
            	{
            		id:"29825",
            		text:"证券公司财务报表-季报",
            		url:""
            	},
            	{
            		id:"29810",
            		text:"证券公司财务报表-年报",
            		url:""
            	},
            	{
            		id:"29838",
            		text:"担保公司财务报表-月报",
            		url:""
            	},
            	{
            		id:"29839",
            		text:"担保公司财务报表-季报",
            		url:""
            	},
            	{
            		id:"29840",
            		text:"担保公司财务报表-年报",
            		url:""
            	},
            	{
            		id:"29837",
            		text:"财务报表小企业会计准则-年报",
            		url:"../cwbb/cwbbview_xqy.html"
            	},
            	{
            		id:"29806",
            		text:"企业会计制度-财务报表 月报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29811",
            		text:"企业会计制度-财务报表 年报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29826",
            		text:"企业会计制度-财务报表 季报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29827",
            		text:"企业会计准则-财务报表 季报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29812",
            		text:"企业会计准则-财务报表 年报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29807",
            		text:"企业会计准则-财务报表 月报",
            		url:"../cwbb/cwbbview.html"
            	},
            	{
            		id:"29842",
            		text:"事业单位会计制度-财务报表 季报",
            		url:""
            	},
            	{
            		id:"29843",
            		text:"事业单位会计制度-财务报表 年报",
            		url:""
            	},
            	{
            		id:"29841",
            		text:"事业单位会计制度-财务报表 月报",
            		url:""
            	},
            	{
            		id:"17701",
            		text:"废旧电子产品处理基金申请表",
            		url:"../fqdzcpcljjsqb/sb_fqdzcpcljj.html"
            	},
            	{
            		id:"10101",
                    text: "一般纳税人增值税",
            		url:""
            	},
            	{
            		id:"10310",
            		text:"电池类消费税",
            		url:""
            	},
            	{
            		id:"10311",
            		text:"涂料类消费税",
            		url:""
            	},
            	{
            		id:"10407",
            		text:"企业年度关联业务往来报告表",
            		url:""
            	},
            	{
            		id:"10423",
            		text:"企业所得税年度纳税申报A类",
            		url:"../qysds/suodeshuiA_view.html"
            	},
            	{
            		id:"10422",
            		text:"分支机构企业所得税年度纳税申报表",
            		url:""
            	},
            	{
            		id:"10421",
            		text:"企业所得税年度纳税申报B类",
            		url:"../qysds/suodeshuiB_view.html"
            	},
            	{
            		id:"12109",
            		text:"后续管理报表",
            		url:""
            	},
            	{
            		id:"10102",
                    text: "小规模增值税",
            		url:"../xgmzzs/sb_xgmsbview.html"
            	},
            	{
            		id:"10417",
            		text:"企业所得税B类月报",
            		url:"../qysds/suodeshuiB_view.html"
            	},
            	{
            		id:"26501",
            		text:"文化事业建设费",
            		url:"../whsyjsf/sb_whsyview.html"
            	},
            	{
            		id:"26502",
            		text:"文化事业建设费季报",
            		url:"../whsyjsf/sb_whsyview.html"
            	},
            	{
            		id:"10302",
            		text:"烟类消费税",
            		url:""
            	},
            	{
            		id:"10416",
            		text:"企业所得税A类月报",
            		url:"../qysds/suodeshuiA_view.html"
            	},
            	{
            		id:"10418",
            		text:"企业所得税A类季报",
            		url:"../qysds/suodeshuiA_view.html"
            	},
            	{
            		id:"10419",
            		text:"企业所得税B类季报",
            		url:"../qysds/suodeshuiB_view.html"
            	},
            	{
            		id:"10601",
            		text:"储蓄存款利息5%",
            		url:"../grcxcklxsds/sb_grcxcklxsds_5.html"
            	},
            	{
            		id:"10602",
            		text:"储蓄存款利息20%",
            		url:"../grcxcklxsds/sb_grcxcklxsds_20.html"
            	},
            	{
            		id:"10303",
            		text:"酒类消费税",
            		url:""
            	},
            	{
            		id:"10304",
            		text:"成品油消费税",
            		url:""
            	},
            	{
            		id:"10305",
            		text:"小汽车消费税",
            		url:""
            	},
            	{
            		id:"10306",
            		text:"其他消费税",
            		url:""
            	},
            	{
            		id:"10307",
            		text:"卷烟批发",
            		url:""
            	},
            	{
            		id:"10110",
            		text:"一般纳税人增值税季报",
            		url:""
            	},
            	{
            		id:"10103",
            		text:"小规模季报",
            		url:"../xgmzzs/sb_xgmsbview.html"
            	},
            	{
            		id:"10115",
            		text:"附加税月报",
            		url:""
            	},
            	{
            		id:"10116",
            		text:"附加税季报",
            		url:""
            	}];

$(function() {
	mini.parse();
	setSbnyValue();
	//mini.get("sbny").setValue(setSbnyValue());
	mini.get("sz").setData(comboboxData);
	 var t = mini.get("sbny");
     t.disable();
	 search();
});
function setSbnyValue() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var t = mini.get("sbny");
    t.setValue(year+"-"+month);
}

function getSzText(sbzlDm){
	for(var i=0;i<=szAndUrl.length-1;i++){
		if(sbzlDm == szAndUrl[i]["id"]){
			return szAndUrl[i]["text"];
		}
	}
	return sbzlDm;
}

//初始化税收列
function szRenderer(e){
	var record = e.record;
	var sbzldm = record.sbzldm;
	return getSzText(sbzldm);
}

//初始化操作列
function czRenderer(e){
	var record = e.record;
	var sbztdm = record.sbztdm;
	var sbzldm = record.sbzldm;
	
	//return "<a href='javascript:sbzf("+mini.encode(record)+")'>申报作废</a>";
	if(isNaN(sbzldm)){
			return "";
		} else {
        if (sbzldm == '10115' || sbzldm == '10116') {
            return "";
        }
			return "<a href='javascript:sbzf("+mini.encode(record)+")'>申报作废</a>";
		}
}


function search(){
	var grid = mini.get("sbqkGrid");
	grid.setData("");
	var sbny = getSbny();
	if(parseInt(sbny.substring(sbny.length-2))<6){
		//sbny=sbny+","+new Date().getFullYear()+"00";
		sbnynb=(new Date().getFullYear()-1)+"00";
	}
	var zsxmDm = mini.get("sz").getValue();
	var url = "/sb/sbcommon_sbzfcx.ashx";
	var sbqkVO = querySbqkSbxx(nsrData.djxh,zsxmDm,url,sbny);
	//var sbqkVO = querySbqkSbxx(nsrData.djxh,sssqArray[0],sssqArray[1],sbzlDm,url,sbny)	;// 查询是否已经申报过
	if (sbqkVO == null) {
		//mini.alert("查询异常，请稍后再试！");
		return;
	}
	var grid = mini.get("sbqkGrid");
	grid.setData(sbqkVO);
	return;
}

function querySbqkSbxx(djxh, zsxmDm, url, sbny) {
    mini.parse();
    var sbqkData = null;
    $.ajax({
        url: url,
        type: "post",
        async: false,
        data: {
            djxh: djxh,
            zsxmDm: zsxmDm,
            sbny: sbny,
            sbnb: sbnynb
        },
        success: function (data) {
            var result = mini.decode(data);
            if (!result.success) {
                mini.alert("查询异常，请稍后再试！");
            } else { //查询正常
                if (null != result.data) {
                    sbqkData = result.data;
                } else { // 没有满足条件的数据
                    mini.alert("没有满足条件的数据，请重新选择查询条件");
                }
            }

        },
        error: function (data) {
            mini.alert("查询异常，请稍后再试！");
        }
    });
    return sbqkData;
}

function sbzf(record) {
    var needZfFjs = 'N';
    var fjsSbxxData = "";
    //查询是否存在附加税申报记录，如果存在，则提示用户是否需要同时作废附加税申报记录
    //$.ajax({
    //    url: "/sb/sbcommon_getFjsSbxx.do",
    //    type: "post",
    //    async: false,
    //    data: {
    //        nsrsbh: record.nsrsbh,
    //        djxh: nsrData.djxh,
    //        sssqq: record.skssqq,
    //        sbzldm: record.sbzldm
    //    },
    //    success: function (resultvo) {
    //        var result = mini.decode(resultvo);
    //        if (result.success) {
    //            if (result.data != null) {
    //                needZfFjs = 'Y';
    //                fjsSbxxData = result.data;
    //            }
    //        }
    //    }
    //});
    var message = "是否作废" + getSzText(record.sbzldm) + "的申报";
    if (needZfFjs == 'Y') {
        message = "您作废" + getSzText(record.sbzldm) + "时，将会同时将该税种的附加税一并作废，您确定要执行操作吗？";
    }
    mini.confirm(message, "申报作废",
        function (action) {
            if (action == "ok") {
                doSbzf(record, needZfFjs, fjsSbxxData)
            } else if (needZfFjs == 'Y' && action != "ok") {
                doSbzf(record, "N", fjsSbxxData)
            }
        }
    );
}

function doSbzf(record, needZfFjs, fjsSbxxData) {
    //作废记录
    var mask = mini.loading("作废中，请稍等...", "处理中");
    //if (typeof(window.external.CallFun) != 'undefined') {
    //    var param = '{"version":1, "method": "set", "data":{ "nsrsbh": ' + record.nsrsbh + ', "lx":"sb_zf"}}';
    //    window.external.CallFun("wt.sb", param, function (data) {
    //    });
    //}
    $.ajax({
        url: "/sb/sbcommon_sbzf.ashx",
        type: "post",
        async: false,
        data: {
            id: record.id,
            sbwj: record.qqwjm,
            nsrsbh: record.nsrsbh,
            djxh: nsrData.djxh,
            sssqq: record.skssqq,
            sssqz: record.skssqz,
            sbzldm: record.sbzldm,
            fjssbxx: mini.encode(fjsSbxxData),
            zffsjbz: needZfFjs
        },
        success: function (resultvo) {
            mini.hideMessageBox(mask);
            var result = mini.decode(resultvo);
            if (result.success) {
                //var fkxxlist = result.data;
                //var fkdm = fkxxlist[0].FKDM;
                //var fkxx = fkxxlist[0].FKXX;
                //if (fkxxlist.length > 1) {
                //    fkxx = fkxxlist[0].FKXX + "(" + getSzText(fkxxlist[0].SBZL) + ")," + fkxxlist[1].FKXX + "(" + getSzText(fkxxlist[1].SBZL) + ")";
                //}
                //if (fkdm == 0) {
                //    SUI.store.set('zfbz', 'true');
                //    mini.alert(fkxx, '提醒', function () {
                //        search();  //刷新datagrid
                //    });
                //} else {
                //    mini.alert(fkxx);
                //}
                SUI.store.set('zfbz', 'true');
                mini.alert(result.message, '提醒', function () {
                        search();  //刷新datagrid
                    });
            } else {
                mini.alert(result.message);
            }
        },
        error: function (data) {
            mini.hideMessageBox(mask);
            mini.alert("作废失败");
        }
    });
}






