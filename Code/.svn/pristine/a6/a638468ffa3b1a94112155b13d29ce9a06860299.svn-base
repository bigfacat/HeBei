using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json.Linq;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiGS.yhs_web.api.common
{
    /// <summary>
    /// query 的摘要说明
    /// </summary>
    public class query : IHttpHandler,IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            String jsonp = "";
            String logicName = "";
            string json = "";
            using (StreamReader sr = new StreamReader(context.Request.InputStream))
            {
                jsonp = sr.ReadLine();
                JObject tempo = JObject.Parse(jsonp);
                logicName = (tempo["logicName"] == null ? "" : tempo["logicName"].ToString());
                if (logicName== "Logic_querySfzrdxx")
                {
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query_Logic_querySfzrdxx.json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(json);
                    return;
                }
                if (logicName == "Logic_pzhdxxCx")
                {
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query_Logic_pzhdxxCx.json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(json);
                    return;
                }
                
                if (logicName == "Logic_queryFpjcxx")
                {
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query_Logic_queryFpjcxx.json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(json);
                    return;
                }
                if (logicName == "Logic_QueryFplyxx")
                {
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query_cx.json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(json);
                    return;
                }
                if (logicName == "Logic_QueryFpyjxx")
                {
                    json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query_cx.json"));
                    context.Response.ContentType = "application/json";
                    context.Response.Write(json);
                    return;
                }
            }
            json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/query.json"));

            GTXResult resultCompany = GTXMethod.GetCompany();
            GTXResult resultCompanyPerson = GTXMethod.GetCompanyPerson();
            if (resultCompany.IsSuccess)
            {
                JObject company = (JObject)JsonConvert.DeserializeObject(resultCompany.Data.ToString());
                json = json.Replace("@@NSRSBH", company["NSRSBH"] == null ? "" : company["NSRSBH"].ToString())
                    .Replace("@@NSRMC", company["NSRMC"] == null ? "" : company["NSRMC"].ToString())
                    .Replace("@@DJZCLX", company["DJZCLX"] == null ? "" : company["DJZCLX"].ToString())
                    .Replace("@@GBHY", company["GBHY"] == null ? "" : company["GBHY"].ToString())
                    .Replace("@@JYFW", company["JYFW"] == null ? "" : company["JYFW"].ToString())
                    .Replace("@@LXDH", company["LXDH"] == null ? "" : company["LXDH"].ToString())
                    .Replace("@@JYDZ", company["SCJYDZ"] == null ? "" : company["SCJYDZ"].ToString())
                    .Replace("@@ZCDZ", company["ZCDZ"] == null ? "" : company["ZCDZ"].ToString())
                    .Replace("@@ZGGSSWJMC", company["ZGGSSWJMC"] == null ? "" : company["ZGGSSWJMC"].ToString());
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
                                json = json.Replace("@@FDDB", joperson["Name"] == null ? "" : joperson["Name"].ToString())
                                    .Replace("@@ID_FDDB", joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString())
                                    .Replace("@@MB_FDDB", joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString());
                            }
                            if (joperson["PersonType"] != null && joperson["PersonType"].ToString() == "1")
                            {
                                json = json.Replace("@@CWFZR", joperson["Name"] == null ? "" : joperson["Name"].ToString())
                                    .Replace("@@ID_CWFZR", joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString())
                                    .Replace("@@MB_CWFZR", joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString());
                            }
                            if (joperson["PersonType"] != null && joperson["PersonType"].ToString() == "2")
                            {
                                json = json.Replace("@@BSRMC", joperson["Name"] == null ? "" : joperson["Name"].ToString())
                                    .Replace("@@ID_BSR", joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString())
                                    .Replace("@@MB_BSR", joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString());
                            }
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