<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="txwjzyqbg.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wjzyqbg.txwjzyqbg" %>

<!DOCTYPE html>


<h2>外管证延期报告</h2>
<section>
    <!--内容1开始-->
    <div id="wgzyq-form">
        <div>
            <span>跨区域涉税事项管理编号</span>
            <input class="mini-combobox" width="28%" id="wcjyhdssglzmbh"  valueField="wcjyzmuuid" required="true" valueFromSelect="true" showClose="false"
                   requiredErrorText="请先选择跨区域涉税事项管理编号"  onvaluechanged='wjzyqbg.sssxValueChanegd'
                   textField="wcjyhdssglzmbh"  name="wcjyhdssglzmbh"  >
        </div>
        <h5>纳税人基本信息</h5>
        <div class="table_bg table_div" >
            <table class="form-table table_bg" id="nsrjbxx-form" >
                <tr>
                    <th width="17%">纳税人识别号(社会信用代码)：</th>
                    <td width="20%"><input id="nsrsbh" name="nsrsbh" class="mini-textbox"
                                           readonly="true" width="100%" /></td>
                    <th width="10%">纳税人名称：</th>
                    <td width="20%"><input id="nsrmc" name="nsrmc" class="mini-textbox"
                                           readonly="true" width="100%" /></td>
                    <th width="10%">跨区域经营地：</th>
                    <td width="20%"><input id="kqyjyd" name="wcjyd" class="mini-textbox"
                                           readonly="true" width="100%" /></td>
                </tr>
                <tr>
                    <th>跨区域经营地行政区划：</th>
                    <td>
                        <input id="kqyjydxzqh" name="kqyjydxzqh" class="mini-textbox"
                               readonly="true" width="100%" />
                    </td>
                    <th width="14%">跨区域经营地乡镇街道：</th>
                    <td>
                        <input id="kqyjydxzjd" name="kqyjydxzjd" class="mini-textbox"
                               readonly="true" width="100%"/>
                    </td>
                    <th width="13%">跨区域经营有效期起：</th>
                    <td>
                        <input id="zmyxqxq" name="zmyxqxq" class="mini-datepicker" format = "yyyy-MM-dd"
                               readonly="true" width="100%"/>
                    </td>
                </tr>
                <tr>
                    <th width="10%">跨区域经营有效期止：</th>
                    <td>
                        <input id="zmyxqxz" name="zmyxqxz" class="mini-datepicker" format = "yyyy-MM-dd"
                               readonly="true" width="100%"/>
                    </td>
                </tr>
            </table>
        </div>
        <h5>跨区域经营情况</h5>
        <div id="kqyjyqk_grid" class="mini-datagrid" style="width:1160px;height:200px;" allowResize="false"
              showPager="false" showEmptyText="true"  allowSortColumn="false" allowHeaderWrap="true"
             autoLoad = "false" oncellvalidation="wjzyqbg.oncellvalidation"
             allowCellSelect="true" allowCellEdit="true" oncellcommitedit="wjzyqbg.onCellCommitEdit">
            <div property="columns">
                <div field="wcjyhwmc" >合同名称</div>
                <div field="htbh">合同编号</div>
                <div field="htdfnsrmc">合同对方名称</div>
                <div field="htdfnsrsbh" >合同对方纳税人识别号/社会信用代码</div>
                <div field="wcjyhwyxqxq" dateFormat="yyyy-MM-dd">
                    合同有效期起<input readonly class="mini-datepicker" format="yyyy-MM-dd">
                </div>
                <div field="wcjyhwyxqxz" dateFormat="yyyy-MM-dd">
                    合同有效期止<input readonly class="mini-datepicker" format="yyyy-MM-dd">
                </div>
                <div field="wcjyhwzz">合同金额</div>
                <div field="zxyxqxz" dateFormat="yyyy-MM-dd" vtype="required" align="center">
                    最新有效期止<input  property="editor" class="mini-datepicker"  format="yyyy-MM-dd">
                </div>
            </div>
        </div>
    </div>
</section>
