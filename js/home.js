$(document).ready(function () {

    // 首页轮播API
    function getCarousel() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexBanner.php", function (res) {
            // console.log(res);
            if (res.success) {
                var data = res.banner;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str +=
                        '<div class="swiper-slide carousel_swiper">' +
                        '<img src="' + data[i].img + '" alt="">' +
                        '<a href="#" class="carousel_swiper_content ani" swiper-animate-effect="fadeInUp" ' +
                        'swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">' +
                        '<h3>' + data[i].title + '</h3>' +
                        '<p>' + data[i].content + '</p>' +
                        '</a>' +
                        '</div>';
                }
                $(".carousel_wrapper").html(str);

                new Swiper('.swiper_carousel', {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    speed: 500,
                    pagination: {
                        el: '.carousel_pagination',
                        bulletClass: 'my_bullet',
                        bulletActiveClass: 'my_bullet_active',
                    },
                    loop: true,
                    on: {
                        init: function () {
                            swiperAnimateCache(this); //隐藏动画元素 
                            swiperAnimate(this); //初始化完成开始动画
                        },
                        slideChangeTransitionEnd: function () {
                            swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                            // this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                        }
                    }
                });
            }
        });

    }
    getCarousel();




    // 乐章API
    function getMovement() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexMovement.php", function (res) {
            // console.log(res);
            if (res.success) {
                var data = res.movement;
                var str = '';
                for (var i = 0; i < data.length / 4; i++) {
                    str +=
                        '<div class="swiper-slide movement_swiper">' +
                        '<ul>';
                    for (var j = i * 4; j <= (i + 1) * 4 - 1; j++) {
                        data[j].img = data[j].img.replace(/iwen.wiki/, "wwtliu.com");
                        str +=
                            '<li>' +
                            '<div class="movement_item_img">' +
                            '<a href="#"><img src="' + data[j].img + '"></a>' +
                            '</div>' +
                            '<div class="movement_item_right">' +
                            '<h3><a href="#">' + data[j].title + '</a></h3>' +
                            '<p>' +
                            '<a href="#">' + data[j].writer + '</a>' +
                            '<i class="clock"></i>' +
                            '<span> 5/23&nbsp;&nbsp;16:15</span>' +
                            '</p>' +
                            '<p class="movement_item_right_content">' + data[j].content + '</p>' +
                            '<div class="movement_item_right_bottom">' +
                            '<i class="zan_icon"></i>' +
                            '<i class="zan">&nbsp;' + data[j].like + '</i>' +
                            '<i class="chart_icon"></i>' +
                            '<i class="chart">&nbsp;' + data[j].message + '</i>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }
                    str +=
                        '</ul>' +
                        '</div>';
                }
                $(".movement_wrapper").append(str);

                new Swiper('.swiper_movement', {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    speed: 500,
                    pagination: {
                        el: '.movement_pagination',
                        bulletClass: 'my_bullet',
                        bulletActiveClass: 'my_bullet_active',
                    },
                    loop: true,
                });
            }
        });
    }
    getMovement();





    // 听说API
    function getListen() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexListening.php", function (res) {
            // console.log(res);
            if (res.success) {
                var data = res.listening;
                for (var i = 0; i < data.length - 1; i++) {
                    data[i].img = data[i].img.replace(/iwen.wiki/, "wwtliu.com");
                    $(".item_pic:eq(" + i + ") img").attr("src", data[i].img);
                    $(".item_content:eq(" + i + ") p:eq(0)").html(data[i].title);
                    $(".item_content:eq(" + i + ") p:eq(1)").html(data[i].writer);
                    $(".item_content:eq(" + i + ") p:eq(2)").html(data[i].content);
                }
            }
        });
    }
    getListen();




    // 乐趣API
    function getInteresting() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexInteresting.php", function (res) {
            // console.log(res);
            if (res.success) {
                var data = res.interesting;
                var str = '';
                for (var i = 0; i < data.length / 4; i++) {
                    str +=
                        '<div class="swiper-slide interesting_swiper">' +
                        '<ul>';
                    for (var j = i * 4; j <= ((i + 1) * 4 - 1); j++) {
                        data[j].date = new Date(data[j].time);
                        data[j].img = data[j].img.replace(/iwen.wiki/, "wwtliu.com");
                        str +=
                            '<li>' +
                            '<div class="interesting_item_img">' +
                            '<img src="' + data[j].img + '" alt="">' +
                            '</div>' +
                            '<div class="interesting_item_right">' +
                            '<div class="interesting_item_right_title"><a href="#">' + data[j].title + '</a></div>' +
                            '<div class="interesting_item_right_author">' +
                            '<a href="#">' + data[j].writer + '</a>' +
                            '<i class="clock"></i>&nbsp;' +
                            '<span>' + (data[j].date.getMonth() + 1) + '/' + data[j].date.getDate() + '&nbsp;&nbsp;' + data[j].date.getHours() + ':' + data[j].date.getMinutes() + '</span>' +
                            '</div>' +
                            '<div class="interesting_item_right_content">' + data[j].content + '</div>' +
                            '</div>' +
                            '</li>';
                    }
                    str +=
                        '</ul>' +
                        '</div>';
                }
                $(".interesting_wrapper").html(str);
            }

            new Swiper('.swiper_interesting', {
                autoplay: {
                    disableOnInteraction: false,
                },
                speed: 500,
                pagination: {
                    el: '.interesting_pagination',
                    bulletClass: 'my_bullet',
                    bulletActiveClass: 'my_bullet_active',
                },
                loop: true,
            });
        });
    }
    getInteresting();



    // 聊聊API
    function getChat() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexChating.php", function (res) {
            // console.log(res);
            if(res.success){
                var data = res.chating;
                var str = '';
                for(var i = 0; i < data.length / 6; i++){
                    str += 
                    '<div class="swiper-slide chat_swiper">' +
                        '<ul>';
                        for(var j = i*6; j <= ((i + 1) * 6 -1); j++){
                            str += 
                            '<li>' +
                                '<div class="chat_item_left">生活'+ (i + 1) +'</div>' +
                                '<div class="chat_item_right">' +
                                    '<div class="chat_item_title">'+ data[j].title +'</div>' +
                                    '<div class="chat_item_content">'+ data[j].content +'</div>' +
                                '</div>' +
                           ' </li>';
                        }
                        str +=
                        '</ul>' +
                    '</div>';
                }
                $(".chat_wrapper").html(str);

                new Swiper('.swiper_chat', {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    speed: 500,
                    pagination: {
                        el: '.chat_pagination',
                        bulletClass: 'my_bullet',
                        bulletActiveClass: 'my_bullet_active',
                    },
                    loop: true,
                });
            }
        });
    }
    getChat();


    // 游记API
    function getTravel() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexTravelnote.php", function(res){
            // console.log(res);
            if(res.success){
                var data = res.travelnote;
                var str = '';
                for(var i = 0; i < data.length / 4; i++){
                    str +=
                    '<div class="swiper-slide travel_swiper">' + 
                        '<ul>';
                        for(var j = i * 4; j <= (( i + 1) * 4 - 1); j++){
                            data[j].img = data[j].img .replace(/iwen.wiki/, "wwtliu.com");
                            str +=
                            '<li>' + 
                                '<a href="#">' + 
                                    '<img src="'+  data[j].img +'" alt="">' + 
                                    '<p class="travel_item_title">'+  data[j].title +'</p>' + 
                                    '<p class="travel_item_author">'+  data[j].writer +'</p>' + 
                                    '<div class="travel_hidden">'+  data[j].content +'</div>' +
                                '</a>' + 
                            '</li>';
                        }
                        str +=
                        '</ul>' + 
                    '</div>';
                }
                $(".travel_wrapper").html(str);

                new Swiper('.swiper_travel', {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    speed: 500,
                    pagination: {
                        el: '.travel_pagination',
                        bulletClass: 'my_bullet',
                        bulletActiveClass: 'my_bullet_active',
                    },
                    loop: true,
                });
            }
        });
    }
    getTravel();


    // 其它API
    function getOther(){
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getIndexOther.php", function(res){
            console.log(res);
            if(res.success){
                var data = res.otherImgs;
                var str = '';
                for(var i = 0; i < data.length; i++){
                    data[i]= data[i].replace(/iwen.wiki/, "wwtliu.com");
                    str +=
                    '<li><a href="#"><img src="'+ data[i] +'" alt=""></a></li>';
                }

                $(".other_content ul").html(str);
            }
        });
    }
    getOther();

});