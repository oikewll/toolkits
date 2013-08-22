$(document).ready(function(){
	$(".btn").click(function(){
		var iurl = $('input[name=url]').val(),
			icontent = $('textarea[name=content]').val();
		if(iurl == '' && icontent == ''){
			alert('网址链接或者内容必须要填写一项哦~')
			return false;
		}
		else if(iurl==''){//地址是必填项所以内容替代
			$('input[name=url]').val(icontent);
			$('textarea[name=content]').val('');
		}
		else if(iurl != '' && icontent != ''){
			$('textarea[name=content]').val('?content='+icontent);
		}
	})
	$("#aim").load(function(){
		$("#loading").remove();
	})
});
//详细页分享api
var stitle = $("title").text(),
	varimg = $("#aim").attr('src');
var jiathis_config = {
	data_track_clickback:false,
	nota: true,
	title:'《'+stitle+'》',
	summary:'我分享了一个二维码，拍拍看是什么？',
	appkey:{
	"tsina":"173358021",
	"tqq":"801184656",
	"renren":"8009acebdc31497c8d59c7d0bce7f7d8",
	"t163":"Wn88PQhqDx0i7HRs"
	}, 
	pic:varimg,
	ralateuid:{
	"tsina":"1930674844"
	}
};