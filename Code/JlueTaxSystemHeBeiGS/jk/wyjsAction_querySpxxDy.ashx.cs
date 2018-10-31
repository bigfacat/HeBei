using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.jk
{
    /// <summary>
    /// wyjsAction_querySpxxDy 的摘要说明
    /// </summary>
    public class wyjsAction_querySpxxDy : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/jk/wyjsAction_querySpxxDy.json"));
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