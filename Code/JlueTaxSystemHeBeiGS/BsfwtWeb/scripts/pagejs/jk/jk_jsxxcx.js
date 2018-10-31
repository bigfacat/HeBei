var nsrData = JSON.parse(SUI.store.get("NsrjbxxVO"));

$(function() {
	var messageid = mini.loading("数据查询中, 请稍等 ...", "加载中");
	try {
		if(nsrData==null){
			nsrData=getNsrxxVO();
		}
		setCookie("loginUser", nsrData.nsrsbh, 1000);
		var qysdsSbcontent = {
			nsrsbh : nsrData.nsrsbh,
			djxh : nsrData.djxh,
			sssqq : "",
			sssqz : ""
		};
		var sbnr = mini.decode(qysdsSbcontent);
	
		//$.ajax({
		//	url : "/wyjk/wyjsAction_isWhq.do",
		//	type : "post",
		//	async : false,
		//	data : sbnr,
		//   success: function(data){
		//	    mini.hideMessageBox(messageid);		
		//	    var json = mini.decode(data);
		//	    if (json.success && json.data == "1"){
		//	    	mini.alert("中国人民银行TIPS暂停服务，具体时间为7月1日22:00至7月2日08:30。");
		//	    	$("#dzjk").removeAttr("onclick");
		//	    	$("#dzjk").css("background","#808080");			    	
		//			return;
		//		}
		//   },
		//   error:function(e){
		//	   mini.hideMessageBox(messageid);
		//   }
		//});
		
	$.ajax({
			url : "/wyjk/wyjsAction_getSfxyXh.ashx",
			type : "post",
			async : false,
			data : sbnr,
		   success: function(data){
			    mini.hideMessageBox(messageid);		
			    var json = mini.decode(data);
			    if (json.success){
					mini.alert("您是委托代征用户，不能进行三方协议缴税", '提示信息', function() {
						window.close();
					});
					return;
				}
		   },
		   error:function(e){
			   mini.hideMessageBox(messageid);
		   }
		});
		
	
		$.ajax({
			url : "/wyjk/wyjsAction_searchWjsJl.ashx",
			type : "post",
			async : false,
			data : sbnr,
			success : function(data) {
				mini.hideMessageBox(messageid);
				var object = mini.decode(data);
				if (!object.success) {
					mini.alert("查询未缴款信息失败");
					return;
				}
				
				if (object.data.ZSXX.length > 0) {
					var grid = mini.get("wjscx");
					grid.setData(object.data.ZSXX);
					//对查询的缴款信息进行逾期判断
					var zsxx=object.data.ZSXX;
					var date=new Date();
					for(var i=0;i<zsxx.length;i++){
						var obj=zsxx[i];
						var jkqx =new Date(obj.jkqx+" 23:59:59");
						if(date>jkqx){
							mini.alert("您有逾期税款未缴纳，请联系主管税务机关是否需要缴纳滞纳金");
							break;
						}
					}
					
				} else {
					mini.alert("您没有未缴款信息");
				}
			},
			error : function(data) {
				mini.hideMessageBox(messageid);
				mini.alert("出现系统错误，请稍后再试。。。。。", "提示信息", function() {
					window.close();
				});
			}
		});
		
		//已缴税查询起止时间
		var myDate = new Date();
		
		var thisyear = myDate.getFullYear();
		var thisTime = thisyear + "-";
		var thismonth = myDate.getMonth()+1;
		if(thismonth > 9){
			thisTime += thismonth;
		} else {
			thisTime += "0" + thismonth;
		}
		
		//起始时间
		mini.get("sssqq").setText(thisTime + "-01");
		//结束时间
		if(myDate.getDate() > 9){
			thisTime += "-" + myDate.getDate();
		} else {
			thisTime += "-0" + myDate.getDate();
		}
		mini.get("sssqz").setText(thisTime);
	} catch (error) {
		alert(error);
	}
});


//查询已缴税记录
var count = 5*60;
function settime(val){
	if(count==0) {
		val.enable();
		//val.setText("查询");
		$("#stepnext").text("查询");
		count = 5*60;
	}else {
		val.disable();
		//val.setText(count + "秒后重新查询");
        $("#stepnext").text(count + "秒后重新查询");
        count--;
        setTimeout(function() {
            settime(val)
        }, 1000)
	}
}

function queryYjsjl(){
	var stepnext=mini.get("stepnext");
	settime(stepnext);
	mini.parse();
	var sssqq= mini.get("sssqq").getText();
	var sssqz= mini.get("sssqz").getText();
	if(nsrData==null){
		nsrData=getNsrxxVO();
	}
	var yjsjlcontent = {
			nsrsbh : nsrData.nsrsbh,
			djxh : nsrData.djxh,
			sssqq : sssqq,
			sssqz : sssqz
		};
	var sbnr = mini.decode(yjsjlcontent);
	$.ajax({
		url : "/wyjk/wyjsAction_searchYjsJl.ashx",
		type : "post",
		async:false,
		data : sbnr,
		success : function(data) {
			var object = mini.decode(data);
			if (object.success){
				var grid = mini.get("yjscx");
				if (object.data.ZSXX.length > 0){
					var grid = mini.get("yjscx");
					grid.setData(object.data.ZSXX);
				}else {
					grid.setData(object.data.ZSXX);
					mini.alert("您没有己缴款信息");
				}
			}else {
				mini.alert("查询已缴税记录失败");
			}		
		},
		error : function(data) {
			mini.alert("出现系统错误，请稍后再试。。。。。","提示信息",function (){
			});
		}
	});
}

function onDrawSummaryCell(e) {
    var result = e.result;
    var rows = e.data;
    //服务端汇总计算
  var uu = 0;
    if (e.field == "kkse") {
    	var total = 0;
		for ( var i = 0, l = rows.length; i < l; i++) {
			var rowObject = rows[i];
			var t = parseFloat(rowObject.kkse);
			//parseFloat(t);
			if (isNaN(t)){
				continue;
			}
			total += t;
		}
    	e.cellHtml = "合计: " + total.toFixed(2);
    }
   
}

function onActionRenderer(e) {
	var record = e.record;
	var str = "";
	if("" != record.sfxyh){
		//三方协议扣款设置
		str = '<a class="Delete_Button" href="javascript:sfxyjk();">三方协议扣款</a>&nbsp;&nbsp;';
	}
	str += '<a class="Delete_Button" href="javascript:wljk();" >网络缴款</a>';
	return str;
}

function onActionRendererYjse(e) {
	var record = e.record;
	var returndata = parseFloat(record.kkse).toFixed(2);
	return returndata;
}


function js(){
	var grid = mini.get("wjscx");
	var zsxxs = grid.getSelecteds();
	if (0 == zsxxs.length) {
		mini.alert("请选择缴税项目");
		return;
	}
	var zsxx = zsxxs[0];
	mini.open({
		// showHeader: false,
		showMaxButton : true,
		title : "税款支付",
		url : "/BsfwtWeb/pages/jk/jk_jsxxcx_sub.html",
		showModal : true,
		width : 400,
		height : 300,
		onload: function () {       //弹出页面加载完成
			try {
				var iframe = this.getIFrameEl();
				var d = parseFloat(zsxx.kkse).toFixed(2);
				iframe.contentWindow.setData(d, zsxx.sfxyh);
			} catch (error) {
				console.error(error);
			}
        },
        ondestroy: function (action) {  //弹出页面关闭前
        	if(action == "close"){
        		return;
        	}
        	var iframe = this.getIFrameEl();
            //获取选中、编辑的结果
            var data = iframe.contentWindow.getData();
            var sbnr = buildJsData(zsxx,data.kkse);

            if(data.btn == "" || data.btn == null){
            	return;
            }
            if(typeof(window.external.CallFun) != 'undefined'){
            	var param = '{"version":1, "method": "set", "data":{ "nsrsbh": '+ nsrData.nsrsbh+ ', "lx":"sb_jk"}}';
				window.external.CallFun("wt.sb", param, function (data){});
			}
            if(data.btn == "sf"){
            	$.ajax({
            		url : "/wyjk/wyjsAction_sfxyKK.do",
            		type : "post",
            		async:false,
            		data : sbnr,
            		success : function(data) {
            			var data = mini.decode(data);
            			var message=data.message;
            			if(data.success){
            				mini.showMessageBox({
            			        title: "提示",
            			        iconCls: "mini-messagebox-question",
            			        message: "三方协议扣款成功",
            			        buttons: ["确定"],
            			        callback: function (action) {
            			        	if(action=="确定"){
            			        		location.reload();
            			        	}else{
            			        		location.reload();
            			        		}
            			        	}
            			        });
            				 return;
            			}
            			mini.alert(message);
            		},
            		error : function(data) {
            			mini.alert("出现系统错误，请稍后再试。。。。。","提示信息",function (){
            			});
            		}
            	});
            }
            
            if(data.btn == "wl"){
            	if ("" == zsxx.dzsphm && zsxx.sfxyh.length > 0){
                	mini.confirm("使用银联缴款后，该笔税款只能使用银联缴款，不能再使用三方协议缴款", "确定", function(action) {
                		if (action == "ok") {
                        	$.ajax({
                        		url : "/wyjk/wyjsAction_hlwKK.do",
                        		type : "post",
                        		async:false,
                        		data : sbnr,
                        		success : function(data) {
                        			var returndata = mini.decode(data);
                        			if (!returndata.success) {
                        				mini.alert(returndata.message);
                        				return;
                        			}  
                        			SUI.store.set("yljk.form", returndata.data);
                        			window.open("/BsfwtWeb/pages/jk/yljk.html"); 
                        		},
                        		error : function(data) {
                        			mini.alert("出现系统错误，请稍后再试。。。。。","提示信息",function (){
                        			});
                        		}
                        	});
                		} else {
                			return;
                		}
                	});
            	}else {
                	$.ajax({
                		url : "/wyjk/wyjsAction_hlwKK.do",
                		type : "post",
                		async:false,
                		data : sbnr,
                		success : function(data) {
                			var returndata = mini.decode(data);
                			if (!returndata.success) {
                				mini.alert(returndata.message);
                				return;
                			}  
                			SUI.store.set("yljk.form", returndata.data);
                			window.open("/BsfwtWeb/pages/jk/yljk.html"); 
                		},
                		error : function(data) {
                			mini.alert("出现系统错误，请稍后再试。。。。。","提示信息",function (){
                			});
                		}
                	});
            	}
            }
        }
	});
}

function buildJsData(zsxx,kkse){
	if(nsrData==null){
		nsrData=getNsrxxVO();
	}

	var qysdsSbcontent = {
			djxh : nsrData.djxh,
			nsrsbh :nsrData.nsrsbh,
			nsrmc : nsrData.nsrmc,
			sfxyh : zsxx.sfxyh,
			swjgdm : zsxx.swjgdm,
			yzpzxh : zsxx.yzpzxh,
			jkqx : zsxx.jkqx,
			kkje : kkse,
			yzpzmxxh : zsxx.yzpzmxxh,
			zsuuid : zsxx.zsxh,
			dzsphm: zsxx.dzsphm,
			sssqq: zsxx.sssqq,
			sssqz: zsxx.sssqz
		};
		return mini.decode(qysdsSbcontent);
}

/**
 * 刷新当前页面
 */
function refreshCurrentPage() {
	
	var messageid = mini.loading("数据查询中, 请稍等 ...", "加载中");
	if(nsrData==null){
		nsrData=getNsrxxVO();
	}
	try {
		var qysdsSbcontent = {
				nsrsbh : nsrData.nsrsbh,
				djxh : nsrData.djxh,
				sssqq : "",
				sssqz : ""
		};
		var sbnr = mini.decode(qysdsSbcontent);
		$.ajax({
			url : "/wyjk/wyjsAction_searchWjsJl.ashx",
			type : "post",
			async:false,
			data : sbnr,
			success : function(data) {
				mini.hideMessageBox(messageid);
				var object = mini.decode(data);
				if(!object.success){
					mini.alert("查询未缴款信息失败");
					return;
				}
				if (object.data.ZSXX.length > 0){
					var grid = mini.get("wjscx");
					grid.setData(object.data.ZSXX);
				}else {
					mini.alert("您没有未缴款信息");
				}									
			},
			error : function(data) {
				mini.hideMessageBox(messageid);
				mini.alert("出现系统错误，请稍后再试。。。。。","提示信息",function (){
					window.close();
				});
			}
		});
	} catch (error) {
		alert(error);
	}
}

