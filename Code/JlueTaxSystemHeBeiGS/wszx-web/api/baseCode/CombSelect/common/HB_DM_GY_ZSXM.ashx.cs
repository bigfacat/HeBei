using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.CombSelect.common
{
    /// <summary>
    /// HB_DM_GY_ZSXM 的摘要说明
    /// </summary>
    public class HB_DM_GY_ZSXM : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/HB_DM_GY_ZSXM.json"));
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