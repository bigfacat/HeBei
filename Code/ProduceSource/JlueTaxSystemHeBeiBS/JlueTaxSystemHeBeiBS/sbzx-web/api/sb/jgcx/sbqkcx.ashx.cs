using JlueTaxSystemHeBeiBS.Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemHeBeiBS.sbzx_web.api.sb.jgcx
{
    /// <summary>
    /// sbqkcx 的摘要说明
    /// </summary>
    public class sbqkcx : IHttpHandler, IReadOnlySessionState
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
            var sbztDm = jo["sbztDm"].ToString().Replace("\"", "");
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
                                        retApp.Add("sbxh", item.Id);
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", null);
                                        retApp.Add("sbzlDm", item.Code);
                                        retApp.Add("sbzlMc", item.ZSXM);
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("skssqq", item.SKSSQQ);
                                        retApp.Add("skssqz", item.SKSSQZ);
                                        retApp.Add("sbztDm", "0000");
                                        retApp.Add("sbztms", "申报成功");
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrsj", item.SBQX);
                                        retApp.Add("sblxDm", "11");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("qqwjm", null);
                                        retApp.Add("sbny", null);
                                        retApp.Add("scpzxh", null);
                                        retApp.Add("qdid", "");
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("czDmList", "@@czDmList");
                                        retApp.Add("sl", null);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("gzlxDm", "1");
                                        retApp.Add("zsZsxmDm", null);
                                        retApp.Add("zsSbzlDm", null);
                                        retApp.Add("ybjcbz", "");
                                        retApp.Add("gdsBz", "1");
                                        retApp.Add("sbzlDlDm", item.Code);
                                        applst.Add(retApp);
                                    }


                                }
                                else if (zsxmDm != "" && sbztDm != "")
                                {
                                  
                                    if (int.Parse(zsxmDm) == item.Code )
                                    {
                                        JObject retApp = new JObject();
                                        retApp.Add("sbxh", item.Id);
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", null);
                                        retApp.Add("sbzlDm", item.Code);
                                        retApp.Add("sbzlMc", item.ZSXM);
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("skssqq", item.SKSSQQ);
                                        retApp.Add("skssqz", item.SKSSQZ);
                                        retApp.Add("sbztDm", "0000");
                                        retApp.Add("sbztms", "申报成功");
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrsj", item.SBQX);
                                        retApp.Add("sblxDm", "11");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("qqwjm", null);
                                        retApp.Add("sbny", null);
                                        retApp.Add("scpzxh", null);
                                        retApp.Add("qdid", "");
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("czDmList", "@@czDmList");
                                        retApp.Add("sl", null);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("gzlxDm", "1");
                                        retApp.Add("zsZsxmDm", null);
                                        retApp.Add("zsSbzlDm", null);
                                        retApp.Add("ybjcbz", "");
                                        retApp.Add("gdsBz", "1");
                                        retApp.Add("sbzlDlDm", item.Code);
                                        applst.Add(retApp);
                                    }
                                }
                                else if (zsxmDm != "" && sbztDm != "" && sssqQ != "" && sssqZ != "")
                                {
                                   
                                    DateTime t3 = DateTime.Parse(sssqQ);
                                    DateTime t4 = DateTime.Parse(sssqZ);
                                    if (int.Parse(zsxmDm) == item.Code  && DateTime.Compare(DateTime.Parse(item.SKSSQQ), t3) >= 0 && DateTime.Compare(t4, DateTime.Parse(item.SKSSQZ)) >= 0)
                                    {
                                        JObject retApp = new JObject();
                                        retApp.Add("sbxh", item.Id);
                                        retApp.Add("djxh", "10121306010000052395");
                                        retApp.Add("nsrsbh", null);
                                        retApp.Add("zsxmDm", null);
                                        retApp.Add("sbzlDm", item.Code);
                                        retApp.Add("sbzlMc", item.ZSXM);
                                        retApp.Add("sbse", item.SBSE);
                                        retApp.Add("skssqq", item.SKSSQQ);
                                        retApp.Add("skssqz", item.SKSSQZ);
                                        retApp.Add("sbztDm", "0000");
                                        retApp.Add("sbztms", "申报成功");
                                        retApp.Add("sbrq", item.SBQX);
                                        retApp.Add("lrsj", item.SBQX);
                                        retApp.Add("sblxDm", "11");
                                        retApp.Add("pzxh", "10021318000048344350");
                                        retApp.Add("qqwjm", null);
                                        retApp.Add("sbny", null);
                                        retApp.Add("scpzxh", null);
                                        retApp.Add("qdid", "");
                                        retApp.Add("yzpzzlDm", "BDA0610135");
                                        retApp.Add("czDmList", "@@czDmList");
                                        retApp.Add("sl", null);
                                        retApp.Add("sbuuid", "21318102310374655696");
                                        retApp.Add("gzlxDm", "1");
                                        retApp.Add("zsZsxmDm", null);
                                        retApp.Add("zsSbzlDm", null);
                                        retApp.Add("ybjcbz", "");
                                        retApp.Add("gdsBz", "1");
                                        retApp.Add("sbzlDlDm", item.Code);
                                        applst.Add(retApp);
                                    }
                                }
                                else
                                {
                                    JObject retApp = new JObject();
                                    retApp.Add("sbxh", item.Id);
                                    retApp.Add("djxh", "10121306010000052395");
                                    retApp.Add("nsrsbh", null);
                                    retApp.Add("zsxmDm", null);
                                    retApp.Add("sbzlDm",item.Code);
                                    retApp.Add("sbzlMc", item.ZSXM);
                                    retApp.Add("sbse", item.SBSE);
                                    retApp.Add("skssqq", item.SKSSQQ);
                                    retApp.Add("skssqz", item.SKSSQZ);
                                    retApp.Add("sbztDm", "0000");
                                    retApp.Add("sbztms", "申报成功");
                                    retApp.Add("sbrq", item.SBQX);
                                    retApp.Add("lrsj", item.SBQX);
                                    retApp.Add("sblxDm", "11");
                                    retApp.Add("pzxh", "10021318000048344350");
                                    retApp.Add("qqwjm", null);
                                    retApp.Add("sbny", null);
                                    retApp.Add("scpzxh", null);
                                    retApp.Add("qdid", "");
                                    retApp.Add("yzpzzlDm", "BDA0610135");
                                    retApp.Add("czDmList", "@@czDmList");
                                    retApp.Add("sl", null);
                                    retApp.Add("sbuuid", "21318102310374655696");
                                    retApp.Add("gzlxDm", "1");
                                    retApp.Add("zsZsxmDm", null);
                                    retApp.Add("zsSbzlDm", null);
                                    retApp.Add("ybjcbz", "");
                                    retApp.Add("gdsBz", "1");
                                    retApp.Add("sbzlDlDm", item.Code);
                                    applst.Add(retApp);
                                }


                            }

                        }
                        

                    }
                }
            }
            data= File.ReadAllText(context.Server.MapPath("sbqkcx.json"));
           
            data = data.Replace("@@data", JsonConvert.SerializeObject(applst)).Replace("@@czDmList","[\"01\",\"04\"]").Replace("\"[","[").Replace("]\"","]");
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