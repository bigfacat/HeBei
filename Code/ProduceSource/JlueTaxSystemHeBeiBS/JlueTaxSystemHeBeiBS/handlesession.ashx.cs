using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystem.WebUI
{
    /// <summary>
    /// handlesession 的摘要说明
    /// </summary>
    public class handlesession : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string _Method = context.Request.QueryString["Method"].ToString();
            string questionId = (context.Request.QueryString["questionId"] != null ? context.Request.QueryString["questionId"].ToString() : "");
            
            GTXResult gtxre = new GTXResult();
            gtxre.IsSuccess = true;
            switch (_Method)
            {
                case "checkquestionid":
                    if ((context.Session["nowywid"] != null)
                        && (context.Session["nowywid"].ToString() != "")
                        && (context.Session["nowywid"].ToString() != questionId))
                    {
                        gtxre.IsSuccess = false;
                        gtxre.Message = "您已打开一项业务，只能同时操作一项业务";
                    }
                    break;
                case "nowywidclear":
                    context.Session["nowywid"] = null;
                    break;
            }


            context.Response.ContentType = "text/json;charset=UTF-8";
            context.Response.Write(JsonConvert.SerializeObject(gtxre));
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