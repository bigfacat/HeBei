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
					{   if(!stopPropagation)
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
							$("#"+_key+"").val(data[_key])
					       }

					}else{
						alert("没有取到申报数据！！")
						parent.location="zzs.jsp";
					}
	   };
}
/************初始化页面“数据初始化”****************/
function initTableTagValue(){
	   var _jspLogic=$('#logic').val();
	   if(typeof(_jspLogic)=="undefiled") return;
	   var json={};
	   if(_jspLogic=="update")
	   {
         json={proceduresName:'ZWB_MULTI_GET_FB_2012',//增值税预缴税款表
				paramLength:'5',
				param1:$('#nsrsbh').val(),
				param2:$('#sssqq').val(),
				param3:$('#sssqz').val(),
				param4:"20",
				param5:$('#pzxh').val()+"105",
				withColName:"true"}			   
	   }
	   if(_jspLogic=="dis"||_jspLogic=="print")
	   {
         json={proceduresName:'zwb_multi_get_sbb_cx',//增值税预缴税款表
		        paramLength:'3',
				param1:$('#pzxh').val(),
				param2:"105",
				param3:"26",
				withColName:"true"}			   
	   }		
	  $.post("./../QueryJsonString_cx.ashx",json,function(data){
		  //alert(JSON.stringify(data))
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
	 
	 var sssqStr="所属时间:"+sssqqStr.substring(0,4)+"年"+sssqqStr.substring(5,7)+"月"+sssqqStr.substring(8,10)+"日"+" 至 "+sssqzStr.substring(0,4)+"年"+sssqzStr.substring(5,7)+"月"+sssqzStr.substring(8,10)+"日";
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
	      var nameSplitList=(obj.name).split("_");
		  if(nameSplitList[nameSplitList.length-1]=="je")
		  {   //金额1=2+4+5+11+16+18+27+29+30
			  $v2("hj_je").value=$v("sl_17_je")+$v("sl_13_je")+$v("sl_11_je")+$v("sl_6_je")+$v("sl_5_je")+$v("sl_3_je")+$v("sl_15_je")+$v("dk_yygxbcsycxdk_je")+$v("dk_txf_je")
		      toRound2Obj($v2("hj_je"));	
		  }
		  if(nameSplitList[nameSplitList.length-1]=="se")
		  {   //税额1=2+4+5+11+16+18+27+29+30
              $v2("hj_se").value=$v("sl_17_se")+$v("sl_13_se")+$v("sl_11_se")+$v("sl_6_se")+$v("sl_5_se")+$v("sl_3_se")+$v("sl_15_se")+$v("dk_yygxbcsycxdk_se")+$v("dk_txf_se")
		      toRound2Obj($v2("hj_se"));	
		  }		    
	   }
	   

function f_sub()
{	 
   /* if($v("sl_17_je")<$v("sl_17_qz_yxdczp_je"))
	 {
		 var r=confirm("‘金额’栏次第2栏["+$v("sl_17_je")+"]”应该大于等于 第3栏次["+$v("sl_17_qz_yxdczp_je")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }
    if($v("sl_17_se")<$v("sl_17_qz_yxdczp_se"))
	 {
		 var r=confirm("‘税额’栏次第2栏["+$v("sl_17_se")+"]”应该大于等于 第3栏次["+$v("sl_17_qz_yxdczp_se")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	
    if($v("sl_11_je")<Math.round(($v("sl_11_qz_hwysfw_je")+$v("sl_11_qz_jzazfw_je")+$v("sl_11_qz_bdczpfw_je")+$v("sl_11_qz_grbdc_je"))*100)/100)
	 {
		 var r=confirm("‘金额’栏次第5栏["+$v("sl_11_je")+"]”应该大于等于 第6+7+8+9栏次["+Math.round(($v("sl_11_qz_hwysfw_je")+$v("sl_11_qz_jzazfw_je")+$v("sl_11_qz_bdczpfw_je")+$v("sl_11_qz_grbdc_je"))*100)/100+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }
    if($v("sl_11_se")<Math.round(($v("sl_11_qz_hwysfw_se")+$v("sl_11_qz_jzazfw_se")+$v("sl_11_qz_bdczpfw_se")+$v("sl_11_qz_grbdc_se"))*100)/100)
	 {
		 var r=confirm("‘税额’栏次第5栏["+$v("sl_11_se")+"]”应该大于等于 第6+7+8+9栏次["+Math.round(($v("sl_11_qz_hwysfw_se")+$v("sl_11_qz_jzazfw_se")+$v("sl_11_qz_bdczpfw_se")+$v("sl_11_qz_grbdc_se"))*100)/100+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 } 	 
    if($v("sl_6_je")<Math.round(($v("sl_6_qz_zjsfjrfw_je")+$v("sl_6_qz_ccbx_je"))*100)/100)
	 {
		 var r=confirm("‘金额’栏次第10栏["+$v("sl_6_je")+"]”应该大于等于 第11+12栏次["+Math.round(($v("sl_6_qz_zjsfjrfw_je")+$v("sl_6_qz_ccbx_je"))*100)/100+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	 
    if($v("sl_6_se")<Math.round(($v("sl_6_qz_zjsfjrfw_se")+$v("sl_6_qz_ccbx_se"))*100)/100)
	 {
		 var r=confirm("‘税额’栏次第10栏["+$v("sl_6_se")+"]”应该大于等于 第11+12栏次["+Math.round(($v("sl_6_qz_zjsfjrfw_se")+$v("sl_6_qz_ccbx_se"))*100)/100+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	 	 
    if($v("sl_5_je")<$v("sl_5_qz_grbdc_je"))
	 {
		 var r=confirm("‘金额’栏次第13栏["+$v("sl_5_je")+"]”应该大于等于 第14栏次["+$v("sl_5_qz_grbdc_je")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	 
	    if($v("sl_5_se")<$v("sl_5_qz_grbdc_se"))
	 {
		 var r=confirm("‘税额’栏次第13栏["+$v("sl_5_se")+"]”应该大于等于 第14栏次["+$v("sl_5_qz_grbdc_se")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	  
    if($v("sl_3_je")<$v("sl_3_qz_jzazfw_je"))
	 {
		 var r=confirm("‘金额’栏次第15栏["+$v("sl_3_je")+"]”应该大于等于 第16栏次["+$v("sl_3_qz_jzazfw_je")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }		 
    if($v("sl_3_se")<$v("sl_3_qz_jzazfw_se"))
	 {
		 var r=confirm("‘税额’栏次第15栏["+$v("sl_3_se")+"]”应该大于等于 第16栏次["+$v("sl_3_qz_jzazfw_se")+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		 if(!r){return;}
	 }	*/
if($v("sl_17_je")<$v("sl_17_qz_yxdczp_je"))
	 {
		 alert("‘金额’栏次第2栏["+$v("sl_17_je")+"]”应该大于等于 第3栏次["+$v("sl_17_qz_yxdczp_je")+"]！！");
		 return;
	 }
    if($v("sl_17_se")<$v("sl_17_qz_yxdczp_se"))
	 {
		 alert("‘税额’栏次第2栏["+$v("sl_17_se")+"]”应该大于等于 第3栏次["+$v("sl_17_qz_yxdczp_se")+"]！！");
		 return;
	 }	
    if($v("sl_11_je")<Math.round(($v("sl_11_qz_ysfw_je")+$v("sl_11_qz_dxfw_je")+$v("sl_11_qz_jzazfw_je")+$v("sl_11_qz_bdczpfw_je")+$v("sl_11_qz_srtdshq_je"))*100)/100)
	 {
		 alert("‘金额’栏次第5栏["+$v("sl_11_je")+"]”应该大于等于 第6+7+8+9+10栏次["+Math.round(($v("sl_11_qz_ysfw_je")+$v("sl_11_qz_dxfw_je")+$v("sl_11_qz_jzazfw_je")+$v("sl_11_qz_bdczpfw_je")+$v("sl_11_qz_srtdshq_je"))*100)/100+"]！！");
		 return;
	 }
    if($v("sl_11_se")<Math.round(($v("sl_11_qz_ysfw_se")+$v("sl_11_qz_dxfw_se")+$v("sl_11_qz_jzazfw_se")+$v("sl_11_qz_bdczpfw_se")+$v("sl_11_qz_srtdshq_se"))*100)/100)
	 {
		 alert("‘税额’栏次第5栏["+$v("sl_11_se")+"]”应该大于等于 第6+7+8+9+10栏次["+Math.round(($v("sl_11_qz_ysfw_se")+$v("sl_11_qz_dxfw_se")+$v("sl_11_qz_jzazfw_se")+$v("sl_11_qz_bdczpfw_se")+$v("sl_11_qz_srtdshq_se"))*100)/100+"]！！");
		 return;
	 } 	 
    if($v("sl_6_je")<Math.round(($v("sl_6_qz_dxfw_je")+$v("sl_6_qz_jrbxfw_je")+$v("sl_6_qz_shfw_je")+$v("sl_6_qz_qdwxzc_je"))*100)/100)
	 {
		 alert("‘金额’栏次第11栏["+$v("sl_6_je")+"]”应该大于等于 第12+13+14+15栏次["+Math.round(($v("sl_6_qz_dxfw_je")+$v("sl_6_qz_jrbxfw_je")+$v("sl_6_qz_shfw_je")+$v("sl_6_qz_qdwxzc_je"))*100)/100+"]！！");
		 return;
	 }	 
    if($v("sl_6_se")<Math.round(($v("sl_6_qz_dxfw_se")+$v("sl_6_qz_jrbxfw_se")+$v("sl_6_qz_shfw_se")+$v("sl_6_qz_qdwxzc_se"))*100)/100)
	 {
		 alert("‘税额’栏次第11栏["+$v("sl_6_se")+"]”应该大于等于 第12+13+14+15栏次["+Math.round(($v("sl_6_qz_dxfw_se")+$v("sl_6_qz_jrbxfw_se")+$v("sl_6_qz_shfw_se")+$v("sl_6_qz_qdwxzc_se"))*100)/100+"]！！");
		 return;
	 }	 	 
    if($v("sl_5_je")<$v("sl_5_qz_bdczpfw_je"))
	 {
		 alert("‘金额’栏次第16栏["+$v("sl_5_je")+"]”应该大于等于 第17栏次["+$v("sl_5_qz_bdczpfw_je")+"]！！");
		 return;
	 }	 
	    if($v("sl_5_se")<$v("sl_5_qz_bdczpfw_se"))
	 {
		 alert("‘税额’栏次第16栏["+$v("sl_5_se")+"]”应该大于等于 第17栏次["+$v("sl_5_qz_bdczpfw_se")+"]！！");
		 return;
	 }	  
    if($v("sl_3_je")<Math.round(($v("sl_3_qz_hwjgxl_je")+$v("sl_3_qz_ysfw_je")+$v("sl_3_qz_dxfw_je")+$v("sl_3_qz_jzazfw_je")+$v("sl_3_qz_jrbxfw_je")+$v("sl_3_qz_yxdczpfw_je")+$v("sl_3_qz_shfw_je")+$v("sl_3_qz_qdwxzc_je"))*100)/100)
	 {
		 alert("‘金额’栏次第18栏["+$v("sl_3_je")+"]”应该大于等于 第19+20+21+22+23+24+25+26栏次["+Math.round(($v("sl_3_qz_hwjgxl_je")+$v("sl_3_qz_ysfw_je")+$v("sl_3_qz_dxfw_je")+$v("sl_3_qz_jzazfw_je")+$v("sl_3_qz_jrbxfw_je")+$v("sl_3_qz_yxdczpfw_je")+$v("sl_3_qz_shfw_je")+$v("sl_3_qz_qdwxzc_je"))*100)/100+"]！！");
		 return;
	 }	 
    if($v("sl_3_se")<Math.round(($v("sl_3_qz_hwjgxl_se")+$v("sl_3_qz_ysfw_se")+$v("sl_3_qz_dxfw_se")+$v("sl_3_qz_jzazfw_se")+$v("sl_3_qz_jrbxfw_se")+$v("sl_3_qz_yxdczpfw_se")+$v("sl_3_qz_shfw_se")+$v("sl_3_qz_qdwxzc_se"))*100)/100)
	 {
		 alert("‘税额’栏次第18栏["+$v("sl_3_se")+"]”应该大于等于 第19+20+21+22+23+24+25+26栏次["+Math.round(($v("sl_3_qz_hwjgxl_se")+$v("sl_3_qz_ysfw_se")+$v("sl_3_qz_dxfw_se")+$v("sl_3_qz_jzazfw_se")+$v("sl_3_qz_jrbxfw_se")+$v("sl_3_qz_yxdczpfw_se")+$v("sl_3_qz_shfw_se")+$v("sl_3_qz_qdwxzc_se"))*100)/100+"]！！");
		 return;
	 }	 
	 
	 if(document.form1.sub.value==0)
	 {
		  document.form1.sub.value=1;
		  f_active();
		  document.form1.action="sbtj_zzs_dkjxsemx.jsp";
		  document.form1.submit();
	  }
}
