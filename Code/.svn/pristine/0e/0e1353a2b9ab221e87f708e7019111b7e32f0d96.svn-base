using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
namespace JlueTaxSystemHeBeiBS.wszx_web.api.wjdc
{
    /// <summary>
    /// checkWjdcCyxx 的摘要说明
    /// </summary>
    public class checkWjdcCyxx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("checkWjdcCyxx.json"));
            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
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