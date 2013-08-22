var Yl = {
    trim: function ($) {
        $ = $.replace(/(^\u3000+)|(\u3000+$)/g, "");
        $ = $.replace(/(^ +)|( +$)/g, "");
        return $
    },
    addFav: function (title) {
        var title = title || document.getElementsByTagName("title")[0].innerHTML;
        if (document.all) {
            window.external.AddFavorite(location.href, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, location.href, "");
        } else if (window.opera && window.print) {
            return true;
        }
    },
    setHome: function (obj, hostname) {
        if (!$.browser.msie) {
            alert("您的浏览器不支持自动设置主页，请使用浏览器菜单手动设置。")
            return;
        }
        var host = hostname;
        if (!host) {
            host = window.location.href;
        }
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(host);
    }
};
Cookie = {
    set: function (name, value, expires, path, domain) {
        if (typeof expires == "undefined") {
            expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365);
        }

        document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");

    },
    get: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },
    clear: function (name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }
};
/**ie6 png**/
function pngfix(img){
    if (window.XMLHttpRequest) {return}
    if($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
        var imgStyle = "display:inline-block; " + img.style.cssText;
        var strNewHTML = "<span class=\"" + img.className + "\" title=\"" + img.title + "\" style=\"width:" + img.clientWidth + "px; height:" + img.clientHeight + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src + "', sizingMethod='scale');\"></span>";
        img.outerHTML = strNewHTML;
    }
};
function effect()
{
    var tubiao = $(":input[name='icon'][checked]").val();
    var banshi = $(':input[name=layout][checked]').val();
    var day = $("#showDays").val();
    var font = $("#fc").val();
    var border = $("#bdc").val();
    var background = $("#bgc").val();
    // var ipcheck = $(':input[name=ip][checked]').val();
    // var aid = $("#wname").attr('aid');
    // var str = (ipcheck == 'n') ? '&aid='+aid : '';
    var fr = '<iframe allowtransparency="true" frameborder="0" width="565" height="98" scrolling="no" src="http://dev.tianqi.com/frame.html?icon='+tubiao+'&layout='+banshi+'&showday='+day+'&font='+font+'&background='+background+'&border='+border+'"></iframe>';
    var ifrHref = '/frame.html?ct=plug&ac=effect&icon='+tubiao+'&layout='+banshi+'&showday='+day+'&font='+font+'&background='+background+'&border='+border;
    $("#code").text(fr);
    //console.log(ifrHref)
    $("#wname").attr("src",ifrHref)
}

var DateStatic={
    local:"",
    province_id:'28',
    city_id:'2801',
    weather_id:'101280101',
    cityliststr:'{"01":{"0101":["\u5317\u4eac","B"]},"02":{"0201":["\u4e0a\u6d77","S"]},"03":{"0301":["\u5929\u6d25","T"]},"04":{"0401":["\u91cd\u5e86","C"]},"05":{"0509":["\u5927\u5e86","D"],"0507":["\u5927\u5174\u5b89\u5cad","D"],"0501":["\u54c8\u5c14\u6ee8","H"],"0512":["\u9e64\u5c97","H"],"0506":["\u9ed1\u6cb3","H"],"0504":["\u4f73\u6728\u65af","J"],"0511":["\u9e21\u897f","J"],"0503":["\u7261\u4e39\u6c5f","M"],"0502":["\u9f50\u9f50\u54c8\u5c14","Q"],"0510":["\u4e03\u53f0\u6cb3","Q"],"0513":["\u53cc\u9e2d\u5c71","S"],"0505":["\u7ee5\u5316","S"],"0508":["\u4f0a\u6625","Y"]},"06":{"0606":["\u767d\u57ce","B"],"0609":["\u767d\u5c71 ","B"],"0601":["\u957f\u6625","C"],"0602":["\u5409\u6797","J"],"0607":["\u8fbd\u6e90","L"],"0604":["\u56db\u5e73","S"],"0608":["\u677e\u539f","S"],"0605":["\u901a\u5316","T"],"0603":["\u5ef6\u5409","Y"]},"07":{"0703":["\u978d\u5c71","A"],"0705":["\u672c\u6eaa","B"],"0712":["\u671d\u9633","C"],"0702":["\u5927\u8fde","D"],"0706":["\u4e39\u4e1c","D"],"0704":["\u629a\u987a","F"],"0709":["\u961c\u65b0","F"],"0714":["\u846b\u82a6\u5c9b","H"],"0707":["\u9526\u5dde","J"],"0710":["\u8fbd\u9633","L"],"0713":["\u76d8\u9526","P"],"0701":["\u6c88\u9633","S"],"0711":["\u94c1\u5cad","T"],"0708":["\u8425\u53e3","Y"]},"08":{"0812":["\u963f\u62c9\u5584\u76df","A"],"0802":["\u5305\u5934","B"],"0808":["\u5df4\u5f66\u6dd6\u5c14","B"],"0806":["\u8d64\u5cf0","C"],"0807":["\u9102\u5c14\u591a\u65af","E"],"0801":["\u547c\u548c\u6d69\u7279","H"],"0810":["\u547c\u4f26\u8d1d\u5c14","H"],"0805":["\u901a\u8fbd","T"],"0803":["\u4e4c\u6d77","W"],"0804":["\u4e4c\u5170\u5bdf\u5e03","W"],"0809":["\u9521\u6797\u90ed\u52d2\u76df","X"],"0811":["\u5174\u5b89\u76df","X"]},"09":{"0902":["\u4fdd\u5b9a","B"],"0907":["\u6ca7\u5dde","C"],"0904":["\u627f\u5fb7","C"],"0901":["\u77f3\u5bb6\u5e84","D"],"0910":["\u90af\u90f8","H"],"0908":["\u8861\u6c34","H"],"0906":["\u5eca\u574a","L"],"0911":["\u79e6\u7687\u5c9b","Q"],"0905":["\u5510\u5c71","T"],"0909":[" \u90a2\u53f0","X"],"0903":["\u5f20\u5bb6\u53e3","Z"]},"10":{"1005":["\u957f\u6cbb","C"],"1002":["\u5927\u540c","D"],"1006":["\u664b\u57ce","J"],"1004":["\u664b\u4e2d","J"],"1007":["\u4e34\u6c7e","L"],"1011":["\u5415\u6881","L"],"1009":["\u6714\u5dde","S"],"1001":["\u592a\u539f","T"],"1010":["\u5ffb\u5dde","X"],"1003":["\u9633\u6cc9","Y"],"1008":["\u8fd0\u57ce","Y"]},"11":{"1107":["\u5b89\u5eb7","A"],"1109":["\u5b9d\u9e21","B"],"1108":["\u6c49\u4e2d","H"],"1106":["\u5546\u6d1b","S"],"1110":["\u94dc\u5ddd","T"],"1105":["\u6e2d\u5357","W"],"1101":["\u897f\u5b89","X"],"1102":["\u54b8\u9633","X"],"1103":["\u5ef6\u5b89","Y"],"1104":["\u6986\u6797","Y"]},"12":{"1211":["\u6ee8\u5dde","B"],"1204":["\u5fb7\u5dde","D"],"1212":["\u4e1c\u8425","D"],"1210":["\u83cf\u6cfd","H"],"1201":["\u6d4e\u5357","J"],"1207":["\u6d4e\u5b81","J"],"1216":["\u83b1\u829c","L"],"1217":["\u804a\u57ce","L"],"1209":["\u4e34\u6c82","L"],"1202":["\u9752\u5c9b","Q"],"1215":["\u65e5\u7167","R"],"1208":["\u6cf0\u5b89","T"],"1206":["\u6f4d\u574a","W"],"1213":["\u5a01\u6d77","W"],"1205":["\u70df\u53f0","Y"],"1214":["\u67a3\u5e84","Z"],"1203":["\u6dc4\u535a","Z"]},"13":{"1308":["\u963f\u514b\u82cf","A"],"1307":["\u963f\u62c9\u5c14","A"],"1314":["\u963f\u52d2\u6cf0","A"],"1306":["\u5df4\u97f3\u90ed\u695e","B"],"1316":["\u535a\u5c14\u5854\u62c9","B"],"1304":["\u660c\u5409","C"],"1303":["\u77f3\u6cb3\u5b50","D"],"1311":["\u5854\u57ce","D"],"1312":["\u54c8\u5bc6","H"],"1313":["\u548c\u7530","H"],"1309":["\u5580\u4ec0","K"],"1302":["\u514b\u62c9\u739b\u4f9d","K"],"1315":["\u514b\u5dde","K"],"1305":["\u5410\u9c81\u756a","T"],"1301":["\u4e4c\u9c81\u6728\u9f50","W"],"1310":["\u4f0a\u7281","Y"]},"14":{"1407":["\u963f\u91cc","A"],"1405":["\u660c\u90fd","C"],"1401":["\u62c9\u8428","L"],"1404":["\u6797\u829d","L"],"1406":["\u90a3\u66f2","N"],"1402":["\u65e5\u5580\u5219","R"],"1403":["\u5c71\u5357","S"]},"15":{"1505":["\u679c\u6d1b","G"],"1508":["\u6d77\u5317","H"],"1502":["\u6d77\u4e1c","H"],"1504":["\u6d77\u5357","H"],"1507":["\u6d77\u897f","H"],"1503":["\u9ec4\u5357","H"],"1501":["\u897f\u5b81","X"],"1506":["\u7389\u6811","Y"]},"16":{"1613":["\u767d\u94f6","B"],"1602":["\u5b9a\u897f","D"],"1612":["\u7518\u5357","G"],"1606":["\u91d1\u660c","J"],"1608":["\u9152\u6cc9","J"],"1601":["\u5170\u5dde","L"],"1611":["\u4e34\u590f","L"],"1610":["\u9647\u5357","L"],"1603":["\u5e73\u51c9","P"],"1604":["\u5e86\u9633","Q"],"1609":["\u5929\u6c34","T"],"1605":["\u6b66\u5a01","W"],"1607":["\u5f20\u6396","Z"]},"17":{"1702":["\u77f3\u5634\u5c71","D"],"1704":["\u56fa\u539f","G"],"1703":["\u5434\u5fe0","W"],"1701":["\u94f6\u5ddd","Y"],"1705":["\u4e2d\u536b","Z"]},"18":{"1802":["\u5b89\u9633","A"],"1812":["\u9e64\u58c1","H"],"1811":["\u7126\u4f5c","J"],"1818":["\u6d4e\u6e90","J"],"1808":["\u5f00\u5c01","K"],"1809":["\u6d1b\u9633","L"],"1807":["\u5357\u9633","N"],"1805":["\u5e73\u9876\u5c71","P"],"1813":["\u6fee\u9633","P"],"1817":["\u4e09\u95e8\u5ce1","S"],"1810":["\u5546\u4e18","S"],"1815":["\u6f2f\u6cb3","T"],"1803":["\u65b0\u4e61","X"],"1806":["\u4fe1\u9633","X"],"1804":["\u8bb8\u660c","X"],"1801":["\u90d1\u5dde","Z"],"1814":["\u5468\u53e3","Z"],"1816":["\u9a7b\u9a6c\u5e97","Z"]},"19":{"1911":["\u5e38\u5dde","C"],"1909":["\u6dee\u5b89","H"],"1910":["\u8fde\u4e91\u6e2f","L"],"1902":["\u65e0\u9521","M"],"1901":["\u5357\u4eac","N"],"1905":["\u5357\u901a","N"],"1913":["\u5bbf\u8fc1","S"],"1904":["\u82cf\u5dde","S"],"1912":["\u6cf0\u5dde","T"],"1908":["\u5f90\u5dde","X"],"1907":["\u76d0\u57ce","Y"],"1906":["\u626c\u5dde","Y"],"1903":["\u9547\u6c5f","Z"]},"20":{"2010":["\u6069\u65bd","E"],"2003":["\u9102\u5dde","E"],"2005":["\u9ec4\u5188","H"],"2006":["\u9ec4\u77f3","H"],"2014":["\u8346\u95e8","J"],"2008":["\u8346\u5dde","J"],"2017":["\u6f5c\u6c5f","Q"],"2012":["\u795e\u519c\u67b6","S"],"2011":["\u5341\u5830","S"],"2013":["\u968f\u5dde","S"],"2015":["\u5929\u95e8","T"],"2001":["\u6b66\u6c49","W"],"2002":["\u8944\u6a0a","X"],"2007":["\u54b8\u5b81","X"],"2016":["\u4ed9\u6843","X"],"2004":["\u5b5d\u611f","X"],"2009":["\u5b9c\u660c","Y"]},"21":{"2101":["\u676d\u5dde","H"],"2102":["\u6e56\u5dde","H"],"2103":["\u5609\u5174","J"],"2109":["\u91d1\u534e","J"],"2108":["\u4e3d\u6c34","L"],"2104":["\u5b81\u6ce2","N"],"2110":["\u8862\u5dde","Q"],"2105":["\u7ecd\u5174","S"],"2106":["\u53f0\u5dde","T"],"2107":["\u6e29\u5dde","W"],"2111":["\u821f\u5c71","Z"]},"22":{"2206":["\u5b89\u5e86","A"],"2202":["\u868c\u57e0","B"],"2209":["\u4eb3\u5dde","B"],"2216":["\u5de2\u6e56","C"],"2217":["\u6c60\u5dde","C"],"2211":["\u6ec1\u5dde","C"],"2208":["\u961c\u9633","F"],"2201":["\u5408\u80a5","G"],"2212":["\u6dee\u5317","H"],"2204":["\u6dee\u5357","H"],"2210":["\u9ec4\u5c71","H"],"2215":["\u516d\u5b89","L"],"2205":["\u9a6c\u978d\u5c71","M"],"2207":["\u5bbf\u5dde","S"],"2213":["\u94dc\u9675","T"],"2203":["\u829c\u6e56","W"],"2214":["\u5ba3\u57ce","X"]},"23":{"2301":["\u798f\u5dde","F"],"2307":["\u9f99\u5ca9","L"],"2309":["\u5357\u5e73 ","N"],"2303":["\u5b81\u5fb7","N"],"2304":["\u8386\u7530","P"],"2305":["\u6cc9\u5dde","Q"],"2308":["\u4e09\u660e","S"],"2302":["\u53a6\u95e8","S"],"2306":["\u6f33\u5dde","Z"]},"24":{"2404":["\u629a\u5dde","F"],"2407":["\u8d63\u5dde","G"],"2406":["\u5409\u5b89","J"],"2408":["\u666f\u5fb7\u9547","J"],"2402":["\u4e5d\u6c5f","J"],"2401":["\u5357\u660c","N"],"2409":["\u840d\u4e61","P"],"2403":["\u4e0a\u9976","S"],"2410":["\u65b0\u4f59","X"],"2405":["\u5b9c\u6625","Y"],"2411":["\u9e70\u6f6d","Y"]},"25":{"2506":["\u5e38\u5fb7","C"],"2501":["\u957f\u6c99","C"],"2505":["\u90f4\u5dde","C"],"2504":["\u8861\u9633","H"],"2512":["\u6000\u5316","H"],"2508":["\u5a04\u5e95","L"],"2513":["\u9ed4\u9633","Q"],"2509":["\u90b5\u9633","S"],"2502":["\u6e58\u6f6d","X"],"2515":["\u6e58\u897f","X"],"2507":["\u76ca\u9633","Y"],"2514":["\u6c38\u5dde","Y"],"2510":["\u5cb3\u9633","Y"],"2511":["\u5f20\u5bb6\u754c","Z"],"2503":["\u682a\u6d32","Z"]},"26":{"2603":["\u5b89\u987a","A"],"2607":["\u6bd5\u8282","B"],"2604":["\u90fd\u5300","D"],"2601":["\u8d35\u9633","G"],"2605":["\u51ef\u91cc","K"],"2608":["\u516d\u76d8\u6c34","L"],"2609":["\u9ed4\u897f","Q"],"2606":["\u94dc\u4ec1","T"],"2602":["\u9075\u4e49","Z"]},"27":{"2719":["\u963f\u575d","A"],"2708":["\u5e7f\u5b89","A"],"2721":["\u5e7f\u5143","A"],"2709":["\u5df4\u4e2d","B"],"2701":["\u6210\u90fd","C"],"2706":["\u8fbe\u5dde","D"],"2720":["\u5fb7\u9633","D"],"2718":["\u7518\u5b5c","G"],"2714":["\u4e50\u5c71","L"],"2716":["\u51c9\u5c71","L"],"2710":["\u6cf8\u5dde","L"],"2715":["\u7709\u5c71","M"],"2704":["\u7ef5\u9633","M"],"2705":["\u5357\u5145","N"],"2712":["\u5185\u6c5f","N"],"2702":["\u6500\u679d\u82b1","P"],"2707":["\u9042\u5b81","S"],"2717":["\u96c5\u5b89","Y"],"2711":["\u5b9c\u5bbe","Y"],"2703":["\u81ea\u8d21","Z"],"2713":["\u8d44\u9633","Z"]},"28":{"2815":["\u6f6e\u5dde","C"],"2816":["\u4e1c\u839e","D"],"2822":["\u4e1c\u6c99\u5c9b","D"],"2808":["\u4f5b\u5c71","F"],"2801":["\u5e7f\u5dde","G"],"2812":["\u6cb3\u6e90","H"],"2803":["\u60e0\u5dde","H"],"2811":["\u6c5f\u95e8","J"],"2819":["\u63ed\u9633","J"],"2820":["\u8302\u540d","M"],"2804":["\u6885\u5dde","M"],"2813":["\u6e05\u8fdc","Q"],"2805":["\u6c55\u5934","S"],"2821":["\u6c55\u5c3e","S"],"2802":["\u97f6\u5173","S"],"2806":["\u6df1\u5733","S"],"2818":["\u9633\u6c5f","Y"],"2814":["\u4e91\u6d6e","Y"],"2810":["\u6e5b\u6c5f","Z"],"2809":["\u8087\u5e86","Z"],"2817":["\u4e2d\u5c71","Z"],"2807":["\u73e0\u6d77","Z"]},"29":{"2905":["\u4fdd\u5c71","B"],"2908":["\u695a\u96c4","C"],"2902":["\u5927\u7406","D"],"2915":["\u5fb7\u5b8f","D"],"2913":["\u8fea\u5e86","D"],"2903":["\u7ea2\u6cb3","G"],"2901":["\u6606\u660e","K"],"2914":["\u4e3d\u6c5f","L"],"2911":["\u4e34\u6ca7","L"],"2912":["\u6012\u6c5f","N"],"2904":["\u66f2\u9756","Q"],"2909":["\u601d\u8305","S"],"2906":["\u6587\u5c71","W"],"2916":["\u897f\u53cc\u7248\u7eb3","X"],"2907":["\u7389\u6eaa","Y"],"2910":["\u662d\u901a","Z"]},"30":{"3010":["\u767e\u8272","B"],"3013":["\u5317\u6d77","B"],"3002":["\u5d07\u5de6","C"],"3014":["\u9632\u57ce\u6e2f","F"],"3008":["\u8d35\u6e2f","G"],"3005":["\u6842\u6797","G"],"3012":["\u6cb3\u6c60","H"],"3007":["\u8d3a\u5dde","H"],"3004":["\u6765\u5bbe","L"],"3003":["\u67f3\u5dde","L"],"3001":["\u5357\u5b81","N"],"3011":["\u94a6\u5dde","Q"],"3006":["\u68a7\u5dde","W"],"3009":["\u7389\u6797","Y"]},"31":{"3109":["\u767d\u6c99","B"],"3116":["\u4fdd\u4ead","B"],"3108":["\u660c\u6c5f","C"],"3106":["\u6f84\u8fc8","C"],"3107":["\u510b\u5dde","D"],"3111":["\u5b9a\u5b89","D"],"3104":["\u4e1c\u65b9","D"],"3101":["\u6d77\u53e3","H"],"3123":["\u4e50\u4e1c","L"],"3105":["\u4e34\u9ad8","L"],"3118":["\u9675\u6c34","L"],"3117":["\u4e07\u5b81","M"],"3122":["\u5357\u6c99\u5c9b","N"],"3115":["\u6e05\u5170","Q"],"3113":["\u743c\u6d77","Q"],"3102":["\u743c\u5c71","Q"],"3110":["\u743c\u4e2d","Q"],"3103":["\u4e09\u4e9a","S"],"3120":["\u73ca\u745a\u5c9b","S"],"3124":["\u901a\u4ec0","T"],"3112":["\u5c6f\u660c","T"],"3114":["\u6587\u660c","W"],"3119":["\u897f\u6c99","X"],"3121":["\u6c38\u7f72\u7901","Y"]},"32":{"3201":["\u9999\u6e2f","X"]},"33":{"3301":["\u6fb3\u95e8","A"]},"34":{"3402":["\u9ad8\u96c4","G"],"3410":["\u82b1\u83b2","H"],"3409":["\u5609\u4e49","J"],"3412":["\u57fa\u9686","J"],"3408":["\u6f8e\u6e56","P"],"3401":["\u53f0\u5317","T"],"3411":["\u53f0\u4e1c","T"],"3403":["\u53f0\u5357","T"],"3404":["\u53f0\u4e2d","T"],"3405":["\u6843\u56ed","T"],"3406":["\u65b0\u7af9","X"],"3407":["\u5b9c\u5170","Y"]}}',
    current_id:'101280101'
};

$(document).ready(function(){
    $("table.paycol tr").each(function (i){
        if(i%2 === 1){
            $(this).css("background","#f9f9f9")
        }
    });

    $(".managPlace li").live({ mouseenter: function () {
            $(this).addClass("hover");//鼠标移入事件               
      }, mouseleave: function () {
            $(this).removeClass("hover");//鼠标移出事件       
      }
    });
    var canMocup = false;
    $("span.icity").live("click",function(){
        var taplat_hgt = $(".taplat").height();
        var tbsi = $(".taplat:eq(0) table tr").size();
        if(tbsi > 2){
            $(".managPlace").height(taplat_hgt - 15).slideToggle();
        }else $(".managPlace").slideToggle();
        if(typeof($(".cupc")[0]) == "undefined"){
            var cupc = '<li class="cupc"></li>';
            //console.log(cupc)
            $(".managPlace").append(cupc);
            canMocup = true;
            return false;
        }
        if(canMocup){
            $(".managPlace").find(".cupc").remove();
            canMocup = false;
        }
    });
    $("ul.guaidlis li").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $(".indeeStats ul").hover(function(){
        var tmask = '<li class="tmask"></li>';
        $(this).find(".mnSunSta").animate({top:"0px"},{duration: "fast"});
        $(this).append(tmask);
    },function(){
        $(this).find(".mnSunSta").animate({top:"-40px"},{duration: "fast"});
        $(this).find(".tmask").remove();
    });
    $(".curStats").hover(function(){
        var kimask = '<div class="kimask"></div>';
        $(this).append(kimask);
    },function(){
        $(this).find(".kimask").remove();
    });
    var serTop, widCam, choiCity;//默认关闭
    $("input#sear").focus(function(){
        $("#serTop").show();
    });
    $(".search, .cityOpera").bind({
        mouseover:function(){
            serTop = true;
            widCam = true;
            choiCity = true;
        },
        mouseout:function(){
            serTop = false;
            widCam = false;
            choiCity = false;
        }
    });
    $(".slayout").find("a.close").click(function(){
        $(this).parents(".slayout").hide();
    });

    $("#changeCity").live('click',function(){
        $("#choiCity").show();
        return false;
    });
    $(".cityOpera").find(".close").live('click',function(){
        $(this).parents(".cityOpera").hide();
    });

    $("ul.movTaber li").live('click',function(){
        $(this).addClass("current").siblings("li").removeClass();
        $(".tabCont").eq($(this).index()).show().siblings(".tabCont").hide();
    });

    $(".managPlace li.add").live('click',function(){
        $("#widCam").show();
        return false;
    });
    $(".managPlace li.cupc").live("click",function(){
        $(".managPlace").slideUp();
        $(".managPlace").find(".cupc").remove();
        canMocup = false;
    });

    $("#updig").live('click',function(){
        $("#larSel").show();
    });

    $(document).click(function(){
        //if(!serTop) $("#serTop").hide();
        //if(!widCam) $("#widCam").hide();
        //if(!choiCity) $("#choiCity").hide();
    })

    //天气插件
    var getStyle = $("#getStyle");
    $("input[name='icon']").live('click',function(){
        effect();
    });
    $("input[name='layout']").live('click',function(){
        $(this).val() == "n" ? $("#wname").attr("height","320") : $("#wname").attr("height","62");
        effect();
    });
    $("input[name='ip']").live('click',function(){
        effect();
    });
    $("#showDays").live('change',function(){
        if($("input[name='layout']").val() == "n"){
            var jsms = Number($(this).val());
            if(jsms == 3){
                $("#wname").attr("height","190");
            }else if(jsms == 4){
                $("#wname").attr("height","240");
            }
        }
        
        effect();
    });
    $("#fc").live('change',function(){
        effect();
    });
    $("#bgc").live('change',function(){
        effect();
    });
    $("#bdc").live('change',function(){
        effect();
    });
});