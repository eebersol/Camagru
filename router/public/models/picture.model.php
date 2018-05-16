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
	if ($action == 'picture.delete' && isset($_GET['login']) && isset($_GET['url']))
		$picture->delete_picture($_GET['login'], $_GET['url']);
}
if ($_POST)
{	
	$picture 	= new Picture();
	if (isset($_POST['login']) && isset($_POST['file']) && isset($_POST['description']))
		$picture->save_picture($_POST['login'], $_POST['file'], $_POST['description']);
}
	// else if ($action == 'picture.save')
	// {
	// 	// $picture->save_picture($_GET['login'], $_GET['url']);
	// 	$fileName = $_FILES['afile']['name'];
	// 	$fileType = $_FILES['afile']['type'];
	// 	$fileContent = file_get_contents($_FILES['afile']['tmp_name']);
	// 	$dataUrl = 'data:' . $fileType . ';base64,' . base64_encode($fileContent);
	// 	$json = json_encode(array(
	// 	  'name' => $fileName,
	// 	  'type' => $fileType,
	// 	  'dataUrl' => $dataUrl,
	// 	  'username' => $_REQUEST['username'],
	// 	  'accountnum' => $_REQUEST['accountnum']
	// 	));
	// 	echo $json;
	// }
?>
