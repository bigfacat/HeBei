using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.yhs_web.wssb
{
    /// <summary>
    /// UitlQueryJsonString 的摘要说明
    /// </summary>
    public class UitlQueryJsonString : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/UitlQueryJsonString.json"));
            context.Response.ContentType = "text/plain";
            context.Response.Write(json);
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