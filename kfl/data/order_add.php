<?php
/*
 *该PHP页面用于detail.html
 获取客户端提交的订单数据，保存到数据库中
 向客户端返回保存的数据，以json格式
 */
 $output=[];
 $user_name=$_REQUEST['user_name'];
 $phone=$_REQUEST['phone'];
 $sex=$_REQUEST['sex'];
 $addr=$_REQUEST['addr'];
 $did=$_REQUEST['did'];
 $order_time=time()*1000;
 if( !$user_name || !$addr || !$phone || !$did){
  echo '{"result":"error","msg":"INVALID REQUSET DATA"}';
  return;
 }
 $conn=mysqli_connect('127.0.0.1','root','','kaifanla');
   $sql='SET NAMES UTF8';
   mysqli_query($conn,$sql);
   $sql="INSERT INTO kf_order VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$did')";
   $result=mysqli_query($conn,$sql);
   if( $result ){//执行成功
    $output['result']='ok';
    $output['oid']=mysqli_insert_id($conn);
   }else{//执行失败
    $output['result']='fail';
    $output['msg']='添加失败！很可能是SQL语法错误'.$sql;
   }
 echo json_encode($output)
?>