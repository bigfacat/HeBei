using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;

namespace JlueTaxSystemHBGS.sb
{
    /// <summary>
    /// sbcommon_querySbqkSbxx 的摘要说明
    /// </summary>
    public class sbcommon_querySbqkSbxx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string sbzlDm = (context.Request.Params["sbzlDm"] == null ? "" : context.Request.Params["sbzlDm"].ToString());
            string json = File.ReadAllText(context.Server.MapPath("/sb/sbcommon_querySbqkSbxx.json"));
            bool state = false;
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.code == sbzlDm && item.SBZT == "已申报")
                        {
                            json = json.Replace("@@sbsj", Convert.ToDateTime(item.HappenDate).ToString("yyyy-MM-dd HH:MM:ss"))
                                .Replace("@@sbny", Convert.ToDateTime(item.SKSSQQ).ToString("yyyy-MM-dd"));
                            state = true;
                            break;
                        }
                    }
                }
            }
            if (!state)
            {
                json = File.ReadAllText(context.Server.MapPath("/sb/sbcommon_querySbqkSbxx_null.json"));
            }
            context.Response.ContentType = "application/json";
            context.Response.Write(json);
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