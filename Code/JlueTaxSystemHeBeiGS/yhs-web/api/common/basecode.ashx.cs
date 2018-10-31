using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.yhs_web.api.common
{
    /// <summary>
    /// basecode 的摘要说明
    /// </summary>
    public class basecode : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string baseCodeName = (context.Request.Params["baseCodeName"] == null ? "" : context.Request.Params["baseCodeName"].ToString());
            if (baseCodeName== "DM_GY_ZSXM")
            {
                String json = File.ReadAllText(context.Server.MapPath("/yhs-web/json/baseCodeName_DM_GY_ZSXM.json"));
                context.Response.ContentType = "application/json";
                context.Response.Write(json);
                return;
            }
            
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