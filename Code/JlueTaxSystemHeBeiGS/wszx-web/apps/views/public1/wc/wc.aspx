<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wc.aspx.cs" Inherits="JlueTaxSystemHBGS.wszx_web.apps.views.public1.wc.wc" %>

<!DOCTYPE html>

<h2>完成</h2>
<section>
    <div class="public-wc">
        <div class="wc-content block" id="content"><span class="success-ico">尊敬的纳税人您好，您的</span><span id="current-swsxMc"></span>已经成功提交，税务机关处理结果为： <span class="sl-result swsx-pass" id="sl-result">受理通过</span><br>
            <span>您可以<span id="file-action">签收</span>税务事项通知书，查看具体处理结果！</span></div>
        <div class="wc-actions inline-block" id="actions">
            <button id="viewSqzl">查看我的申请资料</button>
            <button id="signFile">签收</button>
            <button id="downloadDsfp">下载证明单</button>
            <button id="close">关闭</button></div>
    </div>
</section>
