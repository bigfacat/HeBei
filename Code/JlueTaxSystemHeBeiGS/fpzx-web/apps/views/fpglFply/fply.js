/**
 * Created by yuepu on 2017/1/5.
 */

var fply = {};
var lqData = [];
fply.lpType = "01";
fply.ylData = [];//预览的数据
fply.pzhdxx = [];//票种核定信息

/*计量单位*/
fply.jldwArr =[{
    id:"0610",
    mc:"份"
},{
    id:"0612",
    mc:"本"
},{
    id:"0614",
    mc:"卷"
}];

/*fply.flag = true;*/

fply.yjlx = '1';//邮件类型
fply.xydj = "H";//信用等级正常

var isExistPzhds = false;

stepNav.wizard = $('#wizard'); // 指定容器
stepNav.head = true; // 是否加载 header
stepNav.foot = true; // 是否加载 footer

/**flag用于请求错误反馈的标志*/
var flag = true;

stepNav.run = function() {
    /*发票领用资格*/
    fplyService.hasFplyzg('', function (data) {
        if (!data.success) {
            mini.alert("没有领取发票资格",'提示',function(){
                wssqUtil.closeWin();
            });
            flag = false;
//          return ;
        }
    });
    if(!flag){
    	return;
    }
    stepNav.initSteps([
        {id: 0, title: '填写申请表', url: 'TxsqView.aspx'},
        {id: 1, title: '选择领取方式', url: '/fpzx-web/apps/views/public1/lqfs/XzlqfsView.aspx', js: true},
        {id: 2, title: '预览提交', url: 'YlView.aspx', yltj: true},
        {id: 3, title: '完成', url: '../public1/wc/wc.aspx'}
    ]);
/*    if (fply.flag) {

    } else {
        pzhdCommon.initPrePage("由于您没进行过票种核定，发票领用前需先进行票种核定",
            '<a href="/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?code=110207&id=58">票种核定</a>',
            "/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?code=110207&id=58", {
                countTime: 9,
                text: "没跳转请点击这里",
                href: '/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?code=110207&id=11'
            });
        return;
    }*/

    if(wssqUtil.nsrjbxx){
        $("#fply-gsmc").html(wssqUtil.nsrjbxx.nsrmc);
    }

    mini.parse();
    //第一步
    fply.pzhdGrid = mini.get("pzhd-grid");
    fply.fphdGrid = mini.get("fphd-grid");


    //第二步 邮寄给我的表格
    fply.goodsGrid = mini.get("goods-grid");

    // 第三步的表格
    fply.fplyGrid = mini.get("fply-info");


    /*第一步 填写*/
    //发票核定信息的显示和隐藏
    $("#fphd-show").click(function () {
        $(this).css("display", "none").siblings(".arrow-up").css("display", "block");
        $(".fphd").css("display", "block");
        $(".wizard>.content").css("height", "500");
    });
    $("#fphd-hide").click(function () {
        $(this).css("display", "none").siblings(".arrow-down").css("display", "block");
        $(".fphd").css("display", "none");
        $(".wizard>.content").css("height", "40");

    });

    fplyService.getFplyxx("", function (data) {
        if (data.success) {
            if (data.value) {
                fply.pzhdGrid.setData(data.value);
            }
        } else {
            mini.alert(data.message,'提示',function(){
                wssqUtil.closeWin();
            });
            flag = false;
        }
    });
	if(!flag){
    	return;
    }
    /*获取票种核定信息*/
    fplyService.getPzhdxx("", function(data) {
        if (data.success) {
            if(data.value){
                fply.pzhdxx = data.value;
                /**检测单份发票最高开票限额代码是否是字母，提示信息有误，大厅办结*/
                for( var i=0;i < fply.pzhdxx.length;i++){
                    if(!!fply.pzhdxx[i].dffpzgkpxeDm && !/^[0-9]{1}/.test(fply.pzhdxx[i].dffpzgkpxeDm)){
                        mini.alert("您的票种核定信息有误，请至办税大厅前台领票!",'提示',function(){
			                wssqUtil.closeWin();
			            });
                        flag = false;
                        return;
                    }
                }
                fply.fphdGrid.setData(data.value);
            }
        } else {
            mini.alert(data.message);
            flag = false;
        }
    });
    if(!flag){
    	return;
    }

    // 修改完成页面的提示信息
    $('.wc-content').html('<span class="success-ico">尊敬的纳税人您好，您的</span><span id="current-swsxMc">发票领用</span>已经成功提交。');

};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        fply.pzhdGrid.validate();
        if (fply.pzhdGrid.isValid()) {
            if (fply.pzhdxx.length > 0) {
                var pzhdDatas = fply.getChangedData(fply.pzhdGrid.getChanges());
                var hasFplyStr =  fply.getHasLy(pzhdDatas);
                if(hasFplyStr.length){
                    mini.alert("您有 "+hasFplyStr+" 发票的领用申请请求未处理，无法进行当前操作");
                    return ;
                }
                if (pzhdDatas.length == 0) {
                    mini.alert("领取的发票数量需大于0！");
                    return '';
                } else{
                    fply.ylData = pzhdDatas;
                    lqData = pzhdDatas;
                    lqfs.fpdwzl = pzhdDatas[0].fpdwzl;//发票单位重量
                    getTicketsWay();
                    return true;
                }
            } else {
                mini.alert("您还未进行票种核定，请先进行票种核定",'提示',function(data){
                    wssqUtil.closeWin();
                });
                return '';
            }
        } else {
            return '';
        }
        return true;
    }
    if (currentIndex == 1) {
        if(!checkFpdwzl()){
            return;
        };
        fply.fplyGrid.setData(fply.ylData);
        return true;
    }
    if (currentIndex == 2) {
        var pzhdData = fply.fplyGrid.getData();
        $.each(pzhdData, function (i, item) {
            item.bs = item.sqfs;
        });
        var tjParam = {};
        tjParam.data = pzhdData;
        /*领取方式*/
        tjParam.lqfsDm = lqfs.selected;
        var result=false;
        $('#actions').empty();
        wssqUtil.tjsq("/fpzx-web/api/fp/fply/submit/fplyxx", mini.encode(tjParam), function (data) {
        	result = true;
            if (data.success) {
                if (lqfs.selected == '03') {
                    // 选择邮寄领取时，打开填写邮寄信息的页面
                    txyjxx();
                    var btn = '<button id="yjxx-btn">填写邮寄信息</button> ';
                    $('#actions').append(btn);
                    // 填写邮寄信息
                    $("#yjxx-btn").click(function () {
                        txyjxx();
                    });

                    function txyjxx() {
                        mini.open({
                            url: '../public/lqfs/txyjfs.html?type=noHead&sqxh='+ wssqUtil.sqxh+"&yjlx="+fply.yjlx,//页面地址
                            title: '填写邮寄信息',      //标题
                            width: 1220,      //宽度
                            height: 600,     //高度
                            allowResize: false,       //允许尺寸调节
                            showMaxButton: false    //显示最大化按钮
                        });
                    }

                }
            }
        }, function (data) {
            result=false;
        });
        return result;
    }
};

/*第一步 单位渲染*/

fply.onmbfsRender = function (e) {
    var s = "<span>" + e.value +"份/本</span>";
    return s;
}
/*第三步 表格中字的颜色汇总*/
fply.colorRender = function (e) {
    var s = "<span class='text-blue'>" + e.value +e.record.jldwmc + "</span>";
    return s;
}
fply.drawsummarycell = function (e) {
    if (e.field == "name") {
        e.cellStyle = "text-align:left;font-size:14px;font-family: 'MicroSoft YaHei'";
        e.cellHtml = "<span class='total-style'>合计</span>";
    }
}
/*fply.zfbz = function(){
 mini.alert("资费标准：邮政标准快递执行地市城区首重10元/千克，郊区及县城以下12元/千克，续重每千克2元，不足1000克的按1000克计算。");
 }*/
fply.onbs = function (e) {
    var s = e.record.mbfs;
    return s;
}

/*过滤掉发票数量为0的数据*/
fply.getChangedData = function (data) {
    var datas = [];
    if (data.length > 0) {
        $.each(data, function (i, item) {
            if (parseInt(item.sqfs) > 0) {
                if (parseInt(item.sqfs) <= parseInt(item.bczgkyfs)) {
                    datas.push(item);
                }
            }
        })
    }
    return datas;
}

/*获得领取过的发票的名称*/
fply.getHasLy = function(data){
    var datas =[];
    if(data.length >0){
        $.each(data,function(i,item){
            if(parseInt(item.fplysqbs)){
                datas.push(item.fpzlMc);
            }
        })
    }
    return datas.join(",");
}


fply.cellValidation = function (e) {
    if (e.field == "sqfs") {
        if (e.value) {
            if (!fply.isNum(e.value)) {
          /*      e.isValid = false;
                e.errorText = "领购份数必须是不小于0的整数";*/
                mini.alert("领购份数必须是不小于0的整数");
            }else  if ((parseInt(e.value)* parseInt(e.record.mbfs)) > parseInt(e.record.bczgkyfs)){
                /* 最高可领取数量= 本次最高可领份数/每本份数 */
                e.isValid = false;
                e.errorText = "领购份数不能大于本次最高可领份数";
                mini.alert("领购份数不能大于本次最高可领份数");
            }
        } else {
            e.isValid = true;
        }
        /*提交编辑*/
        fply.pzhdGrid.commitEdit();
    }
}

/*对否是数字*/
fply.isNum = function (num) {
    var re = new RegExp("^[0-9]*$");
    if (re.test(num)) {
        return true;
    } else {
        return false;
    }
}

//默认数量为0
fply.sqfs = function (e) {
    if (Number(e.value)) {
        return e.value + e.record.jldwmc;
    } else{
        return 0 + e.record.jldwmc;
    }
}




stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        fply.pzhdGrid.validate();
        if (fply.pzhdGrid.isValid()) {
            if (fply.pzhdxx.length > 0) {
                var pzhdDatas = fply.getChangedData(fply.pzhdGrid.getChanges());
                var hasFplyStr =  fply.getHasLy(pzhdDatas);
                if(hasFplyStr.length){
                    mini.alert("您有 "+hasFplyStr+" 发票的领用申请请求未处理，无法进行当前操作");
                    return false;
                }
                if (pzhdDatas.length == 0) {
                    mini.alert("领取的发票数量需大于0！");
                    return false;
                } else{
                    fply.ylData = pzhdDatas;
                    lqData = pzhdDatas;
                    lqfs.fpdwzl = pzhdDatas[0].fpdwzl;//发票单位重量
                    getTicketsWay();
                    fply.checkDzfp(pzhdDatas); // 检查是否只有电子发票
                    return true;
                }
            } else {
                mini.alert("您还未进行票种核定，请先进行票种核定",'提示',function(data){
                    window.close();
                });
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
    if (currentIndex == 1) {
        if(fply.isAllDzfp){
            lqfs.selected='';
            fply.fplyGrid.setData(fply.ylData);
            return true;
        }
        if(!checkFpdwzl()){
            return;
        }
        fply.fplyGrid.setData(fply.ylData);
        return true;
    }
    if (currentIndex == 2) {
        var pzhdData = fply.fplyGrid.getData();
        $.each(pzhdData, function (i, item) {
            item.bs = item.sqfs;
        });
        var tjParam = {};
        tjParam.data = pzhdData;
        /*领取方式*/
        tjParam.lqfsDm = lqfs.selected;
        var result=false;
        $('#actions').empty().append('<button onclick="wssqUtil.closeWin()">关闭</button>');
        wssqUtil.tjsq("/fpzx-web/api/fp/fply/submit/fplyxx", mini.encode(tjParam), function (data) {
            result = true;
            if (data.success) {
                if (lqfs.selected == '03') {
                    // 选择邮寄领取时，打开填写邮寄信息的页面
                    txyjxx();
                    var btn = '<button id="yjxx-btn">填写邮寄信息</button> ';
                    $('#actions').append(btn);
                    // 填写邮寄信息
                    $("#yjxx-btn").click(function () {
                        txyjxx();
                    });

                    function txyjxx() {
                        mini.open({
                            url: '../public/lqfs/txyjfs.html?type=noHead&sqxh='+ wssqUtil.sqxh+"&yjlx="+fply.yjlx,//页面地址
                            title: '填写邮寄信息',      //标题
                            width: 1220,      //宽度
                            height: 600,     //高度
                            allowResize: false,       //允许尺寸调节
                            showMaxButton: false    //显示最大化按钮
                        });
                    }

                }
            }
        }, function (data) {
            result=false;
        });
        return result;
    }
};

stepNav.onStepChanged = function (event,currentIndex,prevIndex) {
    if(currentIndex===1 && prevIndex===0 && fply.isAllDzfp){
        stepNav.wizard.steps('next');
    }
    if(currentIndex===1 && prevIndex===2 && fply.isAllDzfp){
        stepNav.wizard.steps('previous');
    }
};

/*检查是否只申领电子发票*/

fply.checkDzfp=function (data) {
    fply.isAllDzfp=true; // 是否全是电子发票，默认全是
    for(var i=0,len=data.length;i<len;i++){
        var fpItem = data[i];
        // 只要有一条不是电子发票，就不改变选择领取方式
        if(fpItem.fpzlDm!=='11' && fpItem.fpzlDm!=='12'){
            fply.isAllDzfp = false;
            break;
        }
    }
};