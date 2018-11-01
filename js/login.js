$(document).ready(function () {

    var isLogin = true;
    // 登录API
    function getLogin(userName, password, verification_code) {
        $.post("http://wwtliu.com/sxtstu/blueberrypai/login.php", {
                user_id: userName,
                password: password,
                verification_code: verification_code
            },
            function (res) {
                console.log(res);
            });
    }


    // 登录事件
    function login() {
        var userName = $("#userName").val();
        var password = $("#password").val();
        var verification_code = $("#verification_code").val();
        if (isLogin) {
            getLogin(userName, password, verification_code);
        }
    }


    //给button添加事件
    $(".login").click(login);

    $('.not_current').click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).index() == 1) {
            isLogin = false;
            $('.rePass').css("display", "block");
            $('form').css("height", "455px");
            $(".login input").val("注册");
        } else {
            isLogin = true;
            $('.rePass').css("display", "none");
            $('form').css("height", "400px");
            $(".login input").val("登录");
        }
    })

});