using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO; 

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.CombSelect.common
{
    /// <summary>
    /// DM_ZJFF_DL 的摘要说明
    /// </summary>
    public class DM_ZJFF_DL : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/DM_ZJFF_DL.json"));
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