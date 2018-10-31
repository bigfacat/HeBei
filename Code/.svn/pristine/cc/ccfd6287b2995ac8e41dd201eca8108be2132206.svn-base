mini.parse();
var form1 = new mini.Form("form1");
var form2 = new mini.Form("form2");
function SaveData(e) {
    if(e == "1"){
        var o = form1.getDataAndText();
        var grid = mini.get('wcjyzmhx_grid');
        var form = form1;
    }else{
        var o = form2.getDataAndText();
        var grid = mini.get('jkxx_grid');
        var form = form2;
    }
    form.validate();
    if (form.isValid() == false) return false;
    var newRow = o;
    grid.addRow(newRow,  grid.getData().length);
    return true;
}
function onOk1(e) {
    if(SaveData(1)){
        mini.get('win1').hide();
        form1.reset();
    };

}
function onOk2(e) {
    if(SaveData(2)){
        mini.get('win2').hide();
        form2.reset();
    };
}
function onCancel(e) {
    mini.get('win1').hide();
    mini.get('win2').hide();
    form1.reset();
    form2.reset();
}

