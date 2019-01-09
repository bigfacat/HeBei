using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;

namespace JlueTaxSystemHeBeiBS.Code
{
    public partial class GDTXHeBeiUserYSBQCReport
    {

        /// <summary>
        /// 主键
        /// </summary>
        public Int32 Id { get; set; }

        /// <summary>
        /// 报表id
        /// </summary>
        public Guid ReportId { get; set; }

        /// <summary>
        /// 所属父id
        /// </summary>
        public Guid ParentId { get; set; }

        /// <summary>
        /// 学员id
        /// </summary>
        public String UserId { get; set; }

        /// <summary>
        /// 应申报任务id
        /// </summary>
        public Int32 UserYSBQCId { get; set; }

        /// <summary>
        /// 报表名称
        /// </summary>
        public String ReportName { get; set; }

        /// <summary>
        /// 报表编码
        /// </summary>
        public String ReportCode { get; set; }

        /// <summary>
        /// 申报状态
        /// </summary>
        public String SBZT { get; set; }

        /// <summary>
        /// 报表url地址
        /// </summary>
        public String ReportURL { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public String Remark { get; set; }

        /// <summary>
        /// 排序字段
        /// </summary>
        public Int32 OrderNum { get; set; }
    }
}
