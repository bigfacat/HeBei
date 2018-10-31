using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.sb
{
    /// <summary>
    /// sbcommon_getFjsSbQybz 的摘要说明
    /// </summary>
    public class sbcommon_getFjsSbQybz : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sb/sbcommon_getFjsSbQybz.json"));
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