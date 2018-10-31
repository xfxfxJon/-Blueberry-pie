$(document).ready(function () {


    //获取数据API
    function getProduct() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getChengpinInfo.php", function (res) {
            console.log(res);
            // return;
            if(res.success){
                var data = res.chengpinInfo;

                var str = '';
                for(var i = 0; i < data.length; i++){
                    data[i].img = data[i].img.replace("iwen.wiki", "wwtliu.com");
                    if(i%2 == 0){
                        str +=
                        '<div class="item">' +
                            '<div class="product_content">' +
                                '<div class="title">'+data[i].title +'</div>' +
                                '<div class="des">'+data[i].content +'</div>' +
                                '<span class="det"><a href="product_det.html" target="_blank">商品详情</a></span>' +
                            '</div>' +
                            '<div class="img">' +
                                '<img src="'+data[i].img +'" alt="">' +
                            '</div>' +
                        '</div>';
                    }else{
                        str +=
                        '<div class="item">' +
                            '<div class="img">' +
                                '<img src="'+data[i].img +'" alt="">' +
                            '</div>' +
                            '<div class="product_content">' +
                                '<div class="title">'+data[i].title +'</div>' +
                                '<div class="des">'+data[i].content +'</div>' +
                                '<span class="det"><a href="product_det.html" target="_blank">商品详情</a></span>' +
                            '</div>' +
                        '</div>';
                    }
                }
                $('.box .container').html(str);
            }
        });
    }
    getProduct();
});