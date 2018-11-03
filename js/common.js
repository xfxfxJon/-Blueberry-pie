$(document).ready(function () {

    // cookie 操作
    var cookie = {
        set: function (key, value, time) {
            var date = new Date();
            date.setTime(date.getTime() + time * 60 * 1000);
            document.cookie = key + '=' + value + ';expires=' + date.toGMTString();
        },
        get: function (key) {
            var getCookie = document.cookie.replace(/[ ]/g, "");
            var arrCookie = getCookie.split(";");
            var tips;
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (key == arr[0]) {
                    tips = arr[1];
                    break;
                }
            }
            return tips;
        },
        delete: function (key) {
            var date = new Date();
            date.setTime(date.getTime() - 1);
            document.cookie = key + '=1;expires=' + date.toGMTString();
        }
    };

    $('.not_current').click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        if ($(this).index() == 1) {
            $('.rePass').css("display", "block");
            $('form').css("height", "485px");
            $(".login input").val("注册");
        } else {
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



    // 获取cookie
    function getCookie() {
        if (document.cookie) {
            var userId = cookie.get("bp_user_id");
            if (userId) {
                //从数据库查询
                $.ajax({
                    type: "get",
                    url: "../PHP/select.php?userId",
                    data: {
                        userId: userId
                    },
                    success: function (res) {
                        // console.log(res);
                        res = JSON.parse(res);
                        if (res == "no data") {
                            $('.my_login').css("display", "block");
                            $('.my_info').css("display", "none");
                        } else {
                            cookie.set("bp_user_id", res[0].id, 5);
                            $('.my_login').css("display", "none");
                            $('.my_info').css("display", "block");
                            $('.my_info a').eq(0).html(res[0].name);
                        }

                    }
                });
            } else {
                //
            }
        }
    }
    getCookie();


    // 登出
    $('.logout').click(function () {
        layer.msg('你确定要退出吗？', {
            time: 0,
            btn: ['确定', '取消'],
            yes: function (index) {
                layer.close(index);
                cookie.delete("bp_user_id");
                // cookie.set("JonId", "2", 5);
                $('.my_login').css("display", "block");
                $('.my_info').css("display", "none");
            }
        });
    });

});