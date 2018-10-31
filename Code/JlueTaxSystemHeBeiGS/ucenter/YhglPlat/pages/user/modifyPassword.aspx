<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="modifyPassword.aspx.cs" Inherits="JlueTaxSystemHBGS.ucenter.YhglPlat.pages.user.modifyPassword" %>

<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>修改密码</title>
  <link href="../../lib/sui/themes/default/miniui.css" rel="stylesheet" />
  <link href="../../lib/sui/themes/icons.css" rel="stylesheet" />
  <link rel="stylesheet" href="../../styles/override-miniui.css">
  <link rel="stylesheet" href="../../styles/normalize.css">
  <link rel="stylesheet" href="../../styles/yhgl.css">
</head>

<body>
  <div id="modifyPassword" class="modify-password">
    <h2 class="mtb10">修改密码</h2>
    <hr>
    <div id="modifyPasswordForm" class="modify-password-form mt20">
      <table>
        <tr>
          <td width="70">
            <label for="oldPassword">原密码</label>
          </td>
          <td>
            <input id="oldPassword" emptyText="请输入登录密码" errorMode="border" name="password" class="mini-password" style="width: 240px;" onvalidation="onPwdValidation" vtype="required;pwd" />
          </td>
          <td id="oldPassword_error" class="validation-error-text"></td>
        </tr>
        <tr>
          <td>
            <label for="password">新密码</label>
          </td>
          <td>
            <input id="password" emptyText="请输入新密码" errorMode="border" name="newPassword" class="mini-password" style="width: 240px;" onvalidation="onPwdValidation" vtype="required;pwd" />
          </td>
          <td id="password_error" class="validation-error-text"></td>
        </tr>
        <tr>
          <td>
            <label for="passwordAgain">再次输入</label>
          </td>
          <td>
            <input id="passwordAgain" emptyText="请再次确认输入新密码" errorMode="border" class="mini-password" vtype="required;differ" onvalidation="onPwdValidation" style="width: 240px;" />

          </td>
          <td id="passwordAgain_error" class="validation-error-text"></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input value="确  定" id="confirmModify" class="button button-blue" type="button" />
          </td>
        </tr>
      </table>
    </div>
  </div>
  <script src="../../lib/base1/jquery.min.js"></script>
  <script src="../../lib/sui/mini-all-min.js"></script>
  <script src="../../scripts/pagejs/global/global.js" type="text/javascript"></script>
  <script src="../../scripts/pagejs/global/common.js" type="text/javascript"></script>
  <script src="../../scripts/commonjs/validate.js"></script>
  <script src="../../scripts/commonjs/jsencrypt.js" type="text/javascript"></script>
  <script src="../../scripts/pagejs/user/modifyPassword.js"></script>
</body>

</html>

