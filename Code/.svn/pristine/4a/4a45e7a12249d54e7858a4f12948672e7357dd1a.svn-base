__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("boot.js");

//debugger
mini_debugger = true;





//miniui
document.write('<script src="' + bootPATH + 'base1/jquery-1.6.2.min.js"		type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'base1/comm.js"					type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'sui/mini-all-min.js"			type="text/javascript" ></sc' + 'ript>');
document.write('<link href="' + bootPATH + 'sui/themes/default/miniui.css"	rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'sui/themes/default/plugin.css"	rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'sui/themes/icons.css"			rel="stylesheet" type="text/css" />');

document.write('<link href="' + bootPATH + 'sui/themes/hbwt/skin.css"	    rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'sui/themes/hbwt/button.css"	    rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'sui/themes/hbwt/slick.css"	    rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'sui/themes/hbwt/style.css"	    rel="stylesheet" type="text/css" />');


document.write('<!--[if IE 6]><script src="' + bootPATH + 'base/DD_belatedPNG.js"></sc' + 'ript><![endif]-->');
document.write('<!--[if IE 6]><script src="' + bootPATH + 'base/json2.js"></sc' + 'ript><![endif]-->');
document.write('<script src="' + bootPATH + 'sui/store.js"			type="text/javascript" ></sc' + 'ript>');

//网厅纳税人端公用js
document.write('<script src="' + bootPATH + 'pagejs/common/common.js"			type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'pagejs/common/StepNavFrameWork.js"			type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'pagejs/common/validate.js"			type="text/javascript" ></sc' + 'ript>');

//lodop 打印
document.write('<link href="' + bootPATH + 'sui/themes/hbwt/page_print.css"	    rel="stylesheet" type="text/css" />');
document.write('<script src="' + bootPATH + 'print/lodop/LodopFuncs.js"			type="text/javascript" ></sc' + 'ript>');

//防止兼容性模式
document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');


//skin
var skin = getCookie("miniuiSkin");
if (skin) {
    document.write('<link href="' + bootPATH + 'sui/themes/' + skin + '/skin.css" rel="stylesheet" type="text/css" />');
}


////////////////////////////////////////////////////////////////////////////////////////
function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}

/** added by lizm 2016-12-02
 * lodopPrint 重写了miniui部分样式
 * params：选择器，配置  如：lodopPrint('.print',{view:1})
 * 配置说明 见 printConfig{}
 */
function lodopPrint() {

    // 打印配置
    var printConfig = {
        direct: 1,       // 打印方向： 1 正向 2 横向，默认 1
        display: 1,      // 显示方向：1 正向显示，0 横向显示
        view: 1,         // 预览方式：0 适高，1 正常，2 适宽
        mode: '100%',    // 缩放比例：Full-Width 按整宽，会变形；Full-Height 按整高，会变形；Full-Page 按整页，会变形
        // Auto-Width 整宽不变形；Full-Height 整高不变形
        // Width：200%、Height：200%、Width：200%;Height：200%、200%
        style: ''        // 额外的css样式
    };
    $.extend(printConfig, arguments[1]);
    var LODOP = getLodop();
    var printHtml = $(arguments[0]).html();
    var cssStr = $(document.getElementsByTagName('style')).html(),
        strBodyStyle,
        strFormHtml,
        strStyleSheet;
    // 重写miniUi样式，使其适用于打印
    var styleStr = 'body{margin:0;padding:0;border:0;width:100%;background:#ffffff;}.mini-tabs-headers{display:none;}' +
        '.mini-grid-newRow{background:#ffffff;}.mini-grid-splitter{width:0;}.mini-grid-border{width:100%;}' +
        'input,.mini-textbox-border,.mini-textbox,.mini-textbox-input{border:none;}' +
        '.mini-datagrid,mini-tabs{width:1200px !important;margin:0 auto !important;}' +
        'table{border-collapse: collapse;border: 1px solid #000;}table tr td,table tr th{border: 1px solid #000;}' +
        '.mini-grid-border{border:1px solid #000;border-top:none}' + printConfig.style;

    strStyleSheet = '<link href="' + bootPATH + 'sui/themes/default/miniui.css"	rel="stylesheet" type="text/css" />';
    strBodyStyle = '<style>' + cssStr + styleStr + '</style>';
    strFormHtml = strStyleSheet + strBodyStyle + '<body>' + printHtml + '</body>';
    LODOP.PRINT_INIT("申请表打印"); //
    LODOP.SET_PRINT_PAGESIZE(printConfig.direct, 0, 0, "A4"); //A4纸张横向打印 第一个参数 1正向，2横向
    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", printConfig.display);// 1正向显示，0横向显示
    LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", printConfig.mode); // Auto-Width 整宽不变形
    LODOP.SET_PREVIEW_WINDOW(printConfig.view, 0, 0, 0, 0, "申请表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
    LODOP.ADD_PRINT_HTM("1mm", "2mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
    LODOP.PREVIEW(); // 打开打印预览窗口
}