var reportSB = (function () {
    //将xml格式的字符串转成xml对象
    var loadXML = function (xmlString) {
        var xmlDoc = null;
        //判断浏览器的类型
        //支持IE浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {   //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                }
            }
        }
            //支持Mozilla浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                var domParser = new DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            } catch (e) {
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    }
    //eval try cache
    var reportEval = function (str) {

        var result = 0;
        /**
         * 工具类
         * **/
        var value = function (n) {
            var v = parseFloat(n || 0).toFixed(2);
            return parseFloat(v);
        }
        var TRIMLEFT = function (_obj) {
            return _obj.toString();
        }
        var strlen = function (c) {
            //			//console.log(c.toString().length)
            return c.toString().length;
        }
        //转换为小数
        var round = function (_str1, str2) {
            var str1 = eval(_str1);
            var numVal = parseFloat(str1),
                dig = parseInt(str2);
            //			//console.log(str1)
            var lastvalue = (!isNaN(str1)) && (!isNaN(str2)) ? numVal.toFixed(dig) : 0.00
            return parseFloat(lastvalue);
        }
        var getIF = function (iftrue, str1, str2) {
            var a = iftrue ? str1 : str2;
            return iftrue ? str1 : str2;
        }
        var abs = function (express) {
            var num = eval(express);
            return Math.abs(num)
        }
        var newstr = str.replace(/or/g, '||').replace(/and/g, '&&').replace(/<>/g, '!=').replace(/Round/g, 'round');
        try {
            result = eval(newstr);
        }
        catch (e) {
            //console.log(e);
        }
        finally {
            return result;

        }
    }


    //去除数组中的空元素
    var ArrGrep = function (arr) {
        if (!$.isArray(arr)) return [];
        var tempArr = [];
        $.each(arr, function (i, v) {
            v != '' && tempArr.push(v);
        })
        return tempArr;
    }
    var MakeArr = function (s, e) {
        var start = parseInt(s),
            end = parseInt(e);
        var result = [];
        for (var i = start; i < end + 1; i++) {
            result.push(i);
        }
        return result;
    }
    var unique = function (arr) {
        var newArr = arr.concat(),
            result = [];
        for (var i = 0; i < newArr.length; i++) {
            var tar = arr.shift();
            if ($.inArray(tar, arr) < 0) {
                result.push(tar);
            }
        }
        return result;
    }

    var reportcfg = {},
        cfgXml = '',
        HD = '',
        saveXML = '',
        table = 'body table';

    var $obj = '';
    var fb_data = {};

    function getOBJ() {
        if (typeof $obj == 'object') return $obj;
        return {};
    }


    function setTable_preview(tar, xml, _cfg) {
        if (typeof $obj == 'object') return $obj.preview(tar, xml, _cfg);
        cfgXml = _cfg;
        var obj = creatOBJ();
        obj.preview(tar, xml, _cfg);
    }

    function creatOBJ() {
        //if(typeof $obj == 'object') return $obj;
        reportcfg = {
            'cfg_str': cfgXml,
            'HD_str': HD,
            'save_str': saveXML,
            'report': table
        }
        //-------------------------------------------------------------------------------------------------------------
        //创建对象
        var obj = function () {
            this.config = {};
            this.cache = {};
            this.$saveXml = '';
        }
        obj.prototype = {
            init: function () {
                this.config = reportcfg;
                this.cache.table = $(this.config.report);
                this.cache.cfgXML = this.config.cfg_str;
                this.cache.hedingXML = this.config.HD_str;
                this.cache.saveXML = this.config.save_str;
                //点击保存时的保存数据的xml配置数组
                this.cache.saveArr = [];
                //checkdata
                this.cache.checkcfg = [];
                //
                this.cache.errorMSG = [];
                //绑定事件命名序号
                this.eventIndex = 0;
                this.FB = fb_data;
                this.cache.title = '';
                this.initialize();
            },
            initialize: function () {
                var xml = loadXML(this.cache.cfgXML);
                var $xmlChild = $(xml).children().children();
                var that = this;
                $.each($xmlChild, function (i, v) {
                    var tag = v.tagName;
                    var $child = $(v).children();
                    switch (tag) {
                        case 'Head':
                            //that.solvByHead($child);
                            break;
                        case 'Body':
                            that.solvByHead($child);
                            break;
                        case 'CalcSum':
                            //	that.solvByCal($child);
                            break;
                        case 'DynamicSetCellReadOnly':
                            //	that.solvByReadonly($child);
                            break;
                        case 'DynamicSetCellFormula':
                            //	that.solvByFormula($child);
                            break;
                        case 'SaveCheckData':
                            that.SaveCheckData($child);
                            break;
                        case 'SendCheckData':
                            that.SaveCheckData($child);
                            break;
                        case 'Edited':
                            that.solvByEdited($child);
                            break;
                        case 'CanFillCells':
                            that.solvByCanFillCells($child);
                            break;
                        case 'Constrain':
                            that.saveConstrain($child);
                            break;
                        default:
                            break;
                    }
                    //	that.setDataType($child);
                })
            },
            solvByHead: function (xml) {
                //debugger;
                $.merge(this.cache.saveArr, xml);
            },
            solvByEdited: function (record) {
                var that = this,
                    jsonXml = {};
                $.each(record, function (i, v) {
                    jsonXml = that.turnToJson(v);
                    that.edited(jsonXml);
                })
            },
            solvByCanFillCells: function (record) {
                var that = this,
                    jsonXml = {};
                $.each(record, function (i, v) {
                    jsonXml = that.turnToJson(v);
                    that.CanFillCells(jsonXml);
                })
            },
            saveConstrain: function (record) {
                this.cache.Constrain = record;
            },
            solvByConstrain: function () {
                if (!this.cache.Constrain) {
                    return true;
                }
                var record = this.cache.Constrain;
                var that = this,
                    jsonXml = {};
                var Row = $(record).find('Row');
                var attr = Row[0].attributes;
                var rowArr;// =
                try {
                    rowArr = MakeArr((attr['from'].nodeValue - 1), (attr['to'].nodeValue - 1));
                }
                catch (e) {
                    var json = this.turnToJson(Row[0]);
                    rowArr = MakeArr(json['from'] - 1, json['to'] - 1);
                }
                finally {
                    if (!rowArr) {
                        return true;
                    }
                }
                var rule = Row.children('Rule'),
                    result = false;
                $.each(rule, function (i, v) {
                    result = that.solveRule(v, rowArr);
                    if (!result) return false
                })
                //TODO
                return result;
            },
            //(TRIMLEFT("#1")="" and TRIMLEFT("#2")="")
            solveRule: function (rule, rowArr) {
                var jsonRule = this.turnToJson(rule)
                var warn = jsonRule['against-warn'];
                var item = $(rule).children('items').children('item');
                var itemJson = {},
                    that = this;
                $.each(item, function (i, v) {
                    itemJson['data' + (i + 1)] = $(v).text();
                })
                var valueJson = {};
                var formula = $(rule).children('cell-formula').text();
                var regexp = /#\d{1}/g;
                var regarr = formula.match(regexp);  //['#1','#2']   obj[A1]
                regarr = unique(regarr);
                var str,
                    col, row, dom, result;
                $.each(rowArr, function (i, v) {
                    str = formula,
                        valueJson = {};
                    for (var j = 0; j < regarr.length; j++) {
                        var index = regarr[j].replace('#', '');
                        col = itemJson['data' + index] - 1;
                        row = v;
                        dom = that.getTD(col, row);
                        valueJson['data' + index] = that.getTDValue(dom) == 0 ? '' : that.getTDValue(dom);
                        str = str.replace(new RegExp(regarr[j], "g"), valueJson['data' + index]);
                    }
                    //	   				//console.log(str.replace(/=/g,'==').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<==/g,'<=').replace(/>==/g,'>='))
                    result = reportEval(str.replace(/=/g, '==').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<==/g, '<=').replace(/>==/g, '>='));
                    //	   				//console.log(result)
                    if (!result) {
                        that.cache.errorMSG.push(warn.replace(/row/g, v - jsonRule.DeductRow + 1));
                        that.addError(dom)
                        return false;
                    }
                })
                return result;

            },
            //<Records AreaCode="13" DependColRange ="0," ColRange="1,2,3,4,5,6,7," CellSRow="5" CellERow="29" Describe ="是否可编辑"/>'+
            CanFillCells: function (jsonrecord) {
                //标识
                var bs = this.config.report.split('.');
                bs = bs[1];
                var rs = jsonrecord.CellSRow,
                    re = jsonrecord.CellERow,
                    that = this,
                    tar, value, td,
                    depdom;
                var $table = this.cache.table;
                var rowArr = MakeArr(rs, re);
                var tarcol = jsonrecord.DependColRange;
                var colArr = ArrGrep(jsonrecord.ColRange.split(','));
                $.each(rowArr, function (i, v) {
                    tar = that.getTD(tarcol, v);
                    tar.has('select').length > 0 && tar.find('select').addClass('FillCell_event' + bs).attr('FillCell_row', v);
                    tar.has('input:visible').length > 0 && tar.find('input:visible').addClass('FillCell_event' + bs).attr('FillCell_row', v);
                    value = that.getTDValue(tar);
                    $.each(colArr, function (k, j) {
                        depdom = that.getTD(j, v);
                        depdom.addClass('FillCell_row' + v);
                        if (value == "") {
                            that.setTDReadonly(depdom);
                        } else {
                            that.removeTDReadonly(depdom);
                        }
                    })
                    that.bindFillCellEvent(tar);
                })
            },
            bindFillCellEvent: function (dom) {
                //标识
                var bs = this.config.report.split('.');
                bs = bs[1];
                var row,
                    td,
                    that = this,
                    $table = this.cache.table;

                dom.find('.FillCell_event' + bs).unbind('change.FillCell_event').bind('change.FillCell_event', function (e) {
                    value = $(this).is('input') ? $(this).val() : $(this).find("option:selected").text();
                    row = $(this).attr('FillCell_row');
                    td = $table.find('td.FillCell_row' + row);
                    if (value != "") {
                        that.removeTDReadonly(td);
                    } else {
                        that.setTDReadonly(td);
                    }
                    ;
                })
            },
            //<EditedCol="0" CellSRow="5" CellERow="29" ClearCell="1" DependCol="2,3,4,5,6," oData=""
            edited: function (jsonrecord) {
                //标识
                var bs = this.config.report.split('.');
                bs = bs[1];
                var rs = jsonrecord.CellSRow,
                    re = jsonrecord.CellERow,
                    that = this,
                    tar, value,
                    depdom;
                var rowArr = MakeArr(rs, re);
                var tarcol = jsonrecord.EditedCol;
                var colArr = ArrGrep(jsonrecord.DependCol.split(','));
                $.each(rowArr, function (i, v) {
                    tar = that.getTD(tarcol, v);
                    tar.has('select').length > 0 && tar.find('select').addClass('edited_event' + bs).attr('edited_row', v);
                    tar.has('input:visible').length > 0 && tar.find('input:visible').addClass('edited_event' + bs).attr('edited_row', v);
                    $.each(colArr, function (k, j) {
                        depdom = that.getTD(j, v);
                        depdom.addClass('edited_event' + v);
                    })
                    that.bindEditedEvent(tar);
                })

            },
            bindEditedEvent: function (dom) {
                //标识
                var bs = this.config.report.split('.');
                bs = bs[1];
                var row,
                    td,
                    that = this,
                    $table = this.cache.table;

                dom.find('.edited_event' + bs).unbind('change.edited_event').bind('change.edited_event', function (e) {
                    value = $(this).find("option:selected").text();
                    if (value != "") return;
                    row = $(this).attr('edited_row');
                    td = $table.find('td.edited_event' + row);
                    that.setTDValue(td, "");
                })
            },
            /***
             * 累加计算
             *
             * **/
            solvByCal: function (record) {
                var that = this,
                    jsonXml = {};
                $.each(record, function (i, v) {
                    jsonXml = that.turnToJson(v);
                    if (jsonXml.Conditions) {
                        var express = that.getexpress(jsonXml, jsonXml.Conditions);
                        var _IFtrue = reportEval(express.replace(/=/g, '=='));
                        _IFtrue && that.startCal(jsonXml);
                    }
                })
            },
            /**
             * 设置只读属性
             *
             * ***/
            solvByReadonly: function (record) {
                var that = this,
                    jsonXml = {};
                $.each(record, function (i, v) {
                    jsonXml = that.turnToJson(v);
                    if (jsonXml.Conditions) {
                        var express = that.getexpress(jsonXml, jsonXml.Conditions);
                        var _IFtrue = reportEval(express.replace(/=/g, '=='));
                        _IFtrue && that.setReadonly(jsonXml);
                    }
                    that.setReadonly(jsonXml);
                })
            },
            /**
             * 表内运算校验
             *
             * **/
            solvByFormula: function (records) {
                var that = this,
                    jsonXml = {};
                $.each(records, function (i, v) {
                    jsonXml = that.turnToJson(v);
                    if (jsonXml.Conditions) {
                        var express = that.getexpress(jsonXml, jsonXml.Conditions);
                        var _IFtrue = reportEval(express.replace(/=/g, '=='));
                        _IFtrue && that.getFormula(jsonXml);
                    } else {
                        that.getFormula(jsonXml);
                    }
                })
            },
            /***
             * 单挑record 计算表内规则
             *
             * **/
            getFormula: function (record) {
                if (record.Formula) {
                    var express = this.getexpress(record, record.Formula);    //获取Formula 表达式
                    var dom = this.getTDArr(record);						//获取表达式中的dom节点
                    record.ReadOnly == 1 && this.setTDReadonly(dom.data1);		//设置只读
                    this.setTDValue(dom.data1[0], reportEval(express));						//赋值
                    if (record.DependCol) {
                        this.FormulaEvent(record);
                    } else {
                        this.addSelfEvent(record);
                    }
                    //config.DependCol &&
                    //config.DataType && this.setType(config.DataType,dom);	//设置数据类型
                    //this.bindEvent(exp,config);								//绑定事件 进行计算
                }
            },
            FormulaEvent: function (record) {
                var tdArr = record.DependCol.split('|'),
                    col,
                    row,
                    dom,
                    that = this,
                    tempArr = [];
                var eventIndex = this.eventIndex;
                $.each(tdArr, function (i, v) {
                    if (v) {
                        tempArr = v.split(',');
                        col = tempArr[0];
                        row = tempArr[1];
                        dom = that.getTD(col, row);
                        dom.find('input:visible').addClass('formuEvent' + eventIndex)
                    }
                })
                this.cache.table.find('td input.formuEvent' + eventIndex).bind('change.formuEvent' + eventIndex, function () {
                    var express = that.getexpress(record, record.Formula);    //获取Formula 表达式
                    express = express.replace(/=/g, '==');
                    // 					//console.log(express)
                    dom = that.getTDArr(record);						//获取表达式中的dom节点
                    that.setTDValue(dom.data1[0], reportEval(express));
                })
                eventIndex = ++this.eventIndex;
            },
            addSelfEvent: function (record) {

            },
            SaveCheckData: function (record) {
                $.merge(this.cache.checkcfg, record)
            },
            save: function () {
                debugger;
                //去掉报错样式
                this.removeError();
                //检查有否有报错  false为通过验证  则返回保存xml格式的数据
                if (this.checkHaveError() && this.solvByConstrain()) {
                    return this.getSaveXML();
                }
                var msg = this.cache.errorMSG;
                this.showAlert(msg[0], this.cache.title)
            },
            /**
             * 数据的累加
             * params json对象的《record》
             *
             * ***/
            startCal: function (config) {
                config.Rec_DependCol && this.addCalEvent(config);
                this.calCELL(config);
            },
            /***
             * 绑定事件，值改变 重新计算累加
             *
             * **/
            addCalEvent: function (cfg) {
                var arr = cfg.Rec_DependCol.split('|'),
                    dom,
                    that = this;
                var colArr = [];
                var calEventIndex = this.eventIndex;
                $.each(arr, function (i, v) {
                    if (v == "") return false;
                    colArr = v.split(',');
                    dom = that.getTD(colArr[0], colArr[1]);
                    dom.find('input:visible').addClass('calEvent' + calEventIndex);
                    //alert(dom.find('input:visible').length)
                })
                $('.calEvent' + calEventIndex).bind('change.cal' + calEventIndex, function () {
                    that.calCELL(cfg);
                })
                this.eventIndex++;

            },
            setReadonly: function (record) {
                if (record.ReadOnly != 1) return;
                var that = this,
                    value;
                var _dom = this.getTDArr(record);
                for (var i in _dom) {
                    value = _dom[i];
                    value.length > 0 && that.setTDReadonly(value);
                }

            },
            setTDReadonly: function (obj) {
                $.each(obj, function (i, v) {
                    $(v).find('input:visible').attr('readonly', 'true');
                    $(v).find('select:visible').attr('readonly', 'true');
                    (!$(v).hasClass('readonly')) && $(v).addClass('readonly');
                })
            },
            removeTDReadonly: function (obj) {
                $.each(obj, function (i, v) {
                    $(v).find('input:visible').removeAttr('readonly');
                    ($(v).hasClass('readonly')) && $(v).removeClass('readonly');
                })
            },
            /***
             * {tar:_dom,deptar:depDom}
             * ***/
            calCELL: function (_jsonRecord) {
                var cell = this.getTDArr(_jsonRecord);
                var headValue = this.getValByHD(_jsonRecord.HeadName);
                var depTD,
                    $tar,
                    index = _jsonRecord.NodeSIndex,
                    value,
                    that = this;
                if (_jsonRecord.DependCol > -1) {
                    if (_jsonRecord.NodeSIndex < 0) {
                        depTD = cell.data2;
                        value = this.getTDValue(depTD[0]) + parseFloat(headValue);
                        $tar = cell.data1;
                        this.setTDValue($tar[0], value);
                    } else {
                        $.each(cell.data1, function (i, v) {
                            depTD = cell.data2;
                            $tar = v;
                            var $HDLocal = that.get_Local_by_HD(_jsonRecord.HeadName);
                            value = that.getTDValue(depTD[i]) + parseFloat($HDLocal.eq(index + i).find('VALUE').text());
                            ////console.log(value)
                            that.setTDValue(v, value);
                        })
                    }
                } else {
                    $tar = cell.data1;
                    value = headValue;
                    this.setTDValue($tar[0], value);
                }
            },
            ////////////////////////////////////
            checkHaveError: function () {
                var cfg = this.cache.checkcfg;
                var IFright = true,
                    json_record,
                    that = this;
                $.each(cfg, function (i, v) {
                    json_record = that.turnToJson(v);
                    IFright = that.checkData(json_record);
                    if (!IFright) return false;
                });
                return IFright;
            },
            checkData: function (record) {
                if (record.Formula) {
                    var formula = this.getexpress(record, record.Formula);
                    var _express = formula.replace(/=/g, '==').replace(/<==/g, '<=').replace(/>==/g, '>=').replace(/<>/g, '!=');
                    //        			//console.log(_express)
                    var IFerror = reportEval(_express);
                    var checkresult = record.Range == 'false' ? false : true;
                    if (IFerror == checkresult) {
                        //获取record中所有涉及的dom元素 进行报错显示
                        var dom = this.getAllDOM(record, record.Formula);
                        this.addError(dom);
                        var new_msg = this.getexpress(record, record.Emsg);
                        //        				console.log(new_msg)
                        this.cache.errorMSG.push(new_msg);
                    }
                    return !(IFerror == checkresult);
                }
            },
            getAllDOM: function (obj, param) {
                var regexp = /[A-Z]\d{1,2}/g;
                var regarr = param.match(regexp),  //['A1','A2']   obj[A1]
                    objArr = [],
                    dom,
                    colArr = [];
                for (var i = 0; i < regarr.length; i++) {
                    var arr_value = regarr[i];       //A1
                    if (!obj[arr_value]) {
                        dom = this.getTD(arr_value);
                    } else if (obj[arr_value].indexOf(',') > 0) {
                        colArr = obj[arr_value].split(',');
                        dom = this.getTD(colArr[0], colArr[1]);
                    }
                    objArr.push(dom)
                }
                return objArr;
            },
            removeError: function () {
                //TODO
                this.cache.errorMSG = [];
                $('table .report_error').removeClass('report_error');
            },
            addError: function (objArr) {
                $.each(objArr, function (i, v) {
                    (!$(v).hasClass('report_error')) && $(v).addClass('report_error');
                })
            },
            getSaveXML: function () {
                //debugger;
                //配置xml中保存的dom
                var saveArr = this.cache.saveArr;
                //获取保存格式的xml配置
                if (!this.$saveXml) {
                    this.$saveXml = loadXML(this.cache.saveXML);
                }
                var result;
                var that = this;
                $.each(saveArr, function (i, v) {
                    result = that.pushData(v);     //向xml中添加数据
                    if (!result) {
                        that.cache.errorMSG.push('输入格式错误，请输入数字！')
                        return false;
                    }
                });
                return this.$saveXml
            },
            /***
             *将数据添加到配置xml中
             * params  <Records HeadName="SB_BZSSRJMMXB.SB_BZSSRJMMXB_MXXX." NodeRange="1," CellColRange="1," CellSRow="4" CellERow="37" XmlSRow="0" XmlERow="33" />'+
             * **/
            pushData: function (Records) {
                var that = this,
                    jsonXml = that.turnToJson(Records),   //转换成json格式
                    name = jsonXml.NodeName || jsonXml.HeadName,
                    loaction = this.get_XML_Loction_By_saveXML(name);
                var tdLocal = this.getTDArr(jsonXml);
                var type = jsonXml.DataType || 'DT_String';
                //head
                if (jsonXml.Col && jsonXml.Row) {
                    var dom = this.getTD(jsonXml.Col, jsonXml.Row);
                    var val = this.getTDValue(dom);

                    if (!that.checkDataType(dom, type)) {
                        return false
                    }
                    if (val == '') {
                        $(loaction).text('');
                    } else {
                        $(loaction).text(val || 0);
                    }

                    return true;
                }
                var start = parseInt(jsonXml.XmlSRow),
                    end = parseInt(jsonXml.XmlERow),
                    data,
                    index = 0,
                    tdDom;
                if (end < 0) {
                    end = loaction.length - 1;
                }
                var nodeRange = ArrGrep(jsonXml.NodeRange.split(','));
                if (jsonXml.NodeRange.indexOf('..') > 0) {
                    var temparr = ArrGrep(jsonXml.NodeRange.split('..'));
                    nodeRange = MakeArr(temparr[0], temparr[1]);
                }
                var resu = true;
                if (loaction.length > 1) {
                    for (var i = start; i < end + 1; i++) {
                        $.each(nodeRange, function (k, v) {
                            tdDom = tdLocal['data' + (k + 1)][index];
                            resu = that.checkDataType(tdDom, type);
                            if (!resu) {
                                resu = false;
                                return false;
                            }
                            data = that.getTDValue(tdDom);
                            $(loaction).eq(i).children().eq(v).text(data);
                        })
                        index = index + 1;
                        if (!resu) {
                            break;
                        }
                    }
                    return resu;
                } else {
                    $.each(nodeRange, function (k, v) {
                        tdDom = tdLocal['data' + (k + 1)][index];
                        resu = that.checkDataType(tdDom, type);
                        if (!resu) {
                            resu = false;
                            return false;
                        }
                        data = that.getTDValue(tdDom);

                        $(loaction).eq(0).children().eq(v).text(data);
                    })
                    index = index + 1;
                    return resu;
                }

            },
            checkDataType: function (dom, type) {
                var value = this.getTDValue(dom);
                if (type == 'DT_Num' && dom.find('input').length > 0) {
                    dom.hasClass('report_error') && this.removeError(dom);
                    if (dom.hasClass('readonly')) {
                        return true;
                    }
                    if (isNaN(value)) {
                        this.addError(dom);
                        return false;
                    }
                    this.fixTo(dom);
                }
                return true;
            },
            fixTo: function (dom) {
                var value = this.getTDValue(dom);
                value = parseFloat(value).toFixed(2);
                this.setTDValue(dom, value);
            },
            getTDValue: function (dom) {
                var $dom = dom;
                var value = 0;
                if ($dom.find('input').length > 0) {
                    value = $dom.find('input').val();
                    if ($dom.find('input').attr('servyou_type') == 'empty') {
                        return '';
                    }
                } else if ($dom.find('select').length > 0) {
                    value = $dom.find('select').find("option:selected").text();
                    ////console.log(value);
                } else {
                    value = $dom.html();
                }
                //	//console.log(value)
                return value || '0.00';
            },
            setTDValue: function (obj, _val) {
                var val;
                var regCN = /[\u4E00-\u9FA5\uF900-\uFA2D]/; //匹配中文
                if (_val !== '') {
                    if (regCN.test(_val) || _val.toString().indexOf('%') > -1) {
                        val = _val;
                    }
                    else {
                        val = Number(_val).toFixed(2);
                    }

                } else if (_val === '') {
                    val = '';
                } else {
                    val = '0.00';
                }

                if (obj.find('select').length > 0) {
                    obj.find('select').html('<option>' + val + '</option>').val(val).attr('title', val);
                } else if (obj.find('input').length > 0) {
                    var newVal = val;
                    var servyou_type = obj.find('input').attr('servyou_type');
                    if (!!servyou_type) {
                        if (servyou_type == 'empty') {
                            newVal = '';
                        }
                    }

                    obj.find('input').attr('value', newVal);

                } else {
                    obj.html(val);
                }
            },
            /*****
             * 获取xml中的dom位置 返回数组
             * params  {NodeName: "SB_BZSSRJMMXB.SB_BZSSRJMMXB_BTXX.SB_BZSSRJMMXB_QSRQ.", Col: "2", Row: "2", HeadStr: "", DataType: "税款所属时期 月报"}
             * result   []
             * **/
            get_XML_Loction_By_saveXML: function (str) {
                var nameArr = ArrGrep(str.split('.'));
                var result = this.$saveXml;
                if (arguments.length == 2) {
                    result = arguments[1];
                }
                $.each(nameArr, function (i, v) {
                    //解决【0】的情况
                    if (v.indexOf(']') > 0) {
                        var num = parseInt(v.replace('[', '').replace(']', ''));
                        result = $(result).children().eq(num);
                    } else {
                        result = $(result).find(v);
                    }
                })
                if ($(result).children().length == 0) return $(result);
                return $(result).children();
            },
            /***
             * xml--->json
             * parmas   <Records NodeName="SB_BZSSRJMMXB.SB_BZSSRJMMXB_BTXX.SB_BZSSRJMMXB_QSRQ." Col="2" Row="2" HeadStr="" DataType="税款所属时期 月报"/>
             * result   {NodeName: "SB_BZSSRJMMXB.SB_BZSSRJMMXB_BTXX.SB_BZSSRJMMXB_QSRQ.", Col: "2", Row: "2", HeadStr: "", DataType: "税款所属时期 月报"}
             *
             * **/
            turnToJson: function (record) {
                if (typeof record != 'object') return {};
                var _recordAttr = record.attributes;
                var jsonResult = {};
                //xml --> json
                $.each(_recordAttr, function (i, v) {
                    var name = v.nodeName;
                    var value = v.nodeValue;
                    jsonResult[name] = value;
                })
                return jsonResult;
            },
            /****
             * 获取td节点
             * params <Records HeadName="SB_BZSSRJMMXB.SB_BZSSRJMMXB_MXXX." NodeRange="1," CellColRange="1," CellSRow="4" CellERow="37" XmlSRow="0" XmlERow="33" />'+
             * result []
             * ***/
            getTDArr: function (cfg) {
                var $table = this.cache.table;
                var $tr = $table.find('tbody tr');
                var result = { data1: [], data2: [] },
                    that = this;
                if (typeof cfg == 'object') {
                    if (cfg.Row) {
                        var dom = this.getTD(cfg.Col, cfg.Row);
                        result.data1.push(dom)
                    } else {
                        var colArr = [],
                            tempArr = [],
                            index = 0;
                        cfg.Col && colArr.push(cfg.Col);
                        if (cfg.CellColRange) {
                            var temp;
                            if (cfg.CellColRange.indexOf('..') > 0) {
                                temp = cfg.CellColRange.split('..');//MakeArr
                                $.merge(colArr, MakeArr(temp[0], temp[1]));
                            } else {
                                $.merge(colArr, ArrGrep(cfg.CellColRange.split(',')));
                            }

                        }
                        //TODO
                        //cfg.DependCol  && colArr.push(cfg.DependCol);
                        var rowStart = parseInt(cfg.CellSRow);
                        var rowEnd = parseInt(cfg.CellERow);
                        var col, dom, row;
                        for (var i = rowStart; i < rowEnd + 1; i++) {
                            $.each(colArr, function (k, v) {
                                col = v;
                                row = i;
                                dom = that.getTD(col, row);
                                if (!result['data' + (k + 1)])
                                    result['data' + (k + 1)] = [];
                                result['data' + (k + 1)].push(dom)

                            })
                        }
                    }
                }
                return result;
            },
            /***
             * 获取td元素
             * params  col row
             * result  dom
             * ***/
            getTD: function (col, row) {
                ////console.log(col+'----'+row)
                var $table = this.cache.table;
                var $tr = $table.find('tbody tr');
                var rowOffset = $table.attr('rowoffset') || 0,
                    _col,
                    _row;
                var colOffset = $table.attr('coloffset') || 0;   //TODO

                if (arguments.length == 2) {
                    _col = parseInt(col),
                        _row = parseInt(row);
                } else {
                    var fnum = arguments[0];
                    var _char = fnum.match(/[A-Z]/g).join('');
                    _row = fnum.replace(_char, '');
                    _col = _char.charCodeAt() - 65;
                    // //console.log(_col)
                }
                _row = _row - rowOffset;
                var tdoffset = $tr.eq(_row).attr('coloffset');
                _col = _col - (tdoffset || colOffset);
                return $tr.eq(_row).find('td').eq(_col);
            },
            /**
             * 获取表达式
             * params   json对象  表达式
             * result   string表达式
             * **/
            getexpress: function (_param, exp) {
                var param = _param;			   //{'A1':'wsxx.[hgfsx]'}
                var regexp = /[A-Z]\d{1,2}/g;
                var regarr = exp.match(regexp),  //['A1','A2']   obj[A1]
                    str = exp,
                    objArr = [];
                if (!$.isArray(regarr)) {
                    return exp;
                }
                for (var i = 0; i < regarr.length; i++) {
                    var arr_value = regarr[regarr.length - 1 - i];       //A1
                    var value;
                    if (param[arr_value] && param[arr_value].indexOf('.') > 0) {
                        value = this.getValByHD(param[arr_value]);
                    } else {
                        var _params = param[arr_value] ? param[arr_value] : arr_value;
                        value = this.getValBytable(_params);  //处理   F2	3,5
                    }
                    str = str.replace(new RegExp(arr_value, "g"), value);
                }
                str = str.replace(/or/g, '||').replace(/and/g, '&&').replace(new RegExp('IF', "g"), 'getIF').replace(new RegExp('if', "g"), 'getIF').replace(/round/g, 'Round').replace(/ROUND/g, 'Round');
                return str;
            },
            /**
             * 通过核定文件取数据
             * params  路径
             * result value
             *
             * ***/
            getValByHD: function (str) {
                var xml = loadXML(this.cache.hedingXML),
                    arr,
                    result = 0;
                if (str.indexOf('.') > 0 && str.indexOf('|') > 0) {
                    result = this.getValByFB(str);
                    return result;
                }
                if (str.indexOf('.') > 0 && str.indexOf('[') > 0) {
                    arr = str.split('.');
                    //处理lsxxs.[28]类型
                    var hdindex = arr[1].replace('[', '').replace(']', '');
                    if (!isNaN(hdindex)) {
                        hdindex = parseInt(hdindex);
                        result = $(xml).find(arr[0]).children().eq(hdindex).find('VALUE').text();
                        return result;
                    }
                    //处理lsxxs.[wsxx]类型
                    var code = $(xml).find(arr[0]).find('CODE');
                    //	//console.log($(xml).children().children().find('WSXXS').length)
                    $.each(code, function (i, v) {
                        var val = $(v).text();
                        if (val == arr[1].replace('[', '').replace(']', '')) {
                            result = $(v).nextAll('VALUE').text();
                            return false;
                        }
                    })
                }
                return result || 0;
            },
            /***
             * 返回核定文件中的节点
             * params  'wsxx.'
             * result  dom
             * ***/
            get_Local_by_HD: function (str) {
                var cfgArr = ArrGrep(str.split('.'));
                var xml = loadXML(this.cache.hedingXML);
                return $(xml).find(cfgArr[0]).children();
            },
            getValBytable: function (str) {
                var $tdDom
                if (str.indexOf(',') > 0) {
                    var strArr = str.split(',');
                    $tdDom = this.getTD(strArr[0], strArr[1]);
                } else {
                    $tdDom = this.getTD(str);
                }
                return this.getTDValue($tdDom)
            },
            /**
             * 002.xml|SB_QYSDSHZNSFZJGSDSFPB.SB_QYSDSHZNSFZJGSDSFPB_ZJG.[0].SB_QYSDSHZNSFZJGSDSFPB_ZJGFTSDSE.
             * **/
            getValByFB: function (cfg) {
                var fbData = this.FB;
                var configArr = cfg.split('|');
                var fileKey = (configArr[0].split('.'))[0];
                if (!fbData[fileKey]) {
                    //  this.showAlert('附表'+fileKey+'数据未找到！')
                    return 0;
                }
                var fileXml = typeof fbData[fileKey] == 'object' ? fbData[fileKey] : loadXML(fbData[fileKey]),
                    nameArr = ArrGrep(configArr[1].split('.'));
                $.each(nameArr, function (i, v) {
                    //解决【0】的情况
                    if (v.indexOf(']') > 0) {
                        var num = parseInt(v.replace('[', '').replace(']', ''));
                        fileXml = $(fileXml).children().eq(num);
                    } else {
                        fileXml = $(fileXml).find(v);
                    }
                })
                var re;
                try {
                    re = $(fileXml).text();
                } catch (e) {
                    re = fileXml[0].text || 0;
                }
                return re || 0;

            },
            showAlert: function (msg) {
                msg && reportSB.showAlert(msg, this.cache.title);
            },
            preview: function (tar, xml, _cfg) {
                var $xml = typeof xml == 'object' ? xml : loadXML(xml);
                var that = this;
                var cfgxml = loadXML(_cfg);
                this.cache.table = $(tar);
                $(tar).find('tbody tr td input:visible').addClass('readonly').attr('readonly', 'true');
                var $body = $(cfgxml).children().find('Body').children();
                ////console.log($body[0].outerHTML)
                $.each($body, function (i, v) {
                    var jsonXml = that.turnToJson(v),   //转换成json格式
                        name = jsonXml.NodeName || jsonXml.HeadName,
                        loaction = that.get_XML_Loction_By_saveXML(name, $xml);
                    var tdLocal = that.getTDArr(jsonXml);
                    var start = parseInt(jsonXml.XmlSRow),
                        end = parseInt(jsonXml.XmlERow),
                        data,
                        index = 0,
                        tdDom;
                    if (end < 0) {
                        end = loaction.length - 1;
                    }
                    if (jsonXml.Col && jsonXml.Row) {
                        var dom = that.getTD(jsonXml.Col, jsonXml.Row);
                        var val = $(loaction).text();
                        that.setTDValue(dom, val);
                        return true;
                    }
                    var nodeRange = jsonXml.NodeRange ? ArrGrep(jsonXml.NodeRange.split(',')) : [0];
                    if (jsonXml.NodeRange.indexOf('..') > 0) {
                        var temparr = ArrGrep(jsonXml.NodeRange.split('..'));
                        nodeRange = MakeArr(temparr[0], temparr[1]);
                    }
                    if (loaction.length > 1) {
                        for (var i = start; i < end + 1; i++) {
                            $.each(nodeRange, function (k, v) {
                                tdDom = tdLocal['data' + (k + 1)][index];
                                var newData = $(loaction).eq(i).children().eq(v).text();
                                that.setTDValue(tdDom, newData);
                                that.setTDReadonly(tdDom)
                            })
                            index = index + 1;
                        }
                    } else {
                        $.each(nodeRange, function (k, v) {
                            tdDom = tdLocal['data' + (k + 1)][index];
                            var value = $(loaction).eq(0).children().eq(v).text();
                            that.setTDValue(tdDom, value);
                            that.setTDReadonly(tdDom)
                        })
                    }
                })
            },
            onlysave: function () {
                //debugger;
                this.cache.errorMSG = [];
                var result = this.getSaveXML();
                var msg = this.cache.errorMSG;
                this.showAlert(msg[0], this.cache.title);
                return result;
            },
            saveDataByother: function () {

            },
            loadFB: function (fbjson) {
                this.FB = fbjson;
            },
            setTitle: function (name) {
                this.cache.title = name || '';
            },
            setSaveXML: function (xml) {
                this.$saveXml = xml;
                //   //console.log(this.$saveXml)
            }

        };
        $obj = new obj();
        return $obj;
    }

    /*
    * 修改错误提示弹出框
    * */
    var alertHtml = '<div class="sb_alert_mask" id="sb_alert_mask">' +
                        '<div class="sb_alert" id="sb_alert">' +
                            '<div class="sb_alert_title" id="sb_alert_title">提醒 <b></b></div>' +
                            '<div class="sb_alert_content" id="sb_alert_content"></div>' +
                            '<div class="sb_alert_footer" id="sb_alert_footer"><span>确认</span></div>' +
                        '</div>' +
                    '</div>';
    $('body').append(alertHtml);
    var selectObj = document.getElementById('sb_alert_title');
    var dragObj = document.getElementById('sb_alert');

    dragObj.style.left = document.body.clientWidth * 30 / 100 + "px";
    dragObj.style.top = document.body.clientHeight * 40 / 100 + "px";

    var mouseX, mouseY, objX, objY;
    var dragging = false;

    selectObj.onmousedown = function (event) {
        event = event || window.event;
        dragging = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        objX = parseInt(dragObj.style.left);
        objY = parseInt(dragObj.style.top);
    };
    document.onmousemove = function (event) {
        event = event || window.event;
        if (dragging) {
            dragObj.style.left = parseInt(event.clientX - mouseX + objX) + "px";
            dragObj.style.top = parseInt(event.clientY - mouseY + objY) + "px";
        }
    };
    document.onmouseup = function () {
        dragging = false;
    };
    //------------------------------------------------------------------------------------------------------------------
    return {
        //加载配置文件
        loadConfig: function () {
            if (arguments.length == 0 || typeof arguments[0] != 'string') return;
            cfgXml = arguments[0];
        },
        //加载核定文件
        loadHD: function () {
            if (arguments.length == 0 || typeof arguments[0] != 'string') return;
            HD = arguments[0];
        },
        //加载保存数据格式文件
        loadSaveXML: function () {
            if (arguments.length == 0 || typeof arguments[0] != 'string') return;
            saveXML = arguments[0];
        },
        //入口
        init: function () {
            var _obj = creatOBJ();
            _obj.init();
            return _obj;
        },
        //申报保存
        save: function () {
            //debugger;
            var dom = getOBJ();
            return dom.save();
        },
        //设置报文table
        setTable: function () {
            if (arguments.length == 0 || typeof arguments[0] != 'string') return;
            table = arguments[0];
        },
        loadFB: function (_json) {
            fb_data = _json;
        },
        preview: function () {
            setTable_preview.apply(this, arguments);
        },
        loadXML: function (xml) {
            return loadXML(xml);
        },
        showAlert: function (msg, _title, callback) {
            var $title = _title || '提示';
            var arr = msg.split('】');
            var save = [];
            var temp, value;
            var result = msg;
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g"); //匹配中文
            $.each(arr, function (i, v) {
                temp = v.match(/【.*/g);
                if (!reg.test(temp)) { // 不含中文
                    save.push(temp);
                }
            });
            $.each(save, function (i, v) {
                if (!v) return false;
                temp = v[0].replace('【', '');
                try {
                    value = reportEval(temp);
                }
                catch (e) {
                    value = temp;
                    //console.log(e);
                }
                if (isNaN(temp)) {
                    result = result.replace(temp, '<span class="redtext">' + value.toFixed(2) + '</span>');
                } else {
                    result = result.replace(temp, '<span class="redtext">' + temp + '</span>');
                }
                //result = result.replace(temp, value.toFixed(2));
            });
            // result = result.replace(/【/g,'<span class="redtext">').replace(/】/g,'</span>');
            $('#sb_alert_content').html(result);
            $('#sb_alert_title b').html($title);
            $('#sb_alert_mask').show();
            $('#sb_alert_footer').bind('click', function () {
                $('#sb_alert_mask').hide();
                if ($.isFunction(callback)) {
                    callback();
                }
            });
        }

    }
})();