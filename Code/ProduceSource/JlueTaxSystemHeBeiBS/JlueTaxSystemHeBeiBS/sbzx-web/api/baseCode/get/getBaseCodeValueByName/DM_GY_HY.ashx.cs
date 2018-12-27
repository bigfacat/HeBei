using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.baseCode.get.getBaseCodeValueByName
{
    /// <summary>
    /// DM_GY_HY 的摘要说明
    /// </summary>
    public class DM_GY_HY : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("DM_GY_HY.json"));
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