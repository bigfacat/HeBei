var fbzlGrid;
var wjzyqbg = {};
wjzyqbg.formData = {};
wjzyqbg.kqysssxList = [];//跨区域涉税事项编号list
wjzyqbg.successFlag = false;

//初始化
stepNav.run = function () {
    wjzyqbg.nsrjbxx = wssqUtil.nsrjbxx;

    stepNav.initSteps([{
        id: 0,
        title: '填写申请表',
        url: 'txwjzyqbg.aspx'
    }, {
        id: 1,
        title: '上传附报资料',
        url: '../public1/fbzl/FbzlView.aspx',
        js: true
    }, {
        id: 2,
        title: '预览提交',
        url: 'ylwcjyyq.aspx',
        yltj: true
    }, {
        id: 3,
        title: '审核中',
        url: '../public1/shz/shz.aspx',
        js: true
    }, {
        id: 4,
        title: '完成',
        url: '../public1/wc/wc.aspx',
        js: true
    }]);
    mini.parse();
    fbzlGrid = mini.get('fbzl-grid');

    wjzyqbg.kqysssxCombox = mini.get('wcjyhdssglzmbh');
    wjzyqbg.wgzyqForm = new mini.Form('#wgzyq-form');
    wjzyqbg.wgzyqylForm = new mini.Form('#wgzyq-yl-form');

    wjzyqbg.wgzNsrjbxxForm = new mini.Form('#nsrjbxx-form');

    wjzyqbg.wgzyqGrid = mini.get('kqyjyqk_grid');

    wjzyqbg.wgzyqylGrid = mini.get('kqyjyqk-yl-grid');

    var wgzListParam = {
        djxh: wjzyqbg.nsrjbxx.djxh
    };
    wjzyqbgService.getWgzList(wgzListParam, function (result) {
        if (result.success) {
            wjzyqbg.kqysssxList = mini.clone(result.value);
            wjzyqbg.kqysssxCombox.setData(result.value);

        } else {
            mini.alert(result.message);
        }
    });

};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if (currentIndex == 0) {
        var swsxMxDmList = [];
        //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList': swsxMxDmList
        };
        fbzlAjax(datas, 'requestFbzllist');

        wjzyqbg.wgzyqForm.validate();
        if (!wjzyqbg.wgzyqForm.isValid()) {
            return false;
        }
        wjzyqbg.wgzyqGrid.validate();
        if (!wjzyqbg.wgzyqGrid.isValid()) {
            return false;
        }

    } else if (currentIndex == 1) {
        //判断是否按要求上传附报资料
        if (!isCondition()) {
            return;
        }

    }
    else if (currentIndex == 2) {
        var param = wjzyqbg.tjParam();
        wjzyqbgService.tj(mini.encode(param), function (result) {
            if (!result.success) {
                mini.alert(result.message);
                mini.unmask();
            } else {
                wjzyqbg.successFlag = true;
            }
        });
        if (!wjzyqbg.successFlag) {
            return false;
        }

    }
    return true;
};
stepNav.onStepChanged = function (event, currentIndex, newIndex) {
    if (currentIndex == 2) {
        wjzyqbg.wgzyqylForm.setData(wjzyqbg.formData);
        wjzyqbg.wgzyqylGrid.setData(wjzyqbg.wgzyqGrid.getData());

    }
};

wjzyqbg.sssxValueChanegd = function (event) {
    wjzyqbg.wgzNsrjbxxForm.clear();
    wjzyqbg.wgzyqGrid.setData('');
    if (event.value) {
        wjzyqbgService.getWgzyqxx(event.value, function (result) {
            if (result.success && result.value) {
                var bydjnsrxxVO = result.value;
                try{
                    //第一步
                    var zmyxqxq = new Date(event.selected.zmyxqxq).format('yyyy-MM-dd');
                    var zmyxqxz = new Date(event.selected.zmyxqxz).format('yyyy-MM-dd');
                    var wcjyhwyxqxq = new Date(result.value.wcjyhwyxqxq).format('yyyy-MM-dd');
                    var wcjyhwyxqxz = new Date(result.value.wcjyhwyxqxz).format('yyyy-MM-dd');

                    var formData = wjzyqbg.initFormData(result.value);

                    //第二步
                    formData.zmyxqxq = zmyxqxq;
                    formData.zmyxqxz = zmyxqxz;
                    formData.wcjyhwyxqxq = wcjyhwyxqxq;
                    formData.wcjyhwyxqxz = wcjyhwyxqxz;

                    wjzyqbg.formData = mini.clone(formData);
                    wjzyqbg.formData.wcjyhdssglzmbhText = event.source.text;

                    /*表单赋值*/
                    wjzyqbg.wgzyqForm.setData(formData);

                    var jyqkxx = {
                        wcjyhwmc: bydjnsrxxVO.wcjyhwmc,
                        htbh: bydjnsrxxVO.htbh,
                        htdfnsrmc: bydjnsrxxVO.htdfnsrmc,
                        htdfnsrsbh: bydjnsrxxVO.htdfnsrsbh,
                        wcjyhwyxqxq: wcjyhwyxqxq,
                        wcjyhwyxqxz: wcjyhwyxqxz,
                        wcjyhwzz: bydjnsrxxVO.wcjyhwzz
                    };
                    var jyqkxxArr = [];
                    jyqkxxArr.push(jyqkxx);
                    wjzyqbg.wgzyqGrid.setData(jyqkxxArr);
                }catch (e){
                                  
                }

            } else {
                wjzyqbg.formData = {};
                mini.get('wcjyhdssglzmbh').setValue('');
                mini.alert(result.message);
            }
        });
    }

};


/*初始化 form表单的值*/
wjzyqbg.initFormData = function (BydjnsrxxVO) {
    var data = mini.clone(BydjnsrxxVO);
    var xzqhDm = data.wcjydxzqhszDm;
    var xzjdDm = data.jdxzDm;

    var result = {
        nsrsbh: data.nsrsbh,
        nsrmc: data.nsrmc,
        wcjyd: data.wcjyd,
        kqyjydxzqh: baseCode.getMcById('DM_GY_XZQH_QG', xzqhDm),
        wcjydxzqhszDm: data.wcjydxzqhszDm,
        kqyjydxzjd: baseCode.getMcById('DM_GY_JDXZ', xzjdDm),
        jdxzDm: xzjdDm,
        wcjyhwyxqxq: data.wcjyhwyxqxq,
        wcjyhwyxqxz: data.wcjyhwyxqxz
    };
    return result;
};

wjzyqbg.onCellCommitEdit = function (e) {
    var grid = e.sender;
    var record = e.record;
    if (e.field === "zxyxqxz") {
        if (e.value && (e.value < record.wcjyhwyxqxz)) {
            mini.alert('最新有效期止必须大于等于合同有效期止');
            grid.updateRow(record, {zxyxqxz: ""});
            e.cancel = true;
            return false;
        }
    }
};
wjzyqbg.oncellvalidation = function (e) {
    if (e.field === "zxyxqxz") {
        if (!e.value) {
            e.isValid = false;
            e.errorText = "最新有效期止不能为空";
            mini.alert('最新有效期止不能为空');
        }
    }
};
/*组织报文*/
wjzyqbg.tjParam = function () {
    var data = wjzyqbg.wgzyqGrid.getData();
    var wcjyhdssglzmbh = mini.get('wcjyhdssglzmbh').getValue();
    try {
        var selected = mini.get('wcjyhdssglzmbh')._listbox._selecteds[0];
        var param = {
            DJSqydjyxxyqVo: {
                djxh: wjzyqbg.nsrjbxx.djxh,
                sjgsdq: '',
                //wcjyzmuuid:wjzyqbg.formData.wcjyzmuuid,
                //wcjyhdssglzmbh:wcjyhdssglzmbh,
                //bydjuuid:wjzyqbg.getByhuuid(wcjyhdssglzmbh),
                wcjyzmuuid: selected.wcjyzmuuid,
                wcjyhdssglzmbh: selected.wcjyhdssglzmbh,
                bydjuuid: selected.bydjuuid,
                zxyxqxz: data[0]['zxyxqxz'],
                jbr: '',
                fzr: '',
                nsrmc: wjzyqbg.formData.nsrmc,
                nsrsbh: wjzyqbg.formData.nsrsbh,
                lcslid: ''
            }
        };
        return param;
    } catch (e) {

    }

};

/*获取byhuuid*/
wjzyqbg.getByhuuid = function (wcjyhdssglzmbh) {
    var uuid = '';
    $.each(wjzyqbg.kqysssxList, function (i, item) {
        if (item.wcjyzmuuid == wcjyhdssglzmbh) {
            uuid = item.bydjuuid;
        }
    });

    return uuid;
};

