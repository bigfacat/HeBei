<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bgdjDwView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.bgdjDw.bgdjDwView" %>

<!DOCTYPE html>

<h2>填写申请表</h2>
<section class="second-step">
    <div id="nsrxx">
        <div class="grid-title">允许修改如下字段：</div>
        <p style="background-color: #eeeeee">纳税人基本信息</p>
        <div id="nsrjbxxForm">
            <table width="66%" cellpadding="0" cellspacing="0" border="0" class="form-table">
                <tr>
                    <td class="search-item" width="7%">注册地邮政编码：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="zcdyzbm" name="zcdyzbm" style="width: 94%;" class="mini-textbox" vtype="int;rangeLength:6,6" required="true" rangelengtherrortext="注册地邮政编码长度只允许输入6位" interrortext="注册地邮政编码只允许输入数字" requirederrortext="注册地邮政编码为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item" width="7%">生产经营地邮政编码：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="scjydyzbm" name="scjydyzbm" style="width: 94%;" class="mini-textbox" vtype="int;rangeLength:6,6" required="true" interrortext="生产经营地邮政编码只允许输入数字" rangelengtherrortext="生产经营地邮政编码长度只允许输入6位" requirederrortext="生产经营地邮政编码为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item" width="7%">核算方式：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input textfield="MC" valuefield="ID" id="hsfsDm" name="hsfsDm" style="width: 94%;" class="mini-combobox" url="bgdjDwService.Api.getHsfs" required="true" shownullitem="false" nullitemtext="" requirederrortext="核算方式为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item" width="7%">从业人数：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cyrs" name="cyrs" style="width: 94%;" class="mini-textbox" required="true" vtype="int" requirederrortext="从业人数为必输项" interrortext="从业人数只允许输入数字"></td>
                </tr>
            </table>
        </div>
        <p style="background-color: #eeeeee">负责人信息</p>
        <div id="fzrxxForm">
            <table width="66%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td class="search-item" width="2%">法人代表手机号：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="fddbryddh" name="fddbryddh" style="width: 94%;" class="mini-textbox" vtype="int;rangeLength:0,12" required="true" requirederrortext="法人代表手机号为必输项" interrortext="法人代表手机号只允许输入数字" rangelengtherrortext="法人代表手机号最大长度只允许输入12位"></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">法人代表固定电话：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="fddbrgddh" name="fddbrgddh" style="width: 94%;" class="mini-textbox">
                        <span></span></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">法人代表电子邮箱：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="fddbrdzxx" name="fddbrdzxx" class="mini-textbox" style="width: 94%;"></td>
                </tr>
                <tr>
                    <td class="search-item">财务负责人姓名：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzrxm" name="cwfzrxm" style="width: 94%;" class="mini-textbox" required="true" requirederrortext="财务负责人姓名为必输项">
                        <span></span></td>
                </tr>
                <tr>
                    <td class="search-item">财务负责人身份证件类型：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzrsfzjzlDm" required="true" textfield="MC" valuefield="ID" url="bgdjDwService.Api.getSfzjlx" onitemclick="bgdjDw.doSfzjlxchanged(this,'cwfzrsfzjhm')" name="cwfzrsfzjzlDm" style="width: 94%;" class="mini-combobox" shownullitem="false" nullitemtext="" requirederrortext="财务负责人身份证件类型为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item">财务负责人身份证件号码：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzrsfzjhm" name="cwfzrsfzjhm" style="width: 94%;" class="mini-textbox" required="true" requirederrortext="财务负责人身份证件号码为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">财务负责人固定电话：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzrgddh" name="cwfzrgddh" style="width: 94%;" class="mini-textbox">
                        <span></span></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">电子邮箱：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzrdzxx" name="cwfzrdzxx" style="width: 94%;" class="mini-textbox"></td>
                </tr>
                <tr>
                    <td class="search-item">财务负责人手机号：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="cwfzryddh" name="cwfzryddh" style="width: 94%;" class="mini-textbox" required="true" vtype="int;rangeLength:0,12" rangelengtherrortext="财务负责人手机号最大长度只允许输入12位" interrortext="财务负责人手机号只允许输入数字" requirederrortext="财务负责人手机号为必输项"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="search-item">办税人姓名：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsrxm" name="bsrxm" style="width: 94%;" class="mini-textbox" required="true" requirederrortext="办税人姓名为必输项">
                        <span></span></td>
                </tr>
                <tr>
                    <td class="search-item">办税人身份证件类型：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsrsfzjzlDm" name="bsrsfzjzlDm" style="width: 94%;" class="mini-combobox" required="true" value="156" textfield="MC" valuefield="ID" shownullitem="false" onitemclick="bgdjDw.doSfzjlxchanged(this,'bsrsfzjhm')" url="bgdjDwService.Api.getSfzjlx" requirederrortext="办税人身份证件类型为必输项" nullitemtext=""></td>
                </tr>
                <tr>
                    <td class="search-item">办税人身份证件号码：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsrsfzjhm" name="bsrsfzjhm" style="width: 94%;" class="mini-textbox" required="true" requirederrortext="办税人身份证件号码为必输项"></td>
                </tr>
                <tr>
                    <td class="search-item">办税人手机号：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsryddh" name="bsryddh" style="width: 94%;" class="mini-textbox" vtype="int;rangeLength:0,12" required="true" requirederrortext="办税人手机号为必输项" rangelengtherrortext="办税人手机号最大长度为12" interrortext="办税人手机号只允许输入数字"></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">办税人固定电话：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsrgddh" name="bsrgddh" style="width: 94%;" class="mini-textbox">
                        <span></span></td>
                </tr>
                <tr>
                    <td class="search-item" width="2%">办税人电子邮箱：</td>
                    <td colspan="3" class="search-item-control" width="23%">
                        <input id="bsrdzxx" name="bsrdzxx" style="width: 94%;" class="mini-textbox"></td>
                </tr>
            </table>
        </div>
    </div>
</section>
