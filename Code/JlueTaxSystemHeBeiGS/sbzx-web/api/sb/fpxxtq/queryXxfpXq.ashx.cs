using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace JlueTaxSystemHeBeiGS.sbzx_web.api.sb.fpxxtq
{
    /// <summary>
    /// queryXxfpXq 的摘要说明
    /// </summary>
    public class queryXxfpXq : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = "";
            String fphm = "";
            String jsonresult = "";
            using (StreamReader sr = new StreamReader(context.Request.InputStream))
            {
                json = sr.ReadLine();
                JObject tempo = JObject.Parse(json);
                fphm = (tempo["fphm"] == null ? "" : tempo["fphm"].ToString());
                if (fphm != "" && fphm != null)
                {
                    jsonresult = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/queryXxfpXq_"+fphm+".json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(jsonresult);
                    return;
                }
                jsonresult = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/queryXxfpXq.json"));
                context.Response.ContentType = "application/json";
                context.Response.Write(jsonresult);
            }
                
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