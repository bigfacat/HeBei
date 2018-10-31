var fydjService = {
		mock : false
}
$.extend(fydjService,{
	Api: function(){
		if(fydjService.mock){// 假数据
			return{
				tj:'/api/dj/fydj/submit/fydj'
			}
		}else{//　真是接口
				return function(){
					var basrUrl = '../../..',
					real={
						tj:'/api/dj/fydj/submit/fydj'	
					};
				for(var u in real){
					real[u] = basrUrl + real[u];
				}
				return real
				}();
		}
	}(),
	tj: function (params, successCallback, errCallback) {
	    var url = fydjService.Api.tj;
	    //ajax.post(url, params, successCallback, errCallback)
	    wssqUtil.tjsq(url, params, successCallback, errCallback);
	}
});