/**
 * Created by lkl on 2017/1/19.
 */

var cwkjzdba = {};

stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer

stepNav.run=function () {
    //重复校验现由智数中心处理
    // var zzblFlag = wssqUtil.checkZzbl(wssqUtil.currentSwsxDm);
    // if(!zzblFlag) {
    //     return;
    // }

    stepNav.initSteps([
        {id:0,title:'填写申请表',url:'xxbgView.aspx'},
        {id:1,title:'预览提交',url:'yltjView.aspx',yltj:true},
        {id:2,title:'完成',url: '../public1/wc/wc.aspx',js:true}
    ]);

    // 添加一条查看报告窗口
    var ckBgViewHtml = wssqUtil.loadTemplate('ckBgView.aspx');
    $('body').append(ckBgViewHtml);

    mini.parse();
    cwkjzdba.xxbgForm = new mini.Form("#cwkjzdbas");
    cwkjzdba.yltjForm = new mini.Form("#yltj");
    cwkjzdba.ckcwkjzdbaWin = mini.get("ckbg-win")
    cwkjzdba.ckcwkjzdbabg = new mini.Form("ckbg");

    cwkjzdbaService.getYxqq({}, function (data) {
        var resultData = mini.decode(data);
        if(resultData.success){
            mini.get("yxqq").setValue(resultData.value);
        }
//      else {
//          mini.get("yxqq").setReadOnly(false);
//      }
        mini.get("yxqq").setReadOnly(false);
    });

    cwkjzdba.doValidate();
    cwkjzdba.init();

    // 财务会计制度下拉框
    cwkjzdba.cwkjzddata = baseCode.getDataByCodeName('DM_SYKJZD.ashx')||[];
    mini.get('kjzdzzDm').setData(cwkjzdba.cwkjzddata );

    //低值易耗品摊销方法
    cwkjzdba.dzyhptxffdata = baseCode.getDataByCodeName('DM_DZYHPTXFF.ashx')||[];
    mini.get('dzyhptxffDm').setData(cwkjzdba.dzyhptxffdata);

    // 折旧方法大类下拉框
    cwkjzdba.zjffdldata = baseCode.getDataByCodeName('DM_ZJFF_DL.ashx')||[];
    mini.get('zjfsdlDm').setData(cwkjzdba.zjffdldata );

    // 成本核算方法下拉框
    cwkjzdba.cbhsffdata = baseCode.getDataByCodeName('DM_CBHSFF.ashx')||[];
    mini.get('cbhsffDm').setData(cwkjzdba.cbhsffdata );

    // 会计报表报送期限下拉框
    cwkjzdba.kjbbbsqxdata = baseCode.getDataByCodeName('KJBB_BSQX.ashx')||[];
    mini.get('kjbbbsqxDm').setData(cwkjzdba.kjbbbsqxdata );

    // 数据库名称下拉框
    cwkjzdba.sjkmcdata = baseCode.getDataByCodeName('DM_SJKMC.ashx')||[];
    mini.get('kjhsrjsjklxmc').setData(cwkjzdba.sjkmcdata );


};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    var result= false;
    if(newIndex==1){
        result = cwkjzdba.xxbgForm.validate();
        if(result){
            cwkjzdba.yltjForm.setData(cwkjzdba.xxbgForm.getDataAndText(true));

        }
    }

    if(newIndex==2){
        result = cwkjzdba.yltj();
    }
    return result;
};

stepNav.onFinished=function (event, currentIndex) {
    cwkjzdba.yltj();
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','/web-front/bszm-front/apps/views/home/home.html');
};

stepNav.onStepDataSaved=function (event, currentIndex, newIndex) {

};

cwkjzdba.init = function () {
    var nsrjbxx = wssqUtil.nsrjbxx;
    $('#nsrsbh').text(nsrjbxx.nsrsbh);
    mini.get('nsrsbh_hidden').setValue(nsrjbxx.nsrsbh);
    $('#nsrmc').text(nsrjbxx.nsrmc);
    mini.get('nsrmc_hidden').setValue(nsrjbxx.nsrmc);
}

cwkjzdba.showCwbbxx = function (event) {
    var dm = mini.get("kjzdzzDm").getValue();
    var kjbb = mini.get("kjbb");
    var sbbDm = mini.get("sbbDm");
    cwkjzdbaService.getKjbbmc({}, function (data) {
        var aryData = mini.decode(data);
        if (aryData != null && aryData.length > 0) {
            for ( var i = 0; i < aryData.length; i++) {
                if (aryData[i].DM == dm) {
                    kjbb.setValue(aryData[i].KJBB);
                    sbbDm.setValue(aryData[i].KJBB_DM);
                    return;
                }
            }
        }
    })
}

cwkjzdba.zjffValueChange = function (e) {
    var zjffdlDm = e.value;

    cwkjzdbaService.getZjffxl({
        'codename': 'DM_ZJFF',
        'dlValue': zjffdlDm,
        'dlName': 'ZJFF_DL_DM'},function(data){
            var zjffxlData = mini.decode(data);
            mini.get('zjfsxlDm').setData(zjffxlData);
    });
}

cwkjzdba.doValidate = function () {
    cwkjzdbaService.getCwkjzdbaxx({},function(data){
        var resultData = mini.decode(data);
        if(resultData.success){
            if (resultData.value.cwkjzdjhsrjbabgsVO != null){
                var cwkjzdbaxx = resultData.value.cwkjzdjhsrjbabgsVO;
                var cwkjzdjhsrjbabgsVO = cwkjzdbaxx.cwkjzdjhsrjbabgsVO;
                var yxbz = cwkjzdjhsrjbabgsVO.yxbz;

                if("N" == yxbz){
                    mini.alert("备案已过期，请重新备案",'提示信息');
                    return;
                }

                var kjbbqkGrid = cwkjzdbaxx.kjbbqkGrid.kjbbqkGridlb[0]||"";
                var viewData = {
                    kjzdzzDm : cwkjzdjhsrjbabgsVO.kjzdzzDm,
                    dzyhptxffDm: cwkjzdjhsrjbabgsVO.dzyhptxffDm,
                    zjfsdlDm: cwkjzdjhsrjbabgsVO.zjfsdlDm,
                    zjfsxlDm: cwkjzdjhsrjbabgsVO.zjfsxlDm,
                    yxqq: mini.formatDate(cwkjzdjhsrjbabgsVO.yxqq, "yyyy-MM"),
                    cbhsffDm: cwkjzdjhsrjbabgsVO.cbhsffDm,
                    kjhsrjmc: cwkjzdjhsrjbabgsVO.kjhsrjmc,
                    kjhsrjsjklxmc: cwkjzdjhsrjbabgsVO.kjhsrjsjklxmc,
                    kjhsrjqysj: cwkjzdjhsrjbabgsVO.kjhsrjqysj,
                    kjhsrjbbh: cwkjzdjhsrjbabgsVO.kjhsrjbbh,
                    kjbbbsqxDm: kjbbqkGrid.kjbbbsqxDm||""
                }
                cwkjzdba.xxbgForm.setData(viewData);
                cwkjzdba.xxbgForm.setEnabled(false);
                // 把下一步移除
                stepNav.wizard.find('.actions').remove();

                mini.alert("已经备案，不能重复备案",'提示信息', function () {
                    wssqUtil.closeWin();
                    return false;
                });
            }
        }else {
            mini.alert("查询备案信息出错",'提示信息', function () {
                wssqUtil.closeWin();
                return false;
            });
        }
    });
}

cwkjzdba.validate = function () {
    return cwkjzdba.xxbgForm.validate();
}

/**
 * 会计制度执行期起：不能选择本月之前的日期
 * modified by zhjn 2015-10-10
 * 由于现在会计制度执行期起是从税费中中获取故不作校验
 */
cwkjzdba.onDrawDate = function (e) {
    var date = e.date;
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var d2 = new Date(year,month,1);

    if (date.getTime() < d2.getTime()) {
        e.allowSelect = false;
    }
}

/**
 * 会计制度执行期起：不能手动输入本月之前的日期
 * modified by zhjn 2015-10-15
 * 由于现在会计制度执行期起是从税费中中获取故不作校验
 */
cwkjzdba.validateKjzdzxqQ = function (e) {
    var selectDate = mini.get('yxqq').getValue();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var d2 = new Date(year,month,1);

    if(selectDate && selectDate.getTime() < d2.getTime()){
        mini.alert("请输入不小于本月的日期！");
        mini.get('yxqq').setValue();
    }
}

cwkjzdba.getG3RequestVO = function (data) {
    cwkjzdba.cwkjzdjhsrbabgsVO = {};
    cwkjzdba.cwkjzdjhsrbabgsVO.cwkjzdbauuid = "";

    cwkjzdba.cwkjzdhsrjbaGrid = {};
    cwkjzdba.cwkjzdhsrjbaGridlb = [];
    cwkjzdba.cwkjzdhsrjbaGrid.cwkjzdhsrjbaGridlb = cwkjzdba.cwkjzdhsrjbaGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.cwkjzdhsrjbaGrid = cwkjzdba.cwkjzdhsrjbaGrid;

    cwkjzdba.cwkjzdjhsrjbabgsVO = {};
    // 成本核算方法
    cwkjzdba.cwkjzdjhsrjbabgsVO.cbhsffDm = data.cbhsffDm;
    cwkjzdba.cwkjzdjhsrjbabgsVO.cwkjzdbauuid = "";
    cwkjzdba.cwkjzdjhsrjbabgsVO.djxh = "";
    // 低值易耗品摊销方法
    cwkjzdba.cwkjzdjhsrjbabgsVO.dzyhptxffDm = data.dzyhptxffDm;
    // 版本号
    cwkjzdba.cwkjzdjhsrjbabgsVO.kjhsrjbbh = data.kjhsrjbbh;
    // 会计核算软件名称
    cwkjzdba.cwkjzdjhsrjbabgsVO.kjhsrjmc = data.kjhsrjmc;
    // 会计核算软件启用时间
    cwkjzdba.cwkjzdjhsrjbabgsVO.kjhsrjqysj = data.kjhsrjqysj;
    // 数据库名称
    cwkjzdba.cwkjzdjhsrjbabgsVO.kjhsrjsjklxmc = data.kjhsrjsjklxmc;
    // 财务会计制度
    cwkjzdba.cwkjzdjhsrjbabgsVO.kjzdzzDm = data.kjzdzzDm;
    cwkjzdba.cwkjzdjhsrjbabgsVO.lcslid = "";
    cwkjzdba.cwkjzdjhsrjbabgsVO.lrrDm = "";
    cwkjzdba.cwkjzdjhsrjbabgsVO.lrrq = "";
    cwkjzdba.cwkjzdjhsrjbabgsVO.yxbz = "Y";
    // 会计制度执行期起
    cwkjzdba.cwkjzdjhsrjbabgsVO.yxqq = data.yxqq + "-01";
    cwkjzdba.cwkjzdjhsrjbabgsVO.yxqz = "9999-12-30";
    // 折旧方法大类
    cwkjzdba.cwkjzdjhsrjbabgsVO.zjfsdlDm = data.zjfsdlDm;
    // 折旧方法小类
    cwkjzdba.cwkjzdjhsrjbabgsVO.zjfsxlDm = data.zjfsxlDm;
    cwkjzdba.cwkjzdjhsrbabgsVO.cwkjzdjhsrjbabgsVO = cwkjzdba.cwkjzdjhsrjbabgsVO;

    cwkjzdba.deletekjbbqkGrid = {};
    cwkjzdba.kjbbqkGridlb = [];
    cwkjzdba.deletekjbbqkGrid.kjbbqkGridlb = cwkjzdba.kjbbqkGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.deletekjbbqkGrid = cwkjzdba.deletekjbbqkGrid;

    cwkjzdba.deleteqtzlGrid = {};
    cwkjzdba.qtzlGridlb = [];
    cwkjzdba.deleteqtzlGrid.qtzlGridlb = cwkjzdba.qtzlGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.deleteqtzlGrid = cwkjzdba.deleteqtzlGrid;

    cwkjzdba.dzbzdsbgxmGrid = {};
    cwkjzdba.dzbzdsbgxmGridlb = [];
    cwkjzdba.dzbzdsbgxmGrid.dzbzdsbgxmGridlb = cwkjzdba.dzbzdsbgxmGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.dzbzdsbgxmGrid = cwkjzdba.dzbzdsbgxmGrid;

    cwkjzdba.insertkjbbqkGrid = {};
    cwkjzdba.kjbbqkGridlbs = [];
    var dms = data.sbbDm.split(",");
    for(var i=0;i<dms.length;i++){
        cwkjzdba.kjbbqkGridlb = {};
        cwkjzdba.kjbbqkGridlb.cwbbzlDm = dms[i];
        cwkjzdba.kjbbqkGridlb.cwkjzdbauuid = "";
        cwkjzdba.kjbbqkGridlb.djxh = "";
        // 会计报表报送期限
        cwkjzdba.kjbbqkGridlb.kjbbbsqxDm = data.kjbbbsqxDm;
        cwkjzdba.kjbbqkGridlb.kjbbbsqjDm = data.kjbbbsqjDm;
        cwkjzdba.kjbbqkGridlb.kjbbmcuuid = "";
        cwkjzdba.kjbbqkGridlb.lcslid = "";
        cwkjzdba.kjbbqkGridlb.lrrDm = "";
        cwkjzdba.kjbbqkGridlb.lrrq = "";
        cwkjzdba.kjbbqkGridlb.yxbz = "Y";
        cwkjzdba.kjbbqkGridlbs.push(cwkjzdba.kjbbqkGridlb);
    }
    cwkjzdba.insertkjbbqkGrid.kjbbqkGridlb = cwkjzdba.kjbbqkGridlbs;
    cwkjzdba.cwkjzdjhsrbabgsVO.insertkjbbqkGrid = cwkjzdba.insertkjbbqkGrid;

    cwkjzdba.insertqtzlGrid = {};
    cwkjzdba.qtzlGridlb = [];
    cwkjzdba.insertqtzlGrid.qtzlGridlb = cwkjzdba.qtzlGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.insertqtzlGrid = cwkjzdba.insertqtzlGrid;

    cwkjzdba.updatekjbbqkGrid = {};
    cwkjzdba.kjbbqkGridlb = [];
    cwkjzdba.updatekjbbqkGrid.kjbbqkGridlb = cwkjzdba.kjbbqkGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.updatekjbbqkGrid = cwkjzdba.updatekjbbqkGrid;

    cwkjzdba.updateqtzlGrid = {};
    cwkjzdba.qtzlGridlb = [];
    cwkjzdba.updateqtzlGrid.qtzlGridlb = cwkjzdba.qtzlGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.updateqtzlGrid = cwkjzdba.updateqtzlGrid;
	
	cwkjzdba.noStatuskjbbqkGrid = {};
    cwkjzdba.kjbbqkGridlb = [];
    cwkjzdba.noStatuskjbbqkGrid.kjbbqkGridlb = cwkjzdba.kjbbqkGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.noStatuskjbbqkGrid = cwkjzdba.noStatuskjbbqkGrid;

    cwkjzdba.noStatusqtzlGrid = {};
    cwkjzdba.qtzlGridlb = [];
    cwkjzdba.noStatusqtzlGrid.qtzlGridlb = cwkjzdba.qtzlGridlb;
    cwkjzdba.cwkjzdjhsrbabgsVO.noStatusqtzlGrid = cwkjzdba.noStatusqtzlGrid;

    cwkjzdba.ysqywslxxbVO ={};
    cwkjzdba.ysqywslxxbVO.djxh = "";
    cwkjzdba.ysqywslxxbVO.hzrDm = "";
    cwkjzdba.ysqywslxxbVO.hzrq = "";
    cwkjzdba.ysqywslxxbVO.hzswjgDm = "";
    cwkjzdba.ysqywslxxbVO.lrrDm = "";
    cwkjzdba.ysqywslxxbVO.lrrq = "";
    cwkjzdba.ysqywslxxbVO.slrDm = "";
    cwkjzdba.ysqywslxxbVO.slrq = "";
    cwkjzdba.ysqywslxxbVO.slswjgDm = "";
    cwkjzdba.ysqywslxxbVO.slswsxDm = "SLSXA011030001";
    cwkjzdba.ysqywslxxbVO.uuid = "";
    cwkjzdba.cwkjzdjhsrbabgsVO.ysqywslxxbVO = cwkjzdba.ysqywslxxbVO;

    cwkjzdba.g3RequestVO = {};
    cwkjzdba.g3RequestVO.cwkjzdjhsrbabgsVO = cwkjzdba.cwkjzdjhsrbabgsVO;
    return cwkjzdba.g3RequestVO;
}


cwkjzdba.yltj = function () {
    var data = cwkjzdba.xxbgForm.getDataAndText(true),
        result = false;
    cwkjzdba.g3RequestData = mini.encode(cwkjzdba.getG3RequestVO(data));
    cwkjzdbaService.tj(cwkjzdba.g3RequestData, function (data) {
        if (!data.success) {
            mini.alert(data.message);
        }else {
            result = true;
        }
    });
    return  result;
}

cwkjzdba.ckcwkjzdba = function() {
    cwkjzdba.ckcwkjzdbabg.setData(cwkjzdba.xxbgForm.getDataAndText(true));
    cwkjzdba.ckcwkjzdbaWin.show();
}






stepNav.run=function () {
    //重复校验现由智数中心处理
    // var zzblFlag = wssqUtil.checkZzbl(wssqUtil.currentSwsxDm);
    // if(!zzblFlag) {
    //     return;
    // }

    stepNav.initSteps([
        {id:0,title:'填写申请表',url:'xxbgView.aspx'},
        {id:1,title:'预览提交',url:'yltjView.aspx',yltj:true},
        {id:2,title:'完成',url: '../public1/wc/wc.aspx',js:true}
    ]);

    // 添加一条查看报告窗口
    var ckBgViewHtml = wssqUtil.loadTemplate('ckBgView.aspx');
    $('body').append(ckBgViewHtml);

    mini.parse();
    cwkjzdba.xxbgForm = new mini.Form("#cwkjzdbas");
    cwkjzdba.yltjForm = new mini.Form("#yltj");
    cwkjzdba.ckcwkjzdbaWin = mini.get("ckbg-win")
    cwkjzdba.ckcwkjzdbabg = new mini.Form("ckbg");

    cwkjzdbaService.getYxqq({}, function (data) {
        var resultData = mini.decode(data);
        if(resultData.success){
            mini.get("yxqq").setValue(resultData.value);
        }
//      else {
//          mini.get("yxqq").setReadOnly(false);
//      }
        mini.get("yxqq").setReadOnly(false);
    });

    cwkjzdba.init();

    // 财务会计制度下拉框
    cwkjzdba.cwkjzddata = baseCode.getDataByCodeName('DM_SYKJZD.ashx')||[];
    mini.get('kjzdzzDm').setData(cwkjzdba.cwkjzddata );

    //低值易耗品摊销方法
    cwkjzdba.dzyhptxffdata = baseCode.getDataByCodeName('DM_DZYHPTXFF.ashx')||[];
    mini.get('dzyhptxffDm').setData(cwkjzdba.dzyhptxffdata);

    // 折旧方法大类下拉框
    cwkjzdba.zjffdldata = baseCode.getDataByCodeName('DM_ZJFF_DL.ashx')||[];
    mini.get('zjfsdlDm').setData(cwkjzdba.zjffdldata );

    // 成本核算方法下拉框
    cwkjzdba.cbhsffdata = baseCode.getDataByCodeName('DM_CBHSFF.ashx')||[];
    mini.get('cbhsffDm').setData(cwkjzdba.cbhsffdata );

    // 会计报表报送期限下拉框
    cwkjzdba.kjbbbsqxdata = baseCode.getDataByCodeName('KJBB_BSQX.ashx')||[];
    mini.get('kjbbbsqxDm').setData(cwkjzdba.kjbbbsqxdata );

    // 数据库名称下拉框
    cwkjzdba.sjkmcdata = baseCode.getDataByCodeName('DM_SJKMC.ashx')||[];
    mini.get('kjhsrjsjklxmc').setData(cwkjzdba.sjkmcdata );

    cwkjzdba.doValidate();
};

cwkjzdba.doValidate = function () {
    cwkjzdbaService.getCwkjzdbaxx({},function(data){
        var resultData = mini.decode(data);
        if(resultData.success){
            if (resultData.value.cwkjzdjhsrjbabgsVO != null){
                var cwkjzdbaxx = resultData.value.cwkjzdjhsrjbabgsVO;
                var cwkjzdjhsrjbabgsVO = cwkjzdbaxx.cwkjzdjhsrjbabgsVO;
                var yxbz = cwkjzdjhsrjbabgsVO.yxbz;

                if("N" == yxbz){
                    mini.alert("备案已过期，请重新备案",'提示信息');
                    return;
                }

                var kjbbqkGrid = cwkjzdbaxx.kjbbqkGrid.kjbbqkGridlb[0]||"";
                var viewData = {
                    kjzdzzDm : cwkjzdjhsrjbabgsVO.kjzdzzDm,
                    dzyhptxffDm: cwkjzdjhsrjbabgsVO.dzyhptxffDm,
                    zjfsdlDm: cwkjzdjhsrjbabgsVO.zjfsdlDm,
                    zjfsxlDm: cwkjzdjhsrjbabgsVO.zjfsxlDm,
                    yxqq: mini.formatDate(cwkjzdjhsrjbabgsVO.yxqq, "yyyy-MM"),
                    cbhsffDm: cwkjzdjhsrjbabgsVO.cbhsffDm,
                    kjhsrjmc: cwkjzdjhsrjbabgsVO.kjhsrjmc,
                    kjhsrjsjklxmc: cwkjzdjhsrjbabgsVO.kjhsrjsjklxmc,
                    kjhsrjqysj: cwkjzdjhsrjbabgsVO.kjhsrjqysj,
                    kjhsrjbbh: cwkjzdjhsrjbabgsVO.kjhsrjbbh,
                    kjbbbsqxDm: kjbbqkGrid.kjbbbsqxDm||""
                }
                cwkjzdba.xxbgForm.setData(viewData);
                cwkjzdba.showCwbbxx();
                var zjfsdl = mini.get("zjfsdlDm");
                cwkjzdba.zjffValueChange(zjfsdl);
                cwkjzdba.xxbgForm.setEnabled(false);
                // 把下一步移除
                stepNav.wizard.find('.actions').remove();
        		$('#closeBtn').show();
        		
        		return;
            }
        }else {
            mini.alert("查询备案信息出错",'提示信息', function () {
                window.close();
                return false;
            });
        }

        var $content = $('.content.clearfix');
		var contentH = $content.height();
		var closeBtnH = $('#closeBtn').parent().height();
		$('#closeBtn').hide();
		$content.height(contentH-closeBtnH);
    });
    
    /*关闭*/
	$(".txt-c").on('click','#closeBtn',function(){
		closeWin();
	});
}

function closeWin(){
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1
        || userAgent.indexOf("Chrome") != -1) {
        close();//直接调用JQUERY close方法关闭
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}