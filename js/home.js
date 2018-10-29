$(document).ready(function () {

    // 首页轮播API
    function getCarousel() {
        new Swiper('.swiper_carousel', {
            autoplay: {
                disableOnInteraction: false,
            }, 
            speed: 500,
            pagination: {
                el: '.carousel_pagination',
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
    getCarousel();




    // 乐章API
    function getMovement() {
        new Swiper('.swiper_movement', {
            autoplay: {
                disableOnInteraction: false,
            }, 
            speed: 500,
            pagination: {
                el: '.movement_pagination',
            },
            loop: true,
        });
    }
    getMovement();




    // 乐趣API
    function getInstersting(){
        new Swiper('.swiper_instersting', {
            autoplay: {
                disableOnInteraction: false,
            }, 
            speed: 500,
            pagination: {
                el: '.instersting_pagination',
            },
            loop: true,
        });
    }
    getInstersting();



    // 聊聊API
    function getChat(){
        new Swiper('.swiper_chat', {
            autoplay: {
                disableOnInteraction: false,
            }, 
            speed: 500,
            pagination: {
                el: '.chat_pagination',
            },
            loop: true,
        });
    }
    getChat();


    // 游记API
    function getTravel(){
        new Swiper('.swiper_travel', {
            autoplay: {
                disableOnInteraction: false,
            }, 
            speed: 500,
            pagination: {
                el: '.travel_pagination',
            },
            loop: true,
        });
    }
    getTravel();

});