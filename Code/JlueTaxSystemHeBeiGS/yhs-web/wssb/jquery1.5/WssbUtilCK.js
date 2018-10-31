$.ajaxSetup({ async: false, dataType: "json" });


function getObj(nameOrId, context, IDorNameFlag) {
    try {
        var _context = context || document;
        var _IDorNameFlag = IDorNameFlag ? "IDorNameFlag" : ""
        if (_IDorNameFlag == "")//没有声明是按ID查找还是按Name查找，则先按ID查找再按Name查找
        {
            var jdom = $("#" + nameOrId, _context);
            if (jdom.length > 0)     //(typeof obj)!="null"  typeof对于null 返回类型是 'object'
            {
                return jdom[0];
            }
            jdom = $("[name='" + nameOrId + "']", _context);
            if (jdom.length > 0) {
                return jdom[0];
            }
            throw new Error("不存在IDorName为[" + nameOrId + "]对象");
        } else {
            if ("ID" == _IDorNameFlag) {
                var jdom = $("#" + nameOrId, _context);
                if (jdom.length > 0)     //(typeof obj)!="null"  typeof对于null 返回类型是 'object'
                {
                    return jdom[0];
                }
                throw new Error("不存在id为[" + nameOrId + "]对象");
            }
            if ("NAME" == _IDorNameFlag) {
                jdom = $("[name='" + nameOrId + "']", _context);
                if (jdom.length > 0) {
                    return jdom[0];
                }
                throw new Error("不存在name为[" + nameOrId + "]对象");
            }
        }
    } catch (e) {
        alert(e.message);
        return null;
    }
}


function $v(name, context) {
    return Math.round(getObj(name, context).value * 100) / 100;

}
function $v2(name, context) {
    return getObj(name, context);
}
function toRound2Val(val) {
    return Math.round(val * 100) / 100;
}
function toRound4Val(val) {
    return Math.round(val * 100) / 100;
}
function toRound2Obj(obj) {
    //obj.value=Math.round(convert(obj.value)*100)/100;
    obj.value = round(obj.value, 2);
}
function toRound4Obj(obj) {
    //obj.value=Math.round(convert(obj.value)*100)/100;
    obj.value = round(obj.value, 2);
}
//检查字符串的长度（中文的为2）
String.prototype.len = function () { return this.replace(/[^\x00-\xff]/g, "aa").length; }
//去除字符串两边的空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.toFix = function (len) {
    return toFix(this, len);
}

function convert(thestr) {
    if ((thestr == "0.00") || (thestr == "0") || (thestr == '')) {
        return 0;
    }
    var dotlst = thestr.indexOf(".");
    var dotend = thestr.length;
    if ((dotlst == -1) || (dotend - dotlst <= 3)) {
        return thestr;
    }
    else {
        var dot2nd = thestr.indexOf(".");
        var intpart = thestr.substring(0, dot2nd + 3);
        var decpart = thestr.substring(dot2nd + 3, dot2nd + 4);
        if (parseInt(decpart) >= 5) {
            decpart = "0.01";
            var thestr1 = parseFloat(intpart);
            if (thestr1 > 0) {
                thestr1 = thestr1 + parseFloat(decpart);
            }
            else {
                thestr1 = thestr1 - parseFloat(decpart);
            }
            thestr = String(thestr1).substring(0, dot2nd + 3);
        }
        else {
            thestr = intpart;
        }
        return thestr;
    }
}


function right(mainStr, IngLen) {
    if (mainStr.length - IngLen.length >= 0 && mainStr.length >= 0 && mainStr.length - IngLen.length <= mainStr.length) {
        return mainStr.substring(mainStr.length - IngLen, mainStr.length);
    } else {
        return null;
    }

}
function round(sValue, sPointNum, nouse) {
    if (parseFloat(sValue) >= 0)
        var dblValue = parseFloat(sValue) + 0.0000001;//解决一些特别的数字不能四舍五入的问题:3483.75*0.18;
    if (parseFloat(sValue) < 0)
        var dblValue = parseFloat(sValue) - 0.0000001;//解决一些特别的数字不能四舍五入的问题:3483.75*0.18;

    if (isNaN(dblValue)) return sValue
    var iPointNum = parseInt(sPointNum)
    if (isNaN(iPointNum)) iPointNum = 0
    if (iPointNum > 9) iPointNum = 9
    var dbl1 = Math.round(dblValue * Math.pow(10, iPointNum)) / Math.pow(10, iPointNum)
    var s1 = dbl1.toString()
    if (s1.indexOf(".") == -1) {
        var s2 = "000000000000000"
        s1 = s1 + "." + s2.substring(0, iPointNum)
    }
    if (right(s1, 1) == ".")
        s1 = s1.substring(s1.length - 1, s1.length)
    return s1
}

function SetFocus(SetFocus_obj) {
    switch (SetFocus_obj.tagName.toUpperCase()) {
        case "TEXTAREA":
        case "INPUT":
            switch (SetFocus_obj.type.toUpperCase()) {
                case "BUTTON":
                    SetFocus_obj.focus();
                    break;
                case "HIDDEN":
                    break;
                case "TEXT":
                    SetFocus_obj.focus();
                    SetFocus_obj.select();
                    break;
            }
            //SetFocus_obj.focus();
            //SetFocus_obj.select();
            break;
        case "SELECT":
            SetFocus_obj.focus();
            break;

    }
}
function PressGo(obj) {
    if (window.event.keyCode == 13) {
        window.event.keyCode = 0;
        SetFocus(obj);
    }
}



function tab(obj, frm_str) {//处理回车跳格
    if (window.event.keyCode == 13) {
        var form = document.getElementById(frm_str);

        for (i = 0; i < form.elements.length; i++) {
            if (form.elements[i] == obj) {
                for (j = i + 1; j < form.elements.length; j++) {
                    if (form.elements[j].readOnly == false && form.elements[j].type != "hidden" && form.elements[j].style.display != "none" && form.elements[j].type != "file") {
                        form.elements[j].focus();
                        form.elements[j].select();
                        window.event.keyCode = 0;
                        break;
                    }
                }
                break;
            }
        }
    }
}
//限制用户输入字符类型
//tab回车换焦点   int只能录入整型字符   float录入浮点型字符
function key(_key_type) {
    switch (_key_type) {
        case "none"://不输入任何字符
            if (window.event.keyCode != 13) {
                return window.event.keyCode = 0;
            } else {
                return window.event.keyCode = 9;
            }
            break;
        case "tab"://回车转焦点
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            break;
        case "int"://只录入数字
            if (((window.event.keyCode >= 48) && (window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 45)) {
                return window.event.keyCode;
            }
            return window.event.keyCode = 0;
            break;
        case "float"://录入数字或点
            if (((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 46) || (window.event.keyCode == 13) || (window.event.keyCode == 45)) {
                return window.event.keyCode;
            } else {
                return window.event.keyCode = 0;
            }
            break;
        case "ascii"://录入数字或字母
            bool1 = (window.event.keyCode >= 48) && (window.event.keyCode <= 57);
            bool2 = (window.event.keyCode >= 65) && (window.event.keyCode <= 90);
            bool3 = (window.event.keyCode >= 97) && (window.event.keyCode <= 122);
            bool4 = (window.event.keyCode == 13)
            if (bool1 || bool2 || bool3 || bool4) {
                return window.event.keyCode;
            } else {
                return window.event.keyCode = 0;
            }
            break;
        case "letter"://只能输入字母
            bool1 = (window.event.keyCode >= 65) && (window.event.keyCode <= 90);
            bool2 = (window.event.keyCode >= 97) && (window.event.keyCode <= 122);
            bool3 = (window.event.keyCode == 13)
            if (bool1 || bool2 || bool3) {
                return window.event.keyCode;
            } else {
                return window.event.keyCode = 0;
            }
            break;
    }
}
//限制用户输入字符类型
//tab回车换焦点   int只能录入整型字符   float录入浮点型字符
function Key(_key_type) {
    switch (_key_type) {
        case "none"://不输入任何字符
            if (window.event.keyCode != 13) {
                return window.event.keyCode = 0;
            } else {
                return window.event.keyCode = 9;
            }
            break;
        case "int"://只录入数字
            if (((window.event.keyCode >= 48) && (window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 45)) {
                return window.event.keyCode;
            }
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            return window.event.keyCode = 0;
            break;
        case "float"://录入数字或点

            if (((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 46) || (window.event.keyCode == 45)) {
                return window.event.keyCode;
            }
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            return window.event.keyCode = 0;
            break;
        case "ascii"://录入数字或字母
            bool1 = (window.event.keyCode >= 48) && (window.event.keyCode <= 57);
            bool2 = (window.event.keyCode >= 65) && (window.event.keyCode <= 90);
            bool3 = (window.event.keyCode >= 97) && (window.event.keyCode <= 122);
            bool4 = (window.event.keyCode == 13)
            if (bool1 || bool2 || bool3) {
                return window.event.keyCode;
            }
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            return window.event.keyCode = 0;
            break;
        case "letter"://只能输入字母
            bool1 = (window.event.keyCode >= 65) && (window.event.keyCode <= 90);
            bool2 = (window.event.keyCode >= 97) && (window.event.keyCode <= 122);
            if (bool1 || bool2) {
                return window.event.keyCode;
            }
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            return window.event.keyCode = 0;
            break;
        case "all"://所有			
            if (window.event.keyCode == 13) {
                return window.event.keyCode = 9;
            }
            break;
    }
}

function toFix(toFixSrc, toFixLen) {
    toFixSrc = parseFloat(toFixSrc);
    if (isNaN(toFixSrc)) {
        var ret = "";
        for (toFixI = 0; toFixI < toFixLen; toFixI++) {
            ret = ret + "0";
        }
        if (ret.length > 0) {
            return "0." + ret;
        } else {
            return "0";
        }

    }
    //取整
    if (parseInt(toFixLen) == 0) return Math.round(toFixSrc);


    var toFixArray = toFixSrc.toString().split(".");
    if (toFixArray.length <= 1) {//要转化的数为整数，补零
        var toFixZero = "";
        for (toFixI = 0; toFixI < toFixLen; toFixI++) {
            toFixZero += "0";
        }
        return toFixSrc + "." + toFixZero;
    }
    if (toFixArray[1].length <= toFixLen) {//原先的小数位不大于要截取的小数位数
        var toFix_Len = toFixArray[1].length;
        for (toFixI = 0; toFixI < toFixLen - toFix_Len; toFixI++) {
            toFixArray[1] = toFixArray[1] + "0";
        }
        return toFixArray[0] + "." + toFixArray[1];
    }
    toFixSrc = Math.round(toFixSrc * Math.pow(10, toFixLen)) * Math.pow(10, -1 * toFixLen)
    var toFixArray = toFixSrc.toString().split(".");

    if (toFixArray.length <= 1) {//要转化的数为整数，补零
        var toFixZero = "";
        for (toFixI = 0; toFixI < toFixLen; toFixI++) {
            toFixZero += "0";
        }
        return toFixSrc + "." + toFixZero;
    }
    if (toFixArray[1].length <= toFixLen) {//原先的小数位不大于要截取的小数位数
        var toFix_Len = toFixArray[1].length;
        for (toFixI = 0; toFixI < toFixLen - toFix_Len; toFixI++) {
            toFixArray[1] = toFixArray[1] + "0";
        }
        return toFixArray[0] + "." + toFixArray[1];
    }
    var toFixArray = toFixSrc.toString().split(".");
    if (toFixArray[1].length >= toFixLen) {
        toFixArray[1] = toFixArray[1].substring(0, toFixLen);
    } else {//补零
        var toFix_Len = toFixArray[1].length;
        for (toFixI = 0; toFixI < toFixLen - toFix_Len; toFixI++) {
            toFixArray[1] = toFixArray[1] + "0";
        }
    }
    return toFixArray[0] + "." + toFixArray[1];
}
function Valid() {
    /** 整形表达式 */
    this.intRegex = "^[+|-]?[\\d]+$";
    /** 浮点型表达式 */
    this.floatRegex = "^[-|+]?\\d+(\.\\d+)?$";
    /** 不大于两位小数点浮点型表达式 */
    this.float2Regex = "^[-|+]?\\d+(\.\\d{1,2})?$";
    /** 日期表达式YYYY-mm-dd */
    this.dataARegex = "[\\d]{4}-[\\d]{2}-[\\d]{2}$";
    /** 日期表达式YYYY.mm.dd */
    this.dataBRegex = "^\\d{4}\\.\\d{2}\\.\\d{2}$";
    /** 日期表达式YYYY */
    this.dataCRegex = "^\\d{4}$";
    this.emailRegex = "^\\w\+([\-\+\.]\\w+)\*\@\\w\+([\-\.]\\w\+)\*\\.\\w+([\-\.]\\w\+)\*$";
    this.zipRegex = "^[1-9]\\d{5}$";
}
Valid.prototype.isInt = function (src) {
    return new RegExp(this.intRegex, "g").test(src);
}
Valid.prototype.isFloat = function (src) {
    return new RegExp(this.floatRegex, "g").test(src);
}
Valid.prototype.isFloat2 = function (src) {
    return new RegExp(this.float2Regex, "g").test(src);
}
Valid.prototype.isEmail = function (src) {
    return new RegExp(this.emailRegex, "g").test(src);
}
Valid.prototype.isZip = function (src) {
    return new RegExp(this.zipRegex, "g").test(src);
}
Valid.prototype.isDateA = function (src) {
    var isDateA_bool = false;
    var isDateA_year = src.substring(0, 4);
    var isDateA_month = parseFloat(src.substring(5, 7));
    var isDateA_day = parseFloat(src.substring(8, 10));
    //alert(isDateA_year+":"+isDateA_month+":"+isDateA_day);
    isDateA_bool = new RegExp(this.dataARegex, "g").test(src);
    if (!isDateA_bool) {
        return false;
    }
    if (parseInt(isDateA_year) < 1000) {
        return false;
    }
    if (isDateA_month > 12 || isDateA_month < 1) {
        return false;
    }
    if (getDaysOfMonth(parseInt(isDateA_year), isDateA_month) < isDateA_day) {
        return false;
    }
    return true;
}
Valid.prototype.isDateB = function (src) {
    var isDateB_bool = false;
    var isDateB_year = src.substring(0, 4);
    var isDateB_month = parseFloat(src.substring(5, 7));
    var isDateB_day = parseFloat(src.substring(8, 10));
    //alert(isDateB_year+":"+isDateB_month+":"+isDateB_day);
    isDateB_bool = new RegExp(this.dataBRegex, "img").test(src);
    if (!isDateB_bool) {
        return false;
    }
    if (parseInt(isDateB_year) < 1000) {
        return false;
    }
    if (isDateB_month > 12 || isDateB_month < 1) {
        return false;
    }
    if (getDaysOfMonth(parseInt(isDateB_year), isDateB_month) < isDateB_day) {
        return false;
    }
    return true
}
Valid.prototype.isDateC = function (src) {
    var isDateA_bool = false;
    var isDateA_year = src.substring(0, 4);
    isDateA_bool = new RegExp(this.dataCRegex, "g").test(src);
    if (!isDateA_bool) {
        return false;
    }
    if (parseInt(isDateA_year) < 1000) {
        return false;
    }

    return true;
}
/**
作者:ckai 20160112
function validate
说明：校验输入
     validateJson= {obj：    触发对象
                      type：   输入数据类型 
                      required：是否要校验最大值最小值
                      arrays：  [0,100]校验输入范围 默认是0<=输入值<=100;
                      moreMin:  是否要大于[0,100]中的最小值0
                      lessMax:  是否要大于[0,100]中的最小值100
                     }
  */
function validate(obj, validateJson) {
    if (validateJson == null || typeof (validateJson) == "undefiend")
        validateJson = {};
    var type = typeof (validateJson.type) != "undefined" ? validateJson.type : "string";
    var required = typeof (validateJson.required) != "undefined" ? validateJson.required : false;
    var msg = typeof (validateJson.msg) != "undefined" ? validateJson.msg : null;
    var arrays = typeof (validateJson.arrays) != "undefined" ? validateJson.arrays : null;
    var moreMin = typeof (validateJson.moreMin) != "undefined" ? validateJson.moreMin : false;
    var lessMax = typeof (validateJson.lessMax) != "undefined" ? validateJson.lessMax : false;
    var validate_bool = true;
    var alertMsg = msg == null || msg == "" ? null : msg;

    //var validate_list=type.split("_");
    switch (type) {
        case "int"://整数
            if (!IsNumber(obj.value))
            { alertMsg = msg == null ? "错误信息：请输入数字！" : msg; obj.value = toFix(obj.value.trim(), 0); validate_bool = false; }
            obj.value = obj.value.trim();
            if (validate_bool || required || (required == false && obj.value.length > 0)) {
                obj.value = toFix(obj.value.trim(), 0);
                if (arrays != null) {
                    if (arrays.length <= 1) {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        } else {
                            if (obj.value < arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于等于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                    } else {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                        if (lessMax && validate_bool) {
                            if (obj.value >= arrays[1]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,小于" + arrays[1] : msg;
                                validate_bool = false;
                            }
                        }
                        if (validate_bool && (obj.value < arrays[0] || obj.value > arrays[1])) {
                            alertMsg = msg == null ? "错误信息：请输入数字,且大于等于" + arrays[0] + "且小于等于" + arrays[1] : msg;
                            validate_bool = false;
                        }
                    }
                }
            }
            break;
        case "float":
            if (!IsNumber(obj.value))
            { alertMsg = msg == null ? "错误信息：请输入数字！" : msg; obj.value = toFix(obj.value.trim(), 2); validate_bool = false; }
            obj.value = obj.value.trim();
            if (validate_bool || required || (required == false && obj.value.length > 0)) {
                obj.value = toFix(obj.value.trim(), 2);
                if (arrays != null) {
                    if (arrays.length <= 1) {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        } else {
                            if (obj.value < arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于等于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                    } else {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                        if (lessMax && validate_bool) {
                            if (obj.value >= arrays[1]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,小于" + arrays[1] : msg;
                                validate_bool = false;
                            }
                        }
                        if (validate_bool && (obj.value < arrays[0] || obj.value > arrays[1])) {
                            alertMsg = msg == null ? "错误信息：请输入数字,且大于等于" + arrays[0] + "且小于等于" + arrays[1] : msg;
                            validate_bool = false;
                        }
                    }
                }
            }
            break;
        case "float4":
            if (!IsNumber(obj.value))
            { alertMsg = msg == null ? "错误信息：请输入数字！" : msg; obj.value = toFix(obj.value.trim(), 4); validate_bool = false; }
            obj.value = obj.value.trim();
            if (validate_bool || required || (required == false && obj.value.length > 0)) {
                obj.value = toFix(obj.value.trim(), 4);
                if (arrays != null) {
                    if (arrays.length <= 1) {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        } else {
                            if (obj.value < arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于且大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                    } else {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                        if (lessMax && validate_bool) {
                            if (obj.value >= arrays[1]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,小于" + arrays[1] : msg;
                                validate_bool = false;
                            }
                        }
                        if (validate_bool && (obj.value < arrays[0] || obj.value > arrays[1])) {
                            alertMsg = msg == null ? "错误信息：请输入数字,且大于等于" + arrays[0] + "且小于等于" + arrays[1] : msg;
                            validate_bool = false;
                        }
                    }
                }
            }
            break;
        case "float6":
            if (!IsNumber(obj.value))
            { alertMsg = msg == null ? "错误信息：请输入数字！" : msg; obj.value = toFix(obj.value.trim(), 6); validate_bool = false; }
            obj.value = obj.value.trim();
            if (validate_bool || required || (required == false && obj.value.length > 0)) {
                obj.value = toFix(obj.value.trim(), 6);
                if (arrays != null) {
                    if (arrays.length <= 1) {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        } else {
                            if (obj.value < arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于且大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                    } else {
                        if (moreMin) {
                            if (obj.value <= arrays[0]) {
                                alertMsg = msg == null ? "错误信息：请输入数字,大于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        }
                        if (lessMax && validate_bool) {
                            if (obj.value >= arrays[1]) {
                                alertMsg == msg == null ? "错误信息：请输入数字,小于" + arrays[1] : msg;
                                validate_bool = false;
                            }
                        }
                        if (validate_bool && (obj.value < arrays[0] || obj.value > arrays[1])) {
                            alertMsg = msg == null ? "错误信息：请输入数字,且大于等于" + arrays[0] + "且小于等于" + arrays[1] : msg;
                            validate_bool = false;
                        }
                    }
                }
            }
            break;
        case "string":
            var safeFlag = false;//安全标记
            obj.value = obj.value.trim();
            var reStr = /[＜＞《》〈〉<<>>&＆]/;//特殊字符串过滤防止xss攻击
            var str1 = obj.value
            if (str1.match(reStr)) {
                alertMsg = '字符串中不能含有<,>,&等特殊字符！';
                validate_bool = false
            }
            else {
                safeFlag = true;
            }
            if (safeFlag) {
                if (required || (required == false && obj.value.length > 0)) {
                    if (arrays != null) {
                        if (arrays.length <= 1) {
                            if (obj.value.len() > arrays[0]) {
                                alertMsg = msg == null ? "错误信息：输入字符串长度必须小于" + arrays[0] : msg;
                                validate_bool = false;
                            }
                        } else {
                            if (obj.value.len() < arrays[0] || obj.value.len() > arrays[1]) {
                                alertMsg = msg == null ? "错误信息：输入字符串长度必须大于等于" + arrays[0] + "且小于等于" + arrays[1] : msg;
                                validate_bool = false;
                            }
                        }
                    }
                }
            }
            break;
        case "dateA":
            obj.value = obj.value.trim();
            if (required || (required == false && obj.value.length > 0)) {
                valid = new Valid();
                if (!valid.isDateA(obj.value)) {
                    validate_bool = false;
                    alertMsg = "日期格式错误,格式应该为yyyy-mm-dd!";
                }
            }
            break;
        case "dateB":
            obj.value = obj.value.trim();
            if (required || (required == false && obj.value.length > 0)) {
                valid = new Valid();
                if (!valid.isDateB(obj.value)) {
                    validate_bool = false;
                    alertMsg = "日期格式错误,格式应该为yyyyMMdd!";
                }
            }
            break;
        case "dateC":
            obj.value = obj.value.trim();
            if (required || (required == false && obj.value.length > 0)) {
                valid = new Valid();
                if (!valid.isDateC(obj.value)) {
                    validate_bool = false;
                    alertMsg = "日期格式错误,格式应该为yyyy!";
                }
            }
            break;
        case "email":
            obj.value = obj.value.trim();
            if (required || (required == false && obj.value.length > 0)) {
                valid = new Valid();
                if (!valid.isEmail(obj.value)) {
                    validate_bool = false;
                }
            }
            break;
        case "zip":
            obj.value = obj.value.trim();
            if (required || (required == false && obj.value.length > 0)) {
                valid = new Valid();
                if (!valid.isZip(obj.value)) {
                    validate_bool = false;
                }
            }
            break;
        default:
    }
    if (!validate_bool) {
        alert(alertMsg);
        obj.focus();
        obj.select();
        return false;
    }
    return true;
}
//获取文件类型　返回文件类型的小写字母
function getExt(url) {
    var getExt_arrays = url.split("\.");
    return getExt_arrays[getExt_arrays.length - 1].toLowerCase();
}
//判断是否为闰年
function isLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0) {//闰年
        return true;
    }
    if (year % 400 == 0) { // 闰年
        return true;
    }
    return false;
}

function convert(thestr) {
    if ((thestr == "0.00") || (thestr == "0") || (thestr == '')) {
        return 0;
    }
    var dotlst = thestr.indexOf(".");
    var dotend = thestr.length;
    if ((dotlst == -1) || (dotend - dotlst <= 3)) {
        return thestr;
    }
    else {
        var dot2nd = thestr.indexOf(".");
        var intpart = thestr.substring(0, dot2nd + 3);
        var decpart = thestr.substring(dot2nd + 3, dot2nd + 4);
        if (parseInt(decpart) >= 5) {
            decpart = "0.01";
            var thestr1 = parseFloat(intpart);
            if (thestr1 > 0) {
                thestr1 = thestr1 + parseFloat(decpart);
            }
            else {
                thestr1 = thestr1 - parseFloat(decpart);
            }
            thestr = String(thestr1).substring(0, dot2nd + 3);
        }
        else {
            thestr = intpart;
        }
        return thestr;
    }
}

function f_active()  //该函数用于把属性为disabled的文本框激活
{
    var dml = document.form1;
    var len = dml.elements.length;
    var i = 0;
    for (i = 0 ; i < len ; i++) {
        if ((dml.elements[i].type == "text" || dml.elements[i].type == "hidden" || dml.elements[i].tagName.toLowerCase() == "select") && dml.elements[i].disabled == true) {
            dml.elements[i].disabled = false;
        }
    }
}

function f_compare(inputObj) {


    var oldvalue = inputObj.getAttribute("oldvalue");
    if (!IsNumber(inputObj.value))//当前输入框输入的值
    {
        alert("错误信息：请输入数字！");
        inputObj.value = oldvalue;
    }

    var obj_value = inputObj.value;
    var li_ce = parseFloat(oldvalue) - parseFloat(obj_value); //当前输入的值和真正的结果进行对比
    if (li_ce > 1 || li_ce < -1) {
        alert("修改范围超过1！");
        inputObj.value = oldvalue;
    }


}



function init() {
    document.onkeydown = keyDown;
}


function keyDown(e) {
    if (event.keyCode == 13) {
        event.keyCode = 9;
    }
}

/**************************打印函数*********************************/
function doprint() {
    factory.printing.header = ""
    factory.printing.footer = ""
    factory.printing.leftMargin = 0
    factory.printing.topMargin = 0
    factory.printing.rightMargin = 0
    factory.printing.bottomMargin = 0
    factory.printing.portrait = false
    document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮 
    factory.printing.Print(false);
    document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮 
}
function printsetup() {
    // 打印页面设置 
    factory.printing.PageSetup();
}
function printpreview() {
    // 打印页面预览
    factory.printing.header = ""
    factory.printing.footer = ""
    factory.printing.leftMargin = 0
    factory.printing.topMargin = 0
    factory.printing.rightMargin = 0
    factory.printing.bottomMargin = 0
    factory.printing.portrait = false
    document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮 
    factory.printing.Preview();
    document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮 
}
function saveas() {
    // 打印页面另存为
    document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮 
    document.all("printbtn").style.display = 'none';//打印时隐藏打印按钮 
    document.all.button.ExecWB(4, 1);
    //document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮 
}
function hide() {
    // 打印页面另存为
    document.all("printbtn").style.visibility = 'hidden';//打印时隐藏打印按钮 
    document.all("printbtn").style.display = 'none';//打印时隐藏打印按钮 
    //document.all("printbtn").style.visibility = 'visible';//打印完显示打印按钮 
}
var SF = 1, SF1 = 0.1, Max = 3;

/************打印页面加入object标签浏览器提示下载ActiveX控件 同时构建打印、放大、 缩小、 打印设置、 打印预览、 另存为 、隐藏按钮*************/
function createObjectTag() {
    // 	$("#optionDiv").remove();// 先删除打印中“确定、返回div”/
    // 	$("body").prepend("<div id=\"printbtn\" align=\"center\" style=\"DISPLAY:\" name='printbtn'></div>")
    // 	$("body").append("<OBJECT  id=\"factory\" style=\"DISPLAY:  none\"  codeBase=\"../ScriptX.cab#Version=5,60,0,360\"  classid=\"clsid:1663ed61-23eb-11d2-b92f-008048fdd814\"  viewastext></OBJECT>");
    // 	$("body").append("<object id=\"button\" style=\"DISPLAY:  none\" classid=\"CLSID:8856F961-340A-11D0-A96B-00C04FD705A2\"></object>");
    // 	$("#printbtn").append("<INPUT onclick=javascript:doprint() type=\"button\" name=\"Button\" value=\"打印\" align=\"middle\">")
    // 	$("#printbtn").append("<INPUT onclick=javascript:printsetup(); type=\"button\" name=\"Button\" value=\"打印设置\" align=\"middle\">")
    // 	$("#printbtn").append("<INPUT onclick=javascript:printpreview(); type=\"button\" name=\"Button\" value=\"打印预览\" align=\"middle\">")
    // 	$("#printbtn").append("<input type=\"button\" name=\"Button\" value=\"另存为\" onClick=\"javascript:saveas()\">")
    // 	$("#printbtn").append("<input type=\"button\" name=\"Button\" value=\"隐藏\" onClick=\"javascript:hide()\">")
    // 	//$("body").html("<Div id=\"MyDiv\">"+$("body").html()+"</div>");
    // 	//$("body").wrap("<Div id=\"MyDiv\"></div>");
    // 	$("body").append("<Div id=\"MyDiv\"></div>");
    // 	var divDom=$("#MyDiv");
    //     $("body").children("[id!='MyDiv']").appendTo(divDom);
    // 	$("body").empty();
    // 	$("body").append(divDom);
    // 	if($("[name='printbtn']").size()>1)
    // 	{
    // 		$($("[name='printbtn']")[1]).remove();
    // 	}
    //
}
/*********显示页面仅仅显示返回按钮*******/
function replaceOptionDiv(backUrl) {
    $("#optionDiv")[0].innerHTML = "<a href='" + backUrl + "'>返回</a>";
}
/**************************打印函数*********************************/


function replaceHtmlForPrint() {
    $("printbtn").remove(); //删除控件
    // $("form").append("<input type='hidden' value='' name='printHtml' id='printHtml'>");
    var _input = document.createElement("input");
    _input.setAttribute("type", "hidden");
    _input.setAttribute("value", "");
    _input.setAttribute("name", "printHtml");
    _input.setAttribute("id", "printHtml");
    var _form = document.getElementsByName("form1")[0];
    _form.appendChild(_input);
    $("#printHtml").val($("html").html());
    $("form").attr("action", "../jquery1.5/UitlPrintHtml.jsp")
    removeScript();//删除打印功能在另存为页面多余的js下载
    _form.submit();
}
/*******打印功能在另存为是删除多余的js下载**********/
function removeScript(scriptNameList) {
    var scriptDom = document.getElementsByTagName("script");
    var scriptDomDeleteArray = [];
    for (var i = 0; i < scriptDom.length; i++) {
        if (scriptDom[i] && scriptDom[i].getAttribute("src") != null) {
            scriptDomDeleteArray.push(scriptDom[i]);
        }
    }
    for (var i = 0; i < scriptDomDeleteArray.length; i++) {
        var deleteScript = scriptDomDeleteArray[i];
        deleteScript.parentNode.removeChild(deleteScript);
    }
}


/*******防止下面菜单加载不成功显示问题重新************/
function showLinkMen(homePageLink, jsplogic) {
    var _html = "";
    if (homePageLink != undefined && homePageLink != null && homePageLink != "") {
        if (jsplogic == "print") {
            _html = "";
        }
        else if (jsplogic == "dis") {
            _html = "<a href=\"" + homePageLink + "\">返回</a>";
        }
        else if (jsplogic == "update" || jsplogic == "sb") {
            _html = "<a href=\"javascript:document.form1.reset()\">重写</a><A  href=\"javascript:f_sub()\">提交</A><a href=\"" + homePageLink + "\">返回</a>";
        }
        else {
            _html = "<a href=\"\"></a>";
        }
    }
    $("#optionDiv")[0].innerHTML = _html;

}

/*******打印功能在另存为是删除多余的js下载**********/
/*
	function removeScript(scriptNameList){
	
	var scriptDom=document.getElementsByTagName("script");
	var scriptDomDeleteArray=[];
	for(var i=0;i<scriptDom.length;i++)
	{  
		if(scriptDom[i]&&scriptDom[i].getAttribute("src")!=null)
		{
			scriptDomDeleteArray.push(scriptDom[i]);			
		}
	}
	while(scriptDomDeleteArray.length>0)
	{
		var deleteScript=scriptDomDeleteArray[scriptDomDeleteArray.length-1];
		    scriptDomDeleteArray.splice(scriptDomDeleteArray.length-1);
		    deleteScript.parentNode.removeChild(deleteScript);
	}
}*/
