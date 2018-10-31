var reportUtil = (function () {

    //将xml格式的字符串转成xml对象
    var loadXML = function (xmlString) {
        var xmlDoc = null;
        //判断浏览器的类型
        //支持IE浏览器 
        if (!!window.ActiveXObject || "ActiveXObject" in window) {   //window.DOMParser 判断是否是非ie浏览器
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

    var input,
        output,
        turnArr,
        inputArr,
        outputArr;

    //SB_NSSBB_MXXX.[0].0 to body.sb_nssbb.mxxx.[0].0		
    function _turn(_str) {
        turnArr = _str.split(' to ');
        inputArr = turnArr[0].split('.');
        outputArr = turnArr[1].split('.');

        var outputDom = getLocal(outputArr, output);
        if (turnArr[0].indexOf(')') > 0) {
            var val = turnArr[0].replace('(', '').replace(')', '');
            $(outputDom).text(val);
            return;
        }
        var re;
        var inputDom = getLocal(inputArr, input);
        if (inputDom.length > 1) {
            $.each(inputDom, function (i, v) {
                re = v.text();
                if (v.text() == '--' || v.text() == null) {
                    re = '';
                }
                outputDom[i].text(re)
            })
        } else {
            //		 //console.log(inputDom.html())
            re = inputDom.text();
            //	 //console.log(re)
            if (inputDom.text() == '' || inputDom.text() == '--' || inputDom.text() == null) {
                re = '';
            }
            $(outputDom).text(re)
        }

    }
    function getLocal(_arr, xml) {
        var result = xml;
        var temp;
        var arrtemp = [],
			dom;
        //	//console.log(_arr)
        $.each(_arr, function (i, v) {
            if (v.indexOf(']') > 0) {
                temp = v.replace('[', '').replace(']', '');
                result = $(result).eq(parseInt(temp));

            } else if (!isNaN(v)) {
                result = $(result).children().eq(parseInt(v));
            } else if (v.indexOf('-') > 0) {
                temp = v.split('-');
                $.each(temp, function (index, val) {
                    dom = $(result).children().eq(parseInt(val));
                    arrtemp.push(dom);
                })
                result = arrtemp;
            } else {
                result = $(result).find(v);
            }
        })
        return result;
    }


    //扩展xml
    var _extendXML = function (_index, select, _xml, xmldom) {
        var xml = typeof _xml == 'object' ? _xml : loadXML(_xml);
        ////console.log(xml)
        var dom = $(xml).find(xmldom);
        var length = _index || dom.length;

        var domlength = 0, value, index;
        $.each(select, function (i, v) {
            value = $(v).val();
            //compareIndex = select.index($(v));
            if (value != "") {
                domlength++;
            }
        })
        if (domlength <= length) return xml
        //	//console.log(domlength-length)
        var html = dom[0].outerHTML;
        index = domlength - length;
        for (var i = 0; i < index; i++) {
            dom.parent().append(html);
        }
        return xml;

    }
    var _match = function (_str, $index) {
        var _turnArr = _str.split(' to '),
            _inputArr = _turnArr[0].split('.');
        _outputArr = _turnArr[1].split('.');
        var oldDom = getLocal(_inputArr, input),
			newDom = getLocal(_outputArr, output);
        var result = oldDom.length;
        if ((newDom.length - $index) - oldDom.length < 0) {
            var index = oldDom.length - (newDom.length - $index),
                html = newDom[$index].outerHTML;
            for (var i = 0; i < index; i++) {
                newDom.eq(0).parent().append(html);
            }
        }
        return result;
    }


    return {
        setIn_OutXML: function () {
            var _in = arguments[0],
                _out = arguments[1];
            input = typeof _in == 'object' ? _in : loadXML(_in);
            output = typeof _out == 'object' ? _out : loadXML(_out);
        },
        turn: function (str) {
            _turn(str);
        },
        end: function () {
            return output;
            ////console.log(output)
            //return output;
        },
        extendXML: function () {
            var result = _extendXML.apply(this, arguments);
            return result;
        },
        match: function () {
            return _match.apply(this, arguments);
        }


    }





})()