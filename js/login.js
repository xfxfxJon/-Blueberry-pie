$(document).ready(function () {

    // 登录API
    function getLogin(userName, password, verification_code) {
        // $.post("http://wwtliu.com/sxtstu/blueberrypai/login.php", {
        //         user_id: userName,
        //         password: password,
        //         verification_code: verification_code
        //     },
        //     function (res) {
        //         console.log(res);
        //         if (res.success) {
        //             window.location.href = "index.html";
        //         }
        //     });
        $.ajax({
            type: 'post',
            url: '../PHP/login.php',
            data: {
                userName: userName,
                password: password,
                verification_code: verification_code
            },
            success: function (res) {
                console.log(res);
                if (res == "has no userName") {
                    layer.msg('用户名不存在,请注册!!!');
                } else if (res == "pass error") {
                    layer.msg('用户名或密码错误,请重新输入!!!');
                } else {
                    window.location.href = "index.html";
                }
            }
        });

    }


    // 登录事件
    function login() {
        var userName = $("#userName_for").val();
        var password = $("#password_for").val();
        var verification_code = $("#verification_code_for").val();
        getLogin(userName, password, verification_code);

    }

    // 注册
    function register() {
        var userName = $("#userName_for").val();
        var password = $("#password_for").val();
        var verification_code = $("#verification_code_for").val();
        var rePass = $("#rePass_for").val();
        if (password == rePass) {
            $.ajax({
                type: 'post',
                url: '../PHP/register.php',
                data: {
                    userName: userName,
                    password: password,
                    verification_code: verification_code,
                    rePass: rePass
                },
                success: function (res) {
                    // console.log(res);
                    if (res == "has userName") {
                        layer.alert('用户名已经存在!!!', {
                            icon: 5
                        });
                    } else if (res == "true") {
                        $('.rePass').css("display", "none");
                        $('form').css("height", "400px");
                        $(".login_btn").css("display", "block");
                        $(".register_btn").css("display", "none");
                    } else {
                        layer.alert("注册失败", {
                            icon: 5
                        });
                    }
                }
            });
        } else {
            layer.alert('密码输入错误', {
                icon: 5
            });

        }
    }


    //给button添加事件
    $(".login_btn").click(login);

    $(".register_btn").click(register);

    $('.not_current').click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).index() == 1) {
            $('.rePass').css("display", "block");
            $('form').css("height", "455px");
            $(".login_btn").css("display", "none");
            $(".register_btn").css("display", "block");
        } else {
            $('.rePass').css("display", "none");
            $('form').css("height", "400px");
            $(".login_btn").css("display", "block");
            $(".register_btn").css("display", "none");
        }
    });



});