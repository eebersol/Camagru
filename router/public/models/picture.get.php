<?php

require("../../config/contact_db.php");
require("../../config/database.php");

if (isset($_GET['oneImage']))
{
	$result = get_one_image($_GET['path']);
	echo json_encode($result);
}
else if (isset($_GET['getImage']))
{
	$result = get_image(0);
	echo json_encode($result);
}

function get_image($page)
{
	return (execute_sql_query_with_value('
		SELECT *
		FROM pictures
		'));
}

function get_one_image($path)
{
	return (execute_sql_query_with_value('
		SELECT *
		FROM pictures
		WHERE picture_path = "'.$path.'"
		'));
}

?>