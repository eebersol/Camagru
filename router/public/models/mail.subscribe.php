<?php

function verify_account($token)
{
	require("../config/database.php");
	
	return (exec_sql_query('
		UPDATE users
		SET subscribe_email = 0
		WHERE token_subscribe = "'.$token.'"
	'
	));
}

function verify_token($token)
{
	require_once("../config/contact_db.php");

	return (execute_sql_query('
		SELECT * 
		FROM users 
		WHERE token_subscribe = "'.$token.'"
	'));
}

?>