using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.@base.dsnsrxx
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest (HttpContext context) {
            String json = File.ReadAllText(context.Server.MapPath("get.json"));
            GTXResult resultCompany = GTXMethod.GetCompany();
            if (resultCompany.IsSuccess)
            {
                JObject company = (JObject)JsonConvert.DeserializeObject(resultCompany.Data.ToString());
                if (company.HasValues)
                {
                    json = json.Replace("@@NSRSBH", (company["NSRSBH"] == null ? "" : company["NSRSBH"].ToString()))
                        .Replace("@@NSRMC", (company["NSRMC"] == null ? "" : company["NSRMC"].ToString()))
                        .Replace("@@ZGGSSWJMC", (company["ZGGSSWJMC"] == null ? "" : company["ZGGSSWJMC"].ToString()));

                }
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write(json);
        }
     
        public bool IsReusable {
            get {
                return false;
            }
        }
    }
}