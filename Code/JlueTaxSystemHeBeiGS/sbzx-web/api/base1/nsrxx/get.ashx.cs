using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace JlueTaxSystemHBGS.sbzx_web.api.base1.nsrxx
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sbzx-web/api/base1/nsrxx/get.json"));
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