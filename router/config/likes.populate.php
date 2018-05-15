#!/usr/bin/php
<?php


require_once('database.php');

function create_like($login, $picture_path)
{
	if( ! ini_get('date.timezone') )
	{
    	date_default_timezone_set('GMT');
	}
	echo $picture_path;
	$date = date("Y-m-d");
	$SQL_QUERY = '
		INSERT INTO
		`likes` (
			id,
			login,
			picture_path
		) 
		VALUE 
		(
			0,
			"'.$login.'",
			"'.$picture_path.'"
		)'
	;
	return ($SQL_QUERY);
}



try {

	$array = [
		"0,edouard,../ressources/images/nature_3.jpeg",
		"0,edouard,../ressources/images/nature_3.jpeg",
		"0,edouard,../ressources/images/nature_2.jpeg",
		];

	echo "Connection établie.\n";
	for ($i = 0; $i < count($array); $i++)
	{
		$line = explode(',', $array[$i]);
		print_r($line);
		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$ret_value = $conn->exec(create_like($line[1], $line[2]));
	}
}
catch (PDOException $e) {
	echo "ERROR CONNECTION DB: " . $e->getMessage() . "\nAborting process\n";
}


?>