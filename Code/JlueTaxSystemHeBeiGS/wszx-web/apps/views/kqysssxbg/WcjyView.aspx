<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WcjyView.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.kqysssxbg.WcjyView" %>

<!DOCTYPE html>

<h2>外出经营活动开具</h2>
<section>
    <!--内容1开始-->
    <div id="step_tx_form">
    <h5>纳税人基本信息</h5>
    <div class="table_bg table_div" >
        <table class="form-table table_bg" width="90%" >
            <tr>
                <th width="15%">纳税人识别号：</th>
                <td width="35%"><input id="nsrsbh" name="nsrsbh" class="mini-textbox" value=""
                                       enabled="false" width="100%" vtype="required;" /></td>
                <th width="15%">纳税人名称：</th>
                <td width="35%"><input id="nsrmc" name="nsrmc" class="mini-textbox" value=""
                                       enabled="false" vtype="required;specialChar;maxLength:40"
                                       width="100%" /></td>
            </tr>
            <tr>
                <th>登记注册类型：</th><!--url="wcjyzmkjService.Api.getdjzclxUrl"-->
                <td>
                    <!--<input style="display: none;" class="mini-combobox" width="100%"
                           id="djzclxDm" enabled="false" name="djzclxDm" vtype="required"
                           textfield="MC" valuefield="ID"/>-->
                <input id="djzclxDmText" name="djzclxDmText" class="mini-textbox" value=""
                       enabled="false" width="100%" />
                </td>
                <th>税务登记地：</th>
                <td><input id="swdjd" name="swdjd" class="mini-textbox" value=""
                           enabled="false" width="100%"/></td>
            </tr>
            <tr>
                <th >经办人：</th>
                <td><input id="lxrxm" name="lxrxm" class="mini-textbox" value=""
                           enabled="false" vtype="required;specialChar;maxLength:80"
                           width="100%" /></td>

                <th>经办人电话：</th>
                <td><input id="lxdh" name="lxdh" class="mini-textbox" value=""
                           enabled="false" vtype="required;specialChar;maxLength:80"
                           width="100%" /></td>
            </tr>
        </table>
    </div>

    <table class="form-table" width="94%">
        <tr>
            <th width="20%" height="40px"><span class="txt-red">*</span>合同对方企业名称：</th>
            <td width="30%"><input id="htdfnsrmc" name="htdfnsrmc" class="mini-textbox"
                       width="100%" vtype="required;maxLength:40" requiredErrorText="合同对方企业名称不能为空"
                       maxLength="40" /></td>
            <th width="20%">合同对方纳税人识别号：</th>
            <td width="30%"><input id="htdfnsrsbh" name="htdfnsrsbh" class="mini-textbox"  width="100%">
                      </td>
        </tr>
        <tr>
            <th height="40px"><span class="txt-red">*</span>跨区域经营地行政区划：</th>
            <td> <input id="wcjydxzqh" name="wcjydxzqh"
                       class="mini-treeselect " width="100%" textfield="MC"
                       valuefield="ID" parentField="PID" multiSelect="false" onvaluechanged="wcjyhdkj.onXzqhChanged"
                       allowInput="false" required="true" requiredErrorText="跨区域经营地行政区划不能为空" popupWidth="200" onbeforenodeselect="wcjyhdkj.beforeNodeSelect"
                       showClose="true" url="wcjyzmkjService.Api.getXzqhUrl" /></td>
            <th><span class="txt-red">*</span>跨区域经营地乡镇街道：</th>
            <td>
                <div id="jdxzdiv" name="jdxzdiv" >
                    <input id="wcjydxxdzDm" name="wcjydxxdzDm" class="mini-treeselect" textfield="MC" valuefield="ID" parentField="PID"
                           shownullitem="true" allowInput="true" valueFromSelect="true" required="true" onbeforenodeselect="wcjyhdkj.beforeNodeSelect" requiredErrorText="跨区域经营地乡镇街道不能为空"
                           width="100%" popupWidth="250" onvaluechanged="wcjyhdkj.onJdxzChanged"/>
                </div>

                <div id="wcjyddiv" name="wcjyddiv" style="display:none">
                    <input id="wcjyd" name="wcjyd"  type="text" class="mini-textbox" vtype="required;maxLength:80"   width="100%" popupWidth="250" maxLength="80"
                           required="false" requiredErrorText="跨区域经营地乡镇街道不能为空"
                    />
                </div>
            </td>
        </tr>

        <tr>
            <th height="40px"><span class="txt-red">*</span>经营方式：</th>
            <td><input id="jyfs" name="jyfs" class="mini-combobox"
                       width="100%"  textfield="mc" valuefield="id"
                       multiSelect="true" allowInput="false" url="../../data/jyfs.ashx"
                       required="true" requiredErrorText="经营方式不能为空" popupWidth="200" showClose="true" onvaluechanged="wcjyhdkj.onJyfsChanged" /></td>
    
            <th height="40px"><span class="txt-red">*</span>跨区域经营地：</th>
            <td><input id="kqyjyd" name="kqyjyd" class="mini-textbox" vtype="required;maxLength:100"  width="100%" requiredErrorText="跨区域经营地不能为空" maxLength="100" /></td>

        </tr>
    
        <tr>
            <th height="40px"><span class="txt-red">*</span>企业所得税：</th>
            <td><input id="qysds" required="true" requiredErrorText="企业所得税不能为空" name="qysds" class="mini-combobox" width="100%" /></td>
            <th height="40px"><span class="txt-red">*</span>跨区域涉税事项联系人：</th>
            <td><input id="kqysssxlxr" name="kqysssxlxr" class="mini-textbox" vtype="required;maxLength:30"  width="100%" requiredErrorText="跨区域涉税事项联系人不能为空" maxLength="30" /></td>
        </tr>
        <tr>
            <th height="40px">跨区域涉税事项联系人座机：</th>
            <td><input id="lxrzj" name="lxrzj" class="mini-textbox" vtype="zjphone;maxLength:15"  width="100%" requiredErrorText="联系人座机不能为空" maxLength="15" /></td>
        
            <th height="40px"><span class="txt-red">*</span>跨区域涉税事项联系人手机号：</th>
            <td><input id="lxrsjh" name="lxrsjh" class="mini-textbox" vtype="mobilePhone;required"  width="100%" requiredErrorText="联系人手机号不能为空" /></td>
        </tr>
		<tr>
			<th>经办人座机：</th>
			<td><input id="jbrzj" name="jbrzj" class="mini-textbox" vtype="zjphone;maxLength:15"  width="100%"  maxLength="15" /></td>
		</tr>
    </table>
    <h5>跨区域经营情况</h5>
    <!--<div class="grid-toolbar wc_tool" data-bind-grid="wcjyzm_grid">-->
        <!--<a class="mini-button toolBtn-blue grid-add" iconCls="icon-add" onclick="wssqUtil.addRow('wcjyzm_grid','win1');scrollTo(0,0)">增加</a>-->
        <!--<a class="mini-button grid-edit" iconCls="icon-edit">修改</a>-->
        <!--<a class="mini-button grid-save" iconCls="icon-save">保存</a>-->
        <!--<a class="mini-button" iconCls="icon-remove" onclick="wcjyhdkj.deletSqb()">删除</a>-->
    <!--</div>-->
    <div id="wcjyzm_grid" class="mini-datagrid" style="width:1160px;height:100px;" allowResize="false"
         enabled="true" oncellendedit="wcjyhdkj.oncellendedit"
         showPager="false" showEmptyText="true" autoLoad="false" multiSelect="true" allowSortColumn="false"
         idField="id" checkSelectionOnly="true" allowCellSelect="true" allowCellEdit="true">
        <div property="columns">
            <div field="htmc" width="140" align="center" vtype="required"><span class="txt-red">*</span>
                合同名称<input property="editor" class="mini-textbox" maxLength="50" vtype="required;maxLength:50" />
            </div>
    
            <div field="htbh" width="120" align="center">
                合同编号<input property="editor" class="mini-textbox" maxLength="60" vtype="maxLength:60" />
            </div>
            
            <div field="wcjyhwyxqxq" vtype="required" align="center"
                 dateFormat="yyyy-MM-dd"><span class=" ">*</span>
                合同有效期起 <input property="editor" class="mini-datepicker" onvaluechanged="wcjyhdkj.onDateChanged"
                              format="yyyy-MM-dd" vtype="required" name="wcjyhwyxqxq"/>
            </div>

            <div field="wcjyhwyxqxz" width="100" vtype="required" align="center"
                 headeralign="center" allowsort="false" dateFormat="yyyy-MM-dd"><span class="txt-red">*</span>
                合同有效期止 <input property="editor" class="mini-datepicker" onvaluechanged="wcjyhdkj.onDateChanged"
                              format="yyyy-MM-dd" vtype="required" name="wcjyhwyxqxz"/>
            </div>
            <div field="wcjyhwzz" width="120" align="center" dataType="float" vtype="required"><span class="txt-red">*</span>
                合同金额<input property="editor" class="mini-moneybox" vtype="required" minValue="0.00" onvaluechanged="wcjyhdkj.jeNumber" />
            </div>
        </div>
    </div>


    <table class="form-table table_bg table-bg-green">
        <tr>
            <th style="width:100%;height: 70px;text-align: right;font-weight: bolder;">合同总金额：</th>
            <td class="htzje"><input id="htzje" name="htzje" class="mini-textbox"
                       enabled="false" style="width:160px;" vtype="required;" /></td>
        </tr>

    </table>
    </div>
</section>
