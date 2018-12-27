<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sb_ybnsr_082.aspx.cs" Inherits="JlueTaxSystemHeBeiBS.sbzx_web.apps.views.sb_ybnsr._082.sb_ybnsr_082" %>

<!DOCTYPE html>
<html lang=en>
<head>
    <meta charset=UTF-8>
    <meta http-equiv=X-UA-Compatible content="IE=Edge,chrome=1">
    <meta name=viewport content="width=device-width, initial-scale=1.0">
    <title>《增值税纳税申报表附列资料（五）》（不动产分期抵扣计算表）</title>
    <link rel=stylesheet href=../../../../apps/scripts/reportSB3.0/style.css?v =1538121400974_2.0.0>
    <link rel=stylesheet href=../../../../apps/scripts/reportSB3.0/servyouReport.css?v =1538121400974_2.0.0>
</head>
<body>
    <div class=container>
        <div id=tabs class=mini-tabs activeindex=0 style="width: 100%;" plain=false>
            <div name=082 title=《增值税纳税申报表附列资料（五）》（不动产分期抵扣计算表）>
                <div class=table-box>
                    <table id=table_082 class=sb_table type=sb sb_url=config sb_id=082 sb_title=《增值税纳税申报表附列资料（五）》（不动产分期抵扣计算表） width=100%>
                        <thead>
                            <tr>
                                <td colspan=12 class=table-title>增值税纳税申报表附列资料（五）</td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                            </tr>
                            <tr>
                                <td colspan=12>（不动产分期抵扣计算表）</td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                            </tr>
                            <tr>
                                <td colspan=12 class=txt-c>
                                    税款所属时间：
                                    <span class=sssqq></span>至
                                    <span class=sssqz></span>
                                </td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                            </tr>
                            <tr>
                                <td colspan=9 class=txt-l>纳税人名称（公章）：<span class=nsrmc></span></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                                <td colspan=3 class=txt-r>金额单位：元至角分</td>
                                <td class=hidden></td>
                                <td class=hidden></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan=2>期初待抵扣不动产进项税额</td>
                                <td class=hidden></td>
                                <td colspan=2>本期不动产进项税额增加额</td>
                                <td class=hidden></td>
                                <td colspan=2>本期可抵扣不动产进项税额</td>
                                <td class=hidden></td>
                                <td colspan=2>本期转入的待抵扣不动产进项税额</td>
                                <td class=hidden></td>
                                <td colspan=2>本期转出的待抵扣不动产进项税额</td>
                                <td class=hidden></td>
                                <td colspan=2>期末待抵扣不动产进项税额</td>
                                <td class=hidden></td>
                            </tr>
                            <tr class=hidden></tr>
                            <tr>
                                <td colspan=2>1</td>
                                <td class=hidden></td>
                                <td colspan=2>2</td>
                                <td class=hidden></td>
                                <td colspan=2>3≤1+2+4</td>
                                <td class=hidden></td>
                                <td colspan=2>4</td>
                                <td class=hidden></td>
                                <td colspan=2>5≤1+4</td>
                                <td class=hidden></td>
                                <td colspan=2>6=1+2-3+4-5</td>
                                <td class=hidden></td>
                            </tr>
                            <tr>
                                <td colspan=2 class="txt-r enable"><input type=text value=0.00 servyou_type=nonnegative></td>
                                <td class=hidden></td>
                                <td colspan=2 class="txt-r enable"><input type=text value=0.00 servyou_type=nonnegative></td>
                                <td class=hidden></td>
                                <td colspan=2 class="txt-r enable"><input type=text value=0.00 servyou_type=nonnegative></td>
                                <td class=hidden></td>
                                <td colspan=2 class="txt-r enable"><input type=text value=0.00 servyou_type=nonnegative></td>
                                <td class=hidden></td>
                                <td colspan=2 class="txt-r enable"><input type=text value=0.00 servyou_type=nonnegative></td>
                                <td class=hidden></td>
                                <td colspan=2 class=txt-r><input type=text disabled= disabled value=0.00></td>
                                <td class=hidden></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class=btn-group id=btn-group></div>
    </div>
    <script src=../../../../lib/jquery/jquery.min.js?v =1538121400974_2.0.0></script>
    <script src=../../../../apps/scripts/miniui-year.js?v =1538121400974_2.0.0></script>
    <script src=../../../../lib/lodop/lodopPrint.js?v =1538121400974_2.0.0></script>
    <script src=../../../../apps/scripts/common-include-year.js?v =1538121400974_2.0.0></script>
    <script src=../../../../apps/scripts/reportSB3.0/servyouReport-year.js?v =1538121400974_2.0.0></script>
    <script src=../../apiService/ybnsrService.js?v =1538121400974_2.0.0></script>
    <script src=sb_ybnsr_082.js?v =1538121400974_2.0.0></script>
</body>
</html>