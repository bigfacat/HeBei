/**
 * Created by lizm on 2016/7/28.
 */


var bsaeUrl = '../../..';
var wxh='BsfwtWeb';
var nsrxxData =  wssqUtil.nsrjbxx;






var yybsService = (function () {
    var data = '';
    var userInfo = {};
    //获取纳税人信息
    if(!store.hasSession('getUserInfo')){
        ajax.post('../../../api/base/userInfo/get', {}, function (data) {
            data=mini.decode(data);
            if (data.success && !!data.value) {
                store.setSession('getUserInfo', data.value);
                userInfo=data.value;
            }
        });
    }else{
        userInfo = store.getSession('getUserInfo');
    }
    function doAjax(postData, url) {
        var responseData = '';
        $.ajax({
            url: bsaeUrl + url,
            type: 'post',
            async: false,
            contentType:'application/json',
            data: mini.encode(postData),
            success: function (data) {
                responseData = data;
            },
            error: function (data) {
                console.log('error')
            }
        });
        return responseData;
    }

    return {
    	/**更新预约办税当前用户信息*/
    	updateBsfwtYhxx:function(){
    		data = {};
            return doAjax(data, '/api/yybs/yysq/updateYhxx.ashx');
    	},

        /*初始化预约办理页面*/
        swjywxxQuery: function (swjgDm,dtDm) {
            data = {swjgDm: swjgDm, wxh: wxh,dtDm:dtDm};
            return doAjax(data, '/api/yybs/yysq/swjywxxQuery');
        },
        /* 初始化预约办税*/
        initYyxx:function (swjgDm,dtDm){
        	data = {swjgDm :swjgDm,wxh : wxh ,dtDm :dtDm};
        	return doAjax(data,'/api/yybs/yysq/initYyyxx.ashx');
        },
        /*选择大厅*/
        dtQuery:function (currentSwjgDm) {
            var accout = userInfo.AccountInfo;
            var data = {
             "sfzjhm": accout.cardNo,
             "xm": accout.fullName,
             "sjhm": accout.mobileOriginal,
             "swjgDm": currentSwjgDm
             };
            return doAjax(data, '/api/yybs/yysq/dtdmcx.ashx');
        },

        /*业务预约办理提交*/
        ywyysqSubmit: function (swjgDm,yysxDm, yyrq, yysjq, yysjz,dtDm) {
            data = {
                swjgDm: swjgDm,
                nsrsbh: userInfo.NsrInfo.nsrsbhGs,
                wxh: wxh,
                yysxDm: yysxDm,
                yyrq: yyrq,
                yysjq: yysjq,
                yysjz: yysjz,
                dtDm:dtDm
            };
            return doAjax(data, '/api/yybs/yysq/ywyysqSubmit');
        },

        /*	单击预约日期，更新预约时间段*/
        yysdxxUpdate: function (swjgDm,yyrq) {
            data = {swjgDm: swjgDm, yyrq: yyrq};
            return doAjax(data, '/api/yybs/yysq/yysdxxUpdate')
        },
        /*	单击预约日期，更新预约时间段*/
        updatexx: function (dtDm,yyrq,yysxDm, currentSwjgDm) {
            data = {dtDm: dtDm, yyrq: yyrq,yysxDm:yysxDm, swjgDm: currentSwjgDm};
            return doAjax(data, '/api/yybs/yysq/updatexx.ashx')
        },


        /*大厅实况查询*/
        dtskcx: function (swjgDm,dtDm) {
            data = {swjgDm: swjgDm,dtDm:dtDm};
            return doAjax(data, '/api/yybs/ycqh_dtskcx.ashx');
        },

        /*预约事项大类提示信息*/
        getYysxTips:function (swjgDm) {
            data = {swjgDm:swjgDm};
            return doAjax(data, '/api/yybs/swsxms.ashx');
        },

        /*取号详情查询*/
        qhxq: function (swjgDm,yysxDlDm,dtDm) {
            data = {
                nsrsbh: userInfo.NsrInfo.nsrsbhGs,
                wxh: wxh,
                yysxDlDm: yysxDlDm,
                swjgDm:swjgDm,
                dtDm:dtDm
            };
            return doAjax(data, '/api/yybs/ycqh_ywpdxq');
        },

        /*取号申请*/
        qhsq: function (swjgDm,yysxDlDm,sjhmQhsq,slhmQhsq,dtDm) {
            data = {
                nsrsbh: userInfo.NsrInfo.nsrsbhGs,
                wxh: wxh,
                yysxDlDm: yysxDlDm,
                swjgDm:swjgDm,
                sjhm:sjhmQhsq,
                slhm:slhmQhsq,
                dtDm:dtDm
            };
            return doAjax(data, '/api/yybs/ycqh_submit');
        },
        /*查询我的号码*/
        wdqhQuery:function () {
            var accout = userInfo.NsrInfo;
            data = {nsrsbh: accout.nsrsbhGs, wxh: wxh};
            return doAjax(data, '/api/yybs/ycqhxxcx');
        },

        /*获取 市 列表*/
        getXzqhList:function () {
            data = {};
            return doAjax(data, '/api/yybs/xzqhmc.ashx');
        },

        /*获取区县列表*/
        getCountyList:function (xzqhsz) {
            data = {xzqhsz:xzqhsz};
            return doAjax(data, '/api/yybs/xqxzmccx.ashx');
        },

        /*查询税务机关大厅信息*/
        getSwjgdt: function (xzqhsz) {
            data = {xzqhsz:xzqhsz};
            return doAjax(data, '/api/yybs/dtskcx.ashx');
        },

        /*预约情况查询*/
        yyqkcxQuery: function () {
            /*nsrxxData = wssqUtil.nsrjbxx;*/
            var accout = userInfo.NsrInfo;
            data = {nsrsbh: accout.nsrsbhGs, wxh: wxh};
            return doAjax(data, '/api/yybs/wdyy/yyqkcxQuery.ashx');
        },

        /*取消预约*/
        qxyy: function (yyuuid) {
            data = {yyuuid: yyuuid};
            return doAjax(data, '/api/yybs/wdyy/qxyyMethod');
        },

        /*获取评价问题*/
        pjwtGet: function () {
            data = {nsrsbh: userInfo.NsrInfo.nsrsbhGs, wxh: wxh};
            return doAjax(data, '/api/yybs/wdyy/pjwt');
        },

        /*图片上传*/
        tpscSubmit: function (yyuuid, tpxx, suffix) {
            data = {yyuuid: yyuuid, tpxx: tpxx, suffix: suffix};
            return doAjax(data, '/api/yybs/wdyy/tpsc');
        },

        /*提交评价*/
        pjSubmit: function (yyuuid, wjnr, pjnr, tplj) {
            data = {
                yyuuid: yyuuid,
                wjnr: wjnr,
                pjnr: pjnr,
                tplj: tplj
            };
            return doAjax(data, '/api/yybs/wdyy/pj');
        },

        /*获取历史评价内容*/
        pjnrGet: function (yyuuid) {
            data = {yyuuid: yyuuid};
            return doAjax(data, '/api/yybs/wdyy/oldpjnr');
        },

        /*根据图片路径获取图片*/
        tpzlView: function (tplj) {
            data = {path: tplj};
            return doAjax(data, '/api/yybs/wdyy/tpzl_view');
        },

        /*提交追加评价*/
        zjpjSubmit: function (yyuuid, zpnr, tplj) {
            data = {
                yyuuid: yyuuid,
                zpnr: zpnr,
                tplj: tplj
            };
            return doAjax(data, '/api/yybs/wdyy/zjpj');
        },
        /*叫号机在线判断*/
        isOnline: function(dtDm){
        	return doAjax({}, '/api/yybs/isonline/'+dtDm);
        },
        /*判断是否正常取号时间*/
        isZcqhsj: function(dtDm){
        	return doAjax({}, '/api/yybs/iszcqhsj/'+dtDm+'.ashx');
        },
        /*判断叫号机取号是否达到最大*/
        checkQhsxs: function(dtDm){
        	return doAjax({}, '/api/yybs/checkqhsxs/'+dtDm);
        }
    }
})();
