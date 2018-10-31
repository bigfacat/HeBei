/**
 * Created by majiali on 2016/7/28.
 */
var wdyy = {};
stepNav.run=function () {
    stepNav.initSteps([{id: '0', title: '我要预约', url: 'wdyy_.aspx'}]);
    wdyy.bindEvent();
};
wdyy.bindEvent = function () {
    this.loadPage();
    /*关闭按钮*/
    $(".mini-tools-close").click(function () {
       /* $('#qxyyConfirm .mini-tools-close').trigger('click');*/
        var qxyyConfirm = mini.get("qxyyConfirm");
        qxyyConfirm.hide();
    });
    $(".blyyBtn").click(function () {
        $('#qxyyConfirm .mini-tools-close').trigger('click');
    });

    $(".hxqxBtn").click(function () {
        var qxyyConfirm = mini.get("qxyyConfirm");
        qxyyConfirm.hide();
        var qxyy=yybsService.qxyy($("#qxyyConfirm")[0].getAttribute("yyuuid"));
        if(qxyy.success){
            mini.alert("预约取消成功");
        }else {
            mini.alert(qxyy.message);
            return;
        }
        wdyy.loadPage();
    });
}
wdyy.loadPage = function(){

    $('#wdyyContent').html(template('wdyyTemplate'));
    var yyqkcxQuery=yybsService.yyqkcxQuery();

    //暂时用假数据

    if(yyqkcxQuery.success){
        try{
            if(yyqkcxQuery.value.length>0){
                var yyqkcxLists = [];
                for(var i=0;i<yyqkcxQuery.value.length;i++) {
                    yyqkcxLists[i]={};
                    yyqkcxLists[i].yysj=yyqkcxQuery.value[i].yyrq+yyqkcxQuery.value[i].yysjq+"-"+yyqkcxQuery.value[i].yysjz;
                    yyqkcxLists[i].swjgmc=yyqkcxQuery.value[i].dtmc;
                    yyqkcxLists[i].swjgdz=yyqkcxQuery.value[i].dtdz;
                    yyqkcxLists[i].yysxmc=yyqkcxQuery.value[i].yysxmc;
                    yyqkcxLists[i].yyztms=yyqkcxQuery.value[i].yyztms;
                    yyqkcxLists[i].czmc=yyqkcxQuery.value[i].czmc;
                    yyqkcxLists[i].yyuuid=yyqkcxQuery.value[i].yyuuid;
                }
                mini.parse();
                var grid = mini.get("wdyy-grid");
                grid.setData(yyqkcxLists);
            }else {
                mini.alert("您当前没有预约信息",'提示',function () {
                    window.close();
                });
                return;
            }
        }catch (e){
            console.log(e);
        }

    }else {
        mini.alert(yyqkcxQuery.message,'提示',function () {
            window.close();
        });
        return;
    }
};
function onStatus(e){
    var status='';
    if(e.value=="已预约"){
        status='<span class="fontRed">'+ e.value+'</span>';
    }else{
        status='<span class="fontGray">'+ e.value+'</span>';
    }
    return status;
}
function onOperate(e){
    var record = e.record;
    var uid = record._uid;
    var operate='';
    if(e.value){
        if(e.value=="取消预约"){
            operate='<button class="wdyyBtn qxyyBtn" onclick="operateClick(\'' + uid + '\')">'+ e.value+'</button>';
        }else{
            operate='<button class="wdyyBtn qtBtn" onclick="operateClick(\'' + uid + '\')">'+ e.value+'</button>';
        }
    }
    return operate;
}
function operateClick(row_uid){
    var grid = mini.get("wdyy-grid");
    var qxyyConfirm = mini.get("qxyyConfirm");
    var row = grid.getRowByUID(row_uid);
    var obj={yysj:row.yysj,yysxmc:row.yysxmc,yyuuid:row.yyuuid};

    /*SUI.store.set('selectedItem',mini.encode(obj));*/
    store.setSession('selectedItem',mini.encode(obj));

    $("#qxyyConfirm .yyrqsj").text(row.yysj);
    $("#qxyyConfirm .yysxmc").text(row.yysxmc);
    $("#qxyyConfirm")[0].setAttribute("yyuuid",row.yyuuid);
    if(row.czmc=="取消预约") {
        qxyyConfirm.show();
    }else if(row.czmc=="评价") {
        window.location.href="pjgl.html";
    }else if(row.czmc=="追加评价") {
        window.location.href=("pjgl.html?zjpj");
    }
}


