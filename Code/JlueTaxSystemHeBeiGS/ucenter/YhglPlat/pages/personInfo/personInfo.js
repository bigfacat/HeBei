/**
 * @Author: zhouqy
 * @Date: 2017-03-10
 * @description:个人信息补录业务逻辑 依赖layui组件库
 */

layui.use(['element', 'form', 'laydate', 'upload', 'layer'], function () {
    var element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
    var form = layui.form(); //初始化表单模块
    var laydate = layui.laydate; //初始化时间组件
    var layer = layui.layer;
    var validator = new Validator(); // 校验实例
    //扩展form验证规则，在这个定义
    form.verify({
        sfzhm: function (value) {
            if (!validator.isSfzhm(value)) {
                return '请输入正确的身份证号码';
            }
        },
        sjhm: function (value) {
            if (!validator.isPhoneNum(value)) {
                return '请输入正确的手机号码';
            }
        },
        jeNum: function (value) {
            if (!validator.isMoney(value)) {
                return '请输入最大14位整数，最多两位小数金额';
            }
        }
    });
    /**
     * 教育情况业务逻辑
     */
    //初始化省份数据
    personInfoService.getLocalData('../../data/province.ashx', function (
      data) {
        var json = {
            list: data.province
        };
        $("#provinceSelect").html(template('provinceTpl', json));
        $("#dqSelect").html(template('dqTpl', json));
        //渲染select数据
        form.render('select');
    });
    //监听选择地区，下拉选择框值被选中时触发
    form.on('select(provinceSelect)', function (data) {
        var targetEl = $("#schoolList");
        if (data.value === "34") {
            targetEl.next().children().eq(0).removeClass('hidden');
            targetEl.parent().find('#inputSchool').removeClass('hidden').prev()
              .addClass('hidden');
            targetEl.css('overflow-y', 'visible').html(
              '<span>请在输入框内手动输入学校！<span>');
            return;
        }
        targetEl.next().children().eq(0).addClass('hidden');
        targetEl.parent().find('#inputSchool').addClass('hidden').prev()
          .removeClass('hidden');
        personInfoService.getLocalData('../../data/school.json', function (
          json) {
            var source = {
                list: json[data.value]
            };
            targetEl.css('overflow-y', 'scroll').html(template(
              'schoolTpl', source));
        });
    });
    //保存教育情况
    form.on('submit(education)', function (data) {
        var o = data.field;
        // var isNull = true;
        // for (var key in o) {
        //   if (o[key] || o[key] !== "") {
        //     isNull = false;
        //   }
        // }
        if (personInfoService.isRepeat(o, "jyqkList")) {
            parent.layer.alert("该条数据已存在，无需重复保存");
            return false;
        }
        if (!o["dq"]) {
            parent.layer.msg("地区不能为空");
            return false;
        }
        if (!o["zgxl"]) {
            parent.layer.msg("最高学历不能为空");
            return false;
        }
        if (!o["yxmc"]) {
            parent.layer.msg("院校名称不能为空");
            return false;
        }
        if (!o["bysj"]) {
            parent.layer.msg("毕业时间不能为空");
            return false;
        }
        // if (!o["dqzt"]) {
        //   parent.layer.msg("当前状态不能为空");
        //   return false;
        // }
        personInfoService.saveZrrJyqkDetailInfo(JSON.stringify(o)).then(
          function (
            data) {
              if (data.success) {
                  o["id"] = data.data;
                  parent.layer.open({
                      content: '保存成功',
                      closeBtn: 0,
                      yes: function (index) {
                          //重置form
                          parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
                          //改变缓存的自然人数据
                          personInfoService.zrrDetailInfo.jyqkList.push(o);
                          //渲染dom
                          personInfoService.render(personInfoService.zrrDetailInfo
                            .jyqkList, $('#educationData'),
                            'educationTpl');
                          personInfoService.initBaseData(
                            personInfoService.zrrDetailInfo, 'baseObj');
                          //释放内存
                          o = null;
                      }
                  });
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function () {

          });
        return false; //阻止表单跳转,如果需要表单跳转,去掉这段即可。
    });

    /**
     * 家庭情况业务逻辑
     */
    form.on('submit(family)', function (data) {
        var oData = data.field;
        //保存之前作重复信息校验处理
        if (personInfoService.isRepeat(oData, "jtqkList")) {
            parent.layer.alert("该条数据已存在，无需重复保存");
            return false;
        }
        if (oData.dhhm) {
            if (!validator.isPhoneNum(oData.dhhm)) {
                parent.layer.alert("请输入正确的手机号码");
                return false;
            }
        }
        personInfoService.saveZrrJtqkDetailInfo(JSON.stringify(oData)).then(
          function (data) {
              if (data.success) {
                  oData["id"] = data.data;
                  parent.layer.open({
                      content: '保存成功',
                      closeBtn: 0,
                      yes: function (index) {
                          //重置form
                          parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
                          //改变缓存的自然人数据
                          personInfoService.zrrDetailInfo.jtqkList.push(
                            oData);
                          //渲染dom
                          personInfoService.render(personInfoService.zrrDetailInfo
                            .jtqkList, $('#familyData'), 'familyTpl');
                          personInfoService.initBaseData(personInfoService.zrrDetailInfo,
                            'baseObj');
                          //释放内存
                          oData = null;
                      }
                  });
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function (err) {

          });
        return false;
    });
    /**
     * 居住年限
     */
    form.on('submit(jznx)', function (data) {
        var o = {
            "nl": "",
            "jznx": data.field.jznx,
            "bdctp": "",
            "jdc": "",
            "xfnltp": "",
            "grryjb": "",
            "grryjbtp": "",
            "lznl": "",
            "lznltp": "",
            "lznx": ""
        };
        personInfoService.updateZrrDetailInfo(JSON.stringify(o)).then(
          function (data) {
              if (data.success) {
                  parent.layer.alert("保存成功");
                  //改变缓存的自然人数据
                  personInfoService.zrrDetailInfo.jznx = o["jznx"];
                  personInfoService.initImg(o, $("#jznxData"),
                    "jznxTpl", "jznx");
                  personInfoService.initBaseData(personInfoService.zrrDetailInfo,
                    'baseObj');
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function (err) {
              parent.layer.alert(err);
          });
        return false;
    });
    /**
     * 经济能力
     */
    // form.on('submit(economic)', function(data) {
    //   var o = {
    //     "nl": "",
    //     "jznx": "",
    //     "jdc": data.field.jdc,
    //     "grryjb": "",
    //     "lznl": "",
    //     "lznx": ""
    //   };
    //   $.extend(o, personInfoService.uploadData);
    //   personInfoService.updateZrrDetailInfo(JSON.stringify(o)).then(
    //     function(data) {
    //       if (data.success) {
    //         parent.layer.alert("保存成功");
    //         personInfoService.initImg(o, $("#economicData"),
    //           "economicTpl", "economic");
    //         //改变缓存的自然人数据
    //         personInfoService.zrrDetailInfo.jdc = o["jdc"];
    //         personInfoService.initBaseData(personInfoService.zrrDetailInfo,
    //           'baseObj');
    //         //释放内存对象
    //         o = null;
    //       } else {
    //         parent.layer.alert(data.message);
    //       }
    //     },
    //     function(err) {
    //       parent.layer.alert(err);
    //     });
    //   return false;
    // });
    /**
     * 个人荣誉
     */
    form.on('submit(honor)', function (data) {
        var o = data.field;
        o.grryjbpz = personInfoService.uploadSource.grryjbpz;
        personInfoService.saveZrrGrryDetailInfo(JSON.stringify(o)).then(
          function (
            data) {
              if (data.success) {
                  o["id"] = data.data;
                  parent.layer.open({
                      content: '保存成功',
                      closeBtn: 0,
                      yes: function (index) {
                          //重置form
                          parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
                          //改变缓存的自然人数据
                          personInfoService.zrrDetailInfo.grryList.push(o);
                          //渲染dom
                          personInfoService.render(personInfoService.zrrDetailInfo
                            .grryList, $('#grryData'),
                            'grryTpl');
                          personInfoService.initBaseData(
                            personInfoService.zrrDetailInfo, 'baseObj');
                          //释放内存
                          o = null;
                      }
                  });
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function () {
              parent.layer.alert("保存失败，请稍后再试");
          });
        return false; //阻止表单跳转,如果需要表单跳转,去掉这段即可。
    });
    /**
     * 消费能力
     */
    form.on('submit(xfnl)', function (data) {
        var o = data.field;
        o.xfpz = personInfoService.uploadSource.xfpz;
        personInfoService.saveZrrXfnlDetailInfo(JSON.stringify(o)).then(
          function (
            data) {
              if (data.success) {
                  o["id"] = data.data;
                  parent.layer.open({
                      content: '保存成功',
                      closeBtn: 0,
                      yes: function (index) {
                          //重置form
                          parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
                          //改变缓存的自然人数据
                          personInfoService.zrrDetailInfo.xfnlList.push(o);
                          //渲染dom
                          personInfoService.render(personInfoService.zrrDetailInfo
                            .xfnlList, $('#xfnlData'),
                            'xfnlTpl');
                          personInfoService.initBaseData(
                            personInfoService.zrrDetailInfo, 'baseObj');
                          //释放内存
                          o = null;
                      }
                  });
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function () {

          });
        return false; //阻止表单跳转,如果需要表单跳转,去掉这段即可。
    });
    /**
     * 履职能力
     */
    form.on('submit(lznl)', function (data) {
        var o = {
            "nl": "",
            "jznx": "",
            "jdc": "",
            "grryjb": "",
            "lznl": data.field.lznl,
            "lznx": data.field.lznx
        };
        $.extend(o, personInfoService.uploadData);
        personInfoService.updateZrrDetailInfo(JSON.stringify(o)).then(
          function (data) {
              if (data.success) {
                  parent.layer.alert("保存成功");
                  personInfoService.initImg(o, $("#lznlData"),
                    "lznlTpl",
                    "lznl");
                  //释放内存对象
                  o = null;
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function (err) {
              parent.layer.alert(err);
          });
        return false;
    });
    /**
     * 不动产
     */
    form.on('submit(bdcjz)', function (data) {
        var o = data.field;
        o.cczm = personInfoService.uploadSource.cczm;
        personInfoService.saveZrrBdcDetailInfo(JSON.stringify(o)).then(
          function (
            data) {
              if (data.success) {
                  o["id"] = data.data;
                  parent.layer.open({
                      content: '保存成功',
                      closeBtn: 0,
                      yes: function (index) {
                          //重置form
                          parent.layer.close(index); //如果设定了yes回调，需进行手工关闭
                          //改变缓存的自然人数据
                          personInfoService.zrrDetailInfo.bdcList.push(o);
                          //渲染dom
                          personInfoService.render(personInfoService.zrrDetailInfo
                            .bdcList, $('#bdcjzData'),
                            'bdcjzTpl');
                          personInfoService.initBaseData(
                            personInfoService.zrrDetailInfo, 'baseObj');
                          //释放内存
                          o = null;
                      }
                  });
              } else {
                  parent.layer.alert(data.message);
              }
          },
          function () {

          });
        return false; //阻止表单跳转,如果需要表单跳转,去掉这段即可。
    });
    //上传组件，所有栏的图片上传均在此方法内执行
    layui.upload({
        url: '/ucenter/api/yhgl/uploadGrxxblzpFile',
        success: function (res, input) {
            var name = input.name;
            parent.layer.msg("图片上传成功");
            // for (var key in personInfoService.uploadData) {
            //   //处理保证每次上传的数据都是当前的
            //   if (personInfoService.uploadData[key]) {
            //     personInfoService.uploadData[key] = "";
            //   }
            // }
            switch (name) {
                case 'bdctp':
                    personInfoService.uploadData.bdctp = JSON.parse(res.data[
                        0])
                      .fileKey;
                    break;
                case 'xfnltp':
                    personInfoService.uploadData.xfnltp = JSON.parse(res.data[
                        0])
                      .fileKey;
                    break;
                case 'grryjbtp':
                    personInfoService.uploadData.grryjbtp = JSON.parse(
                        res.data[
                          0])
                      .fileKey;
                    break;
                case 'cczm':
                    personInfoService.uploadSource.cczm = JSON.parse(
                        res.data[
                          0])
                      .fileKey;
                    break;
                case 'xfpz':
                    personInfoService.uploadSource.xfpz = JSON.parse(
                        res.data[
                          0])
                      .fileKey;
                    break;
                case 'grryjbpz':
                    personInfoService.uploadSource.grryjbpz = JSON.parse(
                        res.data[
                          0])
                      .fileKey;
                    break;
                default:
                    personInfoService.uploadData.lznltp = JSON.parse(res.data[
                        0])
                      .fileKey;
            }
        }
    });
});
$(function () {
    //重新设置父父窗口的高度
    // parent.parent.$("#iframeMain").height(1000);
    //初始化先获取自然人具体信息
    personInfoService.getZrrDetailInfo().then(function (data) {
        //成功回调函数
        if (data.success) {
            personInfoService.zrrDetailInfo = data.data;
            //渲染数据
            personInfoService.initBaseData(data.data, 'baseObj');
            personInfoService.render(data.data.jyqkList, $(
                '#educationData'),
              'educationTpl');
            personInfoService.render(data.data.jtqkList, $(
                '#familyData'),
              'familyTpl');
            personInfoService.render(data.data.xfnlList, $(
                '#xfnlData'),
              'xfnlTpl');
            personInfoService.render(data.data.bdcList, $(
                '#bdcjzData'),
              'bdcjzTpl');
            personInfoService.render(data.data.grryList, $(
                '#grryData'),
              'grryTpl');
            personInfoService.initImg(data.data, $("#jznxData"),
              "jznxTpl", "jznx");
            // personInfoService.initImg(data.data, $("#economicData"),
            //   "economicTpl", "economic");
            // personInfoService.initImg(data.data, $("#honorData"),
            //   "honorTpl", "honor");
            personInfoService.initImg(data.data, $("#lznlData"),
              "lznlTpl", "lznl");
            personInfoService.initUploadedData(data.data);
        } else {
            //Todo nothing
        }
    }, function (err) {
        parent.layer.alert(err);
    });
    //修复ie8下缓存字体图标不显示问题
    $("link").eq(0).attr("href", "../../lib/layerUI/css/layui.css?v=" +
      Math.random());
    //初始化手风琴组件实例和事件绑定
    var accordion = new Accordion($('#accordion'), false);
    /**
     * 教育情况业务逻辑
     */
    //监听选择学校
    // $("input[name='yxmc']").on('click', function() {
    //   $(this).next().removeClass('hidden');
    // });
    // //监听选择院校组件取消按钮
    // $('#btnCancel-school').on('click', function() {
    //   $(this).parent().parent().addClass('hidden');
    // });
    // //监听选择院校组件取消按钮
    // $('#btnConfirm-school').on('click', function() {
    //   var targetParent = $(this).parent().parent();
    //   var value = targetParent.find('#inputSchool').children()
    //     .val();
    //   if (!value || value == '') {
    //     parent.layer.msg("请输入院校名称");
    //     return;
    //   }
    //   targetParent.addClass('hidden').prev().val(value);
    // });
    // //监听选择院校点击事件
    // $('body').delegate("#schoolList li", "click", function() {
    //   $(this).parent().parent().addClass('hidden').prev().val($(this).text());
    // });
    /**
     * 家庭情况业务逻辑
     */
    //事件代理模式，避免多个绑定事件造成性能损耗
    $("body").on('click', function (e) {
        var targetEL = $(e.target);
        //删除
        if (targetEL.attr("id") === "deleteEdu") {
            personInfoService.deleteData(targetEL, "jyqkList");
        } else if (targetEL.attr("id") === "deleteFamily") {
            personInfoService.deleteData(targetEL, "jtqkList");
        } else if (targetEL.attr("id") === "deleteXfnl") {
            personInfoService.deleteData(targetEL, "xfnlList");
        } else if (targetEL.attr("id") === "deleteBdcjz") {
            personInfoService.deleteData(targetEL, "bdcList");
        } else if (targetEL.attr("id") === "deleteGrry") {
            personInfoService.deleteData(targetEL, "grryList");
        } else if (targetEL.attr("id") === "editEdu") {
            var arrDatas = [{
                key: "地区",
                name: "dq"
            }, {
                key: "院校名称",
                name: "yxmc"
            }, {
                key: "最高学历",
                name: "zgxl"
            }, {
                key: "毕业时间",
                name: "bysj"
            }];
            //编辑教育情况
            personInfoService.edit(targetEL, "jyqkList", arrDatas);
        } else if (targetEL.attr("id") === "editFamily") {
            var arrDatas = [{
                key: "姓名",
                name: "xm"
            }, {
                key: "与本人关系",
                name: "ybrgx"
            }, {
                key: "身份证号码",
                name: "sfzh"
            }, {
                key: "文化程度",
                name: "whcd"
            }, {
                key: "手机号码",
                name: "dhhm"
            }];
            //编辑家庭情况
            personInfoService.edit(targetEL, "jtqkList", arrDatas);
        }
    });
});
