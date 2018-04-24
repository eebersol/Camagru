<?php
session_start();
require("../../config/contact_db.php");

if (isset($_GET['disconnect']))
{
	$_SESSION['login'] = null;
	session_destroy();
	echo "TRUE";
}
?>