using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.ucenter.api.yhgl
{
    /// <summary>
    /// getZrrDetailInfo 的摘要说明
    /// </summary>
    public class getZrrDetailInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/ucenter/json/getZrrDetailInfo.json"));
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