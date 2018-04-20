<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<script src="../css/home.css"></script>
		<title>Titre</title>
	</head>
<?php
include ("../controllers/register_controller.php");
?>
	<body>
		<form method="post">
			Email:<br>
			<input type="text" name="email"><br>
			Login:<br>
			<input type="text" name="login"><br>
			Password:<br>
			<input type="text" name="passwd">
			<input type="submit" value="Submit" name="validate_register">
		</form>
	</body>
</html>
