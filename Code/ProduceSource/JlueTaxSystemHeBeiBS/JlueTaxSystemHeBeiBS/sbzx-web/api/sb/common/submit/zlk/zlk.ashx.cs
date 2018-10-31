using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common.submit.zlk
{
    /// <summary>
    /// zlk 的摘要说明
    /// </summary>
    public class zlk : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string userYsbqcId = "";
            context.Response.ContentType = "application/json";
            HttpRequest request = context.Request;
            StreamReader reader = new StreamReader(request.InputStream);
            string json = reader.ReadToEnd();
            JObject jo = JObject.Parse(json);
            userYsbqcId = jo["id"].ToString().Replace("\"", "");

            JObject return_jo = new JObject();
            try
            {
                GTXResult upresult = GTXMethod.UpdateYSBQC(userYsbqcId, "已申报");

                return_jo.Add("msg", "已申报完成！");
                return_jo.Add("code", "0000");
            }
            catch (Exception ex)
            {

            }
            context.Response.ContentType = "application/json;charset=UTF-8";
            context.Response.Write(JsonConvert.SerializeObject(return_jo));
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