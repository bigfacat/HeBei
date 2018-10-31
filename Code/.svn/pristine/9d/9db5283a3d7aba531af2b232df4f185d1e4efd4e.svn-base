using JlueTaxSystemHeBeiGS.Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JlueTaxSystemHeBeiGS
{
    public partial class QuestionMain : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string userid = Request.QueryString["userid"].ToString();
                string username = Request.QueryString["username"].ToString();
                string classid = Request.QueryString["classid"].ToString();
                string courseid = Request.QueryString["courseid"].ToString();
                string sortid = Request.QueryString["sortid"].ToString();
                APIResult obj = new APIResult();
                if (string.IsNullOrEmpty(userid) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(classid) || string.IsNullOrEmpty(courseid) || string.IsNullOrEmpty(sortid))
                {
                    Response.Redirect("Error.aspx");
                }
                else
                {
                    Check c = new Check();
                    bool res = c.ProcessRequest("get", userid, "", "");
                    if (res == false)
                    {
                        Response.Redirect("Error.aspx");
                    }
                }
            }
            catch
            {
                Response.Redirect("Error.aspx");
            }
        }
    }
}