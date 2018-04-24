<?php

require("../../config/contact_db.php");

if (isset($_GET['success']))
{
	session_start();
	echo $_SESSION['login'] . ',' .  $_SESSION['admin'];
}
else if (isset($_GET['login']))
{
	if (check_user($_GET['login'], hash('whirlpool', $_GET['passwd'])) == 1)
	{
		session_start();
		$_SESSION['login'] 	= $_GET['login'];
		$_SESSION['email'] 	= getEmail($_GET['login'], hash('whirlpool', $_GET['passwd']))[0]['email'];
		$_SESSION['passwd'] = hash('whirlpool', $_GET['passwd']);
		$_SESSION['admin'] 	= "false";
		echo "TRUE";
	}
	else
		echo "FALSE";
}
function getEmail($login, $passwd)
{
	return (execute_sql_query_with_value("
		SELECT email 
		FROM users 
		WHERE login = '".$login."'
		AND passwd= '".$passwd."'
	"));
}
function verify_account($token)
{
	return (exec_sql_query('
		UPDATE users
		SET subscribe_email = 0
		WHERE token_subscribe = "'.$token.'"
	'));
}

function verify_token($token)
{
	return (execute_sql_query('
		SELECT * 
		FROM users 
		WHERE token_subscribe = "'.$token.'"
	'));
}

function check_user($login, $passwd)
{
	return (execute_sql_query("
		SELECT * 
		FROM users 
		WHERE subscribe_email = 0 
		AND login = '".$login."'
		AND passwd= '".$passwd."'
	"));
}

?>