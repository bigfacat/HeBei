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

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.jgcx
{
    /// <summary>
    /// getsbbw 的摘要说明
    /// </summary>
    public class getsbbw : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = ""; var orgstr = "";
            context.Response.ContentType = "application/json";
            HttpRequest request = context.Request;
            StreamReader reader = new StreamReader(request.InputStream);
            string json = reader.ReadToEnd();
            JObject jo = JObject.Parse(json);
            var ysbqcid = jo["sbxh"].ToString();
            GTXResult resultData = GTXMethod.GetUserReportData(ysbqcid, "");
            if (resultData.IsSuccess)
            {
                var currentReportData = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQCReportData>>(resultData.Data.ToString());
                var resultDataCount = currentReportData.Count;
                if (resultDataCount != 0)
                {
                    result = File.ReadAllText(context.Server.MapPath("getsbbw.json"));
                    
                    List<GDTXHeBeiUserYSBQCReportData> dataList = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQCReportData>>(resultData.Data.ToString());
                    foreach (GDTXHeBeiUserYSBQCReportData item in dataList)
                    {
                        var orgStr= item.DataValue.Replace(" ","+");         
                        byte[] outputb = Convert.FromBase64String(orgStr);
                        orgstr = Encoding.Default.GetString(outputb);
                        JObject jon = JObject.Parse(orgstr);
                        var sbformdata = jon["sbformdata"].ToString();
                        //orgStr = JsonConvert.SerializeObject(jo);
                        //orgStrResult = orgStr.Replace("\"", "\\\"").Replace("\r\n", "").Replace("\\", "");
                        result = result.Replace("@@value", sbformdata);
                    }
                }
             
            }
           
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