using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.sbzx_web.api.baseCode.get.getBaseCodeValueByName
{
    /// <summary>
    /// DM_GY_SWJG 的摘要说明
    /// </summary>
    public class DM_GY_SWJG : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/sbzx-web/json/DM_GY_SWJG.json"));
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