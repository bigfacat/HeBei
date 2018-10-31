/**
 * Created with JetBrains WebStorm
 * Author：zsi
 * Date：2017/2/13
 * Time：20:41
 *
 */
var ybnsrjyzsrd={};
stepNav.wizard = $('#wizard'); // 指定stpes容器
stepNav.head = true;  // 是否加载 header
stepNav.foot = true;  // 是否加载 footer
var jyzsGrid,fbzlGrid,fbzlylGrid ;
var flagBoolean = false;
// 步骤框架的入口
stepNav.run=function () {
    var flag = true;
    if (flag) {
        stepNav.initSteps([
            {id:0,title:'填写申请表',url:'zsrdView.aspx'},
            {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
            {id:2,title:'预览提交',url:'zsrdylView.aspx',yltj:true},
			{id:3,title:'审核中',url:'../public1/shz/shz.aspx',js:true},
            {id:4,title:'完成',url:'../public1/wc/wc.aspx',js:true}

        ]);
    } else {
        wssqUtil.initPrePage("由于您是新开企业，需要先完成", "税务登记信息补录",
            "../../../apps/views/swdjxxbl/swdjxxbl.html");
    }
    //查询纳税人是否具有一般纳税人资格
    ybnsrjyzsrd.queryYbnsrZg();
    var nsrjbxx = wssqUtil.nsrjbxx;
    $('#nsrsbh').text(nsrjbxx.nsrsbh);
    $('#nsrmc').text(nsrjbxx.nsrmc);
    jyzsGrid = mini.get("jyzsGrid");
    fbzlGrid = mini.get('fbzl-grid');
    fbzlylGrid = mini.get('fbzl-yl-grid');

};
// 步骤跳转前执行
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if(currentIndex==0){
        if(!validateGrid(jyzsGrid)){
            return;
        }
        var dataList = jyzsGrid.getData();
        if(dataList.length == 0){
        	mini.alert("申请信息不能为空！");
        	return;
        }
        //获取附报资料列表
        //wssqUtil.currentSwsxDm = '110402'; //现在是固定写死的，正式上线时去掉就可以了
        var swsxMxDmList = []; //如果有税务事项明细代码请组织好
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        fbzlAjax(datas,'requestFbzllist'); 
    }
    if(currentIndex==1){
		//判断是否按要求上传附报资料
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);
	}
    if(currentIndex==2){
    	ybnsrjyzsrd.tjsqxx();
		return flagBoolean;
	}
    
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if(currentIndex==2){
    	var jyzsGrid_yl = mini.get("jyzsGrid_yl");
    	jyzsGrid_yl.setData(jyzsGrid.getData());
    }       
};
// 结束后执行
stepNav.onFinished=function (event, currentIndex) {
    wssqUtil.showResult('您的申请已经成功提交，欢迎继续使用','我的办税大厅','../../../apps/views/home/home.html');
};

//查询当前纳税人的纳税人资格
ybnsrjyzsrd.queryYbnsrZg = function () {
    ybnsrjyzsrdService.queryYbnsrZg(mini.encode({}),function(data){
        var resultData = mini.decode(data);
        if(resultData.success){
            var data = resultData.value;
            var isZzsYbnsr = false;
            for(var i=0;i<data.length;i++){
                if(data[i].nsrzglxDm == "201"||data[i].nsrzglxDm == "202"){
                    isZzsYbnsr = true;
                    break;
                }
            }
            if(data.length==0 || !isZzsYbnsr){
                mini.alert("您未认定为增值税一般纳税人，不能申请一般纳税人简易办法征收备案！",'提示信息',function(){
                    wssqUtil.closeWin();
                });
            }
        }else {
            mini.alert("查询是否具有一般纳税人资格失败",'提示信息');
        }
    });
};
ybnsrjyzsrd.addZslx = function() {
    // 设置默认有效期起为当月的月初
    var newRow = {
        "jybfzslxDm":"",
        "jybfzslxMc":"",
        "yxqq": "",
        "yxqz": ""
    };
    jyzsGrid.addRow(newRow, 0);
};
function onCellcommitedit(e) {
	var row = e.row;
	var yxqq = row.yxqq;
	if(e.field == "yxqq"){
		if(row.yxqz!=""){
			jyzsGrid.updateRow(row,{yxqz:""});
		}
		var zslxDm = row.jybfzslxDm;
		if(zslxDm=="03"){
			var d = new Date("2017","11");
			var c = new Date(e.value.substring(0,4),(e.value.substring(5,7)-1));
			if(c.getTime() > d.getTime()){
				jyzsGrid.updateRow(row,{yxqq:""});
				mini.alert("选择“C.动漫企业为开发动漫产品提供的应税服务”不得晚于2017年12月！","提示");
			}
		}
		else if(zslxDm=="10"){
			var d = new Date("2015","11");
			var c = new Date(e.value.substring(0,4),(e.value.substring(5,7)-1));
			if(c.getTime() > d.getTime()){
				jyzsGrid.updateRow(row,{yxqq:""});
				mini.alert("选择“J.通过卫星提供的语音通话服务、电子数据和信息的传输服务” 不得晚于2015年12月！");
			}
		}
	}

	if (e.field == "yxqz") {
		if(yxqq==""){
			e.isValid = false;
			jyzsGrid.updateRow(row,{yxqz:""});
			mini.alert("请先填有效期起！","提示",function(){
				jyzsGrid.beginEditCell(e.rowIndex, e.column._id-1);
			});
		}
		var zslxDm = row.jybfzslxDm;
		if(zslxDm=="03"){
			var b = new Date(row.yxqq.substring(0,4),(row.yxqq.substring(5,7)-1));
			var d = new Date("2017","11");
			var c = new Date(e.value.substring(0,4),(e.value.substring(5,7)-1));
			if(c.getTime() > d.getTime()){
				jyzsGrid.updateRow(row,{yxqz:""});
				mini.alert("选择“C.动漫企业为开发动漫产品提供的应税服务”不得晚于2017年12月！","提示");
			}
			if(c.getTime()< b.getTime()){
				jyzsGrid.updateRow(row,{yxqz:""});
				mini.alert("有效期止不能小于有效期起！","提示");
			}
		}
		else if(zslxDm=="10"){
			var b = new Date(row.yxqq.substring(0,4),(row.yxqq.substring(5,7)-1));
			var d = new Date("2015","11");
			var c = new Date(e.value.substring(0,4),(e.value.substring(5,7)-1));
			if(c.getTime() > d.getTime()){
				jyzsGrid.updateRow(row,{yxqz:""});
				mini.alert("选择“J.通过卫星提供的语音通话服务、电子数据和信息的传输服务” 不得晚于2015年12月！","提示");
			}
			if(c.getTime()< b.getTime()){
				jyzsGrid.updateRow(row,{yxqz:""});
				mini.alert("有效期止不能小于有效期起！","提示");
			}
		}
		else{
			if(row.yxqz != "" && row.yxqq != "") {
				var yxqz = new Date(row.yxqz.substring(0, 4), (row.yxqz.substring(5, 7) - 1));
				var MinYxqz =  new Date(row.yxqq.substring(0, 4), (row.yxqq.substring(5, 7) - 1 + 35));
				if (MinYxqz.getTime() > yxqz.getTime()) {
					e.isValid = false;
					jyzsGrid.updateRow(row,{yxqz:""});
					mini.alert("一般纳税人选择简易办法计算缴纳增值税后，36个月内不得变更！有效期止最早请选择"+MinYxqz.format("yyyy-MM-dd").substring(0,4)+"年"+MinYxqz.format("yyyy-MM-dd").substring(5,7)+"月","提示");
				}
			}
		}
	}else if (e.field == "jybfzslxDm") {
		var rows= e.row;
		jyzsGrid.updateRow(rows,{yxqq:"",yxqz:""});
		if ($.trim(e.value) == '') return false;
		var row = jyzsGrid.findRow(function(crow) {
			if (crow.jybfzslxDm == e.value && crow._uid!=e.row._uid) {
				return true;
			}
			return false;
		});
		if(row){
			e.isValid = false;
			e.errorText = "征收类型重复";
			// 设置默认有效期起为当月的月初	
			jyzsGrid.updateRow(e.row,{"jybfzslxDm":"","jybfzslxMc":"","yxqq":"","yxqz": ""});
			mini.alert("选择的简易征收方式，在页面上已存在，请重新录入！");
		}
	}
}
function getTxData() {
	// 申请的dataGrid
	var jyzsGridData = jyzsGrid.getData();
	return changeDate(jyzsGridData);
}

function getFormData() {
	var formData = {};
	var jyzsGridList = jyzsGrid.getData();
	formData.zsba = changeDate(jyzsGridList);
	return formData;
}

//转换时间，年月加上日，起时间从一号开始，止时间从月底开始
function changeDate(jyzsGridList){
	for(var i=0;i<jyzsGridList.length;i++){
		//起时间
		var yxqq = jyzsGridList[i].yxqq;
		var yxqqDate = mini.parseDate(yxqq);
		yxqq = mini.formatDate(yxqqDate,'yyyy-MM-dd');
		jyzsGridList[i].yxqq = yxqq;
		//止时间
		var yxqz = jyzsGridList[i].yxqz;
		var yxqzDate = mini.parseDate(yxqz);
		yxqzDate = mini.addDate(yxqzDate,1,'MO');
		yxqzDate = mini.addDate(yxqzDate,-1,'D');
		yxqz = mini.formatDate(yxqzDate,'yyyy-MM-dd');
		jyzsGridList[i].yxqz = yxqz;
	}
	return jyzsGridList;
}
ybnsrjyzsrd.tjsqxx = function(e){    		
	var frameData = getFormData();
	filterExcessData();
	ybnsrjyzsrdService.tj(mini.encode(frameData), function (data) {
        var result = mini.decode(data);
        if (result.success) {        	
        	flagBoolean = true;
        } else {
            mini.alert(result.message);
        }
    });
};














/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/11/21
 * Time：20:41
 *
 */
// 步骤框架的入口
stepNav.run=function () {
    stepNav.initSteps([
        {id:0,title:'填写申请表',url:'zsrdView.aspx'},
        {id:1,title:'上传附报资料',url:'../public1/fbzl/FbzlView.aspx',js:true},
        {id:2,title:'预览提交',url:'zsrdylView.aspx',yltj:true},
        {id:3,title:'完成',url:'../public1/wc/wc.aspx',js:true}

    ]);
    //查询纳税人是否具有一般纳税人资格
    ybnsrjyzsrd.queryYbnsrZg();
    var nsrjbxx = wssqUtil.nsrjbxx;
    $('#nsrsbh').text(nsrjbxx.nsrsbh);
    $('#nsrmc').text(nsrjbxx.nsrmc);
    jyzsGrid = mini.get("jyzsGrid");
    fbzlGrid = mini.get('fbzl-grid');
    fbzlylGrid = mini.get('fbzl-yl-grid');
};

//转换时间，年月加上日，起时间从一号开始，止时间从月底开始
function changeDate(jyzsGridList){
    for(var i=0;i<jyzsGridList.length;i++){
        jyzsGridList[i].jybfzsrduuid = "";
        jyzsGridList[i].lcslid = "";
        jyzsGridList[i].djxh = wssqUtil.nsrjbxx.djxh;
        jyzsGridList[i].xshwlxDm = jyzsGridList[i].jybfzslxDm;
        //起时间
        var yxqq = jyzsGridList[i].yxqq;
        var yxqqDate = mini.parseDate(yxqq);
        yxqq = mini.formatDate(yxqqDate,'yyyy-MM-dd');
        jyzsGridList[i].yxqq = yxqq;
        //止时间
        var yxqz = jyzsGridList[i].yxqz;
        var yxqzDate = mini.parseDate(yxqz);
        yxqzDate = mini.addDate(yxqzDate,1,'MO');
        yxqzDate = mini.addDate(yxqzDate,-1,'D');
        yxqz = mini.formatDate(yxqzDate,'yyyy-MM-dd');
        jyzsGridList[i].yxqz = yxqz;


        jyzsGridList[i].ywpzuuid = "";
        jyzsGridList[i].zfbz1 = "";
        jyzsGridList[i].zfrDm = "";
        jyzsGridList[i].zfrq1 = "";

        jyzsGridList[i].lrrDm = wssqUtil.nsrjbxx.lrrDm;
        jyzsGridList[i].lrrq = wssqUtil.nsrjbxx.lrrq;
        jyzsGridList[i].xgrDm = wssqUtil.nsrjbxx.xgrDm;
        jyzsGridList[i].xgrq = wssqUtil.nsrjbxx.xgrq;
        jyzsGridList[i].sjgsdq = wssqUtil.nsrjbxx.sjgsdq;
        var mcStr = jyzsGridList[i].jybfzslxMc;
        var xmmc = mcStr.substring(mcStr.indexOf('|')+1,mcStr.length);
        jyzsGridList[i].xmmc = xmmc;

        delete jyzsGridList[i]._state;
        delete jyzsGridList[i]._uid;
        delete jyzsGridList[i].jybfzslxDm;
        delete jyzsGridList[i].jybfzslxMc;
    }

    var zmsqData = {
        djxh: wssqUtil.nsrjbxx.djxh,
        lcslid:"",
        zgswskfjDm:wssqUtil.nsrjbxx.zgswskfjDm,
        ybnsrjybfzsrdsqsqb:{
            insertYbnsrjybfzsGrid: {
                insertYbnsrjybfzsGridlb: jyzsGridList
            },
            updateYbnsrjybfzsGrid:{},
            deleteYbnsrjybfzsGrid:{},
            ybnsrjybfzsGrid: {
                ybnsrjybfzsGridlb: jyzsGridList
            }
        }
    };
    return zmsqData;
}
function getFormData() {
    var jyzsGridList = jyzsGrid.getData();
    return changeDate(jyzsGridList);
}










