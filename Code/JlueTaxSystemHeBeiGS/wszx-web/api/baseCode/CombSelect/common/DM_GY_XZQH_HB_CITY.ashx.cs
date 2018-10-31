using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.CombSelect.common
{
    /// <summary>
    /// DM_GY_XZQH_HB_CITY 的摘要说明
    /// </summary>
    public class DM_GY_XZQH_HB_CITY : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/DM_GY_XZQH_HB_CITY.json"));
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