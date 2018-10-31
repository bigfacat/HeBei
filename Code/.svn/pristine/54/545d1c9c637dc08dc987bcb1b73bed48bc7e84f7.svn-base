using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace JlueTaxSystemHeBeiGS.Code
{
    public class GTXMethod
    {
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
        /// 获取法定代表
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetCompanyFDDB()
        {
            string companyId = CurrentUser.GetInstance().GetCurrentCompanyId;
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/CompanyHead.asmx/GetByCompanyId?CompanyId=" + companyId;
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
            string fullpath = path + "/GTX/GTXHeBeiUserYSBQC/GetList?userid=" + userid + "&questionId=" + questionId + "&classid=" + classid;
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
            string json = p.HttpPost(path + "/GTX/GTXHeBeiUserYSBQCReportData/Add", string.Format("classid={0}&jsonReportData={1}&userYsbqcId={2}&reportCode={3}&userId={4}"
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
            string json = p.HttpPost(path + "/GTX/GTXHeBeiUserYSBQCReportData/Get", string.Format("classid={0}&userYsbqcId={1}&reportCode={2}"
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
            string fullpath = path + "/GTX/GTXHeBeiUserYSBQC/UpdateSBZT?Id=" + userYSBQCId + "&classid=" + classid + "&SBZT=" + SBZT;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 更新英申报清册的填报情况
        /// </summary>
        public static GTXResult UpdateYSBQCtbqk(string userYSBQCId, string reportCode, string tbqk)
        {
            string nowtbqk = (tbqk + reportCode + ";");
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXAHUserYSBQC/Updatetbqk?Id=" + userYSBQCId + "&classid=" + classid + "&tbqk=" + nowtbqk;
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
        public static GTXResult DeleteDLUserReportData(string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userId = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GTXGXUserYSBQCReportData/Delete", string.Format("classid={0}&userYsbqcId={1}&userId={2}&reportCode={3}"
                , classid, userYsbqcId, userId, reportCode));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        //作废
        public static GTXResult InitDataDF(string UserYSBQCId)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string UserQuestionId = CurrentUser.GetInstance().GetCurrentUserQuestionId;
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + string.Format("/GTX/GTXHeBeiUserYSBQC/InitDataDF")
                , string.Format("classid={0}&UserYSBQCId={1}&UserQuestionId={2}&UserId={3}", classid, UserYSBQCId, UserQuestionId, userid));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取匹配数据
        /// </summary>
        /// <param name="jsonName"></param>
        /// <returns></returns>
        public static GTXResult LoadSCReportData(string jsonName, string userYsbqcId)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            //string userYsbqcId = "";
            //string userYsbqcId = CurrentUser.GetInstance().GetCurrentUserYSBQCId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXAHUserYSBQCReportData/GetListByUserYSBQCIdAndKey"
                , string.Format("classid={0}&UserYSBQCId={1}&jsonnames={2}", classid, userYsbqcId, jsonName));
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
            string fullpath = path + "/APIPractice/AH/ReportDataConfigAH.asmx/GetListByToReportCode?toReportCode=" + toReportCode;
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
            string json = p.HttpPost(path + "/GTX/GDTXAHUserYSBQCReportData/GetListByUserYSBQCIdAndKey"
                , string.Format("classid={0}&UserYSBQCId={1}&jsonnames={2}", classid, useYSBQCId, jsonName));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取应纳税额
        /// </summary>
        /// <param name="taskname"></param>
        /// <param name="sbformdata"></param>
        /// <returns></returns>
        public static string getYnse(string taskname, string sbformdata)
        {
            string ynse = "";
            if (taskname == "增值税一般纳税人申报")
            {
                JObject jo = JObject.Parse(sbformdata);
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(jo["001"].ToString());
                XmlNode xnSB_NSSBB_MXXX = doc.SelectSingleNode("//SB_NSSBB_MXXX");
                XmlNodeList xnRecIDList = xnSB_NSSBB_MXXX.ChildNodes;
                XmlNode xnSB_NSSBB_JEXX = xnRecIDList[23];
                XmlNode xnSB_NSSBB_YBBYS = xnSB_NSSBB_JEXX.SelectSingleNode("SB_NSSBB_YBBYS");
                ynse = xnSB_NSSBB_YBBYS.InnerText;
            }
            return ynse;
        }

        public static string getsaveYnse(string useYSBQCId)
        {
            string ynse = "";
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GTXHeBeiUserYSBQCReportData/Get", string.Format("classid={0}&userYsbqcId={1}&reportCode={2}"
                , classid, useYSBQCId, ""));
            GTXResult re= JsonConvert.DeserializeObject<GTXResult>(json);
            if (re.IsSuccess)
            {
                List<GTXHeBeiUserYSBQCReportData> listdata = JsonConvert.DeserializeObject<List<GTXHeBeiUserYSBQCReportData>>(re.Data.ToString());
                byte[] outputb = Convert.FromBase64String(listdata[0].DataValue);
                ynse = Encoding.Default.GetString(outputb);
            }
            return ynse;
        }
    }
}