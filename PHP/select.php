<?php

    $userId = $_GET["userId"];

    // echo $userId;
    
    // 链接数据库
    $con = mysqli_connect("localhost", "root", "", "blueberry_pie", "3306");
    mysqli_query($con, "set names utf8");
    // print_r($con);


    // 判断是否在数据库中已经存在
    $res = mysqli_query($con, "select * from user where id={$userId}");
    // print_r($res);
    if($res){
        $data =$res->fetch_all(MYSQLI_ASSOC);
        if(count($data) == 1){
            print_r(json_encode($data));
        }else{
            echo "no data";
        }
    }
?>