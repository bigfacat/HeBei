using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.bszm_web.api.desktop.customizedFuctionsEX.usertype
{
    /// <summary>
    /// get 的摘要说明
    /// </summary>
    public class get : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string json = "";
            string Url = HttpContext.Current.Request.Url.ToString();
            string[] a = Url.Split('/');
            string url = a[0] + "/" + a[1] + "/" + a[2];
            json = File.ReadAllText(context.Server.MapPath("get.json"));
            json = json.Replace("@@url", url);
            context.Response.ContentType = "text/json";
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