using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.wszx_web.api.baseCode.CombSelect
{
    /// <summary>
    /// common1 的摘要说明
    /// </summary>
    public class common1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String codeName = "";
            String filterVal = "";
            codeName = (context.Request.Params["codeName"]==null?"":context.Request.Params["codeName"].ToString());
            filterVal = (context.Request.Params["filterVal"]==null?"":context.Request.Params["filterVal"].ToString());
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/json/common_"+codeName+"_"+filterVal+".json"));
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