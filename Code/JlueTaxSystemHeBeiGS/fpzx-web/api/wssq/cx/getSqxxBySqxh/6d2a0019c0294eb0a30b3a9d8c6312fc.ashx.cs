using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.fpzx_web.api.wssq.cx.getSqxxBySqxh
{
    /// <summary>
    /// _6d2a0019c0294eb0a30b3a9d8c6312fc 的摘要说明
    /// </summary>
    public class _6d2a0019c0294eb0a30b3a9d8c6312fc : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/fpzx-web/json/6d2a0019c0294eb0a30b3a9d8c6312fc.json"));
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