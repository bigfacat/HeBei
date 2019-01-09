using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.yhs_web.api.basecode.yzpzzl
{
    /// <summary>
    /// list 的摘要说明
    /// </summary>
    public class list : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string  json = File.ReadAllText(context.Server.MapPath("list.json"));
            
            context.Response.ContentType = "text/json";
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