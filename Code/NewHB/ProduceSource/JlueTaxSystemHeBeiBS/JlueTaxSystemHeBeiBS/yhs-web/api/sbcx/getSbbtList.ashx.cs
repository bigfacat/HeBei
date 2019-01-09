using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.yhs_web.api.sbcx
{
    /// <summary>
    /// getSbbtList 的摘要说明
    /// </summary>
    public class getSbbtList : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
         string    data = File.ReadAllText(context.Server.MapPath("getSbbtList.json"));

            //data = data.Replace("@@data", JsonConvert.SerializeObject(applst)).Replace("\"[", "[").Replace("]\"", "]");
            context.Response.ContentType = "text/json";
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