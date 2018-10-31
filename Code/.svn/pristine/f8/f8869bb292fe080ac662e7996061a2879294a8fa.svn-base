/**
 * Created by chenjunj on 2017/3/17 13:27.
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.servyouReport = factory();
    }
}(this, function () {
    /**
     * 公共数据
     * */
    var commonData = {
        wsxxMap: {},//文书信息{key,value}映射表
        lsxxMap: {},//历史信息{key,value}映射表
        /**
         * 将所有wsxx和lsxx节点，整理成map形式{key: value}
         * */
        _setWsxxAndLsxxMap: function (hd) {
            var that = this;
            if(hd.wsxxs && hd.wsxxs.wsxx){
                $.each(hd.wsxxs.wsxx, function () {
                    that.wsxxMap[this.code] = this.value;
                });
            }
            if(hd.lsxxs && hd.lsxxs.lsxx){
                $.each(hd.lsxxs.lsxx, function () {
                    that.lsxxMap[this.code] = this.value;
                });
            }
        }
    };
    /**
     * 侧边栏（填表说明）各地区都需要
     * */
    var sideBar = {
        url:'',
        showReportTip: true,
        init: function (url,showReportTip) {
            this.url = url;
            this.showReportTip = showReportTip;
            this.showSideBar();
            this.bindEvent();
        },
        showSideBar: function () {
            var html = '<div class="sideBar" id="sideBar">';
            if(this.showReportTip){
                html += '<div class="sideBar-tip" id="sideBar-tip"></div>';
            }
            html += '</div>';
            $('body').append(html);
        },
        bindEvent: function () {
            var _this = this;
            $('body').on('click','#sideBar-tip', function () {
                mini.open({
                    cls:'fixedWindowTop0',
                    url: _this.url,        //页面地址
                    title: '填表说明',      //标题
                    width: 1220,      //宽度
                    height: 600,     //高度
                    allowResize: false,       //允许尺寸调节
                    allowDrag: false,         //允许拖拽位置
                    showCloseButton: true,   //显示关闭按钮
                    showMaxButton: true,     //显示最大化按钮
                    showModal: true,         //显示遮罩
                    effect:'fast'              //打开和关闭时的特果:'none','slow','fast',默认'none'
                });
            });
        }
    };
    /**
     * 表Table
     * */
    var Table = function () {
        var table = {
            _hd: null,
            _sb_id: '',
            _saveXml: '',
            _cfgXml: '',
            _formulas: null,
            _$curTable: null,
            _formulaMap: {},//key为联动元素,value为公式数组
            _ifNeedSort: false,//公式是否需要排序
            _cache: {},
            /**
             * 初始化
             * @param {string} sb_id
             * */
            _init: function (sb_id, hd, localFormulas) {
                this._sb_id = sb_id;
                this._hd = hd;
                this._$curTable = $('table[sb_id="'+this._sb_id+'"]');
                var sb_url = this._$curTable.attr('sb_url')+'/';
                this._cfgXml = xmlUtil.loadFileByPath(sb_url + this._sb_id + '_cfg.xml','xml');
                this._analyseCfg();
                if(localFormulas){
                    this._formulas = localFormulas;
                    this._setFormulaMap();
                }
                this._bindFormulaEvent();
            },
            /**
             * 设置公式
             * */
            _setFormulas: function(formulas){
                this._formulas = formulas;
                this._setFormulaMap();
            },
            /**
             * 添加公式
             * @param {Array} formulaList
             * */
            _addFormulas: function (formulaList) {
                this._formulas = this._formulas.concat(formulaList);
                this._formulas = _unique(this._formulas);//去重
                this._setFormulaMap();
            },
            /**
             * 删除公式
             * @param {Array} formulaList
             * */
            _deleteFormulas: function (formulaList) {
                var that = this;
                $.each(formulaList, function (i, formula) {
                    var index = that._formulas.indexOf(formula);
                    if(index !== -1){
                        that._formulas.splice(index,1);
                    }
                });
                this._setFormulaMap();
            },
            /**
             * 获取关联公式
             * */
            _getExpData: function(key){
                var that = this;
                var expArr = this._formulaMap[key];
                if(!expArr){
                    return [];
                }
                var expData = expArr.concat();
                $.each(expArr, function(){
                    tag = this.split('=')[0];
                    tag = $.trim(tag).replace("\"", "");
                    if(tag != key){
                        expData = expData.concat(that._getExpData(tag));
                    }
                });
                return expData;
            },
            /**
             * 整理formulaMap，找到直接使用某个单元格（如：A1）的公式
             * */
            _setFormulaMap: function(){
                this._formulaMap = {};
                var that = this;
                $.each(this._formulas, function(i,formula){
                    var temp = formula.split('=');
                    temp.shift();
                    temp = temp.join('==');
                    temp = temp.toLocaleUpperCase();
                    temp = temp.replace(/SUM3D/g,'SUM');
                    var records = _getExpArr(temp);
                    $.each(records, function(j,record){
                        if(!that._formulaMap[record]){
                            that._formulaMap[record] = [];
                        }
                        that._formulaMap[record].push(formula);
                    });
                });
                this._ifNeedSort = true;
            },
            /**
             * 绑定公式触发事件
             * */
            _bindFormulaEvent: function () {
                var $curTable = this._$curTable;
                var that = this;
                /**
                 * 绑定focus和blur事件委托
                 * */
                $curTable.on('focus','input:not([class*=mini],[type="checkbox"],[type="radio"]),select',function(){
                    if($(this).is('input')){
                        if($(this).val() !== ''){
                            var curVal = _getValueByType($(this));
                            if($(this).is('input')){
                                $(this).val(curVal);
                            }
                        }
                        var _this = this;
                        setTimeout(function () {
                            $(_this).select();
                        },1);
                        // $(this).select();//所有单元格focus都选中文本
                    }
                }).on('blur', 'input:not([class*=mini],[type="checkbox"],[type="radio"]),select', function () {
                    //校验当前单元格数据
                    if(!_validValue($(this))){
                        return ;
                    }
                    _setValueByType($(this));//格式化数据
                    var $trs = $curTable.find("tr");
                    var _row = $trs.index($(this).parents("tr:first"));
                    var _col = $(this).parents("td:first").index();
                    var curExp = numberToLetters(_col) + (_row + 1);
                    var expData = that._getExpData(curExp);//获取与本单元格相关公式
                    expData = _unique(expData);//去重
                    expData = _sortFormula(expData);
                    _runExp(expData, $trs);//执行计算
                }).on('dragstart', function () {//屏蔽input文字选中拖动的效果
                    return false;
                });
            },
            /**
             * 添加行
             * */
            _addRows: function (index,rowCount,html) {
                var formulaClone = [];//克隆行的公式，其实是（index-1行的公式）
                var that = this;
                var cellReg = /[A-Z]+\d+/g;//匹配单元格
                var cellIndexReg = /\d+/g;//匹配单元格下标
                if(typeof rowCount === 'number' && typeof index === 'number' && rowCount > 0 && index > 0){
                    for(var i=0,l=this._formulas.length;i<l;i++){
                        var cells = this._formulas[i].match(cellReg);
                        var leftCellIndex = parseInt(cells[0].match(cellIndexReg)[0]);
                        //找到所有下标大于index的单元格，下标都加rowCount
                        $.each(cells, function (j, cell) {
                            var cellLetter = cell.match(/[A-Z]+/g)[0];
                            var cellIndex = parseInt(cell.match(/\d+/g)[0]);
                            if(cellIndex>index){
                                cellIndex += rowCount;
                                var newCell = cellLetter + cellIndex;
                                that._formulas[i] = that._formulas[i].replace(new RegExp(cell+'(?!\\d)','g'),newCell);
                            }
                        });
                        //找到求和公式如SUM(B11:B24)中“:”后的下标等于index的单元格如B24
                        var strArr = this._formulas[i].match(/:[\s]*[A-Z]+\d+/g);
                        if(strArr && strArr.length>0){
                            $.each(strArr, function (j,str) {
                                var cellIndex = parseInt(str.match(cellIndexReg)[0]);
                                if(cellIndex ===  index){
                                    cellIndex += rowCount;
                                    var newStr = str.replace(cellIndexReg,cellIndex.toString());
                                    that._formulas[i] = that._formulas[i].replace(new RegExp(str,'g'),newStr);
                                }
                            })
                        }
                        //克隆行的公式
                        if(leftCellIndex === index){
                            formulaClone.push(this._formulas[i]);
                        }
                    }
                    //添加新增行的公式
                    $.each(formulaClone, function (i,formula) {
                        var cells = formula.match(/[A-Z]+\d+/g);
                        var leftCellIndex = parseInt(cells[0].match(/\d+/g)[0]);
                        if(leftCellIndex === index){
                            for(var j=1;j<=rowCount;j++){
                                var newFormula = formula;
                                $.each(cells, function (k, cell) {
                                    var cellLetter = cell.substring(0,1);
                                    var cellIndex = parseInt(cell.substring(1));
                                    if(cellIndex === index){
                                        cellIndex += j;
                                        var newCell = cellLetter + cellIndex;
                                        newFormula = newFormula.replace(new RegExp(cell+'(?!\\d)','g'),newCell);
                                    }
                                });
                                that._formulas.push(newFormula);
                            }
                        }
                    });
                    //添加行到页面
                    $('table[sb_id="'+this._sb_id+'"] tr:eq('+index+')').before(html);
                    mini.parse();
                    //重新设置map表
                    this._setFormulaMap();
                }
            },
            /**
             * 删除一行,目前还不能用内部代码直接copy自_addRows
             * */
            _deleteRow: function (index) {
                var formulaClone = [];//克隆行的公式，其实是（index-1行的公式）
                var that = this;
                if(typeof index === 'number' && index >= 0) {
                    for (var i = 0, l = this._formulas.length; i < l; i++) {
                        var cells = this._formulas[i].match(/[A-Z]+\d+/g);
                        var leftCellIndex = parseInt(cells[0].match(/\d+/g)[0]);
                        //找到所有下标大于index的单元格，下标都加rowCount
                        $.each(cells, function (j, cell) {
                            var cellLetter = cell.substring(0, 1);
                            var cellIndex = parseInt(cell.substring(1));
                            if (cellIndex > index+1) {
                                cellIndex += rowCount;
                                var newCell = cellLetter + cellIndex;
                                that._formulas[i] = that._formulas[i].replace(new RegExp(cell+'(?!\\d)', 'g'), newCell);
                            }
                        });
                        //找到求和公式如SUM(B11:B24)中“:”后的下标等于index的单元格如B24
                        var strArr = this._formulas[i].match(/:[\s]*[A-Z]+\d+/g);
                        if (strArr && strArr.length > 0) {
                            $.each(strArr, function (j, str) {
                                var cellIndex = parseInt(str.match(/\d+/g)[0]);
                                if (cellIndex === index) {
                                    cellIndex += rowCount;
                                    var newStr = str.replace(/\d+/g, cellIndex.toString());
                                    that._formulas[i] = that._formulas[i].replace(new RegExp(str, 'g'), newStr);
                                }
                            })
                        }
                        //克隆行的公式
                        if (leftCellIndex === index) {
                            formulaClone.push(this._formulas[i]);
                        }
                    }
                    //添加新增行的公式
                    $.each(formulaClone, function (i, formula) {
                        var cells = formula.match(/[A-Z]+\d+/g);
                        var leftCellIndex = parseInt(cells[0].match(/\d+/g)[0]);
                        if (leftCellIndex === index) {
                            for (var j = 1; j <= rowCount; j++) {
                                var newFormula = formula;
                                $.each(cells, function (k, cell) {
                                    var cellLetter = cell.substring(0, 1);
                                    var cellIndex = parseInt(cell.substring(1));
                                    if (cellIndex === index) {
                                        cellIndex += j;
                                        var newCell = cellLetter + cellIndex;
                                        newFormula = newFormula.replace(new RegExp(cell+'(?!\\d)', 'g'), newCell);
                                    }
                                });
                                that._formulas.push(newFormula);
                            }
                        }
                    });
                    //再移除行
                    this._$curTable.find('tr:eq(' + index + ')').remove();
                    //重新设置map表
                    this._setFormulaMap();
                }
            },
            /**
             * 解析cfg
             * */
            _analyseCfg: function () {
                this._cache['SaveCheckData'] = $(this._cfgXml).find('SaveCheckData Records,SendCheckData Records');
                this._cache['DoShowMessages'] = $(this._cfgXml).find('DoShowMessage Records');
                this._cache['MustFill'] = $(this._cfgXml).find('MustFill Records');
            },
            /**
             * 校验cfg
             * */
            _checkCfg: function () {
                return this._checkSaveCheckData() && this._checkMustFill();
            },
            /**
             * 校验 SaveCheckData，SendCheckData
             * */
            _checkSaveCheckData: function(){
                var Records = this._cache['SaveCheckData'];
                if(Records.length === 0){
                    return true;
                }
                var ifRight = true;
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    ifRight = _checkSaveRecord(json_record);
                    if(!ifRight){
                        return false;
                    }
                });
                return ifRight;
            },
            /**
             * 校验必填
             * */
            _checkMustFill: function () {
                var Records = this._cache['MustFill'];
                if(Records.length === 0){
                    return true;
                }
                var ifRight = true;
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    ifRight = _checkMustFillRecord(json_record);
                    if(!ifRight) return false;
                });
                return ifRight;
            },
            _checkDoShowMessage: function () {
                var Records = this._cache['DoShowMessages'];
                if(Records.length === 0){
                    return [];
                }
                var errorMsgs = [];
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    var msg = _checkMessageRecord(json_record);
                    if(msg){
                        errorMsgs.push(msg);
                    }
                });
                return errorMsgs;
            },
            /**
             * 计算全部
             * */
            _calculateAll: function () {
                this._formulas = _sortFormula(this._formulas);
                table._ifNeedSort = false;
                var $trs = this._$curTable.find('tr');
                _runExp(this._formulas, $trs);
            },
            /**
             * 格式化所有input的数据
             * */
            _formatAllInputValue: function () {
                this._$curTable.find('td>input').each(function () {
                    _setValueByType($(this));
                });
            }

        };
        /**
         * 校验输入数据
         * */
        var _validValue = function ($target) {
            if(!$target.is('input')){
                return true;
            }
            $target.parent().removeClass('report_error');
            var result = true;
            var text = $target.val().trim();
            var val = Number(text);
            var attrMaxValue = $target.attr('maxValue');
            var attrMinValue = $target.attr('minValue');
            var type = $target.attr('servyou_type');
            var errorMsg = '';
            var formatErrorMsg = $target.attr('formatErrorMsg');
            if(type && type === 'nonnegative'){
                if(!isNaN(val) && val < 0){
                    $target.val(0).blur();
                    errorMsg = '请输入不小于0的数！';
                    result = false;
                }
            }
            if(type && type === 'nonnegativeInt'){
                if(!isNaN(val) && val < 0){
                    $target.val(0).blur();
                    errorMsg = '请输入不小于0的整数！';
                    result =  false;
                }
            }
            if(type && type === 'nonpositive'){
                if(!isNaN(val) && val > 0){
                    $target.val(0).blur();
                    errorMsg = '请输入不大于0的数！';
                    result =  false;
                }
            }
            if(type && type === 'nonpositiveInt'){
                if(!isNaN(val) && val > 0){
                    $target.val(0).blur();
                    errorMsg = '请输入不大于0的整数！';
                    result =  false;
                }
            }
            //校验数据14位
            var validTypes = ['int','nonnegativeInt','nonpositiveInt','nonnegative','nonpositive','percent','milli']
            if(!type || validTypes.indexOf(type) !== -1){
                if($target.attr("disabled") !== "disabled"){
                    if(text.split('.')[0].length>14){
                        $target.val(0).blur();
                        errorMsg = '请输入整数部分不超过14位的数！';
                        result =  false;
                    }
                }
            }
            /*检验百分数，千分数，及其最大最小值*/
            if(text!="" && (type === 'percent' || type === 'milli')){
                var attrDigit = $target.attr('digit');
                var digit = attrDigit && !isNaN(attrDigit)?parseInt(attrDigit):0;
                var isFormatReg = type === 'percent'?/^\d+(\.\d+)?%$/:/^\d+(\.\d+)?‰$/;//是否格式化
                var replaceSymbol = type === 'percent'?'%':'‰';//替换的符号
                var multiple = type === 'percent'?100:1000;
                var minValue = 0;//最小值
                var maxValue = null;//最大值
                var isFormat = isFormatReg.test(text);//输入数据是否格式化
                if(attrMaxValue){
                    attrMaxValue = attrMaxValue.replace(replaceSymbol,'');
                    if(!isNaN(attrMaxValue)){
                        maxValue = Number(attrMaxValue)/multiple;
                    }
                }
                if(attrMinValue){
                    attrMinValue = attrMinValue.replace(replaceSymbol,'');
                    if(!isNaN(attrMinValue)){
                        minValue = Number(attrMinValue)/multiple;
                    }
                }
                if(!isFormat){//输入数据不带%或2个%及以上
                    if(isNaN(val)){
                        errorMsg = '数据输入有误，请重新输入。';
                        $target.val(minValue).blur();
                        result =  false;
                    }
                    if(typeof maxValue !== 'number' && val<minValue){
                        errorMsg = '请输入不小于'+minValue+'的数！';
                        $target.val(minValue).blur();
                        result =  false;
                    }else if(typeof maxValue === 'number' && (val<minValue || val>maxValue)){
                        errorMsg = '当前单元格的输入范围为['+minValue+'-'+maxValue+']！';
                        $target.val(val<minValue?minValue:maxValue).blur();
                        result =  false;
                    }
                }
            }
            /*校验非百分数、千分数的最大最小值*/
            var notValidTypes = ['percent','milli','string','date'];
            if(text!="" && notValidTypes.indexOf(type) === -1){
                var minValue = null;
                var maxValue = null;
                if(attrMaxValue && !isNaN(attrMaxValue)){
                    maxValue = Number(attrMaxValue);
                }
                if(attrMinValue && !isNaN(attrMinValue)){
                    minValue = Number(attrMinValue);
                }
                if(typeof minValue === 'number' && maxValue === null && val<minValue){
                    errorMsg = '请输入不小于'+minValue+'的数！';
                    $target.val(minValue).blur();
                    result =  false;
                }else if(typeof maxValue === 'number' && minValue === null && val>maxValue){
                    errorMsg = '请输入不大于'+maxValue+'的数！';
                    $target.val(maxValue).blur();
                    result =  false;
                }else if(typeof minValue === 'number' && typeof maxValue=== 'number' && (val<minValue || val>maxValue)){
                    errorMsg = '当前单元格的输入范围为['+minValue+'-'+maxValue+']！';
                    $target.val(val<minValue?minValue:maxValue).blur();
                    result =  false;
                }
            }
            if(text !== '' && type && type === 'date'){
                var newDate = new Date(text).format('yyyy-MM-dd');
                if(newDate !== text){
                    errorMsg = '请输入正确的日期（格式如：2008-08-08）！';
                    result =  false;
                }
            }
            if(!result){
                $target.parent().addClass('report_error');
                mini.alert(formatErrorMsg || errorMsg, '提示', function () {
                    $target.focus();
                })
            }
            return result;
        };
        /**
         * 排序公式
         * @param {Array} unsortedFormula
         * @return {Array}
         * */
        var _sortFormula = function (arr) {
            var cellReg = /[A-Za-z]+\d+/g;//匹配节点
            var sumReg = /sum\([\d\w\s:]+\)/ig;//匹配求和公式如sum(A1:A12)
            var indexReg = /\d+/g;//匹配下标
            for(var i=0;i<arr.length-1;i++){
                for(var j=i+1;j<arr.length;j++){
                    var temp;
                    var curFormulaCells = arr[j].match(cellReg);//当前公式的所有节点
                    var tarFormulaCells = arr[i].match(cellReg);//目标公式的所有节点
                    //若当前公式中不存在节点或目标公式中不存在节点或目标节点只有等号左边有节点，则直接跳过当前循环，则直接跳过当前循环
                    if(!curFormulaCells || !tarFormulaCells || tarFormulaCells.length <= 1){
                        continue;
                    }
                    tarFormulaCells.shift();//剔除目标公式等号左侧节点
                    var node = curFormulaCells[0];//当前节点
                    var nodeLetter = node.match(/\w/i);//当前节点字母
                    var nodeIndex = parseInt(node.match(/\d+/));////当前节点下标
                    var nodeLetterReg = new RegExp(nodeLetter,'ig');
                    if(tarFormulaCells.length > 0){
                        if(tarFormulaCells.indexOf(node) !== -1){
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                            i--;
                            break;
                        }else{	//求和公式sum的情况
                            var sumArr = arr[i].match(sumReg);
                            if(!!sumArr){
                                var ifExchanged = false;
                                $.each(sumArr, function (k,sum) {
                                    var sumCells = sum.match(nodeLetterReg);
                                    if(!!sumCells && sumCells.length === 2){//求和公式是当前节点字母，即当前列
                                        var indexArr  = sum.match(indexReg);
                                        var startIndex = parseInt(indexArr[0]);
                                        var endIndex = parseInt(indexArr[1]);
                                        if(nodeIndex >= startIndex && nodeIndex <= endIndex){
                                            temp = arr[i];
                                            arr[i] = arr[j];
                                            arr[j] = temp;
                                            ifExchanged = true;
                                            return false;//已互换，直接跳出each遍历
                                        }
                                    }
                                });
                                if(ifExchanged){
                                    i--;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return arr;
        };
        /**
         * 执行运算
         * */
        var _runExp = function (expData, $trs) {
            var hdNodeReg = /{[A-Za-z0-9_]+(\.[A-Za-z0-9_.\[\]=]+)*}/g;
            $.each(expData, function (i, v) {
                var exp = v;
                var expArr = exp.replace('=','#').split('#');//第一个等号改为#并分割
                var $td = _getTdByFormulaCell($trs, expArr[0]);
                var temp = expArr[1];
                temp = temp.replace(hdNodeReg, function (hdNode) {
                    return _getValueFromHd(hdNode.replace(/[{}]/g,''));
                });
                temp = temp.replace(/=/g,'==');//后续的单等号改为双等号
                temp = temp.toLocaleUpperCase().replace(/SUM3D/g, 'SUM');
                var record = _getexpress($trs, temp);
                var value = _reportEval(record);
                var $curDom = $td.find('input,select').eq(0);
                var oldValue = Number($curDom.val());
                $curDom.val(value);//设值
                _setValueByType($td.find('input,select').eq(0));//格式化
                // $curDom.blur();//若有change事件，则触发对应的change事件
                if(oldValue !== value){
                    $curDom.trigger('change.afterCalculate');
                }
            });
        };
        /**
         * 获取数据
         * */
        var _getValueByType=function($target){
            if(typeof $target!='object'){
                return 0;
            }
            var id = $target.attr('id');
            /*mini-datepicker取值*/
            if($target.hasClass('mini-datepicker')){
                return mini.get(id).getText();//获取文本值
            }
            /*mini-combobox取值*/
            else if($target.hasClass('mini-combobox')){
                return mini.get(id).getValue();//获取数据值
            }
            /*mini-treeselect取值*/
            else if($target.hasClass('mini-treeselect')){
                return mini.get(id).getText();//获取文本值
            }
            /*mini-checkboxlist取值*/
            else if($target.hasClass('mini-checkboxlist')){
                var id = $target.attr('id');
                return mini.get(id).getValue();//获取数据值
            }
            else if($target.is('input')){
                var type = $target.attr('servyou_type');
                var digit = $target.attr("digit");
                if(!digit || isNaN(digit)){
                    digit = 2;
                }else{
                    digit = parseInt(digit);
                }
                if($target.is('input[type=radio]')||$target.is('input[type=checkbox]')){
                    type='checkbox';
                }
                var result = 0;
                var curVal = $target.val() === '' ? '0.00':$target.val();//当前input的值{string}
                if(type !== 'percent' && type !== 'milli'){
                    var fixedCurVal = Number(curVal).toFixed(digit);
                }
                var fixedZero = Number(0).toFixed(digit);
                if( !type || type === 'float'){//浮点数
                    result = isNaN(curVal) ? fixedZero : fixedCurVal;
                }else if(type === "int"){//整数
                    result = isNaN(curVal) ? '0' : Number(curVal).toFixed(0)
                }else if(type === "nonnegativeInt") {//非负整数 >=0
                    result = isNaN(curVal) || parseInt(curVal)<0 ? '0' : Number(curVal).toFixed(0)
                }else if(type === "nonpositiveInt"){//非正整数 <=0
                    result = isNaN(curVal) || parseInt(curVal)>0 ? '0' : Number(curVal).toFixed(0)
                }else if(type==="nonnegative"){//非负数 >=0
                    result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit);
                }else if(type==="nonpositive"){//非正数 <=0
                    result = isNaN(curVal) || Number(curVal)>0 ? fixedZero : Number(curVal).toFixed(digit);
                }else if(type === "percent"){//百分数
                    if(curVal.indexOf('%') === -1){//数据不带百分号
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit+2);
                    }else{//数据带有百分号
                        curVal = curVal.replace(/%$/,'');
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : (Number(curVal)/100).toFixed(digit+2);
                    }
                }else if(type==="milli"){
                    if(curVal.indexOf('‰') === -1){//数据不带千分号
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit+3);
                    }else{//数据带有千分号
                        curVal = curVal.replace(/‰$/,'');
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : (Number(curVal)/1000).toFixed(digit+3);
                    }
                }else if(type==="string" || type === 'date'){
                    result = $target.val();
                    $target.attr('title',result);
                }else if(type==="checkbox"){
                    result = $target.is(':checked')?'1':'0';//此处返回主要用于表间计算
                }else{
                    result = isNaN(curVal) ? '0.00':Number(curVal).toFixed(digit);
                }
                return result;
            }else if($target.is('select')){
                result = $target.find('option:selected').attr('value');
                if(!result){
                    result = '';
                }
                return result;
            }else{
                return $target.html();
            }
        };
        /**
         * 设置数据
         * */
        var _setValueByType = function($target,val){
            if(typeof $target !='object'){
                return;
            }
            var cls = $target.attr('class');
            if($target.is('input')){
                var type = $target.attr('servyou_type');
                var digit = $target.attr("digit");
                if(!digit || isNaN(digit)){
                    digit = 2;
                }else{
                    digit = parseInt(digit);
                }
                var value = val||0;
                var curVal = $target.val() === '' ? '0.00':$target.val();//当前input的值{string}
                var fixedZero = Number(0).toFixed(digit);
                if(type === "percent"){//百分数
                    if(curVal.indexOf('%') === -1){//数据不带百分号
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'%':(Number(curVal)*100).toFixed(digit)+'%';
                    }else{//数据带百分号
                        curVal = curVal.replace(/%$/g,'');
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'%':Number(curVal).toFixed(digit)+'%';
                    }
                }else if(type==="milli"){
                    if(curVal.indexOf('‰') === -1){//数据不带百分号
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'‰':(Number(curVal)*1000).toFixed(digit)+'‰';
                    }else{//数据带百分号
                        curVal = curVal.replace(/‰$/g,'');
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'‰':Number(curVal).toFixed(digit)+'‰';
                    }
                }else{
                    value = val?Number(val).toFixed(digit): _getValueByType($target);
                }
                $target.val(value).attr('value',value);

                /*表间单元格无公式赋值*/
                var setToTable_Tr_Td = $target.attr('setToTable_Tr_Td');
                if(setToTable_Tr_Td){
                    var cellArr = setToTable_Tr_Td.split(',');
                    $.each(cellArr, function (i,v) {
                        var arr = v.split('_');
                        var sb_id = arr[0];
                        var trIndex = arr[1];
                        var tdIndex = arr[2];
                        var objVal = $target.val();
                        var servyou_type = $target.attr('servyou_type');
                        if(servyou_type && servyou_type === 'percent'){
                            objVal = Number(objVal.replace('%',''))/100;
                        }
                        if(servyou_type && servyou_type === 'milli'){
                            objVal = Number(objVal.replace('‰',''))/1000;
                        }
                        $(".sb_table[sb_id="+sb_id+"] tr:eq("+trIndex+") td:eq("+tdIndex+") input").val(objVal).attr('value',objVal).blur();//赋值并重新计算对应表
                    });
                }
            }else if($target.is('select')){
                var text = $target.find('option:selected').html();
                $target.attr('title',text);
            }else if(!!cls && cls.indexOf('mini-')>-1){
                var id = $target.attr('id');
                mini.get(id).setValue(val);
            }
        };
        /**
         * 从表格中获取到对应td(在公式计算中用到)
         * */
        var _getTdByFormulaCell = function($trs,str){
            var _col,_row;
            var fnum = str;
            var _char = fnum.match(/[A-Z]+/g).join('');
            _row = fnum.replace(_char,'')-1;
            _col = lettersToNumber(_char);
            return $trs.eq(_row).find('td').eq(_col);
        };
        /**
         * 字母转数字 A->0,Z->25,AA->52
         * */
        var lettersToNumber = function (letters) {
            letters = letters.toUpperCase();
            var sum = 0;
            for(var i=0,l=letters.length;i<l;i++){
                var curLetter = letters.charAt(i);
                sum += (curLetter.charCodeAt()-64)*Math.pow(26,l-i-1);
            }
            return sum-1;
        };
        /**
         * 数字转字母 0->A,25->Z,52->AA
         * */
        var numberToLetters = function(num){
            num += 1;
            var result = [];
            while(num){
                var t = num % 26;
                if(!t){
                    t = 26;
                    -- num;
                }
                result.push(String.fromCharCode(t + 64));
                num = ~~(num / 26);
            }
            return result.reverse().join('');
        };
        var _makeArrstr = function(){
            var fnum = arguments[0];
            var _char = fnum.match(/[A-Z]+/g).join('');
            var _start = fnum.replace(_char,'');
            var _end = arguments[1].replace(_char,'');
            var arr = _makeArr(_start,_end);
            $.each(arr,function(i,v){
                arr[i] = _char+v;
            });
            return arr.join('+');
        };
        /**
         * 数字转换数组 例如 传入2,6. 则返回[2,3,4,5,6]
         * @param 起始数字，结尾数字
         * **/
        var _makeArr = function(s,e){
            if(isNaN(s) || isNaN(e)) return[];
            var start=  parseInt(s),
                end = parseInt(e);
            var result = [];
            for(var i=start;i<end+1;i++){
                result.push(i);
            }
            return result;
        };
        var _getExpArr = function(record){
            record = record.replace(/{[A-Za-z0-9_]+(\.[A-Za-z0-9_.\[\]=]+)*}/g,'');//去除从核定取值的字符串，如{wsxxs.wsxx[code=BQYSHWYJ1].value}
            var regexp = /[A-Z]+\d+/g;
            var regexp2 = /[A-Z]+\d+:[A-Z]+\d+/g;
            var _record = record;
            var regarr2 = _record.match(regexp2);
            if(regarr2){
                for(var i=0;i<regarr2.length;i++){
                    var _str = _makeArrstr(regarr2[i].split(':')[0],regarr2[i].split(':')[1]);  //处理   F2	3,5
                    _record = _record.replace(new RegExp(regarr2[i],"g"),_str);
                }
            }

            var regarr = _record.match(regexp); //['A1','A2']   obj[A1]
            if(!$.isArray(regarr)){
                return [_record];
            }
            return _unique(regarr);
        };
        var _unique = function(arr){
            var newArr=arr.concat(),
                result =[];
            for(var i=0;i<newArr.length;i++){
                var tar = arr.shift();
                if($.inArray(tar,arr)<0){
                    result.push(tar);
                }
            }
            return result;
        };
        /**
         * 校验record
         * */
        var _checkSaveRecord = function(record){
            if(record['Formula']){
                var formula = _getExpressForRecord(record,record['Formula']);
                var _express = formula.replace(/=/g,'==').replace(/<==/g,'<=').replace(/>==/g,'>=').replace(/<>/g,'!=');
                var ifError = _reportEval(_express);
                var checkresult = record['Range']=='false' ? false : true;
                if(ifError === checkresult){
                    //获取record中所有涉及的dom元素 进行报错显示
                    var doms = _getAllDOM(record,record['Formula']);
                    _addErrors(doms);
                    var new_msg = _getExpressForMsg(record,record['Emsg']);
                    mini.alert(new_msg);
                    mini.get('tabs').activeTab(table._sb_id);//切换到对应tab
                }
                return !(ifError === checkresult);
            }
        };
        var _checkMessageRecord = function (record) {
            var errorMsg = '';
            if(record['Conditions']){
                var formula = _getExpressForRecord(record,record['Conditions']);
                var _express = formula.replace(/=/g,'==').replace(/<==/g,'<=').replace(/>==/g,'>=').replace(/<>/g,'!=');
                var ifError = _reportEval(_express);
                if(ifError){
                    errorMsg = _getExpressForMsg(record,record['ErrMsg']);
                }
            }
            return errorMsg;
        };
        var _checkMustFillRecord = function (record) {
            var val = _getValueForRecord(record['Col']+','+record['Row']);
            if(!val){
                var $td = _getTdForRecord(record['Col']+','+record['Row']);
                $td.addClass('report_error');
                mini.alert(record['Describe']+'不能为空！');
                return false;
            }
            return true;
        };
        /**
         * 获取data.json中公式代入数据后的表达式
         * */
        var _getexpress = function($trs,formula){
            var regexp = /[A-Z]+\d+/g;
            var regexp2 = /[A-Z]+\d+:[A-Z]+\d+/g;

            var _formula = formula;

            var regarr2 = _formula.match(regexp2);
            if(regarr2){//sum(A1:A13)
                for(var i=0;i<regarr2.length;i++){
                    var _str = _makeArrstr(regarr2[i].split(':')[0],regarr2[i].split(':')[1]);  //处理   F2	3,5
                    _formula = _formula.replace(new RegExp(regarr2[i],"g"),_str);
                }
            }

            var _formulaCells = _formula.match(regexp);  //['A1','A2']   obj[A1]
            var str = _formula;
            if(!$.isArray(_formulaCells)){
                return _formula;
            }
            for(var i=0, l=_formulaCells.length; i<l; i++){
                var formulaCell = _formulaCells[_formulaCells.length-1-i];       //A1
                var $td = _getTdByFormulaCell($trs,formulaCell);  //处理   F2	3,5
                var value = '0';
                if($td.find('select').length>0){
                    value = _getValueByType($td.find('select'));
                }else if($td.find('input').length>0){
                    value = _getValueByType($td.find('input'));
                }
                str = str.replace(new RegExp(formulaCell+'(?!\\d)',"g"),value);
            }
            str = str.replace(/or/g,'||').replace(/--/g,'+').replace(/and/g,'&&').replace(new RegExp('IF',"g"),'getIF').replace(new RegExp('if',"g"),'getIF').replace(/round/g,'Round').replace(/ROUND/g,'Round').replace(/<==/g,'<=').replace(/>==/g,'>=');
            return str;
        };
        /**
         * 获取核定某节点的数据
         * */
        var _getValueFromHd = function (str) {//wsxxs.wsxx[code=BQYSHWYJ].value
            var key;
            var bracketReg = /\[[A-Za-z0-9_]+(=[A-Za-z0-9_]+)?\]/g;//匹配[code=BQYSHWYJ]
            var replaceReg = /(\[code=)|(\])/g;
            //文书信息和历史信息可以直接从commonData中获取
            if(str.indexOf('wsxxs.wsxx[code=') !== -1){
                key = str.match(bracketReg)[0].replace(replaceReg,'');
                return commonData.wsxxMap[key];
            }else if(str.indexOf('lsxxs.lsxx[code=') !== -1){
                key = str.match(bracketReg)[0].replace(replaceReg,'');
                return commonData.lsxxMap[key];
            }
            //其余核定节点逐层获取
            var value = undefined;
            var nodeArr = str.split('.');
            $.each(nodeArr, function (i, node) {
                value = _getHdNodeValue(node,value);
            });
            if(!value){
                value = '0.00';
            }
            return value;
        };
        /**
         * 获取核定节点值
         * */
        var _getHdNodeValue = function(nodeName,parentValue) {
            var value;
            var bracketReg = /\[[A-Za-z0-9_]+(=[A-Za-z0-9_]+)?\]/g;
            parentValue = parentValue !== undefined ? parentValue:servyouReport.hd;
            var bracketArr = nodeName.match(bracketReg);
            if(bracketArr && bracketArr.length === 1){//存在wsxx[code=YQSB]
                var fatherNode = nodeName.replace(bracketArr[0],'');
                var childNode = bracketArr[0].replace(/[\[\]]/g,'');
                value = _getHdNodeValue(childNode,_getHdNodeValue(fatherNode,parentValue));
            }else if(parentValue instanceof Array){//父节点为数组
                var nodeArr = nodeName.split('=');
                var key = nodeArr[0];
                var val = nodeArr[1];
                if(isNaN(nodeName)){//索引节点为属性
                    $.each(parentValue, function (i,obj) {
                        if(obj[key] === val){
                            value = obj;
                            return false;
                        }
                    });
                }else{//索引节点为数字
                    value = parentValue[parseInt(nodeName)];
                }
            }else if(parentValue instanceof  Object){//父节点为对象
                value = parentValue[nodeName];
            }
            return value;
        };
        /**
         * xml单节点转json
         * parmas {document} record
         * result {object} json
         * */
        var _turnToJson = function(record){
            if(typeof record != 'object') return {};
            var _recordAttr = record.attributes;
            var json = {};
            $.each(_recordAttr,function(i,attr){
                var name =attr.nodeName;
                var value = attr.nodeValue;
                json[name] = value;
            });
            return json;
        };
        /**
         * json属性首字母大写
         * */
        var _toUpCase = function(d){
            var tmpChar,postString,_pop;
            if(d.formula|| d.conditions){
                for(var pop in d){
                    tmpChar = pop.substring(0,1).toUpperCase();
                    postString = pop.substring(1,pop.length);
                    _pop = tmpChar + postString;
                    d[_pop] = d[pop];
                }
            }
            return d;
        };
        var _getExpressForMsg = function (record,msg) {
            var cellWithBracketReg = /\[[A-Za-z0-9\+\-\*\/%\s]+\]|【[A-Za-z0-9\+\-\*\/%\s]+】/g;
            var cellReg = /[A-Za-z]+\d+/g;
            var cellWithBrackets = msg.match(cellWithBracketReg);
            if(!!cellWithBrackets){
                $.each(cellWithBrackets, function (i, cellWithBracket) {
                    var cells = cellWithBracket.match(cellReg);
                    if(!!cells){
                        var newCellWithBracket = cellWithBracket;
                        $.each(cells, function (j, cell) {
                            var val;
                            if(record[cell]){
                                val = _getValueForRecord(record[cell]);
                                newCellWithBracket = newCellWithBracket.replace(new RegExp(cell+'(?!\\d)','g'), val);
                            }
                        });
                        cellWithBracket = cellWithBracket.replace(/[\+\-\*\/\[\]]/g,function($item){
                            return '\\'+$item;
                        });
                        msg = msg.replace(new RegExp(cellWithBracket, 'g'), newCellWithBracket);
                    }
                });
            }

            return msg;
        };
        /**
         * 获取cfg中公式代入数据后的表达式
         * @param {object} record
         * @param {string} formula
         * **/
        var _getExpressForRecord = function(record,formula){
            var regexp = /[A-Z]+\d+/g;
            var formulaCells = formula.match(regexp);  //['A1','A2']   obj[A1]
            if(!$.isArray(formulaCells)){
                return formula;
            }
            for(var i=0,l=formulaCells.length; i<l; i++){
                var cell = formulaCells[formulaCells.length-1-i];       //A1
                var value = '';
                if(record[cell]){
                    value = _getValueForRecord(record[cell]);
                }
                formula = formula.replace(new RegExp(cell+'(?!\\d)',"g"),value);
            }
            formula = formula.replace(/or/g,'||').replace(/AND/g,'&&').replace(new RegExp('IF',"g"),'getIF').replace(new RegExp('if',"g"),'getIF').replace(/round/g,'Round').replace(/ROUND/g,'Round');
            return formula;
        };
        /*
         * 获取record中对应字段的值
         * */
        var _getValueForRecord = function(str) {

            var value;
            if(str.indexOf('WSXXS') !== -1) {//A1="WSXXS.[HDZSFS]"
                var key = str.replace(/(WSXXS.\[)|(\])/g,'');
                value = commonData.wsxxMap[key];
            }else{//A1="2,9"或A1="001|2,9"
                value = _getValByTable(str);  //处理   F2	3,5
            }
            return value;
        };
        /**
         * 通过WSXX来获取数据
         * params  {string} str
         * ***/
        /*var _getValByWSXX = function(str){
            var result = 0;
            if(str.indexOf('WSXXS') !== -1){
                var startIndex = str.indexOf('[')+1;
                var endIndex = str.indexOf(']');
                var code = str.substring(startIndex,endIndex);
                result = hdxxUtil.getWsxxValueByCode(code,servyouReport.hd);
            }
            return result;
        };*/
        /**
         * 通过表格获取数据
         * */
        var _getValByTable = function(str){
            var $td =_getTdForRecord(str);
            if($td.length === 0){
                return '0.00';
            }
            var $dom = $td.children().eq(0);
            if($dom.length === 1){
                return _getValueByType($dom);
            }else{
                return '0.00';
            }
        };
        /**
         * 获取record中对应单元格的td，如A1="001|2,9"
         * */
        var _getTdForRecord = function (str) {
            str = str.replace('(string)','');
            var sb_id = table._sb_id;
            if(str.indexOf('|') !== -1 && str.split('|')[0].trim() !== ''){//A1="001|2,9"
                sb_id = str.split('|')[0];
                str = str.split('|')[1];
            }
            var td_tr_index = str.split(',');
            var tdIndex = parseInt(td_tr_index[0]);
            var trIndex = parseInt(td_tr_index[1]);
            var $td = $('table[sb_id="'+sb_id+'"] tr:eq('+trIndex+') td:eq('+tdIndex+')');
            return $td;
        };
        /**
         * 获取record中所有相关单元格的dom节点
         * */
        var _getAllDOM = function (record, formula) {
            var cellReg = /[A-Za-z]+\d+/g;
            var formulaCells = formula.match(cellReg);
            var $tds = [];
            if(!!formulaCells){
                $.each(formulaCells, function (i, cell) {
                    $tds.push(_getTdForRecord(record[cell]));
                });
            }
            return $tds;
        };
        /**
         * 添加报错样式
         * */
        var _addErrors = function (tdArr) {
            $.each(tdArr, function () {
                !$(this).hasClass('report_error') && $(this).addClass('report_error');
            });
        };
        /**
         * eval
         * */
        var _reportEval = function(str){
            var result = 0;
            /**
             * 工具类
             * **/
            var value = function(n){
                var v = Number(n||0).toFixed(2);
                return Number(v);
            };
            var TRIMLEFT = function(_obj){
                if(_obj==="''" || _obj === null){
                    return "";
                }
                return _obj.toString();
            };
            var strlen = function(c){
                return c.toString().length;
            };
            var round = function(_str1,str2){
                var str1 = eval(_str1);
                var numVal = parseFloat(str1),
                    dig = parseInt(str2);
                var lastvalue = (!isNaN(str1))&&(!isNaN(str2)) ? numVal.toFixed(dig) : 0.00;
                return parseFloat(lastvalue);
            };
            var getIF = function(iftrue,str1,str2){
                return iftrue ? str1 : str2;
            };
            var abs = function(express){
                var num = eval(express);
                return Math.abs(num);
            };
            var sum = function(){
                return arguments[0];
            };
            var max = function () {
                var argumentsStr = Array.prototype.slice.apply(arguments).toString();
                return eval('Math.max('+argumentsStr+')');
            };
            var min = function () {
                var argumentsStr = Array.prototype.slice.apply(arguments).toString();
                return eval('Math.min('+argumentsStr+')');
            };
            var newstr = str.replace(/--/g,'+').replace(/STRLEN/g,'strlen').replace(/SUM/g,'sum')
                .replace(/or/g,'||').replace(/AND/g,'&&').replace(/and/g,'&&').replace(/<>/g,'!=')
                .replace(/ROUND/g,'round').replace(/Round/g,'round').replace(/trimleft/g,'TRIMLEFT')
                .replace(/not/g,'!').replace(/OR/g,'||').replace(/ABS/g,'abs').replace(/MAX/g,'max')
                .replace(/MIN/g,'min');
            try{
                result = eval(newstr);
            }
            catch(e){
                console.log(e);
            }
            finally{
                return result;
            }
        };

        return {
            /**
             * 初始化table
             * */
            init: function (sb_id, hd, localFormula) {
                table._init(sb_id, hd, localFormula);
            },
            /**
             * 添加行
             * */
            addRows: function (index, rowCount, html) {
                table._addRows(index, rowCount, html);
            },
            /**
             * 删除一行
             * */
            deleteRow: function (index) {
                table._deleteRow(index);
            },
            /**
             * 获取公式
             * */
            getFormulas: function () {
                return table._formulas;
            },
            /**
             * 设置公式
             * */
            setFormulas: function (formulas) {
                table._setFormulas(formulas);
            },
            /**
             * 添加公式
             * */
            addFormulas: function (formulaList) {
                table._addFormulas(formulaList);
            },
            /**
             * 删除公式
             * */
            deleteFormulas: function (formulaList) {
                table._deleteFormulas(formulaList);
            },
            /**
             * 计算全部
             * */
            calculateAll: function () {
                table._calculateAll();
            },
            /**
             * 校验cfg
             * */
            checkCfg: function () {
                return table._checkCfg();
            },
            /**
             * 校验DoShowMessage
             * */
            checkDoShowMessage: function () {
                return table._checkDoShowMessage();
            },
            /**
             * 格式化所有input中的数据
             * */
            formatAllInputValue: function () {
                table._formatAllInputValue();
            },
            /**
             * 获取 Table 缓存对象
             * @returns {_cache|{}}
             */
            getTableCache:function () {
                return table._cache;
            },
            /**
             * 获取当前Table对象对应的table dom
             * @returns {null}
             */
            getCurrentTableDom:function () {
                return table._$curTable;
            },
            /**
             * 把cfg的Body节点保存到 table._cache['Body']
             */
            setCfgBody:function () {
                table._cache['Body'] = $(table._cfgXml).find('Body Records');
            },
            /**
             * 把金三报文xml保存到 table._j3xml
             */
            setJ3Xml:function () {
                var sb_url = table._$curTable.attr('sb_url')+'/';
                table._j3xml = xmlUtil.loadFileByPath(sb_url + table._sb_id + '_j3.xml','xml');
            },
            makeArr:function (s,e) {
                return _makeArr(s,e);
            },
            turnToJson:function (record) {
                return _turnToJson(record);
            },
            getValueByType:function ($target) {
                return _getValueByType($target);
            },
            setValueByType:function ($target, val) {
                return _setValueByType($target, val);
            }
        };
    };


    /**
     * 申报框架
     * */
    var servyouReport = (function () {
        var report = {
            /**
             * Attributes
             * */
            nsrsbh: '',//纳税人识别号
            nsrmc: '',//纳税人名称
            nsrData: null,//纳税人基本信息
            sbzlDm: '',//申报种类代码
            reportName:'',//申报名称
            tbrq: '',//填表日期
            sssqq: '',//所属时期起
            sssqz: '',//所属时期止
            hd: '',//核定Object
            wsxxMap:null,//文书信息{key,value}
            lsxxMap:null,//历史信息{key,value}
            useResumeData: false,//是否使用后台返回的html和公式
            successUrl: '../public/sb_success.html',
            timerTemp: 300,//两次发送的时间间隔，单位：秒
            timerBoxId: '',//计时器mini弹窗的id
            /**
             * 业务类型
             * report（正常申报），默认
             * preview（查看申报表）
             * resume（暂存还原）
             * correct（更正申报）
             * past（往期申报）
             * overdue（逾期申报）
             * */
            businessType: 'report',
            tables: {},//所有表对象
            j3Xmls: {},//金三报文
            j3CorrectXml: {},//金三更正申报返回的报文
            pzxh: '',//更正申报 凭证序号
            isClick: [],//已点击表list
            sbIdNotFromHd:[],//不从核定取值的报表id
            resumeData: null,//后台获取到的暂存数据
            autoAddAllId: false,//自动为页面中的input和select添加id
            tempSaveSuccessMsg: '暂存成功！',
            reportBtns: [
                {
                    id: 'sb_save',
                    cls: 'btn btn-blue',
                    text: '确认发送',
                    callback: function () {
                        servyouReport.save();
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_tempSave',
                    cls: 'btn btn-orange',
                    text: '暂存',
                    callback: function () {
                        servyouReport.tempSave();
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_close',
                    cls: 'btn btn-red',
                    text: '取消',
                    callback: function () {
                        servyouReport.closeWindow();
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_print',
                    cls: 'btn btn-green',
                    text: '打印',
                    callback: function () {
                        servyouReport.print();
                    },
                    whenToShow: 'preview'
                }
            ],
            changedJ3Xml:{},// 保存自动转好的报文
            showSideBar: true,
            showReportTip: true,
            reportTipUrl: '',
            mock: false,//是否使用假数据
            /**
             * 初始化入口
             * @param {boolean} mock
             * */
            init: function (mock) {
                this.mock = mock?mock:false;
                var href = window.location.href;
                if(href.indexOf('preview=Y') !== -1){
                    this.businessType = 'preview';
                    this.renderReportBtns();
                    // var htmlData = mini.decode(sessionStorage.getItem('tempsaveData')).jsonData.htmlData;//用于本地测试预览
                    // this.preview(htmlData);//用于本地测试预览
                    return ;
                }else{
                    header.init();//加载头部
                    this.reportTipUrl = this.reportTipUrl || 'reportTip.html';
                    this.showSideBar && sideBar.init(this.reportTipUrl,this.showReportTip);//加载侧边栏
                }
                //next step
                this.determineBusiness();
                this.bindTabChangeEvent();//必须绑定在检测是否有暂存数据前，否则初始化时，allClick数组中没有第一张表的id
                this.setNsrData();
            },
            /**
             * 确定业务类型，这里不能区分是断点续办和正常申报，这两个的区分要在拿到列表数据之后才能
             * */
            determineBusiness: function () {
                var pageUrl = window.location.href;
                if(pageUrl.indexOf('preview=Y') !== -1){
                    this.businessType = 'preview';
                }else if(pageUrl.indexOf('correct=Y') !== -1){
                    this.businessType = 'correct';
                }else if(pageUrl.indexOf('past=Y') !== -1){
                    this.businessType = 'past';
                }else if(pageUrl.indexOf('overdue=Y') !== -1){
                    this.businessType = 'overdue';
                }else{
                    this.businessType = 'report';//统一设置为report
                }
            },
            /**
             * tab change事件
             * */
            bindTabChangeEvent: function () {
                var that = this;
                mini.get('tabs').on('activechanged', function (tab) {
                    if(typeof that['activeTab_'+tab.name] === 'function'){
                        that['activeTab_'+tab.name].apply(that,[]);
                    }
                    var $tabBody = $(tab.sender.getTabBodyEl(tab.name));
                    if(that.isClick.indexOf(tab.name) === -1 && $tabBody.find('table[type="sb"]').length>0){
                        that.isClick.push(tab.name);
                    }
                });
            },
            /**
             * 设置纳税人数据
             * */
            setNsrData: function () {
                if(this.mock){
                    this.nsrData = this.getLocalJson(this.mockApi['nsrData']);
                }else {
                    this.nsrData = nsrxxUtil.getNsrxxVO();
                }

                this.djxh = this.nsrData.djxh;
                this.nsrsbh = this.nsrData.nsrsbh;
                this.nsrmc = this.nsrData.nsrmc;
                //next step
                this.setHd();
            },
            /**
             * 设置核定数据
             * */
            setHd: function () {
                if (this.mock) {
                    this.hd = this.getLocalJson(this.mockApi['hd']);
                } else if (this.businessType === 'correct') {
                    //lizm 获取更正申报报文以及核定
                    var temp = store.getSession('gzxx');
                    this.pzxh = temp.pzxh;
                    this.j3CorrectXml = xmlUtil.turnStrToXml(temp.sbxx);
                    this.hd = hdxxUtil.getSbzlNode(temp.hdxx);
                } else {
                    this.hd = hdxxUtil.getSbzlNode();
                }
                //next step
                if(this.checkHd()){
                    this.setCommonData();
                    this.setSBBS();
                }
            },
            /**
             * 设置公共数据（申报种类代码，所属时期，填表日期）
             * */
            setCommonData: function () {
                this.sbzlDm = this.hd['sbzlcode'];	//申报种类代码
                this.sssqq = this.hd['sksssqQ'];	//所属时期起
                this.sssqz = this.hd['sksssqZ'];	//所属时期止
                this.tbrq = Date.getLocalDate().format('yyyy-MM-dd');//填表日期
                this.reportName = this.hd['sbzlmc'];//报表名称
                commonData._setWsxxAndLsxxMap(this.hd);
                this.wsxxMap = commonData.wsxxMap;
                this.lsxxMap = commonData.lsxxMap;
            },
            /**
             * 校验核定相关项
             * */
            checkHd: function () {
                //判断是否有核定
                if (!this.hd) {
                    return false;
                }
                return true;
            },
            /**
             * 根据核定中SBBS节点，加载对应报表的数据
             * */
            setSBBS: function () {
                var hd_sbbs = this.hd.sbbs.sbb||[];
                hd_sbbs = hd_sbbs.concat(this.sbIdNotFromHd);
                hd_sbbs = hd_sbbs.sort(function(x,y){
                    return Number(x) - Number(y);//返回小于0，则为升序
                });
                this.initMiniTab(hd_sbbs);
                //next step
                if(this.preCondition()){
                    this.chooseToGo();
                }
            },
            initMiniTab: function (sbIds) {
                var miniTab = mini.get('tabs');
                var that = this;
                $.each(sbIds, function (i,id) {
                    var url = 'table_'+id+'.html';
                    var html = that._loadTabTemplate(url);
                    var title = $(html).find('table[type="sb"]').attr('sb_title');
                    //add tab
                    var tab = {title: title,name:id};
                    tab = miniTab.addTab(tab);
                    //tab body
                    var el = miniTab.getTabBodyEl(tab);
                    el.innerHTML = html;
                });
                if(miniTab.getTabs().length > 0){
                    miniTab.activeTab(0);
                }
                mini.parse();
            },
            /**
             * 其他判断是否允许申报的前提条件
             * */
            preCondition: function () {
                return true;
            },
            chooseToGo: function () {
                var resumeData = sbcommon.getResumeData_normal(this.djxh, this.sbzlDm, this.sssqq, this.sssqz);
                if(resumeData && resumeData.jsonData && resumeData.jsonData.htmlData){
                    this.resumeData = resumeData;
                    var that = this;
                    mini.confirm('系统检测到您上次填写了申报表，点击确定还原上次填写的数据，点击取消重新填写申报表！', '提示', function (action) {
                        if(action === 'ok' && that.businessType !== 'correct'){
                            that.useResumeData = true;
                            that.businessType = 'resume';
                        }else if(action === 'ok' && that.businessType === 'correct'){
                            that.useResumeData = true;
                            that.businessType = 'correct';
                        }
                        that.run();
                    });
                }else{
                    this.run();
                }
            },
            /**
             * 运行框架
             * */
            run: function () {
                var that = this;
                var sb_url = $('table[type="sb"]:eq(0)').attr('sb_url')+'/';
                var localFormulas = null;
                if(!this.useResumeData){
                    localFormulas = xmlUtil.loadFileByPath(sb_url + 'formulas.json','json');
                }
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    that.j3Xmls[sb_id]= xmlUtil.loadFileByPath(sb_url + sb_id + '_j3.xml','xml');
                    that.tables[sb_id] = Table();
                    if(!that.useResumeData){
                        that.tables[sb_id].init(sb_id, that.hd, localFormulas[sb_id]);
                    }else{
                        that.tables[sb_id].init(sb_id, that.hd, null);
                    }
                });
                this.renderReportBtns();
                this.bindCommonEvent();
                //若配置了该属性为true,则为所有input和select都加上id
                if(this.autoAddAllId && !this.useResumeData){
                    this.setIdForAllInputAndSelect();
                }
                this.customInitLocalData();//本地变量或者对象属性的初始化可以放到这里,miniui下拉框或者下拉树的初始化数据【必须】在这里进行初始化
                this.customEvent();//自定义事件要放在自定义初始化前，自定义初始化中可能用到其中的事件
                if(!this.useResumeData){//未使用暂存数据

                    // added by lizm
                    if(this.businessType === 'correct'){ // 类型是更正申报
                        this.resumeFromXml(); // 使用金三报文更正申报
                    }
                    // end

                    this.customInit();//自定义初始化与期初核定无关的内容
                    this.customInitFromHd();//自定义初始化任何与期初核定相关的内容（与核定相关的初始化必须写在这里）
                }else if(this.useResumeData && this.businessType === 'correct'){//使用了暂存数据且是更正申报
                    this.resume();//暂存还原
                    this.customInitFromHd();//期初相关初始化仍须执行
                }else{//使用了暂存数据且不是更正申报
                    this.resume();//暂存还原
                }
                this.renderCommonData();
                this.afterInit();
            },
            /**
             * 根据id来修改按钮属性
             * */
            setReportBtnById: function (id,options) {
                if(options.hasOwnProperty('id')){
                    mini.alert('请不要改变按钮的id，会导致框架中对按钮id的引用失效！');
                    return false;
                }
                $.each(this.reportBtns, function (i,obj) {
                    if(obj.id === id){
                        $.extend(obj,options);
                        return false;
                    }
                })
            },
            /**
             * 添加按钮配置
             * */
            addReportBtn: function (options) {
                this.reportBtns.push(options);
            },
            /**
             * 删除按钮配置
             * */
            removeReportBtnById: function (id) {
                for(var i=0,l=this.reportBtns.length;i<l;i++){
                    var curOption = this.reportBtns[i];
                    if(curOption.id === id){
                        this.reportBtns.splice(i,1);
                        break;
                    }
                }
            },
            /**
             * 渲染底部按钮
             * */
            renderReportBtns: function () {
                this.customReportBtns();//自定义申报按钮的配置
                var that =  this;
                if(this.reportBtns && this.reportBtns instanceof Array){
                    $.each(this.reportBtns, function () {
                        if(this.whenToShow.indexOf(that.businessType) !== -1){
                            var a = document.createElement('a');
                            this.id?a.id=this.id:'';
                            this.cls?a.className=this.cls:'';
                            this.text?a.innerText=this.text:'';
                            $('#btn-group').append(a);
                        }
                    });
                }
                this.bindReportBtnsEvent();
            },
            /**
             * 绑定底部按钮事件
             * */
            bindReportBtnsEvent: function(){
                var that = this;
                $('#btn-group').on('click','a',function(){
                    var id = this.id;
                    if(id) {
                        var config = that.getBtnConfig(id);
                        if (config['callback'] && typeof config['callback'] === 'function') {
                            config['callback']();
                        }
                    }
                });
            },
            /**
             * 根据id获取对应按钮的配置信息
             * */
            getBtnConfig: function (id) {
                var config = null;
                $.each(this.reportBtns, function () {
                    if(this.id === id){
                        config = this;
                        return false;
                    }
                });
                return config;
            },
            /**
             * 自定义申报按钮
             * */
            customReportBtns: function(){

            },
            /**
             * 初始化完之后
             * */
            afterInit: function () {},
            /**
             * 绑定公共事件
             * */
            bindCommonEvent: function () {
                //radio点击，checkbox点击，同时checkbox支持实现单选功能
                $('body').on('click','input[type="checkbox"][multiSelect="false"],input[type="radio"]', function () {
                    var type = $(this).attr('type');
                    var name = $(this).attr('name');
                    var multiSelect = $(this).attr('multiSelect');
                    if(this.checked){
                        $(this).attr('checked','checked');
                        if(type === 'radio' || (type === 'checkbox' && multiSelect === 'false')){
                            $('input[name="'+name+'"]').not(this).each(function () {
                                this.checked = false;
                                $(this).removeAttr('checked');
                            });
                        }
                    }else{
                        $(this).removeAttr('checked');
                    }
                });
            },
            /**
             * 渲染公共数据到页面
             * */
            renderCommonData: function () {
                $('.nsrsbh').html(this.nsrsbh);
                $('.nsrmc').html(this.nsrmc);
                $('.sssqq').html(this.sssqq);
                $('.sssqz').html(this.sssqz);
                $('.tbrq').html(this.tbrq);
            },
            /**
             * 自定义初始化与期初相关的数据（由于更正申报，所以与期初相关的初始化必须与其他的初始化独立开来）
             * */
            customInitFromHd: function () {

            },
            /**
             * 初始化本地数据
             * （本地变量或者对象属性的初始化可以放到这里,miniui下拉框或者下拉树的初始化数据【必须】在这里进行初始化）
             * （原因：暂存还原或者更正申报，会不执行或者少执行初始化方法）
             * */
            customInitLocalData: function(){

            },
            /**
             * 自定义的初始化
             * */
            customInit: function () {},
            /**
             * 预览结束后的自定义初始化
             * */
            customInitAfterPreview: function (sbxh, qqwjm) {},
            /**
             * 自定义事件
             * */
            customEvent: function () {},
            /**
             * 添加公式
             * */
            addFormulas: function (sb_id, formulaList) {
                this.tables[sb_id].addFormulas(formulaList);
            },
            /**
             * 删除公式
             * */
            deleteFormulas: function (sb_id, formulaList) {
                this.tables[sb_id].deleteFormulas(formulaList);
            },
            /**
             * table下第index个tr位置增加rowCount行
             * @param {string} sb_id
             * @param {number} index
             * @param {document} html
             * @param {number} rowCount
             * */
            addRows: function (sb_id, index, rowCount, html) {
                this.tables[sb_id].addRows(index, rowCount, html);
            },
            /**
             * 删除一行
             * */
            deleteRow: function (sb_id, index) {
                this.tables[sb_id].deleteRow(index);
            },
            /**
             * 校验是否所有tab标签都已点击
             * */
            checkAllClicked: function () {
                var $allTables = $('table[type="sb"]');
                var that = this;
                if(this.isClick.length < $allTables.length){
                    var errorMsgArr = ['您还有<span class="txt-red">'+($allTables.length-this.isClick.length)+'</span>张表尚未填写：'];
                    $allTables.each(function (i, tableDom) {
                        var sb_id = $(tableDom).attr('sb_id');
                        //选填表的tab切可以不点击
                        if(that.isClick.indexOf(sb_id) === -1 && that.sbIdNotFromHd.indexOf(sb_id) === -1){
                            errorMsgArr.push('<span class="txt-red">《'+$(tableDom).attr('sb_title')+'》</span>');
                        }
                    });
                    mini.alert(errorMsgArr.join('<br>'));
                    return false;
                }
                return true;
            },
            /**
             * 校验：纯js校验、SaveCheckData、SendCheckData、MustFill
             * */
            checkDatas: function () {
                _removeAllErrors();
                var result = true;
                var that = this;
                //纯js校验
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    if(typeof that['checkTable_'+sb_id] === 'function'){
                        result = that['checkTable_'+sb_id].apply(that,[]);
                        if(!result){
                            return false;
                        }
                    }
                });
                //cfg校验
                if(result){
                    $.each(this.tables, function (sb_id, table) {
                        result = table.checkCfg();
                        if(!result){
                            return false;
                        }
                    })
                }
                return result;
            },
            /**
             * 校验DoshowMessage
             * */
            checkDoShowMessage: function () {
                var errorMsgs = [];
                $.each(this.tables, function (sb_id, table) {
                    var curMsgs = table.checkDoShowMessage();
                    if(curMsgs.length>0){
                        errorMsgs = errorMsgs.concat(curMsgs);
                    }
                });
                return errorMsgs;
            },
            /**
             * 计算全部公式
             * */
            calculateAll: function (sb_id) {
                this.tables[sb_id].calculateAll();
            },
            /**
             * 发送
             * */
            send: function () {
                var that = this;
                var j3Xmls = [];
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    if(typeof that['changeXml_'+sb_id] === 'function'){
                        var obj = {};
                        var $xml = that['changeXml_'+sb_id].apply(that,[]);
                        var bbxml = '';
                        if($xml.children().length !== 0){
                            bbxml = xmlUtil.turnXmlToStr($xml[0]);
                        }
                        obj['bbwjm'] = that.sbzlDm+'_'+sb_id+'.xml';
                        obj['bbxml'] = bbxml;
                        j3Xmls.push(obj);
                    }
                });
                var htmlData = this.getPreviewData();
                var formulaData = this.getFormulas();
                var sblxDm = this.businessType==='correct' ? '03' : '11';
                if(this.checkSubmitTime() && sbcommon.sbtj_normal(this.djxh, this.sbzlDm, this.sssqq, this.sssqz, formulaData, htmlData, j3Xmls,sblxDm,this.pzxh)){
                    $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());
                    window.location.href = this.successUrl;
                }
            },
            /**
             * 获取对应sb_id的金三报文
             * @param {string} sb_id
             * @return {document}
             * */
            getJ3Xml: function (sb_id) {
                return $(xmlUtil.turnStrToXml(xmlUtil.turnXmlToStr(this.j3Xmls[sb_id])));
                // return $(this.j3Xmls[sb_id].cloneNode(true));//该方法在31版本chrome中会出问题
            },
            /**
             * 获取所有公式
             * */
            getFormulas: function () {
                var formula = {};
                var that = this;
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    formula[sb_id] = that.tables[sb_id].getFormulas();
                });
                return formula;
            },
            /**
             * 获取html代码（用于暂存与查看）
             * */
            getPreviewData:function(){
                //所有隐藏的tab切增加样式，脱离文档流，使mini组件的宽度计算保持正确
                $('.mini-tabs-body:not(:visible)').addClass('absolute');
                var htmlData = {};
                //所有select所选中的option加上selected属性
                $("select").each(function(){
                    $(this).find('option:selected').attr("selected", true).siblings().removeAttr('selected');
                });
                $('table[type="sb"]').each(function (i, table) {
                    var sb_id = $(table).attr('sb_id');
                    var $tableClone = $(table).clone();
                    /*所有select加上title,确保没有点击过的select有title*/
                    $tableClone.find("select").each(function(){
                        var curText = $(this).find('option:selected').html();
                        $(this).attr('title',curText);
                    });
                    /*取出mini-combobox中的值，替换当前mini-combobox节点*/
                    $tableClone.find('.mini-combobox').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        var value = $control.getValue();//获取代码值
                        if(text === '' && $control.emptyText !== '' && $control.emptyText.indexOf('请选择') === -1){	//nullItemText也会表现到emptyText中
                            text = $control.emptyText;
                        }
                        var width = $control.getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-datepicker中的值，替换当前mini-datepicker节点*/
                    $tableClone.find('.mini-datepicker').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        // var width = mini.get(id).getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        // var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+text+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        var strHtml = '<span class="ellipsis spanForMini" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+text+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-checkboxlist中的值，替换当前mini-checkboxlist节点*/
                    $tableClone.find('.mini-checkboxlist').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var value = $control.getValue();//获取数据值
                        var data = $control.getData();
                        var text = '';
                        if(data){
                            $.each(data, function () {
                                if(this[$control.valueField] === value){
                                    text = this[$control.textField];
                                    return false;
                                }
                            })
                        }
                        var width = $control.getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-treeselect中的值，替换当前mini-treeselect节点*/
                    $tableClone.find('.mini-treeselect').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        var value = $control.getValue();//获取数据值
                        if(text === '' && $control.emptyText !== '' && $control.emptyText.indexOf('请选择') === -1){//nullItemText也会表现到emptyText中
                            text = $control.emptyText;
                        }
                        var width = mini.get(id).getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    htmlData[sb_id] = $tableClone[0].outerHTML;
                });
                $('.mini-tabs-body.absolute').removeClass('absolute');
                return htmlData;
            },
            /**
             * 发送
             * */
            save: function () {
                if(this.checkAllClicked() && this.checkDatas()){
                    var errorMsgs = this.checkDoShowMessage();
                    if(errorMsgs.length >0){
                        var newErrorMsgArr = [];
                        $.each(errorMsgs, function (i,msg) {
                            newErrorMsgArr.push('（'+(i+1)+'）'+msg);
                        });
                        var newErrorMsgs = newErrorMsgArr.join('<br>');
                        var that = this;
                        mini.confirm(newErrorMsgs,'点击确定，继续发送！',function (action) {
                            if(action === 'ok'){
                                that.customConfirmBeforeSend();
                            }
                        });
                    }else{
                        this.customConfirmBeforeSend();
                    }
                }
            },
            /**
             * 自定义的确认发送提示
             * */
            customConfirmBeforeSend: function () {
                //next step
                this.confirmBeforeSend();
            },
            /**
             * 全部校验通过，发送前提示
             * */
            confirmBeforeSend: function () {
                var that = this;
                mini.confirm('确认提交您所申报的数据?','提示', function (action) {
                    if(action === 'ok'){
                        that.send();
                    }
                });
            },
            /**
             * 暂存
             * */
            tempSave: function () {
                var htmlData = this.getPreviewData();
                var formulaData = this.getFormulas();
                if(sbcommon.tempSave_normal(this.djxh, this.sbzlDm, this.sssqq, this.sssqz, htmlData, formulaData)){
                    mini.alert(this.tempSaveSuccessMsg);
                }
            },
            /**
             * 关闭页面
             * */
            closeWindow: function () {
                if (window.CloseOwnerWindow)
                    return window.CloseOwnerWindow();
                else
                    window.close();
            },
            /**
             * 暂存还原
             * */
            resume: function () {
                this.resumeHtml(mini.decode(this.resumeData['jsonData']['htmlData']));
                this.resumeFormula(mini.decode(this.resumeData['jsonData']['formulaData']));
            },
            /**
             * xml 还原到 html lizm
             */
            resumeFromXml: function () {
                //var j3xml = xmlUtil.loadFileByPath('config/j3-response.xml', 'xml');
                for (var t in this.tables) {
                    var table = new CorrectReport(this.tables[t]);
                    table.turnXmlValue2Table(this.j3CorrectXml);
                }
                this.customCorrectTable();
            },
            /**
             * 自动还原xml 到html 后，可能不能满足所有情况，可以自己写代码实现
             * lizm
             */
            customCorrectTable: function () {

            },
            /**
             * 暂存还原数据
             * */
            resumeHtml: function (doms) {
                $.each(doms,function(sb_id,dom){
                    var $pageTable = $('table[sb_id="'+sb_id+'"]');
                    if($(dom).find('span[fromMiniId]').length>0){
                        var pageTRs = $pageTable.find('tr');
                        var domTRs = $(dom).find('tr');
                        for(var i=0;i<domTRs.length;i++){
                            var $tr = $(domTRs[i]);
                            if($tr.find('span[fromMiniId]').length === 0){
                                $(pageTRs[i]).replaceWith(domTRs[i].outerHTML);
                            }else{
                                var $tds = $tr.find('td');
                                for(var j=0;j<$tds.length;j++){
                                    var $td = $($tds[j]);
                                    if($td.find('span[fromMiniId]').length === 0){
                                        $(pageTRs[i]).find('td:eq('+j+')').replaceWith($tds[j].outerHTML)
                                    }else{
                                        if($td.find('span[fromMiniId]').length>0){
                                            var $spans = $td.find('span[fromMiniId]');
                                            $.each($spans, function () {
                                                var mini_id = $(this).attr('fromMiniId');
                                                var mini_value = $(this).attr('data-value');
                                                var control = mini.get(mini_id);
                                                control.setValue(mini_value);
                                                //禁用/启用控件
                                                var ifDisabled = $(this).attr('ifDisabled');
                                                if(ifDisabled === 'Y'){
                                                    control.enable();
                                                }else if(ifDisabled === 'N'){
                                                    control.disable();
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        $pageTable.html($(dom).html());//直接替换整个table中的内容，但不替换table本身
                    }
                });
            },
            /**
             * 暂存还原公式(由于动态增加行的存在，所以必须动态增加行后的公式必须入库还原)
             * */
            resumeFormula: function (formulaData) {
                var that = this;
                $.each(this.tables, function (sb_id) {
                    that.tables[sb_id].setFormulas(formulaData[sb_id]);
                });
            },
            /**
             * 预览
             * @param {string} data html的json字符串
             * @param {string} sbxh 申报序号
             * @param {string} qqwjm 请求文件名
             * */
            preview:function(data, sbxh, qqwjm){
                var htmlData = mini.decode(data);
                var sbIds = [];//返回数据中的sb_id
                for(var id in htmlData){
                    sbIds.push(id);
                }
                this.initMiniTab(sbIds);
                $.each(htmlData,function(sb_id,dom){
                    if($(dom).find('span[fromMiniId]').length > 0){
                        var pageTRs = $('table[sb_id="'+sb_id+'"] tr');
                        var domTRs = $(dom).find('tr');
                        for(var i=0;i<domTRs.length;i++){
                            var $tr = $(domTRs[i]);
                            if($tr.find('span[fromMiniId]').length === 0){
                                $(pageTRs[i]).replaceWith(domTRs[i].outerHTML);
                            }else{
                                var $tds = $tr.find('td');
                                for(var j=0;j<$tds.length;j++){
                                    var $td = $($tds[j]);
                                    if($td.find('span[fromMiniId]').length === 0){
                                        $(pageTRs[i]).find('td:eq('+j+')').replaceWith($tds[j].outerHTML)
                                    }else{
                                        if($td.find('span[fromMiniId]').length>0){
                                            var $spans = $td.find('span[fromMiniId]');
                                            $.each($spans, function () {
                                                var mini_id = $(this).attr('fromMiniId');
                                                var mini_value = $(this).attr('data-value');
                                                var control = mini.get(mini_id);
                                                if($('#'+mini_id).hasClass('mini-checkboxlist')){//查看时，若有mini-checkboxlist组件,则保留该组件在页面上
                                                    control.setValue(mini_value);
                                                    control.readOnly = true;
                                                }else{
                                                    $('#'+mini_id).replaceWith(this.outerHTML);//否则直接替换改mini组件
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        $('table[sb_id="'+sb_id+'"]').replaceWith(dom);
                    }
                });
                $('body table[type=sb]').find('input').attr('disabled','disabled');
                $('body table[type=sb]').find('select').attr('disabled','disabled');
                $('td.enable').removeClass('enable');
                this.customInitAfterPreview(sbxh, qqwjm);
            },
            /**
             * 打印
             * */
            print:function(){
                var tabs = mini.get('tabs');
                var activeIndex = tabs.activeIndex;
                var $table = $(tabs.getTabBodyEl(activeIndex)).find('table[sb_id]');
                /*计算所有select显示宽度*/
                $table.find('input,select').each( function () {
                    if ($(this).parent('td').length > 0) {
                        var servyou_type = $(this).attr('servyou_type');
                        if($(this).is('select') || ($(this).is('input') && servyou_type && servyou_type==='string')){
                            var width = this.clientWidth;
                            $(this).attr('data-width', width + 'px');
                        }
                    }
                });
                var printHtmlClone = $table.clone();
                /*取出input中的值，替换当前input节点*/
                $(printHtmlClone).find('td>input[type="text"]').each(function(){
                    var value = $(this).val();
                    var type = $(this).attr('servyou_type');
                    var width = $(this).attr('data-width');
                    var htmlStr = '';
                    if(type && type === 'string'){
                        htmlStr += '<span class="span-wrap" style="width:'+width+';">'+value+'</span>';
                    }else{
                        htmlStr += '<span class="span-nowrap">'+value+'</span>'
                    }
                    $(this).replaceWith(htmlStr);
                });
                /*取出所有select中的值，替换当前select节点*/
                $(printHtmlClone).find("td>select").each(function () {
                    var text = $(this).find('option:selected').html();
                    var width = $(this).attr('data-width');
                    var htmlStr = '<span class="span-wrap" style="width: '+width+';">'+text+'</span>';
                    $(this).parent().html(htmlStr);
                });

                var printHtml = $(printHtmlClone)[0].outerHTML;
                LODOP=getLodop();
                var strStyleCSS='<link rel="stylesheet" type="text/css" href="../../scripts/reportSB3.0/servyouReport_print.css"/>';
                var strFormHtml ="<head>"+strStyleCSS+"</head>";
                LODOP.PRINT_INIT("报表打印");
                var id = $(printHtml).attr('id');
                var $curTable = $('#'+id);
                var tableWidth = $curTable[0].clientWidth;
                var tableBoxWidth = $curTable.parent()[0].clientWidth;
                if(tableWidth > tableBoxWidth){
                    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4"); //大表格  横向打印
                }else{
                    LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张正向打印 第一个参数 1正向，2横向
                }
                strFormHtml += "<body>"+printHtml+"</body>";
                LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);// 1正向显示，0横向显示
                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); // Auto-Width 整宽不变形
                LODOP.SET_PREVIEW_WINDOW(2,0,0,0,0,"报表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
                LODOP.ADD_PRINT_HTM("1mm", "1mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
                LODOP.PREVIEW(); // 打开打印预览窗口
            },
            /**
             * 获取input数据，用于解决转报文时，数据型的input无数据val()出来为空的问题
             * */
            getInputValue: function ($target) {
                /*若$target不存在或者不是数组或者数组长度为0，都统一返回''，若有特殊的，则在各自js中处理*/
                if(!$target || !$target instanceof Array || $target.length === 0){
                    return '';
                }
                var type = $target.attr('servyou_type');
                var digit = $target.attr("digit");
                if(!digit || isNaN(digit)){
                    digit = 2;
                }else{
                    digit = parseInt(digit);
                }
                var value = 0;
                var curVal = $target.val();//当前input的值{string}
                var fixedZero = Number(0).toFixed(digit);
                if(type === "percent"){//百分数
                    curVal = curVal.replace(/%$/g,'');
                    value = isNaN(curVal) || Number(curVal)<0 ? Number(0).toFixed(digit+2):(Number(curVal)/100).toFixed(digit+2);
                }else if(type==="milli"){
                    curVal = curVal.replace(/‰$/g,'');
                    value = isNaN(curVal) || Number(curVal)<0 ? Number(0).toFixed(digit+3):(Number(curVal)/100).toFixed(digit+3);
                }else if(type === 'string' || type === 'date'){
                    value = curVal;
                }else{
                    value = curVal && !isNaN(curVal) ? curVal : fixedZero;
                }
                return value;
            },
            /**
             * 根据id数据导入
             * */
            loadData: function(json){
                if(typeof json === 'object' && typeof json !== 'array'){
                    $.each(json,function (sb_id, data) {
                        if($('#table_'+sb_id).length > 0){
                            $.each(data, function (id,val) {
                                var $dom = $('#'+id);
                                if($dom.attr('class') && $dom.attr('class').indexOf('mini-') !== -1){//miniui组件
                                    mini.get(id).setValue(val);
                                }else if($dom.is('input')){//input
                                    var type = $dom.attr('type');
                                    if(type === 'text'){
                                        $dom.val(val).attr('value',val).change().blur();
                                    }else if(type === 'checkbox' || type === 'radio'){
                                        var tempVals = [1,'1','y','Y',true,'true'];
                                        if(tempVals.indexOf(val) !== -1){
                                            $dom.click().change().blur();//事件必须按顺序触发
                                        }else{
                                            $dom.removeAttr('checked').change().blur();
                                        }
                                    }
                                }else if($dom.is('select')){//select
                                    $dom.val(val).change().blur();
                                }
                            });
                        }
                    });
                }else{
                    mini.alert('导入数据格式不正确！');
                }
            },
            mockApi: {
                nsrData: 'config/nsrData.json',
                hd: 'config/hd.json'
            },
            getLocalJson: function (url) {
                var json = null;
                ajax.get(url,'',function (response) {
                    json = response;
                    return true;
                },function () {
                    mini.alert('获取本地数据失败！');
                    return false;
                });
                return json;
            },
            /**
             * 格式化所有input中的数据,
             * 允许传参，只格式化对应sb_id那张表的数据
             * */
            formatAllInputValue: function (sb_id) {
                $.each(this.tables, function (curSbid, table) {
                    if(sb_id && sb_id !== curSbid){
                        return ;
                    }
                    table.formatAllInputValue();
                });
            },
            /**
             * 根据行列自动生成所有input和select的id
             * 若sb_id存在，则只为某一张表添加id
             * */
            setIdForAllInputAndSelect: function(sb_id){
                if(sb_id){
                    var $tables = $('table[sb_id="'+sb_id+'"]');
                }else{
                    var $tables = $('table[type="sb"]');
                }
                $tables.each(function () {
                    var $trs = $(this).find('tr');
                    var sb_id = $(this).attr('sb_id');
                    var $containDomTds = $(this).find('td>input,td>select').parent();
                    $.each($containDomTds, function(){
                        var trIndex = $trs.index($(this).parent());
                        var tdIndex = $(this).index();
                        var id = sb_id+'_'+trIndex+'_'+tdIndex;
                        var $innerDoms = $(this).find('>input,>select');
                        var inputCount = $innerDoms.length;
                        if(inputCount === 1){
                            $(this).find('>input,>select').attr('id',id);
                        }else if(inputCount > 1){
                            $.each($innerDoms, function (i,dom) {
                                $(this).attr('id',id+'_'+i);
                            })
                        }
                    });
                });
            },
            /**
             * 加载html模板
             * */
            _loadTabTemplate: function (url) {
                var html='';
                $.ajax({
                    url: url,
                    type: 'GET',
                    async: false,
                    dataType: 'html',
                    success: function (response) {
                        html = response;
                    },
                    error: function () {
                        console.log('加载html出错');
                    }
                });
                return html;
            },
            /**
             * 校验当次提交与上次提交的时间间隔，用到cookie是为了在重开页面的情况下同样要做到校验
             * */
            checkSubmitTime: function () {
                var lastSubmitTime = $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh);
                var _this = this;
                if(!lastSubmitTime){
                    return true;
                }
                var curSubmitTime = new Date().getTime();
                var restTime = Math.floor(this.timerTemp-(curSubmitTime-lastSubmitTime)/1000);//剩余时间
                if(restTime >= 0 ){
                    var tip = '秒后可再次'+this.getBtnConfig('sb_save').text;
                    this.timerBoxId = mini.showMessageBox({
                        title: '提示',
                        buttons: ["ok"],
                        html: '<span id="timer" class="txt-red" style="font-size: 14px;"><span id="timer-seconds">'+restTime+'</span>'+tip+'</span>',
                        callback: function(){
                            window.clearInterval(_this.timer);
                        }
                    });
                    this.runTimer(restTime);
                    return false;
                }
                return true;
            },
            /**
             * 计时器
             * */
            runTimer: function (restTime) {
                var _this = this;
                this.timer = setInterval(function () {
                    restTime--;
                    $('#timer-seconds').text(restTime);
                    if(restTime === -1){
                        window.clearInterval(_this.timer);
                        $.removeCookie('lastSubmitTime_'+_this.sbzlDm+'_'+_this.djxh);//删除cookie
                        mini.hideMessageBox(_this.timerBoxId);
                    }
                },1000)
            }
        };
        /**
         * 移除所有报错样式
         * */
        var _removeAllErrors = function () {
            $('.report_error').removeClass('report_error');
        };

        return report;
    })();

    return servyouReport;

}));


var CorrectReport = function (Table) {
    var gzsb = Table;
    gzsb.setJ3Xml();
    gzsb.setCfgBody();
    gzsb._cache = gzsb.getTableCache();
    gzsb._$curTable = gzsb.getCurrentTableDom();
    var api = {
        /**
         * 去除数组空元素
         * @param arr
         * @returns {Array}
         * @private
         */
        _ArrGrep: function (arr) {
            if (!$.isArray(arr)) return [];
            var tempArr = [];
            $.each(arr, function (i, v) {
                !!v && tempArr.push(v);
            });
            return tempArr;
        },
        /**
         *  生成数组
         * @param s
         * @param e
         * @returns {Array}
         * @private
         */
        _makeArr: function (s, e) {
            return gzsb.makeArr(s,e);
        },
        /**
         * record 转 json
         * @param record
         * @returns {{}}
         * @private
         */
        _turnToJson: function (record) {
            return gzsb.turnToJson(record);
        },
        /**
         * 根据类型获取值
         * */
        _getValueByType: function ($target) {
            return gzsb.getValueByType($target);
        },
        /**
         * 根据类型设置值
         * @param $target
         * @param val
         * @private
         */
        _setValueByType: function ($target, val) {
            gzsb.setValueByType($target, val);
        },
        /**
         * 自动转页面单元格值到金三报文xml
         * @returns {Array}
         * @private
         */
        _changeXml: function () {
            var that = this;
            var Records = gzsb._cache['Body'];
            if (Records.length === 0) {
                return [];
            }
            $.each(Records, function (i, record) {
                var jsonXml = that._turnToJson(record),   //转换成json格式
                    name = jsonXml['HeadName'],
                    xmlAsCol = jsonXml['XmlAsCol'],
                    location = that.get_XML_Loction_By_J3XML(name);
                var tdLocal = that.getTDArr(jsonXml);
                var type = jsonXml['DataType'] || 'DT_String';
                var start = parseInt(jsonXml['XmlSRow']),
                    end = parseInt(jsonXml['XmlERow']),
                    data,
                    index = 0,
                    tdDom;
                if (end < 0) {
                    end = location.length - 1;
                }
                var nodeRange = that._ArrGrep(jsonXml['NodeRange'].split(','));
                if (jsonXml['NodeRange'].indexOf('..') > 0) {
                    var temparr = that._ArrGrep(jsonXml['NodeRange'].split('..'));
                    nodeRange = that._makeArr(temparr[0], temparr[1]);
                }
                var resu = true;
                if (location.length > 1) {
                    for (var i = start; i < end + 1; i++) {
                        var j = 0;
                        $.each(nodeRange, function (k, v) {
                            if (!!xmlAsCol) {
                                tdDom = tdLocal['data' + (i + 1)][j];
                                j++;
                            } else {
                                tdDom = tdLocal['data' + (k + 1)][index];
                            }

                            resu = that.checkDataType(tdDom, type);
                            if (!resu) {
                                resu = false;
                                return false;
                            }
                            data = that.getTDValue(tdDom);
                            if (data === '--') {
                                data = '';
                            }
                            $(location).eq(i).children().eq(v).text(data);
                        });
                        index = index + 1;
                        if (!resu) {
                            break;
                        }
                    }
                    return resu;
                } else {
                    $.each(nodeRange, function (k, v) {
                        tdDom = !!xmlAsCol ? tdLocal['data1'][0] : tdLocal['data' + (k + 1)][index];
                        resu = that.checkDataType(tdDom, type);
                        if (!resu) {
                            resu = false;
                            return false;
                        }
                        data = that.getTDValue(tdDom);
                        if (data === '--') {
                            data = '';
                        }

                        $(location).eq(0).children().eq(v).text(data);
                    });
                    index = index + 1;
                    return resu;
                }
            });
        },
        /**
         * 将 金三报文的数据回写到页面单元格
         * @returns {Array}
         * @private
         */
        _pushData: function () {

            var that = this;
            var Records = gzsb._cache['Body'];
            if (Records.length === 0) {
                return [];
            }

            $.each(Records, function (i, record) {
                var jsonXml = that._turnToJson(record),   //转换成json格式
                    name = jsonXml['HeadName'],
                    xmlAsCol = jsonXml['XmlAsCol'],
                    location = that.get_XML_Loction_By_J3XML(name);
                var tdLocal = that.getTDArr(jsonXml);
                var start = parseInt(jsonXml['XmlSRow']),
                    end = parseInt(jsonXml['XmlERow']),
                    data,
                    index = 0,
                    tdDom;
                if (end < 0) {
                    end = location.length - 1;
                }
                if (jsonXml['Col'] && jsonXml['Row']) {
                    var dom = that.getTD(jsonXml['Col'], jsonXml['Row']);
                    var val = $(location).text();
                    that.setTDValue(dom, val);
                    return true;
                }
                var nodeRange = jsonXml['NodeRange'] ? that._ArrGrep(jsonXml['NodeRange'].split(',')) : [0];
                if (jsonXml['NodeRange'].indexOf('..') > 0) {
                    var temparr = that._ArrGrep(jsonXml['NodeRange'].split('..'));
                    nodeRange = that._makeArr(temparr[0], temparr[1]);
                }
                if (location.length > 1) {
                    for (var i = start; i < end + 1; i++) {
                        var j = 0;
                        $.each(nodeRange, function (k, v) {
                            if (!!xmlAsCol) {
                                tdDom = tdLocal['data' + (i + 1)][j];
                                j++;
                            } else {
                                tdDom = tdLocal['data' + (k + 1)][index];
                            }

                            var newData = $(location).eq(i).children().eq(v).text();
                            that.setTDValue(tdDom, newData);
                            //that.setTDReadonly(tdDom)
                        });
                        index = index + 1;
                    }
                } else {
                    $.each(nodeRange, function (k, v) {
                        tdDom = !!xmlAsCol ? tdLocal['data1'][0] : tdLocal['data' + (k + 1)][index];
                        var value = $(location).eq(0).children().eq(v).text();
                        that.setTDValue(tdDom, value);
                        //that.setTDReadonly(tdDom)
                    })
                }
            })
        },
        /**
         * 解析金三报文，获取每一个报文节点的index位置
         * @param str
         * @returns {*}
         */
        get_XML_Loction_By_J3XML: function (str) {
            var nameArr = this._ArrGrep(str.split('.'));
            var result = gzsb._j3xml;
            if (arguments.length === 2) {
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
            });
            if ($(result).children().length === 0) return $(result);
            return $(result).children();
        },
        /**
         * 解析record，获取单元格 td 数组
         * @param cfg
         * @returns {{data1: Array, data2: Array}}
         */
        getTDArr: function (cfg) {
            var result = {data1: [], data2: []},
                that = this;
            if (typeof cfg === 'object') {
                var colArr = [];
                if (cfg['CellColRange']) {
                    var temp;
                    if (cfg['CellColRange'].indexOf('..') > 0) {
                        temp = cfg['CellColRange'].split('..');//MakeArr
                        $.merge(colArr, that._makeArr(temp[0], temp[1]));
                    } else {
                        $.merge(colArr, that._ArrGrep(cfg['CellColRange'].split(',')));
                    }

                }
                var rowStart = parseInt(cfg['CellSRow']);
                var rowEnd = parseInt(cfg['CellERow']);
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
            return result;
        },
        /**
         * 获取页面单元格td
         * @param col
         * @param row
         * @returns {boolean|*}
         */
        getTD: function (col, row) {
            var $table = gzsb._$curTable;
            var $tr = $table.find('tr');
            var _col,
                _row;
            if (arguments.length === 2) {
                _col = parseInt(col);
                _row = parseInt(row);
            } else {
                var fnum = arguments[0];
                var _char = fnum.match(/[A-Z]/g).join('');
                _row = fnum.replace(_char, '') - 1;
                _col = _char.charCodeAt() - 65;
            }
            return $tr.eq(_row).find('td').eq(_col);
        },
        /**
         * 检查页面填写的值是否是指定类型
         * @param dom
         * @param type
         * @returns {boolean}
         */
        checkDataType: function (dom, type) {
            var value = this.getTDValue(dom);
            if (type === 'DT_Num' && dom.find('input').length > 0) {
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
        /**
         * 设置单元格的值
         * @param obj
         * @param val
         */
        setTDValue: function (obj, val) {
            this._setValueByType(obj.children(), val)
        },
        /**
         * 保留两位小数
         * @param dom
         */
        fixTo: function (dom) {
            var value = this.getTDValue(dom);
            value = parseFloat(value).toFixed(2);
            this.setTDValue(dom, value);
        },
        /**
         * 获取单元格的值
         * @param dom
         * @returns {*}
         */
        getTDValue: function (dom) {
            if (typeof dom !== 'object') return false;
            var value;
            if (dom.children().length === 0) {
                return dom.html();
            }
            value = this._getValueByType(dom.children(), arguments[1]);
            return value;
        }
    };

    /**
     * 金三xml报文回写到页面table
     * @param xml，金三报文
     * @returns {*}
     */
    this.turnXmlValue2Table= function (xml) {
        gzsb['_j3xml'] = xml;
        return api._pushData();
    };
    /**
     * 自动转报文，页面上单元格的值转到金三报文xml
     * @returns {*}
     */
    this.changeTdValue2J3Xml= function () {
        return api._changeXml();
    };
    /**
     * 获取自动转好的报文
     * 自动转报文是通用理想情况，有时候需要特殊处理
     * @returns {*}
     */
    this.getChagedJ3Xml= function () {
        return gzsb._j3xml;
    }
};


/**
 * 监听disabled属性变化
 * */
;(function ($) {
    var $_fn_removeAttr = $.fn.removeAttr;
    var $_fn_attr = $.fn.attr;
    $.fn.extend({
        removeAttr : function(attr){
            var returnVal = $_fn_removeAttr.call(this, attr);
            if(attr === "disabled"){
                this.trigger("disabledRemoved", attr);
            }
            if(attr === "readonly"){
                this.trigger("readonlyRemoved", attr);
            }
            return returnVal;
        },
        attr : function(){
            if(arguments.length === 2 && arguments[0] === "disabled"){
                this.trigger("disabledChanged", arguments);
            }
            if(arguments.length === 2 && arguments[0] === "readonly"){
                this.trigger("readonlyChanged", arguments);
            }
            var returnVal = $_fn_attr.apply(this, arguments);
            return returnVal;
        }
    })
})(jQuery);
$(function () {
    $("body").on('disabledRemoved', "input:not(.mini-textbox-input,.mini-buttonedit-input),select", function(e, attr) {
        if (attr === "disabled") {
            $(this).parent().addClass("enable");
        }
    }).on("disabledChanged", "input:not(.mini-textbox-input,.mini-buttonedit-input),select", function(e, attr, value) {
        if (value === "disabled") {
            $(this).parent().removeClass("enable");
        } else if (value === false) {
            $(this).parent().addClass("enable");
        }
    });
    $("body").on('readonlyRemoved', "input:not(.mini-textbox-input,.mini-buttonedit-input),select", function(e, attr) {
        if (attr === "readonly") {
            $(this).parent().addClass("enable");
        }
    }).on("readonlyChanged", "input:not(.mini-textbox-input,.mini-buttonedit-input),select", function(e, attr, value) {
        if (value === "readonly") {
            $(this).parent().removeClass("enable");
        }
    });
});
/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-08-17
 * Time: 16:40
 * Description:
 */

/*河北没有暂存*/
servyouReport.removeReportBtnById('sb_tempSave');