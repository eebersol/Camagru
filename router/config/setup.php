#!/usr/bin/php
<?php

require_once('database.php');

try {
	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	echo "Connection établie.\n";
}
catch (PDOException $e) {
	echo "ERROR CONNECTION DB: " . $e->getMessage() . "\nAborting process\n";
}

// CREATE USERS DB //

try
{
	$SQL_QUERY = "CREATE TABLE users (
		id 					INT 			NOT NULL AUTO_INCREMENT PRIMARY KEY,
		email 				VARCHAR(255)	NOT NULL,
		login 				VARCHAR(120)	NOT NULL,
		passwd 				VARCHAR(500)	NOT NULL,
		subscribe_email 	INT 			NOT NULL,
		token_subscribe		TEXT			NOT NULL,
		pic_reference 		TEXT 			NOT NULL,
		notification_like 	INT 			NOT NULL,
		notification_comment INT 			NOT NULL
	)";
	$ret_value = $conn->exec($SQL_QUERY);
	echo "DB_NAME : users -> created : " . $ret_value . "\n";
}
catch (PDOException $e) {
	echo "ERROR CREATING TABLE: users : " . $e->getMessage() . "\nAborting process\n";
}

// CREATE PICTURES DB //

try
{
	$SQL_QUERY = "CREATE TABLE pictures (
		id 					INT 	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		date_creation 		DATE	NOT NULL,
		like_reference 		TEXT	NOT NULL,
		comment_reference 	TEXT	NOT NULL,
		category			TEXT 	NOT NULL,
		picture_path 		TEXT 	NOT NULL,
		description 		TEXT 	NOT NULL
	)";
	$ret_value = $conn->exec($SQL_QUERY);
	echo "DB_NAME : pictures -> created : " . $ret_value . "\n";
}
catch (PDOException $e) {
	echo "ERROR CREATING TABLE: pictures : " . $e->getMessage() . "\nAborting process\n";
}

?>