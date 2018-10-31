mini.parse();
var form = new mini.Form("form1");
var jmzcmc,jmxzdl,jmxzxl,jmyhData;
var jmzcId,jmxzdlId,jmxzxlId,jmzlxDm,jmzlxMc;
var jmzcData;
/**
 * addRow此处重写
 * */
var jmlxData = mini.get("jmlx").getData();
xfs.addRow = function (grid_id,win) {
	if(mini.get("ssyhsx").getValue()==""){
		mini.alert("请先选择税收优惠事项")
		return;
	}
	var url="../../../api/baseCode/CombSelect/common?codeName=SSJMXZ&filterVal="+mini.get("ssyhsx").getValue();
	ajax.get(url,"",function(data){
		jmzcData = data;
		mini.get('jmzcmc').setData(jmzcData);
	},function(){
		mini.alert("请求异常，稍后再试！",'提示',function () {
			wssqUtil.closeWin();
		});
	})
	var firstDay = date.getFirstDateOfMonth();
	var grid = mini.get(grid_id);
	// 如果是参数含有html，则使用 mini.open
	try{
		var form = new mini.Form('#'+win);
		form.clear()
		$(".mini-textbox-input").eq(11).val("");
		$(".mini-textbox-input").eq(12).val("");
		mini.get('jmqxq').setValue(firstDay);
		/*for(var n in resultData){
			if(resultData[n].SWSX_DM==mini.get("ssyhsx").getValue()){
				$(".mini-textbox-input").eq(4).val(resultData[n].SSJMXZMC);
				jmzcmc=resultData[n].SSJMXZMC;


				jmyhData=resultData[n];
				break;
			}
		}*/
	}catch (e){
		// TODO
	}
	mini.get(win).show();
};
/**
 * 获取大类小类
 *
 * */
xfs.getDlXl = function (e) {
	jmzcId=mini.get('jmzcmc').getValue();
	if(mini.get('jmzcmc').getValue()!=""){
		var filterVal = mini.get('jmzcmc').getValue() + mini.get("ssyhsx").getValue();
		var url1="../../../api/baseCode/CombSelect/common?codeName=SSJMXZDL&filterVal="+filterVal,
			url2="../../../api/baseCode/CombSelect/common?codeName=SSJMXZXL&filterVal="+filterVal,
			url3="../../../api/baseCode/CombSelect/common?codeName=DM_GY_XFSJMZLX&filterVal="+mini.get('jmzcmc').getValue();
		/*获取大类*/
		ajax.get(url1,"",function(data){
			var resultData = data;
			$(".mini-textbox-input").eq(11).val(resultData[0].MC);
			jmxzdl=resultData[0].MC;
			jmxzdlId=resultData[0].ID;
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
		/*获取小类*/
		ajax.get(url2,"",function(data){
			var resultData = data;
			$(".mini-textbox-input").eq(12).val(resultData[0].MC);
			jmxzxl=resultData[0].MC;
			jmxzxlId=resultData[0].ID;
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
		/*获取减免征*/
		ajax.get(url3,"",function(data){
			var resultData = data;
			jmzlxDm = resultData[0].ID;
			if(jmzlxDm == 02){
				jmzlxMc="免征";
			}else if(jmzlxDm == 01){
				jmzlxMc="减征";
			}
			$(".mini-textbox-input").eq(13).val(jmzlxMc);
		},function(){
			mini.alert("请求异常，稍后再试！",'提示',function () {
				wssqUtil.closeWin();
			});
		})
	}

}
function SaveData() {
    var newRow = form.getData();
    newRow.jmzcId=jmzcId;
    newRow.jmxzdl=jmxzdl;
    newRow.jmxzxl=jmxzxl;
    newRow.jmyh=jmyhData;
	newRow.ssjmxzxlDm=jmxzxlId;
	newRow.ssjmxzdlDm=jmxzdlId;
	newRow.jmzlxDm = jmzlxDm;
	newRow.jmzlxMc = jmzlxMc;
	for(var n in jmzcData){
		if(newRow.jmzcId==jmzcData[n].ID){
			newRow.jmzcmc=jmzcData[n].MC;
		}
	}
    for(var n in jmlxData){
        if(newRow.jmlx==jmlxData[n].ID){
            newRow.jmlxDm=newRow.jmlx;
            newRow.jmlx=jmlxData[n].MC;
        }
    }
    form.validate();
    if (form.isValid() == false) return;
/*    var htyxqq = new Date(o.htyxqq);
    var newhtyxqq = htyxqq.toJSON().substring(0,10);//"2009-10-09"
    o.htyxqq = newhtyxqq;
    var htyxqz = new Date(o.htyxqz);
    var newhtyxqz = htyxqz.toJSON().substring(0,10);//"2009-10-09"
    o.htyxqz = newhtyxqz;
    var newRow = o;*/
    var grid = mini.get('xfs_grid');
    grid.addRow(newRow,  grid.getData().length);
}
////////////////////
//标准方法接口定义
function SetData(data) {
    if (data.action == "edit") {
        //跨页面传递的数据对象，克隆后才可以安全使用
        data = mini.clone(data);


    }
}
/*function CloseWindow(action) {
 if (action == "close" && form.isChanged()) {
 if (confirm("数据被修改了，是否先保存？")) {
 return false;
 }
 }
 if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
 else window.close();
 }*/
function onOk(e) {
	var formObj = new mini.Form("#form1");
	var newRow = formObj.getData();
	formObj.validate();
	if (!formObj.isValid()) {
		return;
	}else if(newRow.jmlx == 1&& !newRow.jzsl){
		mini.alert("减免类型为税率式减免，减征税率虚大于0")
		return;
	}else if(newRow.jmlx == 2 && !newRow.jzed){
		mini.alert("减免类型为税额式减免，减征额度必录")
		return;
	}else if(newRow.jmlx == 3 && !newRow.jzfd){
		mini.alert("减免类型为税基式减免，减征幅度必录")
		return;
	}else{
		SaveData();
		mini.get('win1').hide();
		form.reset();
	}
    //wcjyhdkj.oncellendedit();
}
function onCancel(e) {
    //CloseWindow("cancel");
    mini.get('win1').hide();
    form.reset();
}


