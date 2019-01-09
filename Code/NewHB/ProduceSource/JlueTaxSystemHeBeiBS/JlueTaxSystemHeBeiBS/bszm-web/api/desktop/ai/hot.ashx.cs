using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
namespace JlueTaxSystemHeBeiBS.bszm_web.api.desktop.ai
{
    /// <summary>
    /// hot 的摘要说明
    /// </summary>
    public class hot : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("hot.json"));
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