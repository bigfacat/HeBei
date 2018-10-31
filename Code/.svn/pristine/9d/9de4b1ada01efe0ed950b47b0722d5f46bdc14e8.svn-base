using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.jgcx
{
    /// <summary>
    /// sbqkcx 的摘要说明
    /// </summary>
    public class sbqkcx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("sbqkcx.json"));
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