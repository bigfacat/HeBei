/* 
* @Author: Marte
* @Date:   2016-10-20 17:22:55
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-21 16:08:49
*/
//表单校验
function validate(){
    var yshdForm = new mini.Form("#yshd");
    yshdForm.validate();
    var checkeds = mini.get('choice');
    if(checkeds.getChecked() == false){
         mini.alert("请仔细阅读授权说明，然后勾选已阅读，再点击下一步！");
        return;
    }
    return true;
}
