using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.BsfwtWeb.pages.data.cwbb
{
    /// <summary>
    /// sb_cwbb_xqykjzz 的摘要说明
    /// </summary>
    public class sb_cwbb_xqykjzz : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/BsfwtWeb/json/sb_cwbb_xqykjzz.json"));
            context.Response.ContentType = "application/txt";
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