$(document).ready(function(){
    $.getJSON('/json/geekr.json',function (data){
        var TPL = '';
        $.each(data, function (i,items){
            var time = items['pubDate'].split(' ')[4];
            TPL += '<article>'
                        +'<h2 class="title"><a href="'+items['link']+'" target="_blank">'+items['title']+'</a><em>by '+items['dc:creator']+' @'+time+'</em></h2>'
                        +'<div class="summary">'+items['description']+'</div>'
                        +'<div class="contents">'+items['content:encoded']+'</div>'
                    +'</article>';
        });
        $("#innCont").html(TPL);
    });
    $(".summary img").each(function(){
        $(this).attr("style","");
    });
});