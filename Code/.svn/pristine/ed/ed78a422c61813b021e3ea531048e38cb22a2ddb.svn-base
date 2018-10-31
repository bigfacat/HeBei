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
    public class getSbsj : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var result = "";
            JObject return_jo = new JObject();

            Stream inputStream = HttpContext.Current.Request.InputStream;
            Encoding encoding = HttpContext.Current.Request.ContentEncoding;
            StreamReader streamReader = new StreamReader(inputStream, encoding);
            string strJson = streamReader.ReadToEnd();

            JObject input_jo = JsonConvert.DeserializeObject<JObject>(strJson);
            string table_name = input_jo["bbid"].ToString();

            JObject ReportData = GTXMethod.getZzsReportData(table_name);

            if (ReportData.HasValues)
            {
                JObject jv = ReportData;
                JObject jobj = new JObject();
                JObject jo = new JObject();

                jobj.Add("htmlData", jv["jsonData"]["htmlData"]);
                jobj.Add("formulaData", File.ReadAllText(context.Server.MapPath("/sbzx-web/apps/views/sb_ybnsr/" + table_name + "/config/formulas.json")));

                jo.Add("jsonData", jobj);

                return_jo.Add("message", "");
                return_jo.Add("value", jo);
                return_jo.Add("success", true);
                return_jo.Add("msgCode", null);
                return_jo.Add("resultMap", new JObject());
                return_jo.Add("msgParams", null);
                return_jo.Add("jylsh", "d553e1dd89f840bd9fcb4c8f14578895");
            }
            else
            {
                return_jo.Add("message", "获取表格数据失败！");
                return_jo.Add("value", null);
                return_jo.Add("success", false);
                return_jo.Add("msgCode", null);
                return_jo.Add("resultMap", new JObject());
                return_jo.Add("msgParams", null);
                return_jo.Add("jylsh", "d553e1dd89f840bd9fcb4c8f14578895");
            }

            result = JsonConvert.SerializeObject(return_jo);

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