function toRound4Obj(obj){
		   obj.value=Math.round(obj.value*10000)/10000;
		}	

		
/**
当checkbox有值时对下面的值进行默认深圳
**/	
function initCheckSelectDefualt(){
       if(this.id=="ybnsr_bz_y")
		{   if($("[id='yzl_1']")=="")
			{
			  $("[id='yzl_1']").get(0).value="2";//第一栏‘预征率’默认设置成2
			}else
			{
				if($("[id='yzl_1']").get(0).value!="2")
				{
					if(confirm("提示为：当“是否适用一般计税方法”栏，勾选“是”时，【建筑服务】栏应选择2%，是否自动选择？"))
					{   
						$("[id='yzl_1']").get(0).value="2";//第一栏‘预征率’默认设置成2
						
					}
				}
			 }
			if($("[id='yzl_3']")=="")
			{
			  $("[id='yzl_3']").get(0).value="3";//第三栏‘预征率’默认设置成3
			}else
			{
				if($("[id='yzl_3']").get(0).value!=="3")
				{
					if(confirm("提示为：当“是否适用一般计税方法”栏，勾选“是”时，【出租不动产】栏应选择3%，是否自动选择？"))
					{
						$("[id='yzl_3']").get(0).value="3";//第三栏‘预征率’默认设置成2
						
					}
				}
			}
			
		 }
		if(this.id=="ybnsr_bz_n")
		{ if($("[id='yzl_1']")=="")
			{
			  $("[id='yzl_1']").get(0).value="3";//第一栏‘预征率’默认设置成2
			}else
			{
				if($("[id='yzl_1']").get(0).value!="3")
				{
					if(confirm("提示为：当“是否适用一般计税方法”栏，勾选“否”时，【建筑服务】栏应选择3%，是否自动选择？"))
					{
						$("[id='yzl_1']").get(0).value="3";//第一栏‘预征率’默认设置成2
						
					}
				}
			}
			if($("[id='yzl_3']")=="")
			{
			  $("[id='yzl_3']").get(0).value="5";//第三栏‘预征率’默认设置成2
			}else
			{
				if($("[id='yzl_3']").get(0).value!=="5")
				{
					if(confirm("提示为：当“是否适用一般计税方法”栏，勾选“否”时，【出租不动产】栏不应选择3%，是否清除选择？"))
					{
						$("[id='yzl_3']").get(0).value="0";//第三栏‘预征率’默认设置成2
						
					}
				}
			}
		 }
		 $("#yzl_1").trigger("change");
		 $("#yzl_2").trigger("change");
		 $("#yzl_3").trigger("change");
	
	}
/**
*/
function initCheckSelectDefualtNull(){
	$("[name='xse'],[name='kcje'],[name='yzse']").each(function(){$(this).val("0")});
	$("[name='yzl']").each(function(){$(this).val("")});
}
/************初始化页面“代理事件}****************/
function delegateInit(){
	   /******代理页面input添加元素事件*****/
		$("#tabList").on("blur",":input[type='text'][disabled!='true']",function(event){ 
				var validateType=$(this).attr('validateType');
				if(typeof(validateType)!="undefined")
				{   var validateParamJson = jQuery.parseJSON(validateType);
					var flage= validate(this,validateParamJson);
					var _type=validateParamJson.type
					if(_type!="string"||_type!="dateA"||_type!="dateB"||_type!="dateC"||_type!="dateC")
					{
						checkall(this);
					}
				}
		 });
		$("#tabList").on("change","select",function(event){
					checkall(this);
		 });
	   /******代理页面checkobx添加元素事件*****/
		$("#tabList").on('click',':checkbox',function(event){ 
               
				    if(getObj("ybnsr_bz_y").checked&&this.id=="ybnsr_bz_n")
					{
					    getObj("ybnsr_bz_y").checked=false;
						getObj("ybnsr_bz_n").checked=true;
						$("#ybnsr_bz").val(getObj("ybnsr_bz_n").value);
					}else if(getObj("ybnsr_bz_n").checked&&this.id=="ybnsr_bz_y")
					{
					    getObj("ybnsr_bz_n").checked=false;
						getObj("ybnsr_bz_y").checked=true;
						$("#ybnsr_bz").val(getObj("ybnsr_bz_y").value);
					}else
					{
						$("#ybnsr_bz").val(this.checked?this.value:"");
					}
				   if($("#ybnsr_bz").val()=="")
					{
						$("#ybnsr_bz").val("");
						initCheckSelectDefualtNull.call(this);
					}
					if($("#ybnsr_bz").val()!="")
					{   initCheckSelectDefualt.call(this);
						
					}

		 });				
	   /******代理页面checkobx添加元素事件*****/
		$("#tabList").on('focus',":input[name*='xse'],:input[name*='kcje'],:input[name*='yzl'],:input[name*='yzse'],select",function(event){ //blur();								 
             if($("#ybnsr_bz").val()=="")
		     {   
			      this.blur();
				  alert("请先选择‘是否适用一般计税方法’！！");
				  return;
			 }
			 var _name=this.name;
			 var indexID=((this.id).split("_"))[1];
			 var titleInfo=["","建筑服务","销售不动产","出租不动产"];
			 if(_name.indexOf("xse")!=-1||_name.indexOf("kcje")!=-1)
			 {
				 if($("#yzl_"+indexID).val()=="0")
				 {
					 //this.blur();
				     //alert("请先选择‘"+titleInfo[parseInt(indexID)]+"’的预征率！！");
					 //return;
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
						$("#xmbh").val(data.xmbh);
						$("#xmmc").val(data.xmmc);
						$("#xmdz").val(data.xmdz);
                        if(data.ybnsr_bz=="Y")
						{
						   getObj("ybnsr_bz_y").checked=true;
						}
						if(data.ybnsr_bz=="N")
						{
						   getObj("ybnsr_bz_n").checked=true;
						}
						$("#ybnsr_bz").val(data.ybnsr_bz);
						
						var yzxmDm = ["101017100","101017700","101016600","999999999"];
						
						var yzxmExists = false;
						var hcInit = 7;
						var hcValue = 0;
						for(var i =0 ;i<yzxmDm.length;i++){
							for(var j=0;j<rows.length;j++){
								if(yzxmDm[i]==rows[j].yzxm_dm){
									yzxmExists = true;
								}
							}
							
							var hc = i+hcInit;
							if(!yzxmExists){
								$("#tabList tr:nth-child("+hc+")").remove();
								hcInit=hcInit-1;
							}else{
								hcValue = hcValue+1;
								$("#tabList tr:nth-child("+hc+") td:nth-child(2)").text(hcValue);
							}
							
							yzxmExists = false;
						}
						
					
						$(rows).each(function(_index,_row){
							  for(_key in _row)
								{  
									var _keyArrayOne=['xse','kcje','yzl','yzse'];
									if(jQuery.inArray(_key, _keyArrayOne)!=-1)  
									{
										($("[name='"+_key+"']").get(_index)).value=_row[_key]
									}
								} 
							}
						)

					}else{
						alert("没有取到申报数据！！")
					}
	   };
}
/************初始化页面“数据初始化”****************/
function initTableTagValue(){
	 var _jspLogic=$('#logic').val();
	 if(_jspLogic=="dis"||_jspLogic=="print")//将checkbox灰掉
	 {
		 $("#ybnsr_bz_y").attr("disabled","true");
		 $("#ybnsr_bz_n").attr("disabled","true");
	 }
	var json={proceduresName:'ZWB_MULTI_GET_SBB_CX',//增值税预缴税款表
				paramLength:'3',
				param1:$('#pzxh').val(),
				param2:"182",
				param3:"01",
				withColName:"true"}	
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
							 if(this.tagName.toUpperCase()=="SELECT")				
							 { textValue=$(this).find("option:selected").text();}
							 else{textValue=$(this).val();}
							  textValue=textValue.replace(/(^\s*)|(\s*$)/g, "");
							  textValue=""==textValue?"  ":textValue;
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
	//ajaxReq();
	 var nsrmcStr=$("#nsrmc").val();
	 var sssqqStr=$("#sssqq").val();
	 var sssqzStr=$("#sssqz").val();
	 var nsrsbhStr=$("#nsrsbh").val();
	 var sssqStr="税款所属期间:"+sssqqStr.substring(0,4)+"年"+sssqqStr.substring(5,7)+"月"+sssqqStr.substring(8,10)+"日"+" 至 "+sssqzStr.substring(0,4)+"年"+sssqzStr.substring(5,7)+"月"+sssqzStr.substring(8,10)+"日";
	 $("#title_sssq").text(sssqStr)
	 $("#title_nsrsbh").text(nsrsbhStr)
	 $("#title_nsrmc").text(nsrmcStr)
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
				 replaceOptionDiv("zzsyjsk.jsp")//仅留下返回按钮 去掉 确定和重置
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
          var ybnsr_bz=$("#ybnsr_bz").val();
		  var indexID=((obj.id).split("_"))[1];
		  if(obj.name!="yzse")//最后项计算完允许修改值 不触发自动计算
		  {
			  if(ybnsr_bz=="Y")
			  { 
				   switch(indexID)
				   {
					   case "1" :
						  $v2("yzse_1").value=($v("xse_1")-$v("kcje_1"))/1.11*$v("yzl_1")/100;//第一行
						  toRound2Obj($v2("yzse_1"));
						  break;
					   case "2" :
						  $v2("yzse_2").value=($v("xse_2")-$v("kcje_2"))/1.11*$v("yzl_2")/100;//第二行
						  toRound2Obj($v2("yzse_2"));	
						  break;
					   case "3" :
						 $v2("yzse_3").value=$v("xse_3")/1.11*$v("yzl_3")/100;//第三行
						 toRound2Obj($v2("yzse_3"));
						 break
				   } 				 
			  }
			  if(ybnsr_bz=="N")
			  {    switch(indexID)
				   {
					  case "1": 
						$v2("yzse_1").value=($v("xse_1")-$v("kcje_1"))/1.03*$v("yzl_1")/100;//第一行
						toRound2Obj($v2("yzse_1"));	
						break;
					 case "2" : 
						$v2("yzse_2").value=($v("xse_2")-$v("kcje_2"))/1.05*$v("yzl_2")/100;//第二行
						toRound2Obj($v2("yzse_2"));	
						break;
					 case "3" :
					   $v2("yzse_3").value=$v("xse_3")/1.05*$v("yzl_3")/100;//第三行
					   toRound2Obj($v2("yzse_3"));
					   break;
				   }
			  }
		  }
		  
		  $v2("xse_hj").value=$v("xse_1")+$v("xse_2")+$v("xse_3")
		  toRound2Obj($v2("xse_hj"));	

		  $v2("yzse_hj").value=$v("yzse_1")+$v("yzse_2")+$v("yzse_3")
		  toRound2Obj($v2("yzse_hj"));	
		  
		  $v2("kcje_hj").value=$v("kcje_1")+$v("kcje_2")+$v("kcje_3")
		  toRound2Obj($v2("kcje_hj"));			  
	   }
	   

function f_sub()
{	 var ybnsr_bz=$("#ybnsr_bz").val()
     if(getObj("ybnsr_bz_y").checked==false&&getObj("ybnsr_bz_n").checked==false)
	 {
		 alert("请先选择‘是否适用一般计税方法’选项！");
		 SetFocus($("#ybnsr_bz_y").get(0));
		 return;
	 }
     if(($v("yzse_1")!=0||$v("xse_1"))&&$("#xmbh").val()=="")
	 {
		 alert("建筑服务有值时项目编号不能为空！");
		 SetFocus($("#xmbh").get(0));
		 return;
	 }
	 if(($v("yzse_1")!=0||$v("xse_1"))&&$("#xmmc").val()=="")
	 {
		 alert("建筑服务有值时项目名称不能为空！！");
		 SetFocus($("#xmmc").get(0));
		 return;
	 }
	 if($("#xmdz").val()=="")
	 {
		 alert("项目地址不能为空！！");
		 SetFocus($("#xmdz").get(0));
		 return;
	 }
	 var validateFlage=true;
	 var titleInfo=["建筑服务","销售不动产","出租不动产"];
	 var xseList=$("[name='xse']");
	 var yzseList=$("[name='yzse']");
	 var kcjeList=$("[name='kcje']");
	 var yzlList=$("[name='yzl']");
	 $(xseList).each(function(_index,obj){ 
							  if(toRound2Val(obj.value)<0){
								  validateFlage=false;
								  alert("["+titleInfo[_index]+"]的销售额不能小于0！");
								  SetFocus(obj);
								  return false;
								  }
								});
	 if(!validateFlage) return;
	 $(yzseList).each(function(_index,obj){ 
							  if(toRound2Val(obj.value)<0){
								  validateFlage=false;
								  alert("["+titleInfo[_index]+"]的预征税额不能小于0！");
								  SetFocus(obj);
								  return false;
								  }
								});
	 if(!validateFlage) return;	
	 
	 $(kcjeList).each(function(_index,obj){ 
							  if(toRound2Val(obj.value)>toRound2Val((xseList.get(_index)).value)){
								  validateFlage=false;
								  alert("["+titleInfo[_index]+"]的销售额["+toRound2Val((xseList.get(_index)).value)+"]必须大于等于扣除金额["+toRound2Val(obj.value)+"]！");
								  SetFocus(obj);
								  return false;
								  }
								});
	 if(!validateFlage) return;	

	 if(ybnsr_bz=="Y")  
	 {
		 var yzse_tamp=Math.round((($v("xse_1")-$v("kcje_1"))/1.11*$v("yzl_1")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_1"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“是”时，[建筑服务]栏次“预征税额["+$v("yzse_1")+"]”不等于 （第1栏次“销售额”- 第1栏次“扣除金额”）÷(1+11%)×第1栏次“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }
		  yzse_tamp=Math.round((($v("xse_2")-$v("kcje_2"))/1.11*$v("yzl_2")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_2"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“是”时，[销售不动产]栏次“预征税额["+$v("yzse_2")+"]”不等于 （第2栏次“销售额”- 第2栏次“扣除金额”）÷(1+11%)×第2栏次“预征率“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }		 
		  yzse_tamp=Math.round(($v("xse_3")/1.11*$v("yzl_3")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_3"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“是”时，[出租不动产]栏次“预征税额["+$v("yzse_3")+"]”不等于 第3栏次“销售额”÷(1+11%)×第3栏次“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }			  
	 }	 
	 if(ybnsr_bz=="N")  
	 {
		 var yzse_tamp=Math.round((($v("xse_1")-$v("kcje_1"))/1.03*$v("yzl_1")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_1"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“否”时，[建筑服务]栏次“预征税额["+$v("yzse_1")+"]”不等于 （第1栏次“销售额”- 第1栏次“扣除金额”）÷(1+3%)×第1栏次“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }
		  yzse_tamp=Math.round((($v("xse_2")-$v("kcje_2"))/1.05*$v("yzl_2")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_2"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“否”时，[销售不动产]栏次“预征税额["+$v("yzse_2")+"]”不等于 （第2栏次“销售额”- 第2栏次“扣除金额”）÷(1+5%)×第2栏次“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }		 
		  yzse_tamp=Math.round(($v("xse_3")/1.05*$v("yzl_3")/100)*100)/100
		 if(yzse_tamp!=$v("yzse_3"))
		 {
			 var r=confirm("当“是否适用一般计税方法”栏，勾选“否”时，[出租不动产]栏次“预征税额["+$v("yzse_3")+"]”不等于 第3栏次“销售额”÷(1+5%)×第3栏次“预征率”["+yzse_tamp+"]，是否继续提交？！\n点“确定”继续提交，点“取消”返回当前操作！！");
		     if(!r){return;}
		 }			  
	 }
	 
	 var xseList=$("[name='xse']");
	 var yzseList=$("[name='yzse']");
	 var kcjeList=$("[name='kcje']");
	 var yzlList=$("[name='yzl']");
	  $(yzseList).each(
					function(_index,_input)  
					 {    if(_index==3)
					        return false;
						 if(toRound2Val(_input.value)==0&&((toRound2Val((xseList[_index]).value)!=0)||(toRound2Val((kcjeList[_index]).value)!=0)))
						 {
							var r=confirm("第"+(_index+1)+"行第4列等于0，第1列、第2列不等于0，是否继续提交？\n点“确定”继续提交，点“取消”返回当前操作！！");
		                    if(!r){validateFlage=false;return false;} 
						 }
						 
					 }
				 )
	  if(!validateFlage) return;	
	 
	 
	 if(document.form1.sub.value==0)
	 {
	  document.form1.sub.value=1;
	  f_active();
	  
	  document.form1.action="sbtj_zzsyjsk.jsp";
	  document.form1.submit();
	  }
}
