﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Web;
using JlueTaxSystemHeBeiBS.Code;
using JlueTaxSystemHeBeiBS.Models;

namespace JlueTaxSystemHeBeiBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/fjs")]
    public class fjsController : ApiController
    {
        YsbqcSetting set { get; set; }

        Nsrxx xx { get; set; }

        GDTXDate date { get; set; }

        GDTXUserYSBQC qc { get; set; }

        public fjsController(YsbqcSetting _is)
        {
            this.set = _is;
            date = set.getGDTXDate(this.GetType());
            xx = set.getNsrxx();
        }

        [Route("hdxx")]
        public JObject fjs()
        {
            JObject re_json = new JObject();

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string str = "";
            qc = set.getUserYSBQC(sbzlDm);
            if (qc.SBZT == set.ysbzt)
            {
                str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.ysb.json"));
                re_json = JsonConvert.DeserializeObject<JObject>(str);
            }
            else
            {
                str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.json"));
                re_json = JsonConvert.DeserializeObject<JObject>(str);

                JToken sbzl = re_json.SelectToken("value.sbzl[0]");
                sbzl["sksssqQ"] = date.skssqq;
                sbzl["sksssqZ"] = date.skssqz;
                JToken SFSYXGMZC = sbzl.SelectToken("wsxxs.wsxx").Where(a => a["code"].ToString() == "SFSYXGMZC").FirstOrDefault();
                if (xx.TaxPayerType == 1)
                {
                    SFSYXGMZC["value"] = "N";
                }
                else if (xx.TaxPayerType == 2)
                {
                    SFSYXGMZC["value"] = "Y";
                }
            }

            return re_json;
        }

    }
}
