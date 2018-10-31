
var g_kjzt=Tools.getUrlParamByName('kjzt');
if(g_kjzt=="N"){
	//与历史代开查询页面共用，这个标志表示进入的是发票代开作废页面
    document.title = "发票代开作废";
}
var g_sqrqq="";
var g_sqrqz="";

$(function () {
    mini.parse();
    var toDay= new Date();
    mini.get("sqsjz").setValue(toDay);
    mini.get("sqsjq").setValue(new Date(toDay.getTime() - 30*24*60*60*1000));    
    onInit();
    if(mini.get('lskdjl-tabs')){
		mini.get('lskdjl-tabs').on('activechanged',function (tab) {
			var data = mini.get('lsdk-grid-ykj').getData();
			if(tab.index===1 && data.length===0){
				onMonthSelectYkj();
			}
		})
	}
});



$('.sqrq-wkj').click(function () {
    var mon = $(this).attr('sqrq_value');
    $(this).addClass('active').siblings().removeClass('active');
    mini.get('sqrq-wkj').setValue(mon);
    onMonthSelectWkj();
});
$('.sqrq-ykj').click(function () {
    var mon = $(this).attr('sqrq_value');
    $(this).addClass('active').siblings().removeClass('active');
    mini.get('sqrq-ykj').setValue(mon);
    onMonthSelectYkj();
});

$('.gdsj').click(function () {
    $("#gdsj_qz").toggle();
    $('#gdsj_qz').show();
});

function kjRenderer(e){
	if(e.record.kjbz=="Y"){
		return "是";
	}else{
		return "否";
	}
}

function czRenderer(e) {
	var record=e.record;
    var vhtml = "";     
    
    if(record.kjbz=="Y"){
        vhtml = "<a href='javascript:showView("+mini.encode(record.dksquuid)+","+mini.encode(record.zzsfpuuid)+");'>查看详情</a>";
    }else{
        vhtml = "<a href='javascript:showView("+mini.encode(record.dksquuid)+","+mini.encode(record.zzsfpuuid)+");'>查看详情</a>&nbsp;&nbsp;&nbsp;<a href='javascript:cancelDksq("+mini.encode(record.dksquuid)+");'>作废申请</a>";
    }   
    return vhtml;
}

function cancelDksq(dksqID){
    mini.confirm("是否作废申请？",'提示',function(action){
        if(action == "ok"){
            $.ajax({
                url: "../../../api/fp/fpdk/update/zffpdk/" + dksqID,
                async: false,
                contentType:"application/x-www-form-urlencoded",
                type:"POST",
                success: function (data) {
                    if(data.success==false){
                        mini.alert(data.message);
                        return;
                    }

                    if(data.value==true){
                        mini.alert("代开发票作废成功");
                        onSearchWkj();
                    }else{
                        mini.alert("代开发票作废失败");
                    }
                },
                error: function (e) {
                    mini.alert("作废发票代开申请信息失败");
                }
            });
        }
    })

}

function showView(dksqId,zzsfpId) {
    var url="./xqlist.html?dksqId="+dksqId+"&zzsfpId="+zzsfpId;
    mini.open({
        url: url,        //页面地址
        title: '代开详情',      //标题
        iconCls: '',    //标题图标
        width: 1200,      //宽度
        height: 600,     //高度
        allowResize: false,       //允许尺寸调节
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        onload: function () {       //弹出页面加载完成
            var iframe = this.getIFrameEl();


        },
        ondestroy: function () {  //弹出页面关闭前

        }

    });
}

//选择了某一个月份
function onMonthSelectWkj(){
	var month=mini.get("sqrq-wkj").getValue();
	setSearchDateByMonth(month);
	onSearchWkj();
}

function onMonthSelectYkj() {
    var month=mini.get("sqrq-ykj").getValue();
    setSearchDateByMonth(month);
    onSearchYkj();
}

//更多确定
function onMoreSure(){
	var startDate=mini.get("sqsjq").getValue();
	if(startDate=="" || startDate==null || startDate==undefined){
        mini.alert("请先选择申请起始日期！","提示信息",function(){          
            mini.get("sqsjq").focus();
        } );
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

function searchData(fphm,fpdm,ghfnsrsbh,ghfnsrmc,sqrqq,sqrqz,sfkj){
	var data = {
	        "fphm" : fphm,
	        "fpdm":fpdm,
	        "ghfnsrsbh":ghfnsrsbh,
	        "ghfnsrmc":ghfnsrmc,
	        "sqrqq":sqrqq,
	        "sqrqz" : sqrqz,
	        "kjzt":g_kjzt
	        };
	var url = '/fpzx-web/api/fp/fpdk/get/lsfpdk.ashx';
	if(sfkj =='wkj'){
        data.ghfnsrsbh='';
        data.ghfnsrmc='';
        data.kjzt = 'N';
    }else{
        data.kjzt = 'Y';
        url = '/fpzx-web/api/fp/fpdk/get/lsfpdkSjkYkj.ashx';
    }
    mini.mask('查询中，请稍候...');
	$.ajax({
		url: url,
        async: false,
        dataType:"json",
        type:"POST",
        data:mini.encode(data),
        success: function (data) {
            mini.unmask();
        	if(data.success){
        	    var value = mini.decode(data.value);
        		if(sfkj =='wkj'){
                    var lsdk_grid_wkj = mini.get('lsdk-grid-wkj');
                    lsdk_grid_wkj.setData(value);
                }else{
                    var lsdk_grid_ykj = mini.get('lsdk-grid-ykj');
                    lsdk_grid_ykj.setData(value);
                }
        	}       	
        },
        error: function (e) {
            mini.unmask();
            mini.alert("查询发票历史代开申请信息失败");
        }
    });
    mini.unmask();
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
	//表示作废页面
	/*if(g_kjzt=="N"){
		$("#id-ghfcx").toggle();
		$('#id-ghfcx').show();
       mini.get('lsdk-grid-wkj').hideColumn(mini.get('lsdk-grid-wkj').columns[1]);
       mini.get('lsdk-grid-wkj').hideColumn(mini.get('lsdk-grid-wkj').columns[2]);
	}else{
		$("#id-fpcx").toggle();
		$('#id-fpcx').show();
	}*/
	
	setSearchDateByMonth("1");	
    searchData("","","","",g_sqrqq,g_sqrqz,'wkj');
}

function onSearchWkj() {
    //获取条件数据	
    var fphm =  '';
    var fpdm =  '';
    var nsrsbh = '';
    var nsrmc = '';
    searchData(fphm,fpdm,nsrsbh,nsrmc,g_sqrqq,g_sqrqz,'wkj');
}

function onSearchYkj() {
    //获取条件数据
    var fphm =  '';
    var fpdm =  '';
    var nsrsbh = mini.get('ghfnsrsbh').getValue();
    var nsrmc = mini.get('ghfnsrmc').getValue();
    searchData(fphm,fpdm,nsrsbh,nsrmc,g_sqrqq,g_sqrqz,'ykj');
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