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
                if(res.success){
                    window.location.href = "index.html";
                }
            });
    }


    // 登录事件
    function login() {
        var userName = $("#userName_for").val();
        var password = $("#password_for").val();
        var verification_code = $("#verification_code_for").val();
        var rePass = $("#rePass_for").val();
        if (isLogin) {
            getLogin(userName, password, verification_code);
        }else{
            // register(userName, password, verification_code, rePass);
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