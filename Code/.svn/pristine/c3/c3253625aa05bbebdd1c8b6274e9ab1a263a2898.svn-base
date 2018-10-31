var ygzsd_zzspm_dm_select_lis;
var zzs_sl_select_list;
var userDefualZzspmList=[];
var showAertInfo=true;
 //$.ajaxSetup({async:true,dataType:"json"});
 
var cacheJsonDom={
                   ygzsd_zzspm_dm:[],
	               ygzsd_zzspm_mc:[],
	               zzs_sl:[],//
                   yys_sl:[],//
				   zzs_bhsxse:[],//
				   zzs_xxse:[],//
				   zrsd:[],//
				   zzs_jshj:[],//
				   zzs_hsxse_kch:[],//
				   zzs_ynse_cs:[],//
				   zzs_xxse_kch:[],//
				   yys_qcye:[],//
				   yys_bqfse:[],//
				   yys_bqykce:[],//
				   yys_bqsjkce:[],//
				   yys_qmye:[],//
				   yys_ysyye:[],
				   yys_ynse:[],//
				   zj_zzs_bhsxse:[],//总计行次缓存
				   zj_zzs_xxse:[],//
				   zj_zrsd:[],//
				   zj_zzs_jshj:[],//
				   zj_zzs_hsxse_kch:[],//
				   zj_zzs_ynse_cs:[],//
				   zj_zzs_xxse_kch:[],//
				   zj_yys_qcye:[],//
				   zj_yys_bqfse:[],//
				   zj_yys_bqykce:[],//
				   zj_yys_bqsjkce:[],//
				   zj_yys_qmye:[],//
				   zj_yys_ysyye:[],
				   zj_yys_ynse:[]//
	              }  

function initCacheColListDom(){
	/****多行缓存*****/
	cacheJsonDom.ygzsd_zzspm_dm=$(":input[name='ygzsd_zzspm_dm']");
	cacheJsonDom.ygzsd_zzspm_mc=$(":input[name='ygzsd_zzspm_mc']");
	cacheJsonDom.zzs_sl=$(":input[name='zzs_sl']");
	cacheJsonDom.yys_sl=$(":input[name='yys_sl']");
	cacheJsonDom.zzs_bhsxse=$(":input[name='zzs_bhsxse']");
	cacheJsonDom.zzs_xxse=$(":input[name='zzs_xxse']");
	cacheJsonDom.zzs_jshj=$(":input[name='zzs_jshj']");
	cacheJsonDom.zzs_bqsjkce=$(":input[name='zzs_bqsjkce']");
	cacheJsonDom.zzs_hsxse_kch=$(":input[name='zzs_hsxse_kch']");
	cacheJsonDom.zzs_ynse_cs=$(":input[name='zzs_ynse_cs']");
	cacheJsonDom.zzs_xxse_kch=$(":input[name='zzs_xxse_kch']");
	cacheJsonDom.yys_qcye=$(":input[name='yys_qcye']");
	cacheJsonDom.yys_bqfse=$(":input[name='yys_bqfse']");
	cacheJsonDom.yys_bqykce=$(":input[name='yys_bqykce']");
	cacheJsonDom.yys_bqsjkce=$(":input[name='yys_bqsjkce']");
	cacheJsonDom.yys_qmye=$(":input[name='yys_qmye']");
	cacheJsonDom.yys_ysyye=$(":input[name='yys_ysyye']");
	cacheJsonDom.yys_ynse=$(":input[name='yys_ynse']");
	
	/****总计行缓存*****/
	cacheJsonDom.zj_zzs_bhsxse=$(":input[name='zj_zzs_bhsxse']");
	cacheJsonDom.zj_zzs_xxse=$(":input[name='zj_zzs_xxse']");
	cacheJsonDom.zj_zzs_jshj=$(":input[name='zj_zzs_jshj']");
	cacheJsonDom.zj_zzs_bqsjkce=$(":input[name='zj_zzs_bqsjkce']");
	cacheJsonDom.zj_zzs_hsxse_kch=$(":input[name='zj_zzs_hsxse_kch']");
	cacheJsonDom.zj_zzs_ynse_cs=$(":input[name='zj_zzs_ynse_cs']");
	cacheJsonDom.zj_zzs_xxse_kch=$(":input[name='zj_zzs_xxse_kch']");
	cacheJsonDom.zj_yys_qcye=$(":input[name='zj_yys_qcye']");
	cacheJsonDom.zj_yys_bqfse=$(":input[name='zj_yys_bqfse']");
	cacheJsonDom.zj_yys_bqykce=$(":input[name='zj_yys_bqykce']");
	cacheJsonDom.zj_yys_bqsjkce=$(":input[name='zj_yys_bqsjkce']");
	cacheJsonDom.zj_yys_qmye=$(":input[name='zj_yys_qmye']");
	cacheJsonDom.zj_yys_ysyye=$(":input[name='zj_yys_ysyye']");
	cacheJsonDom.zj_yys_ynse=$(":input[name='zj_yys_ynse']");
} 
 
 function setOldValue(){
		for(var i=0;i<cacheJsonDom.zzs_xxse.length;i++)
		  {    var parentJDom=cacheJsonDom.zzs_xxse[i];
			   $(cacheJsonDom.zzs_xxse[i]).attr("oldvalue",toRound2Val(cacheJsonDom.zzs_bhsxse[i].value*cacheJsonDom.zzs_sl[i].value/100));
			   $(cacheJsonDom.zzs_xxse_kch[i]).attr("oldvalue",toRound2Val(cacheJsonDom.zzs_hsxse_kch[i].value/(100+ parseInt(cacheJsonDom.zzs_sl[i].value))*cacheJsonDom.zzs_sl[i].value));
			   $(cacheJsonDom.yys_ynse[i]).attr("oldvalue",toRound2Val(cacheJsonDom.yys_ysyye[i].value*cacheJsonDom.yys_sl[i].value/100));
		  } 
} 
 
function checkall(obj){
		  var name=obj.name;
		  var parentJDom=$(obj).parent().parent();
		   if(obj.name=="ygzsd_zzspm_dm"||obj.name=="zzs_sl"||obj.name=="yys_sl"||obj.name=="zzs_bhsxse")
		   {
			   //2=1×增值税税率或征收率
			   $v2("zzs_xxse",parentJDom).value=$v("zzs_bhsxse",parentJDom)*$v("zzs_sl",parentJDom)/100;
			   toRound2Obj($v2("zzs_xxse",parentJDom));  
			   $("[name='zzs_xxse']",parentJDom).attr("oldvalue",$("[name='zzs_xxse']",parentJDom).val())
		   }
		  //3=1+2
		   $v2("zzs_jshj",parentJDom).value=$v("zzs_bhsxse",parentJDom)+$v("zzs_xxse",parentJDom);
		   toRound2Obj($v2("zzs_jshj",parentJDom));  
					  
			//5=3-4
		   $v2("zzs_hsxse_kch",parentJDom).value=$v("zzs_jshj",parentJDom)-$v("zzs_bqsjkce",parentJDom);
		   toRound2Obj($v2("zzs_hsxse_kch",parentJDom)); 				
		   
          //6=5÷(100%+增值税税率或征收率)×增值税税率或征收率
		   //$v2("zzs_xxse_kch",parentJDom).value=$v("zzs_hsxse_kch",parentJDom)/(100+$v("zzs_sl",parentJDom))*$v("zzs_sl",parentJDom)/100
		   $v2("zzs_xxse_kch",parentJDom).value=$v("zzs_hsxse_kch",parentJDom)/(100+$v("zzs_sl",parentJDom))*$v("zzs_sl",parentJDom)
		    toRound2Obj($v2("zzs_xxse_kch",parentJDom)); 	
		    $("[name='zzs_xxse_kch']",parentJDom).attr("oldvalue",$("[name='zzs_xxse_kch']",parentJDom).val())
			
			//7增值税应纳税额（测算）
			if($v("zzs_sl",parentJDom)==3||$v("zzs_sl",parentJDom)==5)
			{ 
				$v2("zzs_ynse_cs",parentJDom).value=$v("zzs_xxse_kch",parentJDom);	   
				toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
			}else
			{
				$v2("zzs_ynse_cs",parentJDom).value=($v("zb_19_yb")==0||$v("zb_11_yb")==0)?"0":$v("zzs_xxse_kch",parentJDom)/$v("zb_11_yb")*$v("zb_19_yb");	  	   
				toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
			}
			 $("[name='zzs_ynse_cs']",parentJDom).attr("oldvalue",$("[name='zzs_ynse_cs']",parentJDom).val())
			
			//10=8+9
			 $v2("yys_bqykce",parentJDom).value=$v("yys_qcye",parentJDom)+$v("yys_bqfse",parentJDom);	   
			 toRound2Obj($v2("yys_bqykce",parentJDom));    
			 //本期实际扣除金额
			 if($v("yys_bqykce",parentJDom)<=$v("zzs_jshj",parentJDom))
			 {
				  $v2("yys_bqsjkce",parentJDom).value=$v("yys_bqykce",parentJDom);	 
			 }
			 if($v("yys_bqykce",parentJDom)>$v("zzs_jshj",parentJDom))
			 {
				  $v2("yys_bqsjkce",parentJDom).value=$v("zzs_jshj",parentJDom);	 
			 }		 
			//12=10-11
			 $v2("yys_qmye",parentJDom).value=$v("yys_bqykce",parentJDom)-$v("yys_bqsjkce",parentJDom);	   
			 toRound2Obj($v2("yys_qmye",parentJDom));    		 
			//13=3-11
			 $v2("yys_ysyye",parentJDom).value=$v("zzs_jshj",parentJDom)-$v("yys_bqsjkce",parentJDom);	   
			 toRound2Obj($v2("yys_ysyye",parentJDom));  		 
			   
			 //14=13×营业税税率
			  $v2("yys_ynse",parentJDom).value=$v("yys_ysyye",parentJDom)*$v("yys_sl",parentJDom)/100;
			  toRound2Obj($v2("yys_ynse",parentJDom));  		 
			  $("[name='yys_ynse']",parentJDom).attr("oldvalue",$("[name='yys_ynse']",parentJDom).val());
			  hj();
	   }

	
function hj(){
     var cols=new Array('zzs_bhsxse','zzs_xxse','zzs_jshj','zzs_bqsjkce','zzs_hsxse_kch','zzs_xxse_kch','zzs_ynse_cs','yys_qcye','yys_bqfse','yys_bqykce','yys_bqsjkce','yys_qmye','yys_ysyye','yys_ynse');
	 for(var i=0;i<cols.length;i++)
	 {   
	       var  add_input=cacheJsonDom["zj_"+cols[i]][0];//从缓存中去合计
				add_input.value="0";
				/*var addArrayInput=$(":input[name='"+cols[i]+"']",$("#tabList"));*/
				var addArrayInput=cacheJsonDom[cols[i]];//从缓存中获取对象列数组
				for(var j=0;j<addArrayInput.length;j++)
				{
					add_input.value=toRound2Val(add_input.value)+toRound2Val((addArrayInput[j]).value);
				}
		       toRound2Obj(add_input);
	 }
}				


var cacheSlOptionStr="";//税率缓存select项目字符串
function getsLSelectOptionString(selectList){
	  if(typeof(selectList)=="undefined ")
	    return "";
		if(cacheSlOptionStr=="")
		{
		   $(selectList).each(function(){
					var sl=this.sl;  
					cacheSlOptionStr=cacheSlOptionStr+"<option value='"+sl+"'>"+sl+"</option>"; 												 
				});	
		}
		return cacheSlOptionStr;
	}
	
var cacheZzspmOptionStr="";//税率缓存select项目字符串	
function getZzspmSelectOptionString(selectList){
	  if(typeof(selectList)=="undefined ")
	    return "";
		if(cacheZzspmOptionStr=="")
		{
		   $(selectList).each(function(){
					var dm=this.ygzsd_zzspm_dm;  
					var mc=this.ygzsd_zzspm_mc;  
					cacheZzspmOptionStr=cacheZzspmOptionStr+"<option value=\""+dm+"\">"+dm+mc+"</option>"; 												 
				});		
		}
		return cacheZzspmOptionStr;
	}
	

/************初始化页面“代理事件}****************/
function delegateInit(){
       	      $("#danyRow").on("click","[name='danyRowBtn']",function(event){ 
			                if($(this).attr("optionType")=="add")
			                  { 
			                     var appendHtmlStr="";
			                         appendHtmlStr=appendHtmlStr+"<tr>";
			                         appendHtmlStr=appendHtmlStr+"<td  align=\"center\" ><input type='button' name='danyRowBtn' value='-' optionType='delete'  style=\"width:30px\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td colspan=\"1\"><select name=\"ygzsd_zzspm_dm\" style=\"width:180px \"><option value=\"\" selected> </option>"+getZzspmSelectOptionString(ygzsd_zzspm_dm_select_list)+"</select><input type=\"hidden\" value=\"\" name=\"ygzsd_zzspm_mc\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td  align=\"center\"><select name=\"zzs_sl\"  style=\"width:50px\"><option value='0' selected> </option></select></td>";
									 appendHtmlStr=appendHtmlStr+"<td  align=\"center\"><select name=\"yys_sl\"  style=\"width:50px\"><option value='0' selected> </option></select></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_bhsxse\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_xxse\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'  oldvalue=\"0\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_jshj\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'  oldvalue=\"0\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_bqsjkce\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_hsxse_kch\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' disabled=\"true\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_xxse_kch\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' oldvalue=\"0\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"zzs_ynse_cs\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_qcye\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_bqfse\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}'></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_bqykce\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' disabled=\"true\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_bqsjkce\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' disabled=\"true\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_qmye\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' disabled=\"true\"></td>";
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_ysyye\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' disabled=\"true\"></td>";		
									 appendHtmlStr=appendHtmlStr+"<td><input type=\"text\" name=\"yys_ynse\"   value=\"0\" size=\"10\" validateType='{\"type\":\"float\"}' oldvalue=\"0\"></td>";											 
			                         appendHtmlStr=appendHtmlStr+"</tr>";
									$('#danyRow').append(appendHtmlStr);
									initCacheColListDom();
			                  }else
			                  { 
			                  	 $(this).parent().parent().remove();
								 initCacheColListDom();
								 hj();
			                  } 
							
																  
		});
	   /******代理页面input添加元素事件*****/
		$("#tabList").on("blur",":input[type='text'][disabled!='true'],select[name='zzs_sl'],select[name='yys_sl']",function(event){ 
				var validateType=$(this).attr('validateType');
				if(typeof(validateType)!="undefined")
				{   var validateParamJson = jQuery.parseJSON(validateType);
				    var _type=validateParamJson.type
					var flage= validate(this,validateParamJson);
					if(typeof(_type)!="undefined"&&_type!="string"&&_type!="dateA"&&_type!="dateB"&&_type!="dateC"&&_type!="dateC")
					{   
					   if(this.name=="zzs_xxse"||this.name=="zzs_xxse_kch"||this.name=="yys_ynse"||this.name=="zzs_ynse_cs")
					     {   var parentJDom=$(this).parent().parent();
						     if(this.name=="zzs_xxse"||this.name=="zzs_xxse_kch"){
								 f_compare2(this)//正负计算值的11%修改控制
							  }else{
							     f_compare(this); //正负1修改控制
							  }
							 if(this.name=="zzs_xxse")
							 {
								  //3=1+2
								   $v2("zzs_jshj",parentJDom).value=$v("zzs_bhsxse",parentJDom)+$v("zzs_xxse",parentJDom);
								   toRound2Obj($v2("zzs_jshj",parentJDom));  
											  
									//5=3-4
								   $v2("zzs_hsxse_kch",parentJDom).value=$v("zzs_jshj",parentJDom)-$v("zzs_bqsjkce",parentJDom);
								   toRound2Obj($v2("zzs_hsxse_kch",parentJDom)); 					
								   
								  //6=5÷(100%+增值税税率或征收率)×增值税税率或征收率
								   //$v2("zzs_xxse_kch",parentJDom).value=$v("zzs_hsxse_kch",parentJDom)/(100+$v("zzs_sl",parentJDom))*$v("zzs_sl",parentJDom)/100
								   $v2("zzs_xxse_kch",parentJDom).value=$v("zzs_hsxse_kch",parentJDom)/(100+$v("zzs_sl",parentJDom))*$v("zzs_sl",parentJDom)
									toRound2Obj($v2("zzs_xxse_kch",parentJDom)); 	
									$("[name='zzs_xxse_kch']",parentJDom).attr("oldvalue",$("[name='zzs_xxse_kch']",parentJDom).val())
									
									//7增值税应纳税额（测算）
									if($v("zzs_sl",parentJDom)==3||$v("zzs_sl",parentJDom)==5)
									{ 
										$v2("zzs_ynse_cs",parentJDom).value=$v("zzs_xxse_kch",parentJDom);	   
										toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
									}else
									{
										
										$v2("zzs_ynse_cs",parentJDom).value=($v("zb_19_yb")==0||$v("zb_11_yb")==0)?"0":$v("zzs_xxse_kch",parentJDom)/$v("zb_11_yb")*$v("zb_19_yb");	   
										toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
									}
																	 //本期实际扣除金额
									 if($v("yys_bqykce",parentJDom)<=$v("zzs_jshj",parentJDom))
									 {
										  $v2("yys_bqsjkce",parentJDom).value=$v("yys_bqykce",parentJDom);	 
									 }
									 if($v("yys_bqykce",parentJDom)>$v("zzs_jshj",parentJDom))
									 {
										  $v2("yys_bqsjkce",parentJDom).value=$v("zzs_jshj",parentJDom);	 
									 }		
														//13=3-11
								 $v2("yys_ysyye",parentJDom).value=$v("zzs_jshj",parentJDom)-$v("yys_bqsjkce",parentJDom);	   
								 toRound2Obj($v2("yys_ysyye",parentJDom));  	
								 			 //14=13×营业税税率
								  $v2("yys_ynse",parentJDom).value=$v("yys_ysyye",parentJDom)*$v("yys_sl",parentJDom)/100;
								  toRound2Obj($v2("yys_ynse",parentJDom));  		 
								  $("[name='yys_ynse']",parentJDom).attr("oldvalue",$("[name='yys_ynse']",parentJDom).val());
							 }
							  if(this.name=="zzs_xxse_kch")
							 {
								 	//7增值税应纳税额（测算）
									if($v("zzs_sl",parentJDom)==3||$v("zzs_sl",parentJDom)==5)
									{ 
										$v2("zzs_ynse_cs",parentJDom).value=$v("zzs_xxse_kch",parentJDom);	   
										toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
									}else
									{
										$v2("zzs_ynse_cs",parentJDom).value=($v("zb_19_yb")==0||$v("zb_11_yb")==0)?"0":$v("zzs_xxse_kch",parentJDom)/$v("zb_11_yb")*$v("zb_19_yb");	  
										toRound2Obj($v2("zzs_ynse_cs",parentJDom)); 
									}
							 }
							 
							        
		
						     hj();
						 }else
						 {
							checkall(this); 
						 }
						
						
					}
				}
		 });
	   /******代理页面input添加元素事件*****/
		$("#tabList").on("change","select",function(event,zzs_sl,yys_sl){
		    var selectedZzzspmObj=this;		 
			if(this.name=="zzs_sl"||this.name=="yys_sl")   
			{
				checkall(this);//税率联动计算
			}
			if(this.name=="ygzsd_zzspm_dm")   
			{  
				var parentJDom=$(this).parent().parent(); //应税项目代码及名称 将名称付给隐藏域 需要入库保存
		        $("[name='ygzsd_zzspm_mc']",parentJDom).val($(this).find("option:selected").text())
				
				/*******选择应税项目代码下拉联动生成【增值税税率或征收率(%)】选择下拉option 【营业税税率(%)】下拉option***********/
				var zzsSlSelectObj=$("[name='zzs_sl']",parentJDom);//【增值税税率或征收率(%)】对象
				var yysSlSelectObj=$("[name='yys_sl']",parentJDom);//【营业税税率(%)】对象
				
				if(this.value=="")
				{
					$(zzsSlSelectObj).html("<option value='0' selected> </option>");
					zzsSlSelectObj.value="0";
					$(zzsSlSelectObj).trigger("change")
					zzsSlSelectObj.onchage;
		            $(yysSlSelectObj).html("<option value='0' selected> </option>");
					yysSlSelectObj.value="0"
					$(yysSlSelectObj).trigger("change")
					 $("[name='yys_bqfse']",parentJDom).attr("disabled",false);
					 return ;
				}		

				var selectJdomData=jQuery.grep(ygzsd_zzspm_dm_select_list,function(_obj,i){//过滤找到选择的项目代码在原缓存数组中的具体json对象
													return 	_obj.ygzsd_zzspm_dm==selectedZzzspmObj.value;						   
											 }) ;
				if(selectJdomData.length==0)
				   return;
				var zzsSlOptions=selectJdomData[0].zzs_sl;//【增值税税率或征收率(%)】下拉字符串
				var yysSlOptions=selectJdomData[0].yys_sl;//【营业税税率(%)】下拉字符串
				$(zzsSlSelectObj).html("<option value='0' selected> </option>");
				$(yysSlSelectObj).html("<option value='0' selected> </option>");
	
				if(yysSlOptions=="")
				{
					alert("应税项目代码及名称["+$(this).find("option:selected").text()+"]的[营业税税率(%)]下拉为获取到请联系管理员!!");
					return;
				}else
				{     //格式:6%消费税_6%|11%增值税_11%
					$(yysSlOptions.split("|")).each(function(){
									   /*var myOption1=document.createElement("option")  
									   myOption1.setAttribute("value",this.replace(/%/g,""))  
									   myOption1.appendChild(document.createTextNode(this))  
									   yysSlSelectObj[0].appendChild(myOption1) */ 
					    $(yysSlSelectObj).append("<option value='"+this.replace(/%/g,"")+"'>"+this+"</option>");
					   });		
					if(yys_sl!=undefined)//默认的yys_sl如修改 显示 和打印 //IE6的不兼容性导致采用此方法给SELECT赋值
					{    
						 //$(yysSlSelectObj).val(yys_sl);
						 $(yysSlSelectObj).each(function(){
							for(var i = 0; i < this.options.length; i++){
								if(this.options[i].value ==yys_sl){
									this.options[i].setAttribute("selected","selected");
									break;
								}
							}
						})
					}else
					{
					//$(zzsSlSelectObj).trigger("change");//手动触发原来的数据事件 进行联动计算
					  checkall(yysSlSelectObj)
					}
				}	
				if(zzsSlOptions=="")
				{
					alert("应税项目代码及名称["+$(this).find("option:selected").text()+"]的[增值税税率或征收率(%)]下拉为获取到请联系管理员!!");
					return;
				}else
				{     //格式:6%消费税_6%|11%增值税_11%
					$(zzsSlOptions.split("|")).each(function(){
							   /*var myOption1=document.createElement("option")  
							   myOption1.setAttribute("value",this.replace(/%/g,""))  
							   myOption1.appendChild(document.createTextNode(this))  
							   zzsSlSelectObj[0].appendChild(myOption1) */ 
					  $(zzsSlSelectObj).append("<option value='"+this.replace(/%/g,"")+"'>"+this+"</option>");
					})
					if(zzs_sl!=undefined)//默认的zzs_sl如修改 显示 和打印  //IE6的不兼容性导致采用此方法给SELECT赋值
					{
						 $(zzsSlSelectObj).each(function(){
							for(var i = 0; i < this.options.length; i++){
								if(this.options[i].value ==zzs_sl){
									this.options[i].setAttribute("selected","selected");
									//$(this.options[i]).attr("selected","selected");
									break;
								}
							}
						})
					}else
					{
					//$(zzsSlSelectObj).trigger("change");//手动触发原来的数据事件 进行联动计算
					 checkall(zzsSlSelectObj)
					}
				}
				if(selectJdomData[0].zzs_cezs_bz=="N")//如果增值税差额征税标记为N，且第9列不能填写数据。
				{    $("[name='yys_bqfse']",parentJDom).val("0");
					 $("[name='yys_bqfse']",parentJDom).attr("disabled",true);
				}else
				{
					 $("[name='yys_bqfse']",parentJDom).attr("disabled",false);
				}
			}
		 });	
		
		
}
/************初始化页面“select应税项目代码及名称”，“select增值税税率或征收率”,附表一填报数据****************/
function initParamValue(){
 showAertInfo=$('#logic').val()=="print"?false:true;	
var json={proceduresName:'ZWB_MULTI_GET_SBB_CX',
				paramLength:'3',
				param1:$('#pzxh').val(),
				param2:"105",
				param3:"27",
				withColName:"true"}
	var jsonZb1={proceduresName:'ZWB_MULTI_GET_FPDM',//营改增税负分析测算明细表 取应税项目代码及名称
				paramLength:'3',
				param1:$('#nsrdzdah').val(),
				param2:"",
				param3:"13",
				withColName:"true"}	
	$.when($.post("./../QueryJsonString_cx.ashx",json),
		   $.post("./../UitlQueryJsonString.ashx",jsonZb1))
			.done(function(data,dataZb1)
				     { 
				     			 // alert(JSON.stringify(data))
				     			  //alert(JSON.stringify(dataZb1))

						  if(data[1]=="success"&&dataZb1[1]=="success")
						    {  
								var helpInitObj=new initParamValueDataObj();
								     helpInitObj.init(data[0]);//初始化主表数据
									 helpInitObj.initZb1(dataZb1[0]);;//营改增税负分析测算明细表 取应税项目代码及名称
							}else
							{  if(showAertInfo){
								  alert("数据获取失败,页面重定向到增值税功能导航页!!");
								  parent.location="zzs.jsp";
							   }
							}
						   //alert(JSON.stringify(data)); 
						}
				) 
			.fail(function(){ if(showAertInfo){alert("数据获取失败,页面重定向到增值税功能导航页!!");parent.location="zzs.jsp";}});   	
	
	}
function initUserDefualtZzspmValue(){	
	var json={proceduresName:'ZWB_MULTI_GET_FPDM',//营改增税负分析测算明细表 取应税项目代码及名称
				paramLength:'3',
				param1:$('#nsrdzdah').val(),
				param2:"",
				param3:"14",
				withColName:"true"}	
 $.post("./../UitlQueryJsonString.ashx",json,function(data){
		  var rows=data.rows;
		  if(rows.length>0)
			  {  userDefualZzspmList=rows;
			     var row=rows[0];
				 /*$("#userDefualtZzspm").val(row.);
				  $("#userDefualtZzspm").attr("myAttr",row.);*/
			  }
		  });
    }
	
function initParamValueDataObj(){
	this.init=function(json){
					var rows=json["rows"];
					if(rows.length>0)
					{   var data=rows[0];
					    var zb_11_yb=data.zb_11_yb;
					    var zb_19_yb=data.zb_19_yb;
						$("#zb_11_yb").val(zb_11_yb);
						$("#zb_19_yb").val(zb_19_yb);
					}else{
						if(showAertInfo){
						   alert("上期数据获取失败,页面重定向到增值税功能导航页!!");
						   parent.location="zzs.jsp";
						}
					}
	}
	this.initZb1=function(jsonZb1){
				  var rows=jsonZb1["rows"];
				   if(rows.length>0)
				   {  ygzsd_zzspm_dm_select_list=rows;
					  $("select[name='ygzsd_zzspm_dm']").each(
						  function(){
						  var _selectJDOM=$(this);
						   $(rows).each(function(){
									var dm=this.ygzsd_zzspm_dm;  
									var mc=this.ygzsd_zzspm_mc;  
									_selectJDOM.append("<option value='"+dm+"'>"+dm+mc+"</option>"); 												 
								});
						   }      
						 );
					}else{
						if(showAertInfo){
							alert("【征税品目代码】数据获取失败,页面重定向到增值税功能导航页!!");
							parent.location="zzs.jsp";
						}
					}			  
	}
}
/************初始化页面“数据初始化”****************/
function initTableDisTagValue(){										
  showAertInfo=$('#logic').val()=="print"?false:true;	
	var json={proceduresName:'ZWB_MULTI_GET_SBB_CX',//企业分立-主表
				paramLength:'3',
				param1:$('#pzxh').val(),
				param2:"105",
				param3:"27",
				withColName:"true"}	
	  $.post("./../QueryJsonString_cx.ashx",json,function(data){
		  //alert(JSON.stringify(data))
		  var rows=data.rows;
		  if(rows.length>0)
			  {  
			      var danyRowBtnAdd=$('#danyRowBtnAdd');
					for(var i=1;i<rows.length-1;i++)
					{
						danyRowBtnAdd.click();//模拟点击构建动态行
					}
				initCacheColListDom();
				var hjJson=[]; 
				var _index=0;
				$(rows).each(function(){
					var _data=this;				  
					if(this.xh=='9999') 
					{ 
					   cacheJsonDom["zj_zzs_bhsxse"].val(this.zzs_bhsxse);//1列
					   cacheJsonDom["zj_zzs_xxse"].val(this.zzs_xxse);//2列
					   cacheJsonDom["zj_zzs_jshj"].val(this.zzs_jshj);//3列
					   cacheJsonDom["zj_zzs_bqsjkce"].val(this.zzs_bqsjkce);//4列
					   cacheJsonDom["zj_zzs_hsxse_kch"].val(this.zzs_hsxse_kch);//5
					   cacheJsonDom["zj_zzs_xxse_kch"].val(this.zzs_xxse_kch);//6
					   cacheJsonDom["zj_zzs_ynse_cs"].val(this.zzs_ynse_cs);//7
					   cacheJsonDom["zj_yys_qcye"].val(this.yys_qcye);//8列
					   cacheJsonDom["zj_yys_bqfse"].val(this.yys_bqfse);//9列
					   cacheJsonDom["zj_yys_bqykce"].val(this.yys_bqykce);//10列
					   cacheJsonDom["zj_yys_bqsjkce"].val(this.yys_bqsjkce);//11列
					   cacheJsonDom["zj_yys_qmye"].val(this.yys_qmye);//12列
					   cacheJsonDom["zj_yys_ysyye"].val(this.yys_ysyye);//13列
					   cacheJsonDom["zj_yys_ynse"].val(this. yys_ynse);//14列 
					   return true;
					  
					}else
					{ var _objZzspm=cacheJsonDom.ygzsd_zzspm_dm[_index]//;(document.getElementsByName('ygzsd_zzspm_dm'))[_index];
					         window.setTimeout(function(){//ie6需要稍微延迟  
								_objZzspm.value=_data.ygzsd_zzspm_dm;
								$(_objZzspm).trigger("change",[_data.zzs_sl,_data.yys_sl]);

							}, 0);
					    cacheJsonDom.ygzsd_zzspm_mc[_index].value=this.ygzsd_zzspm_mc;//
					   cacheJsonDom.zzs_bhsxse[_index].value=this.zzs_bhsxse;//1列
					   cacheJsonDom.zzs_xxse[_index].value=this.zzs_xxse;//2列
					   cacheJsonDom.zzs_jshj[_index].value=this.zzs_jshj;//3列
					   cacheJsonDom.zzs_bqsjkce[_index].value=this.zzs_bqsjkce;//4列
					   cacheJsonDom.zzs_hsxse_kch[_index].value=this.zzs_hsxse_kch;//5
					   cacheJsonDom.zzs_ynse_cs[_index].value=this.zzs_ynse_cs;//6
					   cacheJsonDom.zzs_xxse_kch[_index].value=this.zzs_xxse_kch;//7
					   cacheJsonDom.yys_qcye[_index].value=this.yys_qcye;//8列
					   cacheJsonDom.yys_bqfse[_index].value=this. yys_bqfse;//9列
					   cacheJsonDom.yys_bqykce[_index].value=this.yys_bqykce;//10列
					   cacheJsonDom.yys_bqsjkce[_index].value=this.yys_bqsjkce;//11列
					   cacheJsonDom.yys_qmye[_index].value=this.yys_qmye;//12列
					   cacheJsonDom.yys_ysyye[_index].value=this.yys_ysyye;//13列
					   cacheJsonDom.yys_ynse[_index].value=this. yys_ynse;//14列 
					   _index=_index+1; 
					}
					
					
				 });
				 window.setTimeout(function(){//ie6需要稍微延迟  
									if($('#logic').val()=="update")
									{
										setOldValue();
									}
							}, 1000);

		  }else
		  {   if(showAertInfo){
			     alert("【数据记录行初始化】数据获取失败,页面重定向到增值税功能导航页!!");
			     parent.location="zzs.jsp";
		      }
		  }
	  }); 
}

/************在显示和打印页面“删除控件”****************/
function replaceTag(){
       //第一步将ID=tabList的table去掉样式同时为设置样式为class="style_tab" 
		 $("#tabList").removeClass("unnamed1");
		 $("#tabList").addClass("style_tab");
		 
		 //第二步将ID=tabList的table去掉样式同时为每个td设置样式为class="style_td" 同时要求每个td不带高度
		 $("#tabList td").each(   
			function(){
				if(($(this).attr("bgcolor"))!="")
							{
								$(this).css("background","#ffffff");//
							}
				$(this).addClass("style_td");
				$(this).removeAttr("height");
			}
		 );
		 //第三步对<input type="text" <input type="button"> <input type="select">进行删除处理
		 $("input,select,button",$("#tabList")).each(function(){
							 var textValue="";
							 if(this.tagName.toLowerCase()=="select")//td中select标签显示内容
							 { 
							   textValue=$(this).find("option:selected").text();
							 }
							 if(this.tagName.toLowerCase()=="input"&&this.type.toLowerCase()=="button")//td中button标签显示内容
							 { 
								var textValue="　";
							   $(this).parent().attr("width",5);//解决IE6宽度没有2个td粘在一起
							 }
							 if(this.tagName.toLowerCase()=="input"&&this.type.toLowerCase()=="text")//td中input标签显示内容
							 {
								var textValue=$(this).val();
							 }							 
							 textValue=""==textValue?"  ":textValue;
							 
							 if(($(this).parent().text()).indexOf("*")==-1)//隐藏域特殊处理保留原来的*
							 {
							   $(this).parent().text(textValue);
							 }
							  $(this).remove(); //删除控件
						 }
					  );
		 $("#danyRow td:nth-child(2)").attr("colspan","2");
		 $("#danyRow td:first-child").remove();
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
				 initParamValue();
				 initUserDefualtZzspmValue();//用户默认需要选中的征税品目代码在提交时的校验
				 //initCacheColListDom();
				 delegateInit(); //初始化控件代理事件
				 initTableDisTagValue(); //初始化修改数据
				 break;
			  case "update":
			     initTableTitle();//初始化页面表头信息【申报所属期、纳税人识别号、纳税人每次】
				 initParamValue();
				 initUserDefualtZzspmValue();//用户默认需要选中的征税品目代码在提交时的校验
				 delegateInit();      //初始化控件代理事件			  
				 initTableDisTagValue(); //初始化修改数据
				break;
			  case "dis":
			     initTableTitle();//初始化页面表头信息【申报所属期、纳税人识别号、纳税人每次】
				 initParamValue();
				 delegateInit();      //初始化控件代理事件
				 initTableDisTagValue();//初始化修改数据
			     window.setTimeout(function(){//ie6需要稍微延迟  
					 replaceTag();       //删除输入控件<input type=
					 //replaceOptionDiv("zzs.jsp")//仅留下返回按钮 去掉 确定和重置
					 $("#optionDiv")[0].innerHTML="<a href='zzs.jsp'><img border='0' src='../image/fh.jpg'></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:showAdviceWin()\"><img border=\"0\" src=\"../images/wtzx/wtzx.jpg\"></a>";
					}, 0);

				break;
			  case "print":
			     initTableTitle();//初始化页面表头信息【申报所属期、纳税人识别号、纳税人每次】
				 initParamValue();
				 delegateInit();      //初始化控件代理事件
				 initTableDisTagValue();//初始化修改数据
				 window.setTimeout(function(){//ie6需要稍微延迟  
					 replaceTag();       //删除输入控件<input type=
					 createObjectTag(); //删除下面的确定 提交按钮,同时构建构建object标签用于浏览器提示下载ActiveX控件 同时构建打印、放大、 缩小、 打印设置、 打印预览、 另存为 、隐藏按钮
					 
					 //replaceHtmlForPrint();
					}, 1);
				break;		
	      }
	   }
 )
 

function f_sub()
{     var _falge=false;
     var yys_bqykceArray=cacheJsonDom["yys_bqykce"];
	 var zzs_bhsxseArray=cacheJsonDom["zzs_bhsxse"];
	 
	 var ygzsd_zzspm_dmArray=cacheJsonDom["ygzsd_zzspm_dm"];
	 var zzs_slArray=cacheJsonDom["zzs_sl"];
	 var yys_slArray=cacheJsonDom["yys_sl"];
	 
	 $(ygzsd_zzspm_dmArray).each(function(_index,_obj){
				if(_obj.value=="")
				{
					alert("第"+(_index+1)+"行[应税项目代码及名称]不能为空！")
					_falge=true;
					return false;
				}
				if(toRound2Val(zzs_slArray[_index].value)==0)
				{
					alert("第"+(_index+1)+"行[增值税税率或征收率(%)]不能为空！")
					_falge=true;
					return false;
				}
				if(toRound2Val(yys_slArray[_index].value)==0)
				{
					alert("第"+(_index+1)+"行[营业税税率(%)]不能为空！")
					_falge=true;
					return false;
				}				
				
		  });
		if(_falge){return;} 
	 
	 
     for(var i=0,j=yys_bqykceArray.length;i<j;i++)
	 {  
	    if((toRound2Val(yys_bqykceArray[i].value)!=0||toRound2Val(zzs_bhsxseArray[i].value))&&ygzsd_zzspm_dmArray[i].value=="")
		{
			 alert("当第"+(i+1)+"行【不含税销售额】不为零或者【本期应扣除金额】不为零时，则【应税项目代码及名称】不能为空!!");
			 return;
		} 
	 }
	 var hasData=false;
	 for(var i=0;i<ygzsd_zzspm_dmArray.length;i++)
	 {
		 if(ygzsd_zzspm_dmArray[i].value!="")
		 {
		  hasData=true;
		  break;
		 }
	 }
	 if(!hasData)
	 {
		 alert("请至少申报一条有效数据!!!");
		 return;
	 }
	
	 for(var i=0;i<ygzsd_zzspm_dmArray.length;i++)
	 {  
	    var ygzsd_zzspm_dmTamp=ygzsd_zzspm_dmArray[i];
	    $(ygzsd_zzspm_dmArray).each(function(_index,_obj){  
			if(ygzsd_zzspm_dmTamp==_obj)
			   return true;
			 if(ygzsd_zzspm_dmArray[i].value==ygzsd_zzspm_dmArray[_index].value&&zzs_slArray[i].value==zzs_slArray[_index].value&&toRound2Val(yys_slArray[i].value)==toRound2Val(yys_slArray[_index].value))  
			 {
				 _falge=true;
				 alert("第"+(i+1)+"栏和第"+(_index+1)+"栏的主征收品目代码、增值税税率、营业税税率不能同时相同!!");
				 return false;
			 }
		});
		if(_falge)
		   break;
	 }
	  if(_falge){return;} 
	  
	
	  
	 //校验用户选择的征税品目代码是否在给定的征税品目代码中
	  var userSelectZzspmTamp=[];
	  var userSelectZzspmStr="";
	 if(userDefualZzspmList.length>0)
	 {
		 for(var i=0;i<ygzsd_zzspm_dmArray.length;i++)
		 {   var isExits=false;
			 for(var j=0;j<userDefualZzspmList.length;j++)
			 {   if(i==0)
			      { userSelectZzspmStr=userSelectZzspmStr+(userDefualZzspmList[j]).ygzsd_zzspm_dm+(userDefualZzspmList[j]).ygzsd_zzspm_mc+"";
				  }
				 if(ygzsd_zzspm_dmArray[i].value==(userDefualZzspmList[j]).ygzsd_zzspm_dm)
				 {
				   isExits=true;
				   break;
				 }
			 }
			 if(!isExits)
			 {
				 userSelectZzspmTamp.push(ygzsd_zzspm_dmArray[i]);
			 }
		 }
	 }
	 var msg="";
	 if(userSelectZzspmTamp.length>0)
	{   msg="您选择的应税项目代码【"
	   for(var i=0;i<userSelectZzspmTamp.length;i++)
	   {
		   msg=msg+$(userSelectZzspmTamp[i]).find("option:selected").text()+"";
	   }
	    msg=msg+"】"+"没有在用户默认的应税项目代码【"+userSelectZzspmStr+"】中";
	}
	if(msg!=="")
	{
		if(!confirm(msg+",点‘确定’继续提交，点‘取消’返回当前操作!!"))
		   return;
	}
	/* var userDefualtZzspm=$("#userDefualtZzspm").val();
	 var notHasDefualtZzspm
	 if(userDefualtZzspm!='')
	 {
		  for(var i=0;i<ygzsd_zzspm_dmArray.length;i++)
		  {
			   if(ygzsd_zzspm_dmArray[i].value=="")
			     continue;
			   	 
		  }
	 }*/

	 
	 if(document.form1.sub.value==0)
	 {
	  document.form1.sub.value=1;
	  f_active();
	  
	  document.form1.action="sbtj_sffxcsmxb.jsp";
	  document.form1.submit();
	  }
}

function f_compare2(inputObj)
{
	 var oldvalue=inputObj.getAttribute("oldvalue") ;
	 if(!IsNumber(inputObj.value))//当前输入框输入的值
	 { alert("错误信息：请输入数字！");
	  inputObj.value=oldvalue;
	 }
	 var obj_value = inputObj.value;
	 var ce=Math.round($("[name='zzs_bhsxse']",$(inputObj).parent().parent()).val()*0.11*100)/100
	 var ce=Math.abs(ce);
	 var li_ce = Math.round((parseFloat(oldvalue)-parseFloat(obj_value))*100)/100; //当前输入的值和真正的结果进行对比
	  if(li_ce>ce||li_ce<-(ce))
      {
         alert("修改范围超过"+ce+"！");
        inputObj.value=oldvalue;
       }
	

}
