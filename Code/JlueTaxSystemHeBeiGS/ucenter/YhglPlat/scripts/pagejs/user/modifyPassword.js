var password = null;
var priPassword = null;
var newPassword = null;
var priNewPassword = null;

var modifyPasswordForm = null;

$("#confirmModify").on("click", function () {
    confirmModify();
});

function confirmModify() {
    modifyPasswordForm = new mini.Form("#modifyPasswordForm");
    modifyPasswordForm.validate();
    if (modifyPasswordForm.isValid() == false) {
        return;
    }

    //获取公钥，获取成功后执行回调函数getRsaPublicKeyCallback
    getRsaPublicKeyCallback();
}

function getRsaPublicKeyCallback(pubKey) {
    var data = modifyPasswordForm.getData();
    password = data.password;
    newPassword = data.newPassword;
    if (password == newPassword) {
        mini.alert('新密码与原密码一样，请重新输入!');
        mini.get("password").setValue("");
        mini.get("passwordAgain").setValue("");
        mini.get("password").focus();
        return;
    }
    mini.alert("修改成功");
}
