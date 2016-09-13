<?php
/*
 *该PHP页面用于main.html
 *向客户端分页返回菜品数据，以json格式
 *每次最多返回5条菜品数据
 *需要客户端提供从哪一行（0/5/10....）开始读取数据
 *若客户端未提供起始行，则默认从第0行开始读取5条
 ****
 */
 $output=[];
 $count=5;//每次最多返回的数据数
 @$start=$_REQUEST['start'];//@表示压制当前行产生的错误和警告
 if($start===NULL){
  $start=0;//设置$start的默认值
 }
 $conn=mysqli_connect('127.0.0.1','root','','kaifanla');
 $sql='SET NAMES UTF8';
 mysqli_query($conn,$sql);
 $sql="SELECT did,name,price,img_sm,material from kf_dish LIMIT $start , $count";
 $result=mysqli_query($conn,$sql);
 while( ($row=mysqli_fetch_assoc($result))!==NULL ){//一行一行的读取数据
  $output[]=$row;
 }

 echo json_encode($output)
?>















