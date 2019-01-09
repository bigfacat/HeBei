using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.ysbqc
{
    /// <summary>
    /// queryysb 的摘要说明
    /// </summary>
    public class queryysb : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string re_json = "";
            string str = System.IO.File.ReadAllText(context.Server.MapPath("queryysb.json"));
            re_json = str;
            context.Response.ContentType = "text/plain";
            context.Response.Write(re_json);
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