var ieAlert = '<div id="ifie">'
			    +'<h2>卧你妹不支持您的浏览器</h2>'
			    +'<ul>'
			        +'<li>'
			            +'<a href="http://www.google.com/chrome">'
			                +'<img src="images/browser/chrome_8.png" />'
			            +'</a>'
			        +'</li>'
			        +'<li>'
			            +'<a href="http://www.mozilla.org/en-US/firefox/new/">'
			                +'<img src="images/browser/firefox_8.png" />'
			            +'</a>'
			        +'</li>'
			        +'<li>'
			            +'<a href="http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser">'
			                +'<img src="images/browser/ie9_8.png" />'
			            +'</a>'
			        +'</li>'
			        +'<li>'
			            +'<a href="http://www.apple.com/safari/">'
			                +'<img src="images/browser/safari_8.png" />'
			            +'</a>'
			        +'</li>'
			    +'</ul>'
			    +'<p>作为一名有素质、有文化的新一代网民，请使用以上现代浏览器。</p>'
			    +'<p><button id="closeWeb" class="btn" onclick="closewin()">关闭网页</button></p>'
			+'</div>'
			+'<div class="mask"></div>';
$("body").append(ieAlert);

function closewin(){
    window.opener=null;
    window.open('','_self');
    window.close();
}