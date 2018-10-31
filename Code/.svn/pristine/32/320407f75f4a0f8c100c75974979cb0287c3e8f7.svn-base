var nsrData;
var currentPage = 0;
var PAGESIZE = 8;
if(SUI.store.get("NsrjbxxVO")){
	nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
}

$(function(){
	nsrData = getNsrxxVO();
	if(!nsrData){
		mini.alert("请重新登录云厅！","提示",function(){
			window.close();
		});
	}else{
		getQuestions();
	}
});
function getQuestions(){
	//加载遮罩层
	var messageid = mini.loading("加载中, 请稍等 ...", "加载中");
	var nsrsbh = '';
	if(nsrData){
		nsrsbh = nsrData.nsrsbh;
	}
	$.ajax({ 
		url:"/getCms/getCmsAction_queryCmsDC.ashx", 
		data:{ 
			nsrsbh:nsrsbh
		}, 
		type:"post", 
		dataType:"json", 
		success:function(result){
			//取消遮罩
			mini.hideMessageBox(messageid);
			var result = mini.decode(result);
			var resultd = mini.decode(result.data);
			var resultData = resultd.data;
			var userIp = result.otherParams.userIp;
			//数组逆向排序，按publishData从大到小排列
			for(var k=0;k<resultData.length-1;k++){
				for(j=0;j<resultData.length-k-1;j++){
					if(resultData[j].publishDate < resultData[j+1].publishDate){
						var temp = resultData[j];
						resultData[j] = resultData[j+1];
						resultData[j+1] = temp;
					}
				}
			}
			if(resultData.length > 0){
				var beginPage = currentPage*PAGESIZE;
				var size = ((beginPage+PAGESIZE) < resultData.length ? (beginPage+PAGESIZE) : resultData.length);
				var htmls = "";
				var isFgx = false; //是否显示分割线
				for(var i=beginPage;i<size;i++){
					if(resultData[i].status==0){//未填报
						htmls += "<div class='sbox'>";
						htmls += "<h3>"+(i+1)+"、";
						var actName = resultData[i].actName;
						if(actName.length>60){
							actName = actName.substring(0,60)+"...";
						}
						htmls += actName;
						htmls += "<a href='javascript:void(0)' style='float:right;' onclick='pj($(this))' title='"+resultData[i].url+"&remoteAddress="+userIp+ "'>【 填写问卷 】</a>";
						htmls += "</h3></div>";
						isFgx = true;
					}
					
				}
				if(isFgx){
					htmls += "<hr></hr>";
					isFgx = false;
				}	
				for(var i=beginPage;i<size;i++){
					if(resultData[i].status==1){//已填报										
						htmls += "<div class='sbox'>";
						htmls += "<h3>"+(i+1)+"、";
						var actName = resultData[i].actName;
						if(actName.length>60){
							actName = actName.substring(0,60)+"...";
						}
						htmls += actName;
						htmls += "<a href='javascript:void(0)' style='float:right;' onclick='pj($(this))' title='"+resultData[i].url+"&remoteAddress="+userIp+"'>【 查看已填写问卷 】</a>";
						htmls += "</h3></div>";
					}					
				}
				//以下为分页
				if((currentPage*PAGESIZE+PAGESIZE) < resultData.length){
					if(currentPage>0){
						htmls += "<div style='width:140px;margin:auto;padding-top:20px;'><a onclick='prevPage()' href='javascript:void(0)' style='color:#000;'>上一页</a>" +
								" &nbsp; &nbsp; <a onclick='nextPage()' href='javascript:void(0)' style='color:#000;'>下一页</a></div>";
					}else{
						htmls += "<div style='width:140px;margin:auto;padding-top:20px;'><a onclick='' style='color:#ccc;'>上一页</a>" +
								" &nbsp; &nbsp; <a onclick='nextPage()' href='javascript:void(0)' style='color:#000;'>下一页</a></div>";
					}
				}
				if(currentPage*PAGESIZE <= resultData.length && (currentPage*PAGESIZE+PAGESIZE) >= resultData.length){
					if(currentPage>0){
						htmls += "<div style='width:140px;margin:auto;padding-top:20px;'><a onclick='prevPage()' href='javascript:void(0)' style='color:#000;'>上一页</a>" +
								" &nbsp; &nbsp; <a onclick='' style='color:#ccc;'>下一页</a></div>";
					}else{
						//不显示
						if(resultData.length==0)
							htmls += "<div style='width:140px;padding:20px 20px 20px 60px;'>暂无问卷调查...</div>";
					}
				}
				$("#survey-list").append(htmls);
			}
		},
		error:function(data){
			mini.hideMessageBox(messageid);
			mini.alert("获取问卷调查失败！");
		}
	}); 
}

function pj(t){
	window.location.href = t.attr("title");
	/*win1 = mini.open({
        url: t.attr("title"),        //页面地址
        title: "问卷调查",      //标题
        iconCls: "",    //标题图标
        width: 800,      //宽度
        height: 600,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showMaxButton: true,     //显示最大化按钮
        showCloseButton: true,   //显示关闭按钮
        showModal: true,         //显示遮罩
        currentWindow: true,      //是否在本地弹出页面,默认false
        onload: function () {       //弹出页面加载完成
            
        },
        ondestroy: function (action) {  //弹出页面关闭前
        	
        }

    });*/
}
//上一页
function prevPage(){
	currentPage--;
	$("#survey-list").empty();
	getQuestions();
}
//下一页
function nextPage(){
	currentPage++;
	$("#survey-list").empty();
	getQuestions();
}

function getNsrxxVO() {
	var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
	// 暂时处理客户端多企业切换登录session未清理的问题
	var suiSessionId = SUI.store.get("JSESSIONID");
	var cookie_val = getCookie("JSESSIONID");
	if(nsrData!=null && cookie_val!=suiSessionId){
		nsrData = null;
		SUI.store.remove("NsrjbxxVO");
		SUI.store.remove("JSESSIONID");
	}
	if (nsrData == null) {
		$.ajax({
			url : "/login/login_getNsrxxVo.ashx?",
			type : "post",
			async : false,
			success : function(data) {
				var returndata = mini.decode(data);
				if (returndata.data) {
					var str = JSON.stringify(returndata.data);
					SUI.store.set("NsrjbxxVO", str);
					SUI.store.set("JSESSIONID",cookie_val);
					nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
				} else {
					mini.alert("未获取到纳税人信息!");
					return;
				}
			}
		});
	}
	return nsrData;
}