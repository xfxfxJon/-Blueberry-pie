<?php
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $verification_code = $_POST['verification_code'];

    // 链接数据库
    $con = mysqli_connect("localhost", "root", "", "blueberry_pie", "3306");
    mysqli_query($con, "set names utf8");
    // print_r($con);


    // 判断是否在数据库中已经存在
    $res = mysqli_query($con, "select * from user where name='{$userName}'");
    // print_r($res);
    if($res){
        $data =$res->fetch_all(MYSQLI_ASSOC);
        if(count($data) == 1){
            // 验证密码
            // print_r($data[0]['pass']);
            if($data[0]['pass'] == $password){
                // 存储cookie
                setcookie("bp_user_id", $data[0]['id'], time() + 5*60, "/-Blueberry-pie/home");
            }else{
                echo "pass error";
            }
        }else{
            // 前端报错
            echo "has no userName";
        }
    }
?>