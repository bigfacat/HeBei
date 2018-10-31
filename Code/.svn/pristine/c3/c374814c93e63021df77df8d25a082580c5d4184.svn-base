using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.SessionState;
using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;
using System.Text;

namespace JlueTaxSystemHBGS.sb
{
    /// <summary>
    /// sbcommon_sbzfcx 的摘要说明
    /// </summary>
    public class sbcommon_sbzfcx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string zsxmDm = (context.Request.Params["zsxmDm"] == null ? "" : context.Request.Params["zsxmDm"].ToString());

            StringBuilder resstr = new StringBuilder("");
            String json = File.ReadAllText(context.Server.MapPath("/sb/sbcommon_sbzfcx.json"));

            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if ((zsxmDm == "" || item.code == zsxmDm) && item.SBZT == "已申报")
                        {
                            resstr.Append("{\"sbztmc\": \"申报成功\",");
                            resstr.Append("\"skssqq\": \"" + Convert.ToDateTime(item.SKSSQQ).ToString("yyyy-MM-dd") + "\",");
                            resstr.Append("\"sblxmc\": \"正常申报\",");
                            resstr.Append("\"sbzlmc\": \"" + item.TaskName + "\",");
                            resstr.Append("\"nsrsbh\": \"\",");
                            resstr.Append("\"skssqz\": \"" + Convert.ToDateTime(item.SKSSQZ).ToString("yyyy-MM-dd") + "\",");
                            resstr.Append("\"sbny\": \"" + Convert.ToDateTime(item.HappenDate).ToString("yyyyMM") + "\",");
                            resstr.Append("\"qqwjm\": \"\",");
                            resstr.Append("\"sbzldm\": \"" + item.code + "\",");
                            resstr.Append("\"sbsj\": \"" + Convert.ToDateTime(item.HappenDate).ToString("yyyy-MM-dd") + "\",");
                            resstr.Append("\"id\": \"" + item.Id + "\",");
                            resstr.Append("\"sbztdm\": \"0000\"},");
                        }
                    }
                    if (resstr.Length > 0)
                        resstr.Remove(resstr.Length - 1, 1);
                }
            }
            json = json.Replace("@@resstr", resstr.ToString());
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