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
using System.Xml;
namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common.submit
{
    /// <summary>
    /// sbcl 的摘要说明
    /// </summary>
    public class sbcl : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string reportCode = "";
            string userYsbqcId = "";
            string sbwjs = "";
            string ynse = "";
            string taskname = "";
            context.Response.ContentType = "application/json";
            HttpRequest request = context.Request;
            StreamReader reader = new StreamReader(request.InputStream);
            string json = reader.ReadToEnd();
            JObject jo = JObject.Parse(json);
            userYsbqcId = jo["id"].ToString().Replace("\"","");
            sbwjs = jo["sbwjs"].ToString().Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\"{","{").Replace("}\"","}");
            JObject jo1 = JObject.Parse(sbwjs);
            string bbxml = jo1["bbxml"].ToString().Replace("\"","");
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.Id == Int32.Parse(userYsbqcId))
                        {   
                            taskname = item.TaskName;
                            break;
                        }
                    }
                }
            }
            ynse = GTXMethod.getYnse(taskname, bbxml);
            GTXResult sresult = GTXMethod.UpdateSBSE(userYsbqcId,ynse);
            List<GTXNameValue> nameList = new List<GTXNameValue>();
            GTXNameValue nv = new GTXNameValue();
            nv.key = "data";
            byte[] bytes = Encoding.Default.GetBytes(json);
            string _result = Convert.ToBase64String(bytes);
            nv.value = _result;
            nameList.Add(nv);
            GTXResult saveresult = GTXMethod.SaveUserReportData(JsonConvert.SerializeObject(nameList), userYsbqcId, reportCode);
            JObject retApp = new JObject();
            try
            {
                GTXResult upresult = GTXMethod.UpdateYSBQC(userYsbqcId, "已申报");

                retApp.Add("msg", "已申报完成！");
                retApp.Add("code", "0000");
            }catch (Exception ex)
            {

            }
            context.Response.ContentType = "application/json;charset=UTF-8";
            context.Response.Write(JsonConvert.SerializeObject(retApp));
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