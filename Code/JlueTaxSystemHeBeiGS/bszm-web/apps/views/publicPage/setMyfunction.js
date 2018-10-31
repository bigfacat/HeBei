/**
 * Created by mjial on 2017-2-7.
 */
var commonData='';
var allFunctionsData='';
(function(){
    var customStatus = false;//点击自定义按钮状态
    //存储当前模式
    store.setSession('curMode','P');
    initPage();//页面初始化
    initXdRobot();
    //点击收起全部功能按钮
    $(".hideAll").click(function(){
        $(".allFunction").slideToggle();
        $(".hideAll").hide();
        $(".showAll").show();
    });

    //点击展开全部功能
    $(".showAll").click(function(){
        $(".allFunction").slideToggle();
        $(".showAll").hide();
        $(".hideAll").show();
    });
    //点击全部功能Tab
    $(".allTab a").each(function(i){
        $(this).click(function(){
            $(".allTab a").removeClass('active');
            $(this).addClass('active');
            var that=this;
            if(customStatus){
                $(".qbgnUlEdit").hide();
                $(".qbgnUlEdit").each(function(i){
                    if($(".qbgnUlEdit").eq(i).hasClass(that.id)) {
                        $(".qbgnUlEdit").eq(i).show().siblings().hide();
                    }
                });
            }else {
                $(".qbgnUl").hide();
                $(".qbgnUl").each(function(i){
                    if($(".qbgnUl").eq(i).hasClass(that.id)) {
                        $(".qbgnUl").eq(i).show().siblings().hide();
                    }
                });
            }
        });
    });


    //点击自定义状态的全部功能其中某一项
    $(document).on("click",".qbgnUlEdit span",function(){
        var that=$(this);
        that.toggleClass("selected");
        if($(".qbgnUlEdit span.selected").length>8){
            mini.alert("最多只能配置8个常用功能选项哦！");
            that.toggleClass("selected");
            return;
        }else if($(".qbgnUlEdit span.selected").length<1){
            mini.alert("常用功能设置不能为空哦！");
            that.toggleClass("selected");
            return;
        }
        if(that[0].className=="selected"){
            $.each(allFunctionsData.data.allFunctions, function (i, tabData) {
                $.each(tabData,function(i,data){
                    if(data.id==that.parent("li")[0].id) {
                        commonData.data.push(data);
                    }
                });
            });
            $(".cygnUlEdit").html(template('cygnUlEditHtml', commonData));
        }else {
            $.each(commonData.data, function (i, commonUlData) {
                if(commonUlData.id==that.parent("li")[0].id){
                    commonData.data.splice(i,1);
                    return false;
                }
            });
            $(".cygnUlEdit").html(template('cygnUlEditHtml', commonData));
        }
    });

    //点击自定义状态的常用功能其中某一项
    $(document).on("click",".cygnUlEdit li",function() {
        if($(".qbgnUlEdit span.selected").length==1){
            mini.alert("常用功能设置不能为空哦！");
            return;
        }
        var that = $(this);
        $.each(commonData.data, function (i, commonUlData) {
            if(commonUlData.id==that[0].id){
                commonData.data.splice(i,1);
                return false;
            }
        });
        $(".cygnUlEdit").html(template('cygnUlEditHtml', commonData));
        $(".qbgnUlEdit li").each(function () {
            if ($(this)[0].id == that[0].id) {
                $(this).find("span").removeClass("selected");
            }
        });
    });

    //点击关闭按钮
    $(document).on('click','.closeBtn',function(){
	    var xgm = false,
            btn = $(this);
	    if($(this).hasClass('xgm')){
		    xgm = true;
	    }
	    
        mini.confirm("系统将不保存您之前的操作。", "您确定关闭此页面",function (action) {
            if (action === "ok") {
                //initPage();
	            if(xgm){
	                if( btn.hasClass('hasHead') ){ //有头部导航
		                location.href = "menuXqycommonAndAllFunction.html";
                    }else{
		                location.href = "xqycommonAndAllFunction.html";
                    }
	            }else{
		            location.href = "commonAndAllFunction.aspx";
	            }
            }
        });
    });

    //保存按钮
    $(document).on('click','.saveBtn',function(){
        var xgm = false,
	        btn = $(this);
        if($(this).hasClass('xgm')){
	        xgm = true;
        }
        if(commonData.data.length>8){
            mini.alert("最多只能配置8个常用功能选项，谢谢！");
            return;
        }else if(commonData.data.length ==0){
            mini.alert("常用功能设置不能为空，谢谢！");
            return;
        }else {
            var postIds='';
            $(".qbgnUlEdit").each(function(){
                $(this).find("span").each(function(){
                    if($(this).hasClass("selected")){
                        postIds=postIds+$(this).parent("li")[0].id+',';
                    }
                });
            });
            customizedFunctions(postIds.substring(0, postIds.length - 1)).then(function (data) {
                data=mini.decode(data);
                if(data.success) {
                    if(xgm){
	                    if( btn.hasClass('hasHead') ){ //有头部导航
		                    location.href = "menuXqycommonAndAllFunction.html";
	                    }else{
		                    location.href = "xqycommonAndAllFunction.html";
	                    }
                    }else{
                        location.href = "commonAndAllFunction.aspx";
                    }
                }else {
                    if(data.message=='ajaxSessionTimeOut'){
                        window.location.reload();
                    }else {
                        mini.alert(data.message);
                    }
                }
            });
        }
    });

    function initTab(isYbsxTab){//请求常用功能数据/已办事项数据
        //请求常用功能数据
        commonFunctions().then(function (data) {
            mini.unmask();
            data=mini.decode(data);
            if (data.success) {
                commonData = data;
                store.setSession('commonFunctions', data);
                $(".cygnUlEdit").html(template('cygnUlEditHtml', data));
                initSetMyfunction(commonData);
            } else {
                if(data.message=='ajaxSessionTimeOut'){
                    window.location.reload();
                }else {
                    mini.alert(data.message);
                }
            }
        });
    }
    function initSetMyfunction(commonData){
        //获取常用功能数据并在全部功能页面中默认选中
        if(commonData) {
            $.each(commonData.data, function (i, commonUlData) {
                $(commonUlData).each(function (j, commonLiData) {
                    $(".qbgnUlEdit").each(function () {
                        $(this).find("li").each(function () {
                            if ($(this)[0].id == commonLiData.id) {
                                $(this).find("span").addClass("selected");
                            }
                        });
                    });
                })
            });
        }

        $(".cygnUlEdit").show();
        $(".promptInfo").show();
        $(".qbgnUlEdit").hide();
        $(".qbgnUlEdit").each(function(i){
            if($(".qbgnUlEdit").eq(i).hasClass($(".allTab a.active")[0].id)) {
                $(".qbgnUlEdit").eq(i).show().siblings().hide();
            }
        });
        $(".allFunction").show();
        $(".allFunctionBtn").hide();
        $(".bottomBtn").show();
        customStatus=true;
    }
    function initPage(){
        mini.mask("loading...");
        //请求常用功能数据
        initTab();
        //请求全部功能数据
        if(store.hasSession('allFunctions')){
            allFunctionsData=store.getSession('allFunctions');
            $(".qbgnDiv").html(template('qbgnUlHtml',allFunctionsData));
        }else {
            allFunctions().then(function (data) {
                data=mini.decode(data);
                if(data.success) {
                    allFunctionsData=data;
                    store.setSession('allFunctions', data);
                    $(".qbgnDiv").html(template('qbgnUlHtml', data));
                }else {
                    if(data.message=='ajaxSessionTimeOut'){
                        window.location.reload();
                    }else {
                        mini.alert(data.message);
                    }
                }
            });
        }
    }

    setOnlineSupportAnchor('zdycygn');//在线帮助
})();