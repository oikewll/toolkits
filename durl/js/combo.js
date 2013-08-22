$(document).ready(function(){
	$(".btn").click(function(){
		var longurl = $("#txt").val();
		//验证网址
		if($('#help').html() != 'undefined'){
			$('#help').empty();
		}
		if(longurl == ''){
			$(".comWrap:eq(0)").show().html('<h4 id="url" class="red">呃噢~请输入网址···</h4>').siblings(".comWrap").hide();
			$("#txt").focus();
			return false;
		}else if(longurl.indexOf("http://") == -1 && longurl.indexOf("https://") == -1 && longurl.indexOf("e2dk://") == -1 && longurl.indexOf("ftp://") == -1 && longurl.indexOf("ftps://") == -1){
			$(".comWrap:eq(0)").show().html('<h4 id="url" class="red">支持格式："http://、https://、e2dk://、ftp://、ftps://"</h4>').siblings(".comWrap").hide();
			$("#txt").focus();
			return false;
		}
		//判断是否为淘宝链接
		if($("#txt").val().indexOf('item.taobao.com') >= 0){
			var len = longurl.length,item_id,
				offset = longurl.indexOf("?") + 1,
				str = longurl.substr(offset, len),
				obj = str.split('&');
				for(var i = 0; i < obj.length; i++){
					if(obj[i].indexOf('id=') >= 0){
						item_id = obj[i].substr(3,obj[i].length)
						break;
					}
				}
			TOP.init({appKey:'21489789'});
			TOP.api('rest','get',{
			    method:'taobao.taobaoke.widget.items.convert',
			    fields:'num_iid,click_url,title,price,item_location,pic_url,nick,shop_click_url,volume',
				num_iids:item_id
			}, function(resp){
				if(resp.error_response){
					alert('taobao.taobaoke.widget.items.convert接口获取商品信息品失败!'+resp.error_response.msg);
					return false;
				}else if(resp.taobaoke_items)
				{
					convertUrl = resp.taobaoke_items.taobaoke_item[0].click_url;
					title = resp.taobaoke_items.taobaoke_item[0].title;
					price = resp.taobaoke_items.taobaoke_item[0].price;
					item_location = resp.taobaoke_items.taobaoke_item[0].item_location;
					pic_url = resp.taobaoke_items.taobaoke_item[0].pic_url;
					nick = resp.taobaoke_items.taobaoke_item[0].nick;
					shop_click_url = resp.taobaoke_items.taobaoke_item[0].shop_click_url;
					volume = resp.taobaoke_items.taobaoke_item[0].volume;
					tinyurl(convertUrl);
					var div = '<div class="taobaoiTems clearfix">'
								+'<a target="_blank" href="'+convertUrl+'" class="timg"><img src="'+pic_url+'" /></a>'
								+'<ul>'
									+'<li><h3><a href="'+convertUrl+'" target="_blank">'+title+'</a></h3></li>'
									+'<li>店掌柜：<a href="'+shop_click_url+'" target="_blank">'+nick+'</a></li>'
									+'<li>所在地：<em>'+item_location+'</em> 最近成交：<i>'+volume+'</i> 笔</li>'
									+'<li>淘宝价：￥<span>'+price+'</span></li>'
								+'</ul>'
							+'</div>';
					$(div).insertAfter('.comWrap:last');
				}else{
					tinyurl(longurl);
					$(".taobaoiTems").empty().hide();
				}
			});
		}else{
			tinyurl(longurl);
			$(".taobaoiTems").empty().hide();
		}
	});

	function tinyurl(ele){
		$.ajax({
			tpye:'get',
			url:'http://api.weibo.com/2/short_url/shorten.json?source=173358021',
			data:'&url_long='+encodeURIComponent(ele),
			dataType:'jsonp',
			cache:'false',
			contentType:"application/json; charset=utf-8",
			timeout:7000,
			beforeSend:function(){
				$("#sina").show().html('<div class="loading"></div>');
			},
			success:function(data){
				status = data['code'];
				switch(status){
					case'1':
						url_short = data['data']['urls'][0]['url_short'];
						var per = parseInt(100 - (url_short.length / ele.length) * 100);
						$("#sina").show().html('<h4 id="url">'+url_short+'<span>(缩短'+per+'%)</span><a href="'+url_short+'" target="_blank">[测试]</a></h4>');
					break;
					case'0':
						error = data['data']['error'];
						$("#sina").show().html('<h4 id="url" class="red">'+error+'<span>(网址有误)</span></h4>');
					break;
				}
				$("#sina .loading").remove();
			},
			error:function(){
				$("#sina").show().html('<h4 id="url" class="red">数据请求错误，请稍后再试 :(</h4>');
			}
		})
		$.ajax({
			tpye:'get',
			url:'http://is.gd/create.php?format=json',
			data:'&url='+encodeURIComponent(ele),
			dataType:'jsonp',
			cache:'false',
			contentType:"application/json; charset=utf-8",
			timeout:7000,
			beforeSend:function(){
				$("#isgd").show().html('<div class="loading"></div>');
			},
			success:function(data){
				url_short = data['shorturl'];
				var per = parseInt(100 - (url_short.length / ele.length) * 100);
				$("#isgd").show().html('<h4 id="url">'+url_short+'<span>(缩短'+per+'%)</span><a href="'+url_short+'" target="_blank">[测试]</a></h4>');
				$("#isgd .loading").remove();
			},
			error:function(){
				$("#isgd").show().html('<h4 id="url" class="red">数据请求错误，请稍后再试 :(</h4>');
			}
		})
		$.ajax({
			tpye:'get',
			url:'http://dwz6.com/index.php?jsonpcallback=?',
			data:'ac=api&url='+encodeURIComponent(ele),
			dataType:'jsonp',
			cache:'false',
			contentType:"application/json; charset=utf-8",
			timeout:7000,
			beforeSend:function(){
				$("#dwz6").show().html('<div class="loading"></div>');
			},
			success:function(data){
                status = data['status'];
				switch(status){
					case'-1':
						msg = data['msg'];
						$("#dwz6").show().html('<h4 id="url" class="red">'+msg+'<span>(网址有误)</span></h4>');
					break;
					default:
						url_short = data['tinyurl'];
						var per = parseInt(100 - (url_short.length / ele.length) * 100);
						$("#dwz6").show().html('<h4 id="url">'+url_short+'<span>(缩短'+per+'%)</span><a href="'+url_short+'" target="_blank">[测试]</a></h4>');
					break;
				}
				$("#dwz6 .loading").remove();
			},
			error:function(){
				$("#dwz6").show().html('<h4 id="url" class="red">数据请求错误，请稍后再试 :(</h4>');
			}
		})
		/*$.ajax({
			tpye:'get',
			url:'http://api.bit.ly/v3/shorten?login=oikewll&apiKey=R_afb3f95f5fe4e03ac36a120e82b9565d&format=json',
			data:'longUrl='+encodeURIComponent(ele),
			dataType:'jsonp',
			contentType:"application/json; charset=utf-8", 
			cache:'false',
			timeout:7000,
			beforeSend:function(){
				$("#bitly").show().html('<div class="loading"></div>');
			},
			success:function(data){
				status = data['status_code'];
				switch(status){
					case'200':
						url = data['data']['url']
						var per = parseInt(100 - (url.length / ele.length) * 100);
						$("#bitly").show().html('<h4 id="url">'+url+'<span>(缩短'+per+'%)</span><a href="'+url+'" target="_blank">[测试]</a></h4>');
					break;
					case'500':
						error = data['status_txt'];
						$("#bitly").show().html('<h4 id="url" class="red">'+error+'<span>(网址有误)</span></h4>');
					break;
				}
				$("#bitly .loading").remove();
			},
			error:function(){
				$("#bitly").show().html('<h4 id="url" class="red">数据请求异常，请稍后再试 :(</h4>');
			}
		})*/
	}
	
	$(".slogen span").click(function(){
		$.get('/durl/help.html', function(data){
			var article = $(data).find("#help").html();
			$(".comWrap,.taobaoiTems").empty().hide();
			$('#help').html(article);
		})
	})
});
