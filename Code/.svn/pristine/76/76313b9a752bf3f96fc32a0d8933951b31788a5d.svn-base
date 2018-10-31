(function(){
    result = {"data":[]};
    var _val = location.search.match(/value=(\S*)/)[1];
    $('#search-contain input').val( decodeURI(_val));
    $("#search-button").on('click',function(){
        var val = $('#search-contain input').val();
        var item = allFunctionsData.data.allFunctions;
        for(var i in item){
            for(var j=0;j<item[i].length;j++){
                if(item[i][j].name.match(val)){
                    result.data.push(item[i][j]);
                }
            }
        }
        $("#searchContent-body").html(template('search-result', result));
        result = {"data":[]};
    })
    
    $("#search-contain input").on("keydown",function(event){
        event = event?event:window.event;
        if(event.keyCode == 13){
            $("#search-button").click();
        }
    });
	
    if(store.hasSession('allFunctions')){
        allFunctionsData=store.getSession('allFunctions');
        addType(allFunctionsData);
    }else {
        allFunctions().then(function (data) {
            if(data.success) {
                data=mini.decode(data);
                allFunctionsData=data;
                addType(allFunctionsData);
                store.setSession('allFunctions', data);
            }else {
                if(data.message=='ajaxSessionTimeOut'){
                    window.location.reload();
                }else {
                    mini.alert(data.message);
                }
            }
        });
    }
    function addType(value){
        if("undefined"!=typeof(value.data.allFunctions.yhrd)){
            for(var i=0;i<value.data.allFunctions.yhrd.length;i++){
                value.data.allFunctions.yhrd[i].typeName = '优惠/认定';
            }
        }
        if("undefined"!=typeof(value.data.allFunctions.wyyy)){
            //console.log(value.data.allFunctions.wyyy);
            for(var i=0;i<value.data.allFunctions.wyyy.length;i++){
                value.data.allFunctions.wyyy[i].typeName = '我要预约';
            }
        }
        if("undefined"!=typeof(value.data.allFunctions.dj)){
            for(var i=0;i<value.data.allFunctions.dj.length;i++){
                value.data.allFunctions.dj[i].typeName = '登记';
            }
        }
        if("undefined"!=typeof(value.data.allFunctions.fp)){
            for(var i=0;i<value.data.allFunctions.fp.length;i++){
                value.data.allFunctions.fp[i].typeName = '发票';
            }
        }
        if("undefined"!=typeof(value.data.allFunctions.sb)){
            for(var i=0;i<value.data.allFunctions.sb.length;i++){
                value.data.allFunctions.sb[i].typeName = '申报';
            }
        }
        if("undefined"!=typeof(value.data.allFunctions.qt)){
            for(var i=0;i<value.data.allFunctions.qt.length;i++){
                value.data.allFunctions.qt[i].typeName = '其他';
            }
        }
        $("#search-button").click();
    }
 
   
  
  
})();