/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-11-21
 * Time: 15:02
 * Description:
 */

var ssyhxxqx = {
    gridData: '', // 存储税收优惠资格信息grid数据
    qxyyData: '', // 存储取消原因下拉框数据
    /**
     * 获取取消原因
     */
    getQxyy: function () {
        var that = this;
        ajax.get('/wszx-web/api/yh/ssyhzg/get/ssyhzgqxyy.ashx', '', function (res) {
            if (res.success) {
                var data = mini.clone(res.value);
                that.qxyyData = data;
            }
        });
    },
    /**
     * 获取可取消的税收优惠资格信息
     */
    init: function () {

        $('#nsrsbh').html(wssqUtil.nsrjbxx.nsrsbh);
        $('#nsrmc').html(wssqUtil.nsrjbxx.nsrmc);
        var that = this;
        ajax.post('/wszx-web/api/yh/ssyhzg/get/kqxssyhzg.ashx', '', function (res) {
            if (res.success) {
                var data = mini.clone(res.value);
                that.gridData = data;
                that.grid.setData(data)
            } else {
                mini.alert(res.message);
                that.grid.setData('');
            }
        });
    },
    /**
     * 设置取消原因
     * @param e
     */
    checkRow: function (e) {
        if (e.field === 'qxyy') {
            e.editor.setData(ssyhxxqx.qxyyData);
        }
    },
    /**
     * 校验必填项
     * @param index
     * @returns {boolean}
     */
    checkStep1: function (index) {
        var that = this;
        var row = this.gridData[index];
        if(!row.qxyy){
            mini.alert('取消原因不能为空','提示',function () {
                that.grid.beginEditCell(index,6);
            });
            return false;
        }
        if(!row.tzxsrq){
            mini.alert('停止享受日期起不能为空','提示',function () {
                that.grid.beginEditCell(index,7);
            });
            return false;
        }else{
            var now = new Date();
            var v = (row.tzxsrq + '-01').replace(/-/g, '/');
            var vDate = new Date(v);
            if (vDate < row.jmqxq || vDate < now || vDate > row.jmqxz) {
                mini.alert('停止享受日期起必须大于当前年月，且在原有效期限起和原有效期限止之间','提示',function () {
                    that.grid.beginEditCell(index,7);
                });
                return false;
            }
        }

        var msg = '确定取消【<span class="txt-red">' + row.jmsspsxmc + '</span>】的税收优惠资格吗？';
        mini.confirm(msg, '提示', function (action) {
            if (action === 'ok') {
                that.submit(index);
            }
        });
    },
    /**
     * 渲染操作列
     * @param e
     * @returns {string}
     */
    renderActions: function (e) {
        var rowIndex = e.rowIndex;
        return '<a href="javascript:ssyhxxqx.checkStep1(' + rowIndex + ')"  >取消资格</a>'
    },
    /**
     * 提交取消的数据
     * @param index
     */
    submit: function (index) {
        var that = this;
        var data = that.grid.getData(true)[index];
        delete data._uid;
        delete data._index;
        delete data._state;
        data.nsrsbh=wssqUtil.nsrjbxx.nsrsbh;
        data.nsrmc=wssqUtil.nsrjbxx.nsrmc;
        var params = {
            data:JSON.stringify({ssyhqx: [data]}),
            lqfsDm: '',
            yjDdxxDto: '',
            fbzlList:'',
            stepConfig:'{}',
            viewData:'{}'
        };

        ajax.post('/wszx-web/api/yh/ssyhzg/submit/ssyhzgqx', JSON.stringify(params), function (res) {
            if (res.success) {
                mini.alert('取消成功！', '提示', function () {
                    // 刷新数据
                    that.init();
                })
            } else {
                mini.alert(res.message);
            }
        }, function () {
            mini.alert('系统出现故障，请稍后再试或联系运维人员');
        })
    }
};
/**
 * 步骤框架初始化
 */
stepNav.run = function () {

    ssyhxxqx.getQxyy();

    stepNav.initSteps([{id: 0, title: '填写申请表', url: 'ssyhxxView.html'}]);

    mini.parse();

    ssyhxxqx.grid = mini.get('ssyhxx-grid');

    ssyhxxqx.init();

};