/**
 * Created by hqh on 2017/5/16.
 */
//IE8 不支持 indexOf
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++){
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

top.fbzlUploadSuccessData = [];
var uploader,
	imgBox = $('.imgList'),
	errorFileLength = 0,
	errorFileArr = [],
	fileNumLimit = 50,
	pageId = top.localUploadId,
	uploadSuccessData = [],
	timer = 0,  //超时设置
	timerObj,
	filesQueued = [],
	maxSize = 200 * 1024,
	getFilesId = [],
	capacity; // 容量占用

var contentBody = document.getElementById('content-body');


//事件处理
var eventHandle = {
	
	init: function(){
		errorFileArr = [];
		timer = 0;
		timerObj ? clearInterval(timerObj) : '';
		filesQueued = [];
		$('li:not(".add-file")', imgBox).remove();
		$('li.add-file').removeClass('opacity');
		this.timerOutCalnel();
		$('.loading').hide();

		$('.content-body').removeClass('show-error');
		getFilesId = [];
	},
	
	//绑定事件
	event : function(){
		var $self = this;
		$('.content-body').on('click', '._btn', function(){
			var method = $(this).attr('method');
			$self[method] ? $self[method]( $(this) ) : '';
		});
	},
	
	//超时弹框关闭
	timerOutCalnel: function(){
		$('.timer-out').hide();
		timer = 0;
		timerObj ? clearInterval(timerObj) : '';
	},
	
	//重新选择
	resetFile: function(){
		var len = filesQueued.length;
		for(var i = 0; i<len; i++){
			try{
				uploader.removeFile(filesQueued[i].id);
			}catch(e){
			}
		}
		this.init();
	},
	
	//关闭弹窗
	closeWin: function(){
		CloseWindow("close");
	},
	
	//提交文件
	submitFile: function( btn ) {
		timerObj ? clearInterval(timerObj) : '';
		timer = 0;
		if ($('li', imgBox).length <= 1) {
			$alert('请选择文件');
			return;
		}
		btn.attr('disabled', 'disabled');
		uploader.upload();
	},
	
	//重试，失败的文件重新上传
	retrySubmit: function( btn ) {
		timerObj ? clearInterval(timerObj) : '';
		timer = 0;  //超时设置
		btn.attr('disabled', 'disabled');
		var len = errorFileArr.length;
		for(var i = 0; i<len; i++){
			uploader.retry(errorFileArr[i]);
		}
		errorFileArr = [];
	},
	
	//删除图片
	//删除文件
	deleteImg: function( btn ) {
		var $li = $(btn).closest('li'),
			id = $li.attr('data-id');
		var idindex = getFilesId.indexOf(id);
		getFilesId.splice(idindex, 1);
		
		$li.remove();
		uploader.removeFile(id, true);
		var len = errorFileArr.length;
		for(var i = 0; i<len; i++){
			if (errorFileArr[i].id == id) {
				errorFileArr.splice(i, 1);
			}
		}
		
		if(!$('.content-body').hasClass('show-error')){
			$('li.add-file').removeClass('opacity');
		}
		
		//有上传失败的文件  重新上传 和 重新选择
		if (errorFileArr.length > 0) {
			$('.content-body').addClass('show-error');
		} else {
			//removeClass(contentBody, 'show-error');
			$('.content-body').removeClass('show-error');
		}
		
		//没有文件
		if($('li:not(".add-file")').length === 0){
			$('.footer').hide();
		}
	},
	
	openDzzlk: function(){ //打开电子资料库
		var mini = parent.mini || top.mini;
		mini.open({
			url: '/dzzlk/DzzlkWeb/apps/views/dzzl_view.html?noSubBtn=1',//页面地址
			title: '附报资料上传',      //标题
			iconCls: '',    //标题图标
			width: 900,      //宽度
			height: 650,     //高度
			allowResize: true,       //允许尺寸调节
			allowDrag: true,         //允许拖拽位置
			showCloseButton: true,   //显示关闭按钮
			showMaxButton: false,     //显示最大化按钮
			showModal: true,         //显示遮罩
			currentWindow:false,      //是否在本地弹出页面,默认false
			effect:'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
			onload: function () {       //弹出页面加载完成
				var iframe = this.getIFrameEl();
				var data = {};
			}
		})
	}
};

//关闭窗口
function CloseWindow() {
	if (window.CloseOwnerWindow)
		return window.CloseOwnerWindow('close');
	else
		window.close();
}

function $alert(msg, callback){
	if(top.mini && top.mini.alert){
		top.mini.alert(msg, null, callback)
	}else{
		alert(msg);
	}
}
//选择 同步到 资料库
$('#tbzlk').on('change', function () {
    if($(this).prop('checked')) {
		uploader.options.formData.ifSczlk = 'Y';
	} else {
		uploader.options.formData.ifSczlk = 'N';
	}
});


var imgAccept = 'jpg,jpeg,png,bmp,gif';  // 新疆 doc,docx,xls,xlsx,pdf,
window.onload = function () {
	if (!WebUploader.Uploader.support('flash') && WebUploader.browser
    .ie) {

    parent.mini.confirm('系统未检测到您的flashplayer，为确保本地上传功能正常使用，请点击确定立即安装flashplayer？或点击取消使用其他方式上传。', '提示', function(action) {
        if (action == "ok") {
            // parent.location.href = "http://www.adobe.com/go/getflashplayer";
            CloseWindow("cancel");
            parent.open("http://www.adobe.com/go/getflashplayer", "_blank");
            
        } else {
            CloseWindow("cancel");
        }
    })
    return false;
}

//事件处理.
	eventHandle.event();
	
	//初始化上传功能
	uploader = WebUploader.create({
		formData: {
			ifSczlk: 'N'
		},
		accept: {
			title: 'Images',
			extensions: imgAccept // 'jpg,jpeg,png,doc,docx,xls,xlsx,pdf,bmp,gif'
		},
		compress: { //压缩图片
			crop: false,
			width: 1280,
			height: 768,
			compressSize: 0  // *1024   10kb以下 不压缩
		},
		thumb: {
			crop: false
		},
		swf: '/wszx-web/lib/fex-webuploader/dist/Uploader.swf',
		server: '/wszx-web/api/fbzl/upload', // 文件接收服务端。
		pick: '.picker',
		resize: true,  //压缩
		fileSingleSizeLimit: 10 * 1024 * 1024 + 1,// 10M文件大小
		fileNumLimit: fileNumLimit,
		fileVal: 'fileName' //文件字段名
	});
	
	//多文件被添加到队列
	uploader.on('filesQueued', function (file) {
		filesQueued = file;
		$('.footer').show();
		
	}).on('fileQueued', function (file) { //文件被添加到队列
		var name = file.name;
		var reg = new RegExp("[#\\\\@$%^&*]");
		if( reg.test(name) ){
			$('#'+file.id).remove();
			setTimeout(function(){
				uploader.removeFile(file.id, true);
			}, 100);
			$alert('文件名不能包含#、/、@、$、%、^、&、*等特殊字符，请检查');
			return;
		}
		
		var $ul = $('.imgList');
		uploader.makeThumb(file, function (error, ret) {
			if (error) {  // 预览 非图片
				var imgSrc = '',
					fileName = file.name.toUpperCase();
				if( fileName.match('RAR') || fileName.match('ZIP') ){
					imgSrc = '../../../images/fbzl/zip.png';
				}else if( fileName.match('XLS') || fileName.match('XLSX') ){
					imgSrc = '../../../images/fbzl/excel.png';
				}else if( fileName.match('DOCX') || fileName.match('DOC') ){
					imgSrc = '../../../images/fbzl/word.png';
				}else if( fileName.match('PDF') ){
					imgSrc = '../../../images/fbzl/pdf.png';
				}
				//$ul.prepend(html);
			} else {
				imgSrc = ret;
			};
			
			var html = '<li id="' + file.id + '" data-id="' + file.id + '">\
				<div class="progress">\
					<span class="progress-color"></span>\
					<span class="progress-text">0%</span>\
				</div>\
				<div class="img-box"><img src="' + imgSrc + '" /></div>\
				<div class="clearfix text">\
				<span class="fl file-name" title="' + file.name + '">' + file.name + '</span>\
				<span class="fr reelect-btn hide">重选</span>\
				<span class="fr delete-img _btn" method="deleteImg" title="删除"></span>\
				</div>\
				</li>';
			$ul.prepend(html);
		});
		
	}).on('startUpload', function (file) { //开始上传
		$('.loading').show();
		timerObj = setInterval(function(){
			timer++
			if(timer > 60){
				$('.timer-out').show();
			}
		}, 1000);
		
	}).on('uploadComplete', function(file ){
		eventHandle.timerOutCalnel();
		
	}).on('uploadFinished', function (file, data) { //上传结束
		$('.loading').hide();
		$('button[disabled]').removeAttr('disabled');
		eventHandle.timerOutCalnel();
		
		//有上传失败的文件  重新上传 和 重新选择
		if (errorFileArr.length > 0) {
			$('.content-body').addClass('show-error'); //
			//addClass(contentBody, 'show-error');
			$('li.success').remove();  //移除上传成功文件 保留失败文件。
		} else {
			$('.content-body').removeClass('show-error');
			//removeClass(contentBody, 'show-error');
			$alert('上传成功', function(action){
				// action: ok close
				CloseWindow("close");
			});
		}
		
		//处理数据
		top.fbzlUploadSuccessData = JSON.stringify({
			uploadSuccessData: uploadSuccessData
		});
		//$.isFunction(top.uploadSuccessData) ? top.uploadSuccessData(uploadSuccessData, pageId) : '';
		
	}).on('error', function (error, code, file) { //上传错误
		var file = file || {};
		//console.log( error , file , code );
		switch (error) {
			case 'F_DUPLICATE' :
				$alert( (code.name||'') + ' 文件已存在');
				break;
			case 'Q_TYPE_DENIED':
				$alert((file.name || '') + ' 文件类型不正确');
				break;
			case 'Q_EXCEED_NUM_LIMIT':
				$('li.add-file').addClass('opacity');
				$alert('单次最多上传50个文件');
				break;
			case 'F_EXCEED_SIZE':
				$alert( (file.name || '') + ' 文件太大，请压缩后上传');
				break;
			default:
				$alert( (file.name||'') + ' 文件错误');
				break;
		}
		
	}).on('uploadSuccess', function(file , data){ //上传成功
		
		var file = file || {};
		var id = file.id || 'WU_FILE_0';
		var $li = $('#'+id);
		
		if (data.success) {
			uploader.removeFile(id); //删除上传队列文件
			$li.addClass('success'); //标注上传成功图片
			uploadSuccessData.push({
				fileKey: data.value.fileKey,
				fileName: data.value.fileName,
				filetype: file.ext
			});
		} else {
			if ($('.error-tip', $li).length === 0) {
				$li.addClass('upload-error');
				//addClass($li[0], 'upload-error');
				$li.append('<div class="error-tip">上传失败</div>');
			}
			errorFileArr.push(file);
			$alert(data.message);
		}
		
	}).on('uploadError', function(file){ //上传请求出错
		var name =  file ? file.name : '';
		$alert(name + ' 文件上传失败，请重新上传');
		errorFileArr.push(file);
		$('#' + file.id).addClass('upload-error').append('<div class="error-tip">上传失败</div>');
		
	}).on('uploadProgress', function(file, percentage){ //上传进度
		$('#'+file.id).find('.progress').show();
		$('#'+file.id).find('.progress-text').text( percentage * 100 + '%');
		$('#'+file.id).find('.progress-color').css({
			width: percentage * 100 + '%'
		});
	});
	
	// 获取 电子资料库容量
	$.get('/dzzlk/api/dzzl/queryCapacity', function(data){
		if( !data.success ){
			mini.alert( data.message );
			return;
		}
		capacity = Number( data.data );
		//capacity = 100;
		if( capacity >= 100 ){
			$('.imgList').remove();
			$('.capacity-box').show();
			$('.footer').show();
		}
	});
}