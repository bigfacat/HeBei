var pageIndex=0;
var totalpage=0;
 var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));
 search(pageIndex)

//上一页
	function  frontpage(){
		if(pageIndex==0){
			mini.alert("当前为第一页", '提示信息');
		}else{
			pageIndex=pageIndex-1;
			search(pageIndex)
		}
	}
	//下一页
	function  nextpage(){
		if((pageIndex+1)>=totalpage){
			mini.alert("已经是最后一页了", '提示信息');
		}else{
			pageIndex=pageIndex+1;
			search(pageIndex)
		}
	}
function search(pageIndex){
	$.ajax({
		url : "/getCms/getCmsAction_queryCmsTX.ashx",
		//url : "../scripts/pagejs/login/tz.txt",
		data : {nsrsbh:nsrData.nsrsbh,needBrief:"1",pageSize:"10",pageIndex:pageIndex},
		success : function(data) {
			var data = mini.decode(data);
			var resultData = mini.decode(data.data);
			
			if(resultData==null){
				return;
			}
			totalnum=resultData["body"]["total"];
			mod=totalnum%10;
			if(mod==0){
				totalpage=round(totalnum/10);
			}else{
				totalpage=round(totalnum/10)+1;
			}
			$("#totalpage").html(totalpage);
			$("#pageIndex").html(pageIndex+1);
			$("#tzlist").html(format($("#tztemp").html(),resultData["body"]["data"]));

		},error: function (data) {
		mini.alert("查询通知信息失败。", '提示信息');
	}
	});
}
	
	function format (template, jdate) {
		  var temp=template;
		var content ='';
	           for (var r=0;r<jdate.length;r++ ) {
	              var reg = new RegExp("{mainContentPath}", "g")
	              temp = temp.replace(reg, jdate[r]["mainContentPath"]);
	               var reg1 = new RegExp("{subject}", "g")
	               temp = temp.replace(reg1, jdate[r]["subject"]);		
	               var reg2 = new RegExp("{brief}", "g")
	               if(jdate[r].smallCataCode=="2030"){	            	   
	            	   temp = temp.replace(reg2,returnPath(jdate[r]));
	               }else{	            	   
	            	   temp = temp.replace(reg2, jdate[r]["brief"]);	
	               }
	               var reg3 = new RegExp("{publishDate}", "g")
	                 temp = temp.replace(reg3,mini.formatDate(jdate[r]["publishDate"],"yyyy-MM-dd"));
	               content+=temp;
	               temp=template;
	          }
	          return content;
	      }
	
	function returnPath(obj){
		var s = '<a href="'+obj.mainContentPath+'" target="_blank">'+obj.brief+'</a>';
		return s;
	}