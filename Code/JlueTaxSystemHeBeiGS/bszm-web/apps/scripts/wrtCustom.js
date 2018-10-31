/**
 * Created with JetBrains WebStorm
 * Author: lizm
 * Date: 2017-11-22
 * Time: 20:56
 * Description:
 */

function allFunctions(){//获取全部功能列表
    return doAjax('/api/desktop/wrt/allFunctions/get','GET');
}