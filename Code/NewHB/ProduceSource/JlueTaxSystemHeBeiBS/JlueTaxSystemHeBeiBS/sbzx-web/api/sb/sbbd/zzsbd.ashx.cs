using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.sbbd
{
    /// <summary>
    /// zzsbd 的摘要说明
    /// </summary>
    public class zzsbd : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var re_json = System.IO.File.ReadAllText(context.Server.MapPath("zzsbd.json"));
            context.Response.ContentType = "text/plain";
            context.Response.Write(re_json);
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