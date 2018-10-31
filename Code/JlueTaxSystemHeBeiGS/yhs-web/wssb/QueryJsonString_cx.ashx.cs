using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.yhs_web.wssb
{
    /// <summary>
    /// QueryJsonString_cx 的摘要说明
    /// </summary>
    public class QueryJsonString_cx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = "";
            String param3 = (context.Request.Params["param3"] == null ? "" : context.Request.Params["param3"].ToString());
            switch (param3)
            {
                case "25":
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/QueryJsonString_cx_25.json"));
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(json);
                    return;
                case "26":
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/QueryJsonString_cx_26.json"));
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(json);
                    return;
                case "27":
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/QueryJsonString_cx_27.json"));
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(json);
                    return;
                case "01":
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/QueryJsonString_cx_01.json"));
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(json);
                    return;
            }
            
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