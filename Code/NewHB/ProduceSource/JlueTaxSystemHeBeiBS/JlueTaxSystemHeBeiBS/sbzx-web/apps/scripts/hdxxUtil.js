/**
 * Created by chenjunj on 2017/11/30 16:49.
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.hdxxUtil = factory();
    }
}(this, function () {
    var hdxxUtil = {
        hdxxStore: null,//缓存核定--刷新页面要重新取
        hdxxUrl: '../../../api/sb/common/get/hdxx',//取核定的接口
        jkUrl: '',//缴款链接
        sbjgcxUrl:'../sbjgcx/sbjgcx.html',//申报结果查询链接
        showJkLink: true,//重复申报时是否显示缴款链接
        showSbjgcxLink: true,//重复申报时是否显示申报结果查询链接
        getHdxx:function () {
            var hdxxData = null;
            if(this.hdxxStore){
                return this.hdxxStore;
            }
            if(hdxxData === null){
                var url = this.hdxxUrl;
                var params = {};
                var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
                var sbny = Tools.getUrlParamByName('sbny') || '';
                var isYqsb = Tools.getUrlParamByName('yqsb') || '';
                var isQssb = Tools.getUrlParamByName('qssb') || '';
                if (sbzlDm) {
                    params.sbzlDm = sbzlDm;
                    params.sbny = sbny;
                }
                if (isYqsb){
                    params.sblx = '01';
                }
                if (isQssb){
                    params.sblx = '41';
                }
                mini.mask('期初数据获取中...');
                var _this = this;
                ajax.post(url, mini.encode(params), function (data) {
                    // 返回成功，且有数据
                    if(data.success && data.value){
                        if(data.value.sbzl[0].qccgbz === 'N'){
                            var msg = data.value.sbzl[0].qccgbzms;
                            mini.alert(msg,'提示',function () {
                                window_close();
                            });
                        }else {
                            hdxxData = data.value;
                            _this.hdxxStore = data.value;
                        }
                    }else{
                        var msg = data.message;
                        if(msg.indexOf('重复申报') !== -1){
                            if(_this.showJkLink && _this.jkUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.jkUrl+'">去缴款>></a>';
                            }
                            if(_this.showSbjgcxLink && _this.sbjgcxUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询>></a>';
                            }
                        }
                        mini.alert(msg,'提示',function () {
                            window_close();
                        });
                        return false;
                    }
                },function (data) {
                    mini.alert(data.message,'提示',function () {
                        window_close();
                    });
                    return false;
                });
                mini.unmask();
            }
            return hdxxData;
        },
        getSbzlNode:function () {
            return _getSbzlNode.apply(this,arguments)
        },
        getWsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'wsxx');
        },
        getLsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'lsxx');
        },
        getSbny:function () {
            return _getSbny.apply(this,arguments);
        }
    };
    var _getSbny = function() {
        var d = new Date();
        return d.getLastDateOfPrevMonth().format('yyyyMM');
    };
    // 核定信息中的申报种类节点
    var _getSbzlNode = function (hdxxData) {
        var hdxx = null;
        if(!!hdxxData){
            hdxx = hdxxData;
        }else{
            hdxx = hdxxUtil.getHdxx();
        }
        if(!!hdxx && !!hdxx.sbzl && hdxx.sbzl.length==1){

            return hdxx.sbzl[0];

        }else{
            return null;
        }
    };
    // 获取wsxx,lsxx节点下的某个值
    var _getValueByCode=function (code,sbzlnode,type) {

        var sbzl=null;
        if(!!sbzlnode){
            sbzl = sbzlnode;
        }else{
            sbzl = _getSbzlNode();
        }
        // 根据参数type判断是wsxx还是lsxx
        if(!!sbzl && !!sbzl[type+'s'] && !!sbzl[type+'s'][type]){
            var list = sbzl[type+'s'][type];
            var value=null;
            for (var i = 0; i < list.length; i++) {
                if(list[i].code == code){
                    value = list[i].value;
                    break;
                }
            }
            return value;
        }
    };
    return hdxxUtil;
}));
/**
 * Created by chenjunj on 2017/11/30 16:49.
 */
hdxxUtil.jkUrl = '/sbzx-web/apps/views/gdsJk/jk_jsxxcx.html';
hdxxUtil.sbjgcxUrl = '/sbzx-web/apps/views/gdsSbjgcx/sbjgcx.html';
hdxxUtil.getHdxx = function () {
    var hdxxData = null;
    if(this.hdxxStore){
        return this.hdxxStore;
    }
    if(hdxxData === null){
        var url = this.hdxxUrl;
        var params = {};
        var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
        var sbny = Tools.getUrlParamByName('sbny') || '';
        var isYqsb = Tools.getUrlParamByName('yqsb') || '';
        var isQssb = Tools.getUrlParamByName('qssb') || '';
        if (sbzlDm != '') {
            params.sbzlDm = sbzlDm;
            params.sbny = sbny;
        }
        if (isYqsb){
            params.sblx = '01';
        }
        if (isQssb){
            params.sblx = '41';
        }
        /*河北特色点---begin：附加税接口修改，同时增加参数ythsbbz*/
        if(sbzlDm === '10115' || sbzlDm === '10116'){
            url = '/sbzx-web/api/sb/fjs/hdxx';
            if(Tools.getUrlParamByName('reportWithSbzlDm')){
                params.ythsbbz = 'Y';
            }else{
                params.ythsbbz = 'N';
            }
        }
        /*河北特色点---end：附加税接口修改，同时增加参数ythsbbz*/
        mini.mask('期初数据获取中...');
        var _this = this;
        ajax.post(url, mini.encode(params), function (data) {
            // 返回成功，且有数据
            if(data.success && data.value){
                if(data.value.sbzl[0].qccgbz === 'N'){
                    var msg = data.value.sbzl[0].qccgbzms;
                    mini.alert(msg,'提示',function () {
                        window_close();
                    });
                }else {
                    hdxxData = data.value;
                    _this.hdxxStore = data.value;
                }
            }else{
                var msg = data.message;
                if(msg.indexOf('重复申报') !== -1 || msg.indexOf('[80492219]') !== -1){
                    if(_this.showJkLink && _this.jkUrl){
                        msg = msg + '<br/>如需缴款，请到<a class="goToPay" href="'+_this.jkUrl+'">查询缴款</a>';
                        msg = msg + '<br/>如需查看已申报信息，请到“<a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询/作废</a>”进行查看';
                    }
                }
                mini.alert(msg,'提示',function () {
                    window_close();
                });
                return false;
            }
        },function (data) {
            mini.alert(data.message,'提示',function () {
                window_close();
            });
            return false;
        });
        mini.unmask();
    }
    return hdxxData;
};