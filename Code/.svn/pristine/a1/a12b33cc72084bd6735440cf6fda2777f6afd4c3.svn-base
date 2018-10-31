<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wkc-index.aspx.cs" Inherits="JlueTaxSystemHBGS.login_web.wkc.wkc_index" %>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>云厅系列微课程</title>
    <link rel="stylesheet" href="../style/normalize.css">
    <link rel="stylesheet" href="../style/login.css">
    <link rel="stylesheet" href="../style/wkc.css">
    <script src="/login-web/js/jquery/jquery.min.js"></script>
</head>
<body>
<div class="header-container">
    <div class="header"></div>
</div>
<div class="wkc-bg"></div>
<div class="wkc-content">
    <div class="container">
        <div class="wkc-modules" id="wkc-modules">
           <!-- <span class="item active" data-slide="wdyt">我的云厅</span>
            <span class="item" data-slide="wysb">我要申报</span>
            <span class="item" data-slide="wyyp">我要用票</span>
            <span class="item" data-slide="wydj">我要登记</span>
            <span class="item" data-slide="yhrd">优惠/认定</span>
            <span class="item" data-slide="wyyy">我要预约</span>
            <span class="item" data-slide="qt">其他</span>-->
        </div>
        <div class="wkc-slides" id="wkc-slides">
            <!--<div class="slide shown" id="wdyt">
                <div class="course-item course-mgr">
                    <a href="wkc-play.html">
                        <img src="../images/wkc/注册云厅2.0并登录.jpg" width="278" height="156" alt="">
                        <div class="course-title">注册云厅2.0并登录</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item course-mgr">
                    <a href="">
                        <img src="../images/wkc/进入云厅.jpg" width="278" height="156" alt="">
                        <div class="course-title">进入云厅</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item course-mgr">
                    <a href="">
                        <img src="../images/wkc/办税指引及自定义常用功能.jpg" width="278" height="156" alt="">
                        <div class="course-title">办税指引及自定义常用功能</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item">
                    <a href="">
                        <img src="../images/wkc/已办事项.jpg" width="278" height="156" alt="">
                        <div class="course-title">已办事项</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item course-mgr">
                    <a href="">
                        <img src="../images/wkc/我的企业.jpg" width="278" height="156" alt="">
                        <div class="course-title">我的企业</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item course-mgr">
                    <a href="">
                        <img src="../images/wkc/修改密码.jpg" width="278" height="156" alt="">
                        <div class="course-title">修改密码</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item course-mgr">
                    <a href="">
                        <img src="../images/wkc/智能机器人.jpg" width="278" height="156" alt="">
                        <div class="course-title">智能机器人</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
                <div class="course-item">
                    <a href="">
                        <img src="../images/wkc/选择或切换办税企业.jpg" width="278" height="156" alt="">
                        <div class="course-title">选择或切换办税企业</div>
                        <div class="view-times">775人学习</div>
                    </a>
                </div>
            </div>
            <div class="slide" id="wysb">我要申报</div>
            <div class="slide" id="wyyp">我要用票</div>
            <div class="slide" id="wydj">我要登记</div>
            <div class="slide" id="yhrd">优惠/认定</div>
            <div class="slide" id="wyyy">我要预约</div>
            <div class="slide" id="qt">其他</div>-->
        </div>

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
</div>

<script>

    $(function () {

        $('#wkc-modules').on('click','.item',function () {
            $(this).addClass('active').siblings().removeClass('active');
            var tag = $(this).attr('data-slide');
            $('#'+tag).show().siblings().hide();
        });
        $('#wkc-slides').on('click','a',function () {
            var id = $(this).attr('data-wkcId');
            var name = $(this).find('.course-title').html();

            sessionStorage.setItem('videoData',JSON.stringify({
                video:$(this).attr('data-video'),
                post:$(this).find('img').attr('src'),
                name:name
            }));

            var times= $(this).find('.view-times');
            times.html(parseInt(times.html())+1);
            $.ajax({
                //url:'/wszx-web/api/wkc/submit/visitCount/' + id,
                url: '/wszx-web/api/wkc/submit/visitCount/000001.ashx',
                type:'post'
            });
        });

        $.ajax({
            url:'/wszx-web/api/wkc/init/wkc.ashx',
            type:'get',
            async:false,
            success:function (data) {
                if(data.success && data.value){
                    initVideoList(data.value);
                }
            },error:function () {

            }

        });

        function initVideoList(data) {
            var item = {};
            var wkcDlMcHtml='',slidesHtml='';
            for (var i = 0, len = data.length; i < len; i++) {
                item = data[i];
                var wkcList = item.wkcList;
                var slideId = 'slide-'+item.Dldm;
                wkcDlMcHtml+='<span class="item" data-slide="'+ slideId +'">'+ item.Dlmc +'</span>';
                var wkcSlideHtml = '<div class="slide" id="'+ slideId +'">';

                var mgr = ' course-mgr';
                for(var j=0,l=wkcList.length;j<l;j++){
                    var mgr = ' course-mgr';
                    var wkc=wkcList[j];
                    if((j+1)%4===0){
                        mgr = '';/*data-wkcId="'+ wkc.wkcId +'" href=wkc-play.html?'+ wkc.videoUrl+ '#'+ wkc.imgUrl +' data-wkcId="'+ +'"*/
                    }
                    wkcSlideHtml+='<div class="course-item'+ mgr +'">' +
                        '                        <a data-wkcId="'+ wkc.wkcId +'" href="wkc-play.aspx" data-video="'+ wkc.videoUrl+'" target="_blank">' +
                        '                            <img src="'+ wkc.imgUrl +'" width="278" height="156" alt="">' +
                        '                            <div class="course-title">'+ wkc.wkcMc+'</div>' +
                        '                            <div class="view-times">' + wkc.visitsCount+'</div>' +
                        '                        </a>' +
                        '                    </div>';
                }
                wkcSlideHtml+='</div>';
                slidesHtml+=wkcSlideHtml;
            }
            $('#wkc-slides').html(slidesHtml);
            $('#wkc-modules').html(wkcDlMcHtml).find('.item').first().click();
        }
    });


</script>
</body>
</html>
