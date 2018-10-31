using JlueTaxSystemHeBeiGS.Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiGS.sb
{
    /// <summary>
    /// sbcommon_sbzf 的摘要说明
    /// </summary>
    public class sbcommon_sbzf : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string _id = (context.Request.Params["id"] == null ? "" : context.Request.Params["id"].ToString());

            string msg = "作废失败！";
            bool state = false;
            GTXResult result = GTXMethod.InitDataDF(_id);
            if (result.IsSuccess)
            {
                msg = "作废成功！";
                state = true;
            }
            string json = "{\"success\":" + (state ? "true" : "false") + ",\"message\":\"" + msg + "\"}";
            context.Response.ContentType = "text/plain";
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