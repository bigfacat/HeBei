/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-06-19
 * Time: 17:57
 * Description:
 */
// 工具函数
//关闭
$("a.closeWin").bind("click", function () {
    window.close();
});
// 添加错误提示样式
function SetErrors(_tr, _eq, _index) {
    _tr.eq(_eq).find('td').eq(_index).addClass("report_error");
}
// 去除错误样式
function removeErrors(_tr, _eq, _index) {
    var td = _tr.eq(_eq).find('td').eq(_index);
    if ($(td).hasClass("report_error")) {
        td.removeClass("report_error");
    }
}
// 获取input的内容
function getStr(_tr, _eq, _index) {
    var str = _tr.eq(_eq).find('td').eq(_index).find('input').val();
    return str;
}
// 获取input的值,用于计算
function getValue(_tr, _eq, _index) {
    var value = _tr.eq(_eq).find('td').eq(_index).find('input').val();
    if (isNaN(value)) value = 0;
    return Number(Number(value).toFixed(2));
}

// 获取input的值，用于转报文
function getBwValue(_tr, _eq, _index) {
    var value = _tr.eq(_eq).find('td').eq(_index).find('input').val();
    var val = parseFloat(value);
    if (val !== val) { // 如果是NaN 则转成空
        val = '';
    }
    return val;
}
// 获取select的值
function getSelectValue(_tr, _eq, _index) {
    var value = _tr.eq(_eq).find('td').eq(_index).find('select').val();
    if (isNaN(value)) value = 0;
    return Number(Number(value).toFixed(2));
}
// 获取选中的下拉框的内容
function getSelectStr(_tr, _eq, _index) {
    var text = _tr.eq(_eq).find('td').eq(_index).find('select').val();
    return text;
}
// 设置input 的值
function setValue(_tr, _eq, _index, _val) {
    var dom = _tr.eq(_eq).find('td').eq(_index).find('input');
    if (isNaN(dom.val())) {
        return;
    }
    if (!Number(_val)) {
        $(dom).attr('value', '0.00');
        return;
    }
    $(dom).attr('value', Number(_val).toFixed(2));
}
// input填写的数字进行校验和重置
function resetVal(dom, value) {
    if (isNaN(value)) {
        $(dom).attr("value", "0.00"); //如果填写的不是数字，则将该输入框的值置为 0.00
    } else {
        $(dom).attr("value", Number(value).toFixed(2));
    }
}
// 显示自定义遮罩
function showLoading(str) {
    if (str) {
        $('#loading-box-text').text(str);
    }
    $('.manual-modal').show();

}
// 关闭遮罩
function hideLoading() {
    $('.manual-modal').hide();
}
// xmldocument转成xml字符串
function turnXmlDocumentToXmlStr(XMLDOM) {
    var xml;
    if ('XMLSerializer' in window) {
        try {
            xml = $(XMLDOM).children()[0].xml || new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
        } catch (e) {

        }
    } else if (isIE) {
        xml = $(XMLDOM).children()[0].xml;
    }
    else {
        xml = $(XMLDOM).children()[0].outerHTML;
    }

    return xml;
}

function getHdXmlStr() {
    debugger;
    var hdxxData = mini.decode(SUI.store.get("hdxxData"));
    if (!!hdxxData) {
        var xmlDom = $.parseXML(hdxxData.HdxxXml);
        var sbzl = $(xmlDom).find('SBZL');
        $.each(sbzl, function (i, node) {
            var sbzlCode = $(node).find('SBZLCODE').text();
            if (sbzlCode !== '10101' && sbzlCode !== '10110') {
                $(node).remove();
            }
        });
        return turnXmlDocumentToXmlStr(xmlDom);
    } else {
        return null;
    }
}


var HD = mini.decode(SUI.store.get('HDXX_10101') || SUI.store.get('HDXX_10110'));
var pageUrl = window.location.href;
if (pageUrl.indexOf('correct=Y') !== -1) {
    var gzxx = JSON.parse(SUI.store.getSession('gzxx'));
    HD = JSON.parse(gzxx.hdxx).SBZL[0];
}

// 通过wsxx或者lsxx的CODE 获取 对应的 VALUE
function getHdValueByCode(code, type) {
    if (!HD) {
        return null;
    }
    var nodes, nodeValue = 0;
    if (type === 'wsxx') {
        nodes = HD.WSXXS.WSXX;
    } else if (type === 'lsxx') {
        if (!!HD.LSXXS.LSXX) {
            nodes = HD.LSXXS.LSXX;
        }
        else {
            return null;
        }
    } else {
        //window.console.log('getHdValueByCode方法第二个参数需要传入type为wsxx或lsxx');
        return null;
    }
    for (var i = 0; i < nodes.length; i++) {
        var _code = nodes[i].CODE,
            _value = nodes[i].VALUE;
        if (code == _code) {
            nodeValue = _value;
            break;
        }
    }
    return nodeValue;
}

