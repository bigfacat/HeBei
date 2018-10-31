//YHS_FP_PZHDXXCX

var pzhdxx = {
    initData: function () {
        var obj = {
            data: {
                logicName:'Logic_pzhdxxCx'
            },
            gridId: 'pzhdxxGrid'
        };
        yhscx.loadGridData(obj);
    }
};
$(function () {
    mini.parse();
	yhscx.initGrid("pzhdxxGrid");
	pzhdxx.initData();
});