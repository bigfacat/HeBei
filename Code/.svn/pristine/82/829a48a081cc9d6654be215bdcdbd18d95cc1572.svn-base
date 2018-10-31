var hwlwmc = [];  //货物劳务名称
var dwData = [];  //单位
var hjData = {};//价税合计
var fbzlGrid;
var dkzyfp = {
	slvValue: 0.03, //税率
	modifyGhfxx: {},//暂存购货方modify的数据
	uploadGridData: [], //上传清单 grid 显示的数据
	ynsfInfo: [], //新疆 应纳税费信息
	xHFyhzhErrorTip: true
};
var configData = {
	skrFhrData: {}, //收款人 复核人 数据
	txlData: {}, //通讯录 选中的 数据
	xhfFromData: {}, //销货方 数据 包含备注
	lwhuData: [],  //劳务货物数据 数组
	isUpload: false  //是否上传清单
}
var isGTH = false;  //是否是个体户  true false
var luhuSelectData = {
	hwlwmc: {},
	dw: {}
}
//销售额 = 金额含税
function kpCommitEdit(e){
	console.log( e.editor.value );
};
var lwhuNum = {
	sl: 4,  // 数量
	dj: 8, // 单价
	jehs: 2, // 金额含税
	jebhs: 2, // 金额不含税
	se: 2  // 税额
}
function kpEndEdit(e){
	
	var filed = e.field;
	switch (filed){
		case "je":
			window.jebhsBlur(e); break;
		case "hlsl":
			window.slBlur(e); break;
		case "hldj":
			window.djBlur(e); break;
		case "jeHs":
			window.jehsBlur(e); break;
		default:
			break;
	}
	
};



// dkzyfp.lwhwGrid.on('cellendedit' ,function(e) {
// 	var selected = e.row;
// 	dkzyfp.lwhwGrid.updateRow( e.row, selected );
// })
var txlPanel,//通信录弹框
	txlAddForm, //添加通讯录 表单
	txlGrid; //通讯录 列表

dkzyfp.uploadFn = function(){
	$(window).scrollTop(0);
	mini.open({
		url: "sc.html",        //页面地址
		title: "填写货物劳务信息",      //标题
		//iconCls: String,    //标题图标
		width: 800,      //宽度
		height: 400,     //高度
		allowResize: false,       //允许尺寸调节
		allowDrag: false,         //允许拖拽位置
		showCloseButton: true,   //显示关闭按钮
		showMaxButton: false,     //显示最大化按钮
		showModal: true,         //显示遮罩
		loadOnRefresh: false,       //true每次刷新都激发onload事件
		onload: function () {       //弹出页面加载完成
		},
		ondestroy: function (action) {
			var iframe = this.getIFrameEl();
			//计算总金额
			if( !iframe.contentWindow.GetData ){  //没有此方法 可能登陆状态丢失 进入登陆页面
				return;
			}
			var data = iframe.contentWindow.GetData();
			data = mini.clone(data);
			if( !data ){
				return;
			};
			
			var jeCount = 0, seCount = 0, jsCount = 0;
			
			var numCount = 0;
			var errorIndex = '';
			var slIsRight = true;

			$.each(data, function(i,item){
				if( item.zsl_qd && (item.zsl_qd != dkzyfp.slvValue) ){
					slIsRight = false;
					return;
				}
				//if( item.hwlwmc_qd.trim() == ''){
				//	errorIndex += i+1 + ', ';
				//	return true
				//}
				
				//jeCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd));
				//seCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd) * Number(dkzyfp.slvValue));
				
				//jeCount = Number(item.je_qd || 0);
				//seCount = Number(item.se_qd || 0);
				
				jeCount = Number( item.bhsjeCount || 0);
				//seCount = Number( item.hsjeCount || 0); //
				seCount += Number( item.bhsjeCount || 0) * Number(dkzyfp.slvValue);
				jsCount = Number( item.hsjeCount|| 0); // 含税金额
				
				item.hwlwmc = item.hwlwmc_qd;
				item.MC = item.hwlwmc_qd; //后面会过滤
				item.ggxh = item.ggxh_qd;  //规格型号
				item.dwslDmText = item.dwMc; //单位
				item.hlsl = item.hlsl_qd || '';  //数量
				item.jeHs = item.xse_qd;  //金额含税
				item.hldj = item.bhshldj_qd;  //单价不含税
				item.je = item.je_qd;  //金额不含税
				item.slv = item.zsl_qd; //  parseFloat(dkzyfp.slvValue) * 100 + '%';  税率
				item.se = item.se_qd;  //税额
				numCount += parseFloat( item.hlsl_qd || '0' );
			});
			if( !slIsRight ){
				mini.alert('请您检查清单里面的税率是否正确');
				return;
			}
			configData.isUpload = true;

			//"hwlwmc_qd", "hlsl_qd", "hldj_qd", "ggxh_qd", "dwMc", "xse_qd", "bhshldj_qd", "je_qd", "se_qd"
			//hldj_qd  含税单价
			//bhshldj_qd 不含税单价
			
			//var jsCount = jeCount+seCount;
			hjData.jebhsHj = jeCount.toFixed(2);
			hjData.seHj = seCount.toFixed(2);
			hjData.jehsHj = jsCount.toFixed(2); //金额含税合计
			
			(new mini.Form('#hjse')).setData( hjData );
			
			
			var hshjDxXx = {  //大写小写
				hjdx: toDX(hjData.jehsHj),
				hjxx: hjData.jehsHj,
				jshj: hjData.jehsHj
			};
			
			(new mini.Form('#jshj_view')).setData( hshjDxXx );
			(new mini.Form('#jshj_yl_view')).setData( hshjDxXx );
			
			
			$('.show-upload').show(); //可以查看
			var qdData = data.clone(); //清单
			qdData.splice(qdData.length-1, 1); //清除最后一条合计
			
			dkzyfp.lwhwViewGrid.setData( qdData );
			if( mini.get('lwhwViewGrid_yl') ){
				mini.get('lwhwViewGrid_yl').setData( qdData );
			}
			configData.lwhuData = qdData; // 上传后赋值
			
			//列表生成一条数据
			//货物劳务名称写死为“详见清单”，展示金额（含税）、金额（不含税）、税率、税额。
			dkzyfp.uploadGridData = [{
				MC: '详见清单',
				hlsl: '', //numCount
				dwslDm: ' ',
				hwlwmc: ' ',
				je: jeCount.toFixed(2), //hjData.jebhsHj, //金额不含税,
				jeHs: jsCount.toFixed(2), //hjData.jehsHj, //金额含税
				se: seCount.toFixed(2), // hjData.seHj, //税额
				slv: parseFloat(dkzyfp.slvValue) * 100 + '%'  //税率
			}];
			
			
			dkzyfp.uploadGridDataYl = dkzyfp.uploadGridData;
			dkzyfp.uploadGridDataYl[0].hwlwmc = dkzyfp.uploadGridDataYl[0].MC; //预览数据  兼容老数据

			dkzyfp.lwhwGrid.setData( dkzyfp.uploadGridData );
			dkzyfp.lwhwGrid.hideColumn(0)
			dkzyfp.lwhwGrid.showColumn(1);
			dkzyfp.lwhwGrid.setReadOnly(true);
			dkzyfp.getYnskxx( hjData.jebhsHj ); //新疆
			//if( errorIndex ){ ('您的清单表中，第' + errorIndex + '行数据有问题，请检查');	}
		}
	})	
};

dkzyfp.initPage = function(){
	stepNav.initSteps([
		{id:0,title:'填写开票信息',url:'newKPXX.aspx'},
		{id:1,title: '上传附报资料', url: '../public1/fbzl/FbzlView.aspx', js: true},
		{id:2,title: '预览提交', url: 'newDKYL.aspx', yltj:true},
		{id:3,title: '审核中', url: '../public1/shz/shz.aspx', js: true},
		{id:4, title:'完成', url:'success.html'}
	]);
}

$(function(){
	
	dkzyfp.isSameUpdate = false; //默认 false
	
	var maxFloat = 8;  //小数位数
	var maxInfoLength = 8;  //最多8条信息  劳务货物
	
	dkzyfp.xhfIsNeed = false;//是否需要代开发票
	
	//是否需要代开发票
	kpService.isNeedDKFP( wssqUtil.nsrjbxx.nsrsbh, function(data){
		if(data.success){
			dkzyfp.xhfIsNeed = true;//是否需要代开发票
		}else{
			dkzyfp.xhfIsNeed = false;//是否需要代开发票
			mini.alert(data.message,'提示',function(action){
				if(action=="ok" || action=="close")
					wssqUtil.closeWin();
			});
		}
	});
	
	//获取税率
	kpService.getSl({}, function(data){
		if(data.success){
			dkzyfp.slvValue = data.value; //"0.03" 税率
			dkzyfp.slvAddValue = Number(data.value) +1+''; //"1.03" 税率加1
		}else{
			closeWinConfirm( data.message );
		}
	});
	
	//判断是否是个体户
	if( wssqUtil.nsrjbxx.kzztdjlxDm == "1120" ){
		isGTH = true;
	}
	
	
	dkzyfp.initPage();
	mini.parse();
	
	//去当前年月
	var cDate = new Date();
	$('.dqrq_text').text( cDate.getFullYear() +'年' + (cDate.getMonth()+1) + '月' + cDate.getDate() + '日');
	if( mini.get('kprq_val') ){
		mini.get('kprq_val').setValue( cDate.getFullYear() +'年' + (cDate.getMonth()+1) + '月' + cDate.getDate() + '日' );
	}
	
	fbzlGrid = mini.get('fbzl-grid'); //附报资料
	txlPanel = mini.get("fkfTx");//通信录弹框
	//txlAddForm, //添加通讯录 表单
	txlGrid = mini.get("fkftx-grid"); //通讯录 列表
		
	//scfpqd = mini.get("scfpqd"); // 上传发票清单弹窗
	
	configData.xhfxx = new mini.Form("#xhfxx");  //销货方
	configData.sfrFhfForm = new mini.Form("#sfrFhfForm"); //复核人 收款人 表单
	
	//configData.xhfxx.setData(wssqUtil.nsrjbxx);//初始化 销货方
	configData.showTxl = new mini.Form("#showTxl"); //显示的通讯录 信息
	
	dkzyfp.djxh = wssqUtil.nsrjbxx.djxh; //登记序号
	dkzyfp.xhfnsrsbh = wssqUtil.nsrjbxx.nsrsbh;// 销货方纳税人识别号
	
	dkzyfp.lwhwViewGrid =  mini.get("lwhwViewGrid"); //上传后预览的 劳务货物信息
	
	dkzyfp.lwhwGrid = mini.get("lwhwxx-grid");//劳务货物信息表格
	dkzyfp.lwhwGrid.hideColumn(1)
	dkzyfp.lwhwGrid.showColumn(0);
	
	
	
	var slText = dkzyfp.slvValue * 100 + '%';
	dkzyfp.lwhwGrid.addRows([{
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}, {
		slv: slText
	}], 0);
	
	configData.xhfFromData = wssqUtil.nsrjbxx;
	
	dkzyfp.getXHFyhzh = function(){
		
		kpService.getXHFyhzh(dkzyfp.djxh, function(data){
			if(data.success){
				var formData = data.value || {};
				$.extend(configData.xhfFromData,  formData);
			}else{
				if( dkzyfp.xHFyhzhErrorTip ){
					closeWinConfirm( data.message );
				}
			}
		});
	}
	dkzyfp.getXHFyhzh();
	
	// 获取电话
	kpService.getAccountInfo(function(data){
		if(data.success && data.value){
			$.extend(configData.xhfFromData,  {
				jbrdh: nsrxxUtil.getNsrxxVO().nsrxxKzVO.fddbryddh
			});
			mini.get('zpdk-skfxx-jbrxm').setValue(data.value.AccountInfo.fullName);
		}
	});
	configData.xhfxx.setData( configData.xhfFromData );
	
	//复核人 收款人数据初始化
	kpService.getSkrFhr({}, function(data){
		if(!data.success){
			mini.alert(data.message || '获取数据失败');
			return;
		}
		if(data.value ){
			var obj = JSON.parse(data.value);
			configData.skrFhrData.skr = obj[0].skr;
			configData.skrFhrData.fhr = obj[0].fhr;
		}else{
			if( isGTH ){//个人  个体户时取业主，可修改   |  单位纳税人时，取财务负责人
				configData.skrFhrData.skr = wssqUtil.nsrjbxx.fddbrxm;
				configData.skrFhrData.fhr = wssqUtil.nsrjbxx.fddbrxm;//
			}else{
				configData.skrFhrData.skr = wssqUtil.nsrjbxx.nsrxxKzVO.cwfzrxm;//
				configData.skrFhrData.fhr = wssqUtil.nsrjbxx.fddbrxm;
			}
		}
		configData.sfrFhfForm.setData( configData.skrFhrData );
	});
	
	//开票信息事件绑定
	$('body').on('click', '.kpxx_btn', function(){
		if(kpxxObj.lock){
			return;
		}
		var method = $(this).attr('method');
		kpxxObj[ method ] ? kpxxObj[ method ]($(this)) : '';
	});
	
	txlPanel.on('beforebuttonclick', function(){
		kpxxObj.lock = false;
	});
	
	window.kpxxObj = {
		submitType: '',  //保存方式 增加 编辑
		lock: false,  // 不能 点击 编辑 增加 删除按钮
		//打开 常用购买方 联系人
		openTXL: function(){
			txlPanel.show();
			kpService.getTxl(dkzyfp.djxh, function(data){
				if( !data.success ){
					mini.alert(data.message || '获取数据失败');
					return;
				}
				if(data.value){
					txlGrid.setData(data.value);
				}else{
					txlGrid.setData([]);
				}
			}, function(){
				mini.alert('网络错误，请稍后再试');
			})
		},
		
		//打开增加通讯录 表单
		/*addLXR: function(){
		 this.lock = true;
		 this.submitType = 'add';
		 this.showForm();
		 var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人是被好
		 ghfNsrsbhXz.setReadOnly(false);
		 mini.get("ghfYhhbDm").setReadOnly(false);//购货方银行行别
		 mini.get("text-yhyywdmc").setReadOnly(false);//购货方银行营业网点名称
		 mini.get("text-khyhzh").setReadOnly(false);//购货方银行账号
		 }*/
		addLXR: function(){
			this.lock = true;
			this.submitType = 'add';
			this.showForm();
			var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人识别号
			//ghfNsrsbhXz.setReadOnly(false);
			// mini.get("ghfYhhbDm").setReadOnly(false);//购货方银行行别
			// mini.get("text-yhyywdmc").setReadOnly(false);//购货方银行营业网点名称
			// mini.get("text-khyhzh").setReadOnly(false);//购货方银行账号
		},
		
		showForm: function( data ){ //显示表单  编辑时候 要显示数据
			var form = $('#add_txl_form');
			if( !form.html().trim() ){
				$.get('./addTxlTemp.html',  function( html ){
					$('#add_txl_form').html(html).show();
					mini.parse();
					txlAddForm = new mini.Form("#add_txl_form");
					if( data  ){
						txlAddForm.setData( data );
					}else{
						txlAddForm.clear();
					}
				}, 'html')
			}else{
				form.show();
				txlAddForm = new mini.Form("#add_txl_form");
				if( data ){
					txlAddForm.setData( data );
				}else{
					txlAddForm.clear();
				}
			}
		},
		
		//修改一条通讯录
		/*editLXR: function(){
		 this.lock = true;
		 this.submitType = 'edit';
		 var data = dkzyfp.modifyGhfxx = txlGrid.getSelected();
		 if( !data ){
		 this.lock = false;
		 mini.alert('请选中一条数据');
		 return;
		 }
		 this.showForm( data );
		 //dkzyfp.modifyGhfxx = modifyRow;
		 var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人是被好
		 ghfNsrsbhXz.setReadOnly(true);
		 mini.get("ghfYhhbDm").setReadOnly(true);//购货方银行行别
		 mini.get("text-yhyywdmc").setReadOnly(true);//购货方银行营业网点名称
		 mini.get("text-khyhzh").setReadOnly(true);//购货方银行账号
		 
		 //dkzyfp.fkfTxForm.setData(modifyRow);
		 //$("#add-fkfTx").addClass("modify-fxf").removeClass("added-fxf");
		 //dkzyfp.fkfTxWin.show();
		 }*/
		editLXR: function(){
			this.lock = true;
			this.submitType = 'edit';
			var data = dkzyfp.modifyGhfxx = txlGrid.getSelected();
			if( !data ){
				this.lock = false;
				mini.alert('请选中一条数据');
				return;
			}
			this.showForm( data );
			//dkzyfp.modifyGhfxx = modifyRow;
			var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人是被好
			ghfNsrsbhXz.setReadOnly(true);
			//mini.get("ghfYhhbDm").setReadOnly(true);//购货方银行行别
			// mini.get("text-yhyywdmc").setReadOnly(true);//购货方银行营业网点名称
			// mini.get("text-khyhzh").setReadOnly(true);//购货方银行账号
			
			//dkzyfp.fkfTxForm.setData(modifyRow);
			//$("#add-fkfTx").addClass("modify-fxf").removeClass("added-fxf");
			//dkzyfp.fkfTxWin.show();
		},
		
		//删除一条通讯录
		deleteLXR: function(){
			var selectTr = txlGrid.getSelected();
			if(!selectTr){
				this.lock = false;
				mini.alert('没有可以删除的数据');
				return;
			};
			mini.confirm('确定删除选中的记录吗？','提示',function(action){
				if(action == "ok"){
					var deleteData = {
						xhfDjxh:  dkzyfp.djxh, //销货方等级序号
						ghfNsrsbh: selectTr.ghfNsrsbh,
						ghfYhkhzh: selectTr.ghfYhkhzh,
					};
					kpService.deleteTxl(mini.encode(deleteData), function(data){
						if(data.success){
							txlGrid.removeRow( selectTr );
						}else{
							mini.alert(data.message);
						}
					});
				}
			});
		},
		
		//保存增加 通讯录
		saveAddTxl: function(){
			txlAddForm.validate();
			if ( !txlAddForm.isValid() ){
				this.lock = false;
				return
			};
			var formData = txlAddForm.getDataAndText();
			
			var updateParam = {
				fplx: '01'
			};
			
			if( $(".text-yhyywdmc:visible").length == 0 ){  //下拉
				if( formData['combobox-yhyywdmcText'] ){
					formData.ghfYhyywdMc = formData['combobox-yhyywdmcText'];
				}else if( formData.ghfYhyywdDm ){
					formData.ghfYhyywdMc = baseCode.getMcById("DM_GY_YHYYWD",formData.ghfYhyywdDm);
				}
			}
			
			formData.ghfYhkhzh = formData.ghfYhkhzh?formData.ghfYhkhzh: formData.ghfYhkhzhDm;
			formData.spmc="";
			formData.lrrq="";
			updateParam.xhfDjxh = dkzyfp.djxh;
			updateParam.zzsfpGhfxxDto = mini.encode(formData);
			if(this.submitType == 'add'){
				updateParam.act = "insert";
			}else{
				updateParam.act = "update";
			}
			
			var $this = this;
			
			//提交更新通讯录
			
			var canSave = true;
			var urlParam = {
				ghfNsrmc: formData.ghfNsrmc,
				ghfNsrsbh: formData.ghfNsrsbh,
				xhfDjxh: dkzyfp.djxh,
				yhzh: formData.ghfYhkhzh,
				khh: formData.ghfYhyywdMc,
				dh: formData.ghfLxdh || '',
				dz: formData.ghfDz || '',
				ghfYhhbDm: formData.ghfYhhbDm || ''
			};
			
			if(this.submitType == 'add'){
				$this.isHasTxl(urlParam, function(){
					mini.confirm('通讯录中已存在，是否替换？', '提示', function(action){
						if( action == 'cancel' ){
							$this.calcelAddTxl(  );
						}else{
							updateParam.act = "update";
							$this.saveTxl( updateParam, true);
						}
					});
				}, function(){
					$this.saveTxl( updateParam, true);
				});
			}else{
				$this.saveTxl( updateParam, true);
			}
		},
		
		//页面填写信息判断
		isSame: function(){
			var $this = this;
			var result = true;
			var urlParam = { //
				ghfNsrmc: configData.txlData.ghfNsrmc,
				ghfNsrsbh: configData.txlData.ghfNsrsbh,
				xhfDjxh: dkzyfp.djxh,
				yhzh: configData.txlData.ghfYhkhzh,
				khh: configData.txlData.ghfYhyywdMc,
				dh: configData.txlData.ghfLxdh,
				dz: configData.txlData.ghfDz
			};
			$this.isHasTxl(urlParam, function(){
				mini.confirm('通讯录中已存在，是否替换？', '提示', function(action){
					if( action == 'cancel' ){
						$this.calcelAddTxl();
						dkzyfp.isSameUpdate = true;
						stepNav.wizard.steps('next');
					}else{
						var formData = configData.showTxl.getDataAndText();
						var updateParam = {
							fplx: '01'
						};
						formData.spmc = "";
						formData.lrrq = "";
						updateParam.xhfDjxh = dkzyfp.djxh;
						updateParam.zzsfpGhfxxDto = mini.encode(formData);
						updateParam.act = "update";
						$this.saveTxl( updateParam , null, function(){
							dkzyfp.isSameUpdate = true;
							stepNav.wizard.steps('next');
						});
					}
				});
				result = false;
			}, function(){
			});
			return result;
		},
		
		// 判断是否一致
		isHasTxl : function(urlParam, hasFn, notFn){
			kpService.isHasTxl(urlParam, function(data){
				if( !data.success ){
					mini.alert(data.message);
					return;
				}
				if(data.resultMap.isExist){  // 有变化  有修改
					hasFn ? hasFn() : '';
				}else{  // 没有变化
					notFn ? notFn() : '';
				}
			})
		},
		
		saveTxl: function(updateParam, needOpenList, callback ){  //执行保存方法
			var $this = this;
			$('.error-tip-box').text('努力保存中...').show();
			kpService.saveTxl(mini.encode(updateParam), function(data){
				if(data.success){
					$('.error-tip-box').hide();
					if(needOpenList){
						kpxxObj.openTXL(); //重新取数据
					}
					callback ? callback() : '';
				}else{
					$('.error-tip-box').hide();
					mini.alert(data.message);
				}
			}, function(){
				$('.error-tip-box').hide();
				mini.alert('网络错误，请稍候再试。');
			});
			$this.calcelAddTxl();
		},
		
		//取消添加通讯录
		calcelAddTxl: function(){
			this.lock = false;
			var ghfNsrsbhXz = mini.get('ghfNsrsbhxz');//纳税人是被好
			if(ghfNsrsbhXz){
				ghfNsrsbhXz.setReadOnly(false);
			}
			(new mini.Form("#add_txl_form")).clear();
			$("#add_txl_form").hide();
		},
		
		/*根据纳税人识别号查询购货方的纳税人信息onFkfxxBlur: function(e){
		 var param = {};
		 var eValue = e.source.value;
		 mini.get("ghfYhhbDm").setUrl('../../../api/baseCode/get/baseCode2CombSelect6/DM_GY_YHHB2');
		 if(!e.source._IsValid){
		 return false;
		 }
		 if(kpxxObj.submitType == 'add' && e.source.value){  //是新增
		 param.ghfNsrsbh = e.source.value;
		 param.xhfDjxh = dkzyfp.djxh;
		 kpService.getGjnsr(mini.encode(param),function(data){
		 if(data.success){
		 if(data.value){
		 var value = data.value;
		 txlAddForm.setData(value.zzsfpGhfxxVO); //设置值
		 if(value.issnnsr =="Y"){
		 dkzyfp.zzsfpGhfDjxh = value.zzsfpGhfxxVO.djxh;
		 dkzyfp.ghfIssn = true;
		 //显示下拉框
		 $(".text-yhyywdmc").hide();
		 $(".text-khyhzh").hide();
		 $(".combobox-yhyywdmc").show();  //银行营业网点名称 下拉显示
		 $(".combobox-khyhzh").show();
		 mini.get("ghfYhhbDm").setData(value.yhhbxx);//开户银行类别 setData  下拉
		 // 如果只有一条银行信息，直接带出
		 if(value.yhhbxx.length == 1){
		 mini.get("ghfYhhbDm").setValue(value.yhhbxx[0].ID);
		 kpxxObj.khyhlbBlur({source:{value:value.yhhbxx[0].ID}})
		 }
		 }else{
		 dkzyfp.ghfIssn = false;
		 //$(".text-yhyywdmc").show(); // 银行营业网点名称 下拉
		 $(".text-khyhzh").show();
		 $(".combobox-yhyywdmc").hide();
		 $(".combobox-khyhzh").hide();
		 txlAddForm.clear();
		 mini.get('ghfNsrsbhxz').setValue(eValue);
		 }
		 }
		 }else{
		 mini.alert(data.message,'提示',function(action){
		 if(action=="ok" || action=="close"){
		 //dkzyfp.fkfTxForm.clear();
		 new mini.Form('#add_txl_form').clear()
		 }
		 });
		 }
		 
		 });
		 }
		 }*/
		onFkfxxBlur: function(e){  //弹窗
			var param = {
				fplx: '01'
			};
			var eValue = e.source.value;
			if(!e.source._IsValid){
				return false;
			}
			if(kpxxObj.submitType == 'add' && e.source.value){  //是新增
				param.ghfNsrsbh = e.source.value;
				param.xhfDjxh = dkzyfp.djxh;
				kpxxObj.getTxlDataBynsrsbh( param , function(data){
					if(data.issnnsr == 'Y' || data.zzsfpGhfxxVO.ghfNsrmc ){ //省内  或者省外有数据
						$.each(data.zzsfpGhfxxVO, function(key, val){
							if( !val ){
								delete data.zzsfpGhfxxVO[key]
							}
						});
					}
					txlAddForm.setData(data.zzsfpGhfxxVO); //设置值
				}, function(){
					new mini.Form('#add_txl_form').clear()
				});
			}
		},
		
		onTxlxxBlur: function(e){ //填写页面 纳税人识别号离开  通讯录
			var param = {
				fplx: "01"
			};
			var eValue = e.source.value;
			if(!e.source._IsValid){
				return false;
			}
			param.ghfNsrsbh = e.source.value;
			param.xhfDjxh = dkzyfp.djxh;
			kpxxObj.getTxlDataBynsrsbh( param , function(data){
				
				if(data.issnnsr == 'Y' || data.zzsfpGhfxxVO.ghfNsrmc ){ //省内  或者省外有数据
					$.each(data.zzsfpGhfxxVO, function(key, val){
						if( !val ){
							delete data.zzsfpGhfxxVO[key]
						}
					});
					configData.showTxl.setData(data.zzsfpGhfxxVO); //设置值
				}
				configData.defaultTxlData = data.zzsfpGhfxxVO;
				
			}, function(){
				configData.showTxl.clear();
			});
		},
		
		//根据纳税人识别号查找通讯录数据
		getTxlDataBynsrsbh: function( param, success, error , outer){
			kpService.getGjnsr(mini.encode(param),function(data){
				if(data.success){
					if(data.value){
						success ? success( data.value ) : '';
					}
				}else{
					mini.alert(data.message,'提示',function(action){
						if(action=="ok" || action=="close"){
							error ? error() : '' //清空
						}
					});
				}
			});
		},
		
		/* 营业网点名称 */
		yhyywdBlur : function(e){
			if(e.source.value == dkzyfp.modifyGhfxx.ghfYhyywdMc ){
				return false;
			}
			if(e.source.value){
				if(dkzyfp.ghfIssn){
					var param = {};
					param.djxh =  dkzyfp.zzsfpGhfDjxh;
					param.yhyywdDm = e.source.value;
					kpService.getyhzh(mini.encode(param), function(data){
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
		},
		
		khyhlbBlur: function(e){  //开户银行选中
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
					kpService.getyywd(mini.encode(param),function(data){
						if(data.success){
							mini.get("combobox-yhyywdmc").setData(data.value);
							if(data.value.length === 1){
								mini.get("combobox-yhyywdmc").setValue(data.value[0].ID);  //默认显示第一条
								kpxxObj.yhyywdBlur({source:{_IsValid:true, value:data.value[0].ID}})
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
			}else{
			
			}
		}
		
	}
	
	
	//通讯录
	$('body').on('click', '.txl_btn', function(){
		var method = $(this).attr('method');
		kpxxObj[ method ] ? kpxxObj[ method ]($(this)) : '';
	});
	
	
	
	//通讯录 选择 取消按钮
	$("#save-btn").click(function(){
		var selectedData = txlGrid.getSelected();
		//selectedData.setTooltip =
		if(selectedData){
			
			//校验资格 和 状态
			kpService.nsrzg(selectedData.ghfNsrsbh, function(data){
				if(data.success){
					dkzyfp.ghfNsrzgxx = true;//购货方纳税人资格信息
					kpService.ghfzt(selectedData.ghfNsrsbh, function(data){
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
				configData.showTxl.setData( selectedData );
				mini.get('ghfNsrmc_ghf').setTooltip( selectedData.ghfNsrmc );
				mini.get('ghfYhyywdMc_ghf').setTooltip( selectedData.ghfYhyywdMc );
				mini.get('ghfDz_ghf').setTooltip( selectedData.ghfDz );
				kpxxObj.calcelAddTxl();
				txlPanel.hide();
				configData.txlData = selectedData;
				configData.defaultTxlData = selectedData;
				$('.openTXL-btn').text('更换购买方');
			}
		}else{
			mini.alert("请先选择一条数据");
		}
	});
	
	$("#cancle-btn").click(function(){
		kpxxObj.calcelAddTxl();
		txlPanel.hide();
	});
	
	$('body').on('click', '.go-upload', function(){
		dkzyfp.uploadFn();
	});
	
	//根据名称获取 劳务货物的 id
	function getLwIdByName( name ){
		var id;
		$.each(hwlwmc, function(i, obj){
			if(obj.MC == name){
				id = obj.ID;
				return false;
			}
		});
		return id;
	};
	
	//根据单位名称获取代码
	function getDwIdByName( name ){
		var id;
		$.each(dwData, function(i, obj){
			if(obj.MC == name){
				id = obj.ID;
				return false;
			}
		});
		return id;
	};
	
	//计算合计
	function jsHj(e, data){
		var hsHj = 0, bhsHj = 0, seHj = 0,   //合计值
			hsObj, bhsObj, seObj; //miniui对象
		
		var gridData = dkzyfp.lwhwGrid.getData();
		$.each(gridData, function(i, obj){
			seHj += parseFloat( obj.se||0 );
			bhsHj += parseFloat( obj.je||0 );
			hsHj += parseFloat( obj.jeHs||0 );
		})
		
		hjData.jehsHj = hsHj.toFixed( 2 ) ;
		hjData.jebhsHj = bhsHj.toFixed( 2 ) ;
		hjData.seHj = seHj.toFixed( 2 ) ;
		
		(new mini.Form('#hjse')).setData( hjData );
		
		var hshjDxXx = {  //大写小写
			hjdx: toDX(hjData.jehsHj),
			hjxx: hjData.jehsHj,
			jshj: hjData.jehsHj
		};
		
		(new mini.Form('#jshj_view')).setData( hshjDxXx );
		(new mini.Form('#jshj_yl_view')).setData( hshjDxXx );

		//dkzyfp.lwhwGrid.updateRow( e.record._uid,  data);
		dkzyfp.getYnskxx( hjData.jebhsHj ); //待删除 新疆特色
	}
	
	//金额不含税 离开事件
	window.jebhsBlur = function( e ){
		var selected = e.row;
		var newData = {};
		$.extend(newData, selected);
		
		var defJebhsValue = selected.je;
		if( !$.isNumeric( defJebhsValue ) ){  //如果不是数值
			if(defJebhsValue == '' && (selected.se || selected.jeHs)){
				defJebhsValue = 0;
			}else{
				return;
			}
		}
		var jebhsValue = parseFloat( defJebhsValue ).toFixed( lwhuNum.jebhs );  // 2 数量金额不含税 值
		newData.je = jebhsValue; //设置新的值
		if(selected.hlsl){  //数量有值   单价 = 金额不含税有值 / 数量
			newData.hldj = (parseFloat(jebhsValue) / parseFloat(selected.hlsl) || 0).toFixed( lwhuNum.dj ); // 8
		}else if(selected.hldj){ //有单价   金额不含税 = 数量 * 单价
			newData.hlsl = (parseFloat(jebhsValue) / parseFloat(selected.hldj) || 0).toFixed( lwhuNum.sl ) ; // 4
		}
		//计算 金额含税
		jsjehs(e, newData);
		//dkzyfp.lwhwGrid.updateRow( e.record._uid, newData );
	};
	
	//数量 离开事件 计算
	window.slBlur = function( e ){
		var selected = e.record;
		var defSl = selected.hlsl;
		if( !$.isNumeric( defSl ) || defSl == 0 ){
			return;
		}
		var newData = {};
		$.extend(newData, selected);
		
		newData.hlsl = parseFloat(defSl).toFixed( lwhuNum.sl ); // 4
		if(selected.hldj){ //有单价   金额不含税 = 数量 * 单价
			newData.je = (parseFloat(selected.hldj) * parseFloat(selected.hlsl)).toFixed( lwhuNum.jebhs ) ; // 2 金额不含税
		}else if(selected.je){  //金额不含税有值   单价 = 金额不含税有值 / 数量
			newData.hldj = (parseFloat(selected.je) / parseFloat(selected.hlsl)).toFixed( lwhuNum.dj ); // 8
		}
		//dkzyfp.lwhwGrid.updateRow( e.record._uid, newData );
		jsjehs(e, newData);
	};
	
	//单价 离开事件 计算
	window.djBlur = function( e ){
		var selected = e.record;
		var defDj = selected.hldj;
		if( !$.isNumeric( defDj ) || defDj == 0 ){
			return;
		}
		var newData = {};
		$.extend(newData, selected);
		newData.hldj = parseFloat(defDj).toFixed( lwhuNum.dj ); // 8
		if(selected.hlsl){ //有数量
			newData.je = (parseFloat(selected.hlsl) * parseFloat(selected.hldj)).toFixed( lwhuNum.jebhs ); // 金额不含税 2
		}else if(selected.je){
			newData.hlsl = (parseFloat(selected.je) / parseFloat(selected.hldj)).toFixed( lwhuNum.sl ); // 数量 4
		}
		//dkzyfp.lwhwGrid.updateRow( e.record._uid,  newData);
		jsjehs(e, newData);
		
		
	};
	
	//计算 金额含税
	window.jsjehs = function( e, data ){
		var jebhs = data.je;  //金额不含税 的值
		if( $.isNumeric( jebhs ) ){
			data.jeHs = ( parseFloat(jebhs) * (1+dkzyfp.slvValue)).toFixed( lwhuNum.jehs ); // 2
			data.se = (jebhs* dkzyfp.slvValue).toFixed( lwhuNum.se ); // 2
			dkzyfp.lwhwGrid.updateRow( e.row,  data);
			jsHj( e, data );
		}else{
			dkzyfp.lwhwGrid.updateRow( e.row,  data);
		}
		console.log( data );
	}
	
	//计算 金额 含税 离开
	window.jehsBlur = function( e, data ){
		var data = e.record;
		var jehs = data.jeHs;  //金额含税 的值
		if( $.isNumeric( jehs ) ){
			var newData = {};
			var gridData = dkzyfp.lwhwGrid.getData();
			var tempse = 0;
			$.each(gridData,function (index,item) {
				if(!!item.se){
					tempse += Number(parseFloat(item.se).toFixed( lwhuNum.se)) // 2
				}
            })
			
			//计算税额
			newData.jeHs = parseFloat(jehs).toFixed( lwhuNum.jehs ); // 2
			newData.je = (parseFloat(newData.jeHs) / (1+dkzyfp.slvValue)).toFixed( lwhuNum.jebhs );  // 2 计算出的  金额 不含税 的值。
			newData.se = (newData.je * dkzyfp.slvValue).toFixed( lwhuNum.se ); // 2

			if(data.hlsl){ //有数量  单价 = 金额 / 数量
				newData.hldj = (parseFloat(newData.je) / parseFloat(data.hlsl) || 0).toFixed( lwhuNum.dj );// 8
			}else if(data.hldj){
				newData.hlsl = (parseFloat(newData.je) / parseFloat(data.hldj) || 0).toFixed( lwhuNum.sl ); // 4
			}
			
			dkzyfp.lwhwGrid.updateRow( e.record._uid,  newData);
			jsHj( e, newData );
		};
	}
	
	window.onFloatValidae = function( e,zs ){
		if(zs && e.value == 0 ){
			e.setValue('');
			showError('只能输入数值且必须大于0');
			return;
		}
		if (!e.isValid || parseFloat(e.value) <= 0 ) {
			e.sender.setValue('');
			showError('只能输入大于0的数值');
		}
	};
	
	//劳务货物 获取焦点
	window.focusHwlwmc = function(e){
		var val = e.sender.text;
		url = '../../data/hwlwMcData.ashx';
		// if( e.sender.text == '' || e.sender.text.match('请选择') || e.sender.text.match('请输入关键字') ){
		// 	val = '';
		// 	url = '../../data/hwlwMcData.json';
		// }else{
		// 	url = '../../../api/fp/zzszyfpdk/get/hwlwmc?hwlwmc=' + encodeURI( val )
		// }
		// e.htmlEvent.currentTarget.value = val;
		
		setTimeout(function(){
			e.sender.setUrl( url );
			if( e.sender.text == '' || e.sender.text.match('请选择') || e.sender.text.match('请输入关键字') ){
				e.htmlEvent.currentTarget.value = '';
			}
		}, 200);
		
	};
	
	window.selectChangeLw = function(e){  //处理下拉改变  将文字赋值给另一个字段
		if(e.selected.ID){
			luhuSelectData.hwlwmc[e.selected.ID] = e.selected.MC;
		}
	}
	window.selectChangeDw = function(e){ //同上
		if(e.selected.ID){
			luhuSelectData.dw[e.selected.ID] = e.selected.MC;
		}
	}
	
	function doEditOrNot(){
		var notSame = false;
		$.each(configData.defaultTxlData, function(i, obj){
			if( configData.txlData[i] != undefined && (configData.txlData[i]||"").trim() != (obj||'').trim() ){
				notSame = true;
			}
		});
		if( !notSame ){
			dkzyfp.isSameUpdate = true;
			stepNav.wizard.steps('next');
			return true;
		}
		mini.confirm('通讯录中已存在，是否替换？', '提示', function(action){
			if( action == 'cancel' ){
				kpxxObj.calcelAddTxl();
				dkzyfp.isSameUpdate = true;
				stepNav.wizard.steps('next');
			}else{
				var formData = configData.showTxl.getDataAndText();
				var updateParam = {
					fplx: '01'
				};
				formData.spmc = "";
				formData.lrrq = "";
				updateParam.xhfDjxh = dkzyfp.djxh;
				updateParam.zzsfpGhfxxDto = mini.encode( formData );
				updateParam.act = "update";
				kpxxObj.saveTxl( updateParam , null, function(){
					dkzyfp.isSameUpdate = true;
					stepNav.wizard.steps('next');
				});
			}
		});
	}
	// 分步 监控
	var txlModific = false;
	stepNav.onStepChanging = function (event, currentIndex, newIndex) {
		//测试待删除
		
		if(currentIndex == 0){
			
			if(!configData.showTxl.validate()){ //  购买方 通讯录
				return false;
			}
			configData.txlData = configData.showTxl.getData();

			if( !configData.xhfxx.validate() ){  //验证销货方电话地址
				return false;
			}
			
			if( !configData.sfrFhfForm.validate() ){  //收款人 复核人
				return false;
			}
			
			// if( !dkzyfp.isSameUpdate ){
			// 	// 判断通讯录 是否一致
			// 	if( !kpxxObj.isSame() ){  //如果不一致 确认是否覆盖
			// 		return false;
			// 	}
			// }
			
			//判断通讯录是否修改
			if( !dkzyfp.isSameUpdate ){
				doEditOrNot();
				return false;
			}
			//txlModific = false;
			
			dkzyfp.isSameUpdate = false;
			//获取劳务货物数据
			//configData.lwhuData = configData.lwhuData || dkzyfp.lwhwGrid.getData();  //如果有 不再重新取数据
			
			if( !configData.isUpload ){ //不是excel上传 页面最少有一条数据 验证条件 获取数据
				configData.lwhuData = dkzyfp.lwhwGrid.getData();
				configData.lwhuDataYl = configData.lwhuData; //兼容老数据预览
				//过滤数据
				var validateResult = true;
				var newLwhuData = [];
				var errorText = '';
				$.each(configData.lwhuData, function(i, data){  //验证 劳务货物信息 填写
					if(( data.dw || data.ggxh || data.jeHs || data.hlsl || data.hldj ) && (!data.hwlwmc || !data.je)){
						validateResult = false;
						errorText = '货物劳务信息和金额（不含税）不能为空';
						return true;
					}
					if( (data.hwlwmc && !data.je) || (data.je && !data.hwlwmc)  ){
						errorText = '请将货物劳务信息填写完整';
						validateResult = false;
						return true;
					}
					if( data.hwlwmc && data.je ){
						if( data.MC ){
							data.hwlwmc = data.MC; //不需要id
						}
						//data.MC;    //不需要MC字段
						newLwhuData.push( data );
						configData.lwhuDataYl[i].hwlwmc = configData.lwhuDataYl[i].MC || configData.lwhuDataYl[i].hwlwmc;
					}
				});
				configData.lwhuData = newLwhuData; //过滤掉空数据
				
				if(!validateResult){
					alert( errorText );
					return false;
				}
				if( !configData.lwhuData.length ){
					alert('最少填写一条劳务货物信息');
					return false;
				}
				
			}
			var bzVal = mini.get('bz').getValue();
			if( bzVal.length > 200 ){
				alert('备注最长不能超过200个字');
				return false;
			}
			//获取附报资料列表
			var datas = {
				'swsxDm': wssqUtil.currentSwsxDm,
				'swsxMxDmList': []
			};
			fbzlAjax(datas,'requestFbzllist');
			configData.skrFhrData = configData.sfrFhfForm.getData();
			configData.xhfFromData.bz = bzVal;  //备注
			//configData.xhfFromData = configData.xhfxx.getDataAndText();
		}
		
		if(currentIndex == 1){
			//判断是否按要求上传附报资料
			if(!isCondition()){
				return false;
			}
		}
		if(currentIndex == 2){ //提交
			
			return submitDk();
		}
		return true;
	};
	
	
	
	
	//获取 增收品目 行业代码  根据登记序号
	kpService.getZspmHy(dkzyfp.djxh, function(data){
		if(data.success){
			var hyData = data.value[0];
			if(hyData){
				mini.get('ghf_hydm').setValue( hyData.hyDm );
				mini.get('ghf_zspm').setValue( hyData.zspmDm );
			}
		}
	});
	
	
	var helpText = {
		je: '您可填写金额（含税），系统会自动计算金额（不含税）。',
		dj: '若您不清楚单价（不含税），可直接填写金额（含税）。'
	}
	$('.instruction-ico').hover(function(e){
		var type = $(this).attr('type');
		if( $('.help-box:visible').length ){
			return;
		}
		var e = e || window.event;
		var oTarget = e.target || e.srcElement;
		var left = $(oTarget).offset().left,
			top = $(oTarget).offset().top;
		//var style = "left: ' +(left - 150)+ 'px; top: '+top+'px;";
		
		$('#help-text').text( helpText[type] );
		$('.help-box').css({
			left: left - 150,
			top: top
		}).show();
	}, function(){
		$('.help-box').hide();
	});
	
	//搜索劳务货物名称
	var luhuLock = false, editMiniObj;
	window.searchLwhu = function(e){
		editMiniObj = e;
	};
 
	
	var inputValueLuHw = '';
	$('body').on('compositionend', '.lwhwmc-input input.mini-buttonedit-input', function(){
		//console.log('end');
		luhuLock = false;
		if(luhuLock && !window.ActiveXObject){
			return;
		}
		if(!editMiniObj || !editMiniObj.htmlEvent){
			return;
		}
		var val = editMiniObj.htmlEvent.currentTarget.value;
		if( val == ''){
			return;
		}
		changeVal( editMiniObj, val);
	}).on('compositionstart', '.lwhwmc-input input.mini-buttonedit-input', function(){
		luhuLock = true;
	}).on('input propertychange keyup', '.lwhwmc-input input.mini-buttonedit-input', function(){ // '.lwhwmc-input input.mini-buttonedit-input',
		if(luhuLock && !(window.ActiveXObject || "ActiveXObject" in window)){  //非IE 返回
			return;
		}
		if(!editMiniObj || !editMiniObj.htmlEvent){
			return;
		}
		var val = editMiniObj.htmlEvent.currentTarget.value;
		if( val == ''){
			return;
		}
		if(val == inputValueLuHw){
			return;
		}
		inputValueLuHw = val;
		changeVal( editMiniObj, val);
	});
	var selectTimer;
	function changeVal(editMiniObj, val){
		clearTimeout(selectTimer);
		selectTimer = setTimeout(function(){
			console.log('设置url');
			clearTimeout(selectTimer);
		
			var url = '../../../api/fp/zzszyfpdk/get/hwlwmc?hwlwmc=' + encodeURI( val );  // './data/testLwHw.json';
			editMiniObj.sender.setUrl( url );
			editMiniObj.sender.select(0);
			editMiniObj.htmlEvent.currentTarget.value = val;
			
		}, 10);
	}
});

//设置 渲染 劳务货物预览数据
dkzyfp.setLwHwYlData = function(box, data){
	var lsForm;
	$('tr', box).each(function(i, obj){
		$(obj).attr('id', 'yl_lwhu_' + i);
		lsForm = new mini.Form('yl_lwhu_' + i);
		lsForm.setData( data[i] );
	});
};


dkzyfp.khyhlbRenderer = function(e){
	var text =  top.baseCode.getMcById('DM_GY_YHHB2',e.value);
	if(text){
		e.record.ghfYhhbMc = text;
		return text;
	}else{
		return '';
	}
}


function closeWinConfirm(message){
	mini.alert( message || '', '提示',function(action){
		if(action=="ok" || action=="close"){
			wssqUtil.closeWin();
		}
	});
}

/*过滤字段 过滤购货方信息,传参字段名称和获取的字段名不一致需要过滤一遍*/
dkzyfp.glFkfData = function(fkfData){
	var data = {};
	data.ghfdz = fkfData.ghfDz ||'';
	data.ghfkhyhDm = fkfData.ghfYhhbDm ||'';
	data.ghflxdh = fkfData.ghfLxdh ||'';
	data.ghfnsrmc = fkfData.ghfNsrmc ||'';
	data.ghfnsrsbh = fkfData.ghfNsrsbh ||'';
	data.ghfyhyywdmc = fkfData.ghfYhyywdMc ||'';
	data.ghfyhzh = fkfData.ghfYhkhzh ||'';
	data.ghfdjxh = fkfData.djxh ||'';
	data.lrrDm = '';
	data.sjgsdq = '';
	data.uuid='';
	data.xgrDm = '';
	return data;
};
/*销货方*/
dkzyfp.glXhffData = function(xhfData){
	var data = {};
	data.xhfdjxh = xhfData.djxh ||'';
	data.xhfkhyhDm = xhfData.yhhbDm ||'';
	data.xhfyhyywdmc = xhfData.yhyywdMc ||''; //
	data.xhfyhzh = xhfData.yhzh ||'';
	data.xhfdz = xhfData.scjydz ||'';  //地址
	data.xhflxdh = xhfData.jbrdh ||'';
	data.zspmDm = xhfData.zspm ||'';
	data.lrrDm = '';
	return data;
}

/*过滤劳务货物字段  没有值 空字符串*/
dkzyfp.lwHwData = function( data ){
	$.each(data, function(i, obj){
		obj.hwlwmc = obj.hwlwmc || '';
		obj.dwslDm = obj.dwslDm ||'';
		obj.dwslDmText = obj.dwslDmText ||'';
		obj.ggxh = obj.ggxh || '';
		obj.hldj = obj.hldj || '';
		obj.hlsl = obj.hlsl || '';
		obj.je = obj.je || '';
		obj.jeHs = obj.jeHs || '';
		obj.se = obj.se || '';
		obj.slv = obj.slv || ''; //0.03  3%
	});
	return data;
};

/*联系电话校验*/
dkzyfp.onlxdh = function(e){
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

function showError( message ){
	if(message){
		var errorBox = $('.error-tip-box');
		errorBox.show().text( message );
		setTimeout(function(){
			errorBox.hide();
		}, 1400);
	}else{
		console.warn('showError 方法 缺少参数');
	}
}

dkzyfp.showLwHwView = function(){
	if( mini.get("lwhwView")){
		mini.get("lwhwView").show();
	}else if( mini.get("lwhwView_yl") ){
		mini.get("lwhwView_yl").show();
	}
	$(window).scrollTop(0);
};

/*设置下拉数据*/

//设置值 下拉框  劳务货物名称
kpService.setLwHwMc(function(data){
	hwlwmc = data || [];  //固定写死的。
});
//hwlwmc = hwlwmc.concat( baseCode.getDataByCodeName('DM_HWLWMC') );  //劳务货物名称

//设置  单位下拉数据
kpService.setDw(function(data){
	dwData = data || []
});


// 新疆特色  应缴税费信息  参数 金额合计  待删除  新疆文件
dkzyfp.getYnskxx = function(hjse){
	var ynskxxGrid = mini.get('ynskxx-grid');  //河北没有 应缴税费信息
	if(!ynskxxGrid){
		return;
	}
	var gthBz = false;
	var _djzclxDm = wssqUtil.nsrjbxx.djzclxDm;
	if(_djzclxDm.substring(0,2) === '41'){
		gthBz = true;
	}
	
	var _zzsYnse = (Number(hjse) * dkzyfp.slvValue).toFixed(2) ;
	var zzsZspmArray = [];
	var data = {  // mini.encode
		djxh: wssqUtil.nsrjbxx.djxh,
		hjse: hjse //hjData.seHj || 0
	};
	//var dataArr = [];
	kpService.getYnsfInfo(data, function(data){
		if(data.success){
			ynsfInfo = data.value || [];
			mini.get('ynskxx-grid').setData( ynsfInfo );
		}else{
			alert(data.message || '');
		}
	});
}

// 分步 完成后渲染
stepNav.onStepChanged = function (event, currentIndex, prevIndex) {
	if(currentIndex == 2){
		//dkzyfp.setLwHwYlData( $('#xxbody_yl'), configData.lwhuData ); //预览数据
		configData.xhfFromData = configData.xhfxx.getDataAndText();
		configData.xhfFromData.khyhlbText = configData.xhfFromData.yhhbmc;
		configData.xhfFromData.dz = configData.xhfFromData.scjydz; //地址 兼容老数据
		new mini.Form('#xhfxx_yl').setData( configData.xhfFromData ); //销货方信息
		configData.txlData._ghfYhhbDmText = configData.txlData.ghfYhyywdMc;  //兼容老数据
		new mini.Form('#gh-info').setData( configData.txlData ) //购货方通讯录
		
		//预览 复核人数据
		new mini.Form('#sfrFhfForm_yl').setData( configData.skrFhrData );
		
		//预览 劳务货物
		var lwhuYl = mini.get('lwhwYl-grid');
		if(configData.isUpload){
			lwhuYl.setData( dkzyfp.uploadGridDataYl );
		}else{
			lwhuYl.setData( configData.lwhuDataYl );
		}
 
		var hjDataYl = {
			jehj: hjData.jebhsHj,
			sehj: hjData.seHj,
			jshj: hjData.jehsHj
		}
		new mini.Form('#hjse_yl').setData( hjDataYl ); //设置预览数据 //预览
		
		var ynskxxGrid = mini.get('ynskxx-yl-grid');
		if( ynskxxGrid ){
			ynskxxGrid.setData( ynsfInfo );  //预览  特色 应缴税费信息
		}
		
		//附报资料预览
		if(fbzldata){
			mini.get('fbzl-yl-grid').setData(fbzldata);
		}
	}
};
dkzyfp.initPage = function(){
	stepNav.initSteps([
		{id:0,title:'填写开票信息',url:'newKPXX.aspx'},
		{id:1,title: '上传附报资料', url: '../public1/fbzl/FbzlView.aspx', js: true},
		{id:2,title: '预览提交', url: 'newDKYL.aspx', yltj:true},
		{id:3,title: '审核中', url: 'sh.aspx',},
		{id:4, title:'完成', url:'success.html'}
	]);
}

dkzyfp.newLwhuchange = function(e){
	console.log(e);
}

dkzyfp.uploadFn = function(){
    $(window).scrollTop(0);
    mini.open({
        url: "sc.html",        //页面地址
        title: "填写货物劳务信息",      //标题
        //iconCls: String,    //标题图标
        width: 800,      //宽度
        height: 400,     //高度
        allowResize: false,       //允许尺寸调节
        allowDrag: false,         //允许拖拽位置
        showCloseButton: true,   //显示关闭按钮
        showMaxButton: false,     //显示最大化按钮
        showModal: true,         //显示遮罩
        loadOnRefresh: false,       //true每次刷新都激发onload事件
        onload: function () {       //弹出页面加载完成
        },
        ondestroy: function (action) {
            var iframe = this.getIFrameEl();
            //计算总金额
            if( !iframe.contentWindow.GetData ){  //没有此方法 可能登陆状态丢失 进入登陆页面
                return;
            }
            var data = iframe.contentWindow.GetData();
            data = mini.clone(data);
            if( !data ){
                return;
            };

            var jeCount = 0, seCount = 0, jsCount = 0;

            var numCount = 0;
            var errorIndex = '';
            var slIsRight = true;

            $.each(data, function(i,item){
                if( item.zsl_qd && (item.zsl_qd != dkzyfp.slvValue) ){
                    slIsRight = false;
                    return;
                }
                //if( item.hwlwmc_qd.trim() == ''){
                //	errorIndex += i+1 + ', ';
                //	return true
                //}

                //jeCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd));
                //seCount += (Number(item.bhshldj_qd) * Number(item.hlsl_qd) * Number(dkzyfp.slvValue));

                //jeCount = Number(item.je_qd || 0);
                //seCount = Number(item.se_qd || 0);

                jeCount = Number( item.bhsjeCount || 0);
                //seCount = Number( item.hsjeCount || 0); //
                seCount += Number( item.bhsjeCount || 0) * Number(dkzyfp.slvValue);
                jsCount = Number( item.hsjeCount|| 0); // 含税金额

                item.hwlwmc = item.hwlwmc_qd;
                item.MC = item.hwlwmc_qd; //后面会过滤
                item.ggxh = item.ggxh_qd;  //规格型号
                item.dwslDmText = item.dwMc; //单位
                item.hlsl = item.hlsl_qd || '';  //数量
                item.jeHs = item.xse_qd;  //金额含税
                item.hldj = item.bhshldj_qd;  //单价不含税
                item.je = item.je_qd;  //金额不含税
                item.slv = item.zsl_qd; //  parseFloat(dkzyfp.slvValue) * 100 + '%';  税率
                item.se = item.se_qd;  //税额
                numCount += parseFloat( item.hlsl_qd || '0' );
            });
            if( !slIsRight ){
                mini.alert('请您检查清单里面的税率是否正确');
                return;
            }
            configData.isUpload = true;

            //"hwlwmc_qd", "hlsl_qd", "hldj_qd", "ggxh_qd", "dwMc", "xse_qd", "bhshldj_qd", "je_qd", "se_qd"
            //hldj_qd  含税单价
            //bhshldj_qd 不含税单价

            //var jsCount = jeCount+seCount;
            hjData.jebhsHj = jeCount.toFixed(2);
            hjData.seHj = seCount.toFixed(2);
            hjData.jehsHj = jsCount.toFixed(2); //金额含税合计

            (new mini.Form('#hjse')).setData( hjData );


            var hshjDxXx = {  //大写小写
                hjdx: toDX(hjData.jehsHj),
                hjxx: hjData.jehsHj,
                jshj: hjData.jehsHj
            };

            (new mini.Form('#jshj_view')).setData( hshjDxXx );
            (new mini.Form('#jshj_yl_view')).setData( hshjDxXx );


            $('.show-upload').show(); //可以查看
            var qdData = data.clone(); //清单
            qdData.splice(qdData.length-1, 1); //清除最后一条合计

            dkzyfp.lwhwViewGrid.setData( qdData );
            if( mini.get('lwhwViewGrid_yl') ){
                mini.get('lwhwViewGrid_yl').setData( qdData );
            }
            configData.lwhuData = qdData; // 上传后赋值

            //列表生成一条数据
            //货物劳务名称写死为“详见清单”，展示金额（含税）、金额（不含税）、税率、税额。
            dkzyfp.uploadGridData = [{
                MC: '详见销货清单',
                hlsl: '', //numCount
                dwslDm: ' ',
                hwlwmc: ' ',
                je: jeCount.toFixed(2), //hjData.jebhsHj, //金额不含税,
                jeHs: jsCount.toFixed(2), //hjData.jehsHj, //金额含税
                se: seCount.toFixed(2), // hjData.seHj, //税额
                slv: parseFloat(dkzyfp.slvValue) * 100 + '%'  //税率
            }];


            dkzyfp.uploadGridDataYl = dkzyfp.uploadGridData;
            dkzyfp.uploadGridDataYl[0].hwlwmc = dkzyfp.uploadGridDataYl[0].MC; //预览数据  兼容老数据

            dkzyfp.lwhwGrid.setData( dkzyfp.uploadGridData );
            dkzyfp.lwhwGrid.hideColumn(0)
            dkzyfp.lwhwGrid.showColumn(1);
            dkzyfp.lwhwGrid.setReadOnly(true);
            dkzyfp.getYnskxx( hjData.jebhsHj ); //新疆
            //if( errorIndex ){ ('您的清单表中，第' + errorIndex + '行数据有问题，请检查');	}
        }
    })
};

$(function(){

    $('#close,#shz-close').click(function(){
        wssqUtil.closeWin();
    });

	lwhuNum = {
		sl: 4,  // 数量
		dj: 6, // 单价
		jehs: 6, // 金额含税
		jebhs: 6, // 金额不含税
		se: 6  // 税额
	};
	
	kpxxObj.saveAddTxl = function(){
		txlAddForm.validate();
		if ( !txlAddForm.isValid() ){
			this.lock = false;
			return
		};
		var formData = txlAddForm.getDataAndText();
		
		var updateParam = {
			fplx: '01'
		};
		
		if( $(".text-yhyywdmc:visible").length == 0 ){  //下拉
			if( formData['combobox-yhyywdmcText'] ){
				formData.ghfYhyywdMc = formData['combobox-yhyywdmcText'];
			}else if( formData.ghfYhyywdDm ){
				formData.ghfYhyywdMc = baseCode.getMcById("DM_GY_YHYYWD",formData.ghfYhyywdDm);
			}
		}
		
		formData.ghfYhkhzh = formData.ghfYhkhzh?formData.ghfYhkhzh: formData.ghfYhkhzhDm;
		formData.spmc="";
		formData.lrrq="";
		updateParam.xhfDjxh = dkzyfp.djxh;
		updateParam.zzsfpGhfxxDto = mini.encode(formData);
		if(this.submitType == 'add'){
			updateParam.act = "insert";
		}else{
			updateParam.act = "update";
		}
		
		var $this = this;
		
		//提交更新通讯录
		
		var canSave = true;
		var urlParam = {
			ghfNsrmc: formData.ghfNsrmc,
			ghfNsrsbh: formData.ghfNsrsbh,
			xhfDjxh: dkzyfp.djxh,
			yhzh: formData.ghfYhkhzh,
			khh: formData.ghfYhyywdMc,
			dh: formData.ghfLxdh || '',
			dz: formData.ghfDz || '',
			ghfYhhbDm: formData.ghfYhhbDm || ''
		};
		
		if(this.submitType == 'add'){
			
			if(kpxxObj.isExist){ // 已经存在
				mini.confirm('通讯录中已存在，是否替换？', '提示', function(action){
					if( action == 'cancel' ){
						$this.calcelAddTxl(  );
					}else{
						updateParam.act = "update";
						$this.saveTxl( updateParam, true);
					}
				});
			}else{
				$this.saveTxl( updateParam, true);
			}
		}else{
			$this.saveTxl( updateParam, true);
		}
	};



	kpxxObj.onFkfxxBlur = function(e){  //弹窗
		var param = {
			fplx: '01'
		};
		kpxxObj.isExist = false;
		var eValue = e.source.value;
		if(!e.source._IsValid){
			return false;
		}
		if(kpxxObj.submitType == 'add' && e.source.value){  //是新增
			param.ghfNsrsbh = e.source.value;
			param.xhfDjxh = dkzyfp.djxh;
			kpxxObj.getTxlDataBynsrsbh( param , function(data){
				if(data.issnnsr == 'Y' || data.zzsfpGhfxxVO.ghfNsrmc ){ //省内  或者省外有数据   (查到数据)
					kpxxObj.isExist = true;  // 是否查到  是否在库里面存在
					$.each(data.zzsfpGhfxxVO, function(key, val){
						if( !val ){
							delete data.zzsfpGhfxxVO[key]
						}
					});
				}
				txlAddForm.setData(data.zzsfpGhfxxVO); //设置值
			}, function(){
				new mini.Form('#add_txl_form').clear()
			});
		}
	}
	
	
	
	function doEditOrNot(){
		var notSame = false;
		if( !configData.defaultTxlData || !configData.defaultTxlData.ghfNsrmc ){ //
			mini.confirm('通讯录中没有，是否保存到通讯录？', '提示', function(action){
				if( action == 'cancel' ){
					kpxxObj.calcelAddTxl();
					dkzyfp.isSameUpdate = true;
					stepNav.wizard.steps('next');
				}else{
					var formData = configData.showTxl.getDataAndText();
					var updateParam = {
						fplx: '01'
					};
					formData.spmc = "";
					formData.lrrq = "";
					updateParam.xhfDjxh = dkzyfp.djxh;
					updateParam.zzsfpGhfxxDto = mini.encode( formData );
					updateParam.act = "insert";
					kpxxObj.saveTxl( updateParam , null, function(){
						configData.defaultTxlData = formData;
						dkzyfp.isSameUpdate = true;
						stepNav.wizard.steps('next');
					});
				}
			});
		}else{
			$.each(configData.defaultTxlData, function(i, obj){
				if( configData.txlData[i] != undefined && (configData.txlData[i]||"").trim() != (obj||'').trim() ){
					if( configData.defaultTxlData.issnnsr == 'Y' || configData.defaultTxlData.ghfNsrmc ){
						notSame = true;
					}
				}
			});
			if( !notSame ){
				dkzyfp.isSameUpdate = true;
				stepNav.wizard.steps('next');
				return true;
			}
			mini.confirm('通讯录中已存在，是否替换？', '提示', function(action){
				if( action == 'cancel' ){
					kpxxObj.calcelAddTxl();
					dkzyfp.isSameUpdate = true;
					stepNav.wizard.steps('next');
				}else{
					var formData = configData.showTxl.getDataAndText();
					var updateParam = {
						fplx: '01'
					};
					formData.spmc = "";
					formData.lrrq = "";
					updateParam.xhfDjxh = dkzyfp.djxh;
					updateParam.zzsfpGhfxxDto = mini.encode( formData );
					updateParam.act = "update";
					kpxxObj.saveTxl( updateParam , null, function(){
						configData.defaultTxlData = formData;
						dkzyfp.isSameUpdate = true;
						stepNav.wizard.steps('next');
					});
				}
			});
		}
	}
	
	// 分步 监控
	//var txlModific = false;
	stepNav.onStepChanging = function (event, currentIndex, newIndex) {
		//测试待删除
		
		if(currentIndex == 0){
			
			if(!configData.showTxl.validate()){ //  购买方 通讯录
				return false;
			}
			configData.txlData = configData.showTxl.getData();
			
			if( !configData.xhfxx.validate() ){  //验证销货方电话地址
				return false;
			}
			
			if( !configData.sfrFhfForm.validate() ){  //收款人 复核人
				return false;
			}
			
			// 征收品目
			if( !mini.get('zspmDm').validate() ){
				alert('征收品目不能为空');
				return;
			}
			
			
			// if( !dkzyfp.isSameUpdate ){
			// 	// 判断通讯录 是否一致
			// 	if( !kpxxObj.isSame() ){  //如果不一致 确认是否覆盖
			// 		return false;
			// 	}
			// }
			
			//判断通讯录是否修改
			if( !dkzyfp.isSameUpdate ){
				doEditOrNot();
				return false;
			}
			
			
			//txlModific = false;
			
			dkzyfp.isSameUpdate = false;
			//获取劳务货物数据
			//configData.lwhuData = configData.lwhuData || dkzyfp.lwhwGrid.getData();  //如果有 不再重新取数据
			
			if( !configData.isUpload ){ //不是excel上传 页面最少有一条数据 验证条件 获取数据
				configData.lwhuData = dkzyfp.lwhwGrid.getData();
				configData.lwhuDataYl = configData.lwhuData; //兼容老数据预览
				//过滤数据
				var validateResult = true;
				var newLwhuData = [];
				var errorText = '';
				$.each(configData.lwhuData, function(i, data){  //验证 劳务货物信息 填写
					if(( data.dw || data.ggxh || data.jeHs || data.hlsl || data.hldj ) && (!data.hwlwmc || !data.je)){
						validateResult = false;
						errorText = '货物劳务信息和金额（不含税）不能为空';
						return true;
					}
					if( (data.hwlwmc && !data.je) || (data.je && !data.hwlwmc)  ){
						errorText = '请将货物劳务信息填写完整';
						validateResult = false;
						return true;
					}
					if( data.hwlwmc && data.je ){
						if( data.MC ){
							data.hwlwmc = data.MC; //不需要id
						}
						//data.MC;    //不需要MC字段
						newLwhuData.push( data );
						configData.lwhuDataYl[i].hwlwmc = configData.lwhuDataYl[i].MC || configData.lwhuDataYl[i].hwlwmc;
					}
				});
				configData.lwhuData = newLwhuData; //过滤掉空数据
				
				if(!validateResult){
					alert( errorText );
					return false;
				}
				if( !configData.lwhuData.length ){
					alert('最少填写一条劳务货物信息');
					return false;
				}
				
			}
			var bzVal = mini.get('bz').getValue();
			if( bzVal.length > 200 ){
				alert('备注最长不能超过200个字');
				return false;
			}
			//获取附报资料列表
			var datas = {
				'swsxDm': wssqUtil.currentSwsxDm,
				'swsxMxDmList': []
			};
			fbzlAjax(datas,'requestFbzllist');
			configData.skrFhrData = configData.sfrFhfForm.getData();
			configData.xhfFromData.bz = bzVal;  //备注
			//configData.xhfFromData = configData.xhfxx.getDataAndText();
			
			mini.get('zspmDm_yl').setValue( configData.zspmDmText );  // 预览数据
			
		}
		
		if(currentIndex == 1){
			//判断是否按要求上传附报资料
			if(!isCondition()){
				return false;
			}
		}
		if(currentIndex == 2){ //提交
			
			return submitDk();
		}
		return true;
	}
	
	//获取征收品目数据 过滤重复数据
	$.get('../../../api/fp/ptfpdk/get/zspm.ashx', function(data){
		if( !data.success ){
			mini.alert(data.message,'提示',function(data){
				if(data == "ok" || data == "close"){
					window.close();
				}
			});
			return;
		}
		var filterArr = [];
		var hydmArr = [];
		$.each(data.value, function(i, obj){
			if($.inArray(obj.zspmdm ,hydmArr) < 0 ){
				filterArr.push( obj );
				hydmArr.push( obj.zspmdm );
			}
		})
		mini.get('zspmDm').setData(filterArr);
		
	});
	
});

function zspmChange(e){
	if(e.selected.zspmdm){
		configData.zspmDm = e.selected.zspmdm;
		configData.hyDm = e.selected.hydm;
		configData.zspmDmText = e.selected.zspmmc;
	}
}