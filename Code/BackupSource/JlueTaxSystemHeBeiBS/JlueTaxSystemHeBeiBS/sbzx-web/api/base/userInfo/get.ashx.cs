using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.@base.userInfo
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler {

        public void ProcessRequest (HttpContext context) {
            var result = File.ReadAllText(context.Server.MapPath("get.json"));
            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
        }
     
        public bool IsReusable {
            get {
                return false;
            }
        }
    }
}