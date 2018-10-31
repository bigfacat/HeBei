using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.get.baseCode2CombSelect6
{
    /// <summary>
    /// DM_RD_JYBFZSZZSLX 的摘要说明
    /// </summary>
    public class DM_RD_JYBFZSZZSLX : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/DM_RD_JYBFZSZZSLX.json"));
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