<?php 
$id=$_POST['id'];

//用php去数据库删除数据
$pdo=new PDO('mysql:host=localhost;dbname=test','root','123');
$pdo->exec('set names utf8');

$sql="delete from user where id=$id";

if($pdo->exec($sql)){
	echo 1;
}else{
	echo 0;
}
 ?>