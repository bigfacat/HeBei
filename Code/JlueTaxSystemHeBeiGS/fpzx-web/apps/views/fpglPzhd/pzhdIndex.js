/*
* @Author: sunml
* @Date:   2017-03-14 15:00:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-03-17 20:14:05
*/

'use strict';
//是否存在票种核定，存在票种核定就进行票种调整，不存在就去进行票种核定，如果success为false关闭页面
pzhdService.isExistPzhd().then(function(data) {
  //存在票种核定且可以进行调整
    if(data.success){
        if (data.value === "true") {
            window.location.href="/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?bz=tz&code=110208&id=10";
            return;
            // pzhd.isExistPzhds = true;
            // pzhd.isExistPzhdsTz = true;
        }else{
            window.location.href="/fpzx-web/apps/views/fpglPzhd/pzhd.aspx?code=110207&id=58";
          }
    }else{
        alert(data.message);
        window.close();
    }
});
