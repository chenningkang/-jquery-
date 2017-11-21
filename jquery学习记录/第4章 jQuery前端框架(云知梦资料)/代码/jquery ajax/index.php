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
	<script src="jquery.js"></script>
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
			echo "<tr>";
			echo "<td>{$row['id']}</td>";
			echo "<td>{$row['username']}</td>";
			echo "<td>{$row['password']}</td>";
			echo "<td><a href='javascript:' class='del' id='{$row['id']}'>删除</a></td>";
			echo "</tr>";
		}
		
		 ?>
	</table>
</body>
<script>
$('.del').click(function(){
	id=this.id;
	obj=$(this);

	//ajax通讯
	$.post('delete.php',{id:id},function(r){
		if(r=='1'){
			obj.parent().parent().fadeOut(100);
		}
	});
});
</script>
</html>