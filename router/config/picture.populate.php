#!/usr/bin/php
<?php


require_once('database.php');

function create_picture($comments, $category, $picture_path, $desc)
{
	if( ! ini_get('date.timezone') )
	{
    	date_default_timezone_set('GMT');
	}
	echo $picture_path;
	$date = date("Y-m-d");
	$SQL_QUERY = '
		INSERT INTO
		`pictures` (
			id,
			date_creation,
			like_reference,
			comment_reference,
			category,
			picture_path,
			description
		) 
		VALUE 
		(
			0,
			"'.$date.'",
			"",
			"'.$comments.'",
			"'.$category.'",
			"'.$picture_path.'",
			"'.$desc.'"
		)'
	;
	return ($SQL_QUERY);
}



try {

	$array = [
		"0,'','',edouard||tropChouetteTaPhoto&&paul||hahahahaha,nature,../ressources/images/nature_1.jpeg,'COUCOU JE TEST'",
		"0,'','',paul||hahahahaha,nature,../ressources/images/nature_2.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_3.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_4.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_5.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_6.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_7.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_8.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_9.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_10.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_11.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_12.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_13.jpeg,''",
		"0,'','','',nature,../ressources/images/nature_14.jpeg,''",
		];

	echo "Connection établie.\n";
	for ($i = 0; $i < count($array); $i++)
	{
		$line = explode(',', $array[$i]);
		print_r($line);
		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$ret_value = $conn->exec(create_picture($line[3], $line[4], $line[5], $line[6]));
	}
}
catch (PDOException $e) {
	echo "ERROR CONNECTION DB: " . $e->getMessage() . "\nAborting process\n";
}


?>