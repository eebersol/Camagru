<?php

require("../../config/contact_db.php");


if (isset($_GET['addComment']))
{
	session_start();
	$comment = '&&' . $_GET['auteur'] . '||' . $_GET['text'];
	echo add_comment($SESSION['email'], $comment);
}
else if (isset($_GET['getInformation']))
{
	session_start();
	echo json_encode($_SESSION);
}
else if (isset($_GET['refreshInformation']))
{
	session_start();
	if (hash('whirlpool', $_GET['passwd']) != $_SESSION['passwd'])
		$_GET['passwd'] = hash('whirlpool', $_GET['passwd']);
	echo update_user($_SESSION, $_GET);
	$_SESSION['login'] 	= $_GET['login'];
	$_SESSION['email'] 	= $_GET['email'];
	$_SESSION['passwd'] = hash('whirlpool', $_GET['passwd']);
	$_SESSION['admin'] 	= "false";

}

function update_user($session, $get)
{
		$newLogin = $get['login'];
		$oldLogin = $session['login'];

		$newEmail = $get['email'];
		$oldEmail = $session['email'];

		$newPasswd = $get['passwd'];
		$oldPasswd = $session['passwd'];

	return (exec_sql_query('
		UPDATE users
		SET login="'.$newLogin.'", email="'.$newEmail.'", passwd="'.$newPasswd.'"
		WHERE email="'.$oldEmail.'"
	'));
}

function add_comment($email, $comment)
{

	return (exec_sql_query('
		UPDATE pictures
		SET `comment_reference` = concat(comment_reference,'.$comment.')
		WHERE email="'.$email.'"
	'));
}
?>