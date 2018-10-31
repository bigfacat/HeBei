<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wkc-play.aspx.cs" Inherits="JlueTaxSystemHeBeiGS.login_web.wkc.wkc_play" %>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>云厅系列微课程</title>
    <link rel="stylesheet" href="../style/login.css">
    <link rel="stylesheet" href="../style/wkc.css">
    <script src="/login-web/js/jquery/jquery.min.js"></script>
</head>
<body>
<div class="header-container">
    <div class="header"></div>
</div>
<div class="wkc-bg"></div>
<div class="wkc-play">
    <div class="wkc-bread-nav">
        我的云厅><snap id="course-name"></snap>
    </div>
    <div class="wkc-actions">
        <a href="wkc-index.html" class="wkc-back">返回</a>
        <span class="wkc-title">注册云厅2.0并登录</span>
    </div>
    <div class="">
        <div class="wkc-video" id="video">
            系统检测到您的浏览器没有安装视屏播放插件，需要<a href="http://www.macromedia.com/go/getflashplayer">下载Flash插件</a>
        </div>
        <div class="wkc-2wm">
            <div>您可以拿起手机扫描下面的二维码，随时观看云厅系列微课程！</div>
            <img src="../images/zhytApp-2wm.jpg" width="162" height="162" alt="云厅系列微课程手机二维码">
        </div>
    </div>
</div>
<div class="container">
    <div class="footer">
        <ul>
            <li><a href="http://bszs.conac.cn/sitename?method=show&id=05EA5B53D7BB4226E053022819AC7219" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="http://dcs.conac.cn/image/red.png" data-bd-imgshare-binded="1"></a></li>
            <li><a target="_blank" href="http://www.he-n-tax.gov.cn/hbgsww_new/ssxc/swyw/tzgg/">公示公告</a></li>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">冀ICP备13002433</a></li>
            <li>
                <script type="text/javascript">
                    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                    document.write(unescape("%3Cspan id='cnzz_stat_icon_1261635656'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1261635656%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));

                    $('#dzjg').html(unescape("%3Cspan id='_ideConac' %3E%3C/span%3E%3Cscript src='http://dcs.conac.cn/js/05/000/0000/40683600/CA050000000406836000001.js' type='text/javascript'%3E%3C/script%3E"));
                </script>
            </li>
            <li style="color: #666666; font-size: 14px;">技术支持电话：0311-88628084</li>
        </ul>
    </div>
</div>

<script src="../ssoserver/scripts/swfobject.js"></script>
<script>
    var data = JSON.parse(sessionStorage.getItem('videoData'));
    var courseName = data.name;

    $('#course-name,.wkc-title').html(courseName);

    var v = new SWFObject("../ssoserver/scripts/flvplayer.swf", "single", "740", "440", "9");
    v.addParam("allowfullscreen", "true");       //可以让视频撑满限定的宽度和高度*
    v.addParam("wmode", "transparent");      //可以将视频设置不为最高层，其他层可以覆盖住视频*
    v.addVariable('volume', '100');
    v.addVariable("autostart", 'false');
    v.addVariable("overstretch", "true");
    v.addVariable("file", data.video);//视频路径
    v.addVariable("image", data.post);//设置视频封面图
    v.addVariable("clicktext", "开始");
    v.write("video");
</script>
</body>
</html>