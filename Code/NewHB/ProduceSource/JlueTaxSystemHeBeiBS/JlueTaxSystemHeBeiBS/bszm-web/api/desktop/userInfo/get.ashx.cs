using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.bszm_web.api.desktop.userInfo
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {

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

            GTXResult resultCompanyPerson = GTXMethod.GetCompanyPerson();
            if (resultCompanyPerson.IsSuccess)
            {
                JArray jrperson = (JArray)JsonConvert.DeserializeObject(resultCompanyPerson.Data.ToString());
                if (jrperson.Count > 0)
                {
                    for (int i = 0; i < jrperson.Count; i++)
                    {
                        JObject joperson = JObject.Parse(jrperson[i].ToString());
                        if (joperson["PersonType"] != null && joperson["PersonType"].ToString() == "0")
                        {
                            json = json.Replace("@@FDDB", (joperson["Name"] == null ? "" : joperson["Name"].ToString()))
                                    .Replace("@@ID_FDDB", (joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString()))
                                    .Replace("@@MB_FDDB", (joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString()));
                        }
                    }
                }
            }
            context.Response.ContentType = "text/plain";
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