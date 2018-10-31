/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/18
 * Time：17:59
 *
 */
var sqzl={};
sqzl.blzt = window.parent.blzt;
sqzl.content = $('#sqzl-content');
sqzl.actions = $('#actions');
sqzl.testData ={};
var requestFbzllistdata;
sqzl.actions.delegate('#ok-btn','click',function () {
    if (window.CloseOwnerWindow) {
        return window.CloseOwnerWindow('close');
    }
    else {
        window.close();
    }
});
//提交补正资料
sqzl.actions.delegate('#bzzlok-btn','click',function (action) {
    var url ='/wszx-web/api/base/submit/bzzl',sqxh = window.parent.blzt.sqxh,swsxDm = window.parent.blzt.swsxDm;
    var flag;
    if(store.hasSession('requestFbzllistdata')){
        requestFbzllistdata = store.getSession('requestFbzllistdata');
        $.map(requestFbzllistdata,function(item,index){
        if(JSON.stringify(requestFbzllistdata[index].bsmxlist) !== JSON.stringify(fbzldata[index].bsmxlist)){
            flag = false;

        }
    })
    }
    if(flag !== false){
       mini.alert('请上传补正资料');
            return;
    }
    //判断是否上传了必报的附报资料
     if(!isCondition()){
            return;
        }
    var postFbzllist = {
        sqxh: sqxh,
        swsxDm: swsxDm,
        fbzlList: mini.encode(fbzldata)
    };

        ajax.post(url,mini.encode(postFbzllist),function(res){
            if(res.success){
                mini.alert('您的补正资料提交成功！','提示',function(){
                     if (window.CloseOwnerWindow) {
                        return window.CloseOwnerWindow('close');
                        }
                    else
                        window.close();
                    });
            }else{
                mini.alert(res.message);
            }
        })
});
sqzl.setViewData=function(viewData) {
	sqzl.testData=viewData;
	if (!viewData || $.isEmptyObject(viewData)) {
        mini.alert('未获取到申请资料数据', '提示', function () {
            $('#ok-btn').click();
        });
        return false;
    } else {
        sqzl.content.show();
        sqzl.actions.show();
    }

    var elements = document.querySelectorAll("[data-view-type]"),
        targetId = null,
        targetType = null,
        data = {};
    for(var i=0,len =elements.length;i<len;i++ ){
        targetId = elements[i].getAttribute("id");
        targetType = elements[i].getAttribute("data-view-type");
        if(!!targetType){
            targetType = targetType.toLowerCase();
            if(targetType==="form"){
                var form = new mini.Form("#"+targetId);
                data[targetId] = form.setData(viewData[targetId]);
                form.setEnabled(false);

            } else if(targetType==="datagrid"){
                targetId =  elements[i].children[0].getAttribute("id")||$(elements[i]).children(0)._id();
                if(!targetId){
                    throwError("data-view-type=datagrid 第一个子节点的id未获取到，请检查第一个子节点！");
                    return false;
                }
                var grid = mini.get(targetId);
                data[targetId] = grid.setData(viewData[targetId]);
                grid.setEnabled(false);
            }
        }
    }
};
sqzl.initPage = function (ylUrl,data,cssUrl) {
    var ylTemplate='';

    if(!!ylUrl){
        ylTemplate = wssqUtil.loadTemplate(ylUrl).replace(/url/g,'data-url');
        sqzl.content.html(ylTemplate);
    }else{
        mini.alert('加载预览页面失败', '提示', function () {
            $('#ok-btn').click();
        });
        return false;
    }
    if(!!data && !!data['fbzl-yl-grid'] ){
        fbzlCkUrl = '../fbzl/Fbzlck.aspx';
        //fbzldata = data['fbzl-yl-grid'];
    }
    if(!!cssUrl){
        wssqUtil.loadCss(cssUrl);
    }

    var sqxh = window.parent.blzt.sqxh;

    $.ajax({
        url: "/wszx-web/api/query/fbzllist/"+sqxh+".ashx",
        type: 'post',
        async: false,
        data: mini.encode(data),
        success: function(res){
            if(res.success){
                //初始化上传数量为0
                fbzldata = res.value;
				for(var i=0;i<fbzldata.length;i++){
					fbzldata[i].scCount = fbzldata[i].bsmxlist.length;
					fbzldata[i].swsxDm = window.parent.blzt.swsxDm;
				}
            }else{
                mini.alert(res.message);
            }
        },
        error: function(error) {

        }
    });
    if(!!data){
        data['fbzl-yl-grid'] = fbzldata;
    }

    //sqzl.setViewData(data);

    mini.parse();
    // 执行个性化操作
    sqzl.customOptions(data);

    !!ylTemplate && sqzl.setViewData(data);
};

//初始化补正资料
sqzl.initbzzlPage = function (url,data) {
     /*是否上传过补正资料*/
    $.ajax({
        url:"/wszx-web/api/base/bzzl/check/" + Tools.getUrlParamByName('sqxh'),
        type: 'post',
        async: false,
        success: function(res){
            if(res.success && res.value==false){
                mini.alert('您的补正资料已提交成功，请耐心等待审核。','提示信息',function(){
                    window.close();
                })
            }
        }
    })
    var html = wssqUtil.loadTemplate(url).replace(/url/g,'data-url');
    html = html.replace(/ylonRenderOpearte/g,'onRenderOpearte');
    $('#bzzl-content').html(html);
	if(sqzl.blzt.swsxDm == '110212'){  //加载css
		wssqUtil.loadCss('/fpzx-web/apps/views/fpglNewDkzy/newZYDK.css');
	}
    mini.parse();
    var sqxh = window.parent.blzt.sqxh;

    //var fbzlGrid = mini.get("fbzl-yl-grid");
    /*-------修改开始--------*/
    $.ajax({
        url: "/wszx-web/api/query/fbzllist/"+sqxh+".ashx",
        type: 'post',
        async: false,
        data: mini.encode(data),
        success: function(res){
            if(res.success){
                store.setSession('requestFbzllistdata',res.value);
                //初始化上传数量为0
                fbzldata = res.value;

				for(var i=0;i<fbzldata.length;i++){
					fbzldata[i].scCount = fbzldata[i].bsmxlist.length;
					fbzldata[i].swsxDm = window.parent.blzt.swsxDm;
				}
            }else{
                mini.alert(res.message);
            }
        },
        error: function(error) {

        }
    });
    /*-------修改结束-------*/
    if(!data){
	    data = {};
    }
	data['fbzl-yl-grid'] = fbzldata;
    sqzl.setViewData(data);
    //fbzlGrid.setData(fbzldata);
    if(!!data && !!data['fbzl-yl-grid'] ){
        fbzlCkUrl = '../fbzl/Fbzlck.aspx';
        //fbzldata = data['fbzl-yl-grid'];
    }
};
// 个性化操作都写在这个方法里面，根据税务事项代码区分
sqzl.customOptions=function (data) {
	// 个体工商户定额核定
	if(sqzl.blzt.swsxDm=='110123'){
		var Tab = mini.get('tabsYlForm');
		var tabs = Tab.tabs;
		for (var i=0;i<tabs.length;i++){
			var dataName = tabs[i].name+'ViewForm';
			if(!data.hasOwnProperty(dataName)){
				Tab.removeTab(tabs[i].name);
				i--;
			}
		}
	}
	//无人厅-税务登记信息补录（个体）
	var glywData=mini.clone(mini.decode(data.glywData).sfzrdxxList);
	if(sqzl.blzt.swsxDm == '11012101'){
		var tab1 = mini.get("tabsDjxxbl");
		var tab = tab1.getTab(3);
		if (tab) {
			tab1.updateTab(tab, {visible: true});
		}
		//mini.get('glyw-grid').setData(glywData);
		data['glyw-grid'] = glywData;
	}
	//无人厅-税务登记信息补录（企业）
	if(sqzl.blzt.swsxDm == '11010101'){
		var tabDw = mini.get("TabDjxxblDw");
		var tabSfz = tabDw.getTab(4);
		if (tabSfz) {
			tabDw.updateTab(tabSfz, {visible: true});
		}
		data['glyw-grid'] = glywData
	}
    // 增值税一般纳税人登记
    if(sqzl.blzt.swsxDm == '110113'){
        var tabYbnsrdj = mini.get("tabsYbnsrdj");
        var tabSfz = tabYbnsrdj.getTab(1);
        if (tabSfz) {
            tabYbnsrdj.updateTab(tabSfz, {visible: true});
        }
        data['glyw-grid'] = glywData
    }
	//delete data.glywData;
};

// 个性化操作都写在这个方法里面，根据税务事项代码区分
sqzl.customOptions=function (data) {
	// 个体工商户定额核定
	if(sqzl.blzt.swsxDm=='110123'){
		var Tab = mini.get('tabsYlForm');
		var tabs = Tab.tabs;
		for (var i=0;i<tabs.length;i++){
			var dataName = tabs[i].name+'ViewForm';
			if(!data.hasOwnProperty(dataName)){
				Tab.removeTab(tabs[i].name);
				i--;
			}
		}
	}

	// 预览数据存在业务关联数据才继续
	if(!!data.glywData){

        var glywData=mini.clone(mini.decode(data.glywData).sfzrdxxList);

		//无人厅-税务登记信息补录（个体）
        if(sqzl.blzt.swsxDm == '11012101'){
            var tab1 = mini.get("tabsDjxxbl");
            var tab = tab1.getTab(3);
            if (tab) {
                tab1.updateTab(tab, {visible: true});
            }
            //mini.get('glyw-grid').setData(glywData);
            for(var i=0;i<glywData.length;i++){
                glywData[i].ywmc='税费种认定';
                glywData[i].zfsbz='主税';
                glywData[i].bllx='增加';
            }
            data['glyw-grid'] = glywData;
        }
        //无人厅-税务登记信息补录（企业）
        if(sqzl.blzt.swsxDm == '11010101'){
            var tabDw = mini.get("TabDjxxblDw");
            var tabSfz = tabDw.getTab(4);
            if (tabSfz) {
                tabDw.updateTab(tabSfz, {visible: true});
            }
            for(var i=0;i<glywData.length;i++){
                glywData[i].ywmc='税费种认定';
                glywData[i].zfsbz='主税';
                glywData[i].bllx='增加';
            }
            data['glyw-grid'] = glywData
        }

        // 增值税一般纳税人登记
        if(sqzl.blzt.swsxDm == '11011301'){
            var tabYbnsrdj = mini.get("tabsYbnsrdj");
            var tabSfz = tabYbnsrdj.getTab(1);
            if (tabSfz) {
                tabYbnsrdj.updateTab(tabSfz, {visible: true});
            }
            for(var i=0;i<glywData.length;i++){
                glywData[i].ywmc='税费种认定';

                if(glywData[i].czlx == "insert") {
                    glywData[i].bllx='增加';
                } else if(glywData[i].czlx == "update") {
                    glywData[i].bllx='更新';
                } else {
                    glywData[i].bllx= glywData[i].czlx;
                }
            }
            data['glyw-grid'] = glywData
        }
        //delete data.glywData;
	}

};