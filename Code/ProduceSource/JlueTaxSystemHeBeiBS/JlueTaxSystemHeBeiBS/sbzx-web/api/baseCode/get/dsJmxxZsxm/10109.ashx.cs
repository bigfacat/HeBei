using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.baseCode.get.dsJmxxZsxm
{
    /// <summary>
    /// _10109 的摘要说明
    /// </summary>
    public class _10109 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("10109.json"));
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