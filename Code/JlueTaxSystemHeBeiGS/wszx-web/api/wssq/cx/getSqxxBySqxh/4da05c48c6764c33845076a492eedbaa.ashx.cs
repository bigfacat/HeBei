using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.wszx_web.api.wssq.cx.getSqxxBySqxh
{
    /// <summary>
    /// _4da05c48c6764c33845076a492eedbaa 的摘要说明
    /// </summary>
    public class _4da05c48c6764c33845076a492eedbaa : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/4da05c48c6764c33845076a492eedbaa.json"));
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