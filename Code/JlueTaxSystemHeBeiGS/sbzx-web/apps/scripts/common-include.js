/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/**
 * Created by chenjunj on 2017/6/2 14:56.
 */
var header = function(){
    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    var loadHeader = function (url) {
        // 如果有参数指定初始化头或尾，则按参数来初始化
        var nsrxx = nsrxxUtil.getNsrxxVO('/sbzx-web/api/base1/nsrxx/get.ashx') || {};
        nsrxx.zgswjMc = getSwjgMc(nsrxx.zgswjDm);
        nsrxx.title = $('title').get(0).innerText;
        var tplUrl = '../../../apps/views/public1/head/HeadView.aspx';
        if(url){
            tplUrl = url;
        }
        var html = loadTemplate(tplUrl, nsrxx);
        $('body').prepend(html);
    };
    /**
     *  加载模版
     * @param url
     * @param Data
     * @returns {string}
     */
    var loadTemplate = function(url,Data) {
        var html='';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                if(!!Data){
                    try{
                        var reg = /(?:\{\{)(\w+(\.\w)*)(?:\}\})/g; // 匹配 {{ data.param }}
                        data = data.replace(reg, function(_, item) {
                            return eval("Data." + item);
                        });
                    } catch (e){
                        // TODO
                    }
                }
                html = data;
            },
            error: function () {
                console.log('加载html出错');
            }
        });
        return html;
    };
    var getSwjgMc = function (dm) {
        var result = null;
        ajax.get('/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG.ashx?dm='+dm,{},function (response) {
            result = response;
        },function (response) {
            mini.alert(response.message);
        });
        if(result && result.MC){
            return result.MC;
        }
        return '';
    };
    return {
        init: function (url) {
            loadHeader(url);
        }
    }
}();

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/21
 * Time：16:00
 *
 */

var xmlUtil = function () {
    // IE浏览器下 xmlDocument的不同版本
    var xmlDomVersions = ['MSXML2.DOMDocument.6.0', 'MSXML2.DOMDocument.3.0', "MSXML2.DOMDocument", 'Microsoft.XMLDOM'];
    // 将xml字符串载成xmlDocument
    var _turnStrToXml = function (xmlString) {
        var xmlDoc = null;
        //支持IE浏览器
        if (Tools.isIE && !window.DOMParser) {
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                    console.log('IE下解析XML字符串出错');
                }
            }
        }
        //非ie浏览器 , window.DOMParser 判断是否是非ie浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                xmlDoc = (new DOMParser()).parseFromString(xmlString, 'text/xml');
            } catch (e) {
                console.log('非IE下解析XML字符串出错');
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    };

    //解析XML文件
    var _loadXmlFile = function (xmlFile) {
        var xmlDoc = null;
        if (Tools.isIE && !window.DOMParser) {
            if (typeof arguments.callee.activeXString != 'string') {
                for (var i = 0; i < xmlDomVersions.length; i++) {
                    try {
                        new ActiveXObject(xmlDomVersions[i]);
                        arguments.callee.activeXString = xmlDomVersions[i];
                        break;
                    } catch (ex) {
                        //TODO
                    }
                }
            }
            xmlDoc = new ActiveXObject(arguments.callee.activeXString);
        }
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* document.implementation.createDocument('','',null); 方法的三个参数说明
                 * 第一个参数是包含文档所使用的命名空间URI的字符串；
                 * 第二个参数是包含文档根元素名称的字符串；
                 * 第三个参数是要创建的文档类型（也称为doctype）
                 */
                xmlDoc = document.implementation.createDocument('', '', null);
            } catch (e) {
                //TODO
            }
        }
        else {
            xmlDoc = null;
        }

        if (xmlDoc != null) {
            try {
                xmlDoc.async = false;
                xmlDoc.load(xmlFile);
            } catch (e) {
                //TODO
            }

        } else {
            console.log('加载的xml文件为空')
        }
        return xmlDoc;
    };

    //加载本地xml文件
    var _loadFileByPath = function (path, type) {
        var result = {};
        var _type = arguments.length == 2 ? arguments[1] : 'xml';
        $.ajax({
            url: path,
            type: 'GET',
            cache: false,
            dataType: _type,
            async: false,
            success: function (data) {
                result = data;
                if (Tools.isIE) {
                    try{
                        result.childNodes[0].xml = _loadXmlFile(path).xml;
                    }
                    catch (e){
                        //TODO
                    }
                }
            },
            error: function () {
                console.log('ajax请求本地xml文件失败');
            }
        });
        return result;
    };
    // xmldocument转成xml字符串
    var _turnXmlToStr = function (XMLDOM) {
        var xml;
        if ('XMLSerializer' in window) {
            if (Tools.isIE && Tools.browser.ie ==9) {
                xml = $(XMLDOM).children()[0].xml || new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            } else {
                xml = new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            }
        } else if (Tools.isIE) {
            xml = $(XMLDOM).children()[0].xml;
        }
        else {
            xml = $(XMLDOM).children()[0].outerHTML;
        }
        !xml && alert('XMLDocument转成String出错，请使用谷歌浏览器重试，或者请联系运维人员！');
        return xml;
    };


    /**
     *xml对象转json对象
     *xmlDom:xmlDocument 对象，必选参数
     *nodeName:节点路径('ROOT/ITEM') ，可选参数
     *isArray:true,强制返回数组对象，可选参数
     **/
    var _turnXmlToJson = function (xmlDom, nodeName, isArray) {
        var obj = [], // nodeName 'ROOT/ITEM'，在xml中找到对应的 xml 节点
            targetObj = {}, // xml 最终生成的目标 json
            nodeNames = ''; // 是否传入nodeName 'ROOT/ITEM'

        //递归解析xml 转换成json对象
        var getAllAttr = function (node) {
            var nodeObj = {}, // 存储 xml节点对应的 object
                nodeChild = [], // 存储 非文本节点
                nodeAttr = node.attributes, //节点的属性
                childLength,        // 子节点的长度
                attrLength = nodeAttr.length;  // 节点属性的长度

            for (var i = 0; i < node.childNodes.length; i++) {
                // 过滤掉文本节点
                if (node.childNodes[i].nodeName != '#text') {
                    nodeChild.push(node.childNodes[i]);
                }
            }
            // 新的节点数组的长度
            childLength = nodeChild.length;

            if (childLength > 0 || attrLength > 0) {
                // 如果节点有属性设置
                if (nodeAttr && nodeAttr != undefined) {
                    for (var j = 0; j < attrLength; j++) {//解析xml节点属性

                        nodeObj[nodeAttr[j].nodeName] = nodeAttr[j].nodeValue;
                    }
                }
                for (var k = 0; k < childLength; k++) {//解析xml子节点

                    var _nodeName = nodeChild[k].nodeName;


                    if (nodeObj[_nodeName] && nodeObj[_nodeName] != undefined) {//如果有重复的节点需要转为数组格式
                        if (!(nodeObj[_nodeName] instanceof Array)) {

                            nodeObj[_nodeName] = [nodeObj[_nodeName]];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                        }
                    }
                    var _nodeValue = getAllAttr(nodeChild[k]);
                    try {
                        nodeObj[_nodeName].push(_nodeValue);
                    } catch (e) {
                        nodeObj[_nodeName] = _nodeValue;
                        nodeObj["length"] = 1;
                    }
                }
            } else {
                nodeObj = (node.textContent == undefined) ? node.text : node.textContent;
            }
            return nodeObj;
        };
        // 如果有参数指定了节点名字
        if (nodeName) {
            if (nodeName.indexOf("/") != -1) {
                nodeNames = nodeName.split("/");
            } else {
                nodeNames = nodeName;
            }
        } else {
            obj = xmlDom;
        }
        // 将节点名压入数组
        for (var i = 0; i < nodeNames.length; i++) {
            obj.push($(xmlDom).find(nodeNames[i]));
        }
        // 节点数组循环转换成json
        $(obj).each(function (key, item) {

            // 如果目标json中已经存在该节点，将该节点转成 array，继续压入相同的节点
            if (targetObj[item.nodeName] && targetObj[item.nodeName] != undefined) {

                if (!(targetObj[item.nodeName] instanceof Array)) {

                    targetObj[item.nodeName] = [targetObj[item.nodeName]];
                }

                targetObj[item.nodeName].push(getAllAttr(item));

            } else { // 如果目标json中不存在该节点，则压入

                if (nodeNames.length > 0) {

                    targetObj[item.nodeName] = getAllAttr(item);
                } else {

                    targetObj[item.firstChild.nodeName] = getAllAttr(item.firstChild);
                }
            }
        });

        if (nodeNames.length > 1) {

            targetObj = targetObj[nodeNames[nodeNames.length - 1]];
        }
        // 根据参数isArray ，是否将 对象转成数组
        if (isArray && !(targetObj instanceof Array) && targetObj) {

            targetObj = [targetObj];
        }
        return targetObj;

    };
    return {
        //加载本地xml文件得到xmlDocument 对象:  path, type
        loadFileByPath: function () {
            return _loadFileByPath.apply(this, arguments);
        },
        // xmlDocument 对象 转成 xmlStr 字符串
        turnXmlToStr: function () {
            return _turnXmlToStr.apply(this, arguments);
        },
        // xmlStr字符串 加载成 XMLDocument 对象
        turnStrToXml: function () {
            return _turnStrToXml.apply(this, arguments);
        },
        // xmlDocument 对象转json （xml,nodeName,isArray）
        turnXmlToJson: function () {
            return _turnXmlToJson.apply(this, arguments);
        }
    }
}();
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/30
 * Time：16:33
 *
 */



var hdxxUtil=function () {

    var _getSbny = function() {
        var d = new Date();
        return d.getLastDateOfPrevMonth().format('yyyyMM');
    };
    var sbny = _getSbny();

    var sbzlDm = Tools.getUrlParamByName('sbzlDm')||Tools.getUrlParamByName('code')||'';
    var hdxxStore;
    // 核定信息
    var _getHdxx=function () {

        var hdxxData= null;
        if(hdxxStore){
            return hdxxStore;
        }
        if(hdxxData == null){
            var url = '../../../api/sb/common/get/hdxx.ashx';
            //var url = '../../data/hdxx.json';
            var params = {sbny: sbny};
            if (sbzlDm != '') {
                params.sbzlDm = sbzlDm;
            }
            mini.mask('期初数据获取中...');
            ajax.post(url, mini.encode(params), function (data) {
                // 返回成功，且有数据
                if(data.success && data.value){
                    if(data.value.sbzl[0].qccgbz=='N'){
                        var msg = data.value.sbzl[0].qccgbzms;
                        /*if(msg.indexOf('重复申报')>-1){
                            msg = msg + '<br/><a class="goToPay" href="https://ybs.he-n-tax.gov.cn:8888/BsfwtWeb/pages/jk/jk_jsxxcx.html">去缴款>></a>';
                        }*/
                        mini.alert(msg,'提示',function () {
                            window.close();
                        });
                        return false;
                    }else {
                        hdxxData = data.value;
                        hdxxStore = data.value;
                    }

                }else{
                    var msg = data.message;
                    if(msg.indexOf('小规模申报')>-1&&msg.indexOf('重复申报')>-1){
                        msg = msg + '<br/><a class="goToPay" href="https://ybs.he-n-tax.gov.cn:8888/BsfwtWeb/pages/jk/jk_jsxxcx.html">去缴款>></a>';
                        msg = msg + '<br/><a class="goToPay" href="../sbjgcx/sbjgcx.html?zsxmDm=10101">申报结果查询>></a>';
                    }else if(msg.indexOf('重复申报')>-1){
                        msg = msg + '<br/><a class="goToPay" href="https://ybs.he-n-tax.gov.cn:8888/BsfwtWeb/pages/jk/jk_jsxxcx.html">去缴款>></a>';
                    }
                    mini.alert(msg,'提示',function () {
                        window.close();
                    });
                    return false;
                }
            },function (data) {
                mini.alert(data.message,'提示',function () {
                    window.close();
                });
                return false;
            });
            mini.unmask();
        }

        return hdxxData;
    };
    // 核定信息中的申报种类节点
    var _getSbzlNode = function (hdxxData) {
        var hdxx = null;
        if(!!hdxxData){
            hdxx = hdxxData;
        }else{
            hdxx = _getHdxx();
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

    return{
        getHdxx:function () {
            return _getHdxx.apply(this,arguments)
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
    }
}();

/**
 * copy from sbcommon.js by chenjunj for normal report
 * */
var sbcommon = {};
/**
 * 正常框架申报提交
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} formulaData 页面公式对象
 * @param {object} htmlData 页面html对象
 * @param {array} j3xmls 金三报文数组
 * @param {string} sblxDm 申报类型代码 ：正常申报 11 ，更正申报 03 ， 往期申报 01
 * @param {string} pzxh 凭证序号 ：更正申报使用
 * @return {boolean}
 * */
sbcommon.sbtj_normal = function (djxh, sbzlDm, sssqq, sssqz, formulaData, htmlData, j3xmls,sblxDm,pzxh) {
    var url = '/sbzx-web/api/sb/common/submit/sbcl';
    var request={
        djxh: djxh,
        sblxDm:sblxDm,
        pzxh:pzxh,
        sssqq:sssqq,
        sssqz:sssqz,
        formulaData: mini.encode(formulaData),
        sbformdata: mini.encode(htmlData),
        sbzlDm:sbzlDm,
        sbwjs:mini.encode(j3xmls)
    };
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架申报提交
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {array} j3xmls 特殊处理的金三报文数组
 * @return {boolean}
 * */
sbcommon.sbtj_year = function (djxh, sbzlDm, sssqq, sssqz, j3xmls) {
    var url = '/sbzx-web/api/sb/common/submit/sbcl/zlk';
    var request={
        djxh: djxh,
        sssqq:sssqq,
        sssqz:sssqz,
        sbformdata:'',
        sbzlDm:sbzlDm,
        sbwjs:mini.encode(j3xmls)
    };
    return Api.getIfSuccess(url, request);
};
/**
 * 申报提交
 * @param {string} url api接口
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} htmlData 页面html对象
 * @param {array} j3xmls 金三报文数组
 * @return {boolean}
 * */
sbcommon.sbtj = function (url, djxh, sbzlDm, sssqq, sssqz, htmlData, j3xmls) {
    var request={
        djxh: djxh,
        sssqq:sssqq,
        sssqz:sssqz,
        sbformdata:htmlData?mini.encode(htmlData):'',
        sbzlDm:sbzlDm,
        sbwjs:mini.encode(j3xmls)
    };
    return Api.getIfSuccess(url, request);
};
/**
 * 正常框架申报暂存
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} htmlData 页面html对象
 * @param {array} formulaData 公式数组
 * @return {boolean}
 * */
sbcommon.tempSave_normal = function (djxh, sbzlDm, sssqq, sssqz, htmlData, formulaData) {
    var jsonData = {
        htmlData: mini.encode(htmlData),
        formulaData: mini.encode(formulaData)
    };
    var request = {
        "djxh": djxh,
        "sbzlDm": sbzlDm,
        "sssqQ": sssqq,
        "sssqZ": sssqz,
        "jsonData": jsonData
    };
    // sessionStorage.setItem('tempsaveData',mini.encode(request));//用于本地测试
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/fnb/sbzc';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架申报暂存
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} bbid 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} htmlData 页面html对象
 * @param {array} formulaData 公式数组
 * @return {boolean}
 * */
sbcommon.tempSave_year = function (djxh, sbzlDm, bbid, sssqq, sssqz, htmlData, formulaData) {
    var jsonData = {
        htmlData:mini.encode(htmlData),
        formulaData: mini.encode(formulaData)
    };
    var request = {
        "djxh": djxh,
        "sbzlDm": sbzlDm,
        "bbid": bbid,
        "sssqQ": sssqq,
        "sssqZ": sssqz,
        "jsonData": jsonData
    };
    // sessionStorage.setItem('tempsaveData',mini.encode(request));//用于本地测试
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/nb/sbzc';
    return Api.getIfSuccess(url, request);
};

/**
 * @param {string} djxh 登记序号
 * 年报框架单表保存（单表暂存也用该方法）
 * @param {string} sbzlDm 申报种类代码
 * @param {string} bbid 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} checkData 用于表间取数和校验的数据
 * @param {object} htmlData 页面html对象
 * @param {array} formulaData 公式数组
 * @param {array} j3xmlData 金三报文数组
 * @return {boolean}
 * */
sbcommon.singleSave_year = function (djxh, sbzlDm, bbid, sssqq, sssqz, checkData, htmlData, formulaData, j3xmlData) {
    var jsonData = {
        htmlData: mini.encode(htmlData),
        formulaData: mini.encode(formulaData),
        j3xmlData: mini.encode(j3xmlData)
    };
    var request = {
        "djxh": djxh,
        "sbzlDm": sbzlDm,
        "bbid": bbid,
        "sssqQ": sssqq,
        "sssqZ": sssqz,
        "checkData": mini.encode(checkData),
        "jsonData": jsonData
    };
    // sessionStorage.setItem('tempsaveData',mini.encode(request));//用于本地测试
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/nb/sbbc';
    return Api.getIfSuccess(url, request);
};

/**
 * 正常框架获取暂存数据
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @return {object}
 * */
sbcommon.getResumeData_normal = function (djxh, sbzlDm, sssqq, sssqz) {
    // return mini.decode(sessionStorage.getItem('tempsaveData'));//用于本地测试
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        sssqQ: sssqq,
        sssqZ: sssqz
    };
    var url = '/sbzx-web/api/sb/common/fnb/getSbsj';
    return Api.getData(url, request);
};

/**
 * 年报框架获取暂存数据
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} bbid 报表id
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @return {object}
 * */
sbcommon.getResumeData_year = function (djxh, sbzlDm, bbid, sssqq, sssqz) {
    // return sessionStorage.getItem('tempsaveData');//用于本地测试
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        bbid: bbid,
        sssqQ: sssqq,
        sssqZ: sssqz
    };
    var url = '/sbzx-web/api/sb/common/nb/getSbsj';
    return Api.getData(url, request);
};

/**
 * 年报框架获取列表数据
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @return {object}
 * */
sbcommon.getListData = function (djxh, sbzlDm, sssqq, sssqz) {
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        sssqQ: sssqq,
        sssqZ: sssqz
    };
    var url = '/sbzx-web/api/sb/common/initrules';
    return Api.getData(url, request);
};
/**
 * 年报框架查看时获取列表数据
 * @param {string} sbxh 申报序号
 * @param {string} qqwjm 请求文件名
 * @return {object}
 * */
sbcommon.getPreviewListData = function (sbxh,qqwjm) {
    var request = {
        sbxh: sbxh,
        qqwjm: qqwjm
    };
    var url = '/sbzx-web/api/sb/jgcx/getYtxsblb';
    return Api.getData(url,request,'post',true);
};
/**
 * 年报框架更新列表数据
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {array} changeList 数据改变的表对象数组
 * @return {boolean}
 * */
sbcommon.updateListData = function (djxh, sbzlDm, sssqq, sssqz, changeList) {
    // return true;//用于本地测试
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        sssqQ: sssqq,
        sssqZ: sssqz,
        sbData: changeList
    };
    var url = '/sbzx-web/api/sb/common/updaterules';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架删除单表数据
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} bbid 报表id
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @return {boolean}
 * */
sbcommon.deleteSingleTableData = function (djxh, sbzlDm, bbid, sssqq, sssqz) {
    // return true;//用于本地测试
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        bbid: bbid,
        sssqQ: sssqq,
        sssqZ: sssqz
    };
    var url = '/sbzx-web/api/sb/common/sbzc/detelesbb';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架获取需要特殊处理且页面sb_data中没有的j3报文
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {array} resumeXmlBbids 报表id数组
 * @return {array}
 * */
sbcommon.getResumeJ3Xmls = function (djxh, sbzlDm, sssqq, sssqz, resumeXmlBbids) {
    var request = {
        djxh: djxh,
        sbzlDm: sbzlDm,
        sssqQ: sssqq,
        sssqZ: sssqz,
        bbids: resumeXmlBbids
    };
    var url = '/sbzx-web/api/sb/common/getJ3xml/tscl';
    return Api.getData(url, request);
};
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */

var Api = {
    /**
     * 代码转名称的api接口映射
     * */
    dmToMcMap: {
        'hy': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_HY?dm=',//取 行业 名称
        'djzclx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_DJ_DJZCLX?dm=',//取 登记注册类型 名称
        'zzsqylx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_ZZSQYLX?dm=',//取 增值税企业类型 名称
        'swjg': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG.ashx?dm=',//取 税务机关 名称
        'yhhb': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_YHHB?dm=',//取 银行行别 名称
        'qgxzqh': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_QGXZQH?dm='//取 全国行政区划 名称
    },
    getUrl: function (obj, name) {
        for (var url in obj) {
            if (url == name) {
                return obj[name];
                break;
            }
        }
        return this;
    },
    replaceUrl: function (url,name, data) {
        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
        url = url.replace(reg, function(_, item) {
            if(typeof data=='object'){
                return eval('data.' + item);
            }else if(typeof data=='string'){
                return item
            }else if(typeof data=='array'){
                return eval('data[' + item + ']');
            }

        });
        return url;
    },
    /**
     * 获取数据接口（适用于只取返回数据的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {string} type http请求类型post/get
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {object}
     * */
    getData: function (url,request,type,errorToClose) {
        var result = null;
        if(!url){
            return result;
        }
        request = request?request:{};
        type = type?type.toLowerCase():'post';
        errorToClose = !!errorToClose;
        var _this = this;
        if(type === 'post'){
            ajax.post(url, mini.encode(request), function (response) {
                if(response.success){
                    result = response.value;
                }else{
                    mini.alert(response.message,'提示',function () {
                        errorToClose && _this.closeWindow();
                    });
                }
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            });
        }else{
            ajax.get(url,mini.encode(request), function (response) {
                result = response;
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            })
        }

        return result;
    },
    /**
     * 获取接口返回成功与否（适用于只取返回数据中success字段的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {boolean}
     * */
    getIfSuccess: function (url, request,errorToClose) {
        var result = false;
        if(!url){
            return result;
        }
        errorToClose = !!errorToClose;
        var _this = this;
        ajax.post(url, mini.encode(request), function (response) {
            if(response.success){
                result = true;
            }else{
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            }
        }, function (response) {
            mini.alert(response.message,'提示',function () {
                errorToClose && _this.closeWindow();
            });
        });
        return result;
    },
    /**
     * 获取纳税人存款账户信息
     * */
    getNsrckzhxx: function () {
        var url = '/sbzx-web/api/base/nsrckzhxx/get';
        var obj = this.getData(url,null,'get');
        if(!obj || !obj.value){
            return null;
        }
        return obj.value;
    },
    /**
     * 通过代码获取名称
     * */
    getMcByDm: function (type, dm) {
        var url = this.dmToMcMap[type]+dm;
        if(!url){
            return '';
        }
        var obj = this.getData(url,null,'get');
        if(!obj){
            return '';
        }
        return obj.MC;
    },
    /**
     * 关闭页面
     * */
    closeWindow: function () {
        if (window.CloseOwnerWindow)
            return window.CloseOwnerWindow();
        else
            window.close();
    }
};