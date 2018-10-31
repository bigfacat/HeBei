using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.gzcx
{
    /// <summary>
    /// gzcxAction_queryNsrzglx 的摘要说明
    /// </summary>
    public class gzcxAction_queryNsrzglx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/gzcx/gzcxAction_queryNsrzglx.json"));
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