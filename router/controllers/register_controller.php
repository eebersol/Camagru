<?php

require("../models/user.create.php");

if (isset($_POST['validate_register']))
{
	if (!isset($_POST['email']) || !preg_match("/^.+@.+\..+$/", $_POST['email']))
		echo "Invalid email.\n";
	else if (!isset($_POST['login']) || strlen($_POST['login']) < 3)
   		echo "Invalid or to short login.\n";
	else if (!isset($_POST['passwd']) || strlen($_POST['passwd']) < 6)
   		echo "Invalid or to short password.\n";
	else
  	{
		if (check_user_subscribe($_POST['email'], $_POST['login'], hash('whirlpool', $_POST['passwd'])) === false)
		{
			$ret_value = create_user($_POST['email'], $_POST['login'], hash('whirlpool', $_POST['passwd']));
			echo "User " . $login . "\n";
		}
		else
			echo "FAIL\n.";
  	}
}

?>