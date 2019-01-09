using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.yhs_web.api.sbcx
{
    /// <summary>
    /// getSbbmx 的摘要说明
    /// </summary>
    public class getSbbmx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string sbzlDm;
            sbzlDm = context.Request["sbzlDm"].Trim().ToString();
            var data = File.ReadAllText(context.Server.MapPath("getSbbmx.html"));

            //data = data.Replace("@@data", JsonConvert.SerializeObject(applst)).Replace("\"[", "[").Replace("]\"", "]");
            context.Response.ContentType = "text/html";
            context.Response.Write(data);
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