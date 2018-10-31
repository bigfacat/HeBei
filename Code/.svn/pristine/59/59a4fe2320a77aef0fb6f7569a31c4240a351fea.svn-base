/**
 * 表格校验
 * @param grid grid对象
 * @returns {Boolean}校验结果
 */
function validateGrid(grid){
	grid.validate();
	if(grid.isValid()==false){
		var error = grid.getCellErrors()[0];
		mini.alert(error.errorText,"提示信息",function (){
			grid.beginEditCell(error.record,error.column);
		});
		return false;
	}
	return true;
}

/* 是否英文+数字 */
function isEnglishAndNumber(v) {
    var re = new RegExp("^[0-9a-zA-Z\_]+$");
    if (re.test(v)) return true;
    return false;
}
/* 是否汉字 */
function isChinese(v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    if (re.test(v)) return true;
    return false;
}

//判断是否英文+数字
function onEnglishAndNumberValidation(e) {
    if (e.isValid) {
        if (isEnglishAndNumber(e.value) == false) {
            e.errorText = "必须输入英文+数字";
            e.isValid = false;
        }
    }
}

/** ========公共校验方法========= */  
var vcity = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
	    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
	    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
	    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
	    46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
	    54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
	    65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
	};



/*自定义vtype:电话号码*/
mini.VTypes["dhhmErrorText"] = "请输入数字和“-”";
/*自定义vtype:14位整数，两位小数金额*/
mini.VTypes["double14ErrorText"] = "请输入最大14位整数2位小数";
/*自定义vtype:10位整数*/
mini.VTypes["int10ErrorText"] = "请输入最大10位整数";

/*自定义vtype:非特殊字符,如果为null 不再校验，如果想检验不能为空，请加上 required="true" */
mini.VTypes["specialCharErrorText"] = "不能输入特殊字符";
/*自定义vtype:如果不为空再开始校验是否为float*/
mini.VTypes["allowNullFloatErrorText"] = "请输入数字";
/*自定义vtype:16位整数，两位小数金额*/
mini.VTypes["double16ErrorText"] = "请输入最大16位整数2位小数";
/*自定义vtype:12位整数，4位小数金额*/
mini.VTypes["double12ErrorText"] = "请输入最大12位整数4位小数";
/*自定义vtype:邮政编码*/
mini.VTypes["yzbmErrorText"] = "请输入0～9数字，长度为6位";
/*自定义vtype:证件号码*/
mini.VTypes["zjhmErrorText"] = "请输入数字、字母，长度为20位";
/*自定义vtype:身份证件号码*/
mini.VTypes["sfzjhmErrorText"] = "请输入正确的身份证号码。";
/*自定义vtype:组织机构代码*/
mini.VTypes["zzjgdmErrorText"] = "组织机构代码必须为9位数字字母，字母为半角大写。";


mini.VTypes["dhhm"] = function (v) {
    var re = new RegExp("^[0-9\-]{0,20}$");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["double14"] = function (v) {
    var re = new RegExp("^(([-]?[0-9]{1,14}[.]{1}[0-9]{1,2})$|([-]?[0-9]{1,14})$)");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["int10"] = function (v) {
	if(parseFloat(v)<=0){
		return false;
	}
    var re = new RegExp("^([0-9]{1,10}$)");
    if (re.test(v)) return true;
    return false;
}

mini.VTypes["specialChar"] = function(v) {
	if(!v){
		return true;
	}
	var re = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9_\(\)$#@!\-]+$");
	if (re.test(v)){
		return true;
	}
	return false;
}

mini.VTypes["allowNullFloat"] = function(v) {
	if(!v){
		return true;
	}
	var e = parseFloat(String(v).replace(/,/g, ""));
	return isNaN(e) ? false : true;
}


mini.VTypes["double16"] = function (v) {
    var re = new RegExp("^(([-]?[0-9]{1,16}[.]{1}[0-9]{1,2})$|([-]?[0-9]{1,16})$)");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["double12"] = function (v) {
    var re = new RegExp("^(([-]?[0-9]{1,12}[.]{1}[0-9]{1,4})$|([-]?[0-9]{1,12})$)");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["yzbm"] = function (v) {
    var re = new RegExp("^[0-9]{6}$");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["fddbrsfzjhm"] = function (v) {
    var re = new RegExp("^[0-9A-Za-z]{0,20}$");
    if (!v||re.test(v)) return true;
    return false;
}


mini.VTypes["sfzjhm"] = function (v) {
	//是否为空
	  if (v === '') {
	      return false;
	  }
	  //检验位的检测
	  if (checkParity(v) === false) {
	      return false;
	  }
	  //校验长度，类型
	  if (isCardNo(v) === false) {
	      return false;
	  }
	  //检查省份
	  if (checkProvince(v) === false) {
	      return false;
	  }
	  //校验生日
	  if (checkBirthday(v) === false) {
	      return false;
	  }
	return true;
}


mini.VTypes["zzjgdm"] = function (v) {
	if(!v){
		return true;
	}
	var reg =  /^[A-Z0-9]{9}$/;
    if (reg.test(v) === false) {
        return false;
    }
    return true;
}





//校验身份证的js  使用方法：（<input class="mini-textbox" onvalidation="onIDCardsValidation" />）
onIDCardsValidation = function (e) {
  if (e.isValid) {
      card = e.value;
      //是否为空
      if (card === '') {
          e.errorText = "身份证号码不能为空";
          e.isValid = false;
          return false;
      }
      //检验位的检测
      if (checkParity(card) === false) {
          e.errorText = "身份证号码错误";
          e.isValid = false;
          return false;
      }
      //校验长度，类型
      if (isCardNo(card) === false) {
          e.errorText = "身份证最后一位数字有误";
          e.isValid = false;
          return false;
      }
      //检查省份
      if (checkProvince(card) === false) {
          e.errorText = "身份证省份填写有误";
          e.isValid = false;
          return false;
      }
      //校验生日
      if (checkBirthday(card) === false) {
          e.errorText = "身份证生日填写有误";
          e.isValid = false;
          return false;
      }

      return true;
  }
};
//如果不是使用sui，就使用该方法进行校验，card为需要校验的身份证号
idCardsValidation=function (card){
	var errorText="";
	//是否为空
  if (card === '') {
      errorText = "身份证号码不能为空";
      return errorText;
  }
  //检验位的检测
  if (checkParity(card) === false) {
      errorText = "身份证号码错误";
      return errorText;
  }
  //校验长度，类型
  if (isCardNo(card) === false) {
      errorText = "身份证最后一位数字有误";
      return errorText;
  }
  //检查省份
  if (checkProvince(card) === false) {
      errorText = "身份证省份填写有误";
      return errorText;
  }
  //校验生日
  if (checkBirthday(card) === false) {
      errorText = "身份证生日填写有误";
      return errorText;
  }
  return errorText;
}


//检查号码是否符合规范，包括长度，类型
isCardNo = function (card) {
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  if (reg.test(card) === false) {
      return false;
  }
  return true;
};

//取身份证前两位,校验省份
checkProvince = function (card) {
  var province = card.substr(0, 2);
  if (vcity[province] == undefined) {
      return false;
  }
  return true;
};

//组织机构证证件号码规则校验,9位数字字母，字母为半角大写
checkZzjg = function (zzjg) {
	 var reg =  /^[A-Z0-9]{9}$/;
	    if (reg.test(zzjg) === false) {
	        return false;
	    }
	    return true;
};

//检查生日是否正确
checkBirthday = function (card) {
  var len = card.length;
  //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len == '15') {
      var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      var arr_data = card.match(re_fifteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date('19' + year + '/' + month + '/' + day);
      return verifyBirthday('19' + year, month, day, birthday);
  }
  //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len == '18') {
      var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      var arr_data = card.match(re_eighteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date(year + '/' + month + '/' + day);
      return verifyBirthday(year, month, day, birthday);
  }
  return false;
};

//校验日期
verifyBirthday = function (year, month, day, birthday) {
  var now = new Date();
  var now_year = now.getFullYear();
  //年月日是否合理
  if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
      //判断年份的范围（3岁到100岁之间)
      var time = now_year - year;
      if (time >= 3 && time <= 100) {
          return true;
      }
      return false;
  }
  return false;
};

//校验位的检测
checkParity = function (card) {
  //15位转18位
  card = changeFivteenToEighteen(card);
  var len = card.length;
  if (len == '18') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i, valnum;
      for (i = 0; i < 17; i++) {
          cardTemp += card.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum == card.substr(17, 1)) {
          return true;
      }
      return false;
  }
  return false;
};

//15位转18位身份证号
changeFivteenToEighteen = function (card) {
  if (card.length == '15') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (i = 0; i < 17; i++) {
          cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11];
      return card;
  }
  return card;
};

mini.copyTo(mini.Form.prototype, {
    getDataAndText: function (formatted) {
        var formData = this.getData(formatted);
        var fields = this.getFields();
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].type == "combobox") {
                formData[fields[i].getId() + "Text"] = fields[i].getText();
            }
        }
        return formData;
    }
});
/**
 * 重写alert的宽度和高度
 * @param message
 * @param title
 * @param callback
 * @returns {*}
 */
mini.alert = function (message, title, callback) {
    return mini.MessageBox.show({
        maxWidth: 550,
        minWidth: 430,
        minHeight: 250,
        title: title || mini.MessageBox.alertTitle,
        buttons: ["ok"],
        message: message,
        iconCls: "mini-messagebox-warning",
        callback: callback
    });
}

/** ------------------ Layout---------------------------- */
if (mini.Layout) {
    mini.Layout.prototype.mini_createRegion = mini.Layout.prototype._createRegion;
    mini.copyTo(mini.Layout.prototype, {
        _createRegion	: function(options) {
            options = options || {};
            if (!options.showSplit) {
                options.showSplit = false;
            }
            if (!options.showHeader) {
                options.showHeader = false;
            }
            return this.mini_createRegion(options);
        }
    });
}
/** ------------------ DataGrid---------------------------- */
if (mini.DataGrid) {
    mini.DataGrid.prototype.mini_OnDrawCell = mini.DataGrid.prototype._OnDrawCell;
    mini.DataGrid.prototype.mini_OnCellCommitEdit = mini.DataGrid.prototype._OnCellCommitEdit;
    //mini.DataGrid.prototype.getEditorOwnerEditingRow = mini.DataGrid.prototype.getEditorOwnerRow;
    mini.copyTo(mini.DataGrid.prototype, {
        width : "100%",
        height : "auto",
        showFooter : false,
        allowResize : false,
        showModified : false,
        allowUnselect : true,
        enableHotTrack : false,
        loadErrorAlert : false,//ajax请求异常时不提示url等信息
        beginEdit : function() {
            if (!this.allowCellEdit) {// 行编辑模式
                var scope = this;
                this._allowLayout = false;
                this.findRows(function(row) {
                    scope.beginEditRow(row);
                });
                this._allowLayout = true;
                this.doLayout();
            }
        },
        _tryFocus : function(){
            //解决点击单元格页面跳动问题
            return;
        },
        /**
         * 扩展:单元格编辑时高亮显示可编辑单元格
         */
        _OnDrawCell : function () {
            var e = this.mini_OnDrawCell.apply(this, arguments);
            //扩展单元格编辑时高亮显示可编辑单元格
            if(this.allowCellEdit && arguments[1].editor){
                e.cellCls = e.cellCls + " mini-grid-editCell-hotTrack";
            }
            return e;
        },
        _OnCellCommitEdit : function(record, column, value, editor){
            var e = this.mini_OnCellCommitEdit.apply(this, arguments);
            if(e.editor.textName){
                mini._setMap(e.editor.textName, e.text, record);
            }
            return e;
        },
        getEditorOwnerEditingRow : function(editor){
            var curRow = this.getEditorOwnerRow(editor);
            var rows = this.getEditData();
            return rows[this.indexOf(curRow)];
        }
    });
}
/** ------------------ ComboBox---------------------------- */
if (mini.ComboBox) {
    mini.ComboBox.prototype.mini_set = mini.ComboBox.prototype.set;
    mini.ComboBox.prototype.mini__createPopup = mini.ComboBox.prototype._createPopup;
    mini.ComboBox.prototype.miniSetValue = mini.ComboBox.prototype.setValue;
    mini.ComboBox.prototype.mini_setEnabled = mini.ComboBox.prototype.setEnabled;
    mini.ComboBox.prototype.mini_setText = mini.ComboBox.prototype.setText;
    mini.ComboBox.prototype.mini__doEmpty = mini.ComboBox.prototype._doEmpty;
    mini.copyTo(mini.ComboBox.prototype, {
        width : "100%",
        height: 32,
        textField : "MC",
        valueField : "ID",
        showClose  : true,
        allowInput : true,
        valueFromSelect : true,
        errorMode  : "border",
        emptyText : "-请选择-",
        set : function(kv){
            this._value = kv.value;
            if(!kv.textField){
                kv.textField = "MC";
            }

            if(!kv.valueField){
                kv.valueField = "ID";
            }

            if(!kv.nullItemText){
                kv.nullItemText = "-请选择-";
            }

            var _enabled = kv.enabled;
            delete kv.enabled;

            this.mini_set(kv);

            //解决disable时不显示emptyText
            if(_enabled === false){
                this.setEnabled(false);
            }

        },
        setText : function(text){
            mini.ComboBox.prototype.mini_setText.apply(this, arguments);

            //解决disable时不显示emptyText
            if(mini.isEquals(this._emptyText, text)){
                mini.ComboBox.superclass.setText.call(this, "");
            }
        },
        _doEmpty: function () {
            mini.ComboBox.prototype.mini__doEmpty.apply(this, arguments);

            //解决emptyText无法修改为空的问题
            if (this.emptyText == "") {
                mini._placeholder(this._textEl);
            }

        },
        setEnabled	: function(value) {
            //disable时不显示emptyText
            if(!value){
                if(typeof(this._emptyText) == "undefined"){
                    this._emptyText = this.emptyText;
                    this.setEmptyText("");
                }
            }else if(this._emptyText){
                this.setEmptyText(this._emptyText);
                delete this._emptyText;
            }

            mini.ComboBox.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        },
        __OnItemLoad		: function() {
            this.data = this._listbox.data;

            if (typeof this._value != "undefined") {
                this.setValue(this._value, this.defaultValueTriggerChange);
            } else {
                this.setValue(this.value);
            }
        },
        /**
         * 修改为异步请求
         */
        __OnItemBeforeLoad	: function(e) {
            e.async = true;
        },
        _createPopup		: function() {
            this.mini__createPopup();

            this._listbox.on("load", this.__OnItemLoad, this);
            this._listbox.on("beforeload", this.__OnItemBeforeLoad, this);
        },
        setValue			: function(value,valid) {
            this._value = value;
            this.miniSetValue(value,valid);
        }
    });
}
if (mini.TreeSelect) {
    mini.TreeSelect.prototype.mini_setEnabled   = mini.TreeSelect.prototype.setEnabled;
    mini.copyTo(mini.TreeSelect.prototype, {
        width : "100%",
        popupWidth	: "100%",
        popupMinWidth : 250,
        popupMaxHeight	: 300,
        height : 32,
        showClose : true,
        errorMode : "border",
        emptyText : "-请选择-",
        setEnabled	: function(value) {
            mini.TreeSelect.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        }
    });
}
/** ------------------ mini-Password---------------------------- */
if (mini.Password) {
    mini.Password.prototype.mini_setEnabled = mini.Password.prototype.setEnabled;
    mini.Password.prototype.mini__OnBlur = mini.Password.prototype.__OnBlur;
    mini.copyTo(mini.Password.prototype, {
        width : "100%",
        height  : 32,
        errorMode  : "border",
        setEnabled  : function(value) {
            mini.Password.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        },
        __OnBlur: function (e) {
            if(this._textEl.value != this._valueEl.value){
                this.setValue(this._textEl.value);
            }
            mini.Password.prototype.mini__OnBlur.apply(this, arguments);
        }
    });
}
/** ------------------ TextBox---------------------------- */
if (mini.TextBox) {
    mini.TextBox.prototype.mini_setEnabled = mini.TextBox.prototype.setEnabled;
    mini.TextBox.prototype.mini__OnBlur = mini.TextBox.prototype.__OnBlur;
    mini.TextBox.prototype.mini_setValue = mini.TextBox.prototype.setValue;
    mini.copyTo(mini.TextBox.prototype, {
        width	: "100%",
        height  : 32,
        errorMode  : "border",
        setValue: function (value) {
            mini.TextBox.prototype.mini_setValue.apply(this, arguments);
            this.setTooltip(value);
        },
        setEnabled	: function(value) {
            mini.TextBox.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        },
        __OnBlur: function (e) {
            if(this._textEl.value != this._valueEl.value){
                this.setValue(this._textEl.value);
            }
            this.setTooltip(this._textEl.value);
            mini.TextBox.prototype.mini__OnBlur.apply(this, arguments);
        }
    });
}
/** ------------------ Splitter---------------------------- */
if (mini.Splitter) {
    mini.copyTo(mini.Splitter.prototype, {
        width	: "100%",
        height	: "100%"
    });
}
/** ------------------ PopupEdit---------------------------- */
if (mini.PopupEdit) {
    mini.copyTo(mini.PopupEdit.prototype, {
        width	: "100%",
        height  : 32,
        errorMode  : "border"
    });
}
/** ------------------ DatePicker---------------------------- */
if (mini.DatePicker) {
    mini.DatePicker.prototype.mini_setEnabled = mini.DatePicker.prototype.setEnabled;
    mini.copyTo(mini.DatePicker.prototype, {
        width       : "100%",
        height      : 32,
        showClose   : false,
        errorMode   : "border",
        popupHeight : 206,
        popupMinHeight : 206,
        setEnabled	: function(value) {
            mini.DatePicker.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        }
    });
}

/** ------------------ MoneyBox---------------------------- */
if (mini.MoneyBox) {
    mini.MoneyBox.prototype.mini_setEnabled = mini.MoneyBox.prototype.setEnabled;
    mini.copyTo(mini.MoneyBox.prototype, {
        width         : "100%",
        height        : 32,
        selectOnFocus : true,
        errorMode  : "border",
        setEnabled	: function(value) {
            mini.MoneyBox.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        }
    });
}
/** ------------------ hbbox---------------------------- */
if (mini.hbbox) {
    mini.hbbox.prototype.mini_setEnabled = mini.hbbox.prototype.setEnabled;
    mini.copyTo(mini.hbbox.prototype, {
        width         : "100%",
        height        : 32,
        selectOnFocus : true,
        errorMode  : "border",
        setEnabled	: function(value) {
            mini.hbbox.prototype.mini_setEnabled.apply(this, arguments);
            if(value){
                $(this.el).parent().addClass("enable").removeClass("disable");
            }else{
                $(this.el).parent().addClass("disable").removeClass("enable");
            }
        }
    });
}
/** ------------------ mask---------------------------- */
if (mini.mask){
    mini__mask = mini.mask;
    mini.mask = function(options){
        options = options||{};
        var el = mini.byId(options);
        if (mini.isElement(el)) options = { el: el };
        else if (typeof options == "string") options = { html: options };
        options.cls = "mini-mask-loading";
        mini__mask(options);
    }
}

/*------------------------mini.open----------------------*/
if (mini.open){
    mini__open = mini.open;
    mini.open = function(options){
        options = options||{};
        options.url = options.url+'?popup';
        mini__open(options);
    }
}
/*用来解决日期控件的代码  */
/*if (mini.Popup){
    mini.copyTo(mini.Popup.prototype, {
        _create: function () {
            var el = this.el = document.createElement("div");   //暂时注释掉
            this.el.className = "mini-popup aa";
            this._contentEl = this.el;
        }
    });
}*/

/*重写mini.prompt*/
mini.prompt = function (message, title, callback, multi) {
    var id = "prompt$" + new Date().getTime();
    var s = message || mini.MessageBox.promptMessage;
    // 改为miniui的textbox,来保证页面风格的统一性 潘正锋 2014-06-16
    // 增加尺寸数据,解决ie6下面无法自适应的问题 pzf 2014-11
    var $html = jQuery('<div></div>');
    var obj;
    var height;

    if (multi) {
        obj = new mini.TextArea();
        obj.setWidth("230");
        obj.setHeight("70");
        height = "190";

    } else {
        obj = new mini.TextBox();
        obj.setWidth("230");
        height = "200";
        s =  '<span style="line-height: 28px;">'+s+'：</span><br/>';

    }

    var uid = mini.MessageBox.show({
        title: title || mini.MessageBox.promptTitle,
        buttons: ["ok", "cancel"],
        width: 280,
        height:height,
        html: '<div id="pzf" style="overflow:auto;padding:5px;padding-left:10px;">' + s  + '</div>',
        callback: function (action) {
            if (callback) callback(action, obj.getValue());
        }
    });
    obj.render(jQuery('#pzf')[0]);
    obj.focus();
    return uid;
}


