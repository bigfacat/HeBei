var fpjcxx = {
    initData: function () {
        var obj = {
            data: {
                logicName:'Logic_queryFpjcxx'
            },
            gridId: 'fpjcxxGrid'
        };
        yhscx.loadGridData(obj);
    }
};
$(function () {
    mini.parse();
	yhscx.initGrid("fpjcxxGrid");
	fpjcxx.initData();
});