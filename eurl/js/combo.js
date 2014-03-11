$(document).ready(function(){
	$(".btn").click(function(){
		var shortUrl = $("#txt").val();
		//验证网址
		if(shortUrl == ''){
			$(".comWrap").show().html('<h4 id="url" class="red">呃噢~请输入短网址···</h4>');
			$("#txt").focus();
			return false;
		}else if(shortUrl.indexOf("http://") == -1 && shortUrl.indexOf("https://") == -1 && shortUrl.indexOf("e2dk://") == -1 && shortUrl.indexOf("ftp://") == -1 && shortUrl.indexOf("ftps://") == -1){
			$(".comWrap").show().html('<h4 id="url" class="red">支持格式："http://、https://"</h4>');
			$("#txt").focus();
			return false;
		}
		expandUrl(shortUrl);
	});

	function expandUrl(ele){
		$.ajax({
			tpye:'get',
			url:'http://api.longurl.org/v2/expand?format=json&title=2',
			data:'url='+encodeURIComponent(ele),
			dataType:'jsonp',
			cache:'false',
			contentType:"application/json; charset=utf-8",
			timeout:7000,
			beforeSend:function(){
				$(".comWrap").show().html('<div class="loading"></div>');
			},
			success:function(data){
				var longurl = data['long-url'],
					title   = data['title'];
				$(".comWrap").show().html('<h4 id="url"><span class="url-inner">'+longurl+'</span><a href="'+longurl+'" target="_blank">[测试]</a></h4>');
				$(".comWrap .loading").remove();
			},
			error:function(){
				$(".comWrap").show().html('<h4 id="url" class="red">数据请求错误，请稍后再试 :(</h4>');
			}
		})
	}
});
