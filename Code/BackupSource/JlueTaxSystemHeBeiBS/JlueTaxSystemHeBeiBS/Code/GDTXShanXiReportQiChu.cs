using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemHeBeiBS.Code
{
    public class GDTXShanXiReportQiChu
    {
        /// <summary>
        /// 主键标识
        /// </summary>
        public Int32 Id { get; set; }

        /// <summary>
        /// 应申报清册报表id
        /// </summary>
        public Guid YSBQCReportId { get; set; }

        /// <summary>
        /// 应申报清册id
        /// </summary>
        public Guid YSBQCId { get; set; }

        /// <summary>
        /// 报表模板
        /// </summary>
        public String ReportCode { get; set; }

        /// <summary>
        /// 报表键
        /// </summary>
        public String Name { get; set; }

        /// <summary>
        /// 报表值
        /// </summary>
        public String Value { get; set; }
    }
}