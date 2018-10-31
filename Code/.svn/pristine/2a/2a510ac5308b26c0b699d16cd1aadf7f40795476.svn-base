using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.get
{
    /// <summary>
    /// baseCode2CombSelect4 的摘要说明
    /// </summary>
    public class baseCode2CombSelect4 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String dlValue = "";
            dlValue = (context.Request.Params["dlValue"] == null ? "" : context.Request.Params["dlValue"].ToString());
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/baseCode2CombSelect4.json"));
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