using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemHBGS.dzzlk.api.dzzl
{
    /// <summary>
    /// viewpic 的摘要说明
    /// </summary>
    public class viewpic : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            String fileName = "";
            String fileKey = "";
            fileName = (context.Request.Params["fileName"]==null?"":context.Request.Params["fileName"].ToString());
            fileKey = (context.Request.Params["fileKey"] == null ? "" : context.Request.Params["fileKey"].ToString());
            if (fileName!="")
            {
                String image = File.ReadAllText(context.Server.MapPath("/dzzlk/api/dzzl/" + fileName));
                context.Response.ContentType = "image/jpeg";
                context.Response.Write(image);
                return;
            }
            if (fileKey != "")
            {
                String image = File.ReadAllText(context.Server.MapPath("/dzzlk/api/dzzl/" + fileKey+".jpg"));
                context.Response.ContentType = "image/jpeg";
                context.Response.Write(image);
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