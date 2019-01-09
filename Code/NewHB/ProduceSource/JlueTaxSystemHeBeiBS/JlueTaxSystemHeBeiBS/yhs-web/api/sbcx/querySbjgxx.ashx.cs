using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.yhs_web.api.sbcx
{
    /// <summary>
    /// querySbjgxx 的摘要说明
    /// </summary>
    public class querySbjgxx : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string data = "";
            context.Response.ContentType = "application/json";
            HttpRequest request = context.Request;
            StreamReader reader = new StreamReader(request.InputStream);
            string json = reader.ReadToEnd();
            JObject jo = JObject.Parse(json);
            var sbrqQ = jo["sbrqQ"].ToString().Replace("\"", "");
            var sbrqZ = jo["sbrqZ"].ToString().Replace("\"", "");
            var sbztDm = jo["yzpzzlDm"].ToString().Replace("\"", "");
            var sssqQ = jo["sssqQ"].ToString().Replace("\"", "");
            var sssqZ = jo["sssqZ"].ToString().Replace("\"", "");
            var zsxmDm = jo["zsxmDm"].ToString().Replace("\"", "");

            DateTime t1 = DateTime.Parse(sbrqQ);
            DateTime t2 = DateTime.Parse(sbrqZ);

            List<JObject> applst = new List<JObject>();
            GTXResult result = GTXMethod.GetHeBeiYSBQC();
            if (result.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(result.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.SBZT == "已申报")
                        {
                            if (DateTime.Compare(DateTime.Parse(item.HappenDate), t1) >= 0 && DateTime.Compare(t2, DateTime.Parse(item.HappenDate)) >= 0)
                            {
                                if (zsxmDm != "")
                                {
                                    if (int.Parse(zsxmDm) == item.Code)
                                    {
                                        JObject retApp = new JObject();
                                       
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", zsxmDm);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("ssssqQ", item.SKSSQQ);
                                        retApp.Add("ssssqZ", item.SKSSQZ);
                                        retApp.Add("sbzlDm", item.Code); 
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrrq", "");
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("sl", null);
                                        retApp.Add("sbzlmc", item.ZSXM);
                                        retApp.Add("sblxDm", "1");
                                        retApp.Add("sblxmc", "正常申报"); 
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("sbblbUrl", item.Url);
                                        retApp.Add("sbztmc", "申报成功");
                                        retApp.Add("kksj", "");                   
                                        retApp.Add("sbblbList", null);          
                                        retApp.Add("plxzUrl", "");
                                        retApp.Add("gdsBz", "1");                                    
                                        applst.Add(retApp);
                                    }


                                }
                                else if (zsxmDm != "" && sbztDm != "")
                                {

                                    if (int.Parse(zsxmDm) == item.Code)
                                    {
                                        JObject retApp = new JObject();
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", zsxmDm);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("ssssqQ", item.SKSSQQ);
                                        retApp.Add("ssssqZ", item.SKSSQZ);
                                        retApp.Add("sbzlDm", item.Code);
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrrq", "");
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("sl", null);
                                        retApp.Add("sbzlmc", item.ZSXM);
                                        retApp.Add("sblxDm", "1");
                                        retApp.Add("sblxmc", "正常申报");
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("sbblbUrl", item.Url);
                                        retApp.Add("sbztmc", "申报成功");
                                        retApp.Add("kksj", "");
                                        retApp.Add("sbblbList", null);
                                        retApp.Add("plxzUrl", "");
                                        retApp.Add("gdsBz", "1");  
                                        applst.Add(retApp);
                                    }
                                }
                                else if (zsxmDm != "" && sbztDm != "" && sssqQ != "" && sssqZ != "")
                                {

                                    DateTime t3 = DateTime.Parse(sssqQ);
                                    DateTime t4 = DateTime.Parse(sssqZ);
                                    if (int.Parse(zsxmDm) == item.Code && DateTime.Compare(DateTime.Parse(item.SKSSQQ), t3) >= 0 && DateTime.Compare(t4, DateTime.Parse(item.SKSSQZ)) >= 0)
                                    {
                                        JObject retApp = new JObject();
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", zsxmDm);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("ssssqQ", item.SKSSQQ);
                                        retApp.Add("ssssqZ", item.SKSSQZ);
                                        retApp.Add("sbzlDm", item.Code);
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrrq", "");
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("sl", null);
                                        retApp.Add("sbzlmc", item.ZSXM);
                                        retApp.Add("sblxDm", "1");
                                        retApp.Add("sblxmc", "正常申报");
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("sbblbUrl", item.Url);
                                        retApp.Add("sbztmc", "申报成功");
                                        retApp.Add("kksj", "");
                                        retApp.Add("sbblbList", null);
                                        retApp.Add("plxzUrl", "");
                                        retApp.Add("gdsBz", "1");  
                                        applst.Add(retApp);
                                    }
                                }
                                else
                                {
                                    JObject retApp = new JObject();
                                    retApp.Add("djxh", "10121306010000052395");
                                    retApp.Add("pzxh", "10021318000048344350");
                                    retApp.Add("nsrsbh", null);
                                    retApp.Add("zsxmDm", zsxmDm);
                                    retApp.Add("sbuuid", "21318102310374655696");
                                    retApp.Add("ssssqQ", item.SKSSQQ);
                                    retApp.Add("ssssqZ", item.SKSSQZ);
                                    retApp.Add("sbzlDm", item.Code);
                                    retApp.Add("sbrq", item.SBQX);
                                    retApp.Add("lrrq", "");
                                    retApp.Add("sbse", item.SBSE);
                                    retApp.Add("sl", null);
                                    retApp.Add("sbzlmc", item.ZSXM);
                                    retApp.Add("sblxDm", "1");
                                    retApp.Add("sblxmc", "正常申报");
                                    retApp.Add("yzpzzlDm", "BDA0610135");
                                    retApp.Add("sbblbUrl", item.Url);
                                    retApp.Add("sbztmc", "申报成功");
                                    retApp.Add("kksj", "");
                                    retApp.Add("sbblbList", null);
                                    retApp.Add("plxzUrl", "");
                                    retApp.Add("gdsBz", "1");  
                                    applst.Add(retApp);
                                }


                            }

                        }


                    }
                }
            }
            data = File.ReadAllText(context.Server.MapPath("querySbjgxx.json"));

            data = data.Replace("@@data", JsonConvert.SerializeObject(applst)).Replace("\"[", "[").Replace("]\"", "]");
            context.Response.ContentType = "text/plain";
            context.Response.Write(data);
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