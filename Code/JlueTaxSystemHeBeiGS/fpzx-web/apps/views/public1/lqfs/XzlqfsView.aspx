<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="XzlqfsView.aspx.cs" Inherits="JlueTaxSystemHBGS.fpzx_web.apps.views.public1.lqfs.XzlqfsView" %>

<!DOCTYPE html>

<link rel="stylesheet" href="../public1/lqfs/lqfs.css">
<h2>选择领取方式</h2>
<section class="second-step xzlqfs-step">
    <div id="new-xzlqfs">
        <p class="top-title">尊敬的纳税人您好，请选择领票方式：</p>
        <ul class="nav">
            <li data-type="type-rg" class="checked" data-num="01">
                <img src="../../../apps/images/public1/ico-txsq-dtck.jpg"><p>人工大厅领取</p>
            </li>
            <li data-type="type-citydtzz" data-num="02">
                <img src="../../../apps/images/public1/ico-txsq-zzzd.jpg"><p>大厅自助终端领取</p>
            </li>
            <li data-type="type-post" style="display: inline-block" data-num="03">
                <img src="../../../apps/images/public1/ico-txsq-yj.jpg"><p>邮寄给我</p>
            </li>
        </ul>
        <div class="type-content">
            <p class="title">温馨提示：</p>
            <p>1、前往大厅窗口领取，建议避开征税期</p>
            <p>2、查询税务大厅地址请点这里：<a class="text-blue" target="_blank" href="/BsfwtWeb/pages/cx/bsfwtxx.aspx">税务大厅地址</a></p>
            <p>3、若您申领了增值税普通电子发票，在增值税发票税控开票软件下载即可</p>
            <p id="xxyj-text">4、选择邮寄需要支付一定的邮费</p>
        </div>
    </div>
</section>
