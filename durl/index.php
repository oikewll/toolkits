<?php
$app_key = '21489789';
$secret='9164cbdf20daf44dd4aef54a078c9c68';
$timestamp=time()."000";
$message = $secret.'app_key'.$app_key.'timestamp'.$timestamp.$secret;
$mysign=strtoupper(hash_hmac("md5",$message,$secret));
setcookie("timestamp",$timestamp);
setcookie("sign",$mysign);
?>
<!DOCTYPE html>
<html>
<head>
<title>短网址</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="description" content="短网址,短网址生成,短网址api" />
<link href="http://sae.sina.com.cn/static/css/bootstrap.css" rel="stylesheet" />
<script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=21489789"></script>
<link href="css/style.css" rel="stylesheet" />
</head>

<body>
<div class="formType">
	<h1 class="slogen">短网址<span>(有什么用?)</h1>
	<div class="viewer clearfix">
		<input type="text" id="txt" placeholder="请输入长网址" /><button id="btn" class="btn btn-primary">提交</button>
	</div>
	<div id="sina" class="comWrap"></div>
	<div id="isgd" class="comWrap"></div>
	<div id="dwz6" class="comWrap"></div>
	<div id="bitly" class="comWrap"></div>
	<div id="help"></div>
</div>
<div class="footer">
	<p>&copy;2013 design & code by <a href="http://weibo.com/goochin" target="_blank">Goochin</a>.</p>
</div>
<script src="http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js"></script>
<script src="js/combo.js"></script>

<span style="display:none;">
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F5bbb0489a0fd197a9e3094997fb5a294' type='text/javascript'%3E%3C/script%3E"));
</script>
</span>
</body>
</html>