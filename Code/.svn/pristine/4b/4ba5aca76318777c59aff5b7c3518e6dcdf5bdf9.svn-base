/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-10-25
 * Time: 09:41
 * Description:
 */
mini.parse();
var grid = mini.get("validate-info");
var errorCount=0;
function initValidateGrid(data,isNull,needCloseWin){
    /*我知道*/
    $("#actions").on('click','#iknowBtn',function(){
        if(errorCount>0){
            if(needCloseWin){
                closeWin();
            }else{
                wssqUtil.closeWin('close');
            }
        }else{
            wssqUtil.closeWin('close');
        }
    });

    var ruleResults = data.ruleResults;
    grid.on("drawcell", function (e) {
        var field = e.field,
            index = e.rowIndex;
        if (field === "ruleUrl") {
            if(ruleResults[index].resultUrl===null){
                e.cellHtml = '&nbsp; <span>--</span>&nbsp; ';
            }else{
                e.cellHtml = '<a href="'+ruleResults[index].resultUrl+'">'+ruleResults[index].urlTip+'</a>&nbsp; ';
            }
        }
    });
    grid.setData(ruleResults);
    if(isNull){
        var column = grid.getColumn(5);
        grid.hideColumn(column);
    }

    if(data.ruleErrorCount>0){
        errorCount = data.ruleErrorCount;
        $(".title").show();
    }
}

function closeWin(){
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1 || isIE11 || isIE10 ||isIE9 ||isIE8 ) {
        top.close();//直接调用JQUERY close方法关闭
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

function onRenderDegree(e){
    var record = e.record;
    //01错误，02提醒
    if(record.ruleDegree=="01"){
        return "强制监控";
    }else{
        return "提示信息";
    }
}

function onRenderResult(e){
    var record = e.record;
    //01错误，02提醒
    if(!record.resultValue && record.ruleDegree=="01"){
        return "<span class='word-red'>不通过</span>";
    }else if(!record.resultValue && record.ruleDegree=="02"){
        return "——";
    }else if(record.resultValue){
        return "<span class='word-green'>通&nbsp;&nbsp;&nbsp;&nbsp;过</span>";
    }
}