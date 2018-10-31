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
    /// queryJxfpMx 的摘要说明
    /// </summary>
    public class queryJxfpMx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = "";
            String fpld = "";
            String jsonresult = "";
            String pageUrl = "";
            
            using (StreamReader sr = new StreamReader(context.Request.InputStream))
            {
                json = sr.ReadLine();
                JObject tempo = JObject.Parse(json);
                fpld = (tempo["fplb"] == null ? "" : tempo["fplb"].ToString());
                if (fpld == "1")
                {

                    pageUrl = (tempo["pageUrl"] == null ? "" : tempo["pageUrl"].ToString());
                    jsonresult = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/queryJxfpMx_" + fpld + "_" + pageUrl + ".json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(jsonresult);
                    return;

                }
                jsonresult = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/queryJxfpMx_" + fpld + ".json"));
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