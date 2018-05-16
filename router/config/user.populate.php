#!/usr/bin/php
<?php


require_once('database.php');

function create_user($tab)
{
	$SQL_QUERY = '
		INSERT INTO
			users (
			id, 
			email, 
			login, 
			passwd, 
			subscribe_email, 
			token_subscribe, 
			pic_reference, 
			pic_liked, 
			notification_like, 
			notification_comment
			) 
			VALUE (
			0, 
			"'.$tab[1].'", 
			"'.$tab[2].'", 
			"'.$tab[3].'", 
			"'.$tab[4].'", 
			"'.$tab[5].'", 
			"'.$tab[6].'", 
			"'.$tab[7].'", 
			"'.$tab[8].'", 
			"'.$tab[9].'"
		)';
	return ($SQL_QUERY);
}



try {

	$array = [
		"0,edouard.ebersoldt@gmail.com,edouard,f72b0adac2c927dbdc7429acff891bf964572962161be7364e6a60b83c79c2c9afbeed22f427262b2df26eae15b83847a0576315699e023904b6f71eb1279cfa,0,'','','',1,1",
		"0,totofaitduvelo@gmail.com,eebersol,f72b0adac2c927dbdc7429acff891bf964572962161be7364e6a60b83c79c2c9afbeed22f427262b2df26eae15b83847a0576315699e023904b6f71eb1279cfa,0,'','','',1,1",
		"0,coucou@gmail.com,ebersoldt,f72b0adac2c927dbdc7429acff891bf964572962161be7364e6a60b83c79c2c9afbeed22f427262b2df26eae15b83847a0576315699e023904b6f71eb1279cfa,0,'','','',1,1",
		];

	echo "Connection établie.\n";
	for ($i = 0; $i < count($array); $i++)
	{
		$line = explode(',', $array[$i]);
		print_r($line);
		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$ret_value = $conn->exec(create_user($line));
	}
}
catch (PDOException $e) {
	echo "ERROR CONNECTION DB: " . $e->getMessage() . "\nAborting process\n";
}


?>