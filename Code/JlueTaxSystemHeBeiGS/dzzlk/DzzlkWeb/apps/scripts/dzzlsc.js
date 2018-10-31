var pageContext = {
    dzzlPath: "/",
    context: "",
    order: "0",
    size: "100"
};

$(function () {
    if( location.href.match('noSubBtn') ){
	    $('#qd').hide()
    };
    
    initSctp();
	getCapacity();
    function isInstallFlashForIe() {
        $("body")
            .append(
                '<div style=\"position: absolute;top:10px;left:280px\">检测到您的浏览器没安装flash，如需使用上传图片功能请点击安装<a href=\"https://get.adobe.com/cn/flashplayer/\" style=\"color:#0078a5;text-decoration:underline\" target=\"_blank\">https://get.adobe.com/cn/flashplayer/</a>，安装完成后刷新本页面</div>');
    }

    // 判断浏览器是否安装了flash
    var isIE = !-[1,];
    if (isIE) {
        try {
            var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            // alert('安装了Flash');
        } catch (e) {
            // alert('没有安装Flash');
            isInstallFlashForIe();
        }
    } else {
        try {
            var swf2 = navigator.plugins['Shockwave Flash'];
            if (swf2 == undefined) {
                // alert('没有安装Flash');
                isInstallFlashForIe();
            } else {
                // alert('安装了Flash');
            }
        } catch (e) {
            // alert('没有安装Flash');
            isInstallFlashForIe();
        }
    }

    searchUploadList(pageContext);
    /*
     * var filepath = encodeURI("/吴海明的私房照/"); var params = { // 参数列表:
     * 申请序号、附报资料DM、税务事项代码、纳税人识别号、老的申请序号、未知、附报资料明细序号 serverUrl :
     * "/api/dzzl/upload?filepath=" + filepath, jsFunction : "flashReturn",
     * imgWidth : 1000, imgHeight : 1200, imgQuality : 100, btnText : '上传图片',
     * wmode : "transparent" }; var params1 = { wmode : "transparent" };
     */

});

var selectFileKeyArray = new Array();
var selectFolerNameArray = new Array();
/** 当前窗口所有图片Object */
var dqckTpObject = new Object();
var fbzldm;
var fbzlmc;
var fbzlxh;
var nsrsbh;
var swsxdm;
var sqxh;
var mark = false;
// 补录资料标志-是否已经进行过上传附报资料的操作
var blzlbz = false;
/**
 * 定义上一个页面传过来的变量
 */
function SetData(data) {
    var data = mini.clone(data);
    fbzldm = data.fbzldm;
    fbzlmc = data.fbzlmc;
    fbzlxh = data.fbzlxh;
    nsrsbh = data.nsrsbh;
    swsxdm = data.swsxdm;
    sqxh = data.sqxh;
}

// 获取容量
function getCapacity(){
	$.get('/dzzlk/api/dzzl/queryCapacity.ashx', function(data){
		if( !data.success ){
			mini.alert( data.message );
			return;
		}
		var capacity = data.data;  // Number(data.data) * 100

		$('.used').css({
			width: capacity + '%'
		});
		var tip = '';
		if( capacity > 100){
			capacity = 100;
		}
		if( capacity >= 80 ){
			tip = '，请删除不再使用的文件';
		}
		$('.progress-bar .text').text('已使用 ' + capacity + '%' + tip );
	});
}
/**
 * 上传图片
 */
function sc() {
    if (selectFileKeyArray.length == 0) {
        mini.alert("未选择上传图片");
    } else {
        CloseWindow(mini.encode(selectFileKeyArray));
        // // var qdButton = mini.get("qd");//不允许再次按确定了，此时正在上传，易出错
        // // qdButton.disable();
        // info = mini.encode(selectFileKeyArray);
        // var coo = getCookie("b");
        // if(!!coo){
        //     setCookie("b", coo + "," + info.substring(1, info.toString().length-1));
        // }else {
        //     setCookie("b", info.substring(1, info.toString().length-1));
        // }
    }
}
//
// function setCookie(name,value)
// {
//     var exp = new Date();
//     exp.setTime(exp.getTime() + 20*60*1000);
//     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
// }
// function getCookie(name)
// {
//     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//     if(arr=document.cookie.match(reg))
//         return unescape(arr[2]);
//     else
//         return null;
// }
// function delCookie(name)
// {
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval=getCookie(name);
//     if(cval!=null)
//         document.cookie= name + "="+cval+";expires="+exp.toGMTString();
// }

function flashReturn() {
    if (mini.decode(mini.decode(arguments)[1]).success == true) {
        ////console.log("success");
        searchUploadList(pageContext);
    } else if (mini.decode(mini.decode(arguments)[1]).success == false) {
        mini.alert(mini.decode(mini.decode(arguments)[1]).message);
    } else {
        mini.alert("上传出错");
    }
}

// 打开上传页面
function dkscy() {
    mini.open({
        url: "scwjSwf.jsp",
        title: "上传资料",
        allowResize: false,
        width: 680,
        height: 400,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = {
                dzzlPath: pageContext.dzzlPath
            };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function () {
            var iframe = this.getIFrameEl();
            var data = iframe.contentWindow.GetData();
            searchUploadList(pageContext);
        }
    });
}

function initSctp() {
    /*
     * var params = { // 参数列表: 申请序号、附报资料DM、税务事项代码、纳税人识别号、老的申请序号、未知、附报资料明细序号
     * serverUrl : "/api/dzzl/upload?filepath=" +
     * encodeURI(pageContext.dzzlPath), jsFunction : "flashReturn", imgWidth :
     * 1000, imgHeight : 1200, imgQuality : 100, btnText : '上传图片', wmode :
     * "transparent" }; var params1 = { wmode : "transparent" };
     *
     * swfobject.embedSWF("../../../js/scripts/flash/imgZipUpload.swf",
     * "divFlash23", "80", "34", "10",
     * "../../../js/scripts/flash/expressInstall.swf", params, params1);
     */
}

function zgMenu(menuString) {
    selectFileKeyArray.clear();
    selectFolerNameArray.clear();
    // <span><a href="javascript:turnFolder('/');">根目录</a></span>>>>>
    var length = menuString.length;
    var root = "/"
    var munuHtml = '<span><a href="javascript:turnFolder(\'' + root
        + '\');">我的资料库</a></span>&nbsp';
    if (length == 1) {
        // return;
    } else {
        var menuArray = menuString.substring(2, menuString.length).split('/');

        for (var i = 0; i < menuArray.length; i++) {

            if (menuArray[i] == "" || menuArray[i] == null) {
                continue;
            }

            root = root + "/" + menuArray[i];
            munuHtml += ' <i class="icon-caret-right"></i> <span><a href="javascript:turnFolder(\''
                + root + '\');">' + menuArray[i] + '</a></span>&nbsp;'
        }

    }

    $("#menu").html(munuHtml);
}

function turnFolder(dzzlPath) {
    pageContext.dzzlPath = dzzlPath;
    initSctp();
    searchUploadList(pageContext);
}

function ifDeleteFolderOrNot() {

    if (selectFolerNameArray.length == 0) {
        mini.alert("请选择你要删除的文件夹");
        return false;
    }

    mini.confirm('确定删除选中目录？', '删除', function (action) {
        if (action == 'ok') {
            deleteFolder()
        }
    });
}

function deleteFolder() {

    var foldername = selectFolerNameArray[0];

    $.ajax({
        url: '/dzzlk/api/dzzl/deletefolder',
        data: {
            foldername: foldername,
            folderpath: pageContext.dzzlPath
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        showMask: true,
        maskMassage: "处理中, 请稍等 ...",
        success: function (result) {
            if (!result.success) {
                if (result.messageCode == "0") {
                    mini.alert("请先删除目录内文件。");
                    return;
                }
                mini.alert(result.message);
                return;
            }
            searchUploadList(pageContext);
        },
        error: function (e) {
            //console.error(e);
        }
    });
}

function ifDeleteFileOrNot() {

    var length = selectFileKeyArray.length;

    if (length == 0) {
        mini.alert("请选择你要删除的文件。");
        return false;
    }
    if (length > 1) {
        mini.alert("只能选择一张图片进行删除操作。");
        return false;
    }

    mini.confirm('确定删除选中资料？', '删除', function (action) {
        if (action == 'ok') {
            deleteFile()
        }
    });
}

function deleteFile() {

    var otherXx = selectFileKeyArray[0];

    var fileKey = otherXx.fileKey;

    $.ajax({
        url: '/dzzlk/api/dzzl/deletefile?filekey=' + fileKey,
        data: {},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        showMask: true,
        maskMassage: "处理中, 请稍等 ...",
        success: function (result) {
            if (!result.success) {
                mini.alert(result.message);
                return;
            }
            searchUploadList(pageContext);
        },
        error: function (e) {
            //console.error(e);
        }
    });

}

function writeFolder() {
    mini.prompt('目录名', '目录名', function (action, value) {
        if (action == 'ok') {
            createFolder(value);
        }
    })
}

function createFolder(foldername) {
    // var foldername = mini.get("foldername").getValue();

    if (foldername == "" || foldername == null) {
        // mini.alert("请输入所创建的目录名。");
        return false;
    }
    $.ajax({
        url: '/dzzlk/api/dzzl/createfolder',
        data: {
            foldername: foldername,
            folderpath: pageContext.dzzlPath
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        showMask: true,
        maskMassage: "处理中, 请稍等 ...",
        success: function (result) {
            if (!result.success) {
                mini.alert(result.message);
                return;
            }
            // mini.get("foldername").setValue("");
            searchUploadList(pageContext);
        },
        error: function (e) {
            //console.error(e);
        }
    });
}

/**
 * 查询曾经上传过的图片
 *
 * @return
 */
function searchUploadList(pageContext) {

    $.ajax({
        url: '/dzzlk/api/dzzl/show.ashx',
        data: {
            dzzlPath: pageContext.dzzlPath,
            context: pageContext.context,
            order: pageContext.order,
            size: pageContext.size
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        showMask: true,
        maskMassage: "查询中, 请稍等 ...",
        success: function (result) {
            if (!result.success) {
                if (result.messageCode != "80424601") {// 第一次登陆还没有创建目录，此时没有这个税号的文件夹，会报错，报错code：80424601，此种情况需要屏蔽掉。
                    mini.alert(result.message);
                    return;
                }
            } else {
                // 查询成功，更新菜单标签
                zgMenu(pageContext.dzzlPath);

                dqckTpObject = new Object();
                var dzzlinfo = mini.decode(result.data);
                var infos = dzzlinfo.infos;
                var str = '<ul>';
                for (var i = 0; i < infos.length; i++) {
                    var file = infos[i];
                    
                    if (!file.fileKey) {
                        str = str + getFolderHtml(file.name);
                    } else {
                        file.filesizeKb = (file.filesize / 1024).toFixed(2);
                        dqckTpObject[file.fileKey] = file;
                        str = str + getImgHtml(file.name, file.access_url, file.fileKey, file.type);
                    }
                }
                str = str + '</ul>';
                $(".list").html(str);
            }
        },
        error: function (e) {
            //console.error(e);
        }
    });
}

function checkFolder(object) {
    var _checked = $(object);
    if (object.checked == "true") {
        _checked.removeClass("checked");
        _checked.addClass("unchecked");
        object.checked = "false";
        var fileFolderName = object.getAttribute("id");
        selectFolerNameArray.pop(fileFolderName);
    } else {
        if (selectFolerNameArray.length >= 1) {
            mini.alert("只能选择一个文件夹进行操作。");
            return false;
        }
        _checked.removeClass("unchecked");
        _checked.addClass("checked");
        object.checked = "true";
        var fileFolderName = object.getAttribute("id");
        selectFolerNameArray.push(fileFolderName);
    }
}

function checkImg(object) {
    var _checked = $(object);
    if (object.checked == "true") {
        _checked.removeClass("checked");
        _checked.addClass("unchecked");
        object.checked = "false";
        var fileKey = object.getAttribute("id");
        var fileName = object.getAttribute("name");
        selectFileKeyArray.pop({"fileKey":fileKey, "fileSize":dqckTpObject[fileKey].filesizeKb,
            "fileName":fileName});
    } else {
        _checked.removeClass("unchecked");
        _checked.addClass("checked");
        object.checked = "true";
        var fileKey = object.getAttribute("id");
        var fileName = object.getAttribute("name");
        selectFileKeyArray.push({"fileKey":fileKey, "fileSize":dqckTpObject[fileKey].filesizeKb,
            "fileName":fileName});
    }
}

function openPdf(fileurl, fileKey, filename) {
    if (fileurl.toUpperCase().indexOf('http://') == -1 && fileurl.toUpperCase().indexOf('ftp://') == -1) {
        window.open("/dzzlk/api/dzzl/view?url=" + fileurl + "&fileKey=" + fileKey + "&fileName=" + filename);
    } else {
        window.open(fileurl);
    }
}

function getImgHtml(filename, fileurl, fileKey, fileType) {

	var upperCaseName = filename.toUpperCase();
    //tif特殊处理
    if ( upperCaseName.indexOf('.TIF') != -1
        || filename.toUpperCase().indexOf('.TIFF') != -1) {
        return '<li><img id="'
            + filename
            + '" onclick="openPdf(\''
            + fileurl + '\',\'' + fileKey + '\',\'' + filename
            + '\')" src="../images/dzzl-tiff.jpg" /><span><i id="'
            + fileKey
            + '" name="'
            + filename
            + '" address="'
            + fileurl
            + '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
            + '<i style="width:188px;text-align:center;display:inline-block">'
            + filename + '</i></li>'
    }


    if ( upperCaseName.indexOf('.PDF') != -1) {
        return '<li><img id="'
            + filename
            + '" onclick="openPdf(\''
            + fileurl + '\',\'' + fileKey + '\',\'' + filename
            + '\')" src="../images/dzzl-pdf.png" /><span><i id="'
            + fileKey
            + '" name="'
            + filename
            + '" address="'
            + fileurl
            + '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
            + '<i style="width:188px;text-align:center;display:inline-block">'
            + filename + '</i></li>'
    }
	
	if ( upperCaseName.indexOf('.DOCX') != -1 || upperCaseName.indexOf('.DOC') != -1 ) { // offic
		return '<li><img id="'
			+ filename
			+ '" onclick="openPdf(\''
			+ fileurl + '\',\'' + fileKey + '\',\'' + filename
			+ '\')" src="../images/word.png" /><span><i id="'
			+ fileKey
			+ '" name="'
			+ filename
			+ '" address="'
			+ fileurl
			+ '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
			+ '<i style="width:188px;text-align:center;display:inline-block">'
			+ filename + '</i></li>'
	}
	
	if( upperCaseName.indexOf('.XLS') != -1 || upperCaseName.indexOf('.XLSX') != -1 ){
		return '<li><img id="'
			+ filename
			+ '" onclick="openPdf(\''
			+ fileurl + '\',\'' + fileKey + '\',\'' + filename
			+ '\')" src="../images/excel.png" /><span><i id="'
			+ fileKey
			+ '" name="'
			+ filename
			+ '" address="'
			+ fileurl
			+ '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
			+ '<i style="width:188px;text-align:center;display:inline-block">'
			+ filename + '</i></li>'
	}
	
	if( upperCaseName.indexOf('.ZIP') != -1 || upperCaseName.indexOf('.RAR') != -1 ){
		return '<li><img id="'
			+ filename
			+ '" onclick="openPdf(\''
			+ fileurl + '\',\'' + fileKey + '\',\'' + filename
			+ '\')" src="../images/zip.png" /><span><i id="'
			+ fileKey
			+ '" name="'
			+ filename
			+ '" address="'
			+ fileurl
			+ '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
			+ '<i style="width:188px;text-align:center;display:inline-block">'
			+ filename + '</i></li>'
	}

    if (fileurl.toUpperCase().indexOf('http://') == -1) {
        return '<li><img id="'
            + filename + '" src="' + '/dzzlk/api/dzzl/viewpic.ashx?fileKey=' + fileKey + '&thumbnail=true&fileName=' + filename
            + '"/><span><i id="'
            + fileKey
            + '" name="'
            + filename
            + '" address="'
            + fileurl
            + '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
            + '<i style="width:188px;text-align:center;display:inline-block">'
            + filename + '</i></li>'
    }

    return '<li><img id="'
        + filename
        + '" src="'
        + fileurl
        + '" /><span><i id="'
        + fileKey
        + '" name="'
        + filename
        + '" address="'
        + fileurl
        + '" onclick="checkImg(this)" checked="false" class = "unchecked"></i></span>'
        + '<i style="width:188px;text-align:center;display:inline-block">'
        + filename + '</i></li>';
}

function getFolderHtml(foldername) {
    return '<li><img id="'
        + foldername
        + '" onclick="openFolder(\''
        + foldername
        + '\')" src="../images/dzzl-folder.jpg" /><span><i id="'
        + foldername
        + '" onclick="checkFolder(this)" checked="false" class = "unchecked"></i></span>'
        + '<i style="width:188px;text-align:center;display:inline-block">'
        + foldername + '</i></li>';
}

function openFolder(foldername) {
    pageContext.dzzlPath = pageContext.dzzlPath + "/" + foldername + "/";
    initSctp();
    searchUploadList(pageContext);
}

/**
 * 向父页面传递数据(成功标志)
 *
 * @return
 */
function GetData() {
    return {
        mark: mark,
        sqxh: sqxh,
        blzlbz: blzlbz
    };
}

/**
 * 关闭窗口
 *
 * @param e
 * @return
 */
function onCancel() {
    CloseWindow("close");
}

/**
 * 关闭窗口
 *
 * @param action
 * @return
 */
function CloseWindow(action) {
    if (window.CloseOwnerWindow)
        return window.CloseOwnerWindow(action);
    else
        window.close();
}

/**
删除图片
 */
function onDelete(){
    if( !selectFileKeyArray.length ){
        mini.alert('请选择图片');
        return;
    }
	mini.confirm('提示', '确定从电子资料库删除选中图？', function(action){
		if( action == 'ok' ){
		    var fileKeys = [];
		    $.each(selectFileKeyArray, function(i, obj){
			    fileKeys.push( obj.fileKey );
            });
			var ajaxData = fileKeys.toString();
		    $.ajax({
                url: '/dzzlk/api/dzzl/deletefiles?filekeys=' + ajaxData,
                type: 'get',
                data: {
					fileKeys: fileKeys
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function( data ){
                    console.log( data.data );
	                if( !data.success ){
						mini.alert( data.message );
						return;
					}
					if( data.data.length ){
						$.each(data.data, function(i, obj){
							var index = selectFileKeyArray.indexOf( obj );
							selectFileKeyArray.splice(index, 1);
							
							$('#'+obj).closest('li').remove();
						});
					}
					
					if( data.otherParams ){
						var error = 0;
						$.each(data.otherParams, function(i, obj){
							error++
						});
						mini.alert( error + '张图片删除失败' );
					}
	                
	                
                },
			    error: function(data){
                    console.log( data )
                }
            });
        }
	})
}