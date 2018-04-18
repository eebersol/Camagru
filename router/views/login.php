<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Titre</title>
	</head>
<?php
include ("../controllers/login_controller.php");
?>
	<body>
		<form method="post">
			Login:<br>
			<input type="text" name="login"><br>
			Password:<br>
			<input type="text" name="passwd">
			<input type="submit" value="Submit" name="validate_login">
		</form>
	</body>
</html>
