<?php
session_start();
require("../../config/contact_db.php");


if (isset($_GET['unLikePicture']))
{
	$url_path 		= $_GET['picturePath'];
	$login 			= $_GET['login'];
	$like_reference = get_like_picture($login, $url_path);
	$str = $like_reference['like_reference'];
	echo "COUCOU" . $str;
}
else if (isset($_GET['getLikedPicture']))
{
	$url_path 	= $_GET['picturePath'];
	echo json_encode(get_like_picture($login, $url_path));
}
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

function get_like_picture($login, $url_path)
{
	return (execute_sql_query_with_value('
		SELECT like_reference 
		FROM pictures 
		WHERE picture_path = "'.$url_path.'"
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