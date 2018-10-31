using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.sbzx_web.api.sb.fpxxtq
{
    /// <summary>
    /// getYcfpxx 的摘要说明
    /// </summary>
    public class getYcfpxx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sbzx-web/api/sb/fpxxtq/getYcfpxx.json"));
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