<?php

require("../../config/contact_db.php");
require("../../config/database.php");

if (isset($_GET['getImage']))
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


?>