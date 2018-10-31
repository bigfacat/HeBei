using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using JlueTaxSystemHeBeiBS.Code;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common.nb
{
    /// <summary>
    /// sbbc 的摘要说明
    /// </summary>
    public class sbbc : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var result = "";

            Stream inputStream = HttpContext.Current.Request.InputStream;
            Encoding encoding = HttpContext.Current.Request.ContentEncoding;
            StreamReader streamReader = new StreamReader(inputStream, encoding);
            string strJson = streamReader.ReadToEnd();

            JObject jo = JsonConvert.DeserializeObject<JObject>(strJson);
            string table_name = jo["bbid"].ToString();

            bool b = GTXMethod.zzsSave(table_name, JsonConvert.SerializeObject(jo));

            result = File.ReadAllText(context.Server.MapPath("sbbc.json")).Replace("@@success", b.ToString().ToLower());

            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
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