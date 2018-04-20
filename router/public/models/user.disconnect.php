<?php
session_start();
require("../../config/contact_db.php");

if (isset($_GET['disconnect']))
{
	session_destroy();
	echo "TRUE";
}
?>