var fpyjxx = {
    //获取监控平台页面传来的数据信息绘制gird，展示信息
    search: function () {
        grid = mini.get("fpyjxxGrid");
        var form = new mini.Form("#fpyjxxForm");
        var valid = form.validate();
        if(!valid){
            return;
        }
        var cxsjq = mini.get("fpyjxxQ").getValue();
        var cxsjz = mini.get("fpyjxxZ").getValue();
        var checkTime = yhscx.checkTime(cxsjq,cxsjz,"验旧日期起不能大于验旧日期止");
        if(!checkTime){
            return;
        }
        //格式化日期
        var formData = form.getData();
        formData.cxsjq = mini.formatDate(cxsjq, "yyyy-MM-dd");
        formData.cxsjz = mini.formatDate(cxsjz, "yyyy-MM-dd");
        formData.searchIn = "search";
        //获取分页信息
        var obj = {
            data: {
                "cxsjq": formData.cxsjq,
                "cxsjz": formData.cxsjz,
                "logicName":"Logic_QueryFpyjxx"
            },
            gridId: "fpyjxxGrid"
        };
        yhscx.loadGridData(obj);
    },
    /**
     * 重置
     */
    reset: function () {
        yhscx.reset("fpyjxxQ","fpyjxxZ");
    }
};
$(function () {
    mini.parse();
	yhscx.initGrid("fpyjxxGrid");
	fpyjxx.reset();
});