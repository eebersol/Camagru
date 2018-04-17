<?php

function create_user($email, $login, $passwd)
{
	require("../config/database.php");
	require("../models/mail.subscribe.php");
	echo "AQUI " . $DB_DSN . $DB_USER . $DB_PASS;
	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = 'INSERT INTO users (id, email, login, passwd, subscribe_mail, pic_reference, notification_like, notification_comment) VALUE (0, "'.$email.'", "'.$login.'", "'.$passwd.'", 1, "", 1, 1)';
	$result_value = $conn->exec($SQL_QUERY);
	subscribe_mail($email, $login, "", "");
	return ($result_value);

}

?>