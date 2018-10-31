using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wyjk
{
    /// <summary>
    /// wyjsAction_searchWjsJl 的摘要说明
    /// </summary>
    public class wyjsAction_searchWjsJl : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wyjk/wyjsAction_searchWjsJl.json"));
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