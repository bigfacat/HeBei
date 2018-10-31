using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.SessionState;
using System.Text;
using JlueTaxSystemHeBeiGS.Code;

namespace JlueTaxSystemHBGS.sbzx_web.api.hb.sb.common
{
    /// <summary>
    /// sbqkcx 的摘要说明
    /// </summary>
    public class sbqkcx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {

            string requestjson = "";

            string _zsxmDm = (context.Request.Params["zsxmDm"] == null ? "" : context.Request.Params["zsxmDm"].ToString());
            string _sbztDm = (context.Request.Params["sbztDm"] == null ? "" : context.Request.Params["sbztDm"].ToString());
            string _sssqQ = (context.Request.Params["sssqQ"] == null ? "" : context.Request.Params["sssqQ"].ToString());
            string _sssqZ = (context.Request.Params["sssqZ"] == null ? "" : context.Request.Params["sssqZ"].ToString());
            string _sbrqQ = (context.Request.Params["sbrqQ"] == null ? "" : context.Request.Params["sbrqQ"].ToString());
            string _sbrqZ = (context.Request.Params["sbrqZ"] == null ? "" : context.Request.Params["sbrqZ"].ToString());

            using (StreamReader sr = new StreamReader(context.Request.InputStream))
            {
                requestjson = sr.ReadLine();
                JObject tempo = JObject.Parse(requestjson);
                _zsxmDm = (tempo["zsxmDm"] == null ? "" : tempo["zsxmDm"].ToString());
                _sbztDm = (tempo["sbztDm"] == null ? "" : tempo["sbztDm"].ToString());
                _sssqQ = (tempo["sssqQ"] == null ? "" : tempo["sssqQ"].ToString());
                _sssqZ = (tempo["sssqZ"] == null ? "" : tempo["sssqZ"].ToString());
                _sbrqQ = (tempo["sbrqQ"] == null ? "" : tempo["sbrqQ"].ToString());
                _sbrqZ = (tempo["sbrqZ"] == null ? "" : tempo["sbrqZ"].ToString());
            }

            string json = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/sbqkcx.json"));

            StringBuilder resstr = new StringBuilder();
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.SBZT == "已申报" && (_sbztDm == "0000" || _sbztDm == "") &&
                            (item.code == _zsxmDm || _zsxmDm == "") &&
                            ((_sssqQ == "" || DateTime.Compare(Convert.ToDateTime(_sssqQ), Convert.ToDateTime(item.SKSSQQ)) <= 0)) &&
                            ((_sssqZ == "" || DateTime.Compare(Convert.ToDateTime(_sssqZ), Convert.ToDateTime(item.SKSSQZ)) >= 0)) &&
                            ((DateTime.Compare(Convert.ToDateTime(_sbrqQ), Convert.ToDateTime(item.HappenDate)) <= 0) || _sbrqQ == "") &&
                            ((DateTime.Compare(Convert.ToDateTime(_sbrqZ), Convert.ToDateTime(item.HappenDate)) >= 0) || _sbrqZ == ""))
                        {
                            resstr.Append("{" +
                            "\"sbxh\": \"\"," +
                            "\"djxh\": \"\"," +
                            "\"nsrsbh\": \"\"," +
                            "\"zsxmDm\": \"\"," +
                            "\"sbzlDm\": \"" + item.code + "\"," +
                            "\"sbzlMc\": \"" + item.TaskName + "\"," +
                            "\"sbse\": \"\"," +
                            "\"skssqq\": \"" + Convert.ToDateTime(item.SKSSQQ).ToString("yyyy-MM-dd") + "\"," +
                            "\"skssqz\": \"" + Convert.ToDateTime(item.SKSSQZ).ToString("yyyy-MM-dd") + "\"," +
                            "\"sbztDm\": \"0000\"," +
                            "\"sbztms\": \"申报成功\"," +
                            "\"sbrq\": \"" + Convert.ToDateTime(item.HappenDate).ToString("yyyy-MM-dd") + "\"," +
                            "\"lrsj\": \"" + Convert.ToDateTime(item.HappenDate).ToString("yyyy-MM-dd HH:mm:ss.SSS") + "\"," +
                            "\"pzxh\": \"\"," +
                            "\"qqwjm\": \"\"," +
                            "\"sbny\": \"\"," +
                            "\"scpzxh\": \"\"," +
                            "\"qdid\": \"\"," +
                            "\"yzpzzlDm\": \"\"," +
                            "\"czDmList\": \"\"," +
                            "\"sl\": \"\"," +
                            "\"czDmList\": \"\"," +
                            "\"sbuuid\": \"\"" +
                            "},");
                        }
                    }
                    if (resstr.Length > 0)
                        resstr = resstr.Remove(resstr.Length - 1, 1);
                }
            }

            context.Response.ContentType = "application/json";
            context.Response.Write(json.Replace("@@value", resstr.ToString()));


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