/**
 * @Author: zhouqy
 * @Date: 2017-03-10
 * @description:PersonInfoService服务类，继承httpService Ajax，公共的复用业务逻辑
 */
(function (win) {
    //声明PersonInfoService构造函数
    function PersonInfoService() {
        //缓存自然人扩展信息
        this.zrrDetailInfo = null;
        //缓存上传的图片数据
        this.uploadData = {
            "bdctp": "",
            "xfnltp": "",
            "grryjbtp": "",
            "lznltp": "",
        };
        //缓存消费证明、不动产价值和个人荣誉图片数据
        this.uploadSource = {
            "cczm": "",
            "xfpz": "",
            "grryjbpz": ""
        };
    }
    //继承httpService
    PersonInfoService.prototype = new HttpService();
    //继承Validator校验
    PersonInfoService.prototype.validator = new Validator();
    //扩展PersonInfoService
    PersonInfoService.prototype.api = {
        zrrDetailInfo: "/ucenter/api/yhgl/getZrrDetailInfo.ashx",
        saveZrrJyqkDetailInfo: "/ucenter/api/yhgl/saveZrrJyqkDetailInfo",
        saveZrrJtqkDetailInfo: "/ucenter/api/yhgl/saveZrrJtqkDetailInfo",
        deleteZrrJyqkDetailInfo: "/ucenter/api/yhgl/deleteZrrJyqkDetailInfo",
        deleteZrrJtqkDetailInfo: "/ucenter/api/yhgl/deleteZrrJtqkDetailInfo",
        updateZrrDetailInfo: "/ucenter/api/yhgl/updateZrrDetailInfo",
        saveZrrXfnlDetailInfo: "/ucenter/api/yhgl/saveZrrXfnlDetailInfo",
        saveZrrBdcDetailInfo: "/ucenter/api/yhgl/saveZrrBdcDetailInfo",
        deleteZrrXfnlDetailInfo: "/ucenter/api/yhgl/deleteZrrXfnlDetailInfo",
        deleteZrrBdcDetailInfo: "/ucenter/api/yhgl/deleteZrrBdcDetailInfo",
        saveZrrGrryDetailInfo: "/ucenter/api/yhgl/saveZrrGrryDetailInfo",
        deleteZrrGrryDetailInfo: "/ucenter/api/yhgl/deleteZrrGrryDetailInfo"
    };
    //获取自然人账户扩展信息
    PersonInfoService.prototype.getZrrDetailInfo = function () {
        return this.ajaxFun(this.api.zrrDetailInfo, "GET", {
            r: Math.random()
        });
    };
    //保存教育情况
    PersonInfoService.prototype.saveZrrJyqkDetailInfo = function (param) {
        return this.ajaxFun(this.api.saveZrrJyqkDetailInfo, "POST", param);
    };
    //删除教育记录
    PersonInfoService.prototype.deleteZrrJyqkDetailInfo = function (param) {
        return this.ajaxFun(this.api.deleteZrrJyqkDetailInfo, "GET", param);
    };
    //保存家庭情况
    PersonInfoService.prototype.saveZrrJtqkDetailInfo = function (param) {
        return this.ajaxFun(this.api.saveZrrJtqkDetailInfo, "POST", param);
    };
    //删除家庭记录
    PersonInfoService.prototype.deleteZrrJtqkDetailInfo = function (param) {
        return this.ajaxFun(this.api.deleteZrrJtqkDetailInfo, "GET", param);
    };
    //更新自然人账户扩展信息
    PersonInfoService.prototype.updateZrrDetailInfo = function (param) {
        return this.ajaxFun(this.api.updateZrrDetailInfo, "POST", param);
    };
    //保存消费能力
    PersonInfoService.prototype.saveZrrXfnlDetailInfo = function (param) {
        return this.ajaxFun(this.api.saveZrrXfnlDetailInfo, "POST", param);
    };
    //保存不动产价值
    PersonInfoService.prototype.saveZrrBdcDetailInfo = function (param) {
        return this.ajaxFun(this.api.saveZrrBdcDetailInfo, "POST", param);
    };
    //删除消费能力
    PersonInfoService.prototype.deleteZrrXfnlDetailInfo = function (param) {
        return this.ajaxFun(this.api.deleteZrrXfnlDetailInfo, "GET", param);
    };
    //删除不动产价值
    PersonInfoService.prototype.deleteZrrBdcDetailInfo = function (param) {
        return this.ajaxFun(this.api.deleteZrrBdcDetailInfo, "GET", param);
    };
    //保存个人荣誉
    PersonInfoService.prototype.saveZrrGrryDetailInfo = function (param) {
        return this.ajaxFun(this.api.saveZrrGrryDetailInfo, "POST", param);
    };
    //删除个人荣誉
    PersonInfoService.prototype.deleteZrrGrryDetailInfo = function (param) {
        return this.ajaxFun(this.api.deleteZrrGrryDetailInfo, "GET", param);
    };
    /**
     * [getFormData 获取表单数据]
     * @param  {[type]} form [form对象]
     * @return {[object]}      [表单数据]
     */
    PersonInfoService.prototype.getFormData = function (form) {
        var o = {};
        var arr = form.find('form').serializeArray();
        $.each(arr, function () {
            o[this.name] = this.value;
        });
        return o;
    };
    /**
     * [getProvinceData 获取本地json数据]
     * @return {[type]} [回调返回json对象]
     */
    PersonInfoService.prototype.getLocalData = function (url, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus) {
                callback(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('加载本地json数据出错');
            }
        });
    };
    /**
     * [render 渲染数据]
     * @param  {[array]} data  [数据]
     * @param  {[dom El]} tbody [数据容器]
     * @param  {[string]} tpl   [模版id]
     * @return {[type]}       [description]
     */
    PersonInfoService.prototype.render = function (data, tbody, tpl) {
        if (data.length === 0) return;
        var source = {
            list: data
        };
        // tbody.empty();
        //更新dom
        tbody.html(template(tpl, source));
    };
    /**
     * [handleDelData 处理删除数据]
     * @param  {[number]} index [当前索引]
     * @param  {[string]} key   [删除的表]
     * @param  {[dom]} el    [点击的当前行]
     * @param  {[s]tring} tpl   [渲染的模版容器]
     * @return {[type]}       [description]
     */
    PersonInfoService.prototype.handleDelData = function (index, key, el, tpl) {
        var list = this.zrrDetailInfo[key];
        //删除选择的节点数据
        list.splice(index, 1);
        var tbody = el.parent().parent().parent();
        tbody.html(template(tpl, {
            "list": list
        }));
        //触发渲染标题Dom节点数据
        // if (list.length === 0) {
        this.initBaseData(this.zrrDetailInfo, 'baseObj');
        // }
    };
    PersonInfoService.prototype.deleteApi = function (index, el, flag, param) {
        var self = this;
        if (flag === "jyqkList") {
            self.deleteZrrJyqkDetailInfo(param).then(
              function (data) {
                  if (data.success) {
                      parent.layer.msg("删除成功");
                      self.handleDelData(index, "jyqkList", el, 'educationTpl');
                  } else {
                      parent.layer.msg(data.message);
                  }
              },
              function (err) {
                  parent.layer.msg("删除失败，请稍后再试");
              });
        } else if (flag === "jtqkList") {
            self.deleteZrrJtqkDetailInfo(param).then(
              function (data) {
                  if (data.success) {
                      parent.layer.msg("删除成功");
                      self.handleDelData(index, "jtqkList", el, 'familyTpl');
                  } else {
                      parent.layer.msg(data.message);
                  }
              },
              function (err) {
                  parent.layer.msg("删除失败，请稍后再试");
              });
        } else if (flag === "xfnlList") {
            self.deleteZrrXfnlDetailInfo(param).then(
              function (data) {
                  if (data.success) {
                      parent.layer.msg("删除成功");
                      self.handleDelData(index, "xfnlList", el, 'xfnlTpl');
                  } else {
                      parent.layer.msg(data.message);
                  }
              },
              function (err) {
                  parent.layer.msg("删除失败，请稍后再试");
              });
        } else if (flag === "grryList") {
            self.deleteZrrGrryDetailInfo(param).then(
              function (data) {
                  if (data.success) {
                      parent.layer.msg("删除成功");
                      self.handleDelData(index, "grryList", el, 'grryTpl');
                  } else {
                      parent.layer.msg(data.message);
                  }
              },
              function (err) {
                  parent.layer.msg("删除失败，请稍后再试");
              });
        } else {
            self.deleteZrrBdcDetailInfo(param).then(
              function (data) {
                  if (data.success) {
                      parent.layer.msg("删除成功");
                      self.handleDelData(index, "bdcList", el, 'bdcjzTpl');
                  } else {
                      parent.layer.msg(data.message);
                  }
              },
              function (err) {
                  parent.layer.msg("删除失败，请稍后再试");
              });
        }
    };
    /**
     * [delete 删除表数据]
     * @param  {[dom el]} el  [当前点击的行对象]
     * @param  {[string]} key [表]
     * @return {[type]}     [description]
     */
    PersonInfoService.prototype.deleteData = function (el, key) {
        var self = this;
        var strIdx = el.parent().parent().children().eq(0).text();
        var index = ~~strIdx - 1;
        var obj = self.zrrDetailInfo[key][index];
        var param = {
            id: obj.id
        };
        //删除事件
        parent.layer.open({
            content: '确定要删除该条记录吗',
            yes: function (idx) {
                self.deleteApi(index, el, key, param);
                parent.layer.close(idx); //如果设定了yes回调，需进行手工关闭
            },
            cancel: function (idx) {
                parent.layer.close(idx);
                return false;
            }
        });
    };
    /**
     * [edit 教育情况和家庭情况编辑]
     * @param  {[dom]} el        [当前点击的行对象]
     * @param  {[string]} key       [家庭或者学校数组]
     * @param  {[array]} arrSource [组装的数据]
     * @return {[type]}           [description]
     */
    PersonInfoService.prototype.edit = function (el, key, arrSource) {
        var self = this;
        var strIdx = el.parent().parent().children().eq(0).text();
        var index = ~~strIdx - 1;
        var obj = self.zrrDetailInfo[key][index];
        var name = "";
        for (var i = 0, len = arrSource.length; i < len; i++) {
            name = arrSource[i].name;
            arrSource[i].value = obj[name];
        }
        var html = template("editTpl", {
            list: arrSource
        });
        parent.layer.open({
            title: "编辑",
            content: html,
            area: '400px',
            yes: function (idx, layero) {
                var datas = self.getFormData(layero);
                var oValid = self.isEditValid(datas, key);
                //判断是否已编辑
                if (!self.isEdited(datas, obj, key)) {
                    parent.layer.open({
                        title: "提示",
                        type: 1,
                        area: '300px',
                        content: "<p style='text-align:center;padding:40px 0'>信息未做变更</p>"
                    });
                    return false;
                }
                if (!oValid.isFlag) {
                    parent.layer.open({
                        type: 1,
                        area: '300px',
                        content: "<p style='text-align:center;padding:40px 0'>" +
                          oValid.mess + "</p>"
                    });
                } else {
                    $.extend(datas, {
                        id: obj.id
                    });
                    self.editUpdate(datas, key, index);
                    parent.layer.close(idx); //如果设定了yes回调，需进行手工关闭
                }
            },
            cancel: function (idx) {
                parent.layer.close(idx);
                return false;
            }
        });
    };
    PersonInfoService.prototype.editUpdate = function (datas, key, index) {
        var flag = "";
        var api = "";
        key === "jyqkList" ? flag = "education" : flag = "family";
        flag === "education" ? api = "saveZrrJyqkDetailInfo" : api =
          "saveZrrJtqkDetailInfo";
        personInfoService[api](JSON.stringify(datas))
          .then(
            function (
              data) {
                if (data.success) {
                    datas["id"] = data.data;
                    parent.layer.open({
                        content: '修改成功',
                        closeBtn: 0,
                        yes: function (layIndex) {
                            //重置form
                            parent.layer.close(layIndex); //如果设定了yes回调，需进行手工关闭
                            //先删除之前缓存的那条记录
                            personInfoService.zrrDetailInfo[key].splice(index, 1);
                            //改变缓存的自然人数据
                            personInfoService.zrrDetailInfo[key].push(datas);
                            //渲染dom
                            personInfoService.render(personInfoService.zrrDetailInfo[
                              key], $('#' + flag + 'Data'), flag + 'Tpl');
                            // if (personInfoService.zrrDetailInfo[key].length === 1) {
                            personInfoService.initBaseData(personInfoService.zrrDetailInfo,
                              'baseObj');
                            // }
                            //释放内存
                            datas = null;
                        }
                    });
                } else {
                    parent.layer.alert(data.message);
                }
            },
            function (err) {
                parent.layer.alert(err);
            });
    };
    PersonInfoService.prototype.isEditValid = function (datas, flag) {
        var o = {
            isFlag: true,
            mess: ""
        };
        if (flag === "jyqkList") {
            if (!$.trim(datas.dq)) {
                o.isFlag = false;
                o.mess = "地区不能为空";
                return o;
            }
            if (!$.trim(datas.yxmc)) {
                o.isFlag = false;
                o.mess = "院校名称不能为空";
                return o;
            }
            if (!$.trim(datas.zgxl)) {
                o.isFlag = false;
                o.mess = "最高学历不能为空";
                return o;
            }
            // if (!$.trim(datas.dqzt)) {
            //   o.isFlag = false;
            //   o.mess = "当前状态不能为空";
            //   return o;
            // }
            if (!$.trim(datas.bysj)) {
                o.isFlag = false;
                o.mess = "毕业时间不能为空";
                return o;
            }
        } else {
            if (!$.trim(datas.xm)) {
                o.isFlag = false;
                o.mess = "姓名不能为空";
                return o;
            }
            if (!$.trim(datas.ybrgx)) {
                o.isFlag = false;
                o.mess = "与本人关系不能为空";
                return o;
            }
            if (!this.validator.isSfzhm($.trim(datas.sfzh))) {
                o.isFlag = false;
                o.mess = "请输入正确的身份证号码";
                return o;
            }
            if (!$.trim(datas.whcd)) {
                o.isFlag = false;
                o.mess = "文化程度不能为空";
                return o;
            }
            if (!this.validator.isPhoneNum($.trim(datas.dhhm))) {
                o.isFlag = false;
                o.mess = "请输入正确的手机号码";
                return o;
            }
        }
        return o;
    };
    /**
     * [initImg 初始化居住年限、个人荣誉、经济能力和履职能力]
     * @param  {[object]} data [自然人的基本数据]
     * @param  {[dom]} el   [填充数据容器]
     * @param  {[string]} tpl  [模版]
     * @param  {[标志]} flag [用来区分栏目]
     * @return {[type]}      [description]
     */
    PersonInfoService.prototype.initImg = function (data, el, tpl, flag) {
        var o = null;
        //居住年限
        flag === "jznx" && (o = {
            jznx: data.jznx
        });
        //经济能力
        flag === "economic" && (o = {
            jdc: data.jdc,
            bdctp: data.bdctp,
            xfnltp: data.xfnltp
        });
        //个人荣誉
        flag === "honor" && (o = {
            grryjb: data.grryjb,
            grryjbtp: data.grryjbtp
        });
        //履职能力
        flag === "lznl" && (o = {
            lznl: data.lznl,
            lznltp: data.lznltp,
            lznx: data.lznx
        });
        return el.html(template(tpl, {
            list: [o]
        }));
    };
    /**
     * [initUploadedData 初始化已经上传的数据]
     * @param  {[object]} oData [自然人基本信息]
     * @return {[type]}       [description]
     */
    PersonInfoService.prototype.initUploadedData = function (oData) {
        for (var key in oData) {
            switch (key) {
                case "bdctp":
                    this.uploadData["bdctp"] = oData[key];
                    break;
                case "xfnltp":
                    this.uploadData["xfnltp"] = oData[key];
                    break;
                case "lznltp":
                    this.uploadData["lznltp"] = oData[key];
                    break;
                case "grryjbtp":
                    this.uploadData["grryjbtp"] = oData[key];
                    break;
                default:
            }
        }
    };
    /**
     * [initBaseData 每个栏目折叠头部显示的数据]
     * @param  {[object]} data    [自然人数据]
     * @param  {[string]} clsName [类名称]
     * @return {[type]}         [description]
     */
    PersonInfoService.prototype.initBaseData = function (data, clsName) {
        var yxmc = "",
          ybrgx = "",
          xfje = "",
          bdcjz = "",
          grryjb = "";
        data.jyqkList.length === 0 ? yxmc = "未填写" : yxmc = data.jyqkList[0].yxmc +
          '等';
        data.jtqkList.length === 0 ? ybrgx = "未填写" : ybrgx = data.jtqkList[0]
          .ybrgx + '等';
        data.xfnlList.length === 0 ? xfje = "未填写" : xfje = data.xfnlList[0]
          .xfje + '等';
        data.bdcList.length === 0 ? bdcjz = "未填写" : bdcjz = data.bdcList[0]
          .bdcjz + '等';
        data.grryList.length === 0 ? grryjb = "未填写" : grryjb = data.grryList[0]
          .grryjb + '等';
        var arr = [data.nl, yxmc, ybrgx, data.jznx, xfje, grryjb, bdcjz];
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr[i] = "未填写";
            }
        }
        var el = $("." + clsName);
        for (var i = 0, len = el.length; i < len; i++) {
            el.eq(i).text(arr[i]);
        }
    };
    /**
     * [isRepeat 判断保存的数据是否重复]
     * @param  {[type]}  data [当前点击保存的数据]
     * @param  {[type]}  flag [教育or家庭]
     * @return {Boolean}      [true or false]
     */
    PersonInfoService.prototype.isEdited = function (data, dataed, flag) {
        var oNew = null;
        var oOld = null;
        //家庭情况
        if (flag === "jtqkList") {
            oNew = {
                dhhm: data.dhhm,
                sfzh: data.sfzh,
                whcd: data.whcd,
                xm: data.xm,
                ybrgx: data.ybrgx
            };
            oOld = {
                dhhm: dataed.dhhm,
                sfzh: dataed.sfzh,
                whcd: dataed.whcd,
                xm: dataed.xm,
                ybrgx: dataed.ybrgx
            };
            if (JSON.stringify(oNew) === JSON.stringify(oOld)) {
                return false;
            }
        } else {
            oNew = {
                bysj: data.bysj,
                dq: data.dq,
                dqzt: data.dqzt,
                zgxl: data.zgxl,
                yxmc: data.yxmc
            };
            oOld = {
                bysj: dataed.bysj,
                dq: dataed.dq,
                dqzt: dataed.dqzt,
                zgxl: dataed.zgxl,
                yxmc: dataed.yxmc
            };
            if (JSON.stringify(oNew) === JSON.stringify(oOld)) {
                return false;
            }
        }
        return true;
    };
    /**
     * [isRepeat 判断保存的数据是否重复]
     * @param  {[type]}  data [当前点击保存的数据]
     * @param  {[type]}  flag [教育or家庭]
     * @return {Boolean}      [true or false]
     */
    PersonInfoService.prototype.isRepeat = function (data, flag) {
        var list = this.zrrDetailInfo[flag];
        var len = list.length;
        if (len === 0) return false;
        //家庭情况
        if (flag === "jtqkList") {
            for (var i = 0; i < len; i++) {
                if (data.ybrgx === list[i].ybrgx) {
                    return true;
                    break;
                }
            }
        } else {
            for (var i = 0; i < len; i++) {
                if (data.yxmc === list[i].yxmc) {
                    return true;
                    break;
                }
            }
        }
        return false;
    };
    win.personInfoService = new PersonInfoService();
})(window);
