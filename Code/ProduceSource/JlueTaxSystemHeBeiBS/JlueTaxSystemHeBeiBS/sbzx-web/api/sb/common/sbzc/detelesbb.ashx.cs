using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using JlueTaxSystemHeBeiBS.Code;
using System.IO;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common.sbzc
{
    /// <summary>
    /// detelesbb 的摘要说明
    /// </summary>
    public class detelesbb : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Stream inputStream = HttpContext.Current.Request.InputStream;
            Encoding encoding = HttpContext.Current.Request.ContentEncoding;
            StreamReader streamReader = new StreamReader(inputStream, encoding);
            string strJson = streamReader.ReadToEnd();

            JObject input_jo = JsonConvert.DeserializeObject<JObject>(strJson);
            string table_name = input_jo["bbid"].ToString();

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

            GTXResult gre = GTXMethod.DeleteUserReportData(id, table_name);
            JObject re_jo = new JObject();
            if (gre.IsSuccess == true)
            {
                JArray ja = new JArray();
                JObject add_jo = new JObject();

                ja = JsonConvert.DeserializeObject<JArray>(TBZT);
                foreach (JObject jo in ja)
                {
                    if (jo["bbid"].ToString().Equals(table_name))
                    {
                        ja.Remove(jo);
                        GTXMethod.UpdateYSBQCtbzt(id, "", JsonConvert.SerializeObject(ja));
                        break;
                    }
                }

                re_jo.Add(new JProperty("value", "true"));
                re_jo.Add(new JProperty("code", "0000"));
            }
            else
            {
                re_jo.Add(new JProperty("value", "false"));
                re_jo.Add(new JProperty("code", ""));
                re_jo.Add(new JProperty("message", "删除失败！"));
            }

            context.Response.ContentType = "text/plain";
            context.Response.Write(re_jo);
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