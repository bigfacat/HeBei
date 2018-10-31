using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace JlueTaxSystemHeBeiBS.Code
{
    public class GTXMethod
    {

        public static GTXResult GetEnter()
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string QuestionId = CurrentUser.GetInstance().GetCurrentQuestionId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GTXUserQuestion/GetEnter?userid=" + userid + "&questionid=" + QuestionId + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }
        /// <summary>
        /// 获取企业联系人
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetCompanyPerson()
        {
            string companyId = CurrentUser.GetInstance().GetCurrentCompanyId;
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/CompanyPerson.asmx/GetByCompanyId?CompanyId=" + companyId;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取企业信息表记录
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetCompany()
        {
            string companyId = CurrentUser.GetInstance().GetCurrentCompanyId;
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/Company.asmx/GetByCompanyId?CompanyId=" + companyId;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取学员题目信息
        /// </summary>
        /// <param name="id">用户题目id</param>
        /// <returns></returns>
        public static GTXResult GetUserQuestion(string id)
        {
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GTXUserQuestion/GetEnter?userid=" + userid + "&questionid=" + id + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }


        /// <summary>
        /// 获取河北国税的的应申报清册记录
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetHeBeiYSBQC()
        {
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string questionId = CurrentUser.GetInstance().GetCurrentQuestionId;
            string classid = CurrentUser.GetInstance().GetCurrentClassId;

            
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXHeBeiUserYSBQC/GetList?userid=" + userid + "&questionId=" + questionId + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 河北国税通用的保存报表数据
        /// </summary>
        /// <param name="jsonReportData">报表中的name value</param>
        /// <returns></returns>
        public static GTXResult SaveUserReportData(string jsonReportData, string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userId = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXHeBeiUserYSBQCReportData/Add", string.Format("classid={0}&jsonReportData={1}&userYsbqcId={2}&reportCode={3}&userId={4}"
                , classid, jsonReportData, userYsbqcId, reportCode, userId));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取河北省国税通用的已保存的报表数据
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetUserReportData(string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXHeBeiUserYSBQCReportData/Get", string.Format("classid={0}&userYsbqcId={1}&reportCode={2}"
                , classid, userYsbqcId, reportCode));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 更新英申报清册的状态,已申报
        /// </summary>
        public static GTXResult UpdateYSBQC(string userYSBQCId, string SBZT)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXHeBeiUserYSBQC/UpdateSBZT?Id=" + userYSBQCId + "&classid=" + classid + "&SBZT=" + SBZT;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        public static string getYnse(string taskname, string sbformdata)
        {
            string ynse = "0.00";
            string qty = "";
            double yse=0.00;
            if (taskname == "增值税小规模纳税人申报（新版）")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNode xnSB_NSSBB_MXXX = doc.SelectSingleNode("zzssyyxgmnsr/zzsxgmGrid/zzsxgmGridlb");
                XmlNodeList xnRecIDList = xnSB_NSSBB_MXXX.ChildNodes;
                XmlNode xnSB_NSSBB_JEXX = xnRecIDList[23];
                ynse = xnSB_NSSBB_JEXX.InnerText;
            }
            else if (taskname == "印花税纳税申报（报告）表")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNodeList xnSB_NSSBB_MXXX = doc.SelectNodes("yhssb/yhssbGrid/yhssbGridlb");
                foreach (XmlNode node in xnSB_NSSBB_MXXX)
                {
                    qty= node["bqybtse"].InnerText;
                    double a=Convert.ToDouble(qty);
                    double b = Convert.ToDouble(yse);
                    yse =a+b;
                    ynse = yse.ToString();
                }
               // XmlNode xnSB_NSSBB_JEXX = xnRecIDList[8];
               
            }
            else if (taskname == "附加税（费）申报")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNodeList xnSB_NSSBB_MXXX = doc.SelectNodes("fjssbb/sbxxGrid/sbxxGridlbVO");
                foreach (XmlNode node in xnSB_NSSBB_MXXX)
                {
                    qty = node["bqybtse"].InnerText;
                    double a = Convert.ToDouble(qty);
                    double b = Convert.ToDouble(yse);
                    yse = a + b;
                    ynse = yse.ToString();
                }
               // XmlNode xnSB_NSSBB_JEXX = xnRecIDList[14];
              
            }
            else if (taskname == "通用申报表（工会经费）")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNodeList xnSB_NSSBB_MXXX = doc.SelectNodes("fxmtySbb/sbxxGrid/sbxxGridlb");
                foreach (XmlNode node in xnSB_NSSBB_MXXX)
                {
                    qty = node["bqybtsfe"].InnerText;
                    double a = Convert.ToDouble(qty);
                    double b = Convert.ToDouble(yse);
                    yse = a + b;
                    ynse = yse.ToString();
                }
                //XmlNode xnSB_NSSBB_JEXX = xnRecIDList[18];
               
            }
            else if (taskname == "居民企业所得税月（季）度预缴纳税申报（A类）")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNode xnSB_NSSBB_MXXX = doc.SelectSingleNode("A200000Ywbd/sbbxxForm");
                XmlNodeList xnRecIDList = xnSB_NSSBB_MXXX.ChildNodes;
                XmlNode xnSB_NSSBB_JEXX = xnRecIDList[14];
                ynse = xnSB_NSSBB_JEXX.InnerText;
            }
            else if (taskname == "居民企业所得税月（季）度预缴纳税申报（B类）")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNode xnSB_NSSBB_MXXX = doc.SelectSingleNode("qysdshdzsyjdndsb/qysdsyddhndnssbbblFrom");
                XmlNodeList xnRecIDList = xnSB_NSSBB_MXXX.ChildNodes;
                XmlNode xnSB_NSSBB_JEXX = xnRecIDList[14];
                ynse = xnSB_NSSBB_JEXX.InnerText;
            }
            else if (taskname == "增值税一般纳税人申报")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sbformdata);
                XmlNode xnSB_NSSBB_MXXX = doc.SelectSingleNode("fxmtySbb/sbxxGrid/sbxxGridlb");
                XmlNodeList xnRecIDList = xnSB_NSSBB_MXXX.ChildNodes;
                XmlNode xnSB_NSSBB_JEXX = xnRecIDList[18];
                ynse = xnSB_NSSBB_JEXX.InnerText;
            }
            return ynse;
        }
        /// <summary>
        /// 更新英申报清册的申报税额
        /// </summary>
        public static GTXResult UpdateSBSE(string userYSBQCId, string SBSE)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXHeBeiUserYSBQC/UpdateSBSE?Id=" + userYSBQCId + "&classid=" + classid + "&SBSE=" + SBSE;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 更新英申报清册的填报情况
        /// </summary>
        public static GTXResult UpdateYSBQCtbzt(string userYSBQCId, string reportCode, string tbzt)
        {
            string nowtbzt = (tbzt + reportCode + ";");
            if (reportCode == "")
            {
                nowtbzt = tbzt;
            }
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXHeBeiUserYSBQC/Updatetbzt?Id=" + userYSBQCId + "&classid=" + classid + "&tbzt=" + nowtbzt;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 根据userYSBQCId获取河北国税的的应申报清册记录
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetAHYSBQCByUserYSBQCId(string UserYSBQCId)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;

            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXAHUserYSBQC/GetModel?Id=" + UserYSBQCId + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 删除用户报表数据
        /// </summary>
        /// <returns></returns>
        public static GTXResult DeleteUserReportData(string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userId = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXHeBeiUserYSBQCReportData/Delete", string.Format("classid={0}&userYsbqcId={1}&userId={2}&reportCode={3}"
                , classid, userYsbqcId, userId, reportCode));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        //作废
        public static GTXResult InitDataDF(string UserYSBQCId)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string UserQuestionId = CurrentUser.GetInstance().GetCurrentUserQuestionId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXHeBeiUserYSBQC/InitDataDF?classid=" + classid + "&UserYSBQCId=" + UserYSBQCId + "&UserQuestionId=" + UserQuestionId;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取河北的报表数据配置记录
        /// </summary>
        /// <param name="toReportCode"></param>
        /// <returns></returns>
        public static GTXResult GetAHReportDataConfig(string toReportCode)
        {
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/HeBei/ReportDataConfigHeBei.asmx/GetListByToReportCode?toReportCode=" + toReportCode;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取匹配数据
        /// </summary>
        /// <param name="jsonName"></param>
        /// <returns></returns>
        public static GTXResult LoadAHReportData(string jsonName, string useYSBQCId)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GTXHeBeiUserYSBQCReportData/GetListByUserYSBQCIdAndKey"
                , string.Format("classid={0}&UserYSBQCId={1}&jsonnames={2}", classid, useYSBQCId, jsonName));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        public static string getCompanyinfo(string json)
        {
            StringBuilder jsonstr = new StringBuilder(json);
            GTXResult resultCompany = GTXMethod.GetCompany();
            if (resultCompany.IsSuccess)
            {
                JObject company = (JObject)JsonConvert.DeserializeObject(resultCompany.Data.ToString());
                if (company.HasValues)
                {
                    jsonstr.Replace("@@ZCDZ", (company["ZCDZ"] == null ? "" : company["ZCDZ"].ToString()))
                        .Replace("@@JYFW", (company["JYFW"] == null ? "" : company["JYFW"].ToString()))
                        .Replace("@@GBHY", (company["GBHY"] == null ? "" : company["GBHY"].ToString()))
                        .Replace("@@SCJYDZ", (company["SCJYDZ"] == null ? "" : company["SCJYDZ"].ToString()))
                        .Replace("@@ZGDSSWJFJMC", (company["ZGDSSWJFJMC"] == null ? "" : company["ZGDSSWJFJMC"].ToString()))
                        .Replace("@@DJZCLX", (company["DJZCLX"] == null ? "" : company["DJZCLX"].ToString()))
                        .Replace("@@LXDH", (company["LXDH"] == null ? "" : company["LXDH"].ToString()))
                        .Replace("@@NSRSBH", (company["NSRSBH"] == null ? "" : company["NSRSBH"].ToString()))
                        .Replace("@@NSRMC", (company["NSRMC"] == null ? "" : company["NSRMC"].ToString()));
                }
            }

            GTXResult resultCompanyPerson = GTXMethod.GetCompanyPerson();
            if (resultCompanyPerson.IsSuccess)
            {
                JArray jrperson = (JArray)JsonConvert.DeserializeObject(resultCompanyPerson.Data.ToString());
                if (jrperson.Count > 0)
                {
                    for (int i = 0; i < jrperson.Count; i++)
                    {
                        JObject joperson = JObject.Parse(jrperson[i].ToString());
                        if (joperson["PersonType"] != null && joperson["PersonType"].ToString() == "0")
                        {
                            jsonstr.Replace("@@FDDB", (joperson["Name"] == null ? "" : joperson["Name"].ToString()))
                                    .Replace("@@FDID", (joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString()))
                                    .Replace("@@FDSJ", (joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString()));
                        }
                        if (joperson["PersonType"] != null && joperson["PersonType"].ToString() == "2")
                        {
                            jsonstr.Replace("@@BSR", (joperson["Name"] == null ? "" : joperson["Name"].ToString()))
                                    .Replace("@@BSID", (joperson["IDCardNum"] == null ? "" : joperson["IDCardNum"].ToString()))
                                    .Replace("@@BSSJ", (joperson["MobilePhone"] == null ? "" : joperson["MobilePhone"].ToString()));
                        }
                    }
                }
            }
            return jsonstr.ToString();
        }

        public static bool zzsSave(string table_name, string ReportData)
        {
            string StrTaskName = "增值税一般纳税人申报";

            string id = "";
            string TBZT = "";
            GTXResult resultq = GTXMethod.GetHeBeiYSBQC();
            if (resultq.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(resultq.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.TaskName == StrTaskName)
                        {
                            id = item.Id.ToString();
                            TBZT = item.TBZT;
                        }
                    }
                }
            }

            List<GTXNameValue> nameList = new List<GTXNameValue>();
            GTXNameValue nv = new GTXNameValue();
            nv.key = "data";
            byte[] bytes = Encoding.Default.GetBytes(ReportData);
            string _result = Convert.ToBase64String(bytes);
            nv.value = _result;
            nameList.Add(nv);
            GTXResult saveresult = GTXMethod.SaveUserReportData(JsonConvert.SerializeObject(nameList), id, table_name);
            if (saveresult.IsSuccess)
            {
                JArray ja = new JArray();
                JObject add_jo = new JObject();

                if (table_name == "001")
                {
                    XmlDocument xd = new XmlDocument();
                    JObject input_jo = JsonConvert.DeserializeObject<JObject>(ReportData);
                    JValue j3xmlData = (JValue)input_jo["jsonData"]["j3xmlData"];

                    JArray j = JsonConvert.DeserializeObject<JArray>(j3xmlData.ToString());
                    string bbxml = j[0]["bbxml"].ToString();
                    xd.LoadXml(bbxml);

                    XmlNodeList xml_zbGridlbVO = xd.SelectSingleNode("zzssyyybnsr_zb").SelectSingleNode("zbGrid").SelectNodes("zbGridlbVO");
                    XmlNode xml_bqybtse = xml_zbGridlbVO[0]["bqybtse"];
                    string bqybtse = xml_bqybtse.InnerText;

                    GTXMethod.UpdateSBSE(id, bqybtse);

                }

                if (TBZT != null)
                {
                    ja = JsonConvert.DeserializeObject<JArray>(TBZT);
                    foreach (JObject jo in ja)
                    {
                        if (jo["bbid"].ToString().Equals(table_name))
                        {
                            jo["status"] = 1;
                            GTXMethod.UpdateYSBQCtbzt(id, "", JsonConvert.SerializeObject(ja));
                            return true;
                        }
                    }

                    add_jo.Add("bbid", table_name);
                    add_jo.Add("status", 1);
                    ja.Add(add_jo);

                    GTXMethod.UpdateYSBQCtbzt(id, "", JsonConvert.SerializeObject(ja));
                }
                else
                {
                    add_jo.Add("bbid", table_name);
                    add_jo.Add("status", 1);
                    ja.Add(add_jo);

                    GTXMethod.UpdateYSBQCtbzt(id, "", JsonConvert.SerializeObject(ja));
                }
                return true;
            }
            else
            {
                return false;
            }

        }

        public static JObject getZzsReportData(string table_name)
        {
            JObject return_json = new JObject();
            string StrTaskName = "增值税一般纳税人申报";
            string id = "";
            GTXResult resultq = GTXMethod.GetHeBeiYSBQC();
            if (resultq.IsSuccess)
            {
                List<GDTXHeBeiUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXHeBeiUserYSBQC>>(resultq.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXHeBeiUserYSBQC item in ysbqclist)
                    {
                        if (item.TaskName == StrTaskName)
                        {
                            id = item.Id.ToString();
                        }
                    }
                }
            }

            GTXResult gr = GTXMethod.GetUserReportData(id, table_name);
            if (gr.IsSuccess == true)
            {
                JArray jarr = new JArray();
                jarr = JsonConvert.DeserializeObject<JArray>(gr.Data.ToString());

                if (jarr.Count > 0)
                {
                    byte[] bytes = Convert.FromBase64String(jarr[0]["dataValue"].ToString().Replace(" ", "+"));
                    string dataValue = Encoding.Default.GetString(bytes);
                    JObject jv = JsonConvert.DeserializeObject<JObject>(dataValue);

                    return_json = jv;
                }
            }
            return return_json;
        }

    }
}