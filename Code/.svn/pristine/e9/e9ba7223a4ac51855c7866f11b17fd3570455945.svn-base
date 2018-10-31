/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/4
 * Time：20:41
 * Description:三方协议验证、撤销
 */

var sfxyObject={};
/** */
sfxyObject.devflag=false;
sfxyObject.grid='';
sfxyObject.resultData={};
sfxyObject.djxh=nsrxxUtil.getNsrxxVO().djxh;


stepNav.run = function () {

    stepNav.initSteps([{id: 1, title: '三方协议情况', url: 'sfxyxxView.aspx', js: false}]);
    mini.parse();
    sfxyObject.grid = mini.get("sfxyxxqk-grid");
    /** 1、存款账户账号报告*/
    var djxh=sfxyObject.djxh;
    // sfxyObject.isCkzhzhbg(djxh);
    // if(!sfxyObject.resultData.success){
    //     mini.alert(sfxyObject.resultData.message,"提示",function(){
    //         window.close();
    //     });
    //     return false;
    // }else{
    //     if(!sfxyObject.resultData.value){
    //         mini.alert("未查询到您的缴税账号信息，请先维护您的存款账户账号.","提示",function () {
    //             window.location.href="../ckzhzhbg/ckzhzhbg.html";
    //             // window.close();
    //         });
    //         return false;
    //     }
    // }
    /** 2、初始化三方协议*/
    sfxyObject.initSfxyxx(djxh);
    if(!sfxyObject.resultData.success){
        mini.alert(sfxyObject.resultData.message,"提示",function(){
            wssqUtil.closeWin();
        });
        return false;
    }else{
        sfxyObject.grid.setData(sfxyObject.resultData.value);
    }

};

sfxyObject.onActionRenderer=function(e) {
    var record=e.record;
    var valparam = {
        "url" :sfxyObject.sfxyService.Api.yzsfxy,
        "djxh" : record.djxh,
        "czmc":"验证",
        "sfxydjuuid" : record.sfxydjuuid,
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "yhhbDm":record.yhhbDm ,
        "yhyywdDm":record.yhyywdDm ,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc,
        "viewData":""
    };
    var delparam = {
        "url" : sfxyObject.sfxyService.Api.cxsfxy,
        "djxh" : record.djxh,
        "czmc":"撤销",
        "zfbz":"0",
        "sfxydjuuid" : record.sfxydjuuid,
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "yhhbDm":record.yhhbDm ,
        "yhyywdDm":record.yhyywdDm ,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc,
        "viewData":""
    };
    var printparam = {
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "skssswjgMc" : record.skssswjgMc,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc
    };
    var zfparam = {
        "url" : sfxyObject.sfxyService.Api.zfsfxy,
        "djxh" : record.djxh,
        "czmc":"作废",
        "sfxydjuuid" : record.sfxydjuuid,
        "zfbz":"1",
        "viewData":""
    };
    if("01" == record.sfxyztDm){ //01未验证
        return  "<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.zfsfxy("+ mini.encode(zfparam) +
            ")'>撤销</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("02" == record.sfxyztDm){ //02验证通过
        return "<a style='color:blue;' href='javascript:sfxyObject.cxsfxy("+ mini.encode(delparam) +
            ")'>撤销</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("03" == record.sfxyztDm){ //03验证失败
        return "<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("04" == record.sfxyztDm){ //04协议终止
        return "<a style='color:blue;' href='javascript:sfxyObject.qdsfxy()'>签订</a>";
    }

    return "";
}
/**
 * 验证三方协议
 * @param data
 */
sfxyObject.yzsfxy=function (data) {
    var url=data.url;
    sfxyObject.httpSfxy(url,data);
    var result=sfxyObject.resultData;
    if(!result.success){
        mini.alert(result.message);
    }else{
        mini.alert("成功验证三方协议！","提示",function () {
            wssqUtil.closeWin();
        });
    }
}
/**
 * 撤销三方协议
 * @param data
 */
sfxyObject.cxsfxy=function (data) {
    var url=data.url;
    sfxyObject.httpSfxy(url,data);
    var result=sfxyObject.resultData;
    if(!result.success){
        mini.alert(result.message);
    }else{
        mini.alert("成功撤销三方协议！","提示",function () {
            wssqUtil.closeWin();
        });
    }
}
/**
 * 作废三方协议
 * @param data
 */
sfxyObject.zfsfxy=function (data) {
    var url=data.url;
    sfxyObject.httpSfxy(url,data);
    var result=sfxyObject.resultData;
    if(!result.success){
        mini.alert(result.message);
    }else{
        mini.alert("成功撤销三方协议！","提示",function () {
            wssqUtil.closeWin();
        });
    }
}
/**
 * 打印三方协议
 * @param data
 */
sfxyObject.dysfxy=function (data) {
    var newData = mini.clone(data);
    newData.skssswjgMc = newData.skssswjgMc+"("+newData.skssswjgDm+")";
    newData.nsrsbh = wssqUtil.nsrjbxx.nsrsbh;
    newData.nsrmc = wssqUtil.nsrjbxx.nsrmc;
    var printTag = $('#print-content');
    var printConfig = {
        direct: 1,       // 打印方向： 1 正向 2 横向，默认 1
        display: 1,      // 显示方向：1 正向显示，0 横向显示
        view: 1,         // 预览方式：0 适高，1 正常，2 适宽

        zoom: '100%',    // 缩放比例：Full-Width 按整宽，会变形；Full-Height 按整高，会变形；Full-Page 按整页，会变形
                         // Auto-Width 整宽不变形；Full-Height 整高不变形
                         // Width：200%、Height：200%、Width：200%;Height：200%、200%
        link:true,       // 是否引入页面link样式文件
        css: '.form-table input{border:none;width:100%}' ,       // 额外的css样式
        cssLink: 'http://' + location.host + '/wszx-front/apps/views/sfxy/sfxy.css',     // 通过link引入的css样式文件
        style: true      // 页面的 <style></style> 标签
    };
    var html = wssqUtil.loadTemplate('wtkkxysView.html')
        .replace(/onvaluechanged/g,'data-changed')
        .replace(/onblur/g,'data-blur')
        .replace(/allowInput/g,'data-allowInput')
        .replace(/mini-textbox/g,'textbox')
        .replace('修改','').replace('保存','');
    printTag.html(html).find('h2').remove();
    printTag.find('#wtkkxys-actions').remove();
    for(var id in newData){
        $('#'+id).attr('value',newData[id]);
    }
    $('#yhzh').attr('value',newData.jkzh);
    //$("#swjg_gz").attr("src", '../../images/sfxy/swjgyz/'+newData.skssswjgDm+'.png');
	var imgData = sfxyObject.getBase64Img('/wszx-web/swjgyz/'+newData.skssswjgDm+'.png');
//  var imgData = sfxyObject.getBase64Img('/images/sfxy/swjgyz/'+newData.skssswjgDm+'.png');
    $("#swjg_gz").attr("src", imgData);

    imgData = sfxyObject.getBase64Img('/images/sfxy/wt_logo.png');
    $("#sfxy-wtLogo").attr("src", imgData);

    printTag.lodopPrint(printConfig);

};
sfxyObject.getBase64Img = function (filepath){
    //http://192.168.149.129:8081/fpzx-web/apps/images/public/ico-jkqk.png
    //http://192.168.149.129:8081/wszx-web/apps/views/sfxy/sfxyxx.html?code=110703&id=80"
    var src = '';
    $.ajax({
        async: false,
        type:"get",
        url: '/wszx-web/api/public/base64?filepath=' + encodeURI(filepath),
        dataType:'text',
        success: function (result) {
            src = 'data:image/png;base64,'+ result;
        },
        error: function () {
            //mini.alert("请求发生异常情况！");
        }
    });
    return src;
};
/**
 * 签订三方协议
 */
sfxyObject.qdsfxy=function () {
    //跳转三方协议页面
    window.location.href="wtkkxys.html?resource=sfxyxx";
};
sfxyObject.isCkzhzhbg=function(djxh) {
    var url=Api.replaceUrl(sfxyObject.sfxyService.Api.isCkzhzhba,'djxh',{djxh:djxh});
    ajax.post(url,null,function (result) {
        sfxyObject.resultData=result;
    },function () {
        mini.alert("请求发生异常情况！");
    });
}
sfxyObject.sfxyService={
    Api:function () {
        return function () {
            var baseUrl = '../../..',
                realUrl = {
                    /** 查询纳税人税费种认定信息*/
                    isCkzhzhba: '/api/dj/sfxy/get/{{djxh}}/isCkzhzhbaDone',
                    initZSsfxy:'/api/dj/sfxy/init/{{djxh}}/initZSsfxyXX.ashx',
                    yzsfxy:'/api/dj/sfxy/submit/submitYzsfxy',
                    cxsfxy:'/api/dj/sfxy/submit/submitCxsfxy',
                    zfsfxy:'/api/dj/sfxy/submit/submitZfsfxy'
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
sfxyObject.httpSfxy=function (url,data) {
    delete data.url;
    $.ajax({
        async: false,
        type:"POST",
        dataType:"json",
        data: mini.encode({
            "data": mini.encode(data)
        }),
        url: url,
        success: function (result) {
            sfxyObject.resultData=result;
        },
        error: function () {
            mini.alert("请求发生异常情况！");
        }
    });

}
/**
 * 初始化三方协议数据
 * */
sfxyObject.initSfxyxx=function(djxh) {
    var url=Api.replaceUrl(sfxyObject.sfxyService.Api.initZSsfxy,"djxh",{djxh:djxh});
    $.ajax({
        async: false,
        type:"POST",
        url: url,
        success: function (result) {
            sfxyObject.resultData=result;
        },
        error: function () {
            mini.alert("请求发生异常情况！");
        }
    });
}


/**河北特色*/
sfxyObject.sbsfxyWithYHs={};
sfxyObject.sfxyqdbz = false;
stepNav.run = function () {
	
    stepNav.initSteps([{id: 1, title: '三方协议情况', url: 'sfxyxxView.aspx', js: false}]);
    mini.parse();
    sfxyObject.grid = mini.get("sfxyxxqk-grid");
    /** 1、存款账户账号报告*/
    var djxh=sfxyObject.djxh;
    /** 2、初始化三方协议*/
    sfxyObject.initSfxyxx(djxh);
    if(!sfxyObject.resultData.success){
        mini.alert(sfxyObject.resultData.message,"提示",function(){
            window.close();
        });
        return false;
    }else{
		//不显示协议终止的数据
		// for (var i = sfxyObject.resultData.value.length-1 ; i >=0 ; i--) {  
			// if(sfxyObject.resultData.value[i].sfxyztDm == '04' ){
				// sfxyObject.resultData.value.remove(sfxyObject.resultData.value[i]); 
			// }
		// }
        sfxyObject.grid.setData(sfxyObject.resultData.value);
    }
    /**旧税号的三方协议校验*/
	sfxyObject .validatesfxy();
};
/**旧税号，三方协议校验*/
sfxyObject .validatesfxy = function(){
	$.ajax({
		type:"post",
		url:"../../../api/dj/sfxy/validate/validatesfxy.ashx",
		async:false,
		success:function(result){
			if (!result.success) {
	            mini.alert(result.message, "提示");
			}
		}
	});	
}
sfxyObject.onActionRenderer=function(e) {
    var record=e.record;
	var fsyhparam = {
        "url" :sfxyObject.sfxyService.Api.qdsfxytoyh,
        "djxh" : record.djxh,
        "czmc":"发送至银行",
        "sfxydjuuid" : record.sfxydjuuid,
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "yhhbDm":record.yhhbDm ,
        "yhyywdDm":record.yhyywdDm ,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc
    };
    var valparam = {
        "url" :sfxyObject.sfxyService.Api.yzsfxy,
        "djxh" : record.djxh,
        "czmc":"验证",
        "sfxydjuuid" : record.sfxydjuuid,
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "yhhbDm":record.yhhbDm ,
        "yhyywdDm":record.yhyywdDm ,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc,
        "viewData":""

    };
    var delparam = {
        "url" : sfxyObject.sfxyService.Api.cxsfxy,
        "djxh" : record.djxh,
        "czmc":"撤销",
        "zfbz":"0",
        "sfxydjuuid" : record.sfxydjuuid,
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "yhhbDm":record.yhhbDm ,
        "yhyywdDm":record.yhyywdDm ,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc
    };
    var printparam = {
        "sfxyh":record.sfxyh,
        "skssswjgDm":record.skssswjgDm,
        "skssswjgMc" : record.skssswjgMc,
        "khyhhh":record.khyhhh,
        "qsyhhh":record.qsyhhh ,
        "jkzh":record.jkzh ,
        "jkzhmc":record.jkzhmc
    };
    var zfparam = {
        "url" : sfxyObject.sfxyService.Api.zfsfxy,
        "djxh" : record.djxh,
        "czmc":"作废",
        "sfxydjuuid" : record.sfxydjuuid,
        "zfbz":"1",
        "viewData":""

    };
    if("01" == record.sfxyztDm && sfxyObject.sbsfxyWithYHs.indexOf(record.sfxydjuuid)!=-1){ //01未验证并且存在发送银行失败的记录
		sfxyObject.sfxyqdbz = true;
        return  "<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.fssfxytoyh("+ mini.encode(fsyhparam) +
            ")'>发送银行</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.zfsfxy("+ mini.encode(zfparam) +
            ")'>撤销</a>&nbsp;<br/><a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>&nbsp;";
    }else if("01" == record.sfxyztDm && sfxyObject.sbsfxyWithYHs.indexOf(record.sfxydjuuid)==-1){ //01未验证
		sfxyObject.sfxyqdbz = true;
        return  "<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.zfsfxy("+ mini.encode(zfparam) +
            ")'>撤销</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("02" == record.sfxyztDm){ //02验证通过
		sfxyObject.sfxyqdbz = true;
        return "<a style='color:blue;' href='javascript:sfxyObject.cxsfxy("+ mini.encode(delparam) +
            ")'>撤销</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("03" == record.sfxyztDm && sfxyObject.sbsfxyWithYHs.indexOf(record.sfxydjuuid)!=-1){ //03验证失败并且存在发送银行失败的记录
        return "<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.fssfxytoyh("+ mini.encode(fsyhparam) +
            ")'>发送银行</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }else if("03" == record.sfxyztDm && sfxyObject.sbsfxyWithYHs.indexOf(record.sfxydjuuid)==-1){ //03验证失败
        return "<a style='color:blue;' href='javascript:sfxyObject.yzsfxy("+ mini.encode(valparam) +
            ")'>验证</a>&nbsp;<a style='color:blue;' href='javascript:sfxyObject.zfsfxy("+ mini.encode(zfparam) +
            ")'>撤销</a>&nbsp;<a style='margin-left:5px;color:blue;' href='javascript:sfxyObject.dysfxy("+ mini.encode(printparam) +
            ")'>打印</a>";
    }
    /**
    else if("04" == record.sfxyztDm){ //04协议终止
        return "<a style='color:blue;' href='javascript:sfxyObject.qdsfxy()'>签订</a>";
    }
*/
    return "";
}

/**
 * 签订三方协议
 */
sfxyObject.qdsfxy=function () {
	if(sfxyObject.sfxyqdbz){
		mini.alert("您存在已签订未验证或验证通过的三方协议，请先撤销该协议，再重新签订！","提示",function () {
            //window.location.href="sfxyxx.html?code=110703&id=80";
        });
	}else{
		//跳转三方协议页面
		window.location.href="wtkkxys.html?resource=sfxyxx";
	}
};

/**
 * 发送三方协议至银行
 * @param data
 */
sfxyObject.fssfxytoyh=function (data) {
    var url=data.url;
    sfxyObject.httpSfxy(url,data);
    var result=sfxyObject.resultData;
    if(!result.success){
		mini.alert(result.message,"提示",function () {
            window.location.href="sfxyxx.aspx?code=110703&id=80";
        });
    }else{
		data.url = sfxyObject.sfxyService.Api.yzsfxy;
		data.czmc = "验证";
		sfxyObject.zdyzsfxy(data);
    }
}

/**
 * 发银行成功后自动验证三方协议
 * @param data
 */
sfxyObject.zdyzsfxy=function (data) {
    var url=data.url;
    sfxyObject.httpSfxy(url,data);
    var result=sfxyObject.resultData;
    if(!result.success){
        mini.alert(result.value);
    }else{
        mini.alert("三方协议签订并验证成功！由于您的开户银行已实现电子三方协议，故无需再去银行录入协议信息，您可以用该银行账户直接进行网上缴税！","提示",function () {
            window.location.href="sfxyxx.aspx?code=110703&id=80";
        });
    }
}

/**
 * 三方协议发送银行失败的记录
 * @param data
 */
sfxyObject.getSbsfxyWithYH=function (djxh) {
	var url=sfxyObject.sfxyService.Api.getSbsfxyWithYH;
	sfxyObject.httpSfxy(url,'');
    var result=sfxyObject.resultData;
	if(!result.success){
		
	}else{
		sfxyObject.sbsfxyWithYHs=result.value.value;
		var url=Api.replaceUrl(sfxyObject.sfxyService.Api.initZSsfxy,"djxh",{djxh:djxh});
		$.ajax({
			async: false,
			type:"POST",
			url: url,
			success: function (result) {
				for (x in result.value)
					{
						if(sfxyObject.sbsfxyWithYHs.indexOf(result.value[x].sfxydjuuid)!=-1 && result.value[x].sfxyztDm != '04' ){
							result.value[x].sfxyztMc = '发送银行失败';
						}
					}
				sfxyObject.resultData=result;
			},
			error: function () {
				mini.alert("请求发生异常情况！");
			}
		});
	}
}
/**
 * 初始化三方协议数据
 * */
sfxyObject.initSfxyxx=function(djxh) {
	sfxyObject.getSbsfxyWithYH(djxh);
}


sfxyObject.sfxyService={
    Api:function () {
        return function () {
            var baseUrl = '../../..',
                realUrl = {
                    /** 查询纳税人税费种认定信息*/
                    isCkzhzhba: '/api/dj/sfxy/get/{{djxh}}/isCkzhzhbaDone',
                    initZSsfxy:'/api/dj/sfxy/init/{{djxh}}/initZSsfxyXX.ashx',
                    yzsfxy:'/api/dj/sfxy/submit/submitYzsfxy',
					qdsfxytoyh:'/api/dj/sfxy/submit/submitQdsfxyToYH',
                    cxsfxy:'/api/dj/sfxy/submit/submitCxsfxy',
					getSbsfxyWithYH:'/api/dj/sfxy/get/getSbsfxyWithYH.ashx',
                    zfsfxy:'/api/dj/sfxy/submit/submitZfsfxy'
                }
            for (var url in realUrl) {
                realUrl[url] = baseUrl + realUrl[url];
            }
            return realUrl;
        }();
    }()
};

/**
 * 打印三方协议
 * @param data
 */
sfxyObject.dysfxy=function (data) {
    var newData = mini.clone(data);
    newData.skssswjgMc = newData.skssswjgMc+"("+newData.skssswjgDm+")";
    newData.nsrsbh = wssqUtil.nsrjbxx.nsrsbh;
    newData.nsrmc = wssqUtil.nsrjbxx.nsrmc;
    var printTag = $('#print-content');
    var printConfig = {
        importCSS:false,
        loadCSS: "/wszx-web/apps/views/sfxy/sfxy-print.css",  //* path to additional css file - us an array [] for multiple
    };
    var html = wssqUtil.loadTemplate('wtkkxysView.html')
        .replace(/onvaluechanged/g,'data-changed')
        .replace(/onblur/g,'data-blur')
        .replace(/allowInput/g,'data-allowInput')
        .replace(/mini-textbox/g,'textbox')
        .replace('修改','').replace('保存','');
    printTag.html(html).find('h2').remove();
    printTag.find('#wtkkxys-actions').remove();
    printTag.find('.empty-tr').remove();
    for(var id in newData){
        $('#'+id).attr('value',newData[id]);
    }
    $('#yhzh').attr('value',newData.jkzh);

    var imgData = sfxyObject.getBase64Img('/swjgyz/'+newData.skssswjgDm+'.png');
    $("#swjg_gz").attr("src", imgData);

    imgData = sfxyObject.getBase64Img('/apps/images/sfxy/wt_logo.png');
    $("#sfxy-wtLogo").attr("src", imgData);

    printTag.printThis(printConfig);

};