using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.fpzx_web.api.baseCode.get.baseCode2CombSelect6
{
    /// <summary>
    /// DM_GY_YHHB2 的摘要说明
    /// </summary>
    public class DM_GY_YHHB2 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/fpzx-web/json/DM_GY_YHHB2.json"));
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