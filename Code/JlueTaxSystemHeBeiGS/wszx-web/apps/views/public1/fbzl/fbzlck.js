//接收父页面数据
var imagedata,steps;
function SetData(data){
    if(data.action){
        steps = data.steps;
        imagedata = data.action;
        imagePreviewObj.createImagesPreview(imagedata,
            function() {
                $('.images').viewer();
            });
    }
}
//预览附报资料图片
var imagePreviewObj = {
    imageSource: null,
    $images: null, //缓存图片对象
    //imagesSource: imagedata,
    createImagesPreview: function(url, callback) {
        var strEl='',strElpdf='';
        var re = /\.jpg$|\.jpeg$|\.png$|\.gif$/i;
        $.each(url, function(i, v) {
            //匹配是不是图片，非图片点击下载，图片点击预览
            var fileType = re.test(v.fileName);
            //steps存在，去掉<i class="close"></i>
            if(steps){
                if(!fileType){
                    strElpdf += '<div class="image-box"><a href="/dzzlk/api/dzzl/view?fileKey='+ v.fileKey +'&fileName='+v.fileName+'"><img src="icon-pdf.png"></a><span>'+v.fileName+'</span></div>';
                }else{
                    strEl += '<div class="image-box image"><img src="/dzzlk/api/dzzl/viewpic.ashx?fileKey=' + v.fileKey + '"/><span>'+v.fileName+'</span></div>';
                }
            }else{
                if(!fileType){
                    strElpdf += '<div class="image-box"><a href="/dzzlk/api/dzzl/view?fileKey='+ v.fileKey +'&fileName='+v.fileName+'"><img src="icon-pdf.png"></a><i class="close"></i><span>'+v.fileName+'</span></div>';
                }else{
                    strEl += '<div class="image-box image"><img src="/dzzlk/api/dzzl/viewpic.ashx?fileKey=' + v.fileKey + '"/><i class="close"></i><span>'+v.fileName+'</span></div>';
                }
            }

        });

        $("#fbzlyl-fdpbox").empty().append(strElpdf);
        $("#fbzlyl-imagebox").empty().append(strEl);

        return callback();
    }
}
//删除附报资料
$('#fbzlyl-grid').delegate('.close','click',function(e){
    e.preventDefault();
    e.stopPropagation();

    var currentIndex = $(this).parent().index(),
       newImagesSource = [],
       deleteTarget = imagedata.splice(currentIndex, 1);
       $.each(imagedata, function(index,item) {
            if(item !== deleteTarget)
            {
                newImagesSource.push(item);
            }
       })
    imagePreviewObj.imageSource = newImagesSource;
    imagePreviewObj.createImagesPreview(newImagesSource,function(){
        $('.image').viewer();
    });
})

function GetData(){
    return imagePreviewObj.imageSource;
}

