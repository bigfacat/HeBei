using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.hlcj
{
    /// <summary>
    /// hljcxx_queryYgzSjcjMain 的摘要说明
    /// </summary>
    public class hljcxx_queryYgzSjcjMain : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/hlcj/hljcxx_queryYgzSjcjMain.json"));
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