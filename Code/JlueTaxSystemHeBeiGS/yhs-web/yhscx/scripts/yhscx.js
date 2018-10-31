var yhscx = {
    init: function () {
        this.loadFooter("views/apublic/FooterView.html");
        this.loadList();
        this.bindlistClick();
        //添加完成后立即触发纳税人基本信息的事件
        $("[data-tab='nsrjbxx']").click();
        var tip = new mini.ToolTip();
        tip.set({
            target: document,
            selector: '[data-tooltip]'
        });
    },
    container: $("#cx-container"),
    url: '../api/common/query.ashx',
    //存储获得的数据
    GetDataFrom: {},
    //查询结果为空的时候显示的text
    emptyText: "查询范围内无记录！",
    loadHeader: function (url) {
        // 如果有参数指定初始化头或尾，则按参数来初始化
        /* var nsrxx = {};
         nsrxx.title = $('title').get(0).innerText;
         var tplUrl = '../../sjcx/HeadView.html';
         if(url){
             tplUrl = url;
         }*/
        var html = yhscx.loadTemplate(url);
        $('body').prepend(html);
    },
    loadFooter: function (url) {
        var html = yhscx.loadTemplate(url);
        $('body').append(html);
    },
    //加载数据 向grid中赋值 含有分页
    loadGridData: function (obj) {
        var grid = mini.get(obj.gridId);
        var params = {
            "cxsjq": "",
            "cxsjz": "",
            "logicName": "",
            "interfaceName": ""
        };
        $.extend(params, obj.data);
        grid.setUrl(yhscx.url);
        grid.setEmptyText(yhscx.emptyText);
        grid.showEmptyText = true;
        /* if (!grid.stringified) {
             grid.on('beforeload', function (e) {
                 e.data = JSON.stringify(e.data);
             });
             grid.on('preload', function (e) {
                 yhscx.GetDataFrom[this.id] = e.data;
                 this.stringified = true;
             });
         }*/
        mini.mask("加载中......");
        grid.load(params, function (data) {
            // yhscx.GetDataFrom[grid.id] = data;
        });
        mini.unmask();
    },
    initGrid: function (gridId) {
        var grid = mini.get(gridId);
        grid.on('beforeload', function (e) {
            if (e.url === "") {
                e.cancel = true;
            }
            e.data = JSON.stringify(e.data);
        });
        grid.on('preload', function (e) {
            yhscx.GetDataFrom[this.id] = e.data;
        });
    },
    loadTemplate: function (url) {
        var html = '';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                html = data;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('加载html出错');
            }
        });
        return html;
    },
    insertTemplate: function (dom, content, url) {
        dom.append(content);
        var js_url = url.replace('.aspx', '.js');
        yhscx.loadScript(js_url);
    },
    /*加载js文件*/
    loadScript: function (url) {
        var script = document.createElement("script"),
            body = document.getElementsByTagName('body')[0];
        script.src = url;
        body.appendChild(script);

    },
    loadCss: function (url) {
        var link = document.createElement("link"),
            head = document.getElementsByTagName('head')[0];
        link.href = url;
        link.rel = "stylesheet";
        head.appendChild(link);
    },
    // 初始化界面  不再改变  使用模板
    loadTemplateValue: function (obj) {
        //初始化的时候空数据读取模板，防止没有数据的时候表格消失
        var html = "未获取到相关数据！";
        //  mini.mask("加载中");
        mini.mask({"iconCls": "mini-messagebox-waiting", "message": "加载中..."});
        $.ajax({
            url: yhscx.url,
            contentType: "application/json; charset=utf-8",
            type: "POST",
            async: false,
            data: mini.encode(obj.data),
            success: function (data) {
                if (data.success) {
                    if (!$.isEmptyObject(data.resultMap)) {
                        var temp = data.resultMap.data[0];
                        yhscx.GetDataFrom[obj.template_id] = temp;
                        html = template(obj.template_id, temp);
                    }
                } else {
                    mini.alert(data.message, "提示", function () {
                        window.close();
                    });
                }
            },
            error: function (err) {
                mini.alert('数据初始化异常，请稍后再试！', '提示', function () {
                    window.close();
                });
            }
        });
        $("." + obj.class_main).empty().html(html);
        mini.unmask();
    },
    //左侧列表
    loadList: function () {
        $.getJSON('data/config.ashx', function (data) {
            var html = "<ul class='first-menu'>";
            $.each(data, function (i, c) {
                var class_name = c.class_name;
                if (c.openAs === "-1") {
                    return true;
                }
                if (c.cxxl.length === 0) {
                    html += "<li  href='" + c.url + "' openAs='" + c.openAs + "' data-tab='" + class_name + "'  title='" + c.cxdlMc + "'><span class='status-empty'>&nbsp;&nbsp;&nbsp;&nbsp;</span>" + c.cxdlMc + "</li>";
                } else {
                    html += "<li href='" + c.url + "' openAs='" + c.openAs + "' data-tab='pzhdTab' dl='" + class_name + "' title='" + c.cxdlMc + "'><span class='status-zk'></span>" + c.cxdlMc + "</li>";
                    html += "<ul class='second-menu second-menu-" + class_name + "'>";
                    $.each(c.cxxl, function (i, e) {
                        if (e.openAs === "-1") {
                            return true;
                        }
                        class_name = e.class_name;
                        html += "<li  href='" + e.url + "' openAs='" + e.openAs + "' data-tab='" + class_name + "'  title=" + e.cxxlMc + "><a>" + e.cxxlMc + "</a></li>";

                    });
                    html += "</ul>";
                }
            });
            html += "</ul>";
            $("#main-nav").empty().append(html);
        });
    },
    /*记录打开的列表*/
    openList: "",
    /*记录打开的页面*/
    openTab: "",
    bindlistClick: function () {
        $("#main-nav").on("click", "li", function (e) {
            var open = $(this).attr("openAs");
            var dl = $(this).attr("dl");
            if (dl !== undefined) {
                yhscx.listChange(this);
                //列表开关
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                switch (open) {
                    case "1": {
                        if (yhscx.changeTab($(this).attr("data-tab"))) {
                            var url = $(this).attr("href");
                            var html = yhscx.loadTemplate(url);
                            yhscx.insertTemplate(yhscx.container, html, url);
                            mini.parse();
                        }
                        break;
                    }
                    case "2": {
                        mini.open({
                            url: $(this).attr("href"),        //页面地址
                            title: $(this).attr("title"),      //标题
                            width: 1220,      //宽度
                            height: 600,     //高度
                            allowResize: false,       //允许尺寸调节
                            allowDrag: false,         //允许拖拽位置
                            showCloseButton: true,   //显示关闭按钮
                            showMaxButton: true,     //显示最大化按钮
                            showModal: true,         //显示遮罩
                            onload: function () {       //弹出页面加载完成
                            },
                            ondestroy: function (action) {  //弹出页面关闭前
                            }
                        });
                        break;
                    }
                    case "3": {
                        /* window.open($(this).attr("href"), "_blank");*/
                      /*  var taburl = encodeURI("opentab.html");
                        window.open(taburl, "_blank","urls=" + $(this).attr("href"));*/
                        var taburl = encodeURI("opentab.html?url=" + $(this).attr("href") + "&title=" + $(this).attr("title"));
                        window.open(taburl, "_blank");
                        break;
                    }
                    case "4": {
                        window.open($(this).attr("href"), "_blank");
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return false;
        });

    },
    //已经加载的页面之间切换
    changeTab: function (class_name) {
        var showTab = yhscx.container.find("." + class_name);
        if (showTab.length) {
            if (yhscx.openTab !== "") {
                yhscx.container.find("." + yhscx.openTab).hide();
            }
            showTab.show();
            yhscx.openTab = class_name;
            return false;
        } else {
            if (yhscx.openTab !== "") {
                yhscx.container.find("." + yhscx.openTab).hide();
            }
            yhscx.openTab = class_name;
            return true;
        }
    },
    //列表之间的切换
    listChange: function (_this) {
        if (!yhscx.openList) {
            $(".second-menu-" + $(_this).attr("dl")).show("fast");
            $(_this).find(".status-zk").attr("class", 'status-ss');
            yhscx.openList = ".second-menu-" + $(_this).attr("dl");
        } else {
            if (yhscx.openList === ".second-menu-" + $(_this).attr("dl")) {
                $(yhscx.openList).hide("fast");
                $(_this).find(".status-ss").attr("class", 'status-zk');
                yhscx.openList = "";
            } else {
                $(".second-menu-" + $(_this).attr("dl")).show("fast");
                $(_this).find(".status-zk").attr("class", 'status-ss');
                $(yhscx.openList).hide("fast");
                $('[dl="' + yhscx.openList.split(".second-menu-")[1] + '"]').find(".status-ss").attr("class", 'status-zk');
                yhscx.openList = ".second-menu-" + $(_this).attr("dl");
            }
        }
    },
    //重置开始与结束时间
    reset: function (cxqq, cxqz) {
        var date = new Date();
        var monthDate = new Date(date.getFullYear(), date.getMonth(), 1);
        var ctime = monthDate.getFullYear() + '-' + (monthDate.getMonth() + 1) + "-" + monthDate.getDate();
        mini.get(cxqq).set({value: ctime, errorMode: "border"});
        mini.get(cxqz).set({value: mini.formatDate(date, "yyyy-MM-dd"), errorMode: "border"});
    },
    getUrlParamByName: function (attrName) {
        var locs = location.href.split("?");
        if (locs.length === 1) {
            return null;
        }
        var params = locs[1].split("&");
        var value = null;
        $.each(params, function () {
            var param = this.split("=");
            if (param[0] === attrName) {
                value = param[1];
                return false;
            }
        });
        return value;
    },
    //将收到的数据Y/N转换为是、否
    changeTextrender: function (e) {
        var record = e.record[this.field];
        if (record === "Y") {
            return "是";
        } else {
            return "否"
        }
    },
    //检查时间填写
    checkTime: function (start, end, errorText) {
        var flag = false;
        var diff = end - start;
        if (diff < 0) {
            mini.alert(errorText + "，请重新输入！");
        } else if (diff / 86400000 > 365) {
            mini.alert("查询起止时间不能超过一年，请重新输入！");
        } else {
            flag = true;
        }
        return flag;
    }
};


yhscx.init=function () {
    this.loadList();
    this.bindlistClick();
    //添加完成后立即触发纳税人基本信息的事件
    $("[data-tab='nsrjbxx']").click();
    var tip = new mini.ToolTip();
    tip.set({
        target: document,
        selector: '[data-tooltip]'
    });
};
