var Servyou = {};
Servyou.tool = (function () {
    var _loadXML = function (xmlString) {
        var xmlDoc = null;
        //判断浏览器的类型
        //支持IE浏览器
        if (!window.DOMParser && window.ActiveXObject) {   //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                }
            }
        }
            //支持Mozilla浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
				 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
				 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
				 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
				 */
                domParser = new DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            } catch (e) {
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    }

    /**
	 * 加载本地文件
	 * @param:  path(路径),type(默认为xml)
	 * */
    var _loadFileByPath = function (path, type) {
        var result;
        var _type = arguments.length == 2 ? arguments[1] : 'xml';
        $.ajax({
            url: path,
            type: 'GET',
            dataType: _type,
            async: false,
            success: function (data) {
                result = data;
            },
            error: function () {
                $.noop();
            }
        })
        return result;
    }
    /**
	 * 去除数组中的空元素
	 * */
    var _ArrGrep = function (arr) {
        if (!$.isArray(arr)) return [];
        var tempArr = [];
        $.each(arr, function (i, v) {
            v != '' && tempArr.push(v);
        })
        return tempArr;
    }
    /**
	 * 数字转换数组 例如 传入2,6. 则返回[2,3,4,5,6]
	 * @param 起始数字，结尾数字
	 * **/
    var _MakeArr = function (s, e) {
        if (isNaN(s) || isNaN(e)) return [];
        var start = parseInt(s),
			end = parseInt(e);
        var result = [];
        for (var i = start; i < end + 1; i++) {
            result.push(i);
        }
        return result;
    }
    /**
	 * 去除数组的重复项
	 * @param :Array
	 * */
    var _unique = function (arr) {
        var newArr = arr.concat(),
			result = [];
        for (var i = 0; i < newArr.length; i++) {
            var tar = arr.shift();
            if ($.inArray(tar, arr) < 0) {
                result.push(tar);
            }
        }
        return result;
    }
    /**
	 * 日期格式化  20151212 ---2015-12-12或 2015年12月12日
	 * @param  date ,分隔符（默认为年月日）
	 * */
    var _dateFomat = function (date, dot) {
        var _date = date;
        _date = _date.toString();
        if (_date.length != 8) {
            return _date;
        }
        if (dot) {
            _date = _date.charAt(0) + _date.charAt(1) + _date.charAt(2) + _date.charAt(3) + dot +
					_date.charAt(4) + _date.charAt(5) + dot +
					_date.charAt(6) + _date.charAt(7);
        } else {
            _date = _date.charAt(0) + _date.charAt(1) + _date.charAt(2) + _date.charAt(3) + '年' +
					_date.charAt(4) + _date.charAt(5) + '月' +
					_date.charAt(6) + _date.charAt(7) + '日';
        }
        return _date;
    }
    /**
	 * 弹出框
	 * @param  弹出内容 ,title（默认“提示”）可不传，回调{confirm:function(){},cancel:function(){}}
	 * */
    var _showAlert = function () {
        var msg = arguments[0];
        var $title = "提示", fun = '';
        if (arguments.length == 3) {
            $title = typeof arguments[1] == 'string' ? arguments[1] : $title;
            fun = typeof arguments[2] == 'object' ? arguments[2] : $title;
        } else if (arguments.length == 2) {
            $title = typeof arguments[1] == 'string' ? arguments[1] : $title;
            fun = typeof arguments[1] == 'object' ? arguments[1] : $title;
        }
        var arr = msg.split('】');
        var save = [];
        var temp, value;
        var result = msg
        $.each(arr, function (i, v) {
            temp = v.match(/【.*/g);
            save.push(temp);
        })
        $.each(save, function (i, v) {
            if (!v) return false;
            temp = v[0].replace('【', '');
            try {
                value = eval(temp);
            }
            catch (e) {
                value = temp;
                console.log(e);
            }
            result = result.replace(temp, value);
        })
        if ($(".sb_alert").length > 0) {
            $('body .sb_alert').show();
            $('body .sb_alert').find('.sb_alert_content').html(result);
            $('body .sb_alert').find('.sb_alert_title b').html($title);
        } else {
            var alert_box = '<div class="sb_alert">' +
    							'<div class="sb_alert_title">提醒    <b>' + $title + '</b></div>' +
    							'<div class="sb_alert_content" style="overflow-y:auto;line-height: 20px;">' + result + '</div>' +
    							'<div class="sb_alert_footer"><span class="sure" style="margin-right:22px;">确认</span><span>取消</span></div>' +
    						'</div>';
            $('body').append(alert_box);
        }
        $('body .sb_alert .sb_alert_footer span').unbind('click').bind('click', function () {
            if ($(this).hasClass('sure')) {
                typeof fun.confirm == 'function' && fun.confirm();
            } else {
                typeof fun.cancel == 'function' && fun.cancel();
            }
            $('body .sb_alert').hide();
        })

    }
    var _getValByHD = function () {
        var reportHD = typeof arguments[0] == "string" ? _loadXML(arguments[0]) : arguments[0];
        var str = arguments[1];
        var _arr = str.replace('|', '').split('.');
        var temp;
        var result = $(reportHD);
        var arrtemp = [],
			dom;
        //	console.log(_arr)
        $.each(_arr, function (i, v) {
            if (v.indexOf(']') > 0) {
                temp = v.replace('[', '').replace(']', '');
                var key = temp.split("=")[0];
                var value = temp.split("=")[1];
                $.each($(result).children(), function (j, p) {
                    if ($(this).find(key).text() == value) {
                        result = $(this);
                        return false;
                    }
                })

            } else if (v == "") {
                return false
            } else {
                result = $(result).find(v);
            }
        })
        return result.text() == "" || result.length > 1 ? 0 : result.text();

    }
    return {
        //加载本地文件:  path, type
        loadFileByPath: function () {
            return _loadFileByPath.apply(this, arguments);
        },
        //去除数组的空值:   array
        arrGrep: function () {
            return _ArrGrep.apply(this, arguments);
        },
        // 数字转换数组 例如 传入2,6. 则返回[2,3,4,5,6]
        makeArr: function () {
            return _MakeArr.apply(this, arguments);
        },
        //去除数组的重复项  array
        unique: function () {
            return _unique.apply(this, arguments);
        },
        //日期格式化  20151212 ---2015-12-12或 2015年12月12日 
        // @param:  date ,分隔符（默认为年月日）
        dateFomat: function () {
            return _dateFomat.apply(this, arguments);
        },
        //弹出框 @param  弹出内容 ,title（默认“提示”）可不传，回调{confirm:function(){},cancel:function(){}}
        showAlert: function () {
            _showAlert.apply(this, arguments);
        },
        ifIE: function () {
            if ((navigator.userAgent.indexOf('MSIE') >= 0)
				&& (navigator.userAgent.indexOf('Opera') < 0)) {
                return true;
            }
            return false;
        },
        loadXML: function () {
            return _loadXML.apply(this, arguments);
        },
        getValByHD: function () {
            return _getValByHD.apply(this, arguments);
        }

    }
})()
