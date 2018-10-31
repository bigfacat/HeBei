/**
 * @Author: zhouqy
 * @Date: 2017-02-24
 * @description:定额信息采集模块业务逻辑
 */

//扩展Array对象方法
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
var nsrxxData = nsrxxUtil.getNsrxxVO();
//定额信息采集命名空间
var dexxcj = {
  //初始化定额类型表单数组
  // arrTabForm: ["ygznsr", "xlxpy", "gyscjll", "dexxsy"],
  arrNewTabForm: [],
  //纳税人基本信息
  NsrxxForm: null,
  //缓存提交的数据
  arrSubmitFormData: [],
  //定额类型对应的索引数组
  arrFormIndex: [],
    // 行业代码
    /*dexmData:function(){
        var url = '/wszx-web/api/baseCode/get/baseCode2CombSelect5/DM_DEXM?param=' + nsrxxData.hyDm;
        var data='';
        ajax.get(url,{},function (result) {
            data = result;
        });
        return data;
    }(),*/
    // 注册地行政区划数字代码
    ssxzjdData:function(){
      var url = '/wszx-web/api/baseCode/get/jdxzByXzqhszdm/DM_GY_JDXZ/' + nsrxxData.zcdzxzqhszDm+'.ashx';
      var data='';
      ajax.get(url,{},function (result) {
            data = result;
        });
        return data;
    }(),

  /**
   * [objTransformToArr 对象转数组]
   * @param  {[object]} obj [要转换的对象]
   * @return {[array]}     [数组]
   */
  objTransformToArr: function(obj) {
    var arr = [];
    for (var item in obj) {
      arr.push(obj[item]);
    }
    return arr;
  },
  /**
   * [removeForm 删除没有返回的定额类型]
   * @param  {[array]} arr [后端返回的定额类型]
   * @return {[type]}     [description]
   */
  removeForm: function(arr, bool) {
    var arrs = arr;
    var o = {
      form: "tabsForm",
      arrForm: ["dexxsy", "gyscjll", "xlxpy", "ygznsr"]
    };
    if (!bool) {
      o.form = "tabsYlForm";
    }
    var tabsForm = mini.get(o.form);
    for (var i = 0; i < arrs.length; i++) {
      //先移除已经存在的
      o.arrForm.remove(arrs[i]);
    }
    for (var j = 0; j < o.arrForm.length; j++) {
      if (!bool) {
        tabsForm.removeTab(o.arrForm[j] + "Yl");
      } else {
        tabsForm.removeTab(o.arrForm[j]);
      }
    }
  },
  //根据定额类型初始化第一步
  initFirstSteps: function(arrIndex) {
    var arr = ["", "", "dexxsy", "gyscjll", "xlxpy", "ygznsr"];
    var newArr = [];
    // var url = [];
    // switch (index) {
    //   case 2:
    //     url[0] = "./dexxsy.html";
    //     url[1] = "./dexxsyYlView.html";
    //     break;
    //   case 3:
    //     url[0] = "./gyscjll.html";
    //     url[1] = "./gyscjllYlView.html";
    //     break;
    //   case 4:
    //     url[0] = "./xlxpy.html";
    //     url[1] = "./xlxpyYlView.html";
    //     break;
    //   default:
    //     url[0] = "./ygznsr.html";
    //     url[1] = "./ygznsrYlView.html";
    // }
    for (var i = 0; i < arrIndex.length; i++) {
      newArr.push(arr[arrIndex[i]]);
    }
    return newArr;
  }
};
/*自定义vtype:0-1之间*/
mini.VTypes["zeroBetweenOneErrorText"] = "应纳消费税经营收入应占总收入比例值在0~1之间";
mini.VTypes["zeroBetweenOne"] = function(v) {
  //不对空值进行校验
  if (!v || v === "") return true;
  if (validator.isDecimal(v) && v > 0 && v < 1) return true;
  return false;
};
//初始化获取定额类型
dexxcjService.getDeStyle().then(function(data) {
  if (data.success) {
    var arrData = dexxcj.objTransformToArr(data.value);
    dexxcj.arrFormIndex = arrData;
    dexxcj.arrNewTabForm = dexxcj.initFirstSteps(arrData);
    //定额项目下拉
    dexxcj.dexmData=(function(){
        var url = '/wszx-web/api/baseCode/get/baseCode2CombSelect7/DM_DEXM.ashx?param1=' + nsrxxData.hyDm + '&param2=' + dexxcj.arrFormIndex[0];
        var data='';
        ajax.get(url,{},function (result) {
            data = result;
        });
        return data;
    })();
  } else {
    mini.alert(data.message, "提示", function() {
      wssqUtil.closeWin();
    });
  }
}, function(err) {
  mini.alert(err);
});

stepNav.wizard = $('#wizard');
stepNav.run = function() {
  if (dexxcj.arrNewTabForm === []) {
    return;
  }
    //dexxcj.hyDm = wssqUtil.nsrjbxx.hyDm;
    //dexxcj.zcdzxzqhszDm = wssqUtil.nsrjbxx.zcdzxzqhszDm;

  //初始化steps
  stepNav.initSteps([{
    id: 0,
    title: '填写申请表',
    url: "./tabsView.aspx"
  }, {
    id: 1,
    title: '预览提交',
    url: "tabsYlView.aspx",
    yltj:true
  }, {
    id: 2,
    title: '审核中',
    url: '../public/shz/shz.aspx', js:true
  }, {
    id: 3,
    title: '完成',
    url: '../public1/wc/wc.aspx',
    js:true
  }]);
  mini.parse();
  //删除没有返回的定额类型表单
  dexxcj.removeForm(dexxcj.arrNewTabForm, true);
  //初始化纳税人基本信息
  dexxcj.initNsrData(dexxcj.arrNewTabForm);
  // dexxcj.setDateTime('dateTime');
};
// 步骤跳转前执行
stepNav.onStepChanging = function(event, currentIndex, newIndex) {
  if (currentIndex == 0) {
    dexxcj.arrSubmitFormData = [];
    var dexxcjForm = null;
    var tabForm = mini.get("tabsForm");
    var flag = true;
    for (var i = 0, len = dexxcj.arrNewTabForm.length; i < len; i++) {
      tabForm.activeTab(dexxcj.arrNewTabForm[i]);
      dexxcjForm = new mini.Form(dexxcj.arrNewTabForm[i] + 'Form');
      dexxcj.arrSubmitFormData.push(dexxcjForm.getDataAndText());
      dexxcjForm.validate();
      if (!dexxcjForm.isValid()) {
        flag = false;
        dexxcj.arrSubmitFormData = [];
        break;
      }
    }
    if (!flag) {
      return false;
    } else {
      var arrYl = dexxcj.arrNewTabForm;
      //预览页面
      //先删除没有返回的定额类型表单
      dexxcj.removeForm(dexxcj.arrNewTabForm, false);
      //初始化预览数据
      for (var j = 0; j < len; j++) {
        dexxcjForm = new mini.Form(arrYl[j] + 'YlViewForm');
        dexxcjForm.setData(dexxcj.arrSubmitFormData[j]);
      }
    }
  }
  if (currentIndex == 1) {
    var isGoNext = false;
    var jsonParams = {
      "NsrxxForm": dexxcj.NsrxxForm,
      "GtgshdehdxxForm": dexxcj.submitDexxFormData()
    };
    wssqUtil.tjsq("/wszx-web/api/dj/gtgshdehd/submit/decjxx", mini.encode(jsonParams),
      function(data) {
        if (data.success) {
          isGoNext = true;
          //mini.alert("系统处理失败，请稍后再试。");
        } else {
          isGoNext = false;
          mini.alert(data.message);
        }
      },
      function(err) {
        mini.alert(err);
      });
    return isGoNext;
    // dexxcjService.submitDecjxx(jsonParams).then(function(data) {
    //   if (data.success) {
    //
    //   } else {
    //     mini.alert(data.message);
    //     return false;
    //   }
    // }, function(err) {
    //   mini.alert("提交定额信息失败，请稍后再试");
    // });
  }

  return true;
};
/**
 * [setDateTime 设置当天采集日趋]
 * @param {[elemet Dom]} id [页面的id]
 */
dexxcj.setDateTime = function(id) {
  var sqDate = new Date();
  var text = sqDate.getFullYear() + '-' + (sqDate.getMonth() + 1) +
    '-' + sqDate.getDate();
  $('#' + id).append('<span>' + text + '</span>');
};
/**
 * [initNsrInfo 初始化纳税人基本信息]
 * @param  {[element Dom]} form [表单对象]
 * @return {[type]}      [description]
 */
dexxcj.setNsrInfo = function(form, o) {
  var arr = dexxcj.objTransformToArr(o);
  var targetEl = $('#' + form).find('tbody');
  var tr = targetEl.children();
  var index = 0;
  for (var i = 0, len = tr.length; i < len; i++) {
    tr.eq(i).children().eq(1).text(arr[index]);
    tr.eq(i).children().eq(3).text(arr[index + 1]);
    index += 2;
  }
};

/**
 * 初始化注册资金
 * @param form
 */
dexxcj.setZczj = function(form) {
  var zczj = nsrxxUtil.getNsrxxVO().nsrxxKzVO.zczb;
  if(!!zczj && zczj > 0) {
    mini.get('zczj-sy').setValue(zczj);
    mini.get('zczj-sy').setReadOnly(true);
    mini.get('zczj-gy').setValue(zczj);
    mini.get('zczj-gy').setReadOnly(true);
    mini.get('zczj-xl').setValue(zczj);
    mini.get('zczj-xl').setReadOnly(true);
    mini.get('zczj-ygz').setValue(zczj);
    mini.get('zczj-ygz').setReadOnly(true);
  }
}

/**
 * [setDateTime 初始化纳税人基本信息]
 * @param {[elemet Dom]} id [页面的id]
 */
dexxcj.initNsrData = function(arr) {
  var data = nsrxxUtil.getNsrxxVO();
  //var accoutInfo = nsrxxUtil.getAccountInfo();
  //纳税人基本信息
  var o = {
    nsrsbh: data.nsrsbh,
    nsrmc: data.nsrmc,
    yhxm: data.fddbrxm,
    jydz: data.scjydz,
    lxdh: data.nsrxxKzVO.fddbryddh,
    jyfw: data.nsrxxKzVO.jyfw
  };
  dexxcj.NsrxxForm = o;
  for (var i = 0; i < arr.length; i++) {
    dexxcj.setNsrInfo(arr[i], o);
    dexxcj.setZczj(arr[i]);
  }
};
/**
 * [submitDexxFormData 提交的定额信息表单数据]
 * @return {[object]} [json表单数据]
 */
dexxcj.submitDexxFormData = function() {
  var arrIndex = dexxcj.arrFormIndex;
  var arrKey = ["", "", "SyForm", "GyscjlljgForm", "XlxpyForm",
    "YgzzzsNsrxxForm"
  ];
  var newArr = [];
  var o = {};
  for (var i = 0; i < arrIndex.length; i++) {
    newArr.push(arrKey[arrIndex[i]]);
    dexxcj.arrSubmitFormData[i]["decjblx"] = arrIndex[i];
    o[newArr[i]] = dexxcj.arrSubmitFormData[i];
  }
  // o["hdje"] = "0";
  return o;
};
/**
 * [hasIfAccept 确定页面接受事件]
 * @return {Boolean} [description]
 */
dexxcj.hasIfAccept = function(bool) {
  var json = {
    "sqxh": wssqUtil.sqxh, //申请序号
    "flag": bool
  };
  dexxcjService.hasAcceptResult(json).then(function(data) {
    if (data.success) {
      var wizardP = $("#wizard-p-4");
      $("#wizard-p-3").hide();
      wizardP.show();
      var stepsLi = $(".steps").eq(0).find("li");
      stepsLi.eq(3).removeClass("current").addClass(
        "done");
      stepsLi.eq(4).removeClass("disabled").addClass(
        "current");
    } else {
      mini.alert(data.message);
    }
  }, function(err) {
    mini.alert("提交数据失败，请稍后再试");
  });
};
/*
//演示用的代码
dexxcj.hasIfAccept = function(bool) {
  var json = {
    "sqxh": wssqUtil.sqxh, //申请序号
    "flag": bool
  };
  if(!bool){
	  window.location.reload();
	  return;
  }
  var wizardP = $("#wizard-p-4");
  $("#wizard-p-3").hide();
  wizardP.show();
  var stepsLi = $(".steps").eq(0).find("li");
  stepsLi.eq(3).removeClass("current").addClass("done");
  stepsLi.eq(4).removeClass("disabled").addClass("current");
};*/


/**
 * [initConfirmHdjeData 获取月销售额数据]
 * @return [description]
 */
dexxcj.initConfirmHdjeData = function(bool) {
  var json = {
    "sqxh": "" //申请序号
  };
  dexxcjService.getDejeData(json).then(function(data) {
    if (data.success) {
      $("#finish").find("#hdje").text(data.value + '元');
    } else {
      mini.alert(data.message);
    }
  }, function(err) {
    mini.alert("获取月销售额数据失败，请稍后再试");
  });
};

dexxcj.onValidateZcj = function (e){
  if (e.isValid) {
    if (e.value < 0) {
      e.errorText = "必须输入正数";
      e.isValid = false;
    }
  }
}

/*自定义vtype:0-1之间*/
mini.VTypes["zeroBetweenOneErrorText"] = "应纳消费税经营收入应占总收入比例值在0~1之间";
mini.VTypes["zeroBetweenOne"] = function(v) {
  //不对空值进行校验
  if (!v || v === "") return true;
  if (validator.isDecimal(v) && v >= 0 && v < 1) return true;
  return false;
};