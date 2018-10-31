/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Last modified by:sunml
 * Date：2017/2/05
 * Time：17:30
 *
 */

function skipFbzl() {

}

var fbzldata, requestData, fbzlCkUrl = '../public1/fbzl/Fbzlck.aspx';
function fbzlAjax(data, whichstep) {
    //测试数据
    var sqxh = 1;
    if (requestData) {
        var oldswsxMxDmList = contrastObj(requestData.swsxMxDmList).sort().toString();
        var newswsxMxDmList = contrastObj(data.swsxMxDmList).sort().toString();
        if (requestData.swsxMxDmList.length == 0 && data.swsxDm == requestData.swsxDm) {
            return;
        }
        if (data.swsxDm == requestData.swsxDm && oldswsxMxDmList == newswsxMxDmList) {
            return;
        }
    }
    requestData = data;
    if (whichstep == 'requestFbzllist') {

        //获取附报资料列表http://10.200.100.75:8080
        var url = '/wszx-web/api/get/multifbzllist2.ashx';
        //var url = '/apps/data/fbzl.json';
    } else {
        //查询已上传的附报资料oldFbzllist
        var url = '/wszx-web/api/query/fbzllist/' + sqxh+".ashx";
    }

    ajax.post(url, mini.encode(requestData), function (res) {
        if (res.success) {
            //初始化上传数量为0
            fbzldata = res.value;
            for (var i in fbzldata) {
                fbzldata[i].scCount = '0'
            }
            fbzlGrid.setData(fbzldata);
        } else {
            mini.alert(res.message);
        }
    })

}

//附报资料表格渲染
function onRenderApply(e) {
    var s;
    if (parseInt(e.record.bslxDm) == 1) {
        s = '<span class="status-red">必报</span>';
    } else {
        s = '<span>非必报</span>';
    }
    return s;
}
/*渲染状态 状态为图标*/
// function onRenderStatus(e) {
//   var html;
//   if (e.record.status == "1") {
//     html = '<div class="ico-passed"></div>'
//   } else if (e.record.status == "2") {
//     html = '<div class="ico-no-passed"></div>'
//   } else {
//     html = '<div class="ico-delete"></div>'
//   }
//   return html;
// }

/*渲染状态 状态为文字*/
// function onRenderStatusText(e) {
//   var html;
//   if (e.record.status == "1") {
//     html = '<span>已上传</span>';
//   } else {
//     html = '<span class="status-red">未上传</span>';
//   }
//   return html;
// }

/*上传附报资料渲染操作*/
function onRenderOpearte(e) {
    var html;
    var record = e.record;
    var index = record._index;
    if (record.scCount == '0') {  //上传数量
        html = '<a href="javascript:previewFbzl(\'' + index +
            '\');"  class="check-info" style="display: none;">预览</a>&nbsp;&nbsp;<a href="javascript:uploadFbzl(\'' +
            index + '\');" class="upload">资料库选择</a>&nbsp;&nbsp;' +
            '<a href="javascript:localUpload(' + index + ')">本地上传</a>&nbsp;&nbsp;' +
            '<a href="javascript:qrcodeUpload(\'' + index + '\');" class="upload">扫码上传</a>';
    } else {
        html =
            '<a href="javascript:previewFbzl(\'' + index +
            '\');"  class="check-info">预览</a>&nbsp;&nbsp;<a href="javascript:uploadFbzl(\'' +
            index + '\');" class="upload">资料库选择</a>&nbsp;&nbsp;' +
            '<a href="javascript:localUpload(' + index + ')">本地上传</a>&nbsp;&nbsp;' +
            '<a href="javascript:qrcodeUpload(\'' + index + '\');" class="upload">扫码上传</a>';

    }
    return html;
}

/**
 * 上传成功 传数据过来
 */
function uploadSuccessData(data, pageId) {
    if (!fbzldata[pageId]) {
        fbzldata[pageId] = {};
    } else {
        if (!fbzldata[pageId].bsmxlist) {
            fbzldata[pageId].bsmxlist = [];
        }
        fbzldata[pageId].bsmxlist = fbzldata[pageId].bsmxlist.concat(data);
        fbzldata[pageId].scCount = parseInt(fbzldata[pageId].scCount) + data.length;
    }

    var bsmxlist = fbzldata[pageId].bsmxlist;
    var len = bsmxlist.length;
    for (var i = 0; i < len; i++) {
        bsmxlist[i].fbzlmxxh = i + 1;
    }

    if (mini.get('fbzl-grid')) {
        mini.get('fbzl-grid').setData(fbzldata);
    }

    if (mini.get('fbzl-yl-grid')) {
        mini.get('fbzl-yl-grid').setData(fbzldata);
    }
};

/**
 * 本地上传
 */
function localUpload(index) {
    window.localUploadId = index;
    mini.open({
        url: '/wszx-web/apps/views/public1/fbzl/localUpload.aspx?index=' + index,  //页面地址
        title: '本地上传',      //标题
        iconCls: '',    //标题图标
        width: 900,      //宽度
        height: 580,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        currentWindow: false,      //是否在本地弹出页面,默认false
        effect: 'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
        onload: function () {
        },
        ondestroy: function (action) {

            if (action == "close") {  //
                if (top.fbzlUploadSuccessData.length < 1) {
                    return;
                }
                var data = JSON.parse(top.fbzlUploadSuccessData).uploadSuccessData;
                if (data) {
                    uploadSuccessData(data, localUploadId);
                }
            }

        }
    });
}
/*预览提交页面渲染操作*/
function ylonRenderOpearte(e) {
    var html;
    var record = e.record;
    var index = record._index;
    if (record.bsmxlist) {
        html = '<a href="javascript:previewFbzl(\'' + index + '\', \'yltj\');"  class="check-info">预览</a>';
    }
    return html;
}
// function onActionRenderer(e) {
//     var grid = e.sender;
//     var record = e.record;
//     var uid = record._uid;
//     var rowIndex = e.rowIndex;
//
//     var s = '<a class="fbzl-preview" href="javascript:previewFbzl(\'' + uid + '\')">查看</a>'
//         + ' <a class="fbzl-edit" href="javascript:editFbzl(\'' + uid + '\')">编辑</a>'
//         + ' <a class="fbzl-upload" href="javascript:uploadFbzl(\'' + uid + '\')">上传</a>';
//     return s;
// }

/**
 * 列表里面的预览方法
 * 上传之后的文件 需预览
 */

function previewFbzl(id, step) {
    if (!fbzldata[id].bsmxlist || fbzldata[id].bsmxlist.length === 0) {
        mini.alert('没有文件可预览');
        return;
    }
    mini.open({
        url: fbzlCkUrl,        //页面地址
        title: '预览附报资料',      //标题
        iconCls: '',    //标题图标
        width: 900,      //宽度
        height: 600,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        currentWindow: false,      //是否在本地弹出页面,默认false
        effect: 'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
        onload: function () {       //弹出页面加载完成
            var iframe = this.getIFrameEl();
            var data = { action: fbzldata[id].bsmxlist, steps: step };
            //调用弹出页面方法进行初始化
            iframe.contentWindow.SetData(data);

        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action == "close") {       //如果点击“确定”
                var iframe = this.getIFrameEl();
                //获取选中、编辑的结果
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);    //必须。克隆数据。
                if (data) {
                    fbzldata[id].scCount = data.length.toString();
                    if (mini.get('fbzl-grid')) {
                        mini.get('fbzl-grid').setData(fbzldata);
                    }
                    if (mini.get('fbzl-yl-grid')) {
                        mini.get('fbzl-yl-grid').setData(fbzldata);
                    }
                }

            }
        }

    });

}

function editFbzl(id) {

}

function uploadLocal(id) {
    var fbzlDm = fbzldata[id].fbzlDm;
    mini.open({
        url: '../public/fbzl/FbzlUpload.html',//页面地址
        title: '附报资料上传',      //标题
        iconCls: '',    //标题图标
        width: 900,      //宽度
        height: 650,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        currentWindow: false,      //是否在本地弹出页面,默认false
        effect: 'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
        onload: function () {       //弹出页面加载完成
            //var iframe = this.getIFrameEl();
            //var data = {};
        },
        ondestroy: function (action) {  //弹出页面关闭前

        }
    });
}

function qrcodeUpload(id) {
    mini.open({
        url: '../public1/fbzl/qrupload.aspx',//页面地址
        title: '扫码上传',      //标题
        width: 140,      //宽度
        height: 260,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        currentWindow: false,      //是否在本地弹出页面,默认false
        effect: 'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
        onload: function () {       //弹出页面加载完成
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action == "close") {       //如果点击“确定”
                return;
            }
            var iframe = this.getIFrameEl();
            var temp = iframe.contentWindow.getResult();
            var data = mini.decode(temp);
            data = mini.clone(data);

            //增加filetype,fbzlmxxh字段，为提交做准备
            $.map(data, function (item, index) {
                if (!data[index].filetype) {
                    var splitArr = item.fileName.split('.');
                    data[index].filetype = splitArr[splitArr.length - 1]; //item.fileName.split('.')[1];
                }
                data[index].fbzlmxxh = index + 1;
            })
            if (!fbzldata[id].bsmxlist) {
                fbzldata[id].bsmxlist = new Array();
            }

            //连接每次选中的图片的数组
            fbzldata[id].bsmxlist = fbzldata[id].bsmxlist.concat(data);
            for (var i = 0; i < fbzldata[id].bsmxlist.length; i++) {
                fbzldata[id].bsmxlist[i].fbzlmxxh = i + 1;
            }

            fbzldata[id].scCount = fbzldata[id].bsmxlist.length;
            if (mini.get('fbzl-grid')) {
                mini.get('fbzl-grid').setData(fbzldata);
            }
            if (mini.get('fbzl-yl-grid')) {
                mini.get('fbzl-yl-grid').setData(fbzldata);
            }
        }
    });
}

function uploadFbzl(id) {
    var fbzlDm = fbzldata[id].fbzlDm;
    mini.open({
        url: '/dzzlk/DzzlkWeb/apps/views/dzzl_view.aspx?fbzlDm=' + fbzlDm + '&',//页面地址
        title: '附报资料上传',      //标题
        iconCls: '',    //标题图标
        width: 900,      //宽度
        height: 650,     //高度
        allowResize: true,       //允许尺寸调节
        allowDrag: true,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        currentWindow: false,      //是否在本地弹出页面,默认false
        effect: 'none',              //打开和关闭时的特果:'none','slow','fast',默认'none'
        onload: function () {       //弹出页面加载完成
            var iframe = this.getIFrameEl();
            var data = {};
            //调用弹出页面方法进行初始化
            //iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action != "close") {       //如果点击“确定”
                var data = mini.decode(action);
                data = mini.clone(data);
                if (fbzldata[id].bsmxlist) {
                    //连接每次选中的图片的数组
                    fbzldata[id].bsmxlist = fbzldata[id].bsmxlist.concat(data);
                    //根据fileKey去掉重复的数据
                    data = unique.uniquebykeys(fbzldata[id].bsmxlist, ['fileKey']);
                }
                //增加filetype,fbzlmxxh字段，为提交做准备
                $.map(data, function (item, index) {
                    if (!data[index].filetype) {
                        var splitArr = item.fileName.split('.');
                        data[index].filetype = splitArr[splitArr.length - 1]; //item.fileName.split('.')[1];
                        //data[index].filetype = item.fileName.split('.')[1];
                    }
                    data[index].fbzlmxxh = index + 1;
                })
                fbzldata[id].bsmxlist = data;
                fbzldata[id].scCount = data.length.toString();

                for (var i = 0; i < fbzldata[id].bsmxlist.length; i++) {
                    fbzldata[id].bsmxlist[i].fbzlmxxh = i + 1;
                }
                if (mini.get('fbzl-grid')) {
                    mini.get('fbzl-grid').setData(fbzldata);
                }
                if (mini.get('fbzl-yl-grid')) {
                    mini.get('fbzl-yl-grid').setData(fbzldata);
                }
                // mini.get('fbzl-grid').setData(fbzldata);
            }
        }

    });
}
//判断是否上传附报资料
function isCondition() {
    var flag = true;
    if (typeof (fbzldata) == 'string') {
        fbzldata = mini.decode(fbzldata);
    }
    $.map(fbzldata, function (item, index) {
        if (flag) {
            if ((item.bslxDm == '1' && item.bsmxlist == undefined) || (item.bslxDm == '1' && item.bsmxlist.length == 0)) {
                mini.alert('请上传附报资料');
                flag = false;
            }
        }

    })
    return flag;
}

//数组对象去重
var unique = {
    objkey: function (obj, keys) {
        var n = keys.length,
            key = [];
        while (n--) {
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    },
    uniquebykeys: function (array, keys) {
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = unique.objkey(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr.push(array[i]);
            }
        }
        return arr;
    }
};
//过滤掉没有上传附报资料且非必报的数据
function filterExcessData() {
    var newfbzldata = [];
    if (typeof (fbzldata) == 'string') {
        fbzldata = mini.decode(fbzldata);
    }
    $.map(fbzldata, function (item, index) {
        if (item.bsmxlist) {
            newfbzldata.push(item);
        }
        fbzldata = newfbzldata;
    })
    return fbzldata;
}
function contrastObj(obj) {
    var newarr = [];
    $.map(obj, function (item, index) {
        newarr.push(item.swsxMxDm);
    })
    obj = newarr;
    return obj;
}