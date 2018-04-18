<?php

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
	require("../config/contact_db.php");

	return (execute_sql_query("
		SELECT * 
		FROM users 
		WHERE subscribe_email = 0 
		AND login = '".$login."'
		AND passwd= '".$passwd."'
	"));
}

?>