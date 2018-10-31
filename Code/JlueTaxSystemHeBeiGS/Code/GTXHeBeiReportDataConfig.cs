using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiGS.Code
{
    public class GTXHeBeiReportDataConfig
    {
        /// <summary>
        /// 
        /// </summary>
        public Int32 Id { get; set; }

        /// <summary>
        /// 匹配类型，1等值匹配，2公式匹配
        /// </summary>
        public Int32 ConfigType { get; set; }

        /// <summary>
        /// 源报表代码
        /// </summary>
        public String FromReportCode { get; set; }

        /// <summary>
        /// 源报表表单name
        /// </summary>
        public String FromReportName { get; set; }

        /// <summary>
        /// 目的报表代码
        /// </summary>
        public String ToReportCode { get; set; }

        /// <summary>
        /// 目的报表表单name
        /// </summary>
        public String ToReportName { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public String Remark { get; set; }

        /// <summary>
        /// 公式参数
        /// </summary>
        public String Parameter { get; set; }
    }
}