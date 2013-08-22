<!DOCTYPE html>
<html>
<head>
<title>二维码图片生成</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="description" content="二维码图片生成,二维码图片php程序" />
<link href="http://sae.sina.com.cn/static/css/bootstrap.css" rel="stylesheet" />
<link href="css/style.css" rel="stylesheet" />
<link rel="shortcut icon" href="/favicon.ico" />
</head>

<body>
<div class="formType">
	<h1 class="slogen">二维码生成器</h1>
	<form action="/" method="post">
	<table>
		<tr>
			<td>图片规格：</td>
			<td><input type="text" name="width" value="230" class="st" /><i>x</i><input type="text" name="height" value="230" class="st" /></td>
		</tr>
		<tr>
			<td>网址链接：</td>
			<td><input type="text" name="url" /><span>http://</span></td>
		</tr>
		<tr>
			<td>边框大小：</td>
			<td><input type="text" name="border" value="2" /><span>边框留白设置</span></td>
		</tr>
		<tr>
			<td>纠错等级：</td>
			<td><input type="text" name="level" value="L" /><span>图片纠错等级<cite title="L：7%的字码可被修正；&#10;M：15%的字码可被修正；&#10;Q：25%的字码可被修正；&#10;H：30%的字码可被修正。&#10;容错率愈高，QR码图形面积愈大。">[?]</cite></span></td>
		</tr>
		<tr>
			<td>内容：</td>
			<td><textarea name="content" class="ct"></textarea></td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><button class="btn-primary btn" type="submit">创建</button><a href="javascript:;" onclick="location.reload()" class="rl">刷新</a></td>
		</tr>
	</table>
	</form>
</div>
		<?php
		if(isset($_POST["url"]) && trim($_POST["url"])!=""){
			$width=$_POST["width"];
			$height=$_POST["height"];
			$border=$_POST["border"];
			$level=$_POST["level"];
			$url=$_POST["url"];
			$content=$_POST["content"];
		?>
		<div class="formType imgCont clearfix" style="width:<?php echo $width;?>px;">
			<div id='loading'></div>
			<img id="aim" src="https://chart.googleapis.com/chart?cht=qr&chs=<?php echo $width;?>x<?php echo $height;?>&choe=UTF-8&chld=<?php echo $level;?>|<?php echo $border;?>&chl=<?php echo $url;?><?php echo $content;?>" />
	        <div id="jiathis_style_32x32">
	          <a class="jiathis_button_tsina"></a>
	          <a class="jiathis_button_tqq"></a>
	          <a class="jiathis_button_t163"></a>
	          <a class="jiathis_button_renren"></a>
	        </div>
		</div>
		<?php	
		}
		?>
<div class="footer">
	<p>&copy;2013 design & code by <a href="http://weibo.com/goochin" target="_blank">Goochin</a>.</p>
</div>
<script src="http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js"></script>
<script src="js/combo.js"></script>
<script src="http://v3.jiathis.com/code/jia.js?uid=1525296" charset="utf-8"></script>
<span style="display:none;">
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F5bbb0489a0fd197a9e3094997fb5a294' type='text/javascript'%3E%3C/script%3E"));
</script>
</span>
</body>
</html>