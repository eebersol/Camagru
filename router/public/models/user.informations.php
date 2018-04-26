<?php
session_start();
require("../../config/contact_db.php");


if (isset($_GET['getPicturesLiked']))
{
	$login 			= $_GET['login'];
	get_like_picture_bis($login);
	echo "toto";
	// echo json_encode(get_like_picture_bis($login));
}
else if (isset($_GET['unLikePicture']))
{
	$login 	= $_GET['login'];
	$path 	= $_GET['path'];


	function unlikePicture($login, $path)
	{
		return (execute_sql_query_with_value('
			DELETE FROM likes 
			WHERE login = "'.$login.'" 
			AND picture_path = "'.$path.'"
		'));		
	}


	unlikePicture($login, $path);
}
else if (isset($_GET['likePicture']))
{
	$login 	= $_GET['login'];
	$path 	= $_GET['path'];


	function unlikePicture($login, $path)
	{
		return (execute_sql_query_with_value('
			INSERT INTO likes (id, login, picture_path)
			VALUES (0, "'.$login.'", "'.$path.'");
		'));		
	}


	unlikePicture($login, $path);
}
else if (isset($_GET['getLikedPicture']))
{
	$url_path 	= $_GET['picturePath'];
	echo json_encode(get_like_picture($login, $url_path));
}
else if (isset($_GET['getUserPicureLike']))
	echo json_encode(get_all_picture_liked($_GET['login']));
else if (isset($_GET['likePicture']))
{
	$url_path 	= $_GET['picturePath'];
	$login 		= $_GET['login'];
	like_picture($login, $url_path);
	echo "TRUE";
}
else if (isset($_GET['addComment']))
{
	$comment = '&&' . $_GET['auteur'] . '||' . $_GET['text'];
	echo add_comment($SESSION['email'], $comment, $_GET['photoUrl']);
}
else if (isset($_GET['getInformation']))
{
	echo json_encode($_SESSION);
}
else if (isset($_GET['getAllInformations']))
{
	echo json_encode(get_all($_SESSION['login']));

}
else if (isset($_GET['refreshInformation']))
{
	if (hash('whirlpool', $_GET['passwd']) != $_SESSION['passwd'])
		$_GET['passwd'] = hash('whirlpool', $_GET['passwd']);
	echo update_user($_SESSION, $_GET);
	$_SESSION['login'] 	= $_GET['login'];
	$_SESSION['email'] 	= $_GET['email'];
	$_SESSION['passwd'] = hash('whirlpool', $_GET['passwd']);
	$_SESSION['admin'] 	= "false";

}
else if (isset($_GET['getLikePicturePage']))
{
	echo json_encode(get_allLikePicture(explode(',', $_GET['tabPath'])));
}

function get_allLikePicture($tab)
{
	return (execute_sql_query_with_value("
		SELECT *
		FROM likes 
		WHERE picture_path IN ('" . implode("', '", $tab) . "')
	"));
}

function get_all_picture_liked($login)
{
	return (execute_sql_query_with_value('
		SELECT picture_path
		FROM likes 
		WHERE login = "'.$login.'"
	'));
}
function get_like_picture_bis($login)
{
	return (execute_sql_query('
		SELECT picture_path 
		FROM likes
		WHERE login= "'.$login.'"
	'));
}

function get_like_picture($login, $url_path)
{
	return (execute_sql_query_with_value('
		SELECT like_reference 
		FROM pictures 
		WHERE picture_path = "'.$url_path.'"
	'));
}

function get_all($login)
{
	return (execute_sql_query_with_value('
		SELECT *
		FROM users 
		WHERE login = "'.$login.'"
	'));
}

function like_picture($login, $url_path)
{
	exec_sql_query('
		UPDATE pictures
		SET like_reference = concat(`like_reference`, "'.$login.'&&")
		WHERE picture_path = "'.$url_path.'"
	');
	
	return (exec_sql_query('
		UPDATE users
		SET pic_liked = concat(`pic_liked`, "'.$url_path.'&&")
		WHERE login = "'.$login.'"
	'));
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

function add_comment($email, $comment, $picture)
{

	return (exec_sql_query('
		UPDATE pictures
		SET `comment_reference` = concat(`comment_reference`,"'.$comment.'")
		WHERE picture_path="'.$picture.'"
	'));
}
?>