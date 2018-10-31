<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="personInfo.aspx.cs" Inherits="JlueTaxSystemHBGS.ucenter.YhglPlat.pages.personInfo.personInfo" %>

<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta name="renderer" content="webkit">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>个人信息</title>
  <link rel="stylesheet" href="../../lib/layerUI/css/layui.css">
  <link rel="stylesheet" href="../../styles/rewriteLayer.css">
  <link rel="stylesheet" href="../../styles/yhgl.css">
  <link rel="stylesheet" href="../../styles/accordion/accordion.css">
</head>
<style>
  .layui-table th,
  .layui-table td {
    text-align: center;
  }
</style>

<body>
  <div class="yhgl-personInfo" style="height:1000px;">
    <div class="layui-tab">
      <ul class="layui-tab-title">
        <li class="layui-this">身份特质</li>
        <li>履职能力</li>
      </ul>
      <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
          <ul id="accordion" class="accordion">
            <li>
              <div class="link"><span class="first">年龄</span><span class="second baseObj"></span><a class="disable">编辑</a></div>
              <div class="submenu" style="display: none;"></div>
            </li>
            <li class="open">
              <div class="link"><span class="first">教育情况</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" id="education">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">地区</label>
                    <div class="layui-input-block" id="dqSelect">
                    </div>
                  </div>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">最高学历</label>
                    <div class="layui-input-block">
                      <select name="zgxl" lay-filter="topEducation">
                        <option value="" disabled selected>请选择</option>
                        <option value="初中及以下">初中及以下</option>
                        <option value="高中">高中</option>
                        <option value="中专">中专</option>
                        <option value="大专">大专</option>
                        <option value="本科">本科</option>
                        <option value="研究生">研究生</option>
                        <option value="博士及以上">博士及以上</option>
                      </select>
                    </div>
                  </div>
                  </br>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">院校名称</label>
                    <div class="layui-input-block choice-school">
                      <input type="text" name="yxmc" placeholder="请输入院校" autocomplete="off" class="layui-input" />
                      <!-- <div class="school-component layui-anim layui-anim-upbit hidden" id="schoolComponent">
                        <h3>选择院校</h3>
                        <div class="school-select">
                          <div class="inline-block" id="provinceSelect">
                          </div>
                          <span class="font-color6">如没找到选择项，请选择其他手动填写</span>
                          <div class="inline-block hidden" id="inputSchool">
                            <input type="text" placeholder="请输入学校" autocomplete="off" class="layui-input">
                          </div>
                        </div>
                        <ul class="school-list" id="schoolList">
                        </ul>
                        <div class="school-action">
                          <button type="button" class="layui-btn layui-btn-small hidden" id="btnConfirm-school">确定</button>
                          <button type="button" class="layui-btn layui-btn-primary layui-btn-small" id="btnCancel-school">取消</button>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">毕业时间</label>
                    <div class="layui-input-block">
                      <input class="layui-input" name="bysj" placeholder="自定义日期格式" onclick="layui.laydate({elem: this, format: 'YYYY-MM-DD'})">
                    </div>
                  </div>
                  </br>
                  <!-- <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">当前状态</label>
                    <div class="layui-input-block">
                      <select name="dqzt" lay-filter="dqzt">
                      <option value="" disabled selected>请选择</option>
                      <option value="在读">在读</option>
                      <option value="已毕业">已毕业</option>
                    </select>
                    </div>
                  </div> -->
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="education">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <!-- <ul class="education">
                    {{each list as value i}}
                    <li>{{value}}</li>
                    {{/each}}
                    <li>
                      <i class="layui-icon">&#xe642;</i>
                      <i class="layui-icon" id="deleteEdu">&#xe640;</i>
                    </li>
                  </ul> -->
                <script id="educationTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{i+1}}</td>
                    <td>{{value.dq}}</td>
                    <td>{{value.yxmc}}</td>
                    <td>{{value.zgxl}}</td>
                    <!-- <td>{{value.dqzt}}</td> -->
                    <td>{{value.bysj}}</td>
                    <td><i class="layui-icon" id="editEdu" title="编辑">&#xe642;</i><i class="layui-icon" id="deleteEdu" title="删除">&#xe640;</i></td>
                  </tr>
                  {{/each}}
                </script>
                <div class="education">
                  <table class="layui-table">
                    <colgroup>
                      <col width="150">
                      <col width="200">
                      <col>
                    </colgroup>
                    <thead class="font-color3">
                      <tr>
                        <th style="width:8%">序号</th>
                        <th style="width:18%">地区</th>
                        <th style="width:24%">院校名称</th>
                        <th style="width:14%">最高学历</th>
                        <!-- <th style="width:12%">当前状态</th> -->
                        <th style="width:16%">毕业时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="educationData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <li>
              <div class="link"><span class="first">家庭情况</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">姓名</label>
                    <div class="layui-input-block">
                      <input type="text" name="xm" placeholder="请输入姓名" autocomplete="off" class="layui-input" lay-verify="required" />
                    </div>
                  </div>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">与本人关系</label>
                    <div class="layui-input-block">
                      <select name="ybrgx" lay-filter="">
                        <option value="父亲">父亲</option>
                        <option value="母亲">母亲</option>
                        <option value="子女">子女</option>
                        <option value="配偶">配偶</option>
                        <option value="兄弟姐妹">兄弟姐妹</option>
                        <option value="近亲属">近亲属</option>
                      </select>
                    </div>
                  </div>
                  </br>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">身份证号码</label>
                    <div class="layui-input-block">
                      <input type="text" name="sfzh" placeholder="请输入身份证号码" autocomplete="off" class="layui-input" lay-verify="sfzhm" />
                    </div>
                  </div>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">文化程度</label>
                    <div class="layui-input-block">
                      <select name="whcd" lay-filter="">
                        <option value="初中及以下">初中及以下</option>
                        <option value="高中">高中</option>
                        <option value="中专">中专</option>
                        <option value="大专">大专</option>
                        <option value="本科">本科</option>
                        <option value="研究生">研究生</option>
                        <option value="博士">博士</option>
                      </select>
                    </div>
                  </div>
                  </br>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">手机号码</label>
                    <div class="layui-input-block">
                      <input type="text" name="dhhm" placeholder="手机号码" autocomplete="off" class="layui-input" lay-verify="sjhm" />
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="family">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <!-- 家庭情况模版 -->
                <script id="familyTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{i+1}}</td>
                    <td>{{value.xm}}</td>
                    <td>{{value.ybrgx}}</td>
                    <td>{{value.sfzh}}</td>
                    <td>{{value.whcd}}</td>
                    <td>{{value.dhhm}}</td>
                    <td><i class="layui-icon" id="editFamily" title="编辑" style="cursor: pointer;">&#xe642;</i><i class="layui-icon" id="deleteFamily" title="删除" style="cursor: pointer;">&#xe640;</i></td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th style="width:8%">序号</th>
                        <th style="width:18%">姓名</th>
                        <th style="width:24%">与本人关系</th>
                        <th style="width:14%">身份证号码</th>
                        <th style="width:12%">文化程度</th>
                        <th style="width:16%">手机号码</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="familyData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <li>
              <div class="link"><span class="first">居住年限</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">居住年限</label>
                    <div class="layui-input-block">
                      <select name="jznx">
                      <option value="非省内居住">非省内居住</option>
                      <option value="省内居住1年以下">省内居住1年以下</option>
                      <option value="省内居住1-3年（不含）">省内居住1-3年（不含）</option>
                      <option value="省内居住3–5年（不含）">省内居住3–5年（不含）</option>
                      <option value="省内居住5年以上">省内居住5年以上</option>
                    </select>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="jznx">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <script id="jznxTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{value.jznx}}</td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th>居住年限</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="jznxData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <li>
              <div class="link"><span class="first">消费能力</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">消费金额</label>
                    <div class="layui-input-block">
                      <input type="text" name="xfje" placeholder="请输入消费金额" autocomplete="off" class="layui-input" lay-verify="jeNum" />
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label font-color6">消费凭证</label>
                    <input type="file" name="xfpz" class="layui-upload-file" lay-type="images">
                    <span class="font-color9">提示：请上传消费取得的票据，可证明其消费能力，票据包括发票、财政收据、车票、机票或行程单等</span>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="xfnl">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <script id="xfnlTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{i+1}}</td>
                    <td>{{value.xfje}}</td>
                    <td>{{if value.xfpz}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.xfpz}}" alt="消费凭证" width="300">{{/if}}</td>
                    <td><i class="layui-icon" id="deleteXfnl" title="删除" style="cursor: pointer;">&#xe640;</i></td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th style="width:10%">序号</th>
                        <th style="width:30%">消费金额</th>
                        <th style="width:50%">消费凭证</th>
                        <th style="width:10%">操作</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="xfnlData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <!-- <li>
              <div class="link"><span class="first">经济能力</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">机动车</label>
                    <div class="layui-input-block">
                      <select name="jdc">
                      <option value="无">无</option>
                      <option value="10万以下（含）">10万以下（含）</option>
                      <option value="10–20万（不含）">10–20万（不含）</option>
                      <option value="20–50万（不含）">20–50万（不含）</option>
                      <option value="50万以上（含）">50万以上（含）</option>
                    </select>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label font-color6">不动产证明</label>
                    <input type="file" name="bdctp" class="layui-upload-file" id="bdczmUpload" lay-type="images" data-value="">
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label font-color6">消费证明</label>
                    <input type="file" name="xfnltp" class="layui-upload-file" id="xfzmUpload" lay-type="images" data-value="">
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="economic">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <script id="economicTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{value.jdc}}</td>
                    <td>{{if value.bdctp}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.bdctp}}" alt="不动产证明" width="300">{{/if}}</td>
                    <td>{{if value.xfnltp}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.xfnltp}}" alt="消费证明" width="300">{{/if}}</td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th style="width:10%">机动车</th>
                        <th style="width:44%">不动产证明图片</th>
                        <th style="width:44%">消费证明图片</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="economicData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li> -->
            <li>
              <div class="link"><span class="first">个人荣誉</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <!-- <div class="layui-form-item">
                    <label class="layui-form-label font-color6">荣誉级别</label>
                    <div class="layui-input-block">
                      <input type="checkbox" title="曾经获得县级劳动模范" lay-skin="primary"></br>
                      <input type="checkbox" title="曾经获得市级劳动模范" lay-skin="primary"></br>
                      <input type="checkbox" title="曾经获得省级劳动模范" lay-skin="primary"></br>
                      <input type="checkbox" title="曾经获得全国级劳动模范" lay-skin="primary"></br>
                      <input type="checkbox" title="曾经获得省部级“先进生产者”、“先进工作者”称号" lay-skin="primary"></br>
                      <input type="checkbox" title="曾经获得全国“先进生产者”、“先进工作者”称号" lay-skin="primary">
                    </div>
                  </div> -->
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">荣誉级别</label>
                    <div class="layui-input-block">
                      <select name="grryjb">
                      <option value="无">无</option>
                      <option value="曾经获得县级劳动模范">曾经获得县级劳动模范</option>
                      <option value="曾经获得市级劳动模范">曾经获得市级劳动模范</option>
                      <option value="曾经获得省级劳动模范">曾经获得省级劳动模范</option>
                      <option value="曾经获得全国级劳动模范">曾经获得全国级劳动模范</option>
                      <option value="曾经获得省部级“先进生产者”、“先进工作者”称号">曾经获得省部级“先进生产者”、“先进工作者”称号</option>
                      <option value="曾经获得全国“先进生产者”、“先进工作者”称号">曾经获得全国“先进生产者”、“先进工作者”称号</option>
                    </select>
                    </div>
                  </div>
                  </br>
                  <div class="layui-form-item">
                    <label class="layui-form-label font-color6">荣誉证书</label>
                    <input type="file" name="grryjbpz" class="layui-upload-file" lay-type="images">
                    <span class="font-color9">请上传个人荣誉证书等</span>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="honor">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <script id="grryTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{i+1}}</td>
                    <td>{{value.grryjb}}</td>
                    <td>{{if value.grryjbpz}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.grryjbpz}}" alt="荣誉证书" width="300">{{/if}}</td>
                    <td><i class="layui-icon" id="deleteGrry" title="删除" style="cursor: pointer;">&#xe640;</i></td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th style="width:10%">序号</th>
                        <th style="width:30%">荣誉级别</th>
                        <th style="width:40%">荣誉证书图片</th>
                        <th style="width:10%">操作</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="grryData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <li>
              <div class="link"><span class="first">不动产价值</span><span class="second baseObj"></span><a class="a-show">编辑</a><a class="a-hidden">收起</a></div>
              <div class="submenu" style="display: none;">
                <form class="layui-form mt20">
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">不动产价值</label>
                    <div class="layui-input-block">
                      <input type="text" name="bdcjz" placeholder="请输入不动产价值" autocomplete="off" class="layui-input" lay-verify="jeNum" />
                    </div>
                  </div>
                  </br>
                  <div class="layui-form-item layui-inline">
                    <label class="layui-form-label font-color6">不动产面积</label>
                    <div class="layui-input-block">
                      <input type="text" name="bdcmj" placeholder="面积（㎡）" autocomplete="off" class="layui-input" lay-verify="number" />
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label font-color6">不动产产权证明</label>
                    <input type="file" name="cczm" class="layui-upload-file" lay-type="images">
                    <span class="font-color9">提示：请上传不动产产权证明等</span>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block">
                      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="bdcjz">保存</button>
                      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                  </div>
                </form>
                <script id="bdcjzTpl" type="text/html">
                  {{each list as value i}}
                  <tr>
                    <td>{{i+1}}</td>
                    <td>{{value.bdcjz}}</td>
                    <td>{{value.bdcmj}}</td>
                    <td>{{if value.cczm}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.cczm}}" alt="不动产证明图片" width="300">{{/if}}</td>
                    <td><i class="layui-icon" id="deleteBdcjz" title="删除" style="cursor: pointer;">&#xe640;</i></td>
                  </tr>
                  {{/each}}
                </script>
                <div style="padding:0 30px">
                  <table class="layui-table">
                    <thead class="font-color3">
                      <tr>
                        <th style="width:10%">序号</th>
                        <th style="width:15%">不动产价值</th>
                        <th style="width:15%">不动产面积</th>
                        <th style="width:50%">不动产产权证明</th>
                        <th style="width:10%">操作</th>
                      </tr>
                    </thead>
                    <tbody class="font-color6" id="bdcjzData">
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="layui-tab-item">
          <p style="color:#de6464">提示：请确保您的信息真实有效，上传虚假的信息将对您的信用产生负面影响。</p>
          <form class="layui-form mt20">
            <div class="layui-form-item layui-inline">
              <label class="layui-form-label font-color6">履职能力</label>
              <div class="layui-input-block">
                <select name="lznl">
                <option value="无">无</option>
                <option value="会计证">会计证</option>
                <option value="会计员">会计员</option>
                <option value="助理会计师">助理会计师</option>
                <option value="会计师">会计师</option>
                <option value="副高级会计师">副高级会计师</option>
                <option value="高级会计师">高级会计师</option>
              </select>
              </div>
            </div>
            <div class="layui-form-item">
              <label class="layui-form-label font-color6">能力资格</label>
              <input type="file" name="lznltp" class="layui-upload-file" lay-type="images">
            </div>
            <div class="layui-form-item layui-inline">
              <label class="layui-form-label font-color6">履职年限</label>
              <div class="layui-input-block">
                <select name="lznx">
                <option value="1年以下">1年以下</option>
                <option value="1-2年（不含）">1-2年（不含）</option>
                <option value="2-5年（不含）">2-5年（不含）</option>
                <option value="5年及以上">5年及以上</option>
              </select>
              </div>
            </div>
            <div class="layui-form-item">
              <div class="layui-input-block">
                <button class="layui-btn layui-btn-normal" lay-submit lay-filter="lznl">保存</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
              </div>
            </div>
            <script id="lznlTpl" type="text/html">
              {{each list as value i}}
              <tr>
                <td>{{value.lznl}}</td>
                <td>{{value.lznx}}</td>
                <td>{{if value.lznltp}}<img src="/ucenter/api/nologin/viewpic?fileKey={{value.lznltp}}" alt="能力资格图片" width="300">{{/if}}</td>
              </tr>
              {{/each}}
            </script>
            <div style="padding:0 30px">
              <table class="layui-table">
                <thead class="font-color3">
                  <tr>
                    <th style="width:20%">履职能力</th>
                    <th style="width:20%">履职年限</th>
                    <th style="width:60%">能力资格图片</th>
                  </tr>
                </thead>
                <tbody class="font-color6" id="lznlData">
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- 省份模版引擎 begin -->
  <script id="provinceTpl" type="text/html">
    <select name="province" lay-filter="provinceSelect">
    <option value="" disabled selected>请选择省份</option>
    {{each list as value i}}
    <option value="{{i}}">{{value}}</option>
    {{/each}}
  </select>
  </script>
  <!-- 省份模版引擎 end -->
  <!-- 地区模版引擎 begin -->
  <script id="dqTpl" type="text/html">
    <select name="dq" lay-filter="dqSelect">
    <option value="" disabled selected>请选择省份</option>
    {{each list as value i}}
    <option value="{{value}}">{{value}}</option>
    {{/each}}
  </select>
  </script>
  <!-- 地区模版引擎 end -->
  <!-- 院校模版引擎begin -->
  <script id="schoolTpl" type="text/html">
    {{each list as value i}}
    <li>{{value}}</li>
    {{/each}}
  </script>
  <!-- 院校模版引擎end -->
  <!-- 编辑模版引擎begin -->
  <script id="editTpl" type="text/html">
    <form class="layui-form">
      {{each list as obj i}}
      <div class="layui-form-item">
        <label class="layui-form-label font-color6" style="width:70px">{{obj.key}}</label>
        <div class="layui-input-block">
          <input type="text" name="{{obj.name}}" class="layui-input" value="{{obj.value}}" />
        </div>
      </div>
      {{/each}}
    </form>
  </script>
  <!-- 编辑模版引擎end -->
  <script src="../../lib/base1/jquery.min.js" type="text/javascript"></script>
  <script src="../../lib/artTemplate/template.js"></script>
  <script src="../../scripts/commonjs/accordion/accordion.js"></script>
  <script src="../../scripts/commonjs/httpService/httpService.js"></script>
  <script src="../../lib/layerUI/layui.js"></script>
  <script src="../../scripts/commonjs/validator.js"></script>
  <script src="./personInfoService.js"></script>
  <script src="./personInfo.js"></script>
</body>

</html>

