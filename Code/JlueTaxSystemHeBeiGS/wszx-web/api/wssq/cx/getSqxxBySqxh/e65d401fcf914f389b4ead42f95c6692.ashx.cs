using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.wszx_web.api.wssq.cx.getSqxxBySqxh
{
    /// <summary>
    /// e65d401fcf914f389b4ead42f95c6692 的摘要说明
    /// </summary>
    public class e65d401fcf914f389b4ead42f95c6692 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/e65d401fcf914f389b4ead42f95c6692.json"));
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