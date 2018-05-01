<?php
session_start();
require("user.class.php");
require("../../config/contact_db.php");
if (isset($_GET['action']))
{
	$action = $_GET['action'];

	if ($action != 'user.create' && $action != 'user.login')
	{
		$user = unserialize($_SESSION['user']);
	}

	if ($action == 'user.create')
	{
		$user = new User();
		$user->create_user($_GET['email'], $_GET['login'], hash('whirlpool', $_GET['passwd']));
		$user->get_return_value();
	}
	else if ($action == 'user.login' && isset($_GET['login']) && isset($_GET['passwd']))
	{
		$user = new User();
		$user->login_user($_GET['email'], $_GET['login'], hash('whirlpool', $_GET['passwd']));
		$user->get_return_value();
	}
	else if ($action == 'user.update.information' &&  isset($_GET['oldInformation']) && isset($_GET['newInformation']))
	{
		$user->update_user($_GET['oldInformation'], $_GET['newInformation']);
		$user->get_return_value();
	}
	else if ($action == 'user.get.information')
		print_r(json_encode($user->user_card));
	else if ($action == 'user.update.unlike' && isset($_GET['login']) && isset($_GET['path']))
	{
		$user->dislike($_GET['path']);
		print_r($user->_message);
	}
	else if ($action == 'user.update.like' && isset($_GET['login']) && isset($_GET['path']))
	{
		$user->like($_GET['path']);
		$user->get_return_value();
	}
	else if ($action == 'user.get.picture.like')
	{
		$user->get_picture_liked();
		print_r(json_encode($user->_picture_liked));
	}
	else if ($action == 'user.add.comment' && isset($_GET['text']) && isset($_GET['picture']))
		$user->add_comment($_GET['text'], $_GET['picture']);
	else if ($action == 'user.disconnect')
	{
		$_SESSION['login'] = null;
		session_destroy();
	}
	else if ($action == 'user.is_login')
	{
		print_r(json_encode($user->_is_login));
	}
	else
		print_r(json_encode("ERROR"));

	if ($action != 'user.create')
		$_SESSION['user'] = serialize($user);
}

?>