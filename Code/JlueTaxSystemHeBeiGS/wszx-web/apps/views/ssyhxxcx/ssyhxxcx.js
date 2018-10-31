/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-11-21
 * Time: 15:02
 * Description:
 */


var ssyhxxcx={

    init:function () {

        $('#nsrsbh').html(wssqUtil.nsrjbxx.nsrsbh);
        $('#nsrmc').html(wssqUtil.nsrjbxx.nsrmc);

        var that = this;
        ajax.post('/wszx-web/api/yh/ssyhzg/get/ssyhxx.ashx','',function (res) {
            if(res.success){
                var data = mini.clone(res.value);
                that.grid.setData(data)
            }else {
                mini.alert(res.message);
                that.grid.setData('');
            }
        })
    }
};

stepNav.run=function () {

    stepNav.initSteps([{id: 0, title: '税收优惠信息查询', url: 'ssyhxxView.aspx'}]);

    mini.parse();

    ssyhxxcx.grid = mini.get('ssyhxx-grid');

    ssyhxxcx.init();

};