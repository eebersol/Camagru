<?php
session_start();

require("../../config/contact_db.php");

if (isset($_GET['action']))
{
	$action = $_GET['action'];

	if ($action == 'user.login' && isset($_GET['login']) && isset($_GET['passwd']))
	{
		$email = execute_sql_query_with_value("SELECT * FROM users WHERE subscribe_email = 0 AND login = '" .$_GET['login']. "' AND passwd= '" .hash('whirlpool', $_GET['passwd']). "'")[0]['email'];
		if ($email)
		{
			session_start();
			$_SESSION['login'] 	= $_GET['login'];
			$_SESSION['email'] 	= $email;
			$_SESSION['passwd'] = hash('whirlpool', $_GET['passwd']);
			$_SESSION['admin'] 	= "false";
			$ret = "TRUE";
		}
		else
			$ret = "FALSE";
	}
	else if ($action == 'user.get.picture.like' && isset($_GET['login']))
	{
		$ret = execute_sql_query_with_value('
			SELECT picture_path
			FROM likes 
			WHERE login = "' .$_GET['login']. '"
		');

		$ret = json_encode($ret);
	}
	else if ($action == 'user.get.information')
	{
		$ret = execute_sql_query_with_value('
			SELECT *
			FROM users 
			WHERE login = "' .$_SESSION['login']. '"
		');

		$ret = json_encode($ret);
	}
	else if ($action == 'user.add.comment' && isset($_GET['auteur']) && isset($_GET['text']) && isset($_GET['picutre']))
	{	
		$ret = exec_sql_query('
			INSERT INTO comments (id, login, comment, picture_path) 
			VALUE (0, "'.$_GET['login'].'", "'.$_GET['text'].'" "'.$_GET['picture_path'].'")
			');
	}
	else if ($action == 'user.update.information' && isset($_GET['passwd']) && isset($_GET['login']) && isset($_GET['email']) && isset($_SESSION['email']))
	{
		if ($_GET['passwd'] != $_SESSION['passwd']) {
			$_GET['passwd'] = hash('whirlpool', $_GET['passwd']);
		}
		$ret = exec_sql_query('
			UPDATE users
			SET login="' .$_GET['login']. '", email="' .$_GET['email']. '", passwd="' .$_GET['passwd']. '"
			WHERE email="'. $_SESSION['email']. '"
		');

		$_SESSION['login'] 	= $_GET['login'];
		$_SESSION['email'] 	= $_GET['email'];
		$_SESSION['passwd'] = hash('whirlpool', $_GET['passwd']);
		$_SESSION['admin'] 	= "false";
	}
	else if ($action == 'user.update.unlike' & isset($_GET['login']) && isset($_GET['path']))
	{
		$ret = exec_sql_query('
			DELETE FROM likes 
			WHERE login = "' .$_GET['login']. '" 
			AND picture_path = "' .$_GET['path']. '"
		');

		$ret = json_encode($ret);
	}
	else if ($action == 'user.update.like' && isset($_GET['login']) && isset($_GET['path']))
	{
		$ret = execute_sql_query_with_value('
			SELECT *
			FROM likes 
			WHERE login = "' .$_GET['login']. '" AND picture_path = "' .$_GET['path']. '" 
		');
		if (!$ret)
		{
			$ret = execute_sql_query_with_value('
				INSERT INTO likes (id, login, picture_path)
				VALUES (0, "' .$_GET['login']. '", "' .$_GET['path']. '");
			');
		}

		$ret = json_encode($ret);		
	}
	else if ($action == 'user.disconnect')
	{
		$_SESSION['login'] = null;
		session_destroy();
		$ret = "TRUE";
	}
	else
		$ret = "ERROR";
	echo $ret;
}

?>