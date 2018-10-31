using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHeBeiGS.wszx_web.api.query.fbzllist
{
    /// <summary>
    /// _4de45dee83b847afaf5d429b8171c204 的摘要说明
    /// </summary>
    public class _4de45dee83b847afaf5d429b8171c204 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String json = File.ReadAllText(context.Server.MapPath("/wszx-web/api/query/fbzllist/4de45dee83b847afaf5d429b8171c204.json"));
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