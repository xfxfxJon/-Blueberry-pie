$(document).ready(function () {


    //获取数据API
    function getProduct() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getChengpinDetails.php", function (res) {
            console.log(res);
            if (res.success) {
                var data = res.chengpinDetails[0];
                console.log(data.title.replace(/\s/g, " \n "));
                $('.det_title h3 pre').html(data.title.replace(/\s/g, " \n "));


                // 加载图片
                var str = '';
                for (var i = 0; i < data.img.length; i++) {
                    str +=
                        '<img src="' + data.img[i] + '" alt=""></img>';
                }
                $('.det_imgs').html(str);

                $(".comments_chat").each(function (i) {
                    $('.comments_chat').eq(i).click(function () {
                        if ($('.discuss').eq(i).css('display') == 'none') {
                            $('.discuss').eq(i).css('display', "block");
                        } else {
                            $('.discuss').eq(i).css('display', "none");
                        }
                    });
                });
            }
        });
    }
    getProduct();
});