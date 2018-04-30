<?php
session_start();
require("picture.class.php");
require("../../config/contact_db.php");
if (isset($_GET['action']))
{
	$action 	= $_GET['action'];
	$picture 	= new Picture();

	if ($action == 'picture.get.miniature' && isset($_GET['page']))
		$picture->get_picture_page($_GET['page']);
	else if ($action == 'picture.get.page.like' && isset($_GET['tabPath']))
		$picture->get_picture_page($_GET['tabPath']);
	else if ($action == 'picture.get.page.comment' && isset($_GET['tabPath']))
		$picture->get_comment_page($_GET['tabPath']);
}
?>