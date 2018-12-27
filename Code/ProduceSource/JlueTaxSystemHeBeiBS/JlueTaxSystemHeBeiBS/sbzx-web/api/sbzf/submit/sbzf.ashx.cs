using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sbzf.submit
{
    /// <summary>
    /// sbzf 的摘要说明
    /// </summary>
    public class sbzf : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string data = null;
            context.Response.ContentType = "application/json";
            HttpRequest request = context.Request;
            StreamReader reader = new StreamReader(request.InputStream);
            string json = reader.ReadToEnd();
            JObject jo = JObject.Parse(json);
            var ysbqcid = jo["sbxh"].ToString();
            JObject ret = new JObject();
            GTXResult InitDataDF = GTXMethod.InitDataDF(ysbqcid);
            GTXMethod.UpdateYSBQCtbzt(ysbqcid, "", "[]");
            if (InitDataDF.IsSuccess)
            {
                ret.Add("success", true);
        
            }
            context.Response.ContentType = "application/json;charset=UTF-8";
            context.Response.Write(JsonConvert.SerializeObject(ret));
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