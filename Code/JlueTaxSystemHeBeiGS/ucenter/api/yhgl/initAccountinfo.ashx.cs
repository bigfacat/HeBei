using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using JlueTaxSystemHeBeiGS.Code;
using System.Web.SessionState;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace JlueTaxSystemHBGS.ucenter.api.yhgl
{
    /// <summary>
    /// initAccountinfo 的摘要说明
    /// </summary>
    public class initAccountinfo : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            GTXResult resultCompanyPerson = GTXMethod.GetCompanyPerson();

            String json = File.ReadAllText(context.Server.MapPath("/ucenter/json/initAccountinfo.json"));
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
                            json = json.Replace("@xm", joperson["Name"] == null ? "" : joperson["Name"].ToString())
                                .Replace("@sfzhm", joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString())
                                .Replace("@mobile", joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString());
                        }
                    }
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