<?php

require("../models/user.login.php");

if (isset($_POST['validate_login']))
{
	if (!isset($_POST['login']) || strlen($_POST['login']) < 3)
   		echo "Invalid or to short login.\n";
	else if (!isset($_POST['passwd']) || strlen($_POST['passwd']) < 6)
   		echo "Invalid or to short password.\n";
	else
  	{
  		$ret_value = check_user($_POST['login'], hash('whirlpool', $_POST['passwd']));
		if ($ret_value === true)
		{
			echo "LOGGUED.\n". $ret_value . $_POST['login'] . hash('whirlpool', $_POST['passwd']);
		}
		else
		{
			echo "Ce compte n'existe pas.\n";
		}

  	}
}

?>