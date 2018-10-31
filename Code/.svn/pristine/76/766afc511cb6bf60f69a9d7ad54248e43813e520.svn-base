using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.sbzx_web.api.sb.fpxxtq
{
    /// <summary>
    /// queryFpHzxx 的摘要说明
    /// </summary>
    public class queryFpHzxx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sbzx-web/api/sb/fpxxtq/queryFpHzxx.json"));
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