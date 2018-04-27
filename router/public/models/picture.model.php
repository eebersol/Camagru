<?php

require("../../config/contact_db.php");

if (isset($_GET['action']))
{
	$action = $_GET['action'];

	if ($action == 'picture.get.miniature' && isset($_GET['page']))
	{
		$fPage = (($_GET['page'] + 1) * 9) - 8;
		$sPage = ($_GET['page'] + 1) * 9;
		$ret = execute_sql_query_with_value('
			SELECT *
			FROM pictures
			WHERE id >= '.$fPage.' AND id <'.$sPage);
		$ret = json_encode($ret);
	}
	else if ($action == 'picture.get.page.like' && isset($_GET['tabPath']))
	{
		$tab = explode(',', $_GET['tabPath']);

		$ret = execute_sql_query_with_value("
			SELECT *
			FROM likes 
			WHERE picture_path IN ('" . implode("', '", $tab) . "')
		");
		$ret = json_encode($ret);
	}
	else if ($action == 'picture.get.page.comment' && isset($_GET['tabPath']))
	{
		$tab = explode(',', $_GET['tabPath']);
		$ret = execute_sql_query_with_value("
			SELECT *
			FROM comments 
			WHERE picture_path IN ('" . implode("', '", $tab) . "')
		");
		$ret = json_encode($ret);
	}
	echo $ret;
}
?>