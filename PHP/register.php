<?php
    $userName = $_POST['userName'];
    $password = $_POST['password'];
    $verification_code = $_POST['verification_code'];
    $rePass = $_POST['rePass'];

    // echo $userName;
    // echo $password;
    // echo $verification_code;
    // echo $rePass;


    // 链接数据库
    $con = mysqli_connect("localhost", "root", "", "blueberry_pie", "3306");
    mysqli_query($con, "set names utf8");
    // print_r($con);


    // 判断是否在数据库中已经存在
    $res = mysqli_query($con, "select * from user where name='{$userName}'");
    // print_r($res);
    if($res){
        $data =$res->fetch_all(MYSQLI_ASSOC);
        if(count($data) >= 1){
            // 前端报错
            echo "has userName";
        }else{
            // echo "23";
            //添加用户    
            $res_insert = mysqli_query($con, "insert into user (name, pass) values('{$userName}', '{$password}')");
            // print_r($res_insert);
            if($res_insert == 1){
                // 添加成功
                echo "true";
            }else{
                // 添加失败
                echo "false";
            }
        }
    }
?>