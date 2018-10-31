var fplyxx = {
    //获取监控平台页面传来的数据信息绘制gird，展示信息
    search: function () {
        grid = mini.get("fplyxxGrid");
        var form = new mini.Form("#fplyxxcxForm");
        var valid = form.validate();
        if(!valid){
            return;
        }
        var cxsjq = mini.get("fplycxsjq").getValue();
        var cxsjz = mini.get("fplycxsjz").getValue();
        var checkTime = yhscx.checkTime(cxsjq,cxsjz,"领用日期起不能大于领用日期止");
        if(!checkTime){
            return;
        }
        //格式化日期
        var formData = form.getData();
        formData.cxsjq = mini.formatDate(cxsjq, "yyyy-MM-dd");
        formData.cxsjz = mini.formatDate(cxsjz, "yyyy-MM-dd");
        formData.searchIn = "search";
        var obj = {
            data: {
                "cxsjq": formData.cxsjq,
                "cxsjz": formData.cxsjz,
                "logicName":"Logic_QueryFplyxx"
            },
            gridId: "fplyxxGrid"
        };
        yhscx.loadGridData(obj);
    },
    /**
     * 重置
     */
    reset: function () {
        yhscx.reset("fplycxsjq","fplycxsjz");
    }
};
$(function () {
    mini.parse();
	yhscx.initGrid("fplyxxGrid");
	fplyxx.reset();
});