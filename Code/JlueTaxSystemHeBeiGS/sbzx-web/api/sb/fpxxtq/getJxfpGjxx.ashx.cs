using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.sbzx_web.api.sb.fpxxtq
{
    /// <summary>
    /// getJxfpGjxx 的摘要说明
    /// </summary>
    public class getJxfpGjxx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/getJxfpGjxx.json"));
            context.Response.ContentType = "application/json";
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