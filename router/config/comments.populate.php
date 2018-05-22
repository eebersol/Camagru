#!/usr/bin/php
<?php


require_once('database.php');

function create_comment($login, $picture_path, $comment)
{
	if( ! ini_get('date.timezone') )
	{
    	date_default_timezone_set('GMT');
	}
	echo $picture_path;
	$date = date("Y-m-d");
	$SQL_QUERY = '
		INSERT INTO
		camagru.comments (
			id,
			login,
			comment,
			picture_path,
			posted_date
		) 
		VALUE 
		(
			0,
			"'.$login.'",
			"'.$comment.'",
			"'.$picture_path.'",
			"'.$date.'"
		)'
	;
	return ($SQL_QUERY);
}



try {

	$array = [
		"0,edouard,Wowowow torp beau,../ressources/images/nature_3.jpeg",
		"0,dsddasd,Wowowow torp beau,../ressources/images/nature_3.jpeg",
		"0,edadsdadouard,Wowowow torp beau,../ressources/images/nature_3.jpeg",
		"0,eddasdadouard,Wowowow torp beau,../ressources/images/nature_3.jpeg",
		"0,PIere, GRAVEEEE,../ressources/images/nature_1.jpeg",
		"0,LUVAS, JE VEU XY ALLER,../ressources/images/nature_2.jpeg",
		];

	echo "Connection établie.\n";
	for ($i = 0; $i < count($array); $i++)
	{
		$line = explode(',', $array[$i]);
		print_r($line);
		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$ret_value = $conn->exec(create_comment($line[1], $line[3], $line[2]));
	}
}
catch (PDOException $e) {
	echo "ERROR CONNECTION DB: " . $e->getMessage() . "\nAborting process\n";
}


?>