/**
 * @Author: zhouqy
 * @Date: 2017-02-10
 * @description:票种核定common
 */

(function(win) {
  //缓存票种核定类
  var PzhdCommon = {};
  /**
   * [_selectedIndex 获取当前已选发票种类的index]
   * @param  {[array]} arrList [发票种类列表]
   * @param  {[type]} clsName [class name]
   * @return {[array]}         [已选的发票]
   */
  var _selectedIndexs = function(arrList, clsName) {
    var arrIndexs = [];
    for (var i = 0, len = arrList.length; i < len; i++) {
      if (arrList.eq(i).hasClass(clsName)) {
        arrIndexs.push(i);
      }
    }
    return arrIndexs;
  };
  /**
   * [objTransformToArr 对象转数组]
   * @param  {[object]} obj [要转换的对象]
   * @return {[array]}     [数组]
   */
  function objTransformToArr(obj) {
    var arr = [];
    for (var item in obj) {
      arr.push(obj[item]);
    }
    return arr;
  }
  //对外暴露的接口
  $.extend(PzhdCommon, {
    objFirstStepData: null,
    stepIndex: [2, 3, 4, 5],
    //发票种类代码
    fpStyleCode: {
      //手工E版发票
      sg: "113004100360",
      //增值税专用发票指
      zzszy: "1130",
      //增值税普通发票指
      zzspt: "000008101200",
      //定额发票 数组下标 0:伍元,1:拾元,2:壹元,3:伍拾元
      defp: ["113005100LA0", "113005100L90", "113005100LC0",
        "000005100L70"
      ],
      ppAndZp: ["000008101200", "1130"],
      ppAndSg: ["000008101200", "113004100360"],
      ppAndSgAndDe: ["000008101200", "113004100360", "000005100L70",
        "113005100L90", "113005100LA0", "113005100LC0"
      ]
    },
    /**
     * [initArrSteps 初始化步骤]
     * @param  {[string]} nsrStateUrl [不同的纳税人类型对应的html模版]
     * @return {[array]}             [步骤]
     */
    initArrSteps: function(url) {
      var arr = [{
        id: 0,
        title: '选择票种及数量',
        url: url
      }, {
        id: 1,
        title: '选择领票人',
        url: 'XzlprView.html'
      }, {
        id: 2,
        title: '上传附报资料',
        url: '../public1/fbzl/FbzlView.aspx',
          js:true
      }, {
        id: 3,
        title: '预览提交',
        url: 'YlView.aspx',
        yltj: true
      }, {
        id: 4,
        title: '审核中',
        url: '../public1/shz/shz.aspx',
        js:true
      }, {
        id: 5,
        title: '完成',
        url: '../public1/wc/wc.aspx',
        js: true
      }];
      if (location.href.indexOf('bz=tz') !== -1) {
        PzhdCommon.stepIndex = [10, 2, 3, 4];
        arr = [{
          id: 0,
          title: '选择票种及数量',
          url: url
        }, {
          id: 1,
          title: '选择领票人',
          url: 'XzlprView.html'
        }, {
          id: 2,
          title: '预览提交',
          url: 'YlViewTz.html',
          yltj: true
        }, {
          id: 3,
          title: '审核中',
          url: '../public1/shz/shz.aspx',
          js:true
        }, {
          id: 4,
          title: '完成',
          url: '../public1/wc/wc.aspx',
          js: true
        }]
      }
      return arr;
    },
    //设置领票人法人默认选中
    setFrSelected: function(rows, grid, role) {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].roleId === role) {
          grid.setSelected(grid.getRow(i));
        }
      }
    },
    /**
     * [isEqual 判断票种核定调整数据是否有变动]
     * @param  {[array]}  oldData [服务端返回的数据]
     * @param  {[object]}  newData [用户调整的数据]
     * @return {Boolean}         [true or flase]
     */
    isEqualFpData: function(oldData, newData) {
      var str = "",
        strs = "",
        flag = false;
      for (var i = 0; i < oldData.length; i++) {
        str += oldData[i].cpzgsl;
      }
      for (var key in newData) {
        if (newData[key] || newData[key] !== "") {
          strs += newData[key];
        }
      }
      if (str === strs) {
        flag = true;
      }
      return flag;
    },
    /**
     * [isEqual 判断领票人是否有变动]
     * @param  {[array]}  oldData [服务端返回的数据]
     * @param  {[array]}  newData [用户变更领票人的数据]
     * @return {Boolean}         [true or flase]
     */
    isEqualLprData: function(oldData, newData) {
      var arrOldSfzhm = [];
      var arrNewSfzhm = [];
      var flag = false;
      for (var i = 0; i < oldData.length; i++) {
        arrOldSfzhm.push(Number(oldData[i].sfzhm));
      }
      for (var i = 0; i < newData.length; i++) {
        arrNewSfzhm.push(Number(newData[i].sfzhm));
      }
      arrOldSfzhm = arrOldSfzhm.sort();
      arrNewSfzhm = arrNewSfzhm.sort();
      if (arrOldSfzhm.join() === arrNewSfzhm.join()) {
        flag = true;
      }
      return flag;
    },
    /**
     * [initPrePage 初始化提示页面 是否已经票种核定]
     * @param  {[string]} reason  [原因提示语]
     * @param  {[string]} pre     [配置参数]
     * @param  {[string]} url     [要跳转的url]
     * @param  {[object]} setting [配置对象]
     * @return {[type]}         [description]
     */
    initPrePage: function(reason, pre, url, setting) {
      var preTime;
      var defaultText = '没有跳转请点这里';
      if (setting) {
        preTime = setting.countTime;
        defaultText = setting.text;
      } else {
        preTime = 4;
      }
      // 加载模版
      var data = {
          reason: reason,
          pre: pre,
          url: url,
         // preTime: preTime,
          goText: defaultText
        },
        html = wssqUtil.loadTemplate(
          '../public/prepare/PrepareView.html', data);
      $(stepNav.wizard).before(html);
      // 设置跳转倒计时
      // preInterval = setInterval(function() {
      //   if (preTime < 10) {
      //     preTime = '0' + preTime;
      //   }
      //   $('#pre-time').text(preTime);
      //   preTime--;
      //   if (preTime == -1) {
      //     clearInterval(preInterval);
      //     if (setting) {
      //       window.location.href = setting.href;
      //     } else {
      //       window.location.href = url;
      //     }
      //   }
      // }, 1000);
    },
    /**
     * [isFirstStepVali 第一步的校验逻辑]
     * @param  {[type]}  id [第一步div的id]
     * @return {Boolean}    [true or flase]
     */
    isFirstStepVali: function(id) {
      //判断是否已选中（至少选一个）
      var arr = [false, false, false, 'defaultValid'];
      var form = new mini.Form("#firstStep");
      var arrLi = _selectedIndexs($('#' + id).find('li.fp-content'),
        'fp-checked');
      var fillInDatas = form.getData(); //获取填写的发票数量
      var arrFillInDatas = objTransformToArr(fillInDatas);
      PzhdCommon.objFirstStepData = fillInDatas;
      if (arrLi.length !== 0) {
        //有选,并且选中的需填有数据
        for (var i = 0, len = arrLi.length; i < len; i++) {
          if (!arrFillInDatas[arrLi[i]] || arrFillInDatas[arrLi[i]] ===
            "") {
            arr[1] = arr[2] = false;
            break;
          } else {
            arr[1] = arr[2] = true;
          }
        }
      }
      form.validate();
      if (!form.isValid()) {
        return arr[3];
      }
      if (arr[1] && arr[2]) {
        arr[0] = true;
      };
      return arr[0];
    },
    getAlreadyPzhdData: function(arrData) {
      var arr = [];
      for (var i = 0; i < arrData.length; i++) {
        arr.push({
          fpzlDm: arrData[i].fpzlDm, //发票种类代码
          dffpzgkpxe: arrData[i].dffpzgkpxe, //发票面额
          cpzgsl: arrData[i].cpzgsl //持票最高数量（当前核定的数量）
        });
      }
      return arr;
    },
    /**
     * [getCurrentFpItem 获取当前发票种类item列表]
     * @param  {[array]} arrData   [后端返回的票种核定数据]
     * @param  {[array]} arrFpzlDm [发票种类代码]
     * @return {[object]}           [发票种类和当前已核定面额索引值]
     */
    getCurrentFpItem: function(arrData, arrFpzlDm) {
      var arr = ['100000', '10000', '1000']; //初始化发票面额
      var o = {
        data: ["", ""],
        fpStyle: 0,
        index: [-1, -1]
      }; //fpStyle初始化为0普通发票，1是专用发票，2是普票和专票都有选
      if (arrData.length > 1) {
        o.fpStyle = 2;
        for (var i = 0; i < arrData.length; i++) {
          o.index[i] = arr.indexOf(arrData[i].dffpzgkpxe);
          o.data[i] = arrData[i].cpzgsl;
        }
      } else {
        o.fpStyle = arrFpzlDm.indexOf(arrData[0].fpzlDm);
        o.index[o.fpStyle] = arr.indexOf(arrData[0].dffpzgkpxe);
        o.data[o.fpStyle] = arrData[0].cpzgsl;
      }
      return o;
    },
    /**
     * [getCurrentFpItem 个体工商户起征点以下(餐饮业和非餐饮业)特殊处理]
     * @param  {[array]} arrData   [后端返回的票种核定数据]
     * @param  {[array]} arrFpzlDm [发票种类代码]
     * @return {[object]}           [发票种类和当前已核定面额索引值]
     */
    getCurrentFpItemCyyOrFcyy: function(arrData, arrFpzlDm) {
      var arr = ['1000', '100', '50', '10', '5', '1']; //初始化发票面额
      var o = {
        data: ["", "", "", ""],
        fpStyle: 0,
        index: [-1, -1, -1, -1]
      }; //fpStyle初始化为0普通发票，1是手工E版发票，2是定额发票
      if (arrData.length > 1) {
        //说明已选了定额票
        arr = ['50', '10', '5', '1'];
        o.fpStyle = 2;
        for (var i = 0; i < arrData.length; i++) {
          o.index[i] = arr.indexOf(arrData[i].dffpzgkpxe);
          o.data[i] = arrData[i].cpzgsl;
        }
      } else {
        o.fpStyle = arrFpzlDm.indexOf(arrData[0].fpzlDm);
        var idx = arr.indexOf(arrData[0].dffpzgkpxe);
        //手工票
        if (o.fpStyle === 1) {
          idx = 0;
        }
        //定额票
        if (o.fpStyle > 1) {
          o.fpStyle = 2;
          idx = idx - 2;
        }
        o.index[o.fpStyle] = idx;
        o.data[o.fpStyle] = arrData[0].cpzgsl;
      }
      return o;
    },
    /**
     * [initSelectedData 对已选的核定进行选中和赋值]
     * @param  {[array]} data     [当前核定的数量]
     * @param  {[object]} targetEL [选中的目标dom元素]
     * @param  {[number]} index    [当前核定的数量索引]
     * @return {[type]}          [description]
     */
    initSelectedData: function(data, targetEL, index) {
      var miniInputObj = mini.get(targetEL.find('span.mini-textbox').attr(
        'id'));
      targetEL.addClass('fp-checked');
      miniInputObj.setValue(data[index]);
      miniInputObj.enable();
    },
    /**
     * [initSelectedPzhd 对已选的核定进行初始化]
     * @param  {[array]} arrData [后端返回的已核定的数据]
     * @param  {[type]} nsrRole [当前纳税人类型]
     * @return {[type]}         [description]
     */
    initSelectedPzhd: function(arrData, nsrRole) {
      var obj = null;
      if (nsrRole === "02" || nsrRole === "05") {
        obj = PzhdCommon.getCurrentFpItemCyyOrFcyy(arrData,
          PzhdCommon.fpStyleCode.ppAndSgAndDe);
      } else {
        obj = PzhdCommon.getCurrentFpItem(arrData,
          PzhdCommon.fpStyleCode.ppAndZp);
      }
      if (arrData.length > 1) {
        if (nsrRole === "02" || nsrRole === "05") {
          //有定额票,是餐饮业
          for (var i = 0; i < arrData.length; i++) {
            var targetEl = $('.fp-item').eq(2).find('li.fp-content')
              .eq(obj.index[i]);
            PzhdCommon.initSelectedData(obj.data, targetEl, i);
          }
        } else {
          //不是餐饮业
          for (var i = 0; i < arrData.length; i++) {
            var targetEl = $('.fp-item').eq(i).find('li.fp-content')
              .eq(obj.index[i]);
            PzhdCommon.initSelectedData(obj.data, targetEl, i);
          }
        }
      } else {
        var targetEl = $('.fp-item').eq(obj.fpStyle).find(
          'li.fp-content').eq(
          obj.index[obj.fpStyle]);
        PzhdCommon.initSelectedData(obj.data, targetEl, obj.fpStyle);
      }
    }
  });
  win.pzhdCommon = PzhdCommon;
})(window);
