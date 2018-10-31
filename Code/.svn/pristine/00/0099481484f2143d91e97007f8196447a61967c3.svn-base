this.SUI = {};
this.SUI.store = (function () {
    var api = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        sessionStorageName = 'sessionStorage',
        globalStorageName = 'globalStorage',
        storage,
        _storage;

    api.set = function (key, value) { };
    api.get = function (key) { };
    api.remove = function (key) { };
    api.clear = function () { };
    /**
     * 添加sessionStorage方法
     * by liun 2017.11.18
     * @param key
     * @param value
     */
    api.setSession = function (key, value) { };
    api.getSession = function (key) { };
    api.removeSession = function (key) { };
    api.clearSession = function () { };

    /**
     * sessionStorage
     */
    if (sessionStorageName in win && win[sessionStorageName]) {
        _storage = win[sessionStorageName];
        api.setSession = function (key, val) { _storage.setItem(key, val) };
        api.getSession = function (key) { return _storage.getItem(key) };
        api.removeSession = function (key) { _storage.removeItem(key) };
        api.clearSession = function () { _storage.clear() };
    }
    if (localStorageName in win && win[localStorageName]) {
        storage = win[localStorageName];
        api.set = function (key, val) { storage.setItem(key, val) };
        api.get = function (key) { return storage.getItem(key) };
        api.remove = function (key) { storage.removeItem(key) };
        api.clear = function () { storage.clear() };
        api.isReady = true;

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage = win[globalStorageName][win.location.hostname];
        api.set = function (key, val) { storage[key] = val };
        api.get = function (key) { return storage[key] && storage[key].value };
        api.remove = function (key) { delete storage[key] };
        api.clear = function () { for (var key in storage) { delete storage[key] } };
        api.isReady = true;
    } else if (doc.documentElement.addBehavior) {
        api.swfReady = function () {

            api.isReady = true;
        }

        api.cross = function () { return false };  // 配置跨域信息
        //api的 其他方法由flash 提供。
        api._get_browser = function () {
            var ua = navigator.userAgent.toLowerCase();
            if (window.ActiveXObject) { return "ie" };
            if (/firefox/i.test(ua)) { return "firefox" };
            if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) { return "chrome" };
            if (window.opera) { return "opera" };
            if (window.openDatabase) { return "safari" };
            return "other";
        }

        function loadSwf() {
            var scripts = document.getElementsByTagName('script');
            var swfFile = "";
            for (var i = 0, l = scripts.length; i < l; i++) {
                if (/store\.js/.test(scripts[i].src)) {
                    var src = scripts[i].src;
                    swfFile = src.replace(/[^/]*store\.js.*$/, 'Rookie.swf');
                    break;
                }
            }


            if ((/http:\/\//i).test(swfFile) && swfFile.indexOf(window.location.host) == -1) { api.cross = true; }

            swfFile += "?" + Math.floor(Math.random() * 100000);

            var flash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="rookieswf"><param name="movie" value="' + swfFile + '" /><param name="allowScriptAccess" value="always" /><embed src="' + swfFile + '" width="1" height="1" name="rookieswf" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            var flashCont = document.createElement("div");
            function getSWF(movieName) {
                if (window.document[movieName]) {
                    return window.document[movieName];
                } else {
                    return document.getElementById(movieName);
                }
            }
            (function () {
                if (document.body) {
                    flashCont.innerHTML = flash;
                    document.body.insertBefore(flashCont, document.body.firstChild);
                    var obj = getSWF('rookieswf');
                    api.set = function (key, val) {
                        obj.set(key, val);
                    }
                    api.get = function (key) {
                        return obj.get(key);
                    }
                    api.remove = function (key) {
                        obj.remove(key);
                    }

                    api.clear = function () {
                        obj.clear();
                    }

                } else {
                    setTimeout(arguments.callee, 15);
                }
            })();

        };
        loadSwf();
    }
    return api;
})();