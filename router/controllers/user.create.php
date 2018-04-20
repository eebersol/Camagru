<?php


if (isset($_GET['create']))
{
	check_user_subscribe($_GET['email'], $_GET['login'], $_GET['passswd']);
	create_user($_GET['email'], $_GET['login'], $_GET['passswd']);
}

function check_user_subscribe($email, $login, $passwd)
{
	require("../config/contact_db.php");

	return (execute_sql_query('
		SELECT *
		FROM users
		WHERE email="'.$email.'"
	'));
}


function generate_token($length)
{
	$pull = [];
	while (count($pull) < $length)
		$pull = array_merge($pull, range(0, 9), range('a', 'z'), range('A', 'Z'));
	shuffle($pull);
	return (implode("", $pull));
}

function subscribe_email($email, $login)
{
	$token 		= generate_token(90);
	$subject 	= "[-CAMAGRU-] - Email verification";
	$headers  	= 'MIME-Version: 1.0' . "\r\n";
	$headers 	.= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$headers 	.= 'From: <eebersol@student.42.fr>' . "\r\n";
	$html_page 	= file_get_contents("../ressources/mails/mail.subscribe.html");
	$html_page 	= str_replace("HERE", $token, $html_page);
	$message 	= $html_page;
	mail($email, $subject, $message, $headers); 
	return ($token);
}

function create_user($email, $login, $passwd)
{
	require("../config/database.php");

	$token 	= subscribe_email($email, $login);
	return (exec_sql_query('
		INSERT INTO
		users (
			id,
			email,
			login,
			passwd,
			subscribe_email,
			token_subscribe,
			pic_reference,
			notification_like,
			notification_comment
		) 
		VALUE 
		(
			0,
			"'.$email.'",
			"'.$login.'",
			"'.$passwd.'",
			1,
			"'.$token.'",
			"",
			1,
			1
		)'
	));
}

?>