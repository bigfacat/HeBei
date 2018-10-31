using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.wszx_web.api.wssq.cx.getSqxxBySqxh
{
    /// <summary>
    /// _2f2d46d8e9b5440b8e524f1ef07cb189 的摘要说明
    /// </summary>
    public class _2f2d46d8e9b5440b8e524f1ef07cb189 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/2f2d46d8e9b5440b8e524f1ef07cb189.json"));
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