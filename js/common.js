$(document).ready(function () {

    $('.not_current').click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).index() == 1) {
            isLogin = false;
            $('.rePass').css("display", "block");
            $('form').css("height", "485px");
            $(".login input").val("注册");
        } else {
            isLogin = true;
            $('.rePass').css("display", "none");
            $('form').css("height", "425px");
            $(".login input").val("登录");
        }
    })

    $('.modal .close_btn').click(function () {
        $('.modal').css("display", "none");
    });

    $('.my_register').click(function () {
        $('.modal').css("display", "block");
    });

});