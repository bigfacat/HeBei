﻿using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.yhsqc
{
    /// <summary>
    /// hdxx 的摘要说明
    /// </summary>
    public class hdxx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string skssqq = "", skssqz = "",sbzt="";
            string url = HttpContext.Current.Request.Url.ToString();

            string[] value = url.Split('&');
            var pos = value[value.Length - 1].IndexOf('=');
            var UserYSBQCId = value[value.Length - 1].Substring(pos + 1);
            GTXResult json = GTXMethod.GetHeBeiYSBQC();
            if (json.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(json.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.Id == Int32.Parse(UserYSBQCId))
                        {
                            skssqq = item.SKSSQQ;
                            skssqz = item.SKSSQZ;
                            sbzt = item.SBZT;
                            break;
                        }

                    }
                }
            }
            if (sbzt == "已申报")
            {
                var result = File.ReadAllText(context.Server.MapPath("hdxx1.json"));
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
            }
            else
            {
                var result = File.ReadAllText(context.Server.MapPath("hdxx.json"));
                result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
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