/**
 * Created by lizm on 2016/4/11.
 */
$(function () {
	mini.parse();
	var date = new Date();
	 mini.get("band").setValue(date); 
	 search();
})


function search(){
	var messageid = mini.loading("正在查询，请稍候 ...", "提示");
	var band = mini.get("band").getValue(); 
	band = mini.formatDate(band, "yyyy")
	$.ajax({
		url : "/yhsx/queryYhsxBasAction.ashx",
		type : "post",
		async:false,
		data:{
			band: band
		},
		success : function(data) {
			var json = mini.decode(data);
			if (json.success){
				var yhsxbaGrid = mini.get("yhsxbaGrid");
				if(json.data!=="" &&json.data!==null &&json.data!==undefined){
					yhsxbaGrid.setData(json.data);
					mini.hideMessageBox(messageid);
				}
				else{
					yhsxbaGrid.showEmptyText=true;
					yhsxbaGrid.setData("");
					mini.hideMessageBox(messageid);
				}
			}else {
				mini.hideMessageBox(messageid);
				mini.alert("初始化企业所得税优惠备案信息失败", '提示信息',function (){
					CloseWindow("cancel");
				});
			}
		},
		error : function(data) {
			mini.alert("出现系统错误，请稍后再试......", '提示信息',function (){
				CloseWindow("cancel");
			});	
		}
	});	
}

function baztRenderer(e) {
	var record = e.record;
	var bazt = record.bazt;
	if ("0" == bazt) {
		return "未处理";
	} else if ("1" == bazt) {
		return "审核通过";
	} else {
		return "审核不通过";
	}
}

function yhsxBaRenderer(e) {
	var record = e.record;
	return "<a href='javascript:ylxx("+mini.encode(record)+")'>企业所得税优惠事项备案表</a>";
}

function ylxx(sqxx){
	mini.open( {
		url : "qysdsyhsxbabxx.html",
		title : "企业所得税优惠事项备案信息详情",
		width : 1200,
		height : 600,
		currentWindow:true,
		showModal:true,
		onload : function() {
			var iframe = this.getIFrameEl();
			iframe.contentWindow.initViewData(sqxx);
		},
		ondestroy : function(action) {

		}
	});
}