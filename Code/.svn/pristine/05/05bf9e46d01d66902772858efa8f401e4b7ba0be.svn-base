using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
namespace JlueTaxSystemHeBeiBS.bszm_web.api.desktop.todoList
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result="";
            string url = HttpContext.Current.Request.Url.Query;
            string[] values = url.Split('&');
            if(values[0]=="?type=1"){
              result = File.ReadAllText(context.Server.MapPath("get.json"));
            }
            else if (values[0] == "?type=2"){
             result = File.ReadAllText(context.Server.MapPath("get1.json"));
            }
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