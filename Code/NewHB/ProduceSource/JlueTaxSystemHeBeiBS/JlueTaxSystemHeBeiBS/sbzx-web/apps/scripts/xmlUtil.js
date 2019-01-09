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