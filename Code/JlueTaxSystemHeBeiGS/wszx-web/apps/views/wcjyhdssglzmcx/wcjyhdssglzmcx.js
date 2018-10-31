
$(function () {
    mini.parse();
    var toDay= new Date();
    mini.get("sqsjz").setValue(toDay);
    mini.get("sqsjq").setValue(new Date(toDay.getTime() - 30*24*60*60*1000));    
    onInit();
})

var g_sqrqq="";
var g_sqrqz="";

$('.sqrq').click(function () {
    var mon = $(this).attr('sqrq_value');
    mini.get('sqrq').setValue(mon);
    onMonthSelect();
})
$('.gdsj').click(function () {
    $("#gdsj_qz").toggle();
    $('#gdsj_qz').show();
})

//如纳税人未进行核销，则核销日期用“——”显示
function onHxrqRenderer(e) {
    var value = e.value;
    if (value){
        return mini.formatDate(value, 'yyyy-MM-dd');
    }

    return '--';
}

//如纳税人未进行报验，则报验日期用“——”显示
function onByrqRenderer(e) {
    var value = e.value;
    if (value){
        return mini.formatDate(value, 'yyyy-MM-dd');
    }

    return '--';
}

//选择了某一个月份
function onMonthSelect(){
	var month=mini.get("sqrq").getValue();
	setSearchDateByMonth(month);
	onSearch();
}

//更多确定
function onMoreSure(){
	var startDate=mini.get("sqsjq").getValue();
	if(startDate=="" || startDate==null || startDate==undefined){
        mini.alert("请先选择申请起始日期！","提示信息",function(){          
            mini.get("sqsjq").focus();
        } )
        return;
    }
	
	var endDate=mini.get("sqsjz").getValue();
	if(endDate == "" || endDate == null || endDate == undefined){
   	 mini.alert("请先选择申请截止日期！","提示信息",function(){           
            mini.get("sqsjq").focus();
        } )
        return;
   }
	
	g_sqrqq=startDate.format("yyyy-MM-dd");
	g_sqrqz=endDate.format("yyyy-MM-dd");
	onSearch();
	
	$("#gdsj_qz").toggle();
	$('#gdsj_qz').hide();		
}

//更多取消
function onMoreCancel(){
	$("#gdsj_qz").toggle();
	$('#gdsj_qz').hide();
}

function searchData(wcjyhdssglzmbh,sqrqq,sqrqz){
	var data = {
	        "wcjyhdssglzmbh" : wcjyhdssglzmbh,
	        "sqrqq":sqrqq,
	        "sqrqz" : sqrqz
	        };
	$.ajax({
		url: "../../../api/wgz/wcjyhdssglzm/get/wcjyhdssglzmcx.ashx",
        async: false,
        dataType:"json",
        type:"POST",
        data:mini.encode(data),
        success: function (data) {
        	if(data.success==true){
        		var lsdk_grid = mini.get('wgzxx_grid');
           	    lsdk_grid.setData(mini.decode(data.value));
        	}       	
        },
        error: function (e) {
            mini.alert("查询跨区域涉税事项报告信息失败");
        }
    });
}

//根据月份设置查询起止日期
function setSearchDateByMonth(month){	
	var count=1;
	if(month=="1"){
		count=1;
	}else if(month=="3"){
		count=3;
	}else if(month=="6"){
		count=6;
	}
	
	var date= new Date();
    g_sqrqz = date.format('yyyy-MM-dd');
    g_sqrqq= new Date(date.getTime() - count*30*24*60*60*1000).format('yyyy-MM-dd');
}

function onInit(){
		$("#id-wgzxxcx").toggle();
		$('#id-wgzxxcx').show();
	
	setSearchDateByMonth("1");	
    searchData("",g_sqrqq,g_sqrqz);
}

function onSearch() {
    //获取条件数据	
    var wcjyhdssglzmbh =  mini.get('wcjyhdssglzmbh').getValue();
    searchData(wcjyhdssglzmbh,g_sqrqq,g_sqrqz);
}

onsqsjz = function(e){
    var Yxqq=mini.get("sqsjq").getValue();
    if(Yxqq=="" || Yxqq==null || Yxqq==undefined){
        return;
    }
    
    if(Yxqq> e.value){
        mini.alert("申请截止日期不能小于申请起始日期，请重新选择申请起始日期！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}
onsqsjq = function(e){
    var Yxqz=mini.get("sqsjz").getValue();
    if(Yxqz == ""||Yxqz == null||Yxqz == undefined){
    	return;
    }
    
    if(Yxqz< e.value){
        mini.alert("申请起始日期不能大于申请截止日期，请重新填写申请截止日期！","提示信息",function(){
            e.sender.setValue("");
            e.isValid=false;
            e.sender.focus();
        })
    }
}