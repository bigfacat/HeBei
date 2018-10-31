using JlueTaxSystemHeBeiGS.Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiGS.sb
{
    /// <summary>
    /// sbcommon_sbcl 的摘要说明
    /// </summary>
    public class sbcommon_sbcl : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string _code = (context.Request.Params["sbzlDm"] == null ? "" : context.Request.Params["sbzlDm"].ToString());
            string _userysbqcid = "";

            string responsestr = "{\"success\":@@success,\"message\":\"@@message\"}";
            bool sbstate = true;
            string sbzt = "未申报";
            string msg = "发送成功！";
            string taskname = "";
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.code == _code)
                        {
                            _userysbqcid = item.Id.ToString();
                            sbzt = item.SBZT;
                            taskname = item.TaskName;
                            break;
                        }
                    }
                }
            }
            if (_userysbqcid != "")
            {
                if (sbzt == "未申报")
                {
                    List<GTXNameValue> nameList = new List<GTXNameValue>();
                    string _sbformdata = (context.Request.Params["sbformdata"] == null ? "" : context.Request.Params["sbformdata"].ToString());
                    string ynse = GTXMethod.getYnse(taskname, _sbformdata);
                    GTXNameValue nv = new GTXNameValue();
                    nv.key = "data";
                    byte[] bytes = Encoding.Default.GetBytes(ynse);
                    string _result = Convert.ToBase64String(bytes);
                    nv.value = _result;
                    nameList.Add(nv);
                    GTXResult savere = GTXMethod.SaveUserReportData(JsonConvert.SerializeObject(nameList), _userysbqcid, "");
                    if (savere.IsSuccess)
                    {
                        GTXResult upresult = GTXMethod.UpdateYSBQC(_userysbqcid, "已申报");
                        if (!upresult.IsSuccess)
                        {
                            sbstate = false;
                            msg = "发送失败";
                        }
                    }
                    else
                    {
                        sbstate = false;
                        msg = "发送失败";
                    }
                }
                else
                {
                    msg = "已经完成申报，无需重复操作！";
                }
            }
            else
            {
                sbstate = false;
                msg = "发送失败";
            }

            responsestr = responsestr.Replace("@@success", (sbstate == true ? "1" : "0"))
                .Replace("@@message", msg);

            context.Response.ContentType = "text/plain";
            context.Response.Write(responsestr);
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