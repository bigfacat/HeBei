var isUpload = false;
var smrzzlVOs = [];
$(function () {
    var validator = new Validator(); // 校验实例
    //实名认证信息单例
    var phone_xh = '', // 星号电话
		phone_zs = '', // 真实电话
		yhzh_zs = '';
    var accountInfo = {
        mobileNum: "",
        initData: null,
        ylsmPass: false, //是否通过银行实名认证
        api: {
            checkYzm: "/ucenter/api/checkCaptcha",
            zrrxxwh: "/ucenter/api/yhgl/zrrxxwh"
        },
        /**
         * [ajaxFun ajax请求]
         * @param  {[string]} url    [api]
         * @param  {[string]} method [请求方法，post or get]
         * @param  {[type]} params [请求参数]
         * @return {[object]}        [promise]
         */
        ajaxFun: function (url, method, params, bool) {
            var deferred = $.Deferred();
            $.ajax({
                url: url,
                type: method,
                data: params,
                contentType: "application/json",
                async: bool,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise();
        },
        //修改接口
        modifyInfo: function (param) {
            return accountInfo.ajaxFun(accountInfo.api.zrrxxwh, "POST", param,
              true);
        },
        //校验图形验证码
        isValidYzm: function (code) {
            var flag = false;
            var param = {
                "captcha": code
            };
            accountInfo.ajaxFun(accountInfo.api.checkYzm, "GET", param, false)
              .then(
                function (data) {
                    if (data.success) {
                        flag = true;
                    } else { }
                },
                function (err) {
                    parent.layer.alert("校验图片验证码失败");
                });
            return flag;
        },

        /**
         * [setData 初始化实名信息]
         * @param {[string]} form [页面的form表单id]
         * @param {[object]} data [后端返回的数据]
         */
        setData: function (form, data) {

            var mobile = transformToEllipsis(data.mobile);
            var yhkh = transformToEllipsiss(data.yhkh, 4, 17, false);
            var sfzhm = transformToEllipsiss(data.sfzhm, 8, 15, true);
            var arrData = [data.xm, sfzhm, mobile, yhkh];
            var oForm = $("#" + form);
            var input = oForm.find("ul").find("input");
            accountInfo.mobileNum = mobile;
            for (var i = 0; i < arrData.length; i++) {
                input.eq(i).val(arrData[i]);
            }
            phone_xh = mobile;
            phone_zs = data.mobile;
            yhzh_zs = data.yhkh;
            // 身份照片信息：
            var photo = data.smrzzlVOs;
            accountInfo.photoObj = {};
            for (var i = 0; i < photo.length; i++) {
                accountInfo.photoObj[photo[i].smrzzllx] = photo[i].smrzzlkey;
            }
            accountInfo.photoObj.SFZZM ? $('.SFZZM img').attr('src', '/ucenter/api/nologin/viewpic?fileKey=' + accountInfo.photoObj.SFZZM) : '';
            accountInfo.photoObj.SFZFM ? $('.SFZFM img').attr('src', '/ucenter/api/nologin/viewpic?fileKey=' + accountInfo.photoObj.SFZFM) : '';
            accountInfo.photoObj.SCSFZZP ? $('.SCSFZZP img').attr('src', '/ucenter/api/nologin/viewpic?fileKey=' + accountInfo.photoObj.SCSFZZP) : '';
        },
        initAccountinfo: function () {
            $.ajax({
                url: '/ucenter/api/yhgl/initAccountinfo.ashx',
                type: "get",
                async: false,
                success: function (json) {
                    if (json.success) {
                        //缓存刚初始化进来的数据
                        accountInfo.initData = json.data;
                        accountInfo.setData("accountInfo", json.data);
                    } else {
                        parent.layer.alert(json.message);
                    }
                },
                error: function (err) {
                    parent.layer.alert("获取账户信息失败");
                }
            });
        },
        sendMessage: function () {
            var oForm = $("#accountInfo");
            var mobileNum = oForm.find("input[name='mobile']").val();
            var code = oForm.find("input[name='yzmcode']").val();
            //先判断手机号有没有更改
            if (mobileNum === accountInfo.mobileNum) {
                parent.layer.msg('手机号未做修改，不能发送短信');
                return;
            }
            //判断手机号是否输入正确
            if (!validator.isPhoneNum(mobileNum)) {
                parent.layer.msg('请先输入正确的手机号码');
                return;
            }
            //判断验证码是否输入
            if (!code || code === "") {
                parent.layer.msg('请先输入图形验证码');
                return;
            }
            //判断验证码是否输入正确
            if (!accountInfo.isValidYzm(code)) {
                parent.layer.msg('请先输入正确的图形验证码');
                return;
            }
            sendSMSCodeByCaptcha($("#sendMessage"), mobileNum, code);
        },
        modifyValid: function (sjhm, yhkh) {
            var o = {
                isValid: true,
                mess: "请输入正确的手机号"
            };
            if (!validator.isPhoneNum(sjhm)) {
                o.isValid = false;
                return o;
            }
            if (accountInfo.ylsmPass && !validator.isNatural(yhkh)) {
                o.isValid = false;
                o.mess = "请输入正确的银行卡号";
                return o;
            }
            return o;
        },
        // 线上实名认证查询
        ylsmrzCx: function (data, callback) {
            var param = {
                "xm": data.xm,
                "sfzhm": data.sfzhm
            };
            $.ajax({
                url: "/ucenter/api/yhgl/ylsmrzCx.ashx",
                type: "POST",
                data: JSON.stringify(param),
                contentType: "application/json",
                success: function (res) {
                    if (res.success) {
                        callback(res.value);
                    } else {
                        parent.layer.msg(res.message);
                    }
                },
                error: function (res) {
                    parent.layer.alert('系统异常，请稍后再试...');
                }
            });
        }
    };

    //获取系统参数
    function getXtcs(paramName) {
        var result = "";
        $.ajax({
            url: "/ucenter/api/getXtcs",
            type: 'GET',
            async: false,
            data: {
                paramCode: paramName,
                random: Math.random()
            },
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    result = res.data;
                }
            },
        });
        return result;
    }

    /**
     * [registerSendCode 用户注册手机短信认证码]
     * @param  {[type]} obj     [当前点击发送对象]
     * @param  {[string]} mobile  [手机号]
     * @param  {[string]} yzmcode [图片验证码]
     * @return {[type]}         [boolean]
     */
    function registerSendCode(obj, mobile, yzmcode, sfzhm, xm) {
        // var url = "/ucenter/api/registerSendCode";
        var layIndex = parent.layer.load(0, {
            shade: [0.1, '#000']
        });
        $.ajax({
            url: "/ucenter/api/share/get/sendCodeByCaptchaCheckZG",
            type: "GET",
            data: {
                phone: mobile,
                code: yzmcode,
                sfzhm: sfzhm
            },
            success: function (res) {
                if (!res.success) {
                    if (res.messageCode == '80480610') {
                        parent.layer.confirm(mobile +
                          "不是您在税务机关备案的手机号，请先变更您在税务机关备案的手机号，再进行实名认证信息的变更！", {
                              title: '提示信息',
                              btn: ['我要变更', '取消'],
                          },
                          function (index) {
                              parent.layer.close(index);
                              top.location.href = getXtcs("BSR_BGDJ_URL");
                          },
                          function (index) {
                              parent.layer.close(index);
                          });
                    } else {
                        parent.layer.alert(res.message);
                    }
                    //刷新图片验证码
                    refreshCaptcha('#tpcode');
                } else {
                    obj.attr("disabled", true);
                    timeCountDown(obj, 60); // 180
                }
                parent.layer.close(layIndex);
            },
            error: function (res) {
                layer.close(layIndex);
                layer.alert("发送短信失败，请稍后再试");
            }
        });
    }
    /**
     * [transformToEllipsis 省略银行卡号和身份证号]
     * @param  {[string or number]}  num [需要省略的号码]
     * @return {string}     [转换后的号码]
     */
    function transformToEllipsiss(num, begin, end, bool) {
        var str = "";
        bool ? str = "*******" : str = "***********";
        if ('' == num || null == num) {
            return num;
        }

        var newStr = '';
        var reg = /^\d+$/;
        if (reg.test(num)) num = num + '';
        newStr = num.substring(0, begin) + str + num.substring(end);
        return newStr;
    }

    //银联实名认证
    function ylsmrz(formData) {
        //返回的字段是YL才需要调实名认证
        if (!accountInfo.initData.smrzLx) {
            return true;
        }
        var result = false;
        $.ajax({
            url: apiUrl + "/yhgl/ylsmrz",
            type: "post",
            data: JSON.stringify(formData),
            contentType: "application/json",
            async: false,
            success: function (res) {
                if (res.success) {
                    result = true;
                } else {
                    showMessage(res, '银联身份认证失败,请确认你输入的信息是否有误！');
                }
            },
            error: function (res) {
                parent.layer.msg('系统异常，请稍后再试...');
            }
        });
        return result;
    }

    //初始化实名认证信息
    accountInfo.initAccountinfo();
    //仅线上实名认证的才显示银行卡信息，否则不显示
    accountInfo.ylsmrzCx(accountInfo.initData, function (data) {
        if (!!data) {
            $("#yhkh").removeClass("hidden");
            accountInfo.ylsmPass = true;
        } else {
            accountInfo.ylsmPass = false;
        }
    });

    //发送短信认证码
    $("#sendMessage").on('click', function () {
        var oForm = $("#accountInfo");
        var mobileNum = oForm.find("input[name='mobile']").val();
        var code = oForm.find("input[name='yzmcode']").val();
        //先判断手机号有没有更改
        if (mobileNum === accountInfo.mobileNum) {
            parent.layer.msg('手机号未做修改，不能发送短信');
            return;
        }
        //判断手机号是否输入正确
        if (!validator.isPhoneNum(mobileNum)) {
            parent.layer.msg('请先输入正确的手机号码');
            return;
        }
        //判断验证码是否输入
        if (!code || code === "") {
            parent.layer.msg('请先输入图形验证码');
            return;
        }
        //判断验证码是否输入正确
        if (!accountInfo.isValidYzm(code)) {
            parent.layer.msg('请先输入正确的图形验证码');
            return;
        }
        registerSendCode($("#sendMessage"), mobileNum, code, accountInfo.initData
          .sfzhm, accountInfo.initData.xm);
        // accountInfo.sendMessage();
    });
    $("#cancelModify").on("click", function () {
        var _self = $(this);
        var oForm = $("#accountInfo");
        _self.addClass("hidden").prev().val("修改");
        oForm.find("input[name='mobile']").attr("disabled", true).val(
          transformToEllipsis(accountInfo.initData.mobile));
        oForm.find("input[name='yhkh']").attr("disabled", true).val(
          transformToEllipsis(accountInfo.initData.yhkh));
        oForm.find("#picCode").addClass("hidden");
        oForm.find("#messCode").addClass("hidden");
        $('#phone-tip').hide();
    });

    //修改
    /**
     * 需要认证短信信证码
     * 需要认证银联实名认证
     * 资料修改
     */
    $("#confirmModify").on('click', function () {
        //先判断是否线上实名认证通过,false不通过 del by wfj 2017.7.8
        //    if (!accountInfo.isNeedModify) {
        //      parent.layer.alert("线上的实名认证不通过，不允许修改");
        //      return false;
        //    }
        var oForm = $("#accountInfo");
        var $i = $('#phone-tip');
        if ($(this).val() === "修改") { // 编辑
            parent.layer.alert("模拟系统不支持修改！");
            //oForm.find("input[name='mobile']").val(phone_zs);
            //oForm.find("input[name='yhkh']").val(yhzh_zs);
            //$i.show();
            //$(this).val("提交").next().removeClass("hidden");
            //oForm.find("input[name='mobile']").attr("disabled", false);
            //oForm.find("input[name='yhkh']").attr("disabled", false);
            //oForm.find("#picCode").removeClass("hidden");
            //oForm.find("#messCode").removeClass("hidden");
            return false;
        }
        // 保存
        var phone = oForm.find("input[name='mobile']").val();
        var code = oForm.find("input[name='code']").val();
        var yhkh = oForm.find("input[name='yhkh']").val();
        var param = {
            "smrzzlVOs": smrzzlVOs,//accountInfo.smrzzlVOs || [],
            "accountId": accountInfo.initData.accountId,
            "mobile": phone,
            "yhkh": yhkh,
            "sfzhm": accountInfo.initData.sfzhm
        };
        var json = {
            "sfzhm": accountInfo.initData.sfzhm,
            "xm": accountInfo.initData.xm,
            "mobile": phone,
            "yhkh": yhkh,
            "qd": "web"
        };
        var oldStr = accountInfo.initData.mobile + accountInfo.initData.yhkh;
        var newStr = phone + yhkh;
        var validObj = accountInfo.modifyValid(phone, yhkh);
        //校验手机号和银行卡号
        if (!validObj.isValid) {
            parent.layer.alert(validObj.mess);
            return false;
        }
        if (oldStr === newStr && !isUpload) {
            parent.layer.alert("信息未做修改");
            return false;
        }
        $(this).attr("disabled", "disabled"); //按钮失效
        if (checkMobileVerifyCode(phone, code)) { //短信认证
            if (!accountInfo.ylsmPass || ylsmrz(json)) {
                accountInfo.modifyInfo(JSON.stringify(param)).then(function (
                  data) {
                    //成功回调函数
                    if (data.success) {
                        $i.hide();
                        //更新缓存
                        accountInfo.initData.mobile = phone;
                        accountInfo.initData.yhkh = yhkh;
                        parent.layer.alert("修改成功");
                        var oForm = $("#accountInfo");
                        $("#cancelModify").addClass("hidden").prev().val("修改");
                        oForm.find("input[name='mobile']").attr("disabled",
                          true).val(transformToEllipsis(phone));
                        oForm.find("input[name='yhkh']").attr("disabled", true)
                          .val(transformToEllipsis(yhkh));
                        oForm.find("#picCode").addClass("hidden");
                        oForm.find("#messCode").addClass("hidden");
                    } else {
                        parent.layer.alert(data.message);
                    }
                    $("#confirmModify").removeAttr("disabled"); //按钮有效
                }, function (err) {
                    //error回调函数
                    $("#confirmModify").removeAttr("disabled"); //按钮有效
                    parent.layer.alert("修改信息失败，请稍后再试");
                });
            };
        } else {
            $(this).removeAttr("disabled"); //按钮失效
        }
    });
});

layui.use(['form', 'upload', 'layer'], function () {
    var form = layui.form(); //初始化表单模块
    var layer = layui.layer;
    var uploadCacheData = {
        "sfzzmzp": "",
        "sfzfmzp": "",
        "scsfzzp": ""
    };
    /**
     * [createPreviewFileKey 创建预览数据]
     * @param  {[dom]} el   [预览节点]
     * @param  {[string]} name [上传name]
     * @return {[type]}      [description]
     */
    function createPreviewFileKey(el, name) {
        switch (name) {
            case "sfzzmzp":
                name === "sfzzmzp" && (el.removeClass("hidden").next().addClass(
                  "hidden").next().attr("data-img", uploadCacheData.sfzzmzp).removeClass(
                  "hidden"));
                break;
            case "sfzfmzp":
                name === "sfzfmzp" && (el.removeClass("hidden").next().addClass(
                  "hidden").next().attr("data-img", uploadCacheData.sfzfmzp).removeClass(
                  "hidden"));
                break;
            default:
                name === "scsfzzp" && (el.removeClass("hidden").next().addClass(
                  "hidden").next().attr("data-img", uploadCacheData.scsfzzp).removeClass(
                  "hidden"));
        }
    }
    //上传组件
    layui.upload({
        url: '/ucenter/api/yhgl/uploadGrSmxxSfzzpFile',
        // before: function(input) {
        //   //返回的参数item，即为当前的input DOM对象
        //   layIndex = layer.load(0, {
        //     shade: false
        //   }); //0代表加载的风格，支持0-2
        // },
        success: function (res, input) {
            isUpload = true;
            var previewEl = $(input).parent().parent().next();
            if (res.success) {
                var name = input.name;
                if (parent.layer.msg) {
                    parent.layer.msg("图片上传成功")
                } else {
                    layer.msg("图片上传成功");
                }

                var $li = $(input).parents('li');
                $li.addClass('uploaded');

                var fileData = res.data[0];
                if (typeof fileData == 'string') {
                    fileData = JSON.parse(res.data[0]);
                }
                var imgSrc = '/ucenter/api/nologin/viewpic?fileKey=' + fileData.fileKey;
                $('.img-box img', $li).attr('src', imgSrc).addClass('preview-pic').attr('data-img', fileData.fileKey);

                //accountInfo.smrzzlVOs = [];
                switch (name) {
                    case 'sfzzmzp':
                        name === "sfzzmzp" && (uploadCacheData.sfzzmzp = fileData.fileKey);
                        smrzzlVOs[0] = {
                            smrzzllx: 'SFZZM',
                            smrzzlkey: fileData.fileKey
                        };
                        break;
                    case 'sfzfmzp':
                        name === "sfzfmzp" && (uploadCacheData.sfzfmzp = fileData.fileKey);
                        smrzzlVOs[1] = {
                            smrzzllx: 'SFZFM',
                            smrzzlkey: fileData.fileKey
                        };
                        break;
                    default:
                        name === "scsfzzp" && (uploadCacheData.scsfzzp = fileData.fileKey);
                        smrzzlVOs[2] = {
                            smrzzllx: 'SCSFZZP',
                            smrzzlkey: fileData.fileKey
                        };
                }
                createPreviewFileKey(previewEl, name);
            } else {
                layer.msg("图片上传失败");
                previewEl.next().removeClass("hidden");
            }
            // layer.close(layIndex);
        }
    });
    //事件代理
    $("#uploadFile").on('click', function (e) {
        var target = $(e.target);
        //图片预览
        if (target.attr('class') && target.attr('class').split(" ")[0] === "preview-pic") {
            if (target.attr('data-img') === "") {
                layer.msg("请先上传");
                return;
            }
            parent.layer.open({
                type: 2,
                title: false,
                shadeClose: true,
                shade: 0.2,
                area: ['900px', '480px'],
                content: './pages/user/register/preview.html?img=' + target
                  .attr(
                    'data-img')
            });
        } else if (target.hasClass('layui-upload-file')) {
            var sfzhmVal = $("input[name='sfzhm']").val();
            target.parent().attr("action",
              '/ucenter/api/yhgl/uploadGrSmxxSfzzpFile');
        }
    });
});
