using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.fpzx_web.api.baseCode.get.baseCode2CombSelect2
{
    /// <summary>
    /// DM_FP_FPKJQK 的摘要说明
    /// </summary>
    public class DM_FP_FPKJQK : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/fpzx-web/json/DM_FP_FPKJQK.json"));
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