using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.getCms
{
    /// <summary>
    /// getCmsAction_queryCmsDC 的摘要说明
    /// </summary>
    public class getCmsAction_queryCmsDC : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/getCms/getCmsAction_queryCmsDC.json"));
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