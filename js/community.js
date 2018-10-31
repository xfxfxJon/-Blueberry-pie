$(document).ready(function () {

    var step = 20;

    //获取API
    function getListen() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getListeningInfo.php", function (res) {
            console.log(JSON.parse(res));
            var data = JSON.parse(res);
            if(data.success){

                // writer
                var writerStr = '';
                for(var i = 0; i < data.writer.length; i++){
                    writerStr +=
                    '<span>'+ data.writer[i] +'</span>';
                }
                $('.character_bottom_center').html(writerStr);


                // 为标题列表添加监听事件
                $('.left').click(function(){
                    var currentLeft = parseInt($('.character_bottom_center').css('left'));
                    currentLeft += step;
                    if(currentLeft >= 0){
                        currentLeft = 0;
                    }
                    $('.character_bottom_center').css('left', currentLeft + 'px');
                });

                $('.right').click(function(){
                    var currentLeft = parseInt($('.character_bottom_center').css('left'));
                    var currentWidth = 0;
                    $('.character_bottom_center span').each(function(){
                        currentWidth += $(this).outerWidth();
                    });
                    var totalLeft = (currentWidth-parseInt($('.character_bottom_center').width()));
                    // console.log(currentWidth);
                    currentLeft -= step;
                    if(currentLeft <= -totalLeft){
                        currentLeft = -totalLeft;
                    }
                    $('.character_bottom_center').css('left', currentLeft + 'px');
                });



                // 瀑布流
                // 加载图片
                var str = '';
                for(var j = 0; j < data.listening.length; j++){
                    var userPic = data.listening[j].head_pic.replace('iwen.wiki','wwtliu.com');
                    var img = data.listening[j].img.replace('iwen.wiki','wwtliu.com');
                    str +=
                    '<div class="item">' +
                        '<div class="item_top">' +
                            '<img src="'+ userPic +'" alt="">' +
                            '<div class="author">' +
                                '<p class="">'+ data.listening[j].title +'</p>' +
                                '<p class="">'+ data.listening[j].writer +'</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="item_img">' +
                            '<img src="'+ img +'" alt="">' +
                        '</div>' +
                        '<div class="item_bottom">' +
                            '<p>'+ data.listening[j].series +'</p>' +
                            '<div>' +
                                '<i class="zan"></i>' +
                                '<i class="zan_num">'+ data.listening[j].like +'</i>' +
                                '<i class="chat"></i>' +
                                '<i class="chat_num">'+ data.listening[j].message +'</i>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                }
                $('.box .container').html(str);

                var itemImgList = $('.item_img img').length;
                var count = 0;
                $('.item_img img').each(function(i){
                    $(this).get(0).onload = function(){
                        // console.log(i);
                        count++;
                        if(count == itemImgList){
                            // console.log("加载完成");
                            setWall();
                        }
                    };
                });
            }
        });
    }
    getListen();
});



//设置瀑布流
function setWall(){
    var arr = [];
    $('.item').each(function(i){
        if(i < 4){
            arr.push($(this).outerHeight(true));
        }else{
            $(this).css('position', "absolute");
            var minHeight = Math.min.apply(null,arr);
            var minIndex = arr.indexOf(minHeight);
            $(this).css({
                "top": minHeight + "px",
                "left": $('.item').eq(minIndex).get(0).offsetLeft + "px"
            });

            arr[minIndex] += $(this).outerHeight(true);
        }
        if(i == $('.item').length -1){
            $('.box .container').css("height", Math.max.apply(null,arr));
        }
    });
}
