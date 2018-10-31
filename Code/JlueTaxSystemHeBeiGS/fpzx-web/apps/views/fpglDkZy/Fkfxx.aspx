<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Fkfxx.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.fpglDkZy.Fkfxx" %>

<!DOCTYPE html>


<h2>付款方信息</h2>
<section class="second-step">
    <p class="title">买方：购货单位（购买方基本信息）</p>
    <p><strong class="text-red">*</strong> 表示必填</p>
    <table id="fkf-form" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td width="38%">购买方纳税人识别号 <strong class="text-red">*</strong></td>
            <td width="62%" class="item-control">
                <input class="mini-hidden" name="djxh">
                <input class="mini-textbox" name="ghfNsrsbh" id="ghf-nsrsbh" width="80%" onblur="dkptfp.onFkNsrBlur" vtype="nsrsbh" required="true" requirederrortext="付款方纳税人识别号不能为空">
                <a id="fkfdr" class="fkfdr" href="javascript:;">从购买方通讯录导入</a></td>
        </tr>
        <tr>
            <td>购买方名称 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="ghfNsrmc" width="103%" required="true" requirederrortext="购买方名称不能为空"></td>
        </tr>
        <tr>
            <td>购买方地址<strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="ghfDz" width="103%" maxlength="200" required="true" requirederrortext="购买方地址不能为空" vtype="maxLength:200"></td>
        </tr>
        <tr>
            <td>购买方开户银行类别<strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-combobox" name="ghfYhhbDm" id="_ghfYhhbDm" required="true" requirederrortext="购买方开户银行类别不能为空" width="103%" textfield="MC" valuefield="ID" onvaluechanged="dkptfp.gmfyhlbBlur" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx"></td>
        </tr>
        <tr>
            <td>购买方银行营业网点名称<strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" id="ghfYhyywdMc" name="ghfYhyywdMc" width="103%" required="true" requirederrortext="购买方银行营业网点名称不能为空"><input style="display: none" class="mini-combobox" id="ghfYhyywdDm" name="ghfYhyywdDm" width="103%" required="true" requirederrortext="购买方银行营业网点名称不能为空" onblur="dkptfp.ghfYhyywdBlur"></td>
        </tr>
        <tr>
            <td>购买方银行账号<strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="ghfYhkhzh" id="text-gmfyhzh" width="103%" required="true" requirederrortext="购买方银行账号不能为空"><input style="display: none" class="mini-combobox" name="ghfYhkhzhDm" id="combobox-gmfyhzh" width="103%" required="true" requirederrortext="购买方银行账号不能为空"></td>
        </tr>
        <tr>
            <td>联系电话 <strong class="text-red">*</strong></td>
            <td class="item-control">
                <input class="mini-textbox" name="ghfLxdh" width="103%" required="true" requirederrortext="联系电话不能为空" onvalidation="dkptfp.onlxdh"></td>
        </tr>
    </table>
    <div class="mini-window" id="fkfTx" style="width: 1000px; height: 600px;" title="常用购买方" showtoolbar="false" showfooter="true" showcolumnsmenu="true">
        <div style="color: red">若您的银行信息发生变化，请联系主管税务机关变更银行信息！</div>
        <br>
        <div class="grid-toolbar" data-bind-grid="fkftx-grid"><a class="mini-button toolBtn-blue grid-add" onclick="dkptfp.addFkfxx()">增加</a> <a class="mini-button" onclick="dkptfp.modifyFkfxx()">修改</a> <a class="mini-button" iconcls="icon-remove" onclick="dkptfp.deletFkxtx()">删除</a></div>
        <div id="fkftx-grid" class="mini-datagrid" style="width: 100%; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="false" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div field="ghfNsrsbh" maxlength="20" vtype="nsrsbh">纳税人识别号
                    <input property="editor" name="ghfNsrsbh" class="mini-textbox" style="width: 100%;" required="true"></div>
                <div field="ghfNsrmc" required="true">纳税人名称
                    <input property="editor" name="ghfNsrmc" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfDz" maxlength="200" vtype="maxLength:200">地址
                    <input property="editor" name="ghfDz" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfLxdh" required="true" vtype="rangeLength:8,13;numeric;">联系电话
                    <input property="editor" name="ghfLxdh" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfYhhbDm" renderer="dkptfp.khyhlbRenderer">开户银行类别
                    <input property="editor" class="mini-combobox" required="true" width="100%"></div>
                <div field="ghfYhhbDm" required="true" visible="false">开户银行类别代码
                    <input property="editor" class="mini-textbox" width="103%"></div>
                <div field="ghfYhyywdMc" required="true">银行营业网点名称
                    <input property="editor" name="ghfYhyywdMc" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfYhkhzh" required="true">开户银行账号
                    <input property="editor" name="ghfYhkhzh" class="mini-textbox" style="width: 100%"></div>
                <div field="djxh" visible="false">登记序号
                    <input property="editor" name="djxh" class="mini-textbox" style="width: 100%"></div>
                <div field="issnnsr" visible="false">是否是省内
                    <input property="editor" name="issnnsr" class="mini-textbox" style="width: 100%"></div>
            </div>
        </div>
        <div property="footer"><a class="mini-button toolBtn-blue" id="save-btn">确认</a> <a class="mini-button toolBtn-white" id="cancle-btn">取消</a></div>
    </div>
    <div class="mini-window" id="add-fkfTx" style="width: 760px; height: 350px; display: none" title="购买方信息" showtoolbar="false" showfooter="true">
        <table class="addtable" id="fkfTx-form" style="table-layout: fixed;" width="100%">
            <tr>
                <td width="16%">纳税人识别号<strong class="text-red">*</strong>：</td>
                <td width="36%">
                    <input name="djxh" class="mini-hidden" style="width: 100%">
                    <input name="issnnsr" class="mini-hidden" style="width: 100%">
                    <input name="ghfNsrsbh" id="ghfNsrsbhxz" class="mini-textbox" required="true" requirederrortext="纳税人识别号不能为空" maxlength="20" vtype="nsrsbh" onblur="dkptfp.onFkfxxBlur"></td>
                <td width="18%">纳税人名称<strong class="text-red">*</strong>：</td>
                <td width="30%">
                    <input name="ghfNsrmc" class="mini-textbox" required="true" requirederrortext="纳税人名称不能为空"></td>
            </tr>
            <tr>
                <td>地址<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="ghfDz" class="mini-textbox" required="true" requirederrortext="地址不能为空" maxlength="200" vtype="maxLength:200"></td>
                <td>联系电话<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="ghfLxdh" class="mini-textbox" required="true" requirederrortext="联系电话不能为空" onvalidation="dkptfp.onlxdh"></td>
            </tr>
            <tr>
                <td>开户银行类别<strong class="text-red">*</strong>：</td>
                <td>
                    <input class="mini-combobox" name="ghfYhhbDm" id="ghfYhhbDm" required="true" requirederrortext="开户银行类别不能为空" emptytext="注：若您需要选择的银行不存在，请联系主管税务机关维护银行信息" width="100%" textfield="MC" valuefield="ID" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx" onblur="dkptfp.khyhlbBlur"></td>
                <td>银行营业网点名称<strong class="text-red">*</strong>：</td>
                <td>
                    <input class="mini-hidden" name="ghfYhyywdDm"><input name="ghfYhyywdMc" id="text-yhyywdmc" class="mini-textbox text-yhyywdmc" required="true" requirederrortext="银行营业网点名称不能为空"><input style="display: none" name="ghfYhyywdDm" id="combobox-yhyywdmc" class="mini-combobox combobox-yhyywdmc" required="true" requirederrortext="银行营业网点名称不能为空" onblur="dkptfp.yhyywdBlur"></td>
            </tr>
            <tr>
                <td>开户银行账号<strong class="text-red">*</strong>：</td>
                <td>
                    <input name="ghfYhkhzh" class="mini-textbox text-khyhzh" required="true" id="text-khyhzh" requirederrortext="开户银行账号不能为空"><input style="display: none" class="mini-combobox combobox-khyhzh" name="ghfYhkhzhDm" required="true" id="combobox-khyhzh" requirederrortext="开户银行账号不能为空"></td>
            </tr>
        </table>
        <div property="footer"><a class="mini-button toolBtn-blue" id="fkfTx-save">保存</a> <a class="mini-button toolBtn-white" id="fkfTx-cancle">取消</a></div>
    </div>
    <div class="mini-window" id="checkGhfxx" style="width: 700px; height: 600px;" title="根据购货方纳税人识别号查询购货方信息" showtoolbar="false" showfooter="true" showcolumnsmenu="true">
        <div id="ghfxx-grid" class="mini-datagrid" style="width: 100%; height: 200px;" allowresize="false" enabled="true" showpager="false" showemptytext="true" autoload="false" multiselect="false" allowsortcolumn="false" idfield="id" checkselectiononly="true" allowcellselect="true" allowcelledit="false">
            <div property="columns">
                <div type="checkcolumn" width="50">选择</div>
                <div field="ghfNsrsbh" maxlength="20" vtype="nsrsbh">纳税人识别号</div>
                <div field="ghfNsrmc" required="true">纳税人名称
                    <input property="editor" name="ghfNsrmc" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfDz" maxlength="200" vtype="maxLength:200">地址
                    <input property="editor" name="ghfDz" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfLxdh" required="true" vtype="rangeLength:8,13;numeric;">联系电话
                    <input property="editor" name="ghfLxdh" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfYhhbDm" required="true">开户银行类别
                    <input property="editor" class="mini-combobox" name="ghfYhhbDm" textfield="MC" valuefield="ID" style="width: 100%;" url="../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx"></div>
                <div field="ghfYhyywdMc" required="true">银行营业网点名称
                    <input property="editor" name="ghfYhyywdMc" class="mini-textbox" style="width: 100%"></div>
                <div field="ghfYhkhzh" required="true">开户银行账号
                    <input property="editor" name="ghfYhkhzh" class="mini-textbox" style="width: 100%"></div>
            </div>
        </div>
        <div property="footer"><a class="mini-button toolBtn-blue" id="xzghfxx-ok">确认</a> <a class="mini-button toolBtn-white" id="xzghfxx-cancle">取消</a></div>
    </div>
</section>
