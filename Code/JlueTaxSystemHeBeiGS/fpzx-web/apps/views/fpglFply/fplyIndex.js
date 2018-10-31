/**
 * Created by yuepu on 2017/3/11.
 */
var fply ={};
fply.flag = false;
fply.pzhdxxIsNull = false;
fply.pzhdxx = [];
/**flag用于请求错误反馈的标志*/
var flag = true;
stepNav.wizard = $('#fply-wizard'); // 指定容器
//是否已经进行过票种核定，存在票种核定则直接发票领用
function init(){
	fplyService.isExistPzhd().then(function(data) {
	    if(data.success){
	        //已存在票种核定
	        if (data.value =="true") {
	            fply.flag = true;
	        }else{
	            /*value为false的时候：表示没有票种核定，提示进行票种核定*/
	            fply.flag = false;
	        }
	    }else{
	        mini.alert(data.message,'提示',function(){
	            wssqUtil.closeWin();
	        });
	        flag = false;
	    }
	}, function(err) {
	    mini.alert(err.message,'提示',function(){
	            wssqUtil.closeWin();
	    });
	    flag = false;
	});
	if(!flag){
		return;
	}
	/*获取票种核定信息*/
	fplyService.getPzhdxx("", function(data) {
	    if (data.success) {
	        fply.pzhdxx = data.value;
	        if(fply.pzhdxx){
	            fply.pzhdxxIsNull = true;
	        }
	    } else {
	        mini.alert(data.message,'提示',function(){
	            wssqUtil.closeWin();
	    	});
	        flag = false;
	//      return;
	    }
	});
	if(!flag){
		return;
	}
	if(fply.flag && fply.pzhdxxIsNull){
	    location.href = 'fply.aspx?code=110209&id=11';
	}else{
	    wssqUtil.showPrePage("由于您没进行过票种核定，发票领用前需先进行","票种核定",
	        "/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?code=110207&id=58");
	}
}
init();