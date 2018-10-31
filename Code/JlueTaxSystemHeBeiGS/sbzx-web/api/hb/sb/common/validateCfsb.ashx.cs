using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiGS.sbzx_web.api.hb.sb.common
{
    /// <summary>
    /// validateCfsb 的摘要说明
    /// </summary>
    public class validateCfsb : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            StreamReader sr = new StreamReader(context.Request.InputStream);
            string requestjson = sr.ReadLine();
            JObject tempo = JObject.Parse(requestjson);
            string _sbzlDm = (tempo["sbzlDm"] == null ? "" : tempo["sbzlDm"].ToString());

            string response = "{\"success\":true}";
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.code == _sbzlDm)
                        {
                            if (item.SBZT == "已申报")
                            {
                                response = "{\"success\":false,\"message\":\"您已申报成功，请勿重复申报\"}";
                            }
                            break;
                        }
                    }
                }
            }
            context.Response.ContentType = "application/json";
            context.Response.Write(response);
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