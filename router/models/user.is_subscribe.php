<?php

function check_if_user_exists($mail, $login, $passwd)
{
	require("../config/database.php");
	$conn 			= new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY 		= 'SELECT 1 FROM users WHERE email="'.$mail.'"';
	$result_value 	= $conn->exec($SQL_QUERY);
	return ($result_value);
}

?>