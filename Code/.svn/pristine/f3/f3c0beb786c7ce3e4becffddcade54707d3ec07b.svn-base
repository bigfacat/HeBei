/**
 * 扫码上传结果
 */
var result;
var TRY_TIMES = 6;

(function(){
	result = null;
    var qrImg = "../../../../api/mobile/qrcode/upload/generation?_="+(new Date().getTime());
	$("#qrImg").attr("src",qrImg);
	queryRes(0);
})();

function queryRes(trytime){
	ajax.asyncGet("../../../../api/mobile/qrcode/upload/status?_="+(new Date().getTime()),"",function(res){
		if(!res.success){
			//返回失败，如果是非查询超时，则提示异常
			if(!(res.messageCode==='TIME-OUT')){
				mini.alert(res.message,"提示",function(){
					closeWin('close');
					return;
				});
			}
			if(trytime<TRY_TIMES){
				trytime++;
				 queryRes(trytime);
				 return;
			}else{
				mini.alert(res.message,"提示",function(){
					closeWin('close');
					return;
				});
			}
	     }
		if(trytime<TRY_TIMES){
			 result  =  res.data;
			 if(!!result){
					closeWin('ok');
			}
			 return;
		}
    });
}

function getResult(){
	return result;
}

function closeWin(action){
	if(!action){
		action = 'close';
	}
	try{
		if (window.CloseOwnerWindow) {
			return window.CloseOwnerWindow(action);
		}
		else {
			window.close();
		}
	}catch (e){
		console.log(e);
	}
	
}