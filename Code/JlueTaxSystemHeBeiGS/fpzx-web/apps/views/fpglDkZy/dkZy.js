/**
 * Created by yuepu on 2017/1/18.
 */
var dkptfp = {};
$("#zy-dksq").click(function(){
    /*跳转到征收品目*/
	goTodkPt();
});
$("#lsjlcx").click(function(){
    /*历史代开记录 */
    location.href = "../fplsdkjl/lsdkjlvcx.aspx";
});
$("#zf").click(function(){
    /*作废*/
    location.href = "../fplsdkjl/lsdkjlvzfcx.aspx?code=110215&id=57&kjzt=N";
});
function goTodkPt(){
	location.href = "dkZyStep.aspx?code=110212&id=551";
}
/*跳转到申请页面*/
$(".zspm .li-item").click(function(){
    type = $(this).attr("data-type");
    location.href = "dkZyStep.aspx?zspmDm="+type;
});
$(function(){
    var ptfpDjxh = wssqUtil.nsrjbxx;
    if(ptfpDjxh.djxh){
        /*登记序号*/
        dkptfp.djxh = ptfpDjxh.djxh;
        /*查询过去一个月连续代开的金额*/
        /*checkLastMonth*/
        dkZyService.checkLastMonth(dkptfp.djxh, '', function (data) {
            if (data.success) {
                /*本月*/
                $("#currentMonthKpcs").html(data.value.kpcs12);
                $("#currentMonthKpje").html(data.value.kpJe);
            } else {
                mini.alert(data.message);
            }
        });

        /*查询过去的12个月代开的金额和次数*/
        dkZyService.checkLast12Month(dkptfp.djxh, '', function (data) {
            if (data.success) {
                /*过去12个月*/
                $("#Monthskpcs").html(data.value.kpcs12);
                $("#MonthsKpje").html(data.value.kpJe);

            } else {
                mini.alert(data.message);
            }
        });
    }
})


