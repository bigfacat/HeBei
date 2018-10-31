using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.get.baseCode2CombSelect5
{
    /// <summary>
    /// DM_DETZXSSX 的摘要说明
    /// </summary>
    public class DM_DETZXSSX : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String param = "";
            param = (context.Request.Params["param"]==null?"":context.Request.Params["param"].ToString());
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/DM_DETZXSSX_"+param+".json"));
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