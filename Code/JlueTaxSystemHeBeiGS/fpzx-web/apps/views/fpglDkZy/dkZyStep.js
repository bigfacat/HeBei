/**
 * Created by yuepu on 2017/1/18.
*/
/*代开增值税专通发票*/
var dkzyfp={};
dkzyfp.confirm = false;
var fbzlGrid,fbzlylGrid;
dkzyfp.xhfIsNeed = false;//是否需要代开发票
dkzyfp.slvValue = "0.03";//税率
dkzyfp.slvAddValue = "1.03";//税率加1
dkzyfp.ghfNsrzgxx = false;//购货方纳税人资格信息
dkzyfp.ghfzt = false;//购货方纳税人状态
dkzyfp.isExistNsrxx = false;//根据纳税人识别号是否能查出纳税人信息
dkzyfp.ghfTxYhlbdm = '';//银行营业网点名称代码
dkzyfp.ghfYhlbdm = '';//银行营业网点名称代码
dkzyfp.ghfIssn = false;//购货方是否是省内
dkzyfp.ghfXXIssn = false;//购货方信息是否是省内
dkzyfp.zzsfpGhfDjxh = '';//根据纳税人查信息获得的购货方信息djxh
dkzyfp.zzsfpGhfXXDjxh = '';//表格中根据纳税人查信息获得的购货方信息djxh
dkzyfp.modifyGhfxx = {};//暂存购货方modify的数据
dkzyfp.fhkSelectedData = {};//用于存放被选中的通讯录中的数据

/*省外付款方data*/
dkzyfp.swFkfData = {};

var dkptfp = {};//银行账号校验 为了和代开普通保持一致


/*第一步表单数据*/
var zySkData;

stepNav.run=function () {
    console.log(wssqUtil.nsrjbxx);
    dkzyfp.djxh = wssqUtil.nsrjbxx.djxh;/*"10111305000017554904"*/
    dkzyfp.xhfnsrsbh = wssqUtil.nsrjbxx.nsrsbh;/*销货方纳税人识别号*/

    /*是否需要代开发票*/
    dkZyService.checkXhfIsXydk(wssqUtil.nsrjbxx.nsrsbh,'',function(data){
        if(data.success){
            dkzyfp.xhfIsNeed = true;//是否需要代开发票
        }else{
            dkzyfp.xhfIsNeed = false;//是否需要代开发票
            mini.alert(data.message,'提示',function(action){
                if(action=="ok" || action=="close")
                    window.close();
            });
        }
    });
    stepNav.initSteps([
        {id:0,title:'收款方信息',url:'Skxx.aspx'},
        {id:1,title:'付款方信息',url:'Fkfxx.aspx'},
        {id:2,title:'劳务及货物信息',url:'LwHwXx.aspx'},
        {id:3,title:'选择领取方式', url: '../public1/lqfs/XzlqfsView.aspx',js: true},
        {id:4,title: '上传附报资料', url: '../public1/fbzl/FbzlView.aspx', js: true},
        {id:5,title:'预览提交',url:'Tjsh.aspx',yltj:true},
        {id:6,title: '审核中', url: '../public1/shz/shz.aspx', js: true},
        {id:7,title:'完成',url:'../public1/wc/wc.aspx',js:true}
    ]);
    dkzyfp.zspmDm = Tools.getUrlParamByName("zspmDm");//获取url中的行业代码
    mini.parse();
    fbzlGrid = mini.get("fbzl-grid");//附报资料Grid
    fbzlylGrid = mini.get('fbzl-yl-grid');

    // 完成页面添加内容和按钮
    var html='<div>请前往大厅<span id="jnsk-text">缴纳税款并</span>领取发票</div>'+
        '<div style="color:red">注：劳务货物信息超过8条的，开具发票后，可在云厅【增值税专用发票代开】-【历史代开记录查询】模块打印劳务货物清单</div>';
    var btn = ' <button id="qdsfxy-btn">完成</button> ';
    $('.wc-content').append(html);
    $('#file-action').parent().remove();
    $('.wc-actions').html(btn);

    /*第一步 收款方信息 */
    dkzyfp.zySkForm = new mini.Form("#skxx-form") ;    //专用 收款方信息表单
    // 设置经办人 + 经办人联系电话
    dkZyService.getAccountInfo('',function(data){
        if(data.success && data.value){
            mini.get('zpdk-skfxx-jbrxm').setValue(data.value.AccountInfo.fullName);
            mini.get('zpdk-skfxx-jbrdh').setValue(data.value.AccountInfo.mobile);
        }
    });
    dkzyfp.zySkForm.setData(wssqUtil.nsrjbxx);//初始化
    mini.get("skf-dz").setValue(wssqUtil.nsrjbxx.scjydz);//地址
    mini.get("_jyfw").setValue(wssqUtil.nsrjbxx.nsrxxKzVO.jyfw);//经营范围

    //设置收款人、复核人信息
    dkZyService.getSkrfhr('',function(data){
    	if(data.success && data.value ){
    		var obj = JSON.parse(data.value);
    		 mini.get('zpdk-skfxx-skrxm').setValue(obj[0].skr);
             mini.get('zpdk-skfxx-fhrxm').setValue(obj[0].fhr);
    	}else{
    		if(wssqUtil.nsrjbxx.kzztdjlxDm=="1120"){//个人
        		mini.get("zpdk-skfxx-skrxm").setValue(wssqUtil.nsrjbxx.fddbrxm);//地址
        	    mini.get("zpdk-skfxx-fhrxm").setValue(wssqUtil.nsrjbxx.fddbrxm);//经营范围
        	}else{
        		mini.get("zpdk-skfxx-skrxm").setValue(wssqUtil.nsrjbxx.fddbrxm);//地址
        	    mini.get("zpdk-skfxx-fhrxm").setValue(wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrxm);//经营范围
        	}
    	}
    });
    dkptfp.hyDmCombox = mini.get("txHyDm");//行业代码
    dkzyfp.zspmCombox = mini.get("zspm");//征收品目控件

    /*第二步 付款方信息*/
    dkzyfp.fkfForm = new mini.Form("#fkf-form");//付款方信息表单

    dkzyfp.fkfTxWindw = mini.get("fkfTx");//付款方通信录弹框
    dkzyfp.fkftxGrid = mini.get("fkftx-grid");//付款方通信录表格

    dkzyfp.fkfTxWin = mini.get("add-fkfTx");//获取新增付款方通信弹框控件
    dkzyfp.fkfTxForm = new  mini.Form("fkfTx-form");//获取表单控件

    mini.get('_ghfYhhbDm').setEmptyText('注：若您需要选择的银行不存在，请联系主管税务机关维护银行信息');

    //跳转到下一步之前，进行检查
    dkzyfp.checkAgain = mini.get("checkAgain");//获得弹框
    dkzyfp.fkfCheckForm = new  mini.Form("fkf-check-form");//获取弹框内的表单控件

    /*弹出付款方通讯录*/
    $("#fkfdr").click(function(){
        /*查询所有的付款方通讯录*/
        dkZyService.getFkftxl(dkzyfp.djxh,"",function(data){
            if(data.value){
                dkzyfp.fkftxGrid.setData(data.value);
            }else{
                dkzyfp.fkftxGrid.setData('');
            }
        });
        dkzyfp.fkfTxWindw.show();
    });
    /*选择 付款方通信录*/
    $("#save-btn").click(function(){
        $("#ghfYhyywdDm").hide();
        $("#combobox-gmfyhzh").hide();
        $("#ghfYhyywdMc").show();
        $("#text-gmfyhzh").show();
        var fields = dkzyfp.fkfForm.getFields();
        $.each(fields,function(i,item){
            item.setReadOnly(true);
        });
        var selectedData =  dkzyfp.fkftxGrid.getSelected();
        if(selectedData){
        	yhxxValidate(selectedData);
        }else{
            mini.alert("请先选择一条数据");
        }
    });
    /*取消 付款方通信录*/
    $("#cancle-btn").click(function(){
        dkzyfp.fkfTxWindw.hide();
    });

    /*新增付款方通信弹框 保存*/
    $("#fkfTx-save").click(function(){
        dkzyfp.fkfTxForm.validate();
        if(dkzyfp.fkfTxForm.isValid()){
            var updateParam = {};
            var formData = dkzyfp.fkfTxForm.getDataAndText();
            if(formData.ghfYhyywdDm){
                formData.ghfYhyywdMc =baseCode.getMcById("DM_GY_YHYYWD",formData.ghfYhyywdDm);
            }
            formData.ghfYhkhzh = formData.ghfYhkhzh?formData.ghfYhkhzh: formData.ghfYhkhzhDm;
            formData.spmc="";
            formData.lrrq="";
            updateParam.xhfDjxh = dkzyfp.djxh;
            updateParam.zzsfpGhfxxDto = mini.encode(formData);

            if($("#add-fkfTx").hasClass("added-fxf")){
                updateParam.act = "insert";
                dkZyService.updateFkfxx(mini.encode(updateParam),function(data){
                    if(data.success){
                        /*请求成功新增一行并关闭弹框*/
                        var totalCount =    dkzyfp.fkftxGrid.getData();
                        dkzyfp.fkftxGrid.addRow(formData,totalCount.length);
                        dkzyfp.fkfTxWin.hide();
                    }else{
                        mini.alert(data.message)
                    }
                })

            }else if($("#add-fkfTx").hasClass("modify-fxf")){
                updateParam.act = "update";
                dkZyService.updateFkfxx(mini.encode(updateParam),function(data){
                    if(data.success){
                        /*修改 保存*/
                        var modifyRow = dkzyfp.fkftxGrid.getSelected();
                        dkzyfp.fkftxGrid.updateRow(modifyRow,formData);
                        dkzyfp.fkfTxWin.hide();
                    }else{
                        mini.alert(data.message)
                    }
                })
            }
        }
    });

    /*新增付款方通信--取消*/
    $("#fkfTx-cancle").click(function(){
        dkzyfp.fkfTxWin.hide();
    });

    /*第三步 劳务及货物信息*/
    dkzyfp.lwhwGrid = mini.get("lwhwxx-grid");//劳务货物信息表格
    //新增劳务货物信息弹框
    dkzyfp.lwhwxxWin = mini.get("add-lwhwxx");//获得劳务货物信息弹框
    dkzyfp.lwhwxxForm = new mini.Form("#lwhw-form");//表单

    dkptfp.$jehj = $("#jehj");
    dkptfp.$sehj = $("#sehj");
    dkptfp.$jshj = $("#jshj");

    //保存 劳务货物信息
    $("#lwhw-save").click(function(){
        var totalCount =  dkzyfp.lwhwGrid.getData();
        dkzyfp.lwhwxxForm.validate();
        if(dkzyfp.lwhwxxForm.isValid()){
            var formData =  dkzyfp.lwhwxxForm.getDataAndText(true);
            if(Number(formData.je) <= 0){
                mini.alert("金额（不含税）应该大于0");
                return false;
            }
            if($("#add-lwhwxx").hasClass("added-lwhw")){
                //增加一行
                dkzyfp.lwhwGrid.addRow(formData,totalCount.length);

            }else if($("#add-lwhwxx").hasClass("modify-lwhw")){
                /*修改 保存*/
                var modifyRow = dkzyfp.lwhwGrid.getSelecteds();
                dkzyfp.lwhwGrid.updateRow(modifyRow[0],formData);
            }
            //计算总金额
            var  jeCount=0,seCount= 0;
            var lwhwData = dkzyfp.lwhwGrid.getData();
            $.each(lwhwData,function(i,item){
                jeCount += Number(item.je); //(Number(item.hldj) * Number(item.hlsl));
                seCount += Number(item.se); //(Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue));
            });
            var jsCount = jeCount+seCount;
            $("#jehj").html(jeCount.toFixed(2));
            $("#sehj").html(seCount.toFixed(2));
	        $("#jshj").html( (Number( jeCount.toFixed(2) ) + Number( seCount.toFixed(2) )).toFixed(2) );
            dkzyfp.lwhwxxWin.hide();
        }

    });
    dkzyfp.sl = mini.get("hlsl");//数量控件
    dkzyfp.dj = mini.get("hldj");//单价控件
    dkzyfp.je = mini.get("je");//金额
    dkzyfp.se = mini.get("se");//税额控件
    dkzyfp.slv = mini.get("slv");//税额控件

    dkzyfp.ybWin = mini.get("yl-zzspy");//预览 发票样表

    //取消
    $("#lwhw-cancle").click(function(){
        dkzyfp.lwhwxxWin.hide();
    });

    /*第四部 预览*/

    dkzyfp.lwhwYlGrid  = mini.get("lwhwYl-grid");//劳务货物信息
    dkzyfp.ylxhfFrom = new mini.Form("#ylxh-form");//预览页面 销货方
    dkzyfp.ylGhfFrom = new mini.Form("#gh-info");//预览页面 购货方
/*    mini.get("#ylHyDm").setUrl("../../../api/baseCode/get/hyByZByZspm?zspmDm="+dkzyfp.zspmDm);*/

    if(dkzyfp.xhfIsNeed){
        /*查询税率*/
        dkZyService.getSlv('',function(data){
            if(data.success){
                dkzyfp.slvValue = data.value; //"0.03" 税率
                dkzyfp.slvAddValue = Number(data.value) +1+''; //"1.03" 税率加1
            }else{
                mini.alert(data.message,'提示',function(action){
                    if(action=="ok" || action=="close"){
                        window.close();
                    }
                });
            }
        });
        /*征收品目*/
        dkZyService.getzspm(dkzyfp.djxh,'',function(data){
            if(data.success){
                dkzyfp.zspmData = data.value;
                /*征收品目*/
                dkzyfp.zspmCombox.setData(data.value);

            }else{
                mini.alert(data.message,'提示',function(action){
                    if(action=="ok" || action=="close"){
                        window.close();
                    }
                });
            }
        });
        /*查询银行账号*/
        dkZyService.getKuyh(dkzyfp.djxh,'',function(data){
            if(data.success){
                dkzyfp.zySkForm.setData(data.value);
            }else{
                mini.alert(data.message,'提示',function(action){
                    if(action=="ok" || action=="close"){
                        window.close();
                    }
                });
            }

        });
    }
    $("#qdsfxy-btn").click(function(){
        window.close();
    });

    /*第二步信息再次检查弹框*/
    $("#check-ok").click(function(){
        dkzyfp.confirm = true;
        dkzyfp.checkAgain.hide();
        var val = mini.get("addToFkftxl").getChecked();
        // 如果选择将当前信息加入付款方通讯录
        if(val){
            var updateParam = {};
            var formData = dkzyfp.fkfForm.getDataAndText();
            if(formData.ghfYhyywdDm){
                formData.ghfYhyywdMc =baseCode.getMcById("DM_GY_YHYYWD",formData.ghfYhyywdDm);
            }
            formData.ghfYhkhzh = formData.ghfYhkhzh?formData.ghfYhkhzh: formData.ghfYhkhzhDm;
            formData.spmc="";
            formData.lrrq="";
            updateParam.xhfDjxh = dkzyfp.djxh;
            updateParam.zzsfpGhfxxDto = mini.encode(formData);

            updateParam.act = "insert";
            dkZyService.updateFkfxx(mini.encode(updateParam),function(data){
                if(data.success){
                    stepNav.wizard.steps('next');
                }else{
                    mini.alert(data.message);
                    return false;
                }
            })
        }else{
            stepNav.wizard.steps('next');
        }

    });
    $("#check-cancle").click(function(){
        dkzyfp.confirm = false;
        dkzyfp.checkAgain.hide();
    });
};
dkzyfp.slideLeft = function (dom1,dom2) {
    var outerWidth = dom1.outerWidth(true),
        posFadeOut = -(outerWidth),
        posFadeIn = outerWidth;
    $.when(dom1.animate({ left: posFadeOut },function(){$(this).hide()}),
        dom2.css("left",posFadeIn+"px").show().animate({left:0}));
    $('li.current').removeClass('current').addClass('done');
    $('li.disabled').eq(0).removeClass('disabled').addClass('current');
};

stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if(currentIndex==0){
        dkzyfp.zySkForm.validate();
        if(!dkzyfp.zySkForm.isValid()){
            return false;
        }
    }
    if(currentIndex==1){
        var  jeCount=0,seCount= 0;
        /*      lwhwData = dkptfp.lwhwGrid.getData();*/
        $.each(dkzyfp.lwhwGrid.getData(),function(i,item){
            //jeCount += (Number(item.hldj) * Number(item.hlsl));
			//seCount += (Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue));
			
			jeCount += Number(item.je);
			seCount += Number(item.se);
		});
        var jsCount = jeCount+seCount;
        $("#jehj").html(jeCount.toFixed(2));
        $("#sehj").html(seCount.toFixed(2));
        $("#jshj").html(jsCount.toFixed(2));

        //进入下一步之前再次弹框
        dkzyfp.fkfForm.validate();
        if(dkzyfp.fkfForm.isValid()){
            if(!dkzyfp.confirm){
                var fkfDatas = dkzyfp.fkfForm.getData();
                /*银行账号*/
                fkfDatas.ghfYhkhzh = fkfDatas.ghfYhkhzh?fkfDatas.ghfYhkhzh:fkfDatas.ghfYhkhzhDm;
                fkfDatas.ghfYhyywdMc = fkfDatas.ghfYhyywdMc?fkfDatas.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD',fkfDatas.ghfYhyywdDm);

                dkzyfp.fkfCheckForm.setData(fkfDatas);


                /*查询所有的付款方通讯录*/
                // 比较当前纳税人信息是否在通讯录中
                dkZyService.getFkftxl(dkzyfp.djxh,"",function(data){
                    if(data.value){
                        var flag=false;
                        var addToFkftxl = mini.get("addToFkftxl");

                        for(var i=0,result=data.value,j=result.length;i<j;i++){
                            if(result[i].ghfNsrsbh == fkfDatas.ghfNsrsbh){
                                flag = true;
                                addToFkftxl.setChecked(false);
                                addToFkftxl.hide();
                                break;
                            }
                        }
                        if(!flag){
                            addToFkftxl.show();
                            addToFkftxl.setChecked(true);
                        }
                    }
                });

                dkzyfp.checkAgain.show();
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }

    }
    if(currentIndex==2){
        $("#xxyj-text").hide();
        getTicketsWay();//选择领取方式
        /*劳务货物信息*/
        if(dkzyfp.lwhwGrid.getData().length <=0){
            mini.alert("请先新增一条劳务货物信息");
            return false;
        }else{
            return true;
        }
    }
    if(currentIndex==3){

        var swsxMxDmList=[];
        //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        fbzlAjax(datas,'requestFbzllist');
    }
    if(currentIndex==4){
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);
    }
    if(currentIndex==5){
        //提交
        var tjParam={};
        var ptSkData = dkzyfp.zySkForm.getData();//销货方信息

        var fkfData = dkzyfp.fkfForm.getData();//购货方信息
        fkfData.ghfYhkhzh = fkfData.ghfYhkhzh?fkfData.ghfYhkhzh:fkfData.ghfYhkhzhDm;
        fkfData.ghfYhyywdMc =   fkfData.ghfYhyywdMc? fkfData.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', fkfData.ghfYhyywdDm);

        //过滤销货方
        var xhfDataParam = dkzyfp.glXhffData(ptSkData);

        /*过滤购货方信息*/
        var fkfDataParam = dkzyfp.glFkfData(fkfData);
        tjParam.fpdkZzsGhfnsrxxVO = fkfDataParam;//购货方信息数据组织

        var datas = $.extend({},xhfDataParam,fkfDataParam);

        datas.xhfsfzjzlDm = "201";//证件种类代码
        datas.yjse = dkzyfp.sehj+'';
        datas.jshj = dkzyfp.xse+'';
        datas.kjhzzzszyfptzdhm = '';
        datas.lrrDm = '';
        datas.lzfpdm = '';
        datas.sfdkhzfp = '';
        datas.sjgsdq = '';
        datas.xgrDm = '';
        datas.zzsfpuuid = '';
        datas.bz = ptSkData.bz;
        datas.dksquuid = '';
        tjParam.fpdkZzsfpVO = datas;

        /*劳务货物信息*/
        var lwhwGrid = dkzyfp.lwhwGrid.getData();
        var lwhw = {};
        if(lwhwGrid.length >8){
            var lwhObj = {};
            var lwhArr = [];
            lwhObj.hwlwmc = "详见清单";
            lwhObj.slzsl = dkzyfp.slvValue;
            lwhObj.lrrDm = "";
            lwhObj.je = dkzyfp.jehj +'';
            lwhObj.se = dkzyfp.sehj +'';
            lwhObj.jsxj = dkzyfp.xse +'';
            lwhObj.xse = Number(dkzyfp.jehj) * Number(dkzyfp.slvAddValue) +'';

            lwhArr[0] = lwhObj;
            lwhw.fpdkZzsfpHlmxGridlb = lwhArr;
        }else{
            $.each(lwhwGrid,function(i,item){
                item.slv = dkzyfp.slvValue;
                item.dj =  item.hldj;
                item.xse = item.jeHs +'';
                item.slzsl = dkzyfp.slvValue;
                item.je = item.je +'';
                item.lrrDm ='';
                item.sjgsdq =  '';
                item.xgrDm =  '';
                item.zzsfpmxuuid =  '';
                item.zzsfpuuid =  '';
                item.jsxj = item.jeHs+'';
            });
            lwhw.fpdkZzsfpHlmxGridlb = lwhwGrid;
        }

        tjParam.fpdkZzsfpHlmxGrid=lwhw;

        //总计
        var currentDate = new Date();
        var fpdkTemp = {};
        var zj = {};
        var zjTeml= {};
        zj.djxh = dkzyfp.djxh;
        zj.dkfplbDm = "01";
        zj.dksqje = dkzyfp.jehj+'';
        zj.dksquuid = "";
        zj.hyDm =  ptSkData.hyDm;//行业代码
        zj.jdxzDm = "";//行业代码
        zj.jmsbz = "N";
        zj.jmslxDm = "";
        zj.jmyy = "";
        zj.kjbz = "N";
        zj.kpje = dkzyfp.xse +'';
        zj.kplxDm = "01";
        zj.lcslid = "";
        zj.lrrDm = "";
        zj.pzxh = "";
        zj.sjgsdq = "";
        zj.slrDm = "";
        zj.slswjgDm = "";
        zj.sqdhm = "";
        zj.sqrq = "";
        zj.sqrxm = "";
        zj.xgrDm = "";
        zj.xzqhszDm = "";
        zj.ybsfe =dkzyfp.sehj;
        zj.zfbz1 = "";
        zj.zfrDm = "";
        zj.zfrq1 = "";
        zj.zgswskfjDm = "";
        zj.zrrbz = "N";

        tjParam.fpdkSqVO = zj;

        var fpdkSfmxArr = [];
        var fpdkSfmxGridlb={};
        fpdkSfmxGridlb.dkfplbDm = '01';
        fpdkSfmxGridlb.dksquuid = '';
        fpdkSfmxGridlb.hyDm = ptSkData.hyDm;
        fpdkSfmxGridlb.jmsfe = "0";
        fpdkSfmxGridlb.jmspjguuid = '';
        fpdkSfmxGridlb.jsfyj = dkzyfp.jehj;
        fpdkSfmxGridlb.jyxmDm = '';
        fpdkSfmxGridlb.lrrDm = '';
        fpdkSfmxGridlb.nsqnyjse = '';
        fpdkSfmxGridlb.sfl = dkzyfp.slvValue;
        fpdkSfmxGridlb.sfmxuuid = '';
        fpdkSfmxGridlb.sjgsdq = '';
        fpdkSfmxGridlb.skssqq =  currentDate.getFirstDateOfMonth('yyyy-MM-dd');
        fpdkSfmxGridlb.skssqz = currentDate.getLastDateOfMonth('yyyy-MM-dd');
        fpdkSfmxGridlb.srze = dkzyfp.jehj +'';
        fpdkSfmxGridlb.sskcs = '';
        fpdkSfmxGridlb.ghfYhyywdMc = fkfData.ghfYhyywdMc;
        fpdkSfmxGridlb.tddjDm = '';
        fpdkSfmxGridlb.xgrDm = '';
        fpdkSfmxGridlb.ybsfe = dkzyfp.sehj +'';
        fpdkSfmxGridlb.yjsfe = '0';
        fpdkSfmxGridlb.ynsfe = dkzyfp.sehj+'';
        fpdkSfmxGridlb.yxkcje = '0';
        fpdkSfmxGridlb.zfbz1 = 'N';
        fpdkSfmxGridlb.zfrDm = '';
        fpdkSfmxGridlb.zfrq1 = '';
        fpdkSfmxGridlb.zspmDm = ptSkData.zspm;
        fpdkSfmxGridlb.zsxmDm = '10101';
        fpdkSfmxGridlb.zszmDm = '';
        fpdkSfmxGridlb.zszspmDm = '';
        fpdkSfmxGridlb.zszsxmDm = '';
        fpdkSfmxGridlb.zszszmDm = '';

        fpdkSfmxArr[0] = fpdkSfmxGridlb;
        var tempObj = {};
        tempObj.fpdkSfmxGridlb=fpdkSfmxArr;
        var gridTeml = {};
        tjParam.fpdkSfmxGrid = tempObj;


        console.log(tjParam);
        var submitParam = {};
        submitParam.fpzzszyfpdksbdVO = tjParam;
        submitParam.bbh='';
        submitParam.xmlbh='';
        submitParam.xmlmc='';
        submitParam.skr = ptSkData.skr;
        submitParam.fhr = ptSkData.fhr;
        submitParam.jbr = ptSkData.jbr;
        /*合计报文 自己家的*/
        var dpdkHjVO = {};
        dpdkHjVO.jehj = dkzyfp.jehj;
        dpdkHjVO.sehj = dkzyfp.sehj;
        dpdkHjVO.jshj = dkzyfp.xse;
        submitParam.dpdkHjVO = dpdkHjVO;

        var hwlwqd = {};
        if(lwhwGrid.length >8){
            hwlwqd.isqdxx = "Y";
            $.each(lwhwGrid,function(i,item){
                item.slv = dkzyfp.slvValue;
                item.dj =  item.hldj;
                item.xse = item.jeHs +'';
                item.slzsl = dkzyfp.slvValue;
                item.je = item.je +'';
                item.lrrDm ='';
                item.sjgsdq =  '';
                item.xgrDm =  '';
                item.zzsfpmxuuid =  '';
                item.zzsfpuuid =  '';
                item.jsxj = item.jeHs+'';
            });
            hwlwqd.hwlwqdmx = lwhwGrid;
        }else{
            hwlwqd.isqdxx = "N";
            hwlwqd.hwlwqdmx = '';
        }
        submitParam.hwlwqd = hwlwqd;

        return   dkzyfp.tj(submitParam);

    }

    return true;
};

stepNav.onStepChanged=function (event, currentIndex, prevIndex) {
    if(currentIndex==1){
        /*第一步的表单保存前进行验证*/
        zySkData= dkzyfp.zySkForm.getData();
    }
    if(currentIndex==2){
        dkzyfp.confirm = false; // 再返回的时候需要再次确认信息
    }
    if(currentIndex==3){

    }
    if(currentIndex==4){
        dkzyfp.temp1 = dkzyfp.zySkForm.getDataAndText(true);
        dkzyfp.temp2 = dkzyfp.fkfForm.getDataAndText(true);

        dkzyfp.temp2.ghfYhkhzh = dkzyfp.temp2.ghfYhkhzh?dkzyfp.temp2.ghfYhkhzh:dkzyfp.temp2.ghfYhkhzhDm;
        dkzyfp.temp2.ghfYhyywdMc =   dkzyfp.temp2.ghfYhyywdMc? dkzyfp.temp2.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', dkzyfp.temp2.ghfYhyywdDm);

        dkzyfp.temp3 = dkzyfp.lwhwGrid.getData();

    }
    if(currentIndex==5){
        /*----------渲染预览------------*/
        /*卖方  销货方*/
        dkzyfp.ylxhfFrom.setData(dkzyfp.temp1);

        /*购货方*/
        dkzyfp.ylGhfFrom.setData(dkzyfp.temp2);

        /*劳务货物*/
        var  jeCount=0,seCount= 0;
        dkzyfp.lwhwYlGrid.setData(dkzyfp.temp3);

        $.each(dkzyfp.lwhwGrid.getData(),function(i,item){
            jeCount += (Number(item.hldj) * Number(item.hlsl));
            seCount += (Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue));
        });
        var jsCount = jeCount+seCount;
        /*显示合计*/
        $("#ylHj #jehj").html(jeCount.toFixed(2));
        $("#ylHj #sehj").html(seCount.toFixed(2));
        $("#ylHj #jshj").html(jsCount.toFixed(2));

        /*显示合计*/
        //var hj_form_data = new mini.Form('hj_form')
        //new mini.Form('ylHj').setData( hj_form_data.getData() );
        
        mini.get("yl-jehj").setValue( $('#jehj').text() );
        mini.get("yl-sehj").setValue( $('#sehj').text() );
        mini.get("yl-jshj").setValue( $('#jshj').text() );

        dkzyfp.jehj = $('#jehj').text(); // jeCount.toFixed(2);//合计金额
        dkzyfp.sehj = $('#sehj').text(); // seCount.toFixed(2);//税额合计
        dkzyfp.xse = $('#jshj').text();  // jsCount.toFixed(2);//销售额 价税合计

    }
};

/*新增付款方通讯 弹框*/
dkptfp.addFkfxx = function(){
    $("#add-fkfTx").addClass("added-fxf").removeClass("modify-fxf");
    var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//新增表单
    ghfNsrsbhXz.setReadOnly(false);
    mini.get("ghfYhhbDm").setReadOnly(false);//购货方银行行别
    mini.get("text-yhyywdmc").setReadOnly(false);//购货方银行营业网点名称
    mini.get("text-khyhzh").setReadOnly(false);//购货方银行账号
    mini.get("ghfYhhbDm").setUrl('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx');

    /*默认隐藏银行网点名称和开户银行账号*/
    $("#text-yhyywdmc").show();
    $("#text-khyhzh").show();
    $("#combobox-yhyywdmc").hide();
    $("#combobox-khyhzh").hide();

    dkzyfp.fkfTxForm.clear();
    dkzyfp.fkfTxWin.show();
}

/*付款方通讯录  修改*/
dkptfp.modifyFkfxx = function(){
    mini.get("ghfYhhbDm").setUrl('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx');
    /*默认显示文本框*/
    $("#text-yhyywdmc").show();
    $("#text-khyhzh").show();
    $("#combobox-yhyywdmc").hide();
    $("#combobox-khyhzh").hide();
    var modifyRow = dkzyfp.fkftxGrid.getSelected();
    if(modifyRow){
        dkzyfp.modifyGhfxx = modifyRow;
        var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人是被好
        ghfNsrsbhXz.setReadOnly(true);
        mini.get("ghfYhhbDm").setReadOnly(true);//购货方银行行别
        mini.get("text-yhyywdmc").setReadOnly(true);//购货方银行营业网点名称
        mini.get("text-khyhzh").setReadOnly(true);//购货方银行账号

        dkzyfp.fkfTxForm.setData(modifyRow);
        $("#add-fkfTx").addClass("modify-fxf").removeClass("added-fxf");
        dkzyfp.fkfTxWin.show();
    }else{
        mini.alert("请选择一条数据！");
    }
}

/*付款方通讯录 删除*/
dkptfp.deletFkxtx = function(){
    console.log("delet");
    var saveParam = {};
    var deletData =  dkzyfp.fkftxGrid.getSelected();
    if(deletData){
        saveParam.xhfDjxh =   dkzyfp.djxh;//销货方等级序号
        saveParam.ghfNsrsbh = deletData.ghfNsrsbh;//购货方纳税人识别号
        saveParam.ghfYhkhzh = deletData.ghfYhkhzh;//购货方银行开户账号
        mini.confirm('是否删除这条记录？','提示',function(action){
            if(action == "ok"){
                dkZyService.deleteFkfxx(mini.encode(saveParam),function(data){
                    if(data.success){
                        dkzyfp.fkftxGrid.removeRow(deletData,true);
                    }else{
                        mini.alert(data.message);
                    }
                })
            }
        })

    }else{
        mini.alert("请先选中一条记录。");
    }
}

/*输入付款方纳税人识号，自动带出*/
dkptfp.onFkNsrBlur = function(e){
    var param = {};
    var eValue = e.source.value;
    mini.get("_ghfYhhbDm").setUrl('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx');
    if(!e.source._IsValid ||(e.source.value ==dkzyfp.fhkSelectedData.ghfNsrsbh)){
        return false;
    }
    if(e.source.value){

        param.ghfNsrsbh = e.source.value;
        param.xhfDjxh = dkzyfp.djxh;
        // 先查通讯录中有没有
        // 比较当前纳税人信息是否在通讯录中
        var flag=false;
        dkZyService.getFkftxl(dkzyfp.djxh,"",function(data){
            if(data.value){
                var addToFkftxl = mini.get("addToFkftxl");

                for(var i=0,result=data.value,j=result.length;i<j;i++){
                    if(result[i].ghfNsrsbh == e.source.value){
                        flag = true;
                        addToFkftxl.hide();
                        yhxxValidate(result[i]);
                        break;
                    }
                }

                if(flag){
                    var fields = dkzyfp.fkfForm.getFields();
                    $.each(fields,function(i,item){
                        item.setReadOnly(true);
                    });
                }

                if(!flag){
                    addToFkftxl.setChecked(true);
                }
            }
        });
        // 通讯录中没有再走接口查
        if(!flag){
            dkZyService.getGjnsr(mini.encode(param),function(data){
                if(data.success){
                    if(data.value){
                        var value = data.value;
                        if(value.issnnsr =="Y"){
                            /*显示下拉框*/
                            dkzyfp.zzsfpGhfXXDjxh = value.zzsfpGhfxxVO.djxh;
                            mini.get("_ghfYhhbDm").setData(value.yhhbxx); // 银行种类
                            // 如果只有一条银行信息，直接带出
                            if(value.yhhbxx.length == 1){
                                value.zzsfpGhfxxVO.ghfYhhbDm = value.yhhbxx[0].ID;
                            }
                            if(value.yhhbxx.length > 1) {
                                if(value.nsrckzhzhxxDto) {
                                    value.zzsfpGhfxxVO.ghfYhhbDm = value.yhhbxx[0].ID;
                                }
                            }
                            dkzyfp.ghfXXIssn = true;
                            $("#ghfYhyywdDm").show();
                            $("#combobox-gmfyhzh").show();
                            $("#ghfYhyywdMc").hide();
                            $("#text-gmfyhzh").hide();
                            /* var yywdmc = value.ghfYhyywdDm?baseCode.getMcById('DM_GY_YHYYWD',value.ghfYhyywdDm):value.ghfYhyywdMc;
                             value.ghfYhyywdMc = yywdmc;
                             dkzyfp.ghfYhlbdm = value.ghfYhhbDm;//银行营业网点名称代码*/
                            dkzyfp.fkfForm.setData(value.zzsfpGhfxxVO);
                            if(value.zzsfpGhfxxVO.ghfYhhbDm){
                                dkptfp.gmfyhlbBlur({source:{_IsValid:true,value:value.zzsfpGhfxxVO.ghfYhhbDm}})
                            }
                        }else{
                            dkzyfp.ghfXXIssn = false;
                            $("#ghfYhyywdDm").hide();
                            $("#combobox-gmfyhzh").hide();
                            $("#ghfYhyywdMc").show();
                            $("#text-gmfyhzh").show();
                            dkzyfp.fkfForm.clear();
                            mini.get("ghf-nsrsbh").setValue(eValue);
                        }
                    }
                }else{
                    mini.alert(data.message,'提示',function(action){
                        if(action=="ok" ||action=="close"){
                            dkzyfp.fkfForm.clear();
                        }
                    })
                }
            });
        }
    }else{
        dkzyfp.fkfForm.clear();
        mini.get("ghf-nsrsbh").setValue(eValue);
    }
}
/*根据纳税人识别号查询购货方的纳税人信息*/
dkptfp.onFkfxxBlur = function(e){
    var param = {};
    var eValue = e.source.value;
    mini.get("ghfYhhbDm").setUrl('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2.ashx');
    if(!e.source._IsValid){
        return false;
    }
    if($("#add-fkfTx").hasClass("added-fxf") && e.source.value){
        param.ghfNsrsbh = e.source.value;
        param.xhfDjxh = dkzyfp.djxh;
        dkZyService.getGjnsr(mini.encode(param),function(data){
            if(data.success){
                if(data.value){
                    var value = data.value;
                   /* var ghfyywdmc = value.ghfYhyywdDm?baseCode.getMcById('DM_GY_YHYYWD',value.ghfYhyywdDm):value.ghfYhyywdMc;
                    value.ghfYhyywdMc = ghfyywdmc;
                    dkzyfp.ghfTxYhlbdm = value.ghfYhhbDm;//银行营业网点名称代码*/
                    dkzyfp.fkfTxForm.setData(value.zzsfpGhfxxVO);
                    if(value.issnnsr =="Y"){
                        dkzyfp.zzsfpGhfDjxh = value.zzsfpGhfxxVO.djxh;
                        dkzyfp.ghfIssn = true;
                        /*显示下拉框*/
                        $(".text-yhyywdmc").hide();
                        $(".text-khyhzh").hide();
                        $(".combobox-yhyywdmc").show();
                        $(".combobox-khyhzh").show();
                        mini.get("ghfYhhbDm").setData(value.yhhbxx);//开户银行类别 setData
                        // 如果只有一条银行信息，直接带出
                        if(value.yhhbxx.length == 1){
                            mini.get("ghfYhhbDm").setValue(value.yhhbxx[0].ID);
                            dkptfp.khyhlbBlur({source:{value:value.yhhbxx[0].ID}})
                        }
                    }else{
                        dkzyfp.ghfIssn = false;
                        $(".text-yhyywdmc").show();
                        $(".text-khyhzh").show();
                        $(".combobox-yhyywdmc").hide();
                        $(".combobox-khyhzh").hide();
                        dkzyfp.fkfTxForm.clear();
                        mini.get('ghfNsrsbhxz').setValue(eValue);
                    }
                }
            }else{
                mini.alert(data.message,'提示',function(action){
                    if(action=="ok" || action=="close"){
                        dkzyfp.fkfTxForm.clear();
                    }
                });
            }

        });
    }
}

/*新增通讯录中 开户银行类别值改变时*/
dkptfp.khyhlbBlur = function(e){
    if(e.source.value == dkzyfp.modifyGhfxx.ghfYhhbDm){
        return false;
    }
    if(e.source.value){
        if(dkzyfp.ghfIssn){
            //如果是省内
            /*获取营业网点对应的名称*/
            var param = {};
            param.djxh =  dkzyfp.zzsfpGhfDjxh;
            param.yhhbDm = e.source.value;
            dkZyService.getyywd(mini.encode(param),function(data){
                if(data.success){
                    mini.get("combobox-yhyywdmc").setData(data.value);
                    if(data.value.length === 1){
                        mini.get("combobox-yhyywdmc").setValue(data.value[0].ID);
                        dkptfp.yhyywdBlur({source:{_IsValid:true,value:data.value[0].ID}})
                    }
                }else{
                    mini.alert(data.message);
                }
            });
        }else{
            /*省外的话*/
            mini.get("text-khyhzh").setValue("");
            mini.get("text-yhyywdmc").setValue("");
        }

    }
}

/*新增通讯录 营业网点名称 */
dkptfp.yhyywdBlur = function(e){
    if(e.source.value ==dkzyfp.modifyGhfxx.ghfYhyywdMc){
        return false;
    }
    if(e.source.value){
        if(dkzyfp.ghfIssn){
            var param = {};
            param.djxh =  dkzyfp.zzsfpGhfDjxh;
            param.yhyywdDm = e.source.value;
            dkZyService.getyhzh(mini.encode(param),function(data){
                if(data.success){
                    mini.get("combobox-khyhzh").setData(data.value);
                    $.each(data.value,function(i,item){
                        if(item.jsbz == "Y"){
                            mini.get("combobox-khyhzh").setValue(item.ID);
                        }
                    })
                }else{
                    mini.alert(data.message);
                }
            });
        }
    }
}
/*购买方表单 银行类别*/
dkptfp.gmfyhlbBlur = function(e){
    if(e.source.value == dkzyfp.fhkSelectedData.ghfYhhbDm){
        return false;
    }
    if(e.source.value){
        if(dkzyfp.ghfXXIssn){
            //如果是省内
            /*获取营业网点对应的名称*/
            var param = {};
            param.djxh =  dkzyfp.zzsfpGhfXXDjxh;
            param.yhhbDm = e.source.value;
            dkZyService.getyywd(mini.encode(param),function(data){
                if(data.success){
                    mini.get("ghfYhyywdDm").setData(data.value);
                    if(data.value.length == 1){
                        mini.get("ghfYhyywdDm").setValue(data.value[0].ID);
                        dkptfp.ghfYhyywdBlur({source:{_IsValid:true,value:data.value[0].ID}})
                    }
                }else{
                    mini.alert(data.message);
                }
            });
        }else{
            /*省外的话*/
            mini.get("ghfYhyywdMc").setValue("");
            mini.get("text-gmfyhzh").setValue("");
        }

    }
}

/*购买方 营业网点*/
dkptfp.ghfYhyywdBlur = function(e){
    if(e.source.value == dkzyfp.fhkSelectedData.ghfYhyywdMc){
        return false;
    }
    if(e.source.value){
        if(dkzyfp.ghfXXIssn){
            var param = {};
            param.djxh =  dkzyfp.zzsfpGhfXXDjxh;
            param.yhyywdDm = e.source.value;
            dkZyService.getyhzh(mini.encode(param),function(data){
                if(data.success){
                    mini.get("combobox-gmfyhzh").setData(data.value);
                    $.each(data.value,function(i,item){
                        if(item.jsbz == "Y"){
                            mini.get("combobox-gmfyhzh").setValue(item.ID);
                        }
                    })
                }else{
                    mini.alert(data.message);
                }
            });
        }
    }

}


/*渲染开户银行类别*/
dkptfp.khyhlbRenderer = function(e){
    var text =  baseCode.getMcById('DM_GY_YHHB2',e.value);
    if(text){
        return text;
    }else{
        return '';
    }
}


/*-----第三步-------*/
/*新增时弹出劳务货物信息 弹框 */
dkptfp.addLwhwXX = function(){
    $("#add-lwhwxx").addClass("added-lwhw").removeClass("modify-lwhw");
    var totalCount =  dkzyfp.lwhwGrid.getData();
    var slvNum = Number(dkzyfp.slvValue)*100 + "%";//3%
    if(totalCount.length == 8){
        /*大于8条*/
        var tipsHtml = "<div>您的项目超过了单张发票的行数（8行），如果行数不太多，可以拆成多张发票；<span style='font-weight: bold;'>如果开清单，必须还要到前台办理。</span></div>";
        mini.alert('劳务货物信息超过八条，将被写入清单中，发票将只显示清单合计信息。','提示',function(data){
            if(data=="ok"){
                wssqUtil.addRow('lwhwxx-grid','add-lwhwxx');
                dkzyfp.slv.setValue(slvNum);

            }
        });
    }else{

        wssqUtil.addRow('lwhwxx-grid','add-lwhwxx');
    }
    dkzyfp.slv.setValue(slvNum);
}

/*修改劳务劳务货物信息*/
dkzyfp.modifyLwhwxx = function(){
    var modifyRow = dkzyfp.lwhwGrid.getSelecteds();
    if(modifyRow.length ==1){
        $("#add-lwhwxx").addClass("modify-lwhw").removeClass("added-lwhw");
        dkzyfp.lwhwxxForm.setData(modifyRow[0]);
        dkzyfp.lwhwxxWin.show();
    }else{
        mini.alert("请选择一条数据！");
    }
}
/*劳务货物信息暂存*/
dkptfp.lwhwZsSave = function(){
    var saveParam = {};
    var lwhwData = dkzyfp.lwhwGrid.getData();
    if(lwhwData.length>0){
        saveParam.xhfNsrsbh = dkzyfp.xhfnsrsbh ;//10111305000017554904
        saveParam.xhfDjxh =   dkzyfp.djxh;
        saveParam.zcData = mini.encode(lwhwData);
        dkZyService.saveZcsj(mini.encode(saveParam),function(data){
            if(data.success){
                mini.alert("暂存成功");
            }else{
                mini.alert(data.message);
            }
        })
    }else{
        mini.alert("没有需要暂存的数据");
    }
}
/*查询劳务货物信息暂存*/
dkptfp.getzcsjCheck = function () {
    //xhfNsrsbh：10111305000017554904
    mini.confirm("查询暂存只会显示已暂存的货物劳务信息，如要保存现有信息请先暂存现有货物劳务信息，请确认","提示",function(action){
        if(action == "ok"){
            dkZyService.getZcsj(dkzyfp.djxh, "", function (data) {
                if (data.success) {
                    console.log(mini.decode(data.value));
                    dkzyfp.lwhwGrid.setData(mini.decode(data.value));

                    //计算总金额
                    var  jeCount=0,seCount= 0;
                    var lwhwData = dkzyfp.lwhwGrid.getData();
                    $.each(lwhwData,function(i,item){
                        //jeCount += Number(item.hldj) * Number(item.hlsl);
                        //seCount += Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue);
						
						jeCount += Number(item.je);
						seCount += Number(item.se);
                    });
                    var jsCount = jeCount+seCount;
                    $("#jehj").html(jeCount.toFixed(2));
                    $("#sehj").html(seCount.toFixed(2));
                    $("#jshj").html(jsCount.toFixed(2));

                } else {
                    mini.alert(data.message);
                }
            });
        }
    });
};

/*删除劳务货物信息*/
dkzyfp.deletLwhwxx =function(){
    var lwhwSelecteds = dkzyfp.lwhwGrid.getSelecteds();
    if(dkzyfp.lwhwGrid.getData().length ==0){
        mini.alert("没有可以删除的劳务货物信息");
        return ;
    }
    if(lwhwSelecteds.length){
        /*获取被选择的劳务货物信息*/
        mini.confirm("您确定要删除这些劳务货物信息吗？",'提示',function(action){
            if(action == "ok") {
                dkzyfp.lwhwGrid.removeRows(lwhwSelecteds);

                //计算总金额
                var jeCount = 0, seCount = 0;
                var lwhwData = dkzyfp.lwhwGrid.getData();

                $.each(lwhwData, function (i, item) {
                    //jeCount += (Number(item.hldj) * Number(item.hlsl));
                    //seCount += (Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue));
					jeCount += Number(item.je);
					seCount += Number(item.se);
				});
                var jsCount = jeCount + seCount;
                $("#jehj").html(jeCount.toFixed(2));
                $("#sehj").html(seCount.toFixed(2));
                $("#jshj").html(jsCount.toFixed(2));
            }

        })
    }else{
        mini.alert("请选择要删除的劳务货物信息");
    }
}


/*劳务货物单位 渲染*/
dkptfp.lwhwDw = function(e){
    var text =  baseCode.getMcById('DM_GY_JLDW',e.value);
    if(text){
        return text;
    }else{
        return '';
    }
};
/*预览 发票票样*/
dkptfp.YlLwhwxx = function(){

    console.log($("#zzsdk_pyyl[name]"));
    var ptSkData = dkzyfp.zySkForm.getDataAndText();//销货方信息
    var fkfData = dkzyfp.fkfForm.getDataAndText();//购货方信息
    fkfData.ghfYhkhzh = fkfData.ghfYhkhzh?fkfData.ghfYhkhzh:fkfData.ghfYhkhzhDm;
    fkfData.ghfYhyywdMc =   fkfData.ghfYhyywdMc? fkfData.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', fkfData.ghfYhyywdDm);
    var ptyhlbmc = baseCode.getMcById('DM_GY_YHHB', ptSkData.yhhbDm);//销货方银行类别
    var fkyhlbmc = baseCode.getMcById('DM_GY_YHHB', fkfData.ghfYhhbDm);//购货方银行类别


    var lwhw =  dkzyfp.lwhwGrid.getData();//劳务获取信息
    var date = new Date();
    var currentDate = date.getFullYear()+'年'+(Number(date.getMonth())+1)+ '月' + date.getDate() +'日';

    /*开票日期*/
    $("span[name='kprq']").html(currentDate);

    $("span[name='ghfNsrmc']").html(fkfData.ghfNsrmc);
    $("span[name='ghfNsrsbh']").html(fkfData.ghfNsrsbh);
    $("span[name='ghfDz']").html(fkfData.ghfDz +' '+fkfData.ghfLxdh);
    $("span[name='ghfYhkhzh']").html(fkfData.ghfYhyywdMc + ' '+fkfData.ghfYhkhzh);


    $("span[name='xhfnsrmc']").html(ptSkData.nsrmc);
    $("span[name='xhfnsrsbh']").html(ptSkData.nsrsbh);
    $("span[name='xhfdz']").html(ptSkData.dz +' '+ptSkData.jbrdh);
    $("span[name='xhfyhzh']").html(ptSkData.yhyywdMc+ ' '+ ptSkData.yhzh);
    $("#skr").html(ptSkData.skr);
    $("#fhr").html(ptSkData.fhr);
    $("span[name='xhfmcxx']").html(ptSkData.nsrmc);
    $("span[name='xhfshxx']").html(ptSkData.nsrsbh);
    $("span[name='xhfbz']").html(ptSkData.bz);
    
    var lwhwHtml = '';
    dkzyfp.ybWin.show();
    if(lwhw.length <= 8){
        /*渲染劳务获取表格*/
        $(lwhw).each(function(i,item){
            var dwsl = baseCode.getMcById('DM_GY_JLDW',item.dwslDm)?baseCode.getMcById('DM_GY_JLDW',item.dwslDm):'';
            lwhwHtml += '<tr>' +
                '<td colspan="2" class="no-right no-bottom">'+ item.hwlwmc+'</td>' +
                '<td class="no-right no-left no-bottom">'+ item.ggxh +'</td>' +
                '<td class="no-right no-left no-bottom">'+dwsl+'</td>' +
                '<td class="no-right no-left no-bottom">'+ item.hlsl+'</td>' +
                '<td colspan="3" class="no-right no-left no-bottom">'+ item.hldj+'</td>' +
                '<td class="no-right no-left no-bottom">'+ item.je+'</td>' +
                '<td class="no-right no-left no-bottom">'+ item.slv+'</td>' +
                '<td class="no-left no-bottom">'+ item.se+'</td>' +
                '</tr>'
        });
    }else{
        /*大于8的时候*/
        lwhwHtml += '<tr>' +
            '<td colspan="2" class="no-right no-bottom">请见清单</td>' +
            '<td class="no-right no-left no-bottom"></td>' +
            '<td class="no-right no-left no-bottom"></td>' +
            '<td class="no-right no-left no-bottom"></td>' +
            '<td colspan="3" class="no-right no-left no-bottom"></td>' +
            '<td class="no-right no-left no-bottom">'+$("#jehj").html()+'</td>' +
            '<td class="no-right no-left no-bottom">'+dkzyfp.slvValue+'</td>' +
            '<td class="no-left no-bottom">'+ $("#sehj").html() +'</td>' +
            '</tr>'
    }

    $("#plusSpmc").html(lwhwHtml);
    $("#hj_je").html("￥ "+$("#jehj").html());
    $("#hj_se").html("￥ "+$("#sehj").html());
    /*小写*/
    $("#jshf_small").html("￥ " +$('#jshj').html());
    /*大写*/
    $("#jshf_big").html("⊗  " +moneyUtil.arabicToChinese($('#jshj').html()));

}

/*数量改变的时候*/
dkptfp.slChanged = function(e){
    var djNum = dkzyfp.dj.getValue();
    if(Number(djNum) && Number(e.source.value)){
        dkzyfp.je.setValue((Number(e.source.value) * Number(djNum)).toFixed(2));
        mini.get("jeHs").setValue((Number(e.source.value) * Number(djNum) * Number(dkzyfp.slvAddValue)).toFixed(6));
        dkzyfp.se.setValue((Number(e.source.value) * Number(djNum) * Number(dkzyfp.slvValue)).toFixed(6));
    }else{
        /*控制数量不能为0*/
        if(Number(e.source.value) == 0){
            dkzyfp.sl.setValue("");
        }
        dkzyfp.je.setValue((0).toFixed(2));
        mini.get("jeHs").setValue((0).toFixed(6));
        dkzyfp.se.setValue((0).toFixed(6));
    }
}
/*单价改变的时候*/
dkptfp.djChanged = function(e){
    var slNum = dkzyfp.sl.getValue();
    if(Number(slNum) && Number(e.source.value)){
        dkzyfp.dj.setValue((Number(e.source.value)).toFixed(6));
        dkzyfp.je.setValue((Number(e.source.value) * Number(slNum)).toFixed(2));
        mini.get("jeHs").setValue((Number(e.source.value) * Number(slNum) * Number(dkzyfp.slvAddValue)).toFixed(6));
        dkzyfp.se.setValue((Number(e.source.value) * Number(slNum) * Number(dkzyfp.slvValue)).toFixed(6));
    }else{
        dkzyfp.dj.setValue((Number(0).toFixed(6)));
        dkzyfp.je.setValue((0).toFixed(2));
        mini.get("jeHs").setValue((0).toFixed(6));
        dkzyfp.se.setValue((0).toFixed(6));
    }
}

/*金额渲染 单价*数量 */
dkzyfp.onjeRender = function(e){
    var record = e.record;
    if(e.field == "je"){
        return record.hldj * record.hlsl;
    }
    return ""
}
/*税额 金额*3% */
dkzyfp.onSeRender = function(e){
    var record = e.record;
    if(e.field == "se"){
        var total = record.hldj * record.hlsl * Number(dkzyfp.slvValue);
        return  total.toFixed(6);
    }
    return "";
}
/*金额不含税，值改变时 onblur*/
dkptfp.jeChanged = function(e){
    if((Number(e.source.value))){
        mini.get("je").setValue((Number(e.source.value)).toFixed(6));
    }
    var slNum = dkzyfp.sl.getValue();
    if(Number(slNum) && Number(e.source.value)){
        //数量 有优先根据数量计算
        dkzyfp.dj.setValue((Number(e.source.value)/Number(slNum)).toFixed(6));
        mini.get("jeHs").setValue((Number(e.source.value) * Number(dkzyfp.slvAddValue)).toFixed(6));
        mini.get("se").setValue((Number(e.source.value) * Number(dkzyfp.slvValue)).toFixed(6));
    }else{
        dkzyfp.dj.setValue('');
        mini.get("jeHs").setValue((Number(0).toFixed(6)));
        mini.get("se").setValue((Number(0).toFixed(6)));
    }

}
/*金额含税，值改变时 onblur*/
dkptfp.jeHsChanged = function(e){
    var slNum = dkzyfp.sl.getValue();
    if(Number(e.source.value)){
        mini.get("jeHs").setValue((Number(e.source.value)).toFixed(6));
    }
    if(Number(slNum) && Number(e.source.value)){
        //数量 有优先根据数量计算
        dkzyfp.dj.setValue((Number(e.source.value)/ Number(dkzyfp.slvAddValue)/Number(slNum)).toFixed(6));
        mini.get("je").setValue((Number(e.source.value) / Number(dkzyfp.slvAddValue)).toFixed(6));
        mini.get("se").setValue((Number(e.source.value) * Number(dkzyfp.slvValue) / Number(dkzyfp.slvAddValue)).toFixed(6));
    }else{
        dkzyfp.dj.setValue('');
        mini.get("je").setValue((Number(0).toFixed(6)));
        mini.get("se").setValue((Number(0).toFixed(6)));
    }
}

/*银行账号校验*/
dkptfp.onyhzhValidate = function(e){
    var re = new RegExp("^[0-9]*$");
    if(e.value){
        if((e.value.length == 16 || e.value.length == 19) && re.test(e.value)){
            e.isValid = true;
        }else{
            e.isValid =false ;
            e.errorText = "请输入正确的银行账号";
        }
    }
}
/*联系电话校验*/
dkptfp.onlxdh = function(e){
    var phoneNumReg = /^1[34578]\d{9}$/; //手机号码
    var telNumReg = /^(0\d{2,3}-){0,1}\d{7,8}$/; //固定电话
    if(e.value){
        if(phoneNumReg.test(e.value) || telNumReg.test(e.value)){
            e.isValid = true;
        }else{
            e.isValid = false;
            e.errorText = "请输入正确的联系电话";
        }
    }
}

/*提交*/
dkzyfp.tj = function(tjParam){
    var result = false;
    
	$.each(fbzldata , function(i, obj){
		if( obj.bsmxlist && !obj.bsmxlist.length ){ // 为空
			delete obj.bsmxlist;  // 删除这个节点
		}
	});
	
    wssqUtil.tjsq("/fpzx-web/api/fp/zzszyfpdk/submit/zzszyfptj/",mini.encode(tjParam),function(data){
        if (!data.success) {
            mini.alert(data.message);
        } else {
            result = true;
        }
    });
    return result;
}
/*过滤字段 过滤购货方信息,传参字段名称和获取的字段名不一致需要过滤一遍*/
dkzyfp.glFkfData = function(fkfData){
    var data = {};
    data.ghfdz = fkfData.ghfDz;
    data.ghfkhyhDm = fkfData.ghfYhhbDm;
    data.ghflxdh = fkfData.ghfLxdh;
    data.ghfnsrmc = fkfData.ghfNsrmc;
    data.ghfnsrsbh = fkfData.ghfNsrsbh;
    data.ghfyhyywdmc = fkfData.ghfYhyywdMc;
    data.ghfyhzh = fkfData.ghfYhkhzh;
    data.ghfdjxh = fkfData.djxh;
    data.lrrDm = '';
    data.sjgsdq = '';
    data.uuid='';
    data.xgrDm = '';
    return data;
}

/*销货方*/
dkzyfp.glXhffData = function(xhfData){
    var data = {};
    data.xhfdjxh = xhfData.djxh;
    data.xhfkhyhDm = xhfData.yhhbDm;
    data.xhfyhyywdmc = xhfData.yhyywdMc;
    data.xhfyhzh = xhfData.yhzh;
    data.xhfdz = xhfData.dz;
    data.xhflxdh = xhfData.jbrdh;
    data.zspmDm = xhfData.zspm;
    data.lrrDm = '';
    return data;
}


/*关闭当前页面*/
dkptfp.closeWindows = function(){
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1
        || userAgent.indexOf("Chrome") != -1) {
        close();//直接调用JQUERY close方法关闭
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
};


/*备注校验*/
dkptfp.bzValidate = function(e){
    if(e.value){
        var re = new RegExp("^[\u4e00-\u9fa5]+$");
        if (re.test(e.value) && e.value.length <= 200){
            e.isValid = true;
        }else{
            e.isValid = false;
            e.errorText = "请输入不超过200个汉字";
        }
    }
}

/*导入*/
dkzyfp.startUpload = function(){
    //mini.get("drmb-win").show();
	mini.open({
		url: "sc.html",        //页面地址
		title: "上传",      //标题
		//iconCls: String,    //标题图标
		width: 800,      //宽度
		height: 600,     //高度
		allowResize: false,       //允许尺寸调节
		allowDrag: false,         //允许拖拽位置
		showCloseButton: true,   //显示关闭按钮
		showMaxButton: false,     //显示最大化按钮
		showModal: true,         //显示遮罩
		loadOnRefresh: false,       //true每次刷新都激发onload事件
		onload: function () {       //弹出页面加载完成
			/*var iframe = this.getIFrameEl();
			var data = {};
			//调用弹出页面方法进行初始化
			iframe.contentWindow.SetData(data);*/

		},
		ondestroy: function (action) {  //弹出页面关闭前
			if (action == "close") {       //如果点击“确定”
				var iframe = this.getIFrameEl();
				//获取选中、编辑的结果
				var data = iframe.contentWindow.GetData();
				data = mini.clone(data);    //必须。克隆数据。

                //计算总金额
                var  jeCount=0,seCount= 0;
                $.each(data,function(i,item){
	                var zsl;
	                if( item.zsl_qd.match('%') ){
		                zsl = item.zsl_qd;
	                }else{
		                zsl = Number( item.zsl_qd ) * 100 + '%';
	                }
	                
                    //jeCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd));
                    //seCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd) * Number(dkzyfp.slvValue));
                    jeCount = Number( item.bhsjeCount || 0);
					seCount += Number( item.bhsjeCount || 0) * Number(dkzyfp.slvValue);
					//seCount = Number( item.hsjeCount || 0); //
					jsCount = Number( item.hsjeCount|| 0); // 含税金额
					
					item.hwlwmc = item.hwlwmc_qd;
                    item.ggxh = item.ggxh_qd;
                    item.dwslDmText = item.dwMc;
                    item.hlsl = item.hlsl_qd;
                    item.jeHs = item.xse_qd;
                    item.hldj = item.bhshldj_qd;
                    item.je = item.je_qd;
                    item.slv = zsl; //zsl_qd;
                    item.se = item.se_qd;
                });
                
                //var jsCount = jeCount+seCount;
                dkptfp.$jehj.html(jeCount.toFixed(2));
                dkptfp.$sehj.html(seCount.toFixed(2));
                dkptfp.$jshj.html(jsCount.toFixed(2));
				
				var qdData = data.clone(); //清单
				qdData.splice(qdData.length-1, 1); //清除最后一条合计
				dkzyfp.lwhwGrid.setData(qdData);

			}
		}

	})
    /*文件上传*/

}

/*模板下载*/
dkzyfp.downloadModel = function(){
 /*   window.location="qdmb.xls";*/
    window.open("https://ybs.he-n-tax.gov.cn:8888/download/qdmb.xls");
 /*   downloadFile('qdmb.xls');*/
}

/*渲染单位*/
dkzyfp.renderder = function(e){
    var text =  baseCode.getMcById('DM_GY_YHHB2',e.value);
    if(text){
        return text;
    }else{
        return '';
    }
}
//征收品目
dkzyfp.zspmChanged = function(e){
    for(var i=0;i< dkzyfp.zspmData.length;i++){
        if(dkzyfp.zspmData[i].zspmDm == e.value){
            mini.get("hyDm").setValue(dkzyfp.zspmData[i].hyDm);
            mini.get("txHyDm").setValue(dkzyfp.zspmData[i].hyMc);
        }
    }
}

/*下载*/
function downloadFile(url) {
    try{
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    }catch(e){

    }
}

//通讯录带出银行信息校验并输出
function yhxxValidate(jydata){
    var selectedData = jydata;
    if(selectedData){
        dkzyfp.fhkSelectedData = selectedData;//本选中的付款方
        dkZyService.checkNsrzg(selectedData.ghfNsrsbh,'',function(data){
            if(data.success){
                dkzyfp.ghfNsrzgxx = true;//购货方纳税人资格信息
                dkZyService.checkGhfzt(selectedData.ghfNsrsbh,'',function(data){
                    if(data.success){
                        dkzyfp.ghfzt = true;//购货方纳税人状态
                    }else{
                        mini.alert(data.message+"请您维护通讯录!");
                        dkzyfp.ghfzt = false;//购货方纳税人状态
                    }
                });
            }else{
                mini.alert(data.message+"请您维护通讯录!");
                dkzyfp.ghfNsrzgxx = false;//购货方纳税人资格信息
            }
        });
        if(dkzyfp.ghfNsrzgxx && dkzyfp.ghfzt ){
            dkzyfp.fkfForm.setData(selectedData);
            dkzyfp.fkfTxWindw.hide();
        }
    }
}


/**
 * Created by yuepu on 2017/1/18.
*/
/*代开增值税专通发票*/
stepNav.onStepChanging = function (event, currentIndex, newIndex) {
    if(currentIndex==0){
        dkzyfp.zySkForm.validate();
        if(!dkzyfp.zySkForm.isValid()){
            return false;
        }
    }
    if(currentIndex==1){
        var  jeCount=0,seCount= 0;
        /*      lwhwData = dkptfp.lwhwGrid.getData();*/
        $.each(dkzyfp.lwhwGrid.getData(),function(i,item){
            //jeCount += (Number(item.hldj) * Number(item.hlsl));
			//seCount += (Number(item.hldj) * Number(item.hlsl) * Number(dkzyfp.slvValue));
			
			jeCount += Number(item.je);
			seCount += Number(item.se);
		});
        var jsCount = jeCount+seCount;
        $("#jehj").html(jeCount.toFixed(2));
        $("#sehj").html(seCount.toFixed(2));
        $("#jshj").html(jsCount.toFixed(2));

        //进入下一步之前再次弹框
        dkzyfp.fkfForm.validate();
        if(dkzyfp.fkfForm.isValid()){
            if(!dkzyfp.confirm){
                var fkfDatas = dkzyfp.fkfForm.getData();
                /*银行账号*/
                fkfDatas.ghfYhkhzh = fkfDatas.ghfYhkhzh?fkfDatas.ghfYhkhzh:fkfDatas.ghfYhkhzhDm;
                fkfDatas.ghfYhyywdMc = fkfDatas.ghfYhyywdMc?fkfDatas.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD',fkfDatas.ghfYhyywdDm);

                dkzyfp.fkfCheckForm.setData(fkfDatas);


                /*查询所有的付款方通讯录*/
                // 比较当前纳税人信息是否在通讯录中
                dkZyService.getFkftxl(dkzyfp.djxh,"",function(data){
                    if(data.value){
                        var flag=false;
                        var addToFkftxl = mini.get("addToFkftxl");

                        for(var i=0,result=data.value,j=result.length;i<j;i++){
                            if(result[i].ghfNsrsbh == fkfDatas.ghfNsrsbh){
                                flag = true;
                                addToFkftxl.setChecked(false);
                                addToFkftxl.hide();
                                break;
                            }
                        }
                        if(!flag){
                            addToFkftxl.show();
                            addToFkftxl.setChecked(true);
                        }
                    }
                });

                dkzyfp.checkAgain.show();
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }

    }
    if(currentIndex==2){
        $("#xxyj-text").hide();
        getTicketsWay();//选择领取方式
        /*劳务货物信息*/
        if(dkzyfp.lwhwGrid.getData().length <=0){
            mini.alert("请先新增一条劳务货物信息");
            return false;
        }else{
            return true;
        }
    }
    if(currentIndex==3){

        var swsxMxDmList=[];
        //获取附报资料列表
        var datas = {
            'swsxDm': wssqUtil.currentSwsxDm,
            'swsxMxDmList':swsxMxDmList
        };
        fbzlAjax(datas,'requestFbzllist');
    }
    if(currentIndex==4){
        if(!isCondition()){
            return;
        }
        //给预览提交的附报资料赋值
        fbzlylGrid.setData(fbzldata);
    }
    if(currentIndex==5){
        //提交
        var tjParam={};
        var ptSkData = dkzyfp.zySkForm.getData();//销货方信息

        var fkfData = dkzyfp.fkfForm.getData();//购货方信息
        fkfData.ghfYhkhzh = fkfData.ghfYhkhzh?fkfData.ghfYhkhzh:fkfData.ghfYhkhzhDm;
        fkfData.ghfYhyywdMc =   fkfData.ghfYhyywdMc? fkfData.ghfYhyywdMc:baseCode.getMcById('DM_GY_YHYYWD', fkfData.ghfYhyywdDm);

        //过滤销货方
        var xhfDataParam = dkzyfp.glXhffData(ptSkData);

        /*过滤购货方信息*/
        var fkfDataParam = dkzyfp.glFkfData(fkfData);
        tjParam.fpdkZzsGhfnsrxxVO = fkfDataParam;//购货方信息数据组织

        var datas = $.extend({},xhfDataParam,fkfDataParam);

        datas.xhfsfzjzlDm = "201";//证件种类代码
        datas.yjse = dkzyfp.sehj+'';
        datas.jshj = dkzyfp.xse+'';
        datas.kjhzzzszyfptzdhm = '';
        datas.lrrDm = '';
        datas.lzfpdm = '';
        datas.sfdkhzfp = '';
        datas.sjgsdq = '';
        datas.xgrDm = '';
        datas.zzsfpuuid = '';
        datas.bz = ptSkData.bz;
        datas.dksquuid = '';
        tjParam.fpdkZzsfpVO = datas;

        /*劳务货物信息*/
        var lwhwGrid = dkzyfp.lwhwGrid.getData();
        var lwhw = {};
        if(lwhwGrid.length >8){
            var lwhObj = {};
            var lwhArr = [];
            lwhObj.hwlwmc = "详见销货清单";
            lwhObj.slzsl = dkzyfp.slvValue;
            lwhObj.lrrDm = "";
            lwhObj.je = dkzyfp.jehj +'';
            lwhObj.se = dkzyfp.sehj +'';
            lwhObj.jsxj = dkzyfp.xse +'';
            lwhObj.xse = Number(dkzyfp.jehj) * Number(dkzyfp.slvAddValue) +'';

            lwhArr[0] = lwhObj;
            lwhw.fpdkZzsfpHlmxGridlb = lwhArr;
        }else{
            $.each(lwhwGrid,function(i,item){
                item.slv = dkzyfp.slvValue;
                item.dj =  item.hldj;
                item.xse = item.jeHs +'';
                item.slzsl = dkzyfp.slvValue;
                item.je = item.je +'';
                item.lrrDm ='';
                item.sjgsdq =  '';
                item.xgrDm =  '';
                item.zzsfpmxuuid =  '';
                item.zzsfpuuid =  '';
                item.jsxj = item.jeHs+'';
            });
            lwhw.fpdkZzsfpHlmxGridlb = lwhwGrid;
        }

        tjParam.fpdkZzsfpHlmxGrid=lwhw;

        //总计
        var currentDate = new Date();
        var fpdkTemp = {};
        var zj = {};
        var zjTeml= {};
        zj.djxh = dkzyfp.djxh;
        zj.dkfplbDm = "01";
        zj.dksqje = dkzyfp.jehj+'';
        zj.dksquuid = "";
        zj.hyDm =  ptSkData.hyDm;//行业代码
        zj.jdxzDm = "";//行业代码
        zj.jmsbz = "N";
        zj.jmslxDm = "";
        zj.jmyy = "";
        zj.kjbz = "N";
        zj.kpje = dkzyfp.xse +'';
        zj.kplxDm = "01";
        zj.lcslid = "";
        zj.lrrDm = "";
        zj.pzxh = "";
        zj.sjgsdq = "";
        zj.slrDm = "";
        zj.slswjgDm = "";
        zj.sqdhm = "";
        zj.sqrq = "";
        zj.sqrxm = "";
        zj.xgrDm = "";
        zj.xzqhszDm = "";
        zj.ybsfe =dkzyfp.sehj;
        zj.zfbz1 = "";
        zj.zfrDm = "";
        zj.zfrq1 = "";
        zj.zgswskfjDm = "";
        zj.zrrbz = "N";

        tjParam.fpdkSqVO = zj;

        var fpdkSfmxArr = [];
        var fpdkSfmxGridlb={};
        fpdkSfmxGridlb.dkfplbDm = '01';
        fpdkSfmxGridlb.dksquuid = '';
        fpdkSfmxGridlb.hyDm = ptSkData.hyDm;
        fpdkSfmxGridlb.jmsfe = "0";
        fpdkSfmxGridlb.jmspjguuid = '';
        fpdkSfmxGridlb.jsfyj = dkzyfp.jehj;
        fpdkSfmxGridlb.jyxmDm = '';
        fpdkSfmxGridlb.lrrDm = '';
        fpdkSfmxGridlb.nsqnyjse = '';
        fpdkSfmxGridlb.sfl = dkzyfp.slvValue;
        fpdkSfmxGridlb.sfmxuuid = '';
        fpdkSfmxGridlb.sjgsdq = '';
        fpdkSfmxGridlb.skssqq =  currentDate.getFirstDateOfMonth('yyyy-MM-dd');
        fpdkSfmxGridlb.skssqz = currentDate.getLastDateOfMonth('yyyy-MM-dd');
        fpdkSfmxGridlb.srze = dkzyfp.jehj +'';
        fpdkSfmxGridlb.sskcs = '';
        fpdkSfmxGridlb.ghfYhyywdMc = fkfData.ghfYhyywdMc;
        fpdkSfmxGridlb.tddjDm = '';
        fpdkSfmxGridlb.xgrDm = '';
        fpdkSfmxGridlb.ybsfe = dkzyfp.sehj +'';
        fpdkSfmxGridlb.yjsfe = '0';
        fpdkSfmxGridlb.ynsfe = dkzyfp.sehj+'';
        fpdkSfmxGridlb.yxkcje = '0';
        fpdkSfmxGridlb.zfbz1 = 'N';
        fpdkSfmxGridlb.zfrDm = '';
        fpdkSfmxGridlb.zfrq1 = '';
        fpdkSfmxGridlb.zspmDm = ptSkData.zspm;
        fpdkSfmxGridlb.zsxmDm = '10101';
        fpdkSfmxGridlb.zszmDm = '';
        fpdkSfmxGridlb.zszspmDm = '';
        fpdkSfmxGridlb.zszsxmDm = '';
        fpdkSfmxGridlb.zszszmDm = '';

        fpdkSfmxArr[0] = fpdkSfmxGridlb;
        var tempObj = {};
        tempObj.fpdkSfmxGridlb=fpdkSfmxArr;
        var gridTeml = {};
        tjParam.fpdkSfmxGrid = tempObj;


        console.log(tjParam);
        var submitParam = {};
        submitParam.fpzzszyfpdksbdVO = tjParam;
        submitParam.bbh='';
        submitParam.xmlbh='';
        submitParam.xmlmc='';
        submitParam.skr = ptSkData.skr;
        submitParam.fhr = ptSkData.fhr;
        submitParam.jbr = ptSkData.jbr;
        /*合计报文 自己家的*/
        var dpdkHjVO = {};
        dpdkHjVO.jehj = dkzyfp.jehj;
        dpdkHjVO.sehj = dkzyfp.sehj;
        dpdkHjVO.jshj = dkzyfp.xse;
        submitParam.dpdkHjVO = dpdkHjVO;

        var hwlwqd = {};
        if(lwhwGrid.length >8){
            hwlwqd.isqdxx = "Y";
            $.each(lwhwGrid,function(i,item){
                item.slv = dkzyfp.slvValue;
                item.dj =  item.hldj;
                item.xse = item.jeHs +'';
                item.slzsl = dkzyfp.slvValue;
                item.je = item.je +'';
                item.lrrDm ='';
                item.sjgsdq =  '';
                item.xgrDm =  '';
                item.zzsfpmxuuid =  '';
                item.zzsfpuuid =  '';
                item.jsxj = item.jeHs+'';
            });
            hwlwqd.hwlwqdmx = lwhwGrid;
        }else{
            hwlwqd.isqdxx = "N";
            hwlwqd.hwlwqdmx = '';
        }
        submitParam.hwlwqd = hwlwqd;

        return   dkzyfp.tj(submitParam);

    }

    return true;
};
