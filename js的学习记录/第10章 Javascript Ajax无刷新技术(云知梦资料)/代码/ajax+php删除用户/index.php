<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>index</title>
	<style>
		*{
			font-family: 微软雅黑;
		}
	</style>
</head>
<body>
	<h1>用户管理:</h1>
	<?php 
	//用php去数据库获取数据
	$pdo=new PDO('mysql:host=localhost;dbname=test','root','123');
	$pdo->exec('set names utf8');

	$sql="select * from user";
	$smt=$pdo->query($sql);
	$rows=$smt->fetchAll(PDO::FETCH_ASSOC);
	?>
	<table width='1000px' border='1px' cellspacing='0'>
		<tr>
			<th>ID</th>
			<th>用户名</th>
			<th>密码</th>
			<th>删除</th>
		</tr>
		<?php 
		foreach($rows as $row){
			echo "<tr id='{$row[id]}'>";
			echo "<td>{$row['id']}</td>";
			echo "<td>{$row['username']}</td>";
			echo "<td>{$row['password']}</td>";
			echo "<td><a href='javascript:' class='del' num='{$row['id']}'>删除</a></td>";
			echo "</tr>";
		}
		
		 ?>
	</table>
</body>
<script>
objs=document.getElementsByClassName('del');	

for(i=0;i<objs.length;i++){
	objs[i].onclick=function(){
		id=this.getAttribute('num');

		//生成ajax对象
		xhr=new XMLHttpRequest();

		//js get请求delete.php文件，同时给该文件传递一个id值，方便删除数据
		xhr.open('get','delete.php?id='+id,true);

		//ajax开始异步连接并请求delete.php?id=5	
		xhr.send();

		//js监听整个通讯过程
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				r=xhr.responseText;	
				if(r=='1'){
					tr=document.getElementById(id);
					tr.style.display='none';
				}
			}
		}		

	};
}

</script>
</html>