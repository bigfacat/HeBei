using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.bszm_web.api.desktop.customizedFunctions
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string url = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + ":" + HttpContext.Current.Request.Url.Port+ "/sbzx-web/apps/views/gdsSbjgcx/sbjgcx.html?code=sbjgcx&id=30&_lot=1539936594180&_t=1539936804000";
      
            var result = File.ReadAllText(context.Server.MapPath("get.json"));
            result=result.Replace("@@url", url);
            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}