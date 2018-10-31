mini.parse();
var form = new mini.Form("form1");
function SaveData() {
    var newRow = form.getDataAndText();
    form.validate();
    if (form.isValid() == false) return false;
  /*var htyxqq = new Date(o.htyxqq);
    var newhtyxqq = htyxqq.toJSON().substring(0,10);//"2009-10-09"
    o.htyxqq = newhtyxqq;
    var htyxqz = new Date(o.htyxqz);
    var newhtyxqz = htyxqz.toJSON().substring(0,10);//"2009-10-09"
    o.htyxqz = newhtyxqz;
    var newRow = o;*/
    var grid = mini.get('wcjyzm_grid');
    grid.addRow(newRow,  grid.getData().length);
    return true;
}
////////////////////
//标准方法接口定义
function SetData(data) {
    if (data.action == "edit") {
        //跨页面传递的数据对象，克隆后才可以安全使用
        data = mini.clone(data);


    }
}
/*function CloseWindow(action) {
 if (action == "close" && form.isChanged()) {
 if (confirm("数据被修改了，是否先保存？")) {
 return false;
 }
 }
 if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
 else window.close();
 }*/
function onOk(e) {
    var result = SaveData();
    if(result) {
        wcjyhdkj.oncellendedit();
        mini.get('win1').hide();
        form.reset();
    }

    //wcjyhdkj.oncellendedit();
}
function onCancel(e) {
    //CloseWindow("cancel");
    mini.get('win1').hide();
    form.reset();
}

