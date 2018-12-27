using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.baseCode.get.baseCode2CombSelect
{
    /// <summary>
    /// DM_SB_BMZD_YPXHALL 的摘要说明
    /// </summary>
    public class DM_SB_BMZD_YPXHALL : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var result = File.ReadAllText(context.Server.MapPath("DM_SB_BMZD_YPXHALL.json"));
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