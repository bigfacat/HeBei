<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ylwcjyyq.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.wjzyqbg.ylwcjyyq" %>

<!DOCTYPE html>



<h2>预览</h2>
<section>
    <div class="wcjykjYl" >
        <div id="tabs1" class="mini-tabs tab-content" activeIndex="0" style="width:100%;">
            <div title="外出经营延期申请">
                <!--内容1开始-->
                <div id="wgzyq-yl-form" data-view-type="form">
                    <div>
                        <span>跨区域涉税事项编号</span>
                        <input class="mini-textbox" width="28%" readonly="true" name="wcjyhdssglzmbhText" >
                    </div>
                    <h5>纳税人基本信息</h5>
                    <div class="table_bg table_div" >
                        <table class="form-table table_bg"  width="100%" >
                            <tr>
                                <th width="17%">纳税人识别号(社会信用代码)：</th>
                                <td width="20%"><input name="nsrsbh" class="mini-textbox"
                                                       readonly="true" width="100%" /></td>
                                <th width="10%">纳税人名称：</th>
                                <td width="20%"><input name="nsrmc" class="mini-textbox"
                                                       readonly="true" width="100%" /></td>
                                <th width="10%">跨区域经营地：</th>
                                <td width="20%"><input name="wcjyd" class="mini-textbox"
                                                       readonly="true" width="100%" /></td>
                            </tr>
                            <tr>
                                <th>跨区域经营地行政区划：</th>
                                <td>
                                    <input  name="kqyjydxzqh" class="mini-textbox"
                                            readonly="true" width="100%" />
                                </td>
                                <th width="14%">跨区域经营地乡镇街道：</th>
                                <td>
                                    <input  name="kqyjydxzjd" class="mini-textbox"
                                            readonly="true" width="100%"/>
                                </td>
                                <th width="13%">跨区域经营有效期起：</th>
                                <td>
                                    <input name="zmyxqxq" class="mini-datepicker"
                                           readonly="true" width="100%"/>
                                </td>
                            </tr>
                            <tr>
                                <th width="10%">跨区域经营有效期止：</th>
                                <td>
                                    <input  name="zmyxqxz" class="mini-datepicker"
                                            readonly="true" width="100%"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <h5>跨区域经营情况</h5>
                    <div data-view-type="datagrid">
                        <div id="kqyjyqk-yl-grid"  data-type="gird" class="mini-datagrid" style="width:1160px;height:200px;" allowResize="false"
                             enabled="true" showPager="false" showEmptyText="true" autoLoad="false" allowSortColumn="false"
                             idField="id" >
                            <div property="columns">
                                <div field="wcjyhwmc" >合同名称</div>
                                <div field="htbh">合同编号</div>
                                <div field="htdfnsrmc">合同对方名称</div>
                                <div field="htdfnsrsbh">合同对方纳税人识别号/社会信用代码</div>
                                <div field="wcjyhwyxqxq" dateFormat="yyyy-MM-dd">
                                    合同有效期起<input readonly class="mini-datepicker" format="yyyy-MM-dd">
                                </div>
                                <div field="wcjyhwyxqxz" dateFormat="yyyy-MM-dd">
                                    合同有效期止<input readonly class="mini-datepicker" format="yyyy-MM-dd">
                                </div>
                                <div field="wcjyhwzz">合同金额</div>
                                <div field="zxyxqxz" align="center">最新有效期止</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div title="附报资料">
                <div class="bszl" data-view-type="datagrid">
                    <div id="fbzl-yl-grid" class="mini-datagrid" style="width:100%;height:260px;" allowResize="false"
                         enabled="true"
                         showPager="false" showEmptyText="true" autoLoad="false" multiSelect="true" allowSortColumn="false"
                         idField="id" checkSelectionOnly="true" allowCellSelect="true" allowCellEdit="true"
                         emptyText="该事项不需要上传附报资料">
                        <div property="columns">
                            <div type="indexcolumn" width="50">序号</div>
                            <div field="fbzlMc" class="xxxxx">资料名称</div>
                            <div field="scCount">上传数量</div>
                            <div field="applyStatus" renderer="onRenderApply">要求</div>
                            <!-- <div field="status" renderer="onRenderStatusText">状态</div> -->
                            <div field="status" renderer="ylonRenderOpearte" align="center">操作</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
