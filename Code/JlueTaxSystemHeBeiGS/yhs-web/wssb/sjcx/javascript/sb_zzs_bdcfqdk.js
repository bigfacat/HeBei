/************初始化页面“代理事件}****************/
function delegateInit(){
	   /******代理页面input添加元素事件*****/
		$("#tabList").on("blur",":input[type='text'][disabled!='true']",function(event){ 
				var validateType=$(this).attr('validateType');
				if(typeof(validateType)!="undefined")
				{   var validateParamJson = jQuery.parseJSON(validateType);
					var flage= validate(this,validateParamJson);
					var _type=validateParamJson.type
					var stopPropagation=typeof(validateParamJson.stopPropagation)!="undefined"?validateParamJson.stopPropagation:false;
					if(_type!="string"||_type!="dateA"||_type!="dateB"||_type!="dateC"||_type!="dateC")
					{  
						    checkall(this);
					}
				}
		 });
}

/******初始化页面数据*******/
function initDataObj(){
	this.init=function(json){
					var rows=json["rows"];
					if(rows.length>0)
					{   var _jspLogic=$('#logic').val();
					    var data=rows[0];
						
						$("#sssq_q").val(data.sssq_q);
						$("#sssq_z").val(data.sssq_z);
                         initTableTitle();
						 
						 for(_key in data){
							 
								 $("#"+_key+"").val(data[_key]);
							
							
					       }

					}else{
						alert("没有取到申报数据！！")
						//parent.location="zzs.jsp";
					}
	   };
}
/************初始化页面“数据初始化”****************/
function initTableTagValue(){
	   var _jspLogic=$('#logic').val();
	   if(typeof(_jspLogic)=="undefiled") return;
	   var json={};
	   	if(_jspLogic=="sb")
	   {
         json={proceduresName:'ZWB_MULTI_GET_FB_2012',//增值税预缴税款表
				paramLength:'5',
				param1:$('#nsrsbh').val(),
				param2:$('#sssqq').val(),
				param3:$('#sssqz').val(),
				param4:"19",
				param5:"0",
				withColName:"true"}			   
	   }
	   if(_jspLogic=="update")
	   {
         json={proceduresName:'ZWB_MULTI_GET_FB_2012',//增值税预缴税款表
				paramLength:'5',
				param1:$('#nsrsbh').val(),
				param2:$('#sssqq').val(),
				param3:$('#sssqz').val(),
				param4:"19",
				param5:$('#pzxh').val()+"105",
				withColName:"true"}			   
	   }
	   if(_jspLogic=="dis"||_jspLogic=="print")
	   {
         json={proceduresName:'ZWB_MULTI_GET_SBB_CX',//增值税预缴税款表
		    paramLength:'3',
				param1:$('#pzxh').val(),
				param2:"105",
				param3:"25",
				withColName:"true"}	
				//alert(JSON.stringify(json));		   
	   }	 
	   
	  $.post("./../QueryJsonString_cx.ashx",json,function(data){
														
		  var initDataHelp=new initDataObj();
		  initDataHelp.init(data);
	  }); 
}
/************在显示和打印页面“删除控件”****************/
function replaceTag(){
		$("#tabList td").each( function(){
							if(($(this).attr("bgcolor"))!="")
							{
								$(this).css("background","#ffffff");//
							}
						 }
					);
		 //第二步将ID=tabList的table去掉样式同时为每个td设置样式为class="style_td" 同时要求每个td不带高度
		 $("#tabList").removeClass("unnamed1");
		 $("#tabList").addClass("style_tab");
		 $("#tabList td").each(
			function(){
				$(this).addClass("style_td");
				$(this).removeAttr("height");
			}
		 );
		 //第三步对<input type="text">进行删除处理
		 /****存在2个input共同在td中 需要特殊处理****/
		  var  timeBegin="";/**特殊业务特殊处理****/
		  var  timeEnd="";/**特殊业务特殊处理****/
		 $("#tabList :input[type='text'],select").each(function(){

							 var textValue="";
							 if(this.tagName=="SELECT")				
							 { textValue=$(this).find("option:selected").text();}
							 else{textValue=$(this).val();}
							  textValue=""==$(this).val()?" ":textValue;
							 if(($(this).parent().text()).indexOf("*")==-1)
							 $(this).parent().text(textValue);
							  $(this).remove(); 
						 }
					  );	
		 //第四步对<input type="button">动态按钮删除处理
		 $("#tabList :input[type='button']").each(function(){
							  $(this).parent().attr("width",5);
							  $(this).parent().text(" ");
							  $(this).remove(); 
						 }
					  );			 
	}		
/***********申报页面初始化表头标题信息【申报所属期、纳税人识别号、纳税人每次】”****************/	
function initTableTitle(){
	 var nsrmcStr=$("#nsrmc").val();
	 var sssqqStr=$("#sssqq").val();
	 var sssqzStr=$("#sssqz").val();
	 var nsrsbhStr=$("#nsrsbh").val();
	 
	 var sssqStr="税款所属时间:"+sssqqStr.substring(0,4)+"年"+sssqqStr.substring(5,7)+"月"+sssqqStr.substring(8,10)+"日"+" 至 "+sssqzStr.substring(0,4)+"年"+sssqzStr.substring(5,7)+"月"+sssqzStr.substring(8,10)+"日";
	 $("#title_sssq").text(sssqStr)
	 $("#title_nsrsbh").text(nsrsbhStr)
	 $("#title_nsrmc").text("纳税人名称： "+nsrmcStr+" （公章）");
}	
	

$(
   function(){  
	   var _jspLogic=$('#logic').val();
	     if(typeof(_jspLogic)=="undefiled") return;
		 
	   switch(_jspLogic){
			  case "sb":
				 initTableTitle();//初始化页面表头信息【申报所属期、纳税人识别号、纳税人每次】
				 initTableTagValue();//初始化修改数据
				 delegateInit(); //初始化控件代理事件
				 break;
			  case "update":
			  	 delegateInit();      //初始化控件代理事件
				 initTableTagValue(); //初始化修改数据
				break;
			  case "dis":
			     delegateInit();      //初始化控件代理事件
			  	 initTableTagValue();//初始化修改数据
				 replaceTag();       //删除输入控件<input type=
				 replaceOptionDiv("zzs.jsp")//仅留下返回按钮 去掉 确定和重置
				break;
			  case "print":
			     delegateInit();      //初始化控件代理事件
				 initTableTagValue();//初始化修改数据
				 replaceTag();      //删除输入控件<input type=
				 createObjectTag(); //删除下面的确定 提交按钮,同时构建构建object标签用于浏览器提示下载ActiveX控件 同时构建打印、放大、 缩小、 打印设置、 打印预览、 另存为 、隐藏按钮
				break;		
	      }
	   }
 )	

 function checkall(obj){
      //期末待抵扣不动产进项税额6=1+2-3+4-5
	  $v2("qmye").value=$v("qcye")+$v("bqzje")-$v("bqdke")+$v("bqzr_dke")-$v("bqzc_dke");
	  toRound2Obj($v2("qmye"));	  
 }

function f_sub()
{	 
     if($v("bqdke")>Math.round(($v("qcye")+$v("bqzje")+$v("bqzr_dke"))*100)/100)
	 {
		  alert("第3列["+$v("bqdke")+"]必须小于等于1+2+4["+Math.round(($v("qcye")+$v("bqzje")+$v("bqzr_dke"))*100)/100+"]");
		 SetFocus($("#bqdke").get(0));
		 return;
	 }
     if($v("bqzc_dke")>Math.round(($v("qcye")+$v("bqzr_dke"))*100)/100)
	 {
		  alert("第5列["+$v("bqzc_dke")+"]必须小于等于1+4["+Math.round(($v("qcye")+$v("bqzr_dke"))*100)/100+"]");
		 SetFocus($("#bqzc_dke").get(0));
		 return;
	 }	 
	 if(document.form1.sub.value==0)
	 {
		  document.form1.sub.value=1;
		  f_active();
		  document.form1.action="sbtj_zzs_bdcfqdk.jsp";
		  document.form1.submit();
	  }
}
