

using JlueTaxSystemHeBeiGS;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JlueTaxSystem.WebUI
{
    public partial class VideoManage1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                publicmethod p = new publicmethod();
                string path = System.Web.Configuration.WebConfigurationManager.AppSettings["Practicepath"] + "/APIPractice/VideoManage.asmx/GetByCourseId?CourseId="+System.Web.Configuration.WebConfigurationManager.AppSettings["CourseId"];
                string resut = p.HttpGetFunction(path);
                ActionResult ar = JsonConvert.DeserializeObject<ActionResult>(resut);
                Session["VideoManage"] = ar.Data;
            }
            catch
            {


            }
        }

        public class ActionResult
        {
            /// <summary>
            /// 是否返回成功
            /// </summary>
            public bool IsSuccess { get; set; }
            /// <summary>
            /// 返回代码
            /// </summary>
            public int Code { get; set; }
            /// <summary>
            /// 返回提示信息
            /// </summary>
            public string Message { get; set; }
            /// <summary>
            /// 返回数据
            /// </summary>
            public string Data { get; set; }
        }
    }
}