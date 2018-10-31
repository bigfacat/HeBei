this.SUI = {};
this.SUI.store = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        sessionStorageName  = 'sessionStorage',
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage,lStorage;

    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};

    // added by lizm 2016-11-23 setLocal 用于直接写进localStorage
    api.setLocal = function (key, value) {};

    if(localStorageName in win && win[localStorageName]){
        lStorage    = win[localStorageName];
        api.setLocal    = function (key, val) { lStorage.setItem(key, val) };
    }//end

    if (sessionStorageName in win && win[sessionStorageName]) {
        storage    = win[sessionStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        // modified by lizm 2016-11-23
        api.get = function (key) {
            var val = storage.getItem(key) ? storage.getItem(key) : lStorage.getItem(key);
            return  val
        };
        api.remove = function (key) {
            storage.removeItem(key);
            if(lStorage.getItem(key)) {
                lStorage.removeItem(key)
            }
        };
        api.clear = function () {
            storage.clear();
            lStorage.clear()
            
        };//end
        api.isReady = true;

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };
        api.isReady = true;
    } else if (doc.documentElement.addBehavior) {
        api.swfReady = function(){
            
            api.isReady = true;
        }

        api.cross = function(){return false};  // 配置跨域信息
        //api的 其他方法由flash 提供。
        api._get_browser = function(){
            var ua = navigator.userAgent.toLowerCase();
            if(window.ActiveXObject){return "ie"};
            if(/firefox/i.test(ua)){return "firefox"};
            if(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)){return "chrome"};
            if(window.opera){return "opera"};
            if(window.openDatabase){return "safari"};
            return "other";
        }

        function loadSwf(){
            var scripts = document.getElementsByTagName('script');
            var swfFile = "";
            for(var i = 0, l = scripts.length; i < l; i++){
                if(/store\.js/.test(scripts[i].src)){
                    var src = scripts[i].src;
                    swfFile = src.replace(/[^/]*store\.js.*$/,'Rookie.swf');
                    break;
                }
            }


            if((/http:\/\//i).test(swfFile)&&swfFile.indexOf(window.location.host)==-1){api.cross=true;}

            swfFile+="?"+Math.floor(Math.random()*100000);

            var flash='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="rookieswf"><param name="movie" value="'+swfFile+'" /><param name="allowScriptAccess" value="sameDomain" /><embed src="'+swfFile+'" width="1" height="1" name="rookieswf" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            var flashCont=document.createElement("div");
            function getSWF(movieName){
                if (window.document[movieName]){
                    return window.document[movieName];
                }else{
                    return document.getElementById(movieName);
                }
            }
            (function(){
                if(document.body){
                    flashCont.innerHTML=flash;
                    document.body.insertBefore(flashCont,document.body.firstChild);
                    var obj = getSWF('rookieswf');
                    api.set = function(key, val){
                        obj.set(key, val);
                    }
                    api.get = function(key){
                       return obj.get(key);
                    }
                    api.remove = function(key){
                        obj.remove(key);
                    }

                    api.clear = function(){
                        obj.clear();
                    }

                }else{
                    setTimeout(arguments.callee,15);
                }
            })();

        };
        loadSwf();
    }
    return api;
})();