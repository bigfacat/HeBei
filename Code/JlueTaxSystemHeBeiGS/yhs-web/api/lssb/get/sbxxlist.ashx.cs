using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Linq;

namespace JlueTaxSystemHeBeiGS.yhs_web.api.lssb.get
{
    /// <summary>
    /// sbxxlist 的摘要说明
    /// </summary>
    public class sbxxlist : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string _zsxm = (context.Request.Params["zsxm"] == null ? "" : context.Request.Params["zsxm"].ToString());
            string _sssqq = (context.Request.Params["sssqq"] == null ? "" : context.Request.Params["sssqq"].ToString());
            string _sssqz = (context.Request.Params["sssqz"] == null ? "" : context.Request.Params["sssqz"].ToString());
            _sssqq = _sssqq.Substring(0, 4) + "-" + _sssqq.Substring(4, 2) + "-" + _sssqq.Substring(6, 2);
            _sssqz = _sssqz.Substring(0, 4) + "-" + _sssqz.Substring(4, 2) + "-" + _sssqz.Substring(6, 2);

            string json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist.json"));
            StringBuilder resstr = new StringBuilder();
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.SBZT == "已申报" &&
                            item.code == _zsxm &&
                            (DateTime.Compare(Convert.ToDateTime(_sssqq), Convert.ToDateTime(item.SKSSQQ)) <= 0) &&
                            (DateTime.Compare(Convert.ToDateTime(_sssqz), Convert.ToDateTime(item.SKSSQZ)) >= 0))
                        {
                            resstr.Append("{" +
                            "\"pzzl_mc\": \"" + item.TaskName + "\"," +
                            "\"pzzl_dm\": \"\"," +
                            "\"pzxh\": \"\"," +
                            "\"sssq_z\": \"" + Convert.ToDateTime(item.SKSSQZ).ToString("yyyy-MM-dd") + "\"," +
                            "\"sbrq\": \"" + Convert.ToDateTime(item.HappenDate).ToString("yyyy-MM-dd") + "\"," +
                            "\"ybtse\": \"" + GTXMethod.getsaveYnse(item.Id.ToString()) + "\"," +
                            "\"sssq_q\": \"" + Convert.ToDateTime(item.SKSSQQ).ToString("yyyy-MM-dd") + "\"" +
                            "},");
                        }
                    }
                    if (resstr.Length > 0)
                        resstr = resstr.Remove(resstr.Length - 1, 1);
                }
            }
            json = json.Replace("@@value", resstr.ToString());
            context.Response.ContentType = "application/json";
            context.Response.Write(json);
            //String json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist.json"));
            //context.Response.ContentType = "application/json";
            //context.Response.Write(json);
            //String json = "";
            //String jsonp = "";
            //String zsxm = "";
            //using (StreamReader sr = new StreamReader(context.Request.InputStream))
            //{
            //    jsonp = sr.ReadLine();
            //    JObject tempo = JObject.Parse(jsonp);
            //    zsxm = (tempo["zsxm"] == null ? "" : tempo["zsxm"].ToString());
            //    if (zsxm=="01")
            //    {
            //        json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist.json"));
            //        context.Response.ContentType = "application/json";
            //        context.Response.Write(json);
            //        return;
            //    }
            //    if (zsxm == "90")
            //    {
            //        json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist_90.json"));
            //        context.Response.ContentType = "application/json";
            //        context.Response.Write(json);
            //        return;
            //    }
            //    if (zsxm == "182")
            //    {
            //        json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist_182.json"));
            //        context.Response.ContentType = "application/json";
            //        context.Response.Write(json);
            //        return;
            //    }
            //    json = File.ReadAllText(context.Server.MapPath("/yhs-web/api/lssb/get/sbxxlist_03.json"));
            //    context.Response.ContentType = "application/json";
            //    context.Response.Write(json);
            //}
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