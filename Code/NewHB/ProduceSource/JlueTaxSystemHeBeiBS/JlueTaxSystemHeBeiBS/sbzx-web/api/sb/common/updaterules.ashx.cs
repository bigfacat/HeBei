using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.IO;
using JlueTaxSystemHeBeiBS.Code;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common
{
    /// <summary>
    /// updaterules 的摘要说明
    /// </summary>
    public class updaterules : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Stream inputStream = HttpContext.Current.Request.InputStream;
            Encoding encoding = HttpContext.Current.Request.ContentEncoding;
            StreamReader streamReader = new StreamReader(inputStream, encoding);
            string strJson = streamReader.ReadToEnd();

            JObject req_jo = JsonConvert.DeserializeObject<JObject>(strJson);
            JArray req_ja = (JArray)req_jo["sbData"];

            string StrTaskName = "增值税一般纳税人申报";

            string id = "";
            string TBZT = "";
            GTXResult resultq = GTXMethod.GetHeBeiYSBQC();
            if (resultq.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(resultq.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.TaskName == StrTaskName)
                        {
                            id = item.Id.ToString();
                            TBZT = item.TBZT;
                        }
                    }
                }
            }

            JArray ja = JsonConvert.DeserializeObject<JArray>(TBZT);

            foreach (JObject j in ja)
            {
                foreach (JObject jj in req_ja)
                {
                    if (j["bbid"].Equals(jj["bbid"]))
                    {
                        j["status"] = jj["status"];
                        break;
                    }
                }
            }

            GTXResult re = GTXMethod.UpdateYSBQCtbzt(id, "", JsonConvert.SerializeObject(ja));
            JObject re_jo = new JObject();
            if (re.IsSuccess == true)
            {
                re_jo.Add("code", "0000");
                re_jo.Add("value", "true");
            }
            else
            {
                re_jo.Add("code", "");
                re_jo.Add("value", "false");
            }

            context.Response.ContentType = "text/plain";
            context.Response.Write(JsonConvert.SerializeObject(re_jo));
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