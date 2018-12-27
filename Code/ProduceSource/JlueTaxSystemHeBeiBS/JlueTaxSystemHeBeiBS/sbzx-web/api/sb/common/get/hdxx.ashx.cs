using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.common.get
{
    /// <summary>
    /// hdxx 的摘要说明
    /// </summary>
    public class hdxx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string skssqq = "", skssqz = "", UserYSBQCId="",sbzt="";
            string url = HttpContext.Current.Request.Url.ToString();
            string[] values = url.Split('/');
            string selecttable = values[values.Length - 2];
            string[] value = url.Split('&');
            for(int i=0;i<value.Length;i++){
                var pos = value[i].IndexOf('=');
                var key =value[i].Substring(0,pos);
                if (key == "id")
                {
                  UserYSBQCId = value[i].Substring(pos + 1);
                  break;
                }
                
            }
            
            GTXResult json = GTXMethod.GetHeBeiYSBQC();
            if (json.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(json.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.Id ==Int32.Parse(UserYSBQCId))
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
                var result = File.ReadAllText(context.Server.MapPath("hdxx6.json"));
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
            }
            else
            {

                if (selecttable == "sb_ybnsr")
                {
                    var result = File.ReadAllText(context.Server.MapPath("hdxx.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
                else if (selecttable == "sb_cwbb_xqy_kjzz")
                {

                    var result = File.ReadAllText(context.Server.MapPath("hdxx1.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
                else if (selecttable == "xgmsb-yds_new")
                {
                    var result = File.ReadAllText(context.Server.MapPath("hdxx2.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
                else if (selecttable == "xgmsb-tbs")
                {
                    var result = File.ReadAllText(context.Server.MapPath("hdxx3.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
                else if (selecttable == "sb_sdsA_yj_new")
                {
                    var result = File.ReadAllText(context.Server.MapPath("hdxx4.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
                else if (selecttable == "sb_sdsB_yj_new")
                {
                    var result = File.ReadAllText(context.Server.MapPath("hdxx5.json"));
                    result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(result);
                }
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