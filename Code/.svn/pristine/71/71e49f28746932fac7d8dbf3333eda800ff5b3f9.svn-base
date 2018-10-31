using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;

namespace JlueTaxSystemHBGS.bszm_web.api.desktop.todoList
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/bszm-web/api/desktop/todoList/get.json"));
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.code == "10101")
                        {
                            json = json.Replace("@@ysbbz", (item.SBZT == "已申报" ? "Y" : "N"))
                                .Replace("@@sbqx", Convert.ToDateTime(item.SBQX).ToString("yyyy-MM-dd"))
                                .Replace("@@url", (item.SBZT == "已申报" ? "" : "/sbzx-web/apps/views/sb_ybnsr_ybjc/zzsybnsrYbjc.aspx?sbzlDm=10101"));
                            break;
                        }
                    }
                }
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