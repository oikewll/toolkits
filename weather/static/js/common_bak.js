var hosturl = 'http://app.demo.114la.com/weather/';
var Ylmf = {};
var Weather = {
    CityCookieName: 'citydata',
    WeatherCookieName: 'weather',
    DefaultCity: ['109', '101010100', '101010100', '北京', '北京'],
    StatIPQueue: [],
    StatGetQueue: [],
    Set: function () {
        W.style.display = "none";
        __$("setCityBox").style.display = "";
        var City = Cookie.get(this.CityCookieName);
        if (City) {
            City = City.split(",");
        } else {
            City = this.DefaultCity;
        }
        __$("w_pro").value = City[0];
        this.initCitys(City[0]);
        __$("w_city").value = City[1];
        this.initAreaCitys(City[2]);
    },
    ShowStatus: function (num) {
        if (!num) { return }
        var str;
        switch (num) {
            case 100:
                str = '正在判断城市，请稍后...&nbsp; <a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[手动设置]</a> <a href="http://tool.114la.com/tianqi/" target="_blank">快速查看</a>';
                break;
            case 101:
                str = '判断城市失败，默认为北京，请手动设置。';
                break;
            case 102:
                str = '正在获取天气数据，请稍候... <a href="http://tool.114la.com/tianqi/" target="_blank">快速查看</a>';
                break;
            case 404:
                str = '很抱歉，暂无该城市天气数据。<a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[选择其它城市]</a>';
                break;
            case 500:
                str = '服务器错误或本地网络过慢。<a href="javascript:void(0);" target="_self" onclick="Weather.Init();return false;">[点击重试]</a>';
                break;
            case 200:
                var result = arguments[1];
                var weekStr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    nowD = new Date();
                var w1 = nowD.getDay();
                var stime = nowD.getHours(),dn;
                var smonth = nowD.getMonth() + 1;
                var sday =  nowD.getDate();
                if(stime > 18){
                    dn = 1;
                }else dn = 0;
                // $(".indeeStats ul").each(function(){
                //     var dayCom = $(this).attr("day")
                //     callDayData(dayCom);
                // });
                str = '<div class="curStats">'
                            +'<h6>'+result['city']+'今日天气</h6>'
                            +'<p>'+result['date_y']+'  '+weekStr[w1]+'</p>'
                            +'<img title="'+result['weather'][0]+'" alt="'+result['weather'][0]+'" src="static/images/weather/b/'+result['img'][0]+'_'+dn+'.png" />'
                            +'<p>'+result['weather'][0]+'</p>'
                            +'<p>'+result['temp'][0]+'</p>'
                            +'<p>'+result['wind'][0]+'</p>'
                            +'<div class="sunSta">'
                                +'<span class="fl">日出 '+result['sunstat'][0][0]+'</span>'
                                +'<span class="fr">日落 '+result['sunstat'][0][1]+'</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="indeeStats">'
                            +'<ul>'
                                +'<li>'+smonth+'月'+sday+'日  '+weekStr[w1+1]+'（明天）</li>'
                                +'<li><img title="'+result['weather'][1]+'" alt="'+result['weather'][1]+'" src="static/images/weather/s/'+result['img'][1]+'_'+dn+'.png" /></li>'
                                +'<li>'
                                    +'<p>'+result['weather'][1]+'</p>'
                                    +'<p>'+result['temp'][1]+'</p>'
                                    +'<p>'+result['wind'][1]+'</p>'
                                +'</li>'
                                +'<li class="mnSunSta">'
                                    +'<span class="fl">日出 '+result['sunstat'][1][0]+'</span>'
                                    +'<span class="fr">日落 '+result['sunstat'][1][1]+'</span>'
                                +'</li>'
                            +'</ul>'
                            +'<ul>'
                                +'<li>5月22日  '+weekStr[w1+2]+'（后天）</li>'
                                +'<li><img title="'+result['weather'][2]+'" alt="'+result['weather'][2]+'" src="static/images/weather/s/'+result['img'][2]+'_'+dn+'.png" /></li>'
                                +'<li>'
                                    +'<p>'+result['weather'][2]+'</p>'
                                    +'<p>'+result['temp'][2]+'</p>'
                                    +'<p>'+result['wind'][2]+'</p>'
                                +'</li>'
                                +'<li class="mnSunSta">'
                                    +'<span class="fl">日出 '+result['sunstat'][2][0]+'</span>'
                                    +'<span class="fr">日落 '+result['sunstat'][2][1]+'</span>'
                                +'</li>'
                            +'</ul>'
                            +'<ul>'
                                +'<li>5月23日  '+weekStr[w1+3]+'</li>'
                                +'<li><img title="'+result['weather'][3]+'" alt="'+result['weather'][3]+'" src="static/images/weather/s/'+result['img'][3]+'_'+dn+'.png" /></li>'
                                +'<li>'
                                    +'<p>'+result['weather'][3]+'</p>'
                                    +'<p>'+result['temp'][3]+'</p>'
                                    +'<p>'+result['wind'][3]+'</p>'
                                +'</li>'
                                +'<li class="mnSunSta">'
                                    +'<span class="fl">日出 '+result['sunstat'][3][0]+'</span>'
                                    +'<span class="fr">日落 '+result['sunstat'][3][1]+'</span>'
                                +'</li>'
                            +'</ul>'
                            +'<ul>'
                                +'<li>5月24日  '+weekStr[w1+4]+'</li>'
                                +'<li><img title="'+result['weather'][4]+'" alt="'+result['weather'][4]+'" src="static/images/weather/s/'+result['img'][4]+'_'+dn+'.png" /></li>'
                                +'<li>'
                                    +'<p>'+result['weather'][4]+'</p>'
                                    +'<p>'+result['temp'][4]+'</p>'
                                    +'<p>'+result['wind'][4]+'</p>'
                                +'</li>'
                                +'<li class="mnSunSta">'
                                    +'<span class="fl">日出 '+result['sunstat'][4][0]+'</span>'
                                    +'<span class="fr">日落 '+result['sunstat'][4][1]+'</span>'
                                +'</li>'
                            +'</ul>'
                        +'</div>';
                break;
        }
        //W.innerHTML = str;
        console.log(str)
        //$(".dashBoard").html(str);
    },
    Ip2City: function (callback) {
        this.ShowStatus(100);
        Ylmf.ScriptLoader.Add({
        src:'http://api.114la.com/ip',
        charset:'gb2312'
        });
        var that = this;
        
        if (typeof Ip2CityTimeOut != "undefined") {
            window.clearTimeout(Ip2CityTimeOut);
        }
        var Ip2CityTimeOut = window.setTimeout(function () {
            Cookie.clear(this.CityCookieName);
            callback && callback(that.DefaultCity);
        }, 3000);
        
        window.ILData_callback = function () {
            if (typeof (ILData) != "undefined") {
                if (typeof Ip2CityTimeOut != "undefined") {
                    window.clearTimeout(Ip2CityTimeOut);
                }
                if (ILData[2] && ILData[3]) {
                    var pid = Ylmf.getProId(ILData[2]);
                    var cid = Ylmf.getCityId(pid, ILData[3]);
                    var City = [pid, cid, cid, ILData[2], ILData[3]];
                    Cookie.set(that.CityCookieName, City);
                    callback && callback(City);
                }
                else{
                    that.ShowStatus(101);
                    /*var Ip2CityTimeOut = window.setTimeout(function () {
                        Cookie.set(that.CityCookieName, that.DefaultCity);
                        callback && callback(that.DefaultCity);
                    }, 3000);*/
                    Cookie.set(that.CityCookieName, that.DefaultCity);
                    callback && callback(that.DefaultCity);
                }
            }
        }
    },
    Get: function (cityid) {
        if (!cityid) return;
        var AleaId = cityid.slice(3, 7);
        var showStatus = this.ShowStatus;
        var that = this;
        showStatus(102);
        if (typeof TimeOut != "undefined") {
            window.clearTimeout(TimeOut);
        }
        if(!Cookie.get(this.CityCookieName)){
            var TimeOut = window.setTimeout(function () {
                showStatus(500);
                Cookie.clear(this.CityCookieName);
            }, 5000);
        }
        var api = 'http://weather.api.114la.com/' + AleaId + '/' + cityid + '.txt';
        api += '?' + parseInt(Math.random() * 99);
        if (!Cookie.get(this.WeatherCookieName)) {
            
        }
        Ylmf.ScriptLoader.Add({
            src: api.toString(),
            charset: "utf-8"
        });
        window.Ylmf.getWeather = function (Data) {
            window.clearTimeout(TimeOut);
            if (typeof (Data) == "object" && typeof (Data) != "undefined" && typeof (Data.weatherinfo) != "undefined" && Data.weatherinfo != false) {
                var Desc = [Data.weatherinfo['temp1'], Data.weatherinfo['temp2']];
                var result = [Data.weatherinfo.city, Desc[0], Desc[1], cityid,Data.weatherinfo['img1'], Data.weatherinfo['img3'],Data.weatherinfo['weather1'],Data.weatherinfo['weather2']];
                if (result) {
                    Weather.ShowStatus(200, result);
                    Cookie.set(that.WeatherCookieName, 1);
                }
            } else if (Data.weatherinfo == false) {
                Weather.ShowStatus(404);
            }
        }
    },
    Init: function () {
        var ckname = this.CityCookieName;
        var that = this;
        if (Cookie.get(this.CityCookieName)) {
            var City = Cookie.get(this.CityCookieName).split(',');
            if (!City[2]) {
                Cookie.clear(this.CityCookieName);
                that.Init();
            }
            this.Get(City[2]);
        } else {
            this.Ip2City(function (City) {
                var C = Cookie.get(that.CityCookieName);
                if (C) {
                    C = C.split(',')
                    that.Get(C[2]);
                } else {
                    that.Get(City[2]);
                }
            });
        }
    },
    getAreas: function (cid, callback) {
        var AreaId = cid.slice(3, 7);
        Ylmf.ScriptLoader.Add({
            src: "http://weather.api.114la.com/" + AreaId + "/" + AreaId + ".txt"+'?' + parseInt(Math.random() * 99),
            charset: "utf-8"
        });
        window.Ylmf.getAreaCity = function (O) {
            if (typeof (O) == "object"
                && typeof (O.result) != "undefined"
                && typeof (O.result[0][0]) != "undefined") {
                callback(O.result);
            }
        }
    },
    initCitys: function (pid) {
        if (!pid) return;
        __$("w_city").innerHTML = "";
        for (var i = 0, len = CityArr.length; i < len; ++i) {
            var I = CityArr[i];
            if (I[1] == pid) {
                var option = document.createElement("option");
                option.value = I[2];
                option.innerHTML = I[3] + '&nbsp;' + I[0];
                __$("w_city").appendChild(option);
            }
        }
        __$("w_city").selectedIndex = 0;
    },
    initAreaCitys: function (cid, callback) {
        //$("l_city").innerHTML = "<option>选择地区</option>";
        __$("l_city").innerHTML = "";
        this.getAreas(cid, function (AreaCitys) {
            for (var i = 0, len = AreaCitys.length; i < len; ++i) {
                var I = AreaCitys[i];
                var option = document.createElement("option");
                if (I[0] == cid) {
                    option.selected = true;
                }
                option.value = I[0];
                option.innerHTML = I[2] + "&nbsp;" + I[1];
                __$("l_city").appendChild(option);
            }
            if (callback) {
                callback();
            }
        });
    },
    cp: function (val) {
        this.initCitys(val);
        __$("w_city").selectedIndex = 0;
        this.cc(__$("w_city").value);
    },
    cc: function (val) {
        this.initAreaCitys(val, function () { });
    },
    custom: function () {
        var City = Cookie.get(this.CityCookieName);
        if (City) {
            City = City.split(",")
        } else {
            City = this.DefaultCity;
        }
        var C = [__$("w_pro").value,
              __$("w_city").value,
              __$("l_city").value ? __$("l_city").value : __$("w_city").value,
              Ylmf.getSelectValue(__$("w_pro")),
              Ylmf.getSelectValue(__$("w_city"))
        ];
        if (City[2] != C[2]) {
            this.Get(C[2]);
            Cookie.set(this.CityCookieName, C);
        }
        __$("setCityBox").style.display = "none";
        W.style.display = "";

    },
    autoLoad: function () {
        Cookie.clear(this.CityCookieName);
        Cookie.clear(this.WeatherCookieName);
        //window.location.reload();
        this.Init();
        __$("setCityBox").style.display = "none";
        W.style.display = "";
    }
}
//Weather.Init();
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
    },
    getProId : function(proName) {
        var ProId;
        for (var i = 0, len = CityArr.length; i < len; ++i) {
            if (CityArr[i][0] == proName && parseInt(CityArr[i][2]) <900) {
                ProId = CityArr[i][2];
            }
        }
        return ProId
    },
    getCityId:function(ProId, CityName) {
        if(!ProId) return false;
        var CityId;
        for (var i = 0, len = CityArr.length; i < len; ++i) {
            if (CityArr[i][1] == ProId && CityArr[i][0] == CityName) {
                CityId = CityArr[i][2];
            }
        }
        return CityId
    },
    getCitys : function(ProId){
        if(!ProId) return false;
        var Citys = [];
        for (var i = 0, len = CityArr.length; i < len; ++i) {
            if (CityArr[i][1] == ProId) {
                Citys.push(CityArr[i]);
            }
        }
        return Citys;
    },
    getSelectValue:function(select) {
        var idx = select.selectedIndex,
        option,
        value;
        if (idx > -1) {
        option = select.options[idx];
        value = option.innerHTML.split(' ')[1];
            return value;
            //return (value && value.specified) ? option.value : option.text;
        }
        return null;
    },
    ScriptLoader:{
        Add: function(config) {
            if (!config || !config.src) return;
            var  doc = document;
            var Head = doc.getElementsByTagName('head')[0],         
                Script = doc.createElement('script');
                Script.onload = Script.onreadystatechange = function() {
                    if (Script && Script.readyState && Script.readyState != 'loaded' && Script.readyState != 'complete') return;
                    Script.onload = Script.onreadystatechange = Script.onerror = null;
                    Script.Src = '';
                    if(!doc.all){Script.parentNode.removeChild(Script);}
                    Script = null;
                };
                Script.src = config.src;
                Script.charset = config.charset || 'gb2312';
                Head.insertBefore(Script,Head.firstChild);
        }
    }
};
format = function (_, B) {
    if (arguments.length > 1) {
        var F = format,
        H = /([.*+?^=!:${}()|[\]\/\\])/g,
        C = (F.left_delimiter || "{").replace(H, "\\$1"),
        A = (F.right_delimiter || "}").replace(H, "\\$1"),
        E = F._r1 || (F._r1 = new RegExp("#" + C + "([^" + C + A + "]+)" + A, "g")),
        G = F._r2 || (F._r2 = new RegExp("#" + C + "(\\d+)" + A, "g"));
        if (typeof (B) == "object") return _.replace(E,
        function (_, A) {
            var $ = B[A];
            if (typeof $ == "function") $ = $(A);
            return typeof ($) == "undefined" ? "" : $
        });
        else if (typeof (B) != "undefined") {
            var D = Array.prototype.slice.call(arguments, 1),
            $ = D.length;
            return _.replace(G,
            function (A, _) {
                _ = parseInt(_, 10);
                return (_ >= $) ? A : D[_]
            })
        }
    }
    return _
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
var DateStatic={
    local:"",
    province_id:'28',
    city_id:'2801',
    weather_id:'101280101',
    cityliststr:'{"01":{"0101":["\u5317\u4eac","B"]},"02":{"0201":["\u4e0a\u6d77","S"]},"03":{"0301":["\u5929\u6d25","T"]},"04":{"0401":["\u91cd\u5e86","C"]},"05":{"0509":["\u5927\u5e86","D"],"0507":["\u5927\u5174\u5b89\u5cad","D"],"0501":["\u54c8\u5c14\u6ee8","H"],"0512":["\u9e64\u5c97","H"],"0506":["\u9ed1\u6cb3","H"],"0504":["\u4f73\u6728\u65af","J"],"0511":["\u9e21\u897f","J"],"0503":["\u7261\u4e39\u6c5f","M"],"0502":["\u9f50\u9f50\u54c8\u5c14","Q"],"0510":["\u4e03\u53f0\u6cb3","Q"],"0513":["\u53cc\u9e2d\u5c71","S"],"0505":["\u7ee5\u5316","S"],"0508":["\u4f0a\u6625","Y"]},"06":{"0606":["\u767d\u57ce","B"],"0609":["\u767d\u5c71 ","B"],"0601":["\u957f\u6625","C"],"0602":["\u5409\u6797","J"],"0607":["\u8fbd\u6e90","L"],"0604":["\u56db\u5e73","S"],"0608":["\u677e\u539f","S"],"0605":["\u901a\u5316","T"],"0603":["\u5ef6\u5409","Y"]},"07":{"0703":["\u978d\u5c71","A"],"0705":["\u672c\u6eaa","B"],"0712":["\u671d\u9633","C"],"0702":["\u5927\u8fde","D"],"0706":["\u4e39\u4e1c","D"],"0704":["\u629a\u987a","F"],"0709":["\u961c\u65b0","F"],"0714":["\u846b\u82a6\u5c9b","H"],"0707":["\u9526\u5dde","J"],"0710":["\u8fbd\u9633","L"],"0713":["\u76d8\u9526","P"],"0701":["\u6c88\u9633","S"],"0711":["\u94c1\u5cad","T"],"0708":["\u8425\u53e3","Y"]},"08":{"0812":["\u963f\u62c9\u5584\u76df","A"],"0802":["\u5305\u5934","B"],"0808":["\u5df4\u5f66\u6dd6\u5c14","B"],"0806":["\u8d64\u5cf0","C"],"0807":["\u9102\u5c14\u591a\u65af","E"],"0801":["\u547c\u548c\u6d69\u7279","H"],"0810":["\u547c\u4f26\u8d1d\u5c14","H"],"0805":["\u901a\u8fbd","T"],"0803":["\u4e4c\u6d77","W"],"0804":["\u4e4c\u5170\u5bdf\u5e03","W"],"0809":["\u9521\u6797\u90ed\u52d2\u76df","X"],"0811":["\u5174\u5b89\u76df","X"]},"09":{"0902":["\u4fdd\u5b9a","B"],"0907":["\u6ca7\u5dde","C"],"0904":["\u627f\u5fb7","C"],"0901":["\u77f3\u5bb6\u5e84","D"],"0910":["\u90af\u90f8","H"],"0908":["\u8861\u6c34","H"],"0906":["\u5eca\u574a","L"],"0911":["\u79e6\u7687\u5c9b","Q"],"0905":["\u5510\u5c71","T"],"0909":[" \u90a2\u53f0","X"],"0903":["\u5f20\u5bb6\u53e3","Z"]},"10":{"1005":["\u957f\u6cbb","C"],"1002":["\u5927\u540c","D"],"1006":["\u664b\u57ce","J"],"1004":["\u664b\u4e2d","J"],"1007":["\u4e34\u6c7e","L"],"1011":["\u5415\u6881","L"],"1009":["\u6714\u5dde","S"],"1001":["\u592a\u539f","T"],"1010":["\u5ffb\u5dde","X"],"1003":["\u9633\u6cc9","Y"],"1008":["\u8fd0\u57ce","Y"]},"11":{"1107":["\u5b89\u5eb7","A"],"1109":["\u5b9d\u9e21","B"],"1108":["\u6c49\u4e2d","H"],"1106":["\u5546\u6d1b","S"],"1110":["\u94dc\u5ddd","T"],"1105":["\u6e2d\u5357","W"],"1101":["\u897f\u5b89","X"],"1102":["\u54b8\u9633","X"],"1103":["\u5ef6\u5b89","Y"],"1104":["\u6986\u6797","Y"]},"12":{"1211":["\u6ee8\u5dde","B"],"1204":["\u5fb7\u5dde","D"],"1212":["\u4e1c\u8425","D"],"1210":["\u83cf\u6cfd","H"],"1201":["\u6d4e\u5357","J"],"1207":["\u6d4e\u5b81","J"],"1216":["\u83b1\u829c","L"],"1217":["\u804a\u57ce","L"],"1209":["\u4e34\u6c82","L"],"1202":["\u9752\u5c9b","Q"],"1215":["\u65e5\u7167","R"],"1208":["\u6cf0\u5b89","T"],"1206":["\u6f4d\u574a","W"],"1213":["\u5a01\u6d77","W"],"1205":["\u70df\u53f0","Y"],"1214":["\u67a3\u5e84","Z"],"1203":["\u6dc4\u535a","Z"]},"13":{"1308":["\u963f\u514b\u82cf","A"],"1307":["\u963f\u62c9\u5c14","A"],"1314":["\u963f\u52d2\u6cf0","A"],"1306":["\u5df4\u97f3\u90ed\u695e","B"],"1316":["\u535a\u5c14\u5854\u62c9","B"],"1304":["\u660c\u5409","C"],"1303":["\u77f3\u6cb3\u5b50","D"],"1311":["\u5854\u57ce","D"],"1312":["\u54c8\u5bc6","H"],"1313":["\u548c\u7530","H"],"1309":["\u5580\u4ec0","K"],"1302":["\u514b\u62c9\u739b\u4f9d","K"],"1315":["\u514b\u5dde","K"],"1305":["\u5410\u9c81\u756a","T"],"1301":["\u4e4c\u9c81\u6728\u9f50","W"],"1310":["\u4f0a\u7281","Y"]},"14":{"1407":["\u963f\u91cc","A"],"1405":["\u660c\u90fd","C"],"1401":["\u62c9\u8428","L"],"1404":["\u6797\u829d","L"],"1406":["\u90a3\u66f2","N"],"1402":["\u65e5\u5580\u5219","R"],"1403":["\u5c71\u5357","S"]},"15":{"1505":["\u679c\u6d1b","G"],"1508":["\u6d77\u5317","H"],"1502":["\u6d77\u4e1c","H"],"1504":["\u6d77\u5357","H"],"1507":["\u6d77\u897f","H"],"1503":["\u9ec4\u5357","H"],"1501":["\u897f\u5b81","X"],"1506":["\u7389\u6811","Y"]},"16":{"1613":["\u767d\u94f6","B"],"1602":["\u5b9a\u897f","D"],"1612":["\u7518\u5357","G"],"1606":["\u91d1\u660c","J"],"1608":["\u9152\u6cc9","J"],"1601":["\u5170\u5dde","L"],"1611":["\u4e34\u590f","L"],"1610":["\u9647\u5357","L"],"1603":["\u5e73\u51c9","P"],"1604":["\u5e86\u9633","Q"],"1609":["\u5929\u6c34","T"],"1605":["\u6b66\u5a01","W"],"1607":["\u5f20\u6396","Z"]},"17":{"1702":["\u77f3\u5634\u5c71","D"],"1704":["\u56fa\u539f","G"],"1703":["\u5434\u5fe0","W"],"1701":["\u94f6\u5ddd","Y"],"1705":["\u4e2d\u536b","Z"]},"18":{"1802":["\u5b89\u9633","A"],"1812":["\u9e64\u58c1","H"],"1811":["\u7126\u4f5c","J"],"1818":["\u6d4e\u6e90","J"],"1808":["\u5f00\u5c01","K"],"1809":["\u6d1b\u9633","L"],"1807":["\u5357\u9633","N"],"1805":["\u5e73\u9876\u5c71","P"],"1813":["\u6fee\u9633","P"],"1817":["\u4e09\u95e8\u5ce1","S"],"1810":["\u5546\u4e18","S"],"1815":["\u6f2f\u6cb3","T"],"1803":["\u65b0\u4e61","X"],"1806":["\u4fe1\u9633","X"],"1804":["\u8bb8\u660c","X"],"1801":["\u90d1\u5dde","Z"],"1814":["\u5468\u53e3","Z"],"1816":["\u9a7b\u9a6c\u5e97","Z"]},"19":{"1911":["\u5e38\u5dde","C"],"1909":["\u6dee\u5b89","H"],"1910":["\u8fde\u4e91\u6e2f","L"],"1902":["\u65e0\u9521","M"],"1901":["\u5357\u4eac","N"],"1905":["\u5357\u901a","N"],"1913":["\u5bbf\u8fc1","S"],"1904":["\u82cf\u5dde","S"],"1912":["\u6cf0\u5dde","T"],"1908":["\u5f90\u5dde","X"],"1907":["\u76d0\u57ce","Y"],"1906":["\u626c\u5dde","Y"],"1903":["\u9547\u6c5f","Z"]},"20":{"2010":["\u6069\u65bd","E"],"2003":["\u9102\u5dde","E"],"2005":["\u9ec4\u5188","H"],"2006":["\u9ec4\u77f3","H"],"2014":["\u8346\u95e8","J"],"2008":["\u8346\u5dde","J"],"2017":["\u6f5c\u6c5f","Q"],"2012":["\u795e\u519c\u67b6","S"],"2011":["\u5341\u5830","S"],"2013":["\u968f\u5dde","S"],"2015":["\u5929\u95e8","T"],"2001":["\u6b66\u6c49","W"],"2002":["\u8944\u6a0a","X"],"2007":["\u54b8\u5b81","X"],"2016":["\u4ed9\u6843","X"],"2004":["\u5b5d\u611f","X"],"2009":["\u5b9c\u660c","Y"]},"21":{"2101":["\u676d\u5dde","H"],"2102":["\u6e56\u5dde","H"],"2103":["\u5609\u5174","J"],"2109":["\u91d1\u534e","J"],"2108":["\u4e3d\u6c34","L"],"2104":["\u5b81\u6ce2","N"],"2110":["\u8862\u5dde","Q"],"2105":["\u7ecd\u5174","S"],"2106":["\u53f0\u5dde","T"],"2107":["\u6e29\u5dde","W"],"2111":["\u821f\u5c71","Z"]},"22":{"2206":["\u5b89\u5e86","A"],"2202":["\u868c\u57e0","B"],"2209":["\u4eb3\u5dde","B"],"2216":["\u5de2\u6e56","C"],"2217":["\u6c60\u5dde","C"],"2211":["\u6ec1\u5dde","C"],"2208":["\u961c\u9633","F"],"2201":["\u5408\u80a5","G"],"2212":["\u6dee\u5317","H"],"2204":["\u6dee\u5357","H"],"2210":["\u9ec4\u5c71","H"],"2215":["\u516d\u5b89","L"],"2205":["\u9a6c\u978d\u5c71","M"],"2207":["\u5bbf\u5dde","S"],"2213":["\u94dc\u9675","T"],"2203":["\u829c\u6e56","W"],"2214":["\u5ba3\u57ce","X"]},"23":{"2301":["\u798f\u5dde","F"],"2307":["\u9f99\u5ca9","L"],"2309":["\u5357\u5e73 ","N"],"2303":["\u5b81\u5fb7","N"],"2304":["\u8386\u7530","P"],"2305":["\u6cc9\u5dde","Q"],"2308":["\u4e09\u660e","S"],"2302":["\u53a6\u95e8","S"],"2306":["\u6f33\u5dde","Z"]},"24":{"2404":["\u629a\u5dde","F"],"2407":["\u8d63\u5dde","G"],"2406":["\u5409\u5b89","J"],"2408":["\u666f\u5fb7\u9547","J"],"2402":["\u4e5d\u6c5f","J"],"2401":["\u5357\u660c","N"],"2409":["\u840d\u4e61","P"],"2403":["\u4e0a\u9976","S"],"2410":["\u65b0\u4f59","X"],"2405":["\u5b9c\u6625","Y"],"2411":["\u9e70\u6f6d","Y"]},"25":{"2506":["\u5e38\u5fb7","C"],"2501":["\u957f\u6c99","C"],"2505":["\u90f4\u5dde","C"],"2504":["\u8861\u9633","H"],"2512":["\u6000\u5316","H"],"2508":["\u5a04\u5e95","L"],"2513":["\u9ed4\u9633","Q"],"2509":["\u90b5\u9633","S"],"2502":["\u6e58\u6f6d","X"],"2515":["\u6e58\u897f","X"],"2507":["\u76ca\u9633","Y"],"2514":["\u6c38\u5dde","Y"],"2510":["\u5cb3\u9633","Y"],"2511":["\u5f20\u5bb6\u754c","Z"],"2503":["\u682a\u6d32","Z"]},"26":{"2603":["\u5b89\u987a","A"],"2607":["\u6bd5\u8282","B"],"2604":["\u90fd\u5300","D"],"2601":["\u8d35\u9633","G"],"2605":["\u51ef\u91cc","K"],"2608":["\u516d\u76d8\u6c34","L"],"2609":["\u9ed4\u897f","Q"],"2606":["\u94dc\u4ec1","T"],"2602":["\u9075\u4e49","Z"]},"27":{"2719":["\u963f\u575d","A"],"2708":["\u5e7f\u5b89","A"],"2721":["\u5e7f\u5143","A"],"2709":["\u5df4\u4e2d","B"],"2701":["\u6210\u90fd","C"],"2706":["\u8fbe\u5dde","D"],"2720":["\u5fb7\u9633","D"],"2718":["\u7518\u5b5c","G"],"2714":["\u4e50\u5c71","L"],"2716":["\u51c9\u5c71","L"],"2710":["\u6cf8\u5dde","L"],"2715":["\u7709\u5c71","M"],"2704":["\u7ef5\u9633","M"],"2705":["\u5357\u5145","N"],"2712":["\u5185\u6c5f","N"],"2702":["\u6500\u679d\u82b1","P"],"2707":["\u9042\u5b81","S"],"2717":["\u96c5\u5b89","Y"],"2711":["\u5b9c\u5bbe","Y"],"2703":["\u81ea\u8d21","Z"],"2713":["\u8d44\u9633","Z"]},"28":{"2815":["\u6f6e\u5dde","C"],"2816":["\u4e1c\u839e","D"],"2822":["\u4e1c\u6c99\u5c9b","D"],"2808":["\u4f5b\u5c71","F"],"2801":["\u5e7f\u5dde","G"],"2812":["\u6cb3\u6e90","H"],"2803":["\u60e0\u5dde","H"],"2811":["\u6c5f\u95e8","J"],"2819":["\u63ed\u9633","J"],"2820":["\u8302\u540d","M"],"2804":["\u6885\u5dde","M"],"2813":["\u6e05\u8fdc","Q"],"2805":["\u6c55\u5934","S"],"2821":["\u6c55\u5c3e","S"],"2802":["\u97f6\u5173","S"],"2806":["\u6df1\u5733","S"],"2818":["\u9633\u6c5f","Y"],"2814":["\u4e91\u6d6e","Y"],"2810":["\u6e5b\u6c5f","Z"],"2809":["\u8087\u5e86","Z"],"2817":["\u4e2d\u5c71","Z"],"2807":["\u73e0\u6d77","Z"]},"29":{"2905":["\u4fdd\u5c71","B"],"2908":["\u695a\u96c4","C"],"2902":["\u5927\u7406","D"],"2915":["\u5fb7\u5b8f","D"],"2913":["\u8fea\u5e86","D"],"2903":["\u7ea2\u6cb3","G"],"2901":["\u6606\u660e","K"],"2914":["\u4e3d\u6c5f","L"],"2911":["\u4e34\u6ca7","L"],"2912":["\u6012\u6c5f","N"],"2904":["\u66f2\u9756","Q"],"2909":["\u601d\u8305","S"],"2906":["\u6587\u5c71","W"],"2916":["\u897f\u53cc\u7248\u7eb3","X"],"2907":["\u7389\u6eaa","Y"],"2910":["\u662d\u901a","Z"]},"30":{"3010":["\u767e\u8272","B"],"3013":["\u5317\u6d77","B"],"3002":["\u5d07\u5de6","C"],"3014":["\u9632\u57ce\u6e2f","F"],"3008":["\u8d35\u6e2f","G"],"3005":["\u6842\u6797","G"],"3012":["\u6cb3\u6c60","H"],"3007":["\u8d3a\u5dde","H"],"3004":["\u6765\u5bbe","L"],"3003":["\u67f3\u5dde","L"],"3001":["\u5357\u5b81","N"],"3011":["\u94a6\u5dde","Q"],"3006":["\u68a7\u5dde","W"],"3009":["\u7389\u6797","Y"]},"31":{"3109":["\u767d\u6c99","B"],"3116":["\u4fdd\u4ead","B"],"3108":["\u660c\u6c5f","C"],"3106":["\u6f84\u8fc8","C"],"3107":["\u510b\u5dde","D"],"3111":["\u5b9a\u5b89","D"],"3104":["\u4e1c\u65b9","D"],"3101":["\u6d77\u53e3","H"],"3123":["\u4e50\u4e1c","L"],"3105":["\u4e34\u9ad8","L"],"3118":["\u9675\u6c34","L"],"3117":["\u4e07\u5b81","M"],"3122":["\u5357\u6c99\u5c9b","N"],"3115":["\u6e05\u5170","Q"],"3113":["\u743c\u6d77","Q"],"3102":["\u743c\u5c71","Q"],"3110":["\u743c\u4e2d","Q"],"3103":["\u4e09\u4e9a","S"],"3120":["\u73ca\u745a\u5c9b","S"],"3124":["\u901a\u4ec0","T"],"3112":["\u5c6f\u660c","T"],"3114":["\u6587\u660c","W"],"3119":["\u897f\u6c99","X"],"3121":["\u6c38\u7f72\u7901","Y"]},"32":{"3201":["\u9999\u6e2f","X"]},"33":{"3301":["\u6fb3\u95e8","A"]},"34":{"3402":["\u9ad8\u96c4","G"],"3410":["\u82b1\u83b2","H"],"3409":["\u5609\u4e49","J"],"3412":["\u57fa\u9686","J"],"3408":["\u6f8e\u6e56","P"],"3401":["\u53f0\u5317","T"],"3411":["\u53f0\u4e1c","T"],"3403":["\u53f0\u5357","T"],"3404":["\u53f0\u4e2d","T"],"3405":["\u6843\u56ed","T"],"3406":["\u65b0\u7af9","X"],"3407":["\u5b9c\u5170","Y"]}}',
    current_id:'101280101'
};

$(document).ready(function(){
    Yl.ScriptLoader.Add({
        src:'http://api.114la.com/ip',
        charset:'gb2312'
    });
    window.ILData_callback = function () {
        if (typeof (ILData) != "undefined") {
            if (ILData[2] && ILData[3]) {
                var pid = Yl.getProId(ILData[2]);
                var cid = Yl.getCityId(pid, ILData[3]);
                var City = [pid, cid, cid, ILData[2], ILData[3]];
            }
        }
        //console.log(pid)
        //console.log(cid)
        //console.log(City)
        var mc_id = cid.substring(3,7)
        Yl.ScriptLoader.Add({
            src:hosturl+'?ct=api&ac=get_api_weater&wid=1101010101',
            charset:'utf-8'
        });
        window.Ylmf.getWeather = function (data){
            if (typeof (data) == "object" && typeof (data) != "undefined" && typeof (data.weatherinfo) != "undefined" && data.weatherinfo != false){
                data = data['weatherinfo'];
                for(k in data){
                    Data = data[k]
                    console.log(Data)
                    function callToday(day){
                        var dashCon = '<h6>'+data['city']+'今日天气</h6>'
                                        +'<p>'+data['date_y']+'  '+weekStr[w1]+'</p>'
                                        +'<img title="'+result['weather'][0]+'" alt="'+result['weather'][0]+'" src="static/images/weather/b/'+result['img'][0]+'_'+dn+'.png" />'
                                        +'<p>'+result['weather'][0]+'</p>'
                                        +'<p>'+result['temp'][0]+'</p>'
                                        +'<p>'+result['wind'][0]+'</p>'
                                        +'<div class="sunSta">'
                                            +'<span class="fl">日出 '+result['sunstat'][0][0]+'</span>'
                                            +'<span class="fr">日落 '+result['sunstat'][0][1]+'</span>'
                                        +'</div>';
                    };
                    function callFeature(day){
                        var dashCon = '<ul>'
                                        +'<li>'+smonth+'月'+sday+'日  '+weekStr[w1+1]+'（明天）</li>'
                                        +'<li><img title="'+result['weather'][1]+'" alt="'+result['weather'][1]+'" src="static/images/weather/s/'+result['img'][1]+'_'+dn+'.png" /></li>'
                                        +'<li>'
                                            +'<p>'+result['weather'][1]+'</p>'
                                            +'<p>'+result['temp'][1]+'</p>'
                                            +'<p>'+result['wind'][1]+'</p>'
                                        +'</li>'
                                        +'<li class="mnSunSta">'
                                            +'<span class="fl">日出 '+result['sunstat'][1][0]+'</span>'
                                            +'<span class="fr">日落 '+result['sunstat'][1][1]+'</span>'
                                        +'</li>'
                                    +'</ul>';
                    }
                }
                // var result = {
                //     "city":data['city'],
                //     "date_y":data['date_y'],
                //     "cityid":cid, 
                //     "temp":[data['temp1'], 
                //             data['temp2'], 
                //             data['temp3'], 
                //             data['temp4'], 
                //             data['temp5']],
                //     "img":[data['img1'], 
                //             data['img2'], 
                //             data['img3'], 
                //             data['img4'], 
                //             data['img5']],
                //     "weather":[data['weather1'], 
                //             data['weather2'], 
                //             data['weather3'], 
                //             data['weather4'], 
                //             data['weather5']],
                //     "wind":[data['wind1'], 
                //             data['wind2'], 
                //             data['wind3'], 
                //             data['wind4'], 
                //             data['wind5']],
                //     "sunstat":[[data['sr1'], data['su1']],
                //                 [data['sr2'], data['su2']],
                //                 [data['sr3'], data['su3']],
                //                 [data['sr4'], data['su4']],
                //                 [data['sr5'], data['su5']]]
                // };
                
                // if (result) {
                //     Weather.ShowStatus(200, result);
                //     //Cookie.set(that.WeatherCookieName, 1);
                // }
            } else if (!Data.weatherinfo) {
                Weather.ShowStatus(404);
            }
        }
    }
    $("table.paycol tr").each(function (i){
        if(i%2 === 1){
            $(this).css("background","#f9f9f9")
        }
    });
    $(".managPlace li").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    $("span.icity").click(function(){
        var taplat_hgt = $(".taplat").height();
        var tbsi = $(".taplat:eq(0) table tr").size();
        if(tbsi > 2){
            $(".managPlace").height(taplat_hgt - 15).toggle();
        }else $(".managPlace").toggle();
    });
    $("ul.guaidlis li").hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
    // $(".indeeStats ul").live({
    //     mouseover:function(){
    //         var tmask = '<li class="tmask"></li>';
    //         $(this).find(".mnSunSta").animate({top:"0px"},{duration: "fast"});
    //         $(this).append(tmask);
    //     },
    //     mouseout:function(){
    //         $(this).find(".mnSunSta").animate({top:"-40px"},{duration: "fast"});
    //         $(this).find(".tmask").remove();
    //     }
    // })
    $(".indeeStats ul").hover(function(){
        var tmask = '<li class="tmask"></li>';
        $(this).find(".mnSunSta").animate({top:"0px"},{duration: "fast"});
        $(this).append(tmask);
    },function(){
        $(this).find(".mnSunSta").animate({top:"-40px"},{duration: "fast"});
        $(this).find(".tmask").remove();
    });
    // $(".curStats").live({
    //     mouseover:function(){
    //         var kimask = '<div class="kimask"></div>';
    //         $(this).append(kimask);
    //     },
    //     mouseout:function(){
    //         $(this).find(".kimask").remove();
    //     }
    // })
    $(".curStats").hover(function(){
        var kimask = '<div class="kimask"></div>';
        $(this).append(kimask);
    },function(){
        $(this).find(".kimask").remove();
    });
    $("input#sear").focus(function(){
        $("#serTop").show();
    });
    $(".slayout").find("a.close").click(function(){
        $(this).parents(".slayout").hide();
    });

    $("#changeCity").click(function(){
        $("#choiCity").show();
    });
    $(".cityOpera").find(".close").click(function(){
        $(this).parents(".cityOpera").hide();
    });

    $("ul.movTaber li").click(function(){
        $(this).addClass("current").siblings("li").removeClass();
        $(".tabCont").eq($(this).index()).show().siblings(".tabCont").hide();
    });

    $(".managPlace li.add").click(function(){
        $("#widCam").show();
    });

    $("#updig").click(function(){
        $("#larSel").show();
    });
});
$(window).load(function(){
    var flashId = DateStatic.current_id;
    $("#insetInsta").html('<iframe scrolling="no" frameborder="0" id="surf" name="surf" src="http://flash.weather.com.cn/sk2/shikuang.swf?id='+flashId+'"></iframe><iframe scrolling="no" frameborder="0" id="masket"></iframe>')
});

var CityArr = [
["CategoryName", "ParentId", "Id"],
["华北地区", "0", "1"],
["北京", "1", "109"],
["北京", "109", "101010100", "B"],
["天津", "1", "110"],
["天津", "110", "101030100", "T"],
["河北", "1", "111"],
["石家庄", "111", "101090101", "S"],
["保定", "111", "101090201", "B"],
["承德市", "111", "101090402", "C"],
["沧州", "111", "101090701", "C"],
["衡水", "111", "101090801", "H"],
["邯郸", "111", "101091001", "H"],
["廊坊", "111", "101090601", "L"],
["秦皇岛", "111", "101091101", "Q"],
["唐山", "111", "101090501", "T"],
["邢台", "111", "101090901", "X"],
["张家口", "111", "101090301", "Z"],
["山西", "1", "112"],
["太原", "112", "101100101", "T"],
["长治", "112", "101100501", "C"],
["大同", "112", "101100201", "D"],
["晋中", "112", "101100401", "J"],
["晋城", "112", "101100601", "J"],
["临汾", "112", "101100701", "L"],
["吕梁", "112", "101101100", "L"],
["忻州", "112", "101101001", "X"],
["阳泉", "112", "101100301", "Y"],
["运城", "112", "101100801", "Y"],
["朔州", "112", "101100901", "Y"],
["内蒙古", "1", "113"],
["呼和浩特", "113", "101080101", "H"],
["阿拉善左旗", "113", "101081201", "A"],
["包头", "113", "101080201", "B"],
["赤峰", "113", "101080601", "C"],
["鄂尔多斯", "113", "101080701", "E"],
["呼伦贝尔", "113", "101081000", "H"],
["集宁", "113", "101080401", "J"],
["临河", "113", "101080801", "L"],
["通辽", "113", "101080501", "T"],
["乌海", "113", "101080301", "W"],
["乌兰浩特", "113", "101081101", "W"],
["锡林浩特", "113", "101080901", "X"],
["东北地区", "0", "2"],
["辽宁", "2", "114"],
["沈阳", "114", "101070101", "S"],
["鞍山", "114", "101070301", "A"],
["本溪", "114", "101070501", "B"],
["朝阳", "114", "101071201", "C"],
["大连", "114", "101070201", "D"],
["丹东", "114", "101070601", "D"],
["抚顺", "114", "101070401", "F"],
["阜新", "114", "101070901", "F"],
["葫芦岛", "114", "101071401", "H"],
["锦州", "114", "101070701", "J"],
["辽阳", "114", "101071001", "L"],
["盘锦", "114", "101071301", "P"],
["铁岭", "114", "101071101", "T"],
["营口", "114", "101070801", "Y"],
["吉林", "2", "115"],
["长春", "115", "101060101", "C"],
["白城", "115", "101060601", "B"],
["白山", "115", "101060901", "B"],
["吉林", "115", "101060201", "J"],
["辽源", "115", "101060701", "L"],
["四平", "115", "101060401", "S"],
["松原", "115", "101060801", "S"],
["通化", "115", "101060501", "T"],
["延吉", "115", "101060301", "Y"],
["黑龙江", "2", "116"],
["哈尔滨", "116", "101050101", "H"],
["大兴安岭", "116", "101050701", "D"],
["大庆", "116", "101050901", "D"],
["黑河", "116", "101050601", "H"],
["鹤岗", "116", "101051201", "H"],
["佳木斯", "116", "101050401", "J"],
["鸡西", "116", "101051101", "J"],
["牡丹江", "116", "101050301", "M"],
["齐齐哈尔", "116", "101050201", "Q"],
["七台河", "116", "101051002", "Q"],
["绥化", "116", "101050501", "S"],
["伊春", "116", "101050801", "Y"],
["双鸭山", "116", "101051301", "S"],
["华东地区", "0", "3"],
["上海", "3", "117"],
["上海", "117", "101020100", "S"],
["山东", "3", "118"],
["济南", "118", "101120101", "J"],
["滨州", "118", "101121101", "B"],
["德州", "118", "101120401", "D"],
["东营", "118", "101121201", "D"],
["菏泽", "118", "101121001", "H"],
["济宁", "118", "101120701", "J"],
["临沂", "118", "101120901", "L"],
["莱芜", "118", "101121601", "L"],
["聊城", "118", "101121701", "L"],
["青岛", "118", "101120201", "Q"],
["潍坊", "118", "101120601", "W"],
["威海", "118", "101121301", "W"],
["烟台", "118", "101120501", "Y"],
["日照", "118", "101121501", "R"],
["泰安", "118", "101120801", "T"],
["淄博", "118", "101120301", "Z"],
["枣庄", "118", "101121401", "Z"],
["安徽", "3", "119"],
["合肥", "119", "101220101", "H"],
["安庆", "119", "101220601", "A"],
["蚌埠", "119", "101220201", "B"],
["亳州", "119", "101220901", "B"],
["滁州", "119", "101221101", "C"],
["巢湖", "119", "101221601", "C"],
["池州", "119", "101221701", "C"],
["阜阳", "119", "101220801", "F"],
["淮南", "119", "101220401", "H"],
["黄山", "119", "101221001", "H"],
["淮北", "119", "101221201", "H"],
["六安", "119", "101221501", "L"],
["马鞍山", "119", "101220501", "M"],
["宿州", "119", "101220701", "S"],
["铜陵", "119", "101221301", "T"],
["芜湖", "119", "101220301", "W"],
["宣城", "119", "101221401", "X"],
["江苏", "3", "120"],
["南京", "120", "101190101", "N"],
["常州", "120", "101191101", "C"],
["南通", "120", "101190501", "N"],
["淮安", "120", "101190901", "H"],
["连云港", "120", "101191001", "L"],
["苏州", "120", "101190401", "S"],
["宿迁", "120", "101191301", "S"],
["泰州", "120", "101191201", "T"],
["无锡", "120", "101190201", "W"],
["徐州", "120", "101190801", "X"],
["扬州", "120", "101190601", "Y"],
["盐城", "120", "101190701", "Y"],
["镇江", "120", "101190301", "Z"],
["浙江", "3", "121"],
["杭州", "121", "101210101", "H"],
["湖州", "121", "101210201", "H"],
["嘉兴", "121", "101210301", "J"],
["金华", "121", "101210901", "J"],
["丽水", "121", "101210801", "L"],
["宁波", "121", "101210401", "N"],
["衢州", "121", "101211001", "Q"],
["绍兴", "121", "101210501", "S"],
["台州", "121", "101210601", "T"],
["温州", "121", "101210701", "W"],
["舟山", "121", "101211101", "Z"],
["江西", "3", "122"],
["南昌", "122", "101240101", "N"],
["抚州", "122", "101240401", "F"],
["赣州", "122", "101240701", "G"],
["九江", "122", "101240201", "J"],
["吉安", "122", "101240601", "J"],
["景德镇", "122", "101240801", "J"],
["萍乡", "122", "101240901", "P"],
["上饶", "122", "101240301", "S"],
["新余", "122", "101241001", "X"],
["宜春", "122", "101240501", "Y"],
["鹰潭", "122", "101241101", "Y"],
["福建", "3", "123"],
["福州", "123", "101230101", "F"],
["龙岩", "123", "101230701", "L"],
["宁德", "123", "101230301", "N"],
["南平", "123", "101230901", "N"],
["莆田", "123", "101230401", "P"],
["泉州", "123", "101230501", "Q"],
["三明", "123", "101230801", "S"],
["厦门", "123", "101230201", "X"],
["漳州", "123", "101230601", "Z"],
["中南地区", "0", "4"],
["河南", "4", "124"],
["郑州", "124", "101180101", "Z"],
["安阳", "124", "101180201", "A"],
["鹤壁", "124", "101181201", "H"],
["焦作", "124", "101181101", "J"],
["济源", "124", "101181801", "J"],
["开封", "124", "101180801", "K"],
["洛阳", "124", "101180901", "L"],
["漯河", "124", "101181501", "L"],
["南阳", "124", "101180701", "N"],
["平顶山", "124", "101180501", "P"],
["濮阳", "124", "101181301", "P"],
["商丘", "124", "101181001", "S"],
["三门峡", "124", "101181701", "S"],
["信阳", "124", "101180601", "X"],
["新乡", "124", "101180301", "X"],
["许昌", "124", "101180401", "X"],
["周口", "124", "101181401", "Z"],
["驻马店", "124", "101181601", "Z"],
["湖北", "4", "125"],
["武汉", "125", "101200101", "W"],
["鄂州", "125", "101200301", "E"],
["恩施", "125", "101201001", "E"],
["黄冈", "125", "101200501", "H"],
["黄石", "125", "101200601", "H"],
["荆州", "125", "101200801", "J"],
["荆门", "125", "101201401", "J"],
["潜江", "125", "101201701", "Q"],
["十堰", "125", "101201101", "S"],
["神农架", "125", "101201201", "S"],
["随州", "125", "101201301", "S"],
["天门", "125", "101201501", "T"],
["襄樊", "125", "101200201", "X"],
["孝感", "125", "101200401", "X"],
["咸宁", "125", "101200701", "X"],
["仙桃", "125", "101201601", "X"],
["宜昌", "125", "101200901", "Y"],
["湖南", "4", "126"],
["长沙", "126", "101250101", "C"],
["郴州", "126", "101250501", "C"],
["常德", "126", "101250601", "C"],
["衡阳", "126", "101250401", "H"],
["怀化", "126", "101251201", "H"],
["吉首", "126", "101251501", "J"],
["娄底", "126", "101250801", "L"],
["黔阳", "126", "101251301", "Q"],
["邵阳", "126", "101250901", "S"],
["湘潭", "126", "101250201", "X"],
["益阳", "126", "101250701", "Y"],
["岳阳", "126", "101251001", "Y"],
["永州", "126", "101251401", "Y"],
["株洲", "126", "101250301", "Z"],
["张家界", "126", "101251101", "Z"],
["广东", "4", "127"],
["广州", "127", "101280101", "G"],
["潮州", "127", "101281501", "C"],
["东莞", "127", "101281601", "D"],
//["东沙岛","127","101282105","D"],
["佛山", "127", "101280800", "F"],
["惠州", "127", "101280301", "H"],
["河源", "127", "101281201", "H"],
["江门", "127", "101281101", "J"],
["揭阳", "127", "101281901", "J"],
["梅州", "127", "101280401", "M"],
["茂名", "127", "101282001", "M"],
["清远", "127", "101281301", "Q"],
["韶关", "127", "101280201", "S"],
["汕头", "127", "101280501", "S"],
["深圳", "127", "101280601", "S"],
["汕尾", "127", "101282101", "S"],
["云浮", "127", "101281401", "Y"],
["阳江", "127", "101281801", "Y"],
["珠海", "127", "101280701", "Z"],
["肇庆", "127", "101280901", "Z"],
["湛江", "127", "101281001", "Z"],
["中山", "127", "101281701", "Z"],
["广西", "4", "128"],
["南宁", "128", "101300101", "N"],
["北海", "128", "101301301", "B"],
["百色", "128", "101301001", "B"],
["崇左", "128", "101300201", "C"],
["防城港", "128", "101301401", "F"],
["桂林", "128", "101300501", "G"],
["贵港", "128", "101300801", "G"],
["贺州", "128", "101300701", "H"],
["河池", "128", "101301201", "H"],
["柳州", "128", "101300301", "L"],
["来宾", "128", "101300401", "L"],
["钦州", "128", "101301101", "Q"],
["梧州", "128", "101300601", "W"],
["玉林", "128", "101300901", "Y"],
["海南", "4", "129"],
["海口", "129", "101310101", "H"],
["白沙", "129", "101310907", "B"],
["保亭", "129", "101311614", "B"],
["澄迈", "129", "101310604", "C"],
["昌江", "129", "101310806", "C"],
["东方", "129", "101310402", "D"],
["儋州", "129", "101310705", "D"],
["定安", "129", "101311109", "D"],
["临高", "129", "101310503", "L"],
["陵水", "129", "101311816", "L"],
["乐东", "129", "101312321", "L"],
["琼山", "129", "101310102", "Q"],
["琼中", "129", "101310208", "Q"],
["琼海", "129", "101311311", "Q"],
["清兰", "129", "101311513", "Q"],
["南沙岛", "129", "101312220", "N"],
["三亚", "129", "101310301", "S"],
["珊瑚岛", "129", "101312018", "S"],
["屯昌", "129", "101311210", "T"],
["通什", "129", "101312422", "T"],
["文昌", "129", "101311412", "W"],
["万宁", "129", "101311715", "W"],
["西沙", "129", "101311917", "X"],
["永署礁", "129", "101312119", "Y"],
["西北地区", "0", "5"],
["陕西", "5", "130"],
["西安", "130", "101110101", "X"],
["安康", "130", "101110701", "A"],
["宝鸡", "130", "101110901", "B"],
["汉中", "130", "101110801", "H"],
["商洛", "130", "101110601", "S"],
["铜川", "130", "101111001", "T"],
["渭南", "130", "101110501", "W"],
["咸阳", "130", "101110200", "X"],
["延安", "130", "101110300", "Y"],
["榆林", "130", "101110401", "Y"],
["甘肃", "5", "131"],
["兰州", "131", "101160101", "L"],
["白银", "131", "101161301", "B"],
["定西", "131", "101160201", "D"],
["合作", "131", "101161201", "H"],
["金昌", "131", "101160601", "J"],
["酒泉", "131", "101160801", "J"],
["临夏", "131", "101161101", "L"],
["平凉", "131", "101160301", "P"],
["庆阳", "131", "101160401", "Q"],
["天水", "131", "101160901", "T"],
["武威", "131", "101160501", "W"],
["武都", "131", "101161001", "W"],
["张掖", "131", "101160701", "Z"],
["宁夏", "5", "132"],
["银川", "132", "101170101", "Y"],
["固原", "132", "101170401", "G"],
["石嘴山", "132", "101170201", "S"],
["吴忠", "132", "101170301", "W"],
["中卫", "132", "101170501", "Z"],
["青海", "5", "133"],
["西宁", "133", "101150101", "X"],
["果洛", "133", "101150501", "G"],
["海西", "133", "101150701", "H"],
["海北", "133", "101150801", "H"],
["海东", "133", "101150201", "H"],
["黄南", "133", "101150301", "H"],
["海南", "133", "101150401", "H"],
["玉树", "133", "101150601", "Y"],
["新疆", "5", "134"],
["乌鲁木齐", "134", "101130101", "W"],
["阿勒泰", "134", "101131401", "A"],
["阿图什", "134", "101131501", "A"],
["阿克苏", "134", "101130801", "A"],
["阿拉尔", "134", "101130701", "A"],
["博乐", "134", "1011301601", "B"],
["昌吉", "134", "101130401", "C"],
["哈密", "134", "101131201", "H"],
["和田", "134", "101131301", "H"],
["克拉玛依", "134", "101130201", "K"],
["喀什", "134", "101130901", "K"],
["库尔勒", "134", "101130601", "K"],
["石河子", "134", "101130301", "S"],
["吐鲁番", "134", "101130501", "T"],
["塔城", "134", "101131101", "T"],
["伊宁", "134", "101131001", "Y"],
["西南地区", "0", "6"],
["重庆", "6", "135"],
["重庆", "135", "101040100", "C"],
["四川", "6", "136"],
["成都", "136", "101270101", "C"],
["阿坝", "136", "101271901", "A"],
["巴中", "136", "101270901", "B"],
["德阳", "136", "101272001", "D"],
["达州", "136", "101270601", "D"],
["广元", "136", "101272101", "G"],
["甘孜", "136", "101271801", "G"],
["泸州", "136", "101271001", "L"],
["乐山", "136", "101271401", "L"],
["凉山", "136", "101271601", "L"],
["眉山", "136", "101271501", "M"],
["绵阳", "136", "101270401", "M"],
["南充", "136", "101270501", "N"],
["内江", "136", "101271201", "N"],
["攀枝花", "136", "101270201", "P"],
["遂宁", "136", "101270701", "S"],
["广安", "136", "101270801", "G"],
["雅安", "136", "101271701", "Y"],
["宜宾", "136", "101271101", "Y"],
["资阳", "136", "101271301", "Z"],
["自贡", "136", "101270301", "Z"],
["贵州", "6", "137"],
["贵阳", "137", "101260101", "G"],
["安顺", "137", "101260301", "A"],
["毕节", "137", "101260701", "B"],
["都匀", "137", "101260401", "D"],
["凯里", "137", "101260501", "K"],
["六盘水", "137", "101260801", "L"],
["铜仁", "137", "101260601", "T"],
["遵义", "137", "101260201", "Z"],
["黔西", "137", "101260901", "Q"],
["云南", "6", "138"],
["昆明", "138", "101290101", "K"],
["保山", "138", "101290501", "B"],
["楚雄", "138", "101290801", "C"],
["大理", "138", "101290201", "D"],
["德宏", "138", "101291501", "D"],
["红河", "138", "101290301", "H"],
["景洪", "138", "101291601", "J"],
["临沧", "138", "101291101", "L"],
["丽江", "138", "101291401", "L"],
["怒江", "138", "101291201", "N"],
["曲靖", "138", "101290401", "Q"],
["思茅", "138", "101290901", "S"],
["文山", "138", "101290601", "W"],
["玉溪", "138", "101290701", "Y"],
["昭通", "138", "101291001", "Z"],
["中甸", "138", "101291301", "Z"],
["西藏", "6", "139"],
["拉萨", "139", "101140101", "L"],
["阿里", "139", "101140701", "A"],
["昌都", "139", "101140501", "C"],
["林芝", "139", "101140401", "L"],
["那曲", "139", "101140601", "N"],
["日喀则", "139", "101140201", "R"],
["山南", "139", "101140301", "S"],
["港澳台", "0", "7"],
["香港", "7", "140"],
["香港", "140", "101320101", "X"],
["澳门", "7", "141"],
["澳门", "141", "101330101", "A"],
["台湾", "7", "142"],
["台北县", "142", "101340101", "T"],
["高雄", "142", "101340201", "G"],
["花莲", "142", "101341001", "H"],
["嘉义", "142", "101340901", "J"],
["马公", "142", "101340801", "M"],
["彭佳屿", "142", "101341201", "P"],
["台南", "142", "101340301", "T"],
["台中", "142", "101340401", "T"],
["桃园", "142", "101340501", "T"],
["台东", "142", "101341101", "T"],
["新竹县", "142", "101340601", "X"],
["宜兰", "142", "101340701", "Y"]
]